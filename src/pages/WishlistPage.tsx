import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-slate-900">Your wishlist is empty</h1>
        <p className="mt-4 text-slate-600">Save favorites to come back to the perfect fit later.</p>
        <Link to="/shop" className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Wishlist</h1>
      <div className="mt-10 grid gap-6">
        {wishlist.map((item) => (
          <div key={item.product.id} className="grid gap-6 rounded-32 border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-cart-mobile md:items-center">
            <img src={item.product.images[0]} alt={item.product.title} className="h-32 w-full rounded-3xl object-cover md:h-36 md:w-32" />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{item.product.title}</h2>
                  <p className="text-sm text-slate-500">{item.product.brand}</p>
                </div>
                <p className="text-lg font-semibold text-slate-900">₹{item.product.price}</p>
              </div>
              <p className="text-sm text-slate-600">{item.product.discount}% off · {item.product.rating} stars</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => addToCart(item.product, item.product.sizes[0], item.product.colors[0])} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">
                  <ShoppingBag size={16} /> Move to cart
                </button>
                <button onClick={() => removeFromWishlist(item.product.id)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
                  <Heart size={16} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
