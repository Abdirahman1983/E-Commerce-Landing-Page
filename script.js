(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Hero load-in sequence ---------- */
  function heroIntro() {
    const lines = document.querySelectorAll('[data-line]');
    const wave = document.getElementById('wavePath');
    const hp = document.getElementById('hpVisual');

    if (reduceMotion || !window.gsap) {
      lines.forEach(l => l.style.opacity = 1);
      return;
    }

    gsap.set(lines, { yPercent: 110 });
    gsap.set(hp, { opacity: 0, y: 24 });
    gsap.set('.hero__buy', { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(lines, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 })
      .to(hp, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .to('.hero__buy', { opacity: 1, duration: 0.6 }, '-=0.5');

    // ambient float
    gsap.to(hp, { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 });

    // waveform breathing
    if (wave) {
      gsap.to(wave, {
        attr: { d: 'M0,60 Q50,90 100,60 T200,60 T300,60 T400,60' },
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }
  }

  /* ---------- Feature sections scroll reveal ---------- */
  function featureReveals() {
    const features = document.querySelectorAll('[data-feature]');
    if (!window.ScrollTrigger) {
      features.forEach(f => { f.style.opacity = 1; f.style.transform = 'none'; });
      return;
    }
    features.forEach((feature) => {
      if (reduceMotion) {
        feature.style.opacity = 1;
        feature.style.transform = 'none';
        return;
      }
      gsap.to(feature, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: feature, start: 'top 78%' }
      });
    });
  }

  /* ---------- Isolation rings pulse ---------- */
  function ringVis() {
    const el = document.querySelector('[data-ring-vis]');
    if (!el) return;
    const rings = el.querySelectorAll('.ring-vis__ring');
    if (reduceMotion || !window.ScrollTrigger) {
      rings.forEach(r => r.style.opacity = 0.4);
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(rings,
          { opacity: 0.8, scale: 0.4 },
          { opacity: 0, scale: 1.4, duration: 2.2, ease: 'sine.out', stagger: 0.35, repeat: -1 }
        );
      }
    });
  }

  /* ---------- Battery fill ---------- */
  function battVis() {
    const fill = document.querySelector('[data-batt-fill]');
    if (!fill) return;
    if (reduceMotion || !window.ScrollTrigger) {
      fill.style.width = '84%';
      return;
    }
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(fill, { width: '84%', duration: 1.4, ease: 'power2.out' })
    });
  }

  /* ---------- Weight number count-up ---------- */
  function weightVis() {
    const num = document.querySelector('.weight-vis__num');
    if (!num) return;
    if (reduceMotion || !window.ScrollTrigger) return;
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: num,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(counter, {
        val: 22, duration: 1.2, ease: 'power2.out',
        onUpdate: () => num.textContent = Math.round(counter.val)
      })
    });
  }

  /* ---------- Sticky mobile bar visibility ---------- */
  function stickyBar() {
    const bar = document.getElementById('stickyBar');
    const hero = document.getElementById('hero');
    if (!bar || !hero) return;

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top',
        onEnter: () => bar.classList.add('is-visible'),
        onLeaveBack: () => bar.classList.remove('is-visible')
      });
    } else {
      window.addEventListener('scroll', () => {
        bar.classList.toggle('is-visible', window.scrollY > hero.offsetHeight);
      });
    }
  }

  /* ---------- Add to cart: the signature single-tap interaction ---------- */
  function addToCart() {
    let cartCount = 0;
    const countEl = document.getElementById('cartCount');
    const navCart = document.getElementById('navCart');
    const toast = document.getElementById('toast');
    let toastTimer = null;

    document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-added')) return;

        // 1. instant visual feedback on the tapped button
        btn.classList.add('is-added');
        setTimeout(() => btn.classList.remove('is-added'), 1400);

        // 2. cart badge
        cartCount += 1;
        countEl.textContent = cartCount;
        countEl.classList.add('is-visible');
        navCart.classList.remove('bump');
        void navCart.offsetWidth; // restart animation
        navCart.classList.add('bump');
        navCart.setAttribute('aria-label', `Cart, ${cartCount} item${cartCount > 1 ? 's' : ''}`);

        // 3. toast confirmation
        clearTimeout(toastTimer);
        toast.classList.add('is-visible');
        toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    heroIntro();
    featureReveals();
    ringVis();
    battVis();
    weightVis();
    stickyBar();
    addToCart();
  });
})();
