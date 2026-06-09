import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { Loader } from '../components/common/Loader';
import { ProductCard } from '../components/product/ProductCard';
import { sampleBrands, sampleCategories } from '../data/mockData';

const heroSlides = [
  { title: 'Summer Edit', description: 'Refresh your wardrobe with pastel silhouettes and warm-weather essentials.', image: 'https://images.unsplash.com/photo-1520975910121-1aec7d718085?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Statement Accessories', description: 'Bold bags, sleek shades, and must-have jewellery for every look.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80' }
];

export function HomePage() {
  const { products, loading } = useProducts();

  const trending = useMemo(() => products.slice(0, 4), [products]);
  const bestSellers = useMemo(() => products.slice(1, 5), [products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-14 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-hero">
        <div className="rounded-40 bg-gradient-to-br from-brand-10 via-white to-white p-8 shadow-card">
          <div className="flex h-full flex-col justify-between gap-8 rounded-40 bg-white p-8 md:p-12">
            <div>
              <p className="text-sm uppercase tracking-30 text-brand">New arrivals</p>
              <h1 className="mt-5 text-4xl font-semibold text-slate-900 sm:text-5xl">Refresh your wardrobe with a modern fashion edit.</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">Explore curated pieces, trending drops, and premium brands designed for every day and every celebration.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">Shop the collection</Link>
              <Link to="/profile" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">View profile</Link>
            </div>
          </div>
        </div>

        <div className="grid gap-36">
          {heroSlides.map((slide) => (
            <div key={slide.title} className="group relative overflow-hidden rounded-36 shadow-card">
              <img src={slide.image} alt={slide.title} className="h-180 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-6 text-white">
                <p className="text-sm uppercase tracking-30 text-pink-200">{slide.title}</p>
                <p className="mt-4 text-xl font-semibold sm:text-2xl">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-30 text-brand">Trending now</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Popular picks</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-pink-600">
            Discover more <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-36 border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4 text-brand">
            <TrendingUp size={24} />
            <div>
              <p className="text-sm uppercase tracking-30">Promo offers</p>
              <h3 className="text-2xl font-semibold text-slate-900">Get complimentary styling tips on orders over ₹4999</h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-600">Enjoy limited-time offers on select brands, next-day delivery, and curated bundles for special occasions.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sampleCategories.map((category) => (
            <Link key={category.id} to="/shop" className="group overflow-hidden rounded-32 border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
              <img src={category.image} alt={category.name} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-4">
                <p className="text-lg font-semibold text-slate-900">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-30 text-brand">Best sellers</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Top-rated wardrobe essentials</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-30 text-brand">Featured brands</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Brands you’ll love</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sampleBrands.map((brand) => (
            <div key={brand.id} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-card transition">
              <img src={brand.logo} alt={brand.name} className="mx-auto h-12 w-auto" />
              <p className="mt-4 text-lg font-medium text-slate-900">{brand.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
