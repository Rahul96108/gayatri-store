import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Star, ArrowRight, Loader2 } from 'lucide-react';
import './index.css';

// 1. Initialize Supabase (Use the same keys as Admin)
const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function Storefront() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Dynamic Products
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12]">
      {/* BRAND HEADER */}
      <header className="py-10 px-8 text-center">
        <h1 className="text-7xl font-black italic uppercase text-[#8B2312] tracking-tighter">
          Gayatri <span className="text-[#D48C2B]">Snacks</span>
        </h1>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.5em] opacity-40">Authentic Taste • Freshly Packed</p>
      </header>

      {/* DYNAMIC PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center py-40 gap-4">
            <Loader2 className="animate-spin text-[#D48C2B] w-12 h-12" />
            <p className="font-black italic uppercase text-[#8B2312]">Cooking up the menu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="group bg-white border-2 border-[#2D1A12] rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                {/* Image Section - Now completely dynamic */}
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-black uppercase italic text-[#8B2312]">
                    Fresh Stock
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{product.weight || '250g'}</p>
                    </div>
                    <p className="text-3xl font-black text-[#D48C2B]">₹{product.price}</p>
                  </div>
                  
                  <p className="text-sm font-medium opacity-70 mb-8 line-clamp-2 italic">
                    {product.description || "The perfect traditional crunch for your tea-time cravings."}
                  </p>

                  <button className="w-full bg-[#8B2312] text-white py-5 rounded-full font-black italic uppercase flex items-center justify-center gap-3 hover:bg-[#2D1A12] transition-colors shadow-xl active:scale-95">
                    Add to Cart <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
