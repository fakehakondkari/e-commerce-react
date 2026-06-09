import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Brand, Category, Product } from '../types';
import { sampleBrands, sampleCategories, sampleProducts } from '../data/mockData';

interface ProductFilters {
  category: string;
  brand: string;
  gender: string;
  priceRange: [number, number];
  rating: number;
  discount: number;
  search: string;
  sortBy: 'popular' | 'newest' | 'priceLow' | 'priceHigh';
}

interface ProductContextValue {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  brands: Brand[];
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  setFilters: (value: Partial<ProductFilters>) => void;
  loadProductById: (id: string) => void;
  resetFilters: () => void;
}

export type { ProductFilters };

const defaultFilters: ProductFilters = {
  category: 'all',
  brand: 'all',
  gender: 'all',
  priceRange: [0, 500],
  rating: 0,
  discount: 0,
  search: '',
  sortBy: 'popular'
};

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories] = useState<Category[]>(sampleCategories);
  const [brands] = useState<Brand[]>(sampleBrands);
  const [filters, setFiltersState] = useState<ProductFilters>(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!products.length) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products
      .filter((item) => {
        const matchesCategory = filters.category === 'all' || item.category === filters.category;
        const matchesBrand = filters.brand === 'all' || item.brand === filters.brand;
        const matchesGender = filters.gender === 'all' || item.gender === filters.gender;
        const matchesRating = item.rating >= filters.rating;
        const matchesDiscount = item.discount >= filters.discount;
        const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
        const matchesSearch = item.title.toLowerCase().includes(filters.search.toLowerCase());
        return matchesCategory && matchesBrand && matchesGender && matchesRating && matchesDiscount && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'priceLow') return a.price - b.price;
        if (filters.sortBy === 'priceHigh') return b.price - a.price;
        if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
        return b.reviews - a.reviews;
      });

    setFilteredProducts(filtered);
  }, [filters, products]);

  const setFilters = (value: Partial<ProductFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...value }));
  };

  const loadProductById = (id: string) => {
    setSelectedProduct(products.find((product) => product.id === id) || null);
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  const contextValue = useMemo(
    () => ({ products, filteredProducts, categories, brands, filters, loading, error, selectedProduct, setFilters, loadProductById, resetFilters }),
    [products, filteredProducts, categories, brands, filters, loading, error, selectedProduct]
  );

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}
