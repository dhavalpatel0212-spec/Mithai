import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  // This variable is used to calculate the number of items in the cart.
  // It's calculated here to avoid recalculating it multiple times.
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="text-lg font-semibold mb-2">Your cart is empty</p>
                    <p className="text-sm">Add some delicious sweets to get started!</p>
                  </div>
                ) : (
                  <div className="px-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover object-center rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-orange-500 font-bold">£{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t bg-gray-50 p-6 flex-shrink-0">
                  <div className="space-y-4">
                    {/* Order Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery:</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
                        <span>Total:</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg border p-4">
                        <h4 className="font-semibold mb-3 text-gray-800">Payment Method</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input type="radio" name="payment" value="card" defaultChecked className="text-orange-500 w-4 h-4" />
                            <span className="flex items-center space-x-2">
                              <span>💳</span>
                              <span>Credit/Debit Card</span>
                            </span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input type="radio" name="payment" value="paypal" className="text-orange-500 w-4 h-4" />
                            <span className="flex items-center space-x-2">
                              <span>🅿️</span>
                              <span>PayPal</span>
                            </span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input type="radio" name="payment" value="apple" className="text-orange-500 w-4 h-4" />
                            <span className="flex items-center space-x-2">
                              <span>📱</span>
                              <span>Apple Pay</span>
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border p-4">
                        <h4 className="font-semibold mb-3 text-gray-800">Delivery Information</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <span>🚚</span>
                            <span>Free delivery across UK</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>⏰</span>
                            <span>Delivered within 2-3 business days</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>📦</span>
                            <span>Carefully packaged to maintain freshness</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                      onClick={() => {
                        alert('Payment functionality will be integrated with Stripe/PayPal. Order total: £' + total.toFixed(2));
                      }}
                    >
                      <span>🔒</span>
                      <span>Secure Checkout - £{total.toFixed(2)}</span>
                    </button>

                    <div className="text-center text-xs text-gray-500">
                      <p>🔒 Secure SSL encryption</p>
                      <p>Your payment information is safe and secure</p>
                    </div>

                    <button
                      onClick={clearCart}
                      className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                      Clear Cart
                    </button>
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