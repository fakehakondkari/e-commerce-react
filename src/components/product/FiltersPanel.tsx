import type { Category, Brand } from '../../types';
import type { ProductFilters } from '../../contexts/ProductContext';
import { useMemo } from 'react';

interface FiltersPanelProps {
  categories: Category[];
  brands: Brand[];
  filters: ProductFilters;
  onChange: (value: Partial<ProductFilters>) => void;
}

export function FiltersPanel({ categories, brands, filters, onChange }: FiltersPanelProps) {
  const priceMax = useMemo(() => Math.max(...[500, filters.priceRange[1]]), [filters.priceRange]);

  return (
    <aside className="space-y-6 rounded-32 border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Category</label>
          <select value={filters.category} onChange={(e) => onChange({ category: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand">
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Brand</label>
          <select value={filters.brand} onChange={(e) => onChange({ brand: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand">
            <option value="all">All brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Gender</label>
          <select value={filters.gender} onChange={(e) => onChange({ gender: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand">
            <option value="all">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Price range</label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <input type="number" value={filters.priceRange[0]} min={0} onChange={(event) => onChange({ priceRange: [Number(event.target.value), filters.priceRange[1]] })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand" />
            <input type="number" value={filters.priceRange[1]} min={0} max={priceMax} onChange={(event) => onChange({ priceRange: [filters.priceRange[0], Number(event.target.value)] })} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Minimum rating</label>
          <input type="range" min="0" max="5" step="0.5" value={filters.rating} onChange={(e) => onChange({ rating: Number(e.target.value) })} className="mt-3 w-full accent-brand" />
          <p className="mt-2 text-sm text-slate-500">{filters.rating}+ stars</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Discount</label>
          <select value={filters.discount} onChange={(e) => onChange({ discount: Number(e.target.value) })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand">
            <option value={0}>Any discount</option>
            <option value={10}>10% or more</option>
            <option value={20}>20% or more</option>
            <option value={30}>30% or more</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
