/* ============================================================
   THE BACKEND CHRONICLES — READER
   ------------------------------------------------------------
   Renders the issue from comic-data.js + comic-art.js, handles
   page turns, hash history, keyboard navigation and focus.
   ============================================================ */
(function () {
    "use strict";

    const issue = window.PORTFOLIO_COMIC;
    const art = window.COMIC_ART;
    if (!isReady()) {return;}

    let pageEl, stageEl, indicator, firstBtn, prevBtn, nextBtn, tocBtn, statusEl;
    if (!collectRefs()) {return;}

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 1;
    let artUid = 0;

    function isReady() {
        return !!(issue && art && issue.total);
    }

    function collectRefs() {
        pageEl = document.getElementById("comic-page");
        stageEl = document.getElementById("comic");
        indicator = document.getElementById("pageIndicator");
        firstBtn = document.getElementById("firstPage");
        prevBtn = document.getElementById("prevPage");
        nextBtn = document.getElementById("nextPage");
        tocBtn = document.getElementById("tocButton");
        statusEl = document.getElementById("route-status");
        return !!(pageEl && firstBtn && prevBtn && nextBtn);
    }

    /* ---------- small helpers ---------- */
    function orDefault(value, fallback) {
        return value || fallback;
    }

    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) {node.className = className;}
        if (text != null) {node.textContent = String(text);}
        return node;
    }

    function addText(parent, className, value) {
        if (value) {parent.appendChild(make("p", className, value));}
    }

    function addSfx(parent, className, value) {
        if (!value) {return;}
        const sfx = make("span", className, value);
        sfx.setAttribute("aria-hidden", "true");
        parent.appendChild(sfx);
    }

    function usableUrl(url) {
        return /^https?:/i.test(url);
    }

    function appendLink(wrap, item) {
        if (!item || !item.url) {return;}
        const anchor = make("a", null, orDefault(item.label, item.url));
        anchor.href = item.url;
        if (usableUrl(item.url)) {
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
        }
        wrap.appendChild(anchor);
    }

    function linkList(items, className) {
        if (!items || !items.length) {return null;}
        const wrap = make("div", className);
        items.forEach(function (item) {appendLink(wrap, item);});
        return wrap.childElementCount ? wrap : null;
    }

    function nextUid(prefix) {
        artUid += 1;
        return prefix + "-" + artUid;
    }

    function svgNode(markup) {
        const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
        return document.importNode(parsed.documentElement, true);
    }

    function pageByNumber(number) {
        return issue.pages.find(function (page) {return page.number === number;});
    }

    /* ---------- panel rendering ---------- */
    function panelArt(panel) {
        const artWrap = make("div", "panel-art");
        const artKey = orDefault(panel.art, "chip");
        const label = "Original illustration for: " + orDefault(panel.heading, artKey);
        artWrap.appendChild(svgNode(art.render(artKey, label, nextUid("panel"))));
        addSfx(artWrap, "sfx", panel.sfx);
        return artWrap;
    }

    function panelCopy(panel) {
        const copy = make("div", "panel-copy");
        addText(copy, "panel-caption", panel.caption);
        if (panel.heading) {copy.appendChild(make("h3", "panel-heading", panel.heading));}
        addText(copy, "panel-body", panel.body);
        const links = linkList(panel.links, "panel-links");
        if (links) {copy.appendChild(links);}
        addText(copy, "speech-bubble", panel.bubble);
        return copy;
    }

    function panelNode(panel, index) {
        const section = make("section", "panel tone-" + orDefault(panel.tone, "blue"));
        section.appendChild(panelArt(panel));
        section.appendChild(panelCopy(panel));
        section.style.setProperty("--panel-index", String(index));
        return section;
    }

    function renderPanels(page, container) {
        const panels = page.panels || [];
        const layout = orDefault(page.layout, panels.length === 1 ? "single" : "duo");
        const grid = make("div", "panels panels--" + layout);
        panels.forEach(function (panel, index) {grid.appendChild(panelNode(panel, index));});
        container.appendChild(grid);
    }

    /* ---------- page header ---------- */
    function addStoryFacts(header, page) {
        addText(header, "story-meta", page.storyMeta);
        if (page.part === 1) {addText(header, "story-headline", page.storyHeadline);}
        if (page.parts > 1) {
            header.appendChild(make("p", "story-progress", "PART " + page.part + " OF " + page.parts));
        }
    }

    function addStory(header, page, includeHeadline) {
        if (!includeHeadline) {return;}
        addStoryFacts(header, page);
        const links = linkList(page.storyLinks, "story-links");
        if (links) {header.appendChild(links);}
    }

    function addFactStrip(header, page) {
        if (!page.facts || !page.facts.length) {return;}
        const facts = make("ul", "fact-strip");
        page.facts.forEach(function (fact) {facts.appendChild(make("li", null, fact));});
        header.appendChild(facts);
    }

    function headerNode(page, includeHeadline) {
        const header = make("header", "page-header");
        header.appendChild(make("p", "page-eyebrow", page.sectionLabel + " · PAGE " + page.number + " / " + issue.total));
        addSfx(header, "page-sfx", page.sfx);
        const title = make("h1", "page-title", page.title);
        title.id = "comic-page-title";
        title.setAttribute("tabindex", "-1");
        header.appendChild(title);
        addText(header, "page-deck", page.deck);
        addStory(header, page, includeHeadline);
        addFactStrip(header, page);
        return header;
    }

    /* ---------- special pages ---------- */
    function coverCopy() {
        const copy = make("div", "cover-copy");
        copy.appendChild(make("p", "cover-issue", issue.meta.issue + " · " + issue.total + " PAGES · " + issue.meta.location.toUpperCase()));
        const title = make("h1", "cover-title");
        title.id = "comic-page-title";
        title.setAttribute("tabindex", "-1");
        const nameParts = issue.meta.name.split(" ");
        title.appendChild(make("span", "cover-title-line", nameParts[0]));
        title.appendChild(document.createTextNode(" "));
        title.appendChild(make("span", "cover-title-line cover-title-line--big", nameParts.slice(1).join(" ")));
        copy.appendChild(title);
        copy.appendChild(make("p", "cover-role", issue.meta.role.toUpperCase()));
        copy.appendChild(make("p", "cover-tagline", issue.meta.title));
        copy.appendChild(make("p", "cover-blurb",
            "FinTech systems, 94-agent build teams, hand-written JCL parsers, IBM Z advocacy and a First Class CS degree — one original issue."));
        return copy;
    }

    function coverActions(caseFiles) {
        const actions = make("div", "cover-actions");
        const begin = make("button", "comic-btn comic-btn--primary cover-cta", "ENTER THE ISSUE →");
        begin.type = "button";
        begin.setAttribute("data-goto", "2");
        actions.appendChild(begin);
        if (caseFiles) {
            const jump = make("button", "comic-btn cover-cta", "JUMP TO CASE FILES →");
            jump.type = "button";
            jump.setAttribute("data-goto", String(caseFiles.number));
            actions.appendChild(jump);
        }
        return actions;
    }

    function renderCover(page, container) {
        const cover = make("div", "cover-layout");
        const artWrap = make("div", "cover-art");
        artWrap.appendChild(svgNode(art.render("cover",
            "Original cover illustration: a caped engineer with a glowing Z emblem and a PHP-shaped hammer above a halftone city skyline.",
            nextUid("cover"))));
        addSfx(artWrap, "cover-sfx", orDefault(page.sfx, "THWIP!"));
        cover.appendChild(artWrap);
        const copy = coverCopy();
        copy.appendChild(coverActions(issue.pages.find(function (p) {return p.section === "projects";})));
        copy.appendChild(make("p", "cover-footnote", "Turn with ← → · Home returns here · Every page has a destination"));
        cover.appendChild(copy);
        container.appendChild(cover);
    }

    function tocChapterList() {
        const list = make("ol", "toc-chapter-list");
        issue.toc.forEach(function (entry) {
            const item = make("li", "toc-entry");
            const anchor = make("a", "toc-link");
            anchor.href = issue.formatHash(entry.page);
            anchor.appendChild(make("span", "toc-number", String(entry.page).padStart(2, "0")));
            const body = make("span", "toc-entry-body");
            body.appendChild(make("strong", null, entry.label));
            if (entry.note) {body.appendChild(make("small", null, entry.note));}
            anchor.appendChild(body);
            item.appendChild(anchor);
            list.appendChild(item);
        });
        return list;
    }

    function tocCaseList() {
        const list = make("ol", "toc-case-list");
        issue.projectIndex.forEach(function (entry) {
            const item = make("li", "toc-case-entry");
            const anchor = make("a", "toc-case-link");
            anchor.href = issue.formatHash(entry.page);
            anchor.appendChild(make("span", "toc-case-number", String(entry.page).padStart(2, "0")));
            const body = make("span", "toc-case-body");
            body.appendChild(make("strong", null, entry.title));
            const detail = entry.category + " · " + entry.status + (entry.parts > 1 ? " · " + entry.parts + " pages" : "");
            body.appendChild(make("small", null, detail));
            anchor.appendChild(body);
            item.appendChild(anchor);
            list.appendChild(item);
        });
        return list;
    }

    function tocNav(label, heading, className, list) {
        const nav = make("nav", className);
        nav.setAttribute("aria-label", label);
        nav.appendChild(make("h2", "toc-subhead", heading));
        nav.appendChild(list);
        return nav;
    }

    function renderToc(page, container) {
        const tocPage = make("div", "toc-layout");
        tocPage.appendChild(headerNode(page, false));
        tocPage.appendChild(tocNav("Issue chapters", "CHAPTERS", "toc-chapters-wrap", tocChapterList()));
        tocPage.appendChild(tocNav("Project case files index", "THE CASE FILES", "toc-index-wrap", tocCaseList()));
        const help = make("aside", "toc-help");
        help.appendChild(make("strong", null, "HOW TO READ"));
        help.appendChild(make("p", null, "Use the buttons above, the ← and → keys, or tap any page number. Home returns to the cover. Direct links look like #page/12."));
        tocPage.appendChild(help);
        container.appendChild(tocPage);
    }

    /* ---------- page rendering ---------- */
    function pageFooter(page) {
        const footer = make("footer", "page-footer");
        footer.appendChild(make("span", null, page.sectionLabel.toUpperCase()));
        const next = pageByNumber(current + 1);
        footer.appendChild(make("span", null, next ? "NEXT: " + next.title : "END OF ISSUE ◆"));
        return footer;
    }

    function addPageBody(page) {
        if (page.kind === "cover") {renderCover(page, pageEl); return;}
        if (page.kind === "toc") {renderToc(page, pageEl); return;}
        pageEl.appendChild(headerNode(page, !!page.projectId));
        renderPanels(page, pageEl);
        pageEl.appendChild(pageFooter(page));
    }

    function animatePage(options) {
        if (prefersReducedMotion || options.animate === false) {return;}
        pageEl.classList.remove("is-turning");
        void pageEl.offsetWidth;
        pageEl.classList.add("is-turning");
    }

    function updateChrome(page) {
        indicator.textContent = current + " / " + issue.total;
        firstBtn.disabled = current === 1;
        prevBtn.disabled = current === 1;
        nextBtn.disabled = current === issue.total;
        if (tocBtn) {tocBtn.disabled = current === 2;}
        document.title = "Page " + current + " · " + page.title + " — The Backend Chronicles";
        statusEl.textContent = "Page " + current + " of " + issue.total + ": " + page.title;
    }

    function focusHeading(heading) {
        try {heading.focus({preventScroll: true});}
        catch (error) {heading.focus();}
    }

    function focusIfNeeded(options) {
        if (!options.focus) {return;}
        const heading = document.getElementById("comic-page-title");
        if (heading) {focusHeading(heading);}
        stageEl.scrollIntoView({block: "start", behavior: "auto"});
    }

    function render(number, options) {
        const opts = orDefault(options, {});
        const target = issue.resolvePage(number, issue.total);
        const page = pageByNumber(target);
        if (!page) {return;}
        current = target;
        pageEl.style.setProperty("--page-label", "\"" + String(current).padStart(2, "0") + "\"");
        pageEl.className = "comic-page page-kind-" + orDefault(page.kind, "comic") + " section-" + page.section;
        pageEl.replaceChildren();
        pageEl.setAttribute("aria-label", "Page " + target + " of " + issue.total + ": " + page.title);
        addPageBody(page);
        animatePage(opts);
        updateChrome(page);
        focusIfNeeded(opts);
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
    function goFirst() {goTo(1);}
    function goPrev() {goTo(current - 1);}
    function goNext() {goTo(current + 1);}
    function goToc() {goTo(2);}

    function hasHistory() {
        return !!(window.history && window.history.replaceState);
    }

    function goHome() {
        render(1, {focus: true});
        if (hasHistory()) {window.history.replaceState(null, "", issue.formatHash(1));}
    }

    function onDocumentClick(event) {
        const target = event.target.closest ? event.target.closest("[data-goto]") : null;
        if (!target) {return;}
        event.preventDefault();
        goTo(Number.parseInt(target.getAttribute("data-goto"), 10));
    }

    function onHashChange() {
        const requested = issue.parseHash(window.location.hash);
        if (requested === null) {goHome(); return;}
        render(requested, {focus: true});
    }

    function isModified(event) {
        return !!(event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey);
    }

    function isTyping(node) {
        if (!node) {return false;}
        return !!(node.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(node.tagName || ""));
    }

    function turnRight(event) {
        event.preventDefault();
        if (current < issue.total) {goNext();}
    }

    function turnLeft(event) {
        event.preventDefault();
        if (current > 1) {goPrev();}
    }

    function jumpHome(event) {
        event.preventDefault();
        goFirst();
    }

    function handleKey(event) {
        switch (event.key) {
            case "ArrowRight": turnRight(event); break;
            case "ArrowLeft": turnLeft(event); break;
            case "Home": jumpHome(event); break;
            default: return;
        }
    }

    function onKeyDown(event) {
        if (isModified(event) || isTyping(event.target)) {return;}
        handleKey(event);
    }

    function bindButton(button, handler) {
        if (!button) {return;}
        button.addEventListener("click", handler);
    }

    function bindEvents() {
        bindButton(firstBtn, goFirst);
        bindButton(prevBtn, goPrev);
        bindButton(nextBtn, goNext);
        bindButton(tocBtn, goToc);
        document.addEventListener("click", onDocumentClick);
        window.addEventListener("hashchange", onHashChange);
        document.addEventListener("keydown", onKeyDown);
    }

    /* ---------- first paint ---------- */
    function replaceInitialHash(initial) {
        if (initial !== null || !hasHistory()) {return;}
        window.history.replaceState(null, "", issue.formatHash(1));
    }

    function firstPaint() {
        const initial = issue.parseHash(window.location.hash);
        render(initial === null ? 1 : initial, {focus: false, animate: false});
        replaceInitialHash(initial);
    }

    bindEvents();
    firstPaint();
}());
