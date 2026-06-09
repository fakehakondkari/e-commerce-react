import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Heart, LayoutGrid, LogOut, Menu, Search, ShoppingBag, SunMoon, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface NavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { categories, brands, setFilters } = useProducts();

  const profileOptions = useMemo(
    () => [
      { label: 'Profile', href: '/profile' },
      { label: 'Orders', href: '/profile' },
      { label: 'Logout', action: logout }
    ],
    [logout]
  );

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({ search: searchTerm, category: 'all', brand: 'all' });
    navigate('/shop');
  };

  return (
    <header className="sticky top-0 z-40 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-brand">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-light text-brand">F</span>
          Fashion Bazaar
        </Link>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <form onSubmit={onSearch} className="relative w-full" style={{ maxWidth: '32rem' }}>
            <Search className="absolute left-4 top-1/2 h-5 w-5 text-slate-400" style={{ transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for jackets, sneakers, accessories..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand focus:bg-white"
            />
          </form>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onToggleDark} className="hidden rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 md:inline-flex">
            <SunMoon className="h-5 w-5" />
          </button>

          <Link to="/wishlist" className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-brand hover:text-brand">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 ? <span className="absolute -right-1 -top-1 rounded-full bg-brand px-2 text-xs-10 text-white">{wishlistCount}</span> : null}
          </Link>

          <Link to="/cart" className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-brand hover:text-brand">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 ? <span className="absolute -right-1 -top-1 rounded-full bg-brand px-2 text-xs-10 text-white">{totalItems}</span> : null}
          </Link>

          <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm md:flex">
            <button onClick={() => setCategoriesOpen((value) => !value)} className="inline-flex items-center gap-1 text-slate-700 hover:text-brand">
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            {categoriesOpen ? (
              <div className="absolute top-16 left-4 z-20 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
                <div className="grid gap-3">
                  {categories.slice(0, 4).map((category) => (
                    <Link key={category.id} to="/shop" onClick={() => { setFilters({ category: category.name, search: '' }); setCategoriesOpen(false); }} className="rounded-2xl px-3 py-2 text-sm text-slate-700 transition hover:bg-brand-10 hover:text-brand">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative md:hidden">
            <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100">
              <Menu className="h-5 w-5" />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-12 z-30 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
                <Link to="/shop" className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-brand-10 hover:text-brand">Shop</Link>
                <Link to="/wishlist" className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-brand-10 hover:text-brand">Wishlist</Link>
                <Link to="/cart" className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-brand-10 hover:text-brand">Cart</Link>
                <Link to="/profile" className="block rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-brand-10 hover:text-brand">Profile</Link>
              </div>
            ) : null}
          </div>

          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <User className="mr-2 h-4 w-4 text-slate-600" />
            {user ? (
              <div className="relative group">
                <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-900">
                  {user.name} <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible absolute right-0 top-10 z-20 w-40 rounded-3xl border border-slate-200 bg-white p-3 shadow-card transition group-hover:visible">
                  {profileOptions.map((item) =>
                    item.action ? (
                      <button key={item.label} onClick={item.action} className="block w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-brand-10 hover:text-brand">
                        {item.label}
                      </button>
                    ) : (
                      <Link key={item.label} to={item.href} className="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-brand-10 hover:text-brand">
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-slate-700 transition hover:text-brand">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
