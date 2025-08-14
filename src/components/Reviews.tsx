import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { reviews } from '../data/reviews';

export function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="reviews" ref={ref} className="py-20 bg-gradient-to-b from-white to-orange-50">
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
              Customer <span className="text-orange-500">Love Stories</span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Hear from customers who've experienced the authentic taste of our traditional family recipes.
            </motion.p>

            <motion.h3
              className="text-2xl font-semibold text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              What Our Family Says
            </motion.h3>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                      {review.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{review.location}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">"{review.comment}"</p>
                
                {review.verified && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '4.9★', label: 'Average Rating' },
              { number: '50+', label: 'Cities Served' },
              { number: '🇬🇧', label: "UK's First Traditional Sweet Platform" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}