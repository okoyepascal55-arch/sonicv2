import { BrowserRouter, useLocation } from 'react-router-dom';
import { Suspense, useState, useEffect, useRef } from 'react';
import { AppRoutes } from './router';
import Navigation from './components/feature/Navigation';
import Footer from './components/feature/Footer';
import SchemaOrg from './components/feature/SchemaOrg';
import CalendlyWidget from './components/feature/CalendlyWidget';
import SkipLink from './components/base/SkipLink';
import ScrollToHash from './components/base/ScrollToHash';
import FaviconController from './components/base/FaviconController';

function PageLoader() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(30);
    const t1 = setTimeout(() => setWidth(60), 100);
    const t2 = setTimeout(() => setWidth(85), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-primary-500 z-system transition-all duration-300 ease-out shadow-[0_0_8px_rgba(200,212,0,0.6)]"
      style={{ width: `${width}%` }}
    />
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [visible, setVisible] = useState(true);
  const pendingLocation = useRef(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Start fade out
      setVisible(false);
      pendingLocation.current = location;
      
      const swap = setTimeout(() => {
        setDisplayLocation(pendingLocation.current);
        
        // Use requestAnimationFrame to ensure scroll happens after the new page is rendered
        requestAnimationFrame(() => {
          if (!pendingLocation.current.hash) {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
          // Small safety timeout to override any browser scroll restoration
          setTimeout(() => {
            if (!pendingLocation.current.hash && window.scrollY > 0) {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }, 10);
        });

        setVisible(true);
      }, 150); // Snappy page swap
      
      return () => clearTimeout(swap);
    }
  }, [location, displayLocation]);

  return (
    <div
      key={displayLocation.pathname}
      className="transition-opacity duration-150 ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      <FaviconController />
      <SchemaOrg type="organization" />
      <CalendlyWidget />
      <SkipLink />
      <ScrollToHash />
      <div className={isDashboard ? 'min-h-[100dvh] flex flex-col bg-foreground-950' : 'min-h-[100dvh] flex flex-col bg-background-50'}>
        {!isDashboard && <Navigation />}
        <main id="main-content" className={isDashboard ? 'flex-1' : 'flex-1 pt-20'}>
          <AnimatedRoutes />
        </main>
        {!isDashboard && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
