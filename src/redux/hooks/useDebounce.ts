import { useCallback, useRef, useEffect } from 'react';

export function useDebounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
      return () => {
          if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
          }
      };
  }, []);

  return useCallback(
      (...args: T) => {
          if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
              callback(...args);
          }, delay);
      },
      [callback, delay]
  );
}