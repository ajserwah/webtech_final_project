// Build elements without innerHTML. Case and player text is untrusted:
// strings passed as children always become text nodes, never markup.
//
//   el("button", { class: "cc-btn cc-btn--primary", type: "button",
//                  onClick: save }, "Save to notebook →")
//
// attributes:
//   onSomething: fn      → addEventListener("something", fn)
//   true                 → attribute present with no value (disabled, hidden)
//   false, null, undefined → attribute left off
//   dataset: { a: 1 }    → data-a="1"
//   anything else        → setAttribute(name, String(value))
// children: a node, a string or number, or an array of these (nested arrays
// and null/false are allowed, so conditional children are easy).

export function el(tag, attributes = {}, ...children) {
  const node = document.createElement(tag);

  for (const [name, value] of Object.entries(attributes ?? {})) {
    if (value === false || value === null || value === undefined) continue;

    if (name === "dataset") {
      Object.assign(node.dataset, value);
    } else if (/^on[A-Z]/.test(name) && typeof value === "function") {
      node.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (value === true) {
      node.setAttribute(name, "");
    } else {
      node.setAttribute(name, String(value));
    }
  }

  append(node, children);
  return node;
}

// Add children (same rules as el) to an existing node.
export function append(node, children) {
  for (const child of [children].flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child instanceof Node ? child : String(child));
  }
  return node;
}

// Remove everything inside a node, e.g. before a piece redraws itself.
export function clear(node) {
  node.replaceChildren();
  return node;
}

// Find one element or fail loudly, so a missing mount point is caught early.
export function $(selector, root = document) {
  const found = root.querySelector(selector);
  if (!found) throw new Error(`No element matches ${selector}`);
  return found;
}
