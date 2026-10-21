/* =========================================================
   Jonas Vidal Jr. — Atelier
   Interações + animações (GSAP / ScrollTrigger / Lenis)
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const visible = el => el.getClientRects().length > 0;

  const WA = '5554999182121';
  const wa = msg => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  const IMG = 'assets/img/';

  /* ---------- Projetos (formato previsto para o futuro CMS) ---------- */
  const CREDIT = 'Criação e confecção: Jonas Vidal Jr.';
  const PROJECTS = {
    'gala-verde': {
      title: 'Gala verde com cauda', category: 'classicos', num: '01',
      description: 'Vestido de gala verde com corpete bordado e cauda longa — do croqui à peça finalizada.',
      techniques: ['Modelagem', 'Corseteria', 'Bordado'],
      photos: [['verde-cauda-2000.webp', 'Peça finalizada'], ['verde-costas-2000.webp', 'Detalhe das costas'], ['verde-janela-2000.webp', 'Peça junto à janela'], ['esboco-1400.webp', 'Croqui']],
      authorship: 'autoral', credits: [CREDIT]
    },
    'rosa-escultural': {
      title: 'Traje de festa rosa', category: 'classicos', num: '02',
      description: 'Traje de festa rosa com chapéu escultural e luvas longas.',
      techniques: ['Modelagem', 'Moda festa', 'Adereços'],
      photos: [['rosa-meio-corpo-2000.webp', 'Meio corpo'], ['rosa-corpo-inteiro-2000.webp', 'Corpo inteiro'], ['rosa-retrato-2000.webp', 'Retrato']],
      authorship: 'autoral', credits: [CREDIT]
    },
    'chapeu-escultural': {
      title: 'Chapéu escultural', category: 'figurinos', num: '01',
      description: 'Adereço de cabeça escultural em rosa, criado para compor o traje de festa com luvas longas.',
      techniques: ['Adereços', 'Estrutura'],
      photos: [['rosa-retrato-2000.webp', 'Adereço'], ['rosa-corpo-inteiro-2000.webp', 'Composição completa']],
      authorship: 'autoral', credits: [CREDIT]
    },
    'traje-gaucho': {
      title: 'Traje gaúcho', category: 'figurinos', num: '02',
      description: 'Traje temático inspirado na indumentária gaúcha, com lenço vermelho e camisa de babados.',
      techniques: ['Modelagem', 'Aplicações'],
      photos: [['gaucha-cavalo.webp', 'Traje em cena'], ['gaucha-manequim.webp', 'Peça no manequim']],
      authorship: 'autoral', credits: [CREDIT]
    },
    'gala-flor-de-lis': {
      title: 'Gala verde flor-de-lis', category: 'figurinos', num: '03',
      description: 'Vestido verde e branco com flor-de-lis e folhagens bordadas na saia.',
      techniques: ['Bordado', 'Aplicações', 'Modelagem'],
      photos: [['gala-verde-manequim.webp', 'Peça no manequim'], ['gala-verde-detalhe.webp', 'Detalhe do bordado']],
      authorship: 'autoral', credits: [CREDIT]
    },
    'look-rosa': {
      title: 'Look rosa', category: 'figurinos', num: '04',
      description: 'Look rosa com babados, luvas longas e chapéu.',
      techniques: ['Modelagem'],
      photos: [['look-rosa.webp', 'Look completo']],
      authorship: 'autoral', credits: [CREDIT]
    }
  };

  const header = $('[data-header]');
  const page = $('#conteudo');
  let reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis = null;

  /* ---------- Trava de scroll (funciona também no iOS) ---------- */
  let lockedY = 0, locks = 0;
  function lockScroll(lock) {
    const bs = document.body.style;
    if (lock) {
      if (locks++) return;
      lockedY = window.scrollY;
      bs.position = 'fixed'; bs.top = (-lockedY) + 'px'; bs.left = '0'; bs.right = '0';
      if (lenis) lenis.stop();
    } else {
      if (!locks || --locks) return;
      bs.position = bs.top = bs.left = bs.right = '';
      window.scrollTo(0, lockedY);
      // com o body fixo o Lenis mediu a página com altura zero: remede antes de rolar
      if (lenis) { lenis.start(); lenis.resize(); lenis.scrollTo(lockedY, { immediate: true, force: true }); }
    }
  }
  function trapTab(e, items) {
    const i = items.indexOf(document.activeElement);
    e.preventDefault();
    items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
  }

  /* ---------- Menu mobile ---------- */
  const menuBtn = $('[data-menu-toggle]');
  const menu = $('#menu');
  const menuLinks = $$('a', menu);
  let menuOpen = false;

  function setMenu(open) {
    if (open === menuOpen) return;
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'FECHAR' : 'MENU';
    if (page) page.inert = open;
    document.documentElement.classList.toggle('menu-open', open);
    lockScroll(open);
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
  matchMedia('(min-width: 1024px)').addEventListener('change', () => { if (menuOpen) setMenu(false); });

  /* ---------- Página do projeto ---------- */
  const dlg = $('[data-project-dialog]');
  const d = s => $('[data-p-' + s + ']', dlg);
  let active = null, photoIdx = 0, opener = null;

  function renderPhoto() {
    const [file, name] = active.photos[photoIdx];
    const img = d('img');
    img.src = IMG + file;
    img.alt = active.title + ' — ' + name;
    d('photo-name').textContent = name.toUpperCase();
    d('count').textContent = (photoIdx + 1) + ' / ' + active.photos.length;
    const single = active.photos.length < 2;
    d('prev').disabled = single; d('next').disabled = single;
  }
  function stepPhoto(dir) {
    if (!active || active.photos.length < 2) return;
    photoIdx = (photoIdx + dir + active.photos.length) % active.photos.length;
    renderPhoto();
  }
  function openProject(slug, trigger) {
    const p = PROJECTS[slug];
    if (!p) return;
    active = p; photoIdx = 0; opener = trigger || null;
    d('slug').textContent = '/projetos/' + slug;
    d('kicker').textContent = (p.category === 'classicos' ? 'CLÁSSICOS' : 'FIGURINOS & ADEREÇOS') + ' · ' + p.num;
    d('title').textContent = p.title;
    d('desc').textContent = p.description;
    d('techs').replaceChildren(...p.techniques.map(t => Object.assign(document.createElement('span'), { textContent: t })));
    d('author').textContent = p.authorship === 'colaboracao' ? 'Colaboração — créditos de cada profissional abaixo.' : 'Autoral — Jonas Vidal Jr.';
    d('credits').replaceChildren(...p.credits.map(c => Object.assign(document.createElement('span'), { textContent: c })));
    d('wa').href = wa('Olá, Jonas! Vi o projeto "' + p.title + '" no site e gostaria de conversar.');
    renderPhoto();
    dlg.hidden = false;
    dlg.scrollTop = 0;
    page.inert = true; header.inert = true;
    lockScroll(true);
    if (window.gsap && !reduce) gsap.fromTo(dlg, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    d('close').focus({ preventScroll: true });
  }
  function closeProject() {
    if (!active) return;
    active = null;
    if (window.gsap) gsap.killTweensOf(dlg);
    dlg.hidden = true;
    page.inert = false; header.inert = false;
    lockScroll(false);
    if (opener) opener.focus({ preventScroll: true });
  }
  $$('[data-project]').forEach(btn => btn.addEventListener('click', () => openProject(btn.getAttribute('data-project'), btn)));
  d('close').addEventListener('click', closeProject);
  d('prev').addEventListener('click', () => stepPhoto(-1));
  d('next').addEventListener('click', () => stepPhoto(1));

  window.addEventListener('keydown', e => {
    if (active) {
      if (e.key === 'Escape') closeProject();
      else if (e.key === 'ArrowLeft') stepPhoto(-1);
      else if (e.key === 'ArrowRight') stepPhoto(1);
      else if (e.key === 'Tab') trapTab(e, $$('button:not(:disabled), a[href]', dlg));
      return;
    }
    if (!menuOpen) return;
    if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); return; }
    if (e.key === 'Tab') trapTab(e, [menuBtn].concat(menuLinks));
  });

  /* ---------- Rolagem suave ---------- */
  const expoInOut = t => (t === 0 || t === 1) ? t : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  function scrollToTarget(target) {
    const el = typeof target === 'number' ? null : $(target);
    const y = el ? el.getBoundingClientRect().top + window.scrollY : (+target || 0);
    if (lenis) { lenis.scrollTo(y, { duration: 1.4, easing: expoInOut, force: true }); return; }
    if (window.gsap && window.ScrollToPlugin) {
      gsap.to(window, { duration: reduce ? 0 : 1.4, ease: 'expo.inOut', scrollTo: { y, autoKill: true } });
      return;
    }
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    e.preventDefault();
    if (menuOpen) setMenu(false);
    // espera o desbloqueio do scroll antes de animar
    requestAnimationFrame(() => scrollToTarget(href === '#hero' ? 0 : href));
    history.replaceState(null, '', href);
  }));

  /* ---------- Ano do rodapé ---------- */
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sem GSAP: só o básico ---------- */
  if (!window.gsap || !window.ScrollTrigger) {
    $$('[data-stage-text], [data-stage-img]').forEach(el => { el.style.opacity = 1; el.style.clipPath = 'none'; });
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
  if (!reduce) {
    gsap.from('[data-hero-line]', { yPercent: 110, duration: 1.3, ease: 'power4.out', stagger: 0.12, delay: 0.15 });
    gsap.fromTo('[data-hero-img]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' });
    gsap.from('[data-hero-meta]', { opacity: 0, y: 12, duration: 0.8, stagger: 0.1, delay: 0.9 });
  }

  /* ---------- A Construção: scrub reversível ---------- */
  function buildTimeline(box, r) {
    const imgs = $$('[data-stage-img]', box), texts = $$('[data-stage-text]', box), steps = $$('[data-step]', box);
    let cur = 0;
    gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(texts.slice(1), { opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#construcao', start: 'top top', end: 'bottom bottom', scrub: r ? true : 0.6,
        onUpdate: self => {
          const i = Math.min(3, Math.floor(self.progress * 4));
          if (i === cur) return;
          cur = i;
          steps.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.classList.toggle('is-past', k < i); });
        }
      }
    });
    for (let i = 1; i < 4; i++) {
      tl.to(imgs[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.inOut' }, i - 0.3);
      tl.to(texts[i - 1], { opacity: 0, y: r ? 0 : -24, duration: 0.25 }, i - 0.3);
      tl.fromTo(texts[i], { opacity: 0, y: r ? 0 : 24 }, { opacity: 1, y: 0, duration: 0.3 }, i);
    }
    tl.to({}, { duration: 0.5 }, 3.3);
    tl.fromTo($$('[data-stitch-progress]', box), { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: tl.duration() }, 0);
  }

  /* ---------- Animações por breakpoint ---------- */
  const mm = gsap.matchMedia();
  mm.add({
    desktop: '(min-width: 1024px)',
    mobile: '(max-width: 1023px)',
    reduceMotion: '(prefers-reduced-motion: reduce)'
  }, ctx => {
    const { desktop, reduceMotion: r } = ctx.conditions;
    reduce = r;

    buildTimeline($(desktop ? '.build-d' : '.build-m'), r);
    if (r) return;

    gsap.to('[data-hero-img-inner]', {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
    });

    $$('[data-reveal-line]').forEach(el => gsap.from(el, {
      yPercent: 110, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
    }));

    $$('[data-stripe]').forEach(el => gsap.fromTo(el, { clipPath: 'inset(0% 100% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 55%', scrub: 0.6 }
    }));

    // parallax só no desktop: no celular pesa e não acrescenta muito
    if (desktop) $$('[data-parallax]').forEach(el => gsap.fromTo(el, { yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
    }));

    $$('[data-card]').filter(visible).forEach(el => gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top bottom', once: true }
    }));
  });

  // Recalcula após imagens carregarem (alturas finais)
  window.addEventListener('load', () => ST.refresh());
})();
