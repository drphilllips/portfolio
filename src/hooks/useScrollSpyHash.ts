import { useEffect, useRef, useState } from "react";

export function useScrollSpyHash(sectionIds: string[], resetId?: string) {
  const lastIdRef = useRef<string | null>(null);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is intersecting and closest to the top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top))[0];

        if (!visible) return;

        const id = (visible.target as HTMLElement).id;
        if (!id || lastIdRef.current === id) return;

        lastIdRef.current = id;

        const { pathname, search } = window.location;

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
  }, [sectionIds, resetId]);

  return { visibleSection };
}