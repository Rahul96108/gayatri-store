import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { ShoppingCart, Search, ArrowRight, ChevronLeft, Star, Instagram, Facebook, Phone, MapPin, Menu, X } from 'lucide-react';

// --- CONFIG ---
const WHATSAPP_NUMBER = "9196108XXXXX";

const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: "₹180", weight: "250g", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves and hand-pounded spices." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: "₹150", weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack made with pure groundnut oil." },
  { id: "premium-mix", name: "Royal Mixture", price: "₹220", weight: "200g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "A luxury blend of cornflakes, nuts, and dry fruits." },
  { id: "corn-chivda", name: "Spicy Corn Chivda", price: "₹140", weight: "250g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Yellow corn flakes tossed in turmeric and red chili." }
];

// --- RESPONSIVE NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F1E6]/95 backdrop-blur-md border-b border-[#8B2312]/10">
      <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-bold text-[#2D1A12]">
          <a href="#catalog" className="hover:text-[#8B2312] transition-all">Collections</a>
          <a href="#" className="hover:text-[#8B2312] transition-all">Our Story</a>
          <a href="#" className="hover:text-[#8B2312] transition-all">Bulk Orders</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#8B2312]">
            {isOpen ? <X /> : <Menu />}
          </button>
          <div className="bg-[#8B2312] p-2 md:p-2.5 rounded-full text-white cursor-pointer hover:scale-110 transition-transform">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-[#F5F1E6] border-b border-[#8B2312]/10 px-6 py-6 space-y-4 font-bold flex flex-col items-center animate-in fade-in slide-in-from-top-4">
          <a href="#catalog" onClick={() => setIsOpen(false)} className="text-lg">Collections</a>
          <a href="#" onClick={() => setIsOpen(false)} className="text-lg">Our Story</a>
          <a href="#" onClick={() => setIsOpen(false)} className="text-lg">Bulk Orders</a>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-black tracking-tighter text-[#D48C2B]">GAYATRI</h3>
        <p className="opacity-70 text-sm leading-relaxed">Pure groundnut oil. Pure spices. Pure Gayatri.</p>
        <div className="flex gap-4"><Instagram className="w-5 h-5" /><Facebook className="w-5 h-5" /></div>
      </div>
      <div>
        <h4 className="font-black italic text-lg mb-4 text-[#D48C2B]">Explore</h4>
        <ul className="space-y-2 opacity-60 text-sm">
          <li><Link to="/">Home</Link></li>
          <li><a href="#catalog">Collections</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black italic text-lg mb-4 text-[#D48C2B]">Contact</h4>
        <ul className="space-y-2 opacity-60 text-sm">
          <li className="flex items-center gap-2"><Phone className="w-3 h-3" /> +91 96108 XXXXX</li>
          <li className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Rajasthan, India</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black italic text-lg mb-4 text-[#D48C2B]">Newsletter</h4>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <input type="text" placeholder="Email" className="bg-transparent pl-4 text-sm outline-none w-full" />
          <button className="bg-[#D48C2B] text-[#2D1A12] px-4 py-2 rounded-full font-bold text-xs uppercase">Join</button>
        </div>
      </div>
    </div>
    <p className="text-center mt-8 opacity-30 text-[10px] tracking-widest uppercase font-bold">© 2026 Gayatri Namkeen</p>
  </footer>
);

// --- MAIN PAGES ---
const Home = () => (
  <div className="bg-[#F5F1E6] min-h-screen overflow-x-hidden">
    <Navbar />
    {/* Responsive Hero */}
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
      <div className="flex-1 space-y-6 md:space-y-10 text-center md:text-left">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic leading-[0.85] text-[#8B2312]">
          CRUNCH <br />
          <span className="text-[#D48C2B]">BEYOND</span> <br />
          WORDS.
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start">
          <div className="hidden md:block w-1.5 h-20 bg-[#D48C2B]"></div>
          <p className="text-base md:text-xl max-w-sm text-gray-700 font-medium leading-snug">
            Small batches. Pure groundnut oil. Authentic Rajasthani flavors delivered to your doorstep.
          </p>
        </div>
        <a href="#catalog" className="w-full md:w-auto bg-[#8B2312] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold italic shadow-xl hover:scale-105 transition-all inline-block">
          EXPLORE SNACKS
        </a>
      </div>

      {/* Hero Image Container */}
      <div className="flex-1 relative w-full max-w-[300px] md:max-w-none">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-3xl scale-110"></div>
        <div className="relative aspect-square w-full rounded-full border-[8px] md:border-[15px] border-[#D48C2B]/20 overflow-hidden shadow-2xl">
          <img src={products[0].image} alt="Hero" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* Responsive Catalog Grid */}
    <div id="catalog" className="max-w-7xl mx-auto px-6 md:px-10 py-20 bg-white/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black italic text-[#8B2312] uppercase leading-none">The Classics</h2>
          <p className="text-[#D48C2B] font-bold italic md:text-xl mt-2">Authentic & Handcrafted</p>
        </div>
        <div className="h-0.5 flex-1 bg-[#8B2312]/10 mx-10 hidden lg:block"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="group bg-white border-2 border-[#2D1A12] rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="h-56 md:h-72 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} /></div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black italic text-[#8B2312] uppercase mb-1">{p.name}</h3>
              <p className="font-bold text-[#D48C2B] text-lg md:text-xl mb-4">{p.price}</p>
              <div className="flex items-center gap-2 font-black italic text-xs md:text-sm text-[#2D1A12] group-hover:text-[#8B2312] transition-colors uppercase tracking-widest">View Snack <ArrowRight className="w-4 h-4" /></div>
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
  if (!p) return <div className="p-20 text-center font-black text-[#8B2312]">NOT FOUND</div>;
  
  return (
    <div className="bg-[#F5F1E6] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-[#8B2312] font-bold mb-8 md:mb-12 uppercase text-xs md:text-sm tracking-widest"><ChevronLeft className="w-4 h-4" /> Back to Shop</Link>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          <img src={p.image} className="rounded-[32px] md:rounded-[48px] shadow-2xl border-[8px] md:border-[16px] border-white w-full lg:w-1/2 aspect-square object-cover" alt={p.name} />
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic text-[#8B2312] uppercase leading-tight">{p.name}</h1>
            <p className="text-2xl md:text-4xl font-bold text-[#D48C2B]">{p.price} <span className="text-xs md:text-sm opacity-30 text-[#2D1A12] uppercase font-bold">/ {p.weight}</span></p>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed font-medium">{p.desc}</p>
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Order: ${p.name}`, '_blank')} className="w-full bg-[#8B2312] text-white py-5 md:py-6 rounded-full text-xl md:text-2xl font-black italic shadow-xl hover:bg-[#2D1A12] transition-all flex items-center justify-center gap-4">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" /> ORDER ON WHATSAPP
            </button>
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
