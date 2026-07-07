import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  useEffect(() => {
    if (navigationType === 'PUSH' || navigationType === 'REPLACE') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}
