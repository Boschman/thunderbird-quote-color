// Function to determine the quote level of a blockquote element
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

// Function to apply colors to all blockquotes
function applyQuoteColors() {
  const blockquotes = document.querySelectorAll('blockquote[type="cite"]');
  
  blockquotes.forEach(blockquote => {
    const level = getQuoteLevel(blockquote);
    
    // Level 0 = first level quote (blue)
    // Level 1+ = second level and deeper (purple)
    const color = level === 0 ? '#3366ff' : '#a07c9f';
    
    // Apply style to the blockquote itself
    blockquote.style.color = color;
    
    // Also apply to all child elements that don't have their own blockquote
    const childElements = blockquote.querySelectorAll('*:not(blockquote)');
    childElements.forEach(child => {
      // Only apply if this element is not inside a nested blockquote
      let hasBlockquoteParent = false;
      let checkParent = child.parentElement;
      while (checkParent && checkParent !== blockquote) {
        if (checkParent.tagName === 'BLOCKQUOTE') {
          hasBlockquoteParent = true;
          break;
        }
        checkParent = checkParent.parentElement;
      }
      
      if (!hasBlockquoteParent) {
        child.style.color = color;
      }
    });
  });
  
  // Also handle any quote prefixes or other quote indicators
  const quotePrefixes = document.querySelectorAll('.moz-cite-prefix');
  quotePrefixes.forEach(prefix => {
    prefix.style.color = '#3366ff';
  });
  
  // Handle forward containers
  const forwardContainers = document.querySelectorAll('.moz-forward-container');
  forwardContainers.forEach(container => {
    if (!container.querySelector('blockquote[type="cite"]')) {
      container.style.color = '#3366ff';
    }
  });
}

// Apply colors on initial load
applyQuoteColors();

// Set up an observer to handle dynamic content changes
const observer = new MutationObserver((mutations) => {
  // Check if any mutations affect blockquotes
  let needsUpdate = false;
  
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      // Check if blockquotes were added or removed
      const addedBlockquotes = Array.from(mutation.addedNodes).some(node => 
        node.nodeType === 1 && (node.tagName === 'BLOCKQUOTE' || node.querySelector?.('blockquote'))
      );
      const removedBlockquotes = Array.from(mutation.removedNodes).some(node => 
        node.nodeType === 1 && (node.tagName === 'BLOCKQUOTE' || node.querySelector?.('blockquote'))
      );
      
      if (addedBlockquotes || removedBlockquotes) {
        needsUpdate = true;
        break;
      }
    }
  }
  
  if (needsUpdate) {
    applyQuoteColors();
  }
});

// Start observing the document body for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also apply colors whenever the compose window gains focus
// This helps ensure colors are applied after any paste operations
window.addEventListener('focus', applyQuoteColors);

// Apply colors on any paste events
document.addEventListener('paste', () => {
  setTimeout(applyQuoteColors, 100);
});

console.log('Quote Color compose script loaded');