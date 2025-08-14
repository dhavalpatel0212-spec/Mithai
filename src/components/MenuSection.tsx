
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingCart, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { menuItems } from '../data/menuItems';
import { MenuItem } from '../types';

interface CartPreferences {
  quantity: number;
  selectedVariant: string;
  extraDryFruits: 'none' | 'minimum' | 'plus' | 'extra';
  customNote: string;
}

export function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const { addToCart } = useCart();
  const [showPreferences, setShowPreferences] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<CartPreferences>({
    quantity: 1,
    selectedVariant: '',
    extraDryFruits: 'none',
    customNote: ''
  });
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    const selectedVariant = item.variants?.find(v => v.id === preferences.selectedVariant);
    const itemWithPreferences = {
      ...item,
      id: selectedVariant?.id || item.id,
      price: selectedVariant?.price || item.price,
      weight: selectedVariant?.weight || item.weight,
      extraDryFruits: preferences.extraDryFruits
    };
    
    // First show the animation
    setAddedToCart(item.id);
    setShowPreferences(null);
    
    // Add to cart multiple times based on quantity
    setTimeout(() => {
      for (let i = 0; i < preferences.quantity; i++) {
        addToCart(itemWithPreferences);
      }
    }, 300);
    
    // Reset animation after 2.5 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2500);
  };

  const openPreferences = (itemId: string) => {
    const item = menuItems.find(item => item.id === itemId);
    setShowPreferences(itemId);
    setPreferences({
      quantity: 1,
      selectedVariant: item?.variants?.[0]?.id || itemId + '-500g',
      extraDryFruits: 'none',
      customNote: ''
    });
  };

  return (
    <section id="menu" ref={ref} className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-orange-500">Traditional Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience authentic flavors crafted with love, premium ingredients, and traditional techniques passed down through generations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-orange-200 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                {item.isFavorite && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Popular</span>
                  </div>
                )}
                
                {/* Add to Cart Animation */}
                <AnimatePresence>
                  {addedToCart === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-green-500/95 flex items-center justify-center backdrop-blur-sm z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <motion.div
                        className="text-white text-center"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="w-16 h-16 mx-auto mb-3 drop-shadow-lg" />
                        </motion.div>
                        <motion.p 
                          className="text-xl font-bold drop-shadow-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          Added to Cart!
                        </motion.p>
                        <motion.p 
                          className="text-green-100 text-sm mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          Quantity: {preferences.quantity} • Weight: {item.variants?.find(v => v.id === preferences.selectedVariant)?.weight || item.weight} • Dry fruits: {preferences.extraDryFruits}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                  <span className="text-2xl font-bold text-orange-500">£{item.price.toFixed(2)}</span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">What's included:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {item.ingredients.map((ingredient, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-center space-x-2">
                    <span>🍽️</span>
                    <span>{item.serves}</span>
                  </p>
                </div>

                <motion.button
                  onClick={() => openPreferences(item.id)}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preferences Modal */}
        <AnimatePresence>
          {showPreferences && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreferences(null)}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6">
                  <h3 className="text-xl font-bold">Customize Your Order</h3>
                  <p className="text-orange-100 mt-1">Make it perfect for your taste</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Quantity Selection */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <span>🔢</span>
                      <span>Quantity</span>
                    </h4>
                    <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-xl p-4">
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors border shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-bold text-gray-800 w-12 text-center">{preferences.quantity}</span>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors border shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  

                  {/* Weight Selection */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <span>⚖️</span>
                      <span>Choose Size</span>
                    </h4>
                    {item.variants && (
                      <div className="space-y-2 mb-4">
                        {item.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setPreferences(prev => ({ ...prev, selectedVariant: variant.id }))}
                            className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                              preferences.selectedVariant === variant.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-semibold">{variant.weight}</div>
                                {variant.originalPrice && (
                                  <div className="text-xs text-gray-500">
                                    <span className="line-through">£{variant.originalPrice.toFixed(2)}</span>
                                    <span className="ml-1 text-green-600 font-semibold">OFFER</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-orange-600">£{variant.price.toFixed(2)}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dry Fruits Selection */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <span>🌰</span>
                      <span>Premium Dry Fruits</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'none', label: 'None', price: 0 },
                        { value: 'minimum', label: 'Minimum', price: 1 },
                        { value: 'plus', label: 'Plus', price: 2 },
                        { value: 'extra', label: 'Extra', price: 3 }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setPreferences(prev => ({ ...prev, extraDryFruits: option.value as any }))}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                            preferences.extraDryFruits === option.value
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-semibold text-sm">{option.label}</div>
                            <div className="text-xs text-orange-600 font-medium">
                              {option.price === 0 ? 'Standard' : `+£${option.price}.00`}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-2">
                        <div>• <strong>Minimum:</strong> Light sprinkle</div>
                        <div>• <strong>Plus:</strong> Good amount</div>
                        <div>• <strong>Extra:</strong> Generous portion</div>
                        <div>• <strong>None:</strong> Just the dessert</div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Notes */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                      <span>📝</span>
                      <span>Special Requests</span>
                    </h4>
                    <textarea
                      value={preferences.customNote}
                      onChange={(e) => setPreferences(prev => ({ ...prev, customNote: e.target.value }))}
                      placeholder="Any special requests, allergies, or preferences? (e.g., 'Extra cardamom', 'No nuts', etc.)"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
                      maxLength={200}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">Optional - Let us know your preferences</span>
                      <span className="text-xs text-gray-400">{preferences.customNote.length}/200</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowPreferences(null)}
                      className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const item = menuItems.find(item => item.id === showPreferences);
                        if (item) handleAddToCart(item);
                      }}
                      className="flex-2 py-3 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
