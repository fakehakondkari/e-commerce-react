import type { Brand, Category, Order, Product, User } from '../types';

export const sampleCategories: Category[] = [
  { id: 'cat-1', name: 'Footwear', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80' },
  { id: 'cat-2', name: 'Apparel', image: 'https://images.unsplash.com/photo-1520975910121-1aec7d718085?auto=format&fit=crop&w=900&q=80' },
  { id: 'cat-3', name: 'Accessories', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80' },
  { id: 'cat-4', name: 'Grooming', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80' }
];

export const sampleBrands: Brand[] = [
  { id: 'brand-1', name: 'LuxTrend', logo: 'https://via.placeholder.com/100x40?text=LuxTrend' },
  { id: 'brand-2', name: 'Velvet', logo: 'https://via.placeholder.com/100x40?text=Velvet' },
  { id: 'brand-3', name: 'Nova', logo: 'https://via.placeholder.com/100x40?text=Nova' },
  { id: 'brand-4', name: 'Aster', logo: 'https://via.placeholder.com/100x40?text=Aster' }
];

export const sampleProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Aurora Satin Midi Dress',
    brand: 'Velvet',
    category: 'Apparel',
    gender: 'Women',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.6,
    reviews: 281,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['pink', 'black', 'white'],
    description: 'A smooth satin midi dress with a flattering waistline and modern drape. Perfect for evening outings.',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520975910121-1aec7d718085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 12
  },
  {
    id: 'prod-2',
    title: 'Stratus Running Sneakers',
    brand: 'Nova',
    category: 'Footwear',
    gender: 'Men',
    price: 3199,
    originalPrice: 4499,
    discount: 29,
    rating: 4.4,
    reviews: 142,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['white', 'black'],
    description: 'Lightweight sneakers with responsive cushioning and street-ready style.',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520975910121-1aec7d718085?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 18
  },
  {
    id: 'prod-3',
    title: 'Luxe Soft Blazer',
    brand: 'Aster',
    category: 'Apparel',
    gender: 'Unisex',
    price: 3899,
    originalPrice: 5499,
    discount: 29,
    rating: 4.8,
    reviews: 430,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['navy', 'beige', 'grey'],
    description: 'Structured blazer with stretch fabric and polished tailoring for professional occasions.',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 25
  },
  {
    id: 'prod-4',
    title: 'Essential Leather Tote',
    brand: 'LuxTrend',
    category: 'Accessories',
    gender: 'Women',
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    rating: 4.7,
    reviews: 190,
    sizes: ['One Size'],
    colors: ['tan', 'black'],
    description: 'A soft leather tote with interior compartments made for everyday city essentials.',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 10
  },
  {
    id: 'prod-5',
    title: 'Canvas Utility Jacket',
    brand: 'Nova',
    category: 'Apparel',
    gender: 'Men',
    price: 2799,
    originalPrice: 4099,
    discount: 32,
    rating: 4.5,
    reviews: 215,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['olive', 'khaki'],
    description: 'A rugged utility jacket with defined pockets and tonal hardware for easy layering.',
    images: [
      'https://images.unsplash.com/photo-1520975910121-1aec7d718085?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 14
  }
];

export const sampleUsers: User[] = [
  {
    id: 'user-1',
    name: 'Anika Sharma',
    email: 'anika@fashionbazaar.com',
    password: 'password123',
    addresses: [
      {
        id: 'addr-1',
        label: 'Home',
        street: '52 Orchard Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        phone: '+91 98765 43210'
      }
    ],
    orders: [
      {
        id: 'order-1',
        createdAt: '2026-05-19',
        total: 5698,
        status: 'Delivered',
        products: [
          { productId: 'prod-1', quantity: 1 },
          { productId: 'prod-2', quantity: 1 }
        ]
      }
    ]
  }
];

export const sampleOrders: Order[] = [
  {
    id: 'order-1',
    createdAt: '2026-05-19',
    total: 5698,
    status: 'Delivered',
    products: [
      { productId: 'prod-1', quantity: 1 },
      { productId: 'prod-2', quantity: 1 }
    ]
  }
];
