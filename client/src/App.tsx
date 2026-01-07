import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { ShoppingCart, Search, ArrowRight, ChevronLeft, Star } from 'lucide-react';

// --- 1. DATA ---
const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: "₹180", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves and hand-pounded spices." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: "₹150", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack made with pure groundnut oil." },
  { id: "premium-mix", name: "Royal Mixture", price: "₹220", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "A luxury blend of cornflakes, nuts, and dry fruits." }
];

// --- 2. REUSABLE COMPONENTS ---

const Navbar = () => (
  <nav className="flex justify-between items-center px-6 md:px-10 py-6 max-w-7xl mx-auto">
    <Link to="/" className="text-3xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
    <div className="hidden md:flex gap-8 font-bold text-[#2D1A12]">
      <Link to="/catalog" className="hover:text-[#8B2312]">Collections</Link>
      <a href="#" className="hover:text-[#8B2312]">The Process</a>
      <a href="#" className="hover:text-[#8B2312]">Bulk Orders</a>
    </div>
    <div className="flex items-center gap-4">
      <Search className="w-5 h-5 cursor-pointer" />
      <div className="bg-[#8B2312] p-2 rounded-full text-white cursor-pointer relative">
        <ShoppingCart className="w-5 h-5" />
      </div>
    </div>
  </nav>
);

const USPRibbon = () => (
  <div className="bg-[#8B2312] py-4 -rotate-1 scale-105 shadow-2xl mt-12 overflow-hidden border-y-2 border-[#D48C2B]/30">
    <div className="flex gap-12 whitespace-nowrap text-white font-bold text-lg uppercase italic animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-2"><Star className="fill-[#D48C2B] text-[#D48C2B] w-4 h-4" /> 100% Pure Groundnut Oil</span>
          <span className="flex items-center gap-2"><Star className="fill-[#D48C2B] text-[#D48C2B] w-4 h-4" /> Hand-Pounded Spices</span>
          <span className="flex items-center gap-2"><Star className="fill-[#D48C2B] text-[#D48C2B] w-4 h-4" /> Small Batch Production</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

// --- 3. PAGES ---

const Home = () => (
  <div className="bg-[#F5F1E6] min-h-screen overflow-x-hidden">
    <Navbar />
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black italic leading-[0.9] text-[#8B2312]">
          CRUNCH <br />
          <span className="text-[#D48C2B]">BEYOND</span> <br />
          WORDS.
        </h1>
        <div className="flex gap-4 items-center justify-center md:justify-start">
          <div className="w-1.5 h-16 bg-[#D48C2B]"></div>
          <p className="text-lg md:text-xl max-w-sm text-gray-700 font-medium leading-tight">
            Handcrafted in small batches using 100% pure groundnut oil. No compromises, just pure Gayatri quality.
          </p>
        </div>
        <Link to="/catalog" className="bg-[#8B2312] text-white px-10 py-5 rounded-full text-xl font-bold italic shadow-xl hover:bg-[#2D1A12] transition-all inline-block">
          Shop The Classics
        </Link>
      </div>

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-3xl scale-110"></div>
        <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] rounded-full border-[12px] border-[#D48C2B]/20 overflow-hidden shadow-2xl">
          <img src={products[0].image} alt="Hero" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
    <USPRibbon />
  </div>
);

const Catalog = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <Navbar />
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black italic text-[#8B2312] mb-4 uppercase">The Collection</h1>
        <div className="w-24 h-1 bg-[#D48C2B] mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="group bg-white border-2 border-[#2D1A12] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="h-64 overflow-hidden relative">
              <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
              <div className="absolute top-4 left-4 bg-[#D48C2B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{p.category}</div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black italic text-[#8B2312] leading-none">{p.name}</h3>
                <span className="font-bold text-[#D48C2B]">{p.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-6 line-clamp-2">{p.desc}</p>
              <div className="flex items-center gap-2 font-black italic text-sm group-hover:text-[#8B2312] transition-colors">
                VIEW SNACK <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const p = products.find(x => x.id === id);
  if (!p) return <div className="p-20 text-center text-[#8B2312] font-black italic text-3xl">SNACK NOT FOUND</div>;
  
  return (
    <div className="bg-[#F5F1E6] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-[#8B2312] font-bold mb-10 hover:underline">
          <ChevronLeft className="w-5 h-5" /> BACK TO COLLECTION
        </Link>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-[#D48C2B]/10 blur-2xl rounded-full"></div>
            <img src={p.image} className="relative rounded-[40px] shadow-2xl border-[12px] border-white w-full aspect-square object-cover" alt={p.name} />
          </div>
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl md:text-7xl font-black italic text-[#8B2312] leading-tight uppercase">{p.name}</h1>
            <p className="text-3xl font-bold text-[#D48C2B]">{p.price}</p>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{p.desc}</p>
            <button 
              onClick={() => window.open(`https://wa.me/91XXXXXXXXXX?text=I'd like to order ${p.name}`, '_blank')}
              className="w-full bg-[#8B2312] text-white py-6 rounded-full text-2xl font-black italic shadow-xl hover:bg-[#2D1A12] transition-all flex items-center justify-center gap-4"
            >
              <ShoppingCart className="w-6 h-6" /> ORDER ON WHATSAPP
            </button>
          </div>
        </div>
      </div>
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
