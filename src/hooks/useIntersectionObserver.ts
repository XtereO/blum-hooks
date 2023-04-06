import { LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: Args): { ref: LegacyRef<any>; entry: IntersectionObserverEntry | undefined } => {
  const elementRef = useRef<Element>();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = useMemo(() => entry?.isIntersecting && freezeOnceVisible, [entry?.isIntersecting, freezeOnceVisible]);

  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  }, []);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen]);

  return { entry, ref: elementRef };
};
