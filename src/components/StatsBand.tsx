import { useEffect, useRef, useState } from 'react';
import { SITE_CONTENT } from '../data/siteData';

const ACCENT_TOPS = ['border-t-[#f8701a]', 'border-t-[#1ea5e8]', 'border-t-[#0c77bb]', 'border-t-white'];

export function StatsBand() {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<number[]>(() => SITE_CONTENT.stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = bandRef.current;
    if (!node || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts(SITE_CONTENT.stats.map((s) => s.value));
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setHasAnimated(true);
        observer.disconnect();

        const start = performance.now();
        const duration = 900;

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(SITE_CONTENT.stats.map((s) => Math.max(1, Math.round(s.value * eased))));
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setCounts(SITE_CONTENT.stats.map((s) => s.value));
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={bandRef} aria-label="Agency performance highlights" className="bg-[#0f2257] py-10 text-white">
      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-6 px-6 lg:grid-cols-4">
        {SITE_CONTENT.stats.map((stat, idx) => (
          <div key={stat.label} className={`border-t-2 pt-4 ${ACCENT_TOPS[idx % ACCENT_TOPS.length]}`}>
            <div className="font-display text-4xl font-extrabold tracking-tight tabular-nums text-white">
              {counts[idx]}
              {stat.suffix}
            </div>
            <p className="mt-1 text-sm text-[#b8c6ec]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
