
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

const RevealEffect = () => {
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
  }, []);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RevealEffect />
      <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white scroll-smooth">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
