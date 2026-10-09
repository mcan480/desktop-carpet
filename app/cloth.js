// Position-based (Verlet) cloth lying on a floor at z = 0.
// Coordinates are screen pixels: x right, y down, z up towards the viewer.

export class Cloth {
  constructor({ width, height, cx, cy, angle = 0, nx = 40 }) {
    this.width = width;
    this.height = height;
    this.nx = nx;
    this.ny = Math.max(6, Math.round((nx - 1) * (height / width)) + 1);
    this.n = this.nx * this.ny;
    this.dx = width / (this.nx - 1);
    this.dy = height / (this.ny - 1);
    this.spacing = Math.min(this.dx, this.dy);
    this.pos = new Float32Array(this.n * 3);
    this.prev = new Float32Array(this.n * 3);
    this.invMass = new Float32Array(this.n).fill(1);
    this.floorZ = 1.5;
    this.gravity = 2600;
    this.damping = 0.992;
    this.friction = 0.55; // fraction of horizontal velocity kept when touching floor
    this.iterations = 14;
    // Layers keep at least this far apart. It must exceed spacing/sqrt(2) (≈0.707), otherwise a point can slip
    // through the middle of a grid square of the other layer.
    this.collideDist = this.spacing * 0.9;
    this.maxMove = this.spacing * 0.35; // per step; stops fast drags from tunnelling through a fold
    this.pin = null; // { i, x, y, z }
    this.layFlat(cx, cy, angle);
    this.buildConstraints();
    this.buildHash();
  }

  idx(i, j) { return j * this.nx + i; }

  layFlat(cx, cy, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    for (let j = 0; j < this.ny; j++) {
      for (let i = 0; i < this.nx; i++) {
        const lx = i * this.dx - this.width / 2, ly = j * this.dy - this.height / 2;
        const k = this.idx(i, j) * 3;
        this.pos[k] = cx + lx * c - ly * s;
        this.pos[k + 1] = cy + lx * s + ly * c;
        this.pos[k + 2] = this.floorZ;
      }
    }
    this.prev.set(this.pos);
  }

  buildConstraints() {
    const a = [], b = [], rest = [], stiff = [];
    const add = (i0, j0, i1, j1, k) => {
      if (i1 < 0 || j1 < 0 || i1 >= this.nx || j1 >= this.ny) return;
      if (i0 < 0 || j0 < 0 || i0 >= this.nx || j0 >= this.ny) return;
      const p = this.idx(i0, j0), q = this.idx(i1, j1);
      a.push(p); b.push(q);
      rest.push(Math.hypot((i1 - i0) * this.dx, (j1 - j0) * this.dy));
      stiff.push(k);
    };
    for (let j = 0; j < this.ny; j++) {
      for (let i = 0; i < this.nx; i++) {
        add(i, j, i + 1, j, 1); add(i, j, i, j + 1, 1);            // structural
        add(i, j, i + 1, j + 1, 0.9); add(i + 1, j, i, j + 1, 0.9); // shear
        add(i, j, i + 2, j, 0.22); add(i, j, i, j + 2, 0.22);      // bending
      }
    }
    this.ca = Int32Array.from(a);
    this.cb = Int32Array.from(b);
    this.rest = Float32Array.from(rest);
    this.stiff = Float32Array.from(stiff);
  }

  buildHash() {
    this.hashSize = 4096;
    this.head = new Int32Array(this.hashSize);
    this.next = new Int32Array(this.n);
  }

  hashKey(x, y, z) {
    return (((x * 92837111) ^ (y * 689287499) ^ (z * 283923481)) >>> 0) % this.hashSize;
  }

  // Soft grab: each solver iteration pulls the grabbed particle a fraction `k`
  // of the way to the cursor, so the rest of the rug's weight resists it.
  setPin(i, x, y, z, k = 0.3) {
    this.pin = { i, x, y, z, k };
  }

  setWeight({ gravity, friction, dragFriction }) {
    this.gravity = gravity;
    this.friction = friction;
    this.dragFriction = dragFriction ?? 0.85;
  }

  releasePin() {
    this.pin = null;
  }

