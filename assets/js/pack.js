/* Booster pack minigame: a pack of five project cards.
   Drag the pack to turn it, slide along its top edge to tear it open, then flick through the cards. */
(function () {
  "use strict";
  var MEDIA = "assets/media/";
  var all = (window.PROJECTS || []).filter(function (p) { return !p.hidden; });
  if (all.length < 5) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function track(path) {
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "pack: " + path, title: path, event: true });
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  /* ---------- Rarity ---------- */
  // Featured work is legendary, art is uncommon, freelance client games are common, every other game is rare.
  var TIERS = {
    legendary: { label: "Legendary", mark: "★★", rank: 3 },
    rare: { label: "Rare", mark: "★", rank: 2 },
    uncommon: { label: "Uncommon", mark: "◆", rank: 1 },
    common: { label: "Common", mark: "●", rank: 0 }
  };
  function tier(p) {
    if (p.featured) return "legendary";
    if (p.category === "art") return "uncommon";
    if (p.client) return "common";
    return "rare";
  }
  var LOGOS = { "Unity": "unity", "Unreal Engine": "unreal", "PlayCanvas": "playcanvas", "C#": "csharp", "C++": "cpp",
    "JavaScript": "javascript", "Clip Studio Paint": "clipstudio", "Adobe Animate": "animate", "Java": "java", "NetBeans": "netbeans" };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(d) { var m = /^(\d{4})-(\d{2})/.exec(d || ""); return m ? MONTHS[+m[2] - 1] + " " + m[1] : ""; }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  // Four random cards plus one guaranteed rare-or-better "hit", no repeats; rarest shown last.
  function rollPack() {
    var hits = shuffle(all.filter(function (p) { return TIERS[tier(p)].rank >= 2; }));
    var legend = hits.filter(function (p) { return tier(p) === "legendary"; });
    var hit = legend.length && Math.random() < 0.3 ? legend[0] : hits[0];
    var rest = shuffle(all.filter(function (p) { return p !== hit; })).slice(0, 4);
    return rest.sort(function (a, b) { return TIERS[tier(a)].rank - TIERS[tier(b)].rank; }).concat([hit]);
  }

  function cardHTML(p, n) {
    var t = tier(p), info = TIERS[t];
    var tools = String(p.engine || "").split(/\s*·\s*/).filter(function (x) { return LOGOS[x]; });
    return '<div class="tcard r-' + t + '" data-slug="' + esc(p.slug) + '" tabindex="0" role="button" aria-label="' + esc(p.title) + ", " + info.label + ' card">' +
      '<div class="tcard__inner">' +
        '<div class="tcard__head"><b>' + esc(p.title) + '</b><span class="tcard__mark" title="' + info.label + '">' + info.mark + "</span></div>" +
        '<div class="tcard__art"><img src="' + MEDIA + esc(p.cover) + '" alt="" draggable="false"></div>' +
        '<div class="tcard__type">' + esc(p.kind) + "<span>" + fmtDate(p.date) + "</span></div>" +
        '<p class="tcard__text">' + esc(p.short) + "</p>" +
        '<div class="tcard__foot"><span class="tcard__tools">' + tools.map(function (x) {
          return '<img src="' + MEDIA + "logos/" + LOGOS[x] + '.png" alt="' + esc(x) + '" title="' + esc(x) + '" draggable="false">';
        }).join("") + '</span><span class="tcard__no">' + info.label + " · " + String(n).padStart(2, "0") + "/" + String(all.length).padStart(2, "0") + "</span></div>" +
      "</div>" +
      '<i class="tcard__shine" aria-hidden="true"></i>' +
    "</div>";
  }

  /* ---------- Markup ---------- */
  var fabWrap = el(
    '<div class="pack-fab" hidden>' +
      '<button class="pack-fab__open" type="button" aria-haspopup="dialog">' +
        '<span class="pack-fab__mini" aria-hidden="true"></span>' +
        '<span class="pack-fab__text"><b>Open a pack</b><small>5 cards of my work</small></span>' +
      "</button>" +
      '<button class="pack-fab__x" type="button" aria-label="Hide the booster pack">×</button>' +
    "</div>");
  var dlg = el(
    '<dialog class="pack-dlg" aria-label="Booster pack">' +
      '<button class="pack-dlg__close" type="button" aria-label="Close">×</button>' +
      '<div class="pack-stage">' +
        '<div class="pack" tabindex="0" aria-label="Booster pack. Press Enter to tear it open.">' +
          '<div class="pack__seal is-top pack__top">' + '<div class="pack__sealface"><span class="pack__cut"></span><span class="pack__hint">Slide to open →</span></div>' + '<div class="pack__sealface is-rear"></div>' + "</div>" +
          '<div class="pack__shoulder is-top is-front"></div><div class="pack__shoulder is-top is-rear"></div>' +
          '<div class="pack__face pack__front">' +
            '<div class="pack__body">' +
              '<span class="pack__series">Series 1 · Selected Work</span>' +
              '<span class="pack__logo"><b>Amirul</b> Hakim</span>' +
              '<span class="pack__sub">Booster Pack</span>' +
              '<span class="pack__count">5 cards · 1 rare or better</span>' +
            "</div>" +
          "</div>" +
          '<div class="pack__face pack__back">' +
            '<span class="pack__logo"><b>AH</b></span>' +
            "<ul><li><b>★★</b> Legendary · featured work</li><li><b>★</b> Rare · personal, uni &amp; studio games</li><li><b>◆</b> Uncommon · art</li><li><b>●</b> Common · client games</li></ul>" +
            "<small>Tap a card to open the project.</small>" +
          "</div>" +
          '<div class="pack__side is-left"></div><div class="pack__side is-right"></div>' +
          '<div class="pack__shoulder is-bottom is-front"></div><div class="pack__shoulder is-bottom is-rear"></div>' +
          '<div class="pack__seal is-bottom"><div class="pack__sealface"></div><div class="pack__sealface is-rear"></div></div>' +
        "</div>" +
        '<div class="pack-shadow" aria-hidden="true"></div>' +
        '<div class="pack-cards" aria-live="polite"></div>' +
        '<div class="pack-done" hidden>' +
          '<p class="pack-done__title">Your pull<br><small>Tap a card to open that project</small></p>' +
          '<div class="pack-done__grid"></div>' +
          '<div class="pack-done__btns"><button class="btn pack-again" type="button">Open another pack</button>' +
          '<button class="btn btn--ghost pack-shut" type="button">Close</button></div>' +
        "</div>" +
      "</div>" +
      '<p class="pack-tip">Drag the pack to turn it · slide along the top to tear it open</p>' +
    "</dialog>");
  document.body.appendChild(fabWrap);
  document.body.appendChild(dlg);

  var pack = dlg.querySelector(".pack"), top = dlg.querySelector(".pack__top"), cut = dlg.querySelector(".pack__cut");
  var cardsBox = dlg.querySelector(".pack-cards"), done = dlg.querySelector(".pack-done"), tip = dlg.querySelector(".pack-tip");

  /* ---------- Corner prompt ---------- */
  var KEY = "packHidden";
  function hiddenByUser() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
  if (!hiddenByUser()) setTimeout(function () { fabWrap.hidden = false; requestAnimationFrame(function () { fabWrap.classList.add("is-in"); }); }, 2500);
  fabWrap.querySelector(".pack-fab__x").addEventListener("click", function () {
    fabWrap.classList.remove("is-in");
    setTimeout(function () { fabWrap.hidden = true; }, 300);
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    track("hidden");
  });
  fabWrap.querySelector(".pack-fab__open").addEventListener("click", function () { openPack(); track("opened prompt"); });

  /* ---------- Pack: turn it ---------- */
  var rx = 0, ry = 0, state = "pack", drag = null, tear = null;
  function setRot(anim) {
    pack.classList.toggle("is-settling", !!anim);
    pack.style.setProperty("--rx", rx + "deg");
    pack.style.setProperty("--ry", ry + "deg");
    // light sweeps across the foil as it turns
    pack.style.setProperty("--sheen", (50 + ((ry % 360) + 360) % 360 / 3.6 - 50) + "%");
  }
  function facingFront() { var a = ((ry % 360) + 360) % 360; return a < 50 || a > 310; }

  pack.addEventListener("pointerdown", function (e) {
    if (state !== "pack" || e.target.closest(".pack__top")) return;
    drag = { x: e.clientX, y: e.clientY, rx: rx, ry: ry, id: e.pointerId };
    try { pack.setPointerCapture(e.pointerId); } catch (err) {}
    pack.classList.add("is-dragging");
  });
  pack.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    ry = drag.ry + (e.clientX - drag.x) * 0.6;
    rx = Math.max(-28, Math.min(28, drag.rx - (e.clientY - drag.y) * 0.3));
    setRot(false);
  });
  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag = null;
    pack.classList.remove("is-dragging");
    ry = Math.round(ry / 180) * 180; // settle on its front or back
    rx = 0;
    setRot(true);
  }
  pack.addEventListener("pointerup", endDrag);
  pack.addEventListener("pointercancel", endDrag);

  /* ---------- Pack: tear it ---------- */
  top.addEventListener("pointerdown", function (e) {
    if (state !== "pack") return;
    e.stopPropagation();
    if (!facingFront()) { ry = Math.round(ry / 360) * 360; rx = 0; setRot(true); return; }
    var r = top.getBoundingClientRect();
    tear = { left: r.left, width: r.width, id: e.pointerId, max: 0 };
    try { top.setPointerCapture(e.pointerId); } catch (err) {}
    top.classList.add("is-tearing");
    moveTear(e);
  });
  function moveTear(e) {
    if (!tear || e.pointerId !== tear.id) return;
    var p = Math.max(0, Math.min(1, (e.clientX - tear.left) / tear.width));
    tear.max = Math.max(tear.max, p); // the cut only grows
    cut.style.width = tear.max * 100 + "%";
    if (tear.max > 0.92) { tear = null; rip(); }
  }
  top.addEventListener("pointermove", moveTear);
  function stopTear(e) {
    if (!tear || e.pointerId !== tear.id) return;
    tear = null;
    top.classList.remove("is-tearing");
  }
  top.addEventListener("pointerup", stopTear);
  top.addEventListener("pointercancel", stopTear);
  pack.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && state === "pack") { e.preventDefault(); ry = 0; rx = 0; setRot(true); cut.style.width = "100%"; rip(); }
  });

  function rip() {
    state = "ripping";
    top.classList.remove("is-tearing");
    pack.classList.add("is-ripped");
    tip.textContent = "Drag to tilt the deck and peek · tap or flick for the next card";
    track("torn open");
    setTimeout(dealCards, reduceMotion ? 50 : 800);
  }

  /* ---------- Cards ---------- */
  var pulled = [], at = 0, deck = null;
  function dealCards() {
    state = "cards";
    pulled = rollPack();
    at = 0;
    cardsBox.innerHTML = '<div class="pack-deck">' + pulled.map(function (p, i) { return cardHTML(p, all.indexOf(p) + 1); }).join("") + "</div>";
    deck = cardsBox.firstChild;
    var cards = [].slice.call(deck.children);
    cards.forEach(function (c, i) {
      c.style.zIndex = String(pulled.length - i);
      c.style.setProperty("--i", i);
      bindCard(c, true);
    });
    bindDeck();
    pack.classList.add("is-gone");
    cardsBox.classList.add("is-in");
    cards[0].focus({ preventScroll: true });
  }

  // Holo shine follows the pointer; the top card can be flicked away.
  function bindCard(c, inStack) {
    // The entrance animation would otherwise keep control of transform and stop the fly-off / hover transitions.
    c.addEventListener("animationend", function () { c.style.animation = "none"; });
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
      c.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      if (inStack) return; // the deck tilts as a whole instead
      c.style.setProperty("--tx", ((y - 0.5) * -14).toFixed(2) + "deg");
      c.style.setProperty("--ty", ((x - 0.5) * 16).toFixed(2) + "deg");
    });
    c.addEventListener("pointerleave", function () { c.style.setProperty("--tx", "0deg"); c.style.setProperty("--ty", "0deg"); });
    if (!inStack) {
      c.addEventListener("click", function () { goTo(c.dataset.slug); });
      c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(c.dataset.slug); } });
      return;
    }
    c.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") { e.preventDefault(); next(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); next(-1); }
    });
  }
  function bindDeck() {
    var g = null;
    function tilt(x, y) {
      deck.style.setProperty("--dry", x.toFixed(1) + "deg");
      deck.style.setProperty("--drx", y.toFixed(1) + "deg");
    }
    deck.addEventListener("pointerdown", function (e) {
      g = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false, hist: [[e.clientX, performance.now()]] };
      try { deck.setPointerCapture(e.pointerId); } catch (err) {}
    });
    deck.addEventListener("pointermove", function (e) {
      if (!g || e.pointerId !== g.id) return;
      var dx = e.clientX - g.x, dy = e.clientY - g.y;
      if (!g.moved && Math.hypot(dx, dy) < 8) return;
      g.moved = true;
      deck.classList.add("is-tilting");
      tilt(Math.max(-55, Math.min(55, dx * 0.35)), Math.max(-45, Math.min(45, -dy * 0.35)));
      g.hist.push([e.clientX, performance.now()]);
      if (g.hist.length > 6) g.hist.shift();
    });
    function release(e) {
      if (!g || e.pointerId !== g.id) return;
      var h = g.hist[0], dx = e.clientX - g.x, vx = (e.clientX - h[0]) / Math.max(1, performance.now() - h[1]);
      var moved = g.moved;
      g = null;
      deck.classList.remove("is-tilting");
      tilt(0, 0); // spring back
      if (e.type === "pointercancel") return;
      if (!moved) next(1);                                          // tap
      else if (Math.abs(vx) > 0.7 && Math.abs(dx) > 50) next(vx < 0 ? -1 : 1); // quick flick
    }
    deck.addEventListener("pointerup", release);
    deck.addEventListener("pointercancel", release);
  }
  function next(dir) {
    var c = deck && deck.children[at];
    if (!c) return;
    c.style.animation = "none";
    c.style.setProperty("--out", dir);
    c.classList.add("is-out");
    at++;
    if (at < pulled.length) {
      deck.children[at].focus({ preventScroll: true });
      if (tier(pulled[at]) === "legendary") setTimeout(function () { celebrate(deck.children[at]); }, 120);
    }
    else setTimeout(showDone, reduceMotion ? 50 : 380);
  }
  // Confetti and star sparkles burst out of a legendary card.
  function celebrate(card) {
    if (!card) return;
    card.style.animation = "legendGlow 1.4s ease-out"; // inline: the stack clears card animations once they have played
    track("legendary " + card.dataset.slug);
    if (reduceMotion) return;
    var cv = document.createElement("canvas");
    cv.className = "pack-fx";
    dlg.appendChild(cv);
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    var ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
    var r = card.getBoundingClientRect(), ox = r.left + r.width / 2, oy = r.top + r.height / 2;
    var COLORS = ["#f43f5e", "#f59e0b", "#facc15", "#22c55e", "#06b6d4", "#6366f1", "#d946ef", "#ffffff"];
    var parts = [];
    for (var i = 0; i < 140; i++) {
      var ang = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9, star = i % 4 === 0;
      parts.push({
        x: ox + (Math.random() - .5) * r.width * .6, y: oy + (Math.random() - .5) * r.height * .6,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 4, rot: Math.random() * 6, vr: (Math.random() - .5) * .4,
        size: star ? 5 + Math.random() * 6 : 4 + Math.random() * 5, star: star, c: COLORS[i % COLORS.length], life: 0,
        max: 70 + Math.random() * 50
      });
    }
    function starPath(s) {
      ctx.beginPath();
      for (var k = 0; k < 8; k++) { var rr = k % 2 ? s * .35 : s, a = k * Math.PI / 4; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
      ctx.closePath();
    }
    (function frame() {
      ctx.clearRect(0, 0, W, H);
      var alive = 0;
      parts.forEach(function (p) {
        if (p.life++ > p.max) return;
        alive++;
        p.vy += .22; p.vx *= .985; p.vy *= .985; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        var fade = 1 - p.life / p.max;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = fade;
        if (p.star) {
          var tw = .6 + .4 * Math.sin(p.life * .5);
          ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12; starPath(p.size * tw); ctx.fill();
        } else {
          ctx.fillStyle = p.c; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2 * (0.4 + Math.abs(Math.sin(p.rot * 2))));
        }
        ctx.restore();
      });
      if (alive) requestAnimationFrame(frame); else cv.remove();
    })();
  }
  function showDone() {
    state = "done";
    cardsBox.classList.remove("is-in");
    cardsBox.innerHTML = "";
    var grid = done.querySelector(".pack-done__grid");
    grid.innerHTML = pulled.map(function (p) { return cardHTML(p, all.indexOf(p) + 1); }).join("");
    [].forEach.call(grid.children, function (c) { bindCard(c, false); });
    done.hidden = false;
    tip.hidden = true;
    track("finished");
  }
  function goTo(slug) {
    track("card " + slug);
    dlg.close();
    location.hash = "#work/" + slug;
  }

  /* ---------- Open / close ---------- */
  function reset() {
    state = "pack"; rx = 0; ry = 0; setRot(false);
    pack.classList.remove("is-ripped", "is-gone", "is-dragging");
    cut.style.width = "0";
    cardsBox.innerHTML = ""; cardsBox.classList.remove("is-in");
    done.hidden = true;
    tip.hidden = false;
    tip.textContent = "Drag the pack to turn it · slide along the top to tear it open";
  }
  function openPack() {
    reset();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    pack.focus({ preventScroll: true });
  }
  dlg.querySelector(".pack-dlg__close").addEventListener("click", function () { dlg.close(); });
  dlg.querySelector(".pack-shut").addEventListener("click", function () { dlg.close(); });
  dlg.querySelector(".pack-again").addEventListener("click", function () { reset(); pack.focus({ preventScroll: true }); track("opened again"); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
})();
