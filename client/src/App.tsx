import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, ChevronLeft, Star, Trash2, MapPin, Phone, User, CheckCircle } from 'lucide-react';

// --- DATA ---
const WHATSAPP_NUMBER = "9196108XXXXX"; 
const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: 180, weight: "250g", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800" },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: 150, weight: "250g", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800" },
  { id: "premium-mix", name: "Royal Mixture", price: 220, weight: "200g", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800" },
  { id: "corn-chivda", name: "Spicy Corn Chivda", price: 140, weight: "250g", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800" },
  { id: "aloo-bhujia", name: "Aloo Bhujia", price: 160, weight: "250g", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800" },
  { id: "diet-chiwda", name: "Diet Roasted Chiwda", price: 130, weight: "200g", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800" }
];

// --- APP COMPONENT (State Management) ---
export default function App() {
  const [cart, setCart] = useState<{product: typeof products[0], qty: number}[]>([]);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.product.id !== id));

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

// --- COMPONENTS ---

const Navbar = ({ cartCount }: { cartCount: number }) => (
  <nav className="sticky top-0 z-50 bg-[#F5F1E6]/90 backdrop-blur-xl border-b border-[#8B2312]/5 px-6 md:px-10 py-5">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
      <Link to="/checkout" className="relative bg-[#8B2312] p-2.5 rounded-full text-white shadow-lg">
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#D48C2B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F5F1E6]">{cartCount}</span>}
      </Link>
    </div>
  </nav>
);

const Checkout = ({ cart, removeFromCart }: { cart: any[], removeFromCart: any }) => {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails = cart.map(item => `- ${item.product.name} (${item.qty}x)`).join('%0A');
    const message = `*NEW ORDER - GAYATRI NAMKEEN*%0A%0A*Customer:* ${form.name}%0A*Phone:* ${form.phone}%0A*Address:* ${form.address}%0A%0A*Items:*%0A${orderDetails}%0A%0A*Total Amount:* ₹${total}%0A%0AConfirm order please!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center space-y-6">
      <div className="bg-[#D48C2B]/10 p-8 rounded-full"><ShoppingCart className="w-16 h-16 text-[#D48C2B]" /></div>
      <h2 className="text-4xl font-black italic text-[#8B2312]">YOUR CART IS EMPTY</h2>
      <Link to="/" className="bg-[#8B2312] text-white px-10 py-4 rounded-full font-bold">START SNACKING</Link>
    </div>
  );

  return (
    <div className="bg-[#F5F1E6] min-h-screen p-6 md:p-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Order Summary */}
        <div className="space-y-8">
          <h2 className="text-4xl font-black italic text-[#8B2312] uppercase tracking-tighter">Your Selection</h2>
          
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-[#2D1A12]">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <img src={item.product.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <div>
                    <p className="font-bold text-[#2D1A12] uppercase text-sm">{item.product.name}</p>
                    <p className="text-[#D48C2B] font-bold">₹{item.product.price} x {item.qty}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <div className="mt-8 pt-6 border-t-4 border-[#8B2312] flex justify-between items-center">
              <span className="text-xl font-black italic text-[#8B2312]">TOTAL BILL</span>
              <span className="text-3xl font-black text-[#2D1A12]">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Form */}
        <div className="space-y-8">
          <h2 className="text-4xl font-black italic text-[#8B2312] uppercase tracking-tighter">Delivery Details</h2>
          
          <form onSubmit={handleOrder} className="bg-[#2D1A12] text-white rounded-[2.5rem] p-10 shadow-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Full Name</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#D48C2B]">
                <User className="w-4 h-4 mr-3 opacity-30" />
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-transparent outline-none w-full text-sm" placeholder="Your Name" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">WhatsApp Phone</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#D48C2B]">
                <Phone className="w-4 h-4 mr-3 opacity-30" />
                <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="bg-transparent outline-none w-full text-sm" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Full Address</label>
              <div className="flex items-start bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#D48C2B]">
                <MapPin className="w-4 h-4 mr-3 mt-1 opacity-30" />
                <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="bg-transparent outline-none w-full text-sm h-24 resize-none" placeholder="House No, Street, City, Pincode" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#D48C2B] text-[#2D1A12] py-6 rounded-full text-xl font-black italic hover:bg-white transition-all uppercase flex items-center justify-center gap-3">
              CONFIRM & ORDER <CheckCircle className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Home = ({ addToCart }: any) => (
  <div className="bg-[#F5F1E6] min-h-screen">
    {/* Hero (keeping your crunch message) */}
    <header className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-10 text-center md:text-left">
        <h1 className="text-7xl md:text-9xl font-black italic leading-[0.8] text-[#8B2312]">CRUNCH <br /><span className="text-[#D48C2B]">BEYOND</span> <br />WORDS.</h1>
        <p className="text-xl font-medium text-gray-700">Small batches. Pure groundnut oil. Tradition in every bite.</p>
        <a href="#menu" className="inline-block bg-[#8B2312] text-white px-12 py-5 rounded-full font-black italic text-xl shadow-xl">SHOP NOW</a>
      </div>
      <div className="flex-1 relative"><img src={products[0].image} className="rounded-full border-[15px] border-[#D48C2B]/10 shadow-2xl" alt="" /></div>
    </header>

    {/* Menu */}
    <div id="menu" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-5xl font-black italic text-[#8B2312] mb-12 uppercase">The Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map(p => (
          <div key={p.id} className="bg-white border-2 border-[#2D1A12] rounded-[2.5rem] overflow-hidden group">
            <div className="h-64 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" /></div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-black italic text-[#8B2312] uppercase">{p.name}</h3>
              <p className="font-bold text-[#D48C2B] text-xl">₹{p.price}</p>
              <button onClick={() => addToCart(p)} className="w-full bg-[#8B2312] text-white py-4 rounded-full font-black italic hover:bg-[#2D1A12] transition-colors">ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductDetail = ({ addToCart }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const p = products.find(x => x.id === id);
  if (!p) return null;
  return (
    <div className="bg-[#F5F1E6] min-h-screen p-10 flex flex-col items-center justify-center">
       <div className="max-w-4xl bg-white rounded-[3rem] p-12 border-2 border-[#2D1A12] flex flex-col md:flex-row gap-12">
          <img src={p.image} className="w-full md:w-1/2 rounded-[2rem] shadow-xl" alt="" />
          <div className="space-y-6">
            <h1 className="text-6xl font-black italic text-[#8B2312] leading-none uppercase">{p.name}</h1>
            <p className="text-2xl font-bold text-[#D48C2B]">₹{p.price} / {p.weight}</p>
            <button onClick={() => { addToCart(p); navigate('/checkout'); }} className="w-full bg-[#8B2312] text-white py-6 rounded-full font-black italic text-xl shadow-xl">ORDER NOW</button>
          </div>
       </div>
    </div>
  );
};
