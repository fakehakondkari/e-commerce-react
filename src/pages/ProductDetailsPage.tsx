import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Loader } from '../components/common/Loader';

export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, loadProductById, products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (id) {
      loadProductById(id);
    }
  }, [id, loadProductById]);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes[0]);
      setSelectedColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  const similarProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products.filter((item) => item.category === selectedProduct.category && item.id !== selectedProduct.id).slice(0, 4);
  }, [products, selectedProduct]);

  if (loading || !selectedProduct) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: selectedProduct.title }]} />
      <button onClick={() => navigate(-1)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-brand hover:text-brand">
        <ArrowLeft size={16} /> Back to shop
      </button>

      <div className="mt-10 grid gap-8 lg:grid-cols-prod xl:grid-cols-prod2">
        <div className="space-y-6">
          <div className="grid gap-4 rounded-36 border border-slate-200 bg-white p-6 shadow-sm">
            <img src={selectedProduct.images[0]} alt={selectedProduct.title} className="h-420 w-full rounded-32 object-cover" />
            <div className="grid gap-3 sm:grid-cols-3">
              {selectedProduct.images.map((image) => (
                <img key={image} src={image} alt={selectedProduct.title} className="h-28 w-full rounded-3xl object-cover transition hover:opacity-80" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-30 text-brand">{selectedProduct.brand}</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">{selectedProduct.title}</h1>
            <div className="mt-4 flex items-center gap-3 text-slate-700">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                <Star size={16} /> {selectedProduct.rating}
              </div>
              <span className="text-sm text-slate-500">{selectedProduct.reviews} reviews</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">₹{selectedProduct.price}</span>
              <span className="text-sm text-slate-500 line-through">₹{selectedProduct.originalPrice}</span>
              <span className="text-sm font-semibold text-brand">{selectedProduct.discount}% off</span>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">{selectedProduct.description}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-slate-700">Size</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {selectedProduct.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${selectedSize === size ? 'border-brand bg-brand-10 text-brand' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand hover:text-brand'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Color</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {selectedProduct.colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={`h-11 w-11 rounded-full border-2 transition ${selectedColor === color ? 'border-brand ring-2 ring-brand/20' : 'border-slate-200'}`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={() => addToCart(selectedProduct, selectedSize, selectedColor)} className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white transition hover:bg-pink-600">
                <ShoppingBag size={18} className="mr-2" /> Add to cart
              </button>
              <button onClick={() => addToWishlist(selectedProduct)} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
                <Heart size={18} className="mr-2" /> Add to wishlist
              </button>
            </div>
          </div>

          <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Similar products</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {similarProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="rounded-32 border border-slate-200 p-4 transition hover:-translate-y-1 hover:shadow-card">
                  <div className="flex items-center gap-4">
                    <img src={product.images[0]} alt={product.title} className="h-20 w-20 rounded-3xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900">{product.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">₹{product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
