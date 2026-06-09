import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 text-slate-700">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Fashion Bazaar</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
            A modern fashion marketplace for curated womenswear, menswear, accessories, and lifestyle essentials.
          </p>
          <div className="mt-5 flex items-center gap-3 text-slate-500">
            <Mail size={18} /> <span>support@fashionbazaar.com</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-slate-500">
            <Phone size={18} /> <span>+91 800 123 4567</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-12 text-slate-900">Company</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/" className="block hover:text-brand">About Us</Link>
            <Link to="/" className="block hover:text-brand">Careers</Link>
            <Link to="/" className="block hover:text-brand">Press</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-12 text-slate-900">Support</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/" className="block hover:text-brand">Shipping</Link>
            <Link to="/" className="block hover:text-brand">Returns</Link>
            <Link to="/" className="block hover:text-brand">Help Center</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-12 text-slate-900">Newsletter</h4>
          <p className="mt-4 text-sm leading-6 text-slate-600">Get the latest launches and exclusive offers delivered to your inbox.</p>
          <form className="mt-5 flex items-center gap-2">
            <input type="email" placeholder="Email address" className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand" />
            <button type="submit" className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Subscribe</button>
          </form>
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <Facebook size={18} className="cursor-pointer hover:text-brand" />
            <Instagram size={18} className="cursor-pointer hover:text-brand" />
            <Linkedin size={18} className="cursor-pointer hover:text-brand" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <p>© 2026 Fashion Bazaar. Designed for modern wardrobe journeys.</p>
          <div className="flex items-center gap-3 text-slate-500">
            <ShieldCheck size={16} /> <span>Secure checkout and shopping guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