  step(dt) {
    const { pos, prev, invMass, n } = this;
    const g = this.gravity * dt * dt;
    let moved = 0;

    // Integrate
    for (let p = 0; p < n; p++) {
      const k = p * 3;
      let vx = (pos[k] - prev[k]) * this.damping;
      let vy = (pos[k + 1] - prev[k + 1]) * this.damping;
      let vz = (pos[k + 2] - prev[k + 2]) * this.damping;
      const sp = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (sp > this.maxMove) { const f = this.maxMove / sp; vx *= f; vy *= f; vz *= f; }
      prev[k] = pos[k]; prev[k + 1] = pos[k + 1]; prev[k + 2] = pos[k + 2];
      pos[k] += vx; pos[k + 1] += vy; pos[k + 2] += vz - g;
    }

    const pin = this.pin;
    const applyPin = () => {
      if (!pin) return;
      const k = pin.i * 3, a = pin.k;
      pos[k] += (pin.x - pos[k]) * a;
      pos[k + 1] += (pin.y - pos[k + 1]) * a;
      pos[k + 2] += (pin.z - pos[k + 2]) * a;
    };

    const { ca, cb, rest, stiff } = this;
    const m = ca.length;
    for (let it = 0; it < this.iterations; it++) {
      applyPin();
      for (let c = 0; c < m; c++) {
        const p = ca[c], q = cb[c];
        const wp = invMass[p], wq = invMass[q], w = wp + wq;
        if (w === 0) continue;
        const kp = p * 3, kq = q * 3;
        const dx = pos[kq] - pos[kp], dy = pos[kq + 1] - pos[kp + 1], dz = pos[kq + 2] - pos[kp + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
        let diff = (d - rest[c]) / d;
        const s = stiff[c];
        // bending springs only resist stretching weakly, compression lightly
        if (s < 0.5 && diff < 0) diff *= 0.6;
        const f = (diff * s) / w;
        pos[kp] += dx * f * wp; pos[kp + 1] += dy * f * wp; pos[kp + 2] += dz * f * wp;
        pos[kq] -= dx * f * wq; pos[kq + 1] -= dy * f * wq; pos[kq + 2] -= dz * f * wq;
      }
      if (it % 2 === 1 || it === this.iterations - 1) this.selfCollide();
      // floor
      for (let p = 0; p < n; p++) {
        const k = p * 3 + 2;
        if (pos[k] < this.floorZ) pos[k] = this.floorZ;
      }
    }
    applyPin();

    // floor friction + motion measure. While the rug is being pulled it slides along
    // the floor as a whole instead of bunching up behind the grabbed point.
    const fr = pin ? (this.dragFriction ?? 0.85) : this.friction;
    for (let p = 0; p < n; p++) {
      const k = p * 3;
      if (pos[k + 2] <= this.floorZ + 0.6) {
        prev[k] = pos[k] - (pos[k] - prev[k]) * fr;
        prev[k + 1] = pos[k + 1] - (pos[k + 1] - prev[k + 1]) * fr;
      }
      const mv = Math.abs(pos[k] - prev[k]) + Math.abs(pos[k + 1] - prev[k + 1]) + Math.abs(pos[k + 2] - prev[k + 2]);
      if (mv > moved) moved = mv;
    }
    return moved;
  }

  selfCollide() {
    const { pos, prev, n, head, next, nx } = this;
    const r = this.collideDist, r2 = r * r, inv = 1 / r;
    head.fill(-1);
    for (let p = 0; p < n; p++) {
      const k = p * 3;
      const h = this.hashKey(Math.floor(pos[k] * inv), Math.floor(pos[k + 1] * inv), Math.floor(pos[k + 2] * inv));
      next[p] = head[h]; head[h] = p;
    }
    for (let p = 0; p < n; p++) {
      const k = p * 3;
      const gx = Math.floor(pos[k] * inv), gy = Math.floor(pos[k + 1] * inv), gz = Math.floor(pos[k + 2] * inv);
      const pi = p % nx, pj = (p / nx) | 0;
      for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) for (let oz = -1; oz <= 1; oz++) {
        let q = head[this.hashKey(gx + ox, gy + oy, gz + oz)];
        while (q !== -1) {
          if (q > p) {
            const qi = q % nx, qj = (q / nx) | 0;
            if (Math.abs(qi - pi) > 2 || Math.abs(qj - pj) > 2) {
              const kq = q * 3;
              const dx = pos[kq] - pos[k], dy = pos[kq + 1] - pos[k + 1], dz = pos[kq + 2] - pos[k + 2];
              const d2 = dx * dx + dy * dy + dz * dz;
              if (d2 < r2) {
                const d = Math.sqrt(d2);
                // Push apart, mostly vertically: the upper layer rises.
                let ux, uy, uz;
                if (d < 1e-3) { ux = 0; uy = 0; uz = 1; } else { ux = dx / d; uy = dy / d; uz = dz / d; }
                // Which one is on top is decided by where they were at the start of the step, so a point that
                // got pushed slightly past the other layer is pulled back to its own side instead of crossing over.
                const pdz = prev[kq + 2] - prev[k + 2];
                const sign = (Math.abs(pdz) > 0.5 ? pdz : dz) >= 0 ? 1 : -1;
                const push = (r - d) * 0.5;
                const vz = sign * 0.85 + uz * 0.15, vx = ux * 0.3, vy = uy * 0.3;
                const wp = this.invMass[p], wq = this.invMass[q];
                if (wp) { pos[k] -= vx * push; pos[k + 1] -= vy * push; pos[k + 2] -= vz * push; }
                if (wq) { pos[kq] += vx * push; pos[kq + 1] += vy * push; pos[kq + 2] += vz * push; }
              }
            }
          }
          q = next[q];
        }
      }
    }
  }

  centroid() {
    let x = 0, y = 0;
    for (let p = 0; p < this.n; p++) { x += this.pos[p * 3]; y += this.pos[p * 3 + 1]; }
    return { x: x / this.n, y: y / this.n };
  }

  // Orientation of the long edge, estimated from the two middle rows.
  angle() {
    const j = (this.ny / 2) | 0;
    const a = this.idx(0, j) * 3, b = this.idx(this.nx - 1, j) * 3;
    return Math.atan2(this.pos[b + 1] - this.pos[a + 1], this.pos[b] - this.pos[a]);
  }

  rotate(delta) {
    const { x, y } = this.centroid();
    const c = Math.cos(delta), s = Math.sin(delta);
    for (const arr of [this.pos, this.prev]) {
      for (let p = 0; p < this.n; p++) {
        const k = p * 3;
        const dx = arr[k] - x, dy = arr[k + 1] - y;
        arr[k] = x + dx * c - dy * s;
        arr[k + 1] = y + dx * s + dy * c;
      }
    }
  }

  translate(dx, dy) {
    for (const arr of [this.pos, this.prev]) {
      for (let p = 0; p < this.n; p++) { arr[p * 3] += dx; arr[p * 3 + 1] += dy; }
    }
  }
}
