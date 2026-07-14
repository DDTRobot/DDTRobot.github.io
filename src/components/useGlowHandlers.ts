import {useCallback, useRef} from 'react';

/**
 * Lightweight cursor-follow glow effect for card borders.
 * No animation library — just sets CSS custom properties on
 * mousemove/mouseleave, and CSS handles the actual glow rendering.
 */
export function useGlowHandlers() {
  const frame = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const x = e.clientX;
    const y = e.clientY;

    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const relX = ((x - rect.left) / rect.width) * 100;
      const relY = ((y - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${relX}%`);
      el.style.setProperty('--glow-y', `${relY}%`);
      el.style.setProperty('--glow-intensity', '1');
      frame.current = null;
    });
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--glow-intensity', '0');
  }, []);

  return {onMouseMove, onMouseLeave};
}
