import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowRight, Loader2, Star, ShieldCheck, MapPin } from 'lucide-react';
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
      
      {/* --- SECTION 1: THE BRANDED HERO (PER YOUR IMAGE) --- */}
      <header className="relative w-full overflow-hidden">
        {/* Navigation Layer */}
        <nav className="absolute top-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#8B2312]/10 shadow-sm">
              <img src="/favicon.png" alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
          </div>
          <button className="relative bg-[#8B2312] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#D48C2B] text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </button>
        </nav>

        {/* Hero Banner Image Layer */}
        <div className="w-full">
           <img 
            src="https://raw.githubusercontent.com/Rahul96108/gayatri-store/main/client/public/hero-banner.jpg" 
            alt="Crunch Beyond Words" 
            className="w-full h-auto object-cover"
          />
        </div>
      </header>

      {/* --- SECTION 2: THE CORE 6 COLLECTION --- */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <h2 className="text-6xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">
            The Core <br/> <span className="text-[#D48C2B]">Signature</span>
          </h2>
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 italic">Hand-picked essentials from Rajasthan</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <div className="aspect-square rounded-[3rem] overflow-hidden border-2 border-[#2D1A12] relative mb-6 shadow-md hover:shadow-2xl transition-all duration-500">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[8px] font-black uppercase text-[#8B2312]">Signature Item</div>
                </div>
                
                <div className="space-y-3 px-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4>
                    <span className="text-xl font-black text-[#D48C2B]">₹{p.price}</span>
                  </div>
                  <p className="text-xs font-medium opacity-50 line-clamp-2 uppercase tracking-wider">{p.description || "The original Rajasthani flavor profile."}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- SECTION 3: LINK TO FULL CATALOG --- */}
        <div className="mt-24 text-center">
          <button className="group bg-[#8B2312] text-white px-12 py-6 rounded-full font-black italic uppercase text-xl shadow-2xl hover:bg-[#2D1A12] transition-all flex items-center gap-4 mx-auto active:scale-95">
            Explore Full Catalog <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
          </button>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.5em] opacity-30">Fresh stock added daily</p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2D1A12] text-white py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#D48C2B]">GAYATRI STORE</h3>
            <p className="opacity-40 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Authentic Taste. Pure Ingredients.</p>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest opacity-60">
             <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Rajasthan</span>
             <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Certified Fresh</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
