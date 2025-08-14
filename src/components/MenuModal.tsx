import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { X, ShoppingCart, Star } from 'lucide-react';

import { useCart } from '../contexts/CartContext';

import { menuItems } from '../data/menuItems';

import { MenuItem } from '../types';



interface MenuModalProps {

isOpen: boolean;

onClose: () => void;

}



export function MenuModal({ isOpen, onClose }: MenuModalProps) {

const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

const { addToCart } = useCart();



const handleAddToCart = (item: MenuItem) => {

addToCart(item);

if (selectedItem) setSelectedItem(null);

};



return (

<AnimatePresence>

{isOpen && (

<motion.div

className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"

initial={{ opacity: 0 }}

animate={{ opacity: 1 }}

exit={{ opacity: 0 }}

transition={{ duration: 0.3 }}

onClick={onClose}

>

<motion.div

className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"

initial={{ opacity: 0, scale: 0.9, y: 50 }}

animate={{ opacity: 1, scale: 1, y: 0 }}

exit={{ opacity: 0, scale: 0.9, y: 50 }}

transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}

onClick={(e) => e.stopPropagation()}

>

<div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-500 to-yellow-500 text-white">

<div>

<h2 className="text-3xl font-bold">Our Family Menu</h2>

<p className="text-orange-100">Traditional recipes made with love</p>

</div>

<button

onClick={onClose}

className="p-2 hover:bg-white/20 rounded-full transition-colors"

>

<X className="w-6 h-6" />

</button>

</div>



<div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-5rem)]">

<div className="lg:w-2/3 p-6 overflow-y-auto">

<div className="mb-8">

<h3 className="text-2xl font-bold text-gray-800 mb-2">Two Treasured Family Recipes</h3>

<p className="text-gray-600">Starting our journey with the recipes our family has cherished for generations.</p>

</div>



<div className="grid gap-6">

{menuItems.map((item, index) => (

<motion.div

key={item.id}

className="bg-white border-2 border-gray-100 rounded-3xl p-6 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer"

initial={{ opacity: 0, y: 20 }}

animate={{ opacity: 1, y: 0 }}

transition={{ duration: 0.4, delay: index * 0.1 }}

onClick={() => setSelectedItem(item)}

>

<div className="flex flex-col sm:flex-row gap-6">

<div className="relative">

<img

src={item.image}

alt={item.name}

className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-2xl"

/>

{item.isFavorite && (

<div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">

<Star className="w-4 h-4 fill-current" />

<span>Family Favorite</span>

</div>

)}

</div>

<div className="flex-1">

<div className="flex justify-between items-start mb-3">

<h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>

<span className="text-2xl font-bold text-orange-500">£{item.price}</span>

</div>

<p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>



<div className="space-y-2 mb-4">

{item.ingredients.map((ingredient, i) => (

<div key={i} className="flex items-center space-x-2 text-sm text-gray-600">

<div className="w-2 h-2 bg-orange-400 rounded-full"></div>

<span>{ingredient}</span>

</div>

))}

{item.serves && (

<div className="flex items-center space-x-2 text-sm text-gray-600">

<div className="w-2 h-2 bg-orange-400 rounded-full"></div>

<span>{item.serves}</span>

</div>

)}

</div>



<div className="flex space-x-3">

<button

onClick={(e) => {

e.stopPropagation();

handleAddToCart(item);

}}

className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold"

>

<ShoppingCart className="w-4 h-4" />

<span>Add to Cart</span>

</button>

<button

onClick={(e) => {

e.stopPropagation();

setSelectedItem(item);

}}

className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition-colors font-semibold"

>

Learn More

</button>

</div>

</div>

</div>

</motion.div>

))}

</div>



{/* Coming Soon Section */}

<motion.div

className="mt-8 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-3xl p-8 text-center"

initial={{ opacity: 0, y: 20 }}

animate={{ opacity: 1, y: 0 }}

transition={{ duration: 0.4, delay: 0.3 }}

>

<h3 className="text-2xl font-bold text-gray-800 mb-4">More Recipes Coming Soon!</h3>

<p className="text-gray-600 mb-6">

As we grow, we'll be adding more traditional family recipes to share the rich heritage of Indian sweets with you.

</p>

<div className="text-4xl mb-4">🍯🥛✨</div>

<p className="text-gray-500 text-sm">Stay tuned for more authentic flavors</p>

</motion.div>

</div>



{selectedItem && (

<motion.div

className="lg:w-1/3 bg-gradient-to-b from-orange-50 to-yellow-50 p-6 border-l overflow-y-auto"

initial={{ opacity: 0, x: 50 }}

animate={{ opacity: 1, x: 0 }}

transition={{ duration: 0.3 }}

>

<div className="flex justify-between items-start mb-4">

<h3 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h3>

<button

onClick={() => setSelectedItem(null)}

className="p-1 hover:bg-gray-200 rounded-full"

>

<X className="w-5 h-5" />

</button>

</div>



<div className="relative mb-4">

<img

src={selectedItem.image}

alt={selectedItem.name}

className="w-full h-48 object-cover rounded-2xl object-center"

/>

{selectedItem.isFavorite && (

<div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">

<Star className="w-4 h-4 fill-current" />

<span>Family Favorite</span>

</div>

)}

</div>



<p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>



<div className="mb-6">

<h4 className="font-semibold text-gray-800 mb-3">What makes it special:</h4>

<div className="space-y-3">

{selectedItem.ingredients.map((ingredient, i) => (

<div key={i} className="flex items-center space-x-3">

<div className="w-3 h-3 bg-orange-400 rounded-full"></div>

<span className="text-gray-700">{ingredient}</span>

</div>

))}

{selectedItem.serves && (

<div className="flex items-center space-x-3">

<div className="w-3 h-3 bg-orange-400 rounded-full"></div>

<span className="text-gray-700">{selectedItem.serves}</span>

</div>

)}

</div>

</div>



<div className="flex items-center justify-between mb-6">

<span className="text-3xl font-bold text-orange-500">£{selectedItem.price}</span>

</div>



<button

onClick={() => handleAddToCart(selectedItem)}

className="w-full bg-orange-500 text-white py-4 rounded-full hover:bg-orange-600 transition-colors font-semibold text-lg flex items-center justify-center space-x-2"

>

<ShoppingCart className="w-5 h-5" />

<span>Add to Cart</span>

</button>



<div className="mt-6 p-4 bg-white rounded-2xl">

<h4 className="font-semibold text-gray-800 mb-2">Family Promise</h4>

<p className="text-sm text-gray-600">

Made with the same love and traditional techniques that have been passed down through our family for generations.

</p>

</div>

</motion.div>

)}

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

);

}