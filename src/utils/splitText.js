/**
 * Split Text Utility for Character-Level Animations
 * Alternative to GSAP's premium SplitText plugin
 */

/**
 * Splits text content into individual character spans for animation
 * @param {HTMLElement} element - The element containing text to split
 * @param {Object} options - Configuration options
 * @returns {Array} Array of character span elements
 */
export const splitTextIntoChars = (element, options = {}) => {
  const {
    wrapperClass = 'char-wrapper',
    charClass = 'char',
    preserveSpaces = true
  } = options;

  if (!element) return [];

  const text = element.textContent;
  const chars = [];

  // Clear element
  element.textContent = '';
  element.classList.add('split-text');

  // Create wrapper for each character
  text.split('').forEach((char, index) => {
    const wrapper = document.createElement('span');
    wrapper.classList.add(wrapperClass);
    wrapper.style.display = 'inline-block';
    wrapper.style.position = 'relative';

    const charSpan = document.createElement('span');
    charSpan.classList.add(charClass);
    charSpan.textContent = char === ' ' && preserveSpaces ? '\u00A0' : char;
    charSpan.style.display = 'inline-block';
    charSpan.dataset.char = index;

    // Initial state for animation
    charSpan.style.opacity = '0';
    charSpan.style.transform = 'translateY(100%) rotateX(-90deg)';
    charSpan.style.transformOrigin = 'center bottom';

    wrapper.appendChild(charSpan);
    element.appendChild(wrapper);
    chars.push(charSpan);
  });

  return chars;
};

/**
 * Resets a split text element back to normal
 * @param {HTMLElement} element - The split text element to reset
 */
export const resetSplitText = (element) => {
  if (!element || !element.classList.contains('split-text')) return;

  const text = element.textContent;
  element.innerHTML = '';
  element.textContent = text;
  element.classList.remove('split-text');
};
