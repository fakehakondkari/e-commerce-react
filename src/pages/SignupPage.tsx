import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/common/ToastContext';

const strengthLabel = (password: string) => {
  if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'Strong';
  if (password.length >= 8) return 'Medium';
  return 'Weak';
};

export function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();

  const strength = useMemo(() => strengthLabel(formData.password), [formData.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register({ ...formData, addresses: [], orders: [] });
      notify('Account created successfully', 'success');
      navigate('/');
    } catch (error) {
      setError((error as Error).message);
      notify('Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen-minus-140 max-w-4xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-40 border border-slate-200 bg-white p-8 shadow-card sm:p-12">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-30 text-brand">Create your account</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Join Fashion Bazaar</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Full name</label>
            <input value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} required className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} required className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand" />
            <p className="mt-3 text-sm text-slate-500">Password strength: <span className="font-semibold text-slate-900">{strength}</span></p>
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button type="submit" disabled={loading} className="w-full rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <a href="/login" className="font-semibold text-brand hover:text-pink-600">Sign in</a>
        </p>
      </div>
    </div>
  );
}
