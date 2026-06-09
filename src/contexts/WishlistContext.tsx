import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product, WishlistItem } from '../types';

interface WishlistContextValue {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (productId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const WISHLIST_KEY = 'fashion-ecommerce-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(WISHLIST_KEY);
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((current) => {
      if (current.some((item) => item.product.id === product.id)) return current;
      return [...current, { product }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((current) => current.filter((item) => item.product.id !== productId));
  };

  const moveToCart = (productId: string) => {
    setWishlist((current) => current.filter((item) => item.product.id !== productId));
  };

  const count = useMemo(() => wishlist.length, [wishlist]);

  return <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, moveToCart, count }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
