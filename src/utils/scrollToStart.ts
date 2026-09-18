/** Scroll both page layouts at a controlled pace; let user input interrupt it. */
export function scrollToStart(onComplete: () => void): () => void {
  const content = document.getElementById('conteudo');
  const contentStart = content?.scrollTop ?? 0;
  const pageStart = window.scrollY;
  const distance = Math.max(contentStart, pageStart);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = Math.min(3600, Math.max(2200, 1600 + distance * 0.25));
  let frame = 0;
  let stopped = false;
  const startedAt = performance.now();

  const move = (remaining: number) => {
    content?.scrollTo({ top: contentStart * remaining, behavior: 'instant' });
    window.scrollTo({ top: pageStart * remaining, behavior: 'instant' });
  };
  const cancel = () => {
    stopped = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('pointerdown', cancel);
    window.removeEventListener('keydown', cancel);
    window.removeEventListener('resize', cancel);
    reducedMotion.removeEventListener('change', finish);
  };
  const finish = () => {
    move(0);
    cancel();
    onComplete();
  };
  const step = (now: number) => {
    if (stopped) return;
    const progress = Math.min((now - startedAt) / duration, 1);
    // Cosine easing starts and ends gently, without a sudden initial rush.
    move((1 + Math.cos(Math.PI * progress)) / 2);
    if (progress < 1) frame = requestAnimationFrame(step);
    else finish();
  };

  if (reducedMotion.matches || distance === 0) {
    finish();
    return cancel;
  }
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('pointerdown', cancel, { passive: true });
  window.addEventListener('keydown', cancel);
  window.addEventListener('resize', cancel);
  reducedMotion.addEventListener('change', finish);
  frame = requestAnimationFrame(step);
  return cancel;
}
