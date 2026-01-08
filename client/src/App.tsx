import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import './index.css';

import { 
  ShoppingCart, ArrowRight, Loader2, MapPin, 
  Phone, Mail, Instagram, Facebook 
} from 'lucide-react';

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

    
    {/* Column 1: Brand Story */}
                {/* --- BRANDED FOOTER SECTION --- */}
<footer className="bg-[#2D1A12] text-[#F5F1E6] pt-24 pb-12 px-8 md:px-16 border-t-[10px] border-[#D48C2B]">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-inner">
          <span className="text-[#8B2312] font-black text-xs uppercase">Gaya</span>
        </div>
        <h4 className="text-3xl font-black italic uppercase tracking-tighter text-[#D48C2B]">GAYATRI</h4>
      </div>
      <p className="text-sm font-medium opacity-60 leading-relaxed italic">
        Handcrafting the finest Indori & Rajasthani namkeen since 1994. Small batches, pure groundnut oil, and zero compromises on authentic taste.
      </p>
    </div>

    {/* Column 2: Quick Navigation */}
    <div className="space-y-8">
      <h5 className="text-lg font-black italic uppercase tracking-widest text-white">Explore</h5>
      <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest opacity-50">
        <li className="hover:text-[#D48C2B] transition-colors cursor-pointer flex items-center gap-2 group">
          <div className="w-1 h-1 bg-[#D48C2B] rounded-full group-hover:w-3 transition-all"></div> Full Catalog
        </li>
        <li className="hover:text-[#D48C2B] transition-colors cursor-pointer flex items-center gap-2 group">
          <div className="w-1 h-1 bg-[#D48C2B] rounded-full group-hover:w-3 transition-all"></div> Signature Items
        </li>
        <li className="hover:text-[#D48C2B] transition-colors cursor-pointer flex items-center gap-2 group">
          <div className="w-1 h-1 bg-[#D48C2B] rounded-full group-hover:w-3 transition-all"></div> Bulk Orders
        </li>
      </ul>
    </div>

    {/* Column 3: Contact Info */}
    <div className="space-y-8">
      <h5 className="text-lg font-black italic uppercase tracking-widest text-white">Visit Us</h5>
      <div className="space-y-5 text-[10px] font-black uppercase tracking-widest opacity-50">
        <p className="flex items-center gap-3 leading-relaxed">
          <MapPin className="w-5 h-5 text-[#D48C2B] shrink-0" />
          <br/> Gandhi Nagar , Bhilwara, Rajasthan
        </p>
        <p className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-[#D48C2B] shrink-0" />
          +91 9982620643
        </p>
        <p className="flex items-center gap-3 hover:text-[#D48C2B] transition-colors cursor-pointer">
          <Mail className="w-5 h-5 text-[#D48C2B] shrink-0" />
          gayatrifoods@gmail.com
        </p>
      </div>
    </div>

    {/* Column 4: Socials & Trust */}
    <div className="space-y-8">
      <h5 className="text-lg font-black italic uppercase tracking-widest text-white">Follow The Crunch</h5>
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#D48C2B] hover:text-[#2D1A12] transition-all cursor-pointer group shadow-xl">
          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </div>
        <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#D48C2B] hover:text-[#2D1A12] transition-all cursor-pointer group shadow-xl">
          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] leading-tight">
          Pan-India Shipping available. <br/> Freshness guaranteed for 90 days.
        </p>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
      © 2026 GAYATRI STORE. ALL RIGHTS RESERVED.
    </p>
    <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest opacity-20">
      <span className="hover:opacity-100 cursor-pointer">Privacy</span>
      <span className="hover:opacity-100 cursor-pointer">Terms</span>
      <span className="hover:opacity-100 cursor-pointer">FSSAI: 1234567890</span>
    </div>
  </div>
</footer>

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
