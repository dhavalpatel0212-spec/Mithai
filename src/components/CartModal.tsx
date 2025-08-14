
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2, Star, Info } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItemExtended {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sugarLevel: 'less' | 'normal' | 'extra';
  extraDryFruits: 'none' | 'minimum' | 'plus' | 'extra';
  customNote: string;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItemExtended[]>(
    items.map(item => ({
      ...item,
      sugarLevel: 'normal' as const,
      extraDryFruits: 'none' as const,
      customNote: ''
    }))
  );

  // Update cart items when items change
  React.useEffect(() => {
    setCartItems(current => {
      const newItems = items.map(item => {
        const existing = current.find(c => c.id === item.id);
        return existing ? { ...existing, ...item } : {
          ...item,
          sugarLevel: 'normal' as const,
          extraDryFruits: 'none' as const,
          customNote: ''
        };
      });
      return newItems;
    });
  }, [items]);

  const updateSugarLevel = (id: string, sugarLevel: 'less' | 'normal' | 'extra') => {
    setCartItems(current =>
      current.map(item =>
        item.id === id ? { ...item, sugarLevel } : item
      )
    );
  };

  const updateDryFruits = (id: string, extraDryFruits: 'none' | 'minimum' | 'plus' | 'extra') => {
    setCartItems(current =>
      current.map(item =>
        item.id === id ? { ...item, extraDryFruits } : item
      )
    );
  };

  const updateCustomNote = (id: string, customNote: string) => {
    setCartItems(current =>
      current.map(item =>
        item.id === id ? { ...item, customNote } : item
      )
    );
  };

  const calculateItemTotal = (item: CartItemExtended) => {
    let price = item.price * item.quantity;
    
    // Add dry fruits pricing
    const dryFruitsPricing = {
      'none': 0,
      'minimum': 1,
      'plus': 2,
      'extra': 3
    };
    
    price += dryFruitsPricing[item.extraDryFruits] * item.quantity;
    return price;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const dryFruitsRecommendations = [
    { name: 'Premium Almonds', description: 'Hand-selected California almonds', emoji: '🌰' },
    { name: 'Golden Raisins', description: 'Sweet and plump golden raisins', emoji: '🍇' },
    { name: 'Cashew Pieces', description: 'Roasted cashew pieces for extra richness', emoji: '🥜' },
    { name: 'Pistachio Slivers', description: 'Aromatic pistachio slivers', emoji: '🌰' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg h-[95vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
              <div>
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <p className="text-orange-100">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 px-6">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p className="text-lg font-semibold mb-2">Your cart is empty</p>
                  <p className="text-sm text-center">Add some delicious sweets to get started!</p>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Item Header */}
                        <div className="flex items-start space-x-4 mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                            <p className="text-orange-500 font-bold text-lg">£{item.price.toFixed(2)} each</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium text-gray-700">Quantity</span>
                          <div className="flex items-center space-x-3 bg-white rounded-xl p-2 border">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                                updateQuantity(item.id, newQuantity);
                              }}
                              className="w-16 text-center font-bold text-lg text-gray-800 border border-gray-300 rounded-lg py-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-50 transition-colors text-green-600 hover:text-green-700 border border-green-200 hover:border-green-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Sugar Level Selection */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
                            <span>🍯</span>
                            <span>Sugar Level: <span className="text-orange-600 font-semibold">{item.sugarLevel}</span></span>
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {['less', 'normal', 'extra'].map((level) => (
                              <button
                                key={level}
                                onClick={() => updateSugarLevel(item.id, level as any)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  item.sugarLevel === level
                                    ? 'bg-orange-500 text-white shadow-md scale-105'
                                    : 'bg-white text-gray-700 hover:bg-orange-50 border hover:border-orange-300'
                                }`}
                              >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Dry Fruits Selection */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
                            <span>🌰</span>
                            <span>Premium Dry Fruits: <span className="text-orange-600 font-semibold capitalize">{item.extraDryFruits}</span></span>
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { value: 'none', label: 'None', price: 0 },
                              { value: 'minimum', label: 'Minimum', price: 1 },
                              { value: 'plus', label: 'Plus', price: 2 },
                              { value: 'extra', label: 'Extra', price: 3 }
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => updateDryFruits(item.id, option.value as any)}
                                className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                                  item.extraDryFruits === option.value
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                                }`}
                              >
                                <div className="text-center">
                                  <div className="font-semibold">{option.label}</div>
                                  <div className="text-xs text-orange-600">
                                    {option.price === 0 ? 'Standard' : `+£${option.price}.00`}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                          
                          {item.extraDryFruits !== 'none' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 bg-white rounded-lg p-3 border"
                            >
                              <h5 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                                <Info className="w-4 h-4" />
                                <span>What's included:</span>
                              </h5>
                              <div className="grid grid-cols-2 gap-2">
                                {dryFruitsRecommendations.map((fruit, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm">
                                    <span>{fruit.emoji}</span>
                                    <div>
                                      <div className="font-medium text-gray-800">{fruit.name}</div>
                                      <div className="text-gray-600 text-xs">{fruit.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Custom Notes */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                            <span>📝</span>
                            <span>Special Requests</span>
                          </h4>
                          <textarea
                            value={item.customNote}
                            onChange={(e) => updateCustomNote(item.id, e.target.value)}
                            placeholder="Any special requests for this item..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
                            maxLength={150}
                          />
                          <div className="text-xs text-gray-400 mt-1 text-right">{item.customNote.length}/150</div>
                        </div>

                        {/* Item Total */}
                        <div className="flex justify-between items-center pt-3 border-t">
                          <span className="font-medium text-gray-700">Item Total</span>
                          <span className="font-bold text-lg text-orange-600">
                            £{calculateItemTotal(item).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Checkout Section */}
                    <div className="mt-8 border-t bg-gray-50 rounded-t-3xl p-6">
                      <div className="space-y-4">
                    {/* Order Summary */}
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <span>📋</span>
                        <span>Order Summary</span>
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal ({itemCount} items):</span>
                          <span>£{calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Delivery:</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                          <span>Total:</span>
                          <span className="text-orange-600">£{calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-gray-800 flex items-center space-x-2">
                        <span>🚚</span>
                        <span>Delivery Details</span>
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <textarea
                          placeholder="Delivery Address"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        />
                        <input
                          type="text"
                          placeholder="Postcode"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-gray-800 flex items-center space-x-2">
                        <span>💳</span>
                        <span>Payment Method</span>
                      </h4>
                      <div className="space-y-2">
                        {[
                          { value: 'card', icon: '💳', label: 'Credit/Debit Card' },
                          { value: 'paypal', icon: '🅿️', label: 'PayPal' },
                          { value: 'apple', icon: '📱', label: 'Apple Pay' }
                        ].map((method) => (
                          <label key={method.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input type="radio" name="payment" value={method.value} defaultChecked={method.value === 'card'} className="text-orange-500 w-4 h-4" />
                            <span className="flex items-center space-x-2">
                              <span>{method.icon}</span>
                              <span>{method.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-gray-800 flex items-center space-x-2">
                        <span>📝</span>
                        <span>Special Instructions</span>
                      </h4>
                      <textarea
                        placeholder="Any special requests or delivery notes..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
                      />
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      onClick={() => {
                        const orderDetails = cartItems.map(item => 
                          `${item.name} (x${item.quantity}) - Sugar: ${item.sugarLevel}${item.extraDryFruits ? ', Extra Dry Fruits' : ''}`
                        ).join('\n');
                        alert(`Order Details:\n\n${orderDetails}\n\nTotal: £${calculateTotal().toFixed(2)}\n\nPayment functionality will be integrated soon!`);
                      }}
                    >
                      <span>🔒</span>
                      <span>Secure Checkout - £{calculateTotal().toFixed(2)}</span>
                    </button>

                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                        <span>🔒</span>
                        <span>256-bit SSL encryption • Your payment is secure</span>
                      </p>
                      <button
                        onClick={clearCart}
                        className="text-gray-500 hover:text-gray-700 transition-colors text-sm underline"
                      >
                        Clear Cart
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
