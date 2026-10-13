// Position-based (Verlet) cloth lying on a floor at z = 0.
// Coordinates are screen pixels: x right, y down, z up towards the viewer.

// Self-collision, in grid spacings (see findContacts):
const THICK = 0.6;     // how far apart two layers of a fold stay
const MARGIN = 0.6;    // how much further than that a point and a triangle are paired up for the step
const TOL0 = -0.5;     // a point this far past a triangle's edge at the start of a step still says which side it's on
const EXCL = 1;        // grid rings around a point that don't collide with it (they're held by the springs)
const CCAP = 0.25;     // one contact moves a point at most this far per pass (no sudden jumps out of a tight fold)
// The hand drags the rug at most this far per step (about 2000 px/s for the large rug): a rug can't be whipped
// through a fold, and a fast flick doesn't fling it into a heap.
const PINCAP = 1.0;

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
    // Self-collision: every point keeps at least `thickness` away from the surface of the rest of the rug, on the
    // side it was on (so a fold stacks instead of passing through).
    this.thickness = this.spacing * THICK;
    this.maxMove = this.spacing * 0.35; // per step; stops a falling or flung rug from tunnelling through a fold
    this.pin = null; // { i, x, y, z }
    this.layFlat(cx, cy, angle);
    this.buildConstraints();
    this.buildHash();
    this.buildTriangles();
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
        // Bending: a rug is thick and stiff, so it folds in wide curves instead of crumpling
        // like a scarf. The longer springs keep it from twisting into a heap.
        add(i, j, i + 2, j, 0.45); add(i, j, i, j + 2, 0.45);
        add(i, j, i + 3, j, 0.3); add(i, j, i, j + 3, 0.3);
      }
    }
    this.ca = Int32Array.from(a);
    this.cb = Int32Array.from(b);
    this.rest = Float32Array.from(rest);
    this.stiff = Float32Array.from(stiff);
    // solver-ready copies: array offsets instead of particle indices, stiffness pre-halved (equal masses)
    this.ca3 = this.ca.map((v) => v * 3);
    this.cb3 = this.cb.map((v) => v * 3);
    this.half = this.stiff.map((v) => v * 0.5);
  }

  buildHash() {
    this.next = new Int32Array(this.n);   // per point: the next point in the same grid cell
    this.grid = null;
  }

  buildTriangles() {
    const { nx, ny } = this, t = [], ti = [], tj = [];
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1;
      t.push(a * 3, c * 3, b * 3, b * 3, c * 3, d * 3); ti.push(i, i); tj.push(j, j);
    }
    this.tri = Int32Array.from(t);
    this.triI = Int32Array.from(ti);
    this.triJ = Int32Array.from(tj);
    this.nt = ti.length;
    this.pI = new Int16Array(this.n); this.pJ = new Int16Array(this.n);
    for (let p = 0; p < this.n; p++) { this.pI[p] = p % nx; this.pJ[p] = (p / nx) | 0; }
    this.cP = new Int32Array(4096); this.cT = new Int32Array(4096); this.cS = new Float32Array(4096); this.nc = 0;
  }

  // Soft grab: each solver iteration pulls the grabbed particle a fraction `k`
  // of the way to the cursor, so the rest of the rug's weight resists it.
  setPin(i, x, y, z, k = 0.3, carry = false) {
    const was = this.pin && this.pin.i === i ? this.pin : null;
    if (!was) this.buildGrab(i);
    // where the hand was at the last step
    const k3 = i * 3;
    const fx = was ? was.x : this.pos[k3], fy = was ? was.y : this.pos[k3 + 1], fz = was ? was.z : this.pos[k3 + 2];
    // a rug can't be whipped faster than this: the hand drags it at most PINCAP spacings per step
    const dx = x - fx, dy = y - fy, dz = z - fz, d = Math.hypot(dx, dy, dz), cap = this.spacing * PINCAP;
    if (d > cap) { const f = cap / d; x = fx + dx * f; y = fy + dy * f; z = fz + dz * f; }
    // Held in the middle, the whole rug slides along with the hand (only the spot under it lifts a little), the way a
    // rug moves when you pull it by the middle. Held near an edge, it's cloth: the edge lifts, folds, drags the rest.
    if (carry && was) { const mx = x - was.x, my = y - was.y; if (mx || my) this.translate(mx, my); }
    this.pin = { i, x, y, z, k, carry };
  }

  // What a hand holds: the grabbed point plus a small patch around it that follows with a smooth falloff, so a
  // lifted rug makes a rounded peak instead of a needle. And for every particle, how far it may be from the grabbed
  // one (its distance across the flat rug, plus a little give): a hard pull then drags the whole rug along at once
  // instead of stretching the springs next to the hand into a long spike.
  buildGrab(i) {
    const { nx, ny, dx, dy, n } = this, i0 = i % nx, j0 = (i / nx) | 0;
    const R = 2.5 * this.spacing, ri = Math.ceil(R / dx), rj = Math.ceil(R / dy);
    const ids = [], ws = [];
    for (let j = Math.max(0, j0 - rj); j <= Math.min(ny - 1, j0 + rj); j++) {
      for (let ii = Math.max(0, i0 - ri); ii <= Math.min(nx - 1, i0 + ri); ii++) {
        const d = Math.hypot((ii - i0) * dx, (j - j0) * dy);
        if (d === 0 || d >= R) continue;
        const t = 1 - (d / R) ** 2;
        ids.push(this.idx(ii, j) * 3); ws.push(t * t);
      }
    }
    this.grabIds = Int32Array.from(ids);
    this.grabW = Float32Array.from(ws);
    const reach = this.grabReach ||= new Float32Array(n);
    for (let p = 0; p < n; p++) reach[p] = Math.hypot((p % nx - i0) * dx, (((p / nx) | 0) - j0) * dy) * 1.05;
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
    const damping = this.damping, maxMove = this.maxMove;

    // Integrate
    for (let p = 0; p < n; p++) {
      const k = p * 3;
      let vx = (pos[k] - prev[k]) * damping;
      let vy = (pos[k + 1] - prev[k + 1]) * damping;
      let vz = (pos[k + 2] - prev[k + 2]) * damping;
      const sp = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (sp > maxMove) { const f = maxMove / sp; vx *= f; vy *= f; vz *= f; }
      prev[k] = pos[k]; prev[k + 1] = pos[k + 1]; prev[k + 2] = pos[k + 2];
      pos[k] += vx; pos[k + 1] += vy; pos[k + 2] += vz - g;
    }

    this.findContacts();

    const pin = this.pin;
    const applyPin = () => {
      if (!pin) return;
      const k = pin.i * 3, a = pin.k;
      const ex = (pin.x - pos[k]) * a, ey = (pin.y - pos[k + 1]) * a, ez = (pin.z - pos[k + 2]) * a;
      pos[k] += ex; pos[k + 1] += ey; pos[k + 2] += ez;
      const ids = this.grabIds, ws = this.grabW;
      for (let q = 0; q < ids.length; q++) {
        const kq = ids[q], w = ws[q];
        pos[kq] += ex * w; pos[kq + 1] += ey * w; pos[kq + 2] += ez * w;
      }
      if (pin.carry) return;
      // keep every particle within reach of the hand
      const px = pos[k], py = pos[k + 1], pz = pos[k + 2], reach = this.grabReach;
      for (let p = 0, kp = 0; p < n; p++, kp += 3) {
        const dx = pos[kp] - px, dy = pos[kp + 1] - py, dz = pos[kp + 2] - pz;
        const d2 = dx * dx + dy * dy + dz * dz, r = reach[p];
        if (d2 > r * r) {
          const f = 1 - r / Math.sqrt(d2);
          pos[kp] -= dx * f; pos[kp + 1] -= dy * f; pos[kp + 2] -= dz * f;
        }
      }
    };

    const { ca3: ca, cb3: cb, rest, half } = this;
    const m = ca.length;
    for (let it = 0; it < this.iterations; it++) {
      applyPin();
      // Every particle has the same mass (the grab is a soft pull, not a fixed point), so each spring simply moves
      // both ends half the correction.
      for (let c = 0; c < m; c++) {
        const kp = ca[c], kq = cb[c]; // already multiplied by 3
        const dx = pos[kq] - pos[kp], dy = pos[kq + 1] - pos[kp + 1], dz = pos[kq + 2] - pos[kp + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
        const f = (d - rest[c]) / d * half[c];
        const fx = dx * f, fy = dy * f, fz = dz * f;
        pos[kp] += fx; pos[kp + 1] += fy; pos[kp + 2] += fz;
        pos[kq] -= fx; pos[kq + 1] -= fy; pos[kq + 2] -= fz;
      }
      this.resolveContacts();
      // floor
      for (let p = 0; p < n; p++) {
        const k = p * 3 + 2;
        if (pos[k] < this.floorZ) pos[k] = this.floorZ;
      }
    }
    applyPin();
    this.resolveContacts();
    for (let p = 0; p < n; p++) { const k = p * 3 + 2; if (pos[k] < this.floorZ) pos[k] = this.floorZ; }

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

  // Pairs of (point, triangle of another part of the rug) that are close enough to touch during this step, and on which
  // side of the triangle the point was when the step began (prev holds those positions while the step runs).
  findContacts() {
    const { pos, prev, n, nx, tri, triI, triJ, nt } = this;
    const h = this.thickness, m = h + this.spacing * MARGIN, low = this.floorZ + h * 0.5;
    this.nc = 0;
    // a rug lying flat can't touch itself: only the part around the raised points matters
    let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity, raised = 0;
    for (let p = 0, k = 0; p < n; p++, k += 3) {
      if (pos[k + 2] < low && prev[k + 2] < low) continue;
      raised++;
      if (pos[k] < bx0) bx0 = pos[k]; if (pos[k] > bx1) bx1 = pos[k];
      if (pos[k + 1] < by0) by0 = pos[k + 1]; if (pos[k + 1] > by1) by1 = pos[k + 1];
    }
    if (!raised) return;
    bx0 -= m; by0 -= m; bx1 += m; by1 += m;
    // the points there into a flat grid of cells two spacings wide
    const cs = this.spacing * 2, inv = 1 / cs;
    const ox = Math.floor(bx0 * inv), oy = Math.floor(by0 * inv);
    const gw = Math.floor(bx1 * inv) - ox + 1, gh = Math.floor(by1 * inv) - oy + 1;
    if (!this.grid || this.grid.length < gw * gh) this.grid = new Int32Array(gw * gh * 2);
    const grid = this.grid, nextP = this.next;
    grid.fill(-1, 0, gw * gh);
    for (let p = 0, k = 0; p < n; p++, k += 3) {
      const x = pos[k], y = pos[k + 1];
      if (x < bx0 || x > bx1 || y < by0 || y > by1) continue;
      const c = (Math.floor(y * inv) - oy) * gw + (Math.floor(x * inv) - ox);
      nextP[p] = grid[c]; grid[c] = p;
    }
    const R = EXCL, PI = this.pI, PJ = this.pJ, tol = -0.15;
    // every triangle there against the points near it
    for (let t = 0; t < nt; t++) {
      const a = tri[t * 3], b = tri[t * 3 + 1], c = tri[t * 3 + 2];
      const ax = pos[a], ay = pos[a + 1], az = pos[a + 2], bx = pos[b], by = pos[b + 1], bz = pos[b + 2], cx_ = pos[c], cy_ = pos[c + 1], cz = pos[c + 2];
      const x0 = Math.min(ax, bx, cx_), x1 = Math.max(ax, bx, cx_), y0 = Math.min(ay, by, cy_), y1 = Math.max(ay, by, cy_);
      if (x1 < bx0 || x0 > bx1 || y1 < by0 || y0 > by1) continue;
      const tLow = az < low && bz < low && cz < low;
      // the triangle's plane and what's needed for "is a point over it", once per triangle
      const e1x = bx - ax, e1y = by - ay, e1z = bz - az, e2x = cx_ - ax, e2y = cy_ - ay, e2z = cz - az;
      let nx_ = e1y * e2z - e1z * e2y, ny_ = e1z * e2x - e1x * e2z, nz_ = e1x * e2y - e1y * e2x;
      const len = Math.sqrt(nx_ * nx_ + ny_ * ny_ + nz_ * nz_);
      if (len < 1e-9) continue;
      nx_ /= len; ny_ /= len; nz_ /= len;
      const d00 = e1x * e1x + e1y * e1y + e1z * e1z, d01 = e1x * e2x + e1y * e2y + e1z * e2z, d11 = e2x * e2x + e2y * e2y + e2z * e2z;
      const iden = 1 / (d00 * d11 - d01 * d01);
      const ti = triI[t], tj = triJ[t];
      const gx0 = Math.max(0, Math.floor((x0 - m) * inv) - ox), gx1 = Math.min(gw - 1, Math.floor((x1 + m) * inv) - ox);
      const gy0 = Math.max(0, Math.floor((y0 - m) * inv) - oy), gy1 = Math.min(gh - 1, Math.floor((y1 + m) * inv) - oy);
      const zlo = Math.min(az, bz, cz) - m, zhi = Math.max(az, bz, cz) + m;
      for (let gy = gy0; gy <= gy1; gy++) for (let gx = gx0; gx <= gx1; gx++) {
        for (let p = grid[gy * gw + gx]; p !== -1; p = nextP[p]) {
          const k = p * 3, pz = pos[k + 2];
          if (pz < zlo || pz > zhi) continue;
          if (tLow && pz < low) continue;   // both on the floor
          const pi = PI[p], pj = PJ[p];
          if (pi >= ti - R && pi <= ti + 1 + R && pj >= tj - R && pj <= tj + 1 + R) continue;   // its own neighbourhood
          const vx = pos[k] - ax, vy = pos[k + 1] - ay, vz = pz - az;
          const d = vx * nx_ + vy * ny_ + vz * nz_;
          if (d > m || d < -m) continue;
          const d20 = vx * e1x + vy * e1y + vz * e1z, d21 = vx * e2x + vy * e2y + vz * e2z;
          const v = (d11 * d20 - d01 * d21) * iden, w = (d00 * d21 - d01 * d20) * iden;
          if (v < tol || w < tol || 1 - v - w < tol) continue;
          // at the start of the step: which side it was on (if it was over the triangle, or near it, then too)
          const s0 = this.side(prev, k, a, b, c, Infinity, TOL0);
          const sgn = s0 !== 0 && Math.abs(s0) > 1e-3 ? Math.sign(s0) : (d >= 0 ? 1 : -1);
          if (this.nc >= this.cP.length) this.growContacts();
          this.cP[this.nc] = k; this.cT[this.nc] = t; this.cS[this.nc] = sgn; this.nc++;
        }
      }
    }
  }

  growContacts() {
    const g = (A, T) => { const b = new T(A.length * 2); b.set(A); return b; };
    this.cP = g(this.cP, Int32Array); this.cT = g(this.cT, Int32Array); this.cS = g(this.cS, Float32Array);
  }

  // Signed distance from point k to the plane of triangle (a, b, c) when the point lies over the triangle (a little
  // past its edges counts) and within `far`; 0 otherwise.
  side(P, k, a, b, c, far, tol = -0.15) {
    const e1x = P[b] - P[a], e1y = P[b + 1] - P[a + 1], e1z = P[b + 2] - P[a + 2];
    const e2x = P[c] - P[a], e2y = P[c + 1] - P[a + 1], e2z = P[c + 2] - P[a + 2];
    let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (len < 1e-9) return 0;
    nx /= len; ny /= len; nz /= len;
    const vx = P[k] - P[a], vy = P[k + 1] - P[a + 1], vz = P[k + 2] - P[a + 2];
    const d = vx * nx + vy * ny + vz * nz;
    if (Math.abs(d) > far) return 0;
    const d00 = e1x * e1x + e1y * e1y + e1z * e1z, d01 = e1x * e2x + e1y * e2y + e1z * e2z, d11 = e2x * e2x + e2y * e2y + e2z * e2z;
    const d20 = vx * e1x + vy * e1y + vz * e1z, d21 = vx * e2x + vy * e2y + vz * e2z;
    const den = d00 * d11 - d01 * d01;
    const v = (d11 * d20 - d01 * d21) / den, w = (d00 * d21 - d01 * d20) / den;
    if (v < tol || w < tol || 1 - v - w < tol) return 0;
    return d === 0 ? 1e-6 : d;
  }

  // Keep every contact's point `thickness` away from its triangle, on its own side.
  resolveContacts() {
    const { pos, tri, cP, cT, cS, nc } = this, h = this.thickness;
    for (let i = 0; i < nc; i++) {
      const k = cP[i], t = cT[i], sg = cS[i];
      const a = tri[t * 3], b = tri[t * 3 + 1], c = tri[t * 3 + 2];
      const e1x = pos[b] - pos[a], e1y = pos[b + 1] - pos[a + 1], e1z = pos[b + 2] - pos[a + 2];
      const e2x = pos[c] - pos[a], e2y = pos[c + 1] - pos[a + 1], e2z = pos[c + 2] - pos[a + 2];
      let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (len < 1e-9) continue;
      nx /= len; ny /= len; nz /= len;
      const vx = pos[k] - pos[a], vy = pos[k + 1] - pos[a + 1], vz = pos[k + 2] - pos[a + 2];
      const d = (vx * nx + vy * ny + vz * nz) * sg;
      if (d >= h) continue;
      const d00 = e1x * e1x + e1y * e1y + e1z * e1z, d01 = e1x * e2x + e1y * e2y + e1z * e2z, d11 = e2x * e2x + e2y * e2y + e2z * e2z;
      const d20 = vx * e1x + vy * e1y + vz * e1z, d21 = vx * e2x + vy * e2y + vz * e2z;
      const den = d00 * d11 - d01 * d01;
      const wb = (d11 * d20 - d01 * d21) / den, wc = (d00 * d21 - d01 * d20) / den, wa = 1 - wb - wc;
      if (wa < -0.2 || wb < -0.2 || wc < -0.2) continue;   // slid off this triangle (a neighbour has it now)
      const ca = Math.max(0, wa), cb = Math.max(0, wb), cc = Math.max(0, wc);
      const s = Math.min(h - d, this.spacing * CCAP) / (1 + ca * ca + cb * cb + cc * cc);
      const fx = nx * sg * s, fy = ny * sg * s, fz = nz * sg * s;
      pos[k] += fx; pos[k + 1] += fy; pos[k + 2] += fz;
      pos[a] -= fx * ca; pos[a + 1] -= fy * ca; pos[a + 2] -= fz * ca;
      pos[b] -= fx * cb; pos[b + 1] -= fy * cb; pos[b + 2] -= fz * cb;
      pos[c] -= fx * cc; pos[c + 1] -= fy * cc; pos[c + 2] -= fz * cc;
    }
  }

  // True when the rug passes through itself somewhere (an edge of the mesh goes through a triangle it isn't part
  // of). The collisions keep that from happening; this is the check for when it happened anyway.
  crossesItself() {
    const { pos, n, nx, ny, tri, nt } = this, low = this.floorZ + this.thickness * 0.5;
    let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity, raised = 0;
    for (let p = 0, k = 0; p < n; p++, k += 3) {
      if (pos[k + 2] < low) continue;
      raised++;
      if (pos[k] < bx0) bx0 = pos[k]; if (pos[k] > bx1) bx1 = pos[k];
      if (pos[k + 1] < by0) by0 = pos[k + 1]; if (pos[k + 1] > by1) by1 = pos[k + 1];
    }
    if (!raised) return false;
    const cs = this.spacing * 2, inv = 1 / cs, pad = this.spacing;
    bx0 -= pad; by0 -= pad; bx1 += pad; by1 += pad;
    const ox = Math.floor(bx0 * inv), oy = Math.floor(by0 * inv);
    const gw = Math.floor(bx1 * inv) - ox + 1, gh = Math.floor(by1 * inv) - oy + 1;
    const head = new Int32Array(gw * gh).fill(-1), entT = [], entN = [];
    const box = (ks, out) => {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const k of ks) { x0 = Math.min(x0, pos[k]); x1 = Math.max(x1, pos[k]); y0 = Math.min(y0, pos[k + 1]); y1 = Math.max(y1, pos[k + 1]); }
      out[0] = Math.max(0, Math.floor(x0 * inv) - ox); out[1] = Math.min(gw - 1, Math.floor(x1 * inv) - ox);
      out[2] = Math.max(0, Math.floor(y0 * inv) - oy); out[3] = Math.min(gh - 1, Math.floor(y1 * inv) - oy);
      return out[0] <= out[1] && out[2] <= out[3];
    };
    const r = [0, 0, 0, 0];
    for (let t = 0; t < nt; t++) {
      if (!box([tri[t * 3], tri[t * 3 + 1], tri[t * 3 + 2]], r)) continue;
      for (let y = r[2]; y <= r[3]; y++) for (let x = r[0]; x <= r[1]; x++) { const c = y * gw + x; entT.push(t); entN.push(head[c]); head[c] = entT.length - 1; }
    }
    const seen = new Int32Array(nt).fill(-1);
    let edge = 0;
    const pierces = (ka, kb) => {
      edge++;
      if (pos[ka + 2] < low && pos[kb + 2] < low) return false;
      if (!box([ka, kb], r)) return false;
      for (let y = r[2]; y <= r[3]; y++) for (let x = r[0]; x <= r[1]; x++) {
        for (let e = head[y * gw + x]; e !== -1; e = entN[e]) {
          const t = entT[e];
          if (seen[t] === edge) continue;
          seen[t] = edge;
          const a = tri[t * 3], b = tri[t * 3 + 1], c = tri[t * 3 + 2];
          if (a === ka || b === ka || c === ka || a === kb || b === kb || c === kb) continue;
          if (segmentHitsTriangle(pos, ka, kb, a, b, c)) return true;
        }
      }
      return false;
    };
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const k = (j * nx + i) * 3;
      if (i < nx - 1 && pierces(k, k + 3)) return true;
      if (j < ny - 1 && pierces(k, k + nx * 3)) return true;
      if (i < nx - 1 && j < ny - 1 && pierces(k + 3, k + nx * 3)) return true;
    }
    return false;
  }

  // Highest point above the floor; a settled rug piled much higher than a couple of layers is tangled.
  maxHeight() {
    let z = 0;
    for (let p = 0; p < this.n; p++) if (this.pos[p * 3 + 2] > z) z = this.pos[p * 3 + 2];
    return z - this.floorZ;
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

// Does the segment from point ka to kb go through the inside of triangle (a, b, c)? (Möller–Trumbore)
function segmentHitsTriangle(P, ka, kb, a, b, c) {
  const ox = P[ka], oy = P[ka + 1], oz = P[ka + 2];
  const dx = P[kb] - ox, dy = P[kb + 1] - oy, dz = P[kb + 2] - oz;
  const e1x = P[b] - P[a], e1y = P[b + 1] - P[a + 1], e1z = P[b + 2] - P[a + 2];
  const e2x = P[c] - P[a], e2y = P[c + 1] - P[a + 1], e2z = P[c + 2] - P[a + 2];
  const px = dy * e2z - dz * e2y, py = dz * e2x - dx * e2z, pz = dx * e2y - dy * e2x;
  const det = e1x * px + e1y * py + e1z * pz;
  if (Math.abs(det) < 1e-9) return false;
  const inv = 1 / det, tx = ox - P[a], ty = oy - P[a + 1], tz = oz - P[a + 2];
  const u = (tx * px + ty * py + tz * pz) * inv;
  if (u < 0 || u > 1) return false;
  const qx = ty * e1z - tz * e1y, qy = tz * e1x - tx * e1z, qz = tx * e1y - ty * e1x;
  const v = (dx * qx + dy * qy + dz * qz) * inv;
  if (v < 0 || u + v > 1) return false;
  const t = (e2x * qx + e2y * qy + e2z * qz) * inv;
  return t > 0 && t < 1;
}
