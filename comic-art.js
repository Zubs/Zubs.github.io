/* ============================================================
   THE BACKEND CHRONICLES — ORIGINAL SVG ART
   ------------------------------------------------------------
   Every illustration is drawn here with SVG shapes, halftone
   patterns and bold ink. No external images or licensed art.
   Each scene receives a unique id so its patterns and titles
   never collide with other panels on the same page.
   ============================================================ */
(function (root, factory) {
    const art = factory();
    if (typeof module === "object" && module.exports) {module.exports = art;}
    else {root.COMIC_ART = art;}
}(this, function () {
    "use strict";

    const escapes = new Map([
        ["&", "&amp;"],
        ["<", "&lt;"],
        [">", "&gt;"],
        ["\"", "&quot;"],
        ["'", "&#39;"]
    ]);

    function esc(value) {
        return String(value).replace(/[&<>"']/g, function (ch) {
            return escapes.get(ch);
        });
    }

    function rays() {
        let out = "<g opacity=\".32\" stroke=\"var(--art-ink)\" stroke-width=\"3\">";
        for (let i = 0; i < 16; i++) {
            const angle = (i * 360) / 16;
            out += "<path d=\"M200 130 L" + (200 + 260 * Math.cos(angle * Math.PI / 180)).toFixed(1) + " " +
                (130 + 260 * Math.sin(angle * Math.PI / 180)).toFixed(1) + "\"/>";
        }
        return out + "</g>";
    }

    function dots(uid, cx, cy, r) {
        return "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"" + r + "\" fill=\"url(#dots-" + uid + ")\" opacity=\".85\"/>";
    }

    function codeLines(uid, x, y, widths, color) {
        return widths.map(function (w, i) {
            return "<rect x=\"" + x + "\" y=\"" + (y + i * 17) + "\" width=\"" + w + "\" height=\"8\" rx=\"2\" fill=\"" +
                (color || "var(--art-ink)") + "\" opacity=\"" + (0.85 - i * 0.07) + "\"/>";
        }).join("");
    }

    function wrap(label, inner, uid) {
        return "<svg class=\"ink-svg\" viewBox=\"0 0 400 260\" preserveAspectRatio=\"xMidYMid slice\" role=\"img\" " +
            "aria-labelledby=\"art-" + uid + "\">" +
            "<title id=\"art-" + uid + "\">" + esc(label) + "</title>" +
            "<defs>" +
            "<pattern id=\"dots-" + uid + "\" width=\"9\" height=\"9\" patternUnits=\"userSpaceOnUse\">" +
            "<circle cx=\"2\" cy=\"2\" r=\"2\" fill=\"var(--art-ink)\" opacity=\".55\"/></pattern>" +
            "<pattern id=\"mesh-" + uid + "\" width=\"14\" height=\"14\" patternUnits=\"userSpaceOnUse\">" +
            "<path d=\"M0 14 L14 0\" stroke=\"var(--art-ink)\" stroke-width=\"1\" opacity=\".35\"/></pattern>" +
            "<linearGradient id=\"glow-" + uid + "\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">" +
            "<stop offset=\"0\" stop-color=\"var(--art-hi)\"/><stop offset=\"1\" stop-color=\"var(--art-accent)\"/></linearGradient>" +
            "</defs>" +
            "<rect width=\"400\" height=\"260\" fill=\"var(--art-bg)\"/>" +
            "<path d=\"M0 0 H400 V260 H0 Z\" fill=\"url(#mesh-" + uid + ")\" opacity=\".5\"/>" +
            inner + "</svg>";
    }

    const scenes = {
        /* The cover: an original caped engineer over a halftone city skyline. */
        cover (uid) {
            return rays() +
                dots(uid, 300, 92, 96) +
                "<path d=\"M0 228 L38 204 L38 228 L74 178 L74 228 L112 194 L112 228 L150 160 L150 228 " +
                "L188 184 L188 228 L400 228 L400 260 L0 260 Z\" fill=\"var(--art-ink)\"/>" +
                "<g fill=\"var(--art-hi)\" opacity=\".8\">" +
                "<rect x=\"46\" y=\"212\" width=\"6\" height=\"8\"/><rect x=\"86\" y=\"195\" width=\"6\" height=\"8\"/>" +
                "<rect x=\"126\" y=\"207\" width=\"6\" height=\"8\"/><rect x=\"164\" y=\"181\" width=\"6\" height=\"8\"/>" +
                "<rect x=\"344\" y=\"198\" width=\"6\" height=\"8\"/><rect x=\"372\" y=\"214\" width=\"6\" height=\"8\"/></g>" +
                "<path d=\"M232 112 Q178 138 148 246 L242 210 Q238 160 268 122 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M312 112 Q360 142 386 246 L300 212 Q306 160 282 122 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M250 108 Q222 164 226 236 L316 238 Q320 160 296 108 Z\" fill=\"var(--art-ink)\"/>" +
                "<path d=\"M258 126 Q272 148 272 168 Q270 188 258 202 Q242 184 242 166 Q244 144 258 126 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>" +
                "<text x=\"258\" y=\"178\" font-family=\"Arial Black, Impact, sans-serif\" font-size=\"32\" font-weight=\"900\" text-anchor=\"middle\" fill=\"var(--art-ink)\">Z</text>" +
                "<circle cx=\"272\" cy=\"86\" r=\"26\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M252 78 Q272 52 294 76 L286 92 Q274 80 260 94 Z\" fill=\"var(--art-ink)\"/>" +
                "<path d=\"M242 104 L204 74 L232 92 L206 56 L260 96 Z\" fill=\"var(--art-ink)\"/>" +
                "<path d=\"M300 102 L344 72 L318 94 L346 60 L288 96 Z\" fill=\"var(--art-ink)\"/>" +
                "<path d=\"M330 158 L390 128 L358 164 L398 154 L334 190 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>" +
                "<path d=\"M212 168 L166 142 L198 166 L162 164 L206 192 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>";
        },
        terminal (uid) {
            return dots(uid, 350, 44, 62) +
                "<rect x=\"42\" y=\"34\" width=\"316\" height=\"192\" rx=\"6\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<path d=\"M42 70 H358\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<circle cx=\"62\" cy=\"52\" r=\"5\" fill=\"var(--art-ink)\"/><circle cx=\"80\" cy=\"52\" r=\"5\" fill=\"var(--art-ink)\"/>" +
                "<circle cx=\"98\" cy=\"52\" r=\"5\" fill=\"var(--art-ink)\"/>" +
                "<g font-family=\"Courier New, monospace\" font-size=\"15\" font-weight=\"700\" fill=\"var(--art-ink)\">" +
                "<text x=\"60\" y=\"98\">&gt; spec init</text><text x=\"60\" y=\"124\">&gt; agent apply</text>" +
                "<text x=\"60\" y=\"150\">&gt; test --all</text><text x=\"60\" y=\"176\">&gt; ship it</text></g>" +
                "<path d=\"M60 190 H190\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M250 104 L292 142 L250 180\" fill=\"none\" stroke=\"var(--art-accent)\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>";
        },
        terminal3270 (uid) {
            return dots(uid, 60, 210, 70) +
                "<rect x=\"38\" y=\"26\" width=\"324\" height=\"206\" rx=\"10\" fill=\"var(--art-ink)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<rect x=\"52\" y=\"42\" width=\"296\" height=\"150\" fill=\"var(--art-bg)\"/>" +
                "<g font-family=\"Courier New, monospace\" font-size=\"14\" font-weight=\"700\" fill=\"var(--art-accent)\">" +
                "<text x=\"62\" y=\"64\">//NEWProfit  JOB ACCTING</text><text x=\"62\" y=\"86\">//  EXEC PGM=REPORT</text>" +
                "<text x=\"62\" y=\"108\">//  DD DSN=DATA.IN,DISP=SHR</text><text x=\"62\" y=\"130\">//* CHECK RULES...</text>" +
                "<text x=\"62\" y=\"152\">&gt; VERIFIED - 0 ERRORS</text></g>" +
                "<rect x=\"62\" y=\"164\" width=\"12\" height=\"18\" fill=\"var(--art-accent)\"/>" +
                "<g fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"3\">" +
                "<rect x=\"54\" y=\"200\" width=\"46\" height=\"20\"/><rect x=\"106\" y=\"200\" width=\"46\" height=\"20\"/>" +
                "<rect x=\"158\" y=\"200\" width=\"46\" height=\"20\"/><rect x=\"210\" y=\"200\" width=\"46\" height=\"20\"/>" +
                "<rect x=\"262\" y=\"200\" width=\"46\" height=\"20\"/></g>" +
                "<g font-family=\"Arial, sans-serif\" font-size=\"10\" font-weight=\"900\" fill=\"var(--art-ink)\" text-anchor=\"middle\">" +
                "<text x=\"77\" y=\"214\">F1</text><text x=\"129\" y=\"214\">F4</text><text x=\"181\" y=\"214\">F5</text>" +
                "<text x=\"233\" y=\"214\">F9</text><text x=\"285\" y=\"214\">F12</text></g>";
        },
        hammer (uid) {
            return rays() + dots(uid, 300, 60, 72) +
                "<path d=\"M116 208 L286 96\" stroke=\"var(--art-ink)\" stroke-width=\"22\" stroke-linecap=\"round\"/>" +
                "<path d=\"M116 208 L286 96\" stroke=\"var(--art-hi)\" stroke-width=\"10\" stroke-linecap=\"round\"/>" +
                "<rect x=\"246\" y=\"42\" width=\"112\" height=\"70\" rx=\"8\" transform=\"rotate(-34 246 42)\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<text x=\"294\" y=\"86\" font-family=\"Arial Black, Impact, sans-serif\" font-size=\"28\" font-weight=\"900\" fill=\"var(--art-hi)\" text-anchor=\"middle\" transform=\"rotate(-34 294 86)\">PHP</text>" +
                "<path d=\"M94 196 L158 232 L136 252 L70 216 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M330 140 L388 116 L356 156 L394 152 L330 190 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<path d=\"M212 60 L232 26 L238 62 L266 50 L232 92 L220 66 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>";
        },
        shield (uid) {
            return dots(uid, 200, 130, 108) +
                "<path d=\"M200 24 L316 66 V142 Q316 206 200 244 Q84 206 84 142 V66 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"9\"/>" +
                "<path d=\"M200 52 L282 82 V140 Q282 184 200 212 Q118 184 118 140 V82 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<path d=\"M162 136 L190 164 L246 106\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"16\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
                "<path d=\"M40 44 L70 70 M330 48 L362 20 M36 192 L66 208 M340 196 L374 216\" stroke=\"var(--art-ink)\" stroke-width=\"6\" stroke-linecap=\"round\"/>";
        },
        network (uid) {
            const nodes = [[70, 60], [180, 40], [300, 70], [110, 154], [230, 138], [340, 176], [170, 224]];
            let edges = "";
            [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 6], [5, 6]].forEach(function (pair) {
                edges += "<path d=\"M" + nodes[pair[0]][0] + " " + nodes[pair[0]][1] + " L" + nodes[pair[1]][0] + " " +
                    nodes[pair[1]][1] + "\" stroke=\"var(--art-ink)\" stroke-width=\"4\" opacity=\".7\"/>";
            });
            return dots(uid, 360, 20, 58) + edges + nodes.map(function (node, i) {
                return "<circle cx=\"" + node[0] + "\" cy=\"" + node[1] + "\" r=\"" + (i % 3 === 0 ? 19 : 14) +
                    "\" fill=\"" + (i % 2 ? "var(--art-hi)" : "var(--art-accent)") + "\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>";
            }).join("");
        },
        quiz (uid) {
            return dots(uid, 340, 40, 70) +
                "<rect x=\"56\" y=\"40\" width=\"196\" height=\"180\" rx=\"8\" transform=\"rotate(-6 56 40)\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<rect x=\"92\" y=\"28\" width=\"196\" height=\"180\" rx=\"8\" transform=\"rotate(5 92 28)\" fill=\"var(--art-bg)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<text x=\"116\" y=\"64\" font-family=\"Arial Black, sans-serif\" font-size=\"18\" font-weight=\"900\" fill=\"var(--art-ink)\" transform=\"rotate(5 116 64)\">Q 47 / 90</text>" +
                codeLines(uid, 114, 84, [148, 122, 138]) +
                "<circle cx=\"250\" cy=\"174\" r=\"24\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M238 174 L247 184 L264 164\" fill=\"none\" stroke=\"var(--art-hi)\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
                "<path d=\"M326 108 A44 44 0 1 1 300 72\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"9\"/>" +
                "<path d=\"M310 106 L330 108 L324 86 Z\" fill=\"var(--art-ink)\"/>";
        },
        browser (uid) {
            return dots(uid, 54, 40, 64) +
                "<rect x=\"34\" y=\"30\" width=\"332\" height=\"200\" rx=\"8\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<path d=\"M34 62 H366\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<circle cx=\"54\" cy=\"46\" r=\"5\" fill=\"var(--art-ink)\"/><circle cx=\"72\" cy=\"46\" r=\"5\" fill=\"var(--art-ink)\"/>" +
                "<rect x=\"52\" y=\"82\" width=\"100\" height=\"128\" fill=\"var(--art-bg)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<rect x=\"168\" y=\"82\" width=\"84\" height=\"58\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<rect x=\"264\" y=\"82\" width=\"84\" height=\"58\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<rect x=\"168\" y=\"152\" width=\"84\" height=\"58\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<rect x=\"264\" y=\"152\" width=\"84\" height=\"58\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                codeLines(uid, 62, 100, [68, 52, 60], "var(--art-ink)");
        },
        server (uid) {
            return rays() + dots(uid, 364, 200, 70) +
                "<rect x=\"46\" y=\"34\" width=\"128\" height=\"196\" rx=\"6\" fill=\"var(--art-ink)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<rect x=\"226\" y=\"34\" width=\"128\" height=\"196\" rx=\"6\" fill=\"var(--art-ink)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                [52, 92, 132, 172].map(function (y) {
                    return "<rect x=\"58\" y=\"" + y + "\" width=\"104\" height=\"28\" fill=\"var(--art-accent)\" stroke=\"var(--art-hi)\" stroke-width=\"3\"/>" +
                        "<rect x=\"238\" y=\"" + y + "\" width=\"104\" height=\"28\" fill=\"var(--art-accent)\" stroke=\"var(--art-hi)\" stroke-width=\"3\"/>" +
                        "<circle cx=\"70\" cy=\"" + (y + 14) + "\" r=\"4\" fill=\"var(--art-hi)\"/>" +
                        "<circle cx=\"250\" cy=\"" + (y + 14) + "\" r=\"4\" fill=\"var(--art-hi)\"/>";
                }).join("") +
                "<path d=\"M180 82 H216 M180 172 H216\" stroke=\"var(--art-ink)\" stroke-width=\"8\" stroke-linecap=\"round\"/>" +
                "<path d=\"M208 68 L228 82 L208 96 M208 158 L228 172 L208 186\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>";
        },
        pen (uid) {
            return dots(uid, 310, 48, 78) +
                "<path d=\"M92 218 Q140 196 160 154 Q184 106 244 48 L304 108 Q244 160 200 196 Q168 220 92 218 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<path d=\"M244 48 L304 108 L286 126 L226 66 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M92 218 L160 154 L196 196 Z\" fill=\"var(--art-ink)\"/>" +
                "<path d=\"M222 34 L244 12 L304 72 L282 94 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M56 226 Q142 238 208 222\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"6\" stroke-linecap=\"round\"/>" +
                "<path d=\"M316 158 L360 132 L336 172 L374 164 L318 202 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>";
        },
        route (uid) {
            let grid = "";
            for (let x = 40; x <= 360; x += 40) {grid += "<path d=\"M" + x + " 20 V240\"/>";}
            for (let y = 20; y <= 240; y += 40) {grid += "<path d=\"M20 " + y + " H380\"/>";}
            return "<g stroke=\"var(--art-ink)\" stroke-width=\"2\" opacity=\".35\">" + grid + "</g>" +
                dots(uid, 60, 200, 46) +
                "<path d=\"M44 220 H116 V180 H196 V140 H268 V100 H356\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"20\" stroke-linejoin=\"round\"/>" +
                "<path d=\"M44 220 H116 V180 H196 V140 H268 V100 H356\" fill=\"none\" stroke=\"var(--art-hi)\" stroke-width=\"9\" stroke-linejoin=\"round\" stroke-dasharray=\"16 12\"/>" +
                "<circle cx=\"44\" cy=\"220\" r=\"14\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<path d=\"M340 78 L370 100 L340 122 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<g fill=\"var(--art-ink)\"><circle cx=\"156\" cy=\"60\" r=\"8\"/><circle cx=\"300\" cy=\"200\" r=\"8\"/><circle cx=\"76\" cy=\"100\" r=\"8\"/></g>";
        },
        robot (uid) {
            return dots(uid, 340, 50, 70) +
                "<rect x=\"104\" y=\"66\" width=\"192\" height=\"142\" rx=\"18\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<path d=\"M200 66 V28\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<circle cx=\"200\" cy=\"22\" r=\"12\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<rect x=\"132\" y=\"96\" width=\"58\" height=\"44\" rx=\"8\" fill=\"var(--art-ink)\"/>" +
                "<rect x=\"210\" y=\"96\" width=\"58\" height=\"44\" rx=\"8\" fill=\"var(--art-ink)\"/>" +
                "<circle cx=\"158\" cy=\"118\" r=\"9\" fill=\"var(--art-hi)\"/><circle cx=\"236\" cy=\"118\" r=\"9\" fill=\"var(--art-hi)\"/>" +
                "<path d=\"M154 172 Q200 200 246 172\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"7\" stroke-linecap=\"round\"/>" +
                "<path d=\"M104 118 H62 M104 154 H62 M296 118 H338 M296 154 H338\" stroke=\"var(--art-ink)\" stroke-width=\"7\" stroke-linecap=\"round\"/>" +
                "<path d=\"M310 196 L360 170 L332 208 L372 204 L310 238 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>";
        },
        chip (uid) {
            let pins = "";
            for (let i = 0; i < 5; i++) {
                pins += "<path d=\"M" + (128 + i * 36) + " 48 V20 M" + (128 + i * 36) + " 212 V240 M128 " + (78 + i * 30) +
                    " H100 M272 " + (78 + i * 30) + " H300\"/>";
            }
            return "<g stroke=\"var(--art-ink)\" stroke-width=\"8\" stroke-linecap=\"round\">" + pins + "</g>" +
                dots(uid, 350, 210, 56) +
                "<rect x=\"112\" y=\"60\" width=\"176\" height=\"140\" rx=\"10\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<rect x=\"140\" y=\"88\" width=\"120\" height=\"84\" rx=\"6\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<text x=\"200\" y=\"142\" font-family=\"Arial Black, sans-serif\" font-size=\"34\" font-weight=\"900\" fill=\"var(--art-ink)\" text-anchor=\"middle\">CPU</text>";
        },
        globe (uid) {
            return dots(uid, 200, 130, 108) +
                "<circle cx=\"200\" cy=\"130\" r=\"98\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<g fill=\"none\" stroke=\"var(--art-hi)\" stroke-width=\"6\">" +
                "<ellipse cx=\"200\" cy=\"130\" rx=\"42\" ry=\"98\"/><path d=\"M102 130 H298\"/>" +
                "<path d=\"M118 82 Q200 116 282 82 M118 178 Q200 144 282 178\"/></g>" +
                "<path d=\"M148 96 L186 116 L170 148 L210 162 L226 130 L262 112\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"8\" stroke-linejoin=\"round\"/>" +
                "<circle cx=\"148\" cy=\"96\" r=\"9\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>" +
                "<circle cx=\"262\" cy=\"112\" r=\"9\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>" +
                "<path d=\"M38 44 L70 72 M330 44 L362 20 M36 196 L66 214 M334 196 L370 220\" stroke=\"var(--art-ink)\" stroke-width=\"6\" stroke-linecap=\"round\"/>";
        },
        mic (uid) {
            return rays() + dots(uid, 66, 60, 62) +
                "<path d=\"M200 24 A42 42 0 0 1 242 66 V122 A42 42 0 0 1 158 122 V66 A42 42 0 0 1 200 24 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<path d=\"M132 116 A68 68 0 0 0 268 116 M200 184 V222 M158 224 H242\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"9\" stroke-linecap=\"round\"/>" +
                "<g stroke=\"var(--art-ink)\" stroke-width=\"6\" stroke-linecap=\"round\"><path d=\"M104 76 Q82 106 104 136 M296 76 Q318 106 296 136 M76 54 Q42 106 76 158 M324 54 Q358 106 324 158\"/></g>";
        },
        mail (uid) {
            return dots(uid, 330, 60, 72) +
                "<rect x=\"58\" y=\"72\" width=\"284\" height=\"150\" rx=\"8\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<path d=\"M58 82 L200 176 L342 82\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"8\" stroke-linejoin=\"round\"/>" +
                "<path d=\"M58 214 L166 142 M342 214 L234 142\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M244 34 L362 14 L330 86 L310 62 L286 84 L268 56 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"6\" stroke-linejoin=\"round\"/>";
        },
        book (uid) {
            return dots(uid, 200, 40, 60) +
                "<path d=\"M200 72 Q140 30 44 56 V212 Q142 186 200 224 Q258 186 356 212 V56 Q260 30 200 72 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"8\" stroke-linejoin=\"round\"/>" +
                "<path d=\"M200 72 V224\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<g stroke=\"var(--art-ink)\" stroke-width=\"4\" opacity=\".7\">" +
                "<path d=\"M70 96 Q132 78 178 104 M70 124 Q132 106 178 132 M70 152 Q132 134 178 160\"/>" +
                "<path d=\"M222 104 Q268 78 330 96 M222 132 Q268 106 330 124 M222 160 Q268 134 330 152\"/></g>" +
                "<path d=\"M282 32 L322 18 L308 56 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"4\"/>";
        },
        gauge (uid) {
            return dots(uid, 340, 40, 64) +
                "<path d=\"M62 208 A138 138 0 0 1 338 208\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"24\"/>" +
                "<path d=\"M62 208 A138 138 0 0 1 316 116\" fill=\"none\" stroke=\"var(--art-hi)\" stroke-width=\"14\"/>" +
                "<path d=\"M200 208 L292 108\" stroke=\"var(--art-accent)\" stroke-width=\"12\" stroke-linecap=\"round\"/>" +
                "<circle cx=\"200\" cy=\"208\" r=\"18\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<g fill=\"var(--art-ink)\"><rect x=\"50\" y=\"216\" width=\"24\" height=\"16\"/><rect x=\"188\" y=\"216\" width=\"24\" height=\"16\"/>" +
                "<rect x=\"326\" y=\"216\" width=\"24\" height=\"16\"/></g>" +
                "<g fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"4\">" +
                "<rect x=\"66\" y=\"120\" width=\"20\" height=\"56\"/><rect x=\"100\" y=\"98\" width=\"20\" height=\"78\"/>" +
                "<rect x=\"134\" y=\"130\" width=\"20\" height=\"46\"/></g>";
        },
        mask (uid) {
            return rays() + dots(uid, 200, 130, 104) +
                "<path d=\"M112 244 L122 138 L200 102 L278 138 L288 244 Z\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"8\"/>" +
                "<path d=\"M126 212 L200 244 L274 212\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"6\"/>" +
                "<path d=\"M142 144 L200 122 L258 144 L248 206 Q200 232 152 206 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<path d=\"M152 158 L190 150 M210 150 L248 158\" stroke=\"var(--art-ink)\" stroke-width=\"9\" stroke-linecap=\"round\"/>" +
                "<path d=\"M176 186 Q200 196 224 186\" fill=\"none\" stroke=\"var(--art-ink)\" stroke-width=\"6\" stroke-linecap=\"round\"/>" +
                "<path d=\"M124 132 L98 110 L142 116 M276 132 L302 110 L258 116\" fill=\"var(--art-ink)\"/>";
        },
        game (uid) {
            return dots(uid, 340, 46, 68) +
                "<rect x=\"36\" y=\"30\" width=\"328\" height=\"200\" rx=\"6\" fill=\"var(--art-ink)\" stroke=\"var(--art-ink)\" stroke-width=\"7\"/>" +
                "<g stroke=\"var(--art-ink)\" stroke-width=\"4\">" +
                "<rect x=\"60\" y=\"50\" width=\"56\" height=\"24\" fill=\"var(--art-accent)\"/>" +
                "<rect x=\"126\" y=\"50\" width=\"56\" height=\"24\" fill=\"var(--art-hi)\"/>" +
                "<rect x=\"192\" y=\"50\" width=\"56\" height=\"24\" fill=\"var(--art-accent)\"/>" +
                "<rect x=\"258\" y=\"50\" width=\"56\" height=\"24\" fill=\"var(--art-hi)\"/>" +
                "<rect x=\"94\" y=\"84\" width=\"56\" height=\"24\" fill=\"var(--art-hi)\"/>" +
                "<rect x=\"160\" y=\"84\" width=\"56\" height=\"24\" fill=\"var(--art-accent)\"/>" +
                "<rect x=\"226\" y=\"84\" width=\"56\" height=\"24\" fill=\"var(--art-hi)\"/></g>" +
                "<circle cx=\"212\" cy=\"160\" r=\"13\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<rect x=\"150\" y=\"202\" width=\"100\" height=\"16\" rx=\"6\" fill=\"var(--art-accent)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>" +
                "<path d=\"M262 126 L318 104 L290 140 L330 136 L266 170 Z\" fill=\"var(--art-hi)\" stroke=\"var(--art-ink)\" stroke-width=\"5\"/>";
        }
    };

    function render(key, label, uid) {
        const scene = Object.prototype.hasOwnProperty.call(scenes, key) ? Reflect.get(scenes, key) : scenes.chip;
        return wrap(label, scene(uid), uid);
    }

    return {render, keys: Object.keys(scenes)};
}));
