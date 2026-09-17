/* Integrações preservadas. Um carregamento de cada ferramenta por página. */
(() => {
  'use strict';
  function loadTracking() {
    if (window.__perfilPsiTracking) return;
    window.__perfilPsiTracking = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const gtm = document.createElement('script');
    gtm.async = true;
    gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KRNL794W';
    document.head.appendChild(gtm);
    if (!window.fbq) {
      const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      const pixel = document.createElement('script');
      pixel.async = true;
      pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(pixel);
    }
    window.fbq('init', '4423241638005386');
    window.fbq('track', 'PageView');
  }
  function schedule() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadTracking, { timeout: 1500 });
    else window.setTimeout(loadTracking, 0);
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
