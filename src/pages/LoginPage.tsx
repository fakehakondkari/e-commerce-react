import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/common/ToastContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      notify('Logged in successfully', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      setError((error as Error).message);
      notify('Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen-minus-140 max-w-4xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-40 border border-slate-200 bg-white p-8 shadow-card sm:p-12">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-30 text-brand">Welcome back</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Sign in to your account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand" />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button type="submit" disabled={loading} className="w-full rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button type="button" className="rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">Continue with Google</button>
          <button type="button" className="rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">Continue with Apple</button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <a href="/signup" className="font-semibold text-brand hover:text-pink-600">Create an account</a>
        </p>
      </div>
    </div>
  );
}
