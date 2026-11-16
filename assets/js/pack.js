/* Booster pack minigame: a pack of five project cards.
   Drag the pack to turn it, slide along its top edge to tear it open, then flick through the cards. */
(function () {
  "use strict";
  var MEDIA = "assets/media/";
  var all = (window.PROJECTS || []).filter(function (p) { return !p.hidden && !p.confidential; }); // no cards for unreleased work
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
    "JavaScript": "javascript", "Clip Studio Paint": "clipstudio", "Adobe Animate": "animate", "Java": "java", "NetBeans": "netbeans",
    "Claude": "claude", "ChatGPT": "chatgpt", "Tripo": "tripo" };
  var AI_TAGS = { "Claude Code": "Claude", "Codex": "ChatGPT", "ChatGPT": "ChatGPT", "Tripo": "Tripo" };
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

  /* ---------- Collection (saved in this browser) ---------- */
  var SAVE = "packCollection";
  function loadColl() { try { return JSON.parse(localStorage.getItem(SAVE)) || {}; } catch (e) { return {}; } }
  var coll = loadColl(); // slug -> times pulled
  function has(slug) { return !!coll[slug]; }
  function owned() { return all.filter(function (p) { return coll[p.slug]; }).length; }
  function collect(p) {
    coll[p.slug] = (coll[p.slug] || 0) + 1;
    try { localStorage.setItem(SAVE, JSON.stringify(coll)); } catch (e) {}
    renderSlot();
  }

  function cardHTML(p, n, isNew) {
    var t = tier(p), info = TIERS[t];
    var tools = String(p.engine || "").split(/\s*·\s*/).filter(function (x) { return LOGOS[x]; });
    (p.tags || []).forEach(function (x) { var k = AI_TAGS[x]; if (k && tools.indexOf(k) < 0) tools.push(k); });
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
      (isNew ? '<span class="tcard__new">New</span><span class="tcard__spark" aria-hidden="true">' +
        [[-2.2, -1.6], [1.4, -2.4], [2.4, -.4], [-1, -2.8], [2.2, 1.2], [-2.6, .4]].map(function (v) {
          return '<i style="--sx:' + v[0] + "em;--sy:" + v[1] + 'em"></i>';
        }).join("") + "</span>" : "") +
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
        '<div class="pack" tabindex="0" aria-label="Amirul&#39;s Work booster pack. Press Enter to tear it open.">' +
          '<div class="pack__seal is-top pack__top">' + '<div class="pack__sealface"><span class="pack__cut"></span><span class="pack__hint">Slide to open →</span></div>' + '<div class="pack__sealface is-rear"></div>' +
            '<span class="pack__swipe" aria-hidden="true"><i class="pack__swipe-trail"></i><i class="pack__swipe-hand"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-.5V4.5a1.5 1.5 0 0 1 3 0V10m0-1a1.5 1.5 0 0 1 3 0v4.5c0 4-2.5 7-6.5 7h-.5c-2.6 0-4.2-1.3-5.6-3.4L3.6 14a1.5 1.5 0 0 1 2.5-1.6L9 15.5"/></svg></i></span>' + "</div>" +
          '<div class="pack__shoulder is-top is-front"></div><div class="pack__shoulder is-top is-rear"></div>' +
          '<div class="pack__face pack__front">' +
            '<div class="pack__body">' +
              '<span class="pack__series">Series 1 · ' + all.length + " cards to collect</span>" +
              '<span class="pack__logo"><b>Amirul&#39;s</b> Work</span>' +
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
  // Step aside while the footer is on screen, so the button doesn't cover the combo hint.
  var foot = document.querySelector("footer");
  if (foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { fabWrap.classList.toggle("is-tucked", es[0].isIntersecting); }).observe(foot);
  }

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

  // The browser's own drag-and-drop (a ghost image of selected text) would steal the drag from the pack.
  function noNativeDrag(el) {
    el.addEventListener("dragstart", function (e) { e.preventDefault(); });
    el.addEventListener("mousedown", function (e) { e.preventDefault(); }); // no text selection to drag either
  }
  noNativeDrag(pack);
  function clearSelection() { try { window.getSelection().removeAllRanges(); } catch (err) {} }
  pack.addEventListener("pointerdown", function (e) {
    if (state !== "pack") return;
    clearSelection();
    pack.classList.remove("is-entering");
    var r = pack.getBoundingClientRect();
    try { pack.setPointerCapture(e.pointerId); } catch (err) {}
    // Top third of the front: tear. Starting anywhere there and dragging sideways about half the width is enough.
    if (facingFront() && e.clientY < r.top + r.height * 0.33) {
      tear = { x: e.clientX, width: r.width, id: e.pointerId, max: 0 };
      top.classList.add("is-tearing");
      return;
    }
    drag = { x: e.clientX, y: e.clientY, rx: rx, ry: ry, id: e.pointerId };
    pack.classList.add("is-dragging");
  });
  pack.addEventListener("pointermove", function (e) {
    if (tear && e.pointerId === tear.id) {
      var p = Math.min(1, Math.abs(e.clientX - tear.x) / (tear.width * 0.5));
      tear.max = Math.max(tear.max, p); // the cut only grows
      cut.style.width = tear.max * 100 + "%";
      if (tear.max >= 1) { tear = null; rip(); }
      return;
    }
    if (!drag || e.pointerId !== drag.id) return;
    ry = drag.ry + (e.clientX - drag.x) * 0.6;
    rx = Math.max(-28, Math.min(28, drag.rx - (e.clientY - drag.y) * 0.3));
    setRot(false);
  });
  function endDrag(e) {
    if (tear && e.pointerId === tear.id) {
      // let go most of the way across: count it
      if (tear.max > 0.7 && e.type === "pointerup") { tear = null; cut.style.width = "100%"; rip(); return; }
      tear = null;
      top.classList.remove("is-tearing");
      return;
    }
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
  var pulled = [], at = 0, deck = null, fresh = [];
  function dealCards() {
    state = "cards";
    pulled = rollPack();
    at = 0;
    fresh = pulled.map(function (p) { return !has(p.slug); });
    cardsBox.innerHTML = '<div class="pack-deck">' + pulled.map(function (p, i) { return cardHTML(p, all.indexOf(p) + 1, fresh[i]); }).join("") + "</div>" +
      '<div class="pack-progress" aria-live="polite">Collection&nbsp;<b>' + owned() + "</b>/" + all.length + '<span class="pack-progress__plus">+1</span></div>';
    deck = cardsBox.firstChild;
    var cards = [].slice.call(deck.children);
    cards.forEach(function (c, i) {
      c.style.zIndex = String(pulled.length - i);
      c.style.setProperty("--i", i);
      bindCard(c, true);
    });
    bindDeck();
    noNativeDrag(deck);
    pack.classList.add("is-gone");
    cardsBox.classList.add("is-in");
    cards[0].focus({ preventScroll: true });
    reveal(0, reduceMotion ? 0 : 620); // after the cards have risen out of the pack
  }
  // The card on top has been seen: it joins the collection, and a new one gets its NEW stamp and a tick on the counter.
  function reveal(i, delay) {
    setTimeout(function () {
      var c = deck && deck.children[i];
      if (!c || c.revealed) return; // idempotent: a quick tap may reveal it before the timer does
      c.revealed = true;
      c.classList.add("is-top");
      collect(pulled[i]);
      if (fresh[i]) {
        var prog = cardsBox.querySelector(".pack-progress");
        if (prog) {
          prog.querySelector("b").textContent = owned();
          prog.classList.remove("is-bump"); void prog.offsetWidth; prog.classList.add("is-bump");
        }
      }
    }, delay);
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
      // light slides across the foil as the deck turns
      [].forEach.call(deck.children, function (c) {
        c.style.setProperty("--mx", (50 + x * 1.1).toFixed(1) + "%");
        c.style.setProperty("--my", (50 - y * 1.1).toFixed(1) + "%");
      });
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
    if (!c.revealed) { c.revealed = true; collect(pulled[at]); } // tapped away before its reveal fired
    c.style.animation = "none";
    c.style.setProperty("--out", dir);
    c.classList.add("is-out");
    at++;
    if (at < pulled.length) {
      deck.children[at].focus({ preventScroll: true });
      reveal(at, 0);
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
    grid.classList.add("is-landing");
    setTimeout(function () { grid.classList.remove("is-landing"); }, reduceMotion ? 0 : 800); // last card lands at ~740ms
    done.hidden = false;
    tip.hidden = true;
    track("finished");
  }
  function goTo(slug) {
    track("card " + slug);
    closeDlg(function () { location.hash = "#work/" + slug; });
  }

  /* ---------- Card slot on the project page ---------- */
  var slotSlug = null;
  function renderSlot() {
    var box = document.getElementById("viewerCard");
    var p = slotSlug && all.filter(function (q) { return q.slug === slotSlug; })[0];
    if (!box) return;
    if (!p) { box.hidden = true; return; }
    var t = tier(p), info = TIERS[t], n = String(all.indexOf(p) + 1).padStart(2, "0"), total = String(all.length).padStart(2, "0");
    var count = '<span class="mcard-count">Collection ' + owned() + "/" + all.length + "</span>";
    box.hidden = false;
    box.classList.toggle("is-missing", !has(p.slug));
    if (has(p.slug)) {
      var times = coll[p.slug];
      box.innerHTML = '<div class="mcard r-' + t + '" aria-hidden="true"><img src="' + MEDIA + esc(p.cover) + '" alt="" loading="lazy"><span class="mcard__mark">' + info.mark + "</span></div>" +
        '<div class="mcard-info"><b>Card collected</b><span>' + info.label + " · No. " + n + "/" + total + (times > 1 ? " · pulled " + times + "×" : "") + "</span>" + count + "</div>";
    } else {
      box.innerHTML = '<div class="mcard is-empty" aria-hidden="true"><span>?</span></div>' +
        '<div class="mcard-info"><b>Missing card</b><span>No. ' + n + "/" + total + " · pull it from a booster pack</span>" + count +
        '<button type="button" class="mcard-open">Open a pack →</button></div>';
      box.querySelector(".mcard-open").addEventListener("click", function () { openPack(); track("opened from project page"); });
    }
  }
  document.addEventListener("project:open", function (e) { slotSlug = e.detail.slug; renderSlot(); });
  // the project may have opened (from a #work/ link) before this script loaded
  var m0 = location.hash.match(/^#work\/([\w-]+)/);
  if (m0) { slotSlug = m0[1]; renderSlot(); }

  /* ---------- Open / close ---------- */
  function reset() {
    clearSelection();
    // snap everything back with transitions off, so the old seal doesn't fly back onto the new pack
    pack.classList.add("no-anim");
    state = "pack"; rx = 0; ry = 0; setRot(false);
    pack.classList.remove("is-ripped", "is-gone", "is-dragging", "is-entering");
    top.classList.remove("is-tearing");
    cut.style.width = "0";
    cardsBox.innerHTML = ""; cardsBox.classList.remove("is-in");
    done.hidden = true;
    tip.hidden = false;
    tip.textContent = "Drag the pack to turn it · slide along the top to tear it open";
    void pack.offsetWidth;
    pack.classList.remove("no-anim");
  }
  // from: [x, y] offset (px) the pack starts at, relative to its resting place
  function enter(from, small) {
    pack.style.setProperty("--fx", from[0] + "px");
    pack.style.setProperty("--fy", from[1] + "px");
    pack.style.setProperty("--fs", small ? ".12" : "1");
    pack.classList.remove("is-entering");
    void pack.offsetWidth;
    pack.classList.add("is-entering");
  }
  // Once the pack has arrived, drop the entrance so pausing and resuming the float (dragging) can't replay it.
  pack.addEventListener("animationend", function (e) { if (e.animationName === "packEnter") pack.classList.remove("is-entering"); });
  function openPack() {
    reset();
    dlg.classList.remove("is-closing");
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    pack.focus({ preventScroll: true });
    // the pack grows out of the corner button
    var b = fabWrap.querySelector(".pack-fab__mini").getBoundingClientRect(), r = pack.getBoundingClientRect();
    if (b.width) enter([b.left + b.width / 2 - (r.left + r.width / 2), b.top + b.height / 2 - (r.top + r.height / 2)], true);
    else enter([0, innerHeight * 0.6], false);
  }
  function closeDlg(after) {
    if (!dlg.open || dlg.classList.contains("is-closing")) return;
    dlg.classList.add("is-closing");
    setTimeout(function () {
      dlg.close();
      dlg.classList.remove("is-closing");
      if (after) after();
    }, reduceMotion ? 0 : 260);
  }
  dlg.addEventListener("cancel", function (e) { e.preventDefault(); closeDlg(); }); // Esc
  dlg.querySelector(".pack-dlg__close").addEventListener("click", function () { closeDlg(); });
  dlg.querySelector(".pack-shut").addEventListener("click", function () { closeDlg(); });
  dlg.querySelector(".pack-again").addEventListener("click", function () {
    reset();
    enter([0, innerHeight * 0.6], false); // a fresh pack slides up from the bottom
    pack.focus({ preventScroll: true });
    track("opened again");
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDlg(); });
})();
