import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={ref} className="bg-gradient-to-b from-orange-50 to-orange-100 py-20">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <motion.div
          className="text-center mb-16 bg-white rounded-3xl p-12 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6">
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🇬🇧 UK's First Traditional Sweet Platform
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Begin Your Journey with <span className="text-orange-500">Our Family</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience the magic of traditional recipes made with pure milk, golden saffron, 
            premium dry fruits, and creamy yogurt. Every order supports our dream of sharing 
            authentic Indian sweets across the UK.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button
              onClick={() => scrollToSection('menu')}
              className="px-8 py-4 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Sweet Journey
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full text-lg font-semibold hover:bg-orange-50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Our Story
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: '🚚', title: 'Free UK Delivery', desc: 'On orders over £15 nationwide' },
              { icon: '💝', title: 'Love Guaranteed', desc: '100% satisfaction with every bite' },
              { icon: '👨‍👩‍👧‍👦', title: 'Growing Family', desc: 'More traditional recipes coming soon' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Content */}
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-500 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">The Sweet Spoon</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Traditional family recipes delivering authentic sweet dishes across the UK.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-orange-500" />
                <span>+44 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>hello@thesweetspoon.co.uk</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Delivering across London, Manchester, Birmingham & surrounding areas</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection('menu')}
                className="block text-gray-600 hover:text-orange-500 transition-colors text-left"
              >
                Our Menu
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-gray-600 hover:text-orange-500 transition-colors text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="block text-gray-600 hover:text-orange-500 transition-colors text-left"
              >
                Customer Reviews
              </button>
              <a href="#contact" className="block text-gray-600 hover:text-orange-500 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact</h4>
            <div className="space-y-3 text-gray-600">
              <p>+44 123 456 7890</p>
              <p>hello@thesweetspoon.co.uk</p>
              <p className="text-sm">
                Delivering across London, Manchester, Birmingham & surrounding areas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-orange-200 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-600">
            © 2024 The Sweet Spoon. All rights reserved. Made with love for traditional flavors.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}