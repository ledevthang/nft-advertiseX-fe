import React, { useRef } from 'react';
import { EvenListenerTypeEnum } from 'enums/EvenListenerTypeEnum';

export default function useInfinityScroll(onScrollEnd?: () => void) {
  // To avoid load more repeatedly
  const ref = useRef<HTMLElement>(null);
  const allowLoadmore = useRef(true);
  const handleScrollTable = React.useCallback(() => {
    const scrollElement = ref.current;
    if (scrollElement) {
      const isScrollEnd =
        scrollElement.clientHeight + scrollElement.scrollTop ===
        scrollElement.scrollHeight;
      if (isScrollEnd && onScrollEnd && allowLoadmore.current) {
        onScrollEnd();
        allowLoadmore.current = false;
      } else {
        allowLoadmore.current = true;
      }
    }
  }, [onScrollEnd]);

  React.useEffect(() => {
    const scrollElement = ref.current;
    if (scrollElement) {
      scrollElement.addEventListener(
        EvenListenerTypeEnum.Scroll,
        handleScrollTable,
      );
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener(
          EvenListenerTypeEnum.Scroll,
          handleScrollTable,
        );
      }
    };
  }, [handleScrollTable]);

  return ref;
}
