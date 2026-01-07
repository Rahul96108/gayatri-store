import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { ShoppingCart, Search, ArrowRight, ChevronLeft, Star } from 'lucide-react';

// --- 1. DATA ---
const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: "₹180", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: "₹150", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack." }
];

// --- 2. COMPONENTS ---

const Navbar = () => (
  <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
    <Link to="/" className="text-3xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
    <div className="flex items-center gap-6">
      <Link to="/catalog" className="font-bold hover:text-[#8B2312]">Catalog</Link>
      <ShoppingCart className="w-6 h-6 text-[#8B2312]" />
    </div>
  </nav>
);

const Home = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <Navbar />
    <section className="max-w-7xl mx-auto px-10 py-12 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-7xl font-black italic leading-tight text-[#8B2312]">CRUNCH <span className="text-[#D48C2B]">BEYOND</span> WORDS.</h1>
        <p className="text-xl text-gray-700 border-l-4 border-[#D48C2B] pl-4">Handcrafted in small batches using 100% pure groundnut oil.</p>
        <Link to="/catalog" className="bg-[#8B2312] text-white px-8 py-4 rounded-full text-xl font-bold inline-block">Shop The Classics</Link>
      </div>
    </section>
  </div>
);

const Catalog = () => (
  <div className="bg-[#F5F1E6] min-h-screen">
    <Navbar />
    <div className="max-w-7xl mx-auto px-10 py-10">
      <h1 className="text-5xl font-black italic text-[#8B2312] mb-10 text-center">OUR COLLECTION</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="bg-white p-6 rounded-2xl border-2 border-[#2D1A12] hover:shadow-xl transition-all">
            <img src={p.image} className="h-48 w-full object-cover rounded-xl mb-4" alt={p.name} />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#8B2312]">{p.name}</h3>
              <span className="font-bold text-[#D48C2B]">{p.price}</span>
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
  if (!p) return <div className="p-20 text-center">Product Not Found</div>;
  return (
    <div className="bg-[#F5F1E6] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-3xl mt-10 shadow-xl">
        <Link to="/catalog" className="flex items-center gap-2 text-[#8B2312] font-bold mb-6"><ChevronLeft /> Back</Link>
        <div className="flex flex-col md:flex-row gap-10">
          <img src={p.image} className="w-80 h-80 object-cover rounded-2xl" alt={p.name} />
          <div>
            <h1 className="text-4xl font-black text-[#8B2312] mb-4">{p.name}</h1>
            <p className="text-gray-600 mb-6">{p.desc}</p>
            <button className="bg-[#8B2312] text-white px-10 py-4 rounded-full font-bold w-full">Order via WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN ROUTER ---
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
