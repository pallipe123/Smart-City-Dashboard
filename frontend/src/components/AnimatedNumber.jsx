import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ value, duration = 800, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const startValue = displayValue;
    const targetValue = Number.isFinite(value) ? value : 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const next = Math.round(startValue + (targetValue - startValue) * eased);
      setDisplayValue(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // We intentionally animate from current displayed value each time target changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span>{`${displayValue}${suffix}`}</span>;
}

export default AnimatedNumber;
