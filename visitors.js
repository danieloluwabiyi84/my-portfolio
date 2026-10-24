/* =====================================================================
   Visit counter
   Counts visits to every page of this portfolio with GoatCounter, a
   free visitor counter that uses no cookies and stores no personal data.

   Set-up (once, about 3 minutes):
   1. Sign up free at https://www.goatcounter.com/signup and choose the
      site code below as your "Site code" (change CODE here if you pick
      a different one).
   2. In GoatCounter go to Settings > Site and tick
      "Allow adding visitor counts on your website". Save.
   3. See your numbers any time at https://YOURCODE.goatcounter.com

   To stop counting your own visits, open any page of your site ONCE on
   your phone with ?notrack=1 at the end of the address
   (for example .../my-portfolio/index.html?notrack=1).
   Use ?notrack=0 to start counting that phone again.
   ===================================================================== */
(function () {
  'use strict';

  var CODE = 'danieloluwabiyi84';
  var BASE = 'https://' + CODE + '.goatcounter.com';

  function toast(text) {
    var t = document.createElement('div');
    t.textContent = text;
    t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;left:50%;bottom:78px;transform:translateX(-50%);z-index:90;' +
      'max-width:90vw;padding:10px 16px;border-radius:12px;background:#1e1730;color:#f0ecf7;' +
      'border:1px solid #a855f7;font:600 .9rem/1.4 sans-serif;text-align:center;box-shadow:0 6px 18px rgba(0,0,0,.4)';
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4500);
  }

  // owner switch: ?notrack=1 stops counting this phone, ?notrack=0 starts again
  try {
    var m = /[?&]notrack=([01])/.exec(window.location.search);
    if (m) {
      if (m[1] === '1') {
        localStorage.setItem('skipgc', 't');
        document.addEventListener('DOMContentLoaded', function () { toast('✅ Your visits on this phone will not be counted.'); });
      } else {
        localStorage.removeItem('skipgc');
        document.addEventListener('DOMContentLoaded', function () { toast('✅ Your visits on this phone will be counted again.'); });
      }
    }
  } catch (e) { /* storage blocked: nothing to do */ }

  // 1. the counting script (adds one visit per person per page view; no cookies)
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', BASE + '/count');
  document.head.appendChild(s);

  // 2. show the total on pages that have a #visit-count element
  function showTotal() {
    var number = document.getElementById('visit-count');
    var line = document.getElementById('visit-line');
    if (!number || !line || !window.fetch) return;
    fetch(BASE + '/counter/TOTAL.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        // GoatCounter sends the total as text such as "1 234"; stay hidden while it is still 0
        var total = data ? parseInt(String(data.count).replace(/\D/g, ''), 10) : 0;
        if (total > 0) {
          number.textContent = data.count;
          line.hidden = false;
        }
      })
      .catch(function () { /* counter not set up yet or blocked: keep the line hidden */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showTotal);
  else showTotal();
})();
