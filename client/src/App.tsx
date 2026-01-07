import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { ShoppingCart, Search, ArrowRight, ChevronLeft, Star, Instagram, Facebook, Phone, MapPin, Menu, X } from 'lucide-react';

// --- 1. EXPANDED DATA (6+ ITEMS) ---
const WHATSAPP_NUMBER = "9196108XXXXX";

const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: "₹180", weight: "250g", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves and hand-pounded spices." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: "₹150", weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack made with pure groundnut oil." },
  { id: "premium-mix", name: "Royal Mixture", price: "₹220", weight: "200g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "A luxury blend of cornflakes, nuts, and dry fruits." },
  { id: "corn-chivda", name: "Spicy Corn Chivda", price: "₹140", weight: "250g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Yellow corn flakes tossed in turmeric and red chili." },
  { id: "aloo-bhujia", name: "Aloo Bhujia", price: "₹160", weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", desc: "Crispy potato noodles flavored with mint and dry mango powder." },
  { id: "diet-chiwda", name: "Diet Roasted Chiwda", price: "₹130", weight: "200g", category: "Healthy Bites", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Lightly roasted flakes with zero oil, perfect for guilt-free snacking." },
  { id: "peri-peri-chips", name: "Peri Peri Banana Chips", price: "₹190", weight: "150g", category: "Modern Flavors", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "Crispy banana slices with a spicy African Peri Peri kick." }
];

// --- 2. COMPONENTS ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-[#F5F1E6]/95 backdrop-blur-md border-b border-[#8B2312]/10 flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
    <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
    <div className="hidden md:flex gap-8 font-bold text-[#2D1A12]">
      <Link to="/catalog" className="hover:text-[#8B2312]">Collections</Link>
      <a href="#" className="hover:text-[#8B2312]">Process</a>
    </div>
    <div className="bg-[#8B2312] p-2 rounded-full text-white cursor-pointer"><ShoppingCart className="w-5 h-5" /></div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#2D1A12] text-[#F5F1E6] py-16 px-6 md:px-10 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
      <div>
        <h3 className="text-2xl font-black text-[#D48C2B] mb-4">GAYATRI</h3>
        <p className="opacity-60">Authentic Rajasthani Namkeen.</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Quick Links</h4>
        <ul className="opacity-60 space-y-2">
          <li><Link to="/catalog">Full Catalog</Link></li>
          <li><a href="https://wa.me/9196108XXXXX">Contact Support</a></li>
        </ul>
      </div>
      <div>
        <div className="flex justify-center md:justify-start gap-4"><Email /></div>
      </div>
    </div>
  </footer>
);

const ProductCard = ({ p }: { p: typeof products[0] }) => (
  <Link to={`/product/${p.id}`} className="group bg-white border-2 border-[#2D1A12] rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500">
    <div className="h-64 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} /></div>
    <div className="p-8">
      <h3 className="text-2xl font-black italic text-[#8B2312] uppercase mb-1">{p.name}</h3>
      <p className="font-bold text-[#D48C2B] text-xl mb-4">{p.price}</p>
      <div className="flex items-center gap-2 font-black italic text-[#2D1A12] group-hover:text-[#8B2312] transition-colors">VIEW DETAILS <ArrowRight className="w-5 h-5" /></div>
    </div>
  </Link>
);

// --- 3. PAGES ---

const Home = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <Navbar />
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black italic leading-[0.9] text-[#8B2312]">CRUNCH <br /><span className="text-[#D48C2B]">BEYOND</span> <br />WORDS.</h1>
        <p className="text-xl max-w-sm text-gray-700 font-medium mx-auto md:mx-0">Handcrafted in small batches using 100% pure groundnut oil.</p>
        <Link to="/catalog" className="bg-[#8B2312] text-white px-10 py-5 rounded-full text-xl font-bold italic shadow-xl hover:scale-105 transition-all inline-block">EXPLORE SNACKS</Link>
      </div>
      <div className="flex-1 relative w-full max-w-md md:max-w-none">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-3xl scale-110"></div>
        <img src={products[0].image} className="relative aspect-square w-full rounded-full border-[12px] border-[#D48C2B]/20 object-cover shadow-2xl" alt="Hero" />
      </div>
    </section>

    {/* HOME CATALOG PREVIEW (LIMIT 6) */}
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <h2 className="text-4xl md:text-6xl font-black italic text-[#8B2312] mb-12 uppercase text-center md:text-left">The Classics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.slice(0, 6).map(p => <ProductCard p={p} key={p.id} />)}
      </div>
      
      {/* VIEW ALL BUTTON */}
      <div className="mt-20 text-center">
        <Link to="/catalog" className="inline-flex items-center gap-4 bg-transparent border-4 border-[#8B2312] text-[#8B2312] px-12 py-6 rounded-full text-2xl font-black italic hover:bg-[#8B2312] hover:text-white transition-all group">
          VIEW FULL COLLECTION <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

const Catalog = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <Navbar />
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <h1 className="text-5xl md:text-7xl font-black italic text-[#8B2312] mb-16 uppercase text-center">Full Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(p => <ProductCard p={p} key={p.id} />)}
      </div>
    </div>
    <Footer />
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const p = products.find(x => x.id === id);
  if (!p) return <div className="p-20 text-center text-[#8B2312] font-black italic text-3xl">NOT FOUND</div>;
  
  return (
    <div className="bg-[#F5F1E6] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-16 items-center">
        <img src={p.image} className="rounded-[40px] shadow-2xl border-[12px] border-white w-full md:w-1/2 aspect-square object-cover" alt={p.name} />
        <div className="space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#8B2312] font-bold uppercase"><ChevronLeft /> Back</Link>
          <h1 className="text-5xl font-black italic text-[#8B2312] uppercase">{p.name}</h1>
          <p className="text-3xl font-bold text-[#D48C2B]">{p.price}</p>
          <p className="text-xl text-gray-700 leading-relaxed">{p.desc}</p>
          <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Order: ${p.name}`, '_blank')} className="w-full bg-[#8B2312] text-white py-6 rounded-full text-2xl font-black italic shadow-xl">ORDER ON WHATSAPP</button>
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
