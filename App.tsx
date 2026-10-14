
import React, { useEffect, useSyncExternalStore } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { ResultsPage } from './pages/ResultsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { metaForPath } from './data/routeMeta';
import { FaqsPage } from './pages/FaqsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CmsPage } from './pages/CmsPage';
import { WorkPage, CaseStudyPage } from './pages/WorkPages';
import { JournalPage, PostPage } from './pages/JournalPages';
import { isCmsPreview, subscribePreview, previewVersion } from './data/cmsPreview';

// In the CMS preview a half-typed edit can briefly leave content incomplete; show a note instead of a blank page.
class PreviewBoundary extends React.Component<{ version: number; children: React.ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidUpdate(prev: { version: number }) { if (this.state.error && prev.version !== this.props.version) this.setState({ error: false }); }
  render() {
    if (!this.state.error) return this.props.children;
    return <div className="px-6 pb-32 pt-48 text-center text-lg font-bold text-gray-400">Preview paused while you finish this edit.</div>;
  }
}

const RevealEffect = () => {
  const { pathname } = useLocation();
  const version = useSyncExternalStore(subscribePreview, previewVersion, () => 0); // preview: reveal newly added blocks too

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [pathname, version]);
  return null;
};

// The static shell carries the right tags on first load; this keeps them
// correct when the router changes route without a page load.
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
  }, [pathname]);

  return null;
};

// Routed pages start at the top; a /#hash link scrolls to that section once
// the destination page has rendered.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  // re-render with the CMS's unsaved edits (preview only; a no-op for visitors)
  const version = useSyncExternalStore(subscribePreview, previewVersion, () => 0);
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<CaseStudyPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/journal/:slug" element={<PostPage />} />
      <Route path="/:slug" element={<CmsPage />} />
    </Routes>
  );
  return (
    <BrowserRouter>
      <RevealEffect />
      <RouteMeta />
      <ScrollManager />
      <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white scroll-smooth">
        <Navbar />
        <main>
          {isCmsPreview ? <PreviewBoundary version={version}>{routes}</PreviewBoundary> : routes}
        </main>
        <Footer />
      </div>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
