import { useEffect, useRef } from 'react';

export default function usePrevious<T>(data: T) {
  const prev = useRef<T | undefined>(undefined);

  useEffect(() => {
    prev.current = data;
  }, [data]);

  return prev.current;
}
