import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, ChevronLeft, Star, Trash2, MapPin, Phone, User, CheckCircle, Instagram, Facebook, Quote, Star as StarIcon } from 'lucide-react';

// --- CONFIG & DATA ---
const WHATSAPP_NUMBER = "9196108XXXXX"; 

const products = [
  { id: "ratlami-sev", name: "Special Ratlami Sev", price: 180, weight: "250g", category: "The Iconic Sev", image: "https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?w=800", desc: "Signature spicy sev with cloves and hand-pounded spices." },
  { id: "gathiya", name: "Bhavnagari Gathiya", price: 150, weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=800", desc: "Soft and crunchy tea-time snack made with pure groundnut oil." },
  { id: "premium-mix", name: "Royal Mixture", price: 220, weight: "200g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1626132646529-500637532537?w=800", desc: "A luxury blend of cornflakes, nuts, and dry fruits." },
  { id: "corn-chivda", name: "Spicy Corn Chivda", price: 140, weight: "250g", category: "Chivda Mix", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Yellow corn flakes tossed in turmeric and red chili." },
  { id: "aloo-bhujia", name: "Aloo Bhujia", price: 160, weight: "250g", category: "Classic Snacks", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800", desc: "Crispy potato noodles flavored with mint and dry mango powder." },
  { id: "diet-chiwda", name: "Diet Roasted Chiwda", price: 130, weight: "200g", category: "Healthy Bites", image: "https://images.unsplash.com/photo-1605666807892-8c11d020bd41?w=800", desc: "Lightly roasted flakes with zero oil, perfect for guilt-free snacking." }
];

const testimonials = [
  { name: "Anjali Sharma", text: "The Ratlami Sev tastes exactly like home. You can tell they use real groundnut oil!", location: "Jaipur" },
  { name: "Vikram Meena", text: "Finally, a brand that doesn't compromise on the 'teekha' factor. Highly recommended.", location: "Kota" }
];

// --- APP COMPONENT ---
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
        <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// --- SHARED COMPONENTS ---

const Navbar = ({ cartCount }: { cartCount: number }) => (
  <nav className="sticky top-0 z-50 bg-[#F5F1E6]/95 backdrop-blur-xl border-b border-[#8B2312]/5 px-6 md:px-10 py-5">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-black tracking-tighter text-[#8B2312]">GAYATRI</Link>
      <div className="hidden md:flex gap-8 font-bold text-[10px] uppercase tracking-widest text-[#2D1A12]">
        <Link to="/catalog" className="hover:text-[#8B2312] transition-colors">Collections</Link>
        <a href="#menu" className="hover:text-[#8B2312] transition-colors">Our Menu</a>
      </div>
      <Link to="/checkout" className="relative bg-[#8B2312] p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
        <ShoppingCart className="w-4 h-4" />
        {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#D48C2B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F5F1E6] animate-bounce">{cartCount}</span>}
      </Link>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-24 pb-12 mt-20 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/10 pb-20">
        <div className="space-y-6">
          <div className="flex flex-col">
            <h3 className="text-4xl font-black tracking-tighter text-[#D48C2B] leading-none uppercase">GAYATRI</h3>
            <span className="text-[10px] font-bold tracking-[0.5em] text-[#D48C2B] mt-1 opacity-80 uppercase">NAMKEEN</span>
          </div>
          <p className="opacity-60 text-sm leading-relaxed">Handcrafted in small batches using 100% pure groundnut oil. Tradition in every bite.</p>
        </div>
        <div>
          <h4 className="font-black italic text-xl mb-8 text-[#D48C2B] uppercase tracking-widest">Explore</h4>
          <ul className="space-y-4 opacity-50 text-sm font-bold uppercase tracking-widest">
            <li><Link to="/" className="hover:text-[#D48C2B]">Home</Link></li>
            <li><Link to="/catalog" className="hover:text-[#D48C2B]">Catalog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black italic text-xl mb-8 text-[#D48C2B] uppercase tracking-widest">Connect</h4>
          <ul className="space-y-4 opacity-50 text-sm font-bold">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +91 96108 XXXXX</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4" /> Rajasthan, India</li>
          </ul>
        </div>
        <div className="flex gap-6"><Instagram /><Facebook /></div>
      </div>
      <div className="pt-10 text-center opacity-30 text-[10px] tracking-[0.3em] font-black uppercase">© 2026 Gayatri Namkeen Store</div>
    </div>
  </footer>
);

const ProductCard = ({ p, addToCart }: { p: typeof products[0], addToCart: any }) => (
  <div className="group bg-white border-2 border-[#2D1A12] rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
    <div className="h-64 overflow-hidden relative">
      <Link to={`/product/${p.id}`}>
        <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
      </Link>
      <div className="absolute top-5 left-5 bg-[#D48C2B] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{p.category}</div>
    </div>
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black italic text-[#8B2312] uppercase leading-none">{p.name}</h3>
        <span className="font-black text-[#D48C2B] text-xl">₹{p.price}</span>
      </div>
      <button onClick={() => addToCart(p)} className="w-full bg-[#8B2312] text-white py-4 rounded-full font-black italic hover:bg-[#2D1A12] transition-all uppercase tracking-widest text-sm">Add to Cart</button>
    </div>
  </div>
);

// --- PAGES ---

const Home = ({ addToCart }: any) => (
  <div className="bg-[#F5F1E6]">
    {/* Hero Restored */}
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-32 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-10 text-center md:text-left">
        <h1 className="text-7xl md:text-9xl font-black italic leading-[0.8] text-[#8B2312] tracking-tighter">CRUNCH <br /><span className="text-[#D48C2B]">BEYOND</span> <br />WORDS.</h1>
        <p className="text-xl md:text-2xl max-w-md text-[#2D1A12]/70 font-medium mx-auto md:mx-0">Small batches. Pure groundnut oil. Authentic Rajasthani flavors.</p>
        <a href="#menu" className="inline-block bg-[#8B2312] text-white px-12 py-6 rounded-full text-xl font-black italic shadow-2xl hover:scale-105 transition-all">EXPLORE THE MENU</a>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-[100px] scale-125 animate-pulse" />
        <img src={products[0].image} className="relative rounded-full border-[1.5rem] border-white shadow-2xl w-full max-w-lg mx-auto aspect-square object-cover" alt="Featured" />
      </div>
    </section>

    {/* Ribbon Restored */}
    <div className="bg-[#8B2312] py-4 -rotate-1 scale-105 shadow-2xl overflow-hidden my-10 border-y-2 border-[#D48C2B]/30">
      <div className="flex gap-12 whitespace-nowrap text-white font-bold text-lg uppercase italic animate-pulse">
        {[1,2,3].map(i => (
          <span key={i} className="flex items-center gap-4">
             <Star className="fill-[#D48C2B] text-[#D48C2B] w-4 h-4" /> 100% Pure Groundnut Oil 
             <Star className="fill-[#D48C2B] text-[#D48C2B] w-4 h-4" /> Hand-Pounded Spices
          </span>
        ))}
      </div>
    </div>

    {/* Product Grid */}
    <div id="menu" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <h2 className="text-5xl md:text-7xl font-black italic text-[#8B2312] mb-16 uppercase">The Classics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.slice(0, 6).map(p => <ProductCard p={p} addToCart={addToCart} key={p.id} />)}
      </div>
      <div className="mt-20 text-center">
        <Link to="/catalog" className="inline-flex items-center gap-4 border-4 border-[#8B2312] text-[#8B2312] px-12 py-6 rounded-full text-2xl font-black italic hover:bg-[#8B2312] hover:text-white transition-all uppercase">View Full Catalog <ArrowRight /></Link>
      </div>
    </div>

    {/* Testimonials Restored */}
    <section className="bg-[#2D1A12] py-24 my-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-white text-4xl font-black italic mb-16 uppercase text-center">Voices of Crunch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] relative group">
              <Quote className="absolute top-8 right-10 w-12 h-12 text-[#D48C2B]/20" />
              <p className="text-white text-xl font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
              <div><p className="text-[#D48C2B] font-black uppercase">{t.name}</p><p className="text-white/40 text-xs font-bold uppercase">{t.location}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Checkout = ({ cart, removeFromCart }: { cart: any[], removeFromCart: any }) => {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails = cart.map(item => `- ${item.product.name} (${item.qty}x)`).join('%0A');
    const message = `*NEW ORDER*%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Address:* ${form.address}%0A%0A*Items:*%0A${orderDetails}%0A%0A*Total:* ₹${total}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (cart.length === 0) return <div className="p-20 text-center"><h2 className="text-4xl font-black italic text-[#8B2312]">YOUR CART IS EMPTY</h2><Link to="/" className="mt-8 inline-block bg-[#8B2312] text-white px-10 py-4 rounded-full font-bold">Back to Snacks</Link></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-8">
        <h2 className="text-5xl font-black italic text-[#8B2312] uppercase tracking-tighter">Your Order</h2>
        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-[#2D1A12] shadow-xl">
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between items-center py-4 border-b last:border-0">
              <div className="flex items-center gap-4"><img src={item.product.image} className="w-16 h-16 rounded-2xl object-cover" alt="" /><div><p className="font-bold text-sm uppercase">{item.product.name}</p><p className="text-[#D48C2B] font-bold">₹{item.product.price} x {item.qty}</p></div></div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
          <div className="mt-8 pt-6 border-t-4 border-[#8B2312] flex justify-between items-center text-3xl font-black italic text-[#8B2312]"><span>TOTAL</span><span>₹{total}</span></div>
        </div>
      </div>
      <form onSubmit={handleOrder} className="bg-[#2D1A12] text-white rounded-[2.5rem] p-10 space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#D48C2B] mb-6 italic">Delivery</h2>
        <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="FULL NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D48C2B]" />
        <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="WHATSAPP NO" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D48C2B]" />
        <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="FULL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none h-32 focus:border-[#D48C2B]" />
        <button type="submit" className="w-full bg-[#D48C2B] text-[#2D1A12] py-6 rounded-full text-xl font-black italic uppercase">Confirm Order</button>
      </form>
    </div>
  );
};

// --- REST OF PAGES (ProductDetail, Catalog) ---
const Catalog = ({ addToCart }: any) => (
  <div className="max-w-7xl mx-auto px-6 py-24"><h1 className="text-7xl font-black italic text-[#8B2312] mb-20 uppercase text-center">Full Catalog</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">{products.map(p => <ProductCard p={p} addToCart={addToCart} key={p.id} />)}</div></div>
);

const ProductDetail = ({ addToCart }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const p = products.find(x => x.id === id);
  if (!p) return null;
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-20 items-center">
      <img src={p.image} className="flex-1 rounded-[4rem] border-[1rem] border-white shadow-2xl aspect-square object-cover" alt="" />
      <div className="flex-1 space-y-10">
        <h1 className="text-6xl md:text-8xl font-black italic text-[#8B2312] uppercase leading-none">{p.name}</h1>
        <p className="text-3xl font-bold text-[#D48C2B]">₹{p.price} / {p.weight}</p>
        <p className="text-xl opacity-60 font-medium">{p.desc}</p>
        <button onClick={() => { addToCart(p); navigate('/checkout'); }} className="w-full bg-[#8B2312] text-white py-6 rounded-full text-2xl font-black italic">BUY IT NOW</button>
      </div>
    </div>
  );
};
