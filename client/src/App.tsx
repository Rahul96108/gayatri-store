import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowRight, Loader2, Star } from 'lucide-react';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function Storefront() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await supabase.from('products').select('*');
        if (data) setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B] selection:text-white">
      {/* BRAND NAVIGATION */}
      <nav className="py-8 px-6 md:px-12 flex justify-between items-center border-b border-[#2D1A12]/5">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase text-[#8B2312]">
          GAYATRI <span className="text-[#D48C2B]">SNACKS</span>
        </h1>
        <button className="bg-[#8B2312] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase text-[#8B2312] leading-[0.85] tracking-tighter mb-6">
          Authentic <br/> Indori Taste
        </h2>
        <p className="text-lg font-bold uppercase tracking-[0.3em] opacity-40">Direct from our kitchen to your home</p>
      </header>

      {/* PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#8B2312] w-12 h-12" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-[3rem] border-4 border-dashed border-[#2D1A12]/10">
            <p className="text-2xl font-black italic opacity-20 uppercase">Menu is being updated...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((p) => (
              <div key={p.id} className="group bg-white border-2 border-[#2D1A12] rounded-[3.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(45,26,18,0.2)] transition-all">
                <div className="h-80 overflow-hidden relative">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase text-[#8B2312]">Best Seller</div>
                </div>
                
                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-4xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h3>
                    <span className="text-3xl font-black text-[#D48C2B]">₹{p.price}</span>
                  </div>
                  <button className="w-full bg-[#8B2312] text-white py-6 rounded-full font-black italic uppercase flex items-center justify-center gap-3 hover:bg-[#2D1A12] transition-colors shadow-xl">
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
