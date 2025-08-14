import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Kheer',
    description: 'A creamy, comforting dessert made from milk, rice, and a mix of premium dry fruits. Slow-cooked to perfection with cardamom and saffron.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/4518605/pexels-photo-4518605.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    image: 'https://images.pexels.com/photos/5560790/pexels-photo-5560790.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Traditional Sweets',
    ingredients: ['Traditional Recipe', 'Premium Yogurt Base', 'Rich & Creamy'],
    serves: 'Serves 2-3 people'
  }
];