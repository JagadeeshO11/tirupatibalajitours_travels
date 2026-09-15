import React from 'react';
import { createRoot } from 'react-dom/client';
import SacredDestinationsCoverFlow from './SacredDestinationsCoverFlow';

function mountSacredCoverFlow() {
  const section = document.querySelector('.destinations-preview');
  const slider = section?.querySelector('.home-slider');
  if (!section || !slider || section.querySelector('.sacred-coverflow-mount')) return false;

  const slides = Array.from(slider.querySelectorAll('.swiper-slide'))
    .map((slide) => slide.innerHTML.trim())
    .filter(Boolean);

  if (!slides.length) return false;

  const mount = document.createElement('div');
  mount.className = 'sacred-coverflow-mount';
  slider.style.display = 'none';
  slider.setAttribute('aria-hidden', 'true');
  slider.parentNode.insertBefore(mount, slider);

  createRoot(mount).render(<SacredDestinationsCoverFlow slides={slides} />);
  return true;
}

const start = () => {
  if (mountSacredCoverFlow()) return;

  const observer = new MutationObserver(() => {
    if (mountSacredCoverFlow()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
