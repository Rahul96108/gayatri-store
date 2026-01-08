import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import './index.css';

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
        // Fetching the Core 6 items from your dynamic catalog
        const { data } = await supabase.from('products').select('*').limit(6);
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
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B]">
      
      {/* --- SECTION 1: THE RECREATED HERO (CSS/HTML) --- */}
      <header className="relative min-h-[85vh] flex flex-col pt-24 px-8 md:px-16 overflow-hidden">
        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border border-[#8B2312]/20 flex items-center justify-center bg-white p-1">
                <span className="text-[#8B2312] font-black text-xs uppercase">Gaya</span>
             </div>
             <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
          </div>
          <button className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-bold">1</span>
          </button>
        </nav>

        {/* Hero Content Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between flex-grow gap-12">
          {/* Left Column: Text & CTA */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black italic uppercase text-[#8B2312] leading-[0.85] tracking-tighter">
              CRUNCH <br/> 
              <span className="text-[#D48C2B]">BEYOND</span> <br/>
              WORDS.
            </h2>
            <div className="space-y-2 text-[#2D1A12] opacity-70 font-bold uppercase tracking-widest text-sm md:text-base">
              <p>Small batches. Pure groundnut oil.</p>
              <p>Authentic Rajasthani flavors.</p>
            </div>
            <button className="bg-[#8B2312] text-white px-10 py-5 rounded-full font-black italic uppercase text-lg shadow-xl hover:bg-[#2D1A12] transition-all transform active:scale-95">
              SHOP THE COLLECTION
            </button>
          </div>

          {/* Right Column: Circular Graphic Placeholder */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border-[15px] border-white shadow-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                {/* You can place a high-quality product photo here */}
                <img 
                  src="https://images.unsplash.com/photo-1601050638917-3f04807b93dc?q=80&w=800&auto=format&fit=crop" 
                  alt="Product Display" 
                  className="w-full h-full object-cover opacity-90"
                />
            </div>
            {/* Subtle radial glow effect behind the circle */}
            <div className="absolute -z-10 w-full h-full bg-[#D48C2B]/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </header>

      {/* --- SECTION 2: DYNAMIC CORE 6 ITEMS --- */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-3xl font-black italic uppercase text-[#8B2312] mb-12 border-b-2 border-[#8B2312]/10 pb-4">
          Core <span className="text-[#D48C2B]">Favorites</span>
        </h3>
        
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((p) => (
              <div key={p.id} className="group border-2 border-[#2D1A12] p-6 rounded-[3rem] bg-white hover:shadow-2xl transition-all">
                <img src={p.image} className="w-full h-64 object-cover rounded-[2rem] mb-6 shadow-sm" alt={p.name} />
                <div className="flex justify-between items-center mb-2 px-2">
                  <h4 className="text-2xl font-black italic uppercase text-[#8B2312]">{p.name}</h4>
                  <span className="text-xl font-bold text-[#D48C2B]">₹{p.price}</span>
                </div>
                <p className="px-2 text-xs opacity-50 font-bold uppercase tracking-widest">{p.weight || '250g'}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Catalog Redirect Section */}
        <div className="mt-20 flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-6">Explore more flavors in our catalog</p>
            <button className="flex items-center gap-4 bg-[#2D1A12] text-white px-12 py-6 rounded-full font-black italic uppercase hover:bg-[#8B2312] transition-all shadow-2xl group">
                Full Catalog <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </button>
        </div>
      </main>

      <footer className="bg-[#2D1A12] text-white/40 py-12 text-center text-[10px] font-bold uppercase tracking-[0.5em]">
        Gayatri Store • Authenticity in every crunch
      </footer>
    </div>
  );
}
