import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Award, Truck, Users } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Journey Begins <span className="text-orange-500">Here</span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Starting with love, we bring you the same recipes our family has cherished for generations. 
              As our journey grows, so will our collection of traditional sweets.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold text-gray-700 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Two Treasured Family Recipes
            </motion.h3>
          </div>

          {/* Recipe Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Kheer Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <img
                  src="/attached_assets/rice-kheer-instant-pot-featured-image_1755188662871.jpg"
                  alt="Kheer"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <span>⭐</span>
                  <span>Family Favorite</span>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Kheer</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  A creamy, comforting dessert made from milk, rice, and a mix of premium dry fruits. 
                  Slow-cooked to perfection with cardamom and saffron.
                </p>
                <div className="space-y-2 mb-6">
                  {['Made with Basmati Rice', 'Premium Dry Fruits', 'Cardamom & Saffron', 'Serves 2-3 people'].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={() => scrollToSection('menu')}
                    className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-colors font-semibold"
                  >
                    View in Menu
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Matho Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <img
                  src="/attached_assets/amrakhand-alphonso-flavoured-yogurt-shrikhand-260nw-608706788_1755188662871.webp"
                  alt="Matho"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Matho</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  A thick, rich, and traditional yogurt-based sweet dish. Made with the finest ingredients 
                  and traditional techniques passed down through generations.
                </p>
                <div className="space-y-2 mb-6">
                  {['Traditional Recipe', 'Premium Yogurt Base', 'Rich & Creamy', 'Serves 2-3 people'].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={() => scrollToSection('menu')}
                    className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition-colors font-semibold"
                  >
                    View in Menu
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coming Soon Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">More Recipes Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                As we grow, we'll be adding more traditional family recipes to share the rich heritage of Indian sweets with you.
              </p>
              <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold">
                Explore Current Menu
              </button>
            </div>
          </motion.div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">A Journey of Love & Tradition</h2>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 border-4 border-orange-500 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                      UK's
                    </div>
                    <div className="text-lg font-bold text-gray-800">FIRST</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Family</h3>
                    <p className="text-gray-600">The Heart of Our Kitchen</p>
                    <p className="text-sm text-gray-500 italic">Where generations of recipes come to life</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                We are proud to be the UK's first platform dedicated to bringing traditional Indian sweets 
                directly to your doorstep. Our journey began with a simple dream: to share the authentic 
                flavors that have been lovingly preserved in our family for generations.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Starting with our two most treasured family recipes - Kheer and Matho - we're building a 
                bridge between traditional Indian sweetmaking and modern British homes. Each dish is crafted 
                with the same love, patience, and premium ingredients that our grandmothers used.
              </p>

              <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500">
                <p className="text-gray-700 italic leading-relaxed">
                  "We believe that food is love made visible. Every sweet we create carries the warmth of 
                  our family's kitchen and the stories of our heritage."
                </p>
                <p className="text-orange-600 font-semibold mt-3">- The Sweet Spoon Family</p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Traditional cooking ingredients"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { icon: Heart, title: 'Made with Love', desc: 'Every dish crafted with care and tradition' },
              { icon: Award, title: 'Premium Ingredients', desc: 'Only the finest milk, saffron, and dry fruits' },
              { icon: Truck, title: 'UK Delivery', desc: 'Fresh sweets delivered nationwide' },
              { icon: Users, title: 'Family Recipes', desc: 'Authentic recipes passed down generations' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.9 + index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}