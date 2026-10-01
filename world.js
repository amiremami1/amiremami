/* world.js — decorative SVG art per World (illustrative only, no data). */
(function () {
  'use strict';
  var R = function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; };
  function grid(st, w, h) { var d = '', x, y; for (x = 0; x <= (w || 600); x += st) d += 'M' + x + ' 0V' + (h || 400); for (y = 0; y <= (h || 400); y += st) d += 'M0 ' + y + 'H' + (w || 600); return '<path class="gl" d="' + d + '"/>'; }
  function wave(f, a, ph, cy) { var d = '', x; for (x = 0; x <= 600; x += 10) d += (x ? 'L' : 'M') + x + ' ' + (cy - a * Math.sin(x / f + ph)).toFixed(1); return d; }
  var A = {
    home: function () {
      var s = '<g class="rot">', i, a, x, y;
      [60, 110, 160].forEach(function (r) { s += '<circle class="gl" cx="300" cy="200" r="' + r + '"/>'; });
      for (i = 0; i < 6; i++) { a = i * Math.PI / 3; x = 300 + 160 * Math.cos(a); y = 200 + 160 * Math.sin(a); s += '<path class="ar" d="M300 200L' + x.toFixed(0) + ' ' + y.toFixed(0) + '"/><circle class="nd" cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="5" style="animation-delay:' + i * .4 + 's"/>'; }
      return s + '</g><circle cx="300" cy="200" r="8" fill="var(--em2)"/>';
    },
    finance: function () {
      var r = R(7), s = grid(50), y = 250, i, x, o, c, h, l, k;
      for (i = 0; i < 22; i++) { x = 40 + i * 25; o = y; y = Math.max(90, Math.min(330, y + (r() - .56) * 42)); c = y; h = Math.min(o, c) - r() * 16; l = Math.max(o, c) + r() * 16; k = c <= o ? 'u' : 'd'; s += '<path class="' + k + '" d="M' + x + ' ' + h.toFixed(0) + 'V' + l.toFixed(0) + '"/><rect class="' + k + 'f" x="' + (x - 5) + '" y="' + Math.min(o, c).toFixed(0) + '" width="10" height="' + Math.max(3, Math.abs(o - c)).toFixed(0) + '"/>'; }
      return s + '<path class="ln" pathLength="1" d="M20 330C120 310 180 250 260 260S400 170 470 150 560 100 590 78"/><text class="tx fl" x="24" y="34">ILLUSTRATIVE · DECORATIVE</text><text class="tx" x="24" y="388">O  H  L  C  ·  VOL</text>';
    },
    economics: function () {
      var r = R(11), s = grid(50), i, v = 120;
      s += '<path d="M40 350H580M40 350V40" stroke="var(--mut)" stroke-width="1.2" fill="none" opacity=".6"/>';
      for (i = 0; i < 9; i++) { v = Math.max(60, Math.min(250, v + (r() - .42) * 70)); s += '<rect class="bar" x="' + (66 + i * 56) + '" y="' + (350 - v) + '" width="30" height="' + v.toFixed(0) + '" style="animation-delay:' + i * .1 + 's"/>'; }
      return s + '<path class="ln" pathLength="1" d="M40 300C140 280 220 210 320 190S480 110 580 90"/><path class="ln2" pathLength="1" d="M40 90C140 130 240 200 330 230S500 290 580 300"/><text class="tx" x="44" y="30">GDP · CPI · RATE</text><text class="tx" x="44" y="372">S / D · ILLUSTRATIVE</text>';
    },
    history: function () {
      var s = '', i;
      for (i = 1; i < 9; i++) s += '<ellipse class="gl" cx="' + (330 + i * 4) + '" cy="190" rx="' + (i * 34) + '" ry="' + (i * 22) + '" transform="rotate(' + (-12 + i * 3) + ' 330 190)"/>';
      s += '<path class="ar" d="M120 260C200 150 300 280 380 170S500 120 540 80"/><path d="M30 350H580" stroke="var(--mut)" fill="none" opacity=".6"/>';
      [60, 150, 250, 340, 430, 520].forEach(function (x, j) { s += '<path d="M' + x + ' 350v-' + (j % 2 ? 22 : 12) + '" stroke="var(--w1)" fill="none"/><circle class="nd" cx="' + x + '" cy="350" r="4" style="animation-delay:' + j * .3 + 's"/>'; });
      return s + '<text class="tx" x="30" y="36">ARCHIVE</text>';
    },
    literature: function () {
      var s = '', y;
      for (y = 60; y < 380; y += 36) s += '<path class="gl" d="M30 ' + y + 'H570"/>';
      return s + '<text class="big fl" x="300" y="250" text-anchor="middle">ادب</text><text class="big" x="150" y="160" opacity=".12">شعر</text><path class="ln" pathLength="1" d="M60 330C150 290 200 350 300 320S450 290 540 330"/>';
    },
    mathematics: function () {
      return grid(40) + '<path d="M0 200H600M300 0V400" stroke="var(--mut)" opacity=".6" fill="none"/><path class="ln" pathLength="1" d="' + wave(38, 90, 0, 200) + '"/><path class="ln2" pathLength="1" d="' + wave(38, 90, 1.57, 200) + '"/><circle class="gl" cx="300" cy="200" r="90"/><g class="rot"><path class="ar" d="M300 200L390 200"/><circle class="nd" cx="390" cy="200" r="5"/></g><text class="tx fl" x="40" y="50">∑  ∫  π  ∞  √</text><text class="tx" x="40" y="380">f(x) = sin x</text>';
    },
    politics: function () {
      var s = '<g class="rot">', i, P = [[210, 130], [380, 110], [450, 220], [330, 290], [180, 250], [300, 190]];
      s += '<circle class="gl" cx="300" cy="200" r="160"/>';
      for (i = 1; i < 4; i++) s += '<ellipse class="gl" cx="300" cy="200" rx="' + (i * 40) + '" ry="160"/><ellipse class="gl" cx="300" cy="200" rx="160" ry="' + (i * 40) + '"/>';
      s += '</g>';
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [5, 1], [5, 3]].forEach(function (e) { var a = P[e[0]], b = P[e[1]]; s += '<path class="ar" d="M' + a[0] + ' ' + a[1] + 'Q' + ((a[0] + b[0]) / 2 + 20) + ' ' + ((a[1] + b[1]) / 2 - 40) + ' ' + b[0] + ' ' + b[1] + '"/>'; });
      P.forEach(function (p, j) { s += '<circle class="nd" cx="' + p[0] + '" cy="' + p[1] + '" r="5" style="animation-delay:' + j * .35 + 's"/>'; });
      return s + '<text class="tx" x="30" y="36">GLOBAL AFFAIRS</text>';
    }
  };
  Array.prototype.forEach.call(document.querySelectorAll('[data-art]'), function (el) {
    var f = A[el.getAttribute('data-art')]; if (!f) return;
    el.innerHTML = '<svg class="wa" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + f() + '</svg>';
  });
})();
