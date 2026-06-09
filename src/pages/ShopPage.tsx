import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { ProductCard } from '../components/product/ProductCard';
import { FiltersPanel } from '../components/product/FiltersPanel';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' }
];

export function ShopPage() {
  const { filteredProducts, categories, brands, filters, setFilters, resetFilters, loading } = useProducts();
  const [page, setPage] = useState(1);
  const perPage = 8;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const currentProducts = useMemo(() => filteredProducts.slice((page - 1) * perPage, page * perPage), [filteredProducts, page]);

  if (loading) {
    return <Loader />;
  }

  if (!filteredProducts.length) {
    return <ErrorState title="No products found" description="Try adjusting your filters or search to find something you’ll love." />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-30 text-brand">Explore</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">All products</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select value={filters.sortBy} onChange={(e) => setFilters({ sortBy: e.target.value as any })} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand">
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button onClick={resetFilters} className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-brand hover:text-brand">
            <Loader2 size={16} /> Reset filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-filter">
        <FiltersPanel categories={categories} brands={brands} filters={filters} onChange={(value) => { setFilters(value); setPage(1); }} />
        <section className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p>Showing {currentProducts.length} of {filteredProducts.length} products</p>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage((value) => Math.max(value - 1, 1))} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-brand hover:text-brand">
                Previous
              </button>
              <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((value) => Math.min(value + 1, totalPages))} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-brand hover:text-brand">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
