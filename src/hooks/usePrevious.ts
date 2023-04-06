import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T, deps: unknown[]): T => {
  const prev = useRef<T>();

  useEffect(() => {
    prev.current = value;
  }, [value, ...deps]);
  return prev.current as T;
};
