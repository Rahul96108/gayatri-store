import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-20 text-center text-2xl font-bold">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-brand-bg p-6 md:p-20">
      <Link to="/" className="flex items-center gap-2 text-brand-red font-bold mb-10 hover:underline">
        <ChevronLeft /> Back to Collection
      </Link>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <img src={product.image} alt={product.name} className="rounded-3xl shadow-2xl border-8 border-white" />
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="flex gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full text-sm font-bold uppercase">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-6xl font-black italic text-brand-red">{product.name}</h1>
          <p className="text-2xl font-bold text-brand-accent">{product.price}</p>
          <p className="text-xl text-gray-700 leading-relaxed">{product.description}</p>
          
          <button className="w-full bg-brand-red text-white py-5 rounded-full text-2xl font-black italic shadow-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-4">
            <ShoppingCart /> Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
