(function () {
  "use strict";

  var MEDIA = "assets/media/";
  var projects = window.PROJECTS || [];
  // Every gallery shows its clips first, then the stills, keeping each group's order from projects.js.
  projects.forEach(function (p) {
    var isClip = function (m) { return typeof m !== "string"; };
    p.media = p.media.filter(isClip).concat(p.media.filter(function (m) { return !isClip(m); }));
  });
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(d) { var p = d.split("-"); return MONTHS[+p[1] - 1] + " " + p[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function src(m) { return typeof m === "string" ? m : m.src; }
  var CAT = { games: "Game", apps: "App", art: "Art & Design" };

  $("#year").textContent = new Date().getFullYear();
  $("#projCount").dataset.count = projects.length;

  /* ---------- Theme ---------- */
  $("#themeToggle").addEventListener("click", function () {
    var root = document.documentElement;
    var next = (root.dataset.theme || "dark") === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Nav ---------- */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navLinks = $$(".nav__links a");
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["about", "work", "journey", "contact"].forEach(function (id) { spy.observe(document.getElementById(id)); });

  /* ---------- Typed roles ---------- */
  (function () {
    var el = $("#typed");
    var roles = ["Game Programmer", "Unity Developer", "2D Artist", "Animator", "Software Developer"];
    if (reduceMotion) return;
    var r = 0, i = roles[0].length, deleting = true;
    function tick() {
      var word = roles[r];
      if (deleting) {
        i--;
        if (i === 0) { deleting = false; r = (r + 1) % roles.length; }
      } else {
        i++;
        if (i === roles[r].length) { deleting = true; el.textContent = roles[r]; return setTimeout(tick, 1900); }
      }
      el.textContent = roles[r].slice(0, i) || " ";
      setTimeout(tick, deleting ? 45 : 85);
    }
    setTimeout(tick, 2200);
  })();

  /* ---------- Hero particles: sparks that drift and scatter from the cursor ---------- */
  (function () {
    var canvas = $("#heroFx");
    var ctx = canvas.getContext("2d");
    var hero = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, sparks = [], mouse = { x: -9999, y: -9999 }, running = false, visible = true;
    var colors = ["#ffb547", "#ff5d8f", "#4fd8ff", "#ffffff"];

    function resize() {
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, W * H / 16000));
      sparks = [];
      for (var k = 0; k < n; k++) sparks.push(make(Math.random() * W, Math.random() * H));
    }
    function make(x, y, burst) {
      var a = Math.random() * Math.PI * 2, s = burst ? 2 + Math.random() * 5 : .15 + Math.random() * .35;
      return { x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (burst ? 0 : .15), r: burst ? 1.5 + Math.random() * 2.5 : .6 + Math.random() * 1.8,
        c: colors[(Math.random() * colors.length) | 0], life: burst ? 1 : -1, tw: Math.random() * 6.28 };
    }
    function star(x, y, r) {
      ctx.beginPath();
      ctx.moveTo(x, y - r * 2.4); ctx.quadraticCurveTo(x, y, x + r * 2.4, y);
      ctx.quadraticCurveTo(x, y, x, y + r * 2.4); ctx.quadraticCurveTo(x, y, x - r * 2.4, y);
      ctx.quadraticCurveTo(x, y, x, y - r * 2.4); ctx.fill();
    }
    function frame() {
      if (!visible) { running = false; return; }
      ctx.clearRect(0, 0, W, H);
      for (var k = sparks.length - 1; k >= 0; k--) {
        var p = sparks[k];
        var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14000) { var f = (14000 - d2) / 14000 * .6; var d = Math.sqrt(d2) || 1; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.x += p.vx; p.y += p.vy;
        if (p.life < 0) {
          p.vx *= .96; p.vy *= .96;
          p.vx += (Math.random() - .5) * .02; p.vy += (Math.random() - .5) * .02 - .004;
          if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
          if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        } else {
          p.vx *= .94; p.vy = p.vy * .94 + .05; p.life -= .018;
          if (p.life <= 0) { sparks.splice(k, 1); continue; }
        }
        p.tw += .05;
        ctx.globalAlpha = p.life > 0 ? p.life : .35 + Math.sin(p.tw) * .3;
        ctx.fillStyle = p.c;
        if (p.r > 1.6) star(p.x, p.y, p.r); else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    function start() { if (!running && !reduceMotion) { running = true; requestAnimationFrame(frame); } }

    hero.addEventListener("pointermove", function (e) { var b = canvas.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
    hero.addEventListener("pointerdown", function (e) {
      if (e.target.closest("a, button, .card-char")) return;
      var b = canvas.getBoundingClientRect();
      for (var k = 0; k < 26; k++) sparks.push(make(e.clientX - b.left, e.clientY - b.top, true));
    });
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(hero);
    window.addEventListener("resize", resize);
    resize();
    // With reduced motion, draw a single still frame of sparks instead of animating.
    if (reduceMotion) { visible = false; frame(); ctx.globalAlpha = .5; sparks.forEach(function (p) { ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }); ctx.globalAlpha = 1; } else start();

    // Exposed so the combo easter egg can set off a burst.
    window.__burst = function (x, y, n) { var b = canvas.getBoundingClientRect(); for (var k = 0; k < (n || 60); k++) sparks.push(make(x - b.left, y - b.top, true)); start(); };
  })();

  /* ---------- Tilt ---------- */
  function tilt(el, max) {
    if (!finePointer || reduceMotion) return;
    el.addEventListener("pointermove", function (e) {
      var b = el.getBoundingClientRect();
      var px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
      el.style.setProperty("--ry", ((px - .5) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((.5 - py) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });
    el.addEventListener("pointerleave", function () { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  }
  $$(".tilt").forEach(function (el) { tilt(el, 9); });

  /* ---------- Reveal + counters + skill bars ---------- */
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      $$("[data-count]", e.target).forEach(countUp);
      revealer.unobserve(e.target);
    });
  }, { threshold: .15 });
  $$(".reveal").forEach(function (el) { revealer.observe(el); });

  function countUp(el) {
    var to = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), t0 = null, dur = 1200;
    if (reduceMotion) { el.textContent = to.toFixed(dec); return; }
    requestAnimationFrame(function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - k, 3));
      el.textContent = v.toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    });
  }

  // Skill group tabs
  var segBtns = $$(".seg button");
  segBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var g = b.dataset.group;
      segBtns.forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $$("#statList li").forEach(function (li) { li.classList.toggle("is-dim", g !== "all" && li.dataset.group !== g); });
    });
  });

  /* ---------- Project grid ---------- */
  var grid = $("#grid");
  grid.innerHTML = projects.map(function (p, i) {
    return '<button class="proj tilt-soft' + (p.featured ? " proj--featured" : "") + '" type="button" data-cat="' + p.category + '" data-i="' + i + '" aria-label="Open ' + esc(p.title) + '">' +
      '<div class="proj__media">' +
        '<img src="' + MEDIA + (p.featured && p.coverLarge ? p.coverLarge : p.cover) + '" alt="" loading="lazy" width="800" height="500">' +
        (p.preview ? '<img class="proj__preview" data-src="' + MEDIA + p.preview + '" alt="">' : "") +
        (p.preview ? '<span class="proj__play">' + (finePointer ? "Hover to play" : (p.category === "games" ? "Gameplay" : "Preview")) + "</span>" : "") +
        (p.featured ? '<span class="proj__ribbon badge">Featured</span>' : "") +
      "</div>" +
      '<div class="proj__body">' +
        '<div class="proj__meta"><b>' + esc(p.kind) + "</b><span>" + fmtDate(p.date) + "</span></div>" +
        '<h3 class="proj__title">' + esc(p.title) + "</h3>" +
        '<p class="proj__short">' + esc(p.short) + "</p>" +
        '<span class="proj__more">View project</span>' +
      "</div></button>";
  }).join("");

  // On touch screens there is no hover, so clips play while the card is mostly on screen.
  var autoplay = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var pv = $(".proj__preview", e.target);
      if (e.isIntersecting && !pv.src) pv.src = pv.dataset.src;
      e.target.classList.toggle("is-playing", e.isIntersecting);
    });
  }, { threshold: .7 });
  $$(".proj", grid).forEach(function (card) {
    tilt(card, 4);
    var pv = $(".proj__preview", card);
    card.addEventListener("click", function () { openProject(+card.dataset.i, 0, true); });
    if (!pv) return;
    if (!finePointer) { if (!reduceMotion) autoplay.observe(card); return; }
    card.addEventListener("pointerenter", function () {
      if (!pv.src) pv.src = pv.dataset.src;
      card.classList.add("is-playing");
      $(".proj__play", card).textContent = "Playing";
    });
    card.addEventListener("pointerleave", function () {
      card.classList.remove("is-playing");
      $(".proj__play", card).textContent = "Hover to play";
    });
  });

  // Filters
  var filterBtns = $$("#filters button");
  filterBtns.forEach(function (b) {
    var f = b.dataset.filter;
    $("sup", b).textContent = f === "all" ? projects.length : projects.filter(function (p) { return p.category === f; }).length;
    b.addEventListener("click", function () {
      filterBtns.forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
      $$(".proj", grid).forEach(function (card, idx) {
        var show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("is-hidden", !show);
        card.classList.remove("is-entering");
        // Only the featured card spans two columns when everything is shown.
        card.classList.toggle("proj--featured", show && f === "all" && !!projects[idx].featured);
        if (show) { void card.offsetWidth; card.style.animationDelay = (idx * 40) + "ms"; card.classList.add("is-entering"); }
      });
    });
  });

  /* ---------- Timeline ---------- */
  var ICON_CAP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/></svg>';
  var edu = [
    { date: "2015-07", title: "Diploma in Mechanical Engineering", sub: "UiTM Permatang Pauh, Pulau Pinang · 2015 to 2019" },
    { date: "2020-11", title: "BCS (Hons.) Multimedia Computing", sub: "UiTM Shah Alam, Selangor · 2020 to 2023 · CGPA 3.64" }
  ];
  var events = edu.map(function (e) { return { type: "edu", date: e.date, html: '<div class="tl__card"><span class="tl__icon">' + ICON_CAP + '</span><span><span class="tl__date">' + e.date.slice(0, 4) + '</span><span class="tl__title">' + esc(e.title) + '</span><span class="tl__sub">' + esc(e.sub) + "</span></span></div>" }; })
    .concat(projects.map(function (p, i) {
      return { type: "proj", date: p.date, html: '<button class="tl__card" type="button" data-i="' + i + '"><img class="tl__thumb" src="' + MEDIA + p.cover + '" alt="" loading="lazy"><span><span class="tl__date">' + fmtDate(p.date) + '</span><span class="tl__title">' + esc(p.title) + '</span><span class="tl__sub">' + esc(p.kind) + " · " + esc(p.engine) + "</span></span></button>" };
    }))
    .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var tlEl = $("#timeline");
  tlEl.innerHTML = events.map(function (e) { return '<li class="tl reveal' + (e.type === "edu" ? " tl--edu" : "") + '">' + e.html + "</li>"; }).join("");
  $$(".tl", tlEl).forEach(function (li) { revealer.observe(li); });
  $$("button.tl__card", tlEl).forEach(function (b) { b.addEventListener("click", function () { openProject(+b.dataset.i, 0, true); }); });

  /* ---------- Project viewer ---------- */
  var dlg = $("#viewer"), img = $("#viewerImg"), thumbs = $("#viewerThumbs");
  var cur = { p: 0, m: 0 }, lastFocus = null;

  function openProject(pi, mi, push) {
    var p = projects[pi]; if (!p) return;
    cur.p = pi;
    $("#viewerTitle").textContent = p.title;
    $("#viewerMeta").innerHTML = "<b>" + esc(p.kind) + "</b><span>" + esc(p.engine) + "</span><span>" + fmtDate(p.date) + "</span><span>" + CAT[p.category] + "</span>";
    $("#viewerBody").innerHTML = p.body.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    $("#viewerTags").innerHTML = p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    $("#viewerLinks").innerHTML = p.links.map(function (l, k) { return '<a class="btn' + (k ? " btn--ghost" : "") + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>"; }).join("");
    thumbs.innerHTML = p.media.map(function (m, k) {
      var clip = typeof m !== "string";
      return '<button type="button" data-k="' + k + '" class="' + (clip ? "is-clip" : "") + '" aria-label="' + (clip ? "Clip " : "Image ") + (k + 1) + '"><img src="' + MEDIA + "thumbs/" + src(m) + '" alt=""></button>';
    }).join("");
    showMedia(mi || 0);
    if (!dlg.open) { lastFocus = document.activeElement; dlg.showModal(); document.body.style.overflow = "hidden"; }
    dlg.scrollTop = 0;
    if (push) history.replaceState(null, "", "#work/" + p.slug);
  }
  function showMedia(k) {
    var list = projects[cur.p].media, n = list.length;
    cur.m = (k + n) % n;
    var m = list[cur.m];
    img.src = MEDIA + src(m);
    img.alt = projects[cur.p].title + ", " + (typeof m === "string" ? "image " : "clip ") + (cur.m + 1);
    img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
    $("#viewerClip").hidden = typeof m === "string";
    $("#viewerCount").textContent = (cur.m + 1) + " / " + n;
    $$("button", thumbs).forEach(function (b, i) { b.setAttribute("aria-current", i === cur.m ? "true" : "false"); });
    var active = thumbs.children[cur.m];
    if (active) thumbs.scrollTo({ left: active.offsetLeft - thumbs.clientWidth / 2 + active.clientWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });
    // Warm the next image so arrowing through feels instant.
    var nx = list[(cur.m + 1) % n]; if (typeof nx === "string") (new Image()).src = MEDIA + nx;
  }
  function closeViewer() { if (dlg.open) dlg.close(); }
  dlg.addEventListener("close", function () {
    if (dlg.open) return; // reopened before this queued event ran
    document.body.style.overflow = "";
    img.removeAttribute("src");
    if (location.hash.indexOf("#work/") === 0) history.replaceState(null, "", "#work");
    if (lastFocus) lastFocus.focus();
  });
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) return closeViewer();
    var t = e.target.closest("[data-close],[data-step],[data-k],[data-proj]");
    if (!t) return;
    if (t.hasAttribute("data-close")) closeViewer();
    else if (t.dataset.step) showMedia(cur.m + +t.dataset.step);
    else if (t.dataset.k) showMedia(+t.dataset.k);
    else if (t.dataset.proj) openProject((cur.p + +t.dataset.proj + projects.length) % projects.length, 0, true);
  });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); showMedia(cur.m + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); showMedia(cur.m - 1); }
  });
  // Swipe on touch screens
  (function () {
    var x0 = null, stage = $(".viewer__stage");
    stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) showMedia(cur.m + (dx < 0 ? 1 : -1));
    });
  })();

  // Deep links: #work/<slug>
  function fromHash() {
    var m = location.hash.match(/^#work\/([\w-]+)/);
    if (!m) return;
    var i = projects.findIndex(function (p) { return p.slug === m[1]; });
    if (i > -1) openProject(i, 0, false);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();

  /* ---------- Copy email ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2200); }
  $("#copyEmail").addEventListener("click", function () {
    var email = this.dataset.email;
    var done = function () { toast("Email copied: " + email); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(email).then(done, fallback); else fallback();
    function fallback() {
      var t = document.createElement("textarea"); t.value = email; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast(email); }
      document.body.removeChild(t);
    }
  });

  /* ---------- Easter egg: the Konami code ---------- */
  (function () {
    var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var pos = 0, keys = $$(".footer__egg kbd");
    function paint() { keys.forEach(function (k, i) { k.classList.toggle("is-hit", i < pos); }); }
    document.addEventListener("keydown", function (e) {
      if (dlg.open || /input|textarea/i.test(e.target.tagName)) return;
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
      paint();
      if (pos === seq.length) { pos = 0; setTimeout(paint, 900); combo(); }
    });
    function combo() {
      var el = document.createElement("div");
      el.className = "combo"; el.textContent = "10-HIT COMBO!";
      document.body.appendChild(el);
      setTimeout(function () { el.remove(); }, 1900);
      if (!reduceMotion) { document.body.classList.remove("shake"); void document.body.offsetWidth; document.body.classList.add("shake"); }
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(function () { if (window.__burst) window.__burst(window.innerWidth / 2, window.innerHeight * .42, 140); }, 350);
      toast("Achievement unlocked: Old-school gamer");
    }
  })();
})();
