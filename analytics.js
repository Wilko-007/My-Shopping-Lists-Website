/* Optional Google Analytics 4 tracking; no Google script is loaded before consent. */
(function () {
  'use strict';
  var measurementId = 'G-M7FTCPVLHX';
  var key = 'msl_analytics_consent_v1';
  function getChoice() {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }
  function enableAnalytics() {
    if (window.__mslAnalyticsLoaded) return;
    window.__mslAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: true });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }
  function setChoice(value) {
    saveChoice(value);
    if (value === 'accepted') enableAnalytics();
    if (value === 'rejected' && window.__mslAnalyticsLoaded) {
      window.location.reload(); // stop tracking already loaded during this page visit
      return;
    }
    var banner = document.getElementById('analytics-consent');
    if (banner) banner.remove();
  }
  function showChoice() {
    if (document.getElementById('analytics-consent')) return;
    var banner = document.createElement('aside');
    banner.id = 'analytics-consent';
    banner.setAttribute('aria-label', 'Analytics preferences');
    banner.innerHTML = '<div><strong>Help us improve My Shopping Lists</strong><p>May we use optional Google Analytics to understand website visits and Google Play clicks? You can say no and still use the site. <a href="privacy.html">Privacy Policy</a></p></div><div class="analytics-buttons"><button type="button" id="analytics-decline">No thanks</button><button type="button" id="analytics-accept">Allow analytics</button></div>';
    document.body.appendChild(banner);
    document.getElementById('analytics-decline').addEventListener('click', function () { setChoice('rejected'); });
    document.getElementById('analytics-accept').addEventListener('click', function () { setChoice('accepted'); });
  }
  function init() {
    var choice = getChoice();
    if (choice === 'accepted') enableAnalytics();
    else if (!choice) showChoice();
    var privacyButton = document.getElementById('analytics-preferences');
    if (privacyButton) privacyButton.addEventListener('click', function () { showChoice(); });
    document.querySelectorAll('a[href*="play.google.com/store/apps/details"]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (getChoice() === 'accepted' && typeof window.gtag === 'function') {
          window.gtag('event', 'google_play_click', { link_url: link.href, transport_type: 'beacon' });
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
