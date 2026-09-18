function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  btn.textContent = theme === 'light' ? '🌙 Dark mode' : '☀ Light mode';
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