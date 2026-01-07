import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { ShoppingCart, ArrowRight, ChevronLeft, Star, Instagram, Facebook, Phone, MapPin, Quote } from 'lucide-react';

// --- 1. DATA ---
const WHATSAPP_NUMBER = "9196108XXXXX"; 

const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: "₹180", weight: "250g", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves and hand-pounded spices." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: "₹150", weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack made with pure groundnut oil." },
  { id: "premium-mix", name: "Royal Mixture", price: "₹220", weight: "200g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "A luxury blend of cornflakes, nuts, and dry fruits." },
  { id: "corn-chivda", name: "Spicy Corn Chivda", price: "₹140", weight: "250g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Yellow corn flakes tossed in turmeric and red chili." },
  { id: "aloo-bhujia", name: "Aloo Bhujia", price: "₹160", weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", desc: "Crispy potato noodles flavored with mint and dry mango powder." },
  { id: "diet-chiwda", name: "Diet Roasted Chiwda", price: "₹130", weight: "200g", category: "Healthy Bites", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Lightly roasted flakes with zero oil, perfect for guilt-free snacking." }
];

const testimonials = [
  { name: "Anjali Sharma", text: "The Ratlami Sev tastes exactly like home. You can tell they use real groundnut oil!", location: "Jaipur" },
  { name: "Vikram Meena", text: "Finally, a brand that doesn't compromise on the 'teekha' factor. Highly recommended.", location: "Kota" }
];

// --- 2. REUSABLE COMPONENTS ---

const ProductCard = ({ p }: { p: typeof products[0] }) => (
  <Link to={`/product/${p.id}`} className="group relative bg-white border-2 border-[#2D1A12] rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(139,35,18,0.15)] transition-all duration-700">
    <div className="h-72 overflow-hidden relative">
      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={p.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A12]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-5 left-5 bg-[#D48C2B] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
        {p.category}
      </div>
    </div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-black italic text-[#8B2312] leading-none uppercase">{p.name}</h3>
        <span className="font-bold text-[#D48C2B] text-xl">{p.price}</span>
      </div>
      <div className="flex items-center gap-2 font-black italic text-xs text-[#2D1A12] group-hover:text-[#8B2312] transition-colors tracking-widest uppercase">
        Taste The Tradition <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  </Link>
);

const Footer = () => (
  <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-24 pb-12 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D48C2B]/5 rounded-full blur-3xl -mr-48 -mt-48" />
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/10 pb-20">
        <div className="space-y-6">
          <div className="flex flex-col">
            <h3 className="text-4xl font-black tracking-tighter text-[#D48C2B] leading-none">GAYATRI</h3>
            <span className="text-[10px] font-bold tracking-[0.5em] text-[#D48C2B] mt-1 opacity-80 uppercase">Namkeen</span>
          </div>
          <p className="opacity-60 text-sm leading-relaxed max-w-xs">Small batches. Pure groundnut oil. Authentic Rajasthani flavors delivered to your doorstep.</p>
        </div>
        <div>
          <h4 className="font-black italic text-xl mb-8 text-[#D48C2B] uppercase tracking-widest">Explore</h4>
          <ul className="space-y-4 opacity-50 text-sm font-bold">
            <li><Link to="/" className="hover:text-[#D48C2B] transition-colors">Home</Link></li>
            <li><Link to="/catalog" className="hover:text-[#D48C2B] transition-colors">Full Catalog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black italic text-xl mb-8 text-[#D48C2B] uppercase tracking-widest">Visit Us</h4>
          <ul className="space-y-4 opacity-50 text-sm font-bold">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +91 96108 XXXXX</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4" /> Rajasthan, India</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black italic text-xl mb-8 text-[#D48C2B] uppercase tracking-widest">Connect</h4>
          <div className="flex gap-6"><Instagram className="hover:text-[#D48C2B] cursor-pointer" /><Facebook className="hover:text-[#D48C2B] cursor-pointer" /></div>
        </div>
      </div>
      <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 text-[10px] tracking-[0.3em] font-black uppercase">
        <p>© 2026 Gayatri Namkeen Store</p>
        <p>Crafted for the connoisseur</p>
      </div>
    </div>
  </footer>
);

// --- 3. PAGES ---

const Home = () => (
  <div className="bg-[#F5F1E6] min-h-screen selection:bg-[#8B2312] selection:text-white">
    <nav className="sticky top-0 z-50 bg-[#F5F1E6]/90 backdrop-blur-xl border-b border-[#8B2312]/5 px-6 md:px-10 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
        <div className="hidden md:flex gap-10 font-bold text-xs uppercase tracking-widest text-[#2D1A12]">
          <Link to="/catalog" className="hover:text-[#8B2312] transition-colors">Collections</Link>
          <a href="#" className="hover:text-[#8B2312] transition-colors">The Process</a>
        </div>
        <div className="bg-[#8B2312] p-2.5 rounded-full text-white shadow-lg shadow-[#8B2312]/20"><ShoppingCart className="w-4 h-4" /></div>
      </div>
    </nav>

    {/* Hero */}
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-32 flex flex-col md:flex-row items-center gap-20">
      <div className="flex-1 space-y-10 text-center md:text-left relative">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#D48C2B]/10 rounded-full blur-2xl" />
        <h1 className="text-7xl md:text-9xl font-black italic leading-[0.8] text-[#8B2312] tracking-tighter">
          CRUNCH <br />
          <span className="text-[#D48C2B]">BEYOND</span> <br />
          WORDS.
        </h1>
        <p className="text-xl md:text-2xl max-w-md text-[#2D1A12]/70 font-medium leading-tight">
          Traditional Rajasthani snacks, elevated for the modern palate.
        </p>
        <Link to="/catalog" className="inline-block bg-[#8B2312] text-white px-12 py-6 rounded-full text-xl font-black italic shadow-2xl hover:bg-[#2D1A12] transition-all hover:-translate-y-1 active:translate-y-0">
          EXPLORE THE CLASSICS
        </Link>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-[100px] scale-125 animate-pulse" />
        <div className="relative aspect-square w-full max-w-lg rounded-[4rem] md:rounded-[6rem] border-[1.5rem] border-white overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-1000">
          <img src={products[0].image} className="w-full h-full object-cover" alt="Featured Snack" />
        </div>
      </div>
    </section>

    {/* Testimonials - Voices of Crunch */}
    <section className="bg-[#2D1A12] py-24 my-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-white text-4xl font-black italic mb-16 uppercase tracking-widest text-center">Voices of Crunch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-sm relative group">
              <Quote className="absolute top-8 right-10 w-12 h-12 text-[#D48C2B]/20 group-hover:text-[#D48C2B]/40 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#D48C2B] text-[#D48C2B]" />)}
              </div>
              <p className="text-white text-xl font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
              <div>
                <p className="text-[#D48C2B] font-black uppercase tracking-widest">{t.name}</p>
                <p className="text-white/40 text-xs font-bold uppercase">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Product Grid Preview */}
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-5xl md:text-7xl font-black italic text-[#8B2312] uppercase leading-none">The Collection</h2>
        <Link to="/catalog" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#D48C2B] border-b-2 border-[#D48C2B]/20 pb-1 hover:border-[#D48C2B] transition-all">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.slice(0, 6).map(p => <ProductCard p={p} key={p.id} />)}
      </div>
    </div>
    
    <Footer />
  </div>
);

const Catalog = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <nav className="sticky top-0 z-50 bg-[#F5F1E6]/90 backdrop-blur-xl border-b border-[#8B2312]/5 px-6 md:px-10 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
        <div className="bg-[#8B2312] p-2.5 rounded-full text-white"><ShoppingCart className="w-4 h-4" /></div>
      </div>
    </nav>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <h1 className="text-6xl md:text-8xl font-black italic text-[#8B2312] mb-20 uppercase text-center">Full Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map(p => <ProductCard p={p} key={p.id} />)}
      </div>
    </div>
    <Footer />
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const p = products.find(x => x.id === id);
  if (!p) return <div className="p-20 text-center font-black text-[#8B2312] text-3xl">NOT FOUND</div>;
  
  return (
    <div className="bg-[#F5F1E6] min-h-screen">
      <nav className="px-6 md:px-10 py-8 max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
        <Link to="/catalog" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-[#8B2312] transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Collection
        </Link>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-[#D48C2B]/10 blur-[80px] rounded-full scale-110" />
          <img src={p.image} className="relative rounded-[3rem] md:rounded-[5rem] shadow-2xl border-[1rem] md:border-[2rem] border-white w-full aspect-square object-cover" alt={p.name} />
        </div>
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <span className="text-[#D48C2B] font-black uppercase tracking-[0.4em] text-xs">{p.category}</span>
            <h1 className="text-6xl md:text-8xl font-black italic text-[#8B2312] uppercase leading-[0.9]">{p.name}</h1>
          </div>
          <p className="text-4xl font-bold text-[#D48C2B]">{p.price} <span className="text-sm opacity-40 font-black tracking-widest text-[#2D1A12] uppercase">/ {p.weight}</span></p>
          <p className="text-xl text-[#2D1A12]/70 leading-relaxed font-medium">{p.desc}</p>
          <button 
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=New Order: ${p.name}`, '_blank')}
            className="w-full bg-[#8B2312] text-white py-8 rounded-full text-2xl font-black italic shadow-2xl hover:bg-[#2D1A12] transition-all flex items-center justify-center gap-6 group"
          >
            ORDER ON WHATSAPP <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
