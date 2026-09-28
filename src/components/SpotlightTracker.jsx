import React, { useEffect } from 'react';

/**
 * Global SpotlightTracker
 * Tracks the cursor position relative to any .bento-card in the DOM and sets
 * CSS custom properties (--mouse-x, --mouse-y) for high-performance GPU-accelerated
 * radial ambient glow and border glow effects without triggering React re-renders.
 */
export default function SpotlightTracker() {
  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let rafId = null;

    const handlePointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const cards = document.querySelectorAll('.bento-card');
        const clientX = e.clientX;
        const clientY = e.clientY;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;

          // Only update style when cursor is near or inside the card to keep performance at 60-120fps
          if (x > -150 && x < rect.width + 150 && y > -150 && y < rect.height + 150) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
          }
        }
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
