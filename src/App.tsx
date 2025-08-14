import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';
import { CartModal } from './components/CartModal';
import { CartProvider } from './contexts/CartContext';
import { useLenis } from './hooks/useLenis';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize Lenis smooth scrolling
  useLenis();

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isCartOpen]);

  const openMenu = () => setIsMenuOpen(true);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header 
          onCartOpen={() => setIsCartOpen(true)} 
          onMenuToggle={() => setIsMenuOpen(true)}
        />

        <main>
          <Hero onMenuOpen={openMenu} />
          <About />
          <Reviews />
        </main>

        <Footer onMenuOpen={() => setIsMenuOpen(true)} />

        <MenuModal 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />

        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </CartProvider>
  );
}

export default App;