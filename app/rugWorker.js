// The panel's showroom previews, drawn in a worker from the same code that draws the rug, so the panel never stutters
// and no large preview pictures have to ship with the app. Built into panel/rugworker.js.
import './workerShim.js';
import { makeRugCanvases, loadRugFonts, STYLES } from './rugTexture.js';

let fonts = null;
self.onmessage = async ({ data: { key, w, h } }) => {
  try {
    if (STYLES[key]?.fonts) await (fonts ||= loadRugFonts('./fonts/'));
    const { front } = makeRugCanvases(key, 1.58, 7, { frontOnly: true });
    const c = new OffscreenCanvas(w, h), x = c.getContext('2d');
    x.imageSmoothingQuality = 'high';
    x.drawImage(front, 0, 0, w, h);
    const blob = await c.convertToBlob({ type: 'image/webp', quality: 0.92 });
    self.postMessage({ key, blob });
  } catch (e) {
    self.postMessage({ key, error: String((e && e.message) || e) });
  }
};
