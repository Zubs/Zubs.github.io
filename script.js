/* ============================================================
   ZUBAIR IDRIS AWEDA — Portfolio Script
   ============================================================ */

/* ── Nav: scroll shadow + mobile toggle ──────────────────── */
(function () {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('burger');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    }, {passive: true});

    burger && burger.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Close nav on link click (mobile)
    links && links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
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

/* ── Project filter ───────────────────────────────────────── */
(function () {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.dataset.filter;
            cards.forEach(c => {
                const match = cat === 'all' || c.dataset.category === cat;
                c.classList.toggle('hidden', !match);
            });
        });
    });
})();

/* ── Dynamic blog feed from freeCodeCamp via RSS ─────────── */
(function () {
    const container = document.getElementById('articles-grid');
    if (!container) return;

    // Use AllOrigins to bypass CORS on the freeCodeCamp RSS feed
    const RSS_URL = encodeURIComponent(
        'https://www.freecodecamp.org/news/author/zubairidrisaweda/rss/'
    );
    const PROXY = `https://api.allorigins.win/get?url=${RSS_URL}`;

    // Fallback articles (static) in case feed fails
    const FALLBACK = [
        {
            title: 'Kafka vs RabbitMQ: What Are the Differences?',
            url: 'https://earthly.dev/blog/kafka-vs-rabbitmq/',
            date: 'Dec 2022',
            source: 'Earthly'
        },
        {
            title: 'Build a Flight Booking App with PHP and Bootstrap — Part 1',
            url: 'https://draft.dev/',
            date: 'May 2022',
            source: 'Draft.dev'
        },
        {
            title: 'Getting Started With Alpine.js',
            url: 'https://www.section.io/engineering-education/getting-started-with-alpinejs/',
            date: 'Nov 2021',
            source: 'Section.io'
        },
    ];

    function renderArticles(items) {
        container.innerHTML = '';
        items.slice(0, 6).forEach(item => {
            const card = document.createElement('div');
            card.className = 'article-card reveal';
            card.innerHTML = `
        <a href="${item.url}" target="_blank" rel="noopener">
          <span class="article-source">${item.source}</span>
          <span class="article-title">${item.title}</span>
          <span class="article-date">${item.date}</span>
        </a>`;
            container.appendChild(card);
        });

        // Re-observe new elements
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            }),
            {threshold: 0.08}
        );
        container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    function parseRSS(xmlStr) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlStr, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        return items.map(item => ({
            title: item.querySelector('title')?.textContent || '',
            url: item.querySelector('link')?.textContent || '#',
            date: new Date(item.querySelector('pubDate')?.textContent || '').toLocaleDateString('en-GB', {
                month: 'short',
                year: 'numeric'
            }),
            source: 'freeCodeCamp'
        }));
    }

    fetch(PROXY)
        .then(r => r.json())
        .then(data => {
            const parsed = parseRSS(data.contents);
            if (parsed.length > 0) {
                renderArticles(parsed);
            } else {
                renderArticles(FALLBACK);
            }
        })
        .catch(() => renderArticles(FALLBACK));
})();

/* ── GitHub API: enrich project cards ─────────────────────── */
(function () {
    const repos = [
        {el: 'proj-toroman', slug: 'Zubs/toRoman'},
        {el: 'proj-football', slug: 'Zubs/footballSite'},
        {el: 'proj-scholar', slug: 'Zubs/scholar-search'},
        {el: 'proj-owasp', slug: 'Zubs/owasp-sec-bank'},
        {el: 'proj-gpcalc', slug: 'Zubs/GPCalc'},
        {el: 'proj-colab', slug: 'Zubs/ColabDev'},
        {el: 'proj-imgfinder', slug: 'Zubs/node_image_finder'},
        {el: 'proj-brick', slug: 'Zubs/BrickBreakerChallenge'},
        {el: 'proj-collect', slug: 'Zubs/collectjs_tutorial'},
    ];

    repos.forEach(({el, slug}) => {
        const card = document.getElementById(el);
        if (!card) return;
        fetch(`https://api.github.com/repos/${slug}`)
            .then(r => r.json())
            .then(data => {
                const starsEl = card.querySelector('.project-stars');
                const langEl = card.querySelector('.project-lang');
                if (starsEl && data.stargazers_count !== undefined)
                    starsEl.textContent = `★ ${data.stargazers_count}`;
                if (langEl && data.language)
                    langEl.textContent = data.language;
                // If card description is placeholder, use GitHub's
                const descEl = card.querySelector('.project-desc');
                if (descEl && descEl.dataset.useGh === 'true' && data.description)
                    descEl.textContent = data.description;
            })
            .catch(() => {
            });
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
