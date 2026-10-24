function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === 'light' ? '🌙 Dark mode' : '☀ Light mode';
  }
  try { localStorage.setItem('theme', theme); } catch (e) { /* storage blocked */ }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

// Restore saved theme on page load
(function () {
  let saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) { /* storage blocked */ }
  applyTheme(saved);
})();

// Text size buttons (A- / A+) beside the theme toggle, remembered for next visit
(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const SIZES = [100, 112, 125, 140];   // percent of the normal text size
  let level = 0;
  try { level = Number(localStorage.getItem('textSize')) || 0; } catch (e) { /* storage blocked */ }
  level = Math.min(Math.max(level, 0), SIZES.length - 1);

  const wrap = document.createElement('div');
  wrap.className = 'page-tools';
  toggle.parentNode.insertBefore(wrap, toggle);

  function makeButton(label, title) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'text-btn';
    b.textContent = label;
    b.title = title;
    b.setAttribute('aria-label', title);
    return b;
  }

  const smaller = makeButton('A−', 'Smaller text');
  const larger = makeButton('A+', 'Larger text');
  wrap.appendChild(smaller);
  wrap.appendChild(toggle);
  wrap.appendChild(larger);

  function applySize() {
    document.documentElement.style.fontSize = SIZES[level] + '%';
    smaller.disabled = level === 0;
    larger.disabled = level === SIZES.length - 1;
    smaller.style.opacity = smaller.disabled ? '0.45' : '1';
    larger.style.opacity = larger.disabled ? '0.45' : '1';
    try { localStorage.setItem('textSize', String(level)); } catch (e) { /* storage blocked */ }
  }

  smaller.addEventListener('click', () => { level = Math.max(0, level - 1); applySize(); });
  larger.addEventListener('click', () => { level = Math.min(SIZES.length - 1, level + 1); applySize(); });
  applySize();
})();

// Nav links: only the last-clicked link stays highlighted
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact form: sent to my email through FormSubmit (no server needed)
const contactForm = document.getElementById('contact-form');
if (contactForm && window.fetch) {
  const sendBtn = document.getElementById('cf-send');
  const statusEl = document.getElementById('cf-status');

  function showStatus(text, kind) {
    statusEl.className = kind;
    statusEl.textContent = text;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    if (data.get('_honey')) return; // only spam bots fill the hidden field

    const payload = {};
    data.forEach((value, key) => { payload[key] = value; });

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';
    showStatus('', '');

    fetch('https://formsubmit.co/ajax/danieloluwabiyi84@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json().then((json) => ({ ok: res.ok, json })))
      .then((result) => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
        if (result.ok && (result.json.success === true || result.json.success === 'true')) {
          contactForm.reset();
          showStatus('Thank you! Your message was sent.', 'ok');
        } else {
          showStatus('Sorry, that did not send. Please use the email or WhatsApp icons above.', 'err');
        }
      })
      .catch(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
        showStatus('Sorry, that did not send. Please use the email or WhatsApp icons above.', 'err');
      });
  });
}

// Scroll reveal + animated skill bars.
// Content is only hidden (by the CSS class "js-reveal") when this animation can run,
// so a browser without IntersectionObserver still shows everything.
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('.skill-fill').forEach((fill) => {
            fill.style.width = fill.dataset.level;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.skill-fill').forEach((fill) => {
      fill.style.width = fill.dataset.level;
    });
  }
}
