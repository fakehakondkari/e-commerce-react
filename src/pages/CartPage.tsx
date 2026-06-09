import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalItems, totalAmount } = useCart();
  const [coupon, setCoupon] = useState('');
  const discount = coupon === 'FASHION20' ? 0.2 * totalAmount : 0;
  const finalTotal = totalAmount - discount;

  const deliveryEstimate = useMemo(() => `Estimated delivery in 3-5 business days`, []);

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-slate-900">Your cart is waiting</h1>
        <p className="mt-4 text-slate-600">Add your favorite items and proceed to checkout when you’re ready.</p>
        <Link to="/shop" className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Shopping cart</h1>
      <div className="mt-10 grid gap-8 xl:grid-cols-cart">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.product.id} className="rounded-32 border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <img src={item.product.images[0]} alt={item.product.title} className="h-36 w-36 rounded-3xl object-cover" />
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl font-semibold text-slate-900">{item.product.title}</h2>
                  <p className="text-sm text-slate-500">{item.product.brand} · {item.selectedSize} · {item.selectedColor}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span>₹{item.product.price}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{item.product.discount}% off</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-slate-700">-</button>
                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-slate-700">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm text-rose-600 transition hover:bg-rose-50">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-32 border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>{totalItems} items</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Coupon</span>
              <span>{coupon === 'FASHION20' ? '-₹' + discount.toFixed(2) : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>Free</span>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            <p>{deliveryEstimate}</p>
          </div>
          <div className="mt-6 space-y-3">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand" />
            <button className="w-full rounded-full bg-brand px-5 py-4 text-sm font-semibold text-white transition hover:bg-pink-600">Proceed to checkout</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
