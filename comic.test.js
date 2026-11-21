/* Structural checks for the comic-book portfolio.
   Run with: node --test comic.test.js  (no dependencies needed) */
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const issue = require('./comic-data.js');
const art = require('./comic-art.js');
const root = __dirname;

test('issue is approximately 40 pages and computes its own total', function () {
    assert.equal(issue.total, issue.pages.length);
    assert.ok(issue.total >= 38 && issue.total <= 48, 'total should stay near 40 pages');
    issue.pages.forEach(function (page, index) {
        assert.equal(page.number, index + 1, 'page numbers must be sequential');
    });
    assert.equal(issue.pages[0].kind, 'cover');
    assert.equal(issue.pages[1].kind, 'toc');
    assert.equal(issue.pages[issue.total - 1].id, 'contact');
});

test('table of contents points at the first page of every section', function () {
    assert.ok(issue.toc.length >= 5);
    issue.toc.forEach(function (entry) {
        const target = issue.pages[entry.page - 1];
        assert.ok(target, 'TOC target ' + entry.page + ' exists');
        assert.equal(target.number, entry.page);
        const section = issue.sections.find(function (candidate) { return candidate.tocTitle === entry.label; });
        assert.ok(section, 'TOC entry "' + entry.label + '" maps to a section');
        assert.equal(target.section, section.id, entry.label + ' should start on its section’s first page');
        assert.equal(target.number, issue.pages.find(function (page) { return page.section === section.id; }).number);
    });
});

test('all 23 real projects appear, each with at least one page', function () {
    assert.equal(issue.projectIndex.length, 23);
    const multiPage = issue.projectIndex.filter(function (entry) { return entry.parts > 1; });
    assert.ok(multiPage.length >= 3, 'substantial projects should span multiple pages');

    issue.projectIndex.forEach(function (entry) {
        const pages = issue.pages.filter(function (page) { return page.projectId === entry.id; });
        assert.equal(pages.length, entry.parts, entry.title + ' page span should match index');
        assert.ok(pages.length >= 1, entry.title + ' needs a page');
        assert.equal(pages[0].number, entry.page, entry.title + ' index page should be its first page');
        pages.forEach(function (page) {
            assert.equal(page.kind, 'comic');
            assert.ok(page.title);
            assert.ok(page.panels.length > 0);
        });
    });
});

test('every story page has readable, illustrated panels', function () {
    issue.pages.forEach(function (page) {
        if (page.kind === 'cover' || page.kind === 'toc') return;
        assert.ok(page.title, 'page ' + page.number + ' has a title');
        assert.ok(page.deck, 'page ' + page.number + ' has a deck');
        assert.ok(page.panels.length > 0, 'page ' + page.number + ' has panels');
        page.panels.forEach(function (panel) {
            assert.ok(art.keys.includes(panel.art), 'unknown art key: ' + panel.art);
            assert.ok(panel.heading, 'panel heading on page ' + page.number);
            assert.ok(panel.body && panel.body.length > 30, 'panel body on page ' + page.number);
        });
    });
});

test('navigation helpers clamp and parse page numbers', function () {
    assert.equal(issue.resolvePage(0, issue.total), 1);
    assert.equal(issue.resolvePage(-5, issue.total), 1);
    assert.equal(issue.resolvePage(999, issue.total), issue.total);
    assert.equal(issue.resolvePage('7', issue.total), 7);
    assert.equal(issue.resolvePage('abc', issue.total), 1);
    assert.equal(issue.parseHash('#page/12'), 12);
    assert.equal(issue.parseHash('page/3'), 3);
    assert.equal(issue.parseHash('#about'), null);
    assert.equal(issue.formatHash(9), '#page/9');
});

test('all local links point to files that exist', function () {
    const local = new Set(['projects.html', 'engineering.html', 'mainframe.html', 'research.html',
        'testimonials.html', 'mainframe-series/', 'packages/toroman/index.html',
        'Zubair-Idris-Aweda-ATS-Resume.pdf', 'Zubair-Idris-Aweda-Academic-Resume.pdf',
        'Detecting%20and%20Mitigating%20OWASP%20Top%2010%20Threats_%20Design,%20Implementation%20and%20Security%20Evaluation%20of%20a%20Database-Driven%20Web%20App.pdf',
        'Detecting-and-Mitigating-OWASP-Top-10-Threats.pdf']);
    local.forEach(function (file) {
        assert.ok(fs.existsSync(path.join(root, decodeURIComponent(file))), 'missing local file: ' + file);
    });

    const urls = [];
    Object.values(issue.links).forEach(function (url) { urls.push(url); });
    issue.pages.forEach(function (page) {
        [].concat(page.storyLinks || [], page.facts ? [] : [],
            ...(page.panels || []).map(function (panel) { return panel.links || []; }))
            .forEach(function (item) { if (item && item.url) urls.push(item.url); });
    });
    urls.forEach(function (url) {
        if (/^(https?:|mailto:)/i.test(url)) return;
        assert.ok(fs.existsSync(path.join(root, decodeURIComponent(url))), 'broken local link: ' + url);
    });
});

test('no placeholder or invented-filler copy remains', function () {
    const content = JSON.stringify({
        meta: issue.meta,
        pages: issue.pages.map(function (p) { return [p.title, p.deck, p.storyHeadline, p.panels]; })
    });
    assert.doesNotMatch(content, /Lorem ipsum|\bplaceholder\b|\blorem\b|\bcoming soon\b|\byour name here\b/i);
    assert.doesNotMatch(content, /\bTODO\b/, 'uppercase TODO markers must not appear ("todo" the word is fine)');
});

test('HTML shell wires the reader, assets and accessibility landmarks', function () {
    const html = fs.readFileSync(path.join(root, 'comic.html'), 'utf8');
    ['comic.css', 'comic-data.js', 'comic-art.js', 'comic.js'].forEach(function (file) {
        assert.ok(html.includes(file), 'comic.html must load ' + file);
        assert.ok(fs.existsSync(path.join(root, file)), file + ' exists');
    });
    ['id="comic-page"', 'id="firstPage"', 'id="prevPage"', 'id="nextPage"',
        'id="pageIndicator"', 'id="tocButton"', 'aria-live="polite"', '<main',
        '<nav', '<noscript', 'name="viewport"', 'skip-link'].forEach(function (needle) {
        assert.ok(html.includes(needle), 'comic.html must contain ' + needle);
    });
    const script = fs.readFileSync(path.join(root, 'comic.js'), 'utf8');
    const ids = [...script.matchAll(/getElementById\('([^']+)'\)/g)].map(function (m) { return m[1]; });
    assert.ok(ids.length > 3);
    ids.forEach(function (id) {
        if (id === 'comic-page-title') {
            assert.ok(script.includes("title.id = '" + id + "'"), 'script creates #' + id + ' at runtime');
        } else {
            assert.ok(html.includes('id="' + id + '"'), 'script expects static #' + id + ' in comic.html');
        }
    });
});

test('stylesheet covers reduced motion and small screens', function () {
    const css = fs.readFileSync(path.join(root, 'comic.css'), 'utf8');
    assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
    assert.match(css, /@media \(max-width: 780px\)/);
    assert.match(css, /:focus-visible/);
    assert.match(css, /panels--feature/);
});
