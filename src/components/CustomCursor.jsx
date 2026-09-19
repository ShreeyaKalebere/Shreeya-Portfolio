import React, { useState, useEffect } from 'react';
import '../styles/cursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('normal'); // 'normal', 'hover', 'project', 'explore'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"], #work a, #work button, .bento-card');
      const exploreEl = target.closest('[data-cursor="explore"], #lab a, #field-notes a');
      const clickable = target.closest('a, button, [role="button"], input, textarea');

      if (projectEl) {
        setCursorType('project');
      } else if (exploreEl) {
        setCursorType('explore');
      } else if (clickable) {
        setCursorType('hover');
      } else {
        setCursorType('normal');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  let badgeText = null;
  if (cursorType === 'hover') badgeText = 'VIEW';
  if (cursorType === 'project') badgeText = 'OPEN';
  if (cursorType === 'explore') badgeText = 'EXPLORE';

  return (
    <div 
      className={`swiss-cursor ${cursorType !== 'normal' ? 'active' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      aria-hidden="true"
    >
      <div className="cursor-crosshair" />
      <div className="cursor-square" />
      {badgeText && (
        <span className="cursor-label">
          {badgeText}
        </span>
      )}
    </div>
  );
}
