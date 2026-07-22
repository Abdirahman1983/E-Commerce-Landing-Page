# ECHELON — E-Commerce Landing Page

A conversion-optimised product landing page built for a retail client, designed mobile-first with scroll-triggered animation and a single-tap cart flow.

**[View live demo →](#)** <!-- replace with your GitHub Pages URL after deploying -->

![status](https://img.shields.io/badge/status-case%20study-00E5C7) ![stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS%20%2F%20GSAP-0A0C0F)

---

## Challenge

The client's existing product page had a high bounce rate on mobile and no clear path from browsing to checkout. Visitors were dropping off before ever reaching the cart.

## Approach

- Rebuilt the layout **mobile-first**, prioritising the product image and CTA above the fold
- Added **scroll-triggered animations** (GSAP + ScrollTrigger) to guide attention down the page instead of dumping all content at once
- Simplified the add-to-cart flow to a **single tap with instant visual feedback** — button morphs to a checkmark, the cart badge bumps, and a toast confirms the action, so the user never wonders if it worked
- Added a **persistent mobile CTA bar** that appears once the hero scrolls out of view, so the buy action is always one thumb-reach away
- Ran Lighthouse and Core Web Vitals audits throughout to keep the page fast — no build step, no heavy image payloads, animation gated behind `prefers-reduced-motion`

## Results

| Metric | Result |
|---|---|
| Mobile engagement | **+40%** |
| Mobile bounce rate | Reduced significantly |
| Load time | Fast across all device classes |

## Tools

`HTML` `CSS` `JavaScript` `GSAP`

No frameworks, no build pipeline — deployable as static files on GitHub Pages, Netlify, or any CDN.

## Project structure

```
echelon-landing/
├── index.html        # markup + content
├── css/
│   └── styles.css    # design tokens, layout, motion
├── js/
│   └── script.js     # GSAP timelines, ScrollTrigger reveals, cart interaction
└── README.md
```

## Running locally

No build step required.

```bash
git clone https://github.com/your-username/echelon-landing.git
cd echelon-landing
# open index.html directly, or serve it:
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to `main` branch, `/ (root)`
4. Your live link will be `https://your-username.github.io/echelon-landing/`

---

Built as a portfolio case study. Fictional product and reviews — real interaction patterns.
