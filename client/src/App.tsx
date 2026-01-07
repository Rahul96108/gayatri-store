import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { ShoppingCart, Search, ArrowRight, ChevronLeft, Star, Instagram, Facebook, Phone, MapPin } from 'lucide-react';

// --- 1. CONFIG & DATA ---
const WHATSAPP_NUMBER = "9196108XXXXX"; // <-- REPLACE WITH YOUR ACTUAL NUMBER (with 91)

const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: "₹180", weight: "250g", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves and hand-pounded spices." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: "₹150", weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack made with pure groundnut oil." },
  { id: "premium-mix", name: "Royal Mixture", price: "₹220", weight: "200g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "A luxury blend of cornflakes, nuts, and dry fruits." },
  { id: "corn-chivda", name: "Spicy Corn Chivda", price: "₹140", weight: "250g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Yellow corn flakes tossed in turmeric and red chili." }
];

// --- 2. REUSABLE COMPONENTS ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#F5F1E6]/90 backdrop-blur-md border-b border-[#8B2312]/10 flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
    <Link to="/" className="text-3xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
    <div className="hidden md:flex gap-8 font-bold text-[#2D1A12]">
      <a href="#catalog" className="hover:text-[#8B2312] transition-colors">Collections</a>
      <a href="#" className="hover:text-[#8B2312] transition-colors">Process</a>
      <a href="#" className="hover:text-[#8B2312] transition-colors">Bulk</a>
    </div>
    <div className="flex items-center gap-4">
      <div className="bg-[#8B2312] p-2.5 rounded-full text-white cursor-pointer hover:scale-110 transition-transform">
        <ShoppingCart className="w-5 h-5" />
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
      <div className="space-y-6">
        <h3 className="text-3xl font-black tracking-tighter text-[#D48C2B]">GAYATRI</h3>
        <p className="opacity-70 leading-relaxed">Preserving the authentic taste of Indian Namkeen since generations. Handcrafted with love and pure ingredients.</p>
        <div className="flex gap-4">
          <Instagram className="cursor-pointer hover:text-[#D48C2B] transition-colors" />
          <Facebook className="cursor-pointer hover:text-[#D48C2B] transition-colors" />
        </div>
      </div>
      <div>
        <h4 className="font-black italic text-xl mb-6 text-[#D48C2B]">Quick Links</h4>
        <ul className="space-y-4 opacity-70 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><a href="#catalog">Our Catalog</a></li>
          <li><a href="#">About Our Spices</a></li>
          <li><a href="#">Shipping Policy</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black italic text-xl mb-6 text-[#D48C2B]">Contact Us</h4>
        <ul className="space-y-4 opacity-70 font-medium">
          <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 96108 XXXXX</li>
          <li className="flex items-start gap-2"><MapPin className="w-8 h-8 md:w-4 md:h-4" /> Industrial Area, Phase II, Rajasthan</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black italic text-xl mb-6 text-[#D48C2B]">Newsletter</h4>
        <p className="opacity-70 mb-4">Get updates on new snacks.</p>
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
          <input type="text" placeholder="Email" className="bg-transparent p-3 outline-none w-full" />
          <button className="bg-[#D48C2B] text-[#2D1A12] px-6 py-2 rounded-full font-bold">Join</button>
        </div>
      </div>
    </div>
    <p className="text-center mt-10 opacity-40 text-sm">© 2026 Gayatri Namkeen Store. All rights reserved.</p>
  </footer>
);

// --- 3. PAGES ---

const Home = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <Navbar />
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black italic leading-[0.9] text-[#8B2312]">CRUNCH <br /><span className="text-[#D48C2B]">BEYOND</span> <br />WORDS.</h1>
        <div className="flex gap-4 items-center justify-center md:justify-start">
          <div className="w-1.5 h-16 bg-[#D48C2B]"></div>
          <p className="text-lg md:text-xl max-w-sm text-gray-700 font-medium leading-tight">Handcrafted in small batches using 100% pure groundnut oil. No compromises.</p>
        </div>
        <a href="#catalog" className="bg-[#8B2312] text-white px-10 py-5 rounded-full text-xl font-bold italic shadow-xl hover:scale-105 transition-all inline-block">Explore Snacks</a>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-3xl scale-110"></div>
        <div className="relative w-72 h-72 md:w-[480px] md:h-[480px] rounded-full border-[12px] border-[#D48C2B]/20 overflow-hidden shadow-2xl">
          <img src={products[0].image} alt="Hero" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* Catalog Grid */}
    <div id="catalog" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <h2 className="text-4xl md:text-6xl font-black italic text-[#8B2312] mb-12 uppercase text-center md:text-left">The Classics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="group bg-white border-2 border-[#2D1A12] rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="h-64 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} /></div>
            <div className="p-8">
              <h3 className="text-2xl font-black italic text-[#8B2312] mb-2">{p.name}</h3>
              <p className="font-bold text-[#D48C2B] text-xl mb-4">{p.price}</p>
              <div className="flex items-center gap-2 font-black italic text-[#2D1A12] group-hover:text-[#8B2312] transition-colors">VIEW DETAILS <ArrowRight className="w-5 h-5" /></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const p = products.find(x => x.id === id);

  const placeOrder = () => {
    if(!p) return;
    const orderId = Math.floor(1000 + Math.random() * 9000); // Simple Order ID
    const text = `*New Order: #${orderId}*%0A------------------%0A*Snack:* ${p.name}%0A*Price:* ${p.price}%0A*Weight:* ${p.weight}%0A------------------%0APlease confirm availability!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  if (!p) return <div className="p-20 text-center text-[#8B2312] font-black italic text-3xl">SNACK NOT FOUND</div>;
  
  return (
    <div className="bg-[#F5F1E6] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#8B2312] font-bold mb-10"><ChevronLeft className="w-5 h-5" /> BACK</Link>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <img src={p.image} className="rounded-[40px] shadow-2xl border-[12px] border-white w-full md:w-[500px] aspect-square object-cover" alt={p.name} />
          <div className="space-y-6">
            <h1 className="text-5xl font-black italic text-[#8B2312] uppercase">{p.name}</h1>
            <p className="text-3xl font-bold text-[#D48C2B]">{p.price} <span className="text-sm opacity-50 text-[#2D1A12]">/ {p.weight}</span></p>
            <p className="text-xl text-gray-700 leading-relaxed">{p.desc}</p>
            <button onClick={placeOrder} className="w-full bg-[#8B2312] text-white py-6 rounded-full text-2xl font-black italic shadow-xl hover:bg-[#2D1A12] transition-all flex items-center justify-center gap-4">
              <ShoppingCart className="w-6 h-6" /> ORDER ON WHATSAPP
            </button>
            <p className="text-center text-sm font-bold text-[#2D1A12]/40 italic uppercase tracking-widest">Safe & Secure Payment via WhatsApp</p>
          </div>
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
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
