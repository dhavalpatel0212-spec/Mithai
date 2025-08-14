export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  weight: string;
  variants?: {
    id: string;
    weight: string;
    price: number;
    originalPrice?: number | null;
  }[];
  image: string;
  category: string;
  ingredients: string[];
  serves?: string;
  isFavorite?: boolean;
  extraDryFruits?: 'none' | 'minimum' | 'plus' | 'extra';
  customNote?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  verified: boolean;
  avatar?: string;
}