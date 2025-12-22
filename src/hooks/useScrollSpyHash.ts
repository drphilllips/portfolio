import { useEffect, useRef, useState } from "react";

export function useScrollSpyHash(sectionIds: string[], hasScrolled: boolean, resetId?: string) {
  const lastIdRef = useRef<string | null>(null);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const { pathname, search } = window.location;

        // Don't set any hash until the user has actually scrolled.
        // Also, avoid caching an id in `lastIdRef` while we're in this state,
        // otherwise we can accidentally "skip" the first section once scrolling begins.
        if (!hasScrolled) {
          lastIdRef.current = null;
          setVisibleSection(null);
          window.history.replaceState(null, "", `${pathname}${search}`);
          return;
        }
        // Pick the entry that is intersecting and closest to the top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top))[0];

        if (!visible) return;

        const id = (visible.target as HTMLElement).id;
        // If we're already showing this id, no need to re-write the hash.
        if (!id || lastIdRef.current === id) return;

        lastIdRef.current = id;

        if (resetId && id === resetId) {
          setVisibleSection(null);
          window.history.replaceState(null, "", `${pathname}${search}`);
        } else {
          setVisibleSection(id);
          window.history.replaceState(null, "", `${pathname}${search}#${id}`);
        }
      },
      {
        // Tune these numbers to match your header height + desired behavior
        root: null,
        threshold: [0, 0.1],
        rootMargin: "-35% 0px -60% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasScrolled, sectionIds, resetId]);

  return { visibleSection };
}