export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  description: string;
  images: string[];
  stock: number;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  products: OrderItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  addresses: Address[];
  orders: Order[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
}
