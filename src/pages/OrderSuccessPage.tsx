import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export function OrderSuccessPage() {
  return (
    <div className="mx-auto flex min-h-screen-minus-140 max-w-4xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
      <div className="rounded-40 border border-slate-200 bg-white p-10 shadow-card">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-4xl font-semibold text-slate-900">Order confirmed!</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">Your order is being prepared and will be shipped soon. You’ll receive an email with tracking details shortly.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/shop" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Continue shopping</Link>
          <Link to="/profile" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">View orders</Link>
        </div>
      </div>
    </div>
  );
}
