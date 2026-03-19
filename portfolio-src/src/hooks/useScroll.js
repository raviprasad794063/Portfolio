import { useEffect, useState } from 'react';

/**
 * Returns a 0–1 value representing how far the user has scrolled
 * through the full document height. Used to drive depth effects.
 */
export function useScrollDepth() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setDepth(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return depth;
}

/**
 * Triggers IntersectionObserver-based reveal animation
 * on all elements with className "reveal".
 * Uses MutationObserver to catch elements added after initial mount.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const observe = (root) => {
      root.querySelectorAll('.reveal, .reveal-left').forEach((el) => io.observe(el));
    };

    // Observe existing elements
    observe(document);

    // Watch for new elements added to the DOM
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.('.reveal, .reveal-left')) io.observe(node);
          observe(node);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
