import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2, Star, Info, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { EmailService } from '../utils/emailService';

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
  weight?: string;
  extraDryFruits: 'none' | 'minimum' | 'plus' | 'extra';
  customNote: string;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const [cartItems, setCartItems] = useState<CartItemExtended[]>(
    items.map(item => ({
      ...item,
      extraDryFruits: item.extraDryFruits || 'none',
      customNote: item.customNote || ''
    }))
  );

  useEffect(() => {
    setCartItems(current => {
      const newItems = items.map(item => {
        const existing = current.find(c => c.id === item.id);
        return existing ? { ...existing, ...item } : {
          ...item,
          extraDryFruits: item.extraDryFruits || 'none',
          customNote: item.customNote || ''
        };
      });
      return newItems;
    });
  }, [items]);

  // FIX: This useEffect now handles locking the body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      const scrollY = document.body.style.top;
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    };
  }, [isOpen]);

  // FIX: This useEffect captures and handles mousewheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isOpen]);

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
          tabIndex={-1}
          ref={modalRef}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg h-[95vh] flex flex-col"
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex-shrink-0">
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
            <div ref={scrollableRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-gray-500 px-6">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p className="text-lg font-semibold mb-2">Your cart is empty</p>
                  <p className="text-sm text-center">Add some delicious sweets to get started!</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-gray-50 rounded-2xl p-4 border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
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
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-medium text-gray-700">Item Total</span>
                        <span className="font-bold text-lg text-orange-600">
                          £{calculateItemTotal(item).toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            <div className="flex-shrink-0 bg-white border-t-2 border-gray-200 p-6 shadow-lg overflow-hidden">
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                  <span>📋</span>
                  <span>Order Summary</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items):</span>
                    <span className="font-medium">£{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Delivery Fee:</span>
                    <span className="font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold border-t border-gray-300 pt-3 mt-3">
                    <span>Total:</span>
                    <span className="text-orange-600">£{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mb-4"
                onClick={async () => {
                  const customerEmail = prompt('Please enter your email address for order confirmation:');

                  if (!customerEmail) {
                    return;
                  }

                  if (!EmailService.validateEmail(customerEmail)) {
                    alert('Please enter a valid email address (e.g., name@example.com)');
                    return;
                  }

                  const orderId = `TRS${Date.now().toString().slice(-6)}`;

                  const processingAlert = `
🔄 PROCESSING YOUR ORDER...
═══════════════════════════════

📦 Order ID: #${orderId}
💰 Total: £${calculateTotal().toFixed(2)}
📧 Email: ${customerEmail}

Please wait while we process your payment and send confirmation...
                  `;

                  alert(processingAlert);

                  try {
                    const orderItems = cartItems.map(item => ({
                      id: item.id,
                      name: item.name,
                      price: calculateItemTotal(item) / item.quantity,
                      quantity: item.quantity,
                      weight: item.weight,
                      extraDryFruits: item.extraDryFruits,
                      customNote: item.customNote
                    }));

                    const orderDetails = {
                      items: orderItems,
                      total: calculateTotal(),
                      customerEmail,
                      orderId
                    };

                    const emailSent = await EmailService.sendOrderConfirmation(orderDetails);

                    if (emailSent) {
                      const successMessage = `
🎉 ORDER CONFIRMED!
═══════════════════

✅ Payment Successful
✅ Order ID: #${orderId}
✅ Confirmation email sent to: ${customerEmail}

📦 ORDER SUMMARY:
${cartItems.map(item => 
`• ${item.name} (${item.weight || 'Standard'}) x${item.quantity} - £${calculateItemTotal(item).toFixed(2)}`
).join('\n')}

💰 Total Paid: £${calculateTotal().toFixed(2)}

🚚 DELIVERY:
• Free UK-wide delivery
• 1-2 business days
• Tracking info will be emailed

Thank you for choosing Traditional Royal Sweets!
                      `;

                      alert(successMessage);

                      setTimeout(() => {
                        clearCart();
                        onClose();
                      }, 1500);

                    } else {
                      throw new Error('Email service failed');
                    }

                  } catch (error) {
                    console.error('Order processing failed:', error);
                    alert(`
❌ ORDER PROCESSING ERROR
═══════════════════════════

Sorry, there was an issue processing your order.
Please try again or contact support.

Your cart has been preserved.
                    `);
                  }
                }}
              >
                <Mail className="w-5 h-5" />
                <span>Checkout & Email Receipt - £{calculateTotal().toFixed(2)}</span>
              </button>
              <div className="flex justify-center items-center space-x-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <span>💳</span>
                  <span>Card</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <span>🅿️</span>
                  <span>PayPal</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <span>📱</span>
                  <span>Apple Pay</span>
                </span>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                  <span>🔒</span>
                  <span>256-bit SSL encryption • Your payment is secure</span>
                </p>
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}