// Lets the rug code run in a worker: its canvases become OffscreenCanvases and its fonts go to the worker's font set.
// (Imported before rugTexture.js so it is in place when that module runs.)
self.document = { createElement: () => new OffscreenCanvas(1, 1), fonts: self.fonts };
