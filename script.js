/* ============================================================
   ZUBAIR IDRIS AWEDA — Portfolio Script
   ============================================================ */

/* ── Nav: scroll shadow + mobile toggle ──────────────────── */
(function () {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('burger');
    const links = document.getElementById('navLinks');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    }, {passive: true});

    burger && burger.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close nav on link click (mobile)
    links && links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            burger && burger.setAttribute('aria-expanded', 'false');
        });
    });
})();

/* ── Reveal on scroll ─────────────────────────────────────── */
(function () {
    const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        }),
        {threshold: 0.08, rootMargin: '0px 0px -40px 0px'}
    );

    document.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = `${(i % 5) * 0.07}s`;
        observer.observe(el);
    });
})();

/* ── Latest writing: freeCodeCamp RSS with a static fallback ── */
(function () {
    const container = document.getElementById('articles-grid');
    if (!container) return;

    const FEED = 'https://www.freecodecamp.org/news/author/Zubs/rss/';

    // The feed does not send CORS headers, so it is read through a public proxy.
    // Proxies go down from time to time, so several are tried in order.
    const PROXIES = [
        url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        url => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
        url => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
    ];

    const TIMEOUT_MS = 6000;

    // Shown straight away, then replaced if the live feed loads.
    const FALLBACK = [
        {
            title: 'How Relational Database Constraints Work and Why They\'re Important',
            url: 'https://www.freecodecamp.org/news/how-relational-database-constraints-work-and-why-theyre-important/',
            date: 'Jan 2026',
            source: 'freeCodeCamp'
        },
        {
            title: 'Learn Relational Database Basics: Key Concepts for Beginners',
            url: 'https://www.freecodecamp.org/news/learn-relational-database-basics-key-concepts-for-beginners/',
            date: 'Jan 2025',
            source: 'freeCodeCamp'
        },
        {
            title: 'Collect.js Tutorial: How to Work with JavaScript Arrays and Objects',
            url: 'https://www.freecodecamp.org/news/work-with-javascript-arrays-objects-with-collect-js/',
            date: 'Jan 2024',
            source: 'freeCodeCamp'
        },
        {
            title: 'Kafka vs RabbitMQ: What Are the Differences?',
            url: 'https://earthly.dev/blog/kafka-vs-rabbitmq/',
            date: 'Oct 2023',
            source: 'Earthly'
        },
        {
            title: 'How to Use Queues in Web Applications: Node.js and Redis Tutorial',
            url: 'https://www.freecodecamp.org/news/how-to-use-queues-in-web-applications/',
            date: 'Jul 2023',
            source: 'freeCodeCamp'
        },
        {
            title: 'How to Use Redis in Your PHP Apps',
            url: 'https://www.freecodecamp.org/news/how-to-use-redis-with-php/',
            date: 'May 2023',
            source: 'freeCodeCamp'
        },
    ];

    function escapeHTML(str) {
        return String(str).replace(/[&<>"']/g, ch => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[ch]));
    }

    function safeUrl(url) {
        return /^https:\/\//i.test(url) ? url : '#';
    }

    function renderArticles(items) {
        container.innerHTML = '';
        items.slice(0, 6).forEach(item => {
            const card = document.createElement('div');
            card.className = 'article-card reveal visible';
            card.innerHTML = `
        <a href="${escapeHTML(safeUrl(item.url))}" target="_blank" rel="noopener">
          <span class="article-source">${escapeHTML(item.source)}</span>
          <span class="article-title">${escapeHTML(item.title)}</span>
          <span class="article-date">${escapeHTML(item.date)}</span>
        </a>`;
            container.appendChild(card);
        });
    }

    function parseRSS(xmlStr) {
        const doc = new DOMParser().parseFromString(xmlStr, 'text/xml');
        if (doc.querySelector('parsererror')) return [];

        return Array.from(doc.querySelectorAll('item')).map(item => {
            const pub = new Date(item.querySelector('pubDate')?.textContent || '');
            return {
                title: item.querySelector('title')?.textContent?.trim() || '',
                url: item.querySelector('link')?.textContent?.trim() || '#',
                date: isNaN(pub) ? '' : pub.toLocaleDateString('en-GB', {month: 'short', year: 'numeric'}),
                source: 'freeCodeCamp'
            };
        }).filter(a => a.title && a.url !== '#');
    }

    function fetchWithTimeout(url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
        return fetch(url, {signal: controller.signal})
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.text();
            })
            .finally(() => clearTimeout(timer));
    }

    async function loadLiveFeed() {
        for (const proxy of PROXIES) {
            try {
                const items = parseRSS(await fetchWithTimeout(proxy(FEED)));
                if (items.length) return items;
            } catch (e) {
                // Try the next proxy
            }
        }
        return null;
    }

    renderArticles(FALLBACK);
    loadLiveFeed().then(items => {
        if (items) renderArticles(items);
    });
})();

/* ── Typed hero subtitle ──────────────────────────────────── */
(function () {
    const el = document.getElementById('hero-typed');
    if (!el) return;

    const phrases = [
        'Full-Stack Engineer',
        'Open Source Contributor',
        'Technical Writer',
    ];

    let pi = 0, ci = 0, deleting = false;
    const SPEED_TYPE = 80, SPEED_DEL = 40, PAUSE = 1800;

    function tick() {
        const phrase = phrases[pi];
        if (!deleting) {
            el.textContent = phrase.slice(0, ++ci);
            if (ci === phrase.length) {
                deleting = true;
                return setTimeout(tick, PAUSE);
            }
        } else {
            el.textContent = phrase.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
        }
        setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
    }

    tick();
})();
