import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuth();

  const orderHistory = useMemo(() => user?.orders ?? [], [user]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-40 border border-slate-200 bg-white p-8 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">Your profile</h1>
            <p className="mt-3 text-slate-600">Manage your account, view order history, and keep your details up to date.</p>
          </div>
          <button onClick={logout} className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Sign out</button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-profile">
          <section className="rounded-32 border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Account details</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Name:</span> {user?.name}</p>
              <p><span className="font-semibold text-slate-900">Email:</span> {user?.email}</p>
              <p><span className="font-semibold text-slate-900">Addresses saved:</span> {user?.addresses.length ?? 0}</p>
            </div>
          </section>
          <section className="space-y-4">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Saved addresses</h2>
              <div className="mt-6 space-y-4">
                {user?.addresses.map((address) => (
                  <div key={address.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{address.label}</p>
                    <p className="text-sm text-slate-600">{address.street}, {address.city}, {address.state} {address.postalCode}</p>
                    <p className="text-sm text-slate-600">{address.phone}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-900">Order history</h2>
              <div className="mt-6 divide-y divide-slate-200">
                {orderHistory.length ? orderHistory.map((order) => (
                  <div key={order.id} className="py-4">
                    <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                    <p className="text-sm text-slate-600">Placed on {order.createdAt} · ₹{order.total.toFixed(2)} · {order.status}</p>
                  </div>
                )) : <p className="text-sm text-slate-500">No orders yet. Start shopping to see your purchases here.</p>}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
