import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowRight, Loader2, Star, Clock, ShieldCheck } from 'lucide-react';

// Initialize Supabase
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
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setProducts(data);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B] selection:text-white">
      
      {/* --- SECTION 1: THE HERO (REMAINING STATIC & BRANDED) --- */}
      <header className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#D48C2B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#8B2312]/5 rounded-full blur-3xl" />

        <nav className="absolute top-0 w-full py-8 px-12 flex justify-between items-center">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-[#8B2312]">
            GAYATRI <span className="text-[#D48C2B]">SNACKS</span>
          </h1>
          <div className="flex items-center gap-8">
            <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Authentic Indori Namkeen</span>
            <button className="bg-[#8B2312] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </nav>

        <div className="relative z-10 space-y-6">
          <div className="inline-block bg-[#8B2312] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Since 1994
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black italic uppercase text-[#8B2312] leading-[0.8] tracking-tighter">
            CRUNCH <br/> <span className="text-[#2D1A12]">THAT MATTERS</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg font-bold uppercase tracking-widest opacity-60 leading-relaxed">
            Handcrafted snacks made with traditional spices and zero compromises.
          </p>
        </div>

        <div className="absolute bottom-12 flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
          <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Small Batch</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> 100% Natural</span>
          <span className="flex items-center gap-2"><Star className="w-4 h-4"/> Premium Spices</span>
        </div>
      </header>

      {/* --- SECTION 2: THE DYNAMIC CATALOG (LINKED TO DATABASE) --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-[#2D1A12]/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h3 className="text-5xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">The Collection</h3>
            <p className="text-sm font-bold uppercase tracking-widest opacity-40 mt-4">Direct from our kitchen to your home</p>
          </div>
          <div className="h-[2px] flex-1 bg-[#2D1A12]/5 mx-12 hidden md:block mb-4" />
          <div className="bg-white px-6 py-3 rounded-full border border-[#2D1A12]/10 text-[10px] font-black uppercase tracking-widest">
            {products.length} Items Available
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#8B2312] w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {products.map((p) => (
              <div key={p.id} className="group flex flex-col">
                {/* Dynamic Image */}
                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border-2 border-[#2D1A12] relative mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={p.image || 'https://images.unsplash.com/photo-1601050638917-3f04807b93dc?q=80&w=1000&auto=format&fit=crop'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={p.name} 
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                    <span className="bg-white/90 backdrop-blur-md text-[#8B2312] px-4 py-1 rounded-full text-[10px] font-black uppercase italic">
                      {p.weight || '250g Pack'}
                    </span>
                  </div>
                </div>
                
                {/* Dynamic Description & Details */}
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-4xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4>
                    <span className="text-2xl font-black text-[#D48C2B]">₹{p.price}</span>
                  </div>
                  
                  <p className="text-sm font-medium leading-relaxed opacity-60 line-clamp-2 italic">
                    {p.description || "A signature blend of gram flour and traditional spices, crafted for the ultimate Indori experience."}
                  </p>

                  <button className="w-full group/btn bg-transparent border-2 border-[#2D1A12] text-[#2D1A12] py-5 rounded-full font-black italic uppercase flex items-center justify-center gap-3 hover:bg-[#8B2312] hover:border-[#8B2312] hover:text-white transition-all duration-300">
                    Add to Cart <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2D1A12] text-white py-20 px-8 text-center">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">GAYATRI STORE</h2>
        <p className="opacity-40 text-xs font-bold uppercase tracking-[0.5em]">Indore • Rajasthan • Pan India Delivery</p>
      </footer>
    </div>
  );
}
