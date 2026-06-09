import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <article className="group overflow-hidden rounded-28 border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card max-w-xs">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img src={product.images[0]} alt={product.title} className="h-12 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-10 px-2 py-1 text-[10px] font-semibold uppercase tracking-20 text-brand">{product.gender}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star size={12} /> {product.rating}
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="text-base font-semibold text-slate-900 hover:text-brand">
          {product.title}
        </Link>
        <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 text-slate-900">
          <span className="text-lg font-bold">₹{product.price}</span>
          <span className="text-xs text-slate-500 line-through">₹{product.originalPrice}</span>
          <span className="text-xs font-semibold text-brand">{product.discount}% off</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)} className="flex-1 rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-600">
            Add to cart
          </button>
          <button onClick={() => addToWishlist(product)} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand hover:text-brand">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
