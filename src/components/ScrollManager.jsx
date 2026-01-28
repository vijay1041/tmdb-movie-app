import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Home page apna scroll khud handle karta hai,
    // baaki pages pe fresh view ke liye top se start karte hain
    if (pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollManager;