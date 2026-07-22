gsap.registerPlugin(ScrollTrigger);

const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const addToCartBtn = document.getElementById('addToCartBtn');

let count = 0;

function showToast() {
  gsap.killTweensOf(toast);
  gsap.to(toast, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
  gsap.to(toast, { delay: 1.2, y: 120, opacity: 0, duration: 0.35, ease: 'power2.in' });
}

addToCartBtn.addEventListener('click', () => {
  count++;
  cartCount.textContent = count;
  showToast();

  gsap.fromTo(addToCartBtn, { scale: 1 }, { scale: 0.96, duration: 0.12, yoyo: true, repeat: 1 });
});

document.querySelectorAll('.reveal').forEach((el) => {
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }
  );
});

gsap.from('.hero-copy > *', {
  y: 18,
  opacity: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: 'power2.out'
});
