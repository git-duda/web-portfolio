import { RefObject, useEffect } from 'react';

export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 701px)');
    const targets = Array.from(container.querySelectorAll<HTMLElement>(
      ':scope > section:not(.work), .work > article, .example-section'
    ));
    let observer: IntersectionObserver | undefined;

    const setup = () => {
      observer?.disconnect();
      targets.forEach((target) => target.classList.remove('scroll-reveal', 'is-revealed'));
      if (reduced.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        });
      }, {
        root: desktop.matches ? container : null,
        threshold: 0,
        rootMargin: '0px 0px -24px 0px',
      });
      targets.forEach((target) => {
        target.classList.add('scroll-reveal');
        observer?.observe(target);
      });
    };

    setup();
    reduced.addEventListener('change', setup);
    desktop.addEventListener('change', setup);
    return () => {
      observer?.disconnect();
      reduced.removeEventListener('change', setup);
      desktop.removeEventListener('change', setup);
      targets.forEach((target) => target.classList.remove('scroll-reveal', 'is-revealed'));
    };
  }, [containerRef]);
}
