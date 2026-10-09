import * as THREE from './vendor/three.module.js';
import { Cloth } from './cloth.js';
import { makeRugCanvases, STYLES } from './rugTexture.js';

const api = window.halim || null; // provided by Electron preload; absent in a plain browser
if (!api) {
  document.body.classList.add('preview');
  document.body.style.background =
    'repeating-linear-gradient(0deg, rgba(0,0,0,.06) 0 2px, transparent 2px 46px),' +
    'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 260px),' +
    'linear-gradient(#c8a073, #b98d5f)';
}

const SIZES = { kucuk: 380, orta: 520, buyuk: 700 };
const ASPECT = 1.58;
// How the rug feels under the cursor. follow: how fast the grabbed point chases the
// cursor (lower = more lag), pin: how hard it pulls per solver pass, lift: max height.
const WEIGHTS = {
  hafif:  { follow: 30, pin: 0.55, lift: 140, gravity: 2600, friction: 0.55, dragFriction: 0.93 },
  normal: { follow: 16, pin: 0.3,  lift: 105, gravity: 3600, friction: 0.38, dragFriction: 0.9 },
  agir:   { follow: 10, pin: 0.2,  lift: 80,  gravity: 4600, friction: 0.25, dragFriction: 0.85 },
};

let W = window.innerWidth, H = window.innerHeight;

// ---------- three.js scene ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(W, H);
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const CAM_D = 2400;
const camera = new THREE.PerspectiveCamera(30, W / H, 10, 10000);

scene.add(new THREE.HemisphereLight(0xfff6ea, 0x8a7560, 1.25));
const sun = new THREE.DirectionalLight(0xfff3e0, 2.1);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 1.2;
sun.shadow.radius = 6;
scene.add(sun, sun.target);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.38 }));
floor.receiveShadow = true;
scene.add(floor);

function layout() {
  W = window.innerWidth; H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(H / 2 / CAM_D));
  camera.position.set(0, 0, CAM_D);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  floor.scale.set(W * 1.2, H * 1.2, 1);
  const half = Math.max(W, H) * 0.6;
  Object.assign(sun.shadow.camera, { left: -half, right: half, top: half, bottom: -half, near: 10, far: 6000 });
  sun.shadow.camera.updateProjectionMatrix();
  sun.position.set(-260, 420, 2000);
  sun.target.position.set(0, 0, 0);
}
layout();

// ---------- rug ----------
let state = {
  style: 'tabriz',
  size: 'orta',
  weight: 'normal',
  hidden: false,
};
const W8 = () => WEIGHTS[state.weight] || WEIGHTS.normal;
let cloth, geom, front, back, pick, textures = [];

// ---------- the Invisible rug ----------
// It shows the wallpaper pixel that is right behind each point of it, so whatever lies under it on the desktop
// (icons, files) seems to vanish. Folds bend the picture a little and the edges catch a faint glint, so you can
// still find it.
let wallInfo = null, wallImg = null, wallTex = null;
const wallCanvas = document.createElement('canvas');

function drawWallpaper() {
  const buf = new THREE.Vector2();
  renderer.getDrawingBufferSize(buf);
  wallCanvas.width = Math.max(1, buf.x); wallCanvas.height = Math.max(1, buf.y);
  const ctx = wallCanvas.getContext('2d');
  const k = buf.x / W; // canvas pixels per window (DIP) pixel
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = wallInfo?.color || '#000';
  ctx.fillRect(0, 0, wallCanvas.width, wallCanvas.height);
  if (wallInfo && wallImg) {
    const { bounds: b, workArea: a, mode, scale = 1 } = wallInfo;
    // Lay the picture out over the whole display the way the OS does, then look at it from the rug window,
    // which covers only the work area (no taskbar / menu bar / Dock).
    ctx.setTransform(k, 0, 0, k, (b.x - a.x) * k, (b.y - a.y) * k);
    const iw = wallImg.width, ih = wallImg.height, dw = b.width, dh = b.height;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, dw, dh); ctx.clip();
    if (mode === 'stretch') ctx.drawImage(wallImg, 0, 0, dw, dh);
    else if (mode === 'center' || mode === 'tile') {
      const w = iw / scale, h = ih / scale; // these modes show the picture at its own pixel size
      if (mode === 'center') ctx.drawImage(wallImg, (dw - w) / 2, (dh - h) / 2, w, h);
      else for (let y = 0; y < dh; y += h) for (let x = 0; x < dw; x += w) ctx.drawImage(wallImg, x, y, w, h);
    } else {
      const f = mode === 'fit' ? Math.min(dw / iw, dh / ih) : Math.max(dw / iw, dh / ih); // fill / span
      // Where the OS puts a cropped picture: centered by default, or what the main process measured on screen.
      const t = mode === 'fit' ? 0.5 : (wallInfo.anchor ?? 0.5);
      ctx.drawImage(wallImg, (dw - iw * f) * t, (dh - ih * f) * t, iw * f, ih * f);
    }
    ctx.restore();
  }
  if (!wallTex) {
    wallTex = new THREE.CanvasTexture(wallCanvas);
    wallTex.colorSpace = THREE.NoColorSpace; // pass the wallpaper's pixels through untouched
    wallTex.generateMipmaps = false;
    wallTex.minFilter = wallTex.magFilter = THREE.LinearFilter;
  } else {
    wallTex.image = wallCanvas;
  }
  wallTex.needsUpdate = true;
  invisibleUniforms.uRes.value.set(wallCanvas.width, wallCanvas.height);
  invisibleUniforms.uWall.value = wallTex;
}

