import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowRight, Loader2, Star, Clock, ShieldCheck } from 'lucide-react';
// 1. ENSURE CSS IS IMPORTED FIRST
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
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
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
      
      {/* SECTION 1: STATIC HERO */}
      <header className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute top-0 w-full py-8 px-12 flex justify-between items-center z-20">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-[#8B2312]">
            GAYATRI <span className="text-[#D48C2B]">SNACKS</span>
          </h1>
          <button className="bg-[#8B2312] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all">
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="inline-block bg-[#8B2312] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Since 1994
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black italic uppercase text-[#8B2312] leading-[0.8] tracking-tighter">
            CRUNCH <br/> <span className="text-[#2D1A12]">THAT MATTERS</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg font-bold uppercase tracking-widest opacity-60">
            Handcrafted snacks made with traditional spices.
          </p>
        </div>

        <div className="absolute bottom-12 flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
          <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Small Batch</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> 100% Natural</span>
        </div>
      </header>

      {/* SECTION 2: DYNAMIC CATALOG */}
      <main className="max-w-7xl mx-auto px-6 py-32 border-t border-[#2D1A12]/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h3 className="text-5xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">The Collection</h3>
            <p className="text-sm font-bold uppercase tracking-widest opacity-40 mt-4">Direct from our kitchen to your home</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="animate-spin text-[#8B2312] w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {products.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border-2 border-[#2D1A12] relative mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                </div>
                
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-4xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4>
                    <span className="text-2xl font-black text-[#D48C2B]">₹{p.price}</span>
                  </div>
                  <p className="text-sm font-medium opacity-60 italic">{p.description || "The original Indori taste."}</p>
                  <button className="w-full bg-transparent border-2 border-[#2D1A12] text-[#2D1A12] py-5 rounded-full font-black italic uppercase flex items-center justify-center gap-3 hover:bg-[#8B2312] hover:text-white transition-all">
                    Add to Cart <ArrowRight className="w-5 h-5" />
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
        <p className="opacity-40 text-xs font-bold uppercase tracking-[0.5em]">Indore • Rajasthan • India</p>
      </footer>
    </div>
  );
}
