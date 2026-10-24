/* =====================================================================
   Portfolio Guide
   A friendly helper that answers questions about this portfolio and
   shows visitors around. It does NOT use an AI service: the answers
   below were written by Daniel, and the guide picks the best match for
   what the visitor types (it forgives small spelling mistakes).

   To connect a real AI model later, put the address of your own AI
   endpoint in GUIDE_API_URL. Leave it empty to use the built-in answers.
   ===================================================================== */
(function () {
  'use strict';

  var GUIDE_API_URL = '';   // e.g. 'https://your-site.vercel.app/api/guide' (optional, see advice)

  var HOME = 'index.html';
  var REPO = 'https://github.com/danieloluwabiyi84/my-portfolio';

  var L = {
    education:   { label: 'Education', href: HOME + '#education' },
    skills:      { label: 'Skills', href: HOME + '#skills' },
    projects:    { label: 'Projects', href: HOME + '#projects' },
    contact:     { label: 'Contact section', href: HOME + '#contact' },
    form:        { label: 'Write a message', href: HOME + '#contact-form' },
    game:        { label: '▶ Play Tic Tac Toe', href: 'tic-tac-toe.html' },
    tools:       { label: '▶ Electronics Tools', href: 'electronics-tools.html' },
    checkout:    { label: '▶ Checkout demo', href: 'payment-page.html' },
    hobbies:     { label: 'Hobbies page', href: 'my-hobbies.html' },
    email:       { label: 'Email', href: 'mailto:danieloluwabiyi84@gmail.com', external: true },
    whatsapp:    { label: 'WhatsApp', href: 'https://wa.me/23408080923053', external: true },
    linkedin:    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-oluwabiyi', external: true },
    github:      { label: 'GitHub', href: 'https://github.com/danieloluwabiyi84', external: true },
    repo:        { label: 'Source code', href: REPO, external: true }
  };

  /* Each topic: words the visitor might use, the answer, and buttons to show.
     Words with a space are matched as phrases (they count more). */
  var TOPICS = [
    {
      id: 'tour',
      words: ['tour', 'show me around', 'guide me', 'where do i start', 'where should i start', 'start here', 'navigate', 'what can i do here', 'sections', 'recommend', 'suggest', 'first time'],
      answer: "Here's a quick tour: start with Education to see where Daniel is heading, check his Skills, then open Projects and try the Tic Tac Toe game. When you're done, the Contact section has the ways to reach him.",
      links: [L.education, L.skills, L.projects, L.game, L.contact]
    },
    {
      id: 'about',
      words: ['who is daniel', 'about daniel', 'tell me about daniel', 'tell me about him', 'who are you', 'about you', 'about yourself', 'who is he', 'introduce', 'background', 'profile', 'summary', 'overview', 'owner'],
      answer: "Daniel Oluwabiyi Oluwatunmise is an aspiring web developer who loves building clean, functional, user-focused websites. He is a beginner who learns fast, pays attention to detail and wants to work on real projects with a team. He is also about to study Electrical/Electronic Engineering at UNIOSUN.",
      links: [L.skills, L.projects]
    },
    {
      id: 'education',
      words: ['education', 'school', 'study', 'studying', 'university', 'uniosun', 'osun', 'college', 'copeland', 'course', 'degree', 'engineering', 'graduated', 'graduate', 'qualification', 'qualifications', 'electrical', 'electronic', 'admitted', 'admission', 'student'],
      answer: "Daniel has been admitted to the University of Osun (UNIOSUN) to study Electrical/Electronic Engineering. Before that he attended Copeland College, a secondary school in Ikorodu, Lagos, Nigeria, and graduated in 2026.",
      links: [L.education]
    },
    {
      id: 'skills',
      words: ['skill', 'skills', 'technology', 'technologies', 'tech', 'stack', 'language', 'languages', 'html', 'css', 'javascript', 'js', 'python', 'algorithm', 'algorithms', 'deploy', 'deployment', 'programming', 'coding', 'good at', 'what can he do', 'abilities', 'expertise', 'strengths', 'github pages'],
      answer: "Daniel's strongest skills are HTML and CSS (about 90%). He is at about 60% in JavaScript and in algorithms & problem solving, 55% in GitHub & deployment, and 50% in Python. He is still learning, and the project cards show these skills in action.",
      links: [L.skills, L.projects]
    },
    {
      id: 'projects',
      words: ['project', 'projects', 'portfolio work', 'work samples', 'examples', 'demo', 'demos', 'samples', 'created', 'apps', 'websites', 'show me', 'what has he built', 'what did he build', 'made'],
      answer: "Daniel has built four projects: a Tic Tac Toe game with an unbeatable computer opponent, a set of Electronics Tools, a demo checkout page, and this portfolio website. Which one would you like to try?",
      links: [L.game, L.tools, L.checkout, L.projects]
    },
    {
      id: 'game',
      words: ['game', 'games', 'tic tac toe', 'tictactoe', 'x and o', 'xo', 'minimax', 'tournament', 'play', 'computer opponent', 'unbeatable', 'score history', 'noughts', 'crosses'],
      answer: "The Tic Tac Toe (X and O) game has three board themes, a computer opponent (Easy, Medium, and an unbeatable Hard level that uses the minimax algorithm), score history saved on your phone, and offline tournaments against bots. You can set the match target up to 200.",
      links: [L.game]
    },
    {
      id: 'electronics',
      words: ['electronics', 'electronic tools', 'ohm', 'ohms', 'resistor', 'resistors', 'circuit', 'circuits', 'calculator', 'colour code', 'color code', 'voltage', 'current', 'tools'],
      answer: "Electronics Tools has an Ohm's law calculator, a resistor colour code decoder (4 and 5 bands) and a series/parallel resistor calculator. Daniel is starting Electrical/Electronic Engineering, so this project is close to what he will study.",
      links: [L.tools]
    },
    {
      id: 'checkout',
      words: ['payment', 'checkout', 'pay', 'card', 'credit card', 'billing'],
      answer: "The Demo Checkout Page formats card numbers automatically, detects the card type and shows a simulated payment button. It is only a demo: no real payment is made and nothing you type is sent anywhere.",
      links: [L.checkout]
    },
    {
      id: 'contact',
      words: ['contact', 'email', 'mail', 'e-mail', 'whatsapp', 'reach', 'message', 'call', 'phone', 'number', 'linkedin', 'social', 'talk', 'get in touch', 'connect', 'write to', 'send message', 'his github', 'github profile', 'github account', 'github link', 'github username'],
      answer: "You can reach Daniel by email, WhatsApp, LinkedIn or GitHub, or send a message with the contact form at the bottom of the home page.",
      links: [L.email, L.whatsapp, L.linkedin, L.github, L.form]
    },
    {
      id: 'hire',
      words: ['hire', 'hiring', 'job', 'jobs', 'internship', 'intern', 'opportunity', 'opportunities', 'collaborate', 'collaboration', 'freelance', 'work with', 'available', 'availability', 'experience', 'employ', 'recruit', 'vacancy', 'team'],
      answer: "Daniel has no formal work experience yet. He is building his portfolio and is keen to learn and join a team of developers. If you have an opportunity, a project idea or a question, please send him a message.",
      links: [L.form, L.whatsapp, L.email]
    },
    {
      id: 'hobbies',
      words: ['hobby', 'hobbies', 'football', 'soccer', 'music', 'piano', 'keyboard', 'interests', 'free time', 'fun', 'like to do'],
      answer: "Daniel enjoys playing football, listening to music, and playing the keyboard/piano (he is learning it, and does it for fun).",
      links: [L.hobbies]
    },
    {
      id: 'certificates',
      words: ['certificate', 'certificates', 'certification', 'certifications', 'award', 'awards', 'accomplishments', 'achievements'],
      answer: "Daniel doesn't have any certificates or awards yet. He is still learning and building projects, and he will add certificates here when he earns them.",
      links: []
    },
    {
      id: 'resume',
      words: ['resume', 'cv', 'curriculum vitae'],
      answer: "There is no downloadable résumé on the site right now. Everything about Daniel is on these pages, and you can message him if you would like more detail.",
      links: [L.form]
    },
    {
      id: 'reading',
      words: ['dark mode', 'light mode', 'theme', 'dark', 'light', 'text size', 'font', 'bigger', 'larger', 'smaller', 'readable', 'zoom', 'accessibility', 'hard to read', 'too small'],
      answer: "Use the buttons at the top of the page: the Light/Dark button changes the colours, and A− / A+ make the text smaller or bigger. The site remembers your choice for your next visit.",
      links: []
    },
    {
      id: 'source',
      words: ['source code', 'source', 'repository', 'repo', 'open source', 'how was this built', 'how is this built', 'how did he build', 'made with', 'built with', 'built using', 'technology used', 'how was it made'],
      answer: "This site is built with plain HTML, CSS and JavaScript (no frameworks) and is hosted on GitHub Pages and Vercel. You can read all the code on Daniel's GitHub.",
      links: [L.repo]
    },
    {
      id: 'visitors',
      words: ['visitor', 'visitors', 'counter', 'privacy', 'cookies', 'tracking', 'analytics', 'views', 'my data'],
      answer: "The site counts visits so Daniel can see how many people look at his portfolio. It uses no cookies and collects no personal information. The messages you type to me are not saved.",
      links: []
    },
    {
      id: 'identity',
      words: ['are you ai', 'are you a bot', 'are you human', 'are you real', 'chatgpt', 'claude', 'robot', 'real person', 'ai', 'bot', 'artificial'],
      answer: "I'm the Portfolio Guide, a helper built into this site. I'm not a full AI model: my answers were written by Daniel, and I pick the best match for your question. I know this portfolio well, though!",
      links: []
    },
    {
      id: 'thanks',
      words: ['thanks', 'thank you', 'thank', 'cheers', 'great', 'awesome', 'nice', 'cool', 'bye', 'goodbye', 'see you'],
      answer: "You're welcome! Ask me anything else about the portfolio, or message Daniel through the contact section.",
      links: [L.form]
    },
    {
      id: 'greeting',
      words: ['hi', 'hello', 'hey', 'hola', 'good morning', 'good afternoon', 'good evening', 'help', 'start', 'menu'],
      answer: "Hi! I'm the Portfolio Guide. I can tell you about Daniel, his skills and projects, or help you get in touch. What would you like to know?",
      links: []
    }
  ];

  var FALLBACK = {
    id: 'unanswered',
    answer: "I can only answer questions about this portfolio. Try asking about Daniel's skills, projects, education or how to contact him, or tap one of the buttons below.",
    links: [L.projects, L.form]
  };

  var CHIPS = ['Give me a tour', 'Who is Daniel?', 'Show projects', 'Play the game', 'Contact Daniel'];

  /* ---------- matching ---------- */

  function normalise(text) {
    return ' ' + String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }

  function distance(a, b) {
    // edit distance, enough to forgive one typo
    if (Math.abs(a.length - b.length) > 1) return 2;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }

  function scoreTopic(topic, padded, tokens) {
    var score = 0;
    topic.words.forEach(function (w) {
      if (w.indexOf(' ') !== -1) {
        if (padded.indexOf(' ' + w + ' ') !== -1) score += 3;
      } else if (tokens.indexOf(w) !== -1) {
        score += 2;
      } else if (w.length >= 5) {
        for (var i = 0; i < tokens.length; i++) {
          if (tokens[i].length >= 5 && distance(tokens[i], w) <= 1) { score += 1; break; }
        }
      }
    });
    return score;
  }

  function findTopic(question) {
    var padded = normalise(question);
    var tokens = padded.trim().split(' ');
    var best = null, bestScore = 0;
    TOPICS.forEach(function (t) {
      var s = scoreTopic(t, padded, tokens);
      if (s > bestScore) { best = t; bestScore = s; }
    });
    if (best) return best;
    if (tokens.indexOf('daniel') !== -1) return TOPICS.filter(function (t) { return t.id === 'about'; })[0];   // just his name: introduce him
    return FALLBACK;
  }

  /* ---------- optional real-AI hook ---------- */

  function remoteAnswer(question) {
    if (!GUIDE_API_URL || !window.fetch) return Promise.resolve(null);
    return fetch(GUIDE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question })
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && typeof j.answer === 'string' ? j.answer : null; })
      .catch(function () { return null; });
  }

  /* ---------- tiny anonymous usage counts (no text is sent) ---------- */

  function track(name, title) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({ path: 'guide/' + name, title: title || name, event: true });
      }
    } catch (e) { /* ignore */ }
  }

  /* ---------- look and feel ---------- */

  var CSS = '' +
    '#guide-root{position:fixed;left:14px;bottom:14px;z-index:60;font-family:inherit}' +
    '#guide-fab{display:flex;align-items:center;gap:6px;padding:11px 16px;border:0;border-radius:999px;background:var(--accent,#a855f7);color:#fff;font:inherit;font-size:.95rem;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.35)}' +
    '#guide-nudge{position:absolute;left:4px;bottom:58px;width:max-content;max-width:230px;padding:8px 12px;border-radius:12px;background:var(--surface,#1e1730);color:var(--text,#f0ecf7);border:1px solid var(--border,#3a2e52);font-size:.88rem;line-height:1.4;box-shadow:0 6px 18px rgba(0,0,0,.3)}' +
    '#guide-panel{position:absolute;left:0;bottom:58px;width:min(380px,calc(100vw - 28px));max-height:min(540px,calc(100vh - 110px));display:flex;flex-direction:column;overflow:hidden;background:var(--surface,#1e1730);color:var(--text,#f0ecf7);border:1px solid var(--border,#3a2e52);border-radius:14px;box-shadow:0 12px 36px rgba(0,0,0,.45)}' +
    '#guide-panel[hidden],#guide-nudge[hidden]{display:none}' +
    '.g-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 14px;border-bottom:1px solid var(--border,#3a2e52)}' +
    '.g-head strong{font-size:1rem}' +
    '.g-head small{display:block;color:var(--muted,#b3a6c9);font-size:.78rem}' +
    '.g-close{border:0;background:transparent;color:inherit;font-size:1.2rem;line-height:1;padding:6px 8px;cursor:pointer;border-radius:8px}' +
    '.g-log{flex:1;min-height:120px;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}' +
    '.g-msg{max-width:90%;padding:9px 12px;border-radius:12px;font-size:.95rem;line-height:1.55;overflow-wrap:anywhere}' +
    '.g-bot{align-self:flex-start;background:var(--card-dark,#0d0815);border:1px solid var(--border,#3a2e52)}' +
    '.g-user{align-self:flex-end;background:var(--accent,#a855f7);color:#fff}' +
    '.g-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}' +
    'a.g-link{padding:6px 12px;border:1px solid var(--accent-bright,#d8b4fe);border-radius:999px;color:var(--accent-bright,#d8b4fe);font-size:.82rem;font-weight:700;text-decoration:none}' +
    '.g-chips{display:flex;gap:6px;padding:8px 12px;overflow-x:auto;border-top:1px solid var(--border,#3a2e52)}' +
    '.g-chip{flex:0 0 auto;padding:6px 12px;border:1px solid var(--border,#3a2e52);border-radius:999px;background:transparent;color:var(--accent-bright,#d8b4fe);font:inherit;font-size:.82rem;font-weight:600;cursor:pointer;white-space:nowrap}' +
    '.g-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--border,#3a2e52)}' +
    '.g-form input{flex:1;min-width:0;padding:9px 14px;border:1px solid var(--border,#3a2e52);border-radius:999px;background:var(--bg,#150f1f);color:inherit;font:inherit;font-size:1rem}' +
    '.g-form button{border:0;border-radius:999px;padding:9px 16px;background:var(--accent,#a855f7);color:#fff;font:inherit;font-weight:700;cursor:pointer}' +
    '.g-dots span{display:inline-block;width:6px;height:6px;margin:0 2px;border-radius:50%;background:var(--muted,#b3a6c9);animation:g-blink 1s infinite}' +
    '.g-dots span:nth-child(2){animation-delay:.2s}.g-dots span:nth-child(3){animation-delay:.4s}' +
    '@keyframes g-blink{0%,80%,100%{opacity:.25}40%{opacity:1}}' +
    '@media print{#guide-root{display:none}}';

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text) n.textContent = text;
    return n;
  }

  function init() {
    if (document.getElementById('guide-root')) return;

    var style = el('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var root = el('div', { id: 'guide-root' });
    var fab = el('button', { id: 'guide-fab', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'guide-panel' }, '💬 Ask the guide');
    var nudge = el('div', { id: 'guide-nudge', hidden: '' }, '👋 New here? Ask me for a quick tour.');

    var panel = el('div', { id: 'guide-panel', role: 'dialog', 'aria-label': 'Portfolio Guide', hidden: '' });
    var head = el('div', { class: 'g-head' });
    var title = el('div');
    title.appendChild(el('strong', null, '🧭 Portfolio Guide'));
    title.appendChild(el('small', null, 'Answers about Daniel and this site'));
    var close = el('button', { class: 'g-close', type: 'button', 'aria-label': 'Close guide' }, '✕');
    head.appendChild(title);
    head.appendChild(close);

    var log = el('div', { class: 'g-log', role: 'log', 'aria-live': 'polite' });
    var chips = el('div', { class: 'g-chips' });
    var form = el('form', { class: 'g-form', autocomplete: 'off' });
    var input = el('input', { type: 'text', maxlength: '200', placeholder: 'Ask about Daniel…', 'aria-label': 'Your question' });
    var send = el('button', { type: 'submit' }, 'Send');
    form.appendChild(input);
    form.appendChild(send);

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(chips);
    panel.appendChild(form);
    root.appendChild(nudge);
    root.appendChild(panel);
    root.appendChild(fab);
    document.body.appendChild(root);

    var greeted = false;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function scrollLog() { log.scrollTop = log.scrollHeight; }

    function addUser(text) {
      log.appendChild(el('div', { class: 'g-msg g-user' }, text));
      scrollLog();
    }

    function botBubble(answer, links) {
      var b = el('div', { class: 'g-msg g-bot' });
      b.appendChild(el('div', null, answer));
      if (links && links.length) {
        var row = el('div', { class: 'g-links' });
        links.forEach(function (l) {
          var a = el('a', { class: 'g-link', href: l.href }, l.label);
          if (l.external) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
          else a.addEventListener('click', function () { setOpen(false); });
          row.appendChild(a);
        });
        b.appendChild(row);
      }
      return b;
    }

    function addBot(answer, links, instant) {
      var typing = el('div', { class: 'g-msg g-bot g-dots' });
      typing.innerHTML = '<span></span><span></span><span></span>';
      if (!instant && !reduceMotion) {
        log.appendChild(typing);
        scrollLog();
      }
      setTimeout(function () {
        if (typing.parentNode) typing.parentNode.removeChild(typing);
        log.appendChild(botBubble(answer, links));
        scrollLog();
      }, instant || reduceMotion ? 0 : 450);
    }

    function ask(question) {
      var q = question.trim();
      if (!q) return;
      addUser(q);
      var topic = findTopic(q);
      track(topic.id, 'Guide topic: ' + topic.id);

      if (GUIDE_API_URL && topic.id === 'unanswered') {
        remoteAnswer(q).then(function (text) {
          if (text) addBot(text, [], true);
          else addBot(topic.answer, topic.links);
        });
        return;
      }
      addBot(topic.answer, topic.links);
    }

    CHIPS.forEach(function (c) {
      var b = el('button', { type: 'button', class: 'g-chip' }, c);
      b.addEventListener('click', function () { ask(c); });
      chips.appendChild(b);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value;
      input.value = '';
      ask(q);
    });

    function setOpen(open) {
      panel.hidden = !open;
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
      nudge.hidden = true;
      if (open) {
        track('open', 'Guide opened');
        if (!greeted) {
          greeted = true;
          addBot("Hi, I'm the Portfolio Guide! 👋 Ask me about Daniel, his skills and projects, or tap a button below.", [], true);
        }
        setTimeout(function () { input.focus(); }, 50);
      }
    }

    fab.addEventListener('click', function () { setOpen(panel.hidden); });
    close.addEventListener('click', function () { setOpen(false); fab.focus(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { setOpen(false); fab.focus(); }
    });

    // a gentle, one-time hint for new visitors (never again in the same visit)
    try {
      if (!sessionStorage.getItem('guideNudged')) {
        sessionStorage.setItem('guideNudged', '1');
        setTimeout(function () { if (panel.hidden) nudge.hidden = false; }, 4000);
        setTimeout(function () { nudge.hidden = true; }, 11000);
      }
    } catch (e) { /* storage blocked: skip the hint */ }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
