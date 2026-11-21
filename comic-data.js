/* ============================================================
   THE BACKEND CHRONICLES — COMIC BOOK CONTENT
   ------------------------------------------------------------
   SINGLE SOURCE OF TRUTH for every page, chapter, table-of-
   contents entry, project span and page number in the comic.

   To update the issue:
     • edit `meta` for identity/contact details
     • edit a section's `pages` array for non-project pages
     • edit the `spreads` array on a project to add/remove pages

   Page numbers, the total count, the contents list and the
   project index are all derived from these arrays at runtime.
   All factual content below is taken from the existing portfolio
   pages, CVs and llms.txt in this repository.
   ============================================================ */
(function (root, factory) {
    const issue = factory();
    if (typeof module === 'object' && module.exports) module.exports = issue;
    else root.PORTFOLIO_COMIC = issue;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    const links = {
        github: 'https://github.com/Zubs',
        linkedin: 'https://www.linkedin.com/in/zubairidrisaweda/',
        fcc: 'https://www.freecodecamp.org/news/author/Zubs',
        medium: 'https://zubairidrisaweda.medium.com',
        credly: 'https://www.credly.com/users/zubairidrisaweda/badges#credly',
        source: 'https://github.com/Zubs/Zubs.github.io',
        cv: 'Zubair-Idris-Aweda-ATS-Resume.pdf',
        academicCv: 'Zubair-Idris-Aweda-Academic-Resume.pdf',
        dissertation: 'Detecting%20and%20Mitigating%20OWASP%20Top%2010%20Threats_%20Design,%20Implementation%20and%20Security%20Evaluation%20of%20a%20Database-Driven%20Web%20App.pdf',
        slides: 'Detecting-and-Mitigating-OWASP-Top-10-Threats.pdf',
        projects: 'projects.html',
        engineering: 'engineering.html',
        research: 'research.html',
        mainframe: 'mainframe.html',
        testimonials: 'testimonials.html',
        mainframeSeries: 'mainframe-series/',
        toromanPlayground: 'packages/toroman/index.html'
    };

    const meta = {
        name: 'Zubair Idris Aweda',
        shortName: 'Zubair',
        handle: 'ZUBS',
        role: 'Full-Stack Software Engineer',
        title: 'THE BACKEND CHRONICLES',
        issue: 'ISSUE #01',
        location: 'Derby, UK',
        email: 'zubairidrisaweda@gmail.com',
        tagline: 'Building scalable systems in FinTech & beyond.',
        availability: 'Open to engineering roles, graduate mainframe roles, and MS/PhD research.',
        links: links
    };

    /* Small helpers keep the page definitions readable. */
    function panel(art, heading, body, extra) {
        return Object.assign({art: art, heading: heading, body: body}, extra || {});
    }

    function page(id, title, deck, panels, extra) {
        return Object.assign({id: id, title: title, deck: deck, panels: panels}, extra || {});
    }

    function link(label, url) {
        return {label: label, url: url};
    }

    /* --------------------------------------------------------
       PROJECT CASE FILES
       Each spread becomes one numbered comic page. Projects
       with several spreads span several pages automatically.
       -------------------------------------------------------- */
    const projects = [
        {
            id: 'ledgerline',
            title: 'Ledgerline',
            category: 'Product · EdTech · Multi-agent',
            status: 'Live',
            headline: 'A CFA Level I study app built for my brother: summaries, timed quizzes and a study plan drawn from 1,091 resources, written and checked by a team of 94 AI agents.',
            links: [link('Open the app ↗', 'https://cfa-l1-study.netlify.app'), link('Full write-up ↗', links.projects)],
            spreads: [
                page('ledgerline-1', 'THE STUDY MACHINE', 'Ledgerline · Product · EdTech · Live', [
                    panel('quiz', 'A brother’s problem', 'His CFA Level I material was spread across books, mock papers, a Q-bank and hundreds of lecture videos. He asked how I could help, so I built him a study app.', {tone: 'blue', sfx: 'WHIFF!', caption: 'CASE FILE 01 · PART 1'}),
                    panel('browser', 'What it does', 'A short revision summary for every module, timed quizzes in the real exam format, a weighted mixed mock, and a day-by-day study plan sized to the days and hours available.', {tone: 'yellow'}),
                    panel('terminal', 'Built alone, spec-first', 'Vue 3, TypeScript, Vite and Tailwind, with no backend and no accounts. Pages load only what they need, work on a phone, and are checked for accessibility in light and dark mode.', {tone: 'green'})
                ], {art: 'quiz', sfx: 'STUDY!', facts: ['Vue 3 · TypeScript · Vite', 'Solo engineer · Spec author & reviewer']}),
                page('ledgerline-2', 'THE AGENT ASSEMBLY', 'Ledgerline · The team behind the content', [
                    panel('network', 'Ninety-four agents, one spec', 'One builder agent studied the material and planned each feature through OpenSpec. Writers, blind graders, re-graders and curriculum reviewers handled the content.', {tone: 'purple', sfx: 'ZAP!'}),
                    panel('shield', 'Every claim has a source', 'Each summary and question cites a page, video timestamp or paper question. Blind grading recomputes the maths without seeing the answer key; disagreements go back for a fix and a fresh grade.', {tone: 'blue'}),
                    panel('gauge', 'By the numbers', '1,091 resources catalogued, 626 studied and cited. 6,520 practice questions graded blind. 18 features, 427 unit and component tests, and 296 browser tests across four browsers.', {tone: 'red'}),
                    panel('robot', 'What I directed', 'I wrote the product spec and feature list, reviewed every plan, made the product and content decisions, and directed the agents through each feature.', {tone: 'green'})
                ], {layout: 'trio', art: 'network', sfx: 'ASSEMBLE!', nextLabel: 'CONTINUED →'})
            ]
        },
        {
            id: 'miteno',
            title: 'Miteno',
            category: 'Client work · E-commerce · AI-driven',
            status: 'Beta',
            headline: 'A WhatsApp-ordering storefront for an independent UK clothing brand: fifteen features under my supervision, then nine more in a single unattended run.',
            links: [link('Full write-up ↗', links.projects)],
            spreads: [
                page('miteno', 'THE STOREFRONT SIGNAL', 'Miteno · Client work · Laravel 13 · PostgreSQL', [
                    panel('browser', 'Shop, then message', 'An admin area with two-factor sign-in, products, variants, photos, pricing, sales, stock and collections; shop and collection pages with size, colour and price filters.', {tone: 'blue', sfx: 'RING!'}),
                    panel('terminal', 'Propose → apply → archive', 'Each feature starts as a written change with requirements, design and tasks. Formatting, static analysis and the full test suite must pass before a feature is ticked.', {tone: 'green'}),
                    panel('gauge', '24 features in order', '15 supervised features and 9 unsupervised in one run. 32 capability specifications beside the code and 1,103 automated tests, with Pint and PHPStan clean.', {tone: 'yellow', facts: ['Laravel 13 · PostgreSQL · Alpine.js', 'Spec-driven · Claude Code + OpenSpec']})
                ], {art: 'browser', sfx: 'SOLD!'})
            ]
        },
        {
            id: 'jclcheck-saas',
            title: 'JCLcheck',
            category: 'Product · SaaS · Developer tool',
            status: 'Live',
            headline: 'A free JCL checker for people learning the mainframe: a custom lexer → parser → AST → rule-engine pipeline, a 3270-style workbench, and a CLI for CI.',
            links: [link('jclcheck.xyz ↗', 'https://jclcheck.xyz'), link('Source ↗', 'https://github.com/Zubs/jclcheck')],
            spreads: [
                page('jclcheck-1', 'THE LANGUAGE ENGINE', 'JCLcheck · Sole engineer & founder · Live at jclcheck.xyz', [
                    panel('terminal3270', 'Hand-written from scratch', 'A lexer, parameter tokenizer, parser, AST and rule engine check 80-column records, continuations, in-stream data, JOB/EXEC/DD order, PROC/PEND balance and JES2 job groups.', {tone: 'green', sfx: 'KLIK!', caption: 'No mainframe connection required.'}),
                    panel('shield', 'One hundred diagnostics', 'Every diagnostic carries a code, severity, line, column, message and suggestion, grouped from line rules to dataset flow. A job z/OS would reject is never shown as clean.', {tone: 'blue'}),
                    panel('chip', 'Built as three pieces', 'validator/ is a zero-dependency npm package; backend/ is an Express API on Render; frontend/ is a Vue 3 SPA on Netlify with a dark 3270-themed workbench.', {tone: 'purple'})
                ], {art: 'terminal3270', sfx: 'VALIDATE!', facts: ['Node.js · Express · Vue 3', 'Around 750 tests · Spec-driven', 'IBM JCL Reference-based rules']}),
                page('jclcheck-2', 'THE GREEN SCREEN', 'JCLcheck · Workbench and diagnostics', [
                    panel('terminal3270', 'A workbench, not a wall of text', 'Syntax highlighting, underlines under the exact text, a cursor column readout and hover explanations linked to IBM documentation. PF keys handle help, format, validate, share, sample and clear.', {tone: 'green', sfx: 'F5!'}),
                    panel('terminal', 'Site rules and suppression', 'Inline //* JCLCHECK OFF-NEXT suppressions and JSON site profiles for naming standards and severities. Keyword typos get Levenshtein “did you mean…” suggestions.', {tone: 'blue'}),
                    panel('globe', 'From browser to pipeline', 'The same engine ships as a zero-dependency CLI with SARIF output, so JCL problems can land directly on GitHub pull requests.', {tone: 'yellow'})
                ], {layout: 'duo', art: 'terminal3270', sfx: 'CLEAN!'})
            ]
        },
        {
            id: 'secbank',
            title: 'OWASP SecBank',
            category: 'Academic · Security · Dissertation',
            status: 'P81',
            headline: 'The research artefact behind my BSc dissertation: one banking app built twice, once deliberately vulnerable and once hardened, then tested by people and by scanners.',
            links: [link('Research write-up ↗', links.research), link('Source ↗', 'https://github.com/Zubs/owasp-sec-bank'), link('Dissertation ↗', links.dissertation)],
            spreads: [
                page('secbank-1', 'ONE APP, TWO REALITIES', 'OWASP SecBank · BSc dissertation · 6CS007 · P81', [
                    panel('shield', 'Version A: deliberately broken', 'String-concatenated SQL, plaintext passwords, a hardcoded JWT secret and a vulnerable node-serialize dependency. All ten OWASP categories were introduced through targeted choices.', {tone: 'red', sfx: 'CRACK!'}),
                    panel('shield', 'Version B: hardened', 'Parameterised queries, bcrypt at cost 12, one-hour server-side JWTs, UUID primary keys, Joi validation with SELECT … FOR UPDATE, signed JSON cookies, structured Winston logging and SSRF-safe URL validation.', {tone: 'blue', sfx: 'CLANG!'}),
                    panel('network', 'A controlled A/B study', 'Both versions were deployed and tested under identical conditions by four manual penetration testers and three tools: SonarQube, OWASP ZAP and Snyk, plus a 24-developer survey.', {tone: 'purple'})
                ], {art: 'shield', sfx: 'A / B!', facts: ['Vue 3 · Express 5 · PostgreSQL', 'Question: how are OWASP Top 10 threats best managed?']}),
                page('secbank-2', 'THE EVIDENCE', 'OWASP SecBank · What the tools and testers found', [
                    panel('gauge', '44 → 0', 'SonarQube reported 21 vulnerabilities, including 13 BLOCKER SQL injection findings, plus 23 code smells on the vulnerable version. Zero findings on the hardened version.', {tone: 'red', sfx: 'DROP!'}),
                    panel('gauge', '15 → 11 alerts', 'OWASP ZAP alert types dropped from 15 to 11; medium-severity CORS and CSP misconfiguration alerts disappeared. Snyk isolated the node-serialize RCE dependency and confirmed its removal.', {tone: 'yellow'}),
                    panel('mask', '8 of 10, by humans', 'Four independent manual testers covered 8 of 10 OWASP categories — the broadest single-method coverage — including business-logic and access-control flaws no automated tool detected.', {tone: 'blue', caption: 'Automated tools excel at code-level and dependency issues; humans still catch business logic.'}),
                    panel('globe', 'The human factor', 'A 24-respondent developer survey added the human dimension: 63% had prior OWASP awareness, while 2 respondents with 5+ years were not familiar with it at all.', {tone: 'green'})
                ], {layout: 'trio', art: 'gauge', sfx: 'PROVEN!'})
            ]
        },
        {
            id: 'footballsite',
            title: 'FootballSite',
            category: 'Academic · Full-stack · RIA',
            status: '100/100',
            headline: 'A full-stack football match tracker with live API sync, AJAX navigation, geolocation filtering and social comments — graded 100/100.',
            links: [link('Source ↗', 'https://github.com/Zubs/footballSite')],
            spreads: [
                page('footballsite', 'MATCH DAY, LIVE', 'FootballSite · 6CC001 Advanced Web Technologies · 100/100', [
                    panel('globe', 'Live from the API', 'Daily fixtures split into completed and upcoming, with automatic refresh for today and yesterday when data is more than 10 minutes stale.', {tone: 'green', sfx: 'GOAL!'}),
                    panel('browser', 'The match view', 'Starting XIs, substitutes, managers and comparative stat bars. Lineups and stats are lazy-loaded on first visit and cached as JSON columns.', {tone: 'blue'}),
                    panel('terminal', 'Engineering decisions', 'A dedicated FootballApiService maps status codes to local enums; 300ms-debounced AJAX search avoids page reloads; updateOrCreate prevents duplicates on re-sync.', {tone: 'yellow'})
                ], {art: 'globe', sfx: 'WHISTLE!'})
            ]
        },
        {
            id: 'colabdev',
            title: 'ColabDev',
            category: 'Academic · Team project',
            status: '96 · top mark',
            headline: 'An open day companion app for the University of Wolverhampton, built from scratch by a team of eight. It scored 96, the highest mark of the year.',
            links: [link('Source ↗', 'https://github.com/Zubs/ColabDev')],
            spreads: [
                page('colabdev', 'EIGHT PEOPLE, ONE APP', 'ColabDev · 5CS024 Collaborative Development', [
                    panel('network', 'Leading the dev team', 'I led a four-person development team inside an eight-person project: open day registration with nested validation, events grouped by date, a public FAQ and registration emails.', {tone: 'purple', sfx: 'TEAM UP!'}),
                    panel('chip', 'Layered Flask', 'Blueprints → controllers → services → models, one module per domain, with JWT tokens stored server-side so logout revokes the session and PBKDF2-SHA256 password hashing.', {tone: 'blue'}),
                    panel('browser', 'Vue on the front', 'Vue 3 with Pinia and Vue Router, five Alembic migrations tracking every schema change, API docs with Swagger/OpenAPI and Brevo SMTP for email.', {tone: 'green'})
                ], {art: 'network', sfx: 'SHIP!'})
            ]
        },
        {
            id: 'islamichub',
            title: 'IslamicHub',
            category: 'Product · Open source',
            status: 'Live',
            headline: 'A free, open-source Islamic education and tools platform: scholarly guides alongside a Zakat calculator, prayer times engine and inheritance calculator.',
            links: [link('islamichub.xyz ↗', 'https://islamichub.xyz/'), link('Source ↗', 'https://github.com/Zubs/islamichub')],
            spreads: [
                page('islamichub', 'TOOLS WITH PURPOSE', 'IslamicHub · Co-founder & lead engineer · 2026 – present', [
                    panel('globe', 'Prayer times and Qibla', 'Accurate prayer times with a Qibla direction finder and a live API-driven Hijri calendar.', {tone: 'green', sfx: 'CONNECT!'}),
                    panel('gauge', 'Calculators that matter', 'A Zakat calculator using live gold and silver prices, plus an Islamic inheritance calculator, built on structured content for multi-madhab guidance.', {tone: 'blue'}),
                    panel('browser', 'From static to Vue', 'Co-founded with Yusuf Saif and migrated the original HTML, CSS and JavaScript design to the Vue 3 Composition API with Pinia for modular state, while keeping the platform free and open source.', {tone: 'yellow'})
                ], {art: 'globe', sfx: 'SHARE!'})
            ]
        },
        {
            id: 'kueri',
            title: 'Kueri',
            category: 'Product · Developer tool',
            status: 'Building',
            headline: 'TablePlus meets Cursor — an AI-native desktop database client for developers.',
            links: [link('Live preview ↗', 'https://kueriapp.netlify.app/')],
            spreads: [
                page('kueri', 'THE QUERY COPILOT', 'Kueri · Solo founder & engineer · 2025 – present', [
                    panel('terminal', 'Ask in English, get SQL', 'MVP features include natural language → SQL generation and AI query explanations for onboarding and learning.', {tone: 'purple', sfx: 'GENERATE!'}),
                    panel('chip', 'One client, many databases', 'PostgreSQL, MySQL, MongoDB and SQLite behind an IDE-style interface with a schema explorer, encrypted credentials and query history, using Electron IPC for secure DB connections.', {tone: 'blue'}),
                    panel('network', 'The hard parts', 'A focused 10-day pivot from concept to MVP. The open challenges are AI token cost optimisation, a cross-database query normalisation layer and context-aware, schema-aware prompt engineering.', {tone: 'green'})
                ], {art: 'terminal', sfx: 'SELECT!'})
            ]
        },
        {
            id: 'scholarsearch',
            title: 'ScholarSearch',
            category: 'Academic · Big data',
            status: 'Academic',
            headline: 'A full-stack academic search engine over an arXiv dataset — built for a Big Data module.',
            links: [link('Source ↗', 'https://github.com/Zubs/scholar-search')],
            spreads: [
                page('scholarsearch', 'SEARCH THE ARCHIVE', 'ScholarSearch · 6CS030 Big Data · Lead engineer & author', [
                    panel('network', 'Full-text at scale', 'Elasticsearch indexes an arXiv research-paper dataset; a FastAPI backend adds pagination and filtering.', {tone: 'purple', sfx: 'FIND!'}),
                    panel('browser', 'Vue on the surface', 'A Vue 3 Composition API frontend presents results, with an audit of v-html usage to remediate XSS risks.', {tone: 'blue'}),
                    panel('chip', 'Containerised', 'Docker completes the stack: FastAPI, Elasticsearch, Vue 3, Python and the arXiv dataset.', {tone: 'green'})
                ], {art: 'network', sfx: 'INDEX!'})
            ]
        },
        {
            id: 'aco-agent',
            title: 'ACO Agent',
            category: 'Academic · AI · Complex systems',
            status: 'Converged in 10 rounds',
            headline: 'An agent in a Unity world that plans its route with Ant Colony Optimisation, written from scratch, with a Gemini assistant and an on-device image classifier.',
            links: [link('Full write-up ↗', links.projects)],
            spreads: [
                page('aco-agent', 'THE PHEROMONE PATH', 'ACO Agent · 6CS014 Complex Systems', [
                    panel('route', 'Swarm logic', 'Ant Colony Optimisation over a 10-waypoint graph built from the scene’s active waypoints. With 25 ants, the average tour fell from 334.8 to 297.7 units and every ant was on the optimal tour by round 10.', {tone: 'green', sfx: 'SCENT!'}),
                    panel('terminal', 'Tunable by design', 'Pheromone and distance weights (α, β), evaporation and Q stay named parameters. Ties go to the shorter connection and path length is capped.', {tone: 'blue'}),
                    panel('robot', 'More than one intelligence', 'A Gemini API assistant and MobileNet image classification via Unity’s inference engine sit alongside the route planner.', {tone: 'purple'})
                ], {art: 'route', sfx: 'CONVERGE!'})
            ]
        },
        {
            id: 'robot-navigation',
            title: 'Robot Navigation',
            category: 'Academic · Robotics',
            status: '5CS036',
            headline: 'Simulated robots that follow lines, solve mazes and steer around obstacles, controlled from Python in CoppeliaSim.',
            links: [link('Full write-up ↗', links.projects)],
            spreads: [
                page('robot-navigation', 'THREE ROBOTS, ONE BRAIN', 'Robot Navigation · 5CS036 · Python · CoppeliaSim', [
                    panel('robot', 'Line tracer', 'Three downward-facing vision sensors keep the line tracer on course.', {tone: 'green', sfx: 'BEEP!'}),
                    panel('route', 'Maze solver and DR20', 'Left-wall maze solving with dead-end U-turns and end detection; obstacle avoidance on the DR20 using five infrared and ultrasonic sensors.', {tone: 'blue'}),
                    panel('chip', 'Behaviour trees', 'A wrapper class keeps remote API calls apart from behaviour; overridable methods let strategies swap through inheritance; selector-of-sequences sets the priority: forward, left, right.', {tone: 'purple'})
                ], {art: 'robot', sfx: 'ACT!'})
            ]
        },
        {
            id: 'parallel-computing',
            title: 'Parallel Computing in C & CUDA',
            category: 'Academic · High-performance computing',
            status: '100% in HPC',
            headline: 'The same problems solved three ways, with POSIX threads, OpenMP and CUDA, from counting words to cracking passwords on a GPU.',
            links: [link('Full write-up ↗', links.projects)],
            spreads: [
                page('parallel-computing', 'ONE HUNDRED PERCENT THROUGHPUT', 'Parallel Computing · 5CS021 & 6CS005 · C / CUDA C', [
                    panel('chip', 'GPU power', 'Sobel edge detection on RGBA PNGs and a GPU brute-force reversal over all 67,600 letter-letter-digit-digit candidates.', {tone: 'purple', sfx: 'BRRR!'}),
                    panel('gauge', 'Threads everywhere', 'OpenMP matrix operations with shape checks and a pthreads word-frequency counter. Work splits evenly with remainder handling; each thread sums locally before one mutex update.', {tone: 'blue'}),
                    panel('terminal', 'Details that scale', 'OpenMP thread count capped at the number of rows; a CUDA grid-stride loop that works with any block size from 1 to 1024.', {tone: 'green', facts: ['High Performance Computing: 100% (P100)', 'pthreads · OpenMP · CUDA · LodePNG']})
                ], {art: 'chip', sfx: 'PARALLEL!'})
            ]
        },
        {
            id: 'konvertoj',
            title: 'konvertoj',
            category: 'Open source · CLI · Agentic development',
            status: '1.0.0 on npm',
            headline: 'A private, local file converter: 149 modes for images, iPhone photos, PDFs, GIFs, video and audio — nothing is uploaded, and the release carries npm provenance.',
            links: [link('npm ↗', 'https://www.npmjs.com/package/konvertoj'), link('Source ↗', 'https://github.com/Zubs/konvertoj')],
            spreads: [
                page('konvertoj-1', 'ONE HUNDRED FORTY-NINE MODES', 'konvertoj · Sole product engineer · TypeScript · Node.js', [
                    panel('chip', 'Convert locally, privately', 'Images via sharp and custom ICO encoding, HEIC photos, PDFs via pdf-lib and pdf.js, metadata with exifr, and video or audio through a pinned, checksummed FFmpeg download. No shell, no uploads.', {tone: 'blue', sfx: 'CONVERT!'}),
                    panel('terminal', 'The mode registry', 'A single registry is the source of truth for every mode: help, --list-modes, input checks, suggestions and the README are all generated from it.', {tone: 'green'}),
                    panel('gauge', 'The pipeline', 'Argument parsing → input planning and safe output naming → format detection from file contents → parallel batch runner → reporter with exit codes.', {tone: 'yellow'})
                ], {art: 'chip', sfx: '149!', facts: ['937 Vitest tests', 'CI on Windows, macOS and Linux']}),
                page('konvertoj-2', 'THE AGENT FACTORY', 'konvertoj · Spec-first, agentic development', [
                    panel('network', 'Propose, review, apply', 'Twenty features, 25 capability specifications and an orchestrator with 30 sub-agents as plan reviewers and regression testers. Every feature starts as an OpenSpec change; features 5–19 were built in a single unsupervised run.', {tone: 'purple', sfx: 'REVIEW!'}),
                    panel('shield', 'Gates and regression', 'Formatting, type checks, linting, tests and the build must all pass. A tester agent re-checks every feature on real files and reports confirmed bugs before archiving.', {tone: 'blue'}),
                    panel('globe', 'Clean-install release', 'Smoke tests on 5 platforms × 3 Node.js versions with install-size and start-up-time budgets, then a tagged GitHub Actions release with npm provenance and trusted publishing.', {tone: 'green'})
                ], {layout: 'duo', art: 'network', sfx: 'PUBLISH!'})
            ]
        },
        {
            id: 'toroman',
            title: 'toRoman',
            category: 'Open source · npm package',
            status: 'Published',
            headline: 'A zero-dependency library for Roman numeral operations — shipped with a full interactive docs playground.',
            links: [link('npm ↗', 'https://www.npmjs.com/package/toroman'), link('Interactive playground ↗', links.toromanPlayground)],
            spreads: [
                page('toroman', 'SMALL PACKAGE, CLEAN API', 'toRoman · Author & maintainer · TypeScript · Zero dependencies', [
                    panel('terminal', 'A small, complete API', 'toRoman, fromRoman, isRoman, addRoman, subtractRoman, multiplyRoman, divideRoman, rangeRoman and tableRoman, with typed errors. Version 2.0 is MIT licensed and distributed through npm and CDN.', {tone: 'blue', sfx: 'XIV!'}),
                    panel('browser', 'Docs you can play with', 'An interactive playground in this very repository at packages/toroman/index.html, built with vanilla JavaScript.', {tone: 'yellow'})
                ], {art: 'terminal', sfx: 'IV + X!'})
            ]
        },
        {
            id: 'jclcheck-cli',
            title: 'jclcheck (npm CLI)',
            category: 'Open source · CLI',
            status: 'Published',
            headline: 'Check z/OS JCL from a terminal or a CI pipeline — the JCLcheck engine as a zero-dependency npm package.',
            links: [link('npm ↗', 'https://www.npmjs.com/package/jclcheck'), link('Web workbench ↗', 'https://jclcheck.xyz')],
            spreads: [
                page('jclcheck-cli', 'JCL IN THE PIPELINE', 'jclcheck · Author & maintainer · npm · npx', [
                    panel('terminal3270', 'Built for CI', 'jclcheck <files> outputs text, JSON or SARIF and exits 0, 1 or 2. --zos / --jes checks against z/OS 2.3–3.2 and JES2 or JES3.', {tone: 'green', sfx: 'EXIT 0!'}),
                    panel('chip', 'Site aware', '--library reads catalogued PROCs and INCLUDE members from a folder; --profile applies naming standards and severities. SARIF 2.1.0 puts findings on pull requests.', {tone: 'blue'})
                ], {art: 'terminal3270', sfx: 'SARIF!'})
            ]
        },
        {
            id: 'xstarter',
            title: 'XStarter',
            category: 'Open source · npm · CLI',
            status: 'Published',
            headline: 'A Node.js MVC project generator: answer a few questions in the terminal and get a working Express app with routes, views, optional authentication and dependencies installed.',
            links: [link('npm ↗', 'https://www.npmjs.com/package/@zubs/xstarter'), link('Source ↗', 'https://github.com/Zubs/xstarter')],
            spreads: [
                page('xstarter', 'SCAFFOLD IN SECONDS', 'XStarter · Author & maintainer · Node.js · Express · EJS', [
                    panel('terminal', 'Answer, then build', 'Interactive setup validates the name and asks for a template, auth choice and Git/package-manager options. ncp copies files without clobbering existing ones.', {tone: 'blue', sfx: 'SCAFFOLD!'}),
                    panel('browser', 'Bundled templates', 'Express + EJS MVC starter with controllers, routes and views; an HTML/CSS/JS starter served by Express; JWT auth variants with a Mongoose user model and login/register views.', {tone: 'green'})
                ], {art: 'terminal', sfx: 'GENERATE!'})
            ]
        },
        {
            id: 'dsa-practice',
            title: 'DSA Practice',
            category: 'Fundamentals · Data structures & algorithms',
            status: 'Practice',
            headline: 'Classic data structures and algorithms written from scratch in PHP and TypeScript, with tests and Big-O notes for each.',
            links: [link('Source ↗', 'https://github.com/Zubs/DSA-Practice')],
            spreads: [
                page('dsa-practice', 'THE FUNDAMENTALS FORGE', 'DSA Practice · PHP 8 · TypeScript · PHPUnit · Jest', [
                    panel('route', 'Structures', 'Linear, circular and doubly linked lists on a shared abstract base implementing Iterator; stacks backed by arrays and linked lists; binary search trees and a binary max heap.', {tone: 'blue', sfx: 'BUILD!'}),
                    panel('gauge', 'Algorithms', 'Linear, ordered-linear and binary search; bubble, selection and insertion sort; quick sort and quickselect with in-place partitioning. Table-driven Jest tests cover every algorithm.', {tone: 'yellow'})
                ], {art: 'route', sfx: 'O(log n)!'})
            ]
        },
        {
            id: 'shipping-label',
            title: 'Shipping Label Management System',
            category: 'Experiment · Logistics · Full-stack',
            status: 'Complete',
            headline: 'A secure, role-based shipping label manager with a web dashboard and a token-authenticated REST API, both backed by the same authorisation policies.',
            links: [link('Source ↗', 'https://github.com/Zubs/shipping-app')],
            spreads: [
                page('shipping-label', 'ONE POLICY, TWO DOORS', 'Shipping Label Management System · Laravel 13 · MySQL', [
                    panel('shield', 'Thin controllers, strong policies', 'Validation and request-level authorisation live in form requests; courier and shipment policies are the single source of truth for permissions across web and API; API resources keep database columns out of the JSON contract.', {tone: 'blue', sfx: 'DENIED!'}),
                    panel('terminal', 'Tested boundaries', 'A Pest suite covers authentication, role-based routing, CRUD, validation, delete-constraint protection and API contract status codes 200, 201, 401, 403 and 422.', {tone: 'green', facts: ['Breeze (web) · Sanctum (API)', 'Laravel 13 · PHP 8.3 · Pest']})
                ], {art: 'shield', sfx: 'GRANTED!'})
            ]
        },
        {
            id: 'be-kind',
            title: 'Be Kind Initiative',
            category: 'Experiment · Charity · Full-stack',
            status: 'Live',
            headline: 'A full-stack web presence for a Lagos-based charity — with a contact form that saves to MongoDB and sends email notifications in real time.',
            links: [link('Live site ↗', 'https://ohw-2020-3.onrender.com'), link('Source ↗', 'https://github.com/Zubs/ohw-2020-3')],
            spreads: [
                page('be-kind', 'CODE WITH A CAUSE', 'Be Kind Initiative · Main developer · Node.js · Express · MongoDB', [
                    panel('globe', 'A home online', 'Multi-page site with Home, About, Contact and 404 pages, a Bootstrap 4 responsive carousel and per-page CSS loaded through EJS locals.', {tone: 'green', sfx: 'HELLO!'}),
                    panel('mail', 'Messages that land', 'The contact form persists submissions through a Mongoose schema with timestamps and sends email notifications with Nodemailer.', {tone: 'blue'})
                ], {art: 'mail', sfx: 'SENT!'})
            ]
        },
        {
            id: 'ztodo',
            title: 'ZTodo',
            category: 'Experiment · Productivity',
            status: 'Live',
            headline: 'A clean, distraction-free todo app — built to explore Vue 2, Vuetify, and the full Vue CLI ecosystem.',
            links: [link('Live app ↗', 'https://ztodo.netlify.app'), link('Source ↗', 'https://github.com/Zubs/ZTodo')],
            spreads: [
                page('ztodo', 'SMALL APP, FULL PWA', 'ZTodo · Vue 2 · Vuetify · Vuex · Vue Router', [
                    panel('browser', 'The essentials', 'Create todos with an optional detail body, inline edit any item, delete individually and toggle completion.', {tone: 'blue', sfx: 'CHECK!'}),
                    panel('chip', 'The ecosystem', 'Vuex global state, Vue Router history mode with a 404 fallback, a registered service worker and a full PWA manifest with multi-size icons.', {tone: 'green'})
                ], {art: 'browser', sfx: 'DONE!'})
            ]
        },
        {
            id: 'node-image-finder',
            title: 'Node Image Finder',
            category: 'Experiment · CLI',
            status: 'Experiment',
            headline: 'My first command-line tool: search Unsplash from the terminal and get clickable image and download links back.',
            links: [link('Source ↗', 'https://github.com/Zubs/node_image_finder')],
            spreads: [
                page('node-image-finder', 'THE FIRST CLI', 'Node Image Finder · Node.js · yargs · Unsplash API', [
                    panel('terminal', 'Terminal to photograph', 'A required -s / --search term, an optional -o / --orientation of landscape, portrait or squarish, ten results with linked titles and a download link for each image.', {tone: 'blue', sfx: 'FOUND!'})
                ], {art: 'terminal', sfx: 'SEARCH!'})
            ]
        },
        {
            id: 'gpcalc',
            title: 'GPCalc',
            category: 'Experiment · Utility',
            status: 'Utility',
            headline: 'A GPA/CGPA calculator that supports multiple grading scales — built because the existing ones were too rigid.',
            links: [link('Source ↗', 'https://github.com/Zubs/GPCalc')],
            spreads: [
                page('gpcalc', 'THE FLEXIBLE CALCULATOR', 'GPCalc · JavaScript · HTML / CSS', [
                    panel('gauge', 'Built for real scales', 'A student utility supporting multiple grading scales, made because existing calculators were too rigid.', {tone: 'yellow', sfx: 'CALC!'})
                ], {art: 'gauge', sfx: 'GPA!'})
            ]
        },
        {
            id: 'brickbreaker',
            title: 'BrickBreaker Challenge',
            category: 'Experiment · AI-paired',
            status: 'Experiment',
            headline: 'An experiment in human-AI co-authorship — building a game with an AI pair programmer.',
            links: [link('Source ↗', 'https://github.com/Zubs/BrickBreakerChallenge')],
            spreads: [
                page('brickbreaker', 'HUMAN + MACHINE', 'BrickBreaker Challenge · Vanilla JavaScript · Canvas API', [
                    panel('game', 'A game as an experiment', 'Lead plus AI co-author on a browser game built with vanilla JavaScript and the HTML5 Canvas API, exploring what human-AI co-authorship feels like in practice.', {tone: 'red', sfx: 'SMASH!'})
                ], {art: 'game', sfx: 'BREAK!'})
            ]
        }
    ];

    /* --------------------------------------------------------
       NON-PROJECT SECTIONS
       -------------------------------------------------------- */
    const frontSection = {
        id: 'front', label: 'Front matter', tocTitle: null, pages: [
            {
                kind: 'cover', id: 'cover', art: 'cover',
                title: meta.name,
                sfx: 'THWIP!'
            },
            {
                kind: 'toc', id: 'contents', title: 'INSIDE THIS ISSUE',
                deck: 'Every chapter, every case file. Tap a page number to jump straight there.',
                art: 'book'
            }
        ]
    };

    const originSection = {
        id: 'origin', label: 'Origin', tocTitle: 'The Origin', tocNote: 'Who I am and where I started', pages: [
            page('origin', 'ORIGIN: THE ENGINEER', 'Zubair Idris Aweda · Full-Stack Software Engineer · Derby, UK', [
                panel('mask', 'Three years in the trenches', 'A mid-senior full-stack engineer with 3+ years shipping production-grade systems in FinTech, and a First Class Computer Science graduate of the University of Wolverhampton (90.44% average).', {tone: 'blue', sfx: 'THUD!', caption: 'Currently open to engineering roles, graduate mainframe roles, and MS/PhD research.'}),
                panel('hammer', 'Wields PHP like Thor wields his hammer', 'PHP and Laravel are my main weapon: scalable backend microservices, high-volume transactions and 99.9% service uptime at Stax Payments. Playful comparison, real code.', {tone: 'red', sfx: 'KRAK!'}),
                panel('pen', '443K+ readers', '15+ in-depth technical articles on freeCodeCamp, Earthly, Draft.dev and Section.io; bootcamp teaching across Nigeria; DevFest talks in London, Scotland and Bletchley Park.', {tone: 'yellow'})
            ], {art: 'mask', sfx: 'ZUBS!', layout: 'trio'}),
            page('arsenal', 'THE ARSENAL', 'Languages, frameworks, platforms and practices', [
                panel('terminal', 'Languages', 'PHP · JavaScript (ES6+) · TypeScript · Python · SQL · HTML5 / CSS3. Academic and project work also spans C, C++, C# (Unity), Java and CUDA.', {tone: 'blue', sfx: 'TYPE!'}),
                panel('chip', 'Frameworks & databases', 'Laravel · Node.js / Express · React.js / Vue.js · MySQL / PostgreSQL · MongoDB · Neo4j / Cypher · Flask · FastAPI · Elasticsearch.', {tone: 'green'}),
                panel('shield', 'Tools, APIs & practices', 'Docker · CI/CD · Git / GitHub · REST API design · Stripe / Twilio / Firebase / Mailgun · TDD and unit testing · Agile / Scrum / SDLC · AI agents and spec-driven development.', {tone: 'yellow'})
            ], {art: 'terminal', sfx: 'EQUIP!', layout: 'trio'}),
            page('forge', 'THE FORGE PROTOCOL', 'Spec-first development with AI agents', [
                panel('terminal', '01 — Spec the product', 'Turn a rough idea into a structured spec with constraints and explicit non-goals. Stress-test it against user journeys, then break it into a feature list.', {tone: 'purple', sfx: 'WRITE!'}),
                panel('network', '02 — OpenSpec loop', 'Propose, apply and archive on real codebases. Review the proposal, design, tasks and delta specs before code is written; check for drift before archiving.', {tone: 'blue'}),
                panel('shield', '03 — Guardrails', 'Fix technical decisions and scope first, split features into reviewable steps, write the test plan early, set rules in AGENTS.md, enforce hooks and use a second agent for local review.', {tone: 'green'}),
                panel('robot', '04 — Trained and certified', 'Unlearn: Turbo Mode — AI Tools & Agents, and The Future Proof Dev. Practices include MCP servers, sub-agents, context engineering and test-first AI builds.', {tone: 'yellow'})
            ], {art: 'terminal', sfx: 'FORGE!', layout: 'duo'}),
            page('knowledge', 'THE CONNECTED PATH', 'Graph data, credentials and a First Class degree', [
                panel('network', 'Neo4j Certified Professional', 'Property graphs, Cypher queries, data modelling and import, the Neo4j Python driver, knowledge graphs and GraphRAG — six GraphAcademy courses completed in October 2026.', {tone: 'green', sfx: 'CONNECT!', links: [link('Verify certification ↗', 'https://graphacademy.neo4j.com/c/c2e5a167-a80b-47aa-8f06-17d567706378')]}),
                panel('gauge', '90.44% average', 'BSc (Hons) Computer Science, First Class, University of Wolverhampton, July 2026. Perfect 100% in Introductory Programming, Fundamentals of Computing and Object-Oriented Design; 100% in High Performance Computing.', {tone: 'blue'}),
                panel('book', 'Research interests', 'Robotics and human-robot interaction, AI systems, cognitive science, AI ethics, distributed systems and brain-computer interfaces — the questions I want to pursue in graduate study.', {tone: 'yellow'})
            ], {art: 'network', sfx: 'LEARN!', layout: 'trio'})
        ]
    };

    const careerSection = {
        id: 'career', label: 'Career file', tocTitle: 'Career file', tocNote: 'The jobs behind the craft', pages: [
            page('stax', 'THE PAYMENTS FRONTLINE', 'Stax Payments · Mid-Senior Full-Stack Engineer (PHP) · Jun 2022 – Oct 2023', [
                panel('server', '99.9% uptime', 'Architected scalable backend microservices using PHP and Laravel, supporting high-volume transaction processing while ensuring 99.9% service uptime.', {tone: 'blue', sfx: 'KRAK!', caption: 'Remote · Full-time'}),
                panel('book', 'Docs as a superpower', 'Reduced developer onboarding time by about 40% by authoring internal and public-facing API documentation that became the engineering team’s single source of truth.', {tone: 'yellow'}),
                panel('shield', 'No drama deploys', 'Adapted complex data models for seamless feature integration without downtime or data-integrity loss; enforced unit testing and peer review to reduce critical bugs reaching production.', {tone: 'green'}),
                panel('browser', 'Accessible by default', 'Worked with UX/UI designers to turn wireframes into pixel-perfect, WCAG-accessible interfaces.', {tone: 'purple', facts: ['PHP · Laravel · MySQL · REST APIs', 'Microservices · Docker']})
            ], {art: 'server', sfx: 'CHARGE!', layout: 'feature'}),
            page('fcc-author', 'THE WORD SMITH', 'freeCodeCamp · Technical Author & Open Source Contributor · 2021 – present', [
                panel('pen', '15+ articles, 443K+ views', 'In-depth writing on PHP, Laravel, Node.js, security and algorithms, with a global readership well past 443,000.', {tone: 'yellow', sfx: 'SCRIBE!'}),
                panel('globe', 'Travelling further', 'Articles translated into multiple languages and syndicated across partner platforms.', {tone: 'blue'}),
                panel('shield', 'Top contributor, 2021–2024', 'Recognised as a Top Open Source Contributor for four consecutive years.', {tone: 'green', links: [link('Author page ↗', links.fcc)]})
            ], {art: 'pen', sfx: 'PUBLISH!', layout: 'trio'}),
            page('contracts', 'THE CONTRACT CHRONICLES', 'AYU Digital · Humongous.io · CitonHub', [
                panel('mail', 'AYU Digital · Jan – May 2022', 'Built an omnichannel notification engine over Mailgun, Firebase and Twilio for thousands of daily email, SMS and push messages; Twilio verification reduced fraudulent sign-ups; a custom export produced CSV/JSON 10× faster than the manual method; Stripe payments were PCI-compliant.', {tone: 'blue', sfx: 'SEND!'}),
                panel('terminal', 'Humongous.io · Mar – Jun 2021', 'Reduced technical debt by refactoring legacy codebases and introducing TypeScript across the stack, and established automated unit and integration testing to catch regressions early.', {tone: 'green'}),
                panel('browser', 'CitonHub · Nov 2020 – Jan 2021', 'As Junior Backend Engineer, collaborated with senior architects to modernise core application logic with Laravel and Vue.js while keeping continuity for legacy users.', {tone: 'yellow'}),
                panel('mask', 'CodeTouch Technology · 2019 – 2020', 'The first professional web-developer role: Laravel and Vue.js work as a junior developer, remembered by a project manager as showing initiative and exceeding his experience level.', {tone: 'purple'})
            ], {art: 'mail', sfx: 'SHIP!', layout: 'duo'})
        ]
    };

    const beyondSection = {
        id: 'beyond', label: 'Beyond the code', tocTitle: 'Beyond the code', tocNote: 'Mainframe, writing, teaching, testimonials', pages: [
            page('mainframe', 'THE ENTERPRISE FRONTIER', 'IBM Z · z/OS · WLM · JCL · Mainframe Student Society', [
                panel('terminal3270', 'Superstar tier', 'Reached the highest tier of the IBM Z Student Ambassador programme, championing mainframe technologies across university channels and digital platforms.', {tone: 'green', sfx: 'ONLINE!'}),
                panel('network', 'Secretary / Vice-President', 'Mainframe Student Society at the University of Wolverhampton: weekly technical meet-ups, community outreach and events bridging the knowledge gap for CS students.', {tone: 'blue'}),
                panel('book', 'LFX mentorship, summer 2026', 'Mentee on the Open Mainframe Project’s Mainframe Open Education programme, turning foundational workflows into introductory blog posts and interactive modules.', {tone: 'yellow'}),
                panel('mic', 'GSUK 2026', 'Spoke on closing the mainframe skills gap, demystifying Workload Manager, and joined the open-source panel: “More Than Just Code?”', {tone: 'purple', links: [link('Mainframe path ↗', links.mainframe), link('Interactive series ↗', links.mainframeSeries)]})
            ], {art: 'terminal3270', sfx: '3270!', layout: 'duo'}),
            page('mainframe-series', 'THE INTERACTIVE SERIES', 'Mainframe 101 · six modules plus a WLM bonus, written for beginners', [
                panel('browser', 'Learn by touching the machine', 'Six beginner-friendly modules: interaction, programming languages, scripting languages, batch and JES, designing for z/OS, and communications — each with its own interactive companion.', {tone: 'green', sfx: 'CLICK!', links: [link('Browse the series ↗', links.mainframeSeries)]}),
                panel('terminal3270', 'Simulators, not screenshots', 'A live TSO/E terminal, job queue simulator, annotated JCL explorer, automation task router, VIPA failover demo and a VSAM-versus-Db2 decision helper.', {tone: 'blue'}),
                panel('gauge', 'The WLM bonus', 'The Workload Manager module (published 10 April 2026) adds a decision flow, a live workload simulator, a zIIP offload visualiser and three case studies. Co-authored with Salaudeen Zainab Moyinoluwa.', {tone: 'yellow'})
            ], {art: 'book', sfx: 'PLAY!', layout: 'trio'}),
            page('writing-teaching', 'THE AMPLIFIER', 'Writing, teaching and public speaking', [
                panel('pen', 'Words that travel', '15+ published articles and 443K+ readers on freeCodeCamp, plus mainframe and enterprise computing writing on Medium.', {tone: 'yellow', sfx: 'TAP TAP!', links: [link('freeCodeCamp ↗', links.fcc), link('Medium ↗', links.medium)]}),
                panel('mic', '8+ conference talks', 'GSUK 2026 (three sessions), DevFest Bletchley Park 2025, DevFest Scotland Online 2024, DevFest London 2023, Ogbomoso 2022 and workshops at GDSC chapters.', {tone: 'blue'}),
                panel('mask', 'Teaching is the point', 'Lead Laravel Tutor at Engineering Career Expo 3.0, backend facilitator at GDSC University of Ilorin’s 2024 bootcamp, backend tutor at GDSC Unilag and Python tutor at Engineering Career Expo 2020.', {tone: 'green'})
            ], {art: 'mic', sfx: 'SPEAK!', layout: 'trio'}),
            page('testimonials-1', 'WORD ON THE TEAM · I', 'Verbatim recommendations from managers and teammates', [
                panel('mask', '“Well documented, effective code”', '“Idris is an excellent developer who writes well documented, effective code. He writes unit tests also and makes sure his PRs are tidy and descriptive. ... He is one of the reasons I love my team.”', {tone: 'blue', bubble: 'Jason Montilla · Manager, Stax'}),
                panel('shield', '“Anticipating every need”', '“Zubair stands out as one of the most proficient Backend Engineers with whom I have had the privilege of working with throughout my career.”', {tone: 'green', bubble: 'Abdulrahman Yusuf · Teammate, AYU Digital'}),
                panel('terminal', '“Exemplary work ethic”', '“Idris’s strong skills in PHP, Laravel, React, and TypeScript, along with his exemplary work ethic and collaborative approach, make him an exceptional candidate for any software development role.”', {tone: 'yellow', bubble: 'Matt Robinson · Team Lead, Stax'}),
                panel('mask', '“Immense potential”', '“I had the pleasure of managing Zubair during his time as a Junior Web Developer at CodeTouch Technology, and it was clear from the start that he had immense potential.”', {tone: 'purple', bubble: 'Abayomi Tunde Sowemimo · PM, CodeTouch Technology'})
            ], {art: 'mask', sfx: 'TEAM UP!', layout: 'duo'}),
            page('testimonials-2', 'WORD ON THE TEAM · II', 'Five more recommendations, unedited', [
                panel('mask', '“Above and beyond”', '“Idris seamlessly integrated into our team, consistently going above and beyond expectations.”', {tone: 'blue', bubble: 'Nicholas Kimuli · Teammate, Stax'}),
                panel('book', '“Continuous learning”', '“Idris dedication to continuous learning and professional growth is truly inspiring.”', {tone: 'green', bubble: 'Babatunde Koiki · Teammate, Humongous.io'}),
                panel('route', '“The right questions”', '“He knew how to ask the right questions, which often made the team reevaluate already taken decisions.”', {tone: 'yellow', bubble: 'Akinboluwarin Akinwande · Teammate, Certlify project'}),
                panel('globe', '“A positive influence”', '“Zubair is enthusiastic about products, a positive influence to the team.”', {tone: 'purple', bubble: 'Olutola Owolabi · Manager, CitonHub'}),
                panel('mail', '“Memorable experience”', '“Great guy to work with. Memorable experience working with him.”', {tone: 'red', bubble: 'AbdulAzeez Atanda · Teammate, AYU Digital', links: [link('All nine recommendations ↗', links.testimonials)]})
            ], {art: 'globe', sfx: 'CRED!', layout: 'trio'})
        ]
    };

    const closeSection = {
        id: 'close', label: 'Next issue', tocTitle: 'After hours & next issue', tocNote: 'The person, and how to reach me', pages: [
            page('after-hours', 'AFTER HOURS', 'Football, art, teaching, comics and cooking', [
                panel('game', 'Football', 'I play it, watch it obsessively, and simulate entire careers on Football Manager. Sunday five-a-side or a Champions League final — football is football.', {tone: 'green', sfx: 'GOAL!'}),
                panel('mask', 'The arts', 'Art in every form, music of every genre, and a quiet pride in having visited a gallery or museum in almost every city I’ve been to. Mountains, animals and greenery count too.', {tone: 'purple'}),
                panel('shield', 'Marvel comics', 'A Thor man at heart — fitting, given the PHP hammer — with Deadpool’s irreverence and Wolverine’s grit permanent fixtures on the list. The comics are where the real depth lives.', {tone: 'red', sfx: 'SNIKT!'}),
                panel('mail', 'Cooking & eating', 'Self-proclaimed culinary expert. The making of it, the eating of it, the culture around it — a good meal is one of life’s most reliable pleasures.', {tone: 'yellow'})
            ], {art: 'mask', sfx: 'RELAX!', layout: 'duo'}),
            page('contact', 'TO BE CONTINUED…', 'Open to engineering roles, graduate mainframe roles, and MS/PhD research', [
                panel('mail', 'The direct line', 'Reach me at zubairidrisaweda@gmail.com. Remote work globally; hybrid or on-site in the UK; open to relocation.', {tone: 'yellow', sfx: 'MAIL!', links: [link('Send an email ↗', 'mailto:zubairidrisaweda@gmail.com')]}),
                panel('server', 'Engineering roles', 'Backend roles preferred, or full-stack with a strong backend lean: PHP/Laravel, TypeScript, Node.js and Vue.js in FinTech, SaaS or developer tooling.', {tone: 'blue', links: [link('Engineering CV ↗', links.cv), link('Engineering path ↗', links.engineering)]}),
                panel('terminal3270', 'Mainframe roles', 'Graduate or junior IBM Z roles: z/OS, JCL, enterprise batch. Former IBM Z Student Ambassador (Superstar tier) and builder of JCLcheck.', {tone: 'green', links: [link('Mainframe path ↗', links.mainframe)]}),
                panel('book', 'Graduate research', 'MS or PhD opportunities in robotics, HRI, AI systems, cognitive science or distributed systems, backed by 3+ years of professional engineering.', {tone: 'purple', links: [link('Academic CV ↗', links.academicCv), link('Research ↗', links.research)]}),
                panel('globe', 'Elsewhere', 'GitHub · LinkedIn · freeCodeCamp · Medium · Credly · site source.', {tone: 'red', links: [link('GitHub ↗', links.github), link('LinkedIn ↗', links.linkedin), link('Source ↗', links.source)]})
            ], {art: 'mail', sfx: 'NEXT!', layout: 'trio'})
        ]
    };

    /* --------------------------------------------------------
       BUILD THE ISSUE
       Page numbers, chapters, contents and index are derived.
       -------------------------------------------------------- */
    function projectPages() {
        const output = [];
        projects.forEach(function (project, index) {
            project.spreads.forEach(function (spread, spreadIndex) {
                const story = Object.assign({}, spread, {
                    id: spread.id || project.id + '-' + (spreadIndex + 1),
                    kind: 'comic',
                    projectId: project.id,
                    projectTitle: project.title,
                    projectIndex: index,
                    part: spreadIndex + 1,
                    parts: project.spreads.length,
                    storyLinks: project.links,
                    storyHeadline: project.headline,
                    storyMeta: project.status + ' · ' + project.category
                });
                output.push(story);
            });
        });
        return output;
    }

    const sections = [
        frontSection,
        originSection,
        careerSection,
        {
            id: 'projects', label: 'Case files', tocTitle: 'Case files',
            tocNote: projects.length + ' projects · each one a story',
            pages: projectPages()
        },
        beyondSection,
        closeSection
    ];

    const pages = [];
    sections.forEach(function (section) {
        section.pages.forEach(function (rawPage) {
            pages.push(Object.assign({}, rawPage, {
                number: pages.length + 1,
                section: section.id,
                sectionLabel: section.label
            }));
        });
    });

    const toc = sections
        .filter(function (section) { return section.tocTitle; })
        .map(function (section) {
            const first = pages.filter(function (builtPage) { return builtPage.section === section.id; })[0];
            return {
                label: section.tocTitle,
                note: section.tocNote,
                page: first ? first.number : 1
            };
        });

    const projectIndex = projects.map(function (project) {
        const first = pages.filter(function (page_) { return page_.projectId === project.id; })[0];
        return {
            id: project.id,
            title: project.title,
            category: project.category,
            status: project.status,
            page: first ? first.number : 1,
            parts: project.spreads.length
        };
    });

    function resolvePage(value, total) {
        const n = Number.parseInt(value, 10);
        if (!Number.isFinite(n)) return 1;
        return Math.min(Math.max(n, 1), total);
    }

    function parseHash(hash) {
        const match = /^#?page\/(\d+)$/i.exec(String(hash || ''));
        return match ? Number.parseInt(match[1], 10) : null;
    }

    function formatHash(number) {
        return '#page/' + number;
    }

    return {
        meta: meta,
        links: links,
        projects: projects,
        sections: sections,
        pages: pages,
        toc: toc,
        projectIndex: projectIndex,
        total: pages.length,
        resolvePage: resolvePage,
        parseHash: parseHash,
        formatHash: formatHash
    };
});
