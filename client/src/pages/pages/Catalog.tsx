import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Catalog() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="bg-brand-red text-white py-16 px-10 text-center">
        <h1 className="text-6xl font-black italic mb-4">OUR COLLECTION</h1>
        <p className="text-xl opacity-90">Freshly packed from the heart of our kitchen.</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id}
              className="group bg-white border-2 border-brand-dark rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-brand-accent text-white font-bold px-3 py-1 rounded-full text-sm">
                  {product.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black italic text-brand-red leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-xl font-bold text-brand-accent">{product.price}</span>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-2 font-black italic text-brand-dark group-hover:text-brand-red transition-colors">
                  VIEW DETAILS <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
