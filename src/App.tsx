
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
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
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
