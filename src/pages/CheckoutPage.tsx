import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export function CheckoutPage() {
  const { cart, totalAmount } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses[0]?.id ?? '');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-slate-900">No items to checkout</h1>
        <p className="mt-4 text-slate-600">Add products to your cart before placing an order.</p>
        <Link to="/shop" className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-checkout">
        <section className="rounded-40 border border-slate-200 bg-white p-8 shadow-card">
          <h1 className="text-4xl font-semibold text-slate-900">Checkout</h1>
          <div className="mt-8 space-y-8">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Shipping address</h2>
              <div className="mt-4 space-y-3">
                {user?.addresses.map((address) => (
                  <label key={address.id} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                    <input type="radio" checked={selectedAddress === address.id} onChange={() => setSelectedAddress(address.id)} className="mt-2 h-5 w-5 accent-brand" />
                    <div>
                      <p className="font-semibold text-slate-900">{address.label}</p>
                      <p className="text-sm text-slate-600">{address.street}, {address.city}, {address.state} {address.postalCode}</p>
                      <p className="text-sm text-slate-600">{address.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Payment method</h2>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-5 w-5 accent-brand" />
                  <div>
                    <p className="font-semibold text-slate-900">Credit / Debit card</p>
                    <p className="text-sm text-slate-600">Fast and secure payments with your favourite cards.</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="h-5 w-5 accent-brand" />
                  <div>
                    <p className="font-semibold text-slate-900">UPI</p>
                    <p className="text-sm text-slate-600">Quick bank transfer through UPI apps.</p>
                  </div>
                </label>
              </div>
            </div>
            <div className="rounded-32 border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-pink-600">Place order</button>
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-32 border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Delivery details</h2>
            <p className="mt-4 text-sm text-slate-600">Orders are processed within 24 hours and delivered within 3-5 business days.</p>
          </div>
          <div className="rounded-32 border border-slate-200 bg-slate-50 p-6\">
            <h2 className="text-xl font-semibold text-slate-900">Need help?</h2>
            <p className="mt-4 text-sm text-slate-600">Contact support for shipping, returns, or account questions.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
