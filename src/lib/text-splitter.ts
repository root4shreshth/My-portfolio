// Lightweight text splitter — no GSAP Club dependency
// Splits text into lines, words, or chars with wrapper elements

export function splitTextIntoChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const chars: HTMLSpanElement[] = [];

  for (const char of text) {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = char === " " ? "\u00A0" : char;
    span.setAttribute("aria-hidden", "true");
    element.appendChild(span);
    chars.push(span);
  }

  return chars;
}

export function splitTextIntoWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);

  const words: HTMLSpanElement[] = [];
  const wordArray = text.split(/(\s+)/);

  for (const word of wordArray) {
    if (word.trim() === "") {
      const space = document.createTextNode(" ");
      element.appendChild(space);
      continue;
    }
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = word;
    span.setAttribute("aria-hidden", "true");
    element.appendChild(span);
    words.push(span);
  }

  return words;
}

export function splitTextIntoLines(element: HTMLElement): HTMLDivElement[] {
  const text = element.innerHTML;
  element.innerHTML = "";
  element.setAttribute("aria-label", element.textContent || "");

  // Create temp container to measure lines
  const temp = document.createElement("div");
  temp.style.cssText = window.getComputedStyle(element).cssText;
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.width = `${element.offsetWidth}px`;
  temp.innerHTML = text;
  document.body.appendChild(temp);

  // Get all text nodes and measure line breaks
  const range = document.createRange();
  const words = temp.textContent?.split(/\s+/) || [];
  temp.textContent = "";

  const lines: string[] = [];
  let currentLine = "";
  let lastTop = -1;

  for (const word of words) {
    const testText = currentLine ? `${currentLine} ${word}` : word;
    temp.textContent = testText;

    const span = document.createElement("span");
    span.textContent = word;
    temp.textContent = "";
    temp.appendChild(document.createTextNode(currentLine ? `${currentLine} ` : ""));
    temp.appendChild(span);

    range.selectNode(span);
    const rect = range.getBoundingClientRect();

    if (lastTop !== -1 && rect.top > lastTop + 2) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testText;
    }
    lastTop = rect.top;
    temp.textContent = currentLine;
  }
  if (currentLine) lines.push(currentLine);

  document.body.removeChild(temp);

  // Create line elements with overflow:hidden wrappers
  const lineElements: HTMLDivElement[] = [];
  for (const line of lines) {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    wrapper.style.position = "relative";

    const inner = document.createElement("div");
    inner.style.willChange = "transform";
    inner.textContent = line;

    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    lineElements.push(inner);
  }

  return lineElements;
}
