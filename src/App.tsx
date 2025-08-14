
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { CartProvider } from './contexts/CartContext';
import { useLenis } from './hooks/useLenis';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize Lenis smooth scrolling
  useLenis();

  // Prevent body scroll when cart modal is open
  useEffect(() => {
    if (isCartOpen) {
      // Get current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isCartOpen]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header 
          onCartOpen={() => setIsCartOpen(true)} 
        />

        <main>
          <Hero />
          <About />
          <MenuSection />
          <Reviews />
        </main>

        <Footer />

        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </CartProvider>
  );
}

export default App;
