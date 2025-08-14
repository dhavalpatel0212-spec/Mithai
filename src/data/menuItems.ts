
import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Kheer',
    description: 'A creamy, comforting dessert made from milk, rice, and a mix of premium dry fruits. Slow-cooked to perfection with cardamom and saffron.',
    price: 7.50,
    originalPrice: null,
    weight: '500g',
    variants: [
      { id: '1-500g', weight: '500g', price: 7.50, originalPrice: null },
      { id: '1-1kg', weight: '1kg', price: 9.99, originalPrice: 12.99 },
      { id: '1-2kg', weight: '2kg', price: 19.99, originalPrice: 24.99 }
    ],
    image: '/attached_assets/rice-kheer-instant-pot-featured-image_1755188662871.jpg',
    category: 'Traditional Sweets',
    ingredients: ['Basmati Rice', 'Premium Dry Fruits', 'Cardamom & Saffron', 'Pure Milk'],
    serves: 'Serves 2-3 people',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Matho',
    description: 'A thick, rich, and traditional yogurt-based sweet dish. Made with the finest ingredients and traditional techniques passed down through generations.',
    price: 9.99,
    originalPrice: null,
    weight: '500g',
    variants: [
      { id: '2-500g', weight: '500g', price: 9.99, originalPrice: null },
      { id: '2-1kg', weight: '1kg', price: 9.99, originalPrice: 14.99 },
      { id: '2-2kg', weight: '2kg', price: 19.99, originalPrice: 29.99 }
    ],
    image: '/attached_assets/amrakhand-alphonso-flavoured-yogurt-shrikhand-260nw-608706788_1755188662871.webp',
    category: 'Traditional Sweets',
    ingredients: ['Traditional Recipe', 'Premium Yogurt Base', 'Rich & Creamy'],
    serves: 'Serves 2-3 people'
  }
];
