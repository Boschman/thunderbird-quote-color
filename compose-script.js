// Determine the quote nesting level (0 = top level, 1 = nested once, …)
function getQuoteLevel(element) {
  let level = 0;
  let parent = element.parentElement;
  while (parent) {
    if (parent.tagName === 'BLOCKQUOTE' && parent.getAttribute('type') === 'cite') {
      level++;
    }
    parent = parent.parentElement;
  }
  return level;
}

// Apply colors to all quoted blockquotes.
function applyQuoteColors() {
  const blockquotes = document.querySelectorAll('blockquote[type="cite"]');

  blockquotes.forEach(bq => {
    const level = getQuoteLevel(bq);
    const color = level === 0 ? '#3366ff' : '#a07c9f';

    // (1) Inline styles on the <blockquote> itself.
    //     Purpose: the SENT email's wire HTML carries these, so the recipient
    //     (whose mail client does NOT load TB's messageQuotes.css) sees the
    //     blockquote in the right color and with the colored left border.
    bq.style.setProperty('color', color, 'important');
    bq.style.setProperty('border-left', `3px solid ${color}`, 'important');
    bq.style.setProperty('padding-left', '10px', 'important');
    bq.style.setProperty('margin-left', '0', 'important');

    // (2) Wrapper <div> for the EDITOR display.
    //     TB 149 added (bug 2018015):
    //
    //       body blockquote[type="cite"] {
    //         color: var(--color-text-highlight) !important;
    //       }
    //
    //     to messageQuotes.css, which the editor loads at the USER cascade
    //     origin. User !important beats author !important (including inline),
    //     so the setProperty above does NOT win the editor's cascade for
    //     `color`. The variable is undefined in the editor's content scope,
    //     so the value resolves to `unset` → "inherit from parent" → the
    //     editor body's default (black in light mode).
    //
    //     Workaround: wrap the blockquote's children in a <div class="qc-wrap">
    //     with the desired color. The div is NOT a blockquote, so the rule
    //     doesn't reach it; its descendants inherit the div's color and the
    //     editor renders them correctly.
    let wrapper = bq.firstElementChild;
    if (!wrapper || !wrapper.classList || !wrapper.classList.contains('qc-wrap')) {
      wrapper = document.createElement('div');
      wrapper.className = 'qc-wrap';
      while (bq.firstChild) {
        wrapper.appendChild(bq.firstChild);
      }
      bq.appendChild(wrapper);
    }
    wrapper.style.setProperty('color', color, 'important');
  });

  // Quote prefixes and forward containers — not subject to messageQuotes.css's
  // !important, so plain inline color is enough.
  document.querySelectorAll('.moz-cite-prefix').forEach(p => {
    p.style.setProperty('color', '#3366ff', 'important');
  });
  document.querySelectorAll('.moz-forward-container').forEach(c => {
    if (!c.querySelector('blockquote[type="cite"]')) {
      c.style.setProperty('color', '#3366ff', 'important');
    }
  });
}

// Initial pass
applyQuoteColors();

// Reactive: react to any DOM mutation, debounced via requestAnimationFrame.
let pendingUpdate = false;
function scheduleUpdate() {
  if (pendingUpdate) return;
  pendingUpdate = true;
  requestAnimationFrame(() => {
    pendingUpdate = false;
    applyQuoteColors();
  });
}

const observer = new MutationObserver(scheduleUpdate);
observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('focus', applyQuoteColors);
document.addEventListener('paste', () => setTimeout(applyQuoteColors, 100));
