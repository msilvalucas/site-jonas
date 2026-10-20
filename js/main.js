/* =========================================================
   Jonas Vidal Jr. — Atelier sob medida
   Interações + animações (GSAP / ScrollTrigger / ScrollToPlugin)
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const visible = el => el.getClientRects().length > 0;

  const header = $('[data-header]');
  const waFloat = $('[data-wa-float]');
  let reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let menuOpen = false;
  let buildDark = false;
  let headerDark = null;

  /* ---------- Cor do header conforme a seção ---------- */
  function setHeader(dark) {
    if (dark === headerDark) return;
    headerDark = dark;
    header.classList.toggle('is-light-bg', !dark);
  }
  function updateHeader() {
    const y = 36;
    let dark = menuOpen || buildDark;
    if (!dark) {
      $$('[data-theme="dark"]').forEach(el => {
        if (!visible(el)) return;
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) dark = true;
      });
    }
    setHeader(dark);
    const scrolled = window.scrollY > 40 || document.body.style.position === 'fixed';
    if (scrolled !== header.classList.contains('is-scrolled')) header.classList.toggle('is-scrolled', scrolled);
    if (waFloat) waFloat.classList.toggle('is-hidden', window.scrollY < window.innerHeight * 0.6);
  }

  /* ---------- Menu mobile ---------- */
  const menuBtn = $('[data-menu-toggle]');
  const menu = $('#menu-mobile');
  const menuLinks = $$('a', menu);
  const page = $('#conteudo');
  let lenis = null;
  let lockedY = 0;

  // Trava o fundo (funciona também no iOS, onde overflow:hidden no body não basta)
  function lockScroll(lock) {
    const bs = document.body.style;
    if (lock) {
      lockedY = window.scrollY;
      bs.position = 'fixed'; bs.top = (-lockedY) + 'px'; bs.left = '0'; bs.right = '0';
    } else {
      bs.position = bs.top = bs.left = bs.right = '';
      window.scrollTo(0, lockedY);
      // com o body fixo o Lenis mediu a página com altura zero: remede antes de rolar
      if (lenis) { lenis.resize(); lenis.scrollTo(lockedY, { immediate: true, force: true }); }
    }
  }
  function setMenu(open) {
    if (open === menuOpen) return;
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fechar' : 'Menu';
    if (page) page.inert = open;
    document.documentElement.classList.toggle('menu-open', open);
    lockScroll(open);
    headerDark = null;
    updateHeader();
    if (open) {
      menu.hidden = false;
      if (window.gsap && !reduce) {
        gsap.killTweensOf([menu, menuLinks]);
        gsap.fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
        gsap.fromTo(menuLinks, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.05 });
      }
      menuLinks[0].focus({ preventScroll: true });
    } else {
      if (window.gsap) gsap.killTweensOf([menu, menuLinks]);
      menu.hidden = true;
    }
  }
  menuBtn.addEventListener('click', () => setMenu(!menuOpen));
  window.addEventListener('keydown', e => {
    if (!menuOpen) return;
    if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); return; }
    if (e.key === 'Tab') { // mantém o foco dentro do menu
      const f = [menuBtn].concat(menuLinks);
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  matchMedia('(max-width: 899px)').addEventListener('change', () => { if (menuOpen) setMenu(false); });

  /* ---------- Rolagem suave ---------- */
  const expoInOut = t => (t === 0 || t === 1) ? t : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  function scrollToTarget(target) {
    if (lenis) {
      const el = typeof target === 'number' ? null : $(target);
      const y = el ? el.getBoundingClientRect().top + window.scrollY : (+target || 0);
      lenis.scrollTo(y, { duration: 1.4, easing: expoInOut, force: true });
      return;
    }
    if (window.gsap && window.ScrollToPlugin) {
      gsap.to(window, { duration: reduce ? 0 : 1.4, ease: 'expo.inOut', scrollTo: { y: target, autoKill: true } });
      return;
    }
    const y = typeof target === 'number' ? target : ($(target) ? $(target).getBoundingClientRect().top + window.scrollY : 0);
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    e.preventDefault();
    if (menuOpen) setMenu(false);
    // espera o desbloqueio do scroll antes de animar
    requestAnimationFrame(() => scrollToTarget(href === '#topo' ? 0 : href));
    history.replaceState(null, '', href);
  }));
  const toTop = $('[data-to-top]');
  if (toTop) toTop.addEventListener('click', () => scrollToTarget(0));

  /* ---------- Filtro da galeria ---------- */
  const filterBtns = $$('[data-filter]');
  const items = $$('[data-cat]');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach(it => it.classList.toggle('is-dim', f !== 'Todas' && it.getAttribute('data-cat') !== f));
  }));

  /* ---------- Ano do rodapé ---------- */
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sem GSAP: só o básico ---------- */
  if (!window.gsap || !window.ScrollTrigger) {
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
    return;
  }

  const ST = window.ScrollTrigger;
  gsap.registerPlugin(ST, window.ScrollToPlugin);
  // Não recalcula tudo quando a barra de endereço do celular aparece/some
  ST.config({ ignoreMobileResize: true });

  /* ---------- Lenis: rolagem suave sincronizada com o GSAP ---------- */
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Hero (entrada, roda uma vez) ---------- */
  let heroSeamPlayed = reduce;
  if (!reduce) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.4 } });
    gsap.set('[data-hero-img]', { clipPath: 'inset(0% 0% 100% 0%)' });
    tl.from('[data-hero-line]', { yPercent: 110, stagger: 0.12 }, 0.1)
      .fromTo('[data-hero-img]', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'power4.inOut' }, 0.15)
      .from('[data-hero-img-inner]', { scale: 1.18, duration: 2.4, ease: 'power3.out' }, 0.15)
      .from('[data-hero-fade]', { opacity: 0, y: 14, stagger: 0.1, duration: 1 }, 0.9);
  }

  /* ---------- Costuras (linhas tracejadas animadas) ---------- */
  function setupSeams(r) {
    const map = {};
    const list = $$('svg[data-seam]').filter(visible).map(svg => {
      const host = svg.parentNode;
      const id = svg.getAttribute('data-seam');
      const path = $('[data-seam-path]', svg);
      const mask = $('[data-seam-mask]', svg);
      const dot = $('[data-seam-dot="' + id + '"]', host);
      const sm = { p: 0, len: 0 };
      sm.apply = p => {
        sm.p = p;
        if (!sm.len) return;
        mask.style.strokeDashoffset = sm.len * (1 - p);
        if (dot) {
          const pt = path.getPointAtLength(sm.len * p);
          dot.style.transform = 'translate(' + pt.x + 'px,' + pt.y + 'px)';
          dot.style.opacity = p > 0.002 && p < 0.998 ? '1' : '0';
        }
      };
      sm.build = () => {
        const w = host.clientWidth, h = host.clientHeight;
        if (!w || !h) return;
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        const d = 'M' + svg.getAttribute('data-d').replace(/(-?[\d.]+),(-?[\d.]+)/g,
          (m, x, y) => (x * w / 100).toFixed(1) + ',' + (y * h / 100).toFixed(1));
        path.setAttribute('d', d);
        mask.setAttribute('d', d);
        sm.len = mask.getTotalLength();
        mask.style.strokeDasharray = sm.len + ' ' + sm.len;
        sm.apply(sm.p);
      };
      sm.build();
      map[id] = sm;
      return [svg, sm];
    });

    const rebuild = () => list.forEach(([, sm]) => sm.build());
    ST.addEventListener('refresh', rebuild);

    list.forEach(([svg, sm]) => {
      const mode = svg.getAttribute('data-mode');
      if (mode === 'timeline') return;
      if (r) { sm.apply(1); return; }
      const st = { p: 0 };
      if (mode === 'load') {
        if (heroSeamPlayed) { sm.apply(1); return; }
        heroSeamPlayed = true;
        gsap.to(st, { p: 1, duration: 2.8, delay: 0.6, ease: 'power2.inOut', onUpdate: () => sm.apply(st.p) });
      } else {
        gsap.to(st, {
          p: 1, ease: 'none', onUpdate: () => sm.apply(st.p),
          scrollTrigger: { trigger: svg.parentNode, start: 'top 75%', end: 'bottom 55%', scrub: 1 }
        });
      }
    });

    return { get: id => map[id], off: () => ST.removeEventListener('refresh', rebuild) };
  }

  /* ---------- Sequência "Da imaginação à criação" (desktop) ---------- */
  function buildTimeline(build, r, seams) {
    const q = s => $$(s, build);
    const layers = q('[data-layer]'), steps = q('[data-step]'), ticks = q('[data-tick]'), edges = q('[data-edge]');
    const frame = $('[data-frame]', build), zoom = $('[data-zoom]', build);
    const marks = $('[data-marks]', build), inner = $('[data-layer-inner]', build);
    const shown = 'inset(0% 0% 0% 0%)', hidden = 'inset(100% 0% 0% 0%)';
    let lastTick = 0;

    gsap.set(layers, { clipPath: r ? shown : hidden, opacity: r ? 0 : 1 });
    if (r) gsap.set(layers[0], { opacity: 1 });
    gsap.set(steps.slice(1), { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: build, start: 'top top', end: '+=400%', pin: true, scrub: 1, anticipatePin: 1,
        onUpdate: self => {
          const i = Math.min(3, Math.floor(self.progress * 4.4));
          const bd = self.progress > 0.8 && self.isActive;
          if (bd !== buildDark) { buildDark = bd; updateHeader(); }
          if (i !== lastTick) { lastTick = i; ticks.forEach((t, k) => t.classList.toggle('is-on', k === i)); }
        },
        onLeave: () => { buildDark = false; updateHeader(); },
        onLeaveBack: () => { buildDark = false; updateHeader(); }
      }
    });

    const reveal = (i, at) => {
      if (r) { if (i) tl.to(layers[i], { opacity: 1, duration: 0.5 }, at); return; }
      tl.to(layers[i], { clipPath: shown, duration: 0.8 }, at)
        .fromTo(edges[i], { top: '100%', opacity: 1 }, { top: '0%', duration: 0.8, immediateRender: false }, at)
        .to(edges[i], { opacity: 0, duration: 0.08 }, at + 0.8);
    };
    const swap = (a, b, at) => tl
      .to(steps[a], { opacity: 0, y: r ? 0 : -24, duration: 0.3 }, at)
      .fromTo(steps[b], { opacity: 0, y: r ? 0 : 24 }, { opacity: 1, y: 0, duration: 0.35 }, at + 0.2);

    // 01 A ideia
    reveal(0, 0);
    if (!r) tl.from(inner, { scale: 1.08, duration: 0.9 }, 0);
    tl.from(marks, { opacity: 0, duration: 0.4 }, r ? 0 : 0.45);
    const fs = seams.get('frame');
    if (fs) {
      const st = { p: r ? 1 : 0 };
      fs.apply(st.p);
      if (!r) tl.to(st, { p: 1, duration: 0.7, ease: 'none', onUpdate: () => fs.apply(st.p) }, 0.3);
    }
    // 02 A forma
    swap(0, 1, 1); reveal(1, 1);
    // 03 Os detalhes
    swap(1, 2, 2); reveal(2, 2);
    if (!r) tl.fromTo(zoom, { scale: 1.12 }, { scale: 1.75, duration: 1, ease: 'power1.inOut' }, 2);
    // 04 A criação
    swap(2, 3, 3); reveal(3, 3);
    tl.to(build, { backgroundColor: '#101010', color: '#F6F4EF', duration: 0.7, ease: 'power1.inOut' }, 3);
    if (!r) tl.to(frame, { scale: 1.06, duration: 0.9 }, 3.1);
    tl.to({}, { duration: 0.5 });
    tl.fromTo($('[data-progress]', build), { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: tl.duration() }, 0);
  }

  /* ---------- Animações por breakpoint ---------- */
  const mm = gsap.matchMedia();
  mm.add({
    desktop: '(min-width: 900px)',
    mobile: '(max-width: 899px)',
    reduceMotion: '(prefers-reduced-motion: reduce)'
  }, ctx => {
    const { desktop, reduceMotion: r } = ctx.conditions;
    reduce = r;

    if (!r) {
      gsap.to('[data-hero-img-inner]', {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.6 }
      });

      $$('[data-lines]').filter(visible).forEach(el => gsap.from($$('[data-line]', el), {
        yPercent: 110, stagger: 0.1, duration: 1.3, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }));

      $$('[data-reveal]').filter(visible).forEach(el => {
        gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
        // parallax só no desktop: no celular pesa e não acrescenta muito
        const p = desktop && $('[data-parallax]', el);
        if (p) gsap.fromTo(p, { yPercent: -4 }, {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
        });
      });

      $$('[data-fade]').filter(visible).forEach(el => gsap.from(el, {
        opacity: 0, y: 18, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%' }
      }));

      $$('[data-zoom-m]').filter(visible).forEach(el => gsap.fromTo(el, { scale: 1.15 }, {
        scale: 1.7, ease: 'none',
        scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      }));
    }

    const seams = setupSeams(r);
    ST.create({ start: 0, end: 'max', onUpdate: updateHeader, onRefresh: updateHeader });
    if (desktop) buildTimeline($('[data-build]'), r, seams);

    return () => { seams.off(); buildDark = false; };
  });

  // Recalcula após imagens carregarem (alturas finais)
  window.addEventListener('load', () => ST.refresh());
  headerDark = null;
  updateHeader();
})();
