/* ============================================
   toRoman Playground — app.js
   Library source inlined (CommonJS → browser global)
   since unpkg delivers CJS which needs a bundler.
   ============================================ */

/* ──────────────────────────────────────────
   1.  toRoman library — ported from source
   ────────────────────────────────────────── */
const roman = (() => {

    function getCount(array, value) {
        let count = 0;
        array.forEach(item => {
            if (item === value) count++;
        });
        return count;
    }

    function isRoman(value) {
        if (!value) throw new Error("Roman numeral cannot be empty");
        if (typeof value !== "string" || Number(value))
            throw new Error("Roman numeral must be of type string");

        value = value.toUpperCase();
        const letters = value.split("");
        const romans = [["M", 4], ["D", 1], ["C", 4], ["L", 1], ["X", 4], ["V", 1], ["I", 3]];
        const romanLetters = ["M", "D", "C", "L", "X", "V", "I"];

        for (let i = 0; i < romans.length; i++) {
            const [char, maxCount] = romans[i];
            const count = getCount(letters, char);
            if (count && count > maxCount)
                throw new Error(`${char} cannot appear more than ${maxCount} times`);
        }

        if (letters.length < 2) {
            if (!romanLetters.includes(letters[0]))
                throw new Error(`Invalid Roman numeral: ${letters[0]}`);
            return true;
        }

        letters.forEach((letter, index) => {
            if (!romanLetters.includes(letter))
                throw new Error(`Invalid Roman numeral: ${letter}`);
            const next = letters[index + 1];

            if (letter === "D") {
                if (["M", "D"].includes(next))
                    throw new Error(`Unexpected token ${next}, cannot come after D`);
            }
            if (letter === "L") {
                if (next === undefined) return;
                if (!["X", "V", "I"].includes(next))
                    throw new Error(`Unexpected token ${next} after L`);
            }
            if (letter === "X") {
                if (["M", "D"].includes(next))
                    throw new Error(`Unexpected token ${next}, cannot come after X`);
            }
            if (letter === "V") {
                if (next !== undefined && next !== "I")
                    throw new Error(`Unexpected token ${next} after V`);
            }
            if (letter === "I") {
                if (next !== undefined && !["X", "V", "I"].includes(next))
                    throw new Error(`Unexpected token ${next} after I`);
            }
        });
        return true;
    }

    function toRoman(value) {
        if (!Number.isInteger(value))
            throw new Error("Value must be of type number");
        if (value <= 0 || value >= 4000)
            throw new Error("Value must be between 1 and 3999");

        let result = "";
        const romanMap = [
            [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
            [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
            [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
        ];
        for (const [num, numeral] of romanMap) {
            while (value >= num) {
                result += numeral;
                value -= num;
            }
        }
        return result;
    }

    function fromRoman(value) {
        let arabNum = 0;
        if (isRoman(value)) {
            const letters = value.toUpperCase().split("");
            const map = {M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1};
            for (let i = 0; i < letters.length; i++) {
                const curr = map[letters[i]];
                const next = map[letters[i + 1]];
                if (next && next > curr) {
                    arabNum += next - curr;
                    i++;
                } else arabNum += curr;
            }
        }
        return arabNum;
    }

    function validateGeneral(input) {
        let result = 0;
        if (typeof input === "string") {
            if (isRoman(input)) result = fromRoman(input);
        } else if (typeof input === "number") {
            result = input;
        } else {
            throw new Error("Input must be a string or number");
        }
        if (result > 3999 || result <= 0)
            throw new Error("Value must be between 1 and 3999");
        return result;
    }

    function sum(a, b) {
        return toRoman(validateGeneral(a) + validateGeneral(b));
    }

    function diff(a, b) {
        const result = validateGeneral(a) - validateGeneral(b);
        if (result <= 0) throw new Error("Result must be greater than 0");
        return toRoman(result);
    }

    function multiply(a, b) {
        return toRoman(validateGeneral(a) * validateGeneral(b));
    }

    function divide(a, b) {
        const divisor = validateGeneral(b);
        if (divisor === 0) throw new Error("Cannot divide by zero");
        return toRoman(Math.floor(validateGeneral(a) / divisor));
    }

    function range(start, end) {
        if (!Number.isInteger(start) || !Number.isInteger(end))
            throw new Error("Start and end must be integers");
        if (start < 1 || end > 3999) throw new Error("Range must be between 1 and 3999");
        if (start > end) throw new Error("Start must be less than or equal to end");
        const result = [];
        for (let i = start; i <= end; i++) result.push(toRoman(i));
        return result;
    }

    function random() {
        return toRoman(Math.floor(Math.random() * 3999) + 1);
    }

    function table(limit) {
        if (!Number.isInteger(limit) || limit < 1 || limit > 3999)
            throw new Error("Limit must be an integer between 1 and 3999");
        const result = {};
        for (let i = 1; i <= limit; i++) result[i] = toRoman(i);
        return result;
    }

    function max(a, b) {
        return validateGeneral(a) >= validateGeneral(b) ? a : b;
    }

    function min(a, b) {
        return validateGeneral(a) <= validateGeneral(b) ? a : b;
    }

    // Public API — matching the library's method names
    return {
        toRoman,
        fromRoman,
        isRoman,
        addRoman: (a, b) => sum(a, b),
        subtractRoman: (a, b) => diff(a, b),
        multiplyRoman: (a, b) => multiply(a, b),
        divideRoman: (a, b) => divide(a, b),
        rangeRoman: (s, e) => range(s, e),
        randomRoman: () => random(),
        tableRoman: (n) => table(n),
        maxRoman: (a, b) => max(a, b),
        minRoman: (a, b) => min(a, b),
        // raw helpers
        sum, diff, multiply, divide, range, random, table, max, min,
        validateGeneral, getCount,
    };
})();

/* ──────────────────────────────────────────
   2.  Playground initialisation
   ────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
    initPlayground();
});

function initPlayground() {
    runToRoman();
    runFromRoman();
    runIsRoman();
    runArith();
    runSubtract();
    runMultiply();
    runDivide();
    runRange();
    runTable();

    setupScrollSpy();

    const sandboxCode = document.getElementById('sandboxCode');
    if (sandboxCode) {
        sandboxCode.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                runSandbox();
            }
        });
    }
}

/* ──────────────────────────────────────────
   3.  Safe-call wrapper + output setter
   ────────────────────────────────────────── */
function safeCall(fn) {
    try {
        return {ok: true, value: fn()};
    } catch (e) {
        return {ok: false, error: e.message || 'Error'};
    }
}

function setOutput(id, result, isBoolean = false) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.remove('updated');
    void el.offsetWidth;

    if (result.ok) {
        el.textContent = isBoolean ? String(result.value) : result.value;
        el.classList.remove('error-state', 'false-state', 'true-state');
        if (isBoolean) el.classList.add(result.value ? 'true-state' : 'false-state');
    } else {
        el.textContent = result.error;
        el.classList.add('error-state');
        el.classList.remove('true-state', 'false-state');
    }
    el.classList.add('updated');
}

/* ──────────────────────────────────────────
   4.  Individual API demos
   ────────────────────────────────────────── */
function runToRoman() {
    const val = parseInt(document.getElementById('toRomanInput').value, 10);
    setOutput('toRomanOutput', safeCall(() => roman.toRoman(val)));
}

function runFromRoman() {
    const val = document.getElementById('fromRomanInput').value.toUpperCase();
    const r = safeCall(() => roman.fromRoman(val));
    if (r.ok) r.value = String(r.value);
    setOutput('fromRomanOutput', r);
}

function runIsRoman() {
    const val = document.getElementById('isRomanInput').value.toUpperCase();
    // isRoman throws on invalid — normalise to boolean result
    const r = safeCall(() => {
        try {
            return roman.isRoman(val);
        } catch {
            return false;
        }
    });
    setOutput('isRomanOutput', r, true);
}

function runArith() {
    const a = document.getElementById('addA').value.toUpperCase();
    const b = document.getElementById('addB').value.toUpperCase();
    setOutput('addOutput', safeCall(() => roman.addRoman(a, b)));
}

function runSubtract() {
    const a = document.getElementById('subA').value.toUpperCase();
    const b = document.getElementById('subB').value.toUpperCase();
    setOutput('subOutput', safeCall(() => roman.subtractRoman(a, b)));
}

function runMultiply() {
    const a = document.getElementById('mulA').value.toUpperCase();
    const b = document.getElementById('mulB').value.toUpperCase();
    setOutput('mulOutput', safeCall(() => roman.multiplyRoman(a, b)));
}

function runDivide() {
    const a = document.getElementById('divA').value.toUpperCase();
    const b = document.getElementById('divB').value.toUpperCase();
    setOutput('divOutput', safeCall(() => roman.divideRoman(a, b)));
}

function runRange() {
    const start = parseInt(document.getElementById('rangeStart').value, 10);
    const end = parseInt(document.getElementById('rangeEnd').value, 10);
    const el = document.getElementById('rangeOutput');
    if (!el) return;
    try {
        if (isNaN(start) || isNaN(end)) throw new Error('Enter valid numbers');
        if (end - start > 99) throw new Error('Range too large (max 100)');
        el.textContent = roman.rangeRoman(start, end).join(', ');
        el.classList.remove('error-state');
    } catch (e) {
        el.textContent = e.message;
        el.classList.add('error-state');
    }
}

function runRandom() {
    setOutput('randomOutput', safeCall(() => roman.randomRandom()));
}

// fix typo
function runRandom() {
    setOutput('randomOutput', safeCall(() => roman.randomRoman()));
}

function runTable() {
    const limit = parseInt(document.getElementById('tableLimit').value, 10);
    const container = document.getElementById('tableOutput');
    if (!container) return;
    try {
        if (isNaN(limit) || limit < 1) throw new Error('Invalid limit');
        const tbl = roman.tableRoman(Math.min(limit, 50));
        container.innerHTML = '';
        Object.entries(tbl).forEach(([arabic, romanStr]) => {
            const cell = document.createElement('div');
            cell.className = 'table-cell';
            cell.innerHTML = `<span class="arabic">${arabic}</span><span class="roman">${romanStr}</span>`;
            container.appendChild(cell);
        });
    } catch (e) {
        container.innerHTML = `<div style="color:var(--color-false);font-family:var(--font-mono);font-size:12px">${e.message}</div>`;
    }
}

/* ──────────────────────────────────────────
   5.  Live Sandbox
   ────────────────────────────────────────── */
function runSandbox() {
    const code = document.getElementById('sandboxCode').value;
    const resultEl = document.getElementById('sandboxResult');
    if (!resultEl) return;

    resultEl.innerHTML = '';
    const logs = [];

    const capture = type => (...args) => {
        const line = args.map(a => {
            if (a === null) return 'null';
            if (a === undefined) return 'undefined';
            if (typeof a === 'object') {
                try {
                    return JSON.stringify(a, null, 2);
                } catch {
                    return String(a);
                }
            }
            return String(a);
        }).join(' ');
        logs.push({type, line});
    };

    const _log = console.log, _err = console.error, _warn = console.warn;
    console.log = capture('log');
    console.error = capture('error');
    console.warn = capture('warn');

    try {
        // eslint-disable-next-line no-new-func
        new Function('roman', code)(roman);
    } catch (e) {
        logs.push({type: 'error', line: `${e.name}: ${e.message}`});
    } finally {
        console.log = _log;
        console.error = _err;
        console.warn = _warn;
    }

    if (logs.length === 0) {
        resultEl.innerHTML = '<div class="sandbox-hint">No output</div>';
        return;
    }

    logs.forEach((entry, i) => {
        const div = document.createElement('div');
        div.className = `log-line${entry.type === 'error' ? ' error-line' : ''}`;
        div.innerHTML = `<span class="log-prefix">${i + 1} › </span>${escapeHtml(entry.line)}`;
        resultEl.appendChild(div);
    });

    resultEl.scrollTop = resultEl.scrollHeight;
}

function clearSandbox() {
    document.getElementById('sandboxCode').value = '';
}

function clearOutput() {
    const el = document.getElementById('sandboxResult');
    if (el) el.innerHTML = '<div class="sandbox-hint">Output cleared</div>';
}

function copySandbox() {
    copyToClipboard(document.getElementById('sandboxCode').value,
        document.querySelector('.sandbox-toolbar .copy-btn-sm'));
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ──────────────────────────────────────────
   6.  Copy utilities
   ────────────────────────────────────────── */
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        if (!btn) return;
        const orig = btn.innerHTML;
        btn.innerHTML = btn.classList.contains('copy-btn')
            ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
            : 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.classList.remove('copied');
        }, 1800);
    }).catch(() => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    });
}

function copyBlock(btn) {
    const text = btn.closest('.code-block')?.querySelector('pre')?.textContent || '';
    copyToClipboard(text, btn);
}

/* ──────────────────────────────────────────
   7.  Scroll spy
   ────────────────────────────────────────── */
function setupScrollSpy() {
    const sections = document.querySelectorAll('[data-section]');
    const links = document.querySelectorAll('.nav-link[data-section]');
    if (!sections.length || !links.length) return;

    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('data-section');
                links.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === id));
            }
        });
    }, {rootMargin: '-20% 0px -70% 0px'}).observe;

    // simpler fallback: observe each section
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('data-section');
                links.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === id));
            }
        });
    }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});

    sections.forEach(s => obs.observe(s));
}
