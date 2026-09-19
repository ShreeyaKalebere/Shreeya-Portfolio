import React, { useEffect, useRef } from 'react';

/**
 * High-performance HTML5 Canvas Matrix Rain.
 * Designed to be subtle and non-intrusive to preserve readability.
 * Automatically respects reduced-motion preferences.
 */
export default function MatrixRain({ opacity = 0.15, density = 1, isNight = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDrops();
    };

    window.addEventListener('resize', handleResize);

    // Matrix characters: Japanese Katakana, binary, hex, and cyber characters
    const chars = '0123456789ABCDEFSHREEYAOS010101XYZΩλπµ∑∫§';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = [];

    const initDrops = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -height / fontSize);
      }
    };

    initDrops();

    let lastTime = 0;
    const fps = 28; // Optimized frame rate for smooth but low CPU usage
    const interval = 1000 / fps;

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      // Semi-transparent black wash for trailing effect
      ctx.fillStyle = 'rgba(3, 6, 5, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Skip some drops based on density
        if (i % Math.max(1, Math.round(2 / density)) !== 0) continue;

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head of the drop is white-cyan, body is emerald/matrix green
        if (Math.random() > 0.92) {
          ctx.fillStyle = '#ffffff';
        } else if (isNight) {
          ctx.fillStyle = '#00ff66';
        } else {
          ctx.fillStyle = '#10b981';
        }

        ctx.fillText(char, x, y);

        // Reset drop when off screen with random stagger
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity, density, isNight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity,
        transition: 'opacity 0.5s ease'
      }}
      aria-hidden="true"
    />
  );
}
