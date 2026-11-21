/* ============================================================
   THE BACKEND CHRONICLES — READER
   ------------------------------------------------------------
   Renders the issue from comic-data.js + comic-art.js, handles
   page turns, hash history, keyboard navigation and focus.
   ============================================================ */
(function () {
    'use strict';

    const issue = window.PORTFOLIO_COMIC;
    const art = window.COMIC_ART;
    if (!issue || !art || !issue.total) return;

    const pageEl = document.getElementById('comic-page');
    const stageEl = document.getElementById('comic');
    const indicator = document.getElementById('pageIndicator');
    const firstBtn = document.getElementById('firstPage');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const tocBtn = document.getElementById('tocButton');
    const statusEl = document.getElementById('route-status');
    if (!pageEl || !firstBtn || !prevBtn || !nextBtn) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 1;
    let artUid = 0;

    /* ---------- small DOM helpers ---------- */
    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined && text !== null) node.textContent = String(text);
        return node;
    }

    function linkList(items, className) {
        if (!items || !items.length) return null;
        const wrap = make('div', className);
        items.forEach(function (item) {
            if (!item || !item.url) return;
            const anchor = make('a', null, item.label || item.url);
            anchor.href = item.url;
            if (/^https?:/i.test(item.url)) {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }
            wrap.appendChild(anchor);
        });
        return wrap.childElementCount ? wrap : null;
    }

    function nextUid(prefix) {
        artUid += 1;
        return prefix + '-' + artUid;
    }

    /* ---------- panel rendering ---------- */
    function panelNode(panel, index) {
        const section = make('section', 'panel tone-' + (panel.tone || 'blue'));
        const artWrap = make('div', 'panel-art');
        const artKey = panel.art || 'chip';
        const label = 'Original illustration for: ' + (panel.heading || artKey);
        artWrap.innerHTML = art.render(artKey, label, nextUid('panel'));

        if (panel.sfx) {
            const sfx = make('span', 'sfx', panel.sfx);
            sfx.setAttribute('aria-hidden', 'true');
            artWrap.appendChild(sfx);
        }
        section.appendChild(artWrap);

        const copy = make('div', 'panel-copy');
        if (panel.caption) copy.appendChild(make('p', 'panel-caption', panel.caption));
        if (panel.heading) {
            const heading = make('h3', 'panel-heading', panel.heading);
            copy.appendChild(heading);
        }
        if (panel.body) copy.appendChild(make('p', 'panel-body', panel.body));

        const links = linkList(panel.links, 'panel-links');
        if (links) copy.appendChild(links);

        if (panel.bubble) copy.appendChild(make('p', 'speech-bubble', panel.bubble));
        section.appendChild(copy);
        section.style.setProperty('--panel-index', String(index));
        return section;
    }

    function renderPanels(page, container) {
        const panels = page.panels || [];
        const layout = page.layout || (panels.length === 1 ? 'single' : 'duo');
        const grid = make('div', 'panels panels--' + layout);
        panels.forEach(function (panel, index) { grid.appendChild(panelNode(panel, index)); });
        container.appendChild(grid);
    }

    function headerNode(page, includeHeadline) {
        const header = make('header', 'page-header');
        header.appendChild(make('p', 'page-eyebrow', page.sectionLabel + ' · PAGE ' + page.number + ' / ' + issue.total));

        if (page.sfx) {
            const sfx = make('span', 'page-sfx', page.sfx);
            sfx.setAttribute('aria-hidden', 'true');
            header.appendChild(sfx);
        }

        const title = make('h1', 'page-title', page.title);
        title.id = 'comic-page-title';
        title.setAttribute('tabindex', '-1');
        header.appendChild(title);

        if (page.deck) header.appendChild(make('p', 'page-deck', page.deck));

        if (includeHeadline && page.storyMeta) {
            header.appendChild(make('p', 'story-meta', page.storyMeta));
        }
        if (includeHeadline && page.part === 1 && page.storyHeadline) {
            header.appendChild(make('p', 'story-headline', page.storyHeadline));
        }
        if (includeHeadline && page.parts > 1) {
            header.appendChild(make('p', 'story-progress', 'PART ' + page.part + ' OF ' + page.parts));
        }
        const links = linkList(includeHeadline ? page.storyLinks : null, 'story-links');
        if (links) header.appendChild(links);

        if (page.facts && page.facts.length) {
            const facts = make('ul', 'fact-strip');
            page.facts.forEach(function (fact) { facts.appendChild(make('li', null, fact)); });
            header.appendChild(facts);
        }
        return header;
    }

    /* ---------- special pages ---------- */
    function renderCover(page, container) {
        const cover = make('div', 'cover-layout');
        const artWrap = make('div', 'cover-art');
        artWrap.innerHTML = art.render('cover',
            'Original cover illustration: a caped engineer with a glowing Z emblem and a PHP-shaped hammer above a halftone city skyline.',
            nextUid('cover'));
        const sfx = make('span', 'cover-sfx', page.sfx || 'THWIP!');
        sfx.setAttribute('aria-hidden', 'true');
        artWrap.appendChild(sfx);
        cover.appendChild(artWrap);

        const copy = make('div', 'cover-copy');
        copy.appendChild(make('p', 'cover-issue', issue.meta.issue + ' · ' + issue.total + ' PAGES · ' + issue.meta.location.toUpperCase()));

        const title = make('h1', 'cover-title');
        title.id = 'comic-page-title';
        title.setAttribute('tabindex', '-1');
        const nameParts = issue.meta.name.split(' ');
        title.appendChild(make('span', 'cover-title-line', nameParts[0]));
        title.appendChild(document.createTextNode(' '));
        title.appendChild(make('span', 'cover-title-line cover-title-line--big', nameParts.slice(1).join(' ')));
        copy.appendChild(title);

        copy.appendChild(make('p', 'cover-role', issue.meta.role.toUpperCase()));
        copy.appendChild(make('p', 'cover-tagline', issue.meta.title));
        copy.appendChild(make('p', 'cover-blurb',
            'FinTech systems, 94-agent build teams, hand-written JCL parsers, IBM Z advocacy and a First Class CS degree — one original issue.'));

        const actions = make('div', 'cover-actions');
        const begin = make('button', 'comic-btn comic-btn--primary cover-cta', 'ENTER THE ISSUE →');
        begin.type = 'button';
        begin.setAttribute('data-goto', '2');
        actions.appendChild(begin);

        const caseFiles = issue.pages.filter(function (p) { return p.section === 'projects'; })[0];
        if (caseFiles) {
            const jump = make('button', 'comic-btn cover-cta', 'JUMP TO CASE FILES →');
            jump.type = 'button';
            jump.setAttribute('data-goto', String(caseFiles.number));
            actions.appendChild(jump);
        }
        copy.appendChild(actions);
        copy.appendChild(make('p', 'cover-footnote', 'Turn with ← → · Home returns here · Every page has a destination'));
        cover.appendChild(copy);
        container.appendChild(cover);
    }

    function renderToc(page, container) {
        const tocPage = make('div', 'toc-layout');
        const header = headerNode(page, false);
        tocPage.appendChild(header);

        const chapterNav = make('nav', 'toc-chapters-wrap');
        chapterNav.setAttribute('aria-label', 'Issue chapters');
        chapterNav.appendChild(make('h2', 'toc-subhead', 'CHAPTERS'));
        const chapterList = make('ol', 'toc-chapter-list');
        issue.toc.forEach(function (entry) {
            const item = make('li', 'toc-entry');
            const anchor = make('a', 'toc-link');
            anchor.href = issue.formatHash(entry.page);
            anchor.appendChild(make('span', 'toc-number', String(entry.page).padStart(2, '0')));
            const body = make('span', 'toc-entry-body');
            body.appendChild(make('strong', null, entry.label));
            if (entry.note) body.appendChild(make('small', null, entry.note));
            anchor.appendChild(body);
            item.appendChild(anchor);
            chapterList.appendChild(item);
        });
        chapterNav.appendChild(chapterList);
        tocPage.appendChild(chapterNav);

        const caseNav = make('nav', 'toc-index-wrap');
        caseNav.setAttribute('aria-label', 'Project case files index');
        caseNav.appendChild(make('h2', 'toc-subhead', 'THE CASE FILES'));
        const caseList = make('ol', 'toc-case-list');
        issue.projectIndex.forEach(function (entry) {
            const item = make('li', 'toc-case-entry');
            const anchor = make('a', 'toc-case-link');
            anchor.href = issue.formatHash(entry.page);
            anchor.appendChild(make('span', 'toc-case-number', String(entry.page).padStart(2, '0')));
            const body = make('span', 'toc-case-body');
            body.appendChild(make('strong', null, entry.title));
            body.appendChild(make('small', null, entry.category + ' · ' + entry.status + (entry.parts > 1 ? ' · ' + entry.parts + ' pages' : '')));
            anchor.appendChild(body);
            item.appendChild(anchor);
            caseList.appendChild(item);
        });
        caseNav.appendChild(caseList);
        tocPage.appendChild(caseNav);

        const help = make('aside', 'toc-help');
        help.appendChild(make('strong', null, 'HOW TO READ'));
        help.appendChild(make('p', null, 'Use the buttons above, the ← and → keys, or tap any page number. Home returns to the cover. Direct links look like #page/12.'));
        tocPage.appendChild(help);
        container.appendChild(tocPage);
    }

    /* ---------- page rendering ---------- */
    function render(number, options) {
        const opts = options || {};
        const target = issue.resolvePage(number, issue.total);
        const page = issue.pages[target - 1];
        if (!page) return;
        current = target;

        pageEl.style.setProperty('--page-label', '"' + String(current).padStart(2, '0') + '"');
        pageEl.className = 'comic-page page-kind-' + (page.kind || 'comic') + ' section-' + page.section;
        pageEl.replaceChildren();
        pageEl.setAttribute('aria-label', 'Page ' + target + ' of ' + issue.total + ': ' + page.title);

        if (page.kind === 'cover') renderCover(page, pageEl);
        else if (page.kind === 'toc') renderToc(page, pageEl);
        else {
            pageEl.appendChild(headerNode(page, !!page.projectId));
            renderPanels(page, pageEl);
            const footer = make('footer', 'page-footer');
            footer.appendChild(make('span', null, page.sectionLabel.toUpperCase()));
            const next = issue.pages[current];
            footer.appendChild(make('span', null, next ? 'NEXT: ' + next.title : 'END OF ISSUE ◆'));
            pageEl.appendChild(footer);
        }

        if (!prefersReducedMotion && opts.animate !== false) {
            pageEl.classList.remove('is-turning');
            void pageEl.offsetWidth;
            pageEl.classList.add('is-turning');
        }

        indicator.textContent = current + ' / ' + issue.total;
        firstBtn.disabled = current === 1;
        prevBtn.disabled = current === 1;
        nextBtn.disabled = current === issue.total;
        if (tocBtn) tocBtn.disabled = current === 2;

        document.title = 'Page ' + current + ' · ' + page.title + ' — The Backend Chronicles';
        statusEl.textContent = 'Page ' + current + ' of ' + issue.total + ': ' + page.title;

        if (opts.focus) {
            const heading = document.getElementById('comic-page-title');
            if (heading) {
                try { heading.focus({preventScroll: true}); }
                catch (error) { heading.focus(); }
            }
            stageEl.scrollIntoView({block: 'start', behavior: 'auto'});
        }
    }

    function goTo(number) {
        const target = issue.resolvePage(number, issue.total);
        if (target === current) {
            render(current, {focus: true});
            return;
        }
        window.location.hash = issue.formatHash(target);
    }

    /* ---------- events ---------- */
    firstBtn.addEventListener('click', function () { goTo(1); });
    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });
    if (tocBtn) tocBtn.addEventListener('click', function () { goTo(2); });

    document.addEventListener('click', function (event) {
        const target = event.target.closest ? event.target.closest('[data-goto]') : null;
        if (!target) return;
        event.preventDefault();
        goTo(Number.parseInt(target.getAttribute('data-goto'), 10));
    });

    window.addEventListener('hashchange', function () {
        const requested = issue.parseHash(window.location.hash);
        if (requested === null) {
            render(1, {focus: true});
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', issue.formatHash(1));
            }
            return;
        }
        render(requested, {focus: true});
    });

    document.addEventListener('keydown', function (event) {
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
        const node = event.target;
        if (node && (node.isContentEditable ||
            /^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName || ''))) return;

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (current < issue.total) goTo(current + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (current > 1) goTo(current - 1);
        } else if (event.key === 'Home') {
            event.preventDefault();
            goTo(1);
        }
    });

    /* ---------- first paint ---------- */
    const initial = issue.parseHash(window.location.hash);
    render(initial === null ? 1 : initial, {focus: false, animate: false});
    if (initial === null && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', issue.formatHash(1));
    }
})();
