/* world.js — decorative SVG art per World (illustrative only, no data). */
(function () {
  'use strict';
  var R = function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; };
  function grid(st, w, h) { var d = '', x, y; for (x = 0; x <= (w || 600); x += st) d += 'M' + x + ' 0V' + (h || 400); for (y = 0; y <= (h || 400); y += st) d += 'M0 ' + y + 'H' + (w || 600); return '<path class="gl gridp" d="' + d + '"/>'; }
  function wave(f, a, ph, cy) { var d = '', x; for (x = 0; x <= 600; x += 10) d += (x ? 'L' : 'M') + x + ' ' + (cy - a * Math.sin(x / f + ph)).toFixed(1); return d; }
  var A = {
    home: function () {
      var s = '<g class="rot">', i, a, x, y;
      [60, 110, 160].forEach(function (r) { s += '<circle class="gl" cx="300" cy="200" r="' + r + '"/>'; });
      for (i = 0; i < 6; i++) { a = i * Math.PI / 3; x = 300 + 160 * Math.cos(a); y = 200 + 160 * Math.sin(a); s += '<path class="ar" d="M300 200L' + x.toFixed(0) + ' ' + y.toFixed(0) + '"/><circle class="nd" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="5" style="animation-delay:' + i * .4 + 's"/>'; }
      return s + '</g><circle cx="300" cy="200" r="8" fill="var(--em2)"/>';
    },
    finance: function (m, h) {
      /* $ / € / ₿ — three coins as one composition. Glyphs are paths (no font dependency). */
      var G = {
        usd: 'M12 -14C12 -22 -12 -24 -12 -11C-12 2 12 0 12 13C12 26 -12 24 -12 14M0 -29V29',
        eur: 'M14 -16A22 22 0 1 0 14 16M-21 -5H11M-21 5H11',
        btc: 'M-9 -20V20M-9 -20H5C15 -20 15 -2 5 -2H-9M5 -2H8C20 -2 20 20 6 20H-9M-3 -28V-20M5 -28V-20M-3 20V28M5 20V28'
      };
      function coin(x, y, r, k, cls, dl, rot) {
        var sc = r / 40;
        return '<g class="fl" style="animation-delay:' + dl + 's"><circle class="gl" cx="' + x + '" cy="' + y + '" r="' + (r + 14) + '"/>' +
          '<circle class="coin ' + cls + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>' +
          '<circle class="gl" cx="' + x + '" cy="' + y + '" r="' + (r - 9) + '" style="stroke-dasharray:2 5"/>' +
          '<g class="cs ' + cls + '" transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + sc.toFixed(2) + ')"><path d="' + G[k] + '"/></g></g>';
      }
      var s = '<g transform="translate(' + (h && !m ? 285 : 300) + ' 205) scale(' + (h ? (m ? 1.1 : 1.15) : 1) + ') translate(-300 -205)">';
      s += '<ellipse class="gl" cx="300" cy="205" rx="235" ry="150" transform="rotate(-10 300 205)"/><ellipse class="gl" cx="300" cy="205" rx="180" ry="112" transform="rotate(-10 300 205)"/>';
      s += '<path class="ar" d="M255 205C300 150 340 135 395 125M255 205C300 250 345 275 395 285M395 125C440 170 440 240 395 285"/>';
      s += '<circle class="nd" cx="333" cy="150" r="4"/><circle class="nd" cx="333" cy="262" r="4" style="animation-delay:.8s"/><circle class="nd" cx="448" cy="205" r="4" style="animation-delay:1.6s"/>';
      s += coin(255, 205, 82, 'usd', 'c1', 0) + coin(395, 125, 56, 'eur', 'c2', 2.5, -6) + coin(395, 285, 56, 'btc', 'c3', 5, 12);
      s += '</g>';
      return s;
    },
    economics: function () {
      var r = R(11), s = grid(50), i, v = 120;
      s += '<path d="M40 350H580M40 350V40" stroke="var(--mut)" stroke-width="1.2" fill="none" opacity=".6"/>';
      for (i = 0; i < 9; i++) { v = Math.max(60, Math.min(250, v + (r() - .42) * 70)); s += '<rect class="bar" x="' + (66 + i * 56) + '" y="' + (350 - v) + '" width="30" height="' + v.toFixed(0) + '" style="animation-delay:' + i * .1 + 's"/>'; }
      return s + '<path class="ln" pathLength="1" d="M40 300C140 280 220 210 320 190S480 110 580 90"/><path class="ln2" pathLength="1" d="M40 90C140 130 240 200 330 230S500 290 580 300"/><text class="tx" x="44" y="30">GDP · CPI · RATE</text><text class="tx" x="44" y="372">S / D · ILLUSTRATIVE</text>';
    },
    history: function (m) {
      var E = [['هخامنشیان', 'ACHAEMENID', '550–330 BCE', 'M-12 -14H12M-12 -14c0 8 6 8 6 8M12 -14c0 8-6 8-6 8M-6 -6V18M-2 -6V18M2 -6V18M6 -6V18M-11 18H11'],
        ['ساسانیان', 'SASANIAN', '224–651 CE', 'M-16 18V0C-16 -20 16 -20 16 0V18M-8 18V4C-8 -8 8 -8 8 4V18M-22 18H22'],
        ['صفویه', 'SAFAVID', '1501–1736', 'M-16 8C-16 -12 16 -12 16 8M-19 8H19M-12 8V18M12 8V18M-19 18H19M0 -9V-18'],
        ['افشاریه', 'AFSHARID', '1736–1796', 'M-14 -16C0 -4 8 6 14 16M14 -16C0 -4 -8 6 -14 16M10 8l8 -6M-10 8l-8 -6']];
      var sx = m ? 210 : 150, gx = m ? 252 : 215, tx = m ? 288 : 262, y0 = m ? 92 : 82, dy = m ? 72 : 78, sc = m ? .85 : 1, i, y, s = '<g style="direction:ltr">';
      if (!m) { for (i = 1; i < 7; i++) s += '<ellipse class="gl" cx="330" cy="190" rx="' + (i * 40) + '" ry="' + (i * 26) + '" transform="rotate(-8 330 190)"/>'; for (y = 56; y < 346; y += 14) s += '<path class="gl" d="M' + (sx - 4) + ' ' + y + 'h8"/>'; s += '<text class="tx" x="' + (sx + 14) + '" y="38">IRAN · TIMELINE</text>'; }
      s += '<path class="ln" pathLength="1" d="M' + sx + ' 48V352"/><path class="ar" d="M' + (sx - 6) + ' 340l6 12 6 -12"/>';
      E.forEach(function (e, j) {
        y = y0 + j * dy;
        s += '<circle class="gl" cx="' + sx + '" cy="' + y + '" r="12"/><circle class="nd" cx="' + sx + '" cy="' + y + '" r="5.5" style="animation-delay:' + j * .35 + 's"/>';
        s += '<path class="ar" d="M' + (sx + 14) + ' ' + y + 'H' + (gx - 24 * sc) + '"/>';
        if (!m) s += '<circle class="gl" cx="' + gx + '" cy="' + y + '" r="27"/>';
        s += '<g class="sym" transform="translate(' + gx + ' ' + y + ') scale(' + sc + ')"><path d="' + e[3] + '"/></g>';
        s += '<text class="pn" x="' + tx + '" y="' + (y - 2) + '" style="font-size:' + (m ? 20 : 25) + 'px">' + e[0] + '</text>';
        s += '<text class="tx" x="' + tx + '" y="' + (y + 17) + '">' + (m ? e[2] : e[1] + ' · ' + e[2]) + '</text>';
      });
      return s + '</g>';
    },
    literature: function (m) {
      /* Four poets — typographic composition only (no portraits): names on a fine cross, 8-point star at the centre. */
      var P = [['حافظ', 'HAFEZ', 190, 150], ['مولانا', 'MOLANA', 410, 150], ['سعدی', 'SAADI', 190, 270], ['فردوسی', 'FERDOWSI', 410, 270]],
        fs = m ? 52 : 46, ts = m ? 15 : 12, s = '<g style="direction:ltr">', i;
      s += '<circle class="gl" cx="300" cy="210" r="170"/><circle class="gl" cx="300" cy="210" r="132" style="stroke-dasharray:2 6"/>';
      s += '<path class="ln" pathLength="1" style="stroke-width:1.4" d="M300 76V344M110 210H490"/>';
      s += '<path class="gl" d="M120 96H480M120 324H480"/>';
      s += '<g class="rot"><rect class="sym" x="285" y="195" width="30" height="30"/><rect class="sym" x="285" y="195" width="30" height="30" transform="rotate(45 300 210)"/></g>';
      s += '<circle class="nd" cx="300" cy="76" r="3.5"/><circle class="nd" cx="300" cy="344" r="3.5" style="animation-delay:1s"/><circle class="nd" cx="110" cy="210" r="3.5" style="animation-delay:.5s"/><circle class="nd" cx="490" cy="210" r="3.5" style="animation-delay:1.5s"/>';
      for (i = 0; i < 4; i++) {
        var q = P[i];
        s += '<g class="fl" style="animation-delay:' + (i * 1.6) + 's"><text class="pn" x="' + q[2] + '" y="' + (q[3] + 4) + '" text-anchor="middle" style="font-size:' + fs + 'px">' + q[0] + '</text>' +
          '<path class="gl" d="M' + (q[2] - 14) + ' ' + (q[3] + 22) + 'h28"/>' +
          '<text class="tx" x="' + q[2] + '" y="' + (q[3] + 44) + '" text-anchor="middle" style="font-size:' + ts + 'px;opacity:.9">' + q[1] + '</text></g>';
      }
      return s + '</g>';
    },
    mathematics: function () {
      return grid(40) + '<path d="M0 200H600M300 0V400" stroke="var(--mut)" opacity=".6" fill="none"/><path class="ln" pathLength="1" d="' + wave(38, 90, 0, 200) + '"/><path class="ln2" pathLength="1" d="' + wave(38, 90, 1.57, 200) + '"/><circle class="gl" cx="300" cy="200" r="90"/><g class="rot"><path class="ar" d="M300 200L390 200"/><circle class="nd" cx="390" cy="200" r="5"/></g><text class="tx fl" x="40" y="50">∑  ∫  π  ∞  √</text><text class="tx" x="40" y="380">f(x) = sin x</text>';
    },
    politics: function (m) {
      var cx = 300, cy = 200, R = m ? 150 : 185, l0 = 53 * Math.PI / 180, f0 = 32 * Math.PI / 180, rd = Math.PI / 180;
      function pr(lo, la) {
        var l = lo * rd - l0, f = la * rd, a = Math.cos(f) * Math.sin(l), b = Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l),
          c = Math.acos(Math.max(-1, Math.min(1, Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l)))), n = Math.sqrt(a * a + b * b) || 1;
        if (c > 1.5) return null;
        var q = Math.PI / 2 * (1 - Math.exp(-3.2 * c / (Math.PI / 2))) / (1 - Math.exp(-3.2)), r = R * Math.sin(q);
        return [cx + r * a / n, cy - r * b / n];
      }
      function line(pts, close) { var d = '', pen = false; pts.forEach(function (q) { var v = pr(q[0], q[1]); if (!v) { pen = false; return; } d += (pen ? 'L' : 'M') + v[0].toFixed(1) + ' ' + v[1].toFixed(1); pen = true; }); return d + (close ? 'Z' : ''); }
      var IR = [[44.8,39.7],[45.5,39.0],[46.5,38.85],[47.7,39.6],[48.3,39.0],[48.9,38.4],[49.5,37.4],[50.2,37.0],[51.5,36.75],[52.8,36.85],[53.9,36.9],[53.9,37.3],[54.7,37.45],[55.4,38.0],[56.3,38.1],[57.3,38.2],[58.2,37.65],[59.3,37.5],[60.0,36.95],[60.6,36.6],[61.2,36.6],[61.2,35.6],[60.5,34.1],[60.9,33.5],[60.6,33.0],[60.9,31.5],[61.8,31.0],[61.3,29.8],[61.6,29.4],[62.5,28.3],[63.3,27.2],[62.8,26.5],[61.6,25.2],[60.0,25.35],[58.6,25.55],[57.7,25.75],[57.0,26.7],[56.3,27.15],[55.5,26.9],[54.5,26.55],[53.5,26.7],[52.6,27.4],[51.5,27.9],[50.8,28.9],[50.3,29.9],[49.6,30.0],[48.9,30.3],[48.0,30.5],[47.7,31.0],[47.6,31.8],[46.1,32.9],[45.4,33.9],[45.5,34.5],[45.6,35.5],[45.2,36.0],[44.8,37.2],[44.2,37.9],[44.4,38.4],[44.0,39.4]];
      var s = '<defs><radialGradient id="gb" cx="42%" cy="38%" r="75%"><stop offset="0" style="stop-color:var(--w2);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--w2);stop-opacity:.03"/></radialGradient></defs>', st = m ? 20 : 10, lo, la, pts;
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="url(#gb)" stroke="var(--line)"/>';
      for (lo = -20; lo <= 130; lo += st) { pts = []; for (la = -10; la <= 80; la += 2) pts.push([lo, la]); s += '<path class="gl" d="' + line(pts) + '"/>'; }
      for (la = 0; la <= 70; la += st) { pts = []; for (lo = -30; lo <= 140; lo += 2) pts.push([lo, la]); s += '<path class="gl" d="' + line(pts) + '"/>'; }
      s += '<path class="ln" pathLength="1" style="fill:color-mix(in srgb,var(--w1) 18%,transparent);stroke-width:' + (m ? 2.6 : 2.8) + '" d="' + line(IR, true) + '"/>';
      var t = pr(51.4, 35.7), y = pr(54.37, 31.9), c = pr(55.6, 28.7);
      s += '<circle class="nd" cx="' + t[0].toFixed(1) + '" cy="' + t[1].toFixed(1) + '" r="4"/><circle class="nd or" cx="' + y[0].toFixed(1) + '" cy="' + y[1].toFixed(1) + '" r="4" style="animation-delay:.7s"/><text class="pn" x="' + c[0].toFixed(1) + '" y="' + c[1].toFixed(1) + '" text-anchor="middle" style="font-size:' + (m ? 22 : 28) + 'px">ایران</text>';
      if (!m) {
        [['TURKEY', 36, 39.2], ['IRAQ', 42.5, 33], ['AFGHANISTAN', 65, 34], ['PAKISTAN', 68, 28.5], ['TURKMENISTAN', 61, 40.6], ['CASPIAN SEA', 50.5, 41.2], ['PERSIAN GULF', 51.5, 25.2]].forEach(function (n) { var v = pr(n[1], n[2]); if (v) s += '<text class="tx" x="' + v[0].toFixed(0) + '" y="' + v[1].toFixed(0) + '" text-anchor="middle" style="font-size:8px;letter-spacing:.14em">' + n[0] + '</text>'; });
      }
      return s;
    }
  };
  var mq = window.matchMedia ? window.matchMedia('(max-width:900px)') : { matches: false };
  function render() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-art]'), function (el) {
      var f = A[el.getAttribute('data-art')]; if (!f) return;
      var k = el.getAttribute('data-art'), hero = el.parentNode.classList.contains('wh-hero'), meet = hero && (k === 'finance' || k === 'literature' || (!mq.matches && (k === 'history' || k === 'politics')));
      el.innerHTML = '<svg class="wa" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid ' + (meet ? 'meet' : 'slice') + '" aria-hidden="true" focusable="false">' + f(mq.matches, hero) + '</svg>';
    });
  }
  render();
  if (mq.addEventListener) mq.addEventListener('change', render);
})();