async function setWallpaper(info) {
  wallInfo = info;
  wallImg = null;
  if (info?.bytes) {
    try { wallImg = await createImageBitmap(new Blob([info.bytes])); } catch (e) { console.error('wallpaper image', e); }
  }
  drawWallpaper();
  wake();
}

const invisibleUniforms = {
  uWall: { value: null },
  uRes: { value: new THREE.Vector2(1, 1) },
  uAspect: { value: ASPECT },
};

function invisibleMaterial(side) {
  return new THREE.ShaderMaterial({
    uniforms: invisibleUniforms,
    side,
    vertexShader: `
      varying vec3 vN; varying vec2 vUv;
      void main() {
        vUv = uv;
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D uWall; uniform vec2 uRes; uniform float uAspect;
      varying vec3 vN; varying vec2 vUv;
      void main() {
        vec3 n = normalize(gl_FrontFacing ? vN : -vN);
        float tilt = 1.0 - abs(n.z);                       // 0 where it lies flat, up to 1 on steep folds
        vec2 uv = gl_FragCoord.xy / uRes + n.xy * 0.018;   // a little refraction where it bends
        vec3 col = texture2D(uWall, uv).rgb;
        // faint glint along the four edges, a touch stronger on folds
        vec2 e = min(vUv, 1.0 - vUv) * vec2(uAspect, 1.0);
        float edge = 1.0 - smoothstep(0.0, 0.012, min(e.x, e.y));
        float rim = pow(tilt, 2.0);
        col = mix(col, vec3(0.86, 0.93, 1.0), clamp(edge * 0.28 + rim * 0.22, 0.0, 0.6));
        col *= 1.0 - tilt * 0.12;                           // folds read as slightly darker glass
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
}

function makeMaterials(style) {
  if (STYLES[style]?.invisible) {
    if (!wallTex) drawWallpaper();
    return { front: invisibleMaterial(THREE.FrontSide), back: invisibleMaterial(THREE.BackSide), invisible: true };
  }
  textures.forEach((t) => t.dispose());
  const { front: fc, back: bc, bump } = makeRugCanvases(style, ASPECT);
  const ft = new THREE.CanvasTexture(fc);
  ft.colorSpace = THREE.SRGBColorSpace;
  ft.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const bt = new THREE.CanvasTexture(bc);
  bt.colorSpace = THREE.SRGBColorSpace;
  const bm = new THREE.CanvasTexture(bump);
  bm.wrapS = bm.wrapT = THREE.RepeatWrapping;
  bm.repeat.set(10, 10 / ASPECT);
  textures = [ft, bt, bm];
  return {
    front: new THREE.MeshStandardMaterial({ map: ft, bumpMap: bm, bumpScale: 0.6, roughness: 0.96, metalness: 0, side: THREE.FrontSide }),
    back: new THREE.MeshStandardMaterial({ map: bt, roughness: 1, metalness: 0, side: THREE.BackSide }),
  };
}

function buildRug({ keepPose = true, saved = null } = {}) {
  let cx = W * 0.5, cy = H * 0.55, angle = 0;
  if (keepPose && cloth) { ({ x: cx, y: cy } = cloth.centroid()); angle = cloth.angle(); }
  const width = SIZES[state.size] || SIZES.orta;
  cloth = new Cloth({ width, height: width / ASPECT, cx, cy, angle, nx: 40 });
  cloth.setWeight(W8());
  if (saved && saved.length === cloth.n * 3) {
    cloth.pos.set(saved);
    cloth.prev.set(saved);
  }

  if (front) { scene.remove(front, back); geom.dispose(); front.material.dispose(); back.material.dispose(); }
  geom = new THREE.BufferGeometry();
  const nx = cloth.nx, ny = cloth.ny;
  const uv = new Float32Array(cloth.n * 2);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const p = j * nx + i;
    uv[p * 2] = i / (nx - 1);
    uv[p * 2 + 1] = 1 - j / (ny - 1);
  }
  const index = [];
  for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1;
    // screen y is flipped into world y, so this winding faces the camera
    index.push(a, c, b, b, c, d);
  }
  geom.setIndex(index);
  geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cloth.n * 3), 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  const mats = makeMaterials(state.style);
  front = new THREE.Mesh(geom, mats.front);
  back = new THREE.Mesh(geom, mats.back);
  // The Invisible rug casts no shadow and takes none, or it would give itself away.
  front.castShadow = back.castShadow = front.receiveShadow = back.receiveShadow = !mats.invisible;
  pick = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  pick.visible = false;
  scene.add(front, back);
  buildFringe();
  syncGeometry();
  wake();
}

// ---------- fringe (püskül) ----------
// Wool fringe along the two short ends, like the warp threads of a real rug: threads leave the edge, are gathered
// into a knot a little way out, then fan loose to their tips. They lie on the floor and hang when the edge lifts.
let fringe = null;
const PER_BUNDLE = 4, PTS = 4; // threads per knot, points per thread

function fringeColor(style) {
  const P = STYLES[style] || {};
  return P.fringe || '#e8dcc2';
}

function buildFringe() {
  if (fringe) { scene.remove(fringe); fringe.geometry.dispose(); fringe.material.dispose(); fringe = null; }
  if (STYLES[state.style]?.invisible) return; // the Invisible rug has no tassels to give it away
  const ny = cloth.ny;
  const bundles = Math.max(8, Math.round(cloth.height / 13)); // knots per end
  const span = (ny - 1) / bundles;
  const threads = [];
  let seed = 12345; const R = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const side of [0, 1]) for (let b = 0; b < bundles; b++) {
    const tb = (b + 0.5) * span;
    for (let k = 0; k < PER_BUNDLE; k++) {
      const u = (k + 0.5) / PER_BUNDLE - 0.5; // -0.5..0.5 across the bundle
      threads.push({ side, tb, t0: Math.min(ny - 1, Math.max(0, tb + u * span * 0.8)), fan: u * 0.5 + (R() - 0.5) * 0.12,
                     len: 0.85 + R() * 0.3, wave: (R() - 0.5) * 0.18, shade: 0.88 + R() * 0.16 });
    }
  }
  const n = threads.length, V = PTS * 2;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * V * 3), 3));
  const col = new Float32Array(n * V * 3), base = new THREE.Color(fringeColor(state.style));
  const index = [];
  threads.forEach((th, i) => {
    for (let v = 0; v < V; v++) {
      const pt = v >> 1, sh = th.shade * (pt === 1 ? 0.8 : pt === 0 ? 0.9 : 1); // knot a bit darker
      const o = (i * V + v) * 3; col[o] = base.r * sh; col[o + 1] = base.g * sh; col[o + 2] = base.b * sh;
    }
    for (let q = 0; q < PTS - 1; q++) { const o = i * V + q * 2; index.push(o, o + 1, o + 2, o + 1, o + 3, o + 2); }
  });
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setIndex(index);
  fringe = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, side: THREE.DoubleSide }));
  fringe.castShadow = true;
  fringe.userData.threads = threads;
  scene.add(fringe);
}

const fv = { a: new THREE.Vector3(), b: new THREE.Vector3(), edge: new THREE.Vector3(), knot: new THREE.Vector3(), inner: new THREE.Vector3(),
  tan: new THREE.Vector3(), dir: new THREE.Vector3(), p: new THREE.Vector3(), d2: new THREE.Vector3() };

function syncFringe(arr) {
  if (!fringe) return;
  const { nx, ny } = cloth, threads = fringe.userData.threads, out = fringe.geometry.attributes.position.array;
  const L = cloth.width * 0.06, floor = cloth.floorZ + 0.4;
  const at = (i, j, v) => v.set(arr[(j * nx + i) * 3], arr[(j * nx + i) * 3 + 1], arr[(j * nx + i) * 3 + 2]);
  const edgeAt = (ci, t, v) => { const j0 = Math.min(ny - 2, Math.floor(t)), f = t - j0; return v.copy(at(ci, j0, fv.a)).lerp(at(ci, j0 + 1, fv.b), f); };
  const { edge, knot, inner, tan, dir, p, d2 } = fv;
  const W2 = [0.75, 1.15, 0.7, 0.45]; // half widths: thread, knot, thread, tip
  threads.forEach((th, ti) => {
    const ci = th.side ? nx - 1 : 0, ii = th.side ? nx - 2 : 1;
    const j0 = Math.min(ny - 2, Math.floor(th.tb));
    tan.copy(at(ci, j0 + 1, fv.a)).sub(at(ci, j0, fv.b)).normalize();
    knot.copy(edgeAt(ci, th.tb, knot)); inner.copy(edgeAt(ii, th.tb, inner));
    dir.copy(knot).sub(inner).normalize();                      // outward, in the rug's surface
    const len = L * th.len;
    const lift = Math.max(0, knot.z - floor), hang = Math.min(1, lift / (L * 1.1));
    const place = (v, s) => { // push a point that is s along the thread down when the edge is up in the air
      v.z -= s * hang * 0.95; if (v.z < floor) v.z = floor;
      return v;
    };
    // knot sits ~22% out from the edge, at the bundle's centre
    knot.addScaledVector(dir, len * 0.22 * (1 - hang * 0.8)); place(knot, len * 0.22);
    for (let k = 0; k < PTS; k++) {
      if (k === 0) p.copy(edgeAt(ci, th.t0, p));
      else if (k === 1) p.copy(knot);
      else {
        const s = k === 2 ? 0.55 : 1.0;                           // fraction of the loose tail
        d2.copy(dir).addScaledVector(tan, th.fan * s + th.wave * (k === 2 ? 1 : -0.6)).normalize();
        p.copy(knot).addScaledVector(d2, len * 0.78 * s * (1 - hang * 0.85));
        place(p, len * (0.22 + 0.78 * s));
      }
      // ribbon across the thread, in the rug's plane (along the edge)
      const w = W2[k], o = (ti * PTS * 2 + k * 2) * 3;
      out[o] = p.x - tan.x * w; out[o + 1] = p.y - tan.y * w; out[o + 2] = p.z + 0.05;
      out[o + 3] = p.x + tan.x * w; out[o + 4] = p.y + tan.y * w; out[o + 5] = p.z + 0.05;
    }
  });
  fringe.geometry.attributes.position.needsUpdate = true;
  fringe.geometry.computeVertexNormals();
  fringe.geometry.computeBoundingSphere();
}

function syncGeometry() {
  const arr = geom.attributes.position.array, p = cloth.pos;
  const hw = W / 2, hh = H / 2;
  for (let i = 0; i < cloth.n; i++) {
    const k = i * 3;
    arr[k] = p[k] - hw;
    arr[k + 1] = hh - p[k + 1];
    arr[k + 2] = p[k + 2];
  }
  geom.attributes.position.needsUpdate = true;
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  syncFringe(arr);
}

// ---------- picking ----------
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function hitTest(mx, my) {
  if (state.hidden) return null;
  ndc.set((mx / W) * 2 - 1, -(my / H) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObject(pick, false)[0];
  return hit || null;
}

// Screen point → world point on the horizontal plane at height z (screen coords).
const tmpPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const tmpV = new THREE.Vector3();
function screenToPlane(mx, my, z) {
  ndc.set((mx / W) * 2 - 1, -(my / H) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  tmpPlane.constant = -z;
  if (!raycaster.ray.intersectPlane(tmpPlane, tmpV)) return { x: mx, y: my };
  return { x: tmpV.x + W / 2, y: H / 2 - tmpV.y };
}

// ---------- interaction ----------
let grab = null; // { i, z, offX, offY }
let over = false;
let mouse = { x: -1, y: -1 };

function setOver(v, force = false) {
  if (v === over && !force) return;
  over = v;
  document.body.classList.toggle('over', v);
  api?.setIgnoreMouse(!v);
}

// Cursor position and left-button state polled by the main process. Windows sometimes stops
// sending mouse events to a click-through window (after a menu, an overlay or a focus change), so
// hover, dragging and letting go all keep working from this even when those events are missing.
let polledDown = false, pendingStart = 0, pollSeesButton = false;
function onCursor(p) {
  mouse = { x: p.x, y: p.y };
  const down = p.down, wasDown = polledDown;
  if (down !== null && down !== undefined) polledDown = down;
  if (down) pollSeesButton = true; // only trust "button up" from a poll that has ever seen it down
  if (grab) {
    // Let go when the button is up. Ignore the first moments of a grab: the poll can lag behind
    // the pointerdown event that started it.
    if (down === false && pollSeesButton && performance.now() - grab.at > 150) endGrab(); else wake();
    return;
  }
  const hit = hitTest(p.x, p.y);
  setOver(!!hit);
  // Pressed over the rug but no pointerdown arrived: start the drag from the poll instead.
  if (down && !wasDown && hit && p.free !== false) {
    clearTimeout(pendingStart);
    const sx = p.x, sy = p.y;
    pendingStart = setTimeout(() => { if (!grab && polledDown) startGrab(sx, sy); }, 60);
  }
}

window.addEventListener('pointermove', (e) => {
  mouse = { x: e.clientX, y: e.clientY };
  if (grab && e.buttons === 0) { endGrab(); return; } // missed a mouse-up
  if (grab) { wake(); return; }
  setOver(!!hitTest(e.clientX, e.clientY));
});

window.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  mouse = { x: e.clientX, y: e.clientY };
  if (!startGrab(e.clientX, e.clientY)) return;
  try { e.target.setPointerCapture?.(e.pointerId); } catch {}
});

function startGrab(mx, my) {
  if (grab) return true;
  const hit = hitTest(mx, my);
  if (!hit) return false;
  clearTimeout(pendingStart);
  const f = hit.face;
  const cands = [f.a, f.b, f.c];
  let best = cands[0], bd = Infinity;
  const pa = geom.attributes.position.array;
  for (const c of cands) {
    const d = (pa[c * 3] - hit.point.x) ** 2 + (pa[c * 3 + 1] - hit.point.y) ** 2 + (pa[c * 3 + 2] - hit.point.z) ** 2;
    if (d < bd) { bd = d; best = c; }
  }
  const k = best * 3;
  grab = { i: best, z: cloth.pos[k + 2], startZ: cloth.pos[k + 2], t: 0, x: cloth.pos[k], y: cloth.pos[k + 1], at: performance.now() };
  document.body.classList.add('grabbing');
  api?.setIgnoreMouse(false);
  wake();
  return true;
}

function endGrab() {
  if (!grab) return;
  grab = null;
  cloth.releasePin();
  checkTangle = true;
  document.body.classList.remove('grabbing');
  setOver(!!hitTest(mouse.x, mouse.y));
  wake();
}
window.addEventListener('pointerup', endGrab);
window.addEventListener('pointercancel', endGrab);
window.addEventListener('blur', endGrab);

window.addEventListener('dblclick', (e) => {
  if (hitTest(e.clientX, e.clientY)) flatten();
});

window.addEventListener('wheel', (e) => {
  if (!hitTest(e.clientX, e.clientY)) return;
  e.preventDefault();
  if (e.ctrlKey) {
    const order = ['kucuk', 'orta', 'buyuk'];
    const i = order.indexOf(state.size) + (e.deltaY < 0 ? 1 : -1);
    if (i >= 0 && i < order.length) { state.size = order[i]; buildRug(); save(); }
  } else {
    cloth.rotate(Math.sign(e.deltaY) * 0.06);
    wake();
  }
}, { passive: false });

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (hitTest(e.clientX, e.clientY)) api?.showMenu();
});

function flatten() {
  const { x, y } = cloth.centroid();
  const a = cloth.angle();
  cloth.layFlat(x, y, a);
  // a little drop so it settles visibly
  for (let i = 0; i < cloth.n; i++) cloth.pos[i * 3 + 2] += 40;
  cloth.prev.set(cloth.pos);
  wake();
}

function center() {
  const { x, y } = cloth.centroid();
  cloth.translate(W / 2 - x, H * 0.55 - y);
  wake();
}

// ---------- simulation loop (sleeps when still) ----------
let awake = false, still = 0, last = 0, acc = 0, checkTangle = false;
const DT = 1 / 120;

function wake() {
  still = 0;
  if (!awake) { awake = true; last = performance.now(); requestAnimationFrame(frame); }
}

function frame(now) {
  let elapsed = Math.min(0.05, (now - last) / 1000);
  last = now;
  acc += elapsed;
  let moved = 0;
  while (acc >= DT) {
    if (grab) {
      const w = W8();
      grab.t = Math.min(1, grab.t + DT * 4);
      const ease = 1 - Math.pow(1 - grab.t, 3);
      grab.z = grab.startZ + (w.lift - grab.startZ) * ease;
      const target = screenToPlane(mouse.x, mouse.y, grab.z);
      const f = 1 - Math.exp(-DT * w.follow);
      grab.x += (target.x - grab.x) * f;
      grab.y += (target.y - grab.y) * f;
      cloth.setPin(grab.i, grab.x, grab.y, grab.z, w.pin);
    }
    moved = Math.max(moved, cloth.step(DT));
    acc -= DT;
  }
  syncGeometry();
  renderer.render(scene, camera);

  if (!grab && moved < 0.02) still++; else still = 0;
  if (still > 45 && checkTangle) {
    // Let go and it settled as a heap (twisted round and round): lay it back out flat.
    checkTangle = false;
    if (cloth.maxHeight() > cloth.collideDist * 5) { flatten(); requestAnimationFrame(frame); return; }
  }
  if (still > 45) {
    awake = false;
    save();
    return;
  }
  requestAnimationFrame(frame);
}

// ---------- persistence & commands ----------
let saveTimer = 0;
function save() {
  if (!api) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    api.saveState({ ...state, pos: Array.from(cloth.pos, (v) => Math.round(v * 10) / 10), screen: [W, H] });
  }, 300);
}

function applyHidden() {
  front.visible = back.visible = !state.hidden;
  if (state.hidden) { endGrab(); setOver(false); }
  wake();
}

// Bring the rug back onto the screen if it ended up (mostly) outside it.
function ensureOnScreen() {
  const { x, y } = cloth.centroid();
  if (x < 40 || y < 40 || x > W - 40 || y > H - 40) center();
}

function command(cmd, arg) {
  switch (cmd) {
    case 'style': if (STYLES[arg]) { state.style = arg; buildRug(); } break;
    case 'size': if (SIZES[arg]) { state.size = arg; buildRug(); } break;
    case 'flatten': flatten(); break;
    case 'center': center(); break;
    case 'hide': state.hidden = true; applyHidden(); break;
    case 'show': state.hidden = false; applyHidden(); ensureOnScreen(); break;
    case 'weight': if (WEIGHTS[arg]) { state.weight = arg; cloth.setWeight(W8()); } break;
    case 'layout': layout(); syncGeometry(); if (wallTex) drawWallpaper(); wake(); break;
    case 'wallpaper': setWallpaper(arg); return;
    case 'cursor': onCursor(arg); return;
    case 'redraw': wake(); return;
    case 'reset-input': endGrab(); setOver(!!hitTest(mouse.x, mouse.y), true); return;
  }
  save();
  api?.reportState({ style: state.style, size: state.size, weight: state.weight });
}

window.addEventListener('resize', () => command('layout'));
if (!api) window.__dcCommand = command; // plain-browser preview: lets a test page drive the rug

(async () => {
  let saved = null;
  if (api) {
    try { saved = await api.loadState(); } catch {}
    api.onCommand(command);
  }
  if (saved) {
    if (STYLES[saved.style]) state.style = saved.style;
    if (SIZES[saved.size]) state.size = saved.size;
    if (WEIGHTS[saved.weight]) state.weight = saved.weight;
  }
  state.hidden = false; // opening the app always shows the rug
  const sameScreen = saved?.screen && saved.screen[0] === W && saved.screen[1] === H;
  buildRug({ keepPose: false, saved: sameScreen && saved.pos ? Float32Array.from(saved.pos) : null });
  if (!saved?.pos) flatten();
  applyHidden();
  ensureOnScreen();
  api?.reportState({ style: state.style, size: state.size, weight: state.weight });
})();

// test hooks for automated preview
window.__halim = { command, get cloth() { return cloth; }, wake };
