function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === 'light' ? '🌙 Dark mode' : '☀ Light mode';
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

// Restore saved theme on page load
(function () {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
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

// Scroll reveal + animated skill bars
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
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
  }, { threshold: 0.2 });

  revealEls.forEach((el) => observer.observe(el));
}
