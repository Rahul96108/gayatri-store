import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, ArrowRight, ChevronLeft, Star, Trash2, MapPin, 
  Phone, User, CheckCircle, Instagram, Facebook, Quote, Mail
} from 'lucide-react';

// Inside client/App.tsx
useEffect(() => {
  const fetchLiveProducts = async () => {
    const { data } = await supabase.from('products').select('*');
    if (data) setProductsList(data);
  };
  fetchLiveProducts();
}, []);


// --- CONFIG & DATA ---
const WHATSAPP_NUMBER = "9196108XXXXX"; // Replace with your actual number

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

// --- SHARED COMPONENTS ---

const Navbar = ({ cartCount }: { cartCount: number }) => (
  <nav className="sticky top-0 z-50 bg-[#F5F1E6]/95 backdrop-blur-xl border-b border-[#8B2312]/5 px-6 md:px-10 py-5">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3 group">
        <img src="/favicon.png" alt="Gayatri Logo" className="w-10 h-10 rounded-full border-2 border-[#8B2312] group-hover:rotate-12 transition-transform" />
        <span className="text-2xl font-black tracking-tighter text-[#8B2312]">GAYATRI</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/checkout" className="relative bg-[#8B2312] p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#D48C2B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F5F1E6]">{cartCount}</span>}
        </Link>
      </div>
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
            <li><Link to="/catalog" className="hover:text-[#D48C2B]">Full Catalog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black italic text-xl mb-8 text-[#D48C2B] uppercase tracking-widest">Connect</h4>
          <ul className="space-y-4 opacity-50 text-sm font-bold">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +91 96108 XXXXX</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4" /> Rajasthan, India</li>
          </ul>
        </div>
        <div className="flex gap-6"><Instagram className="cursor-pointer hover:text-[#D48C2B]" /><Facebook className="cursor-pointer hover:text-[#D48C2B]" /></div>
      </div>
      <div className="pt-10 text-center opacity-30 text-[10px] tracking-[0.3em] font-black uppercase">© 2026 Gayatri Namkeen Store</div>
    </div>
  </footer>
);

// --- PAGES ---

const Home = ({ addToCart }: any) => (
  <div className="bg-[#F5F1E6]">
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-32 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-10 text-center md:text-left">
        <h1 className="text-7xl md:text-9xl font-black italic leading-[0.8] text-[#8B2312] tracking-tighter uppercase">CRUNCH <br /><span className="text-[#D48C2B]">BEYOND</span> <br />WORDS.</h1>
        <p className="text-xl md:text-2xl max-w-md text-[#2D1A12]/70 font-medium mx-auto md:mx-0">Small batches. Pure groundnut oil. Authentic Rajasthani flavors.</p>
        <a href="#menu" className="inline-block bg-[#8B2312] text-white px-12 py-6 rounded-full text-xl font-black italic shadow-2xl hover:scale-105 transition-all">SHOP THE COLLECTION</a>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[#D48C2B]/20 rounded-full blur-[100px] scale-125 animate-pulse" />
        <img src={products[0].image} className="relative rounded-full border-[1.5rem] border-white shadow-2xl w-full max-w-lg mx-auto aspect-square object-cover rotate-3" alt="Featured" />
      </div>
    </section>

    <div id="menu" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <h2 className="text-5xl md:text-7xl font-black italic text-[#8B2312] mb-16 uppercase">The Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map(p => (
          <div key={p.id} className="group bg-white border-2 border-[#2D1A12] rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="h-64 overflow-hidden relative">
              <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              <div className="absolute top-4 left-4 bg-[#D48C2B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{p.category}</div>
            </div>
            <div className="p-8 space-y-4 text-center">
              <h3 className="text-2xl font-black italic text-[#8B2312] uppercase leading-none">{p.name}</h3>
              <p className="font-black text-[#D48C2B] text-xl">₹{p.price}</p>
              <button onClick={() => addToCart(p)} className="w-full bg-[#8B2312] text-white py-4 rounded-full font-black italic hover:bg-[#2D1A12] transition-all uppercase text-sm">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Checkout = ({ cart, removeFromCart }: { cart: any[], removeFromCart: any }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', pincode: '', state: '' });
  const [orderStatus, setOrderStatus] = useState<{success: boolean, id?: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: cart, total }),
      });
      const data = await response.json();
      if (data.success) {
        setOrderStatus({ success: true, id: data.orderId });
      }
    } catch (error) {
      alert("Backend connection error. Please try WhatsApp ordering.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = cart.map(item => `- ${item.product.name} (${item.qty}x)`).join('%0A');
    const message = `*WHATSAPP ORDER*%0A%0A*Name:* ${form.name}%0A*Address:* ${form.address}, ${form.state} - ${form.pincode}%0A%0A*Items:*%0A${orderDetails}%0A%0A*Total:* ₹${total}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (orderStatus?.success) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center space-y-6 bg-[#F5F1E6]">
      <div className="bg-green-100 p-8 rounded-full animate-bounce"><CheckCircle className="w-16 h-16 text-green-600" /></div>
      <h2 className="text-5xl font-black italic text-[#8B2312]">SUCCESS!</h2>
      <p className="text-xl font-bold text-[#2D1A12]">Your Order ID: <span className="text-[#D48C2B]">#{orderStatus.id}</span></p>
      <p className="text-gray-600 max-w-md">Confirmation sent to {form.email}. Your crunch is on the way!</p>
      <Link to="/" className="bg-[#8B2312] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl">Back to Store</Link>
    </div>
  );

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E6]"><h2 className="text-4xl font-black italic text-[#8B2312]">YOUR CART IS EMPTY</h2><Link to="/" className="mt-8 bg-[#8B2312] text-white px-10 py-4 rounded-full font-bold">START SHOPPING</Link></div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-8">
        <h2 className="text-5xl font-black italic text-[#8B2312] uppercase tracking-tighter">Summary</h2>
        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-[#2D1A12] shadow-xl">
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between items-center py-4 border-b last:border-0">
              <div className="flex items-center gap-4"><img src={item.product.image} className="w-16 h-16 rounded-2xl object-cover" alt="" /><div><p className="font-bold text-sm uppercase">{item.product.name}</p><p className="text-[#D48C2B] font-bold">₹{item.product.price} x {item.qty}</p></div></div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
          <div className="mt-8 pt-6 border-t-4 border-[#8B2312] flex justify-between items-center text-3xl font-black italic text-[#8B2312]"><span>TOTAL BILL</span><span>₹{total}</span></div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="bg-[#2D1A12] text-white rounded-[2.5rem] p-10 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D48C2B]/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#D48C2B] mb-4 italic text-center">Delivery Details</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="NAME" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B] transition-colors" />
          <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="PHONE" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B] transition-colors" />
        </div>
        
        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
        
        <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="FULL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none h-24 focus:border-[#D48C2B] resize-none" />
        
        <div className="grid grid-cols-2 gap-4">
          <input required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} placeholder="PINCODE" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
          <input required value={form.state} onChange={e => setForm({...form, state: e.target.value})} placeholder="STATE" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button type="submit" disabled={loading} className="w-full bg-[#D48C2B] text-[#2D1A12] py-5 rounded-full text-xl font-black italic uppercase hover:bg-white transition-all shadow-xl">
            {loading ? 'PROCESSING...' : 'PLACE OFFICIAL ORDER'}
          </button>
          
          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-[10px] font-black opacity-30 tracking-[0.3em]">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <button type="button" onClick={handleWhatsAppOrder} className="w-full border-2 border-[#25D366] text-[#25D366] py-4 rounded-full text-lg font-black italic uppercase hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-3">
            Quick Order on WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

const Catalog = ({ addToCart }: any) => (
  <div className="bg-[#F5F1E6] py-24 px-6 md:px-10 max-w-7xl mx-auto">
    <h1 className="text-7xl font-black italic text-[#8B2312] mb-20 uppercase text-center">Full Collection</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {products.map(p => (
        <div key={p.id} className="bg-white border-2 border-[#2D1A12] rounded-[2.5rem] overflow-hidden p-8 text-center space-y-4">
          <img src={p.image} className="w-full h-48 object-cover rounded-2xl mb-4" alt="" />
          <h3 className="text-2xl font-black italic text-[#8B2312] uppercase leading-none">{p.name}</h3>
          <p className="font-black text-[#D48C2B] text-xl">₹{p.price}</p>
          <button onClick={() => addToCart(p)} className="w-full bg-[#8B2312] text-white py-4 rounded-full font-black italic hover:bg-[#2D1A12] transition-all uppercase text-sm">Add to Cart</button>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
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
        <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
