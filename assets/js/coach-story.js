/* 코치 라인업 · 서사 섹션 (index.html 전용)
   - 라인업: 코치들이 한 줄로 서 있고, 좌우로 넘기면 가운데 코치가 바뀝니다.
   - 솔로: 가운데 코치를 누르면 나머지는 사라지고 그 코치의 이야기가 펼쳐집니다.
   - 주소 뒤에 ?draft=1 을 붙이면 아직 비어 있는 이야기 칸(점선)이 보입니다. */
(function () {
  'use strict';
  var root = document.querySelector('[data-cs]');
  if (!root) return;

  var stage = root.querySelector('.cs-stage');
  var line = root.querySelector('.cs-line');
  var people = [].slice.call(root.querySelectorAll('.cs-person'));
  var panels = [].slice.call(root.querySelectorAll('.cs-panel'));
  var tabs = [].slice.call(root.querySelectorAll('.cs-tab'));
  var rail = root.querySelector('.cs-rail');
  var ghost = root.querySelector('[data-cs-ghost]');
  var countNow = root.querySelector('[data-cs-now]');
  var prevBtn = root.querySelector('[data-cs-prev]');
  var nextBtn = root.querySelector('[data-cs-next]');
  var n = people.length;
  if (!stage || !line || !n) return;

  if (/[?&]draft=1(&|$)/.test(window.location.search)) root.classList.add('is-draft');

  var active = 0;
  people.forEach(function (el, i) { if (el.hasAttribute('data-cs-start')) active = i; });
  var solo = false;

  // 가운데에서 떨어진 거리(0,1,2…)에 따른 위치·크기·투명도·흐림. 위치는 사진 폭 대비 비율.
  var X = [0, 0.56, 0.9, 1.18, 1.4, 1.58, 1.72, 1.84];
  var S = [1, 0.74, 0.62, 0.55, 0.5, 0.47, 0.45, 0.43];
  var O = [1, 0.66, 0.36, 0, 0, 0, 0, 0];
  var B = [0, 1.1, 2.2, 3.2, 4, 4, 4, 4];

  function table(t, a) {
    var max = t.length - 1;
    if (a >= max) return t[max];
    var i = Math.floor(a), f = a - i;
    return t[i] + (t[i + 1] - t[i]) * f;
  }
  function pad2(v) { return v < 10 ? '0' + v : String(v); }
  function personWidth() { return people[0].offsetWidth || 400; }
  function stepPx() { return personWidth() * X[1]; }

  // 라인업은 둥글게 이어집니다: 1번 코치 왼쪽에는 마지막 코치가 섭니다.
  function wrap(d) {
    d = ((d % n) + n) % n;
    return d > n / 2 ? d - n : d;
  }
  function mod(i) { return ((i % n) + n) % n; }

  var lastPos = active;
  var prevD = [];
  function layout(pos) {
    lastPos = pos;
    var pw = personWidth();
    people.forEach(function (el, i) {
      var d = wrap(i - pos), a = Math.abs(d), sign = d < 0 ? -1 : 1;
      // 반대편 끝으로 넘어가는 코치는 무대를 가로질러 미끄러지지 않고 자리만 바꿉니다
      el.classList.toggle('is-jump', prevD[i] !== undefined && Math.abs(d - prevD[i]) > n / 2);
      prevD[i] = d;
      var x = sign * table(X, a) * pw;
      var s = table(S, a);
      var o = table(O, a);
      var b = table(B, a);
      if (solo) {
        x *= 1.3;
        o = Math.max(0, 1 - a * 2.4);
        if (a < 0.5) s = s * (1.06 - a * 0.12);
      }
      el.style.setProperty('--x', x.toFixed(1) + 'px');
      el.style.setProperty('--s', s.toFixed(3));
      el.style.setProperty('--o', o.toFixed(3));
      el.style.setProperty('--b', b.toFixed(2) + 'px');
      el.style.zIndex = String(100 - Math.round(a * 10));
    });
  }

  function setActive(i, opts) {
    i = mod(i);
    var changed = i !== active;
    active = i;
    people.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
    panels.forEach(function (el, k) {
      var on = k === i;
      el.classList.toggle('is-active', on);
      if (on) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
    });
    tabs.forEach(function (el, k) {
      var on = k === i;
      el.setAttribute('aria-selected', on ? 'true' : 'false');
      el.setAttribute('tabindex', on ? '0' : '-1');
    });
    if (ghost) ghost.textContent = pad2(i + 1);
    if (countNow) countNow.textContent = String(i + 1);
    layout(i);
    if (rail && tabs[i] && (changed || (opts && opts.init))) {
      var t = tabs[i];
      var target = t.offsetLeft - (rail.clientWidth - t.offsetWidth) / 2;
      if (rail.scrollTo) rail.scrollTo({ left: target, behavior: opts && opts.init ? 'auto' : 'smooth' });
      else rail.scrollLeft = target;
    }
    if (opts && opts.focusTab && tabs[i]) tabs[i].focus({ preventScroll: true });
  }

  function setSolo(on) {
    if (solo === on) return;
    solo = on;
    stage.classList.toggle('is-solo', on);
    layout(active);
    if (on) {
      // 좁은 화면에서는 이야기가 사진 아래로 펼쳐지므로 무대 윗부분을 화면에 맞춰 줍니다
      var r = stage.getBoundingClientRect();
      var stacked = window.matchMedia('(max-width: 900px)').matches;
      if (stacked && (r.top < 70 || r.top > window.innerHeight * 0.3)) {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        stage.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  }

  /* ----- 라인업에서 누른 위치로 코치 고르기 (사진 네모가 서로 겹치므로 x 좌표로 판단) ----- */
  function pick(clientX) {
    var rect = line.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var pw = personWidth();
    var best = -1, bestScore = Infinity;
    people.forEach(function (el, i) {
      var d = wrap(i - active), a = Math.abs(d);
      if (solo && a > 0) return;
      if (table(O, a) <= 0.05) return;
      var center = cx + (d < 0 ? -1 : 1) * table(X, a) * pw;
      var half = pw * table(S, a) * 0.3;
      var dist = Math.abs(clientX - center);
      if (dist <= half && dist / half < bestScore) { bestScore = dist / half; best = i; }
    });
    return best;
  }

  /* ----- 끌어서 넘기기 ----- */
  var drag = null;
  line.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, t: Date.now(), lastX: e.clientX, lastT: Date.now(), v: 0 };
  });
  line.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dx = e.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < 8) return;
      drag.moved = true;
      line.classList.add('is-dragging');
      try { line.setPointerCapture(e.pointerId); } catch (err) {}
    }
    var now = Date.now();
    if (now > drag.lastT) { drag.v = (e.clientX - drag.lastX) / (now - drag.lastT); drag.lastX = e.clientX; drag.lastT = now; }
    layout(active - dx / stepPx());
  });
  function endDrag(e, cancelled) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    var d = drag; drag = null;
    line.classList.remove('is-dragging');
    if (d.moved) {
      var target = lastPos;
      if (!cancelled && Math.abs(d.v) > 0.35) target += d.v < 0 ? 0.4 : -0.4;   // 빠르게 튕기면 한 칸 더
      setActive(Math.round(target));
      return;
    }
    if (cancelled) { layout(active); return; }
    var i = pick(e.clientX);
    if (i < 0) return;
    if (i === active) setSolo(true); else setActive(i);
  }
  line.addEventListener('pointerup', function (e) { endDrag(e, false); });
  line.addEventListener('pointercancel', function (e) { endDrag(e, true); });
  line.addEventListener('dragstart', function (e) { e.preventDefault(); });

  /* ----- 버튼·탭·키보드 ----- */
  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(active - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(active + 1); });

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { setActive(i); });
    tab.addEventListener('keydown', function (e) {
      var to = -1;
      if (e.key === 'ArrowRight') to = mod(active + 1);
      else if (e.key === 'ArrowLeft') to = mod(active - 1);
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to < 0) return;
      e.preventDefault();
      setActive(to, { focusTab: true });
    });
  });

  root.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-cs-open],[data-cs-close]') : null;
    if (!t || !root.contains(t)) return;
    setSolo(t.hasAttribute('data-cs-open'));
  });
  root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && solo) setSolo(false); });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { layout(active); }, 80);
  });

  // 처음 그릴 때는 움직임 없이 제자리에
  line.classList.add('is-dragging');
  root.classList.add('is-ready');
  setActive(active, { init: true });
  requestAnimationFrame(function () { requestAnimationFrame(function () { line.classList.remove('is-dragging'); }); });
})();
