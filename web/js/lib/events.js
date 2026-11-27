// The one way pieces talk to each other. Pieces never import each other:
// they emit events here and listen for the ones they care about.
// Every event name must be in the handbook's events table.
//
//   import { emit, on } from "/js/lib/events.js";
//   const stop = on("clueSaved", (detail) => { ... });
//   emit("clueSaved", { clueId, notebookText, amaReaction });
//   stop(); // stop listening, e.g. when a piece is removed

const bus = new EventTarget();

export function emit(name, detail = {}) {
  bus.dispatchEvent(new CustomEvent(name, { detail }));
}

export function on(name, handler) {
  const listener = (event) => handler(event.detail);
  bus.addEventListener(name, listener);
  return () => bus.removeEventListener(name, listener);
}

export function once(name, handler) {
  const stop = on(name, (detail) => {
    stop();
    handler(detail);
  });
  return stop;
}
