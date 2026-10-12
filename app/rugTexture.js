// Procedural rug textures. Everything is drawn with Canvas 2D, no image assets.
import { makeSiteRugCanvases } from './siteRugs.js';

export const STYLES = {
  // Monthly drops, drawn with the same code as desktopcarpet.com
  tabriz:  { name: 'Tabriz After Midnight', site: 101 },
  klasik:  { name: 'Klasik Kırmızı', field: '#8a1a1c', field2: '#741417', navy: '#1b2140', cream: '#e8d6b0', gold: '#c4914a', blue: '#3a5878', dark: '#110e18' },
  lacivert:{ name: 'Gece Mavisi',   field: '#1c2a4c', field2: '#16223f', navy: '#7d1a1e', cream: '#e6d5b3', gold: '#c9a35a', blue: '#4f7aa0', dark: '#0d0d17' },
  zumrut:  { name: 'Zümrüt',        field: '#1f4a3a', field2: '#183d30', navy: '#3a1820', cream: '#ecdcb8', gold: '#c99b4e', blue: '#8a2a2a', dark: '#0e1412' },
  kilim:   { name: 'Kilim',         kilim: true },
  // Halloween drops
  balkabagi:{ name: 'Balkabağı Tarlası', halloween: 'pumpkin' },
  orumcek:  { name: 'Örümcek Ağı',       halloween: 'web' },
  hayalet:  { name: 'Hayalet Gecesi',    halloween: 'ghost' },
  // USA pack. Woven / pieced / knotted:
  yildizlar: { name: 'Yıldızlar ve Çizgiler', america: 'flag' },
  mesa:      { name: 'Çöl Mesası',            america: 'mesa' },
  yorgan:    { name: 'Yama Yorgan',           america: 'quilt' },
  ekose:     { name: 'Oduncu Ekose',          america: 'plaid' },
  kanyon:    { name: 'Kanyon Gün Batımı',     america: 'canyon' },
  ambar:     { name: 'Ambar Yıldızı',         america: 'hex' },
  yalniz:    { name: 'Yalnız Yıldız',         america: 'lonestar' },
  bizon:     { name: 'Bizon Ovası',           america: 'bison' },
  // ...and hooked rugs (pictures made of wool loops):
  kartpostal:{ name: 'Amerika’dan Selamlar', america: 'postcard', fonts: true, hooked: true },
  millipark: { name: 'Ulusal Park',          america: 'park', fonts: true, hooked: true },
  beyzbol:   { name: 'Beyzbol Sahası',       america: 'baseball', hooked: true },
  basketbol: { name: 'Basketbol Sahası',     america: 'basketball', hooked: true },
  diner:     { name: 'Diner',                america: 'diner', fonts: true, hooked: true },
  route66:   { name: 'Route 66',             america: 'route66', fonts: true, hooked: true },
  // Canada pack. Woven / pieced / knotted:
  akcaagac:  { name: 'Akçaağaç',            canada: 'flag' },
  yaprak:    { name: 'Akçaağaç Yorganı',    canada: 'quilt' },
  kayalik:   { name: 'Kayalık Dağlar',      canada: 'rockies' },
  atlantik:  { name: 'Atlantik Ekosesi',    canada: 'tartan' },
  geyik:     { name: 'Kanada Geyiği',       canada: 'moose' },
  kazlar:    { name: 'Kanada Kazları',      canada: 'geese' },
  dalgic:    { name: 'Buz Dalgıcı',         canada: 'loon' },
  // ...and hooked rugs:
  kanadakart:{ name: 'Kanada’dan Selamlar', canada: 'postcard', fonts: true, hooked: true },
  hokey:     { name: 'Hokey Sahası',        canada: 'hockey', hooked: true },
  kuzeyisik: { name: 'Kuzey Işıkları',      canada: 'aurora', hooked: true },
  fener:     { name: 'Deniz Feneri',        canada: 'lighthouse', hooked: true },
  kutupayisi:{ name: 'Kutup Ayısı',         canada: 'bear', hooked: true },
  // Mexico pack. Woven / knotted:
  sarape:    { name: 'Sarape',              mexico: 'sarape' },
  greca:     { name: 'Greca',               mexico: 'greca' },
  cini:      { name: 'Mavi Çini',           mexico: 'tile' },
  agave:     { name: 'Agave Tarlası',       mexico: 'agave' },
  kafatasi:  { name: 'Şeker Kafatası',      mexico: 'skull' },
  monark:    { name: 'Monark Kelebekleri',  mexico: 'monarch' },
  jaguar:    { name: 'Renkli Jaguar',       mexico: 'jaguar' },
  // ...and hooked rugs:
  meksikakart:{ name: 'Meksika’dan Selamlar', mexico: 'postcard', fonts: true, hooked: true },
  piramit:   { name: 'Piramit',             mexico: 'pyramid', hooked: true },
  sokak:     { name: 'Renkli Sokak',        mexico: 'street', hooked: true },
  trajinera: { name: 'Trajinera',           mexico: 'trajinera', hooked: true },
  tulum:     { name: 'Tulum Plajı',         mexico: 'tulum', hooked: true },
  // Persia pack: knotted rugs from the carpet heartland
  heriz:     { name: 'Heriz',               persia: 'heriz' },
  bahce:     { name: 'Cennet Bahçesi',      persia: 'garden' },
  av:        { name: 'Av Sahnesi',          persia: 'hunt' },
  hayat:     { name: 'Hayat Ağacı',         persia: 'tree' },
  buta:      { name: 'Buta',                persia: 'boteh' },
  bahtiyari: { name: 'Bahtiyari',           persia: 'bakhtiari' },
  gabbe:     { name: 'Kaşkay Gabbe',        persia: 'gabbeh' },
  nain:      { name: 'Nain',                persia: 'nain' },
  vazo:      { name: 'Kirman Vazo',         persia: 'vase' },
  herati:    { name: 'Herati',              persia: 'herati' },
  kum:       { name: 'Kum İpeği',           persia: 'qom', silk: true },
  turkmen:   { name: 'Türkmen Gülü',        persia: 'turkmen' },
  // Türkiye pack. Knotted Anatolian rugs:
  usak:      { name: 'Uşak Madalyon',       turkiye: 'usak' },
  lotto:     { name: 'Lotto',               turkiye: 'lotto' },
  bergama:   { name: 'Bergama',             turkiye: 'bergama' },
  yagcibedir:{ name: 'Yağcıbedir',          turkiye: 'yagcibedir' },
  selcuklu:  { name: 'Selçuklu',            turkiye: 'seljuk' },
  hereke:    { name: 'Hereke İpeği',        turkiye: 'hereke', silk: true },
  iznik:     { name: 'İznik Lalesi',        turkiye: 'iznik' },
  // ...and hooked rugs:
  turkiyekart:{ name: 'Türkiye’den Selamlar', turkiye: 'postcard', fonts: true, hooked: true },
  kapadokya: { name: 'Kapadokya Balonları', turkiye: 'cappadocia', hooked: true },
  bogaz:     { name: 'Boğaz Vapuru',        turkiye: 'bosphorus', hooked: true },
  pamukkale: { name: 'Pamukkale',           turkiye: 'pamukkale', hooked: true },
  nazar:     { name: 'Nazar Boncuğu',       turkiye: 'nazar', hooked: true },
  // East Asia pack. Korea:
  bojagi:    { name: 'Bojagi',              korea: 'bojagi' },
  saekdong:  { name: 'Saekdong',            korea: 'saekdong' },
  seladon:   { name: 'Seladon Turnalar',    korea: 'celadon' },
  dancheong: { name: 'Dancheong',           korea: 'dancheong' },
  kaplan:    { name: 'Saksağan ve Kaplan',  korea: 'tiger', hooked: true },
  hanok:     { name: 'Hanok Çatıları',      korea: 'hanok', hooked: true },
  seul:      { name: 'Seul Gecesi',         korea: 'seoul', hooked: true },
  korekart:  { name: 'Kore’den Selamlar',   korea: 'postcard', fonts: true, hooked: true },
  hangeul:   { name: 'Hangeul',             korea: 'hangeul' },
  najeon:    { name: 'Sedef Kakma',         korea: 'najeon' },
  sipjang:   { name: 'On Uzun Ömür',        korea: 'longevity' },
  yeondeung: { name: 'Lotus Fenerleri',     korea: 'lanterns', hooked: true },
  bibimbap:  { name: 'Bibimbap',            korea: 'bibimbap', hooked: true },
  jeju:      { name: 'Jeju Adası',          korea: 'jeju', hooked: true },
  // East Asia pack. Japan:
  seigaiha:  { name: 'Seigaiha',            japan: 'seigaiha' },
  asanoha:   { name: 'Asanoha',             japan: 'asanoha' },
  boro:      { name: 'Boro',                japan: 'boro' },
  koi:       { name: 'Koi Havuzu',          japan: 'koi' },
  byobu:     { name: 'Altın Paravan',       japan: 'byobu' },
  fuji:      { name: 'Fuji ve Sakura',      japan: 'fuji', hooked: true },
  kyoto:     { name: 'Kyoto Sokağı',        japan: 'kyoto', hooked: true },
  japonkart: { name: 'Japonya’dan Selamlar', japan: 'postcard', fonts: true, hooked: true },
  shibori:   { name: 'Shibori',             japan: 'shibori' },
  zen:       { name: 'Zen Bahçesi',         japan: 'zen' },
  buyukdalga:{ name: 'Büyük Dalga',         japan: 'wave', hooked: true },
  manekineko:{ name: 'Maneki-neko',         japan: 'neko', hooked: true },
  torii:     { name: 'Torii Yolu',          japan: 'torii', hooked: true },
  sushi:     { name: 'Suşi',                japan: 'sushi', hooked: true },
  // East Asia pack. China:
  porselen:  { name: 'Mavi Beyaz Porselen', china: 'porcelain' },
  bulut:     { name: 'Uğurlu Bulutlar',     china: 'clouds' },
  artdeco:   { name: 'Şanghay Art Deco',    china: 'artdeco' },
  ningxia:   { name: 'Ningxia Şakayık',     china: 'ningxia' },
  bambu:     { name: 'Mürekkep Bambu',      china: 'bamboo' },
  panda:     { name: 'Panda',               china: 'panda', hooked: true },
  seddicin:  { name: 'Çin Seddi',           china: 'wall', hooked: true },
  cinkart:   { name: 'Çin’den Selamlar',    china: 'postcard', fonts: true, hooked: true },
  kagitkesim:{ name: 'Kağıt Kesme',         china: 'papercut' },
  imparator: { name: 'İmparator Dalgaları', china: 'imperial' },
  mahjong:   { name: 'Mahjong',             china: 'mahjong' },
  fenerfest: { name: 'Fener Bayramı',       china: 'lanterns', hooked: true },
  guilin:    { name: 'Guilin',              china: 'guilin', hooked: true },
  dimsum:    { name: 'Dim Sum',             china: 'dimsum', hooked: true },
  // Mediterranean pack. Italy:
  majolika:  { name: 'Majolika',           italy: 'majolica' },
  limon:     { name: 'Amalfi Limonları',   italy: 'lemons' },
  damask:    { name: 'Venedik Damaskı',    italy: 'damask' },
  mozaik:    { name: 'Roma Mozaiği',       italy: 'mosaic' },
  floransa:  { name: 'Floransa Ebrusu',    italy: 'marble' },
  venedik:   { name: 'Venedik',            italy: 'venice', hooked: true },
  toskana:   { name: 'Toskana',            italy: 'tuscany', hooked: true },
  cinqueterre:{ name: 'Cinque Terre',       italy: 'cinqueterre', hooked: true },
  pizza:     { name: 'Pizza',              italy: 'pizza', hooked: true },
  italyakart:{ name: 'İtalya’dan Selamlar',italy: 'postcard', fonts: true, hooked: true },
  murano:    { name: 'Murano Camı',        italy: 'murano' },
  makarna:   { name: 'Makarna',            italy: 'pasta' },
  sicilya:   { name: 'Sicilya Arabası',    italy: 'cart' },
  kolezyum:  { name: 'Kolezyum',           italy: 'colosseum', hooked: true },
  gelato:    { name: 'Gelato',             italy: 'gelato', hooked: true },
  romasokak: { name: 'Roma Sokağı',        italy: 'street', hooked: true },
  // Mediterranean pack. Greece:
  menderes:  { name: 'Menderes',           greece: 'meander' },
  amfora:    { name: 'Amfora',             greece: 'amphora' },
  zeytin:    { name: 'Zeytin Dalı',        greece: 'olive' },
  yunuslar:  { name: 'Yunuslar',           greece: 'dolphins' },
  bizans:    { name: 'Bizans Mozaiği',     greece: 'byzantine' },
  santorini: { name: 'Santorini',          greece: 'santorini', hooked: true },
  akropolis: { name: 'Akropolis',          greece: 'acropolis', hooked: true },
  liman:     { name: 'Balıkçı Limanı',     greece: 'harbor', hooked: true },
  mikonos:   { name: 'Mikonos',            greece: 'mykonos', hooked: true },
  yunankart: { name: 'Yunanistan’dan Selamlar',greece: 'postcard', fonts: true, hooked: true },
  ahtapot:   { name: 'Minos Ahtapotu',     greece: 'octopus' },
  skiros:    { name: 'Skiros Nakışı',      greece: 'skyros' },
  kirlangic: { name: 'Kırlangıç Freski',   greece: 'akrotiri' },
  knossos:   { name: 'Knossos',            greece: 'knossos', hooked: true },
  mavikapi:  { name: 'Mavi Kapı',          greece: 'door', hooked: true },
  yunansalata:{ name: 'Yunan Salatası',     greece: 'salad', hooked: true },
  // Mediterranean pack. Spain:
  azulejo:   { name: 'Azulejo',            spain: 'azulejo' },
  flamenko:  { name: 'Flamenko',           spain: 'flamenco' },
  manton:    { name: 'Manila Şalı',        spain: 'manton' },
  granada:   { name: 'Nar',                spain: 'pomegranate' },
  trencadis: { name: 'Trencadís',          spain: 'trencadis' },
  elhamra:   { name: 'Elhamra',            spain: 'alhambra', hooked: true },
  avlu:      { name: 'Endülüs Avlusu',     spain: 'patio', hooked: true },
  paella:    { name: 'Paella',             spain: 'paella', hooked: true },
  lamancha:  { name: 'La Mancha',          spain: 'lamancha', hooked: true },
  ispanyakart:{ name: 'İspanya’dan Selamlar',spain: 'postcard', fonts: true, hooked: true },
  dantel:    { name: 'Mantilla Dantel',    spain: 'lace' },
  gitar:     { name: 'İspanyol Gitarı',    spain: 'guitar' },
  kastanyet: { name: 'Kastanyet',          spain: 'castanets' },
  parkguell: { name: 'Park Güell',         spain: 'guell', hooked: true },
  tapas:     { name: 'Tapas',              spain: 'tapas', hooked: true },
  portakal:  { name: 'Valensiya Portakalları',spain: 'oranges', hooked: true },
  // Mediterranean pack. France:
  lavanta:   { name: 'Lavanta Tarlası',    france: 'lavender', hooked: true },
  provence:  { name: 'Provence Basması',   france: 'provencal' },
  riviera:   { name: 'Riviera',            france: 'riviera', hooked: true },
  aycicegi:  { name: 'Ayçiçekleri',        france: 'sunflowers', hooked: true },
  petank:    { name: 'Petank',             france: 'petanque', hooked: true },
  pazar:     { name: 'Provence Pazarı',    france: 'market', hooked: true },
  tomette:   { name: 'Tomette',            france: 'tomette' },
  cigale:    { name: 'Ağustos Böceği',     france: 'cicadas' },
  kalanka:   { name: 'Kalanklar',          france: 'calanques', hooked: true },
  fransakart:{ name: 'Fransa’dan Selamlar',france: 'postcard', fonts: true, hooked: true },
  mimoza:    { name: 'Mimoza',             france: 'mimosa' },
  toile:     { name: 'Toile Deseni',       france: 'toile' },
  moustiers: { name: 'Moustiers Fayansı',  france: 'moustiers' },
  mavisandalye:{ name: 'Mavi Sandalyeler',   france: 'chairs', hooked: true },
  roussillon:{ name: 'Roussillon',         france: 'ochre', hooked: true },
  camargue:  { name: 'Camargue Atları',    france: 'camargue', hooked: true },
  // Shows whatever wallpaper is behind it, so the desktop icons underneath seem to vanish.
  gorunmez:{ name: 'Görünmez',      invisible: true },
};

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Lobed, diamond-ish closed shape around (cx, cy).
function lobed(ctx, cx, cy, rx, ry, lobes, amp, p = 1.25, rot = 0) {
  ctx.beginPath();
  const N = 360;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const c = Math.cos(t), s = Math.sin(t);
    const base = 1 / Math.pow(Math.pow(Math.abs(c), p) + Math.pow(Math.abs(s), p), 1 / p);
    const r = base * (1 + amp * Math.cos(lobes * t + rot));
    const x = cx + c * r * rx, y = cy + s * r * ry;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function rosette(ctx, x, y, r, petals, c1, c2, c3) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = c1;
  for (let i = 0; i < petals; i++) {
    ctx.rotate((Math.PI * 2) / petals);
    ctx.beginPath();
    ctx.ellipse(r * 0.55, 0, r * 0.48, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = c2;
  ctx.beginPath(); ctx.arc(0, 0, r * 0.36, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = c3;
  ctx.beginPath(); ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function leaf(ctx, x, y, len, ang, col, vein) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.5, -len * 0.32, len, 0);
  ctx.quadraticCurveTo(len * 0.5, len * 0.32, 0, 0);
  ctx.fill();
  if (vein) {
    ctx.strokeStyle = vein; ctx.lineWidth = Math.max(1, len * 0.05);
    ctx.beginPath(); ctx.moveTo(len * 0.1, 0); ctx.lineTo(len * 0.85, 0); ctx.stroke();
  }
  ctx.restore();
}

function palmette(ctx, x, y, r, ang, c1, c2) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang);
  ctx.fillStyle = c1;
  ctx.beginPath();
  ctx.moveTo(0, r * 0.2);
  for (let i = 0; i <= 6; i++) {
    const a = -Math.PI * 0.85 + (i / 6) * Math.PI * 0.7;
    const rr = r * (i % 2 ? 0.75 : 1);
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = c2;
  ctx.beginPath(); ctx.ellipse(0, -r * 0.35, r * 0.22, r * 0.38, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// Draw `fn(x, y, sx, sy)` in all four mirrored quadrants.
function mirror4(W, H, x, y, fn) {
  fn(x, y, 1, 1);
  fn(W - x, y, -1, 1);
  fn(x, H - y, 1, -1);
  fn(W - x, H - y, -1, -1);
}

function frameRect(ctx, x, y, w, h, t) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.rect(x + t, y + t, w - 2 * t, h - 2 * t);
  ctx.fill('evenodd');
}

// Positions along the centre line of a rectangular band, evenly spaced.
function bandPoints(x, y, w, h, step) {
  const pts = [];
  const nx = Math.max(2, Math.round(w / step)), ny = Math.max(2, Math.round(h / step));
  for (let i = 0; i <= nx; i++) { pts.push([x + (w * i) / nx, y, 0, i]); pts.push([x + (w * i) / nx, y + h, 0, i]); }
  for (let j = 1; j < ny; j++) { pts.push([x, y + (h * j) / ny, 1, j]); pts.push([x + w, y + (h * j) / ny, 1, j]); }
  return pts;
}

function persian(ctx, W, H, P, seed) {
  const R = rng(seed);
  const u = H / 100; // unit

  // Base
  ctx.fillStyle = P.dark; ctx.fillRect(0, 0, W, H);

  // Outer binding + minor border
  let o = 1.2 * u;
  ctx.fillStyle = P.navy; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 4 * u);
  for (const [px, py] of bandPoints(o + 2 * u, o + 2 * u, W - 2 * o - 4 * u, H - 2 * o - 4 * u, 5 * u)) {
    rosette(ctx, px, py, 1.5 * u, 6, P.field, P.cream, P.gold);
  }
  o += 4 * u;
  // guard stripe with dots
  ctx.fillStyle = P.cream; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 0.5 * u);
  o += 0.5 * u;
  ctx.fillStyle = P.field; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 1.4 * u);
  ctx.fillStyle = P.cream;
  for (const [px, py] of bandPoints(o + 0.7 * u, o + 0.7 * u, W - 2 * o - 1.4 * u, H - 2 * o - 1.4 * u, 2 * u)) {
    ctx.beginPath(); ctx.arc(px, py, 0.35 * u, 0, Math.PI * 2); ctx.fill();
  }
  o += 1.4 * u;
  ctx.fillStyle = P.cream; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 0.5 * u);
  o += 0.5 * u;

  // Main border: dark band with vine, palmettes and rosettes
  const mb = 7.5 * u;
  ctx.fillStyle = P.navy; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, mb);
  const bx = o + mb / 2, by = o + mb / 2, bw = W - 2 * o - mb, bh = H - 2 * o - mb;
  // wavy vine around the band
  ctx.strokeStyle = P.gold; ctx.lineWidth = 0.45 * u;
  const vine = (x0, y0, x1, y1, n) => {
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      const nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny);
      const off = Math.sin(t * n * Math.PI * 2) * 1.9 * u;
      i ? ctx.lineTo(x + (nx / L) * off, y + (ny / L) * off) : ctx.moveTo(x + (nx / L) * off, y + (ny / L) * off);
    }
    ctx.stroke();
  };
  const ncx = Math.round(bw / (11 * u)), ncy = Math.round(bh / (11 * u));
  vine(bx, by, bx + bw, by, ncx); vine(bx, by + bh, bx + bw, by + bh, ncx);
  vine(bx, by, bx, by + bh, ncy); vine(bx + bw, by, bx + bw, by + bh, ncy);
  const pts = bandPoints(bx, by, bw, bh, 5.5 * u);
  const st = 5.5 * u;
  pts.forEach(([px, py, vert, ix]) => {
    const par = ix % 2;
    const corner = (Math.abs(px - bx) < 1 || Math.abs(px - bx - bw) < 1) && (Math.abs(py - by) < 1 || Math.abs(py - by - bh) < 1);
    if (par === 0 || corner) {
      rosette(ctx, px, py, 2.6 * u, 8, P.cream, P.field, P.gold);
    } else {
      const ang = vert ? (px < W / 2 ? 0 : Math.PI) : (py < H / 2 ? Math.PI / 2 : -Math.PI / 2);
      palmette(ctx, px, py, 2.2 * u, ang, P.field, P.gold);
      leaf(ctx, px, py, 2.4 * u, ang + 2.2, P.blue);
      leaf(ctx, px, py, 2.4 * u, ang - 2.2, P.blue);
    }
  });
  o += mb;
  ctx.fillStyle = P.cream; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 0.5 * u);
  o += 0.5 * u;
  // inner guard: small zigzag
  ctx.fillStyle = P.navy; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 1.3 * u);
  ctx.fillStyle = P.field;
  for (const [px, py] of bandPoints(o + 0.65 * u, o + 0.65 * u, W - 2 * o - 1.3 * u, H - 2 * o - 1.3 * u, 1.6 * u)) {
    ctx.save(); ctx.translate(px, py); ctx.rotate(Math.PI / 4);
    ctx.fillRect(-0.35 * u, -0.35 * u, 0.7 * u, 0.7 * u); ctx.restore();
  }
  o += 1.3 * u;

  // Field
  const fx = o, fy = o, fw = W - 2 * o, fh = H - 2 * o;
  ctx.save();
  ctx.beginPath(); ctx.rect(fx, fy, fw, fh); ctx.clip();
  ctx.fillStyle = P.field; ctx.fillRect(fx, fy, fw, fh);
  // abrash: subtle horizontal dye variation
  for (let i = 0; i < 14; i++) {
    const yy = fy + R() * fh, hh = (2 + R() * 6) * u;
    ctx.fillStyle = R() < 0.5 ? P.field2 : 'rgba(255,255,255,0.03)';
    ctx.globalAlpha = 0.35 + R() * 0.3;
    ctx.fillRect(fx, yy, fw, hh);
  }
  ctx.globalAlpha = 1;

  const cx = W / 2, cy = H / 2;

  // Vines scattered through the field (mirrored)
  ctx.strokeStyle = P.gold; ctx.lineWidth = 0.35 * u; ctx.globalAlpha = 0.8;
  for (let i = 0; i < 16; i++) {
    const x0 = fx + R() * fw / 2, y0 = fy + R() * fh / 2;
    const x1 = x0 + (R() - 0.5) * 30 * u, y1 = y0 + (R() - 0.5) * 30 * u;
    const kx = (x0 + x1) / 2 + (R() - 0.5) * 20 * u, ky = (y0 + y1) / 2 + (R() - 0.5) * 20 * u;
    mirror4(W, H, 0, 0, (_, __, sx, sy) => {
      const m = (x, ax) => (sx > 0 ? x : W - x);
      const n = (y) => (sy > 0 ? y : H - y);
      ctx.beginPath(); ctx.moveTo(m(x0), n(y0)); ctx.quadraticCurveTo(m(kx), n(ky), m(x1), n(y1)); ctx.stroke();
    });
  }
  ctx.globalAlpha = 1;

  // Small motifs scattered (mirrored); skip the medallion zone.
  const motifs = [];
  for (let tries = 0; tries < 900 && motifs.length < 70; tries++) {
    const x = fx + 2 * u + R() * (fw / 2 - 2 * u), y = fy + 2 * u + R() * (fh / 2 - 2 * u);
    const dx = (x - cx) / (fw * 0.3), dy = (y - cy) / (fh * 0.36);
    if (Math.abs(dx) + Math.abs(dy) < 1.05) continue;
    if (motifs.some((m) => Math.hypot(m.x - x, m.y - y) < 5.2 * u)) continue;
    motifs.push({ x, y, k: R(), a: R() * Math.PI * 2, r: (1.4 + R() * 1.6) * u });
  }
  for (const m of motifs) {
    mirror4(W, H, m.x, m.y, (x, y, sx, sy) => {
      const ang = Math.atan2(Math.sin(m.a) * sy, Math.cos(m.a) * sx);
      if (m.k < 0.35) rosette(ctx, x, y, m.r, 6 + (m.k * 20 | 0) % 3 * 2, P.cream, P.navy, P.gold);
      else if (m.k < 0.6) { palmette(ctx, x, y, m.r, ang, P.navy, P.cream); }
      else if (m.k < 0.85) { leaf(ctx, x, y, m.r * 1.8, ang, P.blue, P.cream); leaf(ctx, x, y, m.r * 1.4, ang + 1.4, P.navy); }
      else { ctx.fillStyle = P.gold; ctx.beginPath(); ctx.arc(x, y, m.r * 0.45, 0, Math.PI * 2); ctx.fill(); }
    });
  }

  // Corner spandrels
  const sp = (x, y) => {
    lobed(ctx, x, y, fw * 0.24, fh * 0.32, 10, 0.07, 1.4);
    ctx.fillStyle = P.cream; ctx.fill();
    lobed(ctx, x, y, fw * 0.24 - 1.2 * u, fh * 0.32 - 1.2 * u, 10, 0.07, 1.4);
    ctx.fillStyle = P.navy; ctx.fill();
  };
  sp(fx, fy); sp(fx + fw, fy); sp(fx, fy + fh); sp(fx + fw, fy + fh);
  for (let i = 0; i < 18; i++) {
    const a = R() * Math.PI / 2, d = (0.25 + R() * 0.6);
    const x = fx + Math.cos(a) * fw * 0.2 * d, y = fy + Math.sin(a) * fh * 0.27 * d;
    const k = R();
    mirror4(W, H, x, y, (px, py, sx, sy) => {
      if (k < 0.5) rosette(ctx, px, py, 1.6 * u, 8, P.field, P.cream, P.gold);
      else leaf(ctx, px, py, 3 * u, Math.atan2(sy * Math.sin(a), sx * Math.cos(a)), P.blue, P.cream);
    });
  }

  // Cream arabesque ring around the medallion
  lobed(ctx, cx, cy, fw * 0.36, fh * 0.44, 14, 0.06, 1.15);
  ctx.fillStyle = P.cream; ctx.fill();
  lobed(ctx, cx, cy, fw * 0.36 - 1.6 * u, fh * 0.44 - 1.6 * u, 14, 0.06, 1.15);
  ctx.fillStyle = P.field; ctx.fill();
  // motifs inside the ring
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    const x = cx + Math.cos(a) * fw * 0.29, y = cy + Math.sin(a) * fh * 0.32;
    if (i % 2) rosette(ctx, x, y, 1.5 * u, 6, P.cream, P.navy, P.gold);
    else leaf(ctx, x, y, 3 * u, a + Math.PI / 2, P.blue, P.cream);
  }

  // Pendants on the long axis
  for (const s of [-1, 1]) {
    const px = cx + s * fw * 0.255;
    lobed(ctx, px, cy, 4.5 * u, 3.4 * u, 6, 0.12, 1.2);
    ctx.fillStyle = P.cream; ctx.fill();
    lobed(ctx, px, cy, 3.5 * u, 2.4 * u, 6, 0.12, 1.2);
    ctx.fillStyle = P.navy; ctx.fill();
    rosette(ctx, px, cy, 1.6 * u, 6, P.gold, P.field, P.cream);
  }

  // Central medallion, layered
  lobed(ctx, cx, cy, fw * 0.215, fh * 0.31, 12, 0.08, 1.05);
  ctx.fillStyle = P.cream; ctx.fill();
  lobed(ctx, cx, cy, fw * 0.215 - 1.1 * u, fh * 0.31 - 1.1 * u, 12, 0.08, 1.05);
  ctx.fillStyle = P.navy; ctx.fill();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const x = cx + Math.cos(a) * fw * 0.165, y = cy + Math.sin(a) * fh * 0.235;
    ctx.fillStyle = P.cream; ctx.beginPath(); ctx.arc(x, y, 0.55 * u, 0, Math.PI * 2); ctx.fill();
  }
  lobed(ctx, cx, cy, fw * 0.14, fh * 0.2, 8, 0.1, 1.0);
  ctx.fillStyle = P.field; ctx.fill();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    palmette(ctx, cx + Math.cos(a) * fw * 0.1, cy + Math.sin(a) * fh * 0.13, 2 * u, a + Math.PI / 2, P.navy, P.gold);
  }
  lobed(ctx, cx, cy, fw * 0.065, fh * 0.095, 8, 0.12, 1.0);
  ctx.fillStyle = P.cream; ctx.fill();
  lobed(ctx, cx, cy, fw * 0.05, fh * 0.072, 8, 0.12, 1.0);
  ctx.fillStyle = P.navy; ctx.fill();
  rosette(ctx, cx, cy, 3.4 * u, 8, P.cream, P.field, P.gold);
  ctx.restore();
}

function kilim(ctx, W, H) {
  const C = { red: '#a3262a', rust: '#c2562a', navy: '#1e2747', cream: '#eadcbc', gold: '#d3a23f', green: '#3e6b4f', dark: '#1a1414' };
  const s = Math.round(H / 64); // block size
  ctx.fillStyle = C.red; ctx.fillRect(0, 0, W, H);
  const blk = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x * s, y * s, s + 0.5, s + 0.5); };
  const cols = Math.floor(W / s), rows = Math.floor(H / s);

  // Border: zigzag triangles
  const bw = 7;
  ctx.fillStyle = C.navy;
  ctx.fillRect(0, 0, W, bw * s); ctx.fillRect(0, H - bw * s, W, bw * s);
  ctx.fillRect(0, 0, bw * s, H); ctx.fillRect(W - bw * s, 0, bw * s, H);
  for (let x = 0; x < cols; x++) {
    const h = 3 - Math.abs((x % 6) - 3);
    for (let k = 0; k <= h; k++) { blk(x, 2 + k, C.gold); blk(x, rows - 3 - k, C.gold); }
  }
  for (let y = 0; y < rows; y++) {
    const h = 3 - Math.abs((y % 6) - 3);
    for (let k = 0; k <= h; k++) { blk(2 + k, y, C.gold); blk(cols - 3 - k, y, C.gold); }
  }
  ctx.fillStyle = C.cream;
  ctx.fillRect(bw * s, bw * s, W - 2 * bw * s, s); ctx.fillRect(bw * s, H - (bw + 1) * s, W - 2 * bw * s, s);
  ctx.fillRect(bw * s, bw * s, s, H - 2 * bw * s); ctx.fillRect(W - (bw + 1) * s, bw * s, s, H - 2 * bw * s);

  // Stepped diamond with hooks
  const diamond = (cx, cy, n, palette) => {
    for (let dy = -n; dy <= n; dy++) {
      const w = n - Math.abs(dy);
      for (let dx = -w; dx <= w; dx++) {
        const ring = Math.max(Math.abs(dx) + Math.abs(dy), 0);
        const c = palette[Math.floor((n - ring) / 2) % palette.length];
        blk(cx + dx, cy + dy, c);
      }
    }
    // hooks at the tips
    for (const [hx, hy, ox, oy] of [[cx + n + 1, cy, 1, 0], [cx - n - 1, cy, -1, 0], [cx, cy - n - 1, 0, -1], [cx, cy + n + 1, 0, 1]]) {
      blk(hx, hy, palette[0]); blk(hx + ox, hy + oy, palette[0]);
      blk(hx + ox + oy, hy + oy + ox, palette[0]); blk(hx + ox - oy, hy + oy - ox, palette[0]);
    }
  };
  const ix = bw + 1, iy = bw + 1, iw = cols - 2 * ix, ih = rows - 2 * iy;
  // three large medallions along the long axis
  const midY = iy + Math.floor(ih / 2);
  const n = Math.min(Math.floor(ih / 2) - 5, Math.floor(iw / 6) - 2);
  const step = Math.floor(iw / 3);
  [0, 1, 2].forEach((i) => {
    const cx = ix + Math.floor(step * (i + 0.5));
    diamond(cx, midY, n, i === 1 ? [C.navy, C.cream, C.rust, C.gold, C.green] : [C.cream, C.navy, C.gold, C.red, C.green]);
  });
  // small elibelinde-like motifs between
  [1, 2].forEach((i) => {
    const cx = ix + step * i;
    for (const oy of [-Math.floor(ih / 3), Math.floor(ih / 3)]) diamond(cx, midY + oy, 4, [C.gold, C.navy, C.cream]);
    diamond(cx, midY, 3, [C.cream, C.green]);
  });
  // edge triangles in field corners
  for (const [x, y] of [[ix + 3, iy + 3], [ix + iw - 4, iy + 3], [ix + 3, iy + ih - 4], [ix + iw - 4, iy + ih - 4]]) diamond(x, y, 2, [C.navy, C.gold]);
}

// ---------- Halloween ----------
// Woven like the kilim: everything is laid out on a grid of knots ("blocks"), so the motifs keep the stepped,
// hand-knotted look instead of looking printed.
function knotGrid(ctx, W, H, rowsWanted) {
  const s = Math.round(H / rowsWanted);
  const cols = Math.round(W / s), rows = Math.round(H / s);
  // Knots stretch by a fraction of a pixel so the grid reaches every edge of the canvas (a whole number of square
  // knots rarely fits exactly, and the leftover strip showed as a pale line along the rug's edge). Edges are rounded
  // to whole pixels so neighbouring knots meet without a seam.
  const kx = W / cols, ky = H / rows;
  const blk = (x, y, c) => {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    const x0 = Math.round(x * kx), y0 = Math.round(y * ky);
    ctx.fillStyle = c; ctx.fillRect(x0, y0, Math.round((x + 1) * kx) - x0, Math.round((y + 1) * ky) - y0);
  };
  return { s, cols, rows, blk };
}

// A border of zigzag "teeth" in two colours, `bw` knots deep.
function toothBorder(g, bw, base, tooth, line) {
  const { cols, rows, blk } = g;
  for (let x = 0; x < cols; x++) for (let k = 0; k < bw; k++) { blk(x, k, base); blk(x, rows - 1 - k, base); }
  for (let y = 0; y < rows; y++) for (let k = 0; k < bw; k++) { blk(k, y, base); blk(cols - 1 - k, y, base); }
  for (let x = 0; x < cols; x++) {
    const h = 2 - Math.abs((x % 4) - 2);
    for (let k = 0; k <= h; k++) { blk(x, 1 + k, tooth); blk(x, rows - 2 - k, tooth); }
  }
  for (let y = 0; y < rows; y++) {
    const h = 2 - Math.abs((y % 4) - 2);
    for (let k = 0; k <= h; k++) { blk(1 + k, y, tooth); blk(cols - 2 - k, y, tooth); }
  }
  for (let x = bw; x < cols - bw; x++) { blk(x, bw, line); blk(x, rows - 1 - bw, line); }
  for (let y = bw; y < rows - bw; y++) { blk(bw, y, line); blk(cols - 1 - bw, y, line); }
}

// Jack-o'-lantern made of knots, centred on (cx, cy), r knots wide each side.
function pumpkinKnots(blk, cx, cy, r, C, face) {
  const ry = Math.round(r * 0.8);
  for (let dy = -ry; dy <= ry; dy++) for (let dx = -r; dx <= r; dx++) {
    const e = (dx * dx) / (r * r) + (dy * dy) / (ry * ry);
    if (e > 1.02) continue;
    const rib = Math.abs(dx) === Math.round(r * 0.45) || dx === 0;
    blk(cx + dx, cy + dy, e > 0.78 ? C.orange2 : rib ? C.orange2 : C.orange);
  }
  // stem and leaf
  for (let k = 1; k <= Math.max(2, Math.round(r * 0.3)); k++) blk(cx, cy - ry - k, C.stem);
  blk(cx + 1, cy - ry - 1, C.leaf); blk(cx + 2, cy - ry - 2, C.leaf); blk(cx + 2, cy - ry - 1, C.leaf);
  if (!face) return;
  const ey = cy - Math.round(ry * 0.22), ex = Math.round(r * 0.42), es = Math.max(1, Math.round(r * 0.16)); // eye size
  for (const sx of [-1, 1]) { // triangle eyes, point up
    for (let k = 0; k <= es; k++) for (let dx = -k; dx <= k; dx++) blk(cx + sx * ex + dx, ey - es + k, C.glow);
  }
  for (let k = 0; k < Math.max(1, Math.round(es * 0.6)); k++) for (let dx = -k; dx <= k; dx++) blk(cx + dx, ey + 2 + k, C.glow); // nose
  const my = cy + Math.round(ry * 0.38), mw = Math.round(r * 0.62), mt = Math.max(1, Math.round(r * 0.12)); // grin
  for (let t = 0; t < mt + 1; t++) for (let dx = -mw + t; dx <= mw - t; dx++) {
    const tooth = t === 0 && (Math.abs(dx - Math.round(mw / 2)) < Math.max(1, mt) || Math.abs(dx + Math.round(mw / 2)) < Math.max(1, mt));
    if (!tooth) blk(cx + dx, my + t, C.glow);
  }
  for (let k = 1; k <= Math.max(1, Math.round(mt * 0.8)); k++) { blk(cx - mw - k, my - k, C.glow); blk(cx + mw + k, my - k, C.glow); }
}

function batKnots(blk, cx, cy, c, flip = 1) {
  const pts = [[0, 0], [-1, 0], [1, 0], [0, -1], [-1, -1], [1, -1], // body + ears
    [-2, 0], [-3, -1], [-4, -1], [-5, 0], [-4, 0], [-3, 0], [-5, 1], [-3, 1], // left wing
    [2, 0], [3, -1], [4, -1], [5, 0], [4, 0], [3, 0], [5, 1], [3, 1]];
  for (const [x, y] of pts) blk(cx + x * flip, cy + y, c);
}

function halloweenPumpkin(ctx, W, H) {
  const C = { field: '#1b1216', field2: '#24161c', orange: '#e0761f', orange2: '#b5520f', glow: '#ffd25a', stem: '#5a3a1a', leaf: '#4f7a3a',
              purple: '#4b2366', purple2: '#6c3591', cream: '#efe0bd', black: '#0d0a0c' };
  const g = knotGrid(ctx, W, H, 72), { cols, rows, blk } = g;
  ctx.fillStyle = C.field; ctx.fillRect(0, 0, W, H);
  // faint diagonal lattice in the field
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if ((x + y) % 8 === 0 || (x - y + 800) % 8 === 0) blk(x, y, C.field2);
  toothBorder(g, 7, C.purple, C.orange, C.cream);
  // candy-corn stripe inside the border
  const inset = 9;
  for (let x = inset; x < cols - inset; x++) {
    const c = [C.cream, C.orange, C.glow][Math.floor(x / 2) % 3];
    blk(x, inset, c); blk(x, rows - 1 - inset, c);
  }
  // pumpkin patch: rows of jack-o'-lanterns, the middle one big
  const ix = inset + 3, iw = cols - 2 * ix, iy = inset + 3, ih = rows - 2 * iy;
  const big = Math.floor(Math.min(ih * 0.36, iw * 0.15));
  pumpkinKnots(blk, Math.floor(cols / 2), Math.floor(rows / 2) + 1, big, C, true);
  const small = Math.max(5, Math.floor(big * 0.55));
  for (const fx of [0.13, 0.87]) for (const fy of [0.28, 0.74]) pumpkinKnots(blk, ix + Math.round(iw * fx), iy + Math.round(ih * fy), small, C, true);
  for (const fx of [0.33, 0.67]) pumpkinKnots(blk, ix + Math.round(iw * fx), iy + Math.round(ih * 0.86), Math.max(3, small - 3), C, false);
  // a few bats
  for (const [fx, fy, fl] of [[0.31, 0.13, 1], [0.69, 0.13, -1], [0.5, 0.93, 1]]) batKnots(blk, ix + Math.round(iw * fx), iy + Math.round(ih * fy), C.purple2, fl);
}

function halloweenWeb(ctx, W, H, seed) {
  const R = rng(seed + 31);
  const C = { field: '#2a1236', field2: '#331745', web: '#e9dfc6', web2: 'rgba(233,223,198,.55)', border: '#120a16', border2: '#e0761f',
              moon: '#f3d27a', bat: '#0e0812', spider: '#0b070d', eye: '#d63a2f' };
  const u = H / 100;
  ctx.fillStyle = C.field; ctx.fillRect(0, 0, W, H);
  // field with soft abrash bands (real rugs vary in dye lot)
  for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? C.field2 : C.field; ctx.globalAlpha = 0.5; ctx.fillRect(0, (H / 9) * i, W, H / 9); }
  ctx.globalAlpha = 1;
  // border: black band with orange crescent moons and bats
  ctx.fillStyle = C.border; frameRect(ctx, 0, 0, W, H, 11 * u);
  ctx.fillStyle = C.border2; frameRect(ctx, 11 * u, 11 * u, W - 22 * u, H - 22 * u, 1.2 * u);
  ctx.fillStyle = C.web; frameRect(ctx, 0.9 * u, 0.9 * u, W - 1.8 * u, H - 1.8 * u, 0.5 * u);
  // Motifs sit in the middle of the black band (between the cream edge line at ~1.4u and the orange line at 11u)
  // and stay well inside it: moons 2u across the radius, bats about 6u wide.
  const bc = 6.2 * u;
  for (const [x, y, side, i] of bandPoints(bc, bc, W - 2 * bc, H - 2 * bc, 12 * u)) {
    ctx.save(); ctx.translate(x, y); ctx.scale(0.78, 0.78);
    if (i % 2) { // crescent moon
      ctx.fillStyle = C.moon; ctx.beginPath(); ctx.arc(0, 0, 2.6 * u, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.border; ctx.beginPath(); ctx.arc(1.1 * u, -0.6 * u, 2.3 * u, 0, Math.PI * 2); ctx.fill();
    } else { // little bat
      ctx.fillStyle = C.border2;
      ctx.beginPath(); ctx.ellipse(0, 0, 0.9 * u, 1.3 * u, 0, 0, Math.PI * 2); ctx.fill();
      for (const sx of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(sx * 0.6 * u, -0.6 * u);
        ctx.quadraticCurveTo(sx * 2.4 * u, -2 * u, sx * 4 * u, -0.8 * u);
        ctx.quadraticCurveTo(sx * 3.2 * u, 0.2 * u, sx * 2.7 * u, 0.9 * u);
        ctx.quadraticCurveTo(sx * 2 * u, 0.2 * u, sx * 1.4 * u, 0.9 * u);
        ctx.quadraticCurveTo(sx * 1 * u, 0.2 * u, sx * 0.6 * u, 0.6 * u);
        ctx.fill();
      }
    }
    ctx.restore();
  }
  // big web medallion
  const cx = W / 2, cy = H / 2, rx = W * 0.3, ry = H * 0.32, spokes = 16;
  ctx.strokeStyle = C.web; ctx.lineCap = 'round';
  ctx.lineWidth = 0.55 * u;
  for (let k = 0; k < spokes; k++) {
    const a = (k / spokes) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * rx * 1.08, cy + Math.sin(a) * ry * 1.08); ctx.stroke();
  }
  ctx.lineWidth = 0.42 * u;
  for (let ring = 1; ring <= 8; ring++) {
    const f = ring / 8;
    ctx.beginPath();
    for (let k = 0; k <= spokes; k++) {
      const a0 = (k / spokes) * Math.PI * 2, a1 = ((k + 1) / spokes) * Math.PI * 2;
      const x0 = cx + Math.cos(a0) * rx * f, y0 = cy + Math.sin(a0) * ry * f;
      const x1 = cx + Math.cos(a1) * rx * f, y1 = cy + Math.sin(a1) * ry * f;
      const sag = 0.82; // threads sag toward the centre between spokes
      const mx = cx + (Math.cos((a0 + a1) / 2) * rx * f) * sag, my = cy + (Math.sin((a0 + a1) / 2) * ry * f) * sag;
      if (k === 0) ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(mx, my, x1, y1);
    }
    ctx.stroke();
  }
  // corner webs
  ctx.strokeStyle = C.web2; ctx.lineWidth = 0.35 * u;
  mirror4(W, H, 13 * u, 13 * u, (x, y, sx, sy) => {
    for (let k = 0; k <= 5; k++) {
      const a = (k / 5) * Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + sx * Math.cos(a) * 20 * u, y + sy * Math.sin(a) * 20 * u); ctx.stroke();
    }
    for (let r = 5; r <= 20; r += 5) {
      ctx.beginPath();
      for (let k = 0; k <= 5; k++) { const a = (k / 5) * Math.PI / 2; const px = x + sx * Math.cos(a) * r * u, py = y + sy * Math.sin(a) * r * u; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke();
    }
  });
  // spider hanging off-centre on a thread
  const spx = cx + rx * 0.34, spy = cy + ry * 0.18;
  ctx.strokeStyle = C.web; ctx.lineWidth = 0.3 * u;
  ctx.beginPath(); ctx.moveTo(spx, cy - ry * 0.55); ctx.lineTo(spx, spy - 2.4 * u); ctx.stroke();
  ctx.strokeStyle = C.spider; ctx.lineWidth = 0.7 * u;
  for (const sx of [-1, 1]) for (let k = 0; k < 4; k++) {
    const yy = spy - 1.2 * u + k * 1.1 * u;
    ctx.beginPath(); ctx.moveTo(spx, yy); ctx.quadraticCurveTo(spx + sx * 3.2 * u, yy - 2.2 * u + k * 0.6 * u, spx + sx * 4.6 * u, yy + 1.4 * u + k * 0.4 * u); ctx.stroke();
  }
  ctx.fillStyle = C.spider;
  ctx.beginPath(); ctx.ellipse(spx, spy + 1.2 * u, 2.1 * u, 2.7 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(spx, spy - 1.6 * u, 1.4 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.eye;
  ctx.beginPath(); ctx.arc(spx - 0.5 * u, spy - 1.8 * u, 0.32 * u, 0, Math.PI * 2); ctx.arc(spx + 0.5 * u, spy - 1.8 * u, 0.32 * u, 0, Math.PI * 2); ctx.fill();
  // dew drops on the web
  ctx.fillStyle = 'rgba(255,245,220,.8)';
  for (let i = 0; i < 26; i++) {
    const a = R() * Math.PI * 2, f = 0.2 + R() * 0.8;
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f, 0.35 * u, 0, Math.PI * 2); ctx.fill();
  }
}

function ghostShape(ctx, x, y, w, h, body, eye, tilt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(-w / 2, 0);
  ctx.arc(0, 0, w / 2, Math.PI, 0); // head
  ctx.lineTo(w / 2, h);
  const waves = 4;
  for (let i = waves; i > 0; i--) { // wavy hem
    const x0 = -w / 2 + (w * i) / waves, x1 = -w / 2 + (w * (i - 1)) / waves;
    ctx.quadraticCurveTo((x0 + x1) / 2, h + (i % 2 ? -w * 0.16 : w * 0.16), x1, h);
  }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = eye;
  ctx.beginPath(); ctx.ellipse(-w * 0.17, -w * 0.02, w * 0.07, w * 0.11, 0, 0, Math.PI * 2); ctx.ellipse(w * 0.17, -w * 0.02, w * 0.07, w * 0.11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, w * 0.2, w * 0.08, w * 0.1, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function halloweenGhost(ctx, W, H, seed) {
  const R = rng(seed + 77);
  const C = { sky: '#14263a', sky2: '#1c3550', ghost: '#f1ecdf', ghost2: '#cfd8d4', eye: '#141016', moon: '#f4d987', star: '#f6e7b0',
              border: '#0c1622', border2: '#5e8a6e', bone: '#efe6cf', candy: ['#efe0bd', '#e0761f', '#ffd25a'] };
  const u = H / 100;
  const grad = ctx.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, C.sky); grad.addColorStop(1, C.sky2);
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
  // border: dark band with a row of bones, framed by a candy-corn stripe
  ctx.fillStyle = C.border; frameRect(ctx, 0, 0, W, H, 11 * u);
  const stripe = 1.4 * u;
  for (let i = 0; i < 3; i++) { ctx.fillStyle = C.candy[i]; frameRect(ctx, 11 * u + i * stripe, 11 * u + i * stripe, W - 2 * (11 * u + i * stripe), H - 2 * (11 * u + i * stripe), stripe); }
  ctx.fillStyle = C.border2; frameRect(ctx, 0.9 * u, 0.9 * u, W - 1.8 * u, H - 1.8 * u, 0.6 * u);
  const bc = 6.2 * u;
  for (const [x, y, side] of bandPoints(bc, bc, W - 2 * bc, H - 2 * bc, 9 * u)) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(side ? Math.PI / 2 : 0); ctx.scale(0.85, 0.85);
    ctx.fillStyle = C.bone;
    ctx.fillRect(-2.6 * u, -0.55 * u, 5.2 * u, 1.1 * u);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 2.7 * u, sy * 0.75 * u, 0.85 * u, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  // stars
  const fx0 = 16 * u, fy0 = 16 * u, fw = W - 32 * u, fh = H - 32 * u;
  ctx.fillStyle = C.star;
  for (let i = 0; i < 60; i++) {
    const x = fx0 + R() * fw, y = fy0 + R() * fh, r = (0.25 + R() * 0.45) * u;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  // big moon with a ghost floating in front of it
  const mx = W / 2, my = H * 0.46, mr = 21 * u;
  const halo = ctx.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 1.7);
  halo.addColorStop(0, 'rgba(244,217,135,.35)'); halo.addColorStop(1, 'rgba(244,217,135,0)');
  ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(mx, my, mr * 1.7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.moon; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(200,160,80,.35)';
  for (const [dx, dy, r] of [[-6, -5, 3.2], [7, 4, 2.4], [-3, 8, 1.8], [5, -9, 1.4]]) { ctx.beginPath(); ctx.arc(mx + dx * u, my + dy * u, r * u, 0, Math.PI * 2); ctx.fill(); }
  ghostShape(ctx, mx, my + 2 * u, 20 * u, 18 * u, C.ghost, C.eye);
  // smaller ghosts drifting at the sides, mirrored like a rug's corner motifs
  mirror4(W, H, W * 0.22, H * 0.33, (x, y, sx, sy) => ghostShape(ctx, x, y - (sy < 0 ? 6 * u : 0), 10 * u, 9 * u, sy > 0 ? C.ghost : C.ghost2, C.eye, sx * 0.12));
  // graveyard hill along the bottom of the field
  ctx.fillStyle = '#0f1d2b';
  ctx.beginPath(); ctx.moveTo(fx0, fy0 + fh);
  ctx.quadraticCurveTo(W * 0.3, H * 0.72, W * 0.5, H * 0.79); ctx.quadraticCurveTo(W * 0.72, H * 0.86, fx0 + fw, H * 0.76);
  ctx.lineTo(fx0 + fw, fy0 + fh); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2d4152';
  for (const [x, w, h] of [[0.28, 3.4, 6], [0.36, 2.8, 4.6], [0.64, 3.2, 5.4], [0.72, 2.6, 4]]) {
    const bx = W * x, by = H * 0.83;
    ctx.beginPath(); ctx.moveTo(bx - w * u, by); ctx.lineTo(bx - w * u, by - h * u + w * u); ctx.arc(bx, by - h * u + w * u, w * u, Math.PI, 0); ctx.lineTo(bx + w * u, by); ctx.closePath(); ctx.fill();
  }
}

// ---------- America pack ----------
// Classic American graphics, drawn crisp the way the originals were printed or painted: a large-letter postcard,
// a national-park poster, a ballfield and a court seen from above, a diner floor with its neon, Route 66.

// Display fonts for the lettering. They ship with the panel; the rug page loads them before drawing these rugs.
// (Latin and Latin Extended subsets: the extended one has letters like the İ of TÜRKİYE.)
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212,U+FEFF,U+FFFD';
const LATIN_EXT = 'U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
export const RUG_FONTS = [
  ['Shrikhand', 'shrikhand-latin-400-normal.woff2', '400', LATIN],
  ['Instrument Sans', 'instrument-sans-latin-700-normal.woff2', '700', LATIN],
  ['Instrument Sans', 'instrument-sans-latin-ext-700-normal.woff2', '700', LATIN_EXT],
];
export async function loadRugFonts(base = '../panel/fonts/') {
  await Promise.all(RUG_FONTS.map(async ([family, file, weight, unicodeRange]) => {
    try { const f = new FontFace(family, `url(${base}${file})`, { weight, unicodeRange }); await f.load(); document.fonts.add(f); } catch {}
  }));
}
const SCRIPT = '"Shrikhand", Georgia, serif', BLOCK = '700 1px "Instrument Sans", "Arial Black", Arial, sans-serif';
const blockFont = (px) => BLOCK.replace('1px', `${px}px`);

function star5(ctx, x, y, r, rot = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = rot + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r; i ? ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill();
}
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }

// Little scenes used inside the postcard letters. Each fills (0,0,w,h). They're kept to a few big shapes: a letter
// is only a handful of loops wide, so fine detail would just turn into speckles.
const SCENES = [
  (c, w, h) => { // snowy mountain over a lake
    c.fillStyle = '#86bedc'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#5b6f9a'; c.beginPath(); c.moveTo(-w * 0.2, h * 0.72); c.lineTo(w * 0.5, h * 0.12); c.lineTo(w * 1.2, h * 0.72); c.fill();
    c.fillStyle = '#f4f6f6'; c.beginPath(); c.moveTo(w * 0.27, h * 0.32); c.lineTo(w * 0.5, h * 0.12); c.lineTo(w * 0.73, h * 0.32); c.fill();
    c.fillStyle = '#2f6b52'; c.fillRect(0, h * 0.68, w, h * 0.1); c.fillStyle = '#3d86a8'; c.fillRect(0, h * 0.78, w, h);
  },
  (c, w, h) => { // beach at sunset
    c.fillStyle = '#f39a52'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd27d'; c.beginPath(); c.arc(w * 0.5, h * 0.5, w * 0.3, Math.PI, 0); c.fill();
    c.fillStyle = '#2a8fa0'; c.fillRect(0, h * 0.5, w, h * 0.25); c.fillStyle = '#f1d9a6'; c.fillRect(0, h * 0.75, w, h);
  },
  (c, w, h) => { // desert mesa
    c.fillStyle = '#f2b45a'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#b4532f'; c.fillRect(w * 0.12, h * 0.3, w * 0.6, h * 0.5); c.fillRect(0, h * 0.48, w, h * 0.3);
    c.fillStyle = '#d99a5a'; c.fillRect(0, h * 0.76, w, h);
  },
  (c, w, h) => { // city at dusk
    c.fillStyle = '#2b3a6b'; c.fillRect(0, 0, w, h * 0.5); c.fillStyle = '#e98a6c'; c.fillRect(0, h * 0.5, w, h);
    c.fillStyle = '#1b2240'; for (const [x, bw, bh] of [[0, 0.3, 0.55], [0.28, 0.24, 0.8], [0.5, 0.28, 0.62], [0.76, 0.3, 0.72]]) c.fillRect(w * x, h * (1 - bh), w * bw, h * bh);
    c.fillStyle = '#f2c75c'; for (let i = 0; i < 4; i++) for (let k = 0; k < 3; k++) c.fillRect(w * (0.08 + i * 0.24), h * (0.5 + k * 0.15), w * 0.07, h * 0.05);
  },
  (c, w, h) => { // pine forest
    c.fillStyle = '#a8d0c4'; c.fillRect(0, 0, w, h); c.fillStyle = '#5f9a7f'; c.fillRect(0, h * 0.55, w, h);
    c.fillStyle = '#24543f'; c.beginPath(); c.moveTo(w * 0.5, h * 0.08); c.lineTo(w * 1.1, h * 0.95); c.lineTo(-w * 0.1, h * 0.95); c.fill();
  },
  (c, w, h) => { // red barn in a wheat field
    c.fillStyle = '#9fcbe2'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8b64c'; c.fillRect(0, h * 0.62, w, h);
    c.fillStyle = '#a3302f'; c.fillRect(w * 0.15, h * 0.36, w * 0.7, h * 0.3); c.beginPath(); c.moveTo(w * 0.08, h * 0.38); c.lineTo(w * 0.5, h * 0.16); c.lineTo(w * 0.92, h * 0.38); c.fill();
    c.fillStyle = '#efe3c6'; c.fillRect(w * 0.4, h * 0.46, w * 0.2, h * 0.2);
  },
  (c, w, h) => { // stars and stripes
    for (let i = 0; i < 7; i++) { c.fillStyle = i % 2 ? '#efe3c6' : '#b5312b'; c.fillRect(0, (h * i) / 7, w, h / 7 + 1); }
    c.fillStyle = '#25345e'; c.fillRect(0, 0, w * 0.6, h * 0.43); c.fillStyle = '#efe3c6';
    for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) star5(c, w * (0.16 + k * 0.28), h * (0.11 + r * 0.2), w * 0.09);
  },
];

// Large-letter postcard: "Greetings from AMERICA", every letter a little scene, over a blue sky and green hills.
// Sized in loops of the finished hooked rug, so the script is thick enough to read once it's made of wool.
function americaPostcard(ctx, W, H, word = 'AMERICA', scenes = SCENES, capRows = 22, baseRows = 48) {
  const { cols, rows } = hookedPictureLoops(W, H), Lx = W / cols, Ly = H / rows;
  ctx.fillStyle = '#f3ead6'; ctx.fillRect(0, 0, W, H);                       // card
  const px = 2 * Lx, py = 2 * Ly, pw = W - 2 * px, ph = H - 2 * py;
  ctx.save(); roundRect(ctx, px, py, pw, ph, 2 * Ly); ctx.clip();
  const sky = ctx.createLinearGradient(0, py, 0, py + ph); sky.addColorStop(0, '#3a80b4'); sky.addColorStop(0.5, '#8cc2db'); sky.addColorStop(1, '#d6ecef');
  ctx.fillStyle = sky; ctx.fillRect(px, py, pw, ph);
  const hill = (y0, amp, col, f0) => {
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(px, py + ph);
    for (let k = 0; k <= 48; k++) { const t = k / 48; ctx.lineTo(px + pw * t, py + ph * (y0 - amp * Math.sin(t * Math.PI * 2 + f0))); }
    ctx.lineTo(px + pw, py + ph); ctx.fill();
  };
  hill(0.76, 0.05, '#86b06a', 0.6); hill(0.86, 0.04, '#4f8a55', 2.4);
  ctx.restore();

  // AMERICA: tall block letters, each filled with a scene, with a cream outline and a navy extrusion. Built at full
  // width on its own canvas, then squeezed sideways to fit, like the condensed letters on the real cards.
  const cap = capRows * Ly, base = baseRows * Ly;
  const probe = document.createElement('canvas').getContext('2d'); probe.font = blockFont(100);
  const F = cap / (probe.measureText('M').actualBoundingBoxAscent / 100);
  probe.font = blockFont(F);
  const gap = F * 0.05, depth = 2 * Lx, line = 2.2 * Lx;
  const widths = [...word].map((ch) => probe.measureText(ch).width);
  const ww = widths.reduce((a, b) => a + b, 0) + gap * (word.length - 1) + depth + line * 2;
  const wc = document.createElement('canvas'); wc.width = Math.ceil(ww); wc.height = Math.ceil(F * 1.2);
  const w2 = wc.getContext('2d'); w2.font = blockFont(F); w2.textBaseline = 'alphabetic'; w2.lineJoin = 'round';
  const wb = F;                                                                // baseline inside the word canvas
  let x = line;
  for (let i = 0; i < word.length; i++) {
    const ch = word[i], cw = widths[i];
    w2.fillStyle = '#1d2a4a'; for (let d = depth; d > 0; d -= 2) w2.fillText(ch, x + d, wb + d); // extrusion
    w2.strokeStyle = '#f6efdc'; w2.lineWidth = line; w2.strokeText(ch, x, wb);
    const off = document.createElement('canvas'); off.width = Math.ceil(cw) + 4; off.height = Math.ceil(F * 1.05);
    const oc = off.getContext('2d');
    scenes[i % scenes.length](oc, off.width, off.height);
    oc.globalCompositeOperation = 'destination-in'; oc.font = w2.font; oc.textBaseline = 'alphabetic'; oc.fillStyle = '#000'; oc.fillText(ch, 2, F * 0.97);
    w2.drawImage(off, x - 2, wb - F * 0.97);
    x += cw + gap;
  }
  const targetW = Math.min(ww, pw * 0.94);
  ctx.drawImage(wc, W / 2 - targetW / 2, base - wb, targetW, wc.height);

  // "GREETINGS FROM" in cream capitals on a red ribbon with folded ends. Capitals in a heavy sans stay readable
  // when every stroke is only a loop or two wide; a script's little counters fill in with wool.
  const ry = 11 * Ly, rh = 12 * Ly, rx0 = px + pw * 0.07, rx1 = px + pw * 0.93, notch = 2.5 * Lx, tail = 4.5 * Lx, drop = 2.5 * Ly;
  ctx.fillStyle = '#7d1f1c';
  for (const sgn of [-1, 1]) {
    const ex = sgn < 0 ? rx0 : rx1, ox = ex + sgn * tail;
    ctx.beginPath(); ctx.moveTo(ex - sgn * 3 * Lx, ry - rh / 2 + drop); ctx.lineTo(ox, ry - rh / 2 + drop); ctx.lineTo(ox - sgn * notch, ry + drop);
    ctx.lineTo(ox, ry + rh / 2 + drop); ctx.lineTo(ex - sgn * 3 * Lx, ry + rh / 2 + drop); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#1d2a4a'; ctx.fillRect(rx0 + 0.9 * Lx, ry - rh / 2 + 0.9 * Ly, rx1 - rx0, rh);       // shadow
  ctx.fillStyle = '#c0362f'; ctx.fillRect(rx0, ry - rh / 2, rx1 - rx0, rh);
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  const spacing = ctx.letterSpacing !== undefined;
  const fitText = (txt, maxW, capRows) => {
    ctx.font = blockFont(100); if (spacing) ctx.letterSpacing = `${0.8 * Lx}px`;
    const m = ctx.measureText(txt), capH = m.actualBoundingBoxAscent;
    return Math.min(100 * maxW / m.width, 100 * capRows * Ly / capH);
  };
  const GF = fitText('GREETINGS FROM', (rx1 - rx0) - 4 * Lx, 7.5);
  ctx.font = blockFont(GF); if (spacing) ctx.letterSpacing = `${0.8 * Lx}px`;
  const capH = ctx.measureText('G').actualBoundingBoxAscent;
  ctx.fillStyle = ctx.strokeStyle = '#f6efdc'; ctx.lineWidth = 0.3 * Lx;
  ctx.strokeText('GREETINGS FROM', W / 2, ry + capH / 2); ctx.fillText('GREETINGS FROM', W / 2, ry + capH / 2);
  if (spacing) ctx.letterSpacing = '0px';
  ctx.textAlign = 'left';
}

// National-park poster in the style of the old screen-printed travel posters: flat layered mountains, a pine
// forest, a still lake, and a lettered band.
function americaPark(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#efe3c6'; ctx.fillRect(0, 0, W, H);
  const bx = 4 * u, by = 4 * u, bw = W - 8 * u, bh = H - 8 * u, band = bh * 0.27;
  const ih = bh - band;
  ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw, ih); ctx.clip();
  const sky = [['#f6c76a', 0], ['#f19a57', 0.22], ['#e36f55', 0.4]];
  ctx.fillStyle = sky[0][0]; ctx.fillRect(bx, by, bw, ih);
  ctx.fillStyle = sky[1][0]; ctx.fillRect(bx, by + ih * 0.2, bw, ih);
  ctx.fillStyle = sky[2][0]; ctx.fillRect(bx, by + ih * 0.33, bw, ih);
  ctx.fillStyle = '#fbe6a8'; ctx.beginPath(); ctx.arc(bx + bw * 0.7, by + ih * 0.3, ih * 0.11, 0, Math.PI * 2); ctx.fill();
  const ridge = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(bx, by + ih); pts.forEach(([fx, fy]) => ctx.lineTo(bx + bw * fx, by + ih * fy)); ctx.lineTo(bx + bw, by + ih); ctx.closePath(); ctx.fill(); };
  ridge([[0, 0.5], [0.18, 0.28], [0.3, 0.42], [0.45, 0.2], [0.6, 0.4], [0.78, 0.25], [1, 0.45]], '#8a5a8f');
  // snow caps on the far range
  ctx.fillStyle = '#f6efe2';
  for (const [tx, ty, w] of [[0.18, 0.28, 0.05], [0.45, 0.2, 0.06], [0.78, 0.25, 0.05]]) { ctx.beginPath(); ctx.moveTo(bx + bw * tx, by + ih * ty); ctx.lineTo(bx + bw * (tx + w), by + ih * (ty + 0.07)); ctx.lineTo(bx + bw * (tx + w * 0.3), by + ih * (ty + 0.05)); ctx.lineTo(bx + bw * tx, by + ih * (ty + 0.08)); ctx.lineTo(bx + bw * (tx - w * 0.3), by + ih * (ty + 0.05)); ctx.lineTo(bx + bw * (tx - w), by + ih * (ty + 0.07)); ctx.fill(); }
  ridge([[0, 0.6], [0.15, 0.45], [0.35, 0.58], [0.52, 0.42], [0.7, 0.57], [0.88, 0.46], [1, 0.55]], '#4f5f97');
  ridge([[0, 0.66], [0.25, 0.58], [0.5, 0.66], [0.75, 0.6], [1, 0.66]], '#2f6f73');
  // lake with the reflection of the sun
  ctx.fillStyle = '#3b8ea5'; ctx.fillRect(bx, by + ih * 0.7, bw, ih);
  ctx.fillStyle = '#fbe6a8'; for (let k = 0; k < 5; k++) ctx.fillRect(bx + bw * 0.7 - ih * (0.08 - k * 0.012), by + ih * (0.73 + k * 0.035), ih * (0.16 - k * 0.024), 0.7 * u);
  // pine trees, near and dark, at the sides
  const pine = (x, base, h, col) => { ctx.fillStyle = col; for (let k = 0; k < 4; k++) { const ty = base - h + k * h * 0.2, w = h * (0.14 + k * 0.07); ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x + w, ty + h * 0.32); ctx.lineTo(x - w, ty + h * 0.32); ctx.fill(); } ctx.fillRect(x - h * 0.03, base - h * 0.1, h * 0.06, h * 0.12); };
  for (const [fx, h, col] of [[0.04, 0.6, '#173f33'], [0.11, 0.48, '#1f4f3e'], [0.18, 0.36, '#173f33'], [0.96, 0.62, '#173f33'], [0.89, 0.46, '#1f4f3e'], [0.83, 0.34, '#173f33']]) pine(bx + bw * fx, by + ih * 1.02, ih * h, col);
  ctx.restore();
  // lettered band
  ctx.fillStyle = '#1f3a3a'; ctx.fillRect(bx, by + ih, bw, band);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#efe3c6'; ctx.font = blockFont(band * 0.62);
  if (ctx.letterSpacing !== undefined) ctx.letterSpacing = `${band * 0.06}px`;
  ctx.fillText('SEE AMERICA', W / 2, by + ih + band * 0.52);
  if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
}

// A baseball diamond from above: mowed outfield inside the fence, the dirt infield, chalk lines, bases and the mound.
// The grass is mowed into stripes loop by loop, so the stripes stay straight.
function americaBaseball(ctx, W, H) {
  const u = H / 100, KEY = '#2f6b3a';
  ctx.fillStyle = '#1d3a2a'; ctx.fillRect(0, 0, W, H);                 // stands beyond the fence
  const hx = W / 2, hy = H * 0.9, d = H * 0.4, fence = H * 0.8;          // home plate, base distance, fence radius
  ctx.fillStyle = KEY; ctx.beginPath(); ctx.arc(hx, hy, fence, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#a8683f'; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.arc(hx, hy, fence - 2.5 * u, Math.PI, Math.PI * 2); ctx.stroke(); // warning track
  // infield dirt: circle-cut arc beyond the bases, with the grass inside the base paths
  ctx.fillStyle = '#b97a4c';
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.arc(hx, hy, d * 1.36, Math.PI * 1.25, Math.PI * 1.75); ctx.closePath(); ctx.fill();
  const b1 = [hx + d * Math.SQRT1_2, hy - d * Math.SQRT1_2], b2 = [hx, hy - d * Math.SQRT2], b3 = [hx - d * Math.SQRT1_2, hy - d * Math.SQRT1_2];
  const inset = 4 * u;
  ctx.fillStyle = KEY; ctx.beginPath();
  ctx.moveTo(hx, hy - inset * 1.4); ctx.lineTo(b1[0] - inset * 1.4, b1[1]); ctx.lineTo(b2[0], b2[1] + inset * 1.4); ctx.lineTo(b3[0] + inset * 1.4, b3[1]); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#b97a4c'; ctx.beginPath(); ctx.arc(hx, hy - d * 0.7, 5.5 * u, 0, Math.PI * 2); ctx.fill();    // mound
  ctx.beginPath(); ctx.arc(hx, hy, 8 * u, 0, Math.PI * 2); ctx.fill();                                          // home circle
  ctx.fillStyle = '#f3efe4'; ctx.fillRect(hx - 2.2 * u, hy - d * 0.7 - 0.8 * u, 4.4 * u, 1.6 * u);                // rubber
  // foul lines out to the fence, batter's boxes, home plate and the bases, all in chalk thick enough to hook
  ctx.strokeStyle = '#f3efe4'; ctx.lineWidth = 1.6 * u;
  for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + sgn * (fence - 5 * u) * Math.SQRT1_2, hy - (fence - 5 * u) * Math.SQRT1_2); ctx.stroke(); }
  ctx.fillStyle = '#f3efe4'; ctx.beginPath(); ctx.moveTo(hx - 1.8 * u, hy - 1.8 * u); ctx.lineTo(hx + 1.8 * u, hy - 1.8 * u); ctx.lineTo(hx + 1.8 * u, hy); ctx.lineTo(hx, hy + 1.8 * u); ctx.lineTo(hx - 1.8 * u, hy); ctx.fill();
  for (const [bx, by] of [b1, b2, b3]) { ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.PI / 4); ctx.fillRect(-2 * u, -2 * u, 4 * u, 4 * u); ctx.restore(); }
  const key = rgbOf(KEY), G1 = rgbOf('#2f6b3a'), G2 = rgbOf('#3b7f47');
  return (r, h, rgb) => nearRgb(rgb, key, 12) ? (Math.floor(r / 4) & 1 ? G2 : G1) : null;
}

// A basketball court from above: maple boards, painted keys, the three-point arcs and a star at centre court. The
// boards are laid out loop by loop, two rows each, so the floor reads as planks rather than as stray lines.
function americaBasketball(ctx, W, H) {
  const u = H / 100, KEY = '#d4a46c';
  const apron = 6 * u;
  ctx.fillStyle = '#25345e'; ctx.fillRect(0, 0, W, H);
  const cx0 = apron, cy0 = apron, cw = W - 2 * apron, ch = H - 2 * apron;
  ctx.fillStyle = KEY; ctx.fillRect(cx0, cy0, cw, ch);
  ctx.strokeStyle = '#f6efe2'; ctx.lineWidth = 1.6 * u;
  ctx.strokeRect(cx0 + 1.2 * u, cy0 + 1.2 * u, cw - 2.4 * u, ch - 2.4 * u);
  const mx = W / 2, my = H / 2;
  ctx.beginPath(); ctx.moveTo(mx, cy0 + 1.2 * u); ctx.lineTo(mx, cy0 + ch - 1.2 * u); ctx.stroke();
  // centre circle with a star
  ctx.fillStyle = '#b5312b'; ctx.beginPath(); ctx.arc(mx, my, 11 * u, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#f6efe2'; star5(ctx, mx, my + 0.6 * u, 7.5 * u);
  for (const side of [-1, 1]) {
    const bx = side < 0 ? cx0 + 1.2 * u : cx0 + cw - 1.2 * u, kw = 19 * u, kh = 18 * u;
    // painted key
    ctx.fillStyle = '#25345e'; ctx.fillRect(side < 0 ? bx : bx - kw, my - kh / 2, kw, kh); ctx.strokeRect(side < 0 ? bx : bx - kw, my - kh / 2, kw, kh);
    // free-throw circle
    ctx.beginPath(); ctx.arc(bx + side * -kw, my, 7 * u, side < 0 ? -Math.PI / 2 : Math.PI / 2, side < 0 ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke();
    // three-point line: short straight bits then the arc
    const r3 = 31 * u, hoop = bx + side * -5 * u;
    ctx.beginPath();
    ctx.moveTo(bx, my - 28 * u); ctx.lineTo(hoop + side * -Math.sqrt(r3 * r3 - (28 * u) ** 2), my - 28 * u);
    ctx.arc(hoop, my, r3, side < 0 ? -Math.asin(28 / 31) : Math.PI + Math.asin(28 / 31), side < 0 ? Math.asin(28 / 31) : Math.PI - Math.asin(28 / 31), side > 0);
    ctx.lineTo(bx, my + 28 * u); ctx.stroke();
    // backboard and hoop
    ctx.fillStyle = '#f6efe2'; ctx.fillRect(bx + side * -2.6 * u - 0.8 * u, my - 4.5 * u, 1.6 * u, 9 * u);
    ctx.strokeStyle = '#e8742b'; ctx.lineWidth = 1.4 * u; ctx.beginPath(); ctx.arc(hoop, my, 2.4 * u, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f6efe2'; ctx.lineWidth = 1.6 * u;
  }
  // floorboards: per pair of rows, boards of random length, each a slightly different shade of maple
  const key = rgbOf(KEY), R = rng(808), boards = new Map();
  const shadeAt = (plank, x) => {
    let b = boards.get(plank);
    if (!b) { b = []; let e = -R() * 14; while (e < 400) { e += 10 + R() * 16; b.push([e, 0.86 + R() * 0.18]); } boards.set(plank, b); }
    for (const [e, t] of b) if (x < e) return t;
    return 1;
  };
  return (r, h, rgb) => {
    if (!nearRgb(rgb, key, 12)) return null;
    const t = shadeAt(r >> 1, h / 2);
    return [222 * t, 176 * t, 116 * t];
  };
}

// A diner floor: black-and-white checks, a chrome-and-red trim, and a neon sign in the middle. The floor is painted
// plain grey and the checks are laid out loop by loop, so every square comes out the same size.
function americaDiner(ctx, W, H) {
  const u = H / 100, KEY = '#857f78';
  ctx.fillStyle = KEY; ctx.fillRect(0, 0, W, H);
  // chrome band with a red stripe
  const chrome = ctx.createLinearGradient(0, 0, 0, H); chrome.addColorStop(0, '#e9edf1'); chrome.addColorStop(0.5, '#9aa3ad'); chrome.addColorStop(1, '#e9edf1');
  ctx.fillStyle = chrome; frameRect(ctx, 0, 0, W, H, 4 * u);
  ctx.fillStyle = '#c4262e'; frameRect(ctx, 4 * u, 4 * u, W - 8 * u, H - 8 * u, 1.8 * u);
  // sign: rounded dark panel with chrome rim
  const sw = W * 0.56, sh = H * 0.44, sx = (W - sw) / 2, sy = (H - sh) / 2;
  ctx.fillStyle = chrome; roundRect(ctx, sx - 1.2 * u, sy - 1.2 * u, sw + 2.4 * u, sh + 2.4 * u, 6 * u); ctx.fill();
  ctx.fillStyle = '#16202e'; roundRect(ctx, sx, sy, sw, sh, 5 * u); ctx.fill();
  const neon = (text, font, x, y, col, glow) => {
    ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = glow; ctx.shadowBlur = 3.5 * u; ctx.fillStyle = col;
    ctx.fillText(text, x, y); ctx.shadowBlur = 1.2 * u; ctx.fillText(text, x, y);
    ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = font; ctx.fillText(text, x, y - 0.15 * u);
  };
  neon('Diner', `${sh * 0.5}px ${SCRIPT}`, W / 2, sy + sh * 0.38, '#ff5d7a', '#ff2d55');
  neon('OPEN', blockFont(sh * 0.22), W / 2, sy + sh * 0.8, '#5ff0e0', '#19d3c5');
  // neon star sparkles at the sign's corners
  ctx.shadowColor = '#ffd84a'; ctx.shadowBlur = 2.5 * u; ctx.fillStyle = '#ffe680';
  for (const [x, y] of [[sx + sw * 0.08, sy + sh * 0.2], [sx + sw * 0.92, sy + sh * 0.2]]) star5(ctx, x, y, 3 * u);
  ctx.shadowBlur = 0; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  const { cols, rows } = hookedPictureLoops(W, H), k = 6, key = rgbOf(KEY), DARK = rgbOf('#1a1a1d'), LIGHT = rgbOf('#f1ece0');
  const oh = ((2 * k - (2 * cols) % (2 * k)) / 2) | 0, orow = ((k - rows % k) / 2) | 0;
  return (r, h, rgb) => nearRgb(rgb, key, 12) ? ((Math.floor((h + oh) / (2 * k)) + Math.floor((r + orow) / k)) & 1 ? LIGHT : DARK) : null;
}

// Route 66: a two-lane road running to the horizon through the desert at sunset, with the highway shield.
function americaRoute66(ctx, W, H) {
  const u = H / 100, hz = H * 0.5;
  const sky = ctx.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#3d4f8f'); sky.addColorStop(0.5, '#e7766a'); sky.addColorStop(1, '#f7c06a');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, hz);
  ctx.fillStyle = '#ffe2a0'; ctx.beginPath(); ctx.arc(W * 0.5, hz, 10 * u, Math.PI, 0); ctx.fill();
  // mesas on the horizon
  ctx.fillStyle = '#7b3f3a';
  for (const [x, w, h] of [[0.06, 0.16, 9], [0.2, 0.08, 6], [0.7, 0.12, 11], [0.84, 0.1, 7]]) { ctx.beginPath(); ctx.moveTo(W * x, hz); ctx.lineTo(W * x + 2 * u, hz - h * u); ctx.lineTo(W * (x + w) - 2 * u, hz - h * u); ctx.lineTo(W * (x + w), hz); ctx.fill(); }
  // desert floor
  const ground = ctx.createLinearGradient(0, hz, 0, H); ground.addColorStop(0, '#d79a5c'); ground.addColorStop(1, '#c47f45');
  ctx.fillStyle = ground; ctx.fillRect(0, hz, W, H - hz);
  // the road in perspective, with yellow centre dashes
  ctx.fillStyle = '#3a3a3e'; ctx.beginPath(); ctx.moveTo(W * 0.5 - 0.6 * u, hz); ctx.lineTo(W * 0.5 + 0.6 * u, hz); ctx.lineTo(W * 0.5 + 34 * u, H); ctx.lineTo(W * 0.5 - 34 * u, H); ctx.fill();
  ctx.fillStyle = '#f2c94c';
  for (let t = 0.05; t < 1; t += 0.11) { const y0 = hz + (H - hz) * t * t, y1 = hz + (H - hz) * Math.min(1, (t + 0.05) * (t + 0.05)), w0 = 0.15 * u + t * 0.9 * u; ctx.beginPath(); ctx.moveTo(W / 2 - w0, y0); ctx.lineTo(W / 2 + w0, y0); ctx.lineTo(W / 2 + w0 * 1.3, y1); ctx.lineTo(W / 2 - w0 * 1.3, y1); ctx.fill(); }
  // telephone poles getting smaller toward the horizon
  ctx.strokeStyle = '#3b2a20'; ctx.lineCap = 'butt';
  for (let k = 0; k < 4; k++) {
    const t = 1 - k * 0.22, x = W * 0.5 - (4 + 40 * t * t) * u, y = hz + (H - hz) * t * t * 0.9, h = (6 + 28 * t * t) * u;
    ctx.lineWidth = (1.5 + 1.2 * t) * u;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.moveTo(x - h * 0.2, y - h * 0.86); ctx.lineTo(x + h * 0.2, y - h * 0.86); ctx.stroke();
  }
  // the shield sign on its post
  const sx = W * 0.78, sy = H * 0.47, sw = 30 * u, sh = 33 * u;
  ctx.fillStyle = '#4a3a2a'; ctx.fillRect(sx - 0.8 * u, sy + sh * 0.5, 1.6 * u, H * 0.32);
  const shield = (pad, col) => {
    const w = sw - pad * 2, h = sh - pad * 2, x0 = sx - w / 2, y0 = sy - sh / 2 + pad;
    ctx.fillStyle = col; ctx.beginPath();
    ctx.moveTo(x0, y0 + h * 0.12); ctx.quadraticCurveTo(x0 + w * 0.25, y0, x0 + w * 0.5, y0 + h * 0.1); ctx.quadraticCurveTo(x0 + w * 0.75, y0, x0 + w, y0 + h * 0.12);
    ctx.lineTo(x0 + w, y0 + h * 0.55); ctx.quadraticCurveTo(x0 + w, y0 + h * 0.85, x0 + w * 0.5, y0 + h); ctx.quadraticCurveTo(x0, y0 + h * 0.85, x0, y0 + h * 0.55); ctx.closePath(); ctx.fill();
  };
  shield(0, '#111214'); shield(1.1 * u, '#f6f2e6');
  ctx.fillStyle = '#111214'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = blockFont(sh * 0.56); ctx.fillText('66', sx, sy + sh * 0.08);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  // a frame like an old enamel sign
  ctx.fillStyle = '#1a1a1d'; frameRect(ctx, 0, 0, W, H, 2.4 * u);
  ctx.fillStyle = '#f6f2e6'; frameRect(ctx, 2.4 * u, 2.4 * u, W - 4.8 * u, H - 4.8 * u, 0.6 * u);
}

// ---------- Canada pack ----------
// The same three crafts as the USA pack: woven and pieced rugs, folk pictures knotted on a grid, and hooked rugs,
// which are Canada's own tradition (the hooked mats of the Maritimes and Newfoundland).

// The flag's eleven-point maple leaf: the right half, from the top point round to the foot of the stem, x right and
// y up, the leaf spanning about -1..1. The left half is its mirror.
const MAPLE = [[0, 1], [0.13, 0.7], [0.32, 0.8], [0.22, 0.28], [0.62, 0.5], [0.64, 0.36], [0.96, 0.3], [0.74, 0.04],
  [0.84, -0.12], [0.36, -0.2], [0.4, -0.42], [0.05, -0.36], [0.05, -0.8]];
function mapleLeaf(ctx, cx, cy, s, rot = 0) {
  const pts = [...MAPLE, ...MAPLE.slice().reverse().map(([x, y]) => [-x, y])];
  const c = Math.cos(rot), sn = Math.sin(rot);
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    const px = x * s, py = -y * s, X = cx + px * c - py * sn, Y = cy + px * sn + py * c;
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  });
  ctx.closePath(); ctx.fill();
}

// Red, white, red, with the maple leaf: woven, with a dark red binding and a stitched edge, like the flag rug.
function canadaFlag(ctx, W, H) {
  const C = { red: '#b3282d', red2: '#a12327', white: '#efe6d2', white2: '#e5dac2', bind: '#6e1a1c' };
  const u = H / 100, b = 4.2 * u;
  ctx.fillStyle = C.bind; ctx.fillRect(0, 0, W, H);
  const x0 = b, y0 = b, fw = W - 2 * b, fh = H - 2 * b, side = (fw - fh) / 2;
  ctx.fillStyle = C.red; ctx.fillRect(x0, y0, side, fh); ctx.fillRect(x0 + fw - side, y0, side, fh);
  ctx.fillStyle = C.white; ctx.fillRect(x0 + side, y0, fh, fh);
  // faint woven rows
  for (let k = 0, y = 0; y < fh; k++, y += 0.9 * u) if (k % 2 === 0) {
    ctx.fillStyle = C.red2; ctx.fillRect(x0, y0 + y, side, 0.45 * u); ctx.fillRect(x0 + fw - side, y0 + y, side, 0.45 * u);
    ctx.fillStyle = C.white2; ctx.fillRect(x0 + side, y0 + y, fh, 0.45 * u);
  }
  ctx.fillStyle = C.red; mapleLeaf(ctx, W / 2, y0 + fh * 0.48, fh * 0.39);
  const fade = ctx.createLinearGradient(0, 0, W, H);
  fade.addColorStop(0, 'rgba(255,240,215,0)'); fade.addColorStop(1, 'rgba(255,240,215,.12)');
  ctx.fillStyle = fade; ctx.fillRect(0, 0, W, H);
  stitchRect(ctx, b * 0.5, b * 0.5, W - b, H - b, 2.2 * u, 0.4 * u, 'rgba(239,230,210,.72)');
}

// Pieced quilt of Maple Leaf blocks, the old nine-patch: four half-square triangles, four solid squares and a stem,
// in autumn fabrics on light calicos, with sashing, red cornerstones and a sawtooth border.
function canadaLeafQuilt(ctx, W, H, seed) {
  const R = rng(seed + 71), u = H / 100;
  const leaves = ['#b3352b', '#cf5f2c', '#e0a33a', '#8e3424', '#c47f2e', '#a83a4a', '#7a8234'];
  const bgs = ['#efe4cb', '#e8dbbd', '#f2eadb'];
  const C = { border: '#2f4a36', saw1: '#efe4cb', saw2: '#b3352b', sash: '#d6c39b', stone: '#b3352b' };
  const bw = 9 * u;
  ctx.fillStyle = C.border; ctx.fillRect(0, 0, W, H);
  const cb = bw * 0.9, m = bw * 0.05;
  const teeth = (x0, y0, len, horiz, flip) => {
    const { n, d } = evenSteps(len, 4.5 * u), depth = cb * 0.62;
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = k % 2 ? C.saw1 : C.saw2;
      ctx.beginPath();
      if (horiz) { const x = x0 + k * d; ctx.moveTo(x, y0); ctx.lineTo(x + d, y0); ctx.lineTo(x + d / 2, y0 + flip * depth); }
      else { const y = y0 + k * d; ctx.moveTo(x0, y); ctx.lineTo(x0, y + d); ctx.lineTo(x0 + flip * depth, y + d / 2); }
      ctx.closePath(); ctx.fill();
    }
  };
  const top = m + cb * 0.19, bot = H - m - cb * 0.19, lft = m + cb * 0.19, rgt = W - m - cb * 0.19;
  teeth(m + cb, top, W - 2 * (m + cb), true, 1); teeth(m + cb, bot, W - 2 * (m + cb), true, -1);
  teeth(lft, m + cb, H - 2 * (m + cb), false, 1); teeth(rgt, m + cb, H - 2 * (m + cb), false, -1);
  for (const [x, y] of [[m, m], [W - m - cb, m], [m, H - m - cb], [W - m - cb, H - m - cb]]) {
    ctx.fillStyle = C.saw1; ctx.fillRect(x + cb * 0.15, y + cb * 0.15, cb * 0.7, cb * 0.7);
    ctx.fillStyle = C.saw2; mapleLeaf(ctx, x + cb / 2, y + cb * 0.52, cb * 0.3);
  }
  // blocks
  const fx = bw, fy = bw, fw = W - 2 * bw, fh = H - 2 * bw, bc = 5, br = 3, sash = 1.8 * u;
  const bs = Math.min((fw - (bc + 1) * sash) / bc, (fh - (br + 1) * sash) / br);
  const gw = bc * bs + (bc + 1) * sash, gh = br * bs + (br + 1) * sash, gx = fx + (fw - gw) / 2, gy = fy + (fh - gh) / 2;
  ctx.fillStyle = C.sash; ctx.fillRect(fx, fy, fw, fh);
  const layout = [['h0', 'h0', 'L'], ['L', 'L', 'h1'], ['S', 'L', 'h1']];
  for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) {
    const x = gx + sash + i * (bs + sash), y = gy + sash + j * (bs + sash), q = bs / 3;
    const bg = bgs[(i + j) % bgs.length], lf = leaves[(i * 3 + j * 2 + Math.floor(R() * 2)) % leaves.length];
    ctx.fillStyle = bg; ctx.fillRect(x, y, bs, bs);
    ctx.fillStyle = lf; ctx.strokeStyle = lf;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const ux = x + c * q, uy = y + r * q, t = layout[r][c];
      ctx.beginPath();
      if (t === 'L') { ctx.fillRect(ux, uy, q + 0.5, q + 0.5); continue; }
      if (t === 'h0') { ctx.moveTo(ux + q, uy); ctx.lineTo(ux + q, uy + q); ctx.lineTo(ux, uy + q); ctx.closePath(); ctx.fill(); continue; }
      if (t === 'h1') { ctx.moveTo(ux, uy); ctx.lineTo(ux + q, uy); ctx.lineTo(ux, uy + q); ctx.closePath(); ctx.fill(); continue; }
      ctx.lineWidth = q * 0.2; ctx.lineCap = 'butt'; ctx.moveTo(ux + q, uy); ctx.lineTo(ux + q * 0.18, uy + q * 0.82); ctx.stroke(); // stem
    }
  }
  // cornerstones where the sashing crosses
  ctx.fillStyle = C.stone;
  for (let j = 0; j <= br; j++) for (let i = 0; i <= bc; i++) ctx.fillRect(gx + i * (bs + sash), gy + j * (bs + sash), sash, sash);
  // tiny calico print over the patchwork, and running-stitch quilting along the seams
  ctx.fillStyle = 'rgba(255,255,255,.16)';
  for (let yy = fy + 0.6 * u; yy < fy + fh; yy += 1.3 * u) for (let xx = fx + 0.6 * u + ((yy / u) % 2) * 0.6 * u; xx < fx + fw; xx += 1.3 * u) { ctx.beginPath(); ctx.arc(xx, yy, 0.18 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = 'rgba(250,240,220,.55)'; ctx.lineWidth = 0.32 * u; ctx.setLineDash([1.1 * u, 0.9 * u]);
  for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) {
    const x = gx + sash + i * (bs + sash), y = gy + sash + j * (bs + sash);
    ctx.strokeRect(x + 0.8 * u, y + 0.8 * u, bs - 1.6 * u, bs - 1.6 * u);
  }
  ctx.setLineDash([]);
}

// A woven landscape of the Rockies at dawn: banded sky, jagged snow-capped peaks, a turquoise lake with their
// reflection and a red canoe, pines along the shore, all on the knot grid. Border of little stepped pines.
function canadaRockies(ctx, W, H, seed) {
  const R = rng(seed + 88);
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { frame: '#1d2b26', line: '#ece2c8', tooth: '#3f8f86',
    sky: ['#2c3f6e', '#3d5689', '#5f74a8', '#9a92c0', '#d8a2a8', '#f1bf9c', '#f7dbb0'],
    far: '#8796bd', far2: '#a3afd0', rock: '#727a95', rock2: '#5a617c', snow: '#f4f1ea', snow2: '#d8dbe8',
    lake: '#3fa3a8', lake2: '#2c7f88', lake3: '#79c9c4', pine: '#1f3d2f', pine2: '#2a5240', shore: '#4b5b3c', canoe: '#c0392b', man: '#2a2220' };
  const fb = 4;
  ctx.fillStyle = C.frame; ctx.fillRect(0, 0, W, H);
  const x0 = fb + 1, y0 = fb + 1, x1 = cols - fb - 2, y1 = rows - fb - 2;
  for (let x = fb; x <= cols - fb - 1; x++) { blk(x, fb, C.line); blk(x, rows - fb - 1, C.line); }
  for (let y = fb; y <= rows - fb - 1; y++) { blk(fb, y, C.line); blk(cols - fb - 1, y, C.line); }
  // border: little stepped pines (3 knots tall) evenly spaced, pointing inward
  const pineRow = (len, put) => { const { n, d } = evenSteps(len, 6); for (let i = 0; i < n; i++) put(Math.round(i * d + d / 2)); };
  pineRow(cols - 2 * fb - 2, (a) => { const x = fb + 1 + a; for (const [dx, k] of [[0, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-1, 3], [1, 3]]) { blk(x + dx, k, C.tooth); blk(x + dx, rows - 1 - k, C.tooth); } });
  pineRow(rows - 2 * fb - 2, (a) => { const y = fb + 1 + a; for (const [dy, k] of [[0, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-1, 3], [1, 3]]) { blk(k, y + dy, C.tooth); blk(cols - 1 - k, y + dy, C.tooth); } });
  for (const [cx, cy] of [[2, 2], [cols - 3, 2], [2, rows - 3], [cols - 3, rows - 3]]) { blk(cx, cy, C.line); blk(cx - 1, cy, C.tooth); blk(cx + 1, cy, C.tooth); blk(cx, cy - 1, C.tooth); blk(cx, cy + 1, C.tooth); }

  const fw = x1 - x0 + 1, fh = y1 - y0 + 1, horizon = y0 + Math.round(fh * 0.55);
  for (let y = y0; y < horizon; y++) for (let x = x0; x <= x1; x++) {
    const t = (y - y0) / (horizon - y0);
    const band = Math.min(C.sky.length - 1, Math.max(0, Math.floor(t * C.sky.length + (((x * 7 + y * 3) % 5) - 2) * 0.06)));
    blk(x, y, C.sky[band]);
  }
  // peaks: each column's height is the highest of a few jagged triangles
  const range = (peaks, jag) => {
    const h = new Array(cols).fill(0);
    for (const [cx, half, top] of peaks) for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) if (x >= x0 && x <= x1) {
      const v = top * (1 - Math.abs(x - cx) / half) + ((x * 13) % 3 === 0 ? jag : 0);
      if (v > h[x]) h[x] = v;
    }
    return h.map((v) => Math.round(v));
  };
  const far = range([[x0 + fw * 0.08, fw * 0.16, 16], [x0 + fw * 0.3, fw * 0.14, 20], [x0 + fw * 0.55, fw * 0.15, 17], [x0 + fw * 0.82, fw * 0.16, 22], [x0 + fw * 1.0, fw * 0.12, 15]], 1);
  for (let x = x0; x <= x1; x++) for (let k = 0; k < far[x]; k++) blk(x, horizon - 1 - k, k > far[x] - 4 ? C.far2 : C.far);
  const nearP = [[x0 + fw * 0.18, fw * 0.17, 30], [x0 + fw * 0.44, fw * 0.2, 36], [x0 + fw * 0.7, fw * 0.16, 27], [x0 + fw * 0.93, fw * 0.14, 24]];
  const near = range(nearP, 1);
  for (let x = x0; x <= x1; x++) {
    // which peak owns this column, so its sunlit (left) face is lighter
    let own = nearP[0]; for (const pk of nearP) if (Math.abs(x - pk[0]) < Math.abs(x - own[0])) own = pk;
    for (let k = 0; k < near[x]; k++) {
      const fromTop = near[x] - k, snowLine = Math.round(near[x] * 0.32) + ((x * 7) % 3);
      blk(x, horizon - 1 - k, fromTop <= snowLine ? (x < own[0] ? C.snow : C.snow2) : (x < own[0] ? C.rock : C.rock2));
    }
  }
  // treeline along the shore
  for (let x = x0; x <= x1; x++) { const h = 2 + ((x * 5) % 4 === 0 ? 2 : (x * 3) % 5 === 0 ? 1 : 0); for (let k = 0; k < h; k++) blk(x, horizon - 1 - k + 1, x % 2 ? C.pine : C.pine2); }
  // lake with the mountains' reflection and ripples
  const lakeBottom = y1 - 7;
  for (let y = horizon + 1; y <= lakeBottom; y++) for (let x = x0; x <= x1; x++) {
    const d = y - horizon, refl = d < near[x] * 0.7;
    blk(x, y, refl ? C.lake2 : C.lake);
    if (y % 3 === 0 && (x + y * 5) % 11 < 4) blk(x, y, C.lake3);
  }
  // red canoe with a paddler
  const cx = x0 + Math.round(fw * 0.62), cy = horizon + Math.round((lakeBottom - horizon) * 0.55);
  for (let dx = -7; dx <= 7; dx++) { blk(cx + dx, cy, C.canoe); if (Math.abs(dx) < 6) blk(cx + dx, cy + 1, C.canoe); }
  blk(cx - 8, cy - 1, C.canoe); blk(cx + 8, cy - 1, C.canoe);
  for (let k = 1; k <= 3; k++) blk(cx, cy - k, C.man); blk(cx, cy - 4, C.man);
  for (let k = 0; k < 4; k++) blk(cx + 1 + k, cy - 3 + k, C.man); // paddle
  // shore and big pines in front, left and right
  for (let y = lakeBottom + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) blk(x, y, (x + y) % 7 === 0 ? C.pine2 : C.shore);
  const inField = (x, y, c) => { if (x >= x0 && x <= x1 && y >= y0 && y <= y1) blk(x, y, c); };
  const pine = (px, by, h) => {
    for (let k = 0; k < h; k++) { const w = Math.round((k / h) * h * 0.32 + ((k % 4) === 3 ? -1 : 0)); for (let dx = -w; dx <= w; dx++) inField(px + dx, by - h + k, dx < 0 ? C.pine2 : C.pine); }
    inField(px, by, C.shore);
  };
  pine(x0 + 4, y1 - 1, Math.round(fh * 0.5)); pine(x0 + 13, y1 - 1, Math.round(fh * 0.36)); pine(x0 + 20, y1, Math.round(fh * 0.24));
  pine(x1 - 5, y1 - 1, Math.round(fh * 0.46)); pine(x1 - 14, y1, Math.round(fh * 0.3));
  void R;
}

// Tartan in the Atlantic colours: navy and spruce green with white, red and gold lines, woven 2/2 twill so the
// stripes blend where they cross. Blanket-stitched edge.
function canadaTartan(ctx, W, H) {
  const u = H / 100;
  const sett = [['#1d2c52', 18], ['#2f5d46', 14], ['#e9e3d4', 2], ['#2f5d46', 14], ['#1d2c52', 18], ['#b33a32', 3], ['#1d2c52', 6], ['#d1a23c', 2], ['#1d2c52', 6], ['#b33a32', 3]];
  const seq = []; for (const [c, n] of sett) for (let k = 0; k < n; k++) seq.push(c);
  const full = [...seq, ...seq.slice().reverse()], n = full.length, t = 0.42 * u;
  const offX = Math.floor(n / 2 - (W / t / 2) % n + n) % n, offY = Math.floor(n / 2 - (H / t / 2) % n + n) % n;
  for (let j = 0; j * t < H; j++) for (let i = 0; i * t < W; i++) {
    ctx.fillStyle = ((i + j) & 3) < 2 ? full[(i + offX) % n] : full[(j + offY) % n];
    ctx.fillRect(i * t, j * t, t + 0.5, t + 0.5);
  }
  const edge = 3 * u;
  ctx.fillStyle = '#141d36'; frameRect(ctx, 0, 0, W, H, edge);
  ctx.strokeStyle = '#ece4d0'; ctx.lineWidth = 0.55 * u; ctx.lineCap = 'square';
  const o = edge * 0.45, reach = edge + 1.4 * u, inset = edge * 1.2;
  ctx.beginPath();
  const ticks = (len, at) => { const { n: k, d } = evenSteps(len, 2.4 * u); for (let i = 1; i < k; i++) at(i * d); };
  ticks(W - 2 * inset, (a) => { ctx.moveTo(inset + a, o); ctx.lineTo(inset + a, reach); ctx.moveTo(inset + a, H - o); ctx.lineTo(inset + a, H - reach); });
  ticks(H - 2 * inset, (a) => { ctx.moveTo(o, inset + a); ctx.lineTo(reach, inset + a); ctx.moveTo(W - o, inset + a); ctx.lineTo(W - reach, inset + a); });
  for (const [cx, cy, sx, sy] of [[o, o, 1, 1], [W - o, o, -1, 1], [o, H - o, 1, -1], [W - o, H - o, -1, -1]]) { ctx.moveTo(cx, cy); ctx.lineTo(cx + sx * (reach - o) * 1.1, cy + sy * (reach - o) * 1.1); }
  ctx.stroke();
  ctx.lineWidth = 0.45 * u; ctx.strokeRect(o, o, W - 2 * o, H - 2 * o);
}

// Border for the Canadian folk pictures: like the American one, with a little maple leaf in each corner.
function canadaBorder(x, cols, rows, C) {
  pictureBorder(x, cols, rows, C);
  for (const [cx, cy] of [[2.6, 2.6], [cols - 2.6, 2.6], [2.6, rows - 2.6], [cols - 2.6, rows - 2.6]]) {
    x.fillStyle = C.frame; x.fillRect(cx - 2.6, cy - 2.6, 5.2, 5.2);
    x.fillStyle = C.star; mapleLeaf(x, cx, cy + 0.2, 2.5);
  }
}

// Folk picture: a moose standing in a lake at dusk, a pale moon, a pine ridge behind.
function canadaMoose(ctx, W, H) {
  const C = { frame: '#1f2a24', line: '#e8dcbc', accent: '#c0532f', star: '#e8dcbc',
    sky: '#f0c27c', sky2: '#e89a6c', sky3: '#b4677c', moon: '#f7e9bd', ridge: '#6b5577', pine: '#243a30', pine2: '#30493b',
    water: '#6d8ca8', water2: '#56718d', water3: '#a6bccc', fur: '#4a3020', fur2: '#2f1d10', fur3: '#6e4a32', antler: '#d2b98e', reed: '#6b5c32' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    canadaBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16, wy = fy + fh * 0.66;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < wy; y++) { const t = (y - fy) / (wy - fy); x.fillStyle = t < 0.3 ? C.sky3 : t < 0.62 ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.moon; x.beginPath(); x.arc(fx + fw * 0.2, fy + fh * 0.2, fh * 0.08, 0, Math.PI * 2); x.fill();
    // far ridge and a row of pines along it
    x.fillStyle = C.ridge; x.beginPath(); x.moveTo(fx, wy); x.lineTo(fx, fy + fh * 0.5); x.quadraticCurveTo(fx + fw * 0.35, fy + fh * 0.4, fx + fw * 0.6, fy + fh * 0.5); x.quadraticCurveTo(fx + fw * 0.85, fy + fh * 0.56, fx + fw, fy + fh * 0.46); x.lineTo(fx + fw, wy); x.fill();
    for (let i = 0, px = fx; px < fx + fw; i++, px += 3.4) {
      const h = 6 + ((i * 7) % 5) * 1.6, by = wy + 0.5;
      x.fillStyle = i % 2 ? C.pine : C.pine2; x.beginPath(); x.moveTo(px, by - h); x.lineTo(px + 2.4, by); x.lineTo(px - 2.4, by); x.fill();
    }
    // lake with ripples
    x.fillStyle = C.water; x.fillRect(fx, wy, fw, fh);
    x.fillStyle = C.water3; for (let y = wy + 3; y < fy + fh; y += 4) for (let k = 0; k < 6; k++) x.fillRect(fx + ((k * 37 + y * 11) % fw), y, 5 + (k % 3) * 2, 1);
    // the moose, facing left, standing in the shallows
    const s = fh / 100, bx = fx + fw * 0.55, by = wy + 6 * s;
    // reflection first, broken by ripples
    x.fillStyle = C.water2; x.beginPath(); x.ellipse(bx + 3 * s, by + 9 * s, 26 * s, 5 * s, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.fur2; for (const lx of [-16, -9, 12, 19]) x.fillRect(bx + lx * s, by - 26 * s, 4.4 * s, 28 * s); // legs, into the water
    x.fillStyle = C.water3; for (const lx of [-16, -9, 12, 19]) x.fillRect(bx + (lx - 2) * s, by + 2 * s, 8.4 * s, 1); // ripples round the legs
    x.fillStyle = C.fur; x.beginPath(); x.ellipse(bx + 5 * s, by - 30 * s, 22 * s, 10.5 * s, 0, 0, Math.PI * 2); x.fill(); // body
    x.fillStyle = C.fur3; x.beginPath(); x.ellipse(bx - 7 * s, by - 35 * s, 12 * s, 9 * s, -0.2, 0, Math.PI * 2); x.fill(); // shoulder hump
    x.fillStyle = C.fur; x.beginPath(); x.moveTo(bx - 12 * s, by - 42 * s); x.lineTo(bx - 23 * s, by - 37 * s); x.lineTo(bx - 20 * s, by - 26 * s); x.lineTo(bx - 8 * s, by - 26 * s); x.closePath(); x.fill(); // neck
    x.fillStyle = C.fur2; x.beginPath(); // long head with the heavy muzzle
    x.moveTo(bx - 20 * s, by - 41 * s); x.lineTo(bx - 33 * s, by - 32 * s); x.quadraticCurveTo(bx - 38 * s, by - 26 * s, bx - 33 * s, by - 23 * s); x.lineTo(bx - 25 * s, by - 26 * s); x.lineTo(bx - 18 * s, by - 32 * s); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(bx - 27 * s, by - 26 * s); x.lineTo(bx - 25 * s, by - 17 * s); x.lineTo(bx - 22 * s, by - 27 * s); x.fill(); // bell
    x.beginPath(); x.moveTo(bx - 18 * s, by - 40 * s); x.lineTo(bx - 15 * s, by - 45 * s); x.lineTo(bx - 16 * s, by - 39 * s); x.fill(); // ear
    // palmate antlers: broad flat palms with tines along the top
    const palm = (ax, ay, rx, ry, rot, tines) => {
      x.fillStyle = C.antler; x.beginPath(); x.ellipse(ax, ay, rx, ry, rot, 0, Math.PI * 2); x.fill();
      for (let k = 0; k < tines; k++) { const t = -0.8 + (1.6 * k) / (tines - 1), tx = ax + Math.cos(rot) * rx * t, ty = ay + Math.sin(rot) * rx * t - ry * 0.7; x.beginPath(); x.moveTo(tx - 1.2 * s, ty + 1 * s); x.lineTo(tx, ty - 4.5 * s); x.lineTo(tx + 1.2 * s, ty + 1 * s); x.fill(); }
    };
    x.fillStyle = C.antler; x.fillRect(bx - 22 * s, by - 44 * s, 6 * s, 2.5 * s);
    palm(bx - 10 * s, by - 48 * s, 10 * s, 3.6 * s, -0.25, 5);
    palm(bx - 30 * s, by - 48 * s, 8 * s, 3.2 * s, 0.3, 4);
    x.fillStyle = C.moon; x.beginPath(); x.arc(bx - 26 * s, by - 34 * s, 0.9, 0, Math.PI * 2); x.fill(); // eye
    // reeds in the front corners
    x.fillStyle = C.reed; for (let k = 0; k < 14; k++) { const rx = k < 7 ? fx + 2 + k * 1.6 : fx + fw - 4 - (k - 7) * 1.7, rh = 6 + (k * 5) % 7; x.fillRect(rx, fy + fh - rh, 1, rh); }
    x.restore();
  });
}

// Folk picture: Canada geese flying south in a V over a marsh at sunset, with cattails in front.
function canadaGeese(ctx, W, H) {
  const C = { frame: '#2a2017', line: '#ecdcb8', accent: '#b5532c', star: '#ecdcb8',
    sky: '#f3d08a', sky2: '#efab66', sky3: '#d97f5c', sky4: '#a8607a', sun: '#fbe4a2', far: '#6f4f5c', water: '#d6936c', water2: '#b9785c', water3: '#f2c38c',
    reed: '#4d3c22', reed2: '#6f5a30', cat: '#5a3218', goose: '#262220', goose2: '#6b5444', chin: '#efe6d2' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    canadaBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16, hz = fy + fh * 0.64;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < hz; y++) { const t = (y - fy) / (hz - fy); x.fillStyle = t < 0.25 ? C.sky4 : t < 0.5 ? C.sky3 : t < 0.78 ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.sun; x.beginPath(); x.arc(fx + fw * 0.74, hz, fh * 0.12, Math.PI, 0); x.fill();
    // far shore
    x.fillStyle = C.far; x.beginPath(); x.moveTo(fx, hz + 1); for (let k = 0; k <= 30; k++) x.lineTo(fx + (fw * k) / 30, hz - 1.5 - ((k * 7) % 4)); x.lineTo(fx + fw, hz + 1); x.fill();
    // marsh water with the sun's reflection
    x.fillStyle = C.water; x.fillRect(fx, hz + 1, fw, fh);
    for (let y = hz + 3; y < fy + fh; y += 3) { x.fillStyle = C.water2; x.fillRect(fx + ((y * 23) % 30), y, fw * 0.3, 1); x.fillStyle = C.water3; const w = fh * 0.2 * (1 - (y - hz) / fh); x.fillRect(fx + fw * 0.74 - w / 2, y, w, 1); }
    // cattails and reeds in the front corners
    for (let k = 0; k < 22; k++) {
      const left = k < 11, rx = left ? fx + 1 + (k % 11) * 2.1 : fx + fw - 2 - (k % 11) * 2.1, rh = 10 + ((k * 7) % 9) * 1.4, by = fy + fh;
      x.fillStyle = k % 2 ? C.reed : C.reed2; x.fillRect(rx, by - rh, 1, rh);
      if (k % 3 === 0) { x.fillStyle = C.cat; x.fillRect(rx - 0.4, by - rh - 3, 1.8, 4); }
    }
    // the V: leader in front (left), two trailing arms
    const goose = (gx, gy, g, up) => {
      x.fillStyle = C.goose2; x.beginPath(); x.ellipse(gx, gy, 2.3 * g, 0.85 * g, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.goose; x.beginPath(); x.moveTo(gx - 1.2 * g, gy - 0.3 * g); x.lineTo(gx - 3.4 * g, gy - 0.5 * g); x.lineTo(gx - 3.4 * g, gy + 0.2 * g); x.lineTo(gx - 1.2 * g, gy + 0.5 * g); x.fill(); // neck
      x.beginPath(); x.ellipse(gx - 3.8 * g, gy - 0.2 * g, 0.8 * g, 0.55 * g, 0, 0, Math.PI * 2); x.fill(); // head
      x.fillStyle = C.chin; x.fillRect(gx - 3.9 * g, gy - 0.1 * g, 0.7 * g, 0.5 * g); // white chinstrap
      x.fillStyle = C.goose; x.beginPath(); // wing, up or down
      if (up) { x.moveTo(gx - 1 * g, gy - 0.4 * g); x.lineTo(gx + 1.6 * g, gy - 3 * g); x.lineTo(gx + 1 * g, gy - 0.4 * g); }
      else { x.moveTo(gx - 1 * g, gy + 0.2 * g); x.lineTo(gx + 0.6 * g, gy + 2.8 * g); x.lineTo(gx + 1.2 * g, gy + 0.2 * g); }
      x.fill();
      x.fillStyle = C.goose; x.beginPath(); x.moveTo(gx + 2 * g, gy - 0.5 * g); x.lineTo(gx + 3 * g, gy); x.lineTo(gx + 2 * g, gy + 0.5 * g); x.fill(); // tail
    };
    const g = fh * 0.036, lx = fx + fw * 0.28, ly = fy + fh * 0.32, dx = fw * 0.08, dy = fh * 0.07;
    goose(lx, ly, g, true);
    for (let k = 1; k <= 4; k++) { goose(lx + k * dx, ly - k * dy * 0.7, g * (1 - k * 0.04), true); goose(lx + k * dx, ly + k * dy * 0.85, g * (1 - k * 0.04), true); }
    x.restore();
  });
}

// Folk picture: a loon on a still northern lake at dawn, mist on the water, a pine shore behind. The black-and-white
// bird stands out against the bright water.
function canadaLoon(ctx, W, H) {
  const C = { frame: '#16222a', line: '#e6dcc0', accent: '#4f8fa0', star: '#e6dcc0',
    sky: '#3d5f7e', sky2: '#7f8fa8', sky3: '#d9a99a', sky4: '#f4cfa4', sun: '#fde6b4', ridge: '#24382f', pine: '#16291f',
    water: '#e7b897', water2: '#c99c86', water3: '#f6dcbc', mist: '#efe0cc', black: '#121314', white: '#f1f2ee', grey: '#3e444e', eye: '#c0302c' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    canadaBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16, hz = fy + fh * 0.48;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < hz; y++) { const t = (y - fy) / (hz - fy); x.fillStyle = t < 0.25 ? C.sky : t < 0.5 ? C.sky2 : t < 0.78 ? C.sky3 : C.sky4; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.sun; x.beginPath(); x.arc(fx + fw * 0.7, hz - 7, fh * 0.08, 0, Math.PI * 2); x.fill();
    // far shore: low ridge with pines
    x.fillStyle = C.ridge; x.fillRect(fx, hz - 2, fw, 4);
    for (let i = 0, px = fx; px < fx + fw; i++, px += 2.6) { const h = 4 + ((i * 5) % 4) * 1.6; x.fillStyle = C.pine; x.beginPath(); x.moveTo(px, hz - h - 1); x.lineTo(px + 1.8, hz + 1); x.lineTo(px - 1.8, hz + 1); x.fill(); }
    // bright still water with bands of mist and the sun's path
    x.fillStyle = C.water; x.fillRect(fx, hz + 2, fw, fh);
    for (let y = hz + 3; y < fy + fh; y += 3) { x.fillStyle = C.water2; x.fillRect(fx + ((y * 31) % fw), y, 8, 1); x.fillStyle = C.water3; const w = 4 + (y - hz) * 0.25; x.fillRect(fx + fw * 0.7 - w / 2, y, w, 1); }
    x.fillStyle = C.mist; x.fillRect(fx, hz + 3, fw * 0.4, 1); x.fillRect(fx + fw * 0.55, hz + 5, fw * 0.45, 1);
    // the loon, floating, facing left
    const s = fh / 100, bx = fx + fw * 0.44, wy = fy + fh * 0.8;
    x.fillStyle = C.water2; x.beginPath(); x.ellipse(bx + 2 * s, wy + 4 * s, 34 * s, 3.5 * s, 0, 0, Math.PI * 2); x.fill(); // reflection
    x.fillStyle = C.black;
    x.beginPath(); x.moveTo(bx - 24 * s, wy); x.quadraticCurveTo(bx - 22 * s, wy - 15 * s, bx + 4 * s, wy - 14 * s); x.quadraticCurveTo(bx + 26 * s, wy - 13 * s, bx + 34 * s, wy - 5 * s); x.lineTo(bx + 29 * s, wy); x.closePath(); x.fill(); // body
    x.beginPath(); x.moveTo(bx - 23 * s, wy - 4 * s); x.lineTo(bx - 28 * s, wy - 25 * s); x.lineTo(bx - 17 * s, wy - 27 * s); x.lineTo(bx - 13 * s, wy - 10 * s); x.fill(); // neck
    x.beginPath(); x.ellipse(bx - 23 * s, wy - 29 * s, 8 * s, 6.5 * s, 0, 0, Math.PI * 2); x.fill(); // head
    x.beginPath(); x.moveTo(bx - 29 * s, wy - 32 * s); x.lineTo(bx - 45 * s, wy - 27 * s); x.lineTo(bx - 29 * s, wy - 25 * s); x.fill(); // dagger bill
    x.fillStyle = C.eye; x.fillRect(bx - 26 * s, wy - 31 * s, 1.6, 1.4);
    x.fillStyle = C.white; // striped necklace, checkered back, white flank line
    for (let k = 0; k < 4; k++) x.fillRect(bx - 26 * s + k * 2.8 * s, wy - 19 * s, 1, 3);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 8; k++) { const px = bx - 6 * s + k * 4.6 * s + (r % 2) * 2.3 * s, py = wy - 11.5 * s + r * 3.2 * s; if (px < bx + 28 * s - r * 4 * s) x.fillRect(px, py, 1.6, 1.4); }
    x.fillRect(bx - 20 * s, wy - 2.5 * s, 16 * s, 1.2);
    x.restore();
  });
}

// Hooked border in Canada's colours: red and white sawtooth on a dark band, a white line round the picture.
const CANADA_FRAME = { dark: '#231a1a', a: '#b3282d', b: '#efe6d2', line: '#efe6d2' };

// Letter scenes for the Canadian postcard.
const CANADA_SCENES = [
  (c, w, h) => { c.fillStyle = '#e8a83a'; c.fillRect(0, 0, w, h); c.fillStyle = '#b3282d'; mapleLeaf(c, w * 0.5, h * 0.48, w * 0.48); }, // maple leaf
  (c, w, h) => { // Rockies over a turquoise lake
    c.fillStyle = '#8fc0de'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#6a7290'; c.beginPath(); c.moveTo(-w * 0.2, h * 0.66); c.lineTo(w * 0.35, h * 0.14); c.lineTo(w * 0.62, h * 0.4); c.lineTo(w * 0.82, h * 0.24); c.lineTo(w * 1.2, h * 0.66); c.fill();
    c.fillStyle = '#f4f2ec'; c.beginPath(); c.moveTo(w * 0.24, h * 0.25); c.lineTo(w * 0.35, h * 0.14); c.lineTo(w * 0.46, h * 0.26); c.fill();
    c.fillStyle = '#38a6a6'; c.fillRect(0, h * 0.66, w, h);
  },
  (c, w, h) => { // northern lights
    c.fillStyle = '#122247'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#4fdc9c'; c.fillRect(0, h * 0.24, w, h * 0.14); c.fillStyle = '#7d5cc4'; c.fillRect(0, h * 0.14, w, h * 0.1);
    c.fillStyle = '#2fa58a'; c.fillRect(0, h * 0.38, w, h * 0.1);
    c.fillStyle = '#e6edf4'; c.fillRect(0, h * 0.8, w, h);
    c.fillStyle = '#16301f'; c.beginPath(); c.moveTo(w * 0.5, h * 0.42); c.lineTo(w * 0.85, h * 0.85); c.lineTo(w * 0.15, h * 0.85); c.fill();
  },
  (c, w, h) => { // lighthouse stripes
    for (let i = 0; i < 6; i++) { c.fillStyle = i % 2 ? '#f2efe8' : '#b3282d'; c.fillRect(0, (h * i) / 6, w, h / 6 + 1); }
  },
  (c, w, h) => { // prairie with a grain elevator
    c.fillStyle = '#9fcbe2'; c.fillRect(0, 0, w, h); c.fillStyle = '#e3b448'; c.fillRect(0, h * 0.62, w, h);
    c.fillStyle = '#a3302f'; c.fillRect(w * 0.3, h * 0.24, w * 0.4, h * 0.42); c.beginPath(); c.moveTo(w * 0.26, h * 0.26); c.lineTo(w * 0.5, h * 0.1); c.lineTo(w * 0.74, h * 0.26); c.fill();
  },
  (c, w, h) => { // the flag
    c.fillStyle = '#b3282d'; c.fillRect(0, 0, w, h); c.fillStyle = '#f2ece0'; c.fillRect(w * 0.25, 0, w * 0.5, h);
    c.fillStyle = '#b3282d'; mapleLeaf(c, w * 0.5, h * 0.5, w * 0.22);
  },
];
function canadaPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'CANADA', CANADA_SCENES); }

// A hockey rink from above: the boards, white ice, the red centre line and goal lines, the blue lines, face-off
// circles, the creases and nets, and a maple leaf at centre ice.
function canadaHockey(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#1d2a44'; ctx.fillRect(0, 0, W, H);                      // stands
  const m = 5 * u, rx = m, ry = m, rw = W - 2 * m, rh = H - 2 * m, rad = 16 * u;
  ctx.fillStyle = '#f2c13a'; roundRect(ctx, rx, ry, rw, rh, rad); ctx.fill(); // kickplate
  const b = 1.8 * u;
  ctx.fillStyle = '#e8f0f3'; roundRect(ctx, rx + b, ry + b, rw - 2 * b, rh - 2 * b, rad - b); ctx.fill(); // ice
  const cx = W / 2, cy = H / 2, RED = '#c0302c', BLUE = '#2b55a6';
  const gl = rx + rw * 0.07, gr = rx + rw * 0.93, bl = cx - rw * 0.16, brl = cx + rw * 0.16;
  ctx.save(); roundRect(ctx, rx + b, ry + b, rw - 2 * b, rh - 2 * b, rad - b); ctx.clip();
  ctx.fillStyle = RED; ctx.fillRect(cx - 1.1 * u, ry, 2.2 * u, rh);                 // centre line
  ctx.fillRect(gl - 0.6 * u, ry, 1.2 * u, rh); ctx.fillRect(gr - 0.6 * u, ry, 1.2 * u, rh); // goal lines
  ctx.fillStyle = BLUE; ctx.fillRect(bl - 1.4 * u, ry, 2.8 * u, rh); ctx.fillRect(brl - 1.4 * u, ry, 2.8 * u, rh); // blue lines
  ctx.restore();
  // centre circle with the leaf
  ctx.strokeStyle = BLUE; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.arc(cx, cy, 12 * u, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = RED; mapleLeaf(ctx, cx, cy + 0.6 * u, 8 * u);
  // face-off circles and dots in each end, dots in the neutral zone
  ctx.strokeStyle = RED; ctx.lineWidth = 1.9 * u;
  for (const [ex, side] of [[gl + rw * 0.14, -1], [gr - rw * 0.14, 1]]) for (const dy of [-1, 1]) {
    ctx.beginPath(); ctx.arc(ex, cy + dy * rh * 0.24, 10 * u, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(ex, cy + dy * rh * 0.24, 2.2 * u, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + side * rw * 0.22, cy + dy * rh * 0.24, 2.2 * u, 0, Math.PI * 2); ctx.fill();
  }
  // creases and nets
  for (const [x, dir] of [[gl, 1], [gr, -1]]) {
    ctx.fillStyle = '#7fb0e0'; ctx.beginPath(); ctx.moveTo(x, cy - 5 * u); ctx.arc(x, cy, 5 * u, -Math.PI / 2, Math.PI / 2, dir < 0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = RED; ctx.lineWidth = 0.9 * u; ctx.stroke();
    ctx.fillStyle = RED; ctx.fillRect(dir > 0 ? x - 3.4 * u : x, cy - 3.6 * u, 3.4 * u, 7.2 * u);
    ctx.fillStyle = '#f4f4f0'; ctx.fillRect(dir > 0 ? x - 2.6 * u : x + 0.8 * u, cy - 2.8 * u, 1.8 * u, 5.6 * u);
  }
}

// Northern lights over the snow: green and violet curtains, stars, dark pines and a log cabin with a lit window.
function canadaAurora(ctx, W, H) {
  const u = H / 100, R = rng(626);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7); sky.addColorStop(0, '#0a1430'); sky.addColorStop(0.6, '#13305a'); sky.addColorStop(1, '#1f5068');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e6ecf6'; for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(R() * W, R() * H * 0.55, (0.35 + R() * 0.5) * u, 0, Math.PI * 2); ctx.fill(); }
  // curtains: wavy ribbons, bright at the lower edge and fading upward
  const curtain = (base, amp, phase, len, col, alpha) => {
    for (let x = 0; x < W; x += 0.8 * u) {
      const y = base + Math.sin(x / (W * 0.16) + phase) * amp + Math.sin(x / (W * 0.05) + phase * 2) * amp * 0.2;
      const g = ctx.createLinearGradient(0, y - len, 0, y);
      g.addColorStop(0, col.replace('A', '0')); g.addColorStop(0.7, col.replace('A', String(alpha * 0.7))); g.addColorStop(1, col.replace('A', String(alpha)));
      ctx.fillStyle = g; ctx.fillRect(x, y - len, 0.9 * u, len);
    }
  };
  curtain(H * 0.3, 7 * u, 0.4, 22 * u, 'rgba(140,90,210,A)', 0.55);
  curtain(H * 0.42, 9 * u, 1.6, 26 * u, 'rgba(70,225,160,A)', 0.9);
  curtain(H * 0.5, 6 * u, 2.9, 14 * u, 'rgba(60,200,190,A)', 0.6);
  // snowy hills
  const hill = (y0, amp, f0, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let k = 0; k <= 40; k++) { const t = k / 40; ctx.lineTo(W * t, y0 - amp * Math.sin(t * Math.PI * 2.2 + f0)); } ctx.lineTo(W, H); ctx.fill(); };
  hill(H * 0.66, 4 * u, 0.3, '#7d93b6'); hill(H * 0.76, 5 * u, 2.2, '#c7d5e6'); hill(H * 0.86, 3 * u, 4.1, '#e8eef6');
  // pines
  const pine = (x, by, h) => { ctx.fillStyle = '#10241b'; for (let k = 0; k < 3; k++) { const ty = by - h + k * h * 0.27, w = h * (0.17 + k * 0.08); ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x + w, ty + h * 0.38); ctx.lineTo(x - w, ty + h * 0.38); ctx.fill(); } ctx.fillRect(x - h * 0.03, by - h * 0.06, h * 0.06, h * 0.08); };
  for (const [fx, fy, h] of [[0.05, 0.86, 30], [0.12, 0.84, 22], [0.19, 0.8, 15], [0.3, 0.72, 9], [0.36, 0.73, 7], [0.62, 0.71, 8], [0.88, 0.84, 26], [0.95, 0.88, 34], [0.8, 0.79, 14]]) pine(W * fx, H * fy, h * u);
  // log cabin with snow on the roof and a warm window
  const cxb = W * 0.66, cyb = H * 0.8, cw = 22 * u, ch = 11 * u;
  ctx.fillStyle = '#5a3a26'; ctx.fillRect(cxb - cw / 2, cyb - ch, cw, ch);
  ctx.fillStyle = '#4a2f1f'; for (let k = 1; k < 4; k++) ctx.fillRect(cxb - cw / 2, cyb - ch + k * ch / 4, cw, 0.5 * u);
  ctx.fillStyle = '#f4f7fb'; ctx.beginPath(); ctx.moveTo(cxb - cw / 2 - 2.5 * u, cyb - ch); ctx.lineTo(cxb, cyb - ch - 9 * u); ctx.lineTo(cxb + cw / 2 + 2.5 * u, cyb - ch); ctx.fill();
  ctx.fillStyle = '#3a2a24'; ctx.fillRect(cxb + cw * 0.22, cyb - ch - 9 * u, 2.6 * u, 6 * u); // chimney
  ctx.fillStyle = '#ffd36a'; ctx.fillRect(cxb - cw * 0.3, cyb - ch * 0.7, 5 * u, 4.4 * u); ctx.fillRect(cxb + cw * 0.08, cyb - ch * 0.7, 5 * u, 4.4 * u);
  ctx.fillStyle = '#e8eef6'; ctx.fillRect(0, cyb, W, H - cyb);
}

// A red-roofed lighthouse on the granite rocks of the Atlantic shore, with waves, a fishing boat and gulls.
function canadaLighthouse(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.56); sky.addColorStop(0, '#4f97cc'); sky.addColorStop(1, '#bfe0ee');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.14, 0.16, 6], [0.22, 0.13, 8], [0.3, 0.17, 5], [0.72, 0.1, 6], [0.8, 0.12, 7.5], [0.88, 0.14, 5]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.7, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const hz = H * 0.56;
  ctx.fillStyle = '#2a6f5a'; ctx.beginPath(); ctx.moveTo(W * 0.7, hz); ctx.quadraticCurveTo(W * 0.86, hz - 6 * u, W, hz - 4 * u); ctx.lineTo(W, hz); ctx.fill(); // far headland
  const sea = ctx.createLinearGradient(0, hz, 0, H); sea.addColorStop(0, '#255f8f'); sea.addColorStop(1, '#2f7aa8');
  ctx.fillStyle = sea; ctx.fillRect(0, hz, W, H - hz);
  ctx.fillStyle = '#d9eef6'; for (let i = 0; i < 26; i++) { const y = hz + 3 * u + (i % 6) * 5 * u, x = ((i * 173) % 100) / 100 * W; ctx.fillRect(x, y, 7 * u, 0.9 * u); }
  // fishing boat
  ctx.fillStyle = '#b3282d'; ctx.beginPath(); ctx.moveTo(W * 0.74, hz + 8 * u); ctx.lineTo(W * 0.84, hz + 8 * u); ctx.lineTo(W * 0.82, hz + 11 * u); ctx.lineTo(W * 0.76, hz + 11 * u); ctx.fill();
  ctx.fillStyle = '#f2efe8'; ctx.fillRect(W * 0.775, hz + 4.5 * u, W * 0.03, 3.5 * u);
  // the lighthouse
  const lx = W * 0.36, base = H * 0.74, top = H * 0.2, bw = 16 * u, tw = 10 * u;
  ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.moveTo(lx - bw / 2, base); ctx.lineTo(lx - tw / 2, top); ctx.lineTo(lx + tw / 2, top); ctx.lineTo(lx + bw / 2, base); ctx.fill();
  ctx.fillStyle = '#d6d1c7'; ctx.beginPath(); ctx.moveTo(lx + bw * 0.15, base); ctx.lineTo(lx + tw * 0.15, top); ctx.lineTo(lx + tw / 2, top); ctx.lineTo(lx + bw / 2, base); ctx.fill(); // shade
  ctx.fillStyle = '#b3282d'; ctx.fillRect(lx - tw / 2 - 2 * u, top - 2 * u, tw + 4 * u, 2.4 * u);          // gallery
  ctx.fillStyle = '#ffe08a'; ctx.fillRect(lx - tw / 2 + 1 * u, top - 8.5 * u, tw - 2 * u, 6.5 * u);       // lantern
  ctx.fillStyle = '#2a2a2e'; for (let k = 0; k < 4; k++) ctx.fillRect(lx - tw / 2 + 1 * u + k * (tw - 2.8 * u) / 3, top - 8.5 * u, 0.8 * u, 6.5 * u);
  ctx.fillStyle = '#b3282d'; ctx.beginPath(); ctx.moveTo(lx - tw / 2 - 0.5 * u, top - 8.5 * u); ctx.lineTo(lx, top - 15 * u); ctx.lineTo(lx + tw / 2 + 0.5 * u, top - 8.5 * u); ctx.fill(); // roof
  ctx.fillStyle = '#b3282d'; ctx.fillRect(lx - 2 * u, base - 8 * u, 4 * u, 8 * u);                         // door
  ctx.fillStyle = '#3a4250'; ctx.fillRect(lx - 1.4 * u, top + 14 * u, 2.8 * u, 3.6 * u); ctx.fillRect(lx - 1.4 * u, top + 30 * u, 2.8 * u, 3.6 * u);
  // granite rocks in front
  const rock = (x, y, rx, ry, col, hi) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = hi; ctx.beginPath(); ctx.ellipse(x - rx * 0.2, y - ry * 0.35, rx * 0.55, ry * 0.4, 0, 0, Math.PI * 2); ctx.fill(); };
  for (const [x, y, rx, ry, c] of [[0.1, 0.92, 22, 12, 0], [0.3, 0.86, 30, 13, 1], [0.5, 0.95, 26, 12, 0], [0.62, 0.84, 16, 8, 1], [0.86, 0.95, 28, 12, 1], [0.44, 0.78, 14, 6, 0]]) {
    rock(W * x, H * y, rx * u, ry * u, c ? '#a39389' : '#b8aaa0', c ? '#c4b6ac' : '#d6cabf');
  }
  ctx.fillStyle = '#f4f8fa'; for (const [x, y] of [[0.56, 0.8], [0.7, 0.83], [0.2, 0.83]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, 5 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill(); } // spray
  // gulls
  ctx.strokeStyle = '#f7f8fa'; ctx.lineWidth = 1.2 * u; ctx.lineCap = 'round';
  for (const [x, y, s] of [[0.56, 0.24, 3], [0.62, 0.3, 2.4], [0.5, 0.32, 2]]) { ctx.beginPath(); ctx.moveTo(W * x - s * u, H * y - s * 0.4 * u); ctx.quadraticCurveTo(W * x - s * 0.4 * u, H * y - s * 0.8 * u, W * x, H * y); ctx.quadraticCurveTo(W * x + s * 0.4 * u, H * y - s * 0.8 * u, W * x + s * u, H * y - s * 0.4 * u); ctx.stroke(); }
}

// A polar bear walking on an ice floe under the low Arctic sun, icebergs on the horizon.
function canadaPolarBear(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5); sky.addColorStop(0, '#4d7fae'); sky.addColorStop(0.7, '#9ab9d2'); sky.addColorStop(1, '#f2cdb0');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const hz = H * 0.5;
  ctx.fillStyle = '#ffe2b0'; ctx.beginPath(); ctx.arc(W * 0.78, hz - 2 * u, 8 * u, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#e4eef4'; for (const [x, w, h] of [[0.08, 0.14, 8], [0.3, 0.08, 5], [0.55, 0.12, 10], [0.9, 0.1, 6]]) { ctx.beginPath(); ctx.moveTo(W * x, hz); ctx.lineTo(W * (x + w * 0.25), hz - h * u); ctx.lineTo(W * (x + w * 0.6), hz - h * 0.8 * u); ctx.lineTo(W * (x + w), hz); ctx.fill(); }
  const sea = ctx.createLinearGradient(0, hz, 0, H); sea.addColorStop(0, '#2c5f86'); sea.addColorStop(1, '#3a76a0');
  ctx.fillStyle = sea; ctx.fillRect(0, hz, W, H - hz);
  ctx.fillStyle = '#ffd9a8'; for (let k = 0; k < 6; k++) ctx.fillRect(W * 0.78 - (7 - k) * u, hz + 2 * u + k * 2.6 * u, (14 - 2 * k) * u, 0.8 * u); // sun on the water
  ctx.fillStyle = '#5f93b8'; for (let i = 0; i < 16; i++) ctx.fillRect(((i * 211) % 100) / 100 * W, hz + 4 * u + (i % 5) * 4 * u, 6 * u, 0.7 * u);
  // the floe: a flat slab with a blue-grey edge
  const fy = H * 0.72;
  ctx.fillStyle = '#9fbdd0'; ctx.beginPath(); ctx.moveTo(W * 0.12, fy); ctx.lineTo(W * 0.8, fy - 2 * u); ctx.lineTo(W * 0.86, fy + 4 * u); ctx.lineTo(W * 0.8, fy + 10 * u); ctx.lineTo(W * 0.16, fy + 10 * u); ctx.lineTo(W * 0.1, fy + 5 * u); ctx.fill();
  ctx.fillStyle = '#dceaf2'; ctx.beginPath(); ctx.moveTo(W * 0.12, fy); ctx.lineTo(W * 0.3, fy - 6 * u); ctx.lineTo(W * 0.72, fy - 8 * u); ctx.lineTo(W * 0.8, fy - 2 * u); ctx.lineTo(W * 0.6, fy + 2 * u); ctx.lineTo(W * 0.2, fy + 3 * u); ctx.fill();
  ctx.fillStyle = '#4a7fa6'; ctx.beginPath(); ctx.ellipse(W * 0.48, fy + 14 * u, 30 * u, 2 * u, 0, 0, Math.PI * 2); ctx.fill(); // reflection
  // the bear, walking left: drawn once a little larger in a shadow tone as an outline, then in cream
  const s = u * 1.15, bx = W * 0.5, by = fy - 4 * u;
  const shape = (grow, body, shade) => {
    const g = grow * s;
    for (const [lx, back] of [[-13, 0], [-6, 1], [10, 0], [16, 1]]) { ctx.fillStyle = shade || (back ? '#d2c6ad' : '#efe5cc'); roundRect(ctx, bx + lx * s - g, by - 12 * s - g, 5 * s + 2 * g, 13 * s + 2 * g, 2 * s); ctx.fill(); }
    ctx.fillStyle = shade || body;
    ctx.beginPath(); ctx.ellipse(bx + 2 * s, by - 16 * s, 21 * s + g, 10 * s + g, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx + 14 * s, by - 18 * s, 10 * s + g, 9 * s + g, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(bx - 14 * s, by - 22 * s - g); ctx.lineTo(bx - 25 * s - g, by - 17 * s - g); ctx.lineTo(bx - 24 * s - g, by - 10 * s + g); ctx.lineTo(bx - 12 * s, by - 10 * s + g); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx - 27 * s, by - 13 * s, 6.5 * s + g, 4.6 * s + g, 0.15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx - 32 * s, by - 11 * s, 3.4 * s + g, 2.6 * s + g, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(bx - 25 * s, by - 18 * s, 1.6 * s + g, 0, Math.PI * 2); ctx.fill();
  };
  shape(0.9, null, '#8f8a80');
  shape(0, '#f1e7cc');
  ctx.fillStyle = '#d9cdb2'; ctx.beginPath(); ctx.ellipse(bx + 2 * s, by - 9.5 * s, 18 * s, 3.5 * s, 0, 0, Math.PI * 2); ctx.fill(); // belly shadow
  ctx.fillStyle = '#1a1a1c'; ctx.beginPath(); ctx.arc(bx - 35 * s, by - 11.5 * s, 1.3 * s, 0, Math.PI * 2); ctx.fill(); // nose
  ctx.beginPath(); ctx.arc(bx - 28.5 * s, by - 14.5 * s, 0.9 * s, 0, Math.PI * 2); ctx.fill(); // eye
}

// ---------- Mexico pack ----------
// Woven rugs first (Mexico's own strongest rug craft: sarapes and flat-woven wool rugs), then folk pictures knotted on
// a grid, then hooked pictures.

// Sarape: bright stripes across the cloth in graded bands, and a serrated diamond in the middle on a black ground.
function mexicoSarape(ctx, W, H) {
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { black: '#1c1418', white: '#f2ead8', red: '#c22a32', pink: '#e2477a', orange: '#ee7a2a', yellow: '#f4c13a',
    green: '#3f9a4a', teal: '#1f9a9a', blue: '#2c4fa0', purple: '#6a3a8f', maroon: '#7a1f2c' };
  const seq = [], add = (c, n) => { for (let k = 0; k < n; k++) seq.push(c); };
  add(C.black, 2); add(C.white, 1); add(C.red, 3); add(C.orange, 2); add(C.yellow, 2); add(C.white, 1); add(C.teal, 2); add(C.blue, 3);
  add(C.purple, 2); add(C.white, 1); add(C.pink, 3); add(C.red, 2); add(C.maroon, 2); add(C.black, 1); add(C.yellow, 1); add(C.black, 1);
  add(C.green, 3); add(C.teal, 2); add(C.white, 1); add(C.orange, 3); add(C.yellow, 2); add(C.pink, 2); add(C.purple, 2);
  // stripes run across the rug, mirrored about the middle so both ends match
  for (let x = 0; x < cols; x++) { const k = Math.min(x, cols - 1 - x), c = seq[k % seq.length]; for (let y = 0; y < rows; y++) blk(x, y, c); }
  // centre: black field in a stepped lozenge, holding concentric serrated diamonds
  const cx = (cols - 1) / 2, cy = (rows - 1) / 2, hw = cols * 0.19, hh = rows * 0.38;
  const rings = [C.yellow, C.orange, C.red, C.maroon, C.black, C.white, C.teal, C.blue, C.black, C.pink, C.red, C.black, C.yellow, C.black];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const d = Math.abs(x - cx) / hw + Math.abs(y - cy) / hh;
    if (d > 1.12) continue;
    if (d > 1) { blk(x, y, C.black); continue; }
    const teeth = ((Math.abs(x - cx) + Math.abs(y - cy)) % 2) * 0.03; // serrated ring edges
    blk(x, y, rings[Math.min(rings.length - 1, Math.floor((d + teeth) * rings.length))]);
  }
  // black binding round the edge with little white stitches on the long sides
  for (let x = 0; x < cols; x++) { blk(x, 0, C.black); blk(x, rows - 1, C.black); if (x % 3 === 1) { blk(x, 1, C.white); blk(x, rows - 2, C.white); } }
  for (let y = 0; y < rows; y++) { blk(0, y, C.black); blk(cols - 1, y, C.black); }
}

// Flat-woven wool rug in natural dyes (cochineal red, indigo, marigold) with a running step-fret (greca) border and a
// big stepped diamond in the field.
function mexicoGreca(ctx, W, H) {
  const g = knotGrid(ctx, W, H, 90), { cols, rows, blk } = g;
  const C = { cream: '#ebdfc4', red: '#a32b2f', red2: '#922529', indigo: '#24365e', gold: '#d99a2b', char: '#2b2422', brown: '#7a5236' };
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) blk(x, y, C.char);
  // the fret: a key that spirals in, its baseline running on into the next one
  const KEY = ['#####.', '#...#.', '#.#.#.', '#.###.', '#.....', '######'];
  const B = 1, band = 6, inner = B + band;          // char edge, then the fret band
  for (let y = B; y < rows - B; y++) for (let x = B; x < cols - B; x++) if (x < inner || y < inner || x >= cols - inner || y >= rows - inner) blk(x, y, C.cream);
  const runH = (y0, flip) => { const len = cols - 2 * inner, n = Math.floor(len / 6), off = inner + Math.floor((len - n * 6) / 2);
    for (let i = 0; i < n * 6; i++) for (let r = 0; r < 6; r++) if (KEY[flip ? 5 - r : r][i % 6] === '#') blk(off + i, y0 + r, C.char); };
  const runV = (x0, flip) => { const len = rows - 2 * inner, n = Math.floor(len / 6), off = inner + Math.floor((len - n * 6) / 2);
    for (let i = 0; i < n * 6; i++) for (let r = 0; r < 6; r++) if (KEY[flip ? 5 - r : r][i % 6] === '#') blk(x0 + r, off + i, C.char); };
  runH(B, false); runH(rows - B - 6, true); runV(B, false); runV(cols - B - 6, true);
  // corner blocks: a small stepped diamond
  for (const [x0, y0] of [[B, B], [cols - inner, B], [B, rows - inner], [cols - inner, rows - inner]]) {
    for (let dy = 0; dy < band; dy++) for (let dx = 0; dx < band; dx++) {
      const d = Math.abs(dx - 2.5) + Math.abs(dy - 2.5);
      blk(x0 + dx, y0 + dy, d < 1.5 ? C.red : d < 2.6 ? C.char : C.cream);
    }
  }
  // lines between border and field
  for (let x = inner; x < cols - inner; x++) { blk(x, inner, C.gold); blk(x, rows - 1 - inner, C.gold); blk(x, inner + 1, C.char); blk(x, rows - 2 - inner, C.char); }
  for (let y = inner; y < rows - inner; y++) { blk(inner, y, C.gold); blk(cols - 1 - inner, y, C.gold); blk(inner + 1, y, C.char); blk(cols - 2 - inner, y, C.char); }
  // red field with lazy lines
  const fx0 = inner + 2, fy0 = inner + 2, fx1 = cols - inner - 3, fy1 = rows - inner - 3;
  for (let y = fy0; y <= fy1; y++) for (let x = fx0; x <= fx1; x++) blk(x, y, (y - fy0) % 5 === 4 && (x + y) % 9 < 6 ? C.red2 : C.red);
  // big stepped diamond: concentric rings, a hook on each side point
  const cx = (fx0 + fx1) / 2, cy = (fy0 + fy1) / 2, hh = (fy1 - fy0) / 2 - 2, hw = hh * 1.5;
  const rings = [C.char, C.char, C.cream, C.cream, C.indigo, C.indigo, C.indigo, C.gold, C.gold, C.cream, C.cream, C.red, C.red, C.char, C.gold];
  for (let y = fy0; y <= fy1; y++) for (let x = fx0; x <= fx1; x++) {
    const d = Math.abs(x - cx) / hw + Math.abs(y - cy) / hh;
    if (d <= 1) blk(x, y, rings[Math.min(rings.length - 1, Math.floor((1 - d) * rings.length))]);
  }
  // corner quarter-diamonds in indigo, outlined in cream
  for (const [ax, ay, sx, sy] of [[fx0, fy0, 1, 1], [fx1, fy0, -1, 1], [fx0, fy1, 1, -1], [fx1, fy1, -1, 1 * -1]]) {
    for (let dy = 0; dy < 12; dy++) for (let dx = 0; dx < 18; dx++) { const d = dx / 18 + dy / 12; if (d < 1) blk(ax + sx * dx, ay + sy * dy, d > 0.86 ? C.cream : C.indigo); }
  }
  // little stepped crosses in gold between the diamond and the corners
  for (const [x, y] of [[cx - hw * 0.95, cy - hh * 0.62], [cx + hw * 0.95, cy - hh * 0.62], [cx - hw * 0.95, cy + hh * 0.62], [cx + hw * 0.95, cy + hh * 0.62]]) {
    const X = Math.round(x), Y = Math.round(y);
    for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, 2], [0, -2]]) blk(X + dx, Y + dy, C.gold);
    blk(X, Y, C.char);
  }
}

// Blue-and-white painted tiles: a cobalt flower in each tile, quarter circles in the corners that join into rings
// across four tiles, yellow and orange touches, set in grout with a cobalt border.
function mexicoTile(ctx, W, H) {
  const u = H / 100;
  const C = { glaze: '#f3ecdc', glaze2: '#ebe2cf', cobalt: '#1f3f8f', blue: '#5a82c8', yellow: '#e7b638', orange: '#d9682b', green: '#3f7d4a', grout: '#bdb5a5' };
  const bw = 6 * u;
  ctx.fillStyle = C.cobalt; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.yellow; frameRect(ctx, bw * 0.55, bw * 0.55, W - bw * 1.1, H - bw * 1.1, 0.9 * u);
  ctx.fillStyle = C.glaze; for (const [x, y, len, horiz] of [[bw, bw * 0.28, W - 2 * bw, 1], [bw, H - bw * 0.28, W - 2 * bw, 1], [bw * 0.28, bw, H - 2 * bw, 0], [W - bw * 0.28, bw, H - 2 * bw, 0]]) {
    const { n, d } = evenSteps(len, 3 * u); for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.arc(horiz ? x + i * d : x, horiz ? y : y + i * d, 0.5 * u, 0, Math.PI * 2); ctx.fill(); }
  }
  const fx = bw, fy = bw, fw = W - 2 * bw, fh = H - 2 * bw, nr = 4, nc = Math.round(fw / (fh / nr)), tw = fw / nc, th = fh / nr;
  ctx.fillStyle = C.grout; ctx.fillRect(fx, fy, fw, fh);
  const g = 0.35 * u;
  for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
    const x = fx + i * tw, y = fy + j * th;
    ctx.save(); ctx.beginPath(); ctx.rect(x + g, y + g, tw - 2 * g, th - 2 * g); ctx.clip();
    ctx.fillStyle = (i + j) % 2 ? C.glaze : C.glaze2; ctx.fillRect(x, y, tw, th);
    const T = Math.min(tw, th);
    // corner quarter circles: cobalt ring, yellow, orange eye
    for (const [cx, cy] of [[x, y], [x + tw, y], [x, y + th], [x + tw, y + th]]) {
      ctx.fillStyle = C.cobalt; ctx.beginPath(); ctx.arc(cx, cy, T * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, T * 0.19, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.orange; ctx.beginPath(); ctx.arc(cx, cy, T * 0.08, 0, Math.PI * 2); ctx.fill();
    }
    // centre flower: eight petals, a yellow and orange heart
    const mx = x + tw / 2, my = y + th / 2;
    for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; ctx.fillStyle = k % 2 ? C.blue : C.cobalt; ctx.beginPath(); ctx.ellipse(mx + Math.cos(a) * T * 0.17, my + Math.sin(a) * T * 0.17, T * 0.12, T * 0.055, a, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(mx, my, T * 0.075, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.orange; ctx.beginPath(); ctx.arc(mx, my, T * 0.035, 0, Math.PI * 2); ctx.fill();
    // green leaves toward the middle of each edge
    ctx.fillStyle = C.green;
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) { ctx.beginPath(); ctx.ellipse(mx + dx * tw * 0.4, my + dy * th * 0.4, T * (dx ? 0.03 : 0.06), T * (dx ? 0.06 : 0.03), 0, 0, Math.PI * 2); ctx.fill(); }
    // glaze highlight
    const hl = ctx.createLinearGradient(x, y, x + tw, y + th); hl.addColorStop(0, 'rgba(255,255,255,.14)'); hl.addColorStop(0.5, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl; ctx.fillRect(x, y, tw, th);
    ctx.restore();
  }
}

// A woven landscape of the blue agave fields: rows of spiky rosettes on red earth running off to a volcano at sunset.
function mexicoAgave(ctx, W, H) {
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { frame: '#2a1a24', line: '#f0dcc0', tooth: '#e2477a', tooth2: '#ee7a2a',
    sky: ['#3b2a5e', '#5f3474', '#93407a', '#c8566a', '#e8795a', '#f4a35a', '#f8cc72'], sun: '#fde6a0',
    far: '#6a4a7e', far2: '#7f5a8a', vol: '#4f3a6a', vol2: '#5f4878', earth: '#9c4f36', earth2: '#87422e', earth3: '#b5623f', ag: '#6aa8a0', ag2: '#3f7f7a', ag3: '#8fc4b8' };
  const fb = 4;
  ctx.fillStyle = C.frame; ctx.fillRect(0, 0, W, H);
  const x0 = fb + 1, y0 = fb + 1, x1 = cols - fb - 2, y1 = rows - fb - 2;
  for (let x = fb; x <= cols - fb - 1; x++) { blk(x, fb, C.line); blk(x, rows - fb - 1, C.line); }
  for (let y = fb; y <= rows - fb - 1; y++) { blk(fb, y, C.line); blk(cols - fb - 1, y, C.line); }
  const teethRow = (len, put) => { const n = Math.max(1, Math.round(len / 4)), per = len / n; for (let i = 0; i < len; i++) { const ph = (i % per) / per, k = Math.floor(i / per); const h = ph < 0.5 ? Math.round(ph * 4) : Math.round((1 - ph) * 4); for (let j = 0; j < Math.min(2, h); j++) put(i, j, k % 2 ? C.tooth2 : C.tooth); } };
  teethRow(cols - 2 * fb - 2, (i, j, c) => { blk(fb + 1 + i, 1 + j, c); blk(fb + 1 + i, rows - 2 - j, c); });
  teethRow(rows - 2 * fb - 2, (i, j, c) => { blk(1 + j, fb + 1 + i, c); blk(cols - 2 - j, fb + 1 + i, c); });
  for (const [cx, cy] of [[2, 2], [cols - 3, 2], [2, rows - 3], [cols - 3, rows - 3]]) { blk(cx, cy, C.line); blk(cx - 1, cy, C.tooth); blk(cx + 1, cy, C.tooth); blk(cx, cy - 1, C.tooth); blk(cx, cy + 1, C.tooth); }

  const fw = x1 - x0 + 1, fh = y1 - y0 + 1, hz = y0 + Math.round(fh * 0.42);
  for (let y = y0; y < hz; y++) for (let x = x0; x <= x1; x++) { const t = (y - y0) / (hz - y0); blk(x, y, C.sky[Math.min(C.sky.length - 1, Math.max(0, Math.floor(t * C.sky.length + (((x * 7 + y * 3) % 5) - 2) * 0.06)))]); }
  const sx = x0 + Math.round(fw * 0.72), sr = Math.round(fh * 0.1);
  for (let dy = -sr; dy <= 0; dy++) for (let dx = -sr; dx <= sr; dx++) if (dx * dx + dy * dy <= sr * sr) blk(sx + dx, hz + dy, C.sun);
  // far hills and the volcano: a cone with a flat top
  for (let x = x0; x <= x1; x++) {
    const h1 = Math.round(4 + 2 * Math.sin(x * 0.11) + ((x * 7) % 3 === 0 ? 1 : 0));
    for (let k = 0; k < h1; k++) blk(x, hz - 1 - k, k === h1 - 1 ? C.far2 : C.far);
    const vx = x0 + fw * 0.3, vh = Math.round(fh * 0.28 - Math.max(0, Math.abs(x - vx) - 3) * 0.75);
    for (let k = 0; k < vh; k++) blk(x, hz - 1 - k, x < vx ? C.vol2 : C.vol);
  }
  // earth, then rows of agaves in perspective, small and close together far away
  for (let y = hz; y <= y1; y++) for (let x = x0; x <= x1; x++) blk(x, y, (y - hz) % 4 === 1 ? C.earth2 : C.earth);
  const vpx = x0 + fw * 0.5, N = 7;
  for (let r = 0; r < N; r++) {
    const t = (r + 2) / (N + 1), y = Math.round(hz + 2 + (y1 - hz - 3) * t * t), size = 1 + Math.round(t * t * 8), gap = 5 + t * t * 15;
    for (let x = vpx - Math.floor((vpx - x0) / gap) * gap; x <= x1; x += gap) {
      const X = Math.round(x);
      blk(X, y + 1, C.earth3);
      for (const [ang, len] of [[-90, 0.8], [-68, 1], [-112, 1], [-45, 0.95], [-135, 0.95], [-22, 0.8], [-158, 0.8], [-5, 0.5], [-175, 0.5]]) {
        const L = Math.max(1, Math.round(size * len)), a = (ang * Math.PI) / 180;
        for (let k = 1; k <= L; k++) { const px = X + Math.round(Math.cos(a) * k * 1.3), py = y + Math.round(Math.sin(a) * k); if (px >= x0 && px <= x1 && py >= hz) blk(px, py, k === L && size > 3 ? C.ag3 : ang === -90 || size < 3 ? C.ag : C.ag2); }
      }
      blk(X, y, C.ag2);
    }
  }
}

// Border for the Mexican folk pictures: like the others, with a little four-petal flower in each corner.
function mexicoBorder(x, cols, rows, C) {
  pictureBorder(x, cols, rows, C);
  for (const [cx, cy] of [[2.6, 2.6], [cols - 2.6, 2.6], [2.6, rows - 2.6], [cols - 2.6, rows - 2.6]]) {
    x.fillStyle = C.frame; x.fillRect(cx - 2.6, cy - 2.6, 5.2, 5.2);
    x.fillStyle = C.star; for (const [dx, dy] of [[0, -1.3], [0, 1.3], [-1.3, 0], [1.3, 0]]) { x.beginPath(); x.arc(cx + dx, cy + dy, 1.1, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.accent; x.fillRect(cx - 0.6, cy - 0.6, 1.2, 1.2);
  }
}

// Folk picture: a sugar skull for the Day of the Dead, flowers for eyes, among marigolds on a dark ground.
function mexicoSkull(ctx, W, H) {
  const C = { frame: '#1b1420', line: '#f0e2c4', accent: '#e8782a', star: '#e4407a',
    bg: '#2a1a36', bg2: '#33204a', bone: '#f3ece0', bone2: '#d6ccbd', black: '#141016', pink: '#e4407a', teal: '#2fb3b0',
    yellow: '#f2c23a', orange: '#e8782a', purple: '#8a4aa8', green: '#4f9a4a', red: '#c22a32' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    mexicoBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.bg; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.bg2; for (let y = fy + 3; y < fy + fh; y += 6) x.fillRect(fx, y, fw, 1);
    // marigolds and leaves down both sides
    const marigold = (mx, my, r, col, col2) => {
      x.fillStyle = C.green; x.beginPath(); x.ellipse(mx - r * 1.1, my + r * 0.9, r * 0.9, r * 0.35, -0.5, 0, Math.PI * 2); x.ellipse(mx + r * 1.1, my + r * 0.9, r * 0.9, r * 0.35, 0.5, 0, Math.PI * 2); x.fill();
      x.fillStyle = col; for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2; x.beginPath(); x.arc(mx + Math.cos(a) * r * 0.7, my + Math.sin(a) * r * 0.7, r * 0.42, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = col2; x.beginPath(); x.arc(mx, my, r * 0.5, 0, Math.PI * 2); x.fill();
    };
    for (const [mx, my, r, k] of [[0.08, 0.18, 6, 0], [0.2, 0.42, 5, 1], [0.07, 0.68, 7, 1], [0.2, 0.88, 5, 0], [0.92, 0.2, 6, 1], [0.8, 0.44, 5, 0], [0.93, 0.68, 7, 0], [0.8, 0.9, 5, 1]]) {
      marigold(fx + fw * mx, fy + fh * my, r, k ? C.orange : C.yellow, k ? C.yellow : C.orange);
    }
    // the skull
    const s = fh / 100, cx = fx + fw / 2, cy = fy + fh * 0.48;
    x.fillStyle = C.bone2; x.beginPath(); x.ellipse(cx + 1, cy - 6 * s + 1, 33 * s, 31 * s, 0, 0, Math.PI * 2); x.fill(); // shadow
    x.fillStyle = C.bone;
    x.beginPath(); x.ellipse(cx, cy - 8 * s, 33 * s, 31 * s, 0, 0, Math.PI * 2); x.fill();           // cranium
    x.beginPath(); x.ellipse(cx, cy + 12 * s, 26 * s, 14 * s, 0, 0, Math.PI * 2); x.fill();          // cheeks
    roundRect(x, cx - 17 * s, cy + 14 * s, 34 * s, 22 * s, 7 * s); x.fill();                           // jaw
    // eyes: black sockets ringed with pink and teal petals
    for (const sx of [-1, 1]) {
      const ex = cx + sx * 13 * s, ey = cy + 2 * s;
      for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; x.fillStyle = k % 2 ? C.teal : C.pink; x.beginPath(); x.arc(ex + Math.cos(a) * 10 * s, ey + Math.sin(a) * 10 * s, 3.4 * s, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.black; x.beginPath(); x.arc(ex, ey, 8 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.yellow; x.beginPath(); x.arc(ex, ey, 2.4 * s, 0, Math.PI * 2); x.fill();
    }
    // nose: an upside-down heart
    x.fillStyle = C.black; x.beginPath(); x.moveTo(cx, cy + 13 * s); x.lineTo(cx - 4.5 * s, cy + 20 * s); x.lineTo(cx, cy + 22 * s); x.lineTo(cx + 4.5 * s, cy + 20 * s); x.fill();
    // mouth: stitched smile and teeth
    x.fillStyle = C.black; x.fillRect(cx - 15 * s, cy + 27 * s, 30 * s, 1.4);
    for (let k = -3; k <= 3; k++) x.fillRect(cx + k * 4.4 * s - 0.5, cy + 24 * s, 1, 7 * s);
    // forehead flower and dotted arcs
    const ffx = cx, ffy = cy - 25 * s;
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; x.fillStyle = k % 2 ? C.orange : C.yellow; x.beginPath(); x.arc(ffx + Math.cos(a) * 6 * s, ffy + Math.sin(a) * 6 * s, 3.6 * s, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.pink; x.beginPath(); x.arc(ffx, ffy, 3.2 * s, 0, Math.PI * 2); x.fill();
    for (const [sx, col] of [[-1, C.purple], [1, C.purple]]) for (let k = 0; k < 5; k++) { const a = Math.PI * (sx < 0 ? 0.62 + k * 0.08 : 0.38 - k * 0.08); x.fillStyle = col; x.beginPath(); x.arc(ffx + Math.cos(a) * 16 * s * -1, ffy + 6 * s - Math.sin(a) * 9 * s, 1.6 * s, 0, Math.PI * 2); x.fill(); }
    // cheek swirls: dots and a little leaf
    for (const sx of [-1, 1]) {
      x.fillStyle = C.green; x.beginPath(); x.ellipse(cx + sx * 22 * s, cy + 14 * s, 4 * s, 1.8 * s, sx * 0.6, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.beginPath(); x.arc(cx + sx * 24 * s, cy + 9 * s, 2 * s, 0, Math.PI * 2); x.fill();
    }
    // chin: a teal heart
    x.fillStyle = C.teal; x.beginPath(); x.arc(cx - 2.2 * s, cy + 33 * s, 2.4 * s, 0, Math.PI * 2); x.arc(cx + 2.2 * s, cy + 33 * s, 2.4 * s, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx - 4.4 * s, cy + 33.6 * s); x.lineTo(cx, cy + 38 * s); x.lineTo(cx + 4.4 * s, cy + 33.6 * s); x.fill();
    x.restore();
  });
}

// Folk picture: monarch butterflies flying over the fir forest where they spend the winter.
function mexicoMonarch(ctx, W, H) {
  const C = { frame: '#1d2a1f', line: '#efe3c6', accent: '#e8782a', star: '#efe3c6',
    sky: '#8fc8e2', sky2: '#b9def0', fir: '#1f4a35', fir2: '#2c5e43', fir3: '#163a2a', ground: '#3d5a35',
    orange: '#ec7a22', orange2: '#f5a03a', black: '#141414', white: '#f6f2ea' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    mexicoBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = (y - fy) < fh * 0.32 ? C.sky : C.sky2; x.fillRect(fx, y, fw, 1); }
    // layered fir forest
    const firRow = (base, h, step, col, seed) => { for (let i = 0, px = fx - 2; px < fx + fw + 4; i++, px += step) { const hh = h * (0.8 + ((i * seed) % 5) * 0.1); x.fillStyle = col; x.beginPath(); x.moveTo(px, base - hh); x.lineTo(px + hh * 0.22, base); x.lineTo(px - hh * 0.22, base); x.fill(); } x.fillRect(fx, base, fw, fh); };
    firRow(fy + fh * 0.62, fh * 0.3, 6, C.fir2, 3); firRow(fy + fh * 0.78, fh * 0.34, 7, C.fir, 7); firRow(fy + fh * 0.95, fh * 0.3, 9, C.fir3, 5);
    // butterflies
    const butterfly = (bx, by, s, rot) => {
      x.save(); x.translate(bx, by); x.rotate(rot);
      const wing = (sx, top) => {
        const rx = top ? 7 * s : 5 * s, ry = top ? 5 * s : 4 * s, wx = sx * (top ? 6.5 * s : 4.5 * s), wy = top ? -3 * s : 3.6 * s;
        x.fillStyle = C.black; x.beginPath(); x.ellipse(wx, wy, rx, ry, sx * (top ? -0.35 : 0.4), 0, Math.PI * 2); x.fill();
        x.fillStyle = top ? C.orange : C.orange2; x.beginPath(); x.ellipse(wx - sx * 0.6 * s, wy, rx * 0.72, ry * 0.68, sx * (top ? -0.35 : 0.4), 0, Math.PI * 2); x.fill();
        if (s > 1.4) { // veins and white dots on the big ones
          x.strokeStyle = C.black; x.lineWidth = Math.max(0.8, s * 0.35);
          for (const k of [-0.5, 0, 0.5]) { x.beginPath(); x.moveTo(sx * 0.6 * s, 0); x.lineTo(wx + sx * rx * 0.5, wy + k * ry); x.stroke(); }
          x.fillStyle = C.white; for (let k = 0; k < 4; k++) { const a = (top ? -1.4 : 0.6) + k * 0.4; x.beginPath(); x.arc(wx + Math.cos(a) * rx * 0.88 * sx, wy + Math.sin(a) * ry * 0.88, Math.max(0.5, s * 0.4), 0, Math.PI * 2); x.fill(); }
        }
      };
      for (const sx of [-1, 1]) { wing(sx, false); wing(sx, true); }
      x.fillStyle = C.black; x.beginPath(); x.ellipse(0, 0, 1 * s, 5 * s, 0, 0, Math.PI * 2); x.fill();
      x.restore();
    };
    const R = rng(1919);
    for (let i = 0; i < 22; i++) butterfly(fx + R() * fw, fy + R() * fh * 0.7, 0.55 + R() * 0.35, (R() - 0.5) * 0.8);
    butterfly(fx + fw * 0.26, fy + fh * 0.4, 2.3, -0.2);
    butterfly(fx + fw * 0.74, fy + fh * 0.64, 1.9, 0.25);
    x.restore();
  });
}

// Folk picture: a painted wooden jaguar in the colours of the carved animals from Oaxaca: patterned all over, on pink.
function mexicoJaguar(ctx, W, H) {
  const C = { frame: '#2a1430', line: '#f2e4c4', accent: '#2fb3b0', star: '#f2c23a',
    bg: '#d6246e', bg2: '#c01e62', dot: '#f2c23a', yellow: '#f2b52e', orange: '#e8782a', teal: '#2fb3b0', purple: '#6a3a8f',
    black: '#1b1420', white: '#f6efe0', green: '#4f9a4a', pink: '#f07aa8' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    mexicoBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.bg; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.bg2; for (let y = fy + 2; y < fy + fh; y += 5) for (let k = 0; k < fw; k += 5) x.fillRect(fx + k + (y % 10 ? 2.5 : 0), y, 1, 1);
    // flowers around
    for (const [px, py, col] of [[0.1, 0.18, C.yellow], [0.88, 0.15, C.teal], [0.08, 0.8, C.teal], [0.9, 0.82, C.yellow], [0.5, 0.1, C.purple]]) {
      const X = fx + fw * px, Y = fy + fh * py;
      x.fillStyle = col; for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; x.beginPath(); x.arc(X + Math.cos(a) * 2.6, Y + Math.sin(a) * 2.6, 1.8, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.white; x.beginPath(); x.arc(X, Y, 1.2, 0, Math.PI * 2); x.fill();
    }
    // the jaguar, walking left
    const s = fh / 76, bx = fx + fw * 0.54, by = fy + fh * 0.84;
    const legs = [[-22, 1], [-12, 0], [14, 1], [24, 0]];
    for (const [lx, back] of legs) { // legs, striped
      x.fillStyle = back ? C.orange : C.yellow; roundRect(x, bx + lx * s, by - 20 * s, 6 * s, 26 * s, 2.5 * s); x.fill();
      x.fillStyle = C.purple; for (let k = 0; k < 3; k++) x.fillRect(bx + lx * s, by - 10 * s + k * 5 * s, 6 * s, 1.4);
      x.fillStyle = C.black; x.fillRect(bx + lx * s - 0.5, by + 5 * s, 7 * s, 1.4);
    }
    // tail curling up
    x.strokeStyle = C.yellow; x.lineWidth = 4.5 * s; x.lineCap = 'round';
    x.beginPath(); x.moveTo(bx + 28 * s, by - 26 * s); x.quadraticCurveTo(bx + 46 * s, by - 26 * s, bx + 44 * s, by - 46 * s); x.stroke();
    x.strokeStyle = C.teal; x.lineWidth = 1.4; for (let k = 0; k < 4; k++) { const t = 0.25 + k * 0.2, tx = bx + (28 + 18 * t) * s, ty = by - (26 + 20 * t * t) * s; x.beginPath(); x.moveTo(tx - 2 * s, ty); x.lineTo(tx + 2 * s, ty); x.stroke(); }
    x.fillStyle = C.yellow; x.beginPath(); x.ellipse(bx + 2 * s, by - 24 * s, 31 * s, 12 * s, 0, 0, Math.PI * 2); x.fill(); // body
    // rosettes: rings with a dot
    for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) {
      const px = bx - 16 * s + k * 9 * s + r * 4.5 * s, py = by - 28 * s + r * 8 * s;
      x.fillStyle = [C.teal, C.purple, C.orange][(k + r) % 3]; x.beginPath(); x.arc(px, py, 3.2 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.yellow; x.beginPath(); x.arc(px, py, 1.5 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.black; x.fillRect(px - 0.5, py - 0.5, 1, 1);
    }
    x.fillStyle = C.orange; x.fillRect(bx - 26 * s, by - 14 * s, 52 * s, 1.4); // belly line
    // head
    const hx = bx - 33 * s, hy = by - 30 * s;
    x.fillStyle = C.yellow; x.beginPath(); x.arc(hx, hy, 11 * s, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(hx - 8 * s, hy + 4 * s, 7 * s, 5.5 * s, 0, 0, Math.PI * 2); x.fill(); // muzzle
    for (const ex of [-1, 1]) { x.fillStyle = C.yellow; x.beginPath(); x.arc(hx + ex * 6 * s + 2 * s, hy - 10 * s, 3.6 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = C.pink; x.beginPath(); x.arc(hx + ex * 6 * s + 2 * s, hy - 10 * s, 1.8 * s, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.white; x.beginPath(); x.ellipse(hx - 4 * s, hy - 2 * s, 3.4 * s, 2.6 * s, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.black; x.beginPath(); x.arc(hx - 4.6 * s, hy - 2 * s, 1.6 * s, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.pink; x.beginPath(); x.moveTo(hx - 15 * s, hy + 1 * s); x.lineTo(hx - 11 * s, hy + 1 * s); x.lineTo(hx - 13 * s, hy + 4 * s); x.fill(); // nose
    x.fillStyle = C.black; x.fillRect(hx - 14 * s, hy + 7 * s, 8 * s, 1.2); // mouth
    x.fillStyle = C.teal; for (let k = 0; k < 3; k++) x.fillRect(hx + 2 * s + k * 3 * s, hy - 6 * s + k * 0.5, 1.2, 1.2); // forehead dots
    x.fillStyle = C.purple; x.fillRect(hx + 3 * s, hy + 3 * s, 6 * s, 1.2);
    x.restore();
  });
}

// Hooked border in festive colours: Mexican pink and marigold sawtooth on a dark plum band.
const MEXICO_FRAME = { dark: '#2a1630', a: '#d6246e', b: '#e8902a', line: '#efe3c6' };

// Letter scenes for the Mexican postcard.
const MEXICO_SCENES = [
  (c, w, h) => { // stepped pyramid in the jungle
    c.fillStyle = '#7cc3e6'; c.fillRect(0, 0, w, h); c.fillStyle = '#2f7a3f'; c.fillRect(0, h * 0.72, w, h);
    c.fillStyle = '#c9bfa8'; for (let k = 0; k < 5; k++) c.fillRect(w * (0.05 + k * 0.08), h * (0.72 - (k + 1) * 0.09), w * (0.9 - k * 0.16), h * 0.09);
    c.fillStyle = '#9b8f78'; c.fillRect(w * 0.44, h * 0.27, w * 0.12, h * 0.45);
  },
  (c, w, h) => { const cols = ['#c22a32', '#ee7a2a', '#f4c13a', '#3f9a4a', '#1f9a9a', '#2c4fa0', '#6a3a8f', '#e2477a']; for (let i = 0; i < 8; i++) { c.fillStyle = cols[i]; c.fillRect(0, (h * i) / 8, w, h / 8 + 1); } }, // sarape
  (c, w, h) => { // papel picado
    c.fillStyle = '#e2477a'; c.fillRect(0, 0, w, h * 0.5); c.fillStyle = '#1f9a9a'; c.fillRect(0, h * 0.5, w, h);
    c.fillStyle = '#f6efe0'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(w * (0.2 + (k % 3) * 0.3), h * (0.25 + Math.floor(k / 3) * 0.5), w * 0.07, 0, Math.PI * 2); c.fill(); }
  },
  (c, w, h) => { // saguaro on the sand
    c.fillStyle = '#f2b45a'; c.fillRect(0, 0, w, h); c.fillStyle = '#d99a5a'; c.fillRect(0, h * 0.75, w, h);
    c.fillStyle = '#2f6b3f'; c.fillRect(w * 0.35, h * 0.15, w * 0.3, h * 0.65);
  },
  (c, w, h) => { // Caribbean beach
    c.fillStyle = '#8fd0ea'; c.fillRect(0, 0, w, h); c.fillStyle = '#2bb5b0'; c.fillRect(0, h * 0.45, w, h * 0.3); c.fillStyle = '#f3e3bd'; c.fillRect(0, h * 0.75, w, h);
    c.fillStyle = '#ffd36a'; c.beginPath(); c.arc(w * 0.7, h * 0.2, w * 0.14, 0, Math.PI * 2); c.fill();
  },
  (c, w, h) => { // marigolds
    c.fillStyle = '#4f9a4a'; c.fillRect(0, 0, w, h);
    for (let k = 0; k < 6; k++) { const x = w * (0.25 + (k % 2) * 0.5), y = h * (0.18 + Math.floor(k / 2) * 0.32); c.fillStyle = '#ee8a22'; c.beginPath(); c.arc(x, y, w * 0.2, 0, Math.PI * 2); c.fill(); c.fillStyle = '#f4c13a'; c.beginPath(); c.arc(x, y, w * 0.09, 0, Math.PI * 2); c.fill(); }
  },
];
function mexicoPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'MEXICO', MEXICO_SCENES); }

// The stepped pyramid at Chichén Itzá: nine terraces, the central stair, the temple on top, jungle round the plaza.
function mexicoPyramid(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7); sky.addColorStop(0, '#3f8fcf'); sky.addColorStop(1, '#bfe3f2');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.15, 0.14, 6], [0.24, 0.12, 7.5], [0.78, 0.16, 6], [0.86, 0.13, 7]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.7, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const base = H * 0.8, top = H * 0.24, cx = W * 0.5, bw = W * 0.66, tw = W * 0.2, n = 9, th = (base - top) / n;
  // jungle behind
  ctx.fillStyle = '#2f6b3a'; for (let i = 0; i < 26; i++) { const x = (i / 25) * W, r = (7 + (i * 7) % 5) * u; ctx.beginPath(); ctx.arc(x, base - 2 * u, r, 0, Math.PI * 2); ctx.fill(); }
  for (let k = 0; k < n; k++) {
    const w = bw - (bw - tw) * (k / n), y = base - (k + 1) * th;
    ctx.fillStyle = '#cbbfa4'; ctx.fillRect(cx - w / 2, y, w, th);
    ctx.fillStyle = '#ab9f86'; ctx.fillRect(cx + w * 0.08, y, w * 0.42, th);          // shaded right side
    ctx.fillStyle = '#e3d9c2'; ctx.fillRect(cx - w / 2, y, w, th * 0.18);             // terrace edge light
  }
  // the stair: a lighter band with step lines, and balustrades
  const sw = 12 * u;
  ctx.fillStyle = '#ded4bd'; ctx.fillRect(cx - sw / 2, top, sw, base - top);
  ctx.fillStyle = '#a99c82'; for (let y = top + 1.4 * u; y < base; y += 2.2 * u) ctx.fillRect(cx - sw / 2, y, sw, 0.6 * u);
  ctx.fillStyle = '#9b8f78'; ctx.fillRect(cx - sw / 2 - 1.6 * u, top, 1.6 * u, base - top); ctx.fillRect(cx + sw / 2, top, 1.6 * u, base - top);
  // temple on top
  ctx.fillStyle = '#c4b89d'; ctx.fillRect(cx - tw * 0.38, top - 11 * u, tw * 0.76, 11 * u);
  ctx.fillStyle = '#a2967c'; ctx.fillRect(cx - tw * 0.38, top - 12.5 * u, tw * 0.76, 1.8 * u);
  ctx.fillStyle = '#3a3228'; for (const dx of [-0.22, 0, 0.22]) ctx.fillRect(cx + dx * tw - 1.6 * u, top - 8 * u, 3.2 * u, 8 * u);
  // plaza and near trees
  ctx.fillStyle = '#86b25e'; ctx.fillRect(0, base, W, H - base);
  ctx.fillStyle = '#76a352'; for (let y = base + 3 * u; y < H; y += 4 * u) ctx.fillRect(0, y, W, 0.8 * u);
  ctx.fillStyle = '#245a2f'; for (const [x, r] of [[0.03, 14], [0.12, 10], [0.92, 13], [0.99, 16]]) { ctx.beginPath(); ctx.arc(W * x, base - r * 0.3 * u, r * u, 0, Math.PI * 2); ctx.fill(); }
}

// A street of brightly painted houses under strings of papel picado.
function mexicoStreet(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#7cc6ea'; ctx.fillRect(0, 0, W, H);
  // houses
  const houses = [['#e2477a', '#f4c13a'], ['#f4c13a', '#1f9a9a'], ['#1f9a9a', '#ee7a2a'], ['#ee7a2a', '#2c4fa0'], ['#6a3a8f', '#f4c13a'], ['#3f9a4a', '#e2477a']];
  const base = H * 0.82, n = houses.length, hw = W / n;
  houses.forEach(([wall, trim], i) => {
    const x = i * hw, top = H * (0.34 + (i % 3) * 0.04);
    ctx.fillStyle = wall; ctx.fillRect(x, top, hw + 1, base - top);
    ctx.fillStyle = trim; ctx.fillRect(x, top, hw, 2.6 * u);                         // cornice
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x + hw - 1.2 * u, top, 1.2 * u, base - top);
    // arched door
    const dw = hw * 0.32, dh = (base - top) * 0.46, dx = x + hw * 0.34;
    ctx.fillStyle = trim; roundRect(ctx, dx - 1 * u, base - dh - 1 * u, dw + 2 * u, dh + 1 * u, dw * 0.5); ctx.fill();
    ctx.fillStyle = '#5a3424'; roundRect(ctx, dx, base - dh, dw, dh, dw * 0.45); ctx.fill();
    // window with shutters and a flower pot
    const wy = top + 7 * u, ww = hw * 0.28, wx = x + hw * 0.36;
    ctx.fillStyle = trim; ctx.fillRect(wx - 1 * u, wy - 1 * u, ww + 2 * u, 9 * u);
    ctx.fillStyle = '#2b3550'; ctx.fillRect(wx, wy, ww, 7 * u);
    ctx.fillStyle = '#b5623f'; ctx.fillRect(wx, wy + 7.4 * u, ww, 2.4 * u);
    ctx.fillStyle = '#c22a32'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(wx + ww * (0.2 + k * 0.3), wy + 6.6 * u, 1.4 * u, 0, Math.PI * 2); ctx.fill(); }
  });
  // cobbled street
  ctx.fillStyle = '#9a8a78'; ctx.fillRect(0, base, W, H - base);
  ctx.fillStyle = '#857565'; for (let y = base + 2 * u; y < H; y += 3 * u) for (let x = ((y / u) % 6) * u; x < W; x += 6 * u) ctx.fillRect(x, y, 4.4 * u, 2 * u);
  // papel picado: strings across the sky with cut-paper flags
  const cols = ['#e2477a', '#f4c13a', '#1f9a9a', '#ee7a2a', '#6a3a8f', '#3f9a4a', '#2c4fa0'];
  for (const [y0, sag, off] of [[H * 0.07, 7 * u, 0], [H * 0.2, 6 * u, 3]]) {
    const yAt = (x) => y0 + sag * Math.sin((x / W) * Math.PI);
    ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 0.6 * u; ctx.beginPath(); for (let x = 0; x <= W; x += 2 * u) x ? ctx.lineTo(x, yAt(x)) : ctx.moveTo(x, yAt(x)); ctx.stroke();
    const fw = 9 * u, fh = 11 * u;
    for (let i = 0, x = 3 * u; x < W - fw; i++, x += fw + 2 * u) {
      const y = yAt(x + fw / 2);
      ctx.fillStyle = cols[(i + off) % cols.length]; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + fw, y); ctx.lineTo(x + fw, y + fh);
      for (let k = 4; k >= 0; k--) ctx.lineTo(x + (fw * k) / 4 + (k % 2 ? 0 : 0), y + fh - (k % 2 ? 1.6 * u : 0)); ctx.fill();
      ctx.fillStyle = '#7cc6ea'; // the cut-outs show the sky
      ctx.beginPath(); ctx.arc(x + fw / 2, y + fh * 0.48, 1.8 * u, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(x + fw * 0.2, y + fh * 0.18, 1.2 * u, 1.2 * u); ctx.fillRect(x + fw * 0.68, y + fh * 0.18, 1.2 * u, 1.2 * u);
    }
  }
}

// Trajineras on the canals of Xochimilco: bright boats under painted arches, willows along the banks.
function mexicoTrajinera(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#9fd3ea'; ctx.fillRect(0, 0, W, H * 0.45);
  ctx.fillStyle = '#4f8f4f'; for (let i = 0; i < 16; i++) { const x = (i / 15) * W, r = (14 + (i * 5) % 7) * u; ctx.beginPath(); ctx.ellipse(x, H * 0.36, r, r * 1.3, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#3f7d46'; for (let i = 0; i < 24; i++) { const x = (i / 23) * W, r = (9 + (i * 5) % 6) * u; ctx.beginPath(); ctx.arc(x, H * 0.42, r, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#2f6b3a'; for (let i = 0; i < 18; i++) { const x = (i / 17) * W + 3 * u, r = (6 + (i * 3) % 5) * u; ctx.beginPath(); ctx.arc(x, H * 0.47, r, 0, Math.PI * 2); ctx.fill(); }
  const water = ctx.createLinearGradient(0, H * 0.48, 0, H); water.addColorStop(0, '#3e8b7c'); water.addColorStop(1, '#2f6f64');
  ctx.fillStyle = water; ctx.fillRect(0, H * 0.48, W, H * 0.52);
  ctx.fillStyle = '#6fb3a0'; for (let i = 0; i < 20; i++) ctx.fillRect(((i * 157) % 100) / 100 * W, H * 0.55 + (i % 6) * 6 * u, 8 * u, 0.9 * u);
  const boat = (cx, y, s, hull, roof, arch) => {
    const U = s * u, L = 72 * U, Hh = 8 * U;
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(cx - L * 0.46, y + Hh, L * 0.92, 2.4 * U);       // shadow on the water
    // hull: two colours with a white band
    ctx.fillStyle = hull[0]; ctx.beginPath(); ctx.moveTo(cx - L / 2, y); ctx.lineTo(cx + L / 2, y); ctx.lineTo(cx + L * 0.45, y + Hh); ctx.lineTo(cx - L * 0.45, y + Hh); ctx.fill();
    ctx.fillStyle = '#f6efe0'; ctx.fillRect(cx - L * 0.48, y + Hh * 0.3, L * 0.96, Hh * 0.18);
    ctx.fillStyle = hull[1]; ctx.fillRect(cx - L * 0.47, y + Hh * 0.55, L * 0.94, Hh * 0.22);
    // posts and a flat canopy with a scalloped edge in alternating colours
    ctx.fillStyle = '#5a3424'; for (const k of [-0.32, -0.08, 0.16, 0.4]) ctx.fillRect(cx + L * k - 0.9 * U, y - 20 * U, 1.8 * U, 20 * U);
    ctx.fillStyle = roof; ctx.fillRect(cx - L * 0.36, y - 24 * U, L * 0.8, 4.4 * U);
    const pal = ['#c22a32', '#f4c13a', '#3f9a4a', '#2c4fa0', '#e2477a'];
    for (let k = 0, x = cx - L * 0.36; x < cx + L * 0.44; k++, x += 4 * U) { ctx.fillStyle = pal[k % pal.length]; ctx.beginPath(); ctx.arc(x + 2 * U, y - 19.6 * U, 2 * U, 0, Math.PI); ctx.fill(); }
    // the painted arch at the bow: an open arch in a thick band of colours, a flower at the top
    const ax = cx - L * 0.44, aw = 22 * U, ah = 30 * U, r = aw / 2;
    ctx.lineWidth = 4.4 * U; ctx.lineCap = 'butt';
    const segs = 7;
    for (let k = 0; k < segs; k++) {
      ctx.strokeStyle = [arch, '#e2477a', '#3f9a4a', '#2c4fa0'][k % 4];
      ctx.beginPath(); ctx.arc(ax + r, y - ah + r, r, Math.PI + (k / segs) * Math.PI, Math.PI + ((k + 1) / segs) * Math.PI); ctx.stroke();
    }
    ctx.strokeStyle = arch; ctx.beginPath(); ctx.moveTo(ax, y - ah + r); ctx.lineTo(ax, y); ctx.moveTo(ax + aw, y - ah + r); ctx.lineTo(ax + aw, y); ctx.stroke();
    ctx.fillStyle = '#c22a32'; ctx.beginPath(); ctx.arc(ax + r, y - ah - 1 * U, 3.4 * U, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f4c13a'; ctx.beginPath(); ctx.arc(ax + r, y - ah - 1 * U, 1.5 * U, 0, Math.PI * 2); ctx.fill();
  };
  boat(W * 0.8, H * 0.6, 0.55, ['#2c4fa0', '#f4c13a'], '#3f9a4a', '#ee7a2a');
  boat(W * 0.46, H * 0.84, 1.35, ['#c22a32', '#f4c13a'], '#e2477a', '#f4c13a');
}

// Tulum: a Mayan temple on the cliff above a turquoise Caribbean sea, white sand and palms.
function mexicoTulum(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5); sky.addColorStop(0, '#3f9ad6'); sky.addColorStop(1, '#c6ecf6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.6, 0.12, 6], [0.68, 0.1, 7.5], [0.8, 0.15, 5]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.7, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const hz = H * 0.46;
  ctx.fillStyle = '#1f7fa8'; ctx.fillRect(0, hz, W, H * 0.12);
  ctx.fillStyle = '#25b3b8'; ctx.fillRect(0, hz + H * 0.12, W, H * 0.12);
  ctx.fillStyle = '#7fdcd2'; ctx.fillRect(0, hz + H * 0.24, W, H * 0.07);
  ctx.fillStyle = '#f2f8f8'; for (let i = 0; i < 12; i++) ctx.fillRect(((i * 137) % 100) / 100 * W, hz + 4 * u + (i % 4) * 6 * u, 7 * u, 0.9 * u);
  // beach
  ctx.fillStyle = '#f3e3bd'; ctx.beginPath(); ctx.moveTo(0, H * 0.82); ctx.quadraticCurveTo(W * 0.5, H * 0.74, W, H * 0.8); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(0, H * 0.82); ctx.quadraticCurveTo(W * 0.5, H * 0.74, W, H * 0.8); ctx.lineTo(W, H * 0.815); ctx.quadraticCurveTo(W * 0.5, H * 0.755, 0, H * 0.835); ctx.fill();
  // the cliff and the temple on it
  ctx.fillStyle = '#c9b88f'; ctx.beginPath(); ctx.moveTo(0, H * 0.4); ctx.lineTo(W * 0.3, H * 0.42); ctx.lineTo(W * 0.38, H * 0.6); ctx.lineTo(W * 0.42, H * 0.8); ctx.lineTo(0, H * 0.84); ctx.fill();
  ctx.fillStyle = '#a8966e'; ctx.beginPath(); ctx.moveTo(W * 0.24, H * 0.44); ctx.lineTo(W * 0.3, H * 0.42); ctx.lineTo(W * 0.38, H * 0.6); ctx.lineTo(W * 0.42, H * 0.8); ctx.lineTo(W * 0.3, H * 0.8); ctx.fill();
  ctx.fillStyle = '#4f7f3a'; ctx.fillRect(0, H * 0.38, W * 0.3, 3 * u);
  const tx = W * 0.14, ty = H * 0.38, tw = 22 * u, thh = 13 * u;
  ctx.fillStyle = '#b7a77f'; ctx.fillRect(tx - tw / 2 - 2 * u, ty - 3 * u, tw + 4 * u, 3 * u);
  ctx.fillStyle = '#d2c39c'; ctx.fillRect(tx - tw / 2, ty - 3 * u - thh, tw, thh);
  ctx.fillStyle = '#b7a77f'; ctx.fillRect(tx - tw / 2 - 1 * u, ty - 3 * u - thh - 2.4 * u, tw + 2 * u, 2.4 * u);
  ctx.fillStyle = '#3a3228'; for (const dx of [-0.3, 0, 0.3]) ctx.fillRect(tx + dx * tw - 1.8 * u, ty - 3 * u - thh * 0.7, 3.6 * u, thh * 0.7);
  // palms on the beach
  const palm = (x, y, h, lean) => {
    ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 2.4 * u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + lean * h * 0.4, y - h * 0.5, x + lean * h * 0.3, y - h); ctx.stroke();
    const tx2 = x + lean * h * 0.3, ty2 = y - h;
    ctx.strokeStyle = '#2f7a3a'; ctx.lineWidth = 2.6 * u;
    for (let k = 0; k < 8; k++) {
      const a = Math.PI * (0.92 + k * 0.165), ex = tx2 + Math.cos(a) * h * 0.34, ey = ty2 + Math.sin(a) * h * 0.16 + h * 0.08;
      ctx.beginPath(); ctx.moveTo(tx2, ty2); ctx.quadraticCurveTo(tx2 + Math.cos(a) * h * 0.22, ty2 + Math.sin(a) * h * 0.2 - h * 0.06, ex, ey); ctx.stroke();
    }
    ctx.fillStyle = '#5a3a24'; ctx.beginPath(); ctx.arc(tx2, ty2 + 1 * u, 1.8 * u, 0, Math.PI * 2); ctx.fill();
  };
  palm(W * 0.78, H * 0.92, 40 * u, -0.4); palm(W * 0.9, H * 0.94, 46 * u, -0.25); palm(W * 0.66, H * 0.9, 28 * u, 0.3);
}

// ---------- Persia pack ----------
// Knotted Persian rugs from the carpet heartland (Tabriz was named World Carpet Weaving City in 2015): each one drawn on
// a fine knot grid, so florals and figures keep the stepped edges of a hand-knotted rug.

// Classic Persian border: dark outer guard, a thin light guard line, the main band with rosettes on a running vine,
// a second guard, then the field. Returns the field in knots.
function persBorder(x, cols, rows, C, bw = 17) {
  x.fillStyle = C.guard; x.fillRect(0, 0, cols, rows);
  x.fillStyle = C.border; x.fillRect(3, 3, cols - 6, rows - 6);
  const line = (o, col) => { x.fillStyle = col; x.fillRect(o, o, cols - 2 * o, 1); x.fillRect(o, rows - 1 - o, cols - 2 * o, 1); x.fillRect(o, o, 1, rows - 2 * o); x.fillRect(cols - 1 - o, o, 1, rows - 2 * o); };
  // reciprocal dots in the outer guard
  x.fillStyle = C.guard2; for (let i = 3; i < cols - 3; i += 3) { x.fillRect(i, 1, 1, 1); x.fillRect(i, rows - 2, 1, 1); } for (let i = 3; i < rows - 3; i += 3) { x.fillRect(1, i, 1, 1); x.fillRect(cols - 2, i, 1, 1); }
  line(2, C.guard2); line(bw - 3, C.guard2); line(bw - 2, C.guard); line(bw - 1, C.guard);
  // running vine along the band centre, rosettes and small palmettes on it
  const m = bw / 2 + 0.5, amp = bw * 0.16;
  x.strokeStyle = C.vine; x.lineWidth = 1.2;
  const side = (x0, y0, len, horiz) => {
    const { n, d } = evenSteps(len, 14);
    x.beginPath();
    for (let t = 0; t <= len; t += 0.5) { const o = Math.sin((t / d) * Math.PI * 2) * amp; const px = horiz ? x0 + t : x0 + o, py = horiz ? y0 + o : y0 + t; t ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.stroke();
    for (let k = 0; k <= n; k++) {
      const t = k * d, px = horiz ? x0 + t : x0, py = horiz ? y0 : y0 + t;
      rosette(x, px, py, bw * 0.3, 8, k % 2 ? C.r1 : C.r2, C.r3, C.border);
      if (k < n) { const t2 = t + d / 2, o = Math.sin(Math.PI) * amp; palmette(x, horiz ? x0 + t2 : x0 + o, horiz ? y0 + o : y0 + t2, bw * 0.22, horiz ? (k % 2 ? 0 : Math.PI) : (k % 2 ? Math.PI / 2 : -Math.PI / 2), C.r3, C.r1); }
    }
  };
  side(m, m, cols - 2 * m, true); side(m, rows - m, cols - 2 * m, true); side(m, m, rows - 2 * m, false); side(cols - m, m, rows - 2 * m, false);
  x.fillStyle = C.field; x.fillRect(bw, bw, cols - 2 * bw, rows - 2 * bw);
  return { fx: bw, fy: bw, fw: cols - 2 * bw, fh: rows - 2 * bw };
}

// A polygon star with alternating long and short points; `ang` spins it.
function persStar(x, cx, cy, rx, ry, points, inner, col, ang = 0) {
  x.fillStyle = col; x.beginPath();
  for (let i = 0; i < points * 2; i++) { const a = ang + (i * Math.PI) / points, r = i % 2 ? inner : 1; const px = cx + Math.cos(a) * rx * r, py = cy + Math.sin(a) * ry * r; i ? x.lineTo(px, py) : x.moveTo(px, py); }
  x.closePath(); x.fill();
}
// A round medallion with scalloped lobes.
function persLobed(x, cx, cy, rx, ry, lobes, depth, col) {
  x.fillStyle = col; x.beginPath();
  for (let i = 0; i <= 360; i += 2) { const a = (i * Math.PI) / 180, r = 1 + depth * Math.abs(Math.cos((a * lobes) / 2)) - depth / 2; const px = cx + Math.cos(a) * rx * r, py = cy + Math.sin(a) * ry * r; i ? x.lineTo(px, py) : x.moveTo(px, py); }
  x.closePath(); x.fill();
}
// A spiral vine with leaves and a blossom at its heart.
function persSpiral(x, cx, cy, r, turns, dir, C) {
  x.strokeStyle = C.vine2 || C.vine; x.lineWidth = 1;
  x.beginPath();
  for (let t = 0; t <= 1; t += 0.01) { const a = dir * t * turns * Math.PI * 2, rr = r * (1 - t * 0.85); const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr; t ? x.lineTo(px, py) : x.moveTo(px, py); }
  x.stroke();
  for (let k = 1; k < 5; k++) { const t = k / 5, a = dir * t * turns * Math.PI * 2, rr = r * (1 - t * 0.85); leaf(x, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, r * 0.4, a + dir * 0.9, C.leaf); }
  rosette(x, cx, cy, r * 0.32, 6, C.bloom, C.bloom2, C.leaf);
}

// Heriz: a bold angular medallion with pendants, corner spandrels and stiff angular leaves on a rust field.
function persHeriz(ctx, W, H) {
  const C = { guard: '#2b1a17', guard2: '#d9c7a0', border: '#1f2d4a', vine: '#d9c7a0', r1: '#b9473a', r2: '#e2b45a', r3: '#7aa6a0',
    field: '#a8432f', field2: '#963a28', navy: '#1f2d4a', ivory: '#efe2c4', sky: '#7aa6a0', gold: '#e2b45a', dark: '#2b1a17', green: '#4f7a52' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 15);
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 7) % 3 === 1) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); } // abrash
    const cx = fx + fw / 2, cy = fy + fh / 2;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // corner spandrels: quarter stars
    for (const [sx, sy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) { persStar(x, sx, sy, fw * 0.19, fh * 0.32, 8, 0.86, C.navy, 0); persStar(x, sx, sy, fw * 0.13, fh * 0.22, 8, 0.86, C.ivory, 0); persStar(x, sx, sy, fw * 0.07, fh * 0.12, 8, 0.86, C.r1, 0); }
    // angular leaves and little crosses scattered in the field
    for (const [px, py] of [[0.2, 0.5], [0.8, 0.5], [0.33, 0.18], [0.67, 0.18], [0.33, 0.82], [0.67, 0.82], [0.12, 0.3], [0.88, 0.3], [0.12, 0.7], [0.88, 0.7]]) {
      const X = fx + fw * px, Y = fy + fh * py;
      x.fillStyle = C.ivory; x.fillRect(X - 3, Y - 1, 7, 3); x.fillRect(X - 1, Y - 3, 3, 7);
      x.fillStyle = C.gold; x.fillRect(X - 1, Y - 1, 3, 3);
      x.strokeStyle = C.green; x.lineWidth = 1.4; x.beginPath(); x.moveTo(X + 4, Y + 4); x.lineTo(X + 8, Y + 8); x.lineTo(X + 8, Y + 11); x.moveTo(X - 4, Y - 4); x.lineTo(X - 8, Y - 8); x.lineTo(X - 11, Y - 8); x.stroke();
    }
    // medallion: angular star in three layers, pendants above and below
    x.fillStyle = C.navy; x.fillRect(cx - 1.5, fy + 2, 3, fh - 4);
    for (const dy of [-1, 1]) { persStar(x, cx, cy + dy * fh * 0.42, fw * 0.05, fh * 0.07, 4, 0.5, C.navy, Math.PI / 4); persStar(x, cx, cy + dy * fh * 0.42, fw * 0.025, fh * 0.035, 4, 0.5, C.gold, Math.PI / 4); }
    persStar(x, cx, cy, fw * 0.24, fh * 0.42, 8, 0.66, C.navy, Math.PI / 8);
    persStar(x, cx, cy, fw * 0.17, fh * 0.3, 8, 0.66, C.ivory, Math.PI / 8);
    persStar(x, cx, cy, fw * 0.11, fh * 0.2, 8, 0.66, C.r1, Math.PI / 8);
    persStar(x, cx, cy, fw * 0.05, fh * 0.09, 4, 0.5, C.gold, Math.PI / 4);
    x.fillStyle = C.navy; x.fillRect(cx - 1, cy - 1, 2, 2);
    // hooked tendrils from the medallion's points
    x.strokeStyle = C.sky; x.lineWidth = 1.4;
    for (let k = 0; k < 8; k++) { const a = Math.PI / 8 + (k * Math.PI) / 4, ex = cx + Math.cos(a) * fw * 0.24, ey = cy + Math.sin(a) * fh * 0.42; x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex + Math.cos(a) * 5, ey + Math.sin(a) * 5); x.lineTo(ex + Math.cos(a) * 5 + (Math.cos(a) > 0 ? 3 : -3), ey + Math.sin(a) * 5); x.stroke(); }
    x.restore();
  });
}

// Garden carpet (chahar bagh): four gardens split by water channels, trees and flower beds, fish in the water,
// a pavilion over the pool in the middle.
function persGarden(ctx, W, H) {
  const C = { guard: '#2a1f1a', guard2: '#d8c69c', border: '#7a2a24', vine: '#d8c69c', r1: '#e2b45a', r2: '#efe5cc', r3: '#3f6b3a',
    field: '#e7dcc0', water: '#3d6f9e', water2: '#6a9ccc', bed: '#3f6b3a', bed2: '#567f45', tree: '#22432a', trunk: '#6a4a2c',
    flower: '#c0392b', flower2: '#e2b45a', fish: '#e9862a', ivory: '#efe5cc', pav: '#b9473a' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 15);
    const cx = fx + fw / 2, cy = fy + fh / 2, ch = 7;
    // channels: the central cross and a channel round the edge
    const water = (X, Y, w, h) => { x.fillStyle = C.water; x.fillRect(X, Y, w, h); x.fillStyle = C.water2; if (w > h) for (let i = X + 1; i < X + w - 2; i += 4) { x.fillRect(i, Y + h / 2 - 1, 2, 1); x.fillRect(i + 2, Y + h / 2, 2, 1); } else for (let j = Y + 1; j < Y + h - 2; j += 4) { x.fillRect(X + w / 2 - 1, j, 1, 2); x.fillRect(X + w / 2, j + 2, 1, 2); } };
    water(fx, fy, fw, 5); water(fx, fy + fh - 5, fw, 5); water(fx, fy, 5, fh); water(fx + fw - 5, fy, 5, fh);
    water(fx, cy - ch / 2, fw, ch); water(cx - ch / 2, fy, ch, fh);
    // fish in the channels
    for (const [px, py, f] of [[0.18, 0, 1], [0.34, 0, -1], [0.66, 0, 1], [0.82, 0, -1]]) { const X = fx + fw * px, Y = cy; x.fillStyle = C.fish; x.beginPath(); x.ellipse(X, Y, 2.6, 1.2, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(X - f * 2.4, Y); x.lineTo(X - f * 4.4, Y - 1.4); x.lineTo(X - f * 4.4, Y + 1.4); x.fill(); }
    // the four gardens, each four beds with a tree and flowers
    const qw = (fw - 10 - ch) / 2, qh = (fh - 10 - ch) / 2;
    for (const [qx, qy] of [[fx + 5, fy + 5], [cx + ch / 2, fy + 5], [fx + 5, cy + ch / 2], [cx + ch / 2, cy + ch / 2]]) {
      for (let j = 0; j < 2; j++) for (let i = 0; i < 2; i++) {
        const bx = qx + 2 + i * qw / 2, by = qy + 2 + j * qh / 2, bw = qw / 2 - 4, bh = qh / 2 - 4, k = i + j * 2;
        x.fillStyle = (i + j) % 2 ? C.bed : C.bed2; x.fillRect(bx, by, bw, bh);
        const tx = bx + bw / 2, ty = by + bh / 2;
        if (k % 2 === 0) { x.fillStyle = C.tree; for (let s = 0; s < 3; s++) { x.beginPath(); x.moveTo(tx, ty - bh * 0.42 + s * bh * 0.18); x.lineTo(tx + bw * 0.12 + s, ty - bh * 0.1 + s * bh * 0.18); x.lineTo(tx - bw * 0.12 - s, ty - bh * 0.1 + s * bh * 0.18); x.fill(); } x.fillStyle = C.trunk; x.fillRect(tx - 0.5, ty + bh * 0.25, 1.2, bh * 0.15); }
        else { x.fillStyle = C.trunk; x.fillRect(tx - 0.6, ty, 1.4, bh * 0.4); x.fillStyle = C.tree; x.beginPath(); x.arc(tx, ty - bh * 0.05, Math.min(bw, bh) * 0.3, 0, Math.PI * 2); x.fill(); x.fillStyle = C.flower; for (let f = 0; f < 6; f++) { const a = f * 1.05; x.fillRect(tx + Math.cos(a) * bw * 0.16, ty - bh * 0.05 + Math.sin(a) * bh * 0.16, 1.2, 1.2); } }
        x.fillStyle = C.flower2; for (const [ex, ey] of [[bx + 2, by + 2], [bx + bw - 3, by + 2], [bx + 2, by + bh - 3], [bx + bw - 3, by + bh - 3]]) x.fillRect(ex, ey, 1.4, 1.4);
      }
    }
    // pool and pavilion in the middle
    x.fillStyle = C.water2; x.fillRect(cx - 10, cy - 8, 20, 16);
    x.fillStyle = C.ivory; x.fillRect(cx - 7, cy - 5, 14, 10);
    persStar(x, cx, cy, 6, 4.6, 8, 0.82, C.pav, Math.PI / 8);
    rosette(x, cx, cy, 3, 8, C.flower2, C.ivory, C.pav);
  });
}

// Hunting carpet: riders, deer, lions and birds among scrolling vines on a deep red field, around a small medallion.
function persHunt(ctx, W, H) {
  const C = { guard: '#1c1714', guard2: '#d9c39a', border: '#1e3355', vine: '#d9c39a', r1: '#9e2f2a', r2: '#d8a442', r3: '#ecdcbc',
    field: '#9e2f2a', field2: '#8e2a26', ivory: '#ecdcbc', navy: '#1e3355', gold: '#d8a442', green: '#4f7a52', brown: '#6a4630', dark: '#1c1714', sky: '#86a8c0',
    vine2: '#c9973c', leaf: '#4f7a52', bloom: '#ecdcbc', bloom2: '#d8a442' };
  weavePicture(ctx, W, H, 140, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 16);
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 9) % 3 === 2) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (const [px, py, r, d] of [[0.1, 0.18, 9, 1], [0.9, 0.18, 9, -1], [0.1, 0.82, 9, -1], [0.9, 0.82, 9, 1], [0.5, 0.12, 7, 1], [0.5, 0.88, 7, -1], [0.3, 0.5, 7, 1], [0.7, 0.5, 7, -1]]) persSpiral(x, fx + fw * px, fy + fh * py, r, 1.6, d, C);
    const cx = fx + fw / 2, cy = fy + fh / 2;
    persLobed(x, cx, cy, fw * 0.1, fh * 0.2, 12, 0.18, C.navy); persLobed(x, cx, cy, fw * 0.07, fh * 0.14, 12, 0.18, C.ivory); rosette(x, cx, cy, fh * 0.07, 8, C.gold, C.navy, C.field);
    const s = fh / 100;
    const fig = (px, py, flip, draw) => { x.save(); x.translate(fx + fw * px, fy + fh * py); x.scale(flip, 1); draw(); x.restore(); };
    const rider = () => {
      x.strokeStyle = C.ivory; x.lineWidth = 1.6 * s; x.lineCap = 'round';
      x.beginPath(); x.moveTo(5 * s, 2 * s); x.lineTo(9 * s, 7 * s); x.moveTo(3 * s, 2 * s); x.lineTo(4 * s, 7.5 * s); x.moveTo(-5 * s, 2 * s); x.lineTo(-9 * s, 6 * s); x.moveTo(-3 * s, 2 * s); x.lineTo(-5 * s, 7.5 * s); x.moveTo(-6.5 * s, -0.5 * s); x.lineTo(-10 * s, 2 * s); x.stroke();
      x.fillStyle = C.ivory; x.beginPath(); x.ellipse(0, 0, 7 * s, 3.2 * s, 0, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.moveTo(5 * s, -1 * s); x.lineTo(9 * s, -6 * s); x.lineTo(10.5 * s, -5 * s); x.lineTo(7 * s, 1 * s); x.fill();
      x.beginPath(); x.ellipse(10.5 * s, -5.5 * s, 2.4 * s, 1.2 * s, 0.6, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.navy; x.fillRect(-1.4 * s, -7.5 * s, 2.8 * s, 5 * s); x.beginPath(); x.arc(0, -9 * s, 1.5 * s, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.gold; x.lineWidth = 0.9 * s; x.beginPath(); x.moveTo(1 * s, -6 * s); x.lineTo(12 * s, -10 * s); x.stroke();
    };
    const deer = () => {
      x.strokeStyle = C.gold; x.lineWidth = 1.2 * s; x.lineCap = 'round';
      x.beginPath(); x.moveTo(3 * s, 1 * s); x.lineTo(6 * s, 6 * s); x.moveTo(-3 * s, 1 * s); x.lineTo(-6 * s, 6 * s); x.moveTo(1.5 * s, 1 * s); x.lineTo(2 * s, 6 * s); x.moveTo(-1.5 * s, 1 * s); x.lineTo(-2.5 * s, 6 * s); x.stroke();
      x.fillStyle = C.gold; x.beginPath(); x.ellipse(0, 0, 5 * s, 2.2 * s, 0, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.moveTo(3.5 * s, -1 * s); x.lineTo(6 * s, -5 * s); x.lineTo(7.5 * s, -4.5 * s); x.lineTo(5 * s, 0.5 * s); x.fill();
      x.beginPath(); x.ellipse(7.4 * s, -5 * s, 1.8 * s, 0.9 * s, 0.4, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.ivory; x.lineWidth = 0.7 * s; x.beginPath(); x.moveTo(6.5 * s, -5.5 * s); x.lineTo(5 * s, -9 * s); x.moveTo(5.6 * s, -7.5 * s); x.lineTo(4 * s, -8 * s); x.moveTo(7 * s, -5.5 * s); x.lineTo(8 * s, -9 * s); x.stroke();
    };
    const lion = () => {
      x.strokeStyle = C.gold; x.lineWidth = 1.6 * s; x.lineCap = 'round';
      x.beginPath(); x.moveTo(4 * s, 1 * s); x.lineTo(7 * s, 5.5 * s); x.moveTo(-4 * s, 1 * s); x.lineTo(-7 * s, 5.5 * s); x.moveTo(-6 * s, -1 * s); x.quadraticCurveTo(-10 * s, -2 * s, -9 * s, -6 * s); x.stroke();
      x.fillStyle = C.gold; x.beginPath(); x.ellipse(0, 0, 6 * s, 2.6 * s, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.brown; x.beginPath(); x.arc(6 * s, -2.4 * s, 3.4 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.gold; x.beginPath(); x.arc(7 * s, -2.4 * s, 1.8 * s, 0, Math.PI * 2); x.fill();
    };
    const bird = () => {
      x.fillStyle = C.sky; x.beginPath(); x.ellipse(0, 0, 3 * s, 1.4 * s, 0, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.moveTo(-1 * s, -0.5 * s); x.lineTo(1 * s, -4.5 * s); x.lineTo(2 * s, -0.5 * s); x.fill();
      x.beginPath(); x.moveTo(-2.5 * s, 0); x.lineTo(-5 * s, -1.2 * s); x.lineTo(-5 * s, 1.2 * s); x.fill();
      x.fillStyle = C.ivory; x.beginPath(); x.arc(3 * s, -0.6 * s, 1 * s, 0, Math.PI * 2); x.fill();
    };
    for (const f of [1, -1]) {
      const at = (p) => (f > 0 ? p : 1 - p);
      fig(at(0.2), 0.36, f, rider); fig(at(0.36), 0.28, f, deer);
      fig(at(0.18), 0.66, f, lion); fig(at(0.34), 0.74, f, deer);
      fig(at(0.4), 0.88, f, bird); fig(at(0.08), 0.5, f, bird);
    }
    x.restore();
  });
}

// Tree of life: a flowering tree rising from a vase, birds on its branches, cypresses at the sides, on ivory.
function persTree(ctx, W, H) {
  const C = { guard: '#2a1c1a', guard2: '#d6c39a', border: '#8e2a26', vine: '#d6c39a', r1: '#1f2d4a', r2: '#d9a440', r3: '#ece0c2',
    field: '#ece0c2', field2: '#e3d5b4', trunk: '#6a4630', leaf: '#4f7a52', leaf2: '#2f5a3a', bloom: '#b9473a', bloom2: '#d9a440', navy: '#1f2d4a', sky: '#5c86b0', vase: '#1f2d4a' };
  weavePicture(ctx, W, H, 140, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 16);
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 8) % 4 === 3) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const cx = fx + fw / 2, base = fy + fh - 6, top = fy + 6;
    // ground and small flowers
    x.fillStyle = C.leaf2; x.fillRect(fx, base, fw, 6);
    for (let i = 0; i < 18; i++) { const X = fx + 4 + i * (fw - 8) / 17; x.fillStyle = C.leaf; x.fillRect(X, base - 3, 1, 3); x.fillStyle = i % 2 ? C.bloom : C.bloom2; x.fillRect(X - 1, base - 5, 3, 2); }
    // cypresses at the sides
    for (const sx of [fx + 10, fx + fw - 10]) { x.fillStyle = C.leaf2; x.beginPath(); x.ellipse(sx, base - fh * 0.38, 5, fh * 0.38, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = C.leaf; x.beginPath(); x.ellipse(sx - 1, base - fh * 0.38, 2.4, fh * 0.32, 0, 0, Math.PI * 2); x.fill(); }
    // the vase
    x.fillStyle = C.vase; x.beginPath(); x.moveTo(cx - 6, base); x.quadraticCurveTo(cx - 10, base - 8, cx - 4, base - 12); x.lineTo(cx + 4, base - 12); x.quadraticCurveTo(cx + 10, base - 8, cx + 6, base); x.fill();
    x.fillStyle = C.bloom2; x.fillRect(cx - 7, base - 7, 14, 1.5); x.fillRect(cx - 5, base - 13, 10, 1.5);
    // trunk and symmetric branches with leaves, blossoms and birds
    x.strokeStyle = C.trunk; x.lineCap = 'round'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, base - 12); x.lineTo(cx, top + 6); x.stroke();
    const levels = 6;
    for (let k = 0; k < levels; k++) {
      const t0 = (k + 1) / (levels + 1), by = base - 16 - k * (fh - 34) / levels, reach = fw * 0.3 * Math.sin(Math.PI * (0.25 + t0 * 0.75)) + 6, lift = 12 + k;
      for (const d of [-1, 1]) {
        x.lineWidth = 2.4 - k * 0.25; x.beginPath(); x.moveTo(cx, by); x.quadraticCurveTo(cx + d * reach * 0.7, by + 1, cx + d * reach, by - lift); x.stroke();
        for (let l = 1; l <= 6; l++) {
          const t = l / 7, lx = cx + d * reach * (0.7 * 2 * t * (1 - t) + t * t), ly = by + 2 * t * (1 - t) - lift * t * t;
          leaf(x, lx, ly, 7, d > 0 ? -1.2 + t * 0.4 : Math.PI + 1.2 - t * 0.4, l % 2 ? C.leaf : C.leaf2);
          leaf(x, lx, ly, 6, d > 0 ? 0.5 : Math.PI - 0.5, l % 2 ? C.leaf2 : C.leaf);
          if (l === 3) { x.fillStyle = C.bloom; x.beginPath(); x.arc(lx, ly + 3.5, 2, 0, Math.PI * 2); x.fill(); x.fillStyle = C.bloom2; x.fillRect(lx - 0.5, ly + 1, 1, 1); } // a pomegranate
        }
        rosette(x, cx + d * reach, by - lift, 4, 8, k % 2 ? C.bloom : C.bloom2, C.field, C.navy);
        if (k % 2 === 0) { // a bird on the branch
          const bx = cx + d * reach * 0.55, byy = by - lift * 0.3 - 3;
          x.fillStyle = k % 4 ? C.sky : C.navy; x.beginPath(); x.ellipse(bx, byy - 2, 3.2, 1.7, 0, 0, Math.PI * 2); x.fill();
          x.beginPath(); x.arc(bx + d * 2.8, byy - 3.6, 1.4, 0, Math.PI * 2); x.fill();
          x.beginPath(); x.moveTo(bx - d * 2.4, byy - 2); x.lineTo(bx - d * 5.4, byy - 4.4); x.lineTo(bx - d * 5, byy - 1); x.fill();
          x.fillStyle = C.bloom2; x.fillRect(bx + d * 3.9 - 0.5, byy - 3.8, 1.3, 0.9);
        }
      }
    }
    rosette(x, cx, top + 5, 4.5, 10, C.bloom, C.bloom2, C.navy);
    x.restore();
  });
}

// Boteh: rows of paisley teardrops, facing alternate ways row by row, on a madder-red field.
function persBoteh(ctx, W, H) {
  const C = { guard: '#1d1a24', guard2: '#d9c7a0', border: '#1f2d4a', vine: '#d9c7a0', r1: '#b9473a', r2: '#e2b45a', r3: '#efe2c4',
    field: '#9e2f2a', field2: '#8e2926', navy: '#1f2d4a', ivory: '#efe2c4', gold: '#e2b45a', green: '#4f7a52', sky: '#7aa6c0', pink: '#d97a7a' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 15);
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 6) % 4 === 2) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const boteh = (cx, cy, h, flip, c1, c2, c3) => {
      x.save(); x.translate(cx, cy); x.scale(flip * h, h);
      const shape = () => { x.beginPath(); x.moveTo(-0.3, 0.2); x.bezierCurveTo(-0.34, -0.25, 0.05, -0.5, 0.22, -0.56); x.bezierCurveTo(0.32, -0.6, 0.34, -0.46, 0.24, -0.42); x.bezierCurveTo(0.12, -0.36, 0.3, -0.06, 0.3, 0.2); x.arc(0, 0.2, 0.3, 0, Math.PI); x.closePath(); };
      x.fillStyle = c1; shape(); x.fill();
      x.save(); x.translate(0.02, 0.04); x.scale(0.66, 0.66); x.fillStyle = c2; shape(); x.fill(); x.restore();
      x.fillStyle = c3; x.beginPath(); x.arc(0, 0.16, 0.1, 0, Math.PI * 2); x.fill();
      x.restore();
    };
    const sets = [[C.navy, C.ivory, C.field], [C.ivory, C.gold, C.navy], [C.gold, C.green, C.ivory], [C.green, C.pink, C.ivory], [C.sky, C.navy, C.gold]];
    const nr = 4, nc = 9, dh = fh / nr, dw = fw / nc;
    for (let r = 0; r < nr; r++) for (let c = 0; c < nc + 1; c++) {
      const X = fx + (c + (r % 2 ? 0 : 0.5)) * dw, Y = fy + (r + 0.55) * dh, s = sets[(c + r * 2) % sets.length];
      boteh(X, Y, dh * 0.82, r % 2 ? -1 : 1, s[0], s[1], s[2]);
      x.fillStyle = C.gold; const fxp = X + dw / 2, fyp = Y - dh * 0.05; for (const [dx, dy] of [[0, -1.6], [0, 1.6], [-1.6, 0], [1.6, 0]]) x.fillRect(fxp + dx - 0.6, fyp + dy - 0.6, 1.2, 1.2);
    }
    x.restore();
  });
}

// Bakhtiari garden panels (khesti): a grid of tiles, each its own colour with a cypress, a willow, a flowering shrub,
// a rosette, a bird or a vase.
function persBakhtiari(ctx, W, H) {
  const C = { guard: '#2a1c18', guard2: '#d8c69c', border: '#7a2a24', vine: '#d8c69c', r1: '#1f2d4a', r2: '#d9a440', r3: '#ecdcbc',
    field: '#ecdcbc', red: '#9e3a2e', navy: '#1f2d4a', gold: '#d9a440', green: '#3f6b4a', rust: '#c0603a', ivory: '#ecdcbc', dark: '#2a1c18', sky: '#7aa6c0', leaf: '#5f8a4a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 14);
    const nc = 6, nr = 4, tw = fw / nc, th = fh / nr;
    const bgs = [C.red, C.ivory, C.navy, C.gold, C.green, C.rust];
    const fgFor = (bg) => (bg === C.ivory || bg === C.gold ? [C.navy, C.red, C.green] : [C.ivory, C.gold, C.leaf]);
    const motifs = [
      (cx, cy, s, f) => { x.fillStyle = f[2]; x.beginPath(); x.ellipse(cx, cy, s * 0.18, s * 0.42, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = f[0]; x.fillRect(cx - 0.5, cy + s * 0.36, 1.2, s * 0.12); }, // cypress
      (cx, cy, s, f) => { x.strokeStyle = f[2]; x.lineWidth = 1; for (let k = -3; k <= 3; k++) { x.beginPath(); x.moveTo(cx, cy - s * 0.3); x.quadraticCurveTo(cx + k * s * 0.08, cy - s * 0.32, cx + k * s * 0.12, cy + s * 0.3); x.stroke(); } x.fillStyle = f[0]; x.fillRect(cx - 0.6, cy - s * 0.4, 1.4, s * 0.8); }, // willow
      (cx, cy, s, f) => { x.fillStyle = f[2]; x.fillRect(cx - 0.6, cy - s * 0.1, 1.2, s * 0.45); for (const [dx, dy] of [[0, -0.28], [-0.2, -0.08], [0.2, -0.08], [-0.14, 0.14], [0.14, 0.14]]) rosette(x, cx + dx * s, cy + dy * s, s * 0.1, 6, f[1], f[0], f[2]); }, // flowering shrub
      (cx, cy, s, f) => { persStar(x, cx, cy, s * 0.36, s * 0.36, 8, 0.6, f[0], Math.PI / 8); rosette(x, cx, cy, s * 0.18, 8, f[1], f[2], f[0]); }, // rosette
      (cx, cy, s, f) => { x.fillStyle = f[0]; x.beginPath(); x.ellipse(cx, cy, s * 0.22, s * 0.12, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(cx + s * 0.2, cy - s * 0.1, s * 0.08, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(cx - s * 0.18, cy); x.lineTo(cx - s * 0.36, cy - s * 0.12); x.lineTo(cx - s * 0.34, cy + s * 0.06); x.fill(); x.fillStyle = f[1]; x.fillRect(cx + s * 0.27, cy - s * 0.11, 1.4, 0.8); x.fillStyle = f[2]; x.fillRect(cx - s * 0.3, cy + s * 0.2, s * 0.6, 1); }, // bird
      (cx, cy, s, f) => { x.fillStyle = f[0]; x.beginPath(); x.moveTo(cx - s * 0.12, cy + s * 0.36); x.quadraticCurveTo(cx - s * 0.26, cy + s * 0.1, cx - s * 0.08, cy - s * 0.02); x.lineTo(cx + s * 0.08, cy - s * 0.02); x.quadraticCurveTo(cx + s * 0.26, cy + s * 0.1, cx + s * 0.12, cy + s * 0.36); x.fill(); for (const [dx, dy] of [[0, -0.26], [-0.16, -0.16], [0.16, -0.16]]) rosette(x, cx + dx * s, cy + dy * s, s * 0.09, 6, f[1], f[2], f[0]); }, // vase
    ];
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const X = fx + i * tw, Y = fy + j * th, bg = bgs[(i + j * 2) % bgs.length];
      x.fillStyle = bg; x.fillRect(X, Y, tw, th);
      x.fillStyle = C.dark; x.fillRect(X, Y, tw, 1); x.fillRect(X, Y, 1, th);
      motifs[(i * 2 + j) % motifs.length](X + tw / 2, Y + th / 2, Math.min(tw, th), fgFor(bg));
    }
    x.fillStyle = C.dark; x.fillRect(fx, fy + fh - 1, fw, 1); x.fillRect(fx + fw - 1, fy, 1, fh);
  });
}

// Qashqai gabbeh: thick, coarse and plain. A saffron field with soft bands of abrash, a few goats and a tree.
function persGabbeh(ctx, W, H) {
  const C = { field: '#d9862a', field2: '#cc7a24', field3: '#e39538', indigo: '#2c3a5e', ivory: '#efe2c4', red: '#a8382c', brown: '#4a3020', green: '#4f7a3a', dark: '#2a1c14' };
  weavePicture(ctx, W, H, 64, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.indigo; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.ivory; for (let i = 1; i < cols - 1; i += 3) { x.fillRect(i, 1, 1, 1); x.fillRect(i, rows - 2, 1, 1); } for (let j = 1; j < rows - 1; j += 3) { x.fillRect(1, j, 1, 1); x.fillRect(cols - 2, j, 1, 1); }
    const fx = 3, fy = 3, fw = cols - 6, fh = rows - 6;
    for (let y = fy; y < fy + fh; y++) { const b = Math.floor((y - fy) / 5) % 5; x.fillStyle = b === 1 ? C.field2 : b === 3 ? C.field3 : C.field; x.fillRect(fx, y, fw, 1); }
    // stepped stripes at the two ends
    for (const [X, d] of [[fx, 1], [fx + fw - 1, -1]]) { x.fillStyle = C.red; x.fillRect(X + d * 2 - (d < 0 ? 1 : 0), fy, 2, fh); x.fillStyle = C.ivory; x.fillRect(X + d * 5 - (d < 0 ? 0 : 0), fy, 1, fh); x.fillStyle = C.indigo; for (let y = fy; y < fy + fh; y += 4) x.fillRect(X + d * 7, y, 1, 2); }
    // a tree
    const tx = fx + fw * 0.7, ty = fy + fh * 0.62;
    x.fillStyle = C.brown; x.fillRect(tx - 0.5, ty - 2, 1.5, 9);
    x.fillStyle = C.green; for (const [dx, dy, r] of [[0, -6, 3.4], [-3, -3, 2.6], [3, -3, 2.6]]) { x.beginPath(); x.arc(tx + dx, ty + dy, r, 0, Math.PI * 2); x.fill(); }
    // goats
    const goat = (gx, gy, col, flip) => {
      x.fillStyle = col; x.fillRect(gx - 3, gy - 2, 6, 3);
      x.fillRect(gx + flip * 3 - (flip < 0 ? 2 : 0), gy - 4, 2, 2);
      x.fillRect(gx - 3, gy + 1, 1, 3); x.fillRect(gx + 2, gy + 1, 1, 3);
      x.fillRect(gx + flip * 4 - (flip < 0 ? 1 : 0), gy - 6, 1, 2);
    };
    goat(fx + fw * 0.3, fy + fh * 0.45, C.dark, 1); goat(fx + fw * 0.42, fy + fh * 0.62, C.ivory, 1); goat(fx + fw * 0.52, fy + fh * 0.36, C.dark, -1);
    // two small diamonds
    for (const [X, Y] of [[fx + fw * 0.22, fy + fh * 0.75], [fx + fw * 0.84, fy + fh * 0.26]]) { x.fillStyle = C.ivory; x.beginPath(); x.moveTo(X, Y - 4); x.lineTo(X + 4, Y); x.lineTo(X, Y + 4); x.lineTo(X - 4, Y); x.fill(); x.fillStyle = C.red; x.fillRect(X - 1, Y - 1, 2, 2); }
  });
}

// Nain: ivory and blues, fine and light. Scrolling vines all over the field, a lobed medallion with pendants.
function persNain(ctx, W, H) {
  const C = { guard: '#1f2f55', guard2: '#efe6d2', border: '#e3d6bb', vine: '#4f78a8', r1: '#1f2f55', r2: '#4f78a8', r3: '#efe6d2',
    field: '#efe6d2', navy: '#1f2f55', blue: '#4f78a8', sky: '#9db9d6', beige: '#c9b28a', brown: '#6a4a30', green: '#7e9a7a',
    vine2: '#4f78a8', leaf: '#7e9a7a', bloom: '#4f78a8', bloom2: '#efe6d2' };
  weavePicture(ctx, W, H, 150, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 16);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) persSpiral(x, fx + (i + (j % 2 ? 0.5 : 0)) * fw / 6.5, fy + (j + 0.5) * fh / 4, 7.5, 1.4, (i + j) % 2 ? 1 : -1, C);
    const cx = fx + fw / 2, cy = fy + fh / 2;
    // corner spandrels
    for (const [sx, sy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) { persLobed(x, sx, sy, fw * 0.17, fh * 0.3, 10, 0.2, C.navy); persLobed(x, sx, sy, fw * 0.12, fh * 0.21, 10, 0.2, C.sky); }
    // pendants and medallion
    for (const d of [-1, 1]) { persLobed(x, cx, cy + d * fh * 0.4, fw * 0.035, fh * 0.07, 6, 0.3, C.navy); x.fillStyle = C.blue; x.fillRect(cx - 0.6, cy + d * fh * 0.2 - (d < 0 ? fh * 0.14 : 0), 1.2, fh * 0.14); }
    persLobed(x, cx, cy, fw * 0.2, fh * 0.34, 16, 0.14, C.navy);
    persLobed(x, cx, cy, fw * 0.17, fh * 0.29, 16, 0.14, C.field);
    for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; palmette(x, cx + Math.cos(a) * fw * 0.1, cy + Math.sin(a) * fh * 0.17, 4, a + Math.PI / 2, C.blue, C.sky); }
    persLobed(x, cx, cy, fw * 0.12, fh * 0.2, 12, 0.18, C.sky);
    for (let k = 0; k < 12; k++) { const a = (k * Math.PI) / 6; leaf(x, cx + Math.cos(a) * fw * 0.04, cy + Math.sin(a) * fh * 0.07, fw * 0.06, a, k % 2 ? C.blue : C.navy); }
    persLobed(x, cx, cy, fw * 0.045, fh * 0.08, 8, 0.25, C.navy);
    rosette(x, cx, cy, 4, 8, C.field, C.blue, C.sky);
    x.restore();
  });
}

// Kerman vase carpet: a lattice of vines on navy, a vase of flowers or a big palmette in every cell.
function persVase(ctx, W, H) {
  const C = { guard: '#1a1a26', guard2: '#d9c39a', border: '#9e2f2a', vine: '#d9c39a', r1: '#1f2d4a', r2: '#d8a442', r3: '#ecdcbc',
    field: '#1f2d4a', lattice: '#c9973c', red: '#b5392e', ivory: '#ecdcbc', gold: '#d8a442', pink: '#d98a8a', green: '#4f7a52', sky: '#7aa6c0' };
  weavePicture(ctx, W, H, 140, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 16);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const nc = 6, nr = 3, cw = fw / nc, chh = fh / nr;
    x.strokeStyle = C.lattice; x.lineWidth = 1.1;
    for (let k = -nr; k <= nc + nr; k++) { x.beginPath(); x.moveTo(fx + k * cw, fy); x.lineTo(fx + (k + nr) * cw, fy + fh); x.stroke(); x.beginPath(); x.moveTo(fx + k * cw, fy + fh); x.lineTo(fx + (k + nr) * cw, fy); x.stroke(); }
    for (let j = 0; j <= nr; j++) for (let i = 0; i <= nc; i++) rosette(x, fx + i * cw, fy + j * chh, 3, 6, C.gold, C.red, C.field); // nodes
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const X = fx + (i + 0.5) * cw, Y = fy + (j + 0.5) * chh;
      if ((i + j) % 2 === 0) { // vase with a spray of flowers
        x.fillStyle = C.red; x.beginPath(); x.moveTo(X - 3, Y + chh * 0.32); x.quadraticCurveTo(X - 6, Y + chh * 0.15, X - 2, Y + chh * 0.06); x.lineTo(X + 2, Y + chh * 0.06); x.quadraticCurveTo(X + 6, Y + chh * 0.15, X + 3, Y + chh * 0.32); x.fill();
        x.strokeStyle = C.green; x.lineWidth = 0.9; for (const a of [-0.9, -0.45, 0, 0.45, 0.9]) { x.beginPath(); x.moveTo(X, Y + chh * 0.06); x.quadraticCurveTo(X + Math.sin(a) * 4, Y - chh * 0.1, X + Math.sin(a) * 9, Y - Math.cos(a) * chh * 0.26); x.stroke(); }
        for (const [a, col] of [[-0.9, C.pink], [-0.45, C.ivory], [0, C.gold], [0.45, C.ivory], [0.9, C.pink]]) rosette(x, X + Math.sin(a) * 9, Y - Math.cos(a) * chh * 0.26, 2.6, 6, col, C.red, C.field);
      } else { palmette(x, X, Y + 2, chh * 0.24, 0, C.red, C.ivory); rosette(x, X, Y - chh * 0.08, 2.8, 8, C.gold, C.field, C.ivory); leaf(x, X - 3, Y + 4, 6, Math.PI + 0.5, C.green); leaf(x, X + 3, Y + 4, 6, -0.5, C.green); }
    }
    x.restore();
  });
}

// Herati: the "fish" pattern all over a navy field, a rosette in each diamond with four curling leaves round it,
// and a small red diamond medallion at the centre.
function persHerati(ctx, W, H) {
  const C = { guard: '#1b1a24', guard2: '#d9c7a0', border: '#9e2f2a', vine: '#d9c7a0', r1: '#1f2d4a', r2: '#e2b45a', r3: '#efe2c4',
    field: '#1f2d4a', red: '#a8382c', ivory: '#efe2c4', gold: '#e2b45a', green: '#5f8a5a', sky: '#7aa6c0' };
  weavePicture(ctx, W, H, 140, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 16);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const dw = 22, dh = 20;
    for (let j = -1; j <= fh / dh + 1; j++) for (let i = -1; i <= fw / dw + 1; i++) {
      const cx = fx + i * dw + (j % 2 ? dw / 2 : 0), cy = fy + j * dh;
      // diamond outline of fine vine
      x.strokeStyle = C.gold; x.lineWidth = 0.8; x.beginPath(); x.moveTo(cx, cy - dh * 0.42); x.lineTo(cx + dw * 0.42, cy); x.lineTo(cx, cy + dh * 0.42); x.lineTo(cx - dw * 0.42, cy); x.closePath(); x.stroke();
      // four leaves curling round it
      for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2 + Math.PI / 4; leaf(x, cx + Math.cos(a) * dw * 0.18, cy + Math.sin(a) * dh * 0.18, dw * 0.34, a + Math.PI / 2.6, k % 2 ? C.green : C.sky); }
      rosette(x, cx, cy, 3.4, 8, (i + j) % 2 ? C.red : C.ivory, C.gold, C.field);
    }
    const mx = fx + fw / 2, my = fy + fh / 2;
    const dia = (rx, ry, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(mx, my - ry); x.lineTo(mx + rx, my); x.lineTo(mx, my + ry); x.lineTo(mx - rx, my); x.closePath(); x.fill(); };
    dia(fw * 0.17, fh * 0.32, C.ivory); dia(fw * 0.15, fh * 0.28, C.red); dia(fw * 0.08, fh * 0.15, C.ivory); dia(fw * 0.065, fh * 0.12, C.field); rosette(x, mx, my, 4, 8, C.gold, C.ivory, C.red);
    x.restore();
  });
}

// Qom silk: pale colours with a sheen. A big lobed medallion full of flowers on ivory, sage spandrels.
function persQom(ctx, W, H) {
  const C = { guard: '#4a5f7a', guard2: '#f1e9d8', border: '#a9c0a0', vine: '#c47e7a', r1: '#e2b7ad', r2: '#f1e9d8', r3: '#6a9a98',
    field: '#f1e9d8', blush: '#e2b7ad', sage: '#a9c0a0', teal: '#6a9a98', gold: '#d9b56a', rose: '#c47e7a', blue: '#4a5f7a',
    vine2: '#d9b56a', leaf: '#a9c0a0', bloom: '#c47e7a', bloom2: '#f1e9d8' };
  weavePicture(ctx, W, H, 150, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 16);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) persSpiral(x, fx + (i + (j % 2 ? 0.5 : 0)) * fw / 6.5, fy + (j + 0.5) * fh / 4, 7, 1.3, (i + j) % 2 ? 1 : -1, C);
    for (const [sx, sy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) { persLobed(x, sx, sy, fw * 0.18, fh * 0.32, 12, 0.16, C.sage); persLobed(x, sx, sy, fw * 0.12, fh * 0.22, 12, 0.16, C.field); rosette(x, sx, sy, fh * 0.1, 10, C.rose, C.gold, C.sage); }
    const cx = fx + fw / 2, cy = fy + fh / 2;
    persLobed(x, cx, cy, fw * 0.25, fh * 0.42, 16, 0.12, C.teal);
    persLobed(x, cx, cy, fw * 0.23, fh * 0.39, 16, 0.12, C.blush);
    for (let k = 0; k < 16; k++) { const a = (k * Math.PI) / 8; leaf(x, cx + Math.cos(a) * fw * 0.08, cy + Math.sin(a) * fh * 0.13, fw * 0.08, a, k % 2 ? C.sage : C.teal); }
    for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4 + Math.PI / 8; rosette(x, cx + Math.cos(a) * fw * 0.17, cy + Math.sin(a) * fh * 0.29, 3.6, 8, k % 2 ? C.rose : C.gold, C.field, C.teal); }
    persLobed(x, cx, cy, fw * 0.07, fh * 0.12, 8, 0.3, C.field);
    rosette(x, cx, cy, 5, 10, C.rose, C.gold, C.teal);
    x.restore();
  });
  // silk sheen: a soft diagonal shimmer over the whole rug
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, 'rgba(255,255,255,.14)'); g.addColorStop(0.35, 'rgba(255,255,255,0)'); g.addColorStop(0.65, 'rgba(255,255,255,.1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}

// Turkmen gul: rows of quartered octagonal guls joined by fine lines on madder red, smaller guls between them.
function persTurkmen(ctx, W, H) {
  const C = { guard: '#2a1414', guard2: '#d9c7a0', border: '#7e2222', vine: '#d9c7a0', r1: '#1f2340', r2: '#efe2c4', r3: '#d87a3a',
    field: '#8e2626', field2: '#822222', navy: '#1f2340', ivory: '#efe2c4', orange: '#d87a3a', dark: '#2a1414', green: '#4f7a52' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = persBorder(x, cols, rows, C, 14);
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 6) % 4 === 1) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    const nc = 5, nr = 3, gw = fw / nc, gh = fh / nr;
    // lines joining the guls
    x.fillStyle = C.dark; for (let j = 0; j < nr; j++) x.fillRect(fx, fy + (j + 0.5) * gh - 0.5, fw, 1); for (let i = 0; i < nc; i++) x.fillRect(fx + (i + 0.5) * gw - 0.5, fy, 1, fh);
    const oct = (cx, cy, rx, ry, col) => { x.fillStyle = col; x.beginPath(); for (let k = 0; k < 8; k++) { const a = Math.PI / 8 + (k * Math.PI) / 4; const px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill(); };
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const cx = fx + (i + 0.5) * gw, cy = fy + (j + 0.5) * gh, rx = gw * 0.4, ry = gh * 0.34;
      oct(cx, cy, rx, ry, C.ivory); oct(cx, cy, rx - 1.4, ry - 1.4, C.dark);
      // quarters in alternating colours
      const q = [[C.field, C.navy], [C.navy, C.field]];
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        x.save(); x.beginPath(); x.rect(sx < 0 ? cx - rx : cx, sy < 0 ? cy - ry : cy, rx, ry); x.clip();
        oct(cx, cy, rx - 2.4, ry - 2.4, q[(sx * sy > 0) ? 0 : 1][0]);
        // a little stepped motif in each quarter
        const mx = cx + sx * rx * 0.42, my = cy + sy * ry * 0.42;
        x.fillStyle = C.ivory; x.fillRect(mx - 2, my - 0.5, 4, 1); x.fillRect(mx - 0.5, my - 2, 1, 4);
        x.fillStyle = C.orange; x.fillRect(mx - 0.5, my - 0.5, 1, 1);
        x.restore();
      }
      x.fillStyle = C.dark; x.fillRect(cx - rx + 2, cy - 0.5, 2 * rx - 4, 1); x.fillRect(cx - 0.5, cy - ry + 2, 1, 2 * ry - 4);
      persStar(x, cx, cy, 3.4, 3.4, 4, 0.5, C.orange, Math.PI / 4); x.fillStyle = C.ivory; x.fillRect(cx - 0.5, cy - 0.5, 1, 1);
    }
    // minor guls on the crossing points between
    for (let j = 0; j <= nr; j++) for (let i = 0; i <= nc; i++) {
      const cx = fx + i * gw, cy = fy + j * gh;
      if (i === 0 || j === 0 || i === nc || j === nr) continue;
      persStar(x, cx, cy, gw * 0.12, gh * 0.12, 4, 0.55, C.navy, Math.PI / 4); persStar(x, cx, cy, gw * 0.07, gh * 0.07, 4, 0.55, C.ivory, Math.PI / 4); x.fillStyle = C.orange; x.fillRect(cx - 0.5, cy - 0.5, 1.4, 1.4);
    }
  });
}

// ---------- Türkiye pack ----------
// Anatolia's own carpets, knotted on a fine grid: the Uşak medallion and Lotto carpets, Bergama, Yağcıbedir, the Seljuk
// carpets of Konya, Hereke silk and İznik florals. Then hooked pictures of the country: a large-letter postcard,
// balloons over Cappadocia, a ferry on the Bosphorus, the terraces of Pamukkale and the nazar bead.

const TURKIYE_FRAME = { dark: '#1c2340', a: '#b8262c', b: '#2f9aa0', line: '#efe6d0' };

// Repeat a unit round the four sides of a border band `d` knots deep and `o` knots in from the edge: whole units on
// every side, evenly spaced between the corner squares. unit(x, w, d, i) draws one in local coordinates (along the
// band to the right, into the rug downward); corner(x, d) fills a corner square the same way.
function turkBand(x, cols, rows, o, d, step, unit, corner) {
  const sides = [[o, o, 0, cols - 2 * o], [cols - o, o, Math.PI / 2, rows - 2 * o], [cols - o, rows - o, Math.PI, cols - 2 * o], [o, rows - o, -Math.PI / 2, rows - 2 * o]];
  for (const [ox, oy, ang, len] of sides) {
    x.save(); x.translate(ox, oy); x.rotate(ang);
    const { n, d: w } = evenSteps(len - 2 * d, step);
    for (let i = 0; i < n; i++) { const a = Math.round(d + i * w); x.save(); x.translate(a, 0); unit(x, Math.round(d + (i + 1) * w) - a, d, i); x.restore(); }
    if (corner) { x.save(); corner(x, d); x.restore(); }
    x.restore();
  }
}

// Frame of an Anatolian rug: a dark outer guard with reciprocal dots, the main band, then a light line and a dark
// guard. Returns the field in knots.
function turkFrame(x, cols, rows, C, bw, step, unit, corner) {
  x.fillStyle = C.guard; x.fillRect(0, 0, cols, rows);
  x.fillStyle = C.guard2; for (let i = 3; i < cols - 3; i += 3) { x.fillRect(i, 1, 1, 1); x.fillRect(i, rows - 2, 1, 1); } for (let i = 3; i < rows - 3; i += 3) { x.fillRect(1, i, 1, 1); x.fillRect(cols - 2, i, 1, 1); }
  const line = (o, col) => { x.fillStyle = col; x.fillRect(o, o, cols - 2 * o, 1); x.fillRect(o, rows - 1 - o, cols - 2 * o, 1); x.fillRect(o, o, 1, rows - 2 * o); x.fillRect(cols - 1 - o, o, 1, rows - 2 * o); };
  x.fillStyle = C.band; x.fillRect(3, 3, cols - 6, rows - 6);
  turkBand(x, cols, rows, 3, bw - 6, step, unit, corner);
  line(2, C.guard2); line(bw - 3, C.guard2); line(bw - 2, C.guard); line(bw - 1, C.guard);
  x.fillStyle = C.field; x.fillRect(bw, bw, cols - 2 * bw, rows - 2 * bw);
  return { fx: bw, fy: bw, fw: cols - 2 * bw, fh: rows - 2 * bw };
}

// Uşak border: long cartouches with a gold arabesque inside, a star between them.
function cartoucheUnit(C) {
  return (x, w, d) => {
    const p = d * 0.22, cw = w * 0.74, m = d / 2;
    const hex = (k, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(k * 0.8, m); x.lineTo(p + k, p * 0.7 + k * 0.7); x.lineTo(cw - p - k, p * 0.7 + k * 0.7); x.lineTo(cw - k * 0.8, m); x.lineTo(cw - p - k, d - p * 0.7 - k * 0.7); x.lineTo(p + k, d - p * 0.7 - k * 0.7); x.closePath(); x.fill(); };
    hex(0, C.cart2); hex(1.3, C.cart);
    x.strokeStyle = C.cart2; x.lineWidth = 0.9; x.beginPath();
    for (let t = 0; t <= 1.0001; t += 0.04) { const px = p + t * (cw - 2 * p), py = m + Math.sin(t * Math.PI * 2) * d * 0.13; t ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.stroke();
    const sx = cw + (w - cw) / 2;
    persStar(x, sx, m, (w - cw) * 0.5, d * 0.34, 8, 0.55, C.cart2, 0);
    x.fillStyle = C.cart; x.fillRect(sx - 0.8, m - 0.8, 1.6, 1.6);
  };
}

// Running arabesque border: a zigzag vine with split leaves at every turn.
function rumiUnit(C) {
  return (x, w, d, i) => {
    const t = d * 0.26, b = d * 0.74, s = i % 2 ? -1 : 1;
    const y0 = s > 0 ? t : b, y1 = s > 0 ? b : t;
    x.strokeStyle = C.vine; x.lineWidth = 1.3; x.beginPath(); x.moveTo(0, y0); x.lineTo(w / 2, y1); x.lineTo(w, y0); x.stroke();
    leaf(x, w / 2, y1, d * 0.36, s > 0 ? -Math.PI * 0.75 : Math.PI * 0.75, C.leaf);
    leaf(x, w / 2, y1, d * 0.36, s > 0 ? -Math.PI * 0.25 : Math.PI * 0.25, C.leaf);
    x.fillStyle = C.bud; x.beginPath(); x.arc(w / 2, y1 + s * d * 0.06, d * 0.1, 0, Math.PI * 2); x.fill();
  };
}

// Kufic border of the Seljuk carpets: tall letters standing on a running line, pairs of them knotted together
// with a bar, hooked at the top; drawn knot by knot so they stay crisp.
function kuficUnit(C) {
  return (x, w, d, i) => {
    const R = (a, b, ww, hh, col) => { x.fillStyle = col; x.fillRect(a, b, ww, hh); };
    const top = 3, base = d - 4, a = Math.round(w * 0.22), b = Math.round(w * 0.62), t2 = top + (i % 2 ? 0 : 2);
    R(0, base, w, 2, C.kufic);                                   // the running line
    R(a, t2, 2, base - t2, C.kufic); R(b, t2, 2, base - t2, C.kufic);
    const my = Math.round((t2 + base) / 2) - 1;
    R(a, my, b - a + 2, 2, C.kufic);                             // the knot bar
    R(a - 2, t2, 2, 2, C.kufic); R(b + 2, t2, 2, 2, C.kufic);    // hooked tops
    R(a + 2, my - 3, b - a - 2, 2, C.kufic2);                    // a navy lozenge in the loop
    R(w - 1, base - 4, 1, 4, C.kufic); R(w - 2, base - 4, 1, 1, C.kufic);   // a short stem between pairs
  };
}

// Eight-pointed star of two squares, the commonest star of Anatolian weaving.
function star8(x, cx, cy, r, col) {
  x.fillStyle = col;
  for (const a of [0, Math.PI / 4]) { x.beginPath(); for (let k = 0; k < 4; k++) { const t = a + Math.PI / 4 + (k * Math.PI) / 2; const px = cx + Math.cos(t) * r, py = cy + Math.sin(t) * r; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill(); }
}

// A stepped diamond `n` knots across with a hook on each tip, laid knot by knot.
function hookDiamond(x, cx, cy, n, cols) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let dy = -n; dy <= n; dy++) { const w = n - Math.abs(dy); for (let dx = -w; dx <= w; dx++) { const ring = Math.abs(dx) + Math.abs(dy); x.fillStyle = cols[Math.floor((n - ring) / 2) % cols.length]; x.fillRect(cx + dx, cy + dy, 1, 1); } }
  x.fillStyle = cols[0];
  for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const hx = cx + ox * (n + 1), hy = cy + oy * (n + 1); x.fillRect(hx, hy, 1, 1); x.fillRect(hx + ox, hy + oy, 1, 1); x.fillRect(hx + ox + oy, hy + oy + ox, 1, 1); x.fillRect(hx + ox - oy, hy + oy - ox, 1, 1); }
}

// Ottoman flowers for the court carpets and İznik: a slender tulip with needle petals, a fan-shaped carnation,
// and the long serrated saz leaf.
function tulip(x, cx, cy, s, ang, petal, inner) {
  x.save(); x.translate(cx, cy); x.rotate(ang);
  x.fillStyle = petal; x.beginPath(); x.moveTo(0, 0);
  x.bezierCurveTo(-s * 0.42, -s * 0.08, -s * 0.36, -s * 0.62, -s * 0.24, -s * 1.02);
  x.quadraticCurveTo(-s * 0.13, -s * 0.66, 0, -s * 0.94);
  x.quadraticCurveTo(s * 0.13, -s * 0.66, s * 0.24, -s * 1.02);
  x.bezierCurveTo(s * 0.36, -s * 0.62, s * 0.42, -s * 0.08, 0, 0);
  x.fill();
  if (inner) { x.fillStyle = inner; x.beginPath(); x.ellipse(0, -s * 0.42, s * 0.08, s * 0.3, 0, 0, Math.PI * 2); x.fill(); }
  x.restore();
}
function carnation(x, cx, cy, s, ang, petal, inner, calyx) {
  x.save(); x.translate(cx, cy); x.rotate(ang);
  x.fillStyle = calyx; x.beginPath(); x.moveTo(-s * 0.12, 0); x.lineTo(s * 0.12, 0); x.lineTo(s * 0.2, -s * 0.34); x.lineTo(-s * 0.2, -s * 0.34); x.closePath(); x.fill();
  const fan = (r1, r2, col) => {
    x.fillStyle = col; x.beginPath(); x.moveTo(-s * 0.16, -s * 0.32);
    for (let k = 0; k <= 10; k++) { const a = Math.PI * (1.12 + (k / 10) * 0.76), r = k % 2 ? r2 : r1; x.lineTo(Math.cos(a) * r, -s * 0.34 + Math.sin(a) * r); }
    x.lineTo(s * 0.16, -s * 0.32); x.closePath(); x.fill();
  };
  fan(s * 0.66, s * 0.54, petal); if (inner) fan(s * 0.4, s * 0.32, inner);
  x.restore();
}
function sazLeaf(x, x0, y0, x1, y1, bend, wid, col, vein) {
  const mx = (x0 + x1) / 2 - (y1 - y0) * bend, my = (y0 + y1) / 2 + (x1 - x0) * bend;
  const P = (t) => [(1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1];
  const N = 28, L = [], R = [];
  for (let k = 0; k <= N; k++) {
    const t = k / N, [px, py] = P(t), [qx, qy] = P(Math.min(1, t + 0.01)), [rx, ry] = P(Math.max(0, t - 0.01));
    let nx = -(qy - ry), ny = qx - rx; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
    const w = wid * Math.sin(Math.PI * Math.pow(t, 0.75));
    const notch = k % 3 === 1 && t > 0.2 && t < 0.9 ? 0.55 : 1;           // serrations on the outer edge
    L.push([px + nx * w * notch, py + ny * w * notch]); R.push([px - nx * w * 0.8, py - ny * w * 0.8]);
  }
  x.fillStyle = col; x.beginPath(); L.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); for (let i = R.length - 1; i >= 0; i--) x.lineTo(R[i][0], R[i][1]); x.closePath(); x.fill();
  if (vein) { x.strokeStyle = vein; x.lineWidth = 0.8; x.beginPath(); for (let t = 0.06; t <= 0.86; t += 0.04) { const [a, b] = P(t); t > 0.07 ? x.lineTo(a, b) : x.moveTo(a, b); } x.stroke(); }
}

// Uşak medallion carpet: a great navy medallion with gold tracery on madder red, half medallions cut by the sides,
// star medallions top and bottom, gold scrolls in between; cartouches in the border.
function turkUsak(ctx, W, H) {
  const C = { guard: '#1b1a26', guard2: '#e2b84a', band: '#1f2e55', cart: '#a3262b', cart2: '#e2b84a', field: '#a8282c', field2: '#9a2428',
    navy: '#1f2e55', blue: '#5a80b4', ivory: '#efe2c4', gold: '#e2b84a', green: '#4f7a52',
    vine: '#e2b84a', vine2: '#e2b84a', leaf: '#4f7a52', bloom: '#efe2c4', bloom2: '#5a80b4' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, C, 17, 26, cartoucheUnit(C), (x, d) => rosette(x, d / 2, d / 2, d * 0.4, 8, C.gold, C.cart, C.navy));
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 8) % 3 === 2) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) persSpiral(x, fx + (i + (j % 2 ? 0.5 : 0)) * fw / 8, fy + (j + 0.5) * fh / 4, 6, 1.4, (i + j) % 2 ? 1 : -1, C);
    const cx = fx + fw / 2, cy = fy + fh / 2;
    const medallion = (mx, my, rx, ry) => {
      for (const d of [-1, 1]) { x.fillStyle = C.gold; x.beginPath(); x.moveTo(mx - rx * 0.2, my + d * ry * 0.84); x.lineTo(mx, my + d * ry * 1.24); x.lineTo(mx + rx * 0.2, my + d * ry * 0.84); x.fill(); }
      persLobed(x, mx, my, rx + 1.5, ry + 1.5, 14, 0.12, C.gold);
      persLobed(x, mx, my, rx, ry, 14, 0.12, C.navy);
      for (const d of [-1, 1]) { x.fillStyle = C.navy; x.beginPath(); x.moveTo(mx - rx * 0.12, my + d * ry * 0.84); x.lineTo(mx, my + d * ry * 1.14); x.lineTo(mx + rx * 0.12, my + d * ry * 0.84); x.fill(); }
      x.strokeStyle = C.gold; x.lineWidth = 1; x.beginPath(); x.ellipse(mx, my, rx * 0.68, ry * 0.68, 0, 0, Math.PI * 2); x.stroke();
      for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; palmette(x, mx + Math.cos(a) * rx * 0.68, my + Math.sin(a) * ry * 0.68, Math.min(rx, ry) * 0.2, a + Math.PI / 2, k % 2 ? C.ivory : C.blue, C.cart); }
      persLobed(x, mx, my, rx * 0.38, ry * 0.38, 8, 0.25, C.cart);
      persStar(x, mx, my, rx * 0.26, ry * 0.26, 8, 0.6, C.gold, Math.PI / 8);
      rosette(x, mx, my, Math.min(rx, ry) * 0.16, 8, C.ivory, C.cart, C.navy);
    };
    medallion(cx, cy, fw * 0.17, fh * 0.36);
    medallion(fx, cy, fw * 0.13, fh * 0.3); medallion(fx + fw, cy, fw * 0.13, fh * 0.3);
    for (const [mx, my] of [[fx + fw * 0.25, fy], [fx + fw * 0.75, fy], [fx + fw * 0.25, fy + fh], [fx + fw * 0.75, fy + fh]]) {
      persStar(x, mx, my, fw * 0.1, fh * 0.22, 8, 0.72, C.gold, Math.PI / 8); persStar(x, mx, my, fw * 0.088, fh * 0.195, 8, 0.72, C.navy, Math.PI / 8);
      persLobed(x, mx, my, fw * 0.05, fh * 0.11, 8, 0.2, C.cart); rosette(x, mx, my, 3.4, 8, C.gold, C.ivory, C.navy);
    }
    x.restore();
  });
}

// Lotto carpet: the yellow arabesque lattice on red (named after the painter who kept putting it in his pictures):
// octagons and cruciform leaves on a grid, small diamonds where the leaves meet, and a rumi vine in the border.
function turkLotto(ctx, W, H) {
  const C = { guard: '#1b1a26', guard2: '#e6c048', band: '#1f3d52', vine: '#e6c048', leaf: '#e6c048', bud: '#b0302c',
    field: '#b0302c', field2: '#a22b29', gold: '#e6c048', dark: '#1f2a44', blue: '#3f6aa0', green: '#4f7a52' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, C, 16, 13, rumiUnit(C), (x, d) => { persStar(x, d / 2, d / 2, d * 0.42, d * 0.42, 8, 0.6, C.gold, Math.PI / 8); x.fillStyle = C.bud; x.fillRect(d / 2 - 1, d / 2 - 1, 2, 2); });
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 7) % 4 === 1) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const nr = 3, th = fh / nr, nc = Math.max(3, Math.round(fw / th)), tw = fw / nc;
    const outlined = (path) => { path(); x.strokeStyle = C.dark; x.lineWidth = 2; x.stroke(); x.fillStyle = C.gold; x.fill(); };
    const arm = (cx, cy, ex, ey, flip) => {
      const dx = ex - cx, dy = ey - cy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy * flip, ny = ux * flip;
      const P = (t, o) => [cx + ux * L * t + nx * o, cy + uy * L * t + ny * o];
      const pts = [P(0.3, 1.5), P(0.56, 2.2), P(0.66, 4.2), P(0.74, 1.6), P(0.94, 0), P(0.6, -1.8), P(0.3, -1.5)];
      outlined(() => { x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath(); });
    };
    const oct = (cx, cy, r) => { x.beginPath(); for (let k = 0; k < 8; k++) { const a = Math.PI / 8 + (k * Math.PI) / 4; const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); };
    const nodes = [];
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const cx = fx + (i + 0.5) * tw, cy = fy + (j + 0.5) * th;
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) arm(cx, cy, cx + sx * tw / 2, cy + sy * th / 2, sx * sy);
      // the octagon with a blue cross in it
      oct(cx, cy, Math.min(tw, th) * 0.24); x.strokeStyle = C.dark; x.lineWidth = 3.6; x.stroke(); x.strokeStyle = C.gold; x.lineWidth = 1.6; x.stroke();
      x.fillStyle = C.blue; x.fillRect(cx - 3, cy - 1, 6, 2); x.fillRect(cx - 1, cy - 3, 2, 6);
      x.fillStyle = C.gold; x.fillRect(cx - 0.6, cy - 0.6, 1.2, 1.2);
      // kites between neighbours
      for (const [kx, ky, hor] of [[cx + tw / 2, cy, 0], [cx, cy + th / 2, 1]]) {
        const a = hor ? tw * 0.16 : tw * 0.07, b = hor ? th * 0.07 : th * 0.16;
        outlined(() => { x.beginPath(); x.moveTo(kx - a, ky); x.lineTo(kx, ky - b); x.lineTo(kx + a, ky); x.lineTo(kx, ky + b); x.closePath(); });
        x.fillStyle = C.green; x.fillRect(kx - 1, ky - 1, 2, 2);
      }
      nodes.push([cx - tw / 2, cy - th / 2], [cx + tw / 2, cy + th / 2], [cx + tw / 2, cy - th / 2], [cx - tw / 2, cy + th / 2]);
    }
    for (const [nx, ny] of nodes) { outlined(() => { x.beginPath(); x.moveTo(nx - 4, ny); x.lineTo(nx, ny - 4); x.lineTo(nx + 4, ny); x.lineTo(nx, ny + 4); x.closePath(); }); x.fillStyle = C.blue; x.fillRect(nx - 1, ny - 1, 2, 2); }
    x.restore();
  });
}

// Bergama: a bold village rug. A great stepped navy square with an ivory hooked octagon in it, hooked diamonds
// either side, latch hooks and S motifs, and a red and ivory crenellated border between barber-pole stripes.
function turkBergama(ctx, W, H) {
  const C = { navy: '#1e2a52', ivory: '#efe2c4', red: '#a8282c', field2: '#982428', gold: '#e0a83a', green: '#3f7a4f', blue: '#5a86b8', dark: '#22181a' };
  weavePicture(ctx, W, H, 100, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.navy);
    // colorAt(i, j, len) for the knot i along a side and j into the rug, on all four sides of a band `o` in
    const four = (o, depth, colorAt) => {
      for (const [len, map] of [[cols - 2 * o, (i, j) => [o + i, o + j]], [cols - 2 * o, (i, j) => [o + i, rows - 1 - o - j]], [rows - 2 * o, (i, j) => [o + j, o + i]], [rows - 2 * o, (i, j) => [cols - 1 - o - j, o + i]]])
        for (let i = 0; i < len; i++) for (let j = 0; j < depth; j++) { const c = colorAt(i, j, len); if (c) { const [a, b] = map(i, j); R(a, b, 1, 1, c); } }
    };
    const pole = (o) => four(o, 3, (i, j) => [C.ivory, C.red, C.navy][Math.floor((i + j + 300) / 2) % 3]);
    const bo = 5, bd = 10;
    four(bo, bd, (i, j, len) => {
      if (i < bd || i >= len - bd) return null;
      const { d } = evenSteps(len - 2 * bd, 8), u = i - bd, k = Math.floor(u / d), ph = (u - k * d) / d;
      const deep = ph >= 0.25 && ph < 0.75 ? 6 : 3;
      if (j < deep) return Math.abs(ph - 0.5) < 0.1 && (j === 2 || j === 3) ? C.navy : C.red;
      return (ph < 0.1 || ph > 0.9) && (j === 6 || j === 7) ? C.green : C.ivory;
    });
    for (const [a, b] of [[bo, bo], [cols - bo - bd, bo], [bo, rows - bo - bd], [cols - bo - bd, rows - bo - bd]]) { R(a, b, bd, bd, C.red); R(a + 3, b + 3, bd - 6, bd - 6, C.ivory); R(a + 4, b + 4, bd - 8, bd - 8, C.navy); }
    pole(2); pole(bo + bd);
    const fx = bo + bd + 3, fy = fx, fw = cols - 2 * fx, fh = rows - 2 * fy;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 6) % 4 === 3 ? C.field2 : C.red);
    const cx = Math.round(fx + fw / 2), cy = Math.round(fy + fh / 2);
    const sq = (r, cut, col) => { for (let dy = -r; dy <= r; dy++) { const hw = r - Math.max(0, Math.abs(dy) - (r - cut)); R(cx - hw, cy + dy, 2 * hw + 1, 1, col); } };
    const r0 = Math.round(fh * 0.37);
    for (let k = -r0 + 9; k <= r0 - 9; k += 4) {                 // latch hooks round the square
      R(cx + k, cy - r0 - 2, 1, 2, C.ivory); R(cx + k + 1, cy - r0 - 2, 1, 1, C.ivory);
      R(cx + k, cy + r0 + 1, 1, 2, C.ivory); R(cx + k + 1, cy + r0 + 2, 1, 1, C.ivory);
      R(cx - r0 - 2, cy + k, 2, 1, C.ivory); R(cx - r0 - 2, cy + k + 1, 1, 1, C.ivory);
      R(cx + r0 + 1, cy + k, 2, 1, C.ivory); R(cx + r0 + 2, cy + k + 1, 1, 1, C.ivory);
    }
    sq(r0, 8, C.navy); sq(r0 - 2, 7, C.gold); sq(r0 - 3, 7, C.navy);
    sq(Math.round(r0 * 0.66), 6, C.ivory); sq(Math.round(r0 * 0.66) - 2, 5, C.green);
    sq(Math.round(r0 * 0.42), 4, C.red);
    star8(x, cx + 0.5, cy + 0.5, r0 * 0.3, C.gold); R(cx - 1, cy - 1, 3, 3, C.navy); R(cx, cy, 1, 1, C.ivory);
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) hookDiamond(x, cx + sx * Math.round(r0 * 0.66), cy + sy * Math.round(r0 * 0.66), 3, [C.ivory, C.red]);
    const S = (a, b, col) => { for (const [dx, dy] of [[0, 0], [1, 0], [5, 0], [6, 0], [0, 1], [2, 1], [4, 1], [6, 1], [2, 2], [3, 2], [4, 2], [3, 3], [3, 4]]) R(a + dx - 2, b + dy, 1, 1, col); }; // ram's horn
    for (const s of [-1, 1]) {
      const hx = cx + s * Math.round(fw * 0.37);
      hookDiamond(x, hx, cy, Math.round(fh * 0.23), [C.ivory, C.navy, C.gold, C.red, C.blue]);
      for (const dy of [-1, 1]) { star8(x, hx + 0.5, cy + dy * Math.round(fh * 0.38) + 0.5, 3.4, C.gold); R(hx, cy + dy * Math.round(fh * 0.38), 1, 1, C.red); }
      for (const dy of [-1, 1]) S(cx + s * Math.round(fw * 0.47) - 1, cy + dy * Math.round(fh * 0.36) - 2, C.ivory);
      for (const dy of [-1, 1]) S(cx + s * Math.round(fw * 0.22) - 1, cy + dy * Math.round(fh * 0.43) - 2, C.gold);
    }
  });
}

// Yağcıbedir: the dark rugs of the Balıkesir hills. A red stepped hexagon with an ivory star on a blue-black field,
// octagons either side, little stars and crosses everywhere; stars and diamonds in a red border.
function turkYagcibedir(ctx, W, H) {
  const C = { guard: '#14141f', guard2: '#efe6d2', band: '#7e1f26', field: '#181b2e', field2: '#1f2338', red: '#8e2228', ivory: '#efe6d2', navy: '#2a3358', brown: '#6a3a2a', gold: '#d9a64a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, C, 16, 12, (x, w, d, i) => {
      if (i % 2 === 0) { star8(x, w / 2, d / 2, d * 0.36, C.ivory); persStar(x, w / 2, d / 2, d * 0.18, d * 0.18, 4, 0.5, C.red, Math.PI / 4); }
      else { x.fillStyle = C.field; x.beginPath(); x.moveTo(w / 2, d * 0.12); x.lineTo(w * 0.92, d / 2); x.lineTo(w / 2, d * 0.88); x.lineTo(w * 0.08, d / 2); x.closePath(); x.fill(); x.fillStyle = C.gold; x.fillRect(w / 2 - 1, d / 2 - 1, 2, 2); }
    }, (x, d) => { star8(x, d / 2, d / 2, d * 0.4, C.gold); x.fillStyle = C.field; x.fillRect(d / 2 - 1, d / 2 - 1, 2, 2); });
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 5) % 4 === 1) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // little stars and crosses on a grid
    for (let j = 0; j < 7; j++) for (let i = 0; i < 13; i++) {
      const px = fx + (i + (j % 2 ? 0.5 : 0)) * fw / 12.5, py = fy + (j + 0.5) * fh / 7;
      if ((i + j) % 3 === 0) star8(x, px, py, 2.6, (i + j) % 2 ? C.ivory : C.red);
      else if ((i + j) % 3 === 1) { x.fillStyle = (i % 2) ? C.ivory : C.gold; x.fillRect(px - 2, py - 0.5, 4, 1); x.fillRect(px - 0.5, py - 2, 1, 4); }
      else { x.fillStyle = C.brown; x.fillRect(px - 1, py - 1, 2, 2); }
    }
    const cx = fx + fw / 2, cy = fy + fh / 2;
    const hexa = (a, b, h, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(cx - a, cy); x.lineTo(cx - b, cy - h); x.lineTo(cx + b, cy - h); x.lineTo(cx + a, cy); x.lineTo(cx + b, cy + h); x.lineTo(cx - b, cy + h); x.closePath(); x.fill(); };
    const A = fw * 0.26, B = fw * 0.14, Hh = fh * 0.36;
    hexa(A + 3.6, B + 2.4, Hh + 2.6, C.ivory); hexa(A, B, Hh, C.red);
    hexa(A * 0.72, B * 0.66, Hh * 0.7, C.field);
    star8(x, cx, cy, fh * 0.24, C.ivory); star8(x, cx, cy, fh * 0.16, C.red); star8(x, cx, cy, fh * 0.08, C.gold); x.fillStyle = C.field; x.fillRect(cx - 1, cy - 1, 2, 2);
    for (const s of [-1, 1]) star8(x, cx + s * A * 0.62, cy, fh * 0.07, C.gold);
    // octagons either side
    for (const s of [-1, 1]) {
      const ox = cx + s * fw * 0.4;
      persStar(x, ox, cy, fh * 0.26, fh * 0.26, 8, 0.92, C.ivory, Math.PI / 8); persStar(x, ox, cy, fh * 0.23, fh * 0.23, 8, 0.92, C.navy, Math.PI / 8);
      star8(x, ox, cy, fh * 0.17, C.red); star8(x, ox, cy, fh * 0.1, C.ivory); x.fillStyle = C.red; x.fillRect(ox - 1, cy - 1, 2, 2);
    }
    // quarter hexagons in the corners
    for (const [qx, qy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) { star8(x, qx, qy, fh * 0.2, C.red); star8(x, qx, qy, fh * 0.12, C.ivory); }
    x.restore();
  });
}

// Seljuk carpet of Konya: rows of small hooked octagons in two blues, and the great kufic border the Seljuk weavers
// were known for.
function turkSelcuklu(ctx, W, H) {
  const C = { guard: '#1a1a2a', guard2: '#d9b871', band: '#8e3a2a', kufic: '#e3cc8e', kufic2: '#1f2f55', field: '#2f4f86', field2: '#2b497d', light: '#8fb0dc', navy: '#1a2950', ivory: '#ece0c2', red: '#8e3a2a' };
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, C, 22, 13, kuficUnit(C), (x, d) => { star8(x, d / 2, d / 2, d * 0.4, C.kufic); star8(x, d / 2, d / 2, d * 0.2, C.navy); });
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 6) % 5 === 2) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    const nr = 4, dh = fh / nr, nc = Math.round((fw / dh) * 1.1), dw = fw / nc;
    for (let j = 0; j < nr; j++) for (let i = -1; i <= nc; i++) {
      const cx = Math.round(fx + (i + 0.5 + (j % 2 ? 0.5 : 0)) * dw), cy = Math.round(fy + (j + 0.5) * dh), r = Math.round(Math.min(dw, dh) * 0.3);
      const col = j % 2 ? C.light : C.navy, in2 = j % 2 ? C.navy : C.light;
      for (let dy = -r; dy <= r; dy++) { const hw = r - Math.max(0, Math.abs(dy) - Math.round(r * 0.45)); R(cx - hw, cy + dy, 2 * hw + 1, 1, col); }
      // latch hooks off the four sides
      R(cx, cy - r - 2, 1, 2, col); R(cx, cy - r - 3, 3, 1, col); R(cx + 2, cy - r - 2, 1, 1, col);
      R(cx, cy + r + 1, 1, 2, col); R(cx - 2, cy + r + 3, 3, 1, col); R(cx - 2, cy + r + 2, 1, 1, col);
      R(cx - r - 2, cy, 2, 1, col); R(cx - r - 3, cy - 2, 1, 3, col); R(cx - r - 2, cy - 2, 1, 1, col);
      R(cx + r + 1, cy, 2, 1, col); R(cx + r + 3, cy, 1, 3, col); R(cx + r + 2, cy + 2, 1, 1, col);
      const r2 = Math.round(r * 0.6); for (let dy = -r2; dy <= r2; dy++) { const hw = r2 - Math.abs(dy); R(cx - hw, cy + dy, 2 * hw + 1, 1, in2); }
      R(cx - 1, cy - 1, 3, 3, C.red); R(cx, cy, 1, 1, C.ivory);
    }
    x.restore();
  });
}

// Hereke silk: an Ottoman court carpet on ruby silk. An ivory oval medallion ringed with saz leaves, tulips and
// carnations, ivory corners, little sprays all over the field, and tulips and carnations on a vine in the border.
function turkHereke(ctx, W, H) {
  const C = { guard: '#2a1a1e', guard2: '#e6cf8a', band: '#efe4cc', field: '#8e1f2b', field2: '#861d29', gold: '#d8b25a', ivory: '#efe4cc',
    teal: '#3f8a8a', navy: '#22305a', green: '#4f7a52', pink: '#d98a8a' };
  weavePicture(ctx, W, H, 150, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, C, 19, 15, (x, w, d, i) => {
      x.strokeStyle = C.gold; x.lineWidth = 0.9; x.beginPath(); for (let t = 0; t <= 1.0001; t += 0.05) { const px = t * w, py = d * 0.8 + Math.sin(t * Math.PI * 2) * d * 0.06; t ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
      if (i % 2 === 0) tulip(x, w / 2, d * 0.84, d * 0.66, 0, C.field, C.pink); else carnation(x, w / 2, d * 0.84, d * 0.62, 0, C.navy, C.pink, C.green);
      leaf(x, w / 2, d * 0.8, d * 0.3, -0.35, C.green); leaf(x, w / 2, d * 0.8, d * 0.3, Math.PI + 0.35, C.green);
    }, (x, d) => rosette(x, d / 2, d / 2, d * 0.38, 8, C.field, C.gold, C.navy));
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 9) % 4 === 2) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const cx = fx + fw / 2, cy = fy + fh / 2, rx = fw * 0.2, ry = fh * 0.4;
    // a fine gold ogee lattice, a spray in every compartment, kept clear of the medallion and the corners
    const lc = 8, lw = fw / lc;
    x.strokeStyle = C.gold; x.lineWidth = 0.8;
    for (let k = 0; k <= lc; k++) for (const ph of [0, Math.PI]) { x.beginPath(); for (let y = fy; y <= fy + fh; y++) { const px = fx + k * lw + Math.sin(((y - fy) / fh) * Math.PI * 3 + ph) * lw * 0.5; y > fy ? x.lineTo(px, y) : x.moveTo(px, y); } x.stroke(); }
    for (let j = 0; j < 3; j++) for (let i = 0; i <= lc; i++) {
      const px = fx + (i + (j % 2 ? 0.5 : 0)) * lw, py = fy + ((2 * j + 1) / 6) * fh - 3;
      if (((px - cx) / (rx + 7)) ** 2 + ((py - cy) / (ry + 5)) ** 2 < 1) continue;
      if (Math.min(px - fx, fx + fw - px) < fw * 0.17 && Math.min(py - fy, fy + fh - py) < fh * 0.3) continue;
      if ((i + j) % 2) tulip(x, px, py + 4, 8, (i % 3 - 1) * 0.3, C.gold, null); else carnation(x, px, py + 4, 8, (j % 3 - 1) * 0.3, C.ivory, C.pink, C.green);
      leaf(x, px, py + 4, 5, -0.6, C.green); leaf(x, px, py + 4, 5, Math.PI + 0.6, C.green);
    }
    // corners
    for (const [sx, sy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) {
      x.fillStyle = C.gold; x.beginPath(); x.ellipse(sx, sy, fw * 0.17 + 1.5, fh * 0.3 + 1.5, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.ivory; x.beginPath(); x.ellipse(sx, sy, fw * 0.17, fh * 0.3, 0, 0, Math.PI * 2); x.fill();
      const ix = sx === fx ? 1 : -1, iy = sy === fy ? 1 : -1;
      sazLeaf(x, sx + ix * 3, sy + iy * fh * 0.22, sx + ix * fw * 0.13, sy + iy * 4, ix * iy * 0.22, 3, C.teal, C.ivory);
      rosette(x, sx + ix * fw * 0.05, sy + iy * fh * 0.09, 5, 8, C.field, C.gold, C.navy);
    }
    // the medallion
    for (const d of [-1, 1]) { x.fillStyle = C.gold; x.beginPath(); x.ellipse(cx, cy + d * (ry + 5), 6.5, 6.5, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = C.ivory; x.beginPath(); x.ellipse(cx, cy + d * (ry + 5), 5, 5, 0, 0, Math.PI * 2); x.fill(); rosette(x, cx, cy + d * (ry + 5), 4, 8, C.field, C.gold, C.navy); }
    persLobed(x, cx, cy, rx + 2.4, ry + 2.4, 20, 0.08, C.gold);
    persLobed(x, cx, cy, rx, ry, 20, 0.08, C.ivory);
    persLobed(x, cx, cy, rx * 0.86, ry * 0.86, 16, 0.1, C.gold); persLobed(x, cx, cy, rx * 0.86 - 1.1, ry * 0.86 - 1.1, 16, 0.1, C.ivory);
    for (let k = 0; k < 4; k++) {
      const a = (k * Math.PI) / 2 + Math.PI / 4, b = a + Math.PI / 2;
      sazLeaf(x, cx + Math.cos(a) * rx * 0.72, cy + Math.sin(a) * ry * 0.72, cx + Math.cos(b) * rx * 0.68, cy + Math.sin(b) * ry * 0.68, 0.28, 3.4, C.teal, C.ivory);
    }
    for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2; tulip(x, cx + Math.cos(a) * rx * 0.28, cy + Math.sin(a) * ry * 0.28, Math.min(rx, ry) * 0.5, a + Math.PI / 2, C.field, C.pink); }
    for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2 + Math.PI / 4; carnation(x, cx + Math.cos(a) * rx * 0.36, cy + Math.sin(a) * ry * 0.36, Math.min(rx, ry) * 0.3, a + Math.PI / 2, C.navy, C.pink, C.green); }
    rosette(x, cx, cy, Math.min(rx, ry) * 0.22, 8, C.field, C.gold, C.navy);
    x.restore();
  });
  // silk sheen
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, 'rgba(255,255,255,.14)'); g.addColorStop(0.35, 'rgba(255,255,255,0)'); g.addColorStop(0.65, 'rgba(255,255,255,.1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}

// İznik florals on a white ground, like the tile panels: three bouquets in cobalt vases (a coral tulip, carnations,
// turquoise tulips, hyacinths and arching saz leaves), rosettes between them, and a cobalt border of white
// rosettes and turquoise tulips.
function turkIznik(ctx, W, H) {
  const C = { guard: '#1a2a55', guard2: '#f4f0e6', band: '#1f3f8f', field: '#f4f0e6', field2: '#ece6d8', cobalt: '#1f3f8f', turq: '#2a9d9a', coral: '#c43a2c', green: '#3f7d4a', dark: '#1a2a55' };
  weavePicture(ctx, W, H, 140, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, C, 17, 15, (x, w, d, i) => {
      if (i % 2 === 0) rosette(x, w / 2, d / 2, d * 0.4, 8, C.field, C.coral, C.cobalt);
      else tulip(x, w / 2, d * 0.84, d * 0.66, 0, C.turq, C.field);
    }, (x, d) => rosette(x, d / 2, d / 2, d * 0.42, 8, C.turq, C.field, C.coral));
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const stem = (x0, y0, x1, y1, bend) => { x.strokeStyle = C.green; x.lineWidth = 1.5; x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2 + bend, (y0 + y1) / 2, x1, y1); x.stroke(); };
    const bouquet = (bx, base, s) => {
      const neck = base - s * 0.27;
      for (const d of [-1, 1]) {
        sazLeaf(x, bx, neck, bx + d * s * 0.4, neck - s * 0.42, d * 0.3, s * 0.06, C.green, C.field);
        stem(bx, neck, bx + d * s * 0.2, neck - s * 0.45, d * s * 0.06); carnation(x, bx + d * s * 0.2, neck - s * 0.45, s * 0.17, d * 0.35, C.cobalt, C.coral, C.green);
        stem(bx, neck, bx + d * s * 0.34, neck - s * 0.22, 0); tulip(x, bx + d * s * 0.34, neck - s * 0.22, s * 0.13, d * 0.9, C.turq, C.field);
        // a hyacinth: little bells up its stem
        stem(bx, neck, bx + d * s * 0.11, neck - s * 0.62, 0);
        for (let b = 0; b < 7; b++) { const o = b % 2 ? -1 : 1, t = 0.36 + b * 0.036; x.fillStyle = b % 3 === 2 ? C.turq : C.cobalt; x.beginPath(); x.ellipse(bx + d * s * 0.11 * (t / 0.62) + o * 1.8, neck - s * t, 1.6, 1.1, o * 0.6, 0, Math.PI * 2); x.fill(); }
      }
      stem(bx, neck, bx, neck - s * 0.56, 0); tulip(x, bx, neck - s * 0.56, s * 0.2, 0, C.coral, C.field);
      // the vase
      // the vase: a small foot, a round body, a slim neck and a flared lip
      x.fillStyle = C.cobalt; x.beginPath(); x.moveTo(bx - s * 0.06, base); x.lineTo(bx - s * 0.04, base - s * 0.03);
      x.bezierCurveTo(bx - s * 0.2, base - s * 0.05, bx - s * 0.18, base - s * 0.17, bx - s * 0.04, base - s * 0.2);
      x.lineTo(bx - s * 0.035, neck + s * 0.02); x.lineTo(bx - s * 0.08, neck); x.lineTo(bx + s * 0.08, neck); x.lineTo(bx + s * 0.035, neck + s * 0.02); x.lineTo(bx + s * 0.04, base - s * 0.2);
      x.bezierCurveTo(bx + s * 0.18, base - s * 0.17, bx + s * 0.2, base - s * 0.05, bx + s * 0.04, base - s * 0.03); x.lineTo(bx + s * 0.06, base); x.closePath(); x.fill();
      x.fillStyle = C.turq; x.fillRect(bx - s * 0.15, base - s * 0.13, s * 0.3, 2);
      rosette(x, bx, base - s * 0.085, s * 0.035, 6, C.field, C.coral, C.cobalt);
    };
    bouquet(fx + fw * 0.5, fy + fh * 0.97, fh * 0.9);
    for (const p of [0.16, 0.84]) bouquet(fx + fw * p, fy + fh * 0.97, fh * 0.74);
    // cloud scrolls and rosettes between the bouquets
    for (const p of [0.33, 0.67]) {
      const bx = fx + fw * p;
      rosette(x, bx, fy + fh * 0.58, 4.6, 8, C.turq, C.coral, C.field);
      rosette(x, bx, fy + fh * 0.85, 3.4, 6, C.coral, C.cobalt, C.field);
    }
    x.restore();
  });
}

// Letter scenes for the Türkiye postcard.
const TURKIYE_SCENES = [
  (c, w, h) => { // balloons over Cappadocia at sunrise
    c.fillStyle = '#f29a68'; c.fillRect(0, 0, w, h); c.fillStyle = '#f7c98a'; c.fillRect(0, h * 0.5, w, h);
    c.fillStyle = '#c9906a'; for (const [x0, ww, hh] of [[-0.1, 0.4, 0.3], [0.25, 0.3, 0.38], [0.55, 0.35, 0.28]]) { c.beginPath(); c.moveTo(w * x0, h); c.lineTo(w * (x0 + ww / 2), h * (1 - hh)); c.lineTo(w * (x0 + ww), h); c.fill(); }
    c.fillStyle = '#c8323a'; c.beginPath(); c.arc(w * 0.32, h * 0.22, w * 0.16, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#2c4fa0'; c.beginPath(); c.arc(w * 0.72, h * 0.38, w * 0.12, 0, Math.PI * 2); c.fill();
  },
  (c, w, h) => { // Pamukkale's white terraces and pools
    c.fillStyle = '#8cc8e8'; c.fillRect(0, 0, w, h);
    for (let k = 0; k < 4; k++) { c.fillStyle = '#4fc1cf'; c.fillRect(0, h * (0.22 + k * 0.2), w, h * 0.09); c.fillStyle = '#f4f7f6'; c.fillRect(0, h * (0.31 + k * 0.2), w, h * 0.11); }
  },
  (c, w, h) => { // tulips
    c.fillStyle = '#3f8a4a'; c.fillRect(0, 0, w, h);
    for (let k = 0; k < 6; k++) { const x = w * (0.25 + (k % 2) * 0.5), y = h * (0.18 + Math.floor(k / 2) * 0.32); c.fillStyle = k % 3 ? '#d2343a' : '#f2c14a'; c.beginPath(); c.ellipse(x, y, w * 0.15, h * 0.1, 0, 0, Math.PI * 2); c.fill(); }
  },
  (c, w, h) => { // the Bosphorus at dusk, Galata Tower on the hill
    c.fillStyle = '#f08a5a'; c.fillRect(0, 0, w, h * 0.55); c.fillStyle = '#2a3f7a'; c.fillRect(0, h * 0.55, w, h);
    c.fillStyle = '#2a2440'; c.fillRect(0, h * 0.45, w, h * 0.12); c.fillRect(w * 0.4, h * 0.2, w * 0.24, h * 0.3); c.beginPath(); c.moveTo(w * 0.36, h * 0.22); c.lineTo(w * 0.52, h * 0.04); c.lineTo(w * 0.68, h * 0.22); c.fill();
  },
  (c, w, h) => { // the turquoise coast
    c.fillStyle = '#8fd0ea'; c.fillRect(0, 0, w, h); c.fillStyle = '#25b3b8'; c.fillRect(0, h * 0.4, w, h * 0.35); c.fillStyle = '#f3e3bd'; c.fillRect(0, h * 0.75, w, h);
  },
  (c, w, h) => { // İznik tile
    c.fillStyle = '#f4f0e6'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1f3f8f'; c.beginPath(); c.arc(w * 0.5, h * 0.3, w * 0.32, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(w * 0.5, h * 0.78, w * 0.32, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#c43a2c'; c.beginPath(); c.arc(w * 0.5, h * 0.3, w * 0.14, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(w * 0.5, h * 0.78, w * 0.14, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#2a9d9a'; c.fillRect(0, h * 0.52, w, h * 0.06);
  },
  (c, w, h) => { const cols = ['#a8282c', '#e0a83a', '#1e2a52', '#efe2c4', '#a8282c', '#3f7a4f', '#1e2a52', '#e0a83a']; for (let i = 0; i < 8; i++) { c.fillStyle = cols[i]; c.fillRect(0, (h * i) / 8, w, h / 8 + 1); } }, // kilim stripes
];
function turkPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'TÜRKİYE', TURKIYE_SCENES, 19.5, 50); } // smaller capitals: room for the dots

// Hot-air balloons rising over the fairy chimneys of Cappadocia at sunrise.
function turkCappadocia(ctx, W, H) {
  const u = H / 100, hz = H * 0.66;
  const sky = ctx.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#2f4a8a'); sky.addColorStop(0.35, '#7a6aa8'); sky.addColorStop(0.68, '#ef8f74'); sky.addColorStop(1, '#f7c48a');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffe9b0'; ctx.beginPath(); ctx.arc(W * 0.6, hz - 2 * u, 7 * u, 0, Math.PI * 2); ctx.fill();
  // the plateau far away
  ctx.fillStyle = '#c48a74'; ctx.beginPath(); ctx.moveTo(0, hz); for (let k = 0; k <= 30; k++) { const t = k / 30; ctx.lineTo(W * t, hz - (3 + 2.4 * Math.sin(t * 9) + (k % 4 === 0 ? 1.2 : 0)) * u); } ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#b07a66'; ctx.fillRect(0, hz, W, H - hz);
  const chimney = (cx, base, w, h, col, shade, cap, door) => {
    const shape = () => { ctx.beginPath(); ctx.moveTo(cx - w / 2, base); ctx.quadraticCurveTo(cx - w * 0.3, base - h * 0.6, cx - w * 0.13, base - h); ctx.lineTo(cx + w * 0.13, base - h); ctx.quadraticCurveTo(cx + w * 0.3, base - h * 0.6, cx + w / 2, base); ctx.closePath(); };
    ctx.fillStyle = col; shape(); ctx.fill();
    ctx.save(); shape(); ctx.clip(); ctx.fillStyle = shade; ctx.fillRect(cx + w * 0.08, base - h, w, h); ctx.restore();
    ctx.fillStyle = cap; ctx.beginPath(); ctx.ellipse(cx, base - h, w * 0.26, w * 0.13, 0, 0, Math.PI * 2); ctx.fill();
    if (door) { ctx.fillStyle = '#4a2c24'; roundRect(ctx, cx - w * 0.08, base - h * 0.42, w * 0.14, h * 0.16, w * 0.07); ctx.fill(); ctx.fillRect(cx - w * 0.2, base - h * 0.7, w * 0.08, w * 0.08); }
  };
  // rocks in the middle distance, then the big ones in front
  ctx.fillStyle = '#a8705a'; ctx.fillRect(0, hz + 3 * u, W, H);
  for (const [x, h, w] of [[0.03, 12, 6], [0.1, 16, 7], [0.17, 10, 5], [0.36, 9, 5], [0.42, 13, 6], [0.49, 8, 4], [0.7, 10, 5], [0.77, 14, 7], [0.9, 17, 7], [0.97, 11, 5]]) chimney(W * x, hz + 6 * u, w * u, h * u, '#e2b892', '#c99a76', '#6a463c', h > 13);
  ctx.fillStyle = '#9a6450'; ctx.fillRect(0, hz + 6 * u, W, H);
  ctx.fillStyle = '#5f7a42'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.ellipse(((i * 61) % 100) / 100 * W, hz + (8 + (i * 7) % 12) * u, 2.6 * u, 1.4 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  for (const [x, h, w, d] of [[0.03, 36, 15, true], [0.13, 28, 12, false], [0.22, 21, 10, true], [0.3, 15, 8, false], [0.68, 17, 9, false], [0.76, 25, 11, true], [0.86, 38, 16, true], [0.96, 28, 12, false]]) chimney(W * x, H + 2 * u, w * u, h * u, '#f2d4b0', '#d9ab86', '#6a463c', d);
  // balloons
  const balloon = (bx, by, r, cols) => {
    const env = () => { ctx.beginPath(); ctx.moveTo(bx - r * 0.34, by + r * 1.12); ctx.bezierCurveTo(bx - r * 1.25, by + r * 0.4, bx - r * 1.1, by - r * 1.02, bx, by - r * 1.02); ctx.bezierCurveTo(bx + r * 1.1, by - r * 1.02, bx + r * 1.25, by + r * 0.4, bx + r * 0.34, by + r * 1.12); ctx.closePath(); };
    ctx.save(); env(); ctx.clip();
    const n = 6; for (let k = n; k >= 1; k--) { ctx.fillStyle = cols[k % cols.length]; ctx.beginPath(); ctx.ellipse(bx, by + r * 0.05, r * 1.15 * (k / n), r * 1.3, 0, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = cols[0]; ctx.fillRect(bx - r * 1.3, by + r * 0.15, r * 2.6, r * 0.2);
    ctx.fillStyle = 'rgba(40,20,40,.22)'; ctx.beginPath(); ctx.ellipse(bx + r * 0.85, by + r * 0.1, r * 0.55, r * 1.4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = '#4a3020'; ctx.lineWidth = Math.max(1, r * 0.07);
    ctx.beginPath(); ctx.moveTo(bx - r * 0.3, by + r * 1.12); ctx.lineTo(bx - r * 0.17, by + r * 1.42); ctx.moveTo(bx + r * 0.3, by + r * 1.12); ctx.lineTo(bx + r * 0.17, by + r * 1.42); ctx.stroke();
    ctx.fillStyle = '#6a4428'; ctx.fillRect(bx - r * 0.2, by + r * 1.4, r * 0.4, r * 0.28);
  };
  const B = [[0.08, 0.44, 2.6, ['#2c4fa0', '#f4f0e6']], [0.62, 0.5, 2.4, ['#c8323a', '#f2c14a']], [0.44, 0.56, 2, ['#f2c14a', '#2f8a5a']], [0.95, 0.12, 3.6, ['#f2c14a', '#e2477a']],
    [0.28, 0.4, 4.2, ['#c8323a', '#f4f0e6']], [0.36, 0.13, 5.4, ['#2c4fa0', '#f2c14a', '#f4f0e6']], [0.7, 0.18, 6.4, ['#2f8a5a', '#f2c14a']],
    [0.17, 0.2, 7.8, ['#c8323a', '#f2c14a', '#ee7a2a']], [0.86, 0.32, 8.4, ['#6a3a8f', '#e2477a', '#f4f0e6']], [0.52, 0.3, 10.5, ['#ee7a2a', '#c8323a', '#f2c14a']]];
  for (const [x, y, r, cols] of B) balloon(W * x, H * y, r * u, cols);
}

// A ferry crossing the Bosphorus at sunset: Galata Tower on the hill, the bridge to Asia, the Maiden's Tower on
// its rock, gulls overhead.
function turkBosphorus(ctx, W, H) {
  const u = H / 100, hz = H * 0.56;
  const sky = ctx.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#2a3a78'); sky.addColorStop(0.45, '#9a5f96'); sky.addColorStop(0.78, '#ef8a66'); sky.addColorStop(1, '#f8c27a');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, hz + 1);
  ctx.fillStyle = '#ffe2a0'; ctx.beginPath(); ctx.arc(W * 0.6, hz - 1 * u, 7 * u, 0, Math.PI * 2); ctx.fill();
  const water = ctx.createLinearGradient(0, hz, 0, H); water.addColorStop(0, '#6a5a96'); water.addColorStop(0.35, '#3a4682'); water.addColorStop(1, '#202c56');
  ctx.fillStyle = water; ctx.fillRect(0, hz, W, H - hz);
  // the sun on the water
  for (let k = 0; k < 14; k++) { const y = hz + 1.5 * u + k * 2.6 * u, w = (16 - k) * 1.1 * u; ctx.fillStyle = k % 2 ? '#ef8a66' : '#f8c27a'; ctx.fillRect(W * 0.6 - w / 2 + ((k * 37) % 7 - 3) * u, y, w, 0.9 * u); }
  // the Asian shore and the bridge
  ctx.fillStyle = '#5c4878'; ctx.beginPath(); ctx.moveTo(W * 0.42, hz + 0.5 * u); for (let k = 0; k <= 24; k++) { const t = k / 24; ctx.lineTo(W * (0.42 + 0.58 * t), hz - (2 + 4 * Math.sin(t * 3.2) + (k % 3 ? 0 : 0.8)) * u); } ctx.lineTo(W, hz + 0.5 * u); ctx.fill();
  ctx.fillStyle = '#f6c06a'; for (let k = 0; k < 16; k++) ctx.fillRect(W * (0.46 + k * 0.034), hz - (1.6 + (k * 7) % 3) * u, 0.8 * u, 0.8 * u);
  const t1 = W * 0.5, t2 = W * 0.86, deck = hz - 3 * u, tt = deck - 18 * u;
  ctx.strokeStyle = '#3d3160'; ctx.lineWidth = 1.3 * u; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(W * 0.36, deck + 1 * u); ctx.lineTo(t1, tt); ctx.quadraticCurveTo((t1 + t2) / 2, deck + 6 * u, t2, tt); ctx.lineTo(W * 1.02, deck + 2 * u); ctx.stroke();
  ctx.fillStyle = '#3d3160'; ctx.fillRect(W * 0.36, deck, W * 0.66, 1.8 * u);
  for (const t of [t1, t2]) { ctx.fillRect(t - 1.4 * u, tt, 2.8 * u, deck - tt + 3 * u); ctx.fillRect(t - 2 * u, tt + 3 * u, 4 * u, 1 * u); }
  // the Maiden's Tower on its rock
  const mx = W * 0.74, my = hz + 7 * u;
  ctx.fillStyle = '#2e2448'; ctx.beginPath(); ctx.ellipse(mx, my, 8 * u, 1.8 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ecd6b4'; ctx.fillRect(mx - 6 * u, my - 4 * u, 12 * u, 4 * u); ctx.fillRect(mx - 1.6 * u, my - 11 * u, 3.2 * u, 7 * u);
  ctx.beginPath(); ctx.moveTo(mx - 2.2 * u, my - 11 * u); ctx.lineTo(mx, my - 15 * u); ctx.lineTo(mx + 2.2 * u, my - 11 * u); ctx.fill();
  ctx.fillStyle = '#c99a72'; ctx.fillRect(mx - 6 * u, my - 4.6 * u, 12 * u, 0.8 * u);
  // the European side: a hill of houses with Galata Tower
  ctx.fillStyle = '#3a2d55'; ctx.beginPath(); ctx.moveTo(0, hz + 2 * u); ctx.lineTo(0, hz - 20 * u); ctx.quadraticCurveTo(W * 0.18, hz - 24 * u, W * 0.4, hz + 1 * u); ctx.lineTo(W * 0.4, hz + 2 * u); ctx.fill();
  for (let k = 0; k < 22; k++) { const xx = (k / 22) * W * 0.38, top = hz - 20 * u * (1 - Math.pow(xx / (W * 0.4), 2)) - (3 + (k * 5) % 4) * u; ctx.fillStyle = '#3a2d55'; ctx.fillRect(xx, top, W * 0.022, hz - top); ctx.fillStyle = '#f6c06a'; if (k % 3 !== 1) ctx.fillRect(xx + 0.8 * u, top + 1.4 * u, 0.9 * u, 0.9 * u); }
  const gx = W * 0.16, gb = hz - 22 * u;
  ctx.fillStyle = '#2a2240'; ctx.fillRect(gx - 3 * u, gb - 16 * u, 6 * u, 18 * u); ctx.fillRect(gx - 3.8 * u, gb - 17.6 * u, 7.6 * u, 1.8 * u);
  ctx.beginPath(); ctx.moveTo(gx - 3.4 * u, gb - 17.4 * u); ctx.lineTo(gx, gb - 27 * u); ctx.lineTo(gx + 3.4 * u, gb - 17.4 * u); ctx.fill();
  ctx.fillStyle = '#f6c06a'; for (const dy of [-6, -11]) ctx.fillRect(gx - 0.6 * u, gb + dy * u, 1.2 * u, 1.8 * u); ctx.fillRect(gx - 2.6 * u, gb - 16 * u, 5.2 * u, 0.7 * u);
  // the ferry, with its wake
  const fx = W * 0.4, fy = H * 0.82, L = 64 * u;
  ctx.fillStyle = '#e9e2d6'; for (let k = 0; k < 5; k++) ctx.fillRect(fx + L * 0.5 + k * 5 * u, fy + 3.2 * u + k * 0.8 * u, (10 - k) * u, 0.9 * u);
  ctx.fillStyle = '#1b2440'; ctx.beginPath(); ctx.moveTo(fx - L / 2, fy); ctx.lineTo(fx + L / 2, fy); ctx.lineTo(fx + L * 0.44, fy + 4.6 * u); ctx.lineTo(fx - L * 0.44, fy + 4.6 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f3efe6'; ctx.fillRect(fx - L * 0.46, fy - 5.2 * u, L * 0.92, 5.2 * u); ctx.fillRect(fx - L * 0.34, fy - 9.6 * u, L * 0.68, 4.4 * u);
  ctx.fillStyle = '#2a3550'; for (let k = 0; k < 15; k++) ctx.fillRect(fx - L * 0.42 + k * L * 0.058, fy - 3.8 * u, L * 0.034, 2 * u); for (let k = 0; k < 10; k++) ctx.fillRect(fx - L * 0.3 + k * L * 0.062, fy - 8.4 * u, L * 0.034, 1.8 * u);
  ctx.fillStyle = '#c8323a'; ctx.fillRect(fx - L * 0.48, fy - 0.8 * u, L * 0.96, 0.8 * u);
  ctx.fillStyle = '#e8b23a'; ctx.fillRect(fx - 2.4 * u, fy - 16 * u, 4.8 * u, 6.6 * u); ctx.fillStyle = '#1b1b22'; ctx.fillRect(fx - 2.4 * u, fy - 17.4 * u, 4.8 * u, 2 * u);
  ctx.strokeStyle = '#2a3550'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); ctx.moveTo(fx - L * 0.4, fy - 9.6 * u); ctx.lineTo(fx - L * 0.4, fy - 15 * u); ctx.moveTo(fx + L * 0.4, fy - 9.6 * u); ctx.lineTo(fx + L * 0.4, fy - 15 * u); ctx.stroke();
  // gulls
  const gull = (x, y, s) => { ctx.strokeStyle = '#f7f3ea'; ctx.lineWidth = Math.max(1.2, 0.9 * s * u); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 3 * s * u, y); ctx.quadraticCurveTo(x - 1.5 * s * u, y - 1.8 * s * u, x, y); ctx.quadraticCurveTo(x + 1.5 * s * u, y - 1.8 * s * u, x + 3 * s * u, y); ctx.stroke(); };
  for (const [x, y, s] of [[0.3, 0.16, 1.6], [0.38, 0.26, 1.1], [0.66, 0.14, 1.3], [0.8, 0.3, 0.9], [0.9, 0.18, 1.2], [0.2, 0.62, 1.8], [0.58, 0.66, 1.4]]) gull(W * x, H * y, s);
}

// The white travertine terraces of Pamukkale: rows of rounded basins, each holding a turquoise pool, white drips
// hanging from their lips, the plain far below.
function turkPamukkale(ctx, W, H) {
  const u = H / 100, R = rng(23);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.34); sky.addColorStop(0, '#3f8fd0'); sky.addColorStop(1, '#c4e6f4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.2, 0.1, 5], [0.27, 0.08, 6.5], [0.74, 0.12, 5.5], [0.82, 0.1, 6.5]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.8, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#8aa2b8'; ctx.beginPath(); ctx.moveTo(0, H * 0.3); for (let k = 0; k <= 20; k++) { const t = k / 20; ctx.lineTo(W * t, H * (0.23 + 0.03 * Math.sin(t * 7 + 1))); } ctx.lineTo(W, H * 0.32); ctx.lineTo(0, H * 0.32); ctx.fill();
  ctx.fillStyle = '#7fa05a'; ctx.fillRect(0, H * 0.27, W, H * 0.08);
  ctx.fillStyle = '#4f7a3f'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(((i * 37) % 100) / 100 * W, H * (0.29 + ((i * 13) % 5) * 0.01), (1.6 + (i * 7) % 3) * u, 0, Math.PI * 2); ctx.fill(); }
  const tiers = 4;
  for (let k = 0; k < tiers; k++) {
    const baseY = H * (0.4 + k * 0.15), depth = (3.5 + k * 1.6) * u;
    ctx.fillStyle = '#eef3f2'; ctx.fillRect(0, baseY - depth - 1.4 * u, W, H);
    let x0 = -R() * 18 * u;
    while (x0 < W) {
      const bw = (15 + k * 9) * u * (0.7 + R() * 0.7), x1 = x0 + bw, rimY = baseY + (R() - 0.5) * 2.4 * u, top = rimY - depth, dip = (2.4 + k * 1.2) * u * (0.8 + R() * 0.5);
      ctx.fillStyle = '#c6d4d9'; for (let d = x0 + 2 * u; d < x1 - 2 * u; d += 2.8 * u) ctx.fillRect(d, rimY + dip * 1.2, 1.3 * u, (3 + R() * 6) * u * (0.5 + Math.sin((Math.PI * (d - x0)) / bw)));
      const pool = ctx.createLinearGradient(0, top, 0, rimY + dip); pool.addColorStop(0, k < 2 ? '#8fe0e6' : '#7fdbe2'); pool.addColorStop(1, k < 2 ? '#4fbcd2' : '#2fa4c2');
      const lip = (dy) => { ctx.beginPath(); ctx.moveTo(x1, rimY + dy); ctx.bezierCurveTo(x1 - bw * 0.1, rimY + 1.9 * dip + dy, x0 + bw * 0.1, rimY + 1.9 * dip + dy, x0, rimY + dy); };
      ctx.fillStyle = pool; ctx.beginPath(); ctx.moveTo(x0, top); ctx.lineTo(x1, top); ctx.lineTo(x1, rimY); ctx.bezierCurveTo(x1 - bw * 0.1, rimY + 1.9 * dip, x0 + bw * 0.1, rimY + 1.9 * dip, x0, rimY); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#c4f0f2'; ctx.fillRect(x0 + bw * 0.2, top + 1.2 * u, bw * 0.4, 0.7 * u);
      ctx.strokeStyle = '#c3d2d6'; ctx.lineWidth = 1 * u; lip(1.6 * u); ctx.stroke();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.9 * u; lip(0); ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x1 - 0.8 * u, top - 1 * u, 1.6 * u, rimY - top + 1 * u);
      x0 = x1;
    }
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, baseY - depth - 1.4 * u, W, 1.3 * u);
  }
}

// The nazar: a big blue bead to keep the evil eye away, ringed by a bracelet of small ones.
function turkNazar(ctx, W, H) {
  const u = H / 100, cx = W / 2, cy = H / 2;
  ctx.fillStyle = '#f3ead6'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#9fd3da'; for (let j = 0; j < 9; j++) for (let i = 0; i < 15; i++) { const x = (i + (j % 2 ? 0.5 : 0) + 0.25) * W / 14.5, y = (j + 0.5) * H / 9; if (((x - cx) / (W * 0.42)) ** 2 + ((y - cy) / (H * 0.44)) ** 2 > 1) { ctx.beginPath(); ctx.arc(x, y, 1.1 * u, 0, Math.PI * 2); ctx.fill(); } }
  const bead = (x, y, R) => {
    ctx.fillStyle = '#1f3f9f'; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f7f4ee'; ctx.beginPath(); ctx.arc(x, y, R * 0.62, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6fbde9'; ctx.beginPath(); ctx.arc(x, y, R * 0.45, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#12161f'; ctx.beginPath(); ctx.arc(x, y, R * 0.24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8aa6e6'; ctx.beginPath(); ctx.ellipse(x - R * 0.62, y - R * 0.55, R * 0.16, R * 0.09, -0.75, 0, Math.PI * 2); ctx.fill();
  };
  const rx = 60 * u, ry = 37 * u;
  ctx.strokeStyle = '#6a4428'; ctx.lineWidth = 0.9 * u; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
  const n = 14;
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2, a2 = ((k + 0.5) / n) * Math.PI * 2;
    ctx.fillStyle = '#d9a64a'; ctx.beginPath(); ctx.arc(cx + Math.cos(a2) * rx, cy + Math.sin(a2) * ry, 1.7 * u, 0, Math.PI * 2); ctx.fill();
    bead(cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, 6.2 * u);
  }
  bead(cx, cy, 25 * u);
  for (const [x, y] of [[0.07, 0.12], [0.93, 0.12], [0.07, 0.88], [0.93, 0.88]]) bead(W * x, H * y, 4.6 * u);
}


// ---------- East Asia pack ----------
// Korea, Japan and China: their own textiles and patterns knotted on a fine grid (bojagi, saekdong, celadon,
// dancheong; seigaiha, boro, a gold-leaf screen, a koi pond; blue-and-white porcelain, auspicious clouds, pandas,
// a dragon), and hooked pictures of each country.

const KOREA_FRAME = { dark: '#1f2433', a: '#c8323a', b: '#2f6fb0', line: '#efe6d2' };
const JAPAN_FRAME = { dark: '#1b1f33', a: '#c43a3a', b: '#d8a640', line: '#efe6d0' };
const CHINA_FRAME = { dark: '#2a1416', a: '#c8302a', b: '#e8b23a', line: '#efe3c6' };

// Pieced cloth: the area split again and again into rectangles of random proportions, each piece filled by
// `piece(a, b, w, h)`, with a one-knot seam between neighbours.
function piecework(x, a0, b0, w0, h0, seed, depth, piece, seam) {
  const R = rng(seed);
  const split = (a, b, w, h, d) => {
    if (d <= 0 || (w < 10 && h < 8) || (d < 3 && R() < 0.3)) {
      x.fillStyle = seam; x.fillRect(a, b, w, h);
      piece(a + 1, b + 1, w - 1, h - 1, R);
      return;
    }
    const vert = w / h > 1.3 ? true : w / h < 0.77 ? false : R() < 0.5, t = 0.3 + R() * 0.4;
    if (vert) { const s = Math.round(w * t); split(a, b, s, h, d - 1); split(a + s, b, w - s, h, d - 1); }
    else { const s = Math.round(h * t); split(a, b, w, s, d - 1); split(a, b + s, w, h - s, d - 1); }
  };
  split(a0, b0, w0, h0, depth);
  x.fillStyle = seam; x.fillRect(a0, b0 + h0, w0 + 1, 1); x.fillRect(a0 + w0, b0, 1, h0 + 1);
}

// Bojagi: a Korean wrapping cloth pieced from leftover silk, every patch its own colour, light seams between them.
function korBojagi(ctx, W, H) {
  const C = { seam: '#f3ecdc', edge: '#2a2f45', jade: '#6aa58e', pink: '#e48aa0', indigo: '#3a4f8a', yellow: '#e9c46a', ivory: '#e3d7bd', red: '#c8463c',
    violet: '#8a6aa8', sky: '#9cc6dc', green: '#5a8a4a', peach: '#f0a878' };
  const fills = [C.jade, C.pink, C.indigo, C.yellow, C.ivory, C.red, C.violet, C.sky, C.green, C.peach];
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.edge; x.fillRect(0, 0, cols, rows);
    let last = -1;
    piecework(x, 3, 3, cols - 7, rows - 7, 41, 9, (a, b, w, h, R) => {
      let k; do { k = Math.floor(R() * fills.length); } while (k === last); last = k;
      x.fillStyle = fills[k]; x.fillRect(a, b, w, h);
      if (w > 9 && h > 7 && R() < 0.35) {                 // a triangle pieced into a corner, seam along the diagonal
        let k2; do { k2 = Math.floor(R() * fills.length); } while (k2 === k);
        const s = Math.min(w, h) * (0.5 + R() * 0.3), c = Math.floor(R() * 4), X = c % 2 ? a + w : a, Y = c > 1 ? b + h : b, dx = c % 2 ? -s : s, dy = c > 1 ? -s : s;
        x.fillStyle = fills[k2]; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + dx, Y); x.lineTo(X, Y + dy); x.closePath(); x.fill();
        x.strokeStyle = C.seam; x.lineWidth = 1; x.beginPath(); x.moveTo(X + dx, Y); x.lineTo(X, Y + dy); x.stroke();
      }
    }, C.seam);
  });
}

// Saekdong: the rainbow stripes of a Korean child's hanbok sleeve either side, a red silk panel with gold-leaf
// flowers in the middle.
function korSaekdong(ctx, W, H) {
  const C = { red: '#d0393b', yellow: '#f2c53d', green: '#3a9a5a', pink: '#e9779a', blue: '#3a6fc0', white: '#f3eee2', purple: '#7a4fa0',
    field: '#9e1f2c', gold: '#e3b448', navy: '#1f2a4a' };
  weavePicture(ctx, W, H, 100, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.navy; x.fillRect(0, 0, cols, rows);
    const seq = [C.red, C.yellow, C.green, C.pink, C.blue, C.white, C.purple], sw = 4;
    const panel = Math.round(cols * 0.34), px0 = Math.round((cols - panel) / 2);
    for (let i = 2; i < px0; i++) { const c = seq[Math.floor((i - 2) / sw) % seq.length]; x.fillStyle = c; x.fillRect(i, 2, 1, rows - 4); x.fillRect(cols - 1 - i, 2, 1, rows - 4); }
    x.fillStyle = C.gold; x.fillRect(px0 - 1, 2, panel + 2, rows - 4);
    x.fillStyle = C.field; x.fillRect(px0 + 1, 2, panel - 2, rows - 4);
    const cx = px0 + panel / 2;
    // gold leaf: three big flower roundels, little four-petal flowers between, a gold border line inside
    x.strokeStyle = C.gold; x.lineWidth = 1; x.strokeRect(px0 + 3.5, 5.5, panel - 7, rows - 11);
    for (let k = 0; k < 3; k++) {
      const cy = 2 + (k + 0.5) * (rows - 4) / 3, r = panel * 0.3;
      x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(cx, cy, r - 2, 0, Math.PI * 2); x.stroke();
      for (let p = 0; p < 5; p++) { const a = -Math.PI / 2 + (p * Math.PI * 2) / 5; x.fillStyle = C.gold; x.beginPath(); x.ellipse(cx + Math.cos(a) * r * 0.42, cy + Math.sin(a) * r * 0.42, r * 0.3, r * 0.2, a, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.field; x.beginPath(); x.arc(cx, cy, r * 0.22, 0, Math.PI * 2); x.fill(); x.fillStyle = C.gold; x.beginPath(); x.arc(cx, cy, r * 0.12, 0, Math.PI * 2); x.fill();
    }
    for (let j = 0; j < 7; j++) for (const s of [-1, 1]) {
      const fx = cx + s * panel * 0.34, fy = 2 + (j + 0.5) * (rows - 4) / 7;
      x.fillStyle = C.gold; for (const [dx, dy] of [[0, -1.3], [0, 1.3], [-1.3, 0], [1.3, 0]]) { x.beginPath(); x.arc(fx + dx, fy + dy, 1, 0, Math.PI * 2); x.fill(); }
    }
  });
}

// A flying crane, white with black wing tips, neck and trailing legs, the way they are inlaid in Goryeo celadon.
// Drawn flying to the right (+x) and rotated by `ang`: a long neck ahead, both wings swept back, legs trailing.
function inlaidCrane(x, cx, cy, s, ang, C) {
  x.save(); x.translate(cx, cy); x.rotate(ang);
  const L = Math.max(1, s * 0.03);
  x.strokeStyle = C.black; x.lineWidth = L; x.lineCap = 'round';
  x.beginPath(); x.moveTo(-s * 0.14, 0); x.lineTo(-s * 0.62, s * 0.02); x.stroke();                     // legs trailing behind
  const wing = (d) => {
    x.fillStyle = C.white; x.beginPath(); x.moveTo(s * 0.04, 0); x.quadraticCurveTo(-s * 0.06, d * s * 0.2, -s * 0.36, d * s * 0.44); x.lineTo(-s * 0.3, d * s * 0.24); x.quadraticCurveTo(-s * 0.2, d * s * 0.08, -s * 0.14, 0); x.closePath(); x.fill();
    x.fillStyle = C.black; x.beginPath(); x.moveTo(-s * 0.24, d * s * 0.31); x.lineTo(-s * 0.36, d * s * 0.44); x.lineTo(-s * 0.31, d * s * 0.25); x.closePath(); x.fill();
  };
  wing(-1); wing(1);
  x.fillStyle = C.white; x.beginPath(); x.ellipse(-s * 0.04, 0, s * 0.15, s * 0.06, 0, 0, Math.PI * 2); x.fill();
  x.strokeStyle = C.black; x.lineWidth = Math.max(1, s * 0.035); x.beginPath(); x.moveTo(s * 0.1, 0); x.lineTo(s * 0.4, 0); x.stroke();          // long black neck
  x.fillStyle = C.white; x.beginPath(); x.arc(s * 0.42, 0, s * 0.04, 0, Math.PI * 2); x.fill();
  x.strokeStyle = C.black; x.lineWidth = L; x.beginPath(); x.moveTo(s * 0.45, 0); x.lineTo(s * 0.54, 0); x.stroke();
  x.restore();
}
// A little cloud of the inlaid kind: a curl with a tail.
function inlaidCloud(x, cx, cy, s, flip, C) {
  x.strokeStyle = C.white; x.lineWidth = Math.max(0.9, s * 0.18); x.lineCap = 'round';
  x.beginPath(); x.arc(cx, cy, s * 0.5, Math.PI * 0.2, Math.PI * 1.75); x.stroke();
  x.beginPath(); x.moveTo(cx + s * 0.4, cy + s * 0.3); x.quadraticCurveTo(cx + flip * s * 1.2, cy + s * 0.6, cx + flip * s * 1.8, cy + s * 0.2); x.stroke();
  x.fillStyle = C.black; x.fillRect(cx - 0.5, cy - 0.5, 1, 1);
}

// Goryeo celadon: jade-green glaze with white-and-black inlaid cranes, inside roundels flying up and outside them
// flying down, among little clouds; a band of cloud-collar heads round the edge.
function korCeladon(ctx, W, H) {
  const C = { field: '#9cc0aa', field2: '#94b9a2', deep: '#6f9a84', white: '#f1f0e6', black: '#2c3330', band: '#7fa892' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, { guard: C.deep, guard2: C.white, band: C.band, field: C.field }, 16, 14, (x, w, d) => {
      // a cloud-collar head (ruyi): a heart-like outline pointing into the rug
      const m = w / 2;
      x.strokeStyle = C.white; x.lineWidth = 1.3;
      x.beginPath(); x.moveTo(m, d * 0.82); x.bezierCurveTo(m - w * 0.6, d * 0.5, m - w * 0.35, d * 0.05, m, d * 0.32); x.bezierCurveTo(m + w * 0.35, d * 0.05, m + w * 0.6, d * 0.5, m, d * 0.82); x.stroke();
      x.fillStyle = C.black; x.fillRect(m - 0.5, d * 0.5, 1, 1);
    }, (x, d) => { x.strokeStyle = C.white; x.lineWidth = 1.3; x.beginPath(); x.arc(d / 2, d / 2, d * 0.28, 0, Math.PI * 2); x.stroke(); x.fillStyle = C.black; x.fillRect(d / 2 - 0.5, d / 2 - 0.5, 1, 1); });
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 9) % 3 === 1) { x.fillStyle = C.field2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const r = fh * 0.34, cy = fy + fh / 2, rings = [0.18, 0.82];
    const clear = (px, py, m) => rings.every((p) => Math.hypot(px - (fx + fw * p), py - cy) > r + m);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) { const px = fx + (i + (j % 2 ? 0.5 : 0)) * fw / 8.5, py = fy + (j + 0.5) * fh / 4; if (clear(px, py, 4) && Math.abs(px - (fx + fw / 2)) > 9) inlaidCloud(x, px, py, 2.8, (i + j) % 2 ? 1 : -1, C); }
    // in the roundels cranes fly up, outside them down, as on the famous maebyeong vase
    for (const p of rings) {
      const cx = fx + fw * p;
      x.strokeStyle = C.white; x.lineWidth = 1.8; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke();
      x.strokeStyle = C.black; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, r - 2.4, 0, Math.PI * 2); x.stroke();
      inlaidCrane(x, cx + 2, cy + 3, r * 1.45, -Math.PI / 2 - 0.45, C);
      inlaidCloud(x, cx - r * 0.5, cy + r * 0.35, 2.6, 1, C); inlaidCloud(x, cx + r * 0.45, cy - r * 0.45, 2.6, -1, C);
    }
    inlaidCrane(x, fx + fw * 0.5, fy + fh * 0.42, fh * 0.5, Math.PI / 2 + 0.3, C);
    inlaidCloud(x, fx + fw * 0.44, fy + fh * 0.78, 2.8, 1, C); inlaidCloud(x, fx + fw * 0.57, fy + fh * 0.84, 2.8, -1, C);
    x.restore();
  });
}

// Dancheong: the painted patterns under the eaves of Korean palaces. Layered flower medallions in red, yellow,
// white and blues on a deep green ground, little four-petal knots between them, a border graded in steps of colour.
function korDancheong(ctx, W, H) {
  const C = { green: '#2f6b5a', dkgreen: '#1d4a40', red: '#b8322c', orange: '#e07a3a', yellow: '#f0c64a', white: '#f2efe4', lblue: '#8cc4cf', blue: '#2f6f9a', navy: '#1f3352', pink: '#e6a0a8' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    // graded border: red, white, light blue, blue, navy, then the field
    const steps = [[0, 4, C.red], [4, 6, C.white], [6, 8, C.lblue], [8, 10, C.blue], [10, 12, C.navy], [12, 13, C.white]];
    for (const [a, b, col] of steps) { x.fillStyle = col; x.fillRect(a, a, cols - 2 * a, rows - 2 * a); }
    const fx = 13, fy = 13, fw = cols - 26, fh = rows - 26;
    x.fillStyle = C.green; x.fillRect(fx, fy, fw, fh);
    for (let i = 0; i < 2 * Math.round(fw / 8); i++) { const a = fx + i * 4; x.fillStyle = i % 2 ? C.red : C.yellow; x.fillRect(a, 1.5, 2, 1); x.fillRect(a, rows - 2.5, 2, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const nr = 2, nc = 4, cw = fw / nc, ch = fh / nr;
    const medallion = (cx, cy, r) => {
      const ring = (rr, n, cols, rot) => { cols.forEach((col, k) => { const s = 1 - k * 0.22; for (let p = 0; p < n; p++) { const a = rot + (p * Math.PI * 2) / n; x.fillStyle = col; x.beginPath(); x.ellipse(cx + Math.cos(a) * rr * 0.62, cy + Math.sin(a) * rr * 0.62, rr * 0.42 * s, rr * 0.24 * s, a, 0, Math.PI * 2); x.fill(); } }); };
      ring(r, 12, [C.white, C.lblue, C.blue, C.navy], 0);
      x.fillStyle = C.dkgreen; x.beginPath(); x.arc(cx, cy, r * 0.5, 0, Math.PI * 2); x.fill();
      ring(r * 0.55, 8, [C.white, C.pink, C.red], Math.PI / 8);
      x.fillStyle = C.yellow; x.beginPath(); x.arc(cx, cy, r * 0.2, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.orange; x.beginPath(); x.arc(cx, cy, r * 0.11, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.fillRect(cx - 0.6, cy - 0.6, 1.2, 1.2);
    };
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) medallion(fx + (i + 0.5) * cw, fy + (j + 0.5) * ch, Math.min(cw, ch) * 0.46);
    for (let j = 0; j <= nr; j++) for (let i = 0; i <= nc; i++) {
      const cx = fx + i * cw, cy = fy + j * ch, s = Math.min(cw, ch) * 0.16;
      for (let p = 0; p < 4; p++) { const a = (p * Math.PI) / 2 + Math.PI / 4; x.fillStyle = p % 2 ? C.red : C.yellow; x.beginPath(); x.ellipse(cx + Math.cos(a) * s * 0.6, cy + Math.sin(a) * s * 0.6, s * 0.55, s * 0.3, a, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.white; x.beginPath(); x.arc(cx, cy, s * 0.28, 0, Math.PI * 2); x.fill();
    }
    x.restore();
  });
}

// Kkachi horangi: the magpie-and-tiger folk painting. A grinning tiger with goggle eyes under a pine, the magpie
// on a branch above telling him the news.
function korTiger(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#efe2c4'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e6d6b2'; for (const [x, y, r] of [[0.2, 0.2, 14], [0.55, 0.12, 10], [0.12, 0.7, 12], [0.6, 0.85, 16], [0.9, 0.6, 10]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.6, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  // pine tree on the right
  ctx.strokeStyle = '#6a4a32'; ctx.lineCap = 'round';
  ctx.lineWidth = 7 * u; ctx.beginPath(); ctx.moveTo(W * 0.93, H * 1.02); ctx.bezierCurveTo(W * 0.86, H * 0.7, W * 0.97, H * 0.45, W * 0.86, H * 0.12); ctx.stroke();
  ctx.lineWidth = 3.4 * u; ctx.beginPath(); ctx.moveTo(W * 0.9, H * 0.42); ctx.quadraticCurveTo(W * 0.78, H * 0.36, W * 0.62, H * 0.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W * 0.88, H * 0.2); ctx.quadraticCurveTo(W * 0.8, H * 0.14, W * 0.7, H * 0.16); ctx.stroke();
  ctx.fillStyle = '#5a3c28'; for (let k = 0; k < 6; k++) ctx.fillRect(W * 0.9 + ((k * 3) % 4 - 2) * u, H * (0.5 + k * 0.08), 2.4 * u, 0.8 * u);
  const needles = (x, y, w, h) => { ctx.fillStyle = '#2f5a3a'; ctx.beginPath(); ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#4f7f4a'; ctx.beginPath(); ctx.ellipse(x - w * 0.1, y - h * 0.35, w * 0.8, h * 0.45, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#2f5a3a'; ctx.lineWidth = 0.6 * u; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(x + k * w * 0.25, y - h * 0.7); ctx.lineTo(x + k * w * 0.27, y - h * 0.1); ctx.stroke(); } };
  needles(W * 0.66, H * 0.36, 11 * u, 5 * u); needles(W * 0.78, H * 0.3, 9 * u, 4.4 * u); needles(W * 0.72, H * 0.13, 10 * u, 4.6 * u); needles(W * 0.88, H * 0.08, 9 * u, 4.2 * u); needles(W * 0.95, H * 0.3, 7 * u, 3.6 * u);
  // the magpie on the branch, tail down to the left
  const mx = W * 0.7, my = H * 0.3;
  ctx.fillStyle = '#20263a'; ctx.beginPath(); ctx.moveTo(mx - 2 * u, my + 1 * u); ctx.lineTo(mx - 15 * u, my + 9 * u); ctx.lineTo(mx - 13 * u, my + 11 * u); ctx.lineTo(mx + 1 * u, my + 3 * u); ctx.fill();
  ctx.fillStyle = '#1b1d24'; ctx.beginPath(); ctx.ellipse(mx + 2 * u, my - 1 * u, 6 * u, 3.6 * u, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f6f2e6'; ctx.beginPath(); ctx.ellipse(mx + 3 * u, my + 0.6 * u, 3.6 * u, 2 * u, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2f4a7a'; ctx.beginPath(); ctx.ellipse(mx, my - 1.6 * u, 3.4 * u, 1.8 * u, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1b1d24'; ctx.beginPath(); ctx.arc(mx + 7 * u, my - 3.6 * u, 2.6 * u, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(mx + 9 * u, my - 4 * u); ctx.lineTo(mx + 12 * u, my - 3.4 * u); ctx.lineTo(mx + 9 * u, my - 2.8 * u); ctx.fill();
  ctx.fillStyle = '#f6f2e6'; ctx.beginPath(); ctx.arc(mx + 7.6 * u, my - 4.2 * u, 0.7 * u, 0, Math.PI * 2); ctx.fill();
  // the tiger
  const tx = W * 0.34, O = '#e9a03a', Bk = '#22201e', Wt = '#f6efe0';
  ctx.strokeStyle = O; ctx.lineWidth = 6 * u; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(tx + 26 * u, H * 0.74); ctx.bezierCurveTo(tx + 44 * u, H * 0.7, tx + 40 * u, H * 0.4, tx + 30 * u, H * 0.32); ctx.stroke();
  ctx.strokeStyle = Bk; ctx.lineWidth = 6.2 * u; ctx.lineCap = 'butt';
  for (const t of [0.25, 0.45, 0.65]) { const bx = (1 - t) ** 3 * (tx + 26 * u) + 3 * (1 - t) ** 2 * t * (tx + 44 * u) + 3 * (1 - t) * t * t * (tx + 40 * u) + t ** 3 * (tx + 30 * u); const by = (1 - t) ** 3 * H * 0.74 + 3 * (1 - t) ** 2 * t * H * 0.7 + 3 * (1 - t) * t * t * H * 0.4 + t ** 3 * H * 0.32; ctx.beginPath(); ctx.moveTo(bx - 1 * u, by - 0.6 * u); ctx.lineTo(bx + 1 * u, by + 0.6 * u); ctx.stroke(); }
  ctx.fillStyle = Bk; ctx.beginPath(); ctx.arc(tx + 30 * u, H * 0.31, 2.2 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = O; ctx.beginPath(); ctx.ellipse(tx + 10 * u, H * 0.72, 26 * u, 19 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = Bk; ctx.lineWidth = 2.2 * u; ctx.lineCap = 'round';
  for (let k = 0; k < 6; k++) { const sx = tx + (-6 + k * 6.5) * u; ctx.beginPath(); ctx.moveTo(sx, H * 0.56); ctx.quadraticCurveTo(sx + 3 * u, H * 0.62, sx - 1 * u, H * 0.68); ctx.stroke(); }
  for (const lx of [-12, -2]) { ctx.fillStyle = O; roundRect(ctx, tx + lx * u, H * 0.62, 8 * u, 32 * u, 4 * u); ctx.fill(); ctx.strokeStyle = Bk; ctx.lineWidth = 1.8 * u; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(tx + lx * u, H * (0.72 + k * 0.06)); ctx.lineTo(tx + (lx + 4) * u, H * (0.73 + k * 0.06)); ctx.stroke(); } ctx.fillStyle = Wt; ctx.beginPath(); ctx.ellipse(tx + (lx + 4) * u, H * 0.94, 5.4 * u, 2.6 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const hx = tx - 6 * u, hy = H * 0.4;
  for (const d of [-1, 1]) { ctx.fillStyle = O; ctx.beginPath(); ctx.arc(hx + d * 14 * u, hy - 13 * u, 6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = Bk; ctx.beginPath(); ctx.arc(hx + d * 14 * u, hy - 13 * u, 3.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = Wt; ctx.beginPath(); ctx.arc(hx + d * 14 * u, hy - 12 * u, 1.8 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = O; ctx.beginPath(); ctx.ellipse(hx, hy, 20 * u, 17 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = Wt; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(hx + d * 11 * u, hy + 8 * u, 9 * u, 7 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = Bk; ctx.lineWidth = 1.8 * u;
  for (const [a, b, c2] of [[-4, -15, -2], [0, -16, -3], [4, -15, -2]]) { ctx.beginPath(); ctx.moveTo(hx + a * u, hy + b * u); ctx.lineTo(hx + a * 1.1 * u, hy + (b + 5) * u); ctx.stroke(); }
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + d * 20 * u, hy - 4 * u); ctx.lineTo(hx + d * 14 * u, hy - 2 * u); ctx.moveTo(hx + d * 19 * u, hy + 1 * u); ctx.lineTo(hx + d * 14 * u, hy + 1.4 * u); ctx.stroke(); }
  // goggle eyes, both looking up at the magpie
  for (const d of [-1, 1]) { ctx.fillStyle = Wt; ctx.beginPath(); ctx.arc(hx + d * 7 * u, hy - 5 * u, 5.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = Bk; ctx.lineWidth = 1.2 * u; ctx.stroke(); ctx.fillStyle = Bk; ctx.beginPath(); ctx.arc(hx + d * 7 * u + 2.4 * u, hy - 7.4 * u, 2.6 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#c8605a'; ctx.beginPath(); ctx.moveTo(hx - 3 * u, hy + 2 * u); ctx.lineTo(hx + 3 * u, hy + 2 * u); ctx.lineTo(hx, hy + 5 * u); ctx.fill();
  // the grin
  ctx.fillStyle = '#8a2a2a'; ctx.beginPath(); ctx.moveTo(hx - 10 * u, hy + 8 * u); ctx.quadraticCurveTo(hx, hy + 18 * u, hx + 10 * u, hy + 8 * u); ctx.quadraticCurveTo(hx, hy + 11 * u, hx - 10 * u, hy + 8 * u); ctx.fill();
  ctx.fillStyle = Wt; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + d * 7 * u, hy + 9 * u); ctx.lineTo(hx + d * 4.6 * u, hy + 9.4 * u); ctx.lineTo(hx + d * 5.6 * u, hy + 13 * u); ctx.fill(); }
  ctx.strokeStyle = Bk; ctx.lineWidth = 0.6 * u; for (const d of [-1, 1]) for (const k of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(hx + d * 9 * u, hy + 6 * u + k * u); ctx.lineTo(hx + d * 22 * u, hy + 4 * u + k * 2.6 * u); ctx.stroke(); }
}

// A hanok: the great curved tile roof with its lifted corners, a painted beam under the eaves, wooden posts and
// paper lattice doors on a stone base; mountains behind and a persimmon tree hung with fruit in front.
function korHanok(ctx, W, H) {
  const u = H / 100, cx = W * 0.54;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55); sky.addColorStop(0, '#6f9ccc'); sky.addColorStop(0.75, '#f0c79c'); sky.addColorStop(1, '#f6d8b0');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#9a98b0'; ctx.beginPath(); ctx.moveTo(0, H * 0.5); for (let k = 0; k <= 30; k++) { const t = k / 30; ctx.lineTo(W * t, H * (0.26 + 0.07 * Math.sin(t * 5 + 0.5) + 0.04 * Math.sin(t * 13))); } ctx.lineTo(W, H * 0.5); ctx.fill();
  ctx.fillStyle = '#7c7f99'; ctx.beginPath(); ctx.moveTo(0, H * 0.52); for (let k = 0; k <= 30; k++) { const t = k / 30; ctx.lineTo(W * t, H * (0.37 + 0.04 * Math.sin(t * 8 + 2))); } ctx.lineTo(W, H * 0.52); ctx.fill();
  // stone base and steps
  const base = H * 0.86, floor = H * 0.8;
  ctx.fillStyle = '#b8ad9a'; ctx.fillRect(cx - W * 0.36, floor, W * 0.72, base - floor);
  ctx.fillStyle = '#9d927e'; for (let k = 0; k < 14; k++) ctx.fillRect(cx - W * 0.36 + k * W * 0.052, floor + 1.4 * u, 0.6 * u, base - floor - 1.4 * u);
  ctx.fillStyle = '#c9bfab'; ctx.fillRect(cx - 7 * u, base, 14 * u, 2.6 * u); ctx.fillRect(cx - 9 * u, base + 2.6 * u, 18 * u, 2.6 * u);
  ctx.fillStyle = '#a99f8b'; ctx.fillRect(0, base + 5 * u, W, H);
  // the walls: posts, doors with paper lattice
  const wallTop = H * 0.52, wl = cx - W * 0.31, wr = cx + W * 0.31, bays = 5, bw = (wr - wl) / bays;
  ctx.fillStyle = '#f2ead8'; ctx.fillRect(wl, wallTop, wr - wl, floor - wallTop);
  for (let k = 0; k < bays; k++) {
    const x0 = wl + k * bw + 1.6 * u, ww = bw - 3.2 * u, y0 = wallTop + 4 * u, hh = floor - y0 - 1 * u;
    ctx.fillStyle = '#f7ecca'; ctx.fillRect(x0, y0, ww, hh);
    ctx.fillStyle = '#8a5c3c'; for (let g = 0; g <= 4; g++) ctx.fillRect(x0 + (g * ww) / 4 - 0.3 * u, y0, 0.6 * u, hh); for (let g = 0; g <= 6; g++) ctx.fillRect(x0, y0 + (g * hh) / 6 - 0.3 * u, ww, 0.6 * u);
    if (k === 2) { ctx.fillStyle = '#8a5c3c'; ctx.fillRect(x0 + ww / 2 - 0.5 * u, y0, 1 * u, hh); }
  }
  ctx.fillStyle = '#7a4a30'; for (let k = 0; k <= bays; k++) ctx.fillRect(wl + k * bw - 1.4 * u, wallTop, 2.8 * u, floor - wallTop);
  // the painted beam under the eaves (dancheong): green with a band of colour
  ctx.fillStyle = '#2f6b5a'; ctx.fillRect(wl - 2 * u, wallTop - 2 * u, wr - wl + 4 * u, 6 * u);
  for (let k = 0; k < 16; k++) { const x0 = wl + k * (wr - wl) / 16 + 1 * u; ctx.fillStyle = ['#c8322a', '#f0c64a', '#f2efe4', '#3a7ab0'][k % 4]; ctx.fillRect(x0, wallTop - 0.6 * u, 2.4 * u, 2.6 * u); }
  // rafter ends: a row of small round ends painted with rings
  for (let k = 0; k < 26; k++) { const x0 = cx - W * 0.4 + k * W * 0.0315; ctx.fillStyle = '#2f6b5a'; ctx.beginPath(); ctx.arc(x0, wallTop - 3.6 * u, 1.3 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f0c64a'; ctx.beginPath(); ctx.arc(x0, wallTop - 3.6 * u, 0.6 * u, 0, Math.PI * 2); ctx.fill(); }
  // the roof: a gentle sag along the eave, corners swept up
  const eaveY = wallTop - 5 * u, ridgeY = H * 0.2, halfE = W * 0.46, halfR = W * 0.2;
  const tipY = eaveY - 13 * u, hip = (s) => [cx + s * (halfR + (halfE - halfR) * 0.35), eaveY - 5 * u];
  const roof = () => { ctx.beginPath(); ctx.moveTo(cx - halfE, tipY); ctx.quadraticCurveTo(cx - halfE * 0.86, eaveY + 1 * u, cx - halfE * 0.5, eaveY + 1.4 * u); ctx.quadraticCurveTo(cx, eaveY + 2.8 * u, cx + halfE * 0.5, eaveY + 1.4 * u); ctx.quadraticCurveTo(cx + halfE * 0.86, eaveY + 1 * u, cx + halfE, tipY); ctx.quadraticCurveTo(...hip(1), cx + halfR, ridgeY + 3 * u); ctx.lineTo(cx - halfR, ridgeY + 3 * u); ctx.quadraticCurveTo(...hip(-1), cx - halfE, tipY); ctx.closePath(); };
  ctx.fillStyle = '#4a5160'; roof(); ctx.fill();
  ctx.save(); roof(); ctx.clip();
  ctx.fillStyle = '#353b48'; for (let k = -40; k <= 40; k++) ctx.fillRect(cx + k * 1.9 * u - 0.45 * u, ridgeY, 0.9 * u, eaveY - ridgeY + 6 * u);
  ctx.fillStyle = '#5c6474'; ctx.fillRect(cx - W, eaveY - 1.6 * u, 2 * W, 2.2 * u);
  ctx.restore();
  // the ridge, with its ends turned up
  ctx.fillStyle = '#2c313c'; ctx.beginPath(); ctx.moveTo(cx - halfR - 3 * u, ridgeY - 3 * u); ctx.quadraticCurveTo(cx, ridgeY + 1 * u, cx + halfR + 3 * u, ridgeY - 3 * u); ctx.lineTo(cx + halfR + 2 * u, ridgeY + 4 * u); ctx.quadraticCurveTo(cx, ridgeY + 6 * u, cx - halfR - 2 * u, ridgeY + 4 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e8e2d6'; ctx.beginPath(); ctx.moveTo(cx - halfR, ridgeY + 2.6 * u); ctx.quadraticCurveTo(cx, ridgeY + 4.6 * u, cx + halfR, ridgeY + 2.6 * u); ctx.lineTo(cx + halfR, ridgeY + 3.6 * u); ctx.quadraticCurveTo(cx, ridgeY + 5.6 * u, cx - halfR, ridgeY + 3.6 * u); ctx.closePath(); ctx.fill();
  // persimmon tree in front, on the left
  ctx.strokeStyle = '#3e2a20'; ctx.lineCap = 'round'; ctx.lineWidth = 3.4 * u;
  ctx.beginPath(); ctx.moveTo(W * 0.1, H); ctx.quadraticCurveTo(W * 0.13, H * 0.72, W * 0.1, H * 0.52); ctx.stroke();
  ctx.lineWidth = 1.6 * u;
  const br = [[0.11, 0.66, 0.02, 0.5], [0.1, 0.56, 0.17, 0.38], [0.1, 0.58, 0.04, 0.34], [0.12, 0.74, 0.22, 0.6], [0.105, 0.52, 0.11, 0.3]];
  for (const [a, b, c, d] of br) { ctx.beginPath(); ctx.moveTo(W * a, H * b); ctx.lineTo(W * c, H * d); ctx.stroke(); }
  for (const [a, b] of [[0.03, 0.5], [0.05, 0.45], [0.16, 0.4], [0.14, 0.44], [0.05, 0.36], [0.2, 0.62], [0.18, 0.65], [0.11, 0.33], [0.08, 0.42], [0.13, 0.36]]) { ctx.fillStyle = '#ee7a22'; ctx.beginPath(); ctx.arc(W * a, H * b, 2.2 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#4a6a3a'; ctx.fillRect(W * a - 0.6 * u, H * b - 2.6 * u, 1.2 * u, 0.9 * u); }
}

// Seoul at night: N Seoul Tower on Namsan, the towers of the city, and the rainbow fountain falling off the bridge
// into the Han River.
function korSeoul(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7); sky.addColorStop(0, '#0d1638'); sky.addColorStop(1, '#2c3c78');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#dfe6f6'; for (let k = 0; k < 24; k++) ctx.fillRect(((k * 73) % 100) / 100 * W, ((k * 37) % 40) / 100 * H, 0.7 * u, 0.7 * u);
  // Namsan and the tower
  ctx.fillStyle = '#1d3a30'; ctx.beginPath(); ctx.ellipse(W * 0.22, H * 0.66, W * 0.26, H * 0.24, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#25483a'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(W * (0.02 + k * 0.03), H * (0.6 - Math.sin((k / 13) * Math.PI) * 0.16), 2.6 * u, 0, Math.PI * 2); ctx.fill(); }
  const tx = W * 0.22, base = H * 0.42;
  ctx.fillStyle = 'rgba(255,214,140,.25)'; ctx.beginPath(); ctx.arc(tx, H * 0.18, 9 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d8e2f2'; ctx.fillRect(tx - 1.2 * u, H * 0.2, 2.4 * u, base - H * 0.2);
  ctx.fillRect(tx - 2.2 * u, base - 2 * u, 4.4 * u, 2 * u);
  ctx.fillStyle = '#eef3fb'; roundRect(ctx, tx - 4 * u, H * 0.17, 8 * u, 3.4 * u, 1.4 * u); ctx.fill(); roundRect(ctx, tx - 3.2 * u, H * 0.205, 6.4 * u, 1.8 * u, 0.8 * u); ctx.fill();
  ctx.fillStyle = '#ffd27a'; ctx.fillRect(tx - 3.4 * u, H * 0.185, 6.8 * u, 0.7 * u);
  ctx.fillStyle = '#c8d4e8'; ctx.fillRect(tx - 0.4 * u, H * 0.06, 0.8 * u, H * 0.11);
  ctx.fillStyle = '#ff5a4a'; ctx.beginPath(); ctx.arc(tx, H * 0.06, 0.9 * u, 0, Math.PI * 2); ctx.fill();
  // the city
  for (let k = 0; k < 26; k++) {
    const x = W * (0.42 + k * 0.023), bw = (3.6 + (k * 7) % 4) * u, bh = (12 + ((k * 13) % 19)) * u, y = H * 0.66 - bh;
    ctx.fillStyle = k % 2 ? '#3a3f78' : '#4a4f8a'; ctx.fillRect(x, y, bw, bh);
    ctx.fillStyle = k % 3 ? '#f6d58a' : '#cfe4ff'; for (let wy = y + 1.4 * u; wy < H * 0.65; wy += 2.2 * u) for (let wx = x + 0.7 * u; wx < x + bw - 0.8 * u; wx += 1.6 * u) if (((wx + wy) / u) % 3 > 1) ctx.fillRect(wx, wy, 0.7 * u, 0.9 * u);
  }
  ctx.fillStyle = '#121a36'; ctx.fillRect(0, H * 0.655, W, H * 0.02);
  // the river
  const river = ctx.createLinearGradient(0, H * 0.67, 0, H); river.addColorStop(0, '#24356a'); river.addColorStop(1, '#101a3a');
  ctx.fillStyle = river; ctx.fillRect(0, H * 0.67, W, H * 0.33);
  ctx.fillStyle = '#f6d58a'; for (let k = 0; k < 30; k++) ctx.fillRect(W * (0.3 + ((k * 29) % 70) / 100), H * (0.7 + (k % 6) * 0.03), 2.4 * u, 0.6 * u);
  // the bridge, with the rainbow fountain pouring off its side
  const by = H * 0.78;
  ctx.fillStyle = '#3a4466'; ctx.fillRect(0, by, W, 2.6 * u);
  ctx.fillStyle = '#5a6488'; for (let k = 0; k < 8; k++) ctx.fillRect(W * (0.04 + k * 0.13), by + 2.6 * u, 1.6 * u, 12 * u);
  const rainbow = ['#ff4a5a', '#ff9a3a', '#ffe14a', '#5ad06a', '#4ab4ff', '#9a6aff'];
  const bandW = 4.4 * u, n = Math.floor((W * 0.92) / bandW);
  for (let k = 0; k < n; k++) {
    const x0 = W * 0.04 + k * bandW;
    ctx.fillStyle = rainbow[k % rainbow.length];
    ctx.beginPath(); ctx.moveTo(x0, by + 2.6 * u); ctx.lineTo(x0 + bandW, by + 2.6 * u); ctx.lineTo(x0 + bandW + 1.6 * u, H); ctx.lineTo(x0 + 1.6 * u, H); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(W * 0.04, H * 0.955, W * 0.94, 1.6 * u);
}

// Letter scenes for the Korean postcard.
const KOREA_SCENES = [
  (c, w, h) => { // a hanok roof against the sky
    c.fillStyle = '#9cc6e4'; c.fillRect(0, 0, w, h); c.fillStyle = '#efe6d6'; c.fillRect(0, h * 0.62, w, h);
    c.fillStyle = '#3d4452'; c.beginPath(); c.moveTo(-w * 0.1, h * 0.4); c.quadraticCurveTo(w * 0.2, h * 0.62, w * 0.5, h * 0.6); c.quadraticCurveTo(w * 0.8, h * 0.62, w * 1.1, h * 0.4); c.lineTo(w * 0.8, h * 0.22); c.lineTo(w * 0.2, h * 0.22); c.fill();
    c.fillStyle = '#7a5236'; c.fillRect(w * 0.2, h * 0.62, w * 0.08, h); c.fillRect(w * 0.72, h * 0.62, w * 0.08, h);
  },
  (c, w, h) => { // mugunghwa, the rose of Sharon
    c.fillStyle = '#4f8a4a'; c.fillRect(0, 0, w, h);
    for (const [x, y] of [[0.5, 0.3], [0.5, 0.75]]) { c.fillStyle = '#e9a0c0'; for (let p = 0; p < 5; p++) { const a = (p * Math.PI * 2) / 5; c.beginPath(); c.arc(w * x + Math.cos(a) * w * 0.18, h * y + Math.sin(a) * w * 0.18, w * 0.17, 0, Math.PI * 2); c.fill(); } c.fillStyle = '#b8324a'; c.beginPath(); c.arc(w * x, h * y, w * 0.12, 0, Math.PI * 2); c.fill(); }
  },
  (c, w, h) => { const cols = ['#d0393b', '#f2c53d', '#3a9a5a', '#e9779a', '#3a6fc0', '#f3eee2', '#7a4fa0']; for (let i = 0; i < 9; i++) { c.fillStyle = cols[i % 7]; c.fillRect(0, (h * i) / 9, w, h / 9 + 1); } }, // saekdong stripes
  (c, w, h) => { // Seoul at night
    c.fillStyle = '#1a2654'; c.fillRect(0, 0, w, h); c.fillStyle = '#d8e2f2'; c.fillRect(w * 0.45, h * 0.08, w * 0.1, h * 0.5); c.fillRect(w * 0.3, h * 0.2, w * 0.4, h * 0.08);
    c.fillStyle = '#232c56'; c.fillRect(0, h * 0.6, w, h); c.fillStyle = '#f6d58a'; for (let k = 0; k < 8; k++) c.fillRect(w * (0.1 + (k % 4) * 0.22), h * (0.68 + Math.floor(k / 4) * 0.14), w * 0.08, h * 0.05);
  },
  (c, w, h) => { // autumn mountains
    c.fillStyle = '#8fc4e6'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#c8462e'; c.beginPath(); c.moveTo(-w * 0.2, h); c.lineTo(w * 0.4, h * 0.25); c.lineTo(w * 1.1, h); c.fill();
    c.fillStyle = '#ee9a2a'; c.beginPath(); c.moveTo(w * 0.1, h); c.lineTo(w * 0.75, h * 0.45); c.lineTo(w * 1.3, h); c.fill();
  },
];
function korPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'KOREA', KOREA_SCENES); }


// Seigaiha: overlapping fans of concentric wave arcs, indigo and white, a few rows picked out in gold-ochre.
function japSeigaiha(ctx, W, H) {
  const C = { navy: '#1d2c55', indigo: '#2f4a85', blue: '#5a7fb8', white: '#eef0ec', gold: '#d6a446', edge: '#141c36' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.edge; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.white; x.fillRect(3, 3, cols - 6, rows - 6); x.fillStyle = C.edge; x.fillRect(4, 4, cols - 8, rows - 8);
    const fx = 6, fy = 6, fw = cols - 12, fh = rows - 12;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const R = 12, dy = R * 0.5;
    for (let j = -2, row = 0; fy + j * dy - R < fy + fh; j++, row++) {
      const gold = row % 7 === 4;
      for (let i = -1; i * R * 2 < fw + 2 * R; i++) {
        const cx = fx + i * 2 * R + (Math.abs(j) % 2 ? R : 0), cy = fy + j * dy + R;
        const rings = gold ? [C.navy, C.gold, C.navy, C.gold, C.navy, C.gold] : [C.navy, C.white, C.indigo, C.white, C.blue, C.white];
        rings.forEach((col, k) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, R - k * 2, 0, Math.PI * 2); x.fill(); });
      }
    }
    x.restore();
  });
}

// Asanoha: the hemp-leaf star, a lattice of six-pointed stars of thin lines, white on indigo, a madder panel
// across the middle like an obi.
function japAsanoha(ctx, W, H) {
  const C = { indigo: '#233a6e', line: '#e8ecef', red: '#b0303a', line2: '#f2d9b8', dark: '#121a33', gold: '#d6a446' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.dark; x.fillRect(0, 0, cols, rows);
    const fx = 4, fy = 4, fw = cols - 8, fh = rows - 8, band = [fy + fh * 0.36, fy + fh * 0.64];
    x.fillStyle = C.indigo; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.red; x.fillRect(fx, band[0], fw, band[1] - band[0]);
    x.fillStyle = C.gold; x.fillRect(fx, band[0] - 1, fw, 1); x.fillRect(fx, band[1], fw, 1);
    const s = 24, h = s * Math.sqrt(3) / 2;
    // a triangular grid; in every triangle three lines from its centre to the corners
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.lineWidth = 1;
    for (let j = -1; j * h < fh + h; j++) for (let i = -1; i * s < fw + s; i++) {
      const ox = fx + i * s + (j % 2 ? s / 2 : 0), oy = fy + j * h;
      const tris = [[[ox, oy], [ox + s, oy], [ox + s / 2, oy + h]], [[ox + s, oy], [ox + s / 2, oy + h], [ox + s * 1.5, oy + h]]];
      for (const t of tris) {
        const mx = (t[0][0] + t[1][0] + t[2][0]) / 3, my = (t[0][1] + t[1][1] + t[2][1]) / 3;
        x.strokeStyle = my > band[0] && my < band[1] ? C.line2 : C.line;
        x.beginPath(); x.moveTo(t[0][0], t[0][1]); x.lineTo(t[1][0], t[1][1]); x.lineTo(t[2][0], t[2][1]); x.closePath(); x.stroke();
        for (const p of t) { x.beginPath(); x.moveTo(mx, my); x.lineTo(p[0], p[1]); x.stroke(); }
      }
    }
    x.restore();
    x.fillStyle = C.gold; x.fillRect(fx, band[0] - 1, fw, 1); x.fillRect(fx, band[1], fw, 1);
  });
}

// Boro: indigo cotton patched again and again, every patch its own shade, held down with rows of white sashiko
// running stitch; one patch of rust and one of persimmon among the blues.
function japBoro(ctx, W, H) {
  const C = { i1: '#1b2a4e', i2: '#2a3f6e', i3: '#3d5a8e', i4: '#5a77a8', i5: '#7f98c0', i6: '#263552', rust: '#9a4a2e', kaki: '#c8783a', thread: '#d8dde2', seam: '#121a30' };
  const blues = [C.i1, C.i2, C.i3, C.i4, C.i5, C.i6];
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    let n = 0;
    piecework(x, 0, 0, cols - 1, rows - 1, 77, 6, (a, b, w, h, R) => {
      n++; const col = n === 7 ? C.rust : n === 19 ? C.kaki : blues[Math.floor(R() * blues.length)];
      x.fillStyle = col; x.fillRect(a, b, w, h);
    }, C.seam);
    // a few smaller patches sewn on top, a little crooked
    const R = rng(91);
    for (let k = 0; k < 7; k++) { const pw = 10 + R() * 16, ph = 8 + R() * 12, px = R() * (cols - pw), py = R() * (rows - ph); x.save(); x.translate(px + pw / 2, py + ph / 2); x.rotate((R() - 0.5) * 0.12); x.fillStyle = C.seam; x.fillRect(-pw / 2 - 1, -ph / 2 - 1, pw + 2, ph + 2); x.fillStyle = blues[(k * 2 + 1) % blues.length]; x.fillRect(-pw / 2, -ph / 2, pw, ph); x.restore(); }
    // sashiko: rows of running stitch across the whole cloth, holding the layers together
    x.fillStyle = C.thread;
    for (let yy = 2, r = 0; yy < rows - 1; yy += 4, r++) for (let xx = (r % 2) * 2; xx < cols; xx += 4) x.fillRect(xx, yy, 2, 1);
  });
}

// A koi pond seen from above: red-and-white and gold koi turning among lily pads, ripples, a lotus in bloom.
function japKoi(ctx, W, H) {
  const C = { water: '#1f4a5e', water2: '#255668', ripple: '#3f7a8a', pad: '#3f7a3a', pad2: '#5a9a4a', white: '#f4f0e6', red: '#d8402e', gold: '#eba43a', black: '#1a1a1a',
    pink: '#e8a0b0', stone: '#8a8478', stone2: '#6f6a60' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.water; x.fillRect(0, 0, cols, rows);
    for (let y = 0; y < rows; y++) if (Math.floor(y / 7) % 3 === 1) { x.fillStyle = C.water2; x.fillRect(0, y, cols, 1); }
    // a rim of stones
    const R = rng(5);
    for (let k = 0; k < 90; k++) { const t = k / 90, side = Math.floor(t * 4), f = (t * 4) % 1; const [px, py] = side === 0 ? [f * cols, 0] : side === 1 ? [cols, f * rows] : side === 2 ? [cols - f * cols, rows] : [0, rows - f * rows]; x.fillStyle = k % 3 ? C.stone : C.stone2; x.beginPath(); x.ellipse(px, py, 4 + R() * 3, 3.4 + R() * 2, R() * 3, 0, Math.PI * 2); x.fill(); }
    // ripples
    x.strokeStyle = C.ripple; x.lineWidth = 0.9; for (const [px, py, r] of [[0.3, 0.3, 6], [0.7, 0.62, 8], [0.52, 0.2, 5]]) for (let k = 1; k <= 3; k++) { x.beginPath(); x.ellipse(cols * px, rows * py, r * k * 0.7, r * k * 0.45, 0, 0, Math.PI * 2); x.stroke(); }
    // lily pads and a lotus
    const pad = (px, py, r, a) => { x.fillStyle = C.pad; x.beginPath(); x.moveTo(px, py); x.arc(px, py, r, a + 0.35, a + Math.PI * 2 - 0.35); x.closePath(); x.fill(); x.fillStyle = C.pad2; x.beginPath(); x.moveTo(px, py); x.arc(px, py, r * 0.75, a + 0.5, a + Math.PI * 1.2); x.closePath(); x.fill(); };
    for (const [px, py, r, a] of [[0.12, 0.22, 7, 0.4], [0.2, 0.32, 5, 2], [0.85, 0.2, 8, 3.5], [0.9, 0.75, 7, 1], [0.15, 0.8, 9, 5], [0.62, 0.86, 6, 2.6], [0.4, 0.12, 5, 4]]) pad(cols * px, rows * py, r, a);
    const lx = cols * 0.17, ly = rows * 0.77; for (let p = 0; p < 8; p++) { const a = (p * Math.PI) / 4; x.fillStyle = p % 2 ? C.pink : C.white; x.beginPath(); x.ellipse(lx + Math.cos(a) * 2.6, ly + Math.sin(a) * 2.6, 2.6, 1.2, a, 0, Math.PI * 2); x.fill(); } x.fillStyle = C.gold; x.beginPath(); x.arc(lx, ly, 1.3, 0, Math.PI * 2); x.fill();
    // koi: a curved body along a path, fins, a forked tail, patches
    const koi = (px, py, s, ang, bend, base, patch, patch2) => {
      x.save(); x.translate(px, py); x.rotate(ang);
      const body = (t) => [t * s, Math.sin(t * Math.PI * 0.9) * bend * s], wid = (t) => s * 0.14 * Math.sin(Math.PI * Math.min(1, 0.15 + t * 0.95)) * (1 - t * 0.55);
      const L = [], Rr = []; for (let k = 0; k <= 20; k++) { const t = k / 20, [bx, by] = body(t), w = wid(t); L.push([bx, by - w]); Rr.push([bx, by + w]); }
      const outline = () => { x.beginPath(); L.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); for (let i = Rr.length - 1; i >= 0; i--) x.lineTo(Rr[i][0], Rr[i][1]); x.closePath(); };
      const [tx, ty] = body(0.88);
      x.fillStyle = base; x.beginPath(); x.moveTo(tx - s * 0.06, ty - s * 0.03); x.lineTo(tx + s * 0.26, ty - s * 0.16); x.lineTo(tx + s * 0.16, ty); x.lineTo(tx + s * 0.26, ty + s * 0.16); x.lineTo(tx - s * 0.06, ty + s * 0.03); x.closePath(); x.fill();
      for (const d of [-1, 1]) { const [fx2, fy2] = body(0.28); x.beginPath(); x.ellipse(fx2, fy2 + d * s * 0.15, s * 0.09, s * 0.04, d * 0.6, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = base; outline(); x.fill();
      x.save(); outline(); x.clip();
      if (patch) { x.fillStyle = patch; for (const [t, r] of [[0.12, 0.13], [0.42, 0.11], [0.68, 0.08]]) { const [bx, by] = body(t); x.beginPath(); x.ellipse(bx, by, r * s, s * 0.11, 0, 0, Math.PI * 2); x.fill(); } }
      if (patch2) { x.fillStyle = patch2; const [bx, by] = body(0.55); x.beginPath(); x.ellipse(bx, by - s * 0.05, s * 0.05, s * 0.04, 0, 0, Math.PI * 2); x.fill(); }
      x.restore();
      x.restore();
    };
    koi(cols * 0.3, rows * 0.45, 34, 0.25, 0.12, C.white, C.red, null);
    koi(cols * 0.78, rows * 0.38, 30, Math.PI - 0.3, -0.14, C.gold, null, null);
    koi(cols * 0.66, rows * 0.78, 28, -2.75, 0.16, C.white, C.red, C.black);
    koi(cols * 0.45, rows * 0.26, 22, 0.1, -0.1, C.red, C.white, null);
  });
}

// A gold-leaf folding screen: six panels of gold with drifting gold clouds, irises in indigo and violet rising
// from a stream that winds across the panels.
function japByobu(ctx, W, H) {
  const C = { gold: '#d9ad55', gold2: '#c99a44', gold3: '#e6c070', hinge: '#4a3018', stream: '#2a4a7a', stream2: '#3f6a9a', iris: '#3a2f8a', iris2: '#6a5ab8', white: '#f2ece0', leaf: '#3f7a4a', leaf2: '#2f5f3a', frame: '#2a1a14' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.frame; x.fillRect(0, 0, cols, rows);
    const fx = 4, fy = 4, fw = cols - 8, fh = rows - 8;
    x.fillStyle = C.gold; x.fillRect(fx, fy, fw, fh);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // gold-leaf squares and clouds
    for (let j = 0; j < fh; j += 8) for (let i = 0; i < fw; i += 8) if ((i / 8 + j / 8) % 3 === 0) { x.fillStyle = C.gold2; x.fillRect(fx + i, fy + j, Math.min(8, fw - i), Math.min(8, fh - j)); }
    for (const [px, py, w] of [[0.15, 0.12, 30], [0.6, 0.08, 40], [0.85, 0.2, 26], [0.35, 0.22, 22]]) { x.fillStyle = C.gold3; for (let k = 0; k < 4; k++) { x.beginPath(); x.ellipse(fx + fw * px + k * w * 0.22, fy + fh * py + (k % 2) * 2, w * 0.18, 3.4, 0, 0, Math.PI * 2); x.fill(); } x.fillRect(fx + fw * px - w * 0.15, fy + fh * py, w * 0.95, 3); }
    // the stream
    x.fillStyle = C.stream; x.beginPath(); x.moveTo(fx, fy + fh * 0.9);
    for (let k = 0; k <= 30; k++) { const t = k / 30; x.lineTo(fx + fw * t, fy + fh * (0.72 + 0.12 * Math.sin(t * 5.5 + 0.5))); }
    x.lineTo(fx + fw, fy + fh); x.lineTo(fx, fy + fh); x.closePath(); x.fill();
    x.strokeStyle = C.stream2; x.lineWidth = 1; for (let k = 0; k < 3; k++) { x.beginPath(); for (let t = 0; t <= 1; t += 0.02) { const px = fx + fw * t, py = fy + fh * (0.8 + k * 0.05 + 0.1 * Math.sin(t * 5.5 + 0.5)); t ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
    // clumps of irises
    const iris = (cx, base, hgt) => {
      for (const [dx, lean] of [[-4, -0.25], [-1, -0.08], [2, 0.1], [5, 0.3]]) { x.fillStyle = dx % 2 ? C.leaf : C.leaf2; x.beginPath(); x.moveTo(cx + dx - 1, base); x.quadraticCurveTo(cx + dx + lean * hgt * 0.4, base - hgt * 0.5, cx + dx + lean * hgt * 0.7, base - hgt * 0.95); x.lineTo(cx + dx + 1, base); x.closePath(); x.fill(); }
      for (const [dx, dy] of [[-3, 0.78], [3, 0.92], [0, 1.02]]) {
        const fxp = cx + dx, fyp = base - hgt * dy;
        x.strokeStyle = C.leaf2; x.lineWidth = 0.9; x.beginPath(); x.moveTo(fxp, fyp); x.lineTo(cx + dx * 0.3, base); x.stroke();
        x.fillStyle = C.iris; x.beginPath(); x.ellipse(fxp - 2.4, fyp + 1.6, 2.6, 1.6, -0.5, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(fxp + 2.4, fyp + 1.6, 2.6, 1.6, 0.5, 0, Math.PI * 2); x.fill();
        x.fillStyle = C.iris2; x.beginPath(); x.ellipse(fxp, fyp - 1.6, 1.5, 2.6, 0, 0, Math.PI * 2); x.fill();
        x.fillStyle = C.white; x.fillRect(fxp - 0.5, fyp + 0.4, 1, 1);
      }
    };
    for (const [p, b, h] of [[0.08, 0.8, 34], [0.2, 0.86, 40], [0.33, 0.74, 30], [0.47, 0.82, 44], [0.62, 0.72, 32], [0.76, 0.8, 42], [0.9, 0.74, 34]]) iris(fx + fw * p, fy + fh * b, h);
    x.restore();
    // the hinges between the six panels
    for (let k = 1; k < 6; k++) { const hx = Math.round(fx + (k * fw) / 6); x.fillStyle = C.hinge; x.fillRect(hx, fy, 1, fh); x.fillStyle = C.gold3; x.fillRect(hx + 1, fy, 1, fh); }
  });
}

// Mount Fuji in spring: the snow-capped cone above a five-storey pagoda on the hillside, cherry blossom in front.
function japFuji(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6); sky.addColorStop(0, '#6aa2d6'); sky.addColorStop(1, '#d6e8f2');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  // Fuji
  const fx = W * 0.6, top = H * 0.14, base = H * 0.62;
  ctx.fillStyle = '#5a6f9a'; ctx.beginPath(); ctx.moveTo(fx - W * 0.42, base); ctx.quadraticCurveTo(fx - W * 0.16, base - (base - top) * 0.55, fx - W * 0.05, top); ctx.lineTo(fx + W * 0.05, top); ctx.quadraticCurveTo(fx + W * 0.16, base - (base - top) * 0.55, fx + W * 0.42, base); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f6f8fa'; ctx.beginPath(); ctx.moveTo(fx - W * 0.05, top); ctx.lineTo(fx + W * 0.05, top); ctx.quadraticCurveTo(fx + W * 0.1, top + 8 * u, fx + W * 0.13, top + 15 * u);
  for (let k = 0; k <= 8; k++) { const t = k / 8; ctx.lineTo(fx + W * (0.13 - 0.26 * t), top + (15 + (k % 2 ? 5 : 0) - Math.sin(t * Math.PI) * 2) * u); }
  ctx.quadraticCurveTo(fx - W * 0.1, top + 8 * u, fx - W * 0.05, top); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e4eaf2'; ctx.beginPath(); ctx.moveTo(fx + W * 0.01, top); ctx.lineTo(fx + W * 0.05, top); ctx.quadraticCurveTo(fx + W * 0.1, top + 8 * u, fx + W * 0.13, top + 15 * u); ctx.lineTo(fx + W * 0.06, top + 17 * u); ctx.closePath(); ctx.fill();
  // hills and the pagoda
  ctx.fillStyle = '#3f6a4a'; ctx.beginPath(); ctx.moveTo(0, H * 0.7); ctx.quadraticCurveTo(W * 0.25, H * 0.5, W * 0.5, H * 0.66); ctx.quadraticCurveTo(W * 0.75, H * 0.6, W, H * 0.7); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  const px = W * 0.3, pb = H * 0.66;
  for (let k = 0; k < 5; k++) {
    const y = pb - k * 7 * u, w = (16 - k * 2) * u;
    ctx.fillStyle = '#c8322a'; ctx.fillRect(px - w * 0.32, y - 5 * u, w * 0.64, 5 * u);
    ctx.fillStyle = '#2b2a30'; ctx.beginPath(); ctx.moveTo(px - w * 0.62, y - 4.6 * u); ctx.quadraticCurveTo(px - w * 0.3, y - 5.6 * u, px, y - 7.2 * u); ctx.quadraticCurveTo(px + w * 0.3, y - 5.6 * u, px + w * 0.62, y - 4.6 * u); ctx.lineTo(px + w * 0.5, y - 3.6 * u); ctx.lineTo(px - w * 0.5, y - 3.6 * u); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#2b2a30'; ctx.fillRect(px - 0.5 * u, pb - 46 * u, 1 * u, 12 * u);
  // cherry blossom: branches across the bottom and top-left, blossom clouds
  ctx.strokeStyle = '#4a2c2a'; ctx.lineCap = 'round';
  for (const [a, b, c, d, w] of [[0, 0.95, 0.3, 0.82, 3], [0.18, 0.86, 0.36, 0.95, 1.8], [0, 0.1, 0.22, 0.2, 2.6], [0.12, 0.15, 0.2, 0.06, 1.6], [1, 0.9, 0.74, 0.86, 2.8]]) { ctx.lineWidth = w * u; ctx.beginPath(); ctx.moveTo(W * a, H * b); ctx.lineTo(W * c, H * d); ctx.stroke(); }
  const blossom = (cx, cy, r) => { for (let k = 0; k < 9; k++) { const a = k * 2.4, rr = r * (0.3 + ((k * 37) % 10) / 14); ctx.fillStyle = k % 3 ? '#f4b6c6' : '#fbd8e2'; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.7, r * 0.42, 0, Math.PI * 2); ctx.fill(); } };
  for (const [a, b, r] of [[0.06, 0.9, 7], [0.18, 0.84, 8], [0.3, 0.82, 6], [0.36, 0.94, 6], [0.06, 0.12, 8], [0.18, 0.18, 7], [0.2, 0.06, 6], [0.8, 0.86, 7], [0.92, 0.9, 8]]) blossom(W * a, H * b, r * u);
  ctx.fillStyle = '#fbd8e2'; for (let k = 0; k < 14; k++) ctx.fillRect(((k * 53) % 100) / 100 * W, ((k * 29) % 60 + 20) / 100 * H, 1.4 * u, 1 * u);
}

// A Kyoto lane at dusk: wooden machiya fronts with lattice, red paper lanterns lit along the eaves, stone paving.
function japKyoto(ctx, W, H) {
  const u = H / 100, vx = W * 0.5, vy = H * 0.42;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5); sky.addColorStop(0, '#2a3070'); sky.addColorStop(1, '#e88a6a');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  // a pagoda far away at the end of the lane
  ctx.fillStyle = '#2a2240'; for (let k = 0; k < 5; k++) { const y = vy - k * 4.2 * u, w = (12 - k * 1.6) * u; ctx.beginPath(); ctx.moveTo(vx - w / 2, y); ctx.lineTo(vx, y - 2.4 * u); ctx.lineTo(vx + w / 2, y); ctx.fill(); ctx.fillRect(vx - w * 0.22, y, w * 0.44, 1.8 * u); } ctx.fillRect(vx - 0.4 * u, vy - 27 * u, 0.8 * u, 7 * u);
  // the paving, converging to the end of the lane
  ctx.fillStyle = '#5a5258'; ctx.beginPath(); ctx.moveTo(vx - 4 * u, vy); ctx.lineTo(vx + 4 * u, vy); ctx.lineTo(W * 0.85, H); ctx.lineTo(W * 0.15, H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#7a7076'; ctx.lineWidth = 0.7 * u; for (let k = 1; k < 10; k++) { const t = Math.pow(k / 10, 1.8), y = vy + (H - vy) * t, hw = 4 * u + (W * 0.35 - 4 * u) * t; ctx.beginPath(); ctx.moveTo(vx - hw, y); ctx.lineTo(vx + hw, y); ctx.stroke(); }
  // the houses on either side, in perspective
  for (const s of [-1, 1]) {
    const near = vx + s * W * 0.35, far = vx + s * 4 * u, edge = s < 0 ? 0 : W;
    ctx.fillStyle = '#3a2620'; ctx.beginPath(); ctx.moveTo(far, vy - 6 * u); ctx.lineTo(near, H * 0.08); ctx.lineTo(edge, H * 0.04); ctx.lineTo(edge, H); ctx.lineTo(near, H); ctx.lineTo(far, vy + 0.5 * u); ctx.closePath(); ctx.fill();
    // lattice
    ctx.strokeStyle = '#6a4632'; ctx.lineWidth = 0.6 * u;
    for (let k = 0; k <= 22; k++) { const t = k / 22, xx = far + (near - far) * Math.pow(t, 1.5), y0 = vy - 6 * u + (H * 0.32 - vy + 6 * u) * Math.pow(t, 1.5), y1 = vy + (H - vy) * Math.pow(t, 1.5); ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx, y1); ctx.stroke(); }
    // lit doorways
    for (const t of [0.35, 0.62, 0.9]) { const tt = Math.pow(t, 1.5), xx = far + (near - far) * tt, w = (2 + 10 * tt) * u, y1 = vy + (H - vy) * tt, hgt = (4 + 30 * tt) * u; ctx.fillStyle = '#f2c27a'; ctx.fillRect(xx - (s < 0 ? w : 0), y1 - hgt, w, hgt); ctx.fillStyle = '#6a4632'; for (let g = 1; g < 4; g++) ctx.fillRect(xx - (s < 0 ? w : 0) + (g * w) / 4, y1 - hgt, 0.5 * u, hgt); }
    // eaves
    ctx.fillStyle = '#1e1a22'; ctx.beginPath(); ctx.moveTo(far, vy - 7 * u); ctx.lineTo(near + s * 2 * u, H * 0.26); ctx.lineTo(near + s * 2 * u, H * 0.31); ctx.lineTo(far, vy - 5 * u); ctx.closePath(); ctx.fill();
    // red lanterns under the eaves
    for (const t of [0.2, 0.4, 0.6, 0.8, 1]) { const tt = Math.pow(t, 1.5), xx = far + (near - far) * tt - s * 2 * u, yy = vy - 4 * u + (H * 0.34 - vy + 4 * u) * tt, r = (1 + 4.6 * tt) * u;
      ctx.fillStyle = 'rgba(255,170,90,.12)'; ctx.beginPath(); ctx.arc(xx, yy + r, r * 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#d8342a'; ctx.beginPath(); ctx.ellipse(xx, yy + r, r * 0.8, r * 1.1, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ff7a4a'; ctx.beginPath(); ctx.ellipse(xx - r * 0.2, yy + r * 0.9, r * 0.3, r * 0.6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1e1a22'; ctx.fillRect(xx - r * 0.5, yy - r * 0.2, r, r * 0.3); ctx.fillRect(xx - r * 0.5, yy + r * 1.95, r, r * 0.3); }
  }
}

// Letter scenes for the Japanese postcard.
const JAPAN_SCENES = [
  (c, w, h) => { // Fuji
    c.fillStyle = '#8cc0e6'; c.fillRect(0, 0, w, h); c.fillStyle = '#5a6f9a'; c.beginPath(); c.moveTo(-w * 0.2, h * 0.85); c.lineTo(w * 0.4, h * 0.2); c.lineTo(w * 0.6, h * 0.2); c.lineTo(w * 1.2, h * 0.85); c.fill();
    c.fillStyle = '#f6f8fa'; c.beginPath(); c.moveTo(w * 0.27, h * 0.36); c.lineTo(w * 0.4, h * 0.2); c.lineTo(w * 0.6, h * 0.2); c.lineTo(w * 0.73, h * 0.36); c.fill(); c.fillStyle = '#3f6a4a'; c.fillRect(0, h * 0.84, w, h);
  },
  (c, w, h) => { c.fillStyle = '#f6c6d2'; c.fillRect(0, 0, w, h); for (let k = 0; k < 7; k++) { c.fillStyle = k % 2 ? '#e88aa2' : '#fbe4ea'; c.beginPath(); c.arc(w * (0.2 + (k % 3) * 0.3), h * (0.12 + k * 0.13), w * 0.15, 0, Math.PI * 2); c.fill(); } }, // sakura
  (c, w, h) => { c.fillStyle = '#1d2c55'; c.fillRect(0, 0, w, h); c.strokeStyle = '#eef0ec'; c.lineWidth = w * 0.06; for (let j = 0; j < 5; j++) for (let i = 0; i < 2; i++) { c.beginPath(); c.arc(w * (i + (j % 2 ? 0.5 : 0)), h * j * 0.22 + w * 0.3, w * 0.28, Math.PI, 0); c.stroke(); } }, // waves
  (c, w, h) => { c.fillStyle = '#f4f0e6'; c.fillRect(0, 0, w, h); c.fillStyle = '#c8322a'; c.beginPath(); c.arc(w * 0.5, h * 0.42, w * 0.32, 0, Math.PI * 2); c.fill(); }, // the red sun
  (c, w, h) => { c.fillStyle = '#e88a6a'; c.fillRect(0, 0, w, h); c.fillStyle = '#c8322a'; c.fillRect(w * 0.1, h * 0.25, w * 0.8, h * 0.08); c.fillRect(w * 0.2, h * 0.38, w * 0.6, h * 0.06); c.fillRect(w * 0.24, h * 0.25, w * 0.1, h * 0.75); c.fillRect(w * 0.66, h * 0.25, w * 0.1, h * 0.75); }, // torii
];
function japPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'JAPAN', JAPAN_SCENES); }


// A lotus flower seen from the side: a fan of pointed petals on a cup.
function lotusBloom(x, cx, cy, s, c1, c2) {
  for (const [a, k] of [[-1.1, 0.8], [1.1, 0.8], [-0.55, 0.95], [0.55, 0.95], [0, 1]]) {
    x.save(); x.translate(cx, cy); x.rotate(a * 0.6); x.fillStyle = Math.abs(a) > 1 ? c2 : c1;
    x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-s * 0.26 * k, -s * 0.4 * k, 0, -s * 0.9 * k); x.quadraticCurveTo(s * 0.26 * k, -s * 0.4 * k, 0, 0); x.fill(); x.restore();
  }
}

// Blue-and-white porcelain: cobalt lotus scrolls all over a white glaze, a big lotus roundel in the middle, a band
// of lotus-petal panels round the edge.
function chnPorcelain(ctx, W, H) {
  const C = { white: '#f2f2ee', white2: '#e8eaea', cobalt: '#1f3c8a', blue: '#4a6ab8', pale: '#9ab0dc', dark: '#16295e' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const { fx, fy, fw, fh } = turkFrame(x, cols, rows, { guard: C.dark, guard2: C.white, band: C.white, field: C.white }, 16, 12, (x, w, d) => {
      // a lotus-petal panel: a pointed arch outlined in cobalt with a blue heart
      x.strokeStyle = C.cobalt; x.lineWidth = 1.2; x.beginPath(); x.moveTo(w * 0.1, d * 0.9); x.lineTo(w * 0.1, d * 0.5); x.quadraticCurveTo(w * 0.1, d * 0.12, w / 2, d * 0.08); x.quadraticCurveTo(w * 0.9, d * 0.12, w * 0.9, d * 0.5); x.lineTo(w * 0.9, d * 0.9); x.stroke();
      x.fillStyle = C.blue; x.beginPath(); x.ellipse(w / 2, d * 0.55, w * 0.18, d * 0.22, 0, 0, Math.PI * 2); x.fill();
    }, (x, d) => { x.fillStyle = C.cobalt; x.beginPath(); x.arc(d / 2, d / 2, d * 0.32, 0, Math.PI * 2); x.fill(); x.fillStyle = C.white; x.beginPath(); x.arc(d / 2, d / 2, d * 0.14, 0, Math.PI * 2); x.fill(); });
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // scrolls: S-curving stems with a lotus and leaves on each curl
    const cx = fx + fw / 2, cy = fy + fh / 2, rr = fh * 0.4;
    for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) {
      const px = fx + (i + 0.5 + (j % 2 ? 0.5 : 0)) * fw / 7, py = fy + (j + 0.5) * fh / 3;
      if (Math.hypot(px - cx, (py - cy) * 1.2) < rr + 8) continue;
      const d = (i + j) % 2 ? 1 : -1;
      x.strokeStyle = C.cobalt; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px - 12, py + d * 6); x.bezierCurveTo(px - 4, py + d * 12, px - 2, py - d * 10, px + 8, py - d * 6); x.bezierCurveTo(px + 13, py - d * 4, px + 12, py + d * 2, px + 8, py + d * 2); x.stroke();
      lotusBloom(x, px - 2, py + 3, 9, C.cobalt, C.blue);
      leaf(x, px + 8, py - d * 6, 7, d > 0 ? -0.6 : 0.6, C.blue); leaf(x, px - 12, py + d * 6, 6, Math.PI + 0.4 * d, C.pale);
    }
    // the roundel
    x.fillStyle = C.cobalt; x.beginPath(); x.arc(cx, cy, rr + 2, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.white; x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    x.strokeStyle = C.blue; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, rr - 3, 0, Math.PI * 2); x.stroke();
    // a pond: water lines, leaves and three lotus flowers
    x.strokeStyle = C.pale; x.lineWidth = 1; for (let k = 0; k < 4; k++) { x.beginPath(); for (let t = -1; t <= 1; t += 0.05) { const px = cx + t * rr * 0.8, py = cy + rr * (0.35 + k * 0.12) + Math.sin(t * 9 + k) * 1.2; t > -1 ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
    for (const [dx, dy, s] of [[-0.42, 0.25, 0.3], [0.45, 0.2, 0.28], [0.05, 0.42, 0.24]]) { x.fillStyle = C.blue; x.beginPath(); x.ellipse(cx + dx * rr, cy + dy * rr, rr * s, rr * s * 0.42, dx * 0.6, 0, Math.PI * 2); x.fill(); x.strokeStyle = C.cobalt; x.lineWidth = 0.8; x.beginPath(); x.moveTo(cx + dx * rr, cy + dy * rr); x.lineTo(cx + dx * rr + rr * s * 0.8, cy + dy * rr); x.stroke(); }
    for (const [dx, dy, s] of [[0, -0.05, 0.62], [-0.45, -0.1, 0.44], [0.46, -0.08, 0.42]]) { x.strokeStyle = C.cobalt; x.lineWidth = 1.1; x.beginPath(); x.moveTo(cx + dx * rr, cy + dy * rr); x.lineTo(cx + dx * rr * 0.9, cy + rr * 0.3); x.stroke(); lotusBloom(x, cx + dx * rr, cy + dy * rr, rr * s * 0.6, C.cobalt, C.blue); }
    x.restore();
  });
}

// Auspicious clouds: gold scrolling clouds (each a cluster of curls with a trailing tail) on Chinese red, a
// gold fret border.
function chnClouds(ctx, W, H) {
  const C = { red: '#b81f24', red2: '#a51c21', gold: '#e8b448', gold2: '#c98f2a', cream: '#f4e2b0', dark: '#5a0e12' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.dark; x.fillRect(0, 0, cols, rows);
    // key-fret border, laid out knot by knot
    const b0 = 3, bd = 8;
    x.fillStyle = C.red; x.fillRect(b0, b0, cols - 2 * b0, rows - 2 * b0);
    const fret = (len, put) => { for (let i = 0; i < len; i++) { const u2 = i % 8; for (let j = 0; j < bd; j++) { let on = j === 0 || j === bd - 1; if (j >= 1 && j <= bd - 2) { if (u2 === 0 && j <= 5) on = true; if (j === 5 && u2 <= 4) on = true; if (u2 === 4 && j >= 3 && j <= 5) on = true; if (j === 3 && u2 >= 2 && u2 <= 4) on = true; if (u2 === 2 && j === 3) on = true; if (u2 === 6 && j >= 2 && j <= 6) on = true; if (j === 2 && u2 >= 6) on = true; } if (on) put(i, j); } } };
    x.fillStyle = C.gold;
    fret(cols - 2 * b0, (i, j) => { x.fillRect(b0 + i, b0 + j, 1, 1); x.fillRect(cols - 1 - b0 - i, rows - 1 - b0 - j, 1, 1); });
    fret(rows - 2 * b0 - 2 * bd, (i, j) => { x.fillRect(b0 + j, rows - 1 - b0 - bd - i, 1, 1); x.fillRect(cols - 1 - b0 - j, b0 + bd + i, 1, 1); });
    const fx = b0 + bd + 1, fy = fx, fw = cols - 2 * fx, fh = rows - 2 * fy;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 7) % 4 === 2 ? C.red2 : C.red; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // a cloud: a gold outline round three lobes, a spiral in each lobe, a scrolling tail
    const cloud = (cx, cy, s, flip) => {
      x.save(); x.translate(cx, cy); x.scale(flip, 1);
      const lobes = [[-0.62, 0.05, 0.42], [0, -0.22, 0.55], [0.62, 0.05, 0.42]];
      x.fillStyle = C.gold; for (const [a, b, r] of lobes) { x.beginPath(); x.arc(a * s, b * s, r * s + 2, 0, Math.PI * 2); x.fill(); }
      roundRect(x, -s * 1.04, 0, s * 2.08, s * 0.48 + 2, s * 0.24); x.fill();
      x.fillStyle = C.red; for (const [a, b, r] of lobes) { x.beginPath(); x.arc(a * s, b * s, r * s, 0, Math.PI * 2); x.fill(); }
      roundRect(x, -s * 1.04 + 2, 2, s * 2.08 - 4, s * 0.48 - 2, s * 0.2); x.fill();
      x.strokeStyle = C.gold; x.lineWidth = 1.6; x.lineCap = 'round';
      for (const [a, b, r] of lobes) { x.beginPath(); for (let t = 0; t <= 1.7; t += 0.04) { const ang = -Math.PI / 2 + t * Math.PI * 2, rr = r * s * 0.78 * (1 - t / 2.1); const qx = a * s + Math.cos(ang) * rr, qy = b * s + Math.sin(ang) * rr; t ? x.lineTo(qx, qy) : x.moveTo(qx, qy); } x.stroke(); }
      x.lineWidth = 2.6; x.beginPath(); x.moveTo(s * 1.0, s * 0.36); x.bezierCurveTo(s * 1.5, s * 0.4, s * 1.7, s * 0.05, s * 1.9, s * 0.25); x.stroke();
      x.beginPath(); x.arc(s * 1.86, s * 0.12, s * 0.12, 0, Math.PI * 1.6); x.stroke();
      x.restore();
    };
    for (const [px, py, s, f] of [[0.17, 0.27, 13, 1], [0.52, 0.2, 15, -1], [0.85, 0.3, 12, 1], [0.32, 0.62, 14, -1], [0.68, 0.7, 15, 1], [0.1, 0.84, 10, 1], [0.92, 0.82, 10, -1]]) cloud(fx + fw * px, fy + fh * py, s, f);
    x.fillStyle = C.gold; for (const [px, py] of [[0.38, 0.4], [0.62, 0.45], [0.5, 0.88], [0.08, 0.5], [0.94, 0.55], [0.28, 0.08], [0.72, 0.1]]) { x.save(); x.translate(fx + fw * px, fy + fh * py); x.rotate(Math.PI / 4); x.fillRect(-1.6, -1.6, 3.2, 3.2); x.restore(); }
    x.restore();
  });
}

// Art Deco rug of 1920s Shanghai and Tianjin: a plum-purple field left mostly empty, a flowering branch of plum
// blossom reaching in from one corner, a blue-and-white vase in the other, a plain border in two blues.
function chnArtDeco(ctx, W, H) {
  const C = { plum: '#4a2342', plum2: '#432040', border: '#2a4a7a', border2: '#7aa0c8', branch: '#2a1820', pink: '#f0a8b8', pink2: '#d86a8a', white: '#f2ece0', gold: '#e2b45a', teal: '#3f8a8a', blue: '#2a4a8a', green: '#4f7a52' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.border; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.border2; x.fillRect(4, 4, cols - 8, rows - 8); x.fillStyle = C.border; x.fillRect(5, 5, cols - 10, rows - 10);
    // a band of little gold "cash" coins round the border
    x.fillStyle = C.gold; const ring = (cx, cy) => { x.beginPath(); x.arc(cx, cy, 2, 0, Math.PI * 2); x.fill(); x.fillStyle = C.border; x.fillRect(cx - 0.6, cy - 0.6, 1.2, 1.2); x.fillStyle = C.gold; };
    for (const [len, put] of [[cols - 20, (a) => { ring(10 + a, 9.5); ring(10 + a, rows - 9.5); }], [rows - 20, (a) => { ring(9.5, 10 + a); ring(cols - 9.5, 10 + a); }]]) { const { n, d } = evenSteps(len, 9); for (let i = 0; i <= n; i++) put(i * d); }
    const fx = 14, fy = 14, fw = cols - 28, fh = rows - 28;
    x.fillStyle = C.border2; x.fillRect(fx - 1, fy - 1, fw + 2, fh + 2);
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 10) % 3 === 1 ? C.plum2 : C.plum; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // the plum branch from the top left corner
    x.strokeStyle = C.branch; x.lineCap = 'round';
    const br = [[0, 0, 0.22, 0.35, 4], [0.22, 0.35, 0.42, 0.42, 3], [0.42, 0.42, 0.56, 0.36, 2], [0.22, 0.35, 0.3, 0.62, 2.4], [0.3, 0.62, 0.26, 0.8, 1.6], [0.12, 0.18, 0.28, 0.12, 2], [0.42, 0.42, 0.48, 0.56, 1.6]];
    for (const [a, b, c, d, w] of br) { x.lineWidth = w; x.beginPath(); x.moveTo(fx + fw * a, fy + fh * b); x.lineTo(fx + fw * c, fy + fh * d); x.stroke(); }
    const bloom = (px, py, r) => { for (let p = 0; p < 5; p++) { const a = (p * Math.PI * 2) / 5 - Math.PI / 2; x.fillStyle = C.pink; x.beginPath(); x.arc(px + Math.cos(a) * r * 0.55, py + Math.sin(a) * r * 0.55, r * 0.48, 0, Math.PI * 2); x.fill(); } x.fillStyle = C.pink2; x.beginPath(); x.arc(px, py, r * 0.3, 0, Math.PI * 2); x.fill(); x.fillStyle = C.gold; x.fillRect(px - 0.5, py - 0.5, 1, 1); };
    for (const [a, b, r] of [[0.2, 0.3, 4.4], [0.3, 0.38, 3.6], [0.4, 0.45, 4], [0.55, 0.33, 3.4], [0.5, 0.42, 2.6], [0.29, 0.58, 3.8], [0.25, 0.76, 3], [0.33, 0.68, 2.4], [0.27, 0.12, 3.4], [0.15, 0.14, 2.6], [0.46, 0.54, 3], [0.08, 0.1, 3]]) bloom(fx + fw * a, fy + fh * b, r);
    for (const [a, b] of [[0.36, 0.36], [0.47, 0.4], [0.24, 0.5], [0.58, 0.38]]) { x.fillStyle = C.pink2; x.beginPath(); x.arc(fx + fw * a, fy + fh * b, 1.4, 0, Math.PI * 2); x.fill(); }
    // the vase, bottom right
    const vx = fx + fw * 0.8, vb = fy + fh * 0.92, vh = fh * 0.46;
    x.fillStyle = C.white; x.beginPath(); x.moveTo(vx - vh * 0.12, vb); x.bezierCurveTo(vx - vh * 0.36, vb - vh * 0.3, vx - vh * 0.3, vb - vh * 0.62, vx - vh * 0.08, vb - vh * 0.72); x.lineTo(vx - vh * 0.08, vb - vh * 0.9); x.lineTo(vx - vh * 0.12, vb - vh); x.lineTo(vx + vh * 0.12, vb - vh); x.lineTo(vx + vh * 0.08, vb - vh * 0.9); x.lineTo(vx + vh * 0.08, vb - vh * 0.72); x.bezierCurveTo(vx + vh * 0.3, vb - vh * 0.62, vx + vh * 0.36, vb - vh * 0.3, vx + vh * 0.12, vb); x.closePath(); x.fill();
    x.strokeStyle = C.blue; x.lineWidth = 1.2; x.beginPath(); x.moveTo(vx - vh * 0.25, vb - vh * 0.5); x.lineTo(vx + vh * 0.25, vb - vh * 0.5); x.stroke();
    lotusBloom(x, vx, vb - vh * 0.22, vh * 0.2, C.blue, C.teal);
    x.fillStyle = C.blue; x.fillRect(vx - vh * 0.13, vb - vh * 0.99, vh * 0.26, 1.2);
    // a stand
    x.fillStyle = C.branch; x.fillRect(vx - vh * 0.2, vb, vh * 0.4, 2); x.fillRect(vx - vh * 0.18, vb + 2, 1.4, 2); x.fillRect(vx + vh * 0.18 - 1.4, vb + 2, 1.4, 2);
    x.restore();
  });
}

// Ningxia peony rug: an apricot field, a round blue peony medallion in the middle, a peony spray in each corner,
// a wide fret border in blue.
function chnNingxia(ctx, W, H) {
  const C = { apricot: '#e2b06a', apricot2: '#d8a45e', blue: '#2a4a7a', blue2: '#5a7aa8', pale: '#a8bcd6', ivory: '#f2e6c8', rose: '#c8506a', rose2: '#e88a9a', green: '#5a7a4a', dark: '#1a2a4a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.dark; x.fillRect(0, 0, cols, rows);
    const b0 = 3, bd = 10;
    x.fillStyle = C.blue; x.fillRect(b0, b0, cols - 2 * b0, rows - 2 * b0);
    // a T-fret running round the border
    x.fillStyle = C.pale;
    const tfret = (len, put) => { for (let i = 0; i < len; i++) { const u2 = i % 10; for (let j = 1; j < bd - 1; j++) { let on = false; if (j === 2 || j === bd - 3) on = u2 !== 9 && u2 !== 0 ? (j === 2 ? u2 >= 1 && u2 <= 4 : u2 >= 5 && u2 <= 8) : false; if (u2 === 1 && j >= 2 && j <= bd - 5) on = true; if (u2 === 8 && j >= 4 && j <= bd - 3) on = true; if (j === bd - 5 && u2 >= 1 && u2 <= 3) on = true; if (j === 4 && u2 >= 6 && u2 <= 8) on = true; if (on) put(i, j); } } };
    tfret(cols - 2 * b0, (i, j) => { x.fillRect(b0 + i, b0 + j, 1, 1); x.fillRect(cols - 1 - b0 - i, rows - 1 - b0 - j, 1, 1); });
    tfret(rows - 2 * b0 - 2 * bd, (i, j) => { x.fillRect(b0 + j, rows - 1 - b0 - bd - i, 1, 1); x.fillRect(cols - 1 - b0 - j, b0 + bd + i, 1, 1); });
    const fx = b0 + bd + 1, fy = fx, fw = cols - 2 * fx, fh = rows - 2 * fy;
    x.fillStyle = C.ivory; x.fillRect(fx - 1, fy - 1, fw + 2, fh + 2);
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 8) % 3 === 1 ? C.apricot2 : C.apricot; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const peony = (px, py, r, c1, c2, c3) => {
      for (let ring = 0; ring < 3; ring++) { const rr = r * (1 - ring * 0.28), n = 8 - ring * 2; for (let p = 0; p < n; p++) { const a = (p * Math.PI * 2) / n + ring * 0.4; x.fillStyle = [c1, c2, c3][ring]; x.beginPath(); x.ellipse(px + Math.cos(a) * rr * 0.5, py + Math.sin(a) * rr * 0.5, rr * 0.42, rr * 0.3, a, 0, Math.PI * 2); x.fill(); } }
      x.fillStyle = C.ivory; x.beginPath(); x.arc(px, py, r * 0.14, 0, Math.PI * 2); x.fill();
    };
    // the medallion
    const cx = fx + fw / 2, cy = fy + fh / 2, rr = fh * 0.36;
    x.fillStyle = C.blue; x.beginPath(); x.arc(cx, cy, rr, 0, Math.PI * 2); x.fill();
    x.strokeStyle = C.pale; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, rr - 2, 0, Math.PI * 2); x.stroke();
    for (let k = 0; k < 6; k++) { const a = (k * Math.PI) / 3; leaf(x, cx + Math.cos(a) * rr * 0.32, cy + Math.sin(a) * rr * 0.32, rr * 0.5, a, k % 2 ? C.green : C.blue2); }
    peony(cx, cy, rr * 0.5, C.rose, C.rose2, C.ivory);
    for (let k = 0; k < 6; k++) { const a = (k * Math.PI) / 3 + Math.PI / 6; peony(cx + Math.cos(a) * rr * 0.72, cy + Math.sin(a) * rr * 0.72, rr * 0.16, C.pale, C.ivory, C.rose2); }
    // corner sprays
    for (const [sx, sy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) {
      const ix = sx === fx ? 1 : -1, iy = sy === fy ? 1 : -1;
      x.fillStyle = C.blue; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + ix * fw * 0.16, sy); x.quadraticCurveTo(sx + ix * fw * 0.1, sy + iy * fh * 0.1, sx, sy + iy * fh * 0.3); x.closePath(); x.fill();
      peony(sx + ix * fw * 0.05, sy + iy * fh * 0.1, fh * 0.08, C.rose, C.rose2, C.ivory);
      leaf(x, sx + ix * fw * 0.05, sy + iy * fh * 0.1, fh * 0.12, Math.atan2(iy * 1, ix * 0.4), C.green);
    }
    // butterflies
    for (const [a, b, f] of [[0.24, 0.5, 1], [0.76, 0.5, -1]]) { const px = fx + fw * a, py = fy + fh * b; for (const d of [-1, 1]) { x.fillStyle = C.blue2; x.beginPath(); x.ellipse(px + d * 3, py - 1.4, 3, 2.2, d * 0.5, 0, Math.PI * 2); x.fill(); x.fillStyle = C.rose; x.beginPath(); x.ellipse(px + d * 2.4, py + 2, 2, 1.4, -d * 0.5, 0, Math.PI * 2); x.fill(); } x.fillStyle = C.dark; x.fillRect(px - 0.5, py - 3, 1, 6); }
    x.restore();
  });
}

// An ink painting of bamboo on silk: dark and pale stalks with nodes, leaves in quick strokes, a red seal.
function chnBamboo(ctx, W, H) {
  const C = { silk: '#ece2c8', silk2: '#e2d6b8', ink: '#22302a', ink2: '#4f6a52', ink3: '#8aa08a', red: '#b8302a', mount: '#3a4a3a', mount2: '#c9b98a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.mount; x.fillRect(0, 0, cols, rows); x.fillStyle = C.mount2; x.fillRect(4, 4, cols - 8, rows - 8);
    const fx = 6, fy = 6, fw = cols - 12, fh = rows - 12;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 11) % 3 === 1 ? C.silk2 : C.silk; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const R = rng(12);
    const stalk = (sx, lean, w, col) => {
      let y = fy + fh + 2, px = sx; const seg = 14 + R() * 6;
      while (y > fy - 10) {
        const ny = y - seg, nx = px + lean * seg;
        x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'butt'; x.beginPath(); x.moveTo(px, y - 1); x.lineTo(nx, ny + 1); x.stroke();
        x.fillStyle = C.silk; x.fillRect(nx - w / 2 - 0.5, ny, w + 1, 0.8); x.fillStyle = col; x.fillRect(nx - w / 2 - 1, ny - 1, w + 2, 1);   // node
        y = ny; px = nx;
      }
    };
    const leafy = (px, py, dir, col, n) => { for (let k = 0; k < n; k++) { const a = dir * (0.4 + k * 0.35) + (dir < 0 ? Math.PI : 0), len = 11 + R() * 6; x.fillStyle = col; x.save(); x.translate(px, py); x.rotate(a); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len * 0.4, -len * 0.16, len, 0); x.quadraticCurveTo(len * 0.4, len * 0.1, 0, 0); x.fill(); x.restore(); } };
    stalk(fx + fw * 0.66, 0.06, 3, C.ink3); stalk(fx + fw * 0.82, -0.03, 2.4, C.ink3);
    stalk(fx + fw * 0.28, 0.09, 4, C.ink2); stalk(fx + fw * 0.52, -0.05, 4.4, C.ink);
    for (const [a, b, d, col, n] of [[0.36, 0.3, 1, C.ink, 4], [0.32, 0.6, -1, C.ink2, 3], [0.5, 0.2, -1, C.ink, 4], [0.48, 0.5, 1, C.ink, 3], [0.7, 0.35, 1, C.ink3, 3], [0.8, 0.15, -1, C.ink3, 3], [0.26, 0.15, 1, C.ink2, 3], [0.55, 0.72, 1, C.ink2, 3]]) leafy(fx + fw * a, fy + fh * b, d, col, n);
    // a column of writing would be too fine to knot; a red seal stands in for the signature
    x.fillStyle = C.red; x.fillRect(fx + fw * 0.88, fy + fh * 0.7, 6, 6); x.fillStyle = C.silk; x.fillRect(fx + fw * 0.88 + 1, fy + fh * 0.7 + 1, 1, 4); x.fillRect(fx + fw * 0.88 + 3, fy + fh * 0.7 + 1, 2, 1); x.fillRect(fx + fw * 0.88 + 3, fy + fh * 0.7 + 3, 2, 1);
    x.restore();
  });
}

// A giant panda sitting in a bamboo grove, eating a stalk of bamboo.
function chnPanda(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#cfe6c8'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#b6d8ac'; ctx.fillRect(0, H * 0.4, W, H);
  // bamboo behind
  const stalk = (sx, w, col, top) => { ctx.fillStyle = col; ctx.fillRect(sx - w / 2, top, w, H - top); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let y = top + 12 * u; y < H; y += 14 * u) ctx.fillRect(sx - w / 2 - 0.4 * u, y, w + 0.8 * u, 1.2 * u); };
  const leaves = (px, py, dir, col) => { ctx.fillStyle = col; for (let k = 0; k < 4; k++) { const a = dir * (0.3 + k * 0.3) + (dir < 0 ? Math.PI : 0), len = (7 + (k % 2) * 3) * u; ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.4, -len * 0.2, len, 0); ctx.quadraticCurveTo(len * 0.4, len * 0.14, 0, 0); ctx.fill(); ctx.restore(); } };
  for (const [x, w, c] of [[0.05, 3, '#8ab878'], [0.14, 2.4, '#9ac488'], [0.62, 2.6, '#8ab878'], [0.74, 3.2, '#9ac488'], [0.95, 2.4, '#8ab878']]) stalk(W * x, w * u, c, 0);
  for (const [x, y, d] of [[0.05, 0.2, 1], [0.14, 0.38, -1], [0.62, 0.15, -1], [0.74, 0.32, 1], [0.95, 0.2, -1]]) leaves(W * x, H * y, d, '#7aa868');
  for (const [x, w, c] of [[0.24, 4.4, '#4f8a3f'], [0.86, 4.6, '#4f8a3f']]) stalk(W * x, w * u, c, 0);
  for (const [x, y, d] of [[0.24, 0.16, 1], [0.24, 0.5, -1], [0.86, 0.28, -1], [0.86, 0.6, 1]]) leaves(W * x, H * y, d, '#3f7a34');
  // ground
  ctx.fillStyle = '#7fae5e'; ctx.beginPath(); ctx.ellipse(W * 0.5, H * 1.02, W * 0.5, H * 0.18, 0, 0, Math.PI * 2); ctx.fill();
  // the panda
  const px = W * 0.5, B = '#1c1c20', Wt = '#f4f2ea';
  ctx.fillStyle = Wt; ctx.beginPath(); ctx.ellipse(px, H * 0.74, 22 * u, 21 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(px - 16 * u, H * 0.92, 9 * u, 7 * u, -0.3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(px + 16 * u, H * 0.92, 9 * u, 7 * u, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8d0c0'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(px + d * 16 * u, H * 0.94, 4 * u, 3 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(px, H * 0.56, 24 * u, 6.4 * u, 0, 0, Math.PI * 2); ctx.fill();          // shoulders band
  // the arms, holding a bamboo stalk to the mouth
  ctx.save(); ctx.translate(px + 6 * u, H * 0.5); ctx.rotate(-0.5); ctx.fillStyle = '#5f9a44'; ctx.fillRect(-1.6 * u, -26 * u, 3.2 * u, 46 * u); ctx.fillStyle = '#3f7a2e'; for (const yy of [-14, 2]) ctx.fillRect(-2 * u, yy * u, 4 * u, 1 * u); ctx.restore();
  ctx.fillStyle = '#4f8a3f'; for (const [a, b, r] of [[0.66, 0.2, -0.6], [0.7, 0.24, 0.2], [0.64, 0.26, -1.2]]) { ctx.save(); ctx.translate(W * a, H * b); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 6 * u, 1.8 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(px - 12 * u, H * 0.66, 7 * u, 12 * u, 0.6, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(px + 13 * u, H * 0.6, 6.4 * u, 11 * u, -0.9, 0, Math.PI * 2); ctx.fill();
  // head
  const hy = H * 0.37;
  for (const d of [-1, 1]) { ctx.fillStyle = B; ctx.beginPath(); ctx.arc(px + d * 13 * u, hy - 12 * u, 6 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = Wt; ctx.beginPath(); ctx.ellipse(px, hy, 18 * u, 15 * u, 0, 0, Math.PI * 2); ctx.fill();
  for (const d of [-1, 1]) { ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(px + d * 7 * u, hy - 1 * u, 4.4 * u, 6 * u, d * -0.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = Wt; ctx.beginPath(); ctx.arc(px + d * 6.4 * u, hy - 2 * u, 1.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = B; ctx.beginPath(); ctx.arc(px + d * 6.4 * u, hy - 2 * u, 0.8 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(px, hy + 5 * u, 2.8 * u, 1.8 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = B; ctx.lineWidth = 0.9 * u; ctx.beginPath(); ctx.moveTo(px, hy + 6.6 * u); ctx.lineTo(px, hy + 8.6 * u); ctx.quadraticCurveTo(px - 2.4 * u, hy + 10 * u, px - 4 * u, hy + 8.6 * u); ctx.moveTo(px, hy + 8.6 * u); ctx.quadraticCurveTo(px + 2.4 * u, hy + 10 * u, px + 4 * u, hy + 8.6 * u); ctx.stroke();
  ctx.fillStyle = '#f0b0b8'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(px + d * 11 * u, hy + 6 * u, 2.4 * u, 1.4 * u, 0, 0, Math.PI * 2); ctx.fill(); }
}

// The Great Wall winding over autumn hills at sunset, watchtowers on the ridges.
function chnGreatWall(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6); sky.addColorStop(0, '#5a7ab8'); sky.addColorStop(0.6, '#f0a878'); sky.addColorStop(1, '#f8d494');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffe6a0'; ctx.beginPath(); ctx.arc(W * 0.78, H * 0.36, 6 * u, 0, Math.PI * 2); ctx.fill();
  const far = (y0, amp, f, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let k = 0; k <= 40; k++) { const t = k / 40; ctx.lineTo(W * t, H * (y0 - amp * (Math.sin(t * f) * 0.6 + Math.sin(t * f * 2.3 + 1) * 0.4))); } ctx.lineTo(W, H); ctx.fill(); };
  far(0.42, 0.06, 7, '#9a8ab0'); far(0.5, 0.08, 5, '#b47a6a');
  // the near hill, its ridge carrying the wall
  const ridge = (t) => H * (0.6 - 0.1 * Math.sin(Math.PI * 2 * (t * 0.95) + 0.3) - 0.035 * Math.sin(Math.PI * 2 * t * 2.2 + 1));
  ctx.fillStyle = '#c8682e'; ctx.beginPath(); ctx.moveTo(0, H); for (let k = 0; k <= 60; k++) ctx.lineTo((W * k) / 60, ridge(k / 60) + 1 * u); ctx.lineTo(W, H); ctx.fill();
  ctx.fillStyle = '#a8501e'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H * 0.84); ctx.quadraticCurveTo(W * 0.3, H * 0.74, W * 0.55, H * 0.9); ctx.quadraticCurveTo(W * 0.8, H * 1.0, W, H * 0.82); ctx.lineTo(W, H); ctx.fill();
  ctx.fillStyle = '#e8a03a'; for (let k = 0; k < 44; k++) { const t = ((k * 37) % 100) / 100; ctx.beginPath(); ctx.arc(W * t, ridge(t) + (6 + ((k * 23) % 40)) * u, (1.4 + (k % 3)) * u, 0, Math.PI * 2); ctx.fill(); }
  // the wall along the ridge: a stone band, the walkway, crenellations
  const pts = []; for (let k = 0; k <= 80; k++) { const t = k / 80; pts.push([W * t, ridge(t) - 1 * u]); }
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#7a6a54'; ctx.lineWidth = 6 * u; ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(a, b) : ctx.moveTo(a, b))); ctx.stroke();
  ctx.strokeStyle = '#d2bf98'; ctx.lineWidth = 2.4 * u; ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(a, b - 1.6 * u) : ctx.moveTo(a, b - 1.6 * u))); ctx.stroke();
  ctx.fillStyle = '#7a6a54'; pts.forEach(([a, b], i) => { if (i % 2 === 0) ctx.fillRect(a - 0.9 * u, b - 5.4 * u, 1.8 * u, 2.4 * u); });
  // watchtowers on the high points: a square tower, crenellated, one arched door
  for (const t of [0.08, 0.3, 0.6, 0.86]) {
    const a = W * t, b = ridge(t) - 1 * u;
    ctx.fillStyle = '#a8977c'; ctx.fillRect(a - 5 * u, b - 13 * u, 10 * u, 13 * u);
    ctx.fillStyle = '#8a7a62'; ctx.fillRect(a + 1.4 * u, b - 13 * u, 3.6 * u, 13 * u);
    ctx.fillStyle = '#7a6a54'; ctx.fillRect(a - 5.6 * u, b - 13.6 * u, 11.2 * u, 1.4 * u); for (let k = 0; k < 4; k++) ctx.fillRect(a - 5.6 * u + k * 3.2 * u, b - 16 * u, 1.8 * u, 2.6 * u);
    ctx.fillStyle = '#3a2e24'; roundRect(ctx, a - 1.6 * u, b - 7.6 * u, 3.2 * u, 7 * u, 1.6 * u); ctx.fill();
  }
}

// Letter scenes for the Chinese postcard.
const CHINA_SCENES = [
  (c, w, h) => { c.fillStyle = '#b81f24'; c.fillRect(0, 0, w, h); for (let k = 0; k < 3; k++) { const y = h * (0.18 + k * 0.32); c.fillStyle = '#e8b448'; c.fillRect(w * 0.44, y - h * 0.1, w * 0.12, h * 0.04); c.fillStyle = '#ff5a3a'; c.beginPath(); c.ellipse(w * 0.5, y + h * 0.04, w * 0.3, h * 0.11, 0, 0, Math.PI * 2); c.fill(); } }, // lanterns
  (c, w, h) => { c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.strokeStyle = '#1f3c8a'; c.lineWidth = w * 0.08; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(w * (k % 2 ? 0.7 : 0.3), h * (0.15 + k * 0.24), w * 0.2, 0, Math.PI * 1.5); c.stroke(); } }, // porcelain scrolls
  (c, w, h) => { c.fillStyle = '#cfe6c8'; c.fillRect(0, 0, w, h); c.fillStyle = '#4f8a3f'; for (const x of [0.2, 0.55, 0.85]) c.fillRect(w * x, 0, w * 0.1, h); c.fillStyle = '#3f7a34'; for (let k = 0; k < 6; k++) c.fillRect(w * (0.15 + (k % 3) * 0.33), h * (0.12 + Math.floor(k / 3) * 0.4), w * 0.24, h * 0.04); }, // bamboo
  (c, w, h) => { c.fillStyle = '#f0a878'; c.fillRect(0, 0, w, h); c.fillStyle = '#c8682e'; c.fillRect(0, h * 0.62, w, h); c.fillStyle = '#c9b490'; c.fillRect(0, h * 0.5, w, h * 0.08); for (let k = 0; k < 4; k++) c.fillRect(w * k * 0.28, h * 0.44, w * 0.12, h * 0.06); }, // wall
  (c, w, h) => { c.fillStyle = '#4a2342'; c.fillRect(0, 0, w, h); for (let k = 0; k < 5; k++) { c.fillStyle = '#f0a8b8'; c.beginPath(); c.arc(w * (0.25 + (k % 2) * 0.5), h * (0.12 + k * 0.19), w * 0.16, 0, Math.PI * 2); c.fill(); } }, // plum blossom
];
function chnPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'CHINA', CHINA_SCENES); }


// --- East Asia, second set ---

// Hangeul strokes, in a unit box: polylines, or {c: [x, y, r]} for the circles.
const JAMO = [
  [[[0.15, 0.2], [0.8, 0.2], [0.8, 0.85]]],                                                                   // ㄱ
  [[[0.2, 0.15], [0.2, 0.8], [0.85, 0.8]]],                                                                   // ㄴ
  [[[0.85, 0.2], [0.2, 0.2], [0.2, 0.8], [0.85, 0.8]]],                                                       // ㄷ
  [[[0.2, 0.18], [0.8, 0.18], [0.8, 0.5], [0.2, 0.5], [0.2, 0.82], [0.84, 0.82]]],                            // ㄹ
  [[[0.2, 0.2], [0.8, 0.2], [0.8, 0.8], [0.2, 0.8], [0.2, 0.2]]],                                             // ㅁ
  [[[0.2, 0.12], [0.2, 0.84], [0.8, 0.84], [0.8, 0.12]], [[0.2, 0.48], [0.8, 0.48]]],                         // ㅂ
  [[[0.5, 0.15], [0.15, 0.85]], [[0.48, 0.42], [0.85, 0.85]]],                                                // ㅅ
  [{ c: [0.5, 0.5, 0.32] }],                                                                                  // ㅇ
  [[[0.15, 0.2], [0.85, 0.2]], [[0.5, 0.2], [0.15, 0.85]], [[0.48, 0.45], [0.85, 0.85]]],                     // ㅈ
  [[[0.5, 0.04], [0.5, 0.18]], [[0.15, 0.3], [0.85, 0.3]], [[0.5, 0.3], [0.15, 0.9]], [[0.48, 0.55], [0.85, 0.9]]], // ㅊ
  [[[0.15, 0.2], [0.8, 0.2], [0.8, 0.85]], [[0.15, 0.52], [0.8, 0.52]]],                                      // ㅋ
  [[[0.85, 0.2], [0.2, 0.2], [0.2, 0.8], [0.85, 0.8]], [[0.2, 0.5], [0.8, 0.5]]],                             // ㅌ
  [[[0.12, 0.2], [0.88, 0.2]], [[0.35, 0.2], [0.35, 0.8]], [[0.65, 0.2], [0.65, 0.8]], [[0.12, 0.8], [0.88, 0.8]]], // ㅍ
  [[[0.38, 0.08], [0.62, 0.08]], [[0.15, 0.27], [0.85, 0.27]], { c: [0.5, 0.63, 0.22] }],                     // ㅎ
  [[[0.4, 0.1], [0.4, 0.9]], [[0.4, 0.5], [0.78, 0.5]]],                                                      // ㅏ
  [[[0.6, 0.1], [0.6, 0.9]], [[0.22, 0.5], [0.6, 0.5]]],                                                      // ㅓ
  [[[0.1, 0.68], [0.9, 0.68]], [[0.5, 0.3], [0.5, 0.68]]],                                                    // ㅗ
  [[[0.1, 0.32], [0.9, 0.32]], [[0.5, 0.32], [0.5, 0.72]]],                                                   // ㅜ
];

// Hangeul: the fourteen consonants and four vowels of the Korean alphabet, one to a tile, the tiles in the five
// traditional colours (obangsaek), a border striped in the same five.
function korHangeul(ctx, W, H) {
  const C = { blue: '#2a5aa8', red: '#c8323a', yellow: '#f0c040', white: '#f2ece0', black: '#1e1e24', paper: '#e8dcc0' };
  const tiles = [C.blue, C.red, C.yellow, C.white, C.black];
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.black; x.fillRect(0, 0, cols, rows);
    [C.blue, C.red, C.yellow, C.white].forEach((col, k) => { x.fillStyle = col; x.fillRect(3 + k, 3 + k, cols - 6 - 2 * k, rows - 6 - 2 * k); });
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.fillStyle = C.black; x.fillRect(fx - 1, fy - 1, fw + 2, fh + 2);
    const nc = 6, nr = 3, tw = fw / nc, th = fh / nr;
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const bg = tiles[(i + j * 2) % 5], ink = bg === C.yellow || bg === C.white ? C.black : C.white;
      const a = Math.round(fx + i * tw), b = Math.round(fy + j * th), w = Math.round(fx + (i + 1) * tw) - a - 1, h = Math.round(fy + (j + 1) * th) - b - 1;
      x.fillStyle = bg; x.fillRect(a, b, w, h);
      const box = Math.min(w, h) * 0.66, ox = a + (w - box) / 2, oy = b + (h - box) / 2;
      x.strokeStyle = ink; x.lineWidth = box * 0.13; x.lineCap = 'square'; x.lineJoin = 'miter';
      for (const st of JAMO[j * nc + i]) {
        x.beginPath();
        if (st.c) x.arc(ox + st.c[0] * box, oy + st.c[1] * box, st.c[2] * box, 0, Math.PI * 2);
        else st.forEach(([px, py], k) => (k ? x.lineTo(ox + px * box, oy + py * box) : x.moveTo(ox + px * box, oy + py * box)));
        x.stroke();
      }
    }
  });
}

// Najeon: mother-of-pearl inlaid in black lacquer. A scroll of chrysanthemums and leaves, every piece of shell
// catching a different colour, inside a border of pearl lines and little diamonds.
function korNajeon(ctx, W, H) {
  const C = { black: '#111114', black2: '#19181e', pearl: '#eef0ea', pink: '#e6c4cf', mint: '#c2e4d4', lilac: '#c6c4ec', sky: '#b4d8ea', gold: '#b89a5a' };
  const iri = [C.pearl, C.sky, C.mint, C.pearl, C.pink, C.lilac];
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    const col = (px, py) => iri[Math.floor((Math.sin(px * 0.05) + Math.cos(py * 0.07 + px * 0.012) + 2) * 1.5) % iri.length];
    x.fillStyle = C.gold; x.fillRect(0, 0, cols, rows); x.fillStyle = C.black; x.fillRect(2, 2, cols - 4, rows - 4);
    const line = (o) => { x.fillStyle = C.pearl; x.fillRect(o, o, cols - 2 * o, 1); x.fillRect(o, rows - 1 - o, cols - 2 * o, 1); x.fillRect(o, o, 1, rows - 2 * o); x.fillRect(cols - 1 - o, o, 1, rows - 2 * o); };
    line(4); line(11);
    const dia = (px, py) => { x.fillStyle = col(px, py); x.beginPath(); x.moveTo(px, py - 2.2); x.lineTo(px + 2.2, py); x.lineTo(px, py + 2.2); x.lineTo(px - 2.2, py); x.closePath(); x.fill(); };
    for (const [len, put] of [[cols - 16, (a) => { dia(8 + a, 7.5); dia(8 + a, rows - 7.5); }], [rows - 16, (a) => { dia(7.5, 8 + a); dia(cols - 7.5, 8 + a); }]]) { const { n, d } = evenSteps(len, 7); for (let i = 0; i <= n; i++) put(i * d); }
    const fx = 12, fy = 12, fw = cols - 24, fh = rows - 24;
    for (let y = fy; y < fy + fh; y++) if (Math.floor((y - fy) / 9) % 3 === 1) { x.fillStyle = C.black2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const nr = 3, P = fw / 3.5;
    for (let j = 0; j < nr; j++) {
      const y0 = fy + (j + 0.5) * fh / nr, A = (fh / nr) * 0.26, ph = j % 2 ? Math.PI : 0;
      const vy = (px) => y0 + A * Math.sin(((px - fx) / P) * Math.PI * 2 + ph);
      x.strokeStyle = C.pearl; x.lineWidth = 1.4; x.beginPath(); for (let px = fx - 2; px < fx + fw + 2; px += 1) px > fx - 2 ? x.lineTo(px, vy(px)) : x.moveTo(px, vy(px)); x.stroke();
      for (let k = -1; k < 8; k++) {
        const px = fx + P * (k * 0.5 + 0.25 - ph / (Math.PI * 4)), up = Math.sin(((px - fx) / P) * Math.PI * 2 + ph) > 0 ? 1 : -1, py = vy(px) + up * A * 0.25;
        rosette(x, px, py, 7.5, 16, col(px, py), C.black, col(px + 9, py));
        rosette(x, px, py, 4.2, 10, col(px + 20, py + 10), C.black, C.pearl);
        const mx = px + P * 0.25, my = vy(mx);
        leaf(x, mx, my, 12, -Math.PI / 2 - 0.5, col(mx, my - 6)); leaf(x, mx, my, 12, Math.PI / 2 + 0.5, col(mx + 5, my));
      }
    }
    x.restore();
  });
}

// Sipjangsaeng: the ten symbols of long life in one folk painting. The sun, clouds, blue-green mountains, water,
// rocks, pines, a turtle, deer, cranes and the mushroom of immortality.
function korLongevity(ctx, W, H) {
  const C = { silk: '#efe2c0', silk2: '#e8d8b0', sun: '#d03a2a', cloud: '#f8f4ea', cloudline: '#b8a878', blue: '#2f5f8f', teal: '#3f8a8a', green: '#5a9a5a', mint: '#a8d0b0',
    pine: '#2a5a3a', trunk: '#6a4a32', water: '#3a6aa8', deer: '#b8743a', black: '#1e1e22', red: '#c8302a', rock: '#8a8a90', turtle: '#5a7a3a', frame: '#7a2a24', frame2: '#d6b25a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.frame; x.fillRect(0, 0, cols, rows); x.fillStyle = C.frame2; x.fillRect(3, 3, cols - 6, rows - 6); x.fillStyle = C.frame; x.fillRect(4, 4, cols - 8, rows - 8); x.fillStyle = C.frame2; x.fillRect(6, 6, cols - 12, rows - 12);
    const fx = 7, fy = 7, fw = cols - 14, fh = rows - 14, X = (t) => fx + fw * t, Y = (t) => fy + fh * t;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 10) % 3 === 1 ? C.silk2 : C.silk; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.sun; x.beginPath(); x.arc(X(0.12), Y(0.18), fh * 0.1, 0, Math.PI * 2); x.fill();
    const cloud = (cx, cy, s) => { for (const [dx, dy, r] of [[-1, 0.2, 0.7], [0, -0.2, 0.9], [1, 0.1, 0.75], [1.8, 0.35, 0.5], [-1.8, 0.35, 0.5]]) { x.fillStyle = C.cloudline; x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s + 1, 0, Math.PI * 2); x.fill(); } for (const [dx, dy, r] of [[-1, 0.2, 0.7], [0, -0.2, 0.9], [1, 0.1, 0.75], [1.8, 0.35, 0.5], [-1.8, 0.35, 0.5]]) { x.fillStyle = C.cloud; x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s, 0, Math.PI * 2); x.fill(); } };
    cloud(X(0.38), Y(0.12), 5); cloud(X(0.66), Y(0.09), 6); cloud(X(0.88), Y(0.24), 4.4);
    const peak = (cx, h, w) => {
      const base = Y(0.68);
      x.fillStyle = C.blue; x.beginPath(); x.moveTo(cx - w / 2, base); x.quadraticCurveTo(cx - w * 0.18, base - h * 0.55, cx, base - h); x.quadraticCurveTo(cx + w * 0.18, base - h * 0.55, cx + w / 2, base); x.closePath(); x.fill();
      x.fillStyle = C.teal; x.beginPath(); x.moveTo(cx - w * 0.1, base); x.quadraticCurveTo(cx - w * 0.04, base - h * 0.55, cx, base - h); x.quadraticCurveTo(cx + w * 0.18, base - h * 0.55, cx + w / 2, base); x.closePath(); x.fill();
      x.fillStyle = C.green; x.beginPath(); x.moveTo(cx - w * 0.36, base); x.quadraticCurveTo(cx - w * 0.1, base - h * 0.25, cx - w * 0.04, base - h * 0.45); x.lineTo(cx + w * 0.06, base - h * 0.3); x.quadraticCurveTo(cx + w * 0.2, base - h * 0.15, cx + w * 0.4, base); x.closePath(); x.fill();
      x.strokeStyle = C.mint; x.lineWidth = 1; x.beginPath(); x.moveTo(cx, base - h); x.quadraticCurveTo(cx + w * 0.02, base - h * 0.5, cx + w * 0.12, base - h * 0.2); x.stroke();
    };
    peak(X(0.3), fh * 0.34, fw * 0.16); peak(X(0.8), fh * 0.32, fw * 0.15); peak(X(0.43), fh * 0.48, fw * 0.17); peak(X(0.67), fh * 0.46, fw * 0.17); peak(X(0.55), fh * 0.6, fw * 0.2);
    // the ground and the water
    x.fillStyle = C.green; x.beginPath(); x.moveTo(fx, Y(0.66)); x.quadraticCurveTo(X(0.5), Y(0.62), X(1), Y(0.67)); x.lineTo(X(1), Y(0.8)); x.lineTo(fx, Y(0.8)); x.fill();
    x.fillStyle = C.mint; for (let k = 0; k < 18; k++) x.fillRect(X(((k * 37) % 100) / 100), Y(0.69 + (k % 4) * 0.025), 2, 1);
    x.fillStyle = C.water; x.fillRect(fx, Y(0.8), fw, fh * 0.2);
    x.strokeStyle = C.cloud; x.lineWidth = 1;
    for (let r = 0; r < 3; r++) for (let k = -1; k < 14; k++) { const cx = X(k / 13) + (r % 2) * fw / 26, cy = Y(0.84 + r * 0.055); x.beginPath(); x.arc(cx, cy, 3.4, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); }
    // rocks and the turtle, bottom left
    x.fillStyle = C.rock; x.beginPath(); x.ellipse(X(0.12), Y(0.82), fw * 0.08, fh * 0.07, 0, 0, Math.PI * 2); x.fill();
    const tx = X(0.12), ty = Y(0.77);
    x.fillStyle = C.turtle; x.beginPath(); x.ellipse(tx, ty, 7, 4.2, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(tx + 8, ty + 0.5, 2.4, 1.8, 0, 0, Math.PI * 2); x.fill();
    for (const [dx, dy] of [[-5, 3], [4, 3.4]]) x.fillRect(tx + dx, ty + dy, 2, 2);
    x.strokeStyle = C.mint; x.lineWidth = 0.7; x.beginPath(); x.moveTo(tx - 5, ty); x.lineTo(tx + 5, ty); x.moveTo(tx, ty - 3.6); x.lineTo(tx, ty + 3.6); x.stroke();
    x.strokeStyle = C.cloud; x.lineWidth = 0.8; x.beginPath(); x.moveTo(tx - 7, ty - 1); x.bezierCurveTo(tx - 12, ty - 4, tx - 10, ty - 10, tx - 14, ty - 12); x.stroke();     // its long-life tail of mist
    // pine on the right
    x.strokeStyle = C.trunk; x.lineCap = 'round'; x.lineWidth = 4; x.beginPath(); x.moveTo(X(0.9), Y(0.82)); x.bezierCurveTo(X(0.86), Y(0.6), X(0.94), Y(0.45), X(0.86), Y(0.32)); x.stroke();
    x.lineWidth = 2; x.beginPath(); x.moveTo(X(0.88), Y(0.5)); x.lineTo(X(0.78), Y(0.44)); x.stroke();
    for (const [a, b, w] of [[0.86, 0.3, 9], [0.78, 0.42, 8], [0.93, 0.42, 7], [0.9, 0.56, 6]]) { x.fillStyle = C.pine; x.beginPath(); x.ellipse(X(a), Y(b), w, w * 0.45, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = C.green; x.beginPath(); x.ellipse(X(a) - 1, Y(b) - w * 0.15, w * 0.7, w * 0.22, 0, 0, Math.PI * 2); x.fill(); }
    // two deer on the meadow
    const deer = (dx, dy, f, stag) => {
      x.save(); x.translate(dx, dy); x.scale(f, 1);
      x.strokeStyle = C.deer; x.lineWidth = 1.3; x.lineCap = 'round';
      for (const lx of [-4, -2.6, 3, 4.4]) { x.beginPath(); x.moveTo(lx, 1); x.lineTo(lx + (lx > 0 ? 0.6 : -0.4), 7); x.stroke(); }
      x.fillStyle = C.deer; x.beginPath(); x.ellipse(0, 0, 6, 3, 0, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.moveTo(4, -1); x.lineTo(7, -6); x.lineTo(9, -5.4); x.lineTo(6.6, 0.6); x.fill();
      x.beginPath(); x.ellipse(8.6, -6.2, 2.4, 1.3, 0.4, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.cloud; for (const [sx, sy] of [[-3, -1], [0, -1.4], [2.6, -0.6], [-1.4, 0.8]]) x.fillRect(sx, sy, 1, 1);
      if (stag) { x.strokeStyle = C.trunk; x.lineWidth = 0.8; x.beginPath(); x.moveTo(8, -7); x.lineTo(7, -11); x.moveTo(7.4, -9.4); x.lineTo(5.6, -10); x.moveTo(9, -7); x.lineTo(10.4, -10.6); x.stroke(); }
      x.restore();
    };
    deer(X(0.36), Y(0.71), 1, true); deer(X(0.52), Y(0.73), -1, false);
    // mushrooms of immortality by the deer
    for (const [a, b] of [[0.45, 0.76], [0.47, 0.75], [0.62, 0.74]]) { x.fillStyle = C.red; x.beginPath(); x.ellipse(X(a), Y(b), 2.6, 1.6, 0, Math.PI, 0); x.fill(); x.fillStyle = C.trunk; x.fillRect(X(a) - 0.4, Y(b), 0.9, 2.4); }
    // cranes
    const cc = { white: C.cloud, black: C.black };
    inlaidCrane(x, X(0.24), Y(0.36), 22, -0.25, cc); inlaidCrane(x, X(0.74), Y(0.2), 18, Math.PI + 0.2, cc);
    x.fillStyle = C.red; x.fillRect(X(0.24) + 10, Y(0.36) - 3.4, 1.2, 1.2);
    x.restore();
  });
}

// The Lotus Lantern Festival: strings of paper lotus lanterns glowing over a temple at night.
function korLanterns(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0d1236'); sky.addColorStop(1, '#2f2a66');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  // the temple roof at the bottom, its doors lit
  const ry = H * 0.8;
  ctx.fillStyle = '#f4c97a'; ctx.fillRect(W * 0.12, ry, W * 0.76, H - ry);
  ctx.fillStyle = '#5a3424'; for (let k = 0; k <= 8; k++) ctx.fillRect(W * (0.12 + k * 0.095) - 1 * u, ry, 2 * u, H - ry);
  ctx.fillStyle = '#2f6b5a'; ctx.fillRect(W * 0.1, ry - 3 * u, W * 0.8, 3.4 * u);
  ctx.fillStyle = '#16151e'; ctx.beginPath(); ctx.moveTo(-W * 0.02, ry - 12 * u); ctx.quadraticCurveTo(W * 0.1, ry - 2 * u, W * 0.3, ry - 2.6 * u); ctx.lineTo(W * 0.7, ry - 2.6 * u); ctx.quadraticCurveTo(W * 0.9, ry - 2 * u, W * 1.02, ry - 12 * u); ctx.lineTo(W * 0.78, ry - 20 * u); ctx.lineTo(W * 0.22, ry - 20 * u); ctx.closePath(); ctx.fill();
  const COLS = [['#f07a9a', '#fff0f4'], ['#f6c84a', '#fff6d0'], ['#e0403a', '#ffd8c8'], ['#5ab86a', '#e8ffe8'], ['#4a8ae0', '#e0eeff'], ['#f4f0e8', '#f8a8c0']];
  const lantern = (cx, cy, r, [col, tip]) => {
    ctx.fillStyle = 'rgba(255,200,120,.13)'; ctx.beginPath(); ctx.arc(cx, cy, r * 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    for (let k = 0; k < 3; k++) {
      const py = cy - r * 0.55 + k * r * 0.5, n = 3 + k, pw = (r * 1.9) / n, ph = r * 0.75;
      for (let i = 0; i < n; i++) {
        const px = cx - r * 0.95 + pw * (i + 0.5);
        ctx.fillStyle = col; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 0.4 * u;
        ctx.beginPath(); ctx.moveTo(px - pw / 2, py + ph * 0.4); ctx.quadraticCurveTo(px - pw / 2, py - ph * 0.2, px, py - ph * 0.6); ctx.quadraticCurveTo(px + pw / 2, py - ph * 0.2, px + pw / 2, py + ph * 0.4); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = tip; ctx.beginPath(); ctx.moveTo(px - pw * 0.18, py - ph * 0.36); ctx.lineTo(px, py - ph * 0.6); ctx.lineTo(px + pw * 0.18, py - ph * 0.36); ctx.closePath(); ctx.fill();
      }
    }
    ctx.fillStyle = '#3f8a3a'; ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.9, r * 0.6, r * 0.22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f4f0e8'; ctx.fillRect(cx - r * 0.18, cy + r, r * 0.36, r * 0.9); ctx.fillStyle = '#c8323a'; ctx.fillRect(cx - r * 0.06, cy + r * 1.1, r * 0.12, r * 0.6);
  };
  const strings = [[H * 0.08, 6, 7.4], [H * 0.3, 7, 6.2], [H * 0.5, 9, 5]];
  strings.forEach(([y0, n, r], s) => {
    const yAt = (px) => y0 + 7 * u * Math.sin((px / W) * Math.PI);
    ctx.strokeStyle = '#6a5a7a'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); for (let px = 0; px <= W; px += 2 * u) px ? ctx.lineTo(px, yAt(px)) : ctx.moveTo(px, yAt(px)); ctx.stroke();
    for (let i = 0; i < n; i++) { const px = (W * (i + 0.5)) / n + (s % 2) * W / (2 * n) - W / (4 * n); lantern(px, yAt(px) + r * u * 1.4, r * u, COLS[(i + s * 2) % COLS.length]); }
  });
}

// Bibimbap in a hot stone bowl, seen from above: rice under spinach, carrot, bean sprouts, mushrooms, courgette,
// beef and bracken, a fried egg and a spoon of gochujang in the middle; side dishes, spoon and chopsticks.
function korBibimbap(ctx, W, H) {
  const u = H / 100, cx = W * 0.5, cy = H * 0.52;
  ctx.fillStyle = '#7a4e30'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#6a4228'; for (let k = 0; k < 7; k++) ctx.fillRect(0, (H * k) / 7, W, 0.8 * u);
  ctx.fillStyle = '#8a5c3a'; for (let k = 0; k < 30; k++) ctx.fillRect(((k * 41) % 100) / 100 * W, ((k * 23) % 100) / 100 * H, 9 * u, 0.5 * u);
  // the trivet and the stone bowl
  ctx.fillStyle = '#c49a62'; ctx.beginPath(); ctx.arc(cx, cy, 44 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1e1c1e'; ctx.beginPath(); ctx.arc(cx, cy, 40 * u, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#4a464c'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.arc(cx, cy, 38 * u, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#f4f0e6'; ctx.beginPath(); ctx.arc(cx, cy, 35 * u, 0, Math.PI * 2); ctx.fill();
  // toppings in wedges
  const T = [['#3f7a2a', '#2a5a1e'], ['#ee7a2a', '#f8a85a'], ['#f2e6b0', '#e8c860'], ['#6a4a2e', '#8a6a48'], ['#a8c86a', '#7aa04a'], ['#4a2a20', '#6a3e2c'], ['#8a6a3a', '#6a4e28']];
  T.forEach(([c1, c2], k) => {
    const a0 = -Math.PI / 2 + (k * Math.PI * 2) / T.length, a1 = a0 + (Math.PI * 2) / T.length;
    ctx.fillStyle = c1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 31 * u, a0 + 0.05, a1 - 0.05); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = c2; ctx.lineWidth = 0.9 * u; ctx.lineCap = 'round';
    for (let s = 0; s < 9; s++) { const a = a0 + 0.18 + ((a1 - a0 - 0.36) * s) / 8, r0 = (14 + (s % 3) * 5) * u; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a + 0.12) * (r0 + 7 * u), cy + Math.sin(a + 0.12) * (r0 + 7 * u)); ctx.stroke(); }
  });
  // the egg, the gochujang, sesame
  ctx.fillStyle = '#fbf8f0'; ctx.beginPath(); for (let k = 0; k <= 16; k++) { const a = (k / 16) * Math.PI * 2, r = (13 + ((k * 7) % 3)) * u; k ? ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f6b822'; ctx.beginPath(); ctx.arc(cx - 1 * u, cy - 1 * u, 5.4 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fbe08a'; ctx.beginPath(); ctx.arc(cx - 2.6 * u, cy - 2.6 * u, 1.6 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#c8281e'; ctx.beginPath(); ctx.ellipse(cx + 9 * u, cy + 8 * u, 5 * u, 3.6 * u, 0.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f4ead0'; for (let k = 0; k < 26; k++) ctx.fillRect(cx + (((k * 37) % 50) - 25) * u, cy + (((k * 53) % 50) - 25) * u, 0.9 * u, 0.6 * u);
  // side dishes and cutlery
  const bowl = (bx, by, r, food, food2) => { ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = food; ctx.beginPath(); ctx.arc(bx, by, r * 0.72, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = food2; for (let k = 0; k < 6; k++) { const a = k * 1.1; ctx.beginPath(); ctx.ellipse(bx + Math.cos(a) * r * 0.36, by + Math.sin(a) * r * 0.36, r * 0.2, r * 0.1, a, 0, Math.PI * 2); ctx.fill(); } };
  bowl(W * 0.13, H * 0.22, 12 * u, '#d8402a', '#f4e8c8'); bowl(W * 0.13, H * 0.78, 11 * u, '#e8d88a', '#a8c86a'); bowl(W * 0.86, H * 0.2, 10 * u, '#3f7a2a', '#a8d06a');
  ctx.strokeStyle = '#c8ccd2'; ctx.lineCap = 'round'; ctx.lineWidth = 2 * u;
  ctx.beginPath(); ctx.moveTo(W * 0.84, H * 0.42); ctx.lineTo(W * 0.84, H * 0.94); ctx.moveTo(W * 0.88, H * 0.42); ctx.lineTo(W * 0.88, H * 0.94); ctx.stroke();
  ctx.lineWidth = 2.4 * u; ctx.beginPath(); ctx.moveTo(W * 0.93, H * 0.58); ctx.lineTo(W * 0.93, H * 0.94); ctx.stroke();
  ctx.fillStyle = '#c8ccd2'; ctx.beginPath(); ctx.ellipse(W * 0.93, H * 0.5, 3.4 * u, 6 * u, 0, 0, Math.PI * 2); ctx.fill();
}

// Shibori: indigo cloth tie-dyed. Spider-web circles (kumo) across the middle, pole-wrapped storm stripes
// (arashi) at both ends.
function japShibori(ctx, W, H) {
  const C = { deep: '#14234a', indigo: '#1f3870', mid: '#3f5f9a', pale: '#9ab2d6', white: '#e6edf4' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.indigo; x.fillRect(0, 0, cols, rows);
    const band = Math.round(cols * 0.18);
    for (let yy = 0; yy < rows; yy++) for (let xx = 0; xx < cols; xx++) {
      if (xx >= band && xx < cols - band) continue;
      const s = (xx + yy * 0.8 + 1.8 * Math.sin(yy * 0.25 + xx * 0.05)) / 3.4, k = Math.floor(s) % 4, f = s % 1;
      x.fillStyle = k === 0 ? (f < 0.5 ? C.white : C.pale) : k === 2 ? C.mid : k === 3 ? C.deep : C.indigo;
      x.fillRect(xx, yy, 1, 1);
    }
    x.fillStyle = C.pale; x.fillRect(band, 0, 1, rows); x.fillRect(cols - band - 1, 0, 1, rows);
    const mx0 = band + 3, mw = cols - 2 * band - 6, nr = 3, nc = 4;
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const cx = mx0 + (i + 0.5 + (j % 2 ? 0.25 : -0.25)) * mw / nc, cy = (j + 0.5) * rows / nr, R = Math.min(mw / nc, rows / nr) * 0.4;
      x.fillStyle = C.mid; x.beginPath(); x.arc(cx, cy, R * 1.12, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.indigo; x.beginPath(); x.arc(cx, cy, R * 0.95, 0, Math.PI * 2); x.fill();
      for (let k = 0; k < 18; k++) { const a = (k / 18) * Math.PI * 2; x.strokeStyle = k % 2 ? C.pale : C.white; x.lineWidth = 0.9; x.beginPath(); x.moveTo(cx + Math.cos(a) * R * 0.25, cy + Math.sin(a) * R * 0.25); x.lineTo(cx + Math.cos(a) * R * 0.98, cy + Math.sin(a) * R * 0.98); x.stroke(); }
      x.strokeStyle = C.pale; x.lineWidth = 1.2; x.beginPath(); x.arc(cx, cy, R * 0.7, 0, Math.PI * 2); x.stroke();
      x.fillStyle = C.white; x.beginPath(); x.arc(cx, cy, R * 0.28, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.mid; x.beginPath(); x.arc(cx, cy, R * 0.12, 0, Math.PI * 2); x.fill();
    }
  });
}

// A dry Zen garden seen from above: raked gravel in straight lines and in rings round three groups of rocks,
// moss at their feet, two fallen maple leaves, a wooden veranda edge.
function japZen(ctx, W, H) {
  const C = { gravel: '#dcd8cc', line: '#aaa496', rock: '#6a6a70', rock2: '#8c8c92', rock3: '#46464c', moss: '#5a8a3a', moss2: '#3f6a2a', wood: '#5a3a24', wood2: '#7a5232', red: '#c8402a', orange: '#e0782a' };
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.wood; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.wood2; for (let k = 1; k < 6; k += 2) { x.fillRect(k, k, cols - 2 * k, 1); x.fillRect(k, rows - 1 - k, cols - 2 * k, 1); x.fillRect(k, k, 1, rows - 2 * k); x.fillRect(cols - 1 - k, k, 1, rows - 2 * k); }
    const fx = 7, fy = 7, fw = cols - 14, fh = rows - 14;
    const rocks = [[0.24, 0.42, 11, 7], [0.31, 0.5, 5, 3.4], [0.7, 0.28, 8, 5], [0.62, 0.7, 13, 7.5], [0.71, 0.74, 5, 3.6]].map(([a, b, rx, ry]) => [fx + fw * a, fy + fh * b, rx, ry]);
    for (let yy = fy; yy < fy + fh; yy++) for (let xx = fx; xx < fx + fw; xx++) {
      let d = Infinity;
      for (const [cx, cy, rx, ry] of rocks) { const r = Math.hypot((xx + 0.5 - cx) / rx, (yy + 0.5 - cy) / ry); d = Math.min(d, (r - 1) * (rx + ry) / 2); }
      let col = C.gravel;
      if (d < 2.2) col = C.moss; else if (d < 16) col = Math.floor(d) % 3 === 0 ? C.line : C.gravel; else col = (yy - fy) % 3 === 1 ? C.line : C.gravel;
      x.fillStyle = col; x.fillRect(xx, yy, 1, 1);
    }
    for (const [cx, cy, rx, ry] of rocks) {
      x.fillStyle = C.rock3; x.beginPath(); x.ellipse(cx + 0.8, cy + 0.8, rx * 0.92, ry * 0.92, 0.2, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.rock; x.beginPath(); for (let k = 0; k < 9; k++) { const a = (k / 9) * Math.PI * 2, r = 0.82 + ((k * 7) % 4) * 0.05; k ? x.lineTo(cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r) : x.moveTo(cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r); } x.closePath(); x.fill();
      x.fillStyle = C.rock2; x.beginPath(); x.ellipse(cx - rx * 0.25, cy - ry * 0.3, rx * 0.4, ry * 0.32, -0.3, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.moss2; x.fillRect(cx + rx * 0.3, cy + ry * 0.4, 2, 1);
    }
    const maple = (cx, cy, col, rot) => { x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = col; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + ((k - 2) * Math.PI) / 4.2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a - 0.25) * 2, Math.sin(a - 0.25) * 2); x.lineTo(Math.cos(a) * 4.4, Math.sin(a) * 4.4); x.lineTo(Math.cos(a + 0.25) * 2, Math.sin(a + 0.25) * 2); x.closePath(); x.fill(); } x.fillRect(-0.4, 0, 0.8, 2.4); x.restore(); };
    maple(fx + fw * 0.44, fy + fh * 0.22, C.red, 0.4); maple(fx + fw * 0.86, fy + fh * 0.6, C.orange, -0.6);
  });
}

// A great wave rising over small boats, Mount Fuji tiny in the distance: after the 1831 woodblock print, in its
// Prussian blues on old paper.
function japGreatWave(ctx, W, H) {
  const u = H / 100, D = '#1f3a6a', M = '#3f6aa0', L = '#8ab0d0', F = '#f4f0e4';
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#d6c9a8'; ctx.fillRect(0, 0, W, H * 0.12);
  // Fuji, small and far
  ctx.fillStyle = '#4a5a7a'; ctx.beginPath(); ctx.moveTo(W * 0.52, H * 0.84); ctx.lineTo(W * 0.62, H * 0.66); ctx.lineTo(W * 0.66, H * 0.66); ctx.lineTo(W * 0.76, H * 0.84); ctx.fill();
  ctx.fillStyle = F; ctx.beginPath(); ctx.moveTo(W * 0.595, H * 0.705); ctx.lineTo(W * 0.62, H * 0.66); ctx.lineTo(W * 0.66, H * 0.66); ctx.lineTo(W * 0.685, H * 0.705); ctx.lineTo(W * 0.66, H * 0.69); ctx.lineTo(W * 0.64, H * 0.71); ctx.lineTo(W * 0.62, H * 0.69); ctx.closePath(); ctx.fill();
  // the sea
  ctx.fillStyle = M; ctx.fillRect(0, H * 0.84, W, H * 0.16);
  const hump = (x0, x1, top, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, H); ctx.quadraticCurveTo((x0 + x1) / 2, top, x1, H); ctx.fill(); };
  hump(W * 0.4, W * 0.8, H * 0.66, D); hump(W * 0.5, W * 0.72, H * 0.76, M);
  // the great wave
  ctx.fillStyle = D; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H * 0.58);
  ctx.bezierCurveTo(W * 0.08, H * 0.3, W * 0.22, H * 0.1, W * 0.42, H * 0.12);
  ctx.bezierCurveTo(W * 0.56, H * 0.13, W * 0.62, H * 0.24, W * 0.6, H * 0.36);
  ctx.bezierCurveTo(W * 0.55, H * 0.3, W * 0.5, H * 0.27, W * 0.45, H * 0.3);
  ctx.bezierCurveTo(W * 0.37, H * 0.36, W * 0.36, H * 0.6, W * 0.5, H * 0.9);
  ctx.lineTo(W * 0.5, H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = M; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.moveTo(W * 0.04, H * 0.6); ctx.bezierCurveTo(W * 0.12, H * 0.34, W * 0.24, H * 0.2, W * 0.4, H * 0.2); ctx.stroke();
  ctx.strokeStyle = L; ctx.lineWidth = 1.2 * u; for (const o of [0, 6, 12]) { ctx.beginPath(); ctx.moveTo(W * 0.08 + o * u, H * 0.66); ctx.bezierCurveTo(W * 0.16 + o * u, H * 0.42, W * 0.26 + o * u, H * 0.3, W * 0.38, H * 0.27 + o * 0.5 * u); ctx.stroke(); }
  // foam: a crest of white balls, claws hanging off the curl
  const crest = (t) => { const p0 = [W * 0.22, H * 0.11], p1 = [W * 0.4, H * 0.06], p2 = [W * 0.58, H * 0.14], p3 = [W * 0.6, H * 0.36]; const m = 1 - t; return [m ** 3 * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t ** 3 * p3[0], m ** 3 * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t ** 3 * p3[1]]; };
  for (let k = 0; k <= 22; k++) { const [px, py] = crest(k / 22); ctx.fillStyle = F; ctx.beginPath(); ctx.arc(px, py + 1.4 * u, (2.4 + (k % 2)) * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = L; ctx.beginPath(); ctx.arc(px + 0.8 * u, py + 2.4 * u, 0.9 * u, 0, Math.PI * 2); ctx.fill(); }
  for (let k = 0; k < 7; k++) { const t = 0.68 + k * 0.045, [px, py] = crest(t); ctx.strokeStyle = F; ctx.lineWidth = 1.6 * u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px - 3 * u, py + 4 * u, px - 6 * u, py + 3 * u); ctx.stroke(); }
  ctx.fillStyle = F; for (let k = 0; k < 26; k++) { const px = W * (0.4 + ((k * 31) % 30) / 100), py = H * (0.04 + ((k * 17) % 30) / 100); ctx.beginPath(); ctx.arc(px, py, 0.9 * u, 0, Math.PI * 2); ctx.fill(); }
  // boats riding the slopes, rowers bent low
  const boat = (bx, by, a, len) => { ctx.save(); ctx.translate(bx, by); ctx.rotate(a); ctx.fillStyle = '#e8d8b0'; ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.quadraticCurveTo(0, 4 * u, len / 2, -1.6 * u); ctx.lineTo(len / 2 - 2 * u, 0.6 * u); ctx.quadraticCurveTo(0, 2.6 * u, -len / 2, 0); ctx.fill(); ctx.fillStyle = '#2a2a3a'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(-len * 0.35 + k * len * 0.12, -0.4 * u, 1.1 * u, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); };
  boat(W * 0.25, H * 0.74, -0.5, 26 * u); boat(W * 0.84, H * 0.83, 0.15, 22 * u);
  // a second wave on the right
  ctx.fillStyle = D; ctx.beginPath(); ctx.moveTo(W, H); ctx.lineTo(W, H * 0.62); ctx.bezierCurveTo(W * 0.95, H * 0.56, W * 0.88, H * 0.58, W * 0.86, H * 0.66); ctx.bezierCurveTo(W * 0.85, H * 0.72, W * 0.8, H * 0.86, W * 0.74, H); ctx.closePath(); ctx.fill();
  for (let k = 0; k < 6; k++) { ctx.fillStyle = F; ctx.beginPath(); ctx.arc(W * (0.87 + k * 0.024), H * (0.62 - Math.sin((k / 5) * Math.PI) * 0.03), 1.8 * u, 0, Math.PI * 2); ctx.fill(); }
}

// Maneki-neko: the beckoning cat, a calico with one paw raised, a red collar and bell, holding a gold coin, on a
// purple cushion.
function japManekiNeko(ctx, W, H) {
  const u = H / 100, cx = W * 0.5, Wt = '#f8f4ec', B = '#1e1c20', O = '#e88a3a', P = '#f2a8b4';
  ctx.fillStyle = '#c8302a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#d8483a'; for (let j = 0; j < 6; j++) for (let i = 0; i < 10; i++) { const px = (i + (j % 2 ? 0.5 : 0) + 0.25) * W / 9.5, py = (j + 0.5) * H / 6; if (Math.abs(px - cx) > 34 * u) { ctx.beginPath(); ctx.ellipse(px, py, 2.6 * u, 3.6 * u, 0, 0, Math.PI * 2); ctx.fill(); } }
  // cushion
  ctx.fillStyle = '#6a3a8a'; roundRect(ctx, cx - 36 * u, H * 0.8, 72 * u, 16 * u, 5 * u); ctx.fill();
  ctx.fillStyle = '#8a5aaa'; roundRect(ctx, cx - 34 * u, H * 0.8, 68 * u, 5 * u, 3 * u); ctx.fill();
  ctx.fillStyle = '#e8b448'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + d * 35 * u, H * 0.82, 2.4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(cx + d * 35 * u - 0.8 * u, H * 0.82, 1.6 * u, 6 * u); }
  // body and raised paw
  ctx.fillStyle = Wt; ctx.beginPath(); ctx.ellipse(cx, H * 0.66, 20 * u, 21 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = O; ctx.beginPath(); ctx.ellipse(cx - 13 * u, H * 0.72, 6 * u, 9 * u, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = Wt; roundRect(ctx, cx + 20 * u, H * 0.14, 11 * u, 42 * u, 5.5 * u); ctx.fill(); ctx.fillStyle = '#e8ddd0'; ctx.fillRect(cx + 20 * u, H * 0.3, 11 * u, 0.8 * u);
  ctx.fillStyle = P; for (const [dx, dy, r] of [[25.5, 19, 2.4], [22.6, 16, 1.2], [25.5, 15, 1.2], [28.4, 16, 1.2]]) { ctx.beginPath(); ctx.arc(cx + dx * u, H * dy / 100, r * u, 0, Math.PI * 2); ctx.fill(); }
  // the koban coin held in the other paw
  ctx.fillStyle = '#b8862a'; ctx.beginPath(); ctx.ellipse(cx - 6 * u, H * 0.68, 9.6 * u, 13.6 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f0c654'; ctx.beginPath(); ctx.ellipse(cx - 6 * u, H * 0.68, 8.4 * u, 12.4 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#c8962e'; for (let k = -4; k <= 4; k++) ctx.fillRect(cx - 12 * u, H * 0.68 + k * 2.4 * u, 12 * u, 0.6 * u);
  ctx.fillStyle = Wt; ctx.beginPath(); ctx.ellipse(cx - 1 * u, H * 0.7, 5 * u, 4 * u, 0, 0, Math.PI * 2); ctx.fill();
  // head
  const hy = H * 0.34;
  for (const d of [-1, 1]) { ctx.fillStyle = d < 0 ? O : B; ctx.beginPath(); ctx.moveTo(cx + d * 17 * u, hy - 4 * u); ctx.lineTo(cx + d * 15 * u, hy - 19 * u); ctx.lineTo(cx + d * 5 * u, hy - 12 * u); ctx.fill(); ctx.fillStyle = P; ctx.beginPath(); ctx.moveTo(cx + d * 14.4 * u, hy - 6 * u); ctx.lineTo(cx + d * 14 * u, hy - 15 * u); ctx.lineTo(cx + d * 8 * u, hy - 11 * u); ctx.fill(); }
  ctx.fillStyle = Wt; ctx.beginPath(); ctx.ellipse(cx, hy, 19 * u, 15.5 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = O; ctx.beginPath(); ctx.ellipse(cx - 11 * u, hy - 7 * u, 6.4 * u, 5 * u, -0.4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(cx + 12 * u, hy - 8 * u, 5 * u, 4 * u, 0.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = B; ctx.lineWidth = 1.4 * u; ctx.lineCap = 'round';
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + d * 7 * u, hy - 1 * u, 3.2 * u, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
  ctx.fillStyle = P; ctx.beginPath(); ctx.moveTo(cx - 1.6 * u, hy + 3 * u); ctx.lineTo(cx + 1.6 * u, hy + 3 * u); ctx.lineTo(cx, hy + 5 * u); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx, hy + 5 * u); ctx.quadraticCurveTo(cx - 2 * u, hy + 7.4 * u, cx - 4 * u, hy + 6 * u); ctx.moveTo(cx, hy + 5 * u); ctx.quadraticCurveTo(cx + 2 * u, hy + 7.4 * u, cx + 4 * u, hy + 6 * u); ctx.stroke();
  ctx.lineWidth = 0.6 * u; for (const d of [-1, 1]) for (const k of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(cx + d * 8 * u, hy + 4 * u + k * u); ctx.lineTo(cx + d * 21 * u, hy + 2 * u + k * 2.4 * u); ctx.stroke(); }
  // collar and bell
  ctx.fillStyle = '#d8282a'; roundRect(ctx, cx - 15 * u, hy + 12.4 * u, 30 * u, 4 * u, 2 * u); ctx.fill();
  ctx.fillStyle = '#f0c040'; ctx.beginPath(); ctx.arc(cx, hy + 18.6 * u, 3.6 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#9a6a1a'; ctx.fillRect(cx - 2.6 * u, hy + 18.4 * u, 5.2 * u, 0.8 * u); ctx.beginPath(); ctx.arc(cx, hy + 20.4 * u, 0.8 * u, 0, Math.PI * 2); ctx.fill();
}

// The path of a thousand torii at Fushimi Inari: vermilion gates one behind the other, a tunnel down the hill to
// a bright opening.
function japTorii(ctx, W, H) {
  const u = H / 100, vx = W * 0.5, vy = H * 0.5;
  ctx.fillStyle = '#1f3a24'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2f5232'; for (let k = 0; k < 40; k++) { ctx.beginPath(); ctx.arc(((k * 37) % 100) / 100 * W, ((k * 53) % 100) / 100 * H, (4 + (k % 4) * 2) * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#fff2c8'; ctx.fillRect(vx - 4 * u, vy - 8 * u, 8 * u, 10 * u);
  ctx.fillStyle = '#9a9286'; ctx.beginPath(); ctx.moveTo(vx - 3 * u, vy + 2 * u); ctx.lineTo(vx + 3 * u, vy + 2 * u); ctx.lineTo(W * 0.72, H); ctx.lineTo(W * 0.28, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#b4ab98'; for (let k = 1; k < 12; k++) { const t = 1 / (1 + (12 - k) * 0.45), y = vy + 2 * u + (H - vy) * t, hw = 3 * u + (W * 0.22 - 3 * u) * t; ctx.fillRect(vx - hw, y, hw * 2, 0.6 * u); }
  const N = 16;
  for (let k = N; k >= 0; k--) {
    const z = 1 + k * 0.45, s = 1 / z, gy = vy + 2 * u + (H * 1.02 - vy - 2 * u) * s, gh = H * 0.98 * s, hw = W * 0.3 * s, pw = 6 * u * s, top = gy - gh;
    const shade = k / N;
    const ver = `rgb(${Math.round(226 - 60 * shade)},${Math.round(76 - 30 * shade)},${Math.round(40 - 14 * shade)})`;
    for (const d of [-1, 1]) {
      ctx.fillStyle = ver; ctx.fillRect(vx + d * hw - pw / 2, top + gh * 0.08, pw, gh * 0.92);
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(vx + d * hw + (d > 0 ? 0 : -pw / 2), top + gh * 0.08, pw / 2, gh * 0.92);
      ctx.fillStyle = '#1a1414'; ctx.fillRect(vx + d * hw - pw * 0.6, gy - gh * 0.1, pw * 1.2, gh * 0.1);
    }
    ctx.fillStyle = ver; ctx.fillRect(vx - hw * 1.18, top + gh * 0.2, hw * 2.36, gh * 0.05);
    ctx.fillStyle = ver; ctx.fillRect(vx - hw * 1.25, top + gh * 0.08, hw * 2.5, gh * 0.05);
    ctx.fillStyle = '#1a1414'; ctx.beginPath(); ctx.moveTo(vx - hw * 1.42, top + gh * 0.02); ctx.quadraticCurveTo(vx, top + gh * 0.07, vx + hw * 1.42, top + gh * 0.02); ctx.lineTo(vx + hw * 1.34, top + gh * 0.085); ctx.lineTo(vx - hw * 1.34, top + gh * 0.085); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1a1414'; ctx.fillRect(vx - pw * 0.4, top + gh * 0.12, pw * 0.8, gh * 0.08);
  }
}

// Sushi on a wooden geta board, seen from above: salmon, tuna, prawn and tamago nigiri, maki rolls, ikura
// gunkan, ginger and wasabi; soy sauce and chopsticks beside.
function japSushi(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#26262c'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2e2e36'; for (let k = 0; k < 20; k++) ctx.fillRect(((k * 41) % 100) / 100 * W, ((k * 29) % 100) / 100 * H, 12 * u, 0.6 * u);
  const bx = W * 0.07, by = H * 0.14, bw = W * 0.7, bh = H * 0.72;
  ctx.fillStyle = '#9a6e42'; roundRect(ctx, bx + 1.4 * u, by + 1.6 * u, bw, bh, 3 * u); ctx.fill();
  ctx.fillStyle = '#d8b07a'; roundRect(ctx, bx, by, bw, bh, 3 * u); ctx.fill();
  ctx.fillStyle = '#c49a62'; for (let k = 1; k < 9; k++) ctx.fillRect(bx + 2 * u, by + (k * bh) / 9, bw - 4 * u, 0.5 * u);
  const nigiri = (px, py, a, fish, stripe, kind) => {
    ctx.save(); ctx.translate(px, py); ctx.rotate(a);
    ctx.fillStyle = '#f6f2e8'; roundRect(ctx, -8 * u, -5 * u, 16 * u, 10 * u, 4.6 * u); ctx.fill();
    ctx.fillStyle = fish; roundRect(ctx, -9.4 * u, -4.4 * u, 18.8 * u, 8.8 * u, 4 * u); ctx.fill();
    if (stripe) { ctx.strokeStyle = stripe; ctx.lineWidth = 0.8 * u; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(k * 2.6 * u - 1.6 * u, -4 * u); ctx.lineTo(k * 2.6 * u + 1.6 * u, 4 * u); ctx.stroke(); } }
    if (kind === 'prawn') { ctx.fillStyle = '#e0503a'; ctx.beginPath(); ctx.moveTo(9 * u, 0); ctx.lineTo(13 * u, -3.4 * u); ctx.lineTo(13 * u, 3.4 * u); ctx.closePath(); ctx.fill(); }
    if (kind === 'tamago') { ctx.fillStyle = '#1a2a1e'; ctx.fillRect(-2 * u, -5 * u, 4 * u, 10 * u); }
    ctx.restore();
  };
  nigiri(W * 0.17, H * 0.3, -0.15, '#f08a4a', '#fbd0b0'); nigiri(W * 0.33, H * 0.3, -0.15, '#c8283a', '#e05a60');
  nigiri(W * 0.17, H * 0.5, -0.15, '#f4a070', '#fbe6d8', 'prawn'); nigiri(W * 0.33, H * 0.5, -0.15, '#f4d050', null, 'tamago');
  nigiri(W * 0.17, H * 0.7, -0.15, '#f08a4a', '#fbd0b0'); nigiri(W * 0.33, H * 0.7, -0.15, '#c8283a', '#e05a60');
  const maki = (px, py, fill) => { ctx.fillStyle = '#1a1e1a'; ctx.beginPath(); ctx.arc(px, py, 6.4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f6f2e8'; ctx.beginPath(); ctx.arc(px, py, 5.2 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(px, py, 2.4 * u, 0, Math.PI * 2); ctx.fill(); };
  for (let k = 0; k < 3; k++) { maki(W * 0.47, H * (0.3 + k * 0.17), ['#6ab04a', '#f08a4a', '#c8283a'][k]); maki(W * 0.56, H * (0.3 + k * 0.17), ['#f08a4a', '#c8283a', '#6ab04a'][k]); }
  for (const py of [0.32, 0.56]) { const px = W * 0.67, yy = H * py; ctx.fillStyle = '#1a1e1a'; ctx.beginPath(); ctx.arc(px, yy, 6.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ee6a1a'; for (let k = 0; k < 9; k++) { const a = k * 2.4, r = (k % 3) * 1.6 * u; ctx.beginPath(); ctx.arc(px + Math.cos(a) * r, yy + Math.sin(a) * r, 1.6 * u, 0, Math.PI * 2); ctx.fill(); } }
  ctx.fillStyle = '#f4b8b0'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(W * 0.66 + k * 0.8 * u, H * 0.76 - k * 0.6 * u, 4 * u, 2.4 * u, 0.4 + k * 0.3, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#8aba4a'; ctx.beginPath(); ctx.ellipse(W * 0.58, H * 0.78, 3.4 * u, 2.6 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.arc(W * 0.87, H * 0.3, 8 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#3a1e14'; ctx.beginPath(); ctx.arc(W * 0.87, H * 0.3, 6 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5a3424'; ctx.beginPath(); ctx.arc(W * 0.85, H * 0.28, 1.4 * u, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#8a2a24'; ctx.lineCap = 'round'; ctx.lineWidth = 1.8 * u;
  ctx.beginPath(); ctx.moveTo(W * 0.84, H * 0.5); ctx.lineTo(W * 0.9, H * 0.92); ctx.moveTo(W * 0.88, H * 0.49); ctx.lineTo(W * 0.93, H * 0.91); ctx.stroke();
  ctx.fillStyle = '#5a5a62'; roundRect(ctx, W * 0.83, H * 0.56, 8 * u, 2.6 * u, 1.2 * u); ctx.fill();
}

// Jeju island: Hallasan above the sea, black lava-stone walls round fields of tangerine trees, rape flowers in
// yellow along the road.
function korJeju(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.4); sky.addColorStop(0, '#5aa2dc'); sky.addColorStop(1, '#cfe8f4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.15, 0.1, 5], [0.22, 0.08, 6], [0.8, 0.12, 5.5]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.8, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  // Hallasan: a long, gentle volcano with a little crater rim
  ctx.fillStyle = '#5a7f9a'; ctx.beginPath(); ctx.moveTo(-W * 0.05, H * 0.42); ctx.quadraticCurveTo(W * 0.3, H * 0.3, W * 0.45, H * 0.17); ctx.lineTo(W * 0.55, H * 0.17); ctx.quadraticCurveTo(W * 0.7, H * 0.3, W * 1.05, H * 0.42); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#4a6e88'; ctx.fillRect(W * 0.46, H * 0.165, W * 0.08, 1.2 * u);
  ctx.fillStyle = '#3f7a8f'; ctx.fillRect(0, H * 0.4, W, H * 0.05);
  ctx.fillStyle = '#7ac0d0'; for (let k = 0; k < 10; k++) ctx.fillRect(((k * 37) % 100) / 100 * W, H * (0.41 + (k % 3) * 0.012), 6 * u, 0.5 * u);
  // fields, each walled with black stone, tangerine trees in rows
  ctx.fillStyle = '#6a9a4a'; ctx.fillRect(0, H * 0.45, W, H * 0.55);
  const field = (x0, y0, x1, y1) => {
    ctx.fillStyle = '#7aaa52'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    const rows = Math.max(1, Math.round((y1 - y0) / (8 * u))), per = Math.max(2, Math.round((x1 - x0) / (9 * u)));
    for (let r = 0; r < rows; r++) for (let c = 0; c < per; c++) {
      const tx = x0 + ((c + 0.5) * (x1 - x0)) / per, ty = y0 + ((r + 0.6) * (y1 - y0)) / rows, s = (y1 - y0) / rows;
      ctx.fillStyle = '#2f6a2a'; ctx.beginPath(); ctx.arc(tx, ty, s * 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f08a1a'; for (const [dx, dy] of [[-0.18, -0.08], [0.16, 0.06], [-0.02, 0.2]]) { ctx.beginPath(); ctx.arc(tx + dx * s, ty + dy * s, 1.3 * u, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.strokeStyle = '#26242a'; ctx.lineWidth = 1.8 * u; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.fillStyle = '#3e3c44'; for (let px = x0; px < x1; px += 2.4 * u) { ctx.beginPath(); ctx.arc(px, y0, 0.9 * u, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(px, y1, 0.9 * u, 0, Math.PI * 2); ctx.fill(); }
  };
  field(W * 0.02, H * 0.48, W * 0.3, H * 0.62); field(W * 0.34, H * 0.47, W * 0.62, H * 0.6); field(W * 0.66, H * 0.48, W * 0.98, H * 0.62);
  field(W * 0.02, H * 0.78, W * 0.38, H * 0.98); field(W * 0.62, H * 0.78, W * 0.98, H * 0.98);
  // the road and its yellow verges
  ctx.fillStyle = '#c9c1ae'; ctx.beginPath(); ctx.moveTo(0, H * 0.66); ctx.lineTo(W, H * 0.66); ctx.lineTo(W, H * 0.74); ctx.lineTo(W * 0.56, H * 0.74); ctx.lineTo(W * 0.54, H); ctx.lineTo(W * 0.46, H); ctx.lineTo(W * 0.44, H * 0.74); ctx.lineTo(0, H * 0.74); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f6d23a'; for (let k = 0; k < 70; k++) { const px = ((k * 23) % 100) / 100 * W, py = k % 2 ? H * 0.645 : H * 0.755; if (Math.abs(px - W * 0.5) > 5 * u) { ctx.beginPath(); ctx.arc(px, py + ((k * 7) % 3) * 0.5 * u, 1.3 * u, 0, Math.PI * 2); ctx.fill(); } }
  for (let k = 0; k < 24; k++) { const py = H * (0.76 + (k % 12) * 0.02), px = k < 12 ? W * 0.42 : W * 0.58; ctx.beginPath(); ctx.arc(px, py, 1.3 * u, 0, Math.PI * 2); ctx.fill(); }
}

// Chinese paper-cut: one sheet of red paper cut into a round window flower with a ring of petals and a sawtooth,
// two fish swimming toward it, flower fans in the corners and a cut border, on cream.
function chnPapercut(ctx, W, H) {
  const C = { paper: '#f2e6cc', paper2: '#eadcbe', red: '#c81e28' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.red; x.fillRect(0, 0, cols, rows);
    // the border: a red band cut with little diamonds and a sawtooth on its inner edge
    const bd = 12;
    const dia = (px, py, r) => { x.fillStyle = C.paper; x.beginPath(); x.moveTo(px, py - r); x.lineTo(px + r * 0.7, py); x.lineTo(px, py + r); x.lineTo(px - r * 0.7, py); x.closePath(); x.fill(); };
    for (const [len, put] of [[cols - 2 * bd, (a) => { dia(bd + a, 5, 2.6); dia(bd + a, rows - 5, 2.6); }], [rows - 2 * bd, (a) => { dia(5, bd + a, 2.6); dia(cols - 5, bd + a, 2.6); }]]) { const { n, d } = evenSteps(len, 7); for (let i = 0; i <= n; i++) put(i * d); }
    const fx = bd, fy = bd, fw = cols - 2 * bd, fh = rows - 2 * bd;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 9) % 3 === 1 ? C.paper2 : C.paper; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.red;
    for (const [len, put] of [[fw, (i, k) => { x.fillRect(fx + i, fy, 1, k); x.fillRect(fx + i, fy + fh - k, 1, k); }], [fh, (i, k) => { x.fillRect(fx, fy + i, k, 1); x.fillRect(fx + fw - k, fy + i, k, 1); }]]) for (let i = 0; i < len; i++) put(i, 1 + Math.abs((i % 6) - 3));
    const cx = fx + fw / 2, cy = fy + fh / 2, R = fh * 0.4;
    // the window flower
    x.fillStyle = C.red; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.paper;
    for (let k = 0; k < 20; k++) { const a = (k / 20) * Math.PI * 2; x.save(); x.translate(cx + Math.cos(a) * R * 0.82, cy + Math.sin(a) * R * 0.82); x.rotate(a); x.beginPath(); x.ellipse(0, 0, R * 0.09, R * 0.045, 0, 0, Math.PI * 2); x.fill(); x.restore(); }
    x.beginPath(); for (let k = 0; k <= 48; k++) { const a = (k / 48) * Math.PI * 2, r = R * (k % 2 ? 0.62 : 0.7); k ? x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : x.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } x.closePath(); x.fill();
    x.fillStyle = C.red; x.beginPath(); x.arc(cx, cy, R * 0.56, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.paper; for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; x.save(); x.translate(cx, cy); x.rotate(a); x.beginPath(); x.moveTo(0, -R * 0.14); x.quadraticCurveTo(R * 0.13, -R * 0.3, 0, -R * 0.48); x.quadraticCurveTo(-R * 0.13, -R * 0.3, 0, -R * 0.14); x.fill(); x.restore(); }
    x.beginPath(); x.arc(cx, cy, R * 0.1, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.red; x.beginPath(); x.arc(cx, cy, R * 0.05, 0, Math.PI * 2); x.fill();
    // fish either side, facing the flower
    const fish = (px, py, f) => {
      x.save(); x.translate(px, py); x.scale(f, 1);
      const s = fh * 0.2;
      x.fillStyle = C.red; x.beginPath(); x.moveTo(s, 0); x.bezierCurveTo(s * 0.6, -s * 0.55, -s * 0.5, -s * 0.5, -s * 0.8, 0); x.bezierCurveTo(-s * 0.5, s * 0.5, s * 0.6, s * 0.55, s, 0); x.fill();
      x.beginPath(); x.moveTo(-s * 0.7, 0); x.quadraticCurveTo(-s * 1.0, -s * 0.2, -s * 1.35, -s * 0.55); x.lineTo(-s * 1.12, 0); x.lineTo(-s * 1.35, s * 0.55); x.quadraticCurveTo(-s * 1.0, s * 0.2, -s * 0.7, 0); x.closePath(); x.fill();
      x.strokeStyle = C.paper; x.lineWidth = 1.1;
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const sx = -s * 0.35 + k * s * 0.28, sy = -s * 0.22 + r * s * 0.22; x.beginPath(); x.arc(sx, sy, s * 0.11, -Math.PI / 2, Math.PI / 2); x.stroke(); }
      x.fillStyle = C.paper; x.beginPath(); x.arc(s * 0.58, -s * 0.08, s * 0.11, 0, Math.PI * 2); x.fill(); x.fillStyle = C.red; x.beginPath(); x.arc(s * 0.58, -s * 0.08, s * 0.045, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.paper; x.lineWidth = 1.1; x.beginPath(); x.arc(s * 0.3, 0, s * 0.3, -Math.PI * 0.45, Math.PI * 0.45); x.stroke();
      x.strokeStyle = C.paper; x.lineWidth = 1; for (const o of [-0.25, 0, 0.25]) { x.beginPath(); x.moveTo(-s * 0.9, o * s); x.lineTo(-s * 1.2, o * s * 1.8); x.stroke(); }
      x.restore();
    };
    fish(fx + fw * 0.18, cy + 2, 1); fish(fx + fw * 0.82, cy + 2, -1);
    // corner fans
    for (const [sx, sy] of [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]]) {
      x.fillStyle = C.red; x.beginPath(); x.arc(sx, sy, fh * 0.2, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.paper; for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2; x.save(); x.translate(sx, sy); x.rotate(a); x.beginPath(); x.moveTo(0, -fh * 0.06); x.quadraticCurveTo(fh * 0.04, -fh * 0.12, 0, -fh * 0.17); x.quadraticCurveTo(-fh * 0.04, -fh * 0.12, 0, -fh * 0.06); x.fill(); x.restore(); }
    }
  });
}

// The hem of an imperial robe: diagonal stripes of standing water (lishui) along the bottom, curling waves and
// three rocky peaks rising from them, auspicious clouds above on imperial yellow.
function chnImperial(ctx, W, H) {
  const C = { yellow: '#e8b830', yellow2: '#dcac28', navy: '#1f2f6a', blue: '#3a5ab0', sky: '#7aa0dc', white: '#f4eee0', green: '#2f8a5a', lgreen: '#8ac080', red: '#c8323a', pink: '#f0a0a0', violet: '#6a4a9a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.navy; x.fillRect(0, 0, cols, rows);
    const fx = 4, fy = 4, fw = cols - 8, fh = rows - 8;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 8) % 3 === 1 ? C.yellow2 : C.yellow; x.fillRect(fx, y, fw, 1); }
    // lishui: chevron stripes, pointing up toward the middle
    const ly = fy + Math.round(fh * 0.72), seq = [C.blue, C.sky, C.white, C.green, C.lgreen, C.white, C.red, C.pink, C.white, C.violet, C.sky, C.white];
    for (let yy = ly; yy < fy + fh; yy++) for (let xx = fx; xx < fx + fw; xx++) {
      const s = Math.floor((Math.abs(xx - (fx + fw / 2)) + (yy - ly) * 1.1) / 2.2);
      x.fillStyle = seq[s % seq.length]; x.fillRect(xx, yy, 1, 1);
    }
    // waves above the stripes: rows of curling crests
    const wy = ly - 1;
    for (let k = -1; k * 12 < fw + 12; k++) {
      const cx = fx + k * 12 + 6;
      x.fillStyle = C.blue; x.beginPath(); x.arc(cx, wy, 7, Math.PI, 0); x.fill();
      x.strokeStyle = C.white; x.lineWidth = 1.2; x.beginPath(); x.arc(cx, wy, 5, Math.PI, Math.PI * 1.9); x.stroke();
      x.beginPath(); x.arc(cx + 1.4, wy - 1, 2, Math.PI * 1.1, Math.PI * 2.4); x.stroke();
      x.fillStyle = C.white; x.beginPath(); x.arc(cx + 4.6, wy - 4.4, 1.4, 0, Math.PI * 2); x.fill();
    }
    // three peaks
    const peak = (cx, h, w) => {
      const rock = (k, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(cx - (w * k) / 2, wy); x.lineTo(cx - (w * k) * 0.42, wy - h * 0.5 * k); x.lineTo(cx - (w * k) * 0.18, wy - h * 0.62 * k); x.lineTo(cx, wy - h * k); x.lineTo(cx + (w * k) * 0.2, wy - h * 0.66 * k); x.lineTo(cx + (w * k) * 0.42, wy - h * 0.54 * k); x.lineTo(cx + (w * k) / 2, wy); x.closePath(); x.fill(); };
      rock(1.1, C.white); rock(1, C.blue); rock(0.66, C.sky); rock(0.34, C.green);
    };
    peak(fx + fw / 2, fh * 0.38, fw * 0.16); peak(fx + fw * 0.2, fh * 0.26, fw * 0.12); peak(fx + fw * 0.8, fh * 0.26, fw * 0.12);
    // clouds on the yellow
    const cloud = (cx, cy, s, col) => {
      for (const [dx, dy, r] of [[-0.6, 0.1, 0.42], [0, -0.2, 0.55], [0.6, 0.1, 0.42]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = col; roundRect(x, cx - s, cy, s * 2, s * 0.42, s * 0.2); x.fill();
      x.strokeStyle = C.white; x.lineWidth = 1; for (const [dx, dy, r] of [[-0.6, 0.1, 0.42], [0, -0.2, 0.55], [0.6, 0.1, 0.42]]) { x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s * 0.55, Math.PI * 0.8, Math.PI * 2.1); x.stroke(); }
    };
    for (const [a, b, s, col] of [[0.12, 0.2, 9, C.blue], [0.35, 0.14, 8, C.red], [0.62, 0.18, 9, C.green], [0.86, 0.15, 8, C.blue], [0.25, 0.42, 7, C.green], [0.72, 0.42, 7, C.red], [0.5, 0.1, 6, C.violet]]) cloud(fx + fw * a, fy + fh * b, s, col);
  });
}

// Mahjong tiles on green felt: a hand of dots and bamboos laid out in two rows.
function chnMahjong(ctx, W, H) {
  const C = { felt: '#2f7a4a', felt2: '#2a7044', tile: '#f4efe0', edge: '#d8cfb8', back: '#3f9a6a', shadow: '#1f5a36', red: '#c8302a', blue: '#2a4a9a', green: '#2f8a4a', dark: '#1a2a2a' };
  weavePicture(ctx, W, H, 140, Object.values(C), (x, cols, rows) => {
    for (let y = 0; y < rows; y++) { x.fillStyle = Math.floor(y / 7) % 3 === 1 ? C.felt2 : C.felt; x.fillRect(0, y, cols, 1); }
    x.fillStyle = C.dark; x.fillRect(0, 0, cols, 3); x.fillRect(0, rows - 3, cols, 3); x.fillRect(0, 0, 3, rows); x.fillRect(cols - 3, 0, 3, rows);
    const n = 7, gap = 3, tw = Math.floor((cols - 16 - gap * (n - 1)) / n), th = Math.round(tw * 1.36);
    const DOTS = { 1: [[0.5, 0.5]], 2: [[0.5, 0.27], [0.5, 0.73]], 3: [[0.27, 0.22], [0.5, 0.5], [0.73, 0.78]], 4: [[0.3, 0.27], [0.7, 0.27], [0.3, 0.73], [0.7, 0.73]], 5: [[0.28, 0.24], [0.72, 0.24], [0.5, 0.5], [0.28, 0.76], [0.72, 0.76]],
      6: [[0.3, 0.2], [0.7, 0.2], [0.3, 0.5], [0.7, 0.5], [0.3, 0.8], [0.7, 0.8]], 8: [[0.3, 0.16], [0.7, 0.16], [0.3, 0.39], [0.7, 0.39], [0.3, 0.62], [0.7, 0.62], [0.3, 0.85], [0.7, 0.85]],
      9: [[0.22, 0.2], [0.5, 0.2], [0.78, 0.2], [0.22, 0.5], [0.5, 0.5], [0.78, 0.5], [0.22, 0.8], [0.5, 0.8], [0.78, 0.8]] };
    const tile = (a, b, kind, k) => {
      x.fillStyle = C.shadow; roundRect(x, a + 1, b + 2, tw, th, 2); x.fill();
      x.fillStyle = C.back; roundRect(x, a, b + 1.5, tw, th, 2); x.fill();
      x.fillStyle = C.tile; roundRect(x, a, b, tw, th - 1, 2); x.fill();
      x.strokeStyle = C.edge; x.lineWidth = 0.8; roundRect(x, a + 0.5, b + 0.5, tw - 1, th - 2, 2); x.stroke();
      const ix = a + 2, iy = b + 2, iw = tw - 4, ih = th - 5;
      if (kind === 'dot') {
        const pts = DOTS[k], r = k === 1 ? iw * 0.36 : k >= 8 ? iw * 0.11 : iw * 0.14;
        pts.forEach(([px, py], i) => { const cx = ix + px * iw, cy = iy + py * ih, ring = k === 1 ? C.green : [C.blue, C.green, C.red][(i + k) % 3]; x.fillStyle = ring; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.fillStyle = C.tile; x.beginPath(); x.arc(cx, cy, r * 0.55, 0, Math.PI * 2); x.fill(); x.fillStyle = k === 1 ? C.red : ring; x.beginPath(); x.arc(cx, cy, r * 0.28, 0, Math.PI * 2); x.fill(); });
      } else {
        const per = k <= 3 ? k : 3, nrow = Math.ceil(k / 3);
        for (let i = 0; i < k; i++) {
          const r = Math.floor(i / 3), c = i % 3, inRow = Math.min(3, k - r * 3), cx = ix + ((c + 0.5) * iw) / Math.max(per, inRow), top = iy + (r * ih) / nrow + 1, hh = ih / nrow - 2;
          const col = (k === 5 || k === 7 || k === 9) && i === Math.floor(k / 2) ? C.red : C.green;
          x.fillStyle = col; x.fillRect(cx - 1, top, 2, hh); x.fillStyle = C.tile; x.fillRect(cx - 1, top + hh / 2, 2, 0.7);
        }
      }
    };
    const hand1 = [['dot', 1], ['dot', 2], ['dot', 3], ['dot', 5], ['dot', 6], ['dot', 8], ['dot', 9]];
    const hand2 = [['bam', 2], ['bam', 3], ['bam', 4], ['bam', 5], ['bam', 6], ['bam', 8], ['bam', 9]];
    const x0 = Math.round((cols - (n * tw + (n - 1) * gap)) / 2), y1 = Math.round(rows * 0.5 - th - 4), y2 = Math.round(rows * 0.5 + 4);
    hand1.forEach(([k, v], i) => tile(x0 + i * (tw + gap), y1, k, v));
    hand2.forEach(([k, v], i) => tile(x0 + i * (tw + gap), y2, k, v));
  });
}

// The Lantern Festival: rows of red silk lanterns with gold tassels over a painted gateway, a full moon.
function chnLanternFest(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0e1438'); sky.addColorStop(1, '#2a2058');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fbe9b0'; ctx.beginPath(); ctx.arc(W * 0.88, H * 0.64, 7 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#efd88f'; ctx.beginPath(); ctx.arc(W * 0.86, H * 0.62, 1.8 * u, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(W * 0.9, H * 0.67, 1.3 * u, 0, Math.PI * 2); ctx.fill();
  // the gateway (pailou): red posts, a blue-green beam, a tiled roof with lifted ends
  const gx = W * 0.5, gb = H, gt = H * 0.7, gw = W * 0.44;
  ctx.fillStyle = '#b8261e'; for (const d of [-1, -0.33, 0.33, 1]) ctx.fillRect(gx + d * gw / 2 - 2 * u, gt, 4 * u, gb - gt);
  ctx.fillStyle = '#2f7a7a'; ctx.fillRect(gx - gw * 0.56, gt + 2 * u, gw * 1.12, 6 * u);
  ctx.fillStyle = '#e8b448'; for (let k = 0; k < 12; k++) ctx.fillRect(gx - gw * 0.52 + (k * gw * 1.04) / 12, gt + 4 * u, gw * 0.05, 2 * u);
  ctx.fillStyle = '#1e2a3a'; ctx.beginPath(); ctx.moveTo(gx - gw * 0.66, gt - 3 * u); ctx.quadraticCurveTo(gx - gw * 0.5, gt + 2 * u, gx - gw * 0.3, gt + 1.4 * u); ctx.lineTo(gx + gw * 0.3, gt + 1.4 * u); ctx.quadraticCurveTo(gx + gw * 0.5, gt + 2 * u, gx + gw * 0.66, gt - 3 * u); ctx.lineTo(gx + gw * 0.46, gt - 9 * u); ctx.lineTo(gx - gw * 0.46, gt - 9 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e8b448'; ctx.fillRect(gx - gw * 0.46, gt - 10 * u, gw * 0.92, 1.4 * u);
  const lantern = (cx, cy, r) => {
    ctx.fillStyle = 'rgba(255,120,60,.16)'; ctx.beginPath(); ctx.arc(cx, cy, r * 1.9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e02a22'; ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.82, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#a81a16'; ctx.lineWidth = Math.max(1, r * 0.08); for (const k of [-0.6, -0.2, 0.2, 0.6]) { ctx.beginPath(); ctx.ellipse(cx, cy, r * Math.abs(k) * 1.1 + r * 0.05, r * 0.82, 0, -Math.PI / 2, Math.PI / 2, k < 0); ctx.stroke(); }
    ctx.fillStyle = '#ff6a3a'; ctx.beginPath(); ctx.ellipse(cx - r * 0.25, cy - r * 0.1, r * 0.25, r * 0.45, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e8b448'; ctx.fillRect(cx - r * 0.5, cy - r * 0.95, r, r * 0.22); ctx.fillRect(cx - r * 0.5, cy + r * 0.74, r, r * 0.22);
    ctx.fillStyle = '#e8b448'; ctx.fillRect(cx - r * 0.12, cy + r * 0.96, r * 0.24, r * 0.3);
    ctx.beginPath(); ctx.moveTo(cx - r * 0.24, cy + r * 1.24); ctx.lineTo(cx + r * 0.24, cy + r * 1.24); ctx.lineTo(cx + r * 0.16, cy + r * 1.9); ctx.lineTo(cx - r * 0.16, cy + r * 1.9); ctx.closePath(); ctx.fill();
  };
  const strings = [[H * 0.03, 5, 6.4], [H * 0.21, 7, 5.2], [H * 0.37, 9, 4]];
  strings.forEach(([y0, n, r], s) => {
    const yAt = (px) => y0 + 6 * u * Math.sin((px / W) * Math.PI);
    ctx.strokeStyle = '#7a5a6a'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); for (let px = 0; px <= W; px += 2 * u) px ? ctx.lineTo(px, yAt(px)) : ctx.moveTo(px, yAt(px)); ctx.stroke();
    for (let i = 0; i < n; i++) { const px = (W * (i + 0.5)) / n; ctx.strokeStyle = '#7a5a6a'; ctx.beginPath(); ctx.moveTo(px, yAt(px)); ctx.lineTo(px, yAt(px) + r * 0.6 * u); ctx.stroke(); lantern(px, yAt(px) + r * 1.4 * u, r * u); }
  });
}

// Guilin: the karst peaks along the Li River in the morning mist, a fisherman on a bamboo raft with his cormorant.
function chnGuilin(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6); sky.addColorStop(0, '#f2d6c0'); sky.addColorStop(1, '#f6ecdc');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fbe6c8'; ctx.beginPath(); ctx.arc(W * 0.7, H * 0.2, 6 * u, 0, Math.PI * 2); ctx.fill();
  const water = H * 0.62;
  const peaks = (list, col, refl) => list.forEach(([px, w, h]) => {
    const cx = W * px, ww = w * u, hh = h * u;
    const shape = (y0, dir) => { ctx.beginPath(); ctx.moveTo(cx - ww, y0); ctx.bezierCurveTo(cx - ww * 0.9, y0 - dir * hh * 0.7, cx - ww * 0.55, y0 - dir * hh, cx, y0 - dir * hh); ctx.bezierCurveTo(cx + ww * 0.55, y0 - dir * hh, cx + ww * 0.9, y0 - dir * hh * 0.7, cx + ww, y0); ctx.closePath(); };
    ctx.fillStyle = col; shape(water, 1); ctx.fill();
    ctx.fillStyle = refl; shape(water, -0.6); ctx.fill();
  });
  peaks([[0.08, 9, 34], [0.2, 7, 28], [0.33, 8, 40], [0.52, 7, 30], [0.62, 8, 36], [0.8, 9, 32], [0.93, 7, 26]], '#b8c4c8', '#c8d4d6');
  peaks([[0.02, 10, 26], [0.16, 9, 32], [0.42, 10, 28], [0.72, 9, 30], [0.98, 10, 24]], '#7a9a8a', '#9ab4a8');
  peaks([[-0.02, 14, 44], [0.26, 12, 22], [0.88, 14, 42]], '#3f6a4a', '#6a8a72');
  // the river
  ctx.fillStyle = 'rgba(160,190,196,.55)'; ctx.fillRect(0, water, W, H - water);
  ctx.fillStyle = '#f2ecdc'; for (let k = 0; k < 24; k++) ctx.fillRect(((k * 41) % 100) / 100 * W, water + ((k * 13) % 36) * u, (6 + (k % 4) * 3) * u, 0.5 * u);
  ctx.fillStyle = '#f6efe0'; ctx.fillRect(0, water - 1 * u, W, 1.4 * u);
  // the raft, the fisherman, the lamp, the cormorant
  const rx = W * 0.5, ry = H * 0.8;
  ctx.fillStyle = '#8a6a3a'; ctx.beginPath(); ctx.moveTo(rx - 22 * u, ry); ctx.lineTo(rx + 20 * u, ry); ctx.quadraticCurveTo(rx + 25 * u, ry - 1 * u, rx + 26 * u, ry - 4 * u); ctx.lineTo(rx + 22 * u, ry + 3 * u); ctx.lineTo(rx - 22 * u, ry + 3 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6a4e28'; for (let k = 0; k < 5; k++) ctx.fillRect(rx - 22 * u, ry + k * 0.7 * u, 42 * u, 0.25 * u);
  ctx.fillStyle = '#2a2a2e'; ctx.fillRect(rx - 2 * u, ry - 13 * u, 4 * u, 13 * u);
  ctx.fillStyle = '#c8a86a'; ctx.beginPath(); ctx.moveTo(rx - 7 * u, ry - 13 * u); ctx.lineTo(rx, ry - 19 * u); ctx.lineTo(rx + 7 * u, ry - 13 * u); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 0.8 * u; ctx.beginPath(); ctx.moveTo(rx + 2 * u, ry - 8 * u); ctx.lineTo(rx + 16 * u, ry - 20 * u); ctx.stroke();
  ctx.fillStyle = '#e8b448'; ctx.fillRect(rx - 14 * u, ry - 6 * u, 3 * u, 4 * u);
  ctx.fillStyle = '#1e1e22'; ctx.beginPath(); ctx.ellipse(rx + 14 * u, ry - 2 * u, 3.4 * u, 1.8 * u, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(rx + 16 * u, ry - 3 * u); ctx.lineTo(rx + 17 * u, ry - 7 * u); ctx.lineTo(rx + 18.4 * u, ry - 7 * u); ctx.lineTo(rx + 17.4 * u, ry - 2.4 * u); ctx.fill();
  ctx.fillStyle = '#e8b448'; ctx.fillRect(rx + 18.2 * u, ry - 7 * u, 1.6 * u, 0.6 * u);
  ctx.fillStyle = 'rgba(60,50,40,.25)'; ctx.fillRect(rx - 22 * u, ry + 3 * u, 46 * u, 2 * u);
}

// Dim sum on a dark table, seen from above: bamboo steamers of har gow, siu mai and char siu bao, a plate of egg
// tarts, tea in white cups, chopsticks.
function chnDimSum(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#3a2418'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#44291c'; for (let k = 0; k < 6; k++) ctx.fillRect(0, (H * (k + 0.5)) / 6, W, 0.7 * u);
  const steamer = (cx, cy, r, fill) => {
    ctx.fillStyle = '#9a7442'; ctx.beginPath(); ctx.arc(cx + 1 * u, cy + 1.4 * u, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d8b67a'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#b8955a'; ctx.lineWidth = 0.8 * u; ctx.beginPath(); ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#c4a068'; ctx.beginPath(); ctx.arc(cx, cy, r * 0.84, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#b08c56'; ctx.lineWidth = 0.4 * u; for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(cx - r * 0.8, cy + k * r * 0.12); ctx.lineTo(cx + r * 0.8, cy + k * r * 0.12); ctx.stroke(); }
    fill(cx, cy, r * 0.84);
  };
  const harGow = (cx, cy, s) => { ctx.fillStyle = '#efe6e0'; ctx.beginPath(); ctx.arc(cx, cy, s, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f2b0a0'; ctx.beginPath(); ctx.arc(cx, cy + s * 0.15, s * 0.55, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 0.5 * u; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(cx + k * s * 0.3, cy - s * 0.85); ctx.lineTo(cx + k * s * 0.22, cy - s * 0.1); ctx.stroke(); } };
  const siuMai = (cx, cy, s) => { ctx.fillStyle = '#f2d06a'; ctx.beginPath(); ctx.arc(cx, cy, s, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#d88a6a'; ctx.beginPath(); ctx.arc(cx, cy, s * 0.7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ee6a1a'; ctx.beginPath(); ctx.arc(cx, cy, s * 0.22, 0, Math.PI * 2); ctx.fill(); };
  const bao = (cx, cy, s) => { ctx.fillStyle = '#fbf8f2'; ctx.beginPath(); ctx.arc(cx, cy, s, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#b8322a'; for (let k = 0; k < 3; k++) { const a = (k * Math.PI * 2) / 3; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * s * 0.18, cy + Math.sin(a) * s * 0.18, s * 0.26, s * 0.09, a, 0, Math.PI * 2); ctx.fill(); } };
  const ring3 = (f) => (cx, cy, r) => { for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + (k * Math.PI * 2) / 3; f(cx + Math.cos(a) * r * 0.48, cy + Math.sin(a) * r * 0.48, r * 0.38); } };
  const ring4 = (f) => (cx, cy, r) => { for (let k = 0; k < 4; k++) { const a = Math.PI / 4 + (k * Math.PI) / 2; f(cx + Math.cos(a) * r * 0.48, cy + Math.sin(a) * r * 0.48, r * 0.32); } };
  steamer(W * 0.22, H * 0.34, 24 * u, ring4(harGow));
  steamer(W * 0.47, H * 0.62, 26 * u, ring4(siuMai));
  steamer(W * 0.72, H * 0.32, 24 * u, ring3(bao));
  // egg tarts on a plate
  ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.arc(W * 0.86, H * 0.76, 15 * u, 0, Math.PI * 2); ctx.fill();
  for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + (k * Math.PI * 2) / 3, tx = W * 0.86 + Math.cos(a) * 7 * u, ty = H * 0.76 + Math.sin(a) * 7 * u; ctx.fillStyle = '#d8a050'; ctx.beginPath(); ctx.arc(tx, ty, 5.4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f6d24a'; ctx.beginPath(); ctx.arc(tx, ty, 3.8 * u, 0, Math.PI * 2); ctx.fill(); }
  // tea
  for (const [a, b] of [[0.12, 0.8], [0.24, 0.86]]) { ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.arc(W * a, H * b, 6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#b07a2a'; ctx.beginPath(); ctx.arc(W * a, H * b, 4.4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#2f7a9a'; ctx.beginPath(); ctx.arc(W * a, H * b, 6 * u, Math.PI * 1.1, Math.PI * 1.4); ctx.lineTo(W * a, H * b); ctx.fill(); }
  ctx.strokeStyle = '#1a1414'; ctx.lineCap = 'round'; ctx.lineWidth = 1.6 * u;
  ctx.beginPath(); ctx.moveTo(W * 0.62, H * 0.92); ctx.lineTo(W * 0.78, H * 0.56); ctx.moveTo(W * 0.64, H * 0.94); ctx.lineTo(W * 0.8, H * 0.58); ctx.stroke();
}


// ---------- Mediterranean pack ----------
// Italy, Greece, Spain and the French Mediterranean: majolica and mosaics, the Greek key and black-figure pottery,
// azulejos and the Manila shawl, Provençal prints; and hooked pictures of their coasts and towns.

const ITALY_FRAME = { dark: '#1f2a40', a: '#c8402a', b: '#e8b83a', line: '#efe6d0' };
const GREECE_FRAME = { dark: '#14254a', a: '#2f6fb8', b: '#d8a64a', line: '#f2efe6' };
const SPAIN_FRAME = { dark: '#2a1418', a: '#c8282a', b: '#f0b830', line: '#efe3c6' };
const FRANCE_FRAME = { dark: '#2a2448', a: '#7a5ab8', b: '#f0c040', line: '#efe8d6' };

// The Greek meander: a running key that spirals in once a turn, 8 knots a turn and 8 deep.
const MEANDER = ['#######.', '#.....#.', '#.###.#.', '#.#.#.#.', '#.#...#.', '#.#####.', '#.......', '########'];
const meanderOn = (i, j) => MEANDER[j][((i % 8) + 8) % 8] === '#';

// Lay a knot pattern round the four sides of a band `o` knots in and `depth` deep, leaving the corner squares
// to `corner(a, b)`. colorAt(i, j) gets the knot along the side (counted so whole repeats sit centred) and the
// depth into the rug, and returns a colour or null.
function ringKnots(x, cols, rows, o, depth, period, colorAt, corner) {
  const R = (a, b, col) => { x.fillStyle = col; x.fillRect(a, b, 1, 1); };
  for (const [len, map] of [[cols - 2 * o, (i, j) => [o + i, o + j]], [cols - 2 * o, (i, j) => [cols - 1 - o - i, rows - 1 - o - j]], [rows - 2 * o, (i, j) => [o + j, rows - 1 - o - i]], [rows - 2 * o, (i, j) => [cols - 1 - o - j, o + i]]]) {
    const run = len - 2 * depth, off = Math.floor((run % period) / 2);
    for (let i = depth; i < len - depth; i++) for (let j = 0; j < depth; j++) { const c = colorAt(i - depth - off, j); if (c) { const [a, b] = map(i, j); R(a, b, c); } }
  }
  if (corner) for (const [a, b] of [[o, o], [cols - o - depth, o], [o, rows - o - depth], [cols - o - depth, rows - o - depth]]) corner(a, b);
}

function lemonFruit(x, cx, cy, s, ang, body, shade) {
  x.save(); x.translate(cx, cy); x.rotate(ang);
  x.fillStyle = body; x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(-s * 0.85, -s * 0.62, 0, -s * 0.62); x.quadraticCurveTo(s * 0.85, -s * 0.62, s, 0); x.quadraticCurveTo(s * 0.85, s * 0.62, 0, s * 0.62); x.quadraticCurveTo(-s * 0.85, s * 0.62, -s, 0); x.fill();
  if (shade) { x.fillStyle = shade; x.beginPath(); x.ellipse(s * 0.15, s * 0.28, s * 0.55, s * 0.2, 0, 0, Math.PI * 2); x.fill(); }
  x.restore();
}

// Majolica tiles from the Amalfi coast: on each white tile a cobalt frame and a lemon on its leaves, or a blue
// flower; orange and yellow quarter-flowers in the corners make whole flowers where four tiles meet.
function itaMajolica(ctx, W, H) {
  const C = { white: '#f4efe2', cobalt: '#1f4a9a', blue: '#5a82c8', yellow: '#f2c43a', orange: '#e07a2a', green: '#3f8a4a', green2: '#6aaa5a', grout: '#cfc6b2', dark: '#16305e' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.dark; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.yellow; x.fillRect(3, 3, cols - 6, rows - 6);
    x.fillStyle = C.cobalt;
    for (const [len, put] of [[cols - 6, (a) => { x.beginPath(); x.arc(3 + a, 3, 2.6, 0, Math.PI); x.fill(); x.beginPath(); x.arc(3 + a, rows - 3, 2.6, Math.PI, 0); x.fill(); }], [rows - 6, (a) => { x.beginPath(); x.arc(3, 3 + a, 2.6, -Math.PI / 2, Math.PI / 2); x.fill(); x.beginPath(); x.arc(cols - 3, 3 + a, 2.6, Math.PI / 2, Math.PI * 1.5); x.fill(); }]]) { const { n, d } = evenSteps(len, 6); for (let i = 0; i <= n; i++) put(i * d); }
    x.fillStyle = C.dark; x.fillRect(9, 9, cols - 18, rows - 18);
    const fx = 10, fy = 10, fw = cols - 20, fh = rows - 20, nr = 4, nc = Math.round(fw / (fh / nr)), tw = fw / nc, th = fh / nr;
    x.fillStyle = C.grout; x.fillRect(fx, fy, fw, fh);
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const a = fx + i * tw, b = fy + j * th, T = Math.min(tw, th), cx = a + tw / 2, cy = b + th / 2;
      x.save(); x.beginPath(); x.rect(a + 0.5, b + 0.5, tw - 1, th - 1); x.clip();
      x.fillStyle = C.white; x.fillRect(a, b, tw, th);
      for (const [px, py] of [[a, b], [a + tw, b], [a, b + th], [a + tw, b + th]]) { x.fillStyle = C.orange; x.beginPath(); x.arc(px, py, T * 0.24, 0, Math.PI * 2); x.fill(); x.fillStyle = C.yellow; x.beginPath(); x.arc(px, py, T * 0.13, 0, Math.PI * 2); x.fill(); }
      x.strokeStyle = C.cobalt; x.lineWidth = 1.4; x.beginPath(); x.arc(cx, cy, T * 0.36, 0, Math.PI * 2); x.stroke();
      if ((i + j) % 2 === 0) {
        leaf(x, cx - 1, cy + T * 0.04, T * 0.26, -2.3, C.green, C.green2); leaf(x, cx + 1, cy + T * 0.04, T * 0.26, -0.84, C.green, C.green2);
        lemonFruit(x, cx, cy + T * 0.08, T * 0.17, 0.25, C.yellow, C.orange);
      } else {
        for (let k = 0; k < 4; k++) { const ang = (k * Math.PI) / 2 + Math.PI / 4; x.fillStyle = C.cobalt; x.beginPath(); x.ellipse(cx + Math.cos(ang) * T * 0.14, cy + Math.sin(ang) * T * 0.14, T * 0.13, T * 0.07, ang, 0, Math.PI * 2); x.fill(); }
        for (let k = 0; k < 4; k++) { const ang = (k * Math.PI) / 2; x.fillStyle = C.blue; x.beginPath(); x.ellipse(cx + Math.cos(ang) * T * 0.13, cy + Math.sin(ang) * T * 0.13, T * 0.09, T * 0.05, ang, 0, Math.PI * 2); x.fill(); }
        x.fillStyle = C.yellow; x.beginPath(); x.arc(cx, cy, T * 0.06, 0, Math.PI * 2); x.fill();
      }
      x.restore();
    }
  });
}

// Amalfi lemons: branches heavy with lemons and white blossom on deep cobalt, a white border with blue dashes.
function itaLemons(ctx, W, H) {
  const C = { field: '#1f3f8a', field2: '#1b3880', branch: '#5a3a24', leaf: '#3f8a3a', leaf2: '#2a6a2e', vein: '#7ab86a', lemon: '#f4cc2a', lemon2: '#e09a1a', white: '#f6f2e6', blue: '#6a8ad0' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.white; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.field; for (let i = 2; i < cols - 2; i += 4) { x.fillRect(i, 2, 2, 1); x.fillRect(i, rows - 3, 2, 1); } for (let j = 2; j < rows - 2; j += 4) { x.fillRect(2, j, 1, 2); x.fillRect(cols - 3, j, 1, 2); }
    x.fillStyle = C.blue; x.fillRect(5, 5, cols - 10, rows - 10);
    const fx = 6, fy = 6, fw = cols - 12, fh = rows - 12;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 9) % 3 === 1 ? C.field2 : C.field; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const S = fh / 2.1;
    const sprig = (cx, cy, flip) => {
      x.save(); x.translate(cx, cy); x.scale(flip, 1);
      x.strokeStyle = C.branch; x.lineWidth = 1.6; x.lineCap = 'round';
      x.beginPath(); x.moveTo(-S * 0.55, -S * 0.32); x.quadraticCurveTo(-S * 0.05, -S * 0.42, S * 0.5, -S * 0.12); x.stroke();
      for (const [t, up] of [[0.12, 1], [0.3, -1], [0.45, 1], [0.62, -1], [0.8, 1], [0.95, -1]]) {
        const px = -S * 0.55 + S * 1.05 * t, py = -S * 0.32 - Math.sin(t * Math.PI) * S * 0.08 + t * S * 0.2;
        leaf(x, px, py, S * 0.22, up > 0 ? -1.1 : 0.9, up > 0 ? C.leaf : C.leaf2, C.vein);
      }
      for (const [t, dy, s] of [[0.28, 0.16, 0.12], [0.5, 0.2, 0.14], [0.72, 0.12, 0.12]]) { const px = -S * 0.55 + S * 1.05 * t, py = -S * 0.28 + t * S * 0.16; x.strokeStyle = C.branch; x.lineWidth = 0.8; x.beginPath(); x.moveTo(px, py); x.lineTo(px, py + S * dy - S * s * 0.6); x.stroke(); lemonFruit(x, px, py + S * dy, S * s, 1.35, C.lemon, C.lemon2); }
      for (const [bx, by] of [[S * 0.42, -S * 0.2], [-S * 0.3, -S * 0.44]]) { for (let p = 0; p < 5; p++) { const a = (p * Math.PI * 2) / 5; x.fillStyle = C.white; x.beginPath(); x.arc(bx + Math.cos(a) * 1.4, by + Math.sin(a) * 1.4, 1.2, 0, Math.PI * 2); x.fill(); } x.fillStyle = C.lemon; x.fillRect(bx - 0.5, by - 0.5, 1, 1); }
      x.restore();
    };
    for (let j = 0; j < 3; j++) for (let i = -1; i < 5; i++) sprig(fx + (i + 0.5 + (j % 2 ? 0.5 : 0)) * fw / 4, fy + (j + 0.62) * fh / 2.6, (i + j) % 2 ? -1 : 1);
    x.restore();
  });
}

// Venetian damask: a big ogival lattice of leafy bands, a pomegranate and palmettes in every cell, woven crimson on
// crimson with a few gold threads.
function itaDamask(ctx, W, H) {
  const C = { field: '#8a1824', dark: '#b8343e', deep: '#5a111c', gold: '#d6a84a', gold2: '#a87a2e', cream: '#efe0c0', sheen: '#d0545a' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.deep; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.gold; x.fillRect(3, 3, cols - 6, 1); x.fillRect(3, rows - 4, cols - 6, 1); x.fillRect(3, 3, 1, rows - 6); x.fillRect(cols - 4, 3, 1, rows - 6);
    for (const [len, put] of [[cols - 16, (a) => { put2(8 + a, 7); put2(8 + a, rows - 7); }], [rows - 16, (a) => { put2(7, 8 + a); put2(cols - 7, 8 + a); }]]) { const { n, d } = evenSteps(len, 8); for (let i = 0; i <= n; i++) put(i * d); }
    function put2(px, py) { x.fillStyle = C.gold2; x.beginPath(); x.moveTo(px, py - 2.4); x.lineTo(px + 2.4, py); x.lineTo(px, py + 2.4); x.lineTo(px - 2.4, py); x.closePath(); x.fill(); x.fillStyle = C.gold; x.fillRect(px - 0.5, py - 0.5, 1, 1); }
    x.fillStyle = C.gold; x.fillRect(10, 10, cols - 20, 1); x.fillRect(10, rows - 11, cols - 20, 1); x.fillRect(10, 10, 1, rows - 20); x.fillRect(cols - 11, 10, 1, rows - 20);
    const fx = 11, fy = 11, fw = cols - 22, fh = rows - 22;
    x.fillStyle = C.field; x.fillRect(fx, fy, fw, fh);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const nc = 4, cw = fw / nc;
    // the lattice: two sine bands per column, a dark leafy band with a gold thread
    for (let k = 0; k <= nc; k++) for (const ph of [0, Math.PI]) {
      const xAt = (y) => fx + k * cw + Math.sin(((y - fy) / fh) * Math.PI * 2 + ph) * cw * 0.5;
      x.strokeStyle = C.dark; x.lineWidth = 3.4; x.beginPath(); for (let y = fy - 2; y <= fy + fh + 2; y++) y > fy - 2 ? x.lineTo(xAt(y), y) : x.moveTo(xAt(y), y); x.stroke();
      x.strokeStyle = C.gold2; x.lineWidth = 0.8; x.beginPath(); for (let y = fy - 2; y <= fy + fh + 2; y++) y > fy - 2 ? x.lineTo(xAt(y), y) : x.moveTo(xAt(y), y); x.stroke();
      for (let t = 0.08; t < 1; t += 0.16) { const y = fy + fh * t; leaf(x, xAt(y), y, 6, (k + t * 10) % 2 > 1 ? 0.6 : Math.PI - 0.6, C.dark); }
    }
    // in each cell: the pomegranate on a palmette
    const pom = (cx, cy, s) => {
      palmette(x, cx, cy + s * 0.55, s * 0.9, 0, C.dark, C.deep);
      x.fillStyle = C.dark; x.beginPath(); x.arc(cx, cy, s * 0.5, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.sheen; x.beginPath(); x.arc(cx - s * 0.12, cy - s * 0.12, s * 0.26, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.deep; x.beginPath(); x.arc(cx, cy + s * 0.05, s * 0.32, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.gold; for (let k = 0; k < 7; k++) { const a = k * 0.9, r = s * (0.08 + (k % 3) * 0.08); x.fillRect(cx + Math.cos(a) * r - 0.5, cy + 0.05 * s + Math.sin(a) * r - 0.5, 1, 1); }
      x.fillStyle = C.dark; x.beginPath(); x.moveTo(cx - s * 0.22, cy - s * 0.42); x.lineTo(cx - s * 0.12, cy - s * 0.66); x.lineTo(cx, cy - s * 0.48); x.lineTo(cx + s * 0.12, cy - s * 0.66); x.lineTo(cx + s * 0.22, cy - s * 0.42); x.closePath(); x.fill();
      leaf(x, cx - s * 0.4, cy + s * 0.2, s * 0.6, Math.PI - 0.5, C.dark); leaf(x, cx + s * 0.4, cy + s * 0.2, s * 0.6, 0.5, C.dark);
      x.strokeStyle = C.gold2; x.lineWidth = 0.8; x.beginPath(); x.arc(cx, cy, s * 0.5, 0, Math.PI * 2); x.stroke();
    };
    for (let k = -1; k <= nc; k++) { pom(fx + (k + 0.5) * cw, fy + fh * 0.25, cw * 0.36); pom(fx + (k + 1) * cw, fy + fh * 0.75, cw * 0.36); }
    x.restore();
  });
}

// A Roman floor mosaic: black on white tesserae, a running-wave border, a field of black and white triangles, and in
// the middle a round panel of the sea with two dolphins.
function itaMosaic(ctx, W, H) {
  const C = { white: '#efe8da', black: '#1e1c1c', ochre: '#c8783a', red: '#9a3a2a', sea: '#2f5f8a', sea2: '#3f7aa8', grey: '#8a8c90', light: '#c8cfd4' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.black; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.white; x.fillRect(2, 2, cols - 4, rows - 4);
    // running wave (each curl a crest rolling to the right)
    const WAVE = ['..###...', '.#...#..', '#..#..#.', '#.##..#.', '#.....##', '########'];
    ringKnots(x, cols, rows, 3, 6, 8, (i, j) => (WAVE[j][((i % 8) + 8) % 8] === '#' ? C.black : null), (a, b) => { x.fillStyle = C.black; x.fillRect(a + 1, b + 1, 4, 4); x.fillStyle = C.ochre; x.fillRect(a + 2, b + 2, 2, 2); });
    x.fillStyle = C.black; x.fillRect(10, 10, cols - 20, 1); x.fillRect(10, rows - 11, cols - 20, 1); x.fillRect(10, 10, 1, rows - 20); x.fillRect(cols - 11, 10, 1, rows - 20);
    const fx = 12, fy = 12, fw = cols - 24, fh = rows - 24;
    // field: rows of black and white triangles (knot by knot so they stay sharp)
    const T = 8;
    for (let yy = 0; yy < fh; yy++) for (let xx = 0; xx < fw; xx++) {
      const r = Math.floor(yy / T), u = xx % T, v = yy % T, flip = (Math.floor(xx / T) + r) % 2;
      x.fillStyle = (flip ? u > v : u + v < T - 1) ? C.black : C.white; x.fillRect(fx + xx, fy + yy, 1, 1);
    }
    // the round panel
    const cx = fx + fw / 2, cy = fy + fh / 2, R = fh * 0.42;
    x.fillStyle = C.white; x.beginPath(); x.arc(cx, cy, R + 4, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.black; x.beginPath(); x.arc(cx, cy, R + 2, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.ochre; x.beginPath(); x.arc(cx, cy, R + 1, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.red; for (let k = 0; k < 28; k++) { const a = (k / 28) * Math.PI * 2; x.fillRect(cx + Math.cos(a) * (R + 1) - 0.5, cy + Math.sin(a) * (R + 1) - 0.5, 1, 1); }
    x.fillStyle = C.sea; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill();
    x.save(); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.clip();
    x.strokeStyle = C.sea2; x.lineWidth = 1; for (let k = -5; k <= 5; k++) { x.beginPath(); for (let t = -1; t <= 1; t += 0.05) { const px = cx + t * R, py = cy + k * 5 + Math.sin(t * 12 + k) * 1.2; t > -1 ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
    const dol = (px, py, s, flip) => {
      x.save(); x.translate(px, py); x.scale(flip, 1);
      x.fillStyle = C.grey; x.beginPath(); x.moveTo(s * 0.6, s * 0.1); x.quadraticCurveTo(s * 0.3, -s * 0.5, -s * 0.3, -s * 0.2); x.quadraticCurveTo(-s * 0.55, -s * 0.05, -s * 0.6, s * 0.25); x.lineTo(-s * 0.45, s * 0.2); x.quadraticCurveTo(-s * 0.1, -s * 0.05, s * 0.45, s * 0.22); x.closePath(); x.fill();
      x.fillStyle = C.light; x.beginPath(); x.moveTo(s * 0.45, s * 0.2); x.quadraticCurveTo(0, 0.05 * s, -s * 0.3, -s * 0.02); x.quadraticCurveTo(0, -s * 0.12, s * 0.5, s * 0.08); x.closePath(); x.fill();
      x.fillStyle = C.grey; x.beginPath(); x.moveTo(0, -s * 0.33); x.lineTo(-s * 0.08, -s * 0.5); x.lineTo(-s * 0.16, -s * 0.28); x.fill();
      x.beginPath(); x.moveTo(-s * 0.6, s * 0.25); x.lineTo(-s * 0.78, s * 0.12); x.lineTo(-s * 0.7, s * 0.3); x.lineTo(-s * 0.82, s * 0.42); x.closePath(); x.fill();
      x.fillStyle = C.black; x.fillRect(s * 0.38, -s * 0.06, 1, 1);
      x.restore();
    };
    dol(cx - R * 0.15, cy - R * 0.32, R * 0.9, 1); dol(cx + R * 0.15, cy + R * 0.38, R * 0.9, -1);
    x.restore();
  });
}

// Florentine marbled paper: combed bands of colour swirled into peacock curls, bound in tooled leather.
function itaMarble(ctx, W, H) {
  const C = { red: '#a8322a', ochre: '#d8a040', teal: '#2f7a7a', cream: '#efe4c8', navy: '#1f2f5a', rose: '#d87a6a', leather: '#4a2a1c', gold: '#d6a84a' };
  const seq = [C.red, C.cream, C.ochre, C.cream, C.teal, C.navy, C.cream, C.rose];
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.leather; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.gold; x.fillRect(4, 4, cols - 8, 1); x.fillRect(4, rows - 5, cols - 8, 1); x.fillRect(4, 4, 1, rows - 8); x.fillRect(cols - 5, 4, 1, rows - 8);
    for (const [a, b] of [[5, 5], [cols - 6, 5], [5, rows - 6], [cols - 6, rows - 6]]) { x.fillRect(a - 1, b, 3, 1); x.fillRect(a, b - 1, 1, 3); }
    const fx = 7, fy = 7, fw = cols - 14, fh = rows - 14;
    for (let yy = 0; yy < fh; yy++) for (let xx = 0; xx < fw; xx++) {
      // combed stripes, pulled into curls by a second comb running across
      const curl = Math.sin(xx * 0.32) * 2.2;
      const v = yy + curl + 4 * Math.sin(xx * 0.045 + yy * 0.02) + 1.6 * Math.sin(yy * 0.4 + xx * 0.1);
      x.fillStyle = seq[((Math.floor(v / 2.6) % seq.length) + seq.length) % seq.length]; x.fillRect(fx + xx, fy + yy, 1, 1);
    }
  });
}

// Venice: palazzi along a canal, striped mooring poles, a gondola and its gondolier.
function itaVenice(ctx, W, H) {
  const u = H / 100, wl = H * 0.6;
  const sky = ctx.createLinearGradient(0, 0, 0, wl); sky.addColorStop(0, '#7fb8e2'); sky.addColorStop(1, '#f2dcc0');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const houses = [[0, 0.16, 0.2, '#e8b89a', '#f6efe2'], [0.16, 0.34, 0.12, '#d8a24a', '#f6efe2'], [0.34, 0.5, 0.26, '#c8604a', '#f2e6d0'], [0.5, 0.68, 0.16, '#efd8c0', '#b8604a'], [0.68, 0.84, 0.22, '#e69a8a', '#f6efe2'], [0.84, 1, 0.14, '#d8b86a', '#f6efe2']];
  for (const [a, b, top, wall, trim] of houses) {
    const x0 = W * a, x1 = W * b, y0 = H * top, w = x1 - x0;
    ctx.fillStyle = wall; ctx.fillRect(x0, y0, w + 1, wl - y0);
    ctx.fillStyle = trim; ctx.fillRect(x0, y0, w, 1.6 * u); ctx.fillRect(x0, wl - 3 * u, w, 3 * u);
    // chimneys: the Venetian funnel kind
    ctx.fillStyle = '#8a4a3a'; const chx = x0 + w * 0.7; ctx.fillRect(chx, y0 - 5 * u, 2 * u, 5 * u); ctx.beginPath(); ctx.moveTo(chx - 1.2 * u, y0 - 8 * u); ctx.lineTo(chx + 3.2 * u, y0 - 8 * u); ctx.lineTo(chx + 2 * u, y0 - 5 * u); ctx.lineTo(chx, y0 - 5 * u); ctx.closePath(); ctx.fill();
    // arched windows in rows, a balcony on the main floor
    const nw = Math.max(2, Math.round(w / (6 * u))), ww = (w / nw) * 0.42;
    for (let r = 0; r < 3; r++) { const wy = y0 + (5 + r * 11) * u; if (wy + 8 * u > wl - 6 * u) break; for (let k = 0; k < nw; k++) { const wx = x0 + (w / nw) * (k + 0.5) - ww / 2; ctx.fillStyle = trim; roundRect(ctx, wx - 0.8 * u, wy - 0.8 * u, ww + 1.6 * u, 9.6 * u, [ww / 2 + 0.8 * u, ww / 2 + 0.8 * u, 0, 0]); ctx.fill(); ctx.fillStyle = '#3a3448'; roundRect(ctx, wx, wy, ww, 8 * u, [ww / 2, ww / 2, 0, 0]); ctx.fill(); } if (r === 1) { ctx.fillStyle = trim; ctx.fillRect(x0 + w * 0.2, wy + 8 * u, w * 0.6, 1.2 * u); for (let k = 0; k < 8; k++) ctx.fillRect(x0 + w * (0.22 + k * 0.08), wy + 6 * u, 0.6 * u, 2 * u); } }
    // a water door
    ctx.fillStyle = '#2a2a34'; roundRect(ctx, x0 + w * 0.38, wl - 9 * u, w * 0.24, 9 * u, [w * 0.12, w * 0.12, 0, 0]); ctx.fill();
  }
  // the canal: reflections of the houses broken into ripples
  const water = ctx.createLinearGradient(0, wl, 0, H); water.addColorStop(0, '#2f7f7a'); water.addColorStop(1, '#1f5a5c');
  ctx.fillStyle = water; ctx.fillRect(0, wl, W, H - wl);
  for (const [a, b, , wall] of houses) for (let k = 0; k < 9; k++) { ctx.fillStyle = wall; ctx.globalAlpha = 0.35 - k * 0.03; ctx.fillRect(W * a + ((k * 13) % 7) * u, wl + 2 * u + k * 3.2 * u, (W * (b - a)) * (0.7 - k * 0.04), 1.1 * u); }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#9fd0c8'; for (let k = 0; k < 18; k++) ctx.fillRect(((k * 37) % 100) / 100 * W, wl + ((k * 17) % 36) * u, 6 * u, 0.6 * u);
  // striped mooring poles
  for (const [px, c] of [[0.08, '#c8322a'], [0.12, '#c8322a'], [0.61, '#2f5fa8'], [0.65, '#2f5fa8'], [0.93, '#c8322a']]) {
    const x0 = W * px; ctx.fillStyle = '#f4efe6'; ctx.fillRect(x0 - 1 * u, H * 0.42, 2 * u, H * 0.42);
    ctx.fillStyle = c; for (let y = H * 0.42; y < H * 0.84; y += 4 * u) { ctx.beginPath(); ctx.moveTo(x0 - 1 * u, y); ctx.lineTo(x0 + 1 * u, y - 1.4 * u); ctx.lineTo(x0 + 1 * u, y + 0.6 * u); ctx.lineTo(x0 - 1 * u, y + 2 * u); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = '#e8b448'; ctx.beginPath(); ctx.arc(x0, H * 0.42, 1.4 * u, 0, Math.PI * 2); ctx.fill();
  }
  // the gondola, black and curved up at both ends, its comb-shaped prow, the gondolier rowing
  const gx = W * 0.4, gy = H * 0.84, L = 70 * u;
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(gx - L * 0.45, gy + 2 * u, L * 0.9, 1.6 * u);
  ctx.fillStyle = '#16141a'; ctx.beginPath();
  for (let k = 0; k <= 30; k++) { const t = k / 30, px = gx - L / 2 + L * t, py = gy - 1 * u - 11 * u * Math.pow(Math.abs(t - 0.5) * 2, 4); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  for (let k = 30; k >= 0; k--) { const t = k / 30, px = gx - L / 2 + L * t, py = gy + 2.4 * u - 9 * u * Math.pow(Math.abs(t - 0.5) * 2, 4); ctx.lineTo(px, py); }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#d8d6d0'; const px = gx + L / 2 - 1 * u, py = gy - 12 * u; ctx.fillRect(px - 0.6 * u, py, 1.2 * u, 7 * u); for (let k = 0; k < 6; k++) ctx.fillRect(px - 2.8 * u, py + 1 * u + k * 1.1 * u, 2.4 * u, 0.6 * u);
  ctx.fillStyle = '#a8322a'; ctx.fillRect(gx - 4 * u, gy - 3 * u, 8 * u, 2.2 * u);
  const sx = gx - L * 0.32, sy = gy - 2 * u;
  ctx.fillStyle = '#16141a'; ctx.fillRect(sx - 1.6 * u, sy - 6 * u, 1.4 * u, 6 * u); ctx.fillRect(sx + 0.4 * u, sy - 6 * u, 1.4 * u, 6 * u);
  ctx.fillStyle = '#f4f2ec'; ctx.fillRect(sx - 2.2 * u, sy - 14 * u, 4.4 * u, 8.4 * u); ctx.fillStyle = '#1f2f5a'; for (let k = 0; k < 4; k++) ctx.fillRect(sx - 2.2 * u, sy - 13.4 * u + k * 2 * u, 4.4 * u, 1 * u);
  ctx.fillStyle = '#e8c49a'; ctx.beginPath(); ctx.arc(sx, sy - 16 * u, 1.8 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8c870'; ctx.fillRect(sx - 3.6 * u, sy - 18 * u, 7.2 * u, 1 * u); ctx.fillRect(sx - 2 * u, sy - 19.6 * u, 4 * u, 1.8 * u); ctx.fillStyle = '#c8322a'; ctx.fillRect(sx - 2 * u, sy - 18.6 * u, 4 * u, 0.6 * u);
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(sx + 2 * u, sy - 12 * u); ctx.lineTo(sx - 9 * u, sy + 8 * u); ctx.stroke();
}

// Tuscany: a cypress-lined road winding up to a farmhouse on the hill, golden fields at sunset.
function itaTuscany(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45); sky.addColorStop(0, '#8a9ad0'); sky.addColorStop(0.6, '#f2b884'); sky.addColorStop(1, '#f8d8a8');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff0c0'; ctx.beginPath(); ctx.arc(W * 0.78, H * 0.3, 6 * u, 0, Math.PI * 2); ctx.fill();
  const hill = (y0, amp, f, ph, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let k = 0; k <= 40; k++) { const t = k / 40; ctx.lineTo(W * t, H * (y0 - amp * Math.sin(t * f + ph))); } ctx.lineTo(W, H); ctx.fill(); };
  hill(0.42, 0.05, 6, 0.5, '#a8a0b8'); hill(0.5, 0.06, 4.5, 2, '#9aa86a');
  hill(0.58, 0.08, 3.4, 0.4, '#d8b04a');
  // field rows on the golden hill
  ctx.strokeStyle = 'rgba(160,110,40,.35)'; ctx.lineWidth = 0.7 * u; for (let k = 0; k < 12; k++) { ctx.beginPath(); for (let t = 0; t <= 1; t += 0.05) { const px = W * t, py = H * (0.62 + k * 0.03 - 0.08 * Math.sin(t * 3.4 + 0.4)); t ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  hill(0.84, 0.06, 2.6, 2.4, '#7a9a4a');
  ctx.fillStyle = '#8aaa5a'; for (let k = 0; k < 14; k++) ctx.fillRect(0, H * (0.86 + k * 0.012), W, 0.4 * u);
  // the farmhouse on the crest of the golden hill
  const hx = W * 0.6, hy = H * 0.535;
  ctx.fillStyle = '#e8cc9e'; ctx.fillRect(hx - 9 * u, hy - 7 * u, 18 * u, 7 * u); ctx.fillRect(hx + 4 * u, hy - 12 * u, 5 * u, 6 * u);
  ctx.fillStyle = '#b8502a'; ctx.beginPath(); ctx.moveTo(hx - 10 * u, hy - 7 * u); ctx.lineTo(hx - 6 * u, hy - 10 * u); ctx.lineTo(hx + 6 * u, hy - 10 * u); ctx.lineTo(hx + 10 * u, hy - 7 * u); ctx.fill(); ctx.fillRect(hx + 3.4 * u, hy - 13 * u, 6.2 * u, 1.4 * u);
  ctx.fillStyle = '#6a4a3a'; for (const dx of [-6, -2, 2]) ctx.fillRect(hx + dx * u, hy - 5 * u, 1.6 * u, 2 * u);
  // the road, and cypresses lining it, smaller as it climbs
  const road = []; for (let k = 0; k <= 30; k++) { const t = k / 30; road.push([W * 0.36 + (hx - 3 * u - W * 0.36) * t + W * 0.09 * Math.sin(t * Math.PI * 2) * (1 - t), H * 1.02 + (hy + 0.5 * u - H * 1.02) * t]); }
  ctx.strokeStyle = '#efdcb4'; ctx.lineCap = 'round'; for (let k = 0; k < road.length - 1; k++) { const t = k / 30; ctx.lineWidth = (6 - 5 * t) * u; ctx.beginPath(); ctx.moveTo(...road[k]); ctx.lineTo(...road[k + 1]); ctx.stroke(); }
  const cypress = (px, py, h) => { ctx.fillStyle = '#24402a'; ctx.beginPath(); ctx.ellipse(px, py - h / 2, Math.max(h * 0.1, 0.9 * u), h / 2, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#35583a'; ctx.beginPath(); ctx.ellipse(px - h * 0.03, py - h / 2, Math.max(h * 0.04, 0.4 * u), h * 0.42, 0, 0, Math.PI * 2); ctx.fill(); };
  for (let k = 26; k >= 2; k -= 4) { const t = k / 30, [rx, ry] = road[k], h = (19 - 14 * t) * u, off = (6 - 4.4 * t) * u; cypress(rx - off, ry, h); cypress(rx + off, ry, h); }
  for (const [a, b, h] of [[0.08, 0.66, 18], [0.12, 0.64, 22], [0.9, 0.62, 20], [0.94, 0.63, 16]]) cypress(W * a, H * b, h * u);
}

// The Cinque Terre: tall houses in every colour piled up the cliff above a little harbour, terraced vines on top.
function itaCinqueTerre(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.4); sky.addColorStop(0, '#5aa2dc'); sky.addColorStop(1, '#cfe8f4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  // the hill with its vine terraces
  ctx.fillStyle = '#5f8a4a'; ctx.beginPath(); ctx.moveTo(0, H * 0.6); ctx.quadraticCurveTo(W * 0.2, H * 0.06, W * 0.55, H * 0.12); ctx.quadraticCurveTo(W * 0.85, H * 0.18, W, H * 0.4); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.strokeStyle = '#8aaa5a'; ctx.lineWidth = 0.8 * u; for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.moveTo(0, H * (0.24 + k * 0.03)); ctx.quadraticCurveTo(W * 0.5, H * (0.16 + k * 0.03), W, H * (0.36 + k * 0.025)); ctx.stroke(); }
  // the sea across the bottom, the rocky point under the village and the cliff on the right
  const sea = ctx.createLinearGradient(0, H * 0.8, 0, H); sea.addColorStop(0, '#2f8ab8'); sea.addColorStop(1, '#1f6a9a');
  ctx.fillStyle = sea; ctx.fillRect(0, H * 0.84, W, H * 0.16);
  const rockTop = (px) => H * (0.8 - 0.14 * Math.sin(Math.PI * Math.min(1, Math.max(0, px / (W * 0.66)))));
  ctx.fillStyle = '#8a7660'; ctx.beginPath(); ctx.moveTo(0, H * 0.86); for (let k = 0; k <= 30; k++) { const px = W * 0.68 * k / 30; ctx.lineTo(px, rockTop(px) + 1 * u); } ctx.lineTo(W * 0.69, H * 0.86); ctx.fill();
  ctx.strokeStyle = '#6a5a48'; ctx.lineWidth = 0.7 * u; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(W * (0.04 + k * 0.1), H * 0.86); ctx.lineTo(W * (0.07 + k * 0.1), rockTop(W * (0.07 + k * 0.1)) + 4 * u); ctx.stroke(); }
  ctx.fillStyle = '#7a6650'; ctx.beginPath(); ctx.moveTo(W * 0.7, H * 0.86); const cliff = [[0.72, 0.74], [0.76, 0.72], [0.8, 0.66], [0.85, 0.67], [0.9, 0.62], [0.95, 0.64], [1, 0.6]]; for (const [a, b] of cliff) ctx.lineTo(W * a, H * b); ctx.lineTo(W, H * 0.86); ctx.fill();
  ctx.fillStyle = '#5e4e3e'; for (const [a, b] of cliff.slice(0, -1)) ctx.fillRect(W * a, H * (b + 0.04), 0.9 * u, H * (0.82 - b));
  ctx.fillStyle = '#4e7a3e'; for (const [a, b] of cliff) { ctx.beginPath(); ctx.arc(W * a, H * b, 2.2 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#9fd4e8'; for (let k = 0; k < 12; k++) ctx.fillRect(((k * 37) % 92) / 100 * W, H * (0.87 + (k % 4) * 0.03), 5 * u, 0.6 * u);
  // the houses: columns of tall narrow houses piled up the point, small green shutters
  const cols = ['#e86a4a', '#f2c040', '#e8a0a8', '#f08a3a', '#d8d0b8', '#c8442e', '#f6e08a', '#a8c8d8', '#e0b0a0', '#f4a868'];
  let k = 0;
  for (let col = 0; col < 11; col++) {
    const w = W * 0.056, x0 = W * (0.02 + col * 0.058), base = rockTop(x0 + w / 2) + 1 * u;
    let y = base;
    const floors = 2 + ((col * 7) % 3);
    for (let r = 0; r < floors; r++) {
      const hgt = (10 + ((col * 3 + r * 5) % 3) * 1.5) * u, c = cols[k++ % cols.length];
      y -= hgt;
      ctx.fillStyle = c; ctx.fillRect(x0, y, w, hgt + 0.5);
      ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x0 + w - 1 * u, y, 1 * u, hgt);
      ctx.fillStyle = '#3f7a4a'; for (let s = 0; s < 2; s++) for (let q = 0; q < 2; q++) ctx.fillRect(x0 + w * (0.2 + q * 0.42), y + hgt * (0.22 + s * 0.4), w * 0.18, hgt * 0.2);
    }
    ctx.fillStyle = '#6a6a72'; ctx.fillRect(x0 - 0.4 * u, y - 1.2 * u, w + 0.8 * u, 1.4 * u);
  }
  // the church tower
  ctx.fillStyle = '#efe6d4'; ctx.fillRect(W * 0.5, H * 0.24, 5 * u, 26 * u); ctx.fillStyle = '#3a3a44'; ctx.fillRect(W * 0.5 + 1.4 * u, H * 0.27, 2.2 * u, 3.4 * u); ctx.fillStyle = '#b8502a'; ctx.beginPath(); ctx.moveTo(W * 0.5 - 0.6 * u, H * 0.24); ctx.lineTo(W * 0.5 + 2.5 * u, H * 0.18); ctx.lineTo(W * 0.5 + 5.6 * u, H * 0.24); ctx.fill();
  // boats pulled up and in the water
  for (const [bx, by, c] of [[0.1, 0.92, '#2f6fb8'], [0.26, 0.95, '#c8322a'], [0.44, 0.91, '#f2c040'], [0.6, 0.95, '#3f8a4a'], [0.84, 0.93, '#c8322a']]) { ctx.fillStyle = '#f6f2e6'; ctx.beginPath(); ctx.ellipse(W * bx, H * by, 7 * u, 2.4 * u, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = c; ctx.fillRect(W * bx - 7 * u, H * by - 0.4 * u, 14 * u, 1.4 * u); }
}

// Pizza margherita on a wooden peel over a red-and-white checked cloth, seen from above.
function itaPizza(ctx, W, H) {
  const u = H / 100, cx = W * 0.5, cy = H * 0.5;
  ctx.fillStyle = '#f6f2ea'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(200,40,42,.55)'; for (let k = 0; k * 8 * u < W; k += 2) ctx.fillRect(k * 8 * u, 0, 8 * u, H); for (let k = 0; k * 8 * u < H; k += 2) ctx.fillRect(0, k * 8 * u, W, 8 * u);
  // the peel
  ctx.fillStyle = '#b8824a'; ctx.fillRect(cx + 34 * u, cy - 4 * u, 42 * u, 8 * u);
  ctx.fillStyle = '#d0a06a'; ctx.beginPath(); ctx.arc(cx, cy, 44 * u, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#b8824a'; ctx.lineWidth = 0.5 * u; for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(cx - 40 * u, cy + k * 6 * u); ctx.lineTo(cx + 40 * u, cy + k * 6 * u); ctx.stroke(); }
  // crust, sauce, mozzarella, basil
  ctx.fillStyle = '#e0a052'; ctx.beginPath(); ctx.arc(cx, cy, 39 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a4a20'; for (let k = 0; k < 22; k++) { const a = k * 0.29 + (k % 3) * 0.1, r = (36 + (k % 3)) * u; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, (0.8 + (k % 2)) * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#c8302a'; ctx.beginPath(); ctx.arc(cx, cy, 33 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e04a32'; for (let k = 0; k < 14; k++) { const a = k * 1.7, r = ((k * 7) % 28) * u; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.4 * u, 0, Math.PI * 2); ctx.fill(); }
  for (const [a, r, s] of [[0.3, 20, 7], [1.5, 22, 6.5], [2.6, 19, 7.5], [3.7, 22, 6], [4.8, 20, 7], [5.8, 21, 6], [0, 6, 7.5], [2.2, 9, 5.5]]) {
    const mx = cx + Math.cos(a) * r * u, my = cy + Math.sin(a) * r * u;
    ctx.fillStyle = '#f8f2e0'; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const t = (k / 10) * Math.PI * 2, rr = s * u * (0.85 + 0.15 * Math.sin(t * 3 + a)); k ? ctx.lineTo(mx + Math.cos(t) * rr, my + Math.sin(t) * rr) : ctx.moveTo(mx + Math.cos(t) * rr, my + Math.sin(t) * rr); } ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#efe0b8'; ctx.beginPath(); ctx.arc(mx + s * u * 0.25, my + s * u * 0.25, s * u * 0.35, 0, Math.PI * 2); ctx.fill();
  }
  const basil = (bx, by, a) => { ctx.save(); ctx.translate(bx, by); ctx.rotate(a); ctx.fillStyle = '#2f7a2a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(4 * u, -3.4 * u, 8 * u, 0); ctx.quadraticCurveTo(4 * u, 3.4 * u, 0, 0); ctx.fill(); ctx.strokeStyle = '#5aa04a'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); ctx.moveTo(1 * u, 0); ctx.lineTo(7 * u, 0); ctx.stroke(); ctx.restore(); };
  for (const [a, r, rot] of [[0.9, 12, 0.4], [2.0, 26, 2.1], [3.2, 13, -0.8], [4.3, 27, 1.2], [5.4, 12, 2.8], [0.1, 27, -1.6]]) basil(cx + Math.cos(a) * r * u, cy + Math.sin(a) * r * u, rot);
  ctx.strokeStyle = 'rgba(90,30,20,.45)'; ctx.lineWidth = 0.6 * u; for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 4; ctx.beginPath(); ctx.moveTo(cx - Math.cos(a) * 38 * u, cy - Math.sin(a) * 38 * u); ctx.lineTo(cx + Math.cos(a) * 38 * u, cy + Math.sin(a) * 38 * u); ctx.stroke(); }
}

const ITALY_SCENES = [
  (c, w, h) => { c.fillStyle = '#1f3f8a'; c.fillRect(0, 0, w, h); for (let k = 0; k < 3; k++) { c.fillStyle = '#3f8a3a'; c.beginPath(); c.ellipse(w * (k % 2 ? 0.7 : 0.3), h * (0.18 + k * 0.32), w * 0.22, h * 0.06, 0.5, 0, Math.PI * 2); c.fill(); c.fillStyle = '#f4cc2a'; c.beginPath(); c.ellipse(w * (k % 2 ? 0.35 : 0.62), h * (0.25 + k * 0.32), w * 0.24, h * 0.09, 0, 0, Math.PI * 2); c.fill(); } }, // lemons
  (c, w, h) => { c.fillStyle = '#f2b884'; c.fillRect(0, 0, w, h); c.fillStyle = '#d8b04a'; c.fillRect(0, h * 0.6, w, h); c.fillStyle = '#24402a'; for (const x of [0.25, 0.5, 0.75]) { c.beginPath(); c.ellipse(w * x, h * 0.48, w * 0.08, h * 0.3, 0, 0, Math.PI * 2); c.fill(); } }, // cypresses
  (c, w, h) => { c.fillStyle = '#e8b89a'; c.fillRect(0, 0, w, h * 0.6); c.fillStyle = '#2f7f7a'; c.fillRect(0, h * 0.6, w, h); c.fillStyle = '#3a3448'; for (let k = 0; k < 3; k++) c.fillRect(w * (0.12 + k * 0.3), h * 0.18, w * 0.16, h * 0.22); c.fillStyle = '#16141a'; c.beginPath(); c.ellipse(w * 0.5, h * 0.8, w * 0.48, h * 0.06, 0, 0, Math.PI * 2); c.fill(); }, // Venice
  (c, w, h) => { const cs = ['#e86a4a', '#f2c040', '#e8a0a8', '#f08a3a', '#a8c8d8']; for (let k = 0; k < 5; k++) { c.fillStyle = cs[k]; c.fillRect(0, (h * k) / 5, w, h / 5 + 1); c.fillStyle = '#3f7a4a'; c.fillRect(w * 0.2, (h * k) / 5 + h * 0.05, w * 0.18, h * 0.09); c.fillRect(w * 0.6, (h * k) / 5 + h * 0.05, w * 0.18, h * 0.09); } }, // houses
  (c, w, h) => { c.fillStyle = '#d8a24a'; c.fillRect(0, 0, w, h); c.fillStyle = '#8a5a2a'; for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) c.fillRect(w * (0.15 + k * 0.45), h * (0.12 + r * 0.3), w * 0.25, h * 0.18); }, // arches of the Colosseum
];
function itaPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'ITALY', ITALY_SCENES); }


// The Greek key: a white meander round a blue border, a bold meander across the middle, rows of teeth and dots.
function grcMeander(ctx, W, H) {
  const C = { navy: '#1d3a7a', white: '#f4f2ea', sky: '#6a9ad6', ochre: '#d8a64a', dark: '#14284e' };
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.dark); R(1, 1, cols - 2, rows - 2, C.navy);
    ringKnots(x, cols, rows, 2, 8, 8, (i, j) => (meanderOn(i, j) ? C.white : null), (a, b) => { R(a + 1, b + 1, 6, 6, C.white); R(a + 2, b + 2, 4, 4, C.navy); R(a + 3, b + 3, 2, 2, C.ochre); });
    R(11, 11, cols - 22, 1, C.sky); R(11, rows - 12, cols - 22, 1, C.sky); R(11, 11, 1, rows - 22, C.sky); R(cols - 12, 11, 1, rows - 22, C.sky);
    const fx = 12, fy = 12, fw = cols - 24, fh = rows - 24;
    R(fx, fy, fw, fh, C.white);
    // teeth and dots above and below
    for (const [y0, dir] of [[fy + 1, 1], [fy + fh - 2, -1]]) {
      for (let i = 0; i < fw; i++) { const t = i % 6, hgt = 3 - Math.abs(t - 2.5) + 0.5; for (let k = 0; k < Math.floor(hgt); k++) R(fx + i, y0 + dir * k, 1, 1, C.navy); }
      for (let i = 3; i < fw; i += 6) R(fx + i - 1, y0 + dir * 6 - (dir < 0 ? 1 : 0), 2, 2, C.ochre);
    }
    // the band across the middle: a big meander, two knots to each step
    const bh = 24, by = Math.round(fy + fh / 2 - bh / 2);
    R(fx, by, fw, bh, C.navy); R(fx, by + 1, fw, 1, C.sky); R(fx, by + bh - 2, fw, 1, C.sky);
    const run = fw, off = Math.floor((run % 16) / 2);
    for (let i = 0; i < fw; i++) for (let j = 0; j < 16; j++) if (meanderOn(Math.floor((i - off) / 2), Math.floor(j / 2))) R(fx + i, by + 4 + j, 1, 1, C.white);
    // small diamonds scattered on the white
    for (const yy of [by - 9, by + bh + 8]) for (let i = 8; i < fw - 6; i += 14) { R(fx + i - 2, yy, 5, 1, C.navy); R(fx + i - 1, yy - 1, 3, 3, C.navy); R(fx + i, yy - 2, 1, 5, C.navy); R(fx + i, yy, 1, 1, C.ochre); }
  });
}

// A black horse with cream incised lines, as on black-figure pottery, drawn facing right.
function bfHorse(x, cx, cy, s, flip, col, line) {
  x.save(); x.translate(cx, cy); x.scale(flip, 1);
  x.fillStyle = col; x.strokeStyle = col; x.lineCap = 'round';
  x.beginPath(); x.ellipse(0, 0, s * 0.5, s * 0.19, 0, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.moveTo(s * 0.22, -s * 0.12); x.quadraticCurveTo(s * 0.44, -s * 0.34, s * 0.48, -s * 0.6); x.lineTo(s * 0.64, -s * 0.56); x.quadraticCurveTo(s * 0.6, -s * 0.24, s * 0.44, s * 0.06); x.closePath(); x.fill();
  x.beginPath(); x.moveTo(s * 0.46, -s * 0.62); x.lineTo(s * 0.62, -s * 0.68); x.lineTo(s * 0.86, -s * 0.44); x.lineTo(s * 0.8, -s * 0.36); x.lineTo(s * 0.6, -s * 0.46); x.closePath(); x.fill();
  x.beginPath(); x.moveTo(s * 0.52, -s * 0.64); x.lineTo(s * 0.52, -s * 0.78); x.lineTo(s * 0.6, -s * 0.66); x.fill();
  x.lineWidth = s * 0.075;
  for (const p of [[[-s * 0.36, s * 0.08], [-s * 0.46, s * 0.3], [-s * 0.44, s * 0.56]], [[-s * 0.24, s * 0.1], [-s * 0.2, s * 0.32], [-s * 0.24, s * 0.56]], [[s * 0.3, s * 0.08], [s * 0.36, s * 0.32], [s * 0.32, s * 0.56]], [[s * 0.38, s * 0.04], [s * 0.6, s * 0.16], [s * 0.66, s * 0.38]]]) { x.beginPath(); x.moveTo(...p[0]); x.lineTo(...p[1]); x.lineTo(...p[2]); x.stroke(); }
  x.lineWidth = s * 0.07; x.beginPath(); x.moveTo(-s * 0.48, -s * 0.06); x.quadraticCurveTo(-s * 0.72, 0, -s * 0.66, s * 0.42); x.stroke();
  x.strokeStyle = line; x.lineWidth = 0.8;
  x.beginPath(); x.moveTo(s * 0.42, -s * 0.12); x.quadraticCurveTo(s * 0.48, -s * 0.42, s * 0.56, -s * 0.58); x.stroke();
  x.beginPath(); x.arc(s * 0.2, 0, s * 0.18, -1.2, 1.2); x.stroke();
  x.beginPath(); x.arc(-s * 0.28, -s * 0.02, s * 0.16, 1.9, 4.4); x.stroke();
  x.fillStyle = line; x.fillRect(s * 0.66, -s * 0.56, 1, 1);
  x.restore();
}

// Black-figure pottery: a meander border on terracotta, a band of palmettes, two horses facing a palmette tree, rays below.
function grcAmphora(ctx, W, H) {
  const C = { terra: '#c86a32', terra2: '#bc602c', black: '#1c1714', cream: '#efe0c0', red: '#8e2a1e' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.black); R(2, 2, cols - 4, rows - 4, C.terra);
    ringKnots(x, cols, rows, 3, 8, 8, (i, j) => (meanderOn(i, j) ? C.black : null), (a, b) => { R(a + 1, b + 1, 6, 6, C.black); R(a + 3, b + 3, 2, 2, C.red); });
    R(12, 12, cols - 24, 1, C.black); R(12, rows - 13, cols - 24, 1, C.black); R(12, 12, 1, rows - 24, C.black); R(cols - 13, 12, 1, rows - 24, C.black);
    const fx = 13, fy = 13, fw = cols - 26, fh = rows - 26;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 9) % 3 === 1 ? C.terra2 : C.terra);
    // top: palmettes alternating up and down, joined by tendrils
    const pb = fy + 12;
    R(fx, pb + 9, fw, 1, C.black);
    { const { n, d } = evenSteps(fw - 6, 12); for (let k = 0; k <= n; k++) { const px = fx + 3 + k * d; palmette(x, px, pb + 6, 6, k % 2 ? Math.PI : 0, C.black, C.red); x.strokeStyle = C.black; x.lineWidth = 0.9; if (k < n) { x.beginPath(); x.moveTo(px + 2, pb + 7); x.quadraticCurveTo(px + d / 2, pb + (k % 2 ? 2 : 10), px + d - 2, pb + 7); x.stroke(); } } }
    // bottom: rays
    const ry = fy + fh - 2;
    R(fx, ry - 14, fw, 1, C.black);
    { const { n, d } = evenSteps(fw, 6); for (let k = 0; k < n; k++) { const px = fx + k * d; x.fillStyle = C.black; x.beginPath(); x.moveTo(px + 0.5, ry); x.lineTo(px + d / 2, ry - 12); x.lineTo(px + d - 0.5, ry); x.closePath(); x.fill(); } }
    // the scene: two horses rearing toward a palmette tree
    const gy = ry - 16, cx = fx + fw / 2;
    R(fx, gy, fw, 1, C.black);
    x.strokeStyle = C.black; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, gy); x.lineTo(cx, gy - fh * 0.32); x.stroke();
    palmette(x, cx, gy - fh * 0.36, 9, 0, C.black, C.red);
    for (const d of [-1, 1]) { x.lineWidth = 1.2; x.beginPath(); x.moveTo(cx, gy - fh * 0.14); x.quadraticCurveTo(cx + d * 10, gy - fh * 0.2, cx + d * 8, gy - fh * 0.3); x.stroke(); palmette(x, cx + d * 9, gy - fh * 0.33, 5, d * 0.4, C.black, C.red); }
    const s = fh * 0.4;
    bfHorse(x, cx - fw * 0.26, gy - s * 0.56, s, 1, C.black, C.cream);
    bfHorse(x, cx + fw * 0.26, gy - s * 0.56, s, -1, C.black, C.cream);
    // dot rosettes filling the gaps, as painters did
    for (const [a, b] of [[0.06, 0.45], [0.94, 0.45], [0.41, 0.56], [0.59, 0.56]]) { const px = Math.round(fx + fw * a), py = Math.round(fy + fh * b); for (const [dx, dy] of [[-1, -2], [1, -2], [-2, 0], [2, 0], [-1, 2], [1, 2]]) R(px + dx, py + dy, 1, 1, C.black); R(px, py, 1, 1, C.red); }
  });
}

// Olive branches: silver-green leaves and black and green olives on natural linen.
function grcOlive(ctx, W, H) {
  const C = { linen: '#ece4d0', linen2: '#e3dac4', leaf: '#6f805a', leaf2: '#a8b48a', vein: '#d8dcc8', stem: '#5a4632', black: '#2c2a24', green: '#8a9a3a', border: '#4f5f3a', border2: '#8a9a6a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.border; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.border2; x.fillRect(3, 3, cols - 6, 1); x.fillRect(3, rows - 4, cols - 6, 1); x.fillRect(3, 3, 1, rows - 6); x.fillRect(cols - 4, 3, 1, rows - 6);
    x.fillStyle = C.linen; x.fillRect(6, 6, cols - 12, rows - 12);
    const fx = 6, fy = 6, fw = cols - 12, fh = rows - 12;
    for (let y = fy; y < fy + fh; y++) if ((y - fy) % 4 === 2) { x.fillStyle = C.linen2; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const branch = (sx, sy, len, ang) => {
      x.save(); x.translate(sx, sy); x.rotate(ang);
      x.strokeStyle = C.stem; x.lineWidth = 1.3; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len * 0.5, -len * 0.08, len, 0); x.stroke();
      for (let k = 1; k <= 9; k++) { const t = k / 10, px = len * t, py = -len * 0.08 * 4 * t * (1 - t); const up = k % 2 ? -1 : 1; leaf(x, px, py, len * 0.22, up * (0.7 - t * 0.2), k % 3 ? C.leaf : C.leaf2, C.vein); }
      for (const [t, col] of [[0.3, C.black], [0.36, C.green], [0.62, C.black], [0.7, C.black], [0.85, C.green]]) { const px = len * t, py = -len * 0.08 * 4 * t * (1 - t) + 4; x.fillStyle = col; x.beginPath(); x.ellipse(px, py, 2.4, 1.7, 0.3, 0, Math.PI * 2); x.fill(); x.strokeStyle = C.stem; x.lineWidth = 0.6; x.beginPath(); x.moveTo(px, py - 1.6); x.lineTo(px - 0.6, py - 4); x.stroke(); }
      x.restore();
    };
    const len = fh * 0.5;
    for (let j = 0; j < 3; j++) for (let i = -1; i < 5; i++) { const ang = j % 2 ? -0.22 : 0.22; branch(fx + (i + (j % 2 ? 0.5 : 0)) * fw / 4, fy + (j + 0.5) * fh / 3 - Math.sin(ang) * len / 2 + 2, len, ang); }
    x.restore();
  });
}

// Minoan dolphins after the Knossos fresco: blue dolphins with an ochre stripe among little fish, rocky borders.
function grcDolphins(ctx, W, H) {
  const C = { sky: '#a8cfe4', sky2: '#9ac6de', blue: '#2a5aa8', navy: '#16285a', ochre: '#e0a84a', white: '#f2ece0', red: '#b8442e', black: '#1a1a1a', rock: '#c8946a', rock2: '#8a5a3a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.red; x.fillRect(0, 0, cols, rows);
    // rosette band
    x.fillStyle = C.white; for (const [len, put] of [[cols - 8, (a) => { rosette(x, 4 + a, 4, 2.6, 8, C.white, C.ochre, C.red); rosette(x, 4 + a, rows - 4, 2.6, 8, C.white, C.ochre, C.red); }], [rows - 8, (a) => { rosette(x, 4, 4 + a, 2.6, 8, C.white, C.ochre, C.red); rosette(x, cols - 4, 4 + a, 2.6, 8, C.white, C.ochre, C.red); }]]) { const { n, d } = evenSteps(len, 8); for (let i = 0; i <= n; i++) put(i * d); }
    const fx = 9, fy = 9, fw = cols - 18, fh = rows - 18;
    x.fillStyle = C.black; x.fillRect(fx - 1, fy - 1, fw + 2, fh + 2);
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 8) % 3 === 1 ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // wavy rock edges top and bottom
    for (const [y0, dir] of [[fy, 1], [fy + fh, -1]]) {
      x.fillStyle = C.rock; x.beginPath(); x.moveTo(fx, y0); for (let i = 0; i <= fw; i += 2) x.lineTo(fx + i, y0 + dir * (6 + 3 * Math.sin(i * 0.15) + 2 * Math.sin(i * 0.4))); x.lineTo(fx + fw, y0); x.closePath(); x.fill();
      x.strokeStyle = C.rock2; x.lineWidth = 1; x.beginPath(); for (let i = 0; i <= fw; i += 2) { const py = y0 + dir * (3 + 2 * Math.sin(i * 0.15 + 1)); i ? x.lineTo(fx + i, py) : x.moveTo(fx + i, py); } x.stroke();
    }
    const dolphin = (px, py, s, ang) => {
      x.save(); x.translate(px, py); x.rotate(ang);
      const body = () => { x.beginPath(); x.moveTo(s * 0.6, s * 0.01); x.lineTo(s * 0.5, -s * 0.03); x.quadraticCurveTo(s * 0.46, -s * 0.15, s * 0.3, -s * 0.16); x.quadraticCurveTo(s * 0.0, -s * 0.2, -s * 0.36, -s * 0.07); x.lineTo(-s * 0.5, -s * 0.02); x.lineTo(-s * 0.5, s * 0.02); x.quadraticCurveTo(-s * 0.1, s * 0.17, s * 0.32, s * 0.1); x.quadraticCurveTo(s * 0.46, s * 0.07, s * 0.6, s * 0.01); x.closePath(); };
      x.fillStyle = C.blue; x.beginPath(); x.moveTo(s * 0.02, -s * 0.18); x.quadraticCurveTo(-s * 0.06, -s * 0.3, -s * 0.2, -s * 0.29); x.quadraticCurveTo(-s * 0.12, -s * 0.22, -s * 0.16, -s * 0.13); x.fill();
      x.beginPath(); x.moveTo(-s * 0.46, 0); x.lineTo(-s * 0.66, -s * 0.16); x.lineTo(-s * 0.6, 0); x.lineTo(-s * 0.66, s * 0.16); x.closePath(); x.fill();
      x.fillStyle = C.blue; body(); x.fill();
      x.save(); body(); x.clip();
      x.fillStyle = C.white; x.fillRect(-s, s * 0.03, 2 * s, s);
      x.fillStyle = C.ochre; x.beginPath(); x.ellipse(0, s * 0.01, s * 0.42, s * 0.035, 0, 0, Math.PI * 2); x.fill();
      x.restore();
      x.fillStyle = C.blue; x.beginPath(); x.moveTo(s * 0.12, s * 0.06); x.lineTo(s * 0.02, s * 0.2); x.lineTo(-s * 0.02, s * 0.06); x.fill();
      x.fillStyle = C.black; x.fillRect(s * 0.38, -s * 0.08, 1.4, 1.4); x.strokeStyle = C.navy; x.lineWidth = 0.7; x.beginPath(); x.moveTo(s * 0.6, s * 0.01); x.lineTo(s * 0.44, s * 0.02); x.stroke();
      x.restore();
    };
    const s = fh * 0.52;
    dolphin(fx + fw * 0.24, fy + fh * 0.38, s, -0.15); dolphin(fx + fw * 0.66, fy + fh * 0.32, s * 0.9, 0.2); dolphin(fx + fw * 0.42, fy + fh * 0.68, s * 0.95, 0.08); dolphin(fx + fw * 0.84, fy + fh * 0.66, s * 0.8, Math.PI - 0.2);
    const fish = (px, py, s2, f) => { x.save(); x.translate(px, py); x.scale(f, 1); x.fillStyle = C.ochre; x.beginPath(); x.ellipse(0, 0, s2, s2 * 0.38, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-s2 * 0.8, 0); x.lineTo(-s2 * 1.4, -s2 * 0.4); x.lineTo(-s2 * 1.4, s2 * 0.4); x.fill(); x.fillStyle = C.navy; x.fillRect(-s2 * 0.3, -0.5, s2 * 0.8, 1); x.restore(); };
    for (const [a, b, f] of [[0.08, 0.6, 1], [0.12, 0.7, 1], [0.5, 0.5, -1], [0.54, 0.42, -1], [0.9, 0.42, -1], [0.3, 0.82, 1], [0.66, 0.84, -1]]) fish(fx + fw * a, fy + fh * b, 3.4, f);
    x.restore();
  });
}

// A Byzantine mosaic: two peacocks drinking from a fountain cup among vines, on gold tesserae.
function grcByzantine(ctx, W, H) {
  const C = { gold: '#d8a840', gold2: '#c8963a', blue: '#1f3a7a', teal: '#2a7a7a', green: '#3f8a4a', white: '#f2ece0', red: '#b8322a', dark: '#1a1a2a', purple: '#5a2a6a', sky: '#5a8ad0' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.dark); R(2, 2, cols - 4, rows - 4, C.blue);
    for (const [len, put] of [[cols - 8, (a) => { R(4 + a, 4, 2, 2, C.white); R(4 + a, rows - 6, 2, 2, C.white); }], [rows - 8, (a) => { R(4, 4 + a, 2, 2, C.white); R(cols - 6, 4 + a, 2, 2, C.white); }]]) { const { n, d } = evenSteps(len, 4); for (let i = 0; i <= n; i++) put(Math.round(i * d)); }
    for (const [len, put] of [[cols - 18, (a, k) => { R(9 + a, 8, 3, 3, k % 2 ? C.red : C.green); R(9 + a, rows - 11, 3, 3, k % 2 ? C.red : C.green); }], [rows - 18, (a, k) => { R(8, 9 + a, 3, 3, k % 2 ? C.red : C.green); R(cols - 11, 9 + a, 3, 3, k % 2 ? C.red : C.green); }]]) { const { n, d } = evenSteps(len, 8); for (let i = 0; i <= n; i++) put(Math.round(i * d), i); }
    R(12, 12, cols - 24, 1, C.white);  R(12, rows - 13, cols - 24, 1, C.white); R(12, 12, 1, rows - 24, C.white); R(cols - 13, 12, 1, rows - 24, C.white);
    const fx = 13, fy = 13, fw = cols - 26, fh = rows - 26;
    for (let yy = 0; yy < fh; yy++) for (let xx = 0; xx < fw; xx++) R(fx + xx, fy + yy, 1, 1, ((xx >> 1) + (yy >> 1)) % 3 === 0 ? C.gold2 : C.gold);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const cx = fx + fw / 2, base = fy + fh - 14;
    // vines scrolling across the top, grapes
    x.strokeStyle = C.green; x.lineWidth = 1.2; x.beginPath(); for (let i = 0; i <= fw; i += 1) { const py = fy + 9 + 4 * Math.sin(i * 0.12); i ? x.lineTo(fx + i, py) : x.moveTo(fx + i, py); } x.stroke();
    for (let i = 6; i < fw; i += 16) { const py = fy + 9 + 4 * Math.sin(i * 0.12); leaf(x, fx + i, py, 6, -0.8, C.green); for (let g = 0; g < 6; g++) R(fx + i + 4 + (g % 2) * 2 - (g > 3 ? 1 : 0), py + 2 + Math.floor(g / 2) * 2, 2, 2, C.purple); }
    // little flowers of tesserae scattered on the gold
    for (const [a, b] of [[0.1, 0.34], [0.3, 0.3], [0.7, 0.3], [0.9, 0.34], [0.2, 0.46], [0.8, 0.46], [0.5, 0.3]]) { const px = Math.round(fx + fw * a), py = Math.round(fy + fh * b); R(px - 1, py, 3, 1, C.white); R(px, py - 1, 1, 3, C.white); R(px, py, 1, 1, C.red); }
    R(fx, base + 6, fw, 1, C.green); R(fx, base + 7, fw, fy + fh - base - 7, C.gold2);
    x.save(); x.translate(cx, base + 6); x.scale(1.35, 1.35); x.translate(-cx, -base);
    // the fountain cup
    x.fillStyle = C.white; x.beginPath(); x.moveTo(cx - 12, base - 26); x.quadraticCurveTo(cx - 13, base - 14, cx - 3, base - 12); x.lineTo(cx + 3, base - 12); x.quadraticCurveTo(cx + 13, base - 14, cx + 12, base - 26); x.closePath(); x.fill();
    R(cx - 2, base - 12, 4, 8, C.white); R(cx - 8, base - 5, 16, 3, C.white);
    x.strokeStyle = C.white; x.lineWidth = 1.4; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(cx + d * 11, base - 24); x.quadraticCurveTo(cx + d * 17, base - 24, cx + d * 11, base - 16); x.stroke(); }
    R(cx - 11, base - 26, 22, 2, C.blue); R(cx - 10, base - 20, 20, 1, C.red);
    x.strokeStyle = C.sky; x.lineWidth = 1.2; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(cx, base - 30); x.quadraticCurveTo(cx + d * 6, base - 38, cx + d * 9, base - 27); x.stroke(); } R(cx - 1, base - 34, 2, 6, C.sky);
    // peacocks facing the cup
    const peacock = (px, py, f) => {
      x.save(); x.translate(px, py); x.scale(f, 1);
      // the long tail trailing behind and down, with eyes
      x.fillStyle = C.teal; x.beginPath(); x.moveTo(-6, -2); x.quadraticCurveTo(-26, 0, -36, 14); x.lineTo(-24, 16); x.quadraticCurveTo(-16, 8, -4, 4); x.closePath(); x.fill();
      for (let k = 0; k < 5; k++) { const t = 0.22 + k * 0.17, ex = -6 - 28 * t, ey = 2 + 11 * t * t + 2; x.fillStyle = C.gold; x.beginPath(); x.arc(ex, ey, 2.4, 0, Math.PI * 2); x.fill(); x.fillStyle = C.blue; x.beginPath(); x.arc(ex, ey, 1.4, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.blue; x.beginPath(); x.ellipse(0, 0, 8, 5.4, -0.2, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.green; x.beginPath(); x.ellipse(-2, 1, 5, 3, -0.2, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.blue; x.lineWidth = 2.6; x.lineCap = 'round'; x.beginPath(); x.moveTo(5, -2); x.quadraticCurveTo(9, -8, 8, -14); x.stroke();
      x.fillStyle = C.blue; x.beginPath(); x.arc(8.6, -15, 2.2, 0, Math.PI * 2); x.fill(); x.fillStyle = C.gold; x.beginPath(); x.moveTo(10.4, -15.4); x.lineTo(13, -14.6); x.lineTo(10.4, -14); x.fill();
      x.fillStyle = C.white; x.fillRect(8.6, -16, 1, 1);
      x.strokeStyle = C.dark; x.lineWidth = 0.7; for (const d of [-1, 0, 1]) { x.beginPath(); x.moveTo(8, -17); x.lineTo(8 + d * 1.6, -20.4); x.stroke(); R(8 + d * 1.6 - 0.5, -21, 1, 1, C.gold); }
      x.strokeStyle = C.red; x.lineWidth = 0.9; x.beginPath(); x.moveTo(-1, 5); x.lineTo(-2, 11); x.moveTo(2, 5); x.lineTo(3, 11); x.stroke();
      x.restore();
    };
    peacock(cx - 22, base - 12, 1); peacock(cx + 22, base - 12, -1);
    x.restore();
    x.restore();
  });
}

// Santorini: white cave houses cascading down the caldera cliff, blue domes, bougainvillea, the sea far below.
function grcSantorini(ctx, W, H) {
  const u = H / 100, rnd = rng(31);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.44); sky.addColorStop(0, '#3f8fd6'); sky.addColorStop(1, '#cfe9f7');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const sea = ctx.createLinearGradient(0, H * 0.44, 0, H); sea.addColorStop(0, '#2f7fc8'); sea.addColorStop(1, '#174a92');
  ctx.fillStyle = sea; ctx.fillRect(0, H * 0.44, W, H * 0.56);
  ctx.fillStyle = '#a8b4c8'; ctx.beginPath(); ctx.moveTo(W * 0.64, H * 0.445); ctx.quadraticCurveTo(W * 0.74, H * 0.39, W * 0.86, H * 0.41); ctx.quadraticCurveTo(W * 0.95, H * 0.42, W, H * 0.4); ctx.lineTo(W, H * 0.445); ctx.fill();
  ctx.fillStyle = '#9fd0ee'; for (let k = 0; k < 12; k++) ctx.fillRect(W * (0.64 + ((k * 23) % 34) / 100), H * (0.5 + (k % 6) * 0.07), 5 * u, 0.6 * u);
  // a sailing boat in the caldera
  const bx = W * 0.8, by = H * 0.7;
  ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.moveTo(bx, by - 1 * u); ctx.lineTo(bx, by - 16 * u); ctx.lineTo(bx + 9 * u, by - 1 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(bx - 1 * u, by - 3 * u); ctx.lineTo(bx - 1 * u, by - 13 * u); ctx.lineTo(bx - 7 * u, by - 3 * u); ctx.fill();
  ctx.fillStyle = '#5a3a28'; ctx.fillRect(bx - 0.5 * u, by - 17 * u, 1 * u, 16 * u);
  ctx.fillStyle = '#1f3a6a'; ctx.beginPath(); ctx.moveTo(bx - 10 * u, by); ctx.lineTo(bx + 12 * u, by); ctx.lineTo(bx + 9 * u, by + 3 * u); ctx.lineTo(bx - 8 * u, by + 3 * u); ctx.fill();
  ctx.fillStyle = '#9fd0ee'; ctx.fillRect(bx - 12 * u, by + 4 * u, 26 * u, 0.6 * u);
  // the caldera cliff, banded rock
  const edge = (y) => W * (y < 0.34 ? 0.5 : 0.5 + (y - 0.34) * 0.19);
  ctx.fillStyle = '#8a4a3a'; ctx.beginPath(); ctx.moveTo(0, H * 0.22); ctx.lineTo(W * 0.5, H * 0.34); for (let k = 0; k <= 12; k++) { const y = 0.34 + k * 0.055; ctx.lineTo(edge(y) + Math.sin(k * 2.1) * 1.2 * u, H * y); } ctx.lineTo(0, H); ctx.fill();
  const bands = ['#a8644a', '#6a3a32', '#c08060', '#7a4436'];
  for (let k = 0; k < 9; k++) { ctx.strokeStyle = bands[k % 4]; ctx.lineWidth = (1.4 + (k % 3)) * u; ctx.beginPath(); const y0 = 0.4 + k * 0.065; ctx.moveTo(edge(y0) - 16 * u, H * (y0 - 0.02)); ctx.lineTo(edge(y0) + 1 * u, H * (y0 + 0.01)); ctx.stroke(); }
  // the houses, row by row down the cliff; the lower rows stand in front
  const cols = ['#f6f6f2', '#f6f6f2', '#f6f6f2', '#f2e2bc', '#f6f6f2', '#f4cbbc', '#f6f6f2'];
  const domes = [];
  for (let r = 0; r < 8; r++) {
    const y = 0.3 + r * 0.085, top = H * y, right = edge(y + 0.06) - (4 + (r * 5) % 9) * u;
    let x0 = -4 * u + ((r * 4) % 7) * u;
    while (x0 < right) {
      const w = Math.min((8 + rnd() * 6) * u, right - x0), h = (8 + rnd() * 3) * u, c = cols[Math.floor(rnd() * cols.length)];
      if (w < 4 * u) break;
      const yb = top + (rnd() * 2 - 1) * u;
      ctx.fillStyle = c;
      if (rnd() < 0.35) { ctx.beginPath(); ctx.moveTo(x0, yb + h); ctx.lineTo(x0, yb + 2.4 * u); ctx.quadraticCurveTo(x0 + w / 2, yb - 2 * u, x0 + w, yb + 2.4 * u); ctx.lineTo(x0 + w, yb + h); ctx.fill(); }
      else { ctx.fillRect(x0, yb, w, h); ctx.fillRect(x0 - 0.4 * u, yb - 0.8 * u, w + 0.8 * u, 1 * u); }
      ctx.fillStyle = '#cfd8e4'; ctx.fillRect(x0 + w - 1.4 * u, yb + 1.5 * u, 1.4 * u, h - 1.5 * u);
      ctx.fillStyle = '#1f5fb8';
      if (rnd() < 0.55) { roundRect(ctx, x0 + w * 0.25, yb + h * 0.38, Math.max(2 * u, w * 0.22), h * 0.62, [1 * u, 1 * u, 0, 0]); ctx.fill(); }
      else ctx.fillRect(x0 + w * 0.3, yb + h * 0.35, Math.max(2 * u, w * 0.2), 2.2 * u);
      if (rnd() < 0.3) { ctx.fillStyle = '#1f5fb8'; ctx.fillRect(x0 + w * 0.62, yb + h * 0.35, 1.8 * u, 2.2 * u); }
      ctx.fillStyle = '#e4e0d6'; ctx.fillRect(x0, yb + h - 0.8 * u, w, 0.8 * u);
      x0 += w + (rnd() < 0.3 ? 2 * u : 0);
    }
  }
  // two blue domes above the roofs and a third lower down
  const dome = (dx, dy, rr) => { ctx.fillStyle = '#f6f6f2'; ctx.fillRect(dx - rr * 1.1, dy, rr * 2.2, rr * 1.3); ctx.fillStyle = '#cfd8e4'; ctx.fillRect(dx + rr * 0.8, dy, rr * 0.3, rr * 1.3); ctx.fillStyle = '#1f55b0'; ctx.beginPath(); ctx.ellipse(dx, dy, rr, rr * 1.05, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#4a8ae0'; ctx.beginPath(); ctx.ellipse(dx - rr * 0.38, dy - rr * 0.5, rr * 0.22, rr * 0.3, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f6f6f2'; ctx.fillRect(dx - rr * 1.05, dy - 0.3 * u, rr * 2.1, 0.9 * u); };
  dome(W * 0.22, H * 0.29, 6.5 * u); dome(W * 0.43, H * 0.38, 5.5 * u); dome(W * 0.12, H * 0.63, 5 * u);
  // bougainvillea spilling over the walls
  for (const [a, b] of [[0.32, 0.47], [0.06, 0.4], [0.47, 0.66], [0.27, 0.8]]) for (let k = 0; k < 9; k++) { ctx.fillStyle = k % 3 ? '#e0408a' : '#b82a6a'; ctx.beginPath(); ctx.arc(W * a + Math.cos(k * 2.3) * (1 + k * 0.35) * u, H * b + Math.sin(k * 2.3) * (0.6 + k * 0.25) * u + k * 0.25 * u, 1.5 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#4f8a3a'; for (const [a, b] of [[0.32, 0.47], [0.06, 0.4], [0.47, 0.66], [0.27, 0.8]]) { ctx.fillRect(W * a - 3 * u, H * b + 2.2 * u, 2.4 * u, 1 * u); ctx.fillRect(W * a + 2 * u, H * b + 3 * u, 2 * u, 1 * u); }
}

// The Acropolis at sunset: the Parthenon on its rock above the roofs of Athens, olive trees on the slopes.
function grcAcropolis(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6); sky.addColorStop(0, '#6a78b8'); sky.addColorStop(0.55, '#f0a07a'); sky.addColorStop(1, '#f8d098');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff0c0'; ctx.beginPath(); ctx.arc(W * 0.84, H * 0.42, 6 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#a890a8'; ctx.beginPath(); ctx.moveTo(0, H * 0.6); ctx.quadraticCurveTo(W * 0.2, H * 0.44, W * 0.4, H * 0.58); ctx.quadraticCurveTo(W * 0.8, H * 0.48, W, H * 0.56); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  // the rock
  ctx.fillStyle = '#b89a7a'; ctx.beginPath(); ctx.moveTo(W * 0.08, H * 0.82); ctx.lineTo(W * 0.18, H * 0.58); ctx.lineTo(W * 0.24, H * 0.5); ctx.lineTo(W * 0.78, H * 0.5); ctx.lineTo(W * 0.84, H * 0.6); ctx.lineTo(W * 0.94, H * 0.82); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#9a7c60'; ctx.beginPath(); ctx.moveTo(W * 0.5, H * 0.5); ctx.lineTo(W * 0.78, H * 0.5); ctx.lineTo(W * 0.84, H * 0.6); ctx.lineTo(W * 0.94, H * 0.82); ctx.lineTo(W * 0.6, H * 0.82); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#c8b090'; ctx.fillRect(W * 0.22, H * 0.49, W * 0.58, 2.4 * u);
  ctx.fillStyle = '#3f5f3a'; for (let k = 0; k < 16; k++) { ctx.beginPath(); ctx.arc(W * (0.12 + ((k * 37) % 80) / 100), H * (0.62 + ((k * 13) % 18) / 100), (1.6 + (k % 3) * 0.8) * u, 0, Math.PI * 2); ctx.fill(); }
  // the Parthenon: steps, eight columns, the entablature and pediment
  const px0 = W * 0.3, px1 = W * 0.72, pb = H * 0.48, pw = px1 - px0;
  ctx.fillStyle = '#e8dcc4'; for (let k = 0; k < 3; k++) ctx.fillRect(px0 - (3 - k) * 1.2 * u, pb - k * 1.4 * u, pw + (3 - k) * 2.4 * u, 1.4 * u);
  const ct = pb - 4.2 * u - 20 * u, n = 8, cw = 2.6 * u;
  for (let k = 0; k < n; k++) { const cx = px0 + cw / 2 + (k * (pw - cw)) / (n - 1); ctx.fillStyle = '#efe4cc'; ctx.fillRect(cx - cw / 2, ct, cw, 20 * u); ctx.fillStyle = '#d6c8aa'; ctx.fillRect(cx + cw * 0.15, ct, cw * 0.35, 20 * u); ctx.fillStyle = '#efe4cc'; ctx.fillRect(cx - cw * 0.7, ct - 1 * u, cw * 1.4, 1 * u); }
  ctx.fillStyle = '#e8dcc4'; ctx.fillRect(px0 - 1 * u, ct - 5 * u, pw + 2 * u, 4 * u);
  ctx.fillStyle = '#d6c8aa'; for (let k = 0; k < 16; k++) ctx.fillRect(px0 + (k * pw) / 16, ct - 4 * u, 0.6 * u, 2 * u);
  ctx.fillStyle = '#e8dcc4'; ctx.beginPath(); ctx.moveTo(px0 - 1 * u, ct - 5 * u); ctx.lineTo(px0 + pw * 0.5, ct - 12 * u); ctx.lineTo(px0 + pw * 0.7, ct - 9 * u); ctx.lineTo(px0 + pw * 0.7, ct - 5 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#d6c8aa'; ctx.beginPath(); ctx.moveTo(px0 + 2 * u, ct - 6 * u); ctx.lineTo(px0 + pw * 0.5, ct - 10.4 * u); ctx.lineTo(px0 + pw * 0.66, ct - 8.6 * u); ctx.lineTo(px0 + pw * 0.66, ct - 6 * u); ctx.closePath(); ctx.fill();
  // the city below: white and ochre roofs
  for (let k = 0; k < 40; k++) { const bx = ((k * 41) % 100) / 100 * W, by = H * (0.84 + ((k * 17) % 14) / 100), bw = (5 + (k % 4) * 2) * u; ctx.fillStyle = ['#f2ece0', '#e8d6b8', '#f6f0e6', '#d8c4a4'][k % 4]; ctx.fillRect(bx, by, bw, 5 * u); ctx.fillStyle = '#c86a4a'; if (k % 3 === 0) ctx.fillRect(bx, by - 1 * u, bw, 1 * u); ctx.fillStyle = '#5a6a8a'; ctx.fillRect(bx + bw * 0.3, by + 1.6 * u, 1 * u, 1.4 * u); }
}

// A Greek island harbour: painted fishing boats at the quay, white houses with blue doors, octopus drying, a cat.
function grcHarbor(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#9ad0ee'; ctx.fillRect(0, 0, W, H);
  // houses along the back
  const hs = [['#f6f6f2', '#1f5fb8'], ['#f2d48a', '#3f8a4a'], ['#f6f6f2', '#2f8ab8'], ['#f0b8a8', '#1f5fb8'], ['#f6f6f2', '#c8322a'], ['#f6f6f2', '#1f5fb8'], ['#d8e8f0', '#2f5f8a']];
  hs.forEach(([wall, trim], k) => {
    const x0 = (W * k) / hs.length, w = W / hs.length + 1, top = H * (0.12 + (k % 3) * 0.04);
    ctx.fillStyle = wall; ctx.fillRect(x0, top, w, H * 0.5 - top);
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(x0 + w - 1.4 * u, top, 1.4 * u, H * 0.5 - top);
    ctx.fillStyle = trim; roundRect(ctx, x0 + w * 0.36, H * 0.5 - 13 * u, w * 0.26, 13 * u, [w * 0.13, w * 0.13, 0, 0]); ctx.fill();
    ctx.fillRect(x0 + w * 0.12, top + 6 * u, w * 0.18, 6 * u); ctx.fillRect(x0 + w * 0.7, top + 6 * u, w * 0.18, 6 * u);
    if (k % 2 === 0) { ctx.fillStyle = '#e0408a'; for (let p = 0; p < 6; p++) { ctx.beginPath(); ctx.arc(x0 + w * (0.68 + (p % 3) * 0.1), top + 2 * u + Math.floor(p / 3) * 2 * u, 1.6 * u, 0, Math.PI * 2); ctx.fill(); } }
  });
  // the quay and the water
  ctx.fillStyle = '#d8cfc0'; ctx.fillRect(0, H * 0.5, W, H * 0.12);
  ctx.fillStyle = '#c4b8a6'; for (let k = 0; k < 20; k++) ctx.fillRect((k * W) / 20, H * 0.5, 0.5 * u, H * 0.12);
  const sea = ctx.createLinearGradient(0, H * 0.62, 0, H); sea.addColorStop(0, '#2f9ac8'); sea.addColorStop(1, '#1f6aa8');
  ctx.fillStyle = sea; ctx.fillRect(0, H * 0.62, W, H * 0.38);
  ctx.fillStyle = '#8fd0e8'; for (let k = 0; k < 18; k++) ctx.fillRect(((k * 37) % 100) / 100 * W, H * (0.66 + ((k * 13) % 30) / 100), 6 * u, 0.6 * u);
  // the boats
  const boat = (bx, by, L, band, band2) => {
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(bx - L * 0.45, by + 4.4 * u, L * 0.9, 1.4 * u);
    ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.moveTo(bx - L / 2, by - 2 * u); ctx.lineTo(bx + L / 2, by - 3 * u); ctx.quadraticCurveTo(bx + L * 0.46, by + 3 * u, bx + L * 0.3, by + 4.4 * u); ctx.lineTo(bx - L * 0.36, by + 4.4 * u); ctx.quadraticCurveTo(bx - L * 0.5, by + 2 * u, bx - L / 2, by - 2 * u); ctx.fill();
    ctx.fillStyle = band; ctx.fillRect(bx - L * 0.48, by - 1.6 * u, L * 0.96, 1.6 * u); ctx.fillStyle = band2; ctx.fillRect(bx - L * 0.44, by + 1.6 * u, L * 0.8, 1.2 * u);
    ctx.fillStyle = '#f6f6f2'; ctx.fillRect(bx - L * 0.05, by - 9 * u, L * 0.2, 7 * u); ctx.fillStyle = band; ctx.fillRect(bx - L * 0.05, by - 9.6 * u, L * 0.2, 1.2 * u); ctx.fillStyle = '#2a3a5a'; ctx.fillRect(bx, by - 7 * u, L * 0.08, 2.4 * u);
    ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 0.6 * u; ctx.beginPath(); ctx.moveTo(bx - L * 0.3, by - 2 * u); ctx.lineTo(bx - L * 0.3, by - 14 * u); ctx.stroke();
  };
  boat(W * 0.2, H * 0.72, 30 * u, '#2f6fb8', '#c8322a'); boat(W * 0.52, H * 0.8, 36 * u, '#c8322a', '#2f8a5a'); boat(W * 0.82, H * 0.71, 28 * u, '#2f8a5a', '#f2c040');
  // octopus drying on a line, and a cat on the quay
  ctx.strokeStyle = '#5a4a3a'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); ctx.moveTo(W * 0.68, H * 0.38); ctx.quadraticCurveTo(W * 0.8, H * 0.42, W * 0.92, H * 0.38); ctx.stroke();
  for (const ox of [0.74, 0.8, 0.86]) { const cx = W * ox, cy = H * 0.41; ctx.fillStyle = '#c8605a'; ctx.beginPath(); ctx.ellipse(cx, cy, 2 * u, 2.6 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#c8605a'; ctx.lineWidth = 0.9 * u; for (let t = -2; t <= 2; t++) { ctx.beginPath(); ctx.moveTo(cx + t * 0.6 * u, cy + 2 * u); ctx.quadraticCurveTo(cx + t * 1.4 * u, cy + 5 * u, cx + t * 0.8 * u, cy + 8 * u); ctx.stroke(); } }
  const cx = W * 0.38, cy = H * 0.58; ctx.fillStyle = '#e8a050'; ctx.beginPath(); ctx.ellipse(cx, cy, 4 * u, 2.4 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(cx + 4 * u, cy - 2 * u, 2 * u, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx + 2.6 * u, cy - 3.2 * u); ctx.lineTo(cx + 3 * u, cy - 5.4 * u); ctx.lineTo(cx + 4 * u, cy - 3.8 * u); ctx.lineTo(cx + 5 * u, cy - 5.4 * u); ctx.lineTo(cx + 5.4 * u, cy - 3.2 * u); ctx.fill();
  ctx.strokeStyle = '#e8a050'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(cx - 3.6 * u, cy); ctx.quadraticCurveTo(cx - 7 * u, cy - 1 * u, cx - 6 * u, cy - 4 * u); ctx.stroke();
}

// The windmills of Mykonos on their ridge above the sea: white towers, thatched caps, wooden wheels with sails.
function grcMykonos(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.52); sky.addColorStop(0, '#2f80d0'); sky.addColorStop(1, '#bfe2f6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f6fbff'; for (const [a, b, w] of [[0.12, 0.16, 16], [0.62, 0.12, 20], [0.86, 0.22, 12]]) { ctx.beginPath(); ctx.ellipse(W * a, H * b, w * u, 2.2 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#2f78c0'; ctx.fillRect(0, H * 0.52, W, H * 0.48);
  ctx.fillStyle = '#9fd4ee'; for (let k = 0; k < 12; k++) ctx.fillRect(((k * 29) % 100) / 100 * W, H * (0.55 + (k % 4) * 0.025), 6 * u, 0.6 * u);
  // the ridge, and the dry ground in front
  ctx.fillStyle = '#b89a6a'; ctx.beginPath(); ctx.moveTo(0, H * 0.68); ctx.quadraticCurveTo(W * 0.35, H * 0.6, W * 0.62, H * 0.63); ctx.quadraticCurveTo(W * 0.85, H * 0.65, W, H * 0.62); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#c8ac7a'; ctx.beginPath(); ctx.moveTo(0, H * 0.84); ctx.quadraticCurveTo(W * 0.5, H * 0.76, W, H * 0.84); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#8a8a4a'; for (let k = 0; k < 18; k++) { ctx.beginPath(); ctx.arc(((k * 37) % 100) / 100 * W, H * (0.76 + ((k * 13) % 18) / 100), 1.4 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = '#efe6d2'; ctx.lineWidth = 2.4 * u; ctx.beginPath(); ctx.moveTo(W * 0.5, H); ctx.quadraticCurveTo(W * 0.42, H * 0.8, W * 0.5, H * 0.66); ctx.stroke();
  const mill = (mx, base, s, rot, sails) => {
    const tw = 17 * s * u, th = 30 * s * u, top = base - th;
    ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.moveTo(mx - tw / 2, base); ctx.lineTo(mx - tw * 0.46, top); ctx.lineTo(mx + tw * 0.46, top); ctx.lineTo(mx + tw / 2, base); ctx.fill();
    ctx.fillStyle = '#d6dde6'; ctx.beginPath(); ctx.moveTo(mx + tw * 0.2, base); ctx.lineTo(mx + tw * 0.19, top); ctx.lineTo(mx + tw * 0.46, top); ctx.lineTo(mx + tw / 2, base); ctx.fill();
    ctx.fillStyle = '#1f5fb8'; roundRect(ctx, mx - tw * 0.14, base - th * 0.3, tw * 0.26, th * 0.3, [tw * 0.13, tw * 0.13, 0, 0]); ctx.fill(); ctx.fillRect(mx - tw * 0.08, base - th * 0.7, tw * 0.17, th * 0.13);
    // the thatched cap
    ctx.fillStyle = '#a07a46'; ctx.beginPath(); ctx.moveTo(mx - tw * 0.54, top + 1 * u); ctx.lineTo(mx + tw * 0.05, top - tw * 0.55); ctx.lineTo(mx + tw * 0.54, top + 1 * u); ctx.fill();
    ctx.fillStyle = '#c8a468'; ctx.beginPath(); ctx.moveTo(mx - tw * 0.4, top + 1 * u); ctx.lineTo(mx + tw * 0.03, top - tw * 0.45); ctx.lineTo(mx - tw * 0.05, top + 1 * u); ctx.fill();
    // the wheel out in front of the cap: eight spokes, with a sail on each when the mill is working
    const hx = mx - tw * 0.62, hy = top - 2 * u, R = 19 * s * u;
    ctx.strokeStyle = '#5a3a22'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(mx - tw * 0.1, top - 3 * u); ctx.stroke();
    for (let k = 0; k < 8; k++) {
      const a = rot + (k * Math.PI) / 4, ex = hx + Math.cos(a) * R, ey = hy + Math.sin(a) * R;
      if (sails) { const a2 = a + 0.55; ctx.fillStyle = '#fbfbf6'; ctx.beginPath(); ctx.moveTo(hx + Math.cos(a) * R * 0.18, hy + Math.sin(a) * R * 0.18); ctx.lineTo(ex, ey); ctx.lineTo(hx + Math.cos(a2) * R * 0.86, hy + Math.sin(a2) * R * 0.86); ctx.closePath(); ctx.fill(); }
      ctx.strokeStyle = '#5a3a22'; ctx.lineWidth = 1.3 * u; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(ex, ey); ctx.stroke();
    }
    ctx.fillStyle = '#3a2414'; ctx.beginPath(); ctx.arc(hx, hy, 2 * u, 0, Math.PI * 2); ctx.fill();
  };
  mill(W * 0.22, H * 0.69, 0.95, 0.2, true); mill(W * 0.52, H * 0.64, 1.05, 0.55, true); mill(W * 0.8, H * 0.66, 0.95, 0.05, false);
}

const GREECE_SCENES = [
  (c, w, h) => { c.fillStyle = '#5aa2dc'; c.fillRect(0, 0, w, h); c.fillStyle = '#f6f6f2'; c.fillRect(0, h * 0.5, w, h); c.fillStyle = '#1f5fb8'; c.beginPath(); c.arc(w * 0.5, h * 0.5, w * 0.36, Math.PI, 0); c.fill(); }, // blue dome
  (c, w, h) => { c.fillStyle = '#1d3a7a'; c.fillRect(0, 0, w, h); c.fillStyle = '#f4f2ea'; for (let k = 0; k < 4; k++) { c.fillRect(0, h * (0.1 + k * 0.24), w, h * 0.05); c.fillRect(w * 0.3, h * (0.1 + k * 0.24), w * 0.08, h * 0.15); } }, // key bands
  (c, w, h) => { c.fillStyle = '#ece4d0'; c.fillRect(0, 0, w, h); for (let k = 0; k < 6; k++) { c.fillStyle = k % 2 ? '#6f805a' : '#a8b48a'; c.beginPath(); c.ellipse(w * (k % 2 ? 0.62 : 0.38), h * (0.12 + k * 0.15), w * 0.24, h * 0.04, k % 2 ? 0.5 : -0.5, 0, Math.PI * 2); c.fill(); } c.fillStyle = '#2c2a24'; c.beginPath(); c.arc(w * 0.5, h * 0.55, w * 0.1, 0, Math.PI * 2); c.fill(); }, // olives
  (c, w, h) => { c.fillStyle = '#f0a07a'; c.fillRect(0, 0, w, h); c.fillStyle = '#efe4cc'; c.fillRect(0, h * 0.25, w, h * 0.08); for (let k = 0; k < 3; k++) c.fillRect(w * (0.12 + k * 0.3), h * 0.33, w * 0.14, h * 0.5); c.fillStyle = '#b89a7a'; c.fillRect(0, h * 0.83, w, h); }, // columns
  (c, w, h) => { c.fillStyle = '#5aa2dc'; c.fillRect(0, 0, w, h); c.fillStyle = '#2f7fc0'; c.fillRect(0, h * 0.6, w, h); c.fillStyle = '#f6f6f2'; c.fillRect(w * 0.3, h * 0.3, w * 0.4, h * 0.5); c.fillStyle = '#b8935a'; c.beginPath(); c.arc(w * 0.5, h * 0.3, w * 0.22, Math.PI, 0); c.fill(); }, // windmill
  (c, w, h) => { c.fillStyle = '#c86a32'; c.fillRect(0, 0, w, h); c.fillStyle = '#1c1714'; c.fillRect(0, h * 0.2, w, h * 0.06); c.fillRect(0, h * 0.74, w, h * 0.06); c.beginPath(); c.ellipse(w * 0.5, h * 0.5, w * 0.3, h * 0.1, 0, 0, Math.PI * 2); c.fill(); }, // black-figure
];
function grcPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'GREECE', GREECE_SCENES); }


// Azulejos of Andalusia: eight-pointed stars in blue and green with crosses of white between, outlined in ochre.
function spnAzulejo(ctx, W, H) {
  const C = { white: '#f4f0e6', blue: '#1f4a9a', green: '#2f7a5a', ochre: '#e0a83a', black: '#1a1a22', sky: '#7aa6d8', mint: '#8ac0a0' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.black); R(2, 2, cols - 4, rows - 4, C.ochre); R(4, 4, cols - 8, rows - 8, C.black);
    // a border of small tiles: alternating blue and green squares with a white dot
    for (const [len, put] of [[cols - 10, (a, k) => { R(5 + a, 5, 4, 4, k % 2 ? C.blue : C.green); R(6 + a, 6, 2, 2, C.white); R(5 + a, rows - 9, 4, 4, k % 2 ? C.green : C.blue); R(6 + a, rows - 8, 2, 2, C.white); }], [rows - 18, (a, k) => { R(5, 9 + a, 4, 4, k % 2 ? C.blue : C.green); R(6, 10 + a, 2, 2, C.white); R(cols - 9, 9 + a, 4, 4, k % 2 ? C.green : C.blue); R(cols - 8, 10 + a, 2, 2, C.white); }]]) { const n = Math.floor(len / 5); for (let i = 0; i < n; i++) put(Math.round(i * (len / n)), i); }
    const fx = 11, fy = 11, fw = cols - 22, fh = rows - 22;
    R(fx, fy, fw, fh, C.white);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const S = fh / 3, nc = Math.ceil(fw / S) + 1;
    for (let j = 0; j <= 3; j++) for (let i = 0; i <= nc; i++) {
      const cx = fx + i * S, cy = fy + j * S, r = S * 0.52;
      const star = (rr, col) => { x.fillStyle = col; for (const a of [0, Math.PI / 4]) { x.beginPath(); for (let k = 0; k < 4; k++) { const t = a + (k * Math.PI) / 2; const px = cx + Math.cos(t) * rr, py = cy + Math.sin(t) * rr; k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill(); } };
      star(r, C.ochre); star(r - 1.4, (i + j) % 2 ? C.blue : C.green); star(r * 0.55, (i + j) % 2 ? C.sky : C.mint); star(r * 0.3, C.white);
      x.fillStyle = C.ochre; x.beginPath(); x.arc(cx, cy, 1.4, 0, Math.PI * 2); x.fill();
      // the cross between four stars gets a little black diamond at its heart
      const qx = cx + S / 2, qy = cy + S / 2; x.fillStyle = C.black; x.beginPath(); x.moveTo(qx, qy - 2.6); x.lineTo(qx + 2.6, qy); x.lineTo(qx, qy + 2.6); x.lineTo(qx - 2.6, qy); x.closePath(); x.fill();
    }
    x.restore();
  });
}

// Flamenco: white polka dots on red, black ruffles top and bottom, an open black lace fan and a red rose.
function spnFlamenco(ctx, W, H) {
  const C = { red: '#c8202a', red2: '#b81c26', white: '#f6f0e6', black: '#1a1416', rose: '#e0405a', rose2: '#9a1424', green: '#2f6a3a', gold: '#e8b448' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.red; x.fillRect(0, 0, cols, rows);
    for (let y = 0; y < rows; y++) if (Math.floor(y / 9) % 3 === 1) { x.fillStyle = C.red2; x.fillRect(0, y, cols, 1); }
    for (let j = 0; j < 12; j++) for (let i = 0; i < 20; i++) { const px = (i + (j % 2 ? 0.5 : 0)) * cols / 18, py = (j + 0.5) * rows / 11; x.fillStyle = C.white; x.beginPath(); x.arc(px, py, 2.1, 0, Math.PI * 2); x.fill(); }
    // ruffles: rows of black scallops with a white edge
    for (const [y0, dir] of [[0, 1], [rows, -1]]) for (let r = 0; r < 2; r++) {
      const yy = y0 + dir * (6 + r * 6);
      x.fillStyle = C.black; x.fillRect(0, dir > 0 ? y0 : yy, cols, Math.abs(yy - y0));
      for (let i = 0; i < cols + 8; i += 8) { x.fillStyle = C.white; x.beginPath(); x.arc(i, yy, 4.6, dir > 0 ? 0 : Math.PI, dir > 0 ? Math.PI : Math.PI * 2); x.fill(); x.fillStyle = C.black; x.beginPath(); x.arc(i, yy, 3.6, dir > 0 ? 0 : Math.PI, dir > 0 ? Math.PI : Math.PI * 2); x.fill(); }
    }
    // the fan: ribs, lace with holes, a scalloped edge
    const fx = cols / 2, fy = rows * 0.72, R = rows * 0.44;
    x.fillStyle = C.black; x.beginPath(); x.moveTo(fx, fy); x.arc(fx, fy, R, Math.PI * 1.08, Math.PI * 1.92); x.closePath(); x.fill();
    for (let k = 0; k <= 26; k++) { const a = Math.PI * (1.08 + (k * 0.84) / 26); x.fillStyle = C.black; x.beginPath(); x.arc(fx + Math.cos(a) * R, fy + Math.sin(a) * R, 2.4, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.red; for (const rr of [0.5, 0.66, 0.82]) for (let k = 0; k < 24; k++) { const a = Math.PI * (1.12 + (k * 0.76) / 23); x.beginPath(); x.arc(fx + Math.cos(a) * R * rr, fy + Math.sin(a) * R * rr, rr * 1.8, 0, Math.PI * 2); x.fill(); }
    x.strokeStyle = C.gold; x.lineWidth = 0.8; for (let k = 0; k <= 12; k++) { const a = Math.PI * (1.08 + (k * 0.84) / 12); x.beginPath(); x.moveTo(fx, fy); x.lineTo(fx + Math.cos(a) * R * 0.42, fy + Math.sin(a) * R * 0.42); x.stroke(); }
    x.fillStyle = C.gold; x.beginPath(); x.arc(fx, fy, 2.4, 0, Math.PI * 2); x.fill();
    // the rose at its foot
    const rx = fx + R * 0.32, ry = fy + 4;
    leaf(x, rx - 6, ry + 3, 10, Math.PI - 0.4, C.green); leaf(x, rx + 6, ry + 3, 10, 0.4, C.green);
    x.fillStyle = C.rose2; x.beginPath(); x.arc(rx, ry, 7, 0, Math.PI * 2); x.fill();
    for (let k = 0; k < 6; k++) { const a = k * 1.05; x.fillStyle = C.rose; x.beginPath(); x.arc(rx + Math.cos(a) * 3.4, ry + Math.sin(a) * 3.4, 3.4, 0, Math.PI * 2); x.fill(); }
    x.strokeStyle = C.rose2; x.lineWidth = 1; x.beginPath(); for (let t = 0; t < 2.6; t += 0.1) { const rr = 4 - t * 1.3; t ? x.lineTo(rx + Math.cos(t * 4) * rr, ry + Math.sin(t * 4) * rr) : x.moveTo(rx + Math.cos(0) * rr, ry); } x.stroke();
  });
}

// The Manila shawl (mantón de Manila): big embroidered roses, peonies and a bird on black silk, a netted fringe band.
function spnManton(ctx, W, H) {
  const C = { black: '#141216', black2: '#1c1a20', red: '#c8283a', pink: '#f08aa0', pale: '#f8d0d8', yellow: '#f2c440', white: '#f6f0e4', green: '#3f8a4a', green2: '#7ab86a', blue: '#7aa6d8', fringe: '#c8283a' };
  weavePicture(ctx, W, H, 130, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.black; x.fillRect(0, 0, cols, rows);
    for (let y = 0; y < rows; y++) if (Math.floor(y / 6) % 4 === 1) { x.fillStyle = C.black2; x.fillRect(0, y, cols, 1); }
    // the knotted fringe net at both ends
    for (const [y0, dir] of [[2, 1], [rows - 3, -1]]) {
      x.strokeStyle = C.fringe; x.lineWidth = 0.9;
      for (let i = -12; i < cols + 12; i += 6) { x.beginPath(); x.moveTo(i, y0); x.lineTo(i + 6, y0 + dir * 6); x.lineTo(i + 12, y0); x.stroke(); x.beginPath(); x.moveTo(i, y0 + dir * 6); x.lineTo(i + 6, y0 + dir * 12); x.lineTo(i + 12, y0 + dir * 6); x.stroke(); }
      x.fillStyle = C.fringe; for (let i = 0; i < cols; i += 6) x.fillRect(i - 0.5, y0 + dir * 6 - 0.5, 1.4, 1.4);
      x.fillStyle = C.yellow; x.fillRect(0, y0 + dir * 14, cols, 1);
    }
    const rose = (cx, cy, r, c1, c2, c3) => {
      x.fillStyle = c1; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
      for (let k = 0; k < 7; k++) { const a = k * 0.9; x.fillStyle = c2; x.beginPath(); x.arc(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5, r * 0.42, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = c3; x.beginPath(); x.arc(cx, cy, r * 0.36, 0, Math.PI * 2); x.fill();
      x.strokeStyle = c1; x.lineWidth = 0.9; x.beginPath(); x.arc(cx, cy, r * 0.22, 0.4, 5); x.stroke();
    };
    const spray = (cx, cy, s) => {
      x.strokeStyle = C.green; x.lineWidth = 1.2;
      for (const [dx, dy] of [[-0.8, 0.5], [0.9, 0.4], [0.2, -0.9], [-0.6, -0.6]]) { x.beginPath(); x.moveTo(cx, cy); x.quadraticCurveTo(cx + dx * s * 0.4, cy + dy * s * 0.8, cx + dx * s, cy + dy * s); x.stroke(); leaf(x, cx + dx * s, cy + dy * s, s * 0.32, Math.atan2(dy, dx), C.green, C.green2); leaf(x, cx + dx * s * 0.55, cy + dy * s * 0.55, s * 0.26, Math.atan2(dy, dx) + 0.8, C.green2); }
    };
    const fy = 16, fh = rows - 32;
    spray(cols * 0.5, fy + fh * 0.5, fh * 0.42);
    rose(cols * 0.5, fy + fh * 0.5, fh * 0.2, C.red, C.pink, C.pale);
    rose(cols * 0.34, fy + fh * 0.36, fh * 0.12, C.pink, C.pale, C.white);
    rose(cols * 0.66, fy + fh * 0.66, fh * 0.13, C.yellow, C.white, C.pale);
    rose(cols * 0.62, fy + fh * 0.26, fh * 0.09, C.white, C.pale, C.yellow);
    rose(cols * 0.38, fy + fh * 0.72, fh * 0.1, C.red, C.pink, C.yellow);
    for (const [a, b, f] of [[0.14, 0.5, 1], [0.86, 0.5, -1]]) { spray(cols * a, fy + fh * b, fh * 0.26); rose(cols * a, fy + fh * b, fh * 0.11, f > 0 ? C.pink : C.red, C.pale, C.yellow); }
    for (const [a, b] of [[0.24, 0.22], [0.76, 0.78], [0.22, 0.8], [0.8, 0.2]]) for (let k = 0; k < 3; k++) { x.fillStyle = [C.blue, C.pale, C.yellow][k]; x.beginPath(); x.arc(cols * a + k * 3 - 3, fy + fh * b + (k % 2) * 2, 1.6, 0, Math.PI * 2); x.fill(); }
    // a bird with long tail feathers
    const bx = cols * 0.24, by = fy + fh * 0.62;
    x.fillStyle = C.blue; x.beginPath(); x.ellipse(bx, by, 5, 3, -0.3, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(bx + 5, by - 3, 2.2, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.yellow; x.beginPath(); x.moveTo(bx + 7, by - 3.4); x.lineTo(bx + 9.4, by - 2.6); x.lineTo(bx + 7, by - 2.2); x.fill();
    x.strokeStyle = C.white; x.lineWidth = 1; for (const k of [-1, 0, 1]) { x.beginPath(); x.moveTo(bx - 4, by + 1); x.quadraticCurveTo(bx - 10, by + 4 + k * 2, bx - 16, by + 2 + k * 4); x.stroke(); }
    x.fillStyle = C.black; x.fillRect(bx + 5.4, by - 3.6, 1, 1);
  });
}

// Pomegranates of Granada: whole and split fruit, their seeds showing, on ivory with leaves; a deep red border.
function spnPomegranate(ctx, W, H) {
  const C = { ivory: '#efe2c4', ivory2: '#e6d6b4', red: '#b8202a', seed: '#e84a5a', rind: '#d86a3a', pale: '#f6c0b0', green: '#4f7a3a', leaf2: '#2f5a2a', brown: '#6a3a24', border: '#8a2a24', gold: '#d8a640' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.border; x.fillRect(0, 0, cols, rows);
    x.fillStyle = C.ivory; for (const [len, put] of [[cols - 8, (a) => { x.beginPath(); x.moveTo(4 + a, 2.5); x.lineTo(7 + a, 5.5); x.lineTo(4 + a, 8.5); x.lineTo(1 + a, 5.5); x.closePath(); x.fill(); x.beginPath(); x.moveTo(4 + a, rows - 8.5); x.lineTo(7 + a, rows - 5.5); x.lineTo(4 + a, rows - 2.5); x.lineTo(1 + a, rows - 5.5); x.closePath(); x.fill(); }], [rows - 16, (a) => { x.beginPath(); x.moveTo(5.5, 8 + a); x.lineTo(8.5, 11 + a); x.lineTo(5.5, 14 + a); x.lineTo(2.5, 11 + a); x.closePath(); x.fill(); x.beginPath(); x.moveTo(cols - 5.5, 8 + a); x.lineTo(cols - 2.5, 11 + a); x.lineTo(cols - 5.5, 14 + a); x.lineTo(cols - 8.5, 11 + a); x.closePath(); x.fill(); }]]) { const { n, d } = evenSteps(len, 8); for (let i = 0; i <= n; i++) put(i * d); }
    x.fillStyle = C.gold; x.fillRect(10, 10, cols - 20, 1); x.fillRect(10, rows - 11, cols - 20, 1); x.fillRect(10, 10, 1, rows - 20); x.fillRect(cols - 11, 10, 1, rows - 20);
    const fx = 11, fy = 11, fw = cols - 22, fh = rows - 22;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 8) % 3 === 1 ? C.ivory2 : C.ivory; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const fruit = (cx, cy, r, split, ang) => {
      x.save(); x.translate(cx, cy); x.rotate(ang);
      x.strokeStyle = C.brown; x.lineWidth = 1.2; x.beginPath(); x.moveTo(0, -r); x.quadraticCurveTo(r * 0.3, -r * 1.6, r * 1.2, -r * 1.8); x.stroke();
      leaf(x, r * 0.6, -r * 1.6, r * 0.9, -0.5, C.green); leaf(x, r * 0.9, -r * 1.75, r * 0.8, 0.6, C.leaf2);
      x.fillStyle = C.red; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.rind; x.beginPath(); x.arc(-r * 0.3, -r * 0.3, r * 0.35, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.beginPath(); x.moveTo(-r * 0.32, -r * 0.88); x.lineTo(-r * 0.2, -r * 1.24); x.lineTo(0, -r * 1.0); x.lineTo(r * 0.2, -r * 1.24); x.lineTo(r * 0.32, -r * 0.88); x.closePath(); x.fill();
      if (split) {
        const wedge = () => { x.beginPath(); x.moveTo(0, -r * 0.15); x.arc(0, -r * 0.15, r * 0.84, Math.PI * 0.08, Math.PI * 0.92); x.closePath(); };
        x.fillStyle = C.pale; wedge(); x.fill();
        x.save(); wedge(); x.clip();
        x.fillStyle = C.seed; x.beginPath(); x.arc(0, -r * 0.15, r * 0.7, 0, Math.PI); x.fill();
        x.strokeStyle = C.red; x.lineWidth = 0.7; for (let k = -6; k <= 6; k++) { x.beginPath(); x.moveTo(k * 2.6 - r, -r); x.lineTo(k * 2.6 + r, r); x.stroke(); x.beginPath(); x.moveTo(k * 2.6 + r, -r); x.lineTo(k * 2.6 - r, r); x.stroke(); }
        x.fillStyle = C.pale; for (let a = -6; a <= 6; a++) for (let b = 0; b <= 6; b++) { const px = a * 2.6 + (b % 2) * 1.3, py = -r * 0.15 + 1.3 + b * 1.3; if (Math.hypot(px, py + r * 0.15) < r * 0.62) x.fillRect(px - 0.3, py - 0.9, 0.7, 0.7); }
        x.restore();
        x.strokeStyle = C.pale; x.lineWidth = 1; x.beginPath(); x.moveTo(-r * 0.8, -r * 0.15); x.lineTo(r * 0.8, -r * 0.15); x.stroke();
      }
      x.restore();
    };
    const r = fh * 0.13;
    for (let j = 0; j < 3; j++) for (let i = -1; i < 7; i++) fruit(fx + (i + 0.5 + (j % 2 ? 0.5 : 0)) * fw / 6, fy + (j + 0.62) * fh / 3, r, (i + j) % 2 === 0, (i % 2 ? 0.25 : -0.25));
    x.restore();
  });
}

// Trencadís: a mosaic of broken tiles in every colour set in white mortar, swirling bands and a sun in the middle.
function spnTrencadis(ctx, W, H) {
  const C = { grout: '#ece6da', cobalt: '#1f4a9a', sky: '#5a9ad8', turq: '#2aa8a8', green: '#3f9a4a', lime: '#a8c83a', yellow: '#f2c83a', orange: '#ee8a2a', red: '#d8342a', pink: '#e86a9a', white: '#f8f6f0', violet: '#7a4aa8' };
  const fam = [[C.cobalt, C.sky, C.white], [C.turq, C.green, C.sky], [C.green, C.lime, C.yellow], [C.yellow, C.orange, C.white], [C.red, C.orange, C.pink], [C.pink, C.violet, C.white], [C.cobalt, C.turq, C.violet]];
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    const Rn = rng(31), seeds = [];
    for (let k = 0; k < 420; k++) seeds.push([Rn() * cols, Rn() * rows, Rn()]);
    const cx = cols / 2, cy = rows / 2, sun = rows * 0.24;
    for (let yy = 0; yy < rows; yy++) for (let xx = 0; xx < cols; xx++) {
      let d1 = 1e9, d2 = 1e9, best = null;
      for (const s of seeds) { const d = (s[0] - xx) ** 2 + (s[1] - yy) ** 2; if (d < d1) { d2 = d1; d1 = d; best = s; } else if (d < d2) d2 = d; }
      let col;
      if (Math.sqrt(d2) - Math.sqrt(d1) < 1.1) col = C.grout;
      else {
        const dc = Math.hypot(best[0] - cx, (best[1] - cy) * 1.2);
        if (dc < sun) col = [C.yellow, C.orange, C.yellow][Math.floor(best[2] * 3)];
        else if (dc < sun + 4) col = C.white;
        else { const band = Math.floor((best[1] + 7 * Math.sin(best[0] * 0.07)) / (rows / 6)), f = fam[((band % fam.length) + fam.length) % fam.length]; col = f[Math.floor(best[2] * f.length)]; }
      }
      x.fillStyle = col; x.fillRect(xx, yy, 1, 1);
    }
    x.fillStyle = C.cobalt; x.fillRect(0, 0, cols, 2); x.fillRect(0, rows - 2, cols, 2); x.fillRect(0, 0, 2, rows); x.fillRect(cols - 2, 0, 2, rows);
  });
}

// The Alhambra: through a scalloped stucco arch, the Court of the Myrtles, its long pool mirroring the tower.
function spnAlhambra(ctx, W, H) {
  const u = H / 100, cx = W * 0.5, ys = H * 0.4, rw = W * 0.27, x0 = cx - rw, x1 = cx + rw;
  const arch = () => {
    ctx.beginPath(); ctx.moveTo(x0, H * 0.86); ctx.lineTo(x0, ys);
    for (let k = 0; k <= 80; k++) { const t = Math.PI + (k / 80) * Math.PI, lobe = 2.6 * u * Math.abs(Math.sin(((k / 80) * 9) * Math.PI)); const r = rw - lobe, ry = (H * 0.3) / rw; ctx.lineTo(cx + Math.cos(t) * r, ys + Math.sin(t) * r * ry); }
    ctx.lineTo(x1, H * 0.86); ctx.closePath();
  };
  // the stucco wall: carved diamond lattice, a tile dado below
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#c8b088'; ctx.lineWidth = 0.7 * u; for (let k = -20; k < 30; k++) { ctx.beginPath(); ctx.moveTo(k * 6 * u, 0); ctx.lineTo(k * 6 * u + H, H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(k * 6 * u, 0); ctx.lineTo(k * 6 * u - H, H); ctx.stroke(); }
  ctx.fillStyle = '#d8c49c'; for (let j = 0; j < 20; j++) for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(i * 6 * u + (j % 2 ? 3 * u : 0), j * 3 * u, 0.7 * u, 0, Math.PI * 2); ctx.fill(); }
  const dado = H * 0.86;
  ctx.fillStyle = '#f4efe2'; ctx.fillRect(0, dado, W, H - dado);
  for (let i = 0; i * 7 * u < W + 7 * u; i++) { const tx = i * 7 * u + 3.5 * u, ty = dado + 7 * u; ctx.fillStyle = ['#2f6aa8', '#2f8a5a', '#e0a83a', '#1a1a22'][i % 4]; for (const a of [0, Math.PI / 4]) { ctx.beginPath(); for (let k = 0; k < 4; k++) { const t = a + (k * Math.PI) / 2; ctx.lineTo(tx + Math.cos(t) * 3.2 * u, ty + Math.sin(t) * 3.2 * u); } ctx.closePath(); ctx.fill(); } }
  ctx.fillStyle = '#9a7a4a'; ctx.fillRect(0, dado - 1 * u, W, 1 * u);
  // the view through the arch
  ctx.save(); arch(); ctx.clip();
  const sky = ctx.createLinearGradient(0, H * 0.1, 0, H * 0.5); sky.addColorStop(0, '#4f9ade'); sky.addColorStop(1, '#cfe8f6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const hz = H * 0.5;
  // the tower at the far end, crenellated, with the white portico before it
  const tl = cx - 11 * u, tr = cx + 11 * u, tt = H * 0.17;
  ctx.fillStyle = '#d8a87a'; ctx.fillRect(tl, tt, tr - tl, hz - tt);
  ctx.fillStyle = '#c4946a'; ctx.fillRect(cx + 6 * u, tt, tr - cx - 6 * u, hz - tt);
  ctx.fillStyle = '#d8a87a'; for (let k = 0; k < 6; k++) ctx.fillRect(tl + k * 4 * u, tt - 2 * u, 2.4 * u, 2 * u);
  ctx.fillStyle = '#a8784e'; ctx.fillRect(tl, H * 0.31, tr - tl, 1 * u); for (let k = 0; k < 4; k++) ctx.fillRect(tl + (3 + k * 5) * u, H * 0.235, 1.4 * u, 3.4 * u);
  ctx.fillStyle = '#f2ece0'; ctx.fillRect(cx - 19 * u, hz - 11 * u, 38 * u, 11 * u); ctx.fillStyle = '#d8ccb4'; ctx.fillRect(cx - 19 * u, hz - 11 * u, 38 * u, 1.2 * u);
  ctx.fillStyle = '#9a7c5c'; for (let k = 0; k < 5; k++) { const ax = cx - 14 * u + k * 7 * u; roundRect(ctx, ax - 2.4 * u, hz - 8 * u, 4.8 * u, 8 * u, [2.4 * u, 2.4 * u, 0, 0]); ctx.fill(); }
  // marble paving, the long pool narrowing to the portico, the tower mirrored in it
  ctx.fillStyle = '#f2ece0'; ctx.fillRect(0, hz, W, H);
  const pl = (yy, m) => { const t = (yy - hz) / (H * 0.36); return cx + m * (13 + 20 * t) * u; };
  const bot = H * 0.86;
  ctx.fillStyle = '#3f7aac'; ctx.beginPath(); ctx.moveTo(pl(hz, -1), hz); ctx.lineTo(pl(hz, 1), hz); ctx.lineTo(pl(bot, 1), bot); ctx.lineTo(pl(bot, -1), bot); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#c8a07e'; ctx.beginPath(); ctx.moveTo(tl + 1 * u, hz); ctx.lineTo(tr - 1 * u, hz); ctx.lineTo(cx + 14 * u, H * 0.74); ctx.lineTo(cx - 14 * u, H * 0.74); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#e8e2d6'; ctx.beginPath(); ctx.moveTo(cx - 19 * u, hz); ctx.lineTo(cx + 19 * u, hz); ctx.lineTo(cx + 23 * u, hz + 4 * u); ctx.lineTo(cx - 23 * u, hz + 4 * u); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#8ab8d8'; for (let k = 0; k < 6; k++) { const yy = hz + (8 + k * 5) * u; ctx.fillRect(pl(yy, -1) + 3 * u, yy, (pl(yy, 1) - pl(yy, -1)) * 0.3, 0.7 * u); }
  // low myrtle hedges along both sides
  for (const m of [-1, 1]) {
    ctx.fillStyle = '#3f6a3a'; ctx.beginPath(); ctx.moveTo(pl(hz, m) + m * 2 * u, hz); ctx.lineTo(pl(hz, m) + m * 6 * u, hz); ctx.lineTo(pl(bot, m) + m * 16 * u, bot); ctx.lineTo(pl(bot, m) + m * 4 * u, bot); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#5f944e'; ctx.beginPath(); ctx.moveTo(pl(hz, m) + m * 2 * u, hz - 1 * u); ctx.lineTo(pl(hz, m) + m * 6 * u, hz - 1 * u); ctx.lineTo(pl(bot, m) + m * 16 * u, bot - 6 * u); ctx.lineTo(pl(bot, m) + m * 4 * u, bot - 6 * u); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  // the arch's moulding and slender columns
  ctx.strokeStyle = '#b89a6a'; ctx.lineWidth = 1.6 * u; arch(); ctx.stroke();
  for (const px of [x0, x1]) { ctx.fillStyle = '#f2ece0'; ctx.fillRect(px - 1.6 * u, ys, 3.2 * u, H * 0.86 - ys); ctx.fillStyle = '#d8c8a8'; ctx.fillRect(px - 3 * u, ys - 2 * u, 6 * u, 3 * u); ctx.fillRect(px - 2.4 * u, H * 0.84, 4.8 * u, 2 * u); }
}

// An Andalusian courtyard: blue pots of geraniums on a white wall, a tiled fountain, an orange tree, an iron gate.
function spnPatio(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#f6f2ea'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e8e2d6'; for (let k = 0; k < 30; k++) ctx.fillRect(((k * 37) % 100) / 100 * W, ((k * 23) % 70) / 100 * H, 8 * u, 0.6 * u);
  ctx.fillStyle = '#b8603a'; ctx.fillRect(0, H * 0.78, W, H * 0.22);
  ctx.strokeStyle = '#a04e30'; ctx.lineWidth = 0.6 * u; for (let k = 0; k < 20; k++) { ctx.beginPath(); ctx.moveTo((k * W) / 20, H * 0.78); ctx.lineTo((k * W) / 20 + (k - 10) * 3 * u, H); ctx.stroke(); } for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(0, H * (0.78 + k * 0.055)); ctx.lineTo(W, H * (0.78 + k * 0.055)); ctx.stroke(); }
  // the arched gateway: a shady passage and, beyond it, a second sunny patio
  const gx = W * 0.5, gw = 24 * u, gt = H * 0.2, gb = H * 0.78;
  ctx.fillStyle = '#e0b860'; roundRect(ctx, gx - gw / 2 - 2.4 * u, gt - 2.4 * u, gw + 4.8 * u, gb - gt + 2.4 * u, [gw / 2 + 2.4 * u, gw / 2 + 2.4 * u, 0, 0]); ctx.fill();
  ctx.fillStyle = '#7a6a58'; roundRect(ctx, gx - gw / 2, gt, gw, gb - gt, [gw / 2, gw / 2, 0, 0]); ctx.fill();
  ctx.fillStyle = '#5e5044'; ctx.beginPath(); ctx.moveTo(gx - gw / 2, gb); ctx.lineTo(gx - gw * 0.26, H * 0.66); ctx.lineTo(gx + gw * 0.26, H * 0.66); ctx.lineTo(gx + gw / 2, gb); ctx.fill();
  const ow = gw * 0.5, ot = H * 0.36;
  ctx.fillStyle = '#fbf3dc'; roundRect(ctx, gx - ow / 2, ot, ow, H * 0.66 - ot, [ow / 2, ow / 2, 0, 0]); ctx.fill();
  ctx.fillStyle = '#e0c890'; ctx.fillRect(gx - ow / 2, H * 0.6, ow, H * 0.06);
  ctx.fillStyle = '#4f8a3a'; ctx.beginPath(); ctx.arc(gx + ow * 0.18, H * 0.55, 3.4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#2f6fb8'; ctx.fillRect(gx + ow * 0.18 - 1.6 * u, H * 0.58, 3.2 * u, 2.6 * u);
  ctx.fillStyle = '#e0303a'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(gx + ow * 0.18 + (k - 1.5) * 1.6 * u, H * 0.52 - (k % 2) * u, 1.1 * u, 0, Math.PI * 2); ctx.fill(); }
  // pots on the wall
  const pot = (px, py, fl) => { ctx.fillStyle = '#2f6fb8'; ctx.beginPath(); ctx.moveTo(px - 3.4 * u, py); ctx.lineTo(px + 3.4 * u, py); ctx.lineTo(px + 2.4 * u, py + 5 * u); ctx.lineTo(px - 2.4 * u, py + 5 * u); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f6f2ea'; ctx.fillRect(px - 3.4 * u, py + 1 * u, 6.8 * u, 0.6 * u); ctx.fillStyle = '#3f7a3a'; ctx.beginPath(); ctx.ellipse(px, py - 1 * u, 4.4 * u, 2.6 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = fl; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(px + (k - 2) * 1.8 * u, py - 2.4 * u - (k % 2) * 1.2 * u, 1.3 * u, 0, Math.PI * 2); ctx.fill(); } };
  for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { const px = k < 2 ? W * (0.08 + k * 0.12) : W * (0.68 + (k - 2) * 0.12) + (r % 2) * 4 * u, py = H * (0.14 + r * 0.15); pot(px, py, ['#e0303a', '#f070a0', '#e85a3a', '#f8f2f0'][(r + k) % 4]); }
  // the tiled fountain
  const fx = W * 0.5, fy = H * 0.86;
  ctx.fillStyle = '#2f6fb8'; ctx.beginPath(); ctx.ellipse(fx, fy, 20 * u, 6 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f2c040'; for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; ctx.fillRect(fx + Math.cos(a) * 17 * u - 1 * u, fy + Math.sin(a) * 5 * u - 1 * u, 2 * u, 2 * u); }
  ctx.fillStyle = '#5ab0d8'; ctx.beginPath(); ctx.ellipse(fx, fy - 1 * u, 15 * u, 4 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f6f2ea'; ctx.fillRect(fx - 1.4 * u, fy - 9 * u, 2.8 * u, 8 * u); ctx.beginPath(); ctx.ellipse(fx, fy - 9 * u, 5 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#9ad6ee'; ctx.lineWidth = 0.8 * u; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(fx, fy - 11 * u); ctx.quadraticCurveTo(fx + d * 6 * u, fy - 14 * u, fx + d * 9 * u, fy - 2 * u); ctx.stroke(); }
  // an orange tree in a terracotta pot on the left
  const tx = W * 0.2, ty = H * 0.95;
  ctx.fillStyle = '#b8502a'; ctx.beginPath(); ctx.moveTo(tx - 6 * u, ty - 10 * u); ctx.lineTo(tx + 6 * u, ty - 10 * u); ctx.lineTo(tx + 4.4 * u, ty); ctx.lineTo(tx - 4.4 * u, ty); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#5a3a24'; ctx.fillRect(tx - 1 * u, ty - 26 * u, 2 * u, 16 * u);
  ctx.fillStyle = '#2f6a2e'; ctx.beginPath(); ctx.arc(tx, ty - 32 * u, 12 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#4f8a3a'; ctx.beginPath(); ctx.arc(tx - 3 * u, ty - 35 * u, 7 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f08a1a'; for (let k = 0; k < 10; k++) { const a = k * 0.63, r = (4 + (k % 3) * 2.6) * u; ctx.beginPath(); ctx.arc(tx + Math.cos(a) * r, ty - 32 * u + Math.sin(a) * r, 1.6 * u, 0, Math.PI * 2); ctx.fill(); }
}

// Paella in its pan, seen from above: saffron rice, prawns, mussels, peas, red pepper and lemon on a tiled table.
function spnPaella(ctx, W, H) {
  const u = H / 100, cx = W * 0.5, cy = H * 0.5;
  ctx.fillStyle = '#b8603a'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#a04e30'; ctx.lineWidth = 0.7 * u; for (let k = 0; k * 12 * u < W; k++) { ctx.beginPath(); ctx.moveTo(k * 12 * u, 0); ctx.lineTo(k * 12 * u, H); ctx.stroke(); } for (let k = 0; k * 12 * u < H; k++) { ctx.beginPath(); ctx.moveTo(0, k * 12 * u); ctx.lineTo(W, k * 12 * u); ctx.stroke(); }
  // the pan and its two handles
  ctx.fillStyle = '#2a2a2e'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + d * 46 * u, cy, 6 * u, 4 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#b8b6b0'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + d * 46 * u, cy, 4 * u, 2.2 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#2a2a2e'; ctx.beginPath(); ctx.arc(cx, cy, 43 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8a83a'; ctx.beginPath(); ctx.arc(cx, cy, 40 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f2c450'; for (let k = 0; k < 180; k++) { const a = k * 2.4, r = Math.sqrt(k / 180) * 39 * u; ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.2 * u, 0.7 * u); }
  ctx.fillStyle = '#c8782a'; for (let k = 0; k < 40; k++) { const a = k * 1.7, r = (36 + (k % 3)) * u; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 * u, 0, Math.PI * 2); ctx.fill(); }
  // peas and pepper strips
  ctx.fillStyle = '#4f9a3a'; for (let k = 0; k < 40; k++) { const a = k * 2.1, r = ((k * 13) % 34) * u + 3 * u; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.3 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = '#d8302a'; ctx.lineWidth = 1.6 * u; ctx.lineCap = 'round'; for (let k = 0; k < 8; k++) { const a = k * 0.8 + 0.3, r = (14 + (k % 3) * 8) * u, px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a + 1.6) * 7 * u, py + Math.sin(a + 1.6) * 7 * u); ctx.stroke(); }
  // mussels
  for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2 + 0.2, px = cx + Math.cos(a) * 29 * u, py = cy + Math.sin(a) * 29 * u; ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.fillStyle = '#1e1e2a'; ctx.beginPath(); ctx.ellipse(0, -2 * u, 5 * u, 2.4 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 2 * u, 5 * u, 2.4 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#e8a060'; ctx.beginPath(); ctx.ellipse(0, -2 * u, 3.4 * u, 1.3 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  // prawns curling round the middle
  for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2, px = cx + Math.cos(a) * 15 * u, py = cy + Math.sin(a) * 15 * u; ctx.save(); ctx.translate(px, py); ctx.rotate(a + Math.PI / 2); ctx.strokeStyle = '#f07a4a'; ctx.lineWidth = 3.6 * u; ctx.beginPath(); ctx.arc(0, 0, 4.4 * u, Math.PI * 0.1, Math.PI * 1.3); ctx.stroke(); ctx.strokeStyle = '#f8b090'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.arc(0, 0, 4.4 * u, Math.PI * 0.2, Math.PI * 1.2); ctx.stroke(); ctx.fillStyle = '#d8502a'; ctx.beginPath(); ctx.moveTo(4.4 * u, 0.6 * u); ctx.lineTo(7.4 * u, -1.4 * u); ctx.lineTo(7 * u, 2.4 * u); ctx.fill(); ctx.restore(); }
  // lemon wedges
  for (const a of [0.8, 3.9]) { const px = cx + Math.cos(a) * 6 * u, py = cy + Math.sin(a) * 6 * u; ctx.fillStyle = '#f6d43a'; ctx.beginPath(); ctx.moveTo(px, py); ctx.arc(px, py, 6 * u, a - 0.6, a + 0.6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fbeea0'; ctx.beginPath(); ctx.moveTo(px, py); ctx.arc(px, py, 4.6 * u, a - 0.5, a + 0.5); ctx.closePath(); ctx.fill(); }
}

// The windmills of La Mancha: white towers with black caps along a ridge above red earth, a castle at the end.
function spnLaMancha(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55); sky.addColorStop(0, '#3f8ad0'); sky.addColorStop(1, '#cfe6f4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f8fbfd'; for (const [a, b, r] of [[0.16, 0.14, 5], [0.24, 0.12, 6.5], [0.66, 0.1, 5], [0.74, 0.13, 6]]) { ctx.beginPath(); ctx.ellipse(W * a, H * b, r * u * 1.8, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#a8946a'; ctx.beginPath(); ctx.moveTo(0, H * 0.6); ctx.quadraticCurveTo(W * 0.4, H * 0.48, W, H * 0.54); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  // fields below: red earth, rows of olives and vines
  ctx.fillStyle = '#b8603a'; ctx.beginPath(); ctx.moveTo(0, H * 0.72); ctx.quadraticCurveTo(W * 0.5, H * 0.66, W, H * 0.7); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#c8783a'; ctx.beginPath(); ctx.moveTo(0, H * 0.86); ctx.quadraticCurveTo(W * 0.5, H * 0.8, W, H * 0.84); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#4f6a3a'; for (let r = 0; r < 4; r++) for (let k = 0; k < 22; k++) { ctx.beginPath(); ctx.arc((k + (r % 2) * 0.5) * W / 21, H * (0.74 + r * 0.035), (1.2 + r * 0.3) * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = '#7a8a3a'; ctx.lineWidth = 0.7 * u; for (let r = 0; r < 4; r++) { ctx.beginPath(); ctx.moveTo(0, H * (0.89 + r * 0.03)); ctx.lineTo(W, H * (0.87 + r * 0.03)); ctx.stroke(); }
  // the castle at the right end of the ridge
  const cx = W * 0.88, cb = H * 0.55;
  ctx.fillStyle = '#c8b08a'; ctx.fillRect(cx - 9 * u, cb - 9 * u, 18 * u, 9 * u); ctx.fillRect(cx - 3 * u, cb - 16 * u, 6 * u, 7 * u);
  ctx.fillStyle = '#b09670'; for (let k = 0; k < 5; k++) ctx.fillRect(cx - 9 * u + k * 4 * u, cb - 10.4 * u, 2 * u, 1.4 * u); for (let k = 0; k < 2; k++) ctx.fillRect(cx - 3 * u + k * 4 * u, cb - 17.4 * u, 2 * u, 1.4 * u);
  // the mills
  const mill = (mx, base, s, rot) => {
    const tw = 12 * s * u, th = 22 * s * u;
    ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.moveTo(mx - tw / 2, base); ctx.lineTo(mx - tw * 0.42, base - th); ctx.lineTo(mx + tw * 0.42, base - th); ctx.lineTo(mx + tw / 2, base); ctx.fill();
    ctx.fillStyle = '#dfe4ea'; ctx.fillRect(mx + tw * 0.12, base - th, tw * 0.32, th);
    ctx.fillStyle = '#2a2a30'; ctx.fillRect(mx - tw * 0.1, base - th * 0.3, tw * 0.2, th * 0.3); ctx.fillRect(mx - tw * 0.06, base - th * 0.7, tw * 0.12, th * 0.12);
    ctx.fillStyle = '#26262c'; ctx.beginPath(); ctx.moveTo(mx - tw * 0.5, base - th); ctx.lineTo(mx, base - th - tw * 0.7); ctx.lineTo(mx + tw * 0.5, base - th); ctx.closePath(); ctx.fill();
    const hx = mx - tw * 0.36, hy = base - th - tw * 0.05;
    for (let k = 0; k < 4; k++) {
      const a = rot + (k * Math.PI) / 2, L = th * 0.86, sw = 5 * s * u;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
      ctx.fillStyle = '#d8ccb0'; ctx.fillRect(L * 0.24, 0.6 * u, L * 0.76, sw);
      ctx.fillStyle = '#5a4030'; ctx.fillRect(0, -0.8 * u, L, 1.6 * u); ctx.fillRect(L * 0.24, sw, L * 0.76, 1.1 * u); ctx.fillRect(L - 1.1 * u, 0, 1.1 * u, sw + 1 * u);
      for (let g = 1; g < 4; g++) ctx.fillRect(L * (0.24 + g * 0.19), 0.4 * u, 1 * u, sw);
      ctx.restore();
    }
    ctx.fillStyle = '#2a1e16'; ctx.beginPath(); ctx.arc(hx, hy, 1.6 * u, 0, Math.PI * 2); ctx.fill();
  };
  mill(W * 0.15, H * 0.6, 0.95, 0.35); mill(W * 0.42, H * 0.55, 1.08, 0.8); mill(W * 0.69, H * 0.54, 1, 0.1);
}

const SPAIN_SCENES = [
  (c, w, h) => { c.fillStyle = '#c8202a'; c.fillRect(0, 0, w, h); c.fillStyle = '#f6f0e6'; for (let j = 0; j < 6; j++) for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(w * (0.2 + i * 0.3 + (j % 2) * 0.15), h * (0.08 + j * 0.17), w * 0.07, 0, Math.PI * 2); c.fill(); } }, // polka dots
  (c, w, h) => { c.fillStyle = '#8ac4ea'; c.fillRect(0, 0, w, h); c.fillStyle = '#b8603a'; c.fillRect(0, h * 0.72, w, h); c.fillStyle = '#f6f6f2'; c.fillRect(w * 0.3, h * 0.32, w * 0.4, h * 0.42); c.fillStyle = '#26262c'; c.beginPath(); c.moveTo(w * 0.24, h * 0.32); c.lineTo(w * 0.5, h * 0.14); c.lineTo(w * 0.76, h * 0.32); c.fill(); }, // windmill
  (c, w, h) => { c.fillStyle = '#f4f0e6'; c.fillRect(0, 0, w, h); for (let k = 0; k < 3; k++) { c.fillStyle = k % 2 ? '#2f7a5a' : '#1f4a9a'; const cy = h * (0.18 + k * 0.32); c.beginPath(); c.moveTo(w * 0.5, cy - w * 0.32); c.lineTo(w * 0.82, cy); c.lineTo(w * 0.5, cy + w * 0.32); c.lineTo(w * 0.18, cy); c.fill(); } }, // tiles
  (c, w, h) => { c.fillStyle = '#5aa2dc'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd36a'; c.beginPath(); c.arc(w * 0.5, h * 0.25, w * 0.2, 0, Math.PI * 2); c.fill(); c.fillStyle = '#2f8ab8'; c.fillRect(0, h * 0.5, w, h * 0.25); c.fillStyle = '#f2dcb0'; c.fillRect(0, h * 0.75, w, h); }, // beach
  (c, w, h) => { c.fillStyle = '#2f6a2e'; c.fillRect(0, 0, w, h); c.fillStyle = '#f08a1a'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(w * (0.28 + (k % 2) * 0.44), h * (0.12 + Math.floor(k / 2) * 0.32), w * 0.16, 0, Math.PI * 2); c.fill(); } }, // oranges
];
function spnPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'SPAIN', SPAIN_SCENES); }

// ---------- France: Provence and the Riviera ----------

// Lavender in Provence: purple rows running to a stone farmhouse under a tree, blue hills behind.
function frnLavender(ctx, W, H) {
  const u = H / 100, vx = W * 0.56, vy = H * 0.44;
  const sky = ctx.createLinearGradient(0, 0, 0, vy); sky.addColorStop(0, '#6aaee0'); sky.addColorStop(1, '#f2e2c4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#8a8ab8'; ctx.beginPath(); ctx.moveTo(0, vy); for (let k = 0; k <= 20; k++) { const t = k / 20; ctx.lineTo(W * t, vy - (5 + 4 * Math.sin(t * 5 + 1)) * u); } ctx.lineTo(W, vy); ctx.fill();
  ctx.fillStyle = '#7a9a5a'; ctx.fillRect(0, vy - 1 * u, W, 3 * u);
  // the farmhouse and its tree
  const hx = vx, hy = vy;
  ctx.fillStyle = '#e8d0a8'; ctx.fillRect(hx - 8 * u, hy - 7 * u, 14 * u, 7 * u);
  ctx.fillStyle = '#c4643a'; ctx.beginPath(); ctx.moveTo(hx - 9 * u, hy - 7 * u); ctx.lineTo(hx - 1 * u, hy - 11 * u); ctx.lineTo(hx + 7 * u, hy - 7 * u); ctx.fill();
  ctx.fillStyle = '#5a8ab8'; for (const dx of [-6, -2, 2]) ctx.fillRect(hx + dx * u, hy - 5 * u, 2 * u, 2.4 * u);
  ctx.fillStyle = '#5a4030'; ctx.fillRect(hx + 10 * u, hy - 9 * u, 1.4 * u, 9 * u);
  ctx.fillStyle = '#3f6a3a'; ctx.beginPath(); ctx.arc(hx + 10.7 * u, hy - 13 * u, 6.4 * u, 0, Math.PI * 2); ctx.fill();
  // the rows
  ctx.fillStyle = '#7a8a4a'; ctx.fillRect(0, vy + 2 * u, W, H);
  const N = 15;
  for (let k = -N; k <= N; k++) {
    const nearL = vx + (k - 0.3) * 14 * u, nearR = vx + (k + 0.3) * 14 * u, farL = vx + (k - 0.3) * 1.4 * u, farR = vx + (k + 0.3) * 1.4 * u;
    ctx.fillStyle = k % 2 ? '#7a5ab8' : '#8a6ac8'; ctx.beginPath(); ctx.moveTo(farL, vy + 2 * u); ctx.lineTo(farR, vy + 2 * u); ctx.lineTo(nearR + (k * 6) * u, H); ctx.lineTo(nearL + (k * 6) * u, H); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#b8a0e0'; for (let k = 0; k < 60; k++) { const kk = (k % 13) - 6, t = 0.3 + ((k * 7) % 10) / 14; const px = vx + kk * (1.4 + t * 18) * u, py = vy + 2 * u + (H - vy) * t; ctx.fillRect(px, py, 1.4 * u, 1 * u); }
}

// A Provençal print, laid out like a tablecloth: a field of small flowers on sunflower yellow, framed by bands of
// other small prints in blue and madder red.
function frnProvencal(ctx, W, H) {
  const C = { yellow: '#e8b830', yellow2: '#dcac2a', blue: '#1f3f8a', red: '#b8302a', green: '#3f7a3a', white: '#f4ecd8', navy: '#16285a', olive: '#8a8a3a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    const flower = (px, py, petal, heart, s = 1) => { for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) { x.fillStyle = petal; x.beginPath(); x.arc(px + dx * 1.3 * s, py + dy * 1.3 * s, 1.1 * s, 0, Math.PI * 2); x.fill(); } R(px - 0.5, py - 0.5, 1, 1, heart); };
    const band = (o, d, bg, draw) => { R(o, o, cols - 2 * o, rows - 2 * o, bg); draw(o, d); };
    // outer band: navy with white flowers
    band(0, 8, C.navy, (o, d) => { for (const [len, put] of [[cols - 8, (a) => { flower(4 + a, 4, C.white, C.red); flower(4 + a, rows - 4, C.white, C.red); }], [rows - 8, (a) => { flower(4, 4 + a, C.white, C.red); flower(cols - 4, 4 + a, C.white, C.red); }]]) { const { n, d: s } = evenSteps(len, 7); for (let i = 0; i <= n; i++) put(i * s); } });
    R(8, 8, cols - 16, 1, C.yellow);
    // red band with yellow leaves running
    R(9, 9, cols - 18, rows - 18, C.red);
    for (const [len, put] of [[cols - 22, (a, k) => { leaf(x, 11 + a, 12.5, 4, k % 2 ? 0.5 : -0.5, C.yellow); leaf(x, 11 + a, rows - 12.5, 4, k % 2 ? -0.5 : 0.5, C.yellow); }], [rows - 22, (a, k) => { leaf(x, 12.5, 11 + a, 4, Math.PI / 2 + (k % 2 ? 0.5 : -0.5), C.yellow); leaf(x, cols - 12.5, 11 + a, 4, Math.PI / 2 + (k % 2 ? -0.5 : 0.5), C.yellow); }]]) { const { n, d } = evenSteps(len, 5); for (let i = 0; i <= n; i++) put(i * d, i); }
    R(16, 16, cols - 32, 1, C.white); R(16, rows - 17, cols - 32, 1, C.white); R(16, 16, 1, rows - 32, C.white); R(cols - 17, 16, 1, rows - 32, C.white);
    // the field
    const fx = 17, fy = 17, fw = cols - 34, fh = rows - 34;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 7) % 3 === 1 ? C.yellow2 : C.yellow);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const nx = 8, ny = 4, sx = fw / nx, sy = fh / ny;
    const bouquet = (px, py) => {
      leaf(x, px - 1.5, py + 2, 6.5, 2.5, C.green); leaf(x, px + 1.5, py + 2, 6.5, 0.65, C.green);
      x.strokeStyle = C.green; x.lineWidth = 0.8; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + d * 3, py - 3, px + d * 5.5, py - 4.5); x.stroke(); x.fillStyle = C.red; x.beginPath(); x.arc(px + d * 5.8, py - 5, 1.4, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.blue; for (let k = 0; k < 6; k++) { const a = (k * Math.PI) / 3; x.beginPath(); x.arc(px + Math.cos(a) * 2.3, py + Math.sin(a) * 2.3, 1.7, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.white; x.beginPath(); x.arc(px, py, 1.4, 0, Math.PI * 2); x.fill(); R(px - 0.5, py - 0.5, 1, 1, C.red);
    };
    const sprig = (px, py) => { leaf(x, px, py, 3.4, -2.2, C.olive); leaf(x, px, py, 3.4, -0.9, C.olive); R(Math.round(px), Math.round(py) + 1, 1, 1, C.navy); };
    for (let j = -1; j <= ny; j++) for (let i = -1; i <= nx; i++) {
      const px = fx + (i + 0.5) * sx, py = fy + (j + 0.5 + (i % 2 ? 0.5 : 0)) * sy;
      bouquet(px, py); sprig(px, py + sy * 0.5); R(Math.round(px + sx * 0.5), Math.round(py + sy * 0.25), 1, 1, C.red);
    }
    x.restore();
  });
}

// The Riviera from above: rows of striped parasols and loungers on the sand, the turquoise sea breaking along the shore.
function frnRiviera(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#efd9a8'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e6cc98'; for (let k = 0; k < 60; k++) ctx.fillRect(((k * 37) % 100) / 100 * W, ((k * 53) % 100) / 100 * H, 2 * u, 1 * u);
  // the sea along the top, foam where it meets the sand
  const shore = (px) => H * (0.3 + 0.04 * Math.sin(px / W * 6));
  ctx.fillStyle = '#1f7fb8'; ctx.fillRect(0, 0, W, H * 0.1);
  const sea = ctx.createLinearGradient(0, 0, 0, H * 0.34); sea.addColorStop(0, '#1f6fb0'); sea.addColorStop(1, '#3ac0c8');
  ctx.fillStyle = sea; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); for (let px = W; px >= 0; px -= 2 * u) ctx.lineTo(px, shore(px)); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#f6fbff'; ctx.lineWidth = 1.4 * u; ctx.beginPath(); for (let px = 0; px <= W; px += 2 * u) px ? ctx.lineTo(px, shore(px) - 1 * u) : ctx.moveTo(px, shore(px) - 1 * u); ctx.stroke();
  ctx.lineWidth = 0.8 * u; ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); for (let px = 0; px <= W; px += 2 * u) px ? ctx.lineTo(px, shore(px) - 5 * u) : ctx.moveTo(px, shore(px) - 5 * u); ctx.stroke();
  // a swimmer and a little boat
  ctx.fillStyle = '#f6f2ea'; ctx.beginPath(); ctx.ellipse(W * 0.7, H * 0.08, 7 * u, 2.4 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#c8322a'; ctx.fillRect(W * 0.7 - 7 * u, H * 0.08 - 0.5 * u, 14 * u, 1 * u);
  ctx.fillStyle = '#e8b890'; ctx.beginPath(); ctx.arc(W * 0.32, H * 0.16, 1.2 * u, 0, Math.PI * 2); ctx.fill();
  // parasols in rows, each with its lounger and shadow
  const pal = [['#2f5fb8', '#6a92dc'], ['#e05a2a', '#f29a6a'], ['#1f8a7a', '#5ec0b0'], ['#e0a820', '#f6d468']];
  for (let r = 0; r < 3; r++) for (let k = 0; k < 7; k++) {
    const px = W * (0.08 + k * 0.14) + (r % 2) * 5 * u, py = H * (0.48 + r * 0.2), R = 8 * u, [c1, c2] = pal[(k + r) % pal.length];
    ctx.fillStyle = 'rgba(140,110,60,.3)'; ctx.beginPath(); ctx.ellipse(px + 3 * u, py + 3 * u, R, R * 0.8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f6f6f2'; ctx.fillRect(px + R * 0.9, py - 3 * u, 4 * u, 11 * u); ctx.fillStyle = c1; for (let s = 0; s < 4; s++) ctx.fillRect(px + R * 0.9, py - 3 * u + s * 3 * u, 4 * u, 1.4 * u);
    ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.arc(px, py, R + 1 * u, 0, Math.PI * 2); ctx.fill();
    for (let s = 0; s < 8; s++) { ctx.fillStyle = s % 2 ? c2 : c1; ctx.beginPath(); ctx.moveTo(px, py); ctx.arc(px, py, R, (s * Math.PI) / 4, ((s + 1) * Math.PI) / 4); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.arc(px, py, 1.2 * u, 0, Math.PI * 2); ctx.fill();
  }
}

// Sunflowers: a whole field of them turned to the sun, the nearest ones big in front.
function frnSunflowers(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.4); sky.addColorStop(0, '#3f8ad6'); sky.addColorStop(1, '#bfe2f4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f8fbfd'; for (const [a, b, r] of [[0.2, 0.12, 6], [0.3, 0.1, 7], [0.72, 0.14, 6]]) { ctx.beginPath(); ctx.ellipse(W * a, H * b, r * u * 1.8, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#5a8a3a'; ctx.fillRect(0, H * 0.34, W, H);
  const head = (px, py, r) => {
    if (r < 3 * u) { ctx.fillStyle = '#f6c020'; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#8a5a1a'; ctx.beginPath(); ctx.arc(px, py, r * 0.35, 0, Math.PI * 2); ctx.fill(); return; }
    for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2; ctx.fillStyle = k % 2 ? '#f6c020' : '#f0a818'; ctx.beginPath(); ctx.ellipse(px + Math.cos(a) * r * 0.66, py + Math.sin(a) * r * 0.66, r * 0.42, r * 0.2, a, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#6a3a1a'; ctx.beginPath(); ctx.arc(px, py, r * 0.42, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8a5a24'; ctx.beginPath(); ctx.arc(px - r * 0.08, py - r * 0.08, r * 0.26, 0, Math.PI * 2); ctx.fill();
  };
  // rows going away: many small heads near the horizon, bigger toward us
  for (let r = 0; r < 8; r++) {
    const t = r / 7, y = H * (0.36 + t * t * 0.5), rad = (1.4 + t * t * 7) * u, n = Math.round(40 - t * 26);
    for (let k = 0; k < n; k++) { const px = (k + (r % 2) * 0.5) * W / (n - 1); ctx.fillStyle = '#3f6a2a'; ctx.fillRect(px - 0.4 * u, y, 0.8 * u, rad * 2); if (r > 3) { ctx.fillStyle = '#4f8a3a'; ctx.beginPath(); ctx.ellipse(px + rad * 0.8, y + rad * 1.6, rad * 0.7, rad * 0.3, 0.5, 0, Math.PI * 2); ctx.fill(); } head(px, y, rad); }
  }
  for (const [a, b, r] of [[0.12, 0.8, 12], [0.86, 0.84, 13], [0.5, 0.92, 10]]) { ctx.fillStyle = '#3f6a2a'; ctx.fillRect(W * a - 1 * u, H * b, 2 * u, H); ctx.fillStyle = '#4f8a3a'; ctx.beginPath(); ctx.ellipse(W * a + r * 0.9 * u, H * b + r * 1.4 * u, r * 0.8 * u, r * 0.35 * u, 0.5, 0, Math.PI * 2); ctx.fill(); head(W * a, H * b, r * u); }
}

// Pétanque in the shade of the plane trees, seen from above: steel boules round the little jack on pale gravel.
function frnPetanque(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#ddd0b4'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#cbbd9e'; for (let k = 0; k < 300; k++) ctx.fillRect(((k * 37) % 100) / 100 * W + (k % 7) * u, ((k * 53) % 100) / 100 * H, 0.9 * u, 0.9 * u);
  ctx.fillStyle = 'rgba(80,70,40,.24)'; for (const [a, b, r] of [[0.15, 0.2, 18], [0.3, 0.12, 14], [0.85, 0.25, 20], [0.7, 0.85, 18], [0.1, 0.85, 14]]) { ctx.beginPath(); ctx.ellipse(W * a, H * b, r * u * 1.4, r * u, 0.4, 0, Math.PI * 2); ctx.fill(); }
  // the circle the throwers stand in
  ctx.strokeStyle = '#f6f2ea'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.arc(W * 0.14, H * 0.52, 11 * u, 0, Math.PI * 2); ctx.stroke();
  const boule = (bx, by, r) => {
    ctx.fillStyle = 'rgba(60,50,30,.3)'; ctx.beginPath(); ctx.ellipse(bx + r * 0.3, by + r * 0.35, r, r * 0.9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8a8e96'; ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a8acb4'; ctx.beginPath(); ctx.arc(bx - r * 0.15, by - r * 0.15, r * 0.75, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#5a5e66'; ctx.lineWidth = 0.6 * u; for (const k of [-0.4, 0, 0.4]) { ctx.beginPath(); ctx.ellipse(bx, by, r * Math.sqrt(1 - k * k), r * 0.25, 0, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = '#f2f4f6'; ctx.beginPath(); ctx.arc(bx - r * 0.4, by - r * 0.45, r * 0.18, 0, Math.PI * 2); ctx.fill();
  };
  const jx = W * 0.62, jy = H * 0.5;
  for (const [dx, dy] of [[-12, -7], [8, 10], [-3, 17], [18, -9], [-21, 11], [29, 5]]) boule(jx + dx * u, jy + dy * u, 7 * u);
  ctx.fillStyle = 'rgba(60,50,30,.3)'; ctx.beginPath(); ctx.arc(jx + 0.8 * u, jy + 0.9 * u, 2.8 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#d8502a'; ctx.beginPath(); ctx.arc(jx, jy, 2.8 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f29060'; ctx.beginPath(); ctx.arc(jx - 0.8 * u, jy - 0.8 * u, 1.1 * u, 0, Math.PI * 2); ctx.fill();
  // a couple of fallen plane leaves
  const pl = (px, py, a, col) => { ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.fillStyle = col; for (let k = 0; k < 5; k++) { const t = -Math.PI / 2 + ((k - 2) * Math.PI) / 4.4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(t - 0.3) * 3 * u, Math.sin(t - 0.3) * 3 * u); ctx.lineTo(Math.cos(t) * 6 * u, Math.sin(t) * 6 * u); ctx.lineTo(Math.cos(t + 0.3) * 3 * u, Math.sin(t + 0.3) * 3 * u); ctx.closePath(); ctx.fill(); } ctx.fillRect(-0.3 * u, 0, 0.6 * u, 3 * u); ctx.restore(); };
  ctx.save(); for (const [a, b, r, col] of [[0.3, 0.24, 0.6, '#b8862a'], [0.86, 0.74, -0.8, '#8a9a3a'], [0.4, 0.82, 2.2, '#c8742a']]) { ctx.translate(W * a, H * b); ctx.scale(1.6, 1.6); pl(0, 0, r, col); ctx.setTransform(1, 0, 0, 1, 0, 0); } ctx.restore();
}

// A Provençal market stall: a scalloped striped awning over crates of tomatoes, lemons, aubergines, courgettes,
// bunches of lavender and a basket of olives.
function frnMarket(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#e8d8b8'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#d8c49c'; for (let k = 0; k < 8; k++) ctx.fillRect(0, H * (0.06 + k * 0.05), W, 0.5 * u);
  // the awning
  for (let k = 0; k * 8 * u < W; k++) { ctx.fillStyle = k % 2 ? '#f6f2ea' : '#e8a830'; ctx.fillRect(k * 8 * u, 0, 8 * u, H * 0.2); ctx.beginPath(); ctx.arc(k * 8 * u + 4 * u, H * 0.2, 4 * u, 0, Math.PI); ctx.fill(); }
  ctx.fillStyle = 'rgba(0,0,0,.1)'; ctx.fillRect(0, H * 0.2 + 4 * u, W, 3 * u);
  // the table and crates
  ctx.fillStyle = '#8a5a34'; ctx.fillRect(0, H * 0.9, W, H * 0.1);
  const crate = (x0, y0, w, h, fill) => { ctx.fillStyle = '#c89a62'; ctx.fillRect(x0, y0, w, h); ctx.fillStyle = '#a87a48'; ctx.fillRect(x0, y0 + h * 0.6, w, h * 0.1); ctx.fillRect(x0, y0 + h - 1 * u, w, 1 * u); fill(x0 + 1 * u, y0, w - 2 * u, h * 0.6); };
  const balls = (col, hi, r) => (x0, y0, w, h) => { for (let j = 0; j < 3; j++) for (let k = 0; k * r * 2 < w; k++) { const px = x0 + r + k * r * 2 + (j % 2) * r * 0.6, py = y0 + h - r - j * r * 1.4; if (px > x0 + w - r * 0.6) continue; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = hi; ctx.beginPath(); ctx.arc(px - r * 0.35, py - r * 0.35, r * 0.3, 0, Math.PI * 2); ctx.fill(); } };
  const longs = (col, hi) => (x0, y0, w, h) => { for (let j = 0; j < 3; j++) for (let k = 0; k < 4; k++) { const px = x0 + (k + 0.5) * w / 4, py = y0 + h - 2.6 * u - j * 3.4 * u; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(px, py, w / 9, 2 * u, 0.2 * (j - 1), 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = hi; ctx.fillRect(px - w / 9, py - 0.4 * u, 1.4 * u, 0.8 * u); } };
  const cw = W * 0.18;
  crate(W * 0.02, H * 0.52, cw, H * 0.38, balls('#d8302a', '#f07a6a', 3.4 * u));
  crate(W * 0.21, H * 0.52, cw, H * 0.38, balls('#f2cc2a', '#fbea8a', 3 * u));
  crate(W * 0.4, H * 0.52, cw, H * 0.38, longs('#4a2a5a', '#7a5a8a'));
  crate(W * 0.59, H * 0.52, cw, H * 0.38, longs('#3f7a2a', '#6aa04a'));
  // garlic braids hanging from the awning rail
  ctx.fillStyle = '#7a5a34'; ctx.fillRect(0, H * 0.27, W * 0.78, 0.8 * u);
  for (const gx of [0.1, 0.38, 0.66]) { ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(W * gx, H * 0.27); ctx.lineTo(W * gx, H * 0.47); ctx.stroke(); for (let k = 0; k < 6; k++) { const px = W * gx + (k % 2 ? 2 : -2) * u, py = H * 0.31 + k * 2.8 * u; ctx.fillStyle = '#9a7a5a'; ctx.beginPath(); ctx.arc(px, py, 2.9 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fbf6ee'; ctx.beginPath(); ctx.arc(px, py, 2.2 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#b890b8'; ctx.fillRect(px - 0.5 * u, py - 1.8 * u, 1 * u, 3 * u); } }
  // lavender bunches hanging and a basket of olives
  for (let k = 0; k < 5; k++) { const lx = W * (0.82 + (k % 3) * 0.05), ly = H * (0.3 + Math.floor(k / 3) * 0.16); ctx.strokeStyle = '#5a7a3a'; ctx.lineWidth = 0.6 * u; for (let s = -2; s <= 2; s++) { ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + s * 1.2 * u, ly + 10 * u); ctx.stroke(); } ctx.fillStyle = '#7a5ab8'; for (let s = -2; s <= 2; s++) { ctx.beginPath(); ctx.ellipse(lx + s * 1.2 * u, ly + 11 * u, 0.9 * u, 2.4 * u, 0, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = '#c8322a'; ctx.fillRect(lx - 1.4 * u, ly + 1 * u, 2.8 * u, 1 * u); }
  ctx.fillStyle = '#b88a4a'; ctx.beginPath(); ctx.ellipse(W * 0.88, H * 0.8, 9 * u, 5 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#4a4a2a'; for (let k = 0; k < 16; k++) { ctx.beginPath(); ctx.ellipse(W * 0.88 + ((k % 6) - 2.5) * 2.4 * u, H * 0.78 + Math.floor(k / 6) * 1.6 * u, 1.2 * u, 0.8 * u, 0.4, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 0.6 * u; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(W * 0.88 + k * 2.6 * u, H * 0.8); ctx.lineTo(W * 0.88 + k * 2.2 * u, H * 0.85); ctx.stroke(); }
}

// Tomettes: the hexagonal terracotta floor tiles of old Provençal houses, each its own shade, a darker rosace in
// the middle.
function frnTomette(ctx, W, H) {
  const C = { t1: '#b8502a', t2: '#c45a30', t3: '#a84828', t4: '#c86a3a', t5: '#9a4224', grout: '#d8c4a8', dark: '#7a3418', wood: '#4a2e1e' };
  const shades = [C.t1, C.t2, C.t3, C.t4, C.t5];
  weavePicture(ctx, W, H, 110, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.wood; x.fillRect(0, 0, cols, rows);
    const fx = 4, fy = 4, fw = cols - 8, fh = rows - 8;
    x.fillStyle = C.grout; x.fillRect(fx, fy, fw, fh);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const r = 6.6, hw = r * Math.sqrt(3), R = rng(17), cx0 = fx + fw / 2, cy0 = fy + fh / 2;
    for (let j = -1; j * r * 1.5 < fh + r; j++) for (let i = -1; i * hw < fw + hw; i++) {
      const cx = fx + i * hw + (j % 2 ? hw / 2 : 0), cy = fy + j * r * 1.5;
      x.fillStyle = shades[Math.floor(R() * shades.length)];
      x.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + (k * Math.PI) / 3; const px = cx + Math.cos(a) * (r - 0.6), py = cy + Math.sin(a) * (r - 0.6); k ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); x.fill();
    }
    x.restore();
  });
}

// Cicadas, the summer emblem of Provence, in green and blue glaze on sunflower yellow, an olive-branch border.
function frnCicadas(ctx, W, H) {
  const C = { yellow: '#f0c040', yellow2: '#e6b436', green: '#3f7a4a', green2: '#7ab06a', blue: '#8e3420', blue2: '#d8805a', brown: '#5a3a24', cream: '#f6ecd0', olive: '#4f5f2a', leaf: '#8a9a5a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    x.fillStyle = C.olive; x.fillRect(0, 0, cols, rows);
    for (const [len, put] of [[cols - 6, (a, k) => { leaf(x, 3 + a, 4.5, 4, k % 2 ? 0.4 : -0.4, C.leaf); leaf(x, 3 + a, rows - 4.5, 4, k % 2 ? -0.4 : 0.4, C.leaf); }], [rows - 6, (a, k) => { leaf(x, 4.5, 3 + a, 4, Math.PI / 2 + (k % 2 ? 0.4 : -0.4), C.leaf); leaf(x, cols - 4.5, 3 + a, 4, Math.PI / 2 + (k % 2 ? -0.4 : 0.4), C.leaf); }]]) { const { n, d } = evenSteps(len, 4); for (let i = 0; i <= n; i++) put(i * d, i); }
    x.fillStyle = C.cream; x.fillRect(8, 8, cols - 16, rows - 16);
    const fx = 9, fy = 9, fw = cols - 18, fh = rows - 18;
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = Math.floor((y - fy) / 8) % 3 === 1 ? C.yellow2 : C.yellow; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const cicada = (cx, cy, s, ang, body, wing) => {
      x.save(); x.translate(cx, cy); x.rotate(ang);
      for (const d of [-1, 1]) { x.fillStyle = wing; x.beginPath(); x.ellipse(d * s * 0.16, s * 0.2, s * 0.17, s * 0.5, d * -0.12, 0, Math.PI * 2); x.fill(); x.strokeStyle = body; x.lineWidth = 0.7; x.beginPath(); x.moveTo(d * s * 0.14, -s * 0.2); x.lineTo(d * s * 0.2, s * 0.6); x.stroke(); }
      x.fillStyle = body; x.beginPath(); x.ellipse(0, s * 0.05, s * 0.13, s * 0.36, 0, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.ellipse(0, -s * 0.32, s * 0.2, s * 0.12, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.brown; for (const d of [-1, 1]) { x.beginPath(); x.arc(d * s * 0.17, -s * 0.36, s * 0.06, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.cream; x.fillRect(-0.5, -s * 0.18, 1, s * 0.3);
      x.restore();
    };
    for (let j = 0; j < 3; j++) for (let i = 0; i < 7; i++) { const px = fx + (i + 0.5 + (j % 2 ? 0.5 : 0)) * fw / 7, py = fy + (j + 0.5) * fh / 3; cicada(px, py, fh * 0.22, (i + j) % 2 ? Math.PI : 0, (i + j) % 2 ? C.blue : C.green, (i + j) % 2 ? C.blue2 : C.green2); }
    for (let j = 0; j < 4; j++) for (let i = 0; i < 8; i++) { const px = fx + (i + (j % 2 ? 0.5 : 0)) * fw / 7, py = fy + j * fh / 3; x.fillStyle = C.cream; for (const [dx, dy] of [[0, -1.4], [1.4, 0], [0, 1.4], [-1.4, 0]]) { x.beginPath(); x.arc(px + dx, py + dy, 1, 0, Math.PI * 2); x.fill(); } x.fillStyle = C.green; x.fillRect(px - 0.5, py - 0.5, 1, 1); }
    x.restore();
  });
}

// A calanque near Marseille: an inlet of turquoise water between white limestone cliffs, pines on the tops,
// the open sea beyond and a sailing boat at anchor.
function frnCalanques(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.3); sky.addColorStop(0, '#3f8ad6'); sky.addColorStop(1, '#cfe8f6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#245f9e'; ctx.fillRect(0, H * 0.29, W, H * 0.06);
  // the inlet, widening toward us, deep blue at the mouth and turquoise over the sand, a pebble beach in front
  const water = ctx.createLinearGradient(0, H * 0.3, 0, H); water.addColorStop(0, '#1f5fa8'); water.addColorStop(0.45, '#1f9ab8'); water.addColorStop(0.85, '#5ad0c8'); water.addColorStop(1, '#a8e8d8');
  ctx.fillStyle = water; ctx.fillRect(0, H * 0.3, W, H * 0.7);
  ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let k = 0; k < 8; k++) ctx.fillRect(W * (0.42 + ((k * 13) % 14) / 100), H * (0.4 + k * 0.06), (4 + k) * u, 0.6 * u);
  ctx.fillStyle = '#efe6d0'; ctx.beginPath(); ctx.ellipse(W * 0.5, H * 1.02, W * 0.16, 7 * u, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#d8ccb0'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(W * (0.38 + k * 0.018), H * (0.97 + (k % 3) * 0.012), 0.9 * u, 0, Math.PI * 2); ctx.fill(); }
  // the cliffs: tall limestone walls, streaked and cracked, ledges of scrub, pines along the rim
  const rimL = [[0, 0.03], [0.06, 0.05], [0.11, 0.04], [0.17, 0.08], [0.22, 0.07], [0.28, 0.13], [0.33, 0.15], [0.38, 0.24], [0.42, 0.3]];
  const footL = [[0.42, 0.3], [0.39, 0.5], [0.33, 0.72], [0.24, 0.92], [0.2, 1]];
  const wall = (m) => {
    const X = (a) => (m < 0 ? W * a : W * (1 - a));
    const path = () => { ctx.beginPath(); ctx.moveTo(X(0), H); for (const [a, b] of rimL) ctx.lineTo(X(a), H * b); for (const [a, b] of footL.slice(1)) ctx.lineTo(X(a), H * b); ctx.closePath(); };
    ctx.save(); path(); ctx.clip();
    ctx.fillStyle = '#e4ddcc'; ctx.fillRect(0, 0, W, H);
    const shades = ['#ece6d8', '#d6cdb8', '#e4ddcc', '#c8bea8', '#f2ede2'];
    let a = 0, k = 0; while (a < 0.45) { const w = 0.012 + ((k * 7) % 5) * 0.006; ctx.fillStyle = shades[k % shades.length]; ctx.fillRect(Math.min(X(a), X(a + w)), 0, W * w, H); a += w; k++; }
    const sh = ctx.createLinearGradient(X(0.2), 0, X(0.42), 0); sh.addColorStop(0, 'rgba(120,105,80,0)'); sh.addColorStop(1, 'rgba(120,105,80,.35)'); ctx.fillStyle = sh; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#a89c84'; ctx.lineWidth = 1 * u; for (let c = 0; c < 9; c++) { const x0 = X(0.03 + c * 0.045), y0 = H * (0.12 + (c % 3) * 0.1); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 - m * 1.4 * u, y0 + (14 + (c % 4) * 6) * u); ctx.stroke(); }
    for (const [aa, bb, r] of [[0.05, 0.36, 4], [0.16, 0.5, 3.4], [0.07, 0.68, 4.4], [0.2, 0.8, 3], [0.26, 0.3, 3], [0.12, 0.2, 3]]) { ctx.fillStyle = '#4f7a3e'; ctx.beginPath(); ctx.ellipse(X(aa), H * bb, r * u * 1.7, r * u * 0.8, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#7aa05a'; ctx.beginPath(); ctx.ellipse(X(aa) - 1 * u, H * bb - 0.8 * u, r * u * 0.8, r * u * 0.4, 0, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = 'rgba(20,70,110,.35)'; ctx.beginPath(); for (const [aa, bb] of footL) ctx.lineTo(X(aa) + m * -0.6 * u, H * bb); for (const [aa, bb] of footL.slice().reverse()) ctx.lineTo(X(aa) - m * 3 * u, H * bb); ctx.fill();
  };
  wall(-1); wall(1);
  const pine = (px, py, s) => { ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 2 * s * u, py - 6 * s * u, px + 1 * s * u, py - 10 * s * u); ctx.stroke(); ctx.fillStyle = '#2f5a2e'; ctx.beginPath(); ctx.ellipse(px + 1 * s * u, py - 11 * s * u, 7 * s * u, 3 * s * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#4f7a3a'; ctx.beginPath(); ctx.ellipse(px, py - 12 * s * u, 4 * s * u, 1.6 * s * u, 0, 0, Math.PI * 2); ctx.fill(); };
  for (const [aa, bb, s] of [[0.2, 0.08, 0.9], [0.3, 0.14, 0.8], [0.68, 0.14, 0.8], [0.79, 0.08, 1]]) pine(W * aa, H * bb, s);
  // a sailing boat at anchor in the middle of the inlet
  const bx = W * 0.5, by = H * 0.6;
  ctx.fillStyle = 'rgba(10,60,90,.35)'; ctx.beginPath(); ctx.ellipse(bx + 1 * u, by + 3 * u, 8 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f6f6f2'; ctx.beginPath(); ctx.moveTo(bx - 7 * u, by); ctx.lineTo(bx + 7 * u, by); ctx.lineTo(bx + 5 * u, by + 2.4 * u); ctx.lineTo(bx - 5 * u, by + 2.4 * u); ctx.fill();
  ctx.beginPath(); ctx.moveTo(bx, by - 1 * u); ctx.lineTo(bx, by - 16 * u); ctx.lineTo(bx + 7 * u, by - 1 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(bx - 0.8 * u, by - 13 * u); ctx.lineTo(bx - 0.8 * u, by - 1 * u); ctx.lineTo(bx - 6 * u, by - 1 * u); ctx.fill();
  ctx.fillStyle = '#c8322a'; ctx.fillRect(bx - 6 * u, by + 0.6 * u, 12 * u, 0.9 * u);
}

const FRANCE_SCENES = [
  (c, w, h) => { c.fillStyle = '#7a8a4a'; c.fillRect(0, 0, w, h); for (let k = 0; k < 4; k++) { c.fillStyle = '#7a5ab8'; c.beginPath(); c.moveTo(w * (0.1 + k * 0.25), 0); c.lineTo(w * (0.2 + k * 0.25), 0); c.lineTo(w * (0.3 + k * 0.3), h); c.lineTo(w * (0.12 + k * 0.3), h); c.fill(); } }, // lavender
  (c, w, h) => { c.fillStyle = '#5aa2dc'; c.fillRect(0, 0, w, h); for (let k = 0; k < 3; k++) { const cy = h * (0.18 + k * 0.32); c.fillStyle = '#f6c020'; c.beginPath(); c.arc(w * 0.5, cy, w * 0.34, 0, Math.PI * 2); c.fill(); c.fillStyle = '#6a3a1a'; c.beginPath(); c.arc(w * 0.5, cy, w * 0.18, 0, Math.PI * 2); c.fill(); } }, // sunflowers
  (c, w, h) => { for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#f6f6f2' : '#2f5fb8'; c.fillRect(0, (h * k) / 8, w, h / 8 + 1); } }, // Riviera stripes
  (c, w, h) => { c.fillStyle = '#f0c040'; c.fillRect(0, 0, w, h); c.fillStyle = '#3f7a4a'; for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(w * 0.5, h * (0.18 + k * 0.32), w * 0.16, h * 0.12, 0, 0, Math.PI * 2); c.fill(); } }, // cicadas
  (c, w, h) => { c.fillStyle = '#2ab0c0'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8e2d4'; c.beginPath(); c.moveTo(0, 0); c.lineTo(w * 0.4, 0); c.lineTo(w * 0.2, h); c.lineTo(0, h); c.fill(); c.beginPath(); c.moveTo(w, 0); c.lineTo(w * 0.7, 0); c.lineTo(w * 0.85, h); c.lineTo(w, h); c.fill(); }, // calanque
  (c, w, h) => { c.fillStyle = '#d8c4a8'; c.fillRect(0, 0, w, h); for (let j = 0; j < 6; j++) for (let i = 0; i < 3; i++) { c.fillStyle = ['#b8502a', '#c45a30', '#a84828'][(i + j) % 3]; c.beginPath(); c.arc(w * (0.2 + i * 0.3 + (j % 2) * 0.15), h * (0.08 + j * 0.17), w * 0.13, 0, Math.PI * 2); c.fill(); } }, // tomettes
];
function frnPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'FRANCE', FRANCE_SCENES); }

// ---------- Mediterranean pack, second round ----------

// Mixes two #rrggbb colours, t from 0 (a) to 1 (b).
function mixHex(a, b, t) {
  const p = (h, i) => parseInt(h.slice(i, i + 2), 16), c = (i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t).toString(16).padStart(2, '0');
  return '#' + c(1) + c(3) + c(5);
}

// Murano millefiori: slices of glass cane packed on dark glass, each a little flower, star or set of rings.
function itaMurano(ctx, W, H) {
  const C = { dark: '#141c34', dark2: '#1e2848', white: '#f4f0e6', red: '#c8282e', yellow: '#f0c030', blue: '#2a5ac8', turq: '#2ab0b8', green: '#3f9a4a', pink: '#e87aa8', gold: '#c8a040', orange: '#e8742a' };
  const hues = [C.red, C.yellow, C.blue, C.turq, C.green, C.pink, C.orange];
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    const ring = (cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); };
    const rnd = rng(77);
    const cane = (cx, cy, r, type) => {
      const a = hues[Math.floor(rnd() * hues.length)], b = hues[Math.floor(rnd() * hues.length)], c = hues[Math.floor(rnd() * hues.length)];
      ring(cx, cy, r, a);
      ring(cx, cy, r * 0.8, C.white);
      if (type === 0) { ring(cx, cy, r * 0.66, b); if (r > 4) rosette(x, cx, cy, r * 0.62, r > 6 ? 8 : 6, C.white, c, C.yellow); else ring(cx, cy, r * 0.3, c); }
      else if (type === 1) {
        ring(cx, cy, r * 0.66, b); x.fillStyle = C.white; x.beginPath(); const n = r > 5 ? 8 : 5; for (let k = 0; k < n * 2; k++) { const t = (k * Math.PI) / n, rr = k % 2 ? r * 0.28 : r * 0.62; x.lineTo(cx + Math.cos(t) * rr, cy + Math.sin(t) * rr); } x.closePath(); x.fill(); ring(cx, cy, r * 0.2, c);
      } else { ring(cx, cy, r * 0.62, b); ring(cx, cy, r * 0.46, C.white); ring(cx, cy, r * 0.32, c); if (r > 5) { x.fillStyle = C.white; for (let k = 0; k < 10; k++) { const t = (k * Math.PI) / 5; x.fillRect(cx + Math.cos(t) * r * 0.72 - 0.5, cy + Math.sin(t) * r * 0.72 - 0.5, 1, 1); } } }
    };
    // border: gold lines with a band of small canes
    R(0, 0, cols, rows, C.dark);
    for (const o of [2, 10]) { R(o, o, cols - 2 * o, 1, C.gold); R(o, rows - o - 1, cols - 2 * o, 1, C.gold); R(o, o, 1, rows - 2 * o, C.gold); R(cols - o - 1, o, 1, rows - 2 * o, C.gold); }
    for (const [len, put] of [[cols - 12, (a, k) => { cane(6 + a, 6.5, 2.4, k % 3); cane(6 + a, rows - 6.5, 2.4, k % 3); }], [rows - 20, (a, k) => { cane(6.5, 10 + a, 2.4, k % 3); cane(cols - 6.5, 10 + a, 2.4, k % 3); }]]) { const { n, d } = evenSteps(len, 6); for (let i = 0; i <= n; i++) put(i * d, i); }
    // the field: canes packed largest first, then smaller ones in the gaps
    const fx = 11, fy = 11, fw = cols - 22, fh = rows - 22;
    R(fx, fy, fw, fh, C.dark2);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const placed = [];
    for (const [r, tries] of [[10, 60], [8, 120], [6.5, 300], [5, 600], [4, 900], [3, 1600], [2.2, 2400]]) {
      for (let t = 0; t < tries; t++) {
        const cx = fx - 2 + rnd() * (fw + 4), cy = fy - 2 + rnd() * (fh + 4), rr = r * (0.9 + rnd() * 0.2);
        if (placed.some(([px, py, pr]) => Math.hypot(px - cx, py - cy) < pr + rr + 0.8)) continue;
        placed.push([cx, cy, rr]); cane(cx, cy, rr, Math.floor(rnd() * 3));
      }
    }
    x.restore();
  });
}

// Pasta: farfalle, fusilli, penne, shells and ravioli on dark green, little tomatoes and basil between them.
function itaPasta(ctx, W, H) {
  const C = { ground: '#2f5a3e', ground2: '#2a5038', pasta: '#f2d27a', shade: '#d8a848', deep: '#a8782a', cream: '#f6ecd0', red: '#c8322a', basil: '#6aa83a', basil2: '#3f7a2a', light: '#fbe8a8' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    // border like a kitchen cloth: cream with red stripes
    R(0, 0, cols, rows, C.cream);
    for (const o of [2, 5]) { R(o, o, cols - 2 * o, 1, C.red); R(o, rows - o - 1, cols - 2 * o, 1, C.red); R(o, o, 1, rows - 2 * o, C.red); R(cols - o - 1, o, 1, rows - 2 * o, C.red); }
    const fx = 9, fy = 9, fw = cols - 18, fh = rows - 18;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 6) % 3 === 1 ? C.ground2 : C.ground);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const at = (cx, cy, ang, fn) => { x.save(); x.translate(cx, cy); x.rotate(ang); fn(); x.restore(); };
    const farfalle = (s) => {
      for (const d of [-1, 1]) {
        x.fillStyle = C.pasta; x.beginPath(); x.moveTo(0, -s * 0.22); x.lineTo(d * s, -s * 0.62);
        for (let k = 0; k <= 6; k++) x.lineTo(d * (s + (k % 2) * 0.9), -s * 0.62 + (k * s * 1.24) / 6);
        x.lineTo(0, s * 0.22); x.closePath(); x.fill();
        x.strokeStyle = C.shade; x.lineWidth = 0.8; x.beginPath(); x.moveTo(d * s * 0.2, -s * 0.2); x.quadraticCurveTo(d * s * 0.5, 0, d * s * 0.2, s * 0.2); x.stroke();
      }
      x.fillStyle = C.deep; x.fillRect(-1, -s * 0.28, 2, s * 0.56);
    };
    const fusilli = (s) => {
      x.fillStyle = C.pasta; roundRect(x, -s, -s * 0.36, s * 2, s * 0.72, s * 0.36); x.fill();
      x.save(); roundRect(x, -s, -s * 0.36, s * 2, s * 0.72, s * 0.36); x.clip();
      x.fillStyle = C.shade; for (let k = -4; k <= 4; k++) { x.beginPath(); x.moveTo(k * s * 0.4, -s); x.lineTo(k * s * 0.4 + s * 0.16, -s); x.lineTo(k * s * 0.4 + s * 0.46, s); x.lineTo(k * s * 0.4 + s * 0.3, s); x.closePath(); x.fill(); }
      x.restore();
    };
    const penne = (s) => {
      x.fillStyle = C.pasta; x.beginPath(); x.moveTo(-s, -s * 0.3); x.lineTo(s * 0.7, -s * 0.3); x.lineTo(s, s * 0.3); x.lineTo(-s * 0.7, s * 0.3); x.closePath(); x.fill();
      x.strokeStyle = C.shade; x.lineWidth = 0.6; for (const k of [-0.12, 0.12]) { x.beginPath(); x.moveTo(-s * 0.8, k * s); x.lineTo(s * 0.8, k * s); x.stroke(); }
      x.fillStyle = C.deep; x.beginPath(); x.ellipse(s * 0.85, 0, s * 0.12, s * 0.28, 0.3, 0, Math.PI * 2); x.fill();
    };
    const shell = (s) => {
      x.fillStyle = C.pasta; x.beginPath(); x.ellipse(0, 0, s * 0.9, s * 0.72, 0, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.shade; x.lineWidth = 0.7; for (let k = -3; k <= 3; k++) { x.beginPath(); x.moveTo(-s * 0.6, s * 0.1); x.lineTo(s * 0.6 * Math.cos(k * 0.38), -s * 0.66 * Math.cos(k * 0.2) + Math.abs(k) * s * 0.06); x.stroke(); }
      x.fillStyle = C.deep; x.beginPath(); x.ellipse(-s * 0.15, s * 0.38, s * 0.5, s * 0.16, 0.1, 0, Math.PI * 2); x.fill();
    };
    const ravioli = (s) => {
      x.fillStyle = C.shade; x.fillRect(-s * 0.8, -s * 0.8, s * 1.6, s * 1.6);
      x.fillStyle = C.pasta; for (let k = 0; k < 8; k++) { const t = -s * 0.8 + (k + 0.5) * s * 0.2; for (const [a, b] of [[t, -s * 0.8], [t, s * 0.8], [-s * 0.8, t], [s * 0.8, t]]) { x.beginPath(); x.arc(a, b, 0.7, 0, Math.PI * 2); x.fill(); } }
      x.fillStyle = C.pasta; x.fillRect(-s * 0.62, -s * 0.62, s * 1.24, s * 1.24);
      x.fillStyle = C.light; x.beginPath(); x.arc(0, 0, s * 0.42, 0, Math.PI * 2); x.fill();
    };
    const tomato = (cx, cy, r) => { x.fillStyle = C.red; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.fillStyle = C.basil2; for (let k = 0; k < 5; k++) { const t = (k * Math.PI * 2) / 5; x.fillRect(cx + Math.cos(t) * 1.2 - 0.5, cy - r * 0.4 + Math.sin(t) * 1.2 - 0.5, 1, 1); } x.fillStyle = '#f07a6a'; x.fillRect(cx - r * 0.5, cy - r * 0.1, 1, 1); };
    const shapes = [farfalle, fusilli, penne, shell, ravioli];
    const nx = 7, ny = 4, sx = fw / nx, sy = fh / ny, s = Math.min(sx, sy) * 0.36;
    for (let j = -1; j <= ny; j++) for (let i = -1; i <= nx; i++) {
      const cx = fx + (i + 0.5) * sx, cy = fy + (j + 0.5 + (i % 2 ? 0.5 : 0)) * sy, k = ((i + 7) * 2 + (j + 7) * 3) % 5;
      at(cx, cy, ((i * 5 + j * 3) % 7 - 3) * 0.25, () => shapes[k](s));
      const tx = cx + sx * 0.5, ty = cy + sy * 0.5;
      if ((i + j) % 2) tomato(tx, ty - sy * 0.1, 2.4); else { leaf(x, tx - 2, ty - sy * 0.1, 5.5, -0.5, C.basil, C.basil2); leaf(x, tx - 2, ty - sy * 0.1, 4.5, 0.5, C.basil2); }
    }
    x.restore();
  });
}

// A Sicilian cart panel: the painted wheel in the middle, scrolling flowers on either side, all on cart yellow.
function itaSicilianCart(ctx, W, H) {
  const C = { yellow: '#f2c230', yellow2: '#e6b42a', red: '#c8282a', green: '#2f8a4a', blue: '#2a5ab8', black: '#1a1a1e', white: '#f6efe0', orange: '#e8742a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    // border: red band with yellow dots, black lines, and a row of coloured triangles
    R(0, 0, cols, rows, C.red);
    for (const [len, put] of [[cols - 6, (a) => { R(3 + a - 0.5, 2, 1.4, 1.4, C.yellow); R(3 + a - 0.5, rows - 3.4, 1.4, 1.4, C.yellow); }], [rows - 6, (a) => { R(2, 3 + a - 0.5, 1.4, 1.4, C.yellow); R(cols - 3.4, 3 + a - 0.5, 1.4, 1.4, C.yellow); }]]) { const { n, d } = evenSteps(len, 4); for (let i = 0; i <= n; i++) put(i * d); }
    R(5, 5, cols - 10, rows - 10, C.black); R(6, 6, cols - 12, rows - 12, C.white);
    const tri = [C.red, C.green, C.blue, C.orange];
    for (const [len, put] of [[cols - 14, (a, k) => { x.fillStyle = tri[k % 4]; x.beginPath(); x.moveTo(7 + a, 7); x.lineTo(7 + a + 2.5, 12); x.lineTo(7 + a + 5, 7); x.fill(); x.beginPath(); x.moveTo(7 + a, rows - 7); x.lineTo(7 + a + 2.5, rows - 12); x.lineTo(7 + a + 5, rows - 7); x.fill(); }], [rows - 26, (a, k) => { x.fillStyle = tri[k % 4]; x.beginPath(); x.moveTo(7, 13 + a); x.lineTo(12, 13 + a + 2.5); x.lineTo(7, 13 + a + 5); x.fill(); x.beginPath(); x.moveTo(cols - 7, 13 + a); x.lineTo(cols - 12, 13 + a + 2.5); x.lineTo(cols - 7, 13 + a + 5); x.fill(); }]]) { const { n, d } = evenSteps(len, 5); for (let i = 0; i < n; i++) put(i * d, i); }
    R(13, 13, cols - 26, rows - 26, C.black);
    const fx = 14, fy = 14, fw = cols - 28, fh = rows - 28;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 7) % 3 === 1 ? C.yellow2 : C.yellow);
    const cx = fx + fw / 2, cy = fy + fh / 2, rw = fh * 0.46;
    // side panels with scrolling flowers
    const scroll = (sx0, sy0, dir, flip) => {
      x.strokeStyle = C.green; x.lineWidth = 1.8; x.beginPath();
      for (let k = 0; k <= 40; k++) { const t = k / 40, a = dir * (t * Math.PI * 2.4), r = 14 * (1 - t * 0.8); const px = sx0 + Math.cos(a) * r * flip, py = sy0 + Math.sin(a) * r; k ? x.lineTo(px, py) : x.moveTo(px, py); }
      x.stroke();
      for (let k = 1; k < 8; k++) { const t = k / 9, a = dir * (t * Math.PI * 2.4), r = 14 * (1 - t * 0.8); leaf(x, sx0 + Math.cos(a) * r * flip, sy0 + Math.sin(a) * r, 5 - t * 2, a + (k % 2 ? 0.9 : -0.9), k % 3 === 0 ? C.red : k % 3 === 1 ? C.green : C.blue); }
      const t = 1, a = dir * (t * Math.PI * 2.4), r = 14 * 0.2; rosette(x, sx0 + Math.cos(a) * r * flip, sy0 + Math.sin(a) * r, 4.4, 8, C.red, C.white, C.blue);
    };
    for (const side of [-1, 1]) {
      const px0 = side < 0 ? fx + 4 : cx + rw + 6, px1 = side < 0 ? cx - rw - 6 : fx + fw - 4;
      R(px0, fy + 5, px1 - px0, fh - 10, C.black); R(px0 + 1, fy + 6, px1 - px0 - 2, fh - 12, C.red); R(px0 + 2, fy + 7, px1 - px0 - 4, fh - 14, C.white);
      const mx = (px0 + px1) / 2, my = cy;
      x.save(); x.beginPath(); x.rect(px0 + 2, fy + 7, px1 - px0 - 4, fh - 14); x.clip();
      scroll(mx - 6, my - 8, 1, 1); scroll(mx + 6, my + 8, 1, -1);
      rosette(x, mx, my, 6, 10, C.blue, C.yellow, C.red);
      for (const [dx, dy] of [[-14, 18], [14, -18]]) rosette(x, mx + dx, my + dy, 3.4, 6, C.orange, C.yellow, C.red);
      x.restore();
    }
    // the wheel
    x.fillStyle = C.black; x.beginPath(); x.arc(cx, cy, rw, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.red; x.beginPath(); x.arc(cx, cy, rw - 1.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.yellow; for (let k = 0; k < 28; k++) { const t = (k * Math.PI * 2) / 28; x.beginPath(); x.arc(cx + Math.cos(t) * (rw - 3.5), cy + Math.sin(t) * (rw - 3.5), 0.9, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.black; x.beginPath(); x.arc(cx, cy, rw - 5.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.yellow; x.beginPath(); x.arc(cx, cy, rw - 6.5, 0, Math.PI * 2); x.fill();
    const sc = [C.red, C.green, C.blue];
    for (let k = 0; k < 12; k++) {
      const t = (k * Math.PI * 2) / 12 + 0.13; x.save(); x.translate(cx, cy); x.rotate(t);
      x.fillStyle = C.black; x.beginPath(); x.ellipse(rw * 0.52, 0, rw * 0.42, 2.4, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = sc[k % 3]; x.beginPath(); x.ellipse(rw * 0.52, 0, rw * 0.4, 1.7, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.white; x.beginPath(); x.arc(rw * 0.5, 0, 1.6, 0, Math.PI * 2); x.fill();
      x.restore();
    }
    x.fillStyle = C.black; x.beginPath(); x.arc(cx, cy, rw * 0.3, 0, Math.PI * 2); x.fill();
    rosette(x, cx, cy, rw * 0.28, 12, C.red, C.yellow, C.blue);
    x.fillStyle = C.white; x.beginPath(); x.arc(cx, cy, 1.4, 0, Math.PI * 2); x.fill();
  });
}

// The Colosseum at golden hour: three tiers of arches and the attic, the broken outer ring on the right, umbrella pines.
function itaColosseum(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.75); sky.addColorStop(0, '#5a86cc'); sky.addColorStop(0.65, '#f2c08a'); sky.addColorStop(1, '#f8dcae');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff2c8'; ctx.beginPath(); ctx.arc(W * 0.86, H * 0.36, 5 * u, 0, Math.PI * 2); ctx.fill();
  const cx = W * 0.5, base = H * 0.84, Rx = W * 0.4;
  const tiers = [[base - 15 * u, base], [base - 29 * u, base - 15 * u], [base - 43 * u, base - 29 * u]], attic = [base - 53 * u, base - 43 * u];
  const bays = 22, edge = (k) => -Math.PI / 2 + (k * Math.PI) / bays, X = (t) => cx + Rx * Math.sin(t);
  const breakAt = 0.42;
  // the inner ring, seen where the outer one has fallen
  for (let k = 0; k < bays; k++) {
    const t0 = edge(k), t1 = edge(k + 1); if (t1 <= breakAt) continue;
    const x0 = cx + Rx * 0.86 * Math.sin(t0), x1 = cx + Rx * 0.86 * Math.sin(t1), w = x1 - x0;
    for (const [top, bot] of tiers.slice(0, 2).map(([a, b]) => [a - 4 * u, b - 4 * u])) {
      ctx.fillStyle = '#b8935e'; ctx.fillRect(x0, top, w + 0.5, bot - top);
      ctx.fillStyle = '#6a4a30'; roundRect(ctx, x0 + w * 0.2, top + 2.4 * u, w * 0.6, bot - top - 2.4 * u, [w * 0.3, w * 0.3, 0, 0]); ctx.fill();
    }
  }
  // the outer wall, lit on the left and turning into shade on the right
  for (let k = 0; k < bays; k++) {
    const t0 = edge(k), t1 = edge(k + 1), x0 = X(t0), x1 = X(t1), w = x1 - x0, lit = mixHex('#ecd09a', '#c09a62', (Math.sin((t0 + t1) / 2) + 1) / 2);
    const levels = t1 <= breakAt ? 4 : t0 < breakAt + 0.25 ? 2 : 1;
    tiers.slice(0, Math.min(3, levels)).forEach(([top, bot], lv) => {
      ctx.fillStyle = lit; ctx.fillRect(x0, top, w + 0.5, bot - top);
      ctx.fillStyle = mixHex(lit, '#8a6a42', 0.35); ctx.fillRect(x0, top, w + 0.5, 1.2 * u); ctx.fillRect(x0 + w * 0.06, top + 1.2 * u, Math.max(0.8 * u, w * 0.08), bot - top - 1.2 * u);
      if (w > 1.6 * u) { ctx.fillStyle = '#6a4a32'; roundRect(ctx, x0 + w * 0.22, top + 2.6 * u, w * 0.56, bot - top - 2.6 * u, [w * 0.28, w * 0.28, 0, 0]); ctx.fill(); ctx.fillStyle = '#4a3222'; ctx.fillRect(x0 + w * 0.22, top + 2.6 * u + w * 0.2, Math.max(0.8 * u, w * 0.14), bot - top - 2.6 * u - w * 0.2); }
      if (lv === 0) { ctx.fillStyle = mixHex(lit, '#8a6a42', 0.2); ctx.fillRect(x0, bot - 1 * u, w + 0.5, 1 * u); }
    });
    if (levels === 4) {
      ctx.fillStyle = lit; ctx.fillRect(x0, attic[0], w + 0.5, attic[1] - attic[0]);
      ctx.fillStyle = mixHex(lit, '#8a6a42', 0.35); ctx.fillRect(x0, attic[0], w + 0.5, 1.2 * u); ctx.fillRect(x0, attic[1] - 1 * u, w + 0.5, 1 * u);
      if (k % 2 && w > 1.6 * u) { ctx.fillStyle = '#5a3e28'; ctx.fillRect(x0 + w * 0.32, attic[0] + 3 * u, w * 0.36, 3 * u); }
    }
  }
  // the jagged break where the outer ring ends
  ctx.fillStyle = '#d8b880'; ctx.beginPath(); const bx = X(breakAt); ctx.moveTo(bx - 1 * u, attic[0]); for (let k = 0; k <= 8; k++) ctx.lineTo(bx + (k % 2 ? 2.4 : 0.4) * u + k * 1.2 * u, attic[0] + k * 2.6 * u); ctx.lineTo(bx + 10 * u, tiers[1][0]); ctx.lineTo(bx - 1 * u, tiers[1][0]); ctx.fill();
  // the street and the umbrella pines
  ctx.fillStyle = '#b4a486'; ctx.fillRect(0, base, W, H - base);
  ctx.fillStyle = '#9a8a6c'; for (let k = 0; k < 80; k++) ctx.fillRect(((k * 37) % 100) / 100 * W, base + ((k * 13) % 20) / 100 * H, 2.2 * u, 1 * u);
  const pine = (px, py, s) => {
    ctx.strokeStyle = '#4a3424'; ctx.lineWidth = 2.6 * s * u; ctx.beginPath(); ctx.moveTo(px, base + 6 * u); ctx.quadraticCurveTo(px + 3 * s * u, py + 18 * s * u, px + 1 * s * u, py); ctx.stroke();
    for (const [dx, dy, rx, ry, c] of [[-7, 1, 10, 4, '#2a4428'], [6, 0, 11, 4.4, '#2a4428'], [0, -2.4, 12, 4, '#344f30'], [-3, -3.6, 7, 2.4, '#4a6a3e'], [7, -2, 5, 2, '#4a6a3e']]) { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(px + dx * s * u, py + dy * s * u, rx * s * u, ry * s * u, 0, 0, Math.PI * 2); ctx.fill(); }
  };
  pine(W * 0.09, H * 0.36, 1.2); pine(W * 0.93, H * 0.42, 1.05);
}

// A gelato counter: two rows of tubs in every flavour, each with its topping, cones in a rack below.
function itaGelato(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#f4d4d2'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ecc4c4'; for (let k = 0; k * 6 * u < W; k += 2) ctx.fillRect(k * 6 * u, 0, 6 * u, H * 0.2);
  // the glass top of the case and the steel tray behind
  ctx.fillStyle = '#c8ccd2'; ctx.fillRect(0, H * 0.19, W, H * 0.62);
  ctx.fillStyle = '#e8eef4'; ctx.fillRect(0, H * 0.17, W, 2.6 * u); ctx.fillStyle = '#ffffff'; ctx.fillRect(W * 0.1, H * 0.175, W * 0.3, 0.8 * u);
  const flavours = [
    ['#9ac46a', '#7aa04a', 'nuts'], ['#f08aa0', '#d86a84', 'berry'], ['#6a3a22', '#4a2414', 'chunk'], ['#f6e27a', '#e0c450', 'lemon'], ['#f6f2e8', '#dcd6c8', 'fleck'],
    ['#7a5aa8', '#5e4288', 'berry'], ['#f6a83a', '#dc8a20', 'slice'], ['#a8e0c8', '#84c4a8', 'fleck'], ['#c89a6a', '#a87a4a', 'nuts'], ['#f2e4dc', '#d8c4b8', 'cherry'],
  ];
  const tub = (x0, y0, w, h, f) => {
    const [c1, c2, top] = f;
    ctx.fillStyle = '#a8aeb6'; ctx.fillRect(x0, y0, w, h); ctx.fillStyle = '#e4e8ec'; ctx.fillRect(x0, y0, w, 1 * u);
    // the heaped scoop, overflowing the tub
    const rim = y0 + h * 0.64, bump = (dx, dy, r, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x0 + w / 2 + dx * w, rim + dy * h, r * w * 1.12, 0, Math.PI * 2); ctx.fill(); };
    for (const [dx, dy, r] of [[-0.26, 0.02, 0.24], [0.26, 0.02, 0.24], [0, -0.12, 0.3], [-0.12, -0.02, 0.26], [0.13, -0.04, 0.26]]) bump(dx, dy + 0.03, r, c2);
    for (const [dx, dy, r] of [[-0.26, 0, 0.21], [0.26, 0, 0.21], [0, -0.14, 0.27], [-0.12, -0.04, 0.23], [0.13, -0.06, 0.23]]) bump(dx, dy, r, c1);
    ctx.strokeStyle = c2; ctx.lineWidth = 0.8 * u; for (const [dx, dy] of [[-0.2, -0.02], [0.08, -0.16], [0.24, 0.02]]) { ctx.beginPath(); ctx.arc(x0 + w / 2 + dx * w, rim + dy * h, w * 0.1, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(x0 + w * 0.36, rim - h * 0.18, w * 0.05, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#9aa2ac'; ctx.fillRect(x0, rim, w, y0 + h - rim); ctx.fillStyle = '#dfe4ea'; ctx.fillRect(x0, rim, w, 1 * u); ctx.fillStyle = '#868e98'; ctx.fillRect(x0 + w - 1 * u, rim, 1 * u, y0 + h - rim);
    const mx = x0 + w / 2, my = rim - h * 0.36 - w * 0.12;
    if (top === 'nuts') { ctx.fillStyle = '#5a8a3a'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(mx + (k - 3) * 1.6 * u, my + 1 * u + (k % 2) * 1.2 * u, 0.8 * u, 0, Math.PI * 2); ctx.fill(); } }
    if (top === 'berry') { for (const d of [-3, 0, 3]) { ctx.fillStyle = c2 === '#5e4288' ? '#3a2a6a' : '#c8283a'; ctx.beginPath(); ctx.arc(mx + d * u, my + Math.abs(d) * 0.3 * u, 1.6 * u, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = '#4f8a3a'; ctx.fillRect(mx - 0.5 * u, my - 2.6 * u, 1 * u, 1.4 * u); }
    if (top === 'chunk') { ctx.fillStyle = '#3a1e10'; for (const d of [-3, 1, 4]) ctx.fillRect(mx + d * u, my + (d % 2) * u, 2.2 * u, 1.6 * u); ctx.fillStyle = '#e8c890'; ctx.fillRect(mx - 1 * u, my - 4 * u, 1 * u, 5 * u); }
    if (top === 'lemon' || top === 'slice') { const lc = top === 'lemon' ? '#f6d020' : '#f08a1a'; ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(mx, my, 3 * u, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#fff4c0'; ctx.beginPath(); ctx.arc(mx, my, 2.2 * u, Math.PI, 0); ctx.fill(); ctx.strokeStyle = lc; ctx.lineWidth = 0.5 * u; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(Math.PI + (k * Math.PI) / 4) * 2.2 * u, my + Math.sin(Math.PI + (k * Math.PI) / 4) * 2.2 * u); ctx.stroke(); } }
    if (top === 'fleck') { ctx.fillStyle = '#3a2214'; for (let k = 0; k < 9; k++) ctx.fillRect(x0 + w * (0.2 + ((k * 37) % 60) / 100), rim - h * (0.05 + ((k * 23) % 30) / 100), 1 * u, 0.7 * u); }
    if (top === 'cherry') { ctx.strokeStyle = '#8a1428'; ctx.lineWidth = 1 * u; for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.moveTo(x0 + w * 0.12, rim - h * (0.06 + k * 0.14)); ctx.quadraticCurveTo(mx, rim - h * (0.2 + k * 0.14), x0 + w * 0.88, rim - h * (0.04 + k * 0.14)); ctx.stroke(); } ctx.fillStyle = '#a8182e'; ctx.beginPath(); ctx.arc(mx, my, 1.8 * u, 0, Math.PI * 2); ctx.fill(); }
    // a little label in front
    ctx.fillStyle = '#fbfaf6'; ctx.fillRect(mx - 3.4 * u, y0 + h - 2.6 * u, 6.8 * u, 2.6 * u); ctx.fillStyle = c1 === '#f6f2e8' || c1 === '#f2e4dc' ? '#c8a080' : c1; ctx.fillRect(mx - 2.4 * u, y0 + h - 1.8 * u, 4.8 * u, 1 * u);
  };
  const back = [0.08, 0.26, 0.44, 0.62, 0.8], bw = W * 0.165;
  back.forEach((a, k) => tub(W * a - 1 * u, H * 0.3, bw, 17 * u, flavours[k]));
  ctx.fillStyle = '#b8bec6'; ctx.fillRect(0, H * 0.49, W, 1.6 * u);
  back.forEach((a, k) => tub(W * a - 2 * u, H * 0.55, bw + 2 * u, 22 * u, flavours[k + 5]));
  // the counter and the cone rack
  ctx.fillStyle = '#efe6d8'; ctx.fillRect(0, H * 0.79, W, H * 0.21); ctx.fillStyle = '#d8ccb8'; ctx.fillRect(0, H * 0.79, W, 1.2 * u);
  ctx.strokeStyle = '#e0d4c2'; ctx.lineWidth = 0.6 * u; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(W * (0.05 + k * 0.13), H * 0.81); ctx.quadraticCurveTo(W * (0.1 + k * 0.13), H * 0.9, W * (0.06 + k * 0.13), H); ctx.stroke(); }
  ctx.fillStyle = '#8a6a4a'; ctx.fillRect(W * 0.22, H * 0.84, W * 0.56, 1.8 * u);
  ctx.save(); ctx.translate(W * 0.5, H * 0.84); ctx.scale(1.5, 1.5); ctx.translate(-W * 0.5, -H * 0.84);
  for (let k = 0; k < 6; k++) {
    const px = W * (0.34 + k * 0.064), py = H * 0.84;
    ctx.fillStyle = '#d8a050'; ctx.beginPath(); ctx.moveTo(px - 2.6 * u, py - 1 * u); ctx.lineTo(px + 2.6 * u, py - 1 * u); ctx.lineTo(px, py + 9 * u); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#b07a30'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); ctx.moveTo(px - 1.6 * u, py + 1 * u); ctx.lineTo(px + 0.8 * u, py + 5 * u); ctx.moveTo(px + 1.6 * u, py + 1 * u); ctx.lineTo(px - 0.8 * u, py + 5 * u); ctx.stroke();
    ctx.fillStyle = '#e8b868'; ctx.fillRect(px - 2.8 * u, py - 2 * u, 5.6 * u, 1.2 * u);
  }
  ctx.restore();
}

// A Roman street: ochre and terracotta houses, green shutters, geraniums, washing on a line, a scooter parked below.
function itaRomeStreet(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#7ab4e0'; ctx.fillRect(0, 0, W, H);
  const houses = [[0, 0.37, '#e0a84a', 0.12], [0.37, 0.7, '#c8643a', 0.08], [0.7, 1, '#ecd48a', 0.14]];
  for (const [a, b, col, top] of houses) {
    const x0 = W * a, x1 = W * b, w = x1 - x0;
    ctx.fillStyle = col; ctx.fillRect(x0, H * top, w, H * (0.9 - top));
    ctx.fillStyle = mixHex(col, '#5a3a24', 0.25); ctx.fillRect(x0, H * top, w, 1.4 * u); ctx.fillRect(x0 + w - 1 * u, H * top, 1 * u, H * (0.9 - top));
    ctx.fillStyle = '#a8502a'; ctx.fillRect(x0 - 0.5 * u, H * top - 2 * u, w + 1 * u, 2 * u); ctx.fillStyle = '#c8683a'; for (let k = 0; k * 3 * u < w; k++) ctx.fillRect(x0 + k * 3 * u, H * top - 2.6 * u, 2 * u, 0.8 * u);
    // windows with open green shutters and window boxes
    const n = Math.max(2, Math.round(w / (17 * u)));
    for (let r = 0; r < 2; r++) for (let k = 0; k < n; k++) {
      const wx = x0 + (k + 0.5) * w / n, wy = H * (top + 0.06) + r * 20 * u, ww = 6 * u, wh = 10 * u;
      ctx.fillStyle = '#f2ead8'; ctx.fillRect(wx - ww / 2 - 0.8 * u, wy - 0.8 * u, ww + 1.6 * u, wh + 1.6 * u);
      ctx.fillStyle = '#3a2e2a'; ctx.fillRect(wx - ww / 2, wy, ww, wh); ctx.fillStyle = '#5a4a44'; ctx.fillRect(wx - 0.4 * u, wy, 0.8 * u, wh);
      ctx.fillStyle = '#3f7a4a'; for (const d of [-1, 1]) { ctx.fillRect(wx + d * (ww / 2 + 0.8 * u) - (d < 0 ? 3.4 * u : 0), wy, 3.4 * u, wh); }
      ctx.fillStyle = '#2f6a3a'; for (const d of [-1, 1]) for (let s = 1; s < 5; s++) ctx.fillRect(wx + d * (ww / 2 + 0.8 * u) - (d < 0 ? 3.4 * u : 0), wy + s * 2 * u, 3.4 * u, 0.4 * u);
      if ((k + r) % 2 === 0) { ctx.fillStyle = '#8a5a34'; ctx.fillRect(wx - 4 * u, wy + wh, 8 * u, 2 * u); ctx.fillStyle = '#4f8a3a'; ctx.beginPath(); ctx.ellipse(wx, wy + wh, 4.6 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#e0303a'; for (let s = 0; s < 5; s++) { ctx.beginPath(); ctx.arc(wx + (s - 2) * 1.8 * u, wy + wh - 1 * u - (s % 2) * 0.8 * u, 1 * u, 0, Math.PI * 2); ctx.fill(); } }
    }
  }
  // a balcony on the middle house
  const bx = W * 0.535; ctx.fillStyle = '#2a2a2e'; ctx.fillRect(bx - 9 * u, H * 0.44, 18 * u, 0.8 * u); ctx.fillRect(bx - 9 * u, H * 0.37, 18 * u, 0.6 * u); for (let k = 0; k <= 9; k++) ctx.fillRect(bx - 9 * u + k * 2 * u, H * 0.37, 0.5 * u, 7 * u);
  // washing on a line across the street
  ctx.strokeStyle = '#5a4a3a'; ctx.lineWidth = 0.5 * u; ctx.beginPath(); ctx.moveTo(W * 0.04, H * 0.27); ctx.quadraticCurveTo(W * 0.35, H * 0.33, W * 0.66, H * 0.27); ctx.stroke();
  const cloth = [['#f6f6f2', 6, 7], ['#2f6fb8', 5, 8], ['#e8b830', 7, 5], ['#e86a6a', 5, 7], ['#f6f6f2', 8, 4], ['#3f8a5a', 5, 7]];
  cloth.forEach(([c, w, h], k) => { const t = 0.08 + k * 0.1, px = W * (0.04 + t * 0.62 / 0.66), py = H * 0.27 + Math.sin(t * Math.PI) * H * 0.045; ctx.fillStyle = c; ctx.fillRect(px - w / 2 * u, py, w * u, h * u); if (k % 2) { ctx.fillRect(px - w / 2 * u - 1.6 * u, py, 1.6 * u, 3 * u); ctx.fillRect(px + w / 2 * u, py, 1.6 * u, 3 * u); } });
  // ground floor: doors and a café awning
  ctx.fillStyle = '#4a2e1e'; roundRect(ctx, W * 0.14, H * 0.66, 10 * u, 24 * u, [5 * u, 5 * u, 0, 0]); ctx.fill(); ctx.fillStyle = '#6a4430'; ctx.fillRect(W * 0.14 + 4.6 * u, H * 0.68, 0.8 * u, 22 * u);
  ctx.fillStyle = '#3f6a3a'; ctx.beginPath(); ctx.moveTo(W * 0.72, H * 0.62); ctx.lineTo(W * 0.98, H * 0.62); ctx.lineTo(W, H * 0.7); ctx.lineTo(W * 0.7, H * 0.7); ctx.fill();
  ctx.fillStyle = '#f2ead8'; for (let k = 0; k < 8; k++) ctx.fillRect(W * (0.71 + k * 0.036), H * 0.7, W * 0.018, 1.6 * u);
  ctx.fillStyle = '#3a2e2a'; ctx.fillRect(W * 0.75, H * 0.72, W * 0.2, H * 0.18); ctx.fillStyle = '#f2d890'; ctx.fillRect(W * 0.76, H * 0.73, W * 0.18, H * 0.1);
  // the cobbles
  ctx.fillStyle = '#7a7470'; ctx.fillRect(0, H * 0.9, W, H * 0.1);
  ctx.fillStyle = '#5e5854'; for (let r = 0; r < 4; r++) for (let k = 0; k * 4 * u < W; k++) ctx.fillRect(k * 4 * u + (r % 2) * 2 * u, H * 0.9 + r * 2.6 * u, 3.2 * u, 0.6 * u);
  // the café table on the right
  ctx.fillStyle = '#d8d0c4'; ctx.beginPath(); ctx.ellipse(W * 0.86, H * 0.86, 6 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#4a4a4e'; ctx.fillRect(W * 0.86 - 0.5 * u, H * 0.86, 1 * u, 8 * u);
  // the scooter
  const sx = W * 0.47, by = H * 0.955;
  ctx.fillStyle = 'rgba(40,30,20,.35)'; ctx.beginPath(); ctx.ellipse(sx, by + 0.6 * u, 16 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill();
  for (const d of [-10, 9]) { ctx.fillStyle = '#26262a'; ctx.beginPath(); ctx.arc(sx + d * u, by - 3.6 * u, 3.8 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#b8bcc4'; ctx.beginPath(); ctx.arc(sx + d * u, by - 3.6 * u, 1.6 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#8ad0b8';
  ctx.beginPath(); ctx.moveTo(sx + 1 * u, by - 5.4 * u); ctx.quadraticCurveTo(sx + 2 * u, by - 13 * u, sx + 9 * u, by - 13 * u); ctx.quadraticCurveTo(sx + 15 * u, by - 12 * u, sx + 15 * u, by - 6 * u); ctx.lineTo(sx + 13 * u, by - 5.4 * u); ctx.quadraticCurveTo(sx + 9 * u, by - 9 * u, sx + 5 * u, by - 5.4 * u); ctx.closePath(); ctx.fill();
  ctx.fillRect(sx - 7 * u, by - 7 * u, 9 * u, 1.8 * u);
  ctx.beginPath(); ctx.moveTo(sx - 7 * u, by - 5.4 * u); ctx.lineTo(sx - 9.4 * u, by - 20 * u); ctx.lineTo(sx - 6.6 * u, by - 20 * u); ctx.quadraticCurveTo(sx - 5 * u, by - 11 * u, sx - 4.6 * u, by - 5.4 * u); ctx.fill();
  ctx.beginPath(); ctx.ellipse(sx - 10 * u, by - 7 * u, 4.4 * u, 2.4 * u, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#6ab89c'; ctx.fillRect(sx + 2 * u, by - 7 * u, 12 * u, 0.8 * u);
  ctx.fillStyle = '#5a3a2a'; roundRect(ctx, sx + 2 * u, by - 15.4 * u, 11 * u, 2.6 * u, 1.2 * u); ctx.fill();
  ctx.fillStyle = '#b8bcc4'; ctx.fillRect(sx - 12 * u, by - 21 * u, 7 * u, 1 * u);
  ctx.fillStyle = '#d8dce2'; ctx.beginPath(); ctx.arc(sx - 8 * u, by - 22.6 * u, 2 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#fff6d0'; ctx.beginPath(); ctx.arc(sx - 8.4 * u, by - 22.6 * u, 1.2 * u, 0, Math.PI * 2); ctx.fill();
  // a pot of lemons by the door
  ctx.fillStyle = '#b8502a'; ctx.fillRect(W * 0.05, H * 0.82, 7 * u, 8 * u); ctx.fillStyle = '#3f7a3a'; ctx.beginPath(); ctx.arc(W * 0.05 + 3.5 * u, H * 0.78, 5 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f6d020'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(W * 0.05 + (1 + (k * 13) % 6) * u, H * 0.77 + ((k * 7) % 5) * u, 1.1 * u, 0, Math.PI * 2); ctx.fill(); }
}

// A Minoan octopus jar: a great octopus sprawling over buff clay, curling arms with suckers, seaweed and urchins
// between them, a band of running spirals round the edge.
function grcOctopus(ctx, W, H) {
  const C = { buff: '#efdcb4', buff2: '#e6d0a4', brown: '#5a2414', red: '#9a3a22', cream: '#f6ecd4', ochre: '#c88a3a', dark: '#3a1a10' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.brown); R(2, 2, cols - 4, rows - 4, C.buff);
    // running spirals
    const spiral = (cx, cy) => { x.strokeStyle = C.brown; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, 2.6, 0, Math.PI * 2); x.stroke(); R(cx - 0.5, cy - 0.5, 1, 1, C.brown); };
    for (const [len, put] of [[cols - 12, (a) => { spiral(6 + a, 6.5); spiral(6 + a, rows - 6.5); }], [rows - 24, (a) => { spiral(6.5, 12 + a); spiral(cols - 6.5, 12 + a); }]]) { const { n, d } = evenSteps(len, 6); for (let i = 0; i <= n; i++) put(i * d); }
    for (const o of [10, 11]) { R(o, o, cols - 2 * o, 1, C.brown); R(o, rows - o - 1, cols - 2 * o, 1, C.brown); R(o, o, 1, rows - 2 * o, C.brown); R(cols - o - 1, o, 1, rows - 2 * o, C.brown); }
    const fx = 12, fy = 12, fw = cols - 24, fh = rows - 24;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 9) % 3 === 1 ? C.buff2 : C.buff);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const cx = fx + fw / 2, cy = fy + fh * 0.4, mr = fh * 0.17;
    // the arms: each a path that bends more and more until it curls up at the tip
    const arms = [];
    for (let k = 0; k < 8; k++) {
      const a0 = -0.12 * Math.PI + (k * 1.24 * Math.PI) / 7, sgn = k < 4 ? 1 : -1, len = fh * (0.62 + ((k * 5) % 3) * 0.08);
      let px = cx + Math.cos(a0) * mr * 0.7, py = cy + mr * 0.5 + Math.sin(a0) * mr * 0.4, th = a0;
      const pts = [];
      for (let s = 0; s < len; s += 0.8) { const t = s / len; pts.push([px, py, 3.4 * (1 - t) + 0.7, th]); th += sgn * (0.004 + 0.24 * t ** 4) + 0.025 * Math.sin(t * 7 + k); px += Math.cos(th) * 0.8; py += Math.sin(th) * 0.8; }
      arms.push(pts);
    }
    for (const pts of arms) for (const [px, py, w] of pts) { x.fillStyle = C.brown; x.beginPath(); x.arc(px, py, w + 0.8, 0, Math.PI * 2); x.fill(); }
    for (const pts of arms) for (const [px, py, w] of pts) { x.fillStyle = C.red; x.beginPath(); x.arc(px, py, w, 0, Math.PI * 2); x.fill(); }
    for (const pts of arms) pts.forEach(([px, py, w, th], i) => { if (i % 4 === 0 && w > 1.6) { x.fillStyle = C.cream; x.beginPath(); x.arc(px + Math.cos(th + Math.PI / 2) * w * 0.45, py + Math.sin(th + Math.PI / 2) * w * 0.45, 0.7, 0, Math.PI * 2); x.fill(); } });
    // the head with its staring eyes
    x.fillStyle = C.brown; x.beginPath(); x.ellipse(cx, cy - mr * 0.3, mr * 0.95, mr * 1.25, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.red; x.beginPath(); x.ellipse(cx, cy - mr * 0.3, mr * 0.85, mr * 1.15, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = C.brown; x.lineWidth = 0.9; for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(cx, cy - mr * 1.1, mr * (0.25 + k * 0.17), Math.PI * 0.2, Math.PI * 0.8); x.stroke(); }
    for (const d of [-1, 1]) { x.fillStyle = C.cream; x.beginPath(); x.arc(cx + d * mr * 0.42, cy + mr * 0.2, 3.2, 0, Math.PI * 2); x.fill(); x.fillStyle = C.dark; x.beginPath(); x.arc(cx + d * mr * 0.42, cy + mr * 0.25, 1.5, 0, Math.PI * 2); x.fill(); x.strokeStyle = C.brown; x.lineWidth = 0.9; x.beginPath(); x.arc(cx + d * mr * 0.42, cy + mr * 0.2, 4.4, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); }
    // seaweed and urchins in the gaps
    const weed = (px, py, h, lean) => { x.strokeStyle = C.brown; x.lineWidth = 1; x.beginPath(); for (let k = 0; k <= 12; k++) { const t = k / 12; const qx = px + lean * t * h * 0.3 + Math.sin(t * 7) * 1.4, qy = py - t * h; k ? x.lineTo(qx, qy) : x.moveTo(qx, qy); } x.stroke(); for (let k = 2; k < 12; k += 2) { const t = k / 12; leaf(x, px + lean * t * h * 0.3 + Math.sin(t * 7) * 1.4, py - t * h, 3, k % 4 ? -2.4 : -0.7, C.ochre); } };
    const urchin = (px, py) => { x.strokeStyle = C.brown; x.lineWidth = 0.8; for (let k = 0; k < 10; k++) { const t = (k * Math.PI) / 5; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(t) * 4, py + Math.sin(t) * 4); x.stroke(); } x.fillStyle = C.red; x.beginPath(); x.arc(px, py, 2, 0, Math.PI * 2); x.fill(); };
    weed(fx + 6, fy + fh, fh * 0.32, 1); weed(fx + fw - 6, fy + fh, fh * 0.3, -1); weed(fx + fw * 0.5, fy + fh, fh * 0.16, 0.5);
    urchin(fx + 10, fy + 10); urchin(fx + fw - 10, fy + 10); urchin(fx + fw * 0.3, fy + fh - 6); urchin(fx + fw * 0.7, fy + fh - 6);
    x.restore();
  });
}

// Skyros embroidery: red ships under striped sails, cockerels facing flowering sprays, carnations round the edge.
function grcSkyros(ctx, W, H) {
  const C = { linen: '#efe4cc', linen2: '#e6d8bc', red: '#b8282a', blue: '#1f3a7a', green: '#3f7a3a', yellow: '#e0a830', brown: '#4a2a1a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.linen);
    for (const o of [1, 11]) { R(o, o, cols - 2 * o, 1, C.blue); R(o, rows - o - 1, cols - 2 * o, 1, C.blue); R(o, o, 1, rows - 2 * o, C.blue); R(cols - o - 1, o, 1, rows - 2 * o, C.blue); }
    const carnation = (px, py, ang) => { x.save(); x.translate(px, py); x.rotate(ang); x.strokeStyle = C.green; x.lineWidth = 1; x.beginPath(); x.moveTo(0, 3); x.lineTo(0, -1); x.stroke(); leaf(x, 0, 2, 2.6, -2.4, C.green); x.fillStyle = C.red; x.beginPath(); x.moveTo(-2.6, -1); x.lineTo(-2, -4); x.lineTo(-0.8, -2.4); x.lineTo(0, -4.4); x.lineTo(0.8, -2.4); x.lineTo(2, -4); x.lineTo(2.6, -1); x.closePath(); x.fill(); x.restore(); };
    for (const [len, put] of [[cols - 12, (a, k) => { carnation(6 + a, 7, 0); carnation(6 + a, rows - 7, Math.PI); }], [rows - 24, (a) => { carnation(6.5, 12 + a, -Math.PI / 2); carnation(cols - 6.5, 12 + a, Math.PI / 2); }]]) { const { n, d } = evenSteps(len, 7); for (let i = 0; i <= n; i++) put(i * d, i); }
    const fx = 12, fy = 12, fw = cols - 24, fh = rows - 24;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 6) % 3 === 1 ? C.linen2 : C.linen);
    const ship = (px, py, f) => {
      x.save(); x.translate(px, py); x.scale(f, 1);
      x.fillStyle = C.red; x.beginPath(); x.moveTo(-14, -2); x.quadraticCurveTo(-15, -7, -12, -9); x.lineTo(-11, -3); x.lineTo(11, -3); x.lineTo(13, -8); x.quadraticCurveTo(16, -5, 13, 0); x.lineTo(-11, 0); x.closePath(); x.fill();
      R(-11, -2, 22, 1, C.blue); x.fillStyle = C.yellow; for (let k = -9; k <= 9; k += 3) x.fillRect(k, -2, 1, 1);
      x.strokeStyle = C.blue; x.lineWidth = 0.8; for (let k = -8; k <= 8; k += 4) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k - 2, 4); x.stroke(); }
      x.strokeStyle = C.brown; x.lineWidth = 1; x.beginPath(); x.moveTo(0, -3); x.lineTo(0, -24); x.stroke();
      for (const [y0, wd] of [[-22, 9], [-13, 11]]) { R(-wd, y0, wd * 2, 7, C.yellow); for (let s = 0; s < 3; s++) R(-wd, y0 + 1 + s * 2, wd * 2, 1, C.red); R(-wd - 1, y0 - 1, wd * 2 + 2, 1, C.brown); }
      x.fillStyle = C.blue; x.beginPath(); x.moveTo(0, -27); x.quadraticCurveTo(3, -29, 5, -27); x.lineTo(2, -26); x.closePath(); x.fill();
      x.restore();
    };
    const cock = (px, py, f) => {
      x.save(); x.translate(px, py); x.scale(f, 1);
      for (const [a, col] of [[-2.4, C.blue], [-2.0, C.green], [-1.6, C.yellow]]) { x.strokeStyle = col; x.lineWidth = 2; x.beginPath(); x.moveTo(-4, -2); x.quadraticCurveTo(-4 + Math.cos(a) * 10, -2 + Math.sin(a) * 12, -10 + Math.cos(a) * 2, -14 - (a + 2.4) * 4); x.stroke(); }
      x.fillStyle = C.red; x.beginPath(); x.ellipse(0, 0, 7, 5, -0.2, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.ellipse(5, -6, 2.6, 4.4, 0.3, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.arc(6.4, -10.6, 2.6, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(4.8 + k * 1.4, -13.4 - (k % 2), 1, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.yellow; x.beginPath(); x.moveTo(8.6, -11); x.lineTo(11, -10.2); x.lineTo(8.6, -9.4); x.fill();
      R(6.6, -11.2, 1, 1, C.linen);
      x.fillStyle = C.green; x.beginPath(); x.ellipse(-0.6, -0.4, 4, 2.6, -0.3, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.yellow; x.lineWidth = 0.7; for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(-3, -0.4 + k); x.lineTo(2, -1.4 + k); x.stroke(); }
      x.strokeStyle = C.blue; x.lineWidth = 1; for (const d of [-1.6, 1.6]) { x.beginPath(); x.moveTo(d, 4); x.lineTo(d, 9); x.lineTo(d + 2, 10); x.moveTo(d, 9); x.lineTo(d - 1.4, 10); x.stroke(); }
      x.restore();
    };
    const spray = (px, py) => {
      x.strokeStyle = C.green; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px, py + 10); x.lineTo(px, py - 14); x.stroke();
      for (const [dy, d] of [[4, -1], [4, 1], [-4, -1], [-4, 1]]) { x.beginPath(); x.moveTo(px, py + dy + 3); x.quadraticCurveTo(px + d * 5, py + dy, px + d * 7, py + dy - 4); x.stroke(); carnation(px + d * 7, py + dy - 3, d * 0.4); leaf(x, px, py + dy + 3, 4, d > 0 ? -0.6 : Math.PI + 0.6, C.green); }
      carnation(px, py - 13, 0);
      x.fillStyle = C.blue; x.beginPath(); x.moveTo(px - 4, py + 10); x.lineTo(px + 4, py + 10); x.lineTo(px + 3, py + 14); x.lineTo(px - 3, py + 14); x.fill();
    };
    const row = (y, n, fn) => { for (let k = 0; k < n; k++) fn(fx + ((k + 0.5) * fw) / n, y, k); };
    row(fy + fh * 0.27, 4, (px, py, k) => ship(px, py, k % 2 ? -1 : 1));
    row(fy + fh * 0.6, 6, (px, py, k) => (k % 3 === 1 ? spray(px, py - 2) : cock(px, py + 2, k % 3 === 0 ? 1 : -1)));
    row(fy + fh * 0.98, 4, (px, py, k) => ship(px, py - 2, k % 2 ? 1 : -1));
  });
}

// The spring fresco from Akrotiri: banded volcanic rocks, red lilies growing from them, swallows flying in pairs.
function grcAkrotiri(ctx, W, H) {
  const C = { ground: '#efe2c8', ground2: '#e8d8b8', red: '#c8402a', red2: '#9a2e1e', ochre: '#d89a4a', blue: '#4a7ab8', blue2: '#2a4a7a', black: '#2a2018', green: '#6a8a4a', white: '#f6efe0' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.black); R(2, 2, cols - 4, rows - 4, C.red2); R(5, 5, cols - 10, rows - 10, C.white); R(6, 6, cols - 12, rows - 12, C.black);
    const fx = 7, fy = 7, fw = cols - 14, fh = rows - 14;
    for (let y = fy; y < fy + fh; y++) R(fx, y, fw, 1, Math.floor((y - fy) / 10) % 3 === 1 ? C.ground2 : C.ground);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    // rocks: a lumpy outline filled again and again, each band a little smaller
    const rock = (pts, bands) => {
      bands.forEach((col, b) => {
        x.fillStyle = col; x.beginPath();
        const dn = pts[0][1] > 0.5 ? 1 : -1; pts.forEach(([a, c, bulge], i) => { const px = fx + fw * a, py = fy + fh * c + b * 2.6 * dn; i ? x.quadraticCurveTo(px - 4, py - bulge * dn, px, py) : x.moveTo(px, py); });
        x.lineTo(fx + fw * pts[pts.length - 1][0], pts[0][1] > 0.5 ? fy + fh + 2 : fy - 2); x.lineTo(fx + fw * pts[0][0], pts[0][1] > 0.5 ? fy + fh + 2 : fy - 2); x.closePath(); x.fill();
        x.strokeStyle = C.black; x.lineWidth = 0.8; x.stroke();
      });
    };
    const rep = (a, n) => Array.from({ length: n }, (_, i) => a[i % a.length]);
    rock([[-0.02, 0.62, 0], [0.1, 0.5, 8], [0.2, 0.66, 6], [0.3, 0.56, 8], [0.42, 0.78, 6], [0.5, 0.9, 4]], rep([C.red, C.ochre, C.blue, C.black, C.ochre, C.red, C.blue], 20));
    rock([[0.56, 0.92, 0], [0.66, 0.7, 6], [0.76, 0.6, 8], [0.86, 0.68, 6], [0.96, 0.5, 8], [1.04, 0.56, 4]], rep([C.blue, C.red, C.ochre, C.black, C.blue, C.ochre, C.red], 20));
    rock([[0.3, -0.02, 0], [0.42, 0.14, 6], [0.54, 0.1, 6], [0.66, 0.2, 6], [0.78, 0.06, 6], [0.86, -0.02, 2]], rep([C.ochre, C.red, C.blue, C.black], 10));
    // lilies in threes, growing from the rocks
    const lily = (px, py, h, lean) => {
      x.strokeStyle = C.black; x.lineWidth = 1; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + lean * 3, py - h * 0.6, px + lean * 5, py - h); x.stroke();
      for (let k = 1; k < 4; k++) { x.beginPath(); x.moveTo(px + lean * k, py - (h * k) / 5); x.lineTo(px + lean * k + 3, py - (h * k) / 5 - 2); x.stroke(); }
      const tx = px + lean * 5, ty = py - h;
      for (const a of [-2.4, -1.57, -0.74]) { x.save(); x.translate(tx, ty); x.rotate(a + lean * 0.3); x.fillStyle = C.red; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(3, -2.4, 6, -0.6); x.quadraticCurveTo(7, 1.2, 5, 1); x.quadraticCurveTo(3, 1.4, 0, 0); x.fill(); x.restore(); }
      x.strokeStyle = C.red2; x.lineWidth = 0.7; for (const a of [-2, -1.57, -1.1]) { x.beginPath(); x.moveTo(tx, ty); x.lineTo(tx + Math.cos(a) * 5, ty + Math.sin(a) * 5); x.stroke(); }
    };
    for (const [a, c, h, lean] of [[0.08, 0.56, 16, -0.6], [0.11, 0.55, 22, 0], [0.14, 0.57, 15, 0.6], [0.3, 0.6, 18, -0.4], [0.33, 0.6, 24, 0.2], [0.36, 0.62, 16, 0.7], [0.74, 0.66, 18, -0.5], [0.77, 0.64, 24, 0.1], [0.8, 0.66, 17, 0.6], [0.94, 0.56, 20, -0.3], [0.97, 0.57, 15, 0.5]]) lily(fx + fw * a, fy + fh * c, h, lean);
    // swallows: dark back, white belly, forked tail
    const swallow = (px, py, s, ang) => {
      x.save(); x.translate(px, py); x.rotate(ang); x.scale(s, s);
      x.fillStyle = C.black; x.beginPath(); x.moveTo(6, 0); x.quadraticCurveTo(2, -2, -4, -0.6); x.lineTo(-10, -3.4); x.lineTo(-6, 0); x.lineTo(-10, 3); x.lineTo(-4, 0.8); x.quadraticCurveTo(2, 2, 6, 0); x.fill();
      x.beginPath(); x.moveTo(2, -0.6); x.quadraticCurveTo(-1, -8, -6, -11); x.lineTo(-2, -1); x.fill();
      x.beginPath(); x.moveTo(2, 0.6); x.quadraticCurveTo(0, 5, -3, 7); x.lineTo(-1, 0.8); x.fill();
      x.fillStyle = C.white; x.beginPath(); x.ellipse(1, 0.8, 3, 0.8, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.fillRect(4.4, -0.4, 1, 1);
      x.restore();
    };
    for (const [a, c, ang, s] of [[0.22, 0.28, -0.3, 1.3], [0.27, 0.36, 0.5, 1.2], [0.48, 0.42, 0.2, 1.3], [0.53, 0.33, -0.6, 1.2], [0.86, 0.3, 2.9, 1.3], [0.9, 0.4, 2.4, 1.1], [0.6, 0.62, 3.3, 1]]) swallow(fx + fw * a, fy + fh * c, s, ang);
    x.restore();
  });
}

// Knossos: the red Minoan columns of the north entrance, black capitals, the charging bull on the wall behind.
function grcKnossos(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5); sky.addColorStop(0, '#5a9ad8'); sky.addColorStop(1, '#d4ecf6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#8a9a7a'; ctx.beginPath(); ctx.moveTo(0, H * 0.42); ctx.quadraticCurveTo(W * 0.3, H * 0.3, W * 0.6, H * 0.38); ctx.quadraticCurveTo(W * 0.85, H * 0.32, W, H * 0.4); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  const cypress = (px, py, h) => { ctx.fillStyle = '#2f4a2e'; ctx.beginPath(); ctx.ellipse(px, py - h / 2, h * 0.12, h / 2, 0, 0, Math.PI * 2); ctx.fill(); };
  for (const [a, h] of [[0.06, 22], [0.1, 16], [0.92, 24], [0.96, 15]]) cypress(W * a, H * 0.46, h * u);
  // the building: a dark loggia behind four red columns, the bull on its back wall
  const x0 = W * 0.16, x1 = W * 0.84, top = H * 0.2, floor = H * 0.66;
  ctx.fillStyle = '#b8884a'; ctx.fillRect(x0, top, x1 - x0, floor - top);
  ctx.fillStyle = '#9a6e3a'; ctx.fillRect(x0, top, x1 - x0, 5 * u);
  const px0 = W * 0.36, px1 = W * 0.64, py0 = H * 0.3, py1 = H * 0.54;
  ctx.fillStyle = '#2a3a5a'; ctx.fillRect(px0 - 1.2 * u, py0 - 1.2 * u, px1 - px0 + 2.4 * u, py1 - py0 + 2.4 * u);
  ctx.fillStyle = '#9ac4e0'; ctx.fillRect(px0, py0, px1 - px0, py1 - py0);
  // the bull, charging left, head lowered
  const bx = (px0 + px1) / 2, by = (py0 + py1) / 2 + 1 * u, s = u * 1.1;
  ctx.fillStyle = '#a8502a'; ctx.beginPath(); ctx.ellipse(bx + 2 * s, by, 9 * s, 4.6 * s, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(bx - 6 * s, by - 3 * s); ctx.quadraticCurveTo(bx - 10 * s, by - 4 * s, bx - 13 * s, by + 1 * s); ctx.lineTo(bx - 12 * s, by + 4 * s); ctx.quadraticCurveTo(bx - 8 * s, by + 4 * s, bx - 5 * s, by + 3 * s); ctx.fill();
  ctx.strokeStyle = '#f2e6c8'; ctx.lineWidth = 1 * s; ctx.beginPath(); ctx.moveTo(bx - 10 * s, by - 2.6 * s); ctx.quadraticCurveTo(bx - 12 * s, by - 7 * s, bx - 8 * s, by - 8 * s); ctx.moveTo(bx - 9 * s, by - 2.6 * s); ctx.quadraticCurveTo(bx - 6 * s, by - 6 * s, bx - 4 * s, by - 7 * s); ctx.stroke();
  ctx.fillStyle = '#f2e6c8'; for (const [dx, dy] of [[4, -1.4], [8, 1], [0, 1.6]]) { ctx.beginPath(); ctx.ellipse(bx + dx * s, by + dy * s, 2 * s, 1.2 * s, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#1a1a1e'; ctx.beginPath(); ctx.arc(bx - 10.6 * s, by - 0.4 * s, 0.6 * s, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#a8502a'; ctx.lineWidth = 1.6 * s; for (const [a, b, c, d] of [[-4, 3, -9, 7], [-2, 3, -4, 8], [7, 3, 11, 7], [9, 3, 7, 8]]) { ctx.beginPath(); ctx.moveTo(bx + a * s, by + b * s); ctx.lineTo(bx + c * s, by + d * s); ctx.stroke(); }
  ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(bx + 11 * s, by - 1 * s); ctx.quadraticCurveTo(bx + 15 * s, by - 3 * s, bx + 14 * s, by + 3 * s); ctx.stroke();
  // the slab roof and the columns
  ctx.fillStyle = '#3a1e18'; ctx.fillRect(x0 - 2 * u, top - 4 * u, x1 - x0 + 4 * u, 4 * u); ctx.fillStyle = '#c8a46a'; ctx.fillRect(x0 - 2 * u, top - 5.4 * u, x1 - x0 + 4 * u, 1.4 * u);
  ctx.fillStyle = '#f2e6c8'; for (let k = 0; k < 16; k++) { ctx.beginPath(); ctx.arc(x0 + (k + 0.5) * (x1 - x0) / 16, top - 2 * u, 0.9 * u, 0, Math.PI * 2); ctx.fill(); }
  const col = (cx) => {
    ctx.fillStyle = '#b8321e'; ctx.beginPath(); ctx.moveTo(cx - 3 * u, top + 3.6 * u); ctx.lineTo(cx + 3 * u, top + 3.6 * u); ctx.lineTo(cx + 2.1 * u, floor - 1.4 * u); ctx.lineTo(cx - 2.1 * u, floor - 1.4 * u); ctx.fill();
    ctx.fillStyle = '#8a2414'; ctx.beginPath(); ctx.moveTo(cx + 1.4 * u, top + 3.6 * u); ctx.lineTo(cx + 3 * u, top + 3.6 * u); ctx.lineTo(cx + 2.1 * u, floor - 1.4 * u); ctx.lineTo(cx + 1 * u, floor - 1.4 * u); ctx.fill();
    ctx.fillStyle = '#1a1414'; ctx.beginPath(); ctx.ellipse(cx, top + 2.6 * u, 4.4 * u, 1.8 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(cx - 4.6 * u, top, 9.2 * u, 1.6 * u); ctx.fillRect(cx - 2.8 * u, floor - 1.6 * u, 5.6 * u, 1.6 * u);
  };
  for (const a of [0.2, 0.33, 0.67, 0.8]) col(W * a);
  // the gypsum terrace and the steps
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(W * 0.1, floor, W * 0.8, H * 0.14);
  ctx.strokeStyle = '#c8b898'; ctx.lineWidth = 0.6 * u; for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.moveTo(W * 0.1, floor + (r + 1) * 4.6 * u); ctx.lineTo(W * 0.9, floor + (r + 1) * 4.6 * u); ctx.stroke(); for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.moveTo(W * (0.12 + k * 0.08 + (r % 2) * 0.04), floor + r * 4.6 * u); ctx.lineTo(W * (0.12 + k * 0.08 + (r % 2) * 0.04), floor + (r + 1) * 4.6 * u); ctx.stroke(); } }
  ctx.fillStyle = '#c8a46a'; ctx.fillRect(0, H * 0.8, W, H * 0.2);
  ctx.fillStyle = '#d8b884'; for (let k = 0; k < 4; k++) ctx.fillRect(W * (0.36 - k * 0.03), H * (0.8 + k * 0.05), W * (0.28 + k * 0.06), 2.6 * u);
  ctx.fillStyle = '#6a8a4a'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(((k * 37) % 100) / 100 * W, H * (0.84 + ((k * 13) % 14) / 100), 1.6 * u, 0, Math.PI * 2); ctx.fill(); }
}

// A Cycladic doorway: whitewashed walls, a blue door and shutters, bougainvillea pouring over the top, a cat asleep on the step.
function grcBlueDoor(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#f6f6f2'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e6e8ee'; ctx.fillRect(W * 0.6, 0, W * 0.02, H * 0.82); ctx.fillRect(0, H * 0.06, W, 1 * u);
  // paving with white outlined stones
  ctx.fillStyle = '#8a8e96'; ctx.fillRect(0, H * 0.82, W, H * 0.18);
  ctx.strokeStyle = '#f6f6f2'; ctx.lineWidth = 0.8 * u; for (let r = 0; r < 3; r++) for (let k = 0; k * 10 * u < W + 10 * u; k++) { roundRect(ctx, k * 10 * u - (r % 2) * 5 * u + 0.6 * u, H * 0.82 + r * 6 * u + 0.6 * u, 8.8 * u, 4.8 * u, 1.6 * u); ctx.stroke(); }
  // the door with its arched top and two steps
  const dx0 = W * 0.3, dx1 = W * 0.5, dt = H * 0.2, db = H * 0.76;
  ctx.fillStyle = '#e4e6ea'; roundRect(ctx, dx0 - 2 * u, dt - 2 * u, dx1 - dx0 + 4 * u, db - dt + 2 * u, [(dx1 - dx0) / 2 + 2 * u, (dx1 - dx0) / 2 + 2 * u, 0, 0]); ctx.fill();
  ctx.fillStyle = '#1f5fb8'; roundRect(ctx, dx0, dt, dx1 - dx0, db - dt, [(dx1 - dx0) / 2, (dx1 - dx0) / 2, 0, 0]); ctx.fill();
  ctx.fillStyle = '#1a4f9a'; for (let k = 1; k < 6; k++) ctx.fillRect(dx0 + (k * (dx1 - dx0)) / 6 - 0.3 * u, dt + 6 * u, 0.6 * u, db - dt - 6 * u);
  ctx.fillRect(dx0, H * 0.45, dx1 - dx0, 1 * u);
  ctx.fillStyle = '#d8a640'; ctx.beginPath(); ctx.arc(dx1 - 3 * u, H * 0.5, 1 * u, 0, Math.PI * 2); ctx.fill();
  for (let k = 0; k < 2; k++) { ctx.fillStyle = '#f6f6f2'; ctx.fillRect(dx0 - (4 + k * 3) * u, db + k * 3 * u, dx1 - dx0 + (8 + k * 6) * u, 3 * u); ctx.fillStyle = '#c8ccd4'; ctx.fillRect(dx0 - (4 + k * 3) * u, db + k * 3 * u + 2.4 * u, dx1 - dx0 + (8 + k * 6) * u, 0.6 * u); }
  // the window with open shutters and a pot of geraniums
  const wx0 = W * 0.66, wx1 = W * 0.8, wt = H * 0.3, wb = H * 0.52;
  ctx.fillStyle = '#e4e6ea'; ctx.fillRect(wx0 - 1.4 * u, wt - 1.4 * u, wx1 - wx0 + 2.8 * u, wb - wt + 2.8 * u);
  ctx.fillStyle = '#2a3a52'; ctx.fillRect(wx0, wt, wx1 - wx0, wb - wt); ctx.fillStyle = '#f6f6f2'; ctx.fillRect((wx0 + wx1) / 2 - 0.4 * u, wt, 0.8 * u, wb - wt); ctx.fillRect(wx0, (wt + wb) / 2, wx1 - wx0, 0.8 * u);
  ctx.fillStyle = '#1f5fb8'; ctx.fillRect(wx0 - 8 * u, wt, 6.6 * u, wb - wt); ctx.fillRect(wx1 + 1.4 * u, wt, 6.6 * u, wb - wt);
  ctx.fillStyle = '#1a4f9a'; for (const sx of [wx0 - 8 * u, wx1 + 1.4 * u]) for (let s = 1; s < 6; s++) ctx.fillRect(sx, wt + s * 3.6 * u, 6.6 * u, 0.6 * u);
  ctx.fillStyle = '#b8502a'; ctx.fillRect(wx0 + 2 * u, wb + 1.4 * u, wx1 - wx0 - 4 * u, 4 * u);
  ctx.fillStyle = '#4f8a3a'; ctx.beginPath(); ctx.ellipse((wx0 + wx1) / 2, wb + 1 * u, (wx1 - wx0) / 2 - 1 * u, 2.4 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e0303a'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(wx0 + (2 + k * 3.6) * u, wb - 0.6 * u - (k % 2) * 1.4 * u, 1.3 * u, 0, Math.PI * 2); ctx.fill(); }
  // a pot of basil by the door
  ctx.fillStyle = '#b8502a'; ctx.beginPath(); ctx.moveTo(W * 0.2, H * 0.72); ctx.lineTo(W * 0.2 + 9 * u, H * 0.72); ctx.lineTo(W * 0.2 + 7.6 * u, H * 0.82); ctx.lineTo(W * 0.2 + 1.4 * u, H * 0.82); ctx.fill();
  ctx.fillStyle = '#3f8a3a'; ctx.beginPath(); ctx.arc(W * 0.2 + 4.5 * u, H * 0.68, 5.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#5aa84a'; ctx.beginPath(); ctx.arc(W * 0.2 + 3 * u, H * 0.66, 3 * u, 0, Math.PI * 2); ctx.fill();
  // bougainvillea pouring over the wall from the top left
  const rnd = rng(9);
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(0, H * 0.04); ctx.quadraticCurveTo(W * 0.3, H * 0.02, W * 0.56, H * 0.14); ctx.stroke();
  for (let k = 0; k < 90; k++) {
    const t = rnd(), px = W * 0.56 * t + (rnd() - 0.5) * 8 * u, py = H * (0.03 + 0.11 * t * t) + rnd() * (16 - t * 10) * u + (t < 0.25 ? rnd() * 22 * u : 0);
    ctx.fillStyle = rnd() < 0.25 ? '#4f8a3a' : rnd() < 0.5 ? '#b82a6a' : '#e0408a'; ctx.beginPath(); ctx.arc(px, py, 1.7 * u, 0, Math.PI * 2); ctx.fill();
  }
  // the cat, curled up asleep on the top step
  ctx.save(); const cx = dx1 + 6 * u, cy = db - 3.4 * u; ctx.translate(cx, cy); ctx.scale(1.7, 1.7); ctx.translate(-cx, -cy);
  ctx.fillStyle = '#e8963a'; ctx.beginPath(); ctx.ellipse(cx, cy, 6.4 * u, 3.4 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx - 5 * u, cy - 1 * u, 3 * u, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx - 7.6 * u, cy - 2.6 * u); ctx.lineTo(cx - 7.4 * u, cy - 5.6 * u); ctx.lineTo(cx - 5.6 * u, cy - 3.8 * u); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx - 4.6 * u, cy - 3.8 * u); ctx.lineTo(cx - 3 * u, cy - 5.6 * u); ctx.lineTo(cx - 2.6 * u, cy - 2.6 * u); ctx.fill();
  ctx.strokeStyle = '#e8963a'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(cx + 6 * u, cy + 1 * u); ctx.quadraticCurveTo(cx + 4 * u, cy + 4 * u, cx - 3 * u, cy + 3 * u); ctx.stroke();
  ctx.fillStyle = '#c87428'; for (let k = 0; k < 4; k++) ctx.fillRect(cx - 1 * u + k * 2 * u, cy - 3 * u, 0.9 * u, 3 * u);
  ctx.strokeStyle = '#6a3a1a'; ctx.lineWidth = 0.5 * u; for (const d of [-6.2, -4]) { ctx.beginPath(); ctx.moveTo(cx + d * u - 0.6 * u, cy - 1.2 * u); ctx.lineTo(cx + d * u + 0.6 * u, cy - 1 * u); ctx.stroke(); }
  ctx.restore();
}

// A Greek salad from above: tomato, cucumber, onion, pepper, olives and a slab of feta with oregano and oil, in a blue bowl.
function grcSalad(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#b07a4a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#9a6a3e'; for (let k = 0; k < 8; k++) ctx.fillRect(0, (k * H) / 8, W, 0.6 * u);
  ctx.strokeStyle = '#a2703f'; ctx.lineWidth = 0.6 * u; for (let k = 0; k < 24; k++) { ctx.beginPath(); const y = ((k * 37) % 100) / 100 * H; ctx.moveTo(((k * 53) % 100) / 100 * W, y); ctx.quadraticCurveTo(((k * 53) % 100) / 100 * W + 12 * u, y - 1 * u, ((k * 53) % 100) / 100 * W + 24 * u, y + 0.4 * u); ctx.stroke(); }
  // a checked napkin and bread
  ctx.save(); ctx.translate(W * 0.12, H * 0.78); ctx.rotate(-0.2); ctx.fillStyle = '#f6f2ea'; ctx.fillRect(-14 * u, -12 * u, 28 * u, 24 * u); ctx.fillStyle = 'rgba(40,90,170,.55)'; for (let k = 0; k < 7; k += 2) { ctx.fillRect(-14 * u + k * 4 * u, -12 * u, 4 * u, 24 * u); ctx.fillRect(-14 * u, -12 * u + k * 4 * u, 28 * u, 4 * u); } ctx.restore();
  for (const [a, b, r] of [[0.86, 0.22, 0.3], [0.9, 0.34, -0.2]]) { ctx.save(); ctx.translate(W * a, H * b); ctx.rotate(r); ctx.fillStyle = '#c88a3a'; roundRect(ctx, -8 * u, -5 * u, 16 * u, 10 * u, 3 * u); ctx.fill(); ctx.fillStyle = '#f2dcae'; roundRect(ctx, -6.6 * u, -3.6 * u, 13.2 * u, 7.2 * u, 2.4 * u); ctx.fill(); ctx.restore(); }
  // the bowl
  const cx = W * 0.5, cy = H * 0.5, R = 40 * u;
  ctx.fillStyle = 'rgba(60,30,10,.3)'; ctx.beginPath(); ctx.arc(cx + 2 * u, cy + 3 * u, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1f4f9a'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f6f2ea'; for (let k = 0; k < 28; k++) { const t = (k * Math.PI * 2) / 28; ctx.beginPath(); ctx.arc(cx + Math.cos(t) * (R - 2 * u), cy + Math.sin(t) * (R - 2 * u), 0.9 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#f2eee6'; ctx.beginPath(); ctx.arc(cx, cy, R - 4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#e8d8a8'; ctx.beginPath(); ctx.arc(cx, cy, R - 7 * u, 0, Math.PI * 2); ctx.fill();
  const rnd = rng(23), spot = () => { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * (R - 11 * u); return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, rnd() * Math.PI * 2]; };
  const at = (fn) => { const [px, py, a] = spot(); ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.scale(1.3, 1.3); fn(); ctx.restore(); };
  for (let k = 0; k < 14; k++) at(() => { ctx.fillStyle = '#5a8a2a'; ctx.beginPath(); ctx.arc(0, 0, 4.4 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#d8ecb4'; ctx.beginPath(); ctx.arc(0, 0, 3.6 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#b8d48a'; for (let s = 0; s < 3; s++) { ctx.beginPath(); ctx.arc(Math.cos(s * 2.1) * 1.4 * u, Math.sin(s * 2.1) * 1.4 * u, 0.6 * u, 0, Math.PI * 2); ctx.fill(); } });
  for (let k = 0; k < 9; k++) at(() => { ctx.strokeStyle = '#3f8a2a'; ctx.lineWidth = 1.2 * u; ctx.beginPath(); ctx.ellipse(0, 0, 4 * u, 3 * u, 0, 0, Math.PI * 2); ctx.stroke(); });
  for (let k = 0; k < 8; k++) at(() => { ctx.strokeStyle = '#a84a8a'; ctx.lineWidth = 0.9 * u; ctx.beginPath(); ctx.arc(0, 0, 4.6 * u, 0, Math.PI * 1.3); ctx.stroke(); ctx.strokeStyle = '#e8c4dc'; ctx.beginPath(); ctx.arc(0, 0, 3.4 * u, 0, Math.PI * 1.2); ctx.stroke(); });
  for (let k = 0; k < 15; k++) at(() => { ctx.fillStyle = '#d8282a'; ctx.beginPath(); ctx.moveTo(-6 * u, 0); ctx.quadraticCurveTo(0, -6.4 * u, 6 * u, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f0605a'; ctx.beginPath(); ctx.moveTo(-4.4 * u, -0.4 * u); ctx.quadraticCurveTo(0, -4.6 * u, 4.4 * u, -0.4 * u); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f6d86a'; for (const d of [-2, 0, 2]) { ctx.beginPath(); ctx.arc(d * u, -1.6 * u, 0.6 * u, 0, Math.PI * 2); ctx.fill(); } });
  for (let k = 0; k < 13; k++) at(() => { ctx.fillStyle = '#3a1e30'; ctx.beginPath(); ctx.ellipse(0, 0, 2.6 * u, 1.8 * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#7a4a68'; ctx.beginPath(); ctx.arc(-0.8 * u, -0.6 * u, 0.6 * u, 0, Math.PI * 2); ctx.fill(); });
  // the feta on top, oregano and a thread of oil
  ctx.save(); ctx.translate(cx + 2 * u, cy - 2 * u); ctx.rotate(-0.15);
  ctx.fillStyle = 'rgba(60,40,20,.4)'; ctx.fillRect(-11 * u, -5 * u, 26 * u, 15 * u);
  ctx.fillStyle = '#d8d4c4'; ctx.fillRect(-13.6 * u, -8.6 * u, 27.2 * u, 16.2 * u); ctx.fillStyle = '#fdfcf6'; ctx.fillRect(-13 * u, -8 * u, 26 * u, 14 * u); ctx.fillStyle = '#e4e0d0'; ctx.fillRect(-13 * u, 4.4 * u, 26 * u, 1.6 * u);
  ctx.fillStyle = '#5a7a2a'; for (let k = 0; k < 22; k++) ctx.fillRect(-11 * u + ((k * 37) % 21) * u, -6 * u + ((k * 13) % 10) * u, 0.8 * u, 0.8 * u);
  ctx.strokeStyle = 'rgba(220,180,40,.8)'; ctx.lineWidth = 0.9 * u; ctx.beginPath(); ctx.moveTo(-10 * u, -3 * u); ctx.quadraticCurveTo(-2 * u, 2 * u, 4 * u, -4 * u); ctx.quadraticCurveTo(8 * u, -7 * u, 10 * u, 1 * u); ctx.stroke();
  ctx.restore();
  // a few olives on the table
  for (const [a, b] of [[0.8, 0.78], [0.83, 0.82], [0.78, 0.84]]) { ctx.fillStyle = '#3a1e30'; ctx.beginPath(); ctx.ellipse(W * a, H * b, 2.4 * u, 1.7 * u, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#7a4a68'; ctx.beginPath(); ctx.arc(W * a - 0.8 * u, H * b - 0.5 * u, 0.6 * u, 0, Math.PI * 2); ctx.fill(); }
}

// Mantilla lace: a black lace panel with a scalloped edge laid on red silk, roses and leafy sprays on the net.
function spnLace(ctx, W, H) {
  const C = { red: '#a8182a', red2: '#921426', black: '#141014', grey: '#3a2a30' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    for (let y = 0; y < rows; y++) R(0, y, cols, 1, Math.floor(y / 5) % 2 ? C.red2 : C.red);
    R(1, 1, cols - 2, 1, C.black); R(1, rows - 2, cols - 2, 1, C.black); R(1, 1, 1, rows - 2, C.black); R(cols - 2, 1, 1, rows - 2, C.black);
    const lx = 12, ly = 12, lw = cols - 24, lh = rows - 24;
    // the scalloped edge with picots
    const panel = () => { x.beginPath(); x.rect(lx, ly, lw, lh); };
    x.fillStyle = C.black;
    for (const [len, put] of [[lw, (a) => { for (const yy of [ly, ly + lh]) { x.beginPath(); x.arc(lx + a, yy, 3.6, 0, Math.PI * 2); x.fill(); R(lx + a - 0.5, yy + (yy === ly ? -5.6 : 4.6), 1, 1, C.black); } }], [lh, (a) => { for (const xx of [lx, lx + lw]) { x.beginPath(); x.arc(xx, ly + a, 3.6, 0, Math.PI * 2); x.fill(); R(xx + (xx === lx ? -5.6 : 4.6), ly + a - 0.5, 1, 1, C.black); } }]]) { const { n, d } = evenSteps(len, 6); for (let i = 0; i <= n; i++) put(i * d); }
    panel(); x.fill();
    // the net: a fine diagonal mesh
    x.save(); x.beginPath(); x.rect(lx + 3, ly + 3, lw - 6, lh - 6); x.clip();
    R(lx + 3, ly + 3, lw - 6, lh - 6, C.red);
    for (let j = ly + 3; j < ly + lh - 3; j++) for (let i = lx + 3; i < lx + lw - 3; i++) if ((i + j) % 4 === 0 || (i - j + 1000) % 4 === 0) R(i, j, 1, 1, C.black);
    // roses: solid black with red lines for the petals
    const rose = (px, py, r) => {
      x.fillStyle = C.black; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.red; x.lineWidth = 0.8; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(px, py, r * (0.3 + k * 0.24), k * 1.2, k * 1.2 + Math.PI * 1.4); x.stroke(); }
      for (let k = 0; k < 6; k++) { const t = (k * Math.PI) / 3; x.fillStyle = C.black; x.beginPath(); x.arc(px + Math.cos(t) * r, py + Math.sin(t) * r, r * 0.42, 0, Math.PI * 2); x.fill(); }
    };
    const sprig = (px, py, len, ang, r) => {
      x.strokeStyle = C.black; x.lineWidth = 2.2; x.beginPath(); x.moveTo(px, py); const ex = px + Math.cos(ang) * len, ey = py + Math.sin(ang) * len; x.quadraticCurveTo((px + ex) / 2 + Math.sin(ang) * len * 0.25, (py + ey) / 2 - Math.cos(ang) * len * 0.25, ex, ey); x.stroke();
      for (let k = 1; k < 5; k++) { const t = k / 5, qx = px + (ex - px) * t + Math.sin(ang) * len * 0.2 * Math.sin(t * Math.PI), qy = py + (ey - py) * t - Math.cos(ang) * len * 0.2 * Math.sin(t * Math.PI); leaf(x, qx, qy, 9, ang + (k % 2 ? 1 : -1), C.black, C.red); }
      rose(ex, ey, r);
    };
    const cx = lx + lw / 2, cy = ly + lh / 2;
    for (let k = 0; k < 8; k++) { const t = (k * Math.PI) / 4 + Math.PI / 8; leaf(x, cx + Math.cos(t) * 14, cy + Math.sin(t) * 14, 14, t, C.black, C.red); }
    rose(cx, cy, 11);
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { sprig(cx + sx * 20, cy + sy * 8, lw * 0.26, Math.atan2(sy * lh * 0.3, sx * lw * 0.3), 7.5); }
    for (const d of [-1, 1]) sprig(cx + d * 24, cy, lw * 0.16, d > 0 ? 0 : Math.PI, 6);
    for (const [a, b] of [[0.5, 0.12], [0.5, 0.88], [0.25, 0.5], [0.75, 0.5]]) rose(lx + lw * a, ly + lh * b, 4.4);
    x.restore();
    x.strokeStyle = C.black; x.lineWidth = 1.4; x.strokeRect(lx + 3, ly + 3, lw - 6, lh - 6);
  });
}

// A Spanish guitar lying across a teal cloth, its rosette inlaid in colours, a red carnation beside it.
function spnGuitar(ctx, W, H) {
  const C = { teal: '#1f5a5a', teal2: '#1a4e4e', wood: '#d8964a', wood2: '#b8743a', dark: '#4a2a1a', black: '#1a1414', white: '#f2ead8', silver: '#c8c8c0', red: '#c8202a', green: '#3f8a3a', gold: '#d8a640' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.dark); R(2, 2, cols - 4, rows - 4, C.gold); R(3, 3, cols - 6, rows - 6, C.teal2);
    for (const [len, put] of [[cols - 12, (a) => { rosette(x, 6 + a, 6.5, 2.4, 6, C.white, C.gold, C.red); rosette(x, 6 + a, rows - 6.5, 2.4, 6, C.white, C.gold, C.red); }], [rows - 24, (a) => { rosette(x, 6.5, 12 + a, 2.4, 6, C.white, C.gold, C.red); rosette(x, cols - 6.5, 12 + a, 2.4, 6, C.white, C.gold, C.red); }]]) { const { n, d } = evenSteps(len, 7); for (let i = 0; i <= n; i++) put(i * d); }
    R(10, 10, cols - 20, rows - 20, C.gold);
    const fx = 11, fy = 11, fw = cols - 22, fh = rows - 22;
    R(fx, fy, fw, fh, C.teal);
    for (let j = fy; j < fy + fh; j++) for (let i = fx; i < fx + fw; i++) if ((i + j) % 12 === 0 || (i - j + 1200) % 12 === 0) R(i, j, 1, 1, C.teal2);
    // the guitar, neck up to the right
    x.save(); x.translate(fx + fw * 0.47, fy + fh * 0.55); x.rotate(-0.36);
    const body = () => { x.beginPath(); x.arc(-34, 0, 24, 0, Math.PI * 2); x.moveTo(-2 + 19, 0); x.arc(-2, 0, 19, 0, Math.PI * 2); x.rect(-34, -16, 32, 32); };
    x.fillStyle = C.dark; x.save(); x.translate(1.6, 1.6); body(); x.fill(); x.restore();
    x.fillStyle = C.wood; body(); x.fill();
    x.fillStyle = C.wood2; x.beginPath(); x.arc(-38, 5, 16, 0.2, 2.6); x.fill();
    x.strokeStyle = C.dark; x.lineWidth = 1.2; x.beginPath(); x.arc(-34, 0, 24, 0.75, Math.PI * 2 - 0.75); x.stroke(); x.beginPath(); x.arc(-2, 0, 19, -Math.PI + 0.9, Math.PI - 0.9); x.stroke();
    // the rosette and the sound hole
    const rc = [C.red, C.green, C.white, C.gold];
    for (let k = 0; k < 24; k++) { x.fillStyle = rc[k % 4]; x.beginPath(); x.moveTo(-14, 0); x.arc(-14, 0, 11, (k * Math.PI) / 12, ((k + 1) * Math.PI) / 12); x.closePath(); x.fill(); }
    x.fillStyle = C.wood; x.beginPath(); x.arc(-14, 0, 8.6, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.black; x.beginPath(); x.arc(-14, 0, 7, 0, Math.PI * 2); x.fill();
    // the bridge
    x.fillStyle = C.dark; x.fillRect(-46, -10, 4, 20); x.fillStyle = C.white; x.fillRect(-43, -7, 1, 14);
    // neck, fingerboard, frets, head
    x.fillStyle = C.dark; x.fillRect(14, -4.4, 66, 8.8);
    x.fillStyle = C.black; x.fillRect(4, -4, 76, 8);
    x.fillStyle = C.silver; let fp = 80; for (let k = 0; k < 14; k++) { fp -= 6.4 * Math.pow(0.95, k); x.fillRect(fp, -4, 0.8, 8); }
    x.fillStyle = C.white; x.fillRect(80, -4.4, 1.4, 8.8);
    x.fillStyle = C.wood2; x.beginPath(); x.moveTo(81, -5); x.lineTo(100, -6); x.quadraticCurveTo(103, 0, 100, 6); x.lineTo(81, 5); x.closePath(); x.fill();
    x.fillStyle = C.black; x.fillRect(85, -2.4, 12, 1.4); x.fillRect(85, 1, 12, 1.4);
    x.fillStyle = C.white; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(87 + k * 4.4, -7.6, 1.4, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(87 + k * 4.4, 7.6, 1.4, 0, Math.PI * 2); x.fill(); }
    // strings
    x.strokeStyle = C.silver; x.lineWidth = 0.6; for (let k = 0; k < 6; k++) { const yy = -3 + k * 1.2; x.beginPath(); x.moveTo(-43, yy * 1.4); x.lineTo(81, yy); x.stroke(); }
    x.restore();
    // a red carnation
    const fxc = fx + fw * 0.82, fyc = fy + fh * 0.76;
    x.strokeStyle = C.green; x.lineWidth = 1.4; x.beginPath(); x.moveTo(fxc, fyc); x.quadraticCurveTo(fxc - 10, fyc + 6, fxc - 22, fyc + 8); x.stroke();
    leaf(x, fxc - 10, fyc + 6, 7, 2.6, C.green); leaf(x, fxc - 16, fyc + 7.4, 6, -2.8, C.green);
    for (let k = 0; k < 14; k++) { const t = (k * Math.PI * 2) / 14; x.fillStyle = k % 2 ? C.red : '#e04a4a'; x.beginPath(); x.arc(fxc + Math.cos(t) * 4, fyc + Math.sin(t) * 4, 2.8, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = '#e04a4a'; x.beginPath(); x.arc(fxc, fyc, 3.4, 0, Math.PI * 2); x.fill(); x.fillStyle = C.red; x.beginPath(); x.arc(fxc, fyc, 1.6, 0, Math.PI * 2); x.fill();
  });
}

// Castanets: pairs of polished wooden castanets on red cords with tassels, red carnations between, on deep green.
function spnCastanets(ctx, W, H) {
  const C = { green: '#1f4a3a', green2: '#1a4032', wood: '#6a3a22', wood2: '#8a5232', shine: '#b8784a', dark: '#3a1e12', red: '#c8202a', cream: '#f2e6cc', gold: '#d8a640', leaf: '#4f8a4a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.cream);
    const dot = (px, py) => { x.fillStyle = C.red; x.beginPath(); x.arc(px, py, 1.6, 0, Math.PI * 2); x.fill(); };
    for (const [len, put] of [[cols - 8, (a) => { dot(4 + a, 4); dot(4 + a, rows - 4); }], [rows - 8, (a) => { dot(4, 4 + a); dot(cols - 4, 4 + a); }]]) { const { n, d } = evenSteps(len, 5); for (let i = 0; i <= n; i++) put(i * d); }
    R(7, 7, cols - 14, rows - 14, C.gold); R(8, 8, cols - 16, rows - 16, C.green);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    for (let j = fy; j < fy + fh; j++) for (let i = fx; i < fx + fw; i++) if ((i * 7 + j * 3) % 29 === 0) R(i, j, 1, 1, C.green2);
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const castanet = (px, py, ang) => {
      x.save(); x.translate(px, py); x.rotate(ang);
      const shell = (dx, dy, tint) => {
        x.fillStyle = C.dark; x.beginPath(); x.ellipse(dx, dy, 8.6, 9.6, 0, 0, Math.PI * 2); x.fill();
        x.fillStyle = tint; x.beginPath(); x.ellipse(dx, dy, 7.8, 8.8, 0, 0, Math.PI * 2); x.fill();
        x.fillStyle = C.dark; x.beginPath(); x.ellipse(dx, dy - 9, 3, 2.6, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = tint; x.beginPath(); x.ellipse(dx, dy - 9, 2.2, 1.8, 0, 0, Math.PI * 2); x.fill();
        x.strokeStyle = C.dark; x.lineWidth = 0.7; for (const r of [3, 5.4]) { x.beginPath(); x.ellipse(dx, dy + 1, r, r * 1.1, 0, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); }
        x.fillStyle = C.shine; x.beginPath(); x.ellipse(dx - 3, dy - 3, 1.6, 2.6, 0.4, 0, Math.PI * 2); x.fill();
      };
      x.save(); x.rotate(-0.28); shell(-5, 0, C.wood); x.restore(); x.save(); x.rotate(0.28); shell(5, 0, C.wood2); x.restore();
      x.strokeStyle = C.red; x.lineWidth = 1.2; x.beginPath(); x.moveTo(-4, -10); x.quadraticCurveTo(0, -16, 4, -9); x.stroke();
      x.beginPath(); x.moveTo(0, -14); x.lineTo(0, -17); x.stroke();
      x.fillStyle = C.red; x.beginPath(); x.moveTo(-2, -17); x.lineTo(2, -17); x.lineTo(3, -24); x.lineTo(-3, -24); x.closePath(); x.fill();
      x.fillStyle = C.gold; x.fillRect(-2, -18, 4, 1.4);
      x.restore();
    };
    const carnation = (px, py) => {
      x.strokeStyle = C.leaf; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px, py + 3); x.lineTo(px, py + 12); x.stroke(); leaf(x, px, py + 9, 5, -2.5, C.leaf); leaf(x, px, py + 9, 5, -0.6, C.leaf);
      for (let k = 0; k < 10; k++) { const t = Math.PI + (k * Math.PI) / 9; x.fillStyle = k % 2 ? C.red : '#e04a4a'; x.beginPath(); x.arc(px + Math.cos(t) * 4, py + Math.sin(t) * 3.4, 2.4, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.red; x.beginPath(); x.ellipse(px, py, 4.6, 3, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = C.leaf; x.fillRect(px - 1.6, py + 2, 3.2, 2);
    };
    const nx = 5, ny = 3, sx = fw / nx, sy = fh / ny;
    for (let j = -1; j <= ny; j++) for (let i = -1; i <= nx; i++) {
      const cx = fx + (i + 0.5) * sx, cy = fy + (j + 0.5 + (i % 2 ? 0.5 : 0)) * sy + 3;
      if ((i + j + 2) % 2) carnation(cx, cy - 3); else castanet(cx, cy, ((i + 2) % 3 - 1) * 0.3);
      x.fillStyle = C.gold; x.beginPath(); x.arc(cx + sx * 0.5, cy - sy * 0.25, 0.9, 0, Math.PI * 2); x.fill();
    }
    x.restore();
  });
}

// Park Güell: the serpentine bench of broken tiles in front, Gaudí's gingerbread lodge and palms, the city and the sea.
function spnParkGuell(ctx, W, H) {
  const u = H / 100, rnd = rng(41);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.36); sky.addColorStop(0, '#4f9ade'); sky.addColorStop(1, '#d4ecf8');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3a7ab8'; ctx.fillRect(0, H * 0.34, W, H * 0.06);
  // the city: rows of little blocks
  for (let r = 0; r < 6; r++) for (let k = 0; k * 5 * u < W; k++) {
    const bw = (3 + rnd() * 2.4) * u, bh = (2 + rnd() * 2 + r * 0.5) * u, px = k * 5 * u + rnd() * 2 * u, py = H * (0.43 + r * 0.035);
    ctx.fillStyle = ['#e8d8c0', '#d8b894', '#efe6d6', '#e0c8a8', '#f2ead8'][Math.floor(rnd() * 5)]; ctx.fillRect(px, py - bh, bw, bh + 2 * u);
    ctx.fillStyle = rnd() < 0.5 ? '#b8603a' : '#8a7a6a'; ctx.fillRect(px, py - bh, bw, 0.8 * u);
    ctx.fillStyle = '#6a5a52'; for (let w = 0; w < 2; w++) ctx.fillRect(px + bw * (0.2 + w * 0.4), py - bh + 1.6 * u, 0.8 * u, 0.8 * u);
  }
  ctx.fillStyle = '#5a8a4a'; ctx.fillRect(0, H * 0.62, W, H * 0.1);
  // the lodge with its icing roof
  const lx = W * 0.22, lb = H * 0.68;
  ctx.fillStyle = '#d8b48a'; ctx.fillRect(lx - 12 * u, lb - 16 * u, 24 * u, 16 * u);
  ctx.fillStyle = '#c49a70'; for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) ctx.fillRect(lx - 12 * u + k * 4 * u + (r % 2) * 2 * u, lb - 16 * u + r * 4 * u, 3.4 * u, 0.6 * u);
  ctx.fillStyle = '#4a3a2a'; for (const d of [-7, 0, 7]) { roundRect(ctx, lx + d * u - 1.6 * u, lb - 11 * u, 3.2 * u, 5 * u, [1.6 * u, 1.6 * u, 0, 0]); ctx.fill(); }
  ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.moveTo(lx - 14 * u, lb - 15 * u); ctx.quadraticCurveTo(lx - 10 * u, lb - 30 * u, lx, lb - 31 * u); ctx.quadraticCurveTo(lx + 10 * u, lb - 30 * u, lx + 14 * u, lb - 15 * u); ctx.fill();
  ctx.fillStyle = '#f2e6d2'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(lx - 14 * u + k * 1.2 * u, lb - 15 * u - k * 3 * u); for (let s = 0; s <= 8; s++) ctx.lineTo(lx - 13 * u + k * 1.4 * u + s * (26 - k * 2.8) / 8 * u, lb - 15.6 * u - k * 3 * u + (s % 2) * 1.4 * u); ctx.lineTo(lx + 14 * u - k * 1.2 * u, lb - 15 * u - k * 3 * u + 0.8 * u); ctx.lineTo(lx - 14 * u + k * 1.2 * u, lb - 15 * u - k * 3 * u + 0.8 * u); ctx.fill(); }
  ctx.fillStyle = '#f6f2ea'; ctx.fillRect(lx - 1.6 * u, lb - 36 * u, 3.2 * u, 6 * u); ctx.fillStyle = '#c8322a'; ctx.beginPath(); ctx.ellipse(lx, lb - 36 * u, 5.4 * u, 3 * u, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#f6f2ea'; for (const d of [-3, 0, 3]) { ctx.beginPath(); ctx.arc(lx + d * u, lb - 37.4 * u + Math.abs(d) * 0.3 * u, 0.8 * u, 0, Math.PI * 2); ctx.fill(); }
  // palms
  const palm = (px, py, h) => { ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 1.8 * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 3 * u, py - h * 0.6, px + 1 * u, py - h); ctx.stroke(); ctx.strokeStyle = '#3f7a3a'; ctx.lineWidth = 1.4 * u; for (let k = 0; k < 7; k++) { const a = Math.PI + (k * Math.PI) / 6; ctx.beginPath(); ctx.moveTo(px + 1 * u, py - h); ctx.quadraticCurveTo(px + 1 * u + Math.cos(a) * 6 * u, py - h + Math.sin(a) * 6 * u - 2 * u, px + 1 * u + Math.cos(a) * 10 * u, py - h + Math.sin(a) * 4 * u + 4 * u); ctx.stroke(); } };
  palm(W * 0.46, H * 0.7, 30 * u); palm(W * 0.84, H * 0.7, 34 * u); palm(W * 0.92, H * 0.7, 24 * u);
  // the serpentine bench, covered in broken tiles
  const top = (px) => H * (0.74 + 0.05 * Math.sin((px / W) * Math.PI * 4));
  const bench = () => { ctx.beginPath(); ctx.moveTo(0, H); for (let px = 0; px <= W; px += 2 * u) ctx.lineTo(px, top(px)); ctx.lineTo(W, H); ctx.closePath(); };
  ctx.save(); bench(); ctx.clip();
  ctx.fillStyle = '#ece6dc'; ctx.fillRect(0, H * 0.6, W, H * 0.4);
  const cols = ['#f6f2ea', '#2f6fb8', '#f2c040', '#3f9a5a', '#e86a2a', '#c8322a', '#7ac0e0', '#f6f2ea', '#9ac46a'];
  for (let gy = H * 0.66; gy < H; gy += 3 * u) for (let gx = -2 * u; gx < W; gx += 3 * u) {
    ctx.fillStyle = cols[Math.floor(rnd() * cols.length)]; ctx.beginPath();
    const j = () => (rnd() - 0.5) * 1.2 * u;
    ctx.moveTo(gx + j(), gy + j()); ctx.lineTo(gx + 2.6 * u + j(), gy + j()); ctx.lineTo(gx + 2.6 * u + j(), gy + 2.6 * u + j()); ctx.lineTo(gx + j(), gy + 2.6 * u + j()); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  ctx.strokeStyle = '#f6f2ea'; ctx.lineWidth = 2.4 * u; ctx.beginPath(); for (let px = 0; px <= W; px += 2 * u) px ? ctx.lineTo(px, top(px)) : ctx.moveTo(px, top(px)); ctx.stroke();
  ctx.strokeStyle = '#c8bca8'; ctx.lineWidth = 0.8 * u; ctx.beginPath(); for (let px = 0; px <= W; px += 2 * u) px ? ctx.lineTo(px, top(px) + 1.6 * u) : ctx.moveTo(px, top(px) + 1.6 * u); ctx.stroke();
}

// Tapas on a wooden table: patatas bravas, garlic prawns, olives, meatballs, tortilla and ham, bread on the side.
function spnTapas(ctx, W, H) {
  const u = H / 100, rnd = rng(13);
  ctx.fillStyle = '#a8743e'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#946436'; for (let k = 0; k < 7; k++) ctx.fillRect((k * W) / 7, 0, 0.7 * u, H);
  ctx.strokeStyle = '#9c6a3a'; ctx.lineWidth = 0.6 * u; for (let k = 0; k < 20; k++) { const px = ((k * 37) % 100) / 100 * W; ctx.beginPath(); ctx.moveTo(px, ((k * 53) % 100) / 100 * H); ctx.quadraticCurveTo(px + 1 * u, ((k * 53) % 100) / 100 * H + 12 * u, px - 0.6 * u, ((k * 53) % 100) / 100 * H + 24 * u); ctx.stroke(); }
  const dish = (cx, cy, r, fill) => {
    ctx.fillStyle = 'rgba(40,20,10,.3)'; ctx.beginPath(); ctx.arc(cx + 1.4 * u, cy + 2 * u, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#b8582e'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d8743a'; ctx.beginPath(); ctx.arc(cx, cy, r - 1.4 * u, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8a3e1e'; ctx.beginPath(); ctx.arc(cx, cy, r - 2.6 * u, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 2.6 * u, 0, Math.PI * 2); ctx.clip(); fill(cx, cy, r - 2.6 * u); ctx.restore();
  };
  const scatter = (cx, cy, r, n, fn) => { for (let k = 0; k < n; k++) { const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * r * 0.82; fn(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, rnd() * Math.PI); } };
  const R1 = 16.5 * u;
  dish(W * 0.2, H * 0.3, R1, (cx, cy, r) => { scatter(cx, cy, r, 16, (px, py, a) => { ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.fillStyle = '#e8b850'; ctx.fillRect(-2.4 * u, -2.4 * u, 4.8 * u, 4.8 * u); ctx.fillStyle = '#f6d880'; ctx.fillRect(-2.4 * u, -2.4 * u, 4.8 * u, 1.6 * u); ctx.restore(); }); scatter(cx, cy, r, 8, (px, py) => { ctx.fillStyle = '#c8321e'; ctx.beginPath(); ctx.arc(px, py, 2 * u, 0, Math.PI * 2); ctx.fill(); }); scatter(cx, cy, r, 6, (px, py) => { ctx.fillStyle = '#fbf6e6'; ctx.beginPath(); ctx.arc(px, py, 1.2 * u, 0, Math.PI * 2); ctx.fill(); }); });
  dish(W * 0.5, H * 0.3, R1, (cx, cy, r) => { ctx.fillStyle = '#e8a83a'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); scatter(cx, cy, r, 7, (px, py, a) => { ctx.save(); ctx.translate(px, py); ctx.rotate(a * 2); ctx.strokeStyle = '#f07a5a'; ctx.lineWidth = 2.6 * u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 3 * u, 0.2, Math.PI * 1.4); ctx.stroke(); ctx.strokeStyle = '#f8b8a0'; ctx.lineWidth = 0.6 * u; ctx.beginPath(); ctx.arc(0, 0, 3.6 * u, 0.4, Math.PI * 1.2); ctx.stroke(); ctx.restore(); }); scatter(cx, cy, r, 6, (px, py) => { ctx.fillStyle = '#f6f0dc'; ctx.beginPath(); ctx.ellipse(px, py, 1.4 * u, 1 * u, 0, 0, Math.PI * 2); ctx.fill(); }); scatter(cx, cy, r, 3, (px, py, a) => { ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.fillStyle = '#c8201a'; ctx.fillRect(-2 * u, -0.5 * u, 4 * u, 1 * u); ctx.restore(); }); });
  dish(W * 0.8, H * 0.3, R1, (cx, cy, r) => { scatter(cx, cy, r, 14, (px, py, a) => { ctx.fillStyle = '#7a8a2a'; ctx.beginPath(); ctx.ellipse(px, py, 2.6 * u, 2 * u, a, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#9aac3a'; ctx.beginPath(); ctx.arc(px - 0.8 * u, py - 0.6 * u, 0.8 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#d8301a'; ctx.beginPath(); ctx.arc(px + 1.2 * u, py, 0.7 * u, 0, Math.PI * 2); ctx.fill(); }); });
  dish(W * 0.2, H * 0.72, R1, (cx, cy, r) => { ctx.fillStyle = '#b8321e'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); for (const [dx, dy] of [[-4, -4], [4, -3], [0, 4], [-6, 4], [6, 5], [0, -9], [-8, -1], [8, 1]]) { ctx.fillStyle = '#6a3a22'; ctx.beginPath(); ctx.arc(cx + dx * u, cy + dy * u, 3.2 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#8a5232'; ctx.beginPath(); ctx.arc(cx + dx * u - 0.8 * u, cy + dy * u - 0.8 * u, 1.2 * u, 0, Math.PI * 2); ctx.fill(); } scatter(cx, cy, r, 8, (px, py) => { ctx.fillStyle = '#4f8a3a'; ctx.fillRect(px, py, 1 * u, 1 * u); }); });
  // tortilla on a white plate
  const tx = W * 0.5, ty = H * 0.72;
  ctx.fillStyle = 'rgba(40,20,10,.3)'; ctx.beginPath(); ctx.arc(tx + 1.4 * u, ty + 2 * u, R1, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f6f4ee'; ctx.beginPath(); ctx.arc(tx, ty, R1, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#2f6fb8'; ctx.lineWidth = 0.8 * u; ctx.beginPath(); ctx.arc(tx, ty, R1 - 1.6 * u, 0, Math.PI * 2); ctx.stroke();
  for (const [a0, a1, off] of [[-0.3, 1.5, 0], [1.9, 3.4, 1.4]]) { const ox = Math.cos((a0 + a1) / 2) * off * u, oy = Math.sin((a0 + a1) / 2) * off * u; ctx.fillStyle = '#c88a3a'; ctx.beginPath(); ctx.moveTo(tx + ox, ty + oy); ctx.arc(tx + ox, ty + oy, R1 - 3 * u, a0, a1); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#f2d070'; ctx.beginPath(); ctx.moveTo(tx + ox, ty + oy); ctx.arc(tx + ox, ty + oy, R1 - 4.6 * u, a0, a1); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e8c060'; for (let k = 0; k < 6; k++) { const a = a0 + (a1 - a0) * (k + 0.5) / 6; ctx.beginPath(); ctx.arc(tx + ox + Math.cos(a) * (R1 * 0.45), ty + oy + Math.sin(a) * (R1 * 0.45), 1 * u, 0, Math.PI * 2); ctx.fill(); } }
  // ham on a board
  const hx = W * 0.8, hy = H * 0.72;
  ctx.fillStyle = 'rgba(40,20,10,.3)'; roundRect(ctx, hx - 15 * u, hy - 10 * u, 31 * u, 22 * u, 2 * u); ctx.fill();
  ctx.fillStyle = '#c89a62'; roundRect(ctx, hx - 16 * u, hy - 12 * u, 31 * u, 22 * u, 2 * u); ctx.fill(); ctx.fillStyle = '#b88a52'; ctx.fillRect(hx - 15 * u, hy - 4 * u, 29 * u, 0.6 * u);
  for (let k = 0; k < 5; k++) { const px = hx - 11 * u + k * 5 * u, py = hy - 2 * u + (k % 2) * 2 * u; ctx.fillStyle = '#a8283a'; ctx.beginPath(); ctx.moveTo(px - 3 * u, py - 6 * u); ctx.quadraticCurveTo(px + 2 * u, py - 8 * u, px + 3 * u, py - 2 * u); ctx.quadraticCurveTo(px + 2 * u, py + 5 * u, px - 2 * u, py + 6 * u); ctx.quadraticCurveTo(px - 4 * u, py, px - 3 * u, py - 6 * u); ctx.fill(); ctx.strokeStyle = '#f6e6e0'; ctx.lineWidth = 0.8 * u; ctx.beginPath(); ctx.moveTo(px - 2.6 * u, py - 5 * u); ctx.quadraticCurveTo(px - 3.4 * u, py, px - 1.6 * u, py + 5 * u); ctx.stroke(); }
  // bread between the dishes
  for (const [a, b, r] of [[0.35, 0.51, 0.4], [0.65, 0.5, -0.3]]) { ctx.save(); ctx.translate(W * a, H * b); ctx.rotate(r); ctx.fillStyle = '#c88a3a'; roundRect(ctx, -6 * u, -3.6 * u, 12 * u, 7.2 * u, 2.4 * u); ctx.fill(); ctx.fillStyle = '#f2dcae'; roundRect(ctx, -4.8 * u, -2.4 * u, 9.6 * u, 4.8 * u, 1.6 * u); ctx.fill(); ctx.fillStyle = '#d84a2a'; roundRect(ctx, -4 * u, -1.6 * u, 8 * u, 3.2 * u, 1.2 * u); ctx.fill(); ctx.restore(); }
}

// An orange grove near Valencia: rows of round trees heavy with fruit running to a white farmhouse, blossom in front.
function spnOranges(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.4); sky.addColorStop(0, '#4f94d8'); sky.addColorStop(1, '#d8ecf6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#8a9ab8'; ctx.beginPath(); ctx.moveTo(0, H * 0.36); ctx.lineTo(W * 0.18, H * 0.26); ctx.lineTo(W * 0.3, H * 0.32); ctx.lineTo(W * 0.46, H * 0.24); ctx.lineTo(W * 0.62, H * 0.33); ctx.lineTo(W * 0.8, H * 0.27); ctx.lineTo(W, H * 0.34); ctx.lineTo(W, H * 0.4); ctx.lineTo(0, H * 0.4); ctx.fill();
  ctx.fillStyle = '#b07a4a'; ctx.fillRect(0, H * 0.38, W, H * 0.62);
  // the farmhouse with its steep thatched roof
  const fx = W * 0.6, fb = H * 0.42;
  ctx.fillStyle = '#f6f4ee'; ctx.fillRect(fx - 6 * u, fb - 6 * u, 12 * u, 6 * u);
  ctx.fillStyle = '#b8945a'; ctx.beginPath(); ctx.moveTo(fx - 7 * u, fb - 5.6 * u); ctx.lineTo(fx, fb - 15 * u); ctx.lineTo(fx + 7 * u, fb - 5.6 * u); ctx.fill();
  ctx.fillStyle = '#f6f4ee'; ctx.beginPath(); ctx.moveTo(fx - 1 * u, fb - 14 * u); ctx.lineTo(fx + 1 * u, fb - 14 * u); ctx.lineTo(fx + 1.4 * u, fb - 16 * u); ctx.lineTo(fx - 1.4 * u, fb - 16 * u); ctx.fill();
  ctx.fillStyle = '#2f6fb8'; ctx.fillRect(fx - 1.2 * u, fb - 4 * u, 2.4 * u, 4 * u);
  // rows of trees converging on the farmhouse
  const vx = W * 0.6, vy = H * 0.4;
  const tree = (px, py, r) => {
    ctx.fillStyle = 'rgba(60,30,10,.3)'; ctx.beginPath(); ctx.ellipse(px + r * 0.3, py + r * 0.9, r, r * 0.3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#5a3a24'; ctx.fillRect(px - r * 0.08, py + r * 0.4, r * 0.16, r * 0.5);
    ctx.fillStyle = '#2a5a2a'; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3f7a3a'; ctx.beginPath(); ctx.arc(px - r * 0.25, py - r * 0.25, r * 0.6, 0, Math.PI * 2); ctx.fill();
    if (r > 2 * u) { ctx.fillStyle = '#f08a1a'; for (let k = 0; k < 9; k++) { const a = k * 2.4, rr = r * (0.3 + (k % 3) * 0.22); ctx.beginPath(); ctx.arc(px + Math.cos(a) * rr, py + Math.sin(a) * rr, Math.max(0.8 * u, r * 0.13), 0, Math.PI * 2); ctx.fill(); } }
    else { ctx.fillStyle = '#f08a1a'; ctx.fillRect(px - 0.5 * u, py - 0.5 * u, 1 * u, 1 * u); }
  };
  const rows = [-1.5, -0.95, -0.42, 0.42, 0.95, 1.5];
  const items = [];
  for (const s of rows) for (let k = 0; k < 7; k++) { const t = Math.pow((k + 1) / 7, 1.6), py = vy + t * H * 0.58, px = vx + s * t * W * 0.5; items.push([py, px, (0.8 + t * 9.4) * u]); }
  ctx.strokeStyle = '#9a6a3e'; ctx.lineWidth = 0.8 * u; for (let k = -12; k <= 12; k++) { ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(vx + k * W * 0.12, H); ctx.stroke(); }
  ctx.fillStyle = '#7a8a3a'; for (const s of rows) { ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(vx + s * W * 0.5 - 8 * u, H * 1.02); ctx.lineTo(vx + s * W * 0.5 + 8 * u, H * 1.02); ctx.closePath(); ctx.fill(); }
  items.sort((a, b) => a[0] - b[0]).forEach(([py, px, r]) => tree(px, py - r * 0.6, r));
  // the blossoming branch across the top left corner
  ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 1.6 * u; ctx.beginPath(); ctx.moveTo(-2 * u, H * 0.04); ctx.quadraticCurveTo(W * 0.14, H * 0.08, W * 0.26, H * 0.2); ctx.stroke();
  for (const [a, b, ang] of [[0.04, 0.06, 0.5], [0.08, 0.12, -1], [0.12, 0.08, 0.8], [0.16, 0.16, -0.8], [0.2, 0.12, 0.6], [0.24, 0.22, -0.5], [0.06, 0.14, 2]]) leaf(ctx, W * a, H * b, 7 * u, ang, '#2f6a2e', '#4f8a3a');
  for (const [a, b] of [[0.1, 0.17], [0.18, 0.2], [0.23, 0.27]]) { ctx.fillStyle = '#f08a1a'; ctx.beginPath(); ctx.arc(W * a, H * b, 3 * u, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f8b048'; ctx.beginPath(); ctx.arc(W * a - 1 * u, H * b - 1 * u, 1 * u, 0, Math.PI * 2); ctx.fill(); }
  for (const [a, b] of [[0.06, 0.1], [0.14, 0.05], [0.21, 0.15]]) { ctx.fillStyle = '#fbf8ee'; for (let k = 0; k < 5; k++) { const t = (k * Math.PI * 2) / 5; ctx.beginPath(); ctx.arc(W * a + Math.cos(t) * 1.2 * u, H * b + Math.sin(t) * 1.2 * u, 0.9 * u, 0, Math.PI * 2); ctx.fill(); } ctx.fillStyle = '#f2c040'; ctx.beginPath(); ctx.arc(W * a, H * b, 0.6 * u, 0, Math.PI * 2); ctx.fill(); }
}

// Mimosa from the Riviera: sprays of fluffy yellow balls and feathery blue-green leaves on deep blue.
function frnMimosa(ctx, W, H) {
  const C = { blue: '#1f3a6a', blue2: '#1a3260', yellow: '#f6d030', yellow2: '#e0a820', light: '#fbe88a', leaf: '#a8c4a0', leaf2: '#7a9a84', stem: '#7a6a4a', white: '#f2ecd8' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.blue2);
    for (const [len, put] of [[cols - 8, (a) => { R(4 + a - 1, 3, 2, 2, C.yellow); R(4 + a - 1, rows - 5, 2, 2, C.yellow); }], [rows - 8, (a) => { R(3, 4 + a - 1, 2, 2, C.yellow); R(cols - 5, 4 + a - 1, 2, 2, C.yellow); }]]) { const { n, d } = evenSteps(len, 5); for (let i = 0; i <= n; i++) put(i * d); }
    R(7, 7, cols - 14, rows - 14, C.white); R(8, 8, cols - 16, rows - 16, C.blue);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    const rnd = rng(5);
    const frond = (px, py, len, ang) => { x.strokeStyle = C.leaf2; x.lineWidth = 0.7; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(ang) * len, py + Math.sin(ang) * len); x.stroke(); for (let k = 1; k < len; k += 1.3) { const qx = px + Math.cos(ang) * k, qy = py + Math.sin(ang) * k; x.strokeStyle = k % 2.6 < 1.3 ? C.leaf : C.leaf2; x.lineWidth = 1; x.beginPath(); x.moveTo(qx + Math.cos(ang + 1.2) * 2.8, qy + Math.sin(ang + 1.2) * 2.8); x.lineTo(qx + Math.cos(ang - 1.2) * 2.8, qy + Math.sin(ang - 1.2) * 2.8); x.stroke(); } };
    const ball = (px, py) => { x.fillStyle = C.yellow2; x.beginPath(); x.arc(px + 0.4, py + 0.4, 1.8, 0, Math.PI * 2); x.fill(); x.fillStyle = C.yellow; x.beginPath(); x.arc(px, py, 1.6, 0, Math.PI * 2); x.fill(); x.fillStyle = C.light; x.fillRect(px - 0.8, py - 0.8, 1, 1); };
    const spray = (px, py, ang, len) => {
      x.strokeStyle = C.stem; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px, py); const ex = px + Math.cos(ang) * len, ey = py + Math.sin(ang) * len; x.quadraticCurveTo((px + ex) / 2 - Math.sin(ang) * 6, (py + ey) / 2 + Math.cos(ang) * 6, ex, ey); x.stroke();
      for (let k = 1; k < 6; k++) { const t = k / 6, qx = px + (ex - px) * t, qy = py + (ey - py) * t; frond(qx, qy, 15 - k * 1.4, ang + (k % 2 ? 0.95 : -0.95)); }
      for (let k = 2; k <= 6; k++) {
        const t = k / 6.4, qx = px + (ex - px) * t - Math.sin(ang) * 3, qy = py + (ey - py) * t + Math.cos(ang) * 3, side = k % 2 ? 1 : -1, ba = ang + side * 0.8;
        x.strokeStyle = C.stem; x.lineWidth = 0.6; x.beginPath(); x.moveTo(qx, qy); x.lineTo(qx + Math.cos(ba) * 13, qy + Math.sin(ba) * 13); x.stroke();
        for (let b = 0; b < 5; b++) { const bt = 2.6 + b * 2.4, off = b % 2 ? 2.2 : -2.2; ball(qx + Math.cos(ba) * bt + off * Math.sin(ba), qy + Math.sin(ba) * bt - off * Math.cos(ba)); }
      }
      for (const [dx, dy] of [[0, 0], [3.6, 1.4], [-1.4, 3.4], [2.4, -3.2]]) ball(ex + dx, ey + dy);
    };
    const nx = 4, ny = 2, sx = fw / nx, sy = fh / ny;
    for (let j = -1; j <= ny; j++) for (let i = -1; i <= nx; i++) { const cx = fx + (i + 0.2) * sx, cy = fy + (j + 0.85 + (i % 2 ? 0.5 : 0)) * sy; spray(cx, cy, -0.5 - (i % 2) * 0.25, sx * 1.05); }
    x.restore();
  });
}

// A Provençal toile: little scenes in red on cream - a farmhouse with cypresses, the Pont du Gard, a windmill, a boat,
// sheep under an olive tree - with birds and sprigs between them.
function frnToile(ctx, W, H) {
  const C = { cream: '#f2e8d6', red: '#a8302a', pink: '#dca090' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.red); R(3, 3, cols - 6, rows - 6, C.cream); R(5, 5, cols - 10, 1, C.red); R(5, rows - 6, cols - 10, 1, C.red); R(5, 5, 1, rows - 10, C.red); R(cols - 6, 5, 1, rows - 10, C.red);
    const fx = 7, fy = 7, fw = cols - 14, fh = rows - 14;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.strokeStyle = C.red; x.fillStyle = C.red; x.lineWidth = 1;
    const L = (pts) => { x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke(); };
    const ground = (px, py, w) => { x.fillStyle = C.pink; x.beginPath(); x.ellipse(px, py, w, 2.4, 0, 0, Math.PI * 2); x.fill(); x.strokeStyle = C.red; for (let k = -w + 2; k < w - 2; k += 3) L([[px + k, py + 0.5], [px + k + 1.4, py - 1]]); };
    const cypress = (px, py, h) => { x.fillStyle = C.red; x.beginPath(); x.ellipse(px, py - h / 2, 1.8, h / 2, 0, 0, Math.PI * 2); x.fill(); };
    const scenes = [
      (px, py) => { ground(px, py + 10, 20); x.fillStyle = C.pink; x.fillRect(px - 10, py - 2, 18, 12); x.strokeStyle = C.red; x.strokeRect(px - 10, py - 2, 18, 12); L([[px - 12, py - 1], [px - 1, py - 9], [px + 10, py - 1]]); for (let k = 0; k < 4; k++) L([[px - 9 + k * 2.4, py - 2 - k * 1.6], [px + 7 - k * 2.4, py - 2 - k * 1.6]]); x.fillStyle = C.red; x.fillRect(px - 6, py + 3, 3, 7); x.fillRect(px + 1, py + 2, 3, 3); cypress(px + 13, py + 10, 20); cypress(px + 17, py + 10, 14); },
      (px, py) => { ground(px, py + 12, 24); x.fillStyle = C.pink; x.fillRect(px - 22, py + 6, 44, 4); for (const [y0, h, n] of [[py - 12, 5, 9], [py - 6, 8, 6], [py + 2, 10, 4]]) { x.fillStyle = C.pink; x.fillRect(px - 21, y0, 42, h); x.strokeStyle = C.red; x.strokeRect(px - 21, y0, 42, h); for (let k = 0; k < n; k++) { const aw = 42 / n; x.fillStyle = C.cream; x.beginPath(); x.moveTo(px - 21 + k * aw + 1, y0 + h); x.lineTo(px - 21 + k * aw + 1, y0 + h * 0.45); x.arc(px - 21 + k * aw + aw / 2, y0 + h * 0.45, aw / 2 - 1, Math.PI, 0); x.lineTo(px - 21 + (k + 1) * aw - 1, y0 + h); x.fill(); x.stroke(); } } },
      (px, py) => { ground(px, py + 12, 14); x.fillStyle = C.pink; x.beginPath(); x.moveTo(px - 6, py + 12); x.lineTo(px - 5, py - 6); x.lineTo(px + 5, py - 6); x.lineTo(px + 6, py + 12); x.fill(); x.stroke(); x.fillStyle = C.red; x.beginPath(); x.moveTo(px - 6, py - 6); x.lineTo(px, py - 12); x.lineTo(px + 6, py - 6); x.fill(); x.fillRect(px - 1.4, py + 6, 2.8, 6); for (let k = 0; k < 4; k++) { const a = 0.6 + (k * Math.PI) / 2; L([[px, py - 8], [px + Math.cos(a) * 15, py - 8 + Math.sin(a) * 15]]); const b = a + 0.35; x.beginPath(); x.moveTo(px + Math.cos(a) * 4, py - 8 + Math.sin(a) * 4); x.lineTo(px + Math.cos(a) * 15, py - 8 + Math.sin(a) * 15); x.lineTo(px + Math.cos(b) * 14, py - 8 + Math.sin(b) * 14); x.lineTo(px + Math.cos(b) * 4, py - 8 + Math.sin(b) * 4); x.closePath(); x.stroke(); } },
      (px, py) => { x.strokeStyle = C.red; for (let k = -3; k <= 3; k++) L([[px - 20 + k * 6, py + 12], [px - 16 + k * 6, py + 11], [px - 12 + k * 6, py + 12]]); x.fillStyle = C.red; x.beginPath(); x.moveTo(px - 13, py + 6); x.lineTo(px + 13, py + 6); x.lineTo(px + 9, py + 10); x.lineTo(px - 9, py + 10); x.fill(); L([[px, py + 6], [px, py - 16]]); x.fillStyle = C.pink; x.beginPath(); x.moveTo(px + 1, py - 15); x.lineTo(px + 12, py + 4); x.lineTo(px + 1, py + 4); x.fill(); x.stroke(); x.beginPath(); x.moveTo(px - 1, py - 12); x.lineTo(px - 10, py + 4); x.lineTo(px - 1, py + 4); x.fill(); x.stroke(); },
      (px, py) => { ground(px, py + 12, 22); x.strokeStyle = C.red; x.lineWidth = 1.6; L([[px - 2, py + 12], [px - 1, py], [px - 4, py - 6]]); L([[px - 1, py], [px + 4, py - 5]]); x.lineWidth = 1; for (const [dx, dy, r] of [[-8, -10, 6], [0, -13, 7], [8, -9, 6], [-3, -6, 5], [5, -5, 4]]) { x.fillStyle = C.pink; x.beginPath(); x.arc(px + dx, py + dy, r, 0, Math.PI * 2); x.fill(); x.stroke(); } for (const sx0 of [-13, 10]) { x.fillStyle = C.cream; x.beginPath(); x.ellipse(px + sx0, py + 8, 4.4, 2.8, 0, 0, Math.PI * 2); x.fill(); x.stroke(); x.fillStyle = C.red; x.beginPath(); x.arc(px + sx0 + (sx0 < 0 ? -4.6 : 4.6), py + 7, 1.4, 0, Math.PI * 2); x.fill(); L([[px + sx0 - 2, py + 10], [px + sx0 - 2, py + 12]]); L([[px + sx0 + 2, py + 10], [px + sx0 + 2, py + 12]]); } },
    ];
    const bird = (px, py, s) => L([[px - 3 * s, py - 1 * s], [px - 1 * s, py], [px, py + 0.6 * s], [px + 1 * s, py], [px + 3 * s, py - 1 * s]]);
    const sprig = (px, py) => { L([[px, py + 3], [px, py - 3]]); leaf(x, px, py - 1, 3, -2.3, C.red); leaf(x, px, py + 1, 3, -0.8, C.red); };
    const nx = 3, ny = 2, sx = fw / nx, sy = fh / ny;
    let k = 0;
    for (let j = 0; j < ny; j++) for (let i = -1; i <= nx; i++) {
      const cx = fx + (i + 0.5 + (j % 2 ? 0.5 : 0)) * sx, cy = fy + (j + 0.5) * sy;
      scenes[(k++ + j * 2) % scenes.length](cx, cy);
      bird(cx + sx * 0.3, cy - sy * 0.36, 1); bird(cx + sx * 0.38, cy - sy * 0.3, 0.7); sprig(cx - sx * 0.42, cy + sy * 0.32);
    }
    x.restore();
  });
}

// Moustiers faience: lambrequin swags hanging in from a blue border, a centre wreath of flowers and a bird, sprigs between.
function frnMoustiers(ctx, W, H) {
  const C = { white: '#f6f2e8', white2: '#ede6d4', blue: '#1f4aa0', blue2: '#7a96d4', ochre: '#d8a040', green: '#5a8a4a' };
  weavePicture(ctx, W, H, 120, Object.values(C), (x, cols, rows) => {
    const R = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
    R(0, 0, cols, rows, C.blue); R(4, 4, cols - 8, rows - 8, C.white); R(5, 5, cols - 10, 1, C.ochre); R(5, rows - 6, cols - 10, 1, C.ochre); R(5, 5, 1, rows - 10, C.ochre); R(cols - 6, 5, 1, rows - 10, C.ochre);
    R(7, 7, cols - 14, 3, C.blue); R(7, rows - 10, cols - 14, 3, C.blue); R(7, 7, 3, rows - 14, C.blue); R(cols - 10, 7, 3, rows - 14, C.blue);
    // lambrequins: lobed lappets hanging in from the band, filled with a lattice
    const lappet = (px, py, ang, s) => {
      x.save(); x.translate(px, py); x.rotate(ang);
      const shape = () => { x.beginPath(); x.moveTo(-6 * s, 0); x.lineTo(-6 * s, 4 * s); x.quadraticCurveTo(-6 * s, 8 * s, -2.4 * s, 8 * s); x.quadraticCurveTo(-1 * s, 12 * s, 0, 13 * s); x.quadraticCurveTo(1 * s, 12 * s, 2.4 * s, 8 * s); x.quadraticCurveTo(6 * s, 8 * s, 6 * s, 4 * s); x.lineTo(6 * s, 0); x.closePath(); };
      x.fillStyle = C.blue; shape(); x.fill();
      x.save(); shape(); x.clip(); x.fillStyle = C.white; x.fillRect(-5 * s, 1, 10 * s, 6.4 * s); x.strokeStyle = C.blue; x.lineWidth = 0.7; for (let k = -6; k <= 6; k += 2.4) { x.beginPath(); x.moveTo(k * s, 0); x.lineTo(k * s + 8 * s, 8 * s); x.moveTo(k * s, 0); x.lineTo(k * s - 8 * s, 8 * s); x.stroke(); } x.restore();
      x.fillStyle = C.ochre; x.beginPath(); x.arc(0, 10 * s, 1.2 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.blue; x.beginPath(); x.arc(9 * s, 4 * s, 1.2, 0, Math.PI * 2); x.fill(); x.fillRect(9 * s - 0.5, 0, 1, 4 * s);
      x.restore();
    };
    for (const [len, put] of [[cols - 40, (a) => { lappet(20 + a, 10, 0, 1); lappet(20 + a, rows - 10, Math.PI, 1); }], [rows - 40, (a) => { lappet(10, 20 + a, -Math.PI / 2, 1); lappet(cols - 10, 20 + a, Math.PI / 2, 1); }]]) { const { n, d } = evenSteps(len, 18); for (let i = 0; i <= n; i++) put(i * d); }
    for (const [px, py] of [[10, 10], [cols - 10, 10], [10, rows - 10], [cols - 10, rows - 10]]) { x.fillStyle = C.blue; x.beginPath(); x.arc(px, py, 5, 0, Math.PI * 2); x.fill(); rosette(x, px, py, 3.6, 6, C.white, C.ochre, C.blue); }
    // the centre: a wreath of flowers with a bird on a branch
    const cx = cols / 2, cy = rows / 2, rx = cols * 0.15, ry = rows * 0.22;
    x.strokeStyle = C.blue; x.lineWidth = 1.2; x.beginPath(); x.ellipse(cx, cy, rx + 4, ry + 4, 0, 0, Math.PI * 2); x.stroke(); x.lineWidth = 0.7; x.beginPath(); x.ellipse(cx, cy, rx + 6, ry + 6, 0, 0, Math.PI * 2); x.stroke();
    for (let k = 0; k < 18; k++) { const t = (k * Math.PI * 2) / 18; const px = cx + Math.cos(t) * rx, py = cy + Math.sin(t) * ry; if (k % 3 === 0) rosette(x, px, py, 3.2, 6, k % 2 ? C.blue2 : C.ochre, C.blue, C.white); else leaf(x, px, py, 4.4, t + Math.PI / 2, k % 2 ? C.green : C.blue, C.white); }
    x.strokeStyle = C.blue; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - 12, cy + 7); x.quadraticCurveTo(cx, cy + 2, cx + 12, cy + 6); x.stroke(); leaf(x, cx - 6, cy + 5, 4, 2.4, C.green); leaf(x, cx + 7, cy + 4.6, 4, -0.6, C.green);
    // the bird
    x.save(); x.translate(cx, cy); x.scale(1.6, 1.6); x.translate(-cx, -cy);
    x.fillStyle = C.blue2; x.beginPath(); x.ellipse(cx, cy - 1, 6.4, 3.6, -0.15, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.blue; x.beginPath(); x.ellipse(cx - 1, cy - 1.6, 3.6, 2, -0.3, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx - 5, cy); x.lineTo(cx - 11, cy - 2); x.lineTo(cx - 10, cy + 1); x.closePath(); x.fill();
    x.fillStyle = C.blue2; x.beginPath(); x.arc(cx + 5.6, cy - 3.6, 2.6, 0, Math.PI * 2); x.fill(); x.fillStyle = C.ochre; x.beginPath(); x.moveTo(cx + 8, cy - 4); x.lineTo(cx + 10, cy - 3.4); x.lineTo(cx + 8, cy - 2.8); x.fill(); R(cx + 6, cy - 4.4, 1, 1, C.blue);
    x.strokeStyle = C.blue; x.lineWidth = 0.7; x.beginPath(); x.moveTo(cx + 1, cy + 2.4); x.lineTo(cx + 1, cy + 4.4); x.moveTo(cx - 1, cy + 2.4); x.lineTo(cx - 1.4, cy + 4.4); x.stroke();
    x.restore();
    // little sprigs and insects scattered on the white
    for (const [a, b] of [[0.22, 0.32], [0.78, 0.32], [0.22, 0.68], [0.78, 0.68], [0.36, 0.22], [0.64, 0.78], [0.36, 0.78], [0.64, 0.22]]) { const px = cols * a, py = rows * b; x.strokeStyle = C.blue; x.lineWidth = 0.8; x.beginPath(); x.moveTo(px - 3, py + 2); x.lineTo(px + 3, py - 2); x.stroke(); leaf(x, px - 1, py + 0.6, 3, -2.2, C.green); leaf(x, px + 1, py - 0.6, 3, -0.6, C.blue2); x.fillStyle = C.ochre; x.beginPath(); x.arc(px + 3, py - 2, 1.2, 0, Math.PI * 2); x.fill(); }
  });
}

// The blue chairs of the Promenade des Anglais, turned to the Baie des Anges, the hills round the bay, a gull overhead.
function frnBlueChairs(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.38); sky.addColorStop(0, '#4f9ade'); sky.addColorStop(1, '#d4ecf8');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  // the far side of the bay: hills and white town
  ctx.fillStyle = '#9aa8b4'; ctx.beginPath(); ctx.moveTo(W * 0.45, H * 0.38); ctx.quadraticCurveTo(W * 0.62, H * 0.28, W * 0.8, H * 0.3); ctx.quadraticCurveTo(W * 0.92, H * 0.26, W, H * 0.29); ctx.lineTo(W, H * 0.4); ctx.lineTo(W * 0.45, H * 0.4); ctx.fill();
  ctx.fillStyle = '#efe8dc'; for (let k = 0; k < 18; k++) ctx.fillRect(W * (0.58 + k * 0.023), H * (0.355 - (k % 3) * 0.008), 1.6 * u, 1.6 * u);
  const sea = ctx.createLinearGradient(0, H * 0.38, 0, H * 0.62); sea.addColorStop(0, '#1f5aa0'); sea.addColorStop(0.7, '#2a9ac0'); sea.addColorStop(1, '#5ad0d0');
  ctx.fillStyle = sea; ctx.fillRect(0, H * 0.38, W, H * 0.26);
  ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let k = 0; k < 14; k++) ctx.fillRect(((k * 29) % 100) / 100 * W, H * (0.42 + (k % 5) * 0.04), 6 * u, 0.6 * u);
  ctx.fillStyle = '#f6fbff'; for (let px = 0; px < W; px += 3 * u) { ctx.beginPath(); ctx.arc(px, H * 0.625, 1.6 * u, Math.PI, 0); ctx.fill(); }
  // the pebble beach
  ctx.fillStyle = '#b8b0a2'; ctx.fillRect(0, H * 0.63, W, H * 0.08);
  ctx.fillStyle = '#9a9286'; for (let k = 0; k < 70; k++) { ctx.beginPath(); ctx.ellipse(((k * 37) % 100) / 100 * W, H * (0.64 + ((k * 13) % 7) / 100), 1.4 * u, 0.9 * u, 0, 0, Math.PI * 2); ctx.fill(); }
  // the promenade with its low railing
  ctx.fillStyle = '#ece6da'; ctx.fillRect(0, H * 0.71, W, H * 0.29);
  ctx.fillStyle = '#d8d0c2'; for (let k = 0; k < 6; k++) ctx.fillRect(0, H * (0.78 + k * 0.04), W, 0.4 * u);
  ctx.fillStyle = '#f6f4ee'; ctx.fillRect(0, H * 0.7, W, 1.6 * u); ctx.fillStyle = '#c8c2b6'; for (let k = 0; k * 6 * u < W; k++) ctx.fillRect(k * 6 * u, H * 0.66, 1 * u, H * 0.05); ctx.fillRect(0, H * 0.66, W, 0.8 * u);
  // a palm on the left
  ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 2.2 * u; ctx.beginPath(); ctx.moveTo(W * 0.06, H * 0.9); ctx.quadraticCurveTo(W * 0.09, H * 0.5, W * 0.07, H * 0.14); ctx.stroke();
  ctx.strokeStyle = '#3f7a3a'; ctx.lineWidth = 1.6 * u; for (let k = 0; k < 8; k++) { const a = Math.PI * 0.9 + (k * Math.PI * 1.2) / 7; ctx.beginPath(); ctx.moveTo(W * 0.07, H * 0.14); ctx.quadraticCurveTo(W * 0.07 + Math.cos(a) * 8 * u, H * 0.14 + Math.sin(a) * 8 * u - 3 * u, W * 0.07 + Math.cos(a) * 14 * u, H * 0.14 + Math.sin(a) * 6 * u + 5 * u); ctx.stroke(); }
  // the chairs, seen from behind, facing the sea
  const chair = (cx, base, s) => {
    const k = s * u;
    ctx.fillStyle = 'rgba(80,70,60,.25)'; ctx.beginPath(); ctx.ellipse(cx + 3 * k, base, 10 * k, 2 * k, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1f5aa8'; ctx.lineCap = 'round';
    ctx.lineWidth = 1.4 * k; for (const d of [-6, 6]) { ctx.beginPath(); ctx.moveTo(cx + d * k, base); ctx.lineTo(cx + d * 0.9 * k, base - 9 * k); ctx.stroke(); }
    ctx.lineWidth = 1.2 * k; for (const d of [-5, 5]) { ctx.beginPath(); ctx.moveTo(cx + d * k + 2 * k, base - 2 * k); ctx.lineTo(cx + d * k + 2.4 * k, base - 9 * k); ctx.stroke(); }
    ctx.fillStyle = '#2a6ab8'; ctx.beginPath(); ctx.moveTo(cx - 7 * k, base - 9 * k); ctx.lineTo(cx + 7 * k, base - 9 * k); ctx.lineTo(cx + 8 * k, base - 11 * k); ctx.lineTo(cx - 6 * k, base - 11 * k); ctx.fill();
    ctx.lineWidth = 1.6 * k; ctx.strokeStyle = '#1f5aa8'; for (const d of [-6.6, 6.6]) { ctx.beginPath(); ctx.moveTo(cx + d * k, base - 9 * k); ctx.lineTo(cx + d * 1.05 * k, base - 24 * k); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(cx - 6.9 * k, base - 24 * k); ctx.quadraticCurveTo(cx, base - 26 * k, cx + 6.9 * k, base - 24 * k); ctx.stroke();
    ctx.lineWidth = 1.8 * k; for (let s2 = 0; s2 < 5; s2++) { ctx.beginPath(); ctx.moveTo(cx - 6.6 * k, base - (12 + s2 * 2.6) * k); ctx.lineTo(cx + 6.6 * k, base - (12 + s2 * 2.6) * k); ctx.stroke(); }
    ctx.lineWidth = 1.2 * k; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + d * 6.8 * k, base - 16 * k); ctx.quadraticCurveTo(cx + d * 9.6 * k, base - 16 * k, cx + d * 9 * k, base - 11 * k); ctx.stroke(); }
  };
  chair(W * 0.3, H * 0.97, 1.15); chair(W * 0.56, H * 0.94, 1.05); chair(W * 0.8, H * 0.96, 1.1);
  // a gull
  ctx.strokeStyle = '#f6f6f2'; ctx.lineWidth = 1 * u; ctx.beginPath(); ctx.moveTo(W * 0.4, H * 0.16); ctx.quadraticCurveTo(W * 0.42, H * 0.12, W * 0.44, H * 0.16); ctx.quadraticCurveTo(W * 0.46, H * 0.12, W * 0.48, H * 0.15); ctx.stroke();
}

// Roussillon's ochre cliffs: fluted orange and red rock under a deep blue sky, dark pines, the village on the ridge.
function frnRoussillon(ctx, W, H) {
  const u = H / 100, rnd = rng(61);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.4); sky.addColorStop(0, '#2f6ec8'); sky.addColorStop(1, '#bfe0f4');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  // the ridge with the village
  ctx.fillStyle = '#4f6a3a'; ctx.beginPath(); ctx.moveTo(0, H * 0.3); ctx.quadraticCurveTo(W * 0.2, H * 0.2, W * 0.42, H * 0.24); ctx.quadraticCurveTo(W * 0.7, H * 0.3, W, H * 0.26); ctx.lineTo(W, H * 0.5); ctx.lineTo(0, H * 0.5); ctx.fill();
  for (let k = 0; k < 9; k++) { const px = W * (0.12 + k * 0.035), py = H * (0.22 + Math.abs(k - 4) * 0.008), w = (3 + (k % 3)) * u, h = (3 + (k % 2) * 1.6) * u; ctx.fillStyle = ['#e8a050', '#f0c070', '#d8783a'][k % 3]; ctx.fillRect(px, py - h, w, h + 2 * u); ctx.fillStyle = '#b8502a'; ctx.beginPath(); ctx.moveTo(px - 0.4 * u, py - h); ctx.lineTo(px + w / 2, py - h - 1.4 * u); ctx.lineTo(px + w + 0.4 * u, py - h); ctx.fill(); ctx.fillStyle = '#5a7a9a'; ctx.fillRect(px + w * 0.3, py - h + 1 * u, 0.9 * u, 1.2 * u); }
  // the cliffs: layered ridges, each fluted with vertical streaks
  const band = (y0, amp, col, dark, seed) => {
    const top = (px) => H * y0 - amp * u * (0.5 + 0.5 * Math.sin(px / W * 9 + seed)) - (Math.sin(px / W * 31 + seed * 2) > 0.6 ? 4 * u : 0);
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let px = 0; px <= W; px += 1.5 * u) ctx.lineTo(px, top(px)); ctx.lineTo(W, H); ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1 * u; for (let px = 0; px <= W; px += 3.2 * u) { const t = top(px); ctx.beginPath(); ctx.moveTo(px, t + 1 * u); ctx.lineTo(px + (rnd() - 0.5) * 1.6 * u, t + (6 + rnd() * 10) * u); ctx.stroke(); }
  };
  band(0.44, 10, '#f0a040', '#d8782a', 0.4);
  band(0.56, 12, '#d8581e', '#b8401a', 1.7);
  band(0.7, 10, '#e8782a', '#c4561e', 3.1);
  band(0.84, 6, '#f6c060', '#e0a040', 4.4);
  // pines
  const pine = (px, py, s) => { ctx.strokeStyle = '#4a3020'; ctx.lineWidth = 1.2 * s * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 1 * s * u, py - 8 * s * u); ctx.stroke(); ctx.fillStyle = '#244a2a'; ctx.beginPath(); ctx.ellipse(px + 1 * s * u, py - 10 * s * u, 6 * s * u, 3.4 * s * u, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#3a6a3a'; ctx.beginPath(); ctx.ellipse(px, py - 11 * s * u, 3.4 * s * u, 1.6 * s * u, 0, 0, Math.PI * 2); ctx.fill(); };
  for (const [a, b, s] of [[0.06, 0.38, 0.8], [0.3, 0.36, 0.7], [0.55, 0.38, 0.8], [0.8, 0.36, 0.7], [0.18, 0.5, 1], [0.66, 0.5, 1.1], [0.42, 0.62, 1.2], [0.9, 0.64, 1.2], [0.08, 0.78, 1.5], [0.86, 0.94, 1.8]]) pine(W * a, H * b, s);
  // green scrub on the sand in front
  ctx.fillStyle = '#6a8a3a'; for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.ellipse(W * (0.2 + ((k * 37) % 60) / 100), H * (0.9 + (k % 3) * 0.03), 3 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill(); }
}

// The white horses of the Camargue galloping through the marsh water, flamingos and reeds behind them.
function frnCamargue(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45); sky.addColorStop(0, '#8ab8e0'); sky.addColorStop(1, '#f2e2c8');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#8a9a6a'; ctx.fillRect(0, H * 0.42, W, H * 0.06);
  ctx.fillStyle = '#b8a86a'; for (let k = 0; k * 1.4 * u < W; k++) ctx.fillRect(k * 1.4 * u, H * (0.38 + ((k * 7) % 5) * 0.008), 0.6 * u, H * 0.06);
  const water = ctx.createLinearGradient(0, H * 0.48, 0, H); water.addColorStop(0, '#9ac4d8'); water.addColorStop(1, '#5a96b8');
  ctx.fillStyle = water; ctx.fillRect(0, H * 0.48, W, H * 0.52);
  ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let k = 0; k < 16; k++) ctx.fillRect(((k * 31) % 100) / 100 * W, H * (0.52 + (k % 6) * 0.07), 8 * u, 0.6 * u);
  // flamingos standing in the far water
  const flamingo = (px, py, s, f) => {
    const k = s * u; ctx.save(); ctx.translate(px, py); ctx.scale(f, 1);
    ctx.strokeStyle = '#e8708a'; ctx.lineWidth = 0.6 * k; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 8 * k); ctx.stroke();
    ctx.fillStyle = '#f29aa8'; ctx.beginPath(); ctx.ellipse(0, -1 * k, 3.6 * k, 2 * k, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f29aa8'; ctx.lineWidth = 0.9 * k; ctx.beginPath(); ctx.moveTo(2.6 * k, -2 * k); ctx.quadraticCurveTo(5 * k, -5 * k, 3 * k, -7 * k); ctx.quadraticCurveTo(1.4 * k, -9 * k, 3.4 * k, -10 * k); ctx.stroke();
    ctx.fillStyle = '#2a2a2e'; ctx.beginPath(); ctx.moveTo(3.4 * k, -10.4 * k); ctx.lineTo(5.4 * k, -9.4 * k); ctx.lineTo(4 * k, -9 * k); ctx.fill();
    ctx.fillStyle = '#d84a6a'; ctx.beginPath(); ctx.ellipse(-1 * k, -0.6 * k, 1.6 * k, 0.9 * k, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };
  for (const [a, s, f] of [[0.08, 1, 1], [0.14, 0.9, -1], [0.82, 1.1, 1], [0.88, 1, -1], [0.93, 0.95, 1]]) flamingo(W * a, H * 0.5, s, f);
  // the horses, galloping left
  const horse = (hx, hy, s) => {
    const k = s * u;
    ctx.save(); ctx.translate(hx, hy);
    ctx.fillStyle = 'rgba(40,70,90,.25)'; ctx.beginPath(); ctx.ellipse(1 * k, 13 * k, 14 * k, 2 * k, 0, 0, Math.PI * 2); ctx.fill();
    const leg = (pts, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.2 * k; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(a * k, b * k) : ctx.moveTo(a * k, b * k))); ctx.stroke(); };
    leg([[6, 3], [11, 8], [16, 10]], '#c8ccd2'); leg([[-6, 3], [-9, 8], [-12, 11]], '#c8ccd2');
    ctx.strokeStyle = '#d8dce2'; ctx.lineWidth = 3 * k; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10 * k, -3 * k); ctx.quadraticCurveTo(18 * k, -5 * k, 22 * k, 1 * k); ctx.stroke();
    ctx.fillStyle = '#f2f4f6'; ctx.beginPath(); ctx.ellipse(1 * k, 0, 11 * k, 5.4 * k, -0.08, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-4 * k, -4 * k); ctx.quadraticCurveTo(-9 * k, -9 * k, -11 * k, -13 * k); ctx.lineTo(-13 * k, -13.6 * k); ctx.lineTo(-19 * k, -8.6 * k); ctx.lineTo(-19.6 * k, -6.4 * k); ctx.lineTo(-17 * k, -5.6 * k); ctx.lineTo(-13.4 * k, -7.4 * k); ctx.quadraticCurveTo(-11 * k, -2 * k, -9 * k, 3 * k); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-12.4 * k, -12 * k); ctx.lineTo(-12 * k, -14.4 * k); ctx.lineTo(-10.8 * k, -12 * k); ctx.fill();
    ctx.fillStyle = '#d4d8de'; ctx.beginPath(); ctx.ellipse(1 * k, 2.6 * k, 9 * k, 2.4 * k, -0.08, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#b8bcc4'; ctx.lineWidth = 2.2 * k; ctx.beginPath(); ctx.moveTo(-11 * k, -13 * k); ctx.quadraticCurveTo(-6 * k, -12 * k, -3 * k, -5 * k); ctx.stroke(); ctx.lineWidth = 1.2 * k; ctx.beginPath(); ctx.moveTo(-9 * k, -11 * k); ctx.lineTo(-5 * k, -12 * k); ctx.moveTo(-6 * k, -8 * k); ctx.lineTo(-2 * k, -9 * k); ctx.stroke();
    ctx.fillStyle = '#3a3a40'; ctx.beginPath(); ctx.arc(-14 * k, -8.6 * k, 0.6 * k, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(-17.6 * k, -5.8 * k, 0.5 * k, 0, Math.PI * 2); ctx.fill();
    leg([[7, 3], [6, 8], [4, 12]], '#f2f4f6'); leg([[-7, 3], [-13, 7], [-17, 10]], '#f2f4f6');
    // the splash
    ctx.fillStyle = 'rgba(255,255,255,.85)'; for (const [a, b, r] of [[-15, 12, 1.6], [-12, 13, 1.2], [12, 12, 1.6], [15, 12.6, 1.2], [-18, 11, 1], [18, 11.4, 1], [0, 13, 1.4]]) { ctx.beginPath(); ctx.arc(a * k, b * k, r * k, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  };
  horse(W * 0.36, H * 0.6, 1.2); horse(W * 0.66, H * 0.7, 1.4); horse(W * 0.24, H * 0.8, 1.35);
  // reeds in the foreground corner
  ctx.strokeStyle = '#8a8a4a'; ctx.lineWidth = 0.8 * u; for (let k = 0; k < 14; k++) { const px = W * (0.86 + k * 0.012); ctx.beginPath(); ctx.moveTo(px, H); ctx.quadraticCurveTo(px - 1 * u, H * 0.85, px - 2 * u + (k % 3) * u, H * (0.7 + (k % 4) * 0.03)); ctx.stroke(); }
  ctx.fillStyle = '#7a5a3a'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(W * (0.865 + k * 0.03), H * (0.7 + (k % 2) * 0.04), 0.9 * u, 2.6 * u, 0, 0, Math.PI * 2); ctx.fill(); }
}

// ---------- USA pack: woven, pieced and knotted rugs (restored from the earlier drafts) ----------
// Dashed stitching around a rectangle; each side starts and ends on a stitch, so the corners join up.
function stitchRect(ctx, x, y, w, h, step, thick, color) {
  ctx.fillStyle = color;
  const side = (x0, y0, len, horiz) => {
    const { n, d } = evenSteps(len, step), l = d * 0.58;
    for (let i = 0; i <= n; i++) {
      // first and last stitch are centred on the corner so the two sides meet in one stitch
      const a = i * d - l / 2, a0 = Math.max(0, a), a1 = Math.min(len, a + l);
      if (a1 <= a0) continue;
      if (horiz) ctx.fillRect(x0 + a0 - (i === 0 ? thick / 2 : 0), y0 - thick / 2, a1 - a0 + (i === 0 || i === n ? thick / 2 : 0), thick);
      else ctx.fillRect(x0 - thick / 2, y0 + a0 - (i === 0 ? thick / 2 : 0), thick, a1 - a0 + (i === 0 || i === n ? thick / 2 : 0));
    }
  };
  side(x, y, w, true); side(x, y + h, w, true); side(x, y, h, false); side(x + w, y, h, false);
}
// A sun-faded flag woven as a rug: 13 stripes, a 50-star canton, a narrow navy binding with a stitched edge.
function americaFlag(ctx, W, H, seed) {
  const R = rng(seed + 13);
  const C = { red: '#9e2b2f', red2: '#8a2428', cream: '#ece0c4', navy: '#20304f', navy2: '#1a2843', star: '#f1e7cf', bind: '#182238' };
  const u = H / 100, b = 4.2 * u; // binding width
  ctx.fillStyle = C.bind; ctx.fillRect(0, 0, W, H);
  const x0 = b, y0 = b, fw = W - 2 * b, fh = H - 2 * b, sh = fh / 13;
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = i % 2 ? C.cream : (i % 4 === 0 ? C.red : C.red2);
    ctx.fillRect(x0, y0 + i * sh, fw, sh + 0.5);
  }
  const cw = fw * 0.4, ch = sh * 7;
  ctx.fillStyle = C.navy; ctx.fillRect(x0, y0, cw, ch);
  // faint woven rows in the canton
  ctx.fillStyle = C.navy2; for (let y = 0; y < ch; y += 0.9 * u) if ((y / (0.9 * u)) % 2 < 1) ctx.fillRect(x0, y0 + y, cw, 0.45 * u);
  ctx.fillStyle = C.star;
  for (let row = 0; row < 9; row++) {
    const n = row % 2 ? 5 : 6;
    for (let k = 0; k < n; k++) {
      const sx = x0 + cw * ((row % 2 ? 2 : 1) + k * 2) / 12, sy = y0 + ch * (row + 1) / 10;
      star5(ctx, sx, sy, ch * 0.042, -Math.PI / 2 + (R() - 0.5) * 0.08);
    }
  }
  // sun fading toward one corner, the way an old rug in a window gets
  const fade = ctx.createLinearGradient(0, 0, W, H);
  fade.addColorStop(0, 'rgba(255,240,215,0)'); fade.addColorStop(1, 'rgba(255,240,215,.13)');
  ctx.fillStyle = fade; ctx.fillRect(0, 0, W, H);
  // stitched edge on the binding
  stitchRect(ctx, b * 0.5, b * 0.5, W - b, H - b, 2.2 * u, 0.4 * u, 'rgba(236,224,196,.72)');
}

// Southwestern desert kilim: sand field, stepped diamonds in terracotta, turquoise and black, lightning-zigzag borders.
function americaMesa(ctx, W, H) {
  const C = { sand: '#d8c09a', sand2: '#cdb48b', terra: '#b4532f', rust: '#8e3b22', turq: '#3f9a92', black: '#1d1714', cream: '#f0e5cc', ochre: '#c98f37' };
  const g = knotGrid(ctx, W, H, 72), { cols, rows, blk } = g;
  ctx.fillStyle = C.sand; ctx.fillRect(0, 0, W, H);
  for (let y = 0; y < rows; y++) if (y % 6 === 0) for (let x = 0; x < cols; x++) blk(x, y, C.sand2); // lazy lines
  // outer bands
  const band = (k, c) => { for (let x = k; x < cols - k; x++) { blk(x, k, c); blk(x, rows - 1 - k, c); } for (let y = k; y < rows - k; y++) { blk(k, y, c); blk(cols - 1 - k, y, c); } };
  band(0, C.black); band(1, C.black); band(2, C.terra); band(3, C.terra); band(4, C.cream);
  // zigzag lightning band (rows/cols 5..9) between square corner blocks that each hold a small stepped diamond;
  // every side holds a whole number of zigzags so they end the same way at both corners
  const zig = (len) => { const n = Math.max(1, Math.round(len / 8)), per = len / n; return (i) => Math.round(Math.abs(((i % per) / per) * 8 - 4)); };
  const zx = zig(cols - 20), zy = zig(rows - 20);
  for (let x = 10; x < cols - 10; x++) {
    const h = zx(x - 10);
    for (const [y, c] of [[5 + h, C.black], [6 + h, C.turq]]) if (y <= 9) { blk(x, y, c); blk(x, rows - 1 - y, c); }
  }
  for (let y = 10; y < rows - 10; y++) {
    const h = zy(y - 10);
    for (const [x, c] of [[5 + h, C.black], [6 + h, C.turq]]) if (x <= 9) { blk(x, y, c); blk(cols - 1 - x, y, c); }
  }
  for (const [cx, cy] of [[7, 7], [cols - 8, 7], [7, rows - 8], [cols - 8, rows - 8]]) {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const d = Math.abs(dx) + Math.abs(dy);
      if (d <= 2) blk(cx + dx, cy + dy, d === 2 ? C.black : d === 1 ? C.turq : C.terra);
    }
  }
  band(10, C.rust);
  // stepped diamond with outline, filled in rings
  const diamond = (cx, cy, n, ring) => {
    for (let dy = -n; dy <= n; dy++) {
      const w = n - Math.abs(dy);
      for (let dx = -w; dx <= w; dx++) {
        const d = Math.abs(dx) + Math.abs(dy);
        blk(cx + dx, cy + dy, d >= n - 1 ? C.black : ring[Math.floor((n - d) / 2) % ring.length]);
      }
    }
  };
  const ix = 12, iy = 12, iw = cols - 2 * ix, ih = rows - 2 * iy, midY = iy + Math.floor(ih / 2);
  const n = Math.floor(ih / 2) - 3;
  diamond(Math.floor(cols / 2), midY, n, [C.cream, C.terra, C.turq, C.ochre, C.black, C.cream]);
  // side diamonds, fully inside the field, and small ones above and below the arrows
  const side = Math.floor(n * 0.55), cxm = Math.floor(cols / 2);
  const leftC = ix + side + 3, rightC = cols - ix - side - 4;
  for (const cx of [leftC, rightC]) diamond(cx, midY, side, [C.turq, C.cream, C.terra]);
  // arrows centred in the gaps between the side diamonds and the big one, pointing outward
  for (const [a, bnd, dir] of [[leftC + side, cxm - n, -1], [rightC - side, cxm + n, 1]]) {
    const ax = Math.round((a + bnd) / 2), half = Math.max(2, Math.floor(Math.abs(bnd - a) / 2) - 3);
    for (let k = -half; k <= half; k++) blk(ax + k, midY, C.black);
    for (let k = 1; k <= 2; k++) { blk(ax + dir * (half - k), midY - k, C.black); blk(ax + dir * (half - k), midY + k, C.black); }
    for (let k = 0; k < 2; k++) { blk(ax - dir * (half - k), midY - 1, C.terra); blk(ax - dir * (half - k), midY + 1, C.terra); }
    for (const oy of [-Math.round(ih * 0.3), Math.round(ih * 0.3)]) diamond(ax, midY + oy, 3, [C.terra, C.cream]);
  }
}

// Patchwork quilt made into a rug: log-cabin blocks in calico colours, a sawtooth border, running-stitch quilting.
function americaQuilt(ctx, W, H, seed) {
  const R = rng(seed + 51);
  const fabrics = ['#9b2f2f', '#c4683a', '#d9a940', '#2f4b6e', '#5d7f62', '#7a4b6e', '#e9dcc0', '#b9c7cf'];
  const C = { border: '#24365a', saw1: '#e9dcc0', saw2: '#9b2f2f', center: '#b8312f', stitch: 'rgba(250,240,220,.55)' };
  const u = H / 100, bw = 9 * u;
  ctx.fillStyle = C.border; ctx.fillRect(0, 0, W, H);
  // sawtooth triangles between square corner blocks; each side fits a whole number of teeth
  const cb = bw * 0.9, m = bw * 0.05; // corner block size and margin
  const teeth = (x0, y0, len, horiz, flip) => {
    const { n, d } = evenSteps(len, 4.5 * u), depth = cb * 0.62;
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = k % 2 ? C.saw1 : C.saw2;
      ctx.beginPath();
      if (horiz) { const x = x0 + k * d; ctx.moveTo(x, y0); ctx.lineTo(x + d, y0); ctx.lineTo(x + d / 2, y0 + flip * depth); }
      else { const y = y0 + k * d; ctx.moveTo(x0, y); ctx.lineTo(x0, y + d); ctx.lineTo(x0 + flip * depth, y + d / 2); }
      ctx.closePath(); ctx.fill();
    }
  };
  const top = m + cb * 0.19, bot = H - m - cb * 0.19, lft = m + cb * 0.19, rgt = W - m - cb * 0.19;
  teeth(m + cb, top, W - 2 * (m + cb), true, 1); teeth(m + cb, bot, W - 2 * (m + cb), true, -1);
  teeth(lft, m + cb, H - 2 * (m + cb), false, 1); teeth(rgt, m + cb, H - 2 * (m + cb), false, -1);
  // corner blocks: a little four-patch with a navy centre
  for (const [x, y] of [[m, m], [W - m - cb, m], [m, H - m - cb], [W - m - cb, H - m - cb]]) {
    const q = cb / 2;
    ctx.fillStyle = C.saw1; ctx.fillRect(x, y, q, q); ctx.fillRect(x + q, y + q, q, q);
    ctx.fillStyle = C.saw2; ctx.fillRect(x + q, y, q, q); ctx.fillRect(x, y + q, q, q);
    ctx.fillStyle = C.border; ctx.fillRect(x + q * 0.6, y + q * 0.6, q * 0.8, q * 0.8);
  }
  // log cabin blocks
  const fx = bw, fy = bw, fw = W - 2 * bw, fh = H - 2 * bw;
  const bc = 6, br = 4, bwid = fw / bc, bhei = fh / br;
  const calico = (x, y, w, h, col) => {
    ctx.fillStyle = col; ctx.fillRect(x, y, w + 0.5, h + 0.5);
    ctx.fillStyle = 'rgba(255,255,255,.18)'; // tiny print
    for (let yy = y + 0.6 * u; yy < y + h; yy += 1.3 * u) for (let xx = x + 0.6 * u + ((yy / u) % 2) * 0.6 * u; xx < x + w; xx += 1.3 * u) { ctx.beginPath(); ctx.arc(xx, yy, 0.18 * u, 0, Math.PI * 2); ctx.fill(); }
  };
  for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) {
    const x = fx + i * bwid, y = fy + j * bhei;
    const light = [fabrics[6], fabrics[7], fabrics[2]], dark = [fabrics[0], fabrics[3], fabrics[4], fabrics[5], fabrics[1]];
    const steps = 4, sx = bwid / (2 * steps + 1), sy = bhei / (2 * steps + 1);
    // logs spiral outward: light on two sides, dark on the other two (classic log cabin light/dark split)
    for (let k = steps; k >= 1; k--) {
      const pick = (arr) => arr[Math.floor(R() * arr.length)];
      const L = pick(light), D = pick(dark);
      const ox = x + (steps - k) * sx, oy = y + (steps - k) * sy, ow = bwid - 2 * (steps - k) * sx, oh = bhei - 2 * (steps - k) * sy;
      calico(ox, oy, ow, sy, (i + j) % 2 ? L : D);            // top
      calico(ox, oy + oh - sy, ow, sy, (i + j) % 2 ? D : L);  // bottom
      calico(ox, oy + sy, sx, oh - 2 * sy, (i + j) % 2 ? L : D);       // left
      calico(ox + ow - sx, oy + sy, sx, oh - 2 * sy, (i + j) % 2 ? D : L); // right
    }
    ctx.fillStyle = C.center; ctx.fillRect(x + steps * sx, y + steps * sy, sx + 0.5, sy + 0.5); // red hearth in the middle
  }
  // running-stitch quilting along the block seams
  ctx.strokeStyle = C.stitch; ctx.lineWidth = 0.32 * u; ctx.setLineDash([1.1 * u, 0.9 * u]);
  for (let i = 0; i <= bc; i++) { ctx.beginPath(); ctx.moveTo(fx + i * bwid, fy); ctx.lineTo(fx + i * bwid, fy + fh); ctx.stroke(); }
  for (let j = 0; j <= br; j++) { ctx.beginPath(); ctx.moveTo(fx, fy + j * bhei); ctx.lineTo(fx + fw, fy + j * bhei); ctx.stroke(); }
  ctx.setLineDash([]);
}

// A woven landscape: a desert canyon at sunset. Banded sky, a stepped sun on the horizon, layers of mesas getting
// warmer and closer, a river winding through the desert floor and saguaros in front, all on the knot grid.
function americaCanyon(ctx, W, H, seed) {
  const R = rng(seed + 66);
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { frame: '#2a1a14', line: '#ecdcbc', tooth: '#c2562a',
    sky: ['#2b2350', '#43306a', '#6b3b78', '#9c3f6e', '#cf5a55', '#e9814a', '#f2a74a', '#f6c766'],
    sun: '#ffe08a', sun2: '#fbd06a', far: '#7a4a6e', far2: '#8f5674', mid: '#a5442e', mid2: '#8a3826', midTop: '#c2603a',
    near: '#c98a4a', near2: '#b5773c', sand: '#d9a65c', river: '#4aa6a3', river2: '#2f7f86', cactus: '#2f4a33', cactus2: '#24392a', bird: '#2a1a24' };
  // border: dark frame, cream line, terracotta stepped teeth (whole number per side, mirrored at the corners)
  const fb = 4;
  ctx.fillStyle = C.frame; ctx.fillRect(0, 0, W, H);
  const x0 = fb + 1, y0 = fb + 1, x1 = cols - fb - 2, y1 = rows - fb - 2; // field, inclusive
  for (let x = fb; x <= cols - fb - 1; x++) { blk(x, fb, C.line); blk(x, rows - fb - 1, C.line); }
  for (let y = fb; y <= rows - fb - 1; y++) { blk(fb, y, C.line); blk(cols - fb - 1, y, C.line); }
  const teethRow = (len, put) => { const n = Math.max(1, Math.round(len / 4)), per = len / n; for (let i = 0; i < len; i++) { const ph = (i % per) / per; const h = ph < 0.5 ? Math.round(ph * 4) : Math.round((1 - ph) * 4); for (let k = 0; k < Math.min(2, h); k++) put(i, k); } };
  teethRow(cols - 2 * fb - 2, (i, k) => { blk(fb + 1 + i, 1 + k, C.tooth); blk(fb + 1 + i, rows - 2 - k, C.tooth); });
  teethRow(rows - 2 * fb - 2, (i, k) => { blk(1 + k, fb + 1 + i, C.tooth); blk(cols - 2 - k, fb + 1 + i, C.tooth); });
  for (const [cx, cy] of [[2, 2], [cols - 3, 2], [2, rows - 3], [cols - 3, rows - 3]]) { blk(cx, cy, C.tooth); blk(cx - 1, cy, C.tooth); blk(cx + 1, cy, C.tooth); blk(cx, cy - 1, C.tooth); blk(cx, cy + 1, C.tooth); }

  const fw = x1 - x0 + 1, fh = y1 - y0 + 1;
  const horizon = y0 + Math.round(fh * 0.56);
  // sky: woven bands, each band's edge jitters a knot so it reads as weaving, not a gradient
  for (let y = y0; y < horizon; y++) {
    for (let x = x0; x <= x1; x++) {
      const t = (y - y0) / (horizon - y0);
      const band = Math.min(C.sky.length - 1, Math.floor(t * C.sky.length + (((x * 7 + y * 3) % 5) - 2) * 0.06));
      blk(x, y, C.sky[Math.max(0, band)]);
    }
  }
  // stars in the dark top bands
  for (let i = 0; i < 26; i++) { const x = x0 + Math.floor(R() * fw), y = y0 + Math.floor(R() * (horizon - y0) * 0.28); blk(x, y, '#e8dcf0'); }
  // sun sitting on the horizon, with stepped rays
  const sx = x0 + Math.round(fw * 0.62), sr = Math.round(fh * 0.13);
  for (let dy = -sr; dy <= 0; dy++) for (let dx = -sr; dx <= sr; dx++) if (dx * dx + dy * dy <= sr * sr) blk(sx + dx, horizon + dy, (dx * dx + dy * dy) > (sr - 2) * (sr - 2) ? C.sun2 : C.sun);
  for (let k = 0; k < 7; k++) {
    const a = Math.PI * (0.12 + k * 0.127), r0 = sr + 2, r1 = sr + 4 + (k % 2 ? 1 : 3);
    for (let r = r0; r <= r1; r++) blk(sx + Math.round(Math.cos(a) * r), horizon - Math.round(Math.sin(a) * r), C.sun2);
  }
  // a stepped skyline: heights per column from a few flat-topped mesas (plateau, cliff, plateau)
  const ridge = (base, peaks, jag) => {
    const h = new Array(cols).fill(0);
    for (const [cx, w, top] of peaks) for (let x = Math.round(cx - w / 2); x <= Math.round(cx + w / 2); x++) if (x >= x0 && x <= x1) {
      const edge = Math.min(x - (cx - w / 2), (cx + w / 2) - x);
      h[x] = Math.max(h[x], Math.min(top, Math.floor(edge * jag) + 1));
    }
    return (x) => base - h[x];
  };
  const fill = (top, bottom, c1, c2, shade) => { for (let x = x0; x <= x1; x++) for (let y = Math.max(y0, top(x)); y <= Math.min(y1, bottom); y++) blk(x, y, (shade && (x + y) % 9 === 0) || y === top(x) ? c2 : c1); };
  const far = ridge(horizon + 1, [[x0 + fw * 0.12, fw * 0.22, 8], [x0 + fw * 0.4, fw * 0.16, 6], [x0 + fw * 0.86, fw * 0.24, 9]], 1.6);
  fill((x) => Math.min(far(x), horizon), horizon + 9, C.far, C.far2, false); // no gap under the sky
  const mid = ridge(horizon + 6, [[x0 + fw * 0.22, fw * 0.3, 13], [x0 + fw * 0.7, fw * 0.2, 10], [x0 + fw * 0.98, fw * 0.18, 12]], 2.2);
  fill(mid, horizon + 9, C.mid, C.midTop, true);
  // cliff stripes (rock strata) on the mid mesas
  for (let x = x0; x <= x1; x++) for (let y = mid(x) + 2; y <= horizon + 9; y += 3) blk(x, y, C.mid2);
  // desert floor
  for (let y = horizon + 10; y <= y1; y++) for (let x = x0; x <= x1; x++) blk(x, y, (y - horizon) % 5 === 0 && (x + y) % 3 ? C.near2 : y > horizon + 18 ? C.sand : C.near);
  // river: a winding band from the sun's reflection down to the bottom
  for (let y = horizon + 10; y <= y1; y++) {
    const t = (y - horizon - 10) / (y1 - horizon - 10);
    const cx = Math.round(sx - t * fw * 0.32 + Math.sin(t * 6) * fw * 0.05), w = 1 + Math.round(t * 5);
    for (let dx = -w; dx <= w; dx++) blk(cx + dx, y, Math.abs(dx) === w ? C.river2 : (y % 4 === 0 && dx === 0 ? C.sun : C.river));
  }
  // saguaros: trunk with two arms
  const saguaro = (cx, by, h, flip) => {
    for (let y = 0; y < h; y++) { blk(cx, by - y, C.cactus); blk(cx + 1, by - y, C.cactus2); }
    const a1 = Math.round(h * 0.42), a2 = Math.round(h * 0.58), al = Math.max(3, Math.round(h * 0.26)), out = Math.max(2, Math.round(h * 0.1));
    for (let k = 1; k <= out; k++) { blk(cx - k * flip, by - a1, C.cactus); blk(cx - k * flip, by - a1 + 1, C.cactus2); }
    for (let y = 0; y < al; y++) { blk(cx - out * flip, by - a1 - y, C.cactus); blk(cx - (out - 1) * flip, by - a1 - y, C.cactus); }
    for (let k = 1; k <= out; k++) { blk(cx + 1 + k * flip, by - a2, C.cactus2); blk(cx + 1 + k * flip, by - a2 + 1, C.cactus); }
    for (let y = 0; y < al - 1; y++) { blk(cx + 1 + out * flip, by - a2 - y, C.cactus2); blk(cx + out * flip, by - a2 - y, C.cactus2); }
  };
  saguaro(x0 + Math.round(fw * 0.1), y1 - 2, Math.round(fh * 0.3), 1);
  saguaro(x0 + Math.round(fw * 0.86), y1 - 1, Math.round(fh * 0.26), -1);
  saguaro(x0 + Math.round(fw * 0.32), horizon + 18, Math.round(fh * 0.12), 1);
  // two birds
  for (const [bx, by] of [[x0 + Math.round(fw * 0.3), y0 + Math.round(fh * 0.22)], [x0 + Math.round(fw * 0.36), y0 + Math.round(fh * 0.17)]]) {
    blk(bx, by, C.bird); blk(bx - 1, by - 1, C.bird); blk(bx - 2, by - 1, C.bird); blk(bx + 1, by - 1, C.bird); blk(bx + 2, by - 1, C.bird);
  }
}

// ---------- woven pictures ----------
// Draw a scene with ordinary canvas shapes on a tiny canvas (one pixel per knot), snap every pixel to the rug's
// palette, then lay it down knot by knot: smooth shapes come out with the stepped edges of a hand-knotted rug.
function weavePicture(ctx, W, H, rowsWanted, palette, draw) {
  const g = knotGrid(ctx, W, H, rowsWanted), { cols, rows, blk } = g;
  const c = document.createElement('canvas'); c.width = cols; c.height = rows;
  const x = c.getContext('2d');
  draw(x, cols, rows);
  const d = x.getImageData(0, 0, cols, rows).data;
  const pal = palette.map((h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), h]);
  for (let i = 0; i < cols * rows; i++) {
    const r = d[i * 4], gg = d[i * 4 + 1], b = d[i * 4 + 2];
    let best = pal[0], bd = Infinity;
    for (const p of pal) { const e = (p[0] - r) ** 2 + (p[1] - gg) ** 2 + (p[2] - b) ** 2; if (e < bd) { bd = e; best = p; } }
    blk(i % cols, (i / cols) | 0, best[3]);
  }
  return g;
}

// Border shared by the picture rugs: dark band, cream line, and a whole number of little diamonds per side with a
// star in each corner.
function pictureBorder(x, cols, rows, C) {
  x.fillStyle = C.frame; x.fillRect(0, 0, cols, rows);
  x.fillStyle = C.line; x.fillRect(5, 5, cols - 10, rows - 10);
  x.fillStyle = C.frame; x.fillRect(6, 6, cols - 12, rows - 12);
  x.fillStyle = C.accent;
  const dia = (cx, cy) => { x.beginPath(); x.moveTo(cx, cy - 1.6); x.lineTo(cx + 1.6, cy); x.lineTo(cx, cy + 1.6); x.lineTo(cx - 1.6, cy); x.closePath(); x.fill(); };
  const row = (len, put) => { const { n, d } = evenSteps(len, 6); for (let i = 0; i <= n; i++) put(i * d); };
  row(cols - 16, (a) => { dia(8 + a, 2.6); dia(8 + a, rows - 2.6); });
  row(rows - 16, (a) => { dia(2.6, 8 + a); dia(cols - 2.6, 8 + a); });
  x.fillStyle = C.star; for (const [cx, cy] of [[2.6, 2.6], [cols - 2.6, 2.6], [2.6, rows - 2.6], [cols - 2.6, rows - 2.6]]) { x.beginPath(); star5(x, cx, cy, 2.4); }
}

// Barn star: the round painted hex sign of Pennsylvania barns, on weathered red planks, with two daisy hexes
// beside it and tulips in the corners.
function americaHex(ctx, W, H) {
  const C = { frame: '#1d2a44', line: '#efe3c6', accent: '#d8a33a', star: '#efe3c6',
    barn: '#8e2a25', barn2: '#7a231f', disc: '#efe3c6', ring: '#1b1714', red: '#b5312b', blue: '#2f5a8c', gold: '#e1a83a', green: '#4c7a43', cream2: '#d9c9a4' };
  weavePicture(ctx, W, H, 108, Object.values(C), (x, cols, rows) => {
    pictureBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.fillStyle = C.barn; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.barn2; for (let y = fy + 6; y < fy + fh; y += 7) x.fillRect(fx, y, fw, 1); // planks
    const rosette = (cx, cy, r, points, cols2) => {
      // scalloped cream disc with a dark ring
      x.fillStyle = C.disc;
      for (let i = 0; i < points * 2; i++) { const a = (i / (points * 2)) * Math.PI * 2; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r * 0.13, 0, Math.PI * 2); x.fill(); }
      x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.ring; x.lineWidth = Math.max(1, r * 0.06); x.beginPath(); x.arc(cx, cy, r * 0.9, 0, Math.PI * 2); x.stroke();
      // star points: long diamonds, each split into a light and a dark half
      for (let i = 0; i < points; i++) {
        const a = (i / points) * Math.PI * 2 - Math.PI / 2, L = r * 0.84, w = r * Math.tan(Math.PI / points) * 0.42;
        const tip = [cx + Math.cos(a) * L, cy + Math.sin(a) * L], mid = [cx + Math.cos(a) * L * 0.45, cy + Math.sin(a) * L * 0.45];
        const side = (sgn) => [mid[0] + Math.cos(a + Math.PI / 2) * w * sgn, mid[1] + Math.sin(a + Math.PI / 2) * w * sgn];
        x.fillStyle = cols2[i % cols2.length]; x.beginPath(); x.moveTo(cx, cy); x.lineTo(...side(1)); x.lineTo(...tip); x.closePath(); x.fill();
        x.fillStyle = cols2[(i + 1) % cols2.length]; x.beginPath(); x.moveTo(cx, cy); x.lineTo(...side(-1)); x.lineTo(...tip); x.closePath(); x.fill();
      }
      x.fillStyle = C.ring; x.beginPath(); x.arc(cx, cy, r * 0.14, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.gold; x.beginPath(); x.arc(cx, cy, r * 0.08, 0, Math.PI * 2); x.fill();
    };
    const cy = fy + fh / 2;
    rosette(cols / 2, cy, fh * 0.37, 8, [C.red, C.blue, C.gold, C.red, C.blue, C.gold, C.red, C.blue]);
    for (const sx of [-1, 1]) rosette(cols / 2 + sx * fw * 0.355, cy, fh * 0.15, 6, [C.gold, C.red, C.blue]);
    // tulips in the four corners: three petals on a stem with two leaves
    for (const [tx, ty] of [[fx + 7, fy + 9], [fx + fw - 7, fy + 9], [fx + 7, fy + fh - 3], [fx + fw - 7, fy + fh - 3]]) {
      x.fillStyle = C.green; x.fillRect(tx - 0.5, ty - 2, 1.2, 7);
      x.beginPath(); x.ellipse(tx - 2.2, ty + 2, 2.2, 0.9, -0.6, 0, Math.PI * 2); x.ellipse(tx + 2.4, ty + 2.5, 2.2, 0.9, 0.6, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.gold; x.beginPath(); x.ellipse(tx, ty - 4, 1.6, 2.6, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.beginPath(); x.ellipse(tx - 1.8, ty - 3.4, 1.3, 2.4, -0.4, 0, Math.PI * 2); x.ellipse(tx + 1.8, ty - 3.4, 1.3, 2.4, 0.4, 0, Math.PI * 2); x.fill();
    }
  });
}

// Lone Star quilt: one big eight-pointed star pieced from little diamonds whose colours ripple out from the
// centre, on navy with scattered stars. Drawn as fabric pieces (crisp edges, a dark seam round each diamond).
function americaLoneStar(ctx, W, H, seed) {
  const R = rng(seed + 91);
  const ring = ['#f2d27a', '#e9a43f', '#d4672f', '#a8322f', '#7c2346', '#3f4f8c', '#5f86b8', '#a9c4d8', '#efe3c6'];
  const C = { navy: '#1f2c4c', bind: '#141c33', red: '#a8322f', cream: '#efe3c6', dot: '#d9cdb0', seam: 'rgba(15,20,38,.55)' };
  const u = H / 100, bw = 6 * u;
  ctx.fillStyle = C.bind; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.red; ctx.fillRect(bw - 1.2 * u, bw - 1.2 * u, W - 2 * bw + 2.4 * u, H - 2 * bw + 2.4 * u);
  ctx.fillStyle = C.navy; ctx.fillRect(bw, bw, W - 2 * bw, H - 2 * bw);
  stitchRect(ctx, bw * 0.5, bw * 0.5, W - bw, H - bw, 2.2 * u, 0.35 * u, 'rgba(239,227,198,.7)');
  const cx = W / 2, cy = H / 2, L = (H - 2 * bw) * 0.47, half = Math.PI / 8, steps = 7;
  const edge = L / (2 * Math.cos(half)), cell = edge / steps;
  // scattered stars, clear of the big one
  ctx.fillStyle = C.dot;
  for (let i = 0; i < 70; i++) {
    const sx = bw + 3 * u + R() * (W - 2 * bw - 6 * u), sy = bw + 3 * u + R() * (H - 2 * bw - 6 * u);
    if (Math.hypot(sx - cx, sy - cy) < L + 3 * u) continue;
    star5(ctx, sx, sy, (0.7 + R() * 0.6) * u);
  }
  ctx.lineJoin = 'round';
  for (let k = 0; k < 8; k++) {
    const axis = -Math.PI / 2 + k * Math.PI / 4;
    const e1 = [Math.cos(axis + half) * cell, Math.sin(axis + half) * cell], e2 = [Math.cos(axis - half) * cell, Math.sin(axis - half) * cell];
    for (let i = 0; i < steps; i++) for (let j = 0; j < steps; j++) {
      const p = (a, b) => [cx + e1[0] * a + e2[0] * b, cy + e1[1] * a + e2[1] * b];
      const q = [p(i, j), p(i + 1, j), p(i + 1, j + 1), p(i, j + 1)];
      ctx.fillStyle = ring[Math.round(((i + j) / (2 * steps - 2)) * (ring.length - 1))];
      ctx.beginPath(); q.forEach(([x, y], n) => (n ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = C.seam; ctx.lineWidth = 0.32 * u; ctx.stroke();
    }
  }
}

// Bison on the plains, in the manner of an old hooked rug: a big shaggy bull against a low sun and rolling hills.
function americaBison(ctx, W, H) {
  const C = { frame: '#2a1d14', line: '#ead9b5', accent: '#c8742f', star: '#ead9b5',
    sky: '#e9d3a2', sky2: '#e3bf86', sun: '#d9672e', hill: '#9a8a52', hill2: '#7d7444', grass: '#c39b48', grass2: '#a8823a',
    fur: '#4a2f1d', fur2: '#6b4429', fur3: '#2f1d12', horn: '#e6dcc4' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    pictureBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    // sky in hooked rows, with abrash bands
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = (Math.floor((y - fy) / 4) % 3 === 1) ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.sun; x.beginPath(); x.arc(fx + fw * 0.78, fy + fh * 0.42, fh * 0.16, 0, Math.PI * 2); x.fill();
    // hills and prairie
    x.fillStyle = C.hill; x.beginPath(); x.moveTo(fx, fy + fh * 0.58); x.quadraticCurveTo(fx + fw * 0.3, fy + fh * 0.44, fx + fw * 0.55, fy + fh * 0.57); x.quadraticCurveTo(fx + fw * 0.8, fy + fh * 0.68, fx + fw, fy + fh * 0.55); x.lineTo(fx + fw, fy + fh); x.lineTo(fx, fy + fh); x.fill();
    x.fillStyle = C.hill2; x.beginPath(); x.moveTo(fx, fy + fh * 0.68); x.quadraticCurveTo(fx + fw * 0.5, fy + fh * 0.6, fx + fw, fy + fh * 0.7); x.lineTo(fx + fw, fy + fh); x.lineTo(fx, fy + fh); x.fill();
    x.fillStyle = C.grass; x.fillRect(fx, fy + fh * 0.76, fw, fh);
    x.fillStyle = C.grass2; for (let i = 0; i < 70; i++) { const gx = fx + (i * 37) % fw, gy = fy + fh * 0.78 + ((i * 13) % 18); x.fillRect(gx, gy, 1, 2.5); }
    x.restore();
    // the bison, facing left. Body and hump, head low with beard, horns, legs, tail.
    const bx = fx + fw * 0.46, by = fy + fh * 0.66, s = fh / 100;
    x.fillStyle = C.fur;
    x.beginPath(); x.ellipse(bx + 8 * s, by - 6 * s, 26 * s, 15 * s, 0, 0, Math.PI * 2); x.fill();          // body
    x.fillStyle = C.fur3; for (const [lx, w] of [[-10, 4.5], [-3, 4.5], [20, 4], [27, 4]]) x.fillRect(bx + lx * s, by + 2 * s, w * s, 15 * s); // legs
    // shaggy hump and mane: big and high over the front legs, in the lighter brown, with tufts
    x.fillStyle = C.fur2; x.beginPath(); x.ellipse(bx - 6 * s, by - 16 * s, 18 * s, 17 * s, -0.25, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.fur; for (const [tx, ty] of [[-14, -22], [-6, -27], [2, -25], [-18, -12], [-10, -10]]) { x.beginPath(); x.ellipse(bx + tx * s, by + ty * s, 3 * s, 1.6 * s, 0.4, 0, Math.PI * 2); x.fill(); }
    // head held low, darker, with a beard
    x.fillStyle = C.fur3; x.beginPath(); x.ellipse(bx - 25 * s, by - 1 * s, 8.5 * s, 10 * s, 0.25, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(bx - 31 * s, by + 5 * s); x.lineTo(bx - 21 * s, by + 5 * s); x.lineTo(bx - 27 * s, by + 14 * s); x.closePath(); x.fill();
    // short horn curving up from the top of the head, and a small dark eye with a light rim
    x.strokeStyle = C.horn; x.lineWidth = 2.2; x.lineCap = 'round';
    x.beginPath(); x.moveTo(bx - 23 * s, by - 9 * s); x.quadraticCurveTo(bx - 21 * s, by - 15 * s, bx - 26 * s, by - 17 * s); x.stroke();
    x.fillStyle = C.horn; x.beginPath(); x.arc(bx - 28.5 * s, by - 3 * s, 1.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#000000'; x.beginPath(); x.arc(bx - 28.5 * s, by - 3 * s, 0.8, 0, Math.PI * 2); x.fill();
    x.strokeStyle = C.fur3; x.lineWidth = 1.5 * s * 1.4; x.beginPath(); x.moveTo(bx + 33 * s, by - 10 * s); x.quadraticCurveTo(bx + 38 * s, by - 4 * s, bx + 36 * s, by + 4 * s); x.stroke(); // tail
  });
}

// Buffalo check: red and black squares with a twill weave, wrapped in a cream blanket-stitch edge.
function americaPlaid(ctx, W, H) {
  const C = { red: '#a3242a', black: '#17121a', mix: '#5b1a20', cream: '#ece1c8' };
  const u = H / 100, sq = 10 * u, edge = 3 * u;
  ctx.fillStyle = C.red; ctx.fillRect(0, 0, W, H);
  for (let y = 0; y < H; y += sq) for (let x = 0; x < W; x += sq) {
    const a = Math.floor(x / sq) % 2, b = Math.floor(y / sq) % 2;
    ctx.fillStyle = a && b ? C.black : (a || b ? C.mix : C.red);
    ctx.fillRect(x, y, sq + 0.5, sq + 0.5);
  }
  // twill: fine diagonal threads over everything
  ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 0.28 * u;
  for (let d = -H; d < W; d += 0.9 * u) { ctx.beginPath(); ctx.moveTo(d, H); ctx.lineTo(d + H, 0); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,230,220,.07)';
  for (let d = -H + 0.45 * u; d < W; d += 0.9 * u) { ctx.beginPath(); ctx.moveTo(d, H); ctx.lineTo(d + H, 0); ctx.stroke(); }
  // blanket-stitch edge
  ctx.fillStyle = C.black; frameRect(ctx, 0, 0, W, H, edge);
  // blanket stitch: a cream line along the edge with evenly spaced ticks reaching in; each side fits a whole
  // number of ticks and the corners get one diagonal tick, like a hand-finished blanket
  ctx.strokeStyle = C.cream; ctx.lineWidth = 0.55 * u; ctx.lineCap = 'square';
  const o = edge * 0.45, reach = edge + 1.4 * u, inset = edge * 1.2;
  ctx.beginPath();
  const ticks = (len, at) => { const { n, d } = evenSteps(len, 2.4 * u); for (let i = 1; i < n; i++) at(i * d); };
  ticks(W - 2 * inset, (a) => { ctx.moveTo(inset + a, o); ctx.lineTo(inset + a, reach); ctx.moveTo(inset + a, H - o); ctx.lineTo(inset + a, H - reach); });
  ticks(H - 2 * inset, (a) => { ctx.moveTo(o, inset + a); ctx.lineTo(reach, inset + a); ctx.moveTo(W - o, inset + a); ctx.lineTo(W - reach, inset + a); });
  for (const [cx, cy, sx, sy] of [[o, o, 1, 1], [W - o, o, -1, 1], [o, H - o, 1, -1], [W - o, H - o, -1, -1]]) {
    ctx.moveTo(cx, cy); ctx.lineTo(cx + sx * (reach - o) * 1.1, cy + sy * (reach - o) * 1.1);
  }
  ctx.stroke();
  ctx.lineWidth = 0.45 * u; ctx.lineJoin = 'miter';
  ctx.strokeRect(o, o, W - 2 * o, H - 2 * o);
}


// Hooked rug: re-make a finished picture out of rows of wool loops, the way American hooked rugs are made.
// The loops sit on a fixed lattice: `rows` rows, every other row shifted by half a loop. Colours are cut down to a
// few dyed shades per channel (so skies become bands, like real hooking), each loop is a little rounded tuft with a
// light top and a shaded bottom, and each loop's hue wobbles a touch (abrash). `colorAt(r, h, rgb)` may replace a
// loop's colour: r is the row, h the position along it in half loops (even rows use even h, odd rows odd h) and
// rgb the picture's colour there; patterns that have to stay crisp (sawtooth, checks, floorboards) are laid out
// loop by loop this way instead of being drawn and sampled. The edge gets a whipped binding.
function hookify(ctx, W, H, seed, rows, colorAt) {
  const R = rng(seed + 777);
  const src = ctx.getImageData(0, 0, W, H).data;
  const p = H / rows, NC = Math.round(W / p), px = W / NC, rx = p * 0.652, ry = p * 0.609;
  const levels = 24, q = (v) => Math.round((v / 255) * (levels - 1)) / (levels - 1) * 255;
  ctx.fillStyle = '#2b2118'; ctx.fillRect(0, 0, W, H); // backing showing between loops
  for (let r = 0; r < rows; r++) {
    const y = (r + 0.5) * p, sy = Math.min(H - 1, y | 0);
    for (let c = -1; c <= NC; c++) {
      const h = 2 * c + (r & 1), x = (h / 2 + 0.5) * px, sx = Math.min(W - 1, Math.max(0, x | 0)), i = (sy * W + sx) * 4;
      const rgb = colorAt?.(r, h, [src[i], src[i + 1], src[i + 2]]) || [src[i], src[i + 1], src[i + 2]];
      const j = (R() - 0.5) * 14; // abrash
      const cr = Math.max(0, Math.min(255, q(rgb[0]) + j)), cg = Math.max(0, Math.min(255, q(rgb[1]) + j)), cb = Math.max(0, Math.min(255, q(rgb[2]) + j));
      ctx.fillStyle = `rgb(${cr * 0.62 | 0},${cg * 0.62 | 0},${cb * 0.62 | 0})`;
      ctx.beginPath(); ctx.ellipse(x, y + p * 0.087, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb | 0})`;
      ctx.beginPath(); ctx.ellipse(x - p * 0.043, y - p * 0.054, rx * 0.82, ry * 0.78, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${0.12 + R() * 0.06})`;
      ctx.beginPath(); ctx.ellipse(x - p * 0.152, y - p * 0.185, rx * 0.36, ry * 0.26, -0.5, 0, Math.PI * 2); ctx.fill();
    }
  }
  // whipped binding round the edge
  const bw = p * 1.74;
  ctx.fillStyle = '#22262e'; frameRect(ctx, 0, 0, W, H, bw);
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = p * 0.24;
  for (let a = 0; a < W; a += p * 0.6) { ctx.beginPath(); ctx.moveTo(a, 0); ctx.lineTo(a + p * 0.43, bw); ctx.moveTo(a, H); ctx.lineTo(a + p * 0.43, H - bw); ctx.stroke(); }
  for (let a = 0; a < H; a += p * 0.6) { ctx.beginPath(); ctx.moveTo(0, a); ctx.lineTo(bw, a + p * 0.43); ctx.moveTo(W, a); ctx.lineTo(W - bw, a + p * 0.43); ctx.stroke(); }
}

const HOOK_ROWS = 81;         // odd, so the top and bottom borders fall on rows of the same kind and come out alike
const HOOK_EDGE = 8;          // loops of border before the picture: binding, sawtooth, cream line
const rgbOf = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
const nearRgb = (a, b, tol = 24) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= tol;
// Size of the picture area of a hooked rug, in loops, for pictures that lay patterns out loop by loop.
function hookedPictureLoops(W, H) { const NC = Math.round(W / (H / HOOK_ROWS)); return { cols: NC - 2 * HOOK_EDGE, rows: HOOK_ROWS - 2 * HOOK_EDGE }; }

// Put a finished picture inside a hooked-rug border (dark band, red and mustard sawtooth, a cream line, a little
// mustard diamond in each corner) and make the whole thing out of wool loops. The border is laid out loop by loop
// so every tooth comes out the same. `inner(r, h, rgb)` may restyle loops of the picture (r and h counted from the
// picture's top-left loop).
function hookedFrame(ctx, W, H, seed, inner, pal = {}) {
  const rows = HOOK_ROWS, E = HOOK_EDGE, p = H / rows, NC = Math.round(W / p), px = W / NC;
  const pic = document.createElement('canvas'); pic.width = W; pic.height = H;
  pic.getContext('2d').drawImage(ctx.canvas, 0, 0);
  ctx.fillStyle = pal.dark || '#2a201a'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = false; ctx.drawImage(pic, E * px, E * p, W - 2 * E * px, H - 2 * E * p); ctx.imageSmoothingEnabled = true;
  const DARK = rgbOf(pal.dark || '#2a201a'), CREAM = rgbOf(pal.line || '#e9dcbc'), RED = rgbOf(pal.a || '#a8322f'), GOLD = rgbOf(pal.b || '#c99a3a');
  const T = 5;                                   // sawtooth depth (rows) and tooth width (loops)
  const B = 2, L = B + T;                        // sawtooth starts after the binding; cream line at depth L
  // teeth along the top and bottom: whole teeth, centred, every one starting on the same kind of loop
  let nTop = Math.floor((2 * NC - 4 * L - 1) / (2 * T)), h0 = NC - 1 - T * nTop;
  if ((h0 & 1) === (B & 1)) { nTop--; h0 += T; }
  // teeth down the sides: whole teeth, centred
  const sideLen = rows - 2 * L, nSide = Math.floor(sideLen / T), r0 = L + Math.floor((sideLen - nSide * T) / 2);
  hookify(ctx, W, H, seed, rows, (r, h, rgb) => {
    const dT = Math.min(r, rows - 1 - r), dS = Math.max(0, Math.min(h / 2, NC - 1 - h / 2));
    if (dT >= E && dS >= E) return inner ? inner(r - E, h - 2 * E, rgb) : null;
    if (dT < B || dS < B) return DARK;
    if (dT < L && dS < L) {                     // corner: a small stepped diamond
      const dy = dT - (B + 2), dx = dS - (B + 2), k = Math.abs(dx) + Math.abs(dy) / 2;
      return k === 0 ? RED : k <= 2 ? GOLD : DARK;
    }
    if (dT >= L && dS >= L) return CREAM;        // the cream line round the picture
    if (dT < L) {                                // top or bottom sawtooth: rows of 5, 4, 3, 2, 1 loops
      const t = dT - B, u = h - h0, k = Math.floor(u / (2 * T));
      if (k < 0 || k >= nTop) return DARK;
      return Math.abs(u - 2 * T * k - T) <= T - 1 - t ? (k % 2 ? GOLD : RED) : DARK;
    }
    // left or right sawtooth: 1, 3, 5, 3, 1 loops deep
    const v = r - r0, k = Math.floor(v / T);
    if (k < 0 || k >= nSide) return DARK;
    const e = 4.6 * (1 - Math.abs(v - k * T - (T - 1) / 2) / ((T) / 2));
    return dS - B <= e ? (k % 2 ? GOLD : RED) : DARK;
  });
}

function evenSteps(len, step) { const n = Math.max(1, Math.round(len / step)); return { n, d: len / n }; }

function addWeave(ctx, W, H, seed, strength = 26) {
  const R = rng(seed + 99);
  const img = ctx.getImageData(0, 0, W, H);
  const d = img.data;
  for (let y = 0; y < H; y++) {
    const row = Math.sin(y * 1.9) * 4;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const knot = ((x >> 1) + (y >> 1)) & 1 ? 5 : -5;
      const n = (R() - 0.5) * strength + knot + row;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function makeRugCanvases(styleKey, aspect = 1.58, seed = 7) {
  const P = STYLES[styleKey] || STYLES.klasik;
  if (P.site) return { ...makeSiteRugCanvases(P.site), bump: makeBump(seed) };
  const H = 1280, W = Math.round(H * aspect);
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  let inner = null; // hooked pictures may lay some patterns out loop by loop
  if (P.america === 'postcard') americaPostcard(ctx, W, H);
  else if (P.america === 'park') americaPark(ctx, W, H);
  else if (P.america === 'baseball') inner = americaBaseball(ctx, W, H);
  else if (P.america === 'basketball') inner = americaBasketball(ctx, W, H);
  else if (P.america === 'diner') inner = americaDiner(ctx, W, H);
  else if (P.america === 'route66') americaRoute66(ctx, W, H);
  else if (P.america === 'flag') americaFlag(ctx, W, H, seed);
  else if (P.america === 'mesa') americaMesa(ctx, W, H);
  else if (P.america === 'quilt') americaQuilt(ctx, W, H, seed);
  else if (P.america === 'plaid') americaPlaid(ctx, W, H);
  else if (P.america === 'canyon') americaCanyon(ctx, W, H, seed);
  else if (P.america === 'hex') americaHex(ctx, W, H);
  else if (P.america === 'lonestar') americaLoneStar(ctx, W, H, seed);
  else if (P.america === 'bison') americaBison(ctx, W, H);
  else if (P.canada === 'flag') canadaFlag(ctx, W, H);
  else if (P.canada === 'quilt') canadaLeafQuilt(ctx, W, H, seed);
  else if (P.canada === 'rockies') canadaRockies(ctx, W, H, seed);
  else if (P.canada === 'tartan') canadaTartan(ctx, W, H);
  else if (P.canada === 'moose') canadaMoose(ctx, W, H);
  else if (P.canada === 'geese') canadaGeese(ctx, W, H);
  else if (P.canada === 'loon') canadaLoon(ctx, W, H);
  else if (P.canada === 'postcard') canadaPostcard(ctx, W, H);
  else if (P.canada === 'hockey') canadaHockey(ctx, W, H);
  else if (P.canada === 'aurora') canadaAurora(ctx, W, H);
  else if (P.canada === 'lighthouse') canadaLighthouse(ctx, W, H);
  else if (P.canada === 'bear') canadaPolarBear(ctx, W, H);
  else if (P.mexico === 'sarape') mexicoSarape(ctx, W, H);
  else if (P.mexico === 'greca') mexicoGreca(ctx, W, H);
  else if (P.mexico === 'tile') mexicoTile(ctx, W, H);
  else if (P.mexico === 'agave') mexicoAgave(ctx, W, H);
  else if (P.mexico === 'skull') mexicoSkull(ctx, W, H);
  else if (P.mexico === 'monarch') mexicoMonarch(ctx, W, H);
  else if (P.mexico === 'jaguar') mexicoJaguar(ctx, W, H);
  else if (P.mexico === 'postcard') mexicoPostcard(ctx, W, H);
  else if (P.mexico === 'pyramid') mexicoPyramid(ctx, W, H);
  else if (P.mexico === 'street') mexicoStreet(ctx, W, H);
  else if (P.mexico === 'trajinera') mexicoTrajinera(ctx, W, H);
  else if (P.mexico === 'tulum') mexicoTulum(ctx, W, H);
  else if (P.persia === 'heriz') persHeriz(ctx, W, H);
  else if (P.persia === 'garden') persGarden(ctx, W, H);
  else if (P.persia === 'hunt') persHunt(ctx, W, H);
  else if (P.persia === 'tree') persTree(ctx, W, H);
  else if (P.persia === 'boteh') persBoteh(ctx, W, H);
  else if (P.persia === 'bakhtiari') persBakhtiari(ctx, W, H);
  else if (P.persia === 'gabbeh') persGabbeh(ctx, W, H);
  else if (P.persia === 'nain') persNain(ctx, W, H);
  else if (P.persia === 'vase') persVase(ctx, W, H);
  else if (P.persia === 'herati') persHerati(ctx, W, H);
  else if (P.persia === 'qom') persQom(ctx, W, H);
  else if (P.persia === 'turkmen') persTurkmen(ctx, W, H);
  else if (P.turkiye === 'usak') turkUsak(ctx, W, H);
  else if (P.turkiye === 'lotto') turkLotto(ctx, W, H);
  else if (P.turkiye === 'bergama') turkBergama(ctx, W, H);
  else if (P.turkiye === 'yagcibedir') turkYagcibedir(ctx, W, H);
  else if (P.turkiye === 'seljuk') turkSelcuklu(ctx, W, H);
  else if (P.turkiye === 'hereke') turkHereke(ctx, W, H);
  else if (P.turkiye === 'iznik') turkIznik(ctx, W, H);
  else if (P.turkiye === 'postcard') turkPostcard(ctx, W, H);
  else if (P.turkiye === 'cappadocia') turkCappadocia(ctx, W, H);
  else if (P.turkiye === 'bosphorus') turkBosphorus(ctx, W, H);
  else if (P.turkiye === 'pamukkale') turkPamukkale(ctx, W, H);
  else if (P.turkiye === 'nazar') turkNazar(ctx, W, H);
  else if (P.korea === 'bojagi') korBojagi(ctx, W, H);
  else if (P.korea === 'saekdong') korSaekdong(ctx, W, H);
  else if (P.korea === 'celadon') korCeladon(ctx, W, H);
  else if (P.korea === 'dancheong') korDancheong(ctx, W, H);
  else if (P.korea === 'tiger') korTiger(ctx, W, H);
  else if (P.korea === 'hanok') korHanok(ctx, W, H);
  else if (P.korea === 'seoul') korSeoul(ctx, W, H);
  else if (P.korea === 'postcard') korPostcard(ctx, W, H);
  else if (P.japan === 'seigaiha') japSeigaiha(ctx, W, H);
  else if (P.japan === 'asanoha') japAsanoha(ctx, W, H);
  else if (P.japan === 'boro') japBoro(ctx, W, H);
  else if (P.japan === 'koi') japKoi(ctx, W, H);
  else if (P.japan === 'byobu') japByobu(ctx, W, H);
  else if (P.japan === 'fuji') japFuji(ctx, W, H);
  else if (P.japan === 'kyoto') japKyoto(ctx, W, H);
  else if (P.japan === 'postcard') japPostcard(ctx, W, H);
  else if (P.china === 'porcelain') chnPorcelain(ctx, W, H);
  else if (P.china === 'clouds') chnClouds(ctx, W, H);
  else if (P.china === 'artdeco') chnArtDeco(ctx, W, H);
  else if (P.china === 'ningxia') chnNingxia(ctx, W, H);
  else if (P.china === 'bamboo') chnBamboo(ctx, W, H);
  else if (P.china === 'panda') chnPanda(ctx, W, H);
  else if (P.china === 'wall') chnGreatWall(ctx, W, H);
  else if (P.china === 'postcard') chnPostcard(ctx, W, H);
  else if (P.korea === 'hangeul') korHangeul(ctx, W, H);
  else if (P.korea === 'najeon') korNajeon(ctx, W, H);
  else if (P.korea === 'longevity') korLongevity(ctx, W, H);
  else if (P.korea === 'lanterns') korLanterns(ctx, W, H);
  else if (P.korea === 'bibimbap') korBibimbap(ctx, W, H);
  else if (P.korea === 'jeju') korJeju(ctx, W, H);
  else if (P.japan === 'shibori') japShibori(ctx, W, H);
  else if (P.japan === 'zen') japZen(ctx, W, H);
  else if (P.japan === 'wave') japGreatWave(ctx, W, H);
  else if (P.japan === 'neko') japManekiNeko(ctx, W, H);
  else if (P.japan === 'torii') japTorii(ctx, W, H);
  else if (P.japan === 'sushi') japSushi(ctx, W, H);
  else if (P.china === 'papercut') chnPapercut(ctx, W, H);
  else if (P.china === 'imperial') chnImperial(ctx, W, H);
  else if (P.china === 'mahjong') chnMahjong(ctx, W, H);
  else if (P.china === 'lanterns') chnLanternFest(ctx, W, H);
  else if (P.china === 'guilin') chnGuilin(ctx, W, H);
  else if (P.china === 'dimsum') chnDimSum(ctx, W, H);
  else if (P.italy === 'majolica') itaMajolica(ctx, W, H);
  else if (P.italy === 'lemons') itaLemons(ctx, W, H);
  else if (P.italy === 'damask') itaDamask(ctx, W, H);
  else if (P.italy === 'mosaic') itaMosaic(ctx, W, H);
  else if (P.italy === 'marble') itaMarble(ctx, W, H);
  else if (P.italy === 'venice') itaVenice(ctx, W, H);
  else if (P.italy === 'tuscany') itaTuscany(ctx, W, H);
  else if (P.italy === 'cinqueterre') itaCinqueTerre(ctx, W, H);
  else if (P.italy === 'pizza') itaPizza(ctx, W, H);
  else if (P.italy === 'postcard') itaPostcard(ctx, W, H);
  else if (P.italy === 'murano') itaMurano(ctx, W, H);
  else if (P.italy === 'pasta') itaPasta(ctx, W, H);
  else if (P.italy === 'cart') itaSicilianCart(ctx, W, H);
  else if (P.italy === 'colosseum') itaColosseum(ctx, W, H);
  else if (P.italy === 'gelato') itaGelato(ctx, W, H);
  else if (P.italy === 'street') itaRomeStreet(ctx, W, H);
  else if (P.greece === 'meander') grcMeander(ctx, W, H);
  else if (P.greece === 'amphora') grcAmphora(ctx, W, H);
  else if (P.greece === 'olive') grcOlive(ctx, W, H);
  else if (P.greece === 'dolphins') grcDolphins(ctx, W, H);
  else if (P.greece === 'byzantine') grcByzantine(ctx, W, H);
  else if (P.greece === 'santorini') grcSantorini(ctx, W, H);
  else if (P.greece === 'acropolis') grcAcropolis(ctx, W, H);
  else if (P.greece === 'harbor') grcHarbor(ctx, W, H);
  else if (P.greece === 'mykonos') grcMykonos(ctx, W, H);
  else if (P.greece === 'postcard') grcPostcard(ctx, W, H);
  else if (P.greece === 'octopus') grcOctopus(ctx, W, H);
  else if (P.greece === 'skyros') grcSkyros(ctx, W, H);
  else if (P.greece === 'akrotiri') grcAkrotiri(ctx, W, H);
  else if (P.greece === 'knossos') grcKnossos(ctx, W, H);
  else if (P.greece === 'door') grcBlueDoor(ctx, W, H);
  else if (P.greece === 'salad') grcSalad(ctx, W, H);
  else if (P.spain === 'azulejo') spnAzulejo(ctx, W, H);
  else if (P.spain === 'flamenco') spnFlamenco(ctx, W, H);
  else if (P.spain === 'manton') spnManton(ctx, W, H);
  else if (P.spain === 'pomegranate') spnPomegranate(ctx, W, H);
  else if (P.spain === 'trencadis') spnTrencadis(ctx, W, H);
  else if (P.spain === 'alhambra') spnAlhambra(ctx, W, H);
  else if (P.spain === 'patio') spnPatio(ctx, W, H);
  else if (P.spain === 'paella') spnPaella(ctx, W, H);
  else if (P.spain === 'lamancha') spnLaMancha(ctx, W, H);
  else if (P.spain === 'postcard') spnPostcard(ctx, W, H);
  else if (P.spain === 'lace') spnLace(ctx, W, H);
  else if (P.spain === 'guitar') spnGuitar(ctx, W, H);
  else if (P.spain === 'castanets') spnCastanets(ctx, W, H);
  else if (P.spain === 'guell') spnParkGuell(ctx, W, H);
  else if (P.spain === 'tapas') spnTapas(ctx, W, H);
  else if (P.spain === 'oranges') spnOranges(ctx, W, H);
  else if (P.france === 'lavender') frnLavender(ctx, W, H);
  else if (P.france === 'provencal') frnProvencal(ctx, W, H);
  else if (P.france === 'riviera') frnRiviera(ctx, W, H);
  else if (P.france === 'sunflowers') frnSunflowers(ctx, W, H);
  else if (P.france === 'petanque') frnPetanque(ctx, W, H);
  else if (P.france === 'market') frnMarket(ctx, W, H);
  else if (P.france === 'tomette') frnTomette(ctx, W, H);
  else if (P.france === 'cicadas') frnCicadas(ctx, W, H);
  else if (P.france === 'calanques') frnCalanques(ctx, W, H);
  else if (P.france === 'postcard') frnPostcard(ctx, W, H);
  else if (P.france === 'mimosa') frnMimosa(ctx, W, H);
  else if (P.france === 'toile') frnToile(ctx, W, H);
  else if (P.france === 'moustiers') frnMoustiers(ctx, W, H);
  else if (P.france === 'chairs') frnBlueChairs(ctx, W, H);
  else if (P.france === 'ochre') frnRoussillon(ctx, W, H);
  else if (P.france === 'camargue') frnCamargue(ctx, W, H);
  else if (P.halloween === 'pumpkin') halloweenPumpkin(ctx, W, H);
  else if (P.halloween === 'web') halloweenWeb(ctx, W, H, seed);
  else if (P.halloween === 'ghost') halloweenGhost(ctx, W, H, seed);
  else if (P.kilim) kilim(ctx, W, H); else persian(ctx, W, H, P, seed);
  if (P.hooked) hookedFrame(ctx, W, H, seed, inner, P.canada ? CANADA_FRAME : P.mexico ? MEXICO_FRAME : P.turkiye ? TURKIYE_FRAME : P.korea ? KOREA_FRAME : P.japan ? JAPAN_FRAME : P.china ? CHINA_FRAME : P.italy ? ITALY_FRAME : P.greece ? GREECE_FRAME : P.spain ? SPAIN_FRAME : P.france ? FRANCE_FRAME : undefined); else addWeave(ctx, W, H, seed, P.silk ? 12 : 26);

  // Back side: same pattern, faded and flattened.
  const b = document.createElement('canvas');
  b.width = W / 2; b.height = H / 2;
  const bctx = b.getContext('2d');
  bctx.filter = 'saturate(0.55) brightness(0.72) contrast(0.85) blur(1px)';
  bctx.drawImage(c, 0, 0, b.width, b.height);
  bctx.filter = 'none';

  const p = makeBump(seed);
  return { front: c, back: b, bump: p };
}

function makeBump(seed) {
  const p = document.createElement('canvas');
  p.width = 512; p.height = 512;
  const pctx = p.getContext('2d');
  const R = rng(seed + 5);
  const img = pctx.createImageData(512, 512);
  for (let i = 0; i < 512 * 512; i++) {
    const x = i % 512, y = (i / 512) | 0;
    const v = 128 + (R() - 0.5) * 90 + (((x >> 1) + (y >> 1)) & 1 ? 25 : -25);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
  }
  pctx.putImageData(img, 0, 0);
  return p;
}
