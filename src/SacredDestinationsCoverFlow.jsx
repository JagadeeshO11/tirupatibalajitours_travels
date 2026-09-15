import React, { useEffect, useMemo, useState } from 'react';
import './sacred-coverflow.css';

export default function SacredDestinationsCoverFlow({ slides }) {
  const items = useMemo(() => slides || [], [slides]);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (active >= items.length) setActive(0);
  }, [active, items.length]);

  useEffect(() => {
    if (items.length < 2 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [items.length, isPaused]);

  if (!items.length) return null;

  const go = (direction) => {
    setActive((current) => (current + direction + items.length) % items.length);
  };

  const positionFor = (index) => {
    let offset = index - active;
    const half = Math.floor(items.length / 2);
    if (offset > half) offset -= items.length;
    if (offset < -half) offset += items.length;
    return offset;
  };

  return (
    <div
      className="sacred-coverflow"
      aria-label="Sacred destinations carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <button
        type="button"
        className="sacred-coverflow-arrow sacred-coverflow-prev"
        onClick={() => go(-1)}
        aria-label="Previous destination"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className="sacred-coverflow-stage">
        {items.map((html, index) => {
          const position = positionFor(index);
          const visible = Math.abs(position) <= 2;
          return (
            <article
              key={`${index}-${html.slice(0, 24)}`}
              className={`sacred-coverflow-card ${position === 0 ? 'is-active' : ''}`}
              data-position={position}
              aria-hidden={position !== 0}
              style={{ '--cover-position': position }}
              onClick={() => position !== 0 && setActive(index)}
            >
              <div
                className="sacred-coverflow-card-inner"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              {!visible && <span className="sacred-coverflow-hidden-card" aria-hidden="true" />}
            </article>
          );
        })}
      </div>

      <button
        type="button"
        className="sacred-coverflow-arrow sacred-coverflow-next"
        onClick={() => go(1)}
        aria-label="Next destination"
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className="sacred-coverflow-pagination" aria-label="Choose destination">
        {items.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`sacred-coverflow-dot ${index === active ? 'is-active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Go to destination ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
