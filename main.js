/* ============================================================
   main.js — هدر/فوتر مشترک، فهرست یادداشت‌ها، تم، فیلتر،
   نوار پیشرفت مقاله، فهرست مطالب و نمودار آموزشی.

   افزودن یادداشت جدید: یک آیتم به آرایه NOTES اضافه کنید
   (و اگر صفحه‌اش آماده است، u را با مسیر فایل پر کنید).
   ============================================================ */
(function () {
  'use strict';
  var B = document.body.getAttribute('data-base') || '';

  var CATS = [
    { k: 'technical', en: 'TECHNICAL ANALYSIS', fa: 'مطالعه قیمت، حجم، روند و ساختار بازار.' },
    { k: 'fundamental', en: 'FUNDAMENTAL ANALYSIS', fa: 'ارزش‌گذاری، صورت‌های مالی و جریان نقدی.' },
    { k: 'macro', en: 'MACROECONOMICS', fa: 'نرخ بهره، تورم و سیاست پولی.' },
    { k: 'behavioral', en: 'BEHAVIORAL FINANCE', fa: 'ترس، طمع و سوگیری‌های رفتاری.' },
    { k: 'crypto', en: 'CRYPTO', fa: 'بازار شبانه‌روزی و دارایی‌های دیجیتال.' },
    { k: 'markets', en: 'MARKETS', fa: 'اطلاعات، انتظارات و ساختار بازارها.' }
  ];

  // u: مسیر صفحه‌ی مقاله؛ اگر null باشد «به‌زودی» نمایش داده می‌شود.
  var NOTES = [
    { n: 1, k: 'markets', cat: 'MARKET INFORMATION', d: '2026', r: 'حدود ۱۴ دقیقه', u: 'notes/article-01.html',
      t: 'بازارهای مالی چگونه کار می‌کنند؟ از عرضه و تقاضا تا شکل‌گیری قیمت',
      e: 'قیمت یک دارایی از تعامل خریداران و فروشندگان شکل می‌گیرد. این یادداشت از عرضه و تقاضا و دفتر سفارشات تا کشف قیمت، نقدشوندگی و نوسان را مرور می‌کند و نشان می‌دهد اطلاعات و انتظارات چگونه به حرکت قیمت می‌رسند.' },
    { n: 2, k: 'technical', cat: 'TECHNICAL ANALYSIS', d: '2026', r: 'حدود ۴ دقیقه', u: 'notes/article-02.html',
      t: 'تحلیل تکنیکال؛ مطالعه رفتار قیمت یا پیش‌بینی آینده؟',
      e: 'تحلیل تکنیکال تلاش می‌کند رفتار قیمت و حجم معاملات را بررسی کند. هدف آن پیش‌بینی قطعی آینده نیست؛ بلکه یافتن ساختارها، روندها و سناریوهایی است که می‌توانند به تصمیم‌گیری منظم‌تر کمک کنند.' },
    { n: 3, k: 'fundamental', cat: 'FUNDAMENTAL ANALYSIS', d: '2026', r: 'حدود ۸ دقیقه', u: 'notes/article-03.html',
      t: 'تحلیل بنیادی؛ از صورت‌های مالی تا ارزش ذاتی',
      e: 'قیمت چیزی است که بازار در یک لحظه برای یک دارایی تعیین می‌کند؛ اما ارزش‌گذاری بنیادی تلاش می‌کند با بررسی جریان‌های نقدی، سودآوری، ریسک و شرایط اقتصادی، تصویری از ارزش آن ارائه دهد.' },
    { n: 4, k: 'macro', cat: 'MACROECONOMICS', d: '2026', r: 'حدود ۴ دقیقه', u: 'notes/article-04.html',
      t: 'نرخ بهره چگونه اقتصاد و بازارهای مالی را تحت تأثیر قرار می‌دهد؟',
      e: 'تغییر نرخ بهره می‌تواند هزینه تأمین مالی، جذابیت اوراق، ارزش‌گذاری شرکت‌ها و رفتار سرمایه‌گذاران را تغییر دهد. به همین دلیل، سیاست پولی یکی از متغیرهای مهم در تحلیل بازارهای مالی است.' },
    { n: 5, k: 'behavioral', cat: 'BEHAVIORAL FINANCE', d: '2026', r: 'حدود ۷ دقیقه', u: 'notes/article-05.html',
      t: 'چرا سرمایه‌گذاران همیشه کاملاً منطقی رفتار نمی‌کنند؟',
      e: 'ترس، طمع، اعتمادبه‌نفس بیش از حد و رفتار گله‌ای می‌توانند بر تصمیم سرمایه‌گذاران اثر بگذارند. مالی رفتاری تلاش می‌کند این رفتارها را در کنار مدل‌های کلاسیک مالی بررسی کند.' }
  ];

  var ARW = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  function spark(n) {
    var q = n * 977 + 13, y = 20, d = '', i;
    for (i = 0; i < 12; i++) { q = (q * 16807) % 2147483647; y = Math.max(3, Math.min(25, y - 1.2 + (q / 2147483647 - 0.46) * 9)); d += (i ? 'L' : 'M') + (i * 8.5).toFixed(1) + ' ' + y.toFixed(1); }
    return '<svg class="spark" viewBox="0 0 94 28" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- Header / Footer ---------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  function cur(f) { return path === f ? ' aria-current="page"' : ''; }
  var hdr = document.getElementById('site-header');
  if (hdr) hdr.innerHTML =
    '<header class="wh"><div class="wrap wh-in">' +
    '<a class="wbrand" href="' + B + 'index.html" aria-label="Amir Mohammad Emami — خانه"><span class="am" aria-hidden="true">AM</span><span><b>AMIR MOHAMMAD EMAMI</b><small>FINANCIAL MANAGER STUDENT</small></span></a>' +
    '<nav class="wnav" id="nav" aria-label="منوی اصلی">' +
    '<a href="' + B + 'index.html"' + cur('index.html') + '>خانه</a>' +
    '<button class="wl" id="worlds" aria-expanded="false" aria-controls="mega">دنیاها ▾</button>' +
    '<div class="mega" id="mega"><ul>' +
    '<li><a data-world="finance" href="' + B + 'worlds/finance.html"><i></i><span><b>FINANCE</b><small>مالی و بازارهای مالی</small></span></a></li>' +
    '<li><a data-world="economics" href="' + B + 'worlds/economics.html"><i></i><span><b>ECONOMICS</b><small>اقتصاد</small></span></a></li>' +
    '<li><a data-world="history" href="' + B + 'worlds/history.html"><i></i><span><b>HISTORY</b><small>تاریخ</small></span></a></li>' +
    '<li><a data-world="literature" href="' + B + 'worlds/literature.html"><i></i><span><b>LITERATURE</b><small>ادبیات و شعر</small></span></a></li>' +
    '<li><a data-world="mathematics" href="' + B + 'worlds/mathematics.html"><i></i><span><b>MATHEMATICS</b><small>ریاضیات</small></span></a></li>' +
    '<li><a data-world="politics" href="' + B + 'worlds/politics.html"><i></i><span><b>POLITICS</b><small>سیاست و امور بین‌الملل</small></span></a></li>' +
    '</ul></div>' +
    '<a href="' + B + 'notes.html"' + cur('notes.html') + '>یادداشت‌ها</a>' +
    '<a href="' + B + 'about.html"' + cur('about.html') + '>درباره</a>' +
    '<a href="' + B + 'contact.html"' + cur('contact.html') + '>ارتباط</a></nav>' +
    '<div class="wh-act">' +
    '<button class="icon-btn" id="theme" aria-label="تغییر حالت تاریک/روشن"><svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4v16" /><path d="M12 4a8 8 0 010 16z" fill="currentColor"/></svg></button>' +
    '<button class="icon-btn wmenu" id="menu" aria-label="منو" aria-expanded="false" aria-controls="nav"><svg class="ic" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg></button>' +
    '</div></div></header>';

  var ftr = document.getElementById('site-footer');
  if (ftr) ftr.innerHTML =
    '<footer class="ftr"><div class="wrap"><div class="ftr-top"><div><span class="mono en" aria-hidden="true">AE</span><b>Amir Mohammad Emami</b>' +
    '<small>Financial Manager Student</small><p class="tagl">Finance · Economics · History · Literature · Mathematics · Politics</p></div>' +
    '<nav aria-label="پیوندهای پایین صفحه"><a href="' + B + 'about.html">درباره من</a><a href="' + B + 'notes.html">یادداشت‌ها</a><a href="' + B + 'contact.html">ارتباط</a></nav></div>' +
    '<p class="copy">© 2026 Amir Mohammad Emami</p></div></footer>';

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var tb = document.getElementById('theme');
  if (tb) tb.addEventListener('click', function () {
    var t = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

  /* ---------- Header behaviour ---------- */
  var h = document.querySelector('.hdr');
  function onScroll() { if (h) h.classList.toggle('sm', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var mb = document.getElementById('menu'), nav = document.getElementById('nav');
  function menu(o) {
    if (!mb) return;
    mb.setAttribute('aria-expanded', o); nav.classList.toggle('open', o);
    document.body.style.overflow = o ? 'hidden' : '';
    
  }
  if (mb) {
    mb.addEventListener('click', function () { menu(mb.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu(false);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mb.getAttribute('aria-expanded') === 'true') { menu(false); mb.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) menu(false); });
  }

  function syncMega() {}

  /* ---------- Notes lists ---------- */
  function card(n) {
    var link = n.u ? B + n.u : '';
    return '<article class="note' + (n.u ? '' : ' soon') + '" data-cat="' + n.k + '"><span class="nn en">' + pad(n.n) + '</span><div>' +
      '<p class="meta"><span class="cat">' + n.cat + '</span><span>' + n.d + '</span>' + (n.r ? '<span>' + n.r + '</span>' : '') + '</p>' +
      '<h3>' + (n.u ? '<a href="' + link + '">' + n.t + '</a>' : n.t) + '</h3><p class="ex">' + n.e + '</p>' +
      (n.u ? '<a class="more" href="' + link + '">مطالعه یادداشت ' + ARW + '</a>' : '<span class="badge">به‌زودی</span>') + '</div>' + spark(n.n) + '</article>';
  }
  var lists = document.querySelectorAll('[data-notes]');
  Array.prototype.forEach.call(lists, function (el) { var ids = el.getAttribute('data-ids'); el.innerHTML = NOTES.filter(function (n) { return !ids || (',' + ids + ',').indexOf(',' + n.n + ',') > -1; }).map(card).join(''); });

  var fb = document.querySelectorAll('.filters button');
  if (fb.length) {
    var empty = document.getElementById('empty');
    var apply = function (k) {
      Array.prototype.forEach.call(fb, function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f') === k); });
      var shown = 0, grid = document.querySelector('.notes');
      Array.prototype.forEach.call(document.querySelectorAll('.note'), function (n) {
        var ok = k === 'all' || n.getAttribute('data-cat') === k; n.style.display = ok ? '' : 'none'; if (ok) shown++;
        // nth-child شامل کارت‌های پنهان هم می‌شود؛ زوج/فرد را بر اساس کارت‌های قابل‌مشاهده تعیین می‌کنیم.
        n.classList.toggle('pa', ok && shown % 2 === 1); n.classList.toggle('pb', ok && shown % 2 === 0);
      });
      if (grid) grid.classList.toggle('filtered', k !== 'all');
      if (empty) empty.hidden = shown > 0;
    };
    Array.prototype.forEach.call(fb, function (b) {
      b.addEventListener('click', function () { var k = b.getAttribute('data-f'); apply(k); history.replaceState(null, '', k === 'all' ? location.pathname : '#' + k); });
    });
    var first = location.hash.slice(1);
    apply(document.querySelector('.filters [data-f="' + first + '"]') ? first : 'all');
    window.addEventListener('hashchange', function () { var k = location.hash.slice(1); if (document.querySelector('.filters [data-f="' + k + '"]')) apply(k); });
  }

  /* ---------- Reveal ---------- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.08 });
    Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
  } else Array.prototype.forEach.call(rv, function (el) { el.classList.add('in'); });

  /* ---------- Article: progress + TOC ---------- */
  var art = document.querySelector('.art');
  if (art) {
    var bar = document.querySelector('.progress i');
    var upd = function () {
      var r = art.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.2) / total));
      if (bar) bar.style.width = (p * 100) + '%';
    };
    upd(); window.addEventListener('scroll', upd, { passive: true });
    var chaps = art.querySelectorAll('.chap'), toc = document.getElementById('toc-list');
    if (toc) {
      toc.innerHTML = Array.prototype.map.call(chaps, function (c) {
        return '<li><a href="#' + c.id + '"><span class="en">' + c.querySelector('.cn').textContent + '</span>' + c.getAttribute('data-t') + '</a></li>';
      }).join('');
      var links = toc.querySelectorAll('a');
      if ('IntersectionObserver' in window) {
        var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) Array.prototype.forEach.call(links, function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); }); }, { rootMargin: '-25% 0px -65% 0px' });
        Array.prototype.forEach.call(chaps, function (c) { so.observe(c); });
      }
      var tocBox = document.querySelector('details.toc');
      if (tocBox && window.innerWidth > 1000) tocBox.open = true;
    }
  }

  /* ---------- Educational candlestick chart ---------- */
  var cv = document.getElementById('candles');
  if (cv) {
    var W = 720, H = 360, n = 34, pd = 10, ph = 240, seed = 11, p = 100, d = [], i;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (i = 0; i < n; i++) {
      var o = p, c = o + (rnd() - 0.44) * 6, hi = Math.max(o, c) + rnd() * 2.6, lo = Math.min(o, c) - rnd() * 2.6;
      d.push({ o: o, c: c, h: hi, l: lo, v: 25 + rnd() * 55 + Math.abs(c - o) * 6 }); p = c;
    }
    var mx = Math.max.apply(null, d.map(function (x) { return x.h; })), mn = Math.min.apply(null, d.map(function (x) { return x.l; }));
    var y = function (v) { return pd + (1 - (v - mn) / (mx - mn)) * ph; };
    var cw = (W - 2 * pd) / n, vmax = Math.max.apply(null, d.map(function (x) { return x.v; })), s = '';
    for (i = 0; i < 5; i++) s += '<line x1="' + pd + '" x2="' + (W - pd) + '" y1="' + (pd + i * ph / 4) + '" y2="' + (pd + i * ph / 4) + '" stroke="var(--line)" stroke-width="1"/>';
    d.forEach(function (x, j) {
      var cx = pd + j * cw + cw / 2, up = x.c >= x.o, cl = up ? 'c-up' : 'c-dn';
      s += '<line class="' + cl + '" x1="' + cx + '" x2="' + cx + '" y1="' + y(x.h) + '" y2="' + y(x.l) + '" stroke-width="1.2"/>';
      s += '<rect class="' + cl + '" x="' + (cx - cw * 0.3) + '" width="' + (cw * 0.6) + '" y="' + y(Math.max(x.o, x.c)) + '" height="' + Math.max(1.5, Math.abs(y(x.o) - y(x.c))) + '"/>';
      var vh = x.v / vmax * 60;
      s += '<rect class="' + cl + '" opacity=".45" x="' + (cx - cw * 0.3) + '" width="' + (cw * 0.6) + '" y="' + (H - pd - vh) + '" height="' + vh + '"/>';
    });
    var pts = [];
    for (i = 7; i < n; i++) { var sum = 0; for (var k = 0; k < 8; k++) sum += d[i - k].c; pts.push((pd + i * cw + cw / 2) + ',' + y(sum / 8)); }
    s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="var(--gold)" stroke-width="1.8"/>';
    s += '<line x1="' + pd + '" x2="' + (W - pd) + '" y1="' + y(mx) + '" y2="' + y(mx) + '" stroke="var(--red2)" stroke-dasharray="5 5"/><text x="' + (pd + 6) + '" y="' + (y(mx) + 14) + '" text-anchor="start">مقاومت (نمونه)</text>';
    s += '<line x1="' + pd + '" x2="' + (W - pd) + '" y1="' + y(mn) + '" y2="' + y(mn) + '" stroke="var(--em2)" stroke-dasharray="5 5"/><text x="' + (W - pd) + '" y="' + (y(mn) - 6) + '" text-anchor="end">حمایت (نمونه)</text>';
    cv.innerHTML = s;
  }

  /* ---------- Worlds mega nav, page veil, pointer glow ---------- */
  var wb = document.getElementById('worlds'), mg = document.getElementById('mega');
  function mega(o) { if (!wb) return; wb.setAttribute('aria-expanded', o); mg.classList.toggle('open', o); }
  if (wb) {
    wb.addEventListener('click', function (e) { e.stopPropagation(); mega(wb.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.mega')) mega(false); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') { mega(false); } });
  }
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vl = document.createElement('div'); vl.className = 'veil on'; vl.setAttribute('aria-hidden', 'true'); vl.innerHTML = '<span class="am">AM</span>';
  document.body.appendChild(vl);
  requestAnimationFrame(function () { setTimeout(function () { vl.classList.remove('on'); }, 120); });
  window.addEventListener('pageshow', function (e) { if (e.persisted) vl.classList.remove('on'); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || rm || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.origin !== location.origin || a.pathname === location.pathname) return;
    e.preventDefault(); vl.classList.add('on'); setTimeout(function () { location.href = a.href; }, 260);
  });
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.pc,.cc,.abc'); if (!c) return;
    var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
})();
