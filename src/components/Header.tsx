import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartOpen: () => void;
  onMenuToggle: () => void;
}

export function Header({ onCartOpen, onMenuToggle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollToSection('home')}
          >
            <div className={`p-2 rounded-full ${isScrolled ? 'bg-orange-500' : 'bg-white/20 backdrop-blur-sm'}`}>
              <Heart className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              The Sweet Spoon
            </h1>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={onMenuToggle}
              className={`transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className={`transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              Reviews
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onCartOpen}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              {itemCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
            
            <button 
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 p-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-orange-500 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={onMenuToggle}
                className="text-gray-700 hover:text-orange-500 transition-colors text-left"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-orange-500 transition-colors text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="text-gray-700 hover:text-orange-500 transition-colors text-left"
              >
                Reviews
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}