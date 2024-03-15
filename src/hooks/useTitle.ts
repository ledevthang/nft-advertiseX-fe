/* eslint-disable */
import { useEffect } from 'react';

export default function useTitle(title: string) {
  // const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
  }, []);
}
