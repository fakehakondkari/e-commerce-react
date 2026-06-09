import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen-minus-140 max-w-4xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
      <p className="text-6xl">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">Looks like the page you are looking for no longer exists or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Return home</Link>
    </div>
  );
}
