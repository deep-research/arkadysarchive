(function() {
  function syncTheme() {
    const metaTag = document.getElementById('pwa-theme-color');
    if (!metaTag) return;

    // Grab the exact theme color calculated by PaperMod's stylesheet
    let activeColor = window.getComputedStyle(document.documentElement).getPropertyValue('--theme').trim();

    // Secondary fallback to body or standard colors if the variable is empty
    if (!activeColor) {
      activeColor = window.getComputedStyle(document.body || document.documentElement).backgroundColor;
    }
    
    if (activeColor && activeColor !== 'transparent' && activeColor !== 'rgba(0, 0, 0, 0)') {
      metaTag.setAttribute('content', activeColor);
    }
  }

  // Observe HTML class changes (like when switching to dark mode)
  const observer = new MutationObserver(syncTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Run on layout events
  document.addEventListener('DOMContentLoaded', syncTheme);
  window.addEventListener('load', syncTheme);
})();
