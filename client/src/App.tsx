import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShoppingCart, ArrowRight, Loader2, MapPin, 
  Phone, X, Plus, Minus, Home, CheckCircle 
} from 'lucide-react';
import './index.css';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

// --- 1. CHECKOUT COMPONENT ---
const CheckoutPage = ({ cart, cartTotal, onBack, onComplete }: any) => {
  const [address, setAddress] = useState({ name: '', phone: '', email: '', line: '', pin: '' });
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalize = async () => {
    if (!address.name || !address.phone) return alert("Name and Phone are required!");
    setIsSubmitting(true);
    const newOrderId = `GS-${Date.now().toString().slice(-6)}`; 
    setOrderId(newOrderId);
    const success = await onComplete(address, newOrderId);
    if (success) setIsOrdered(true);
    setIsSubmitting(false);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-[#F5F1E6] flex items-center justify-center p-6 text-left animate-in zoom-in duration-500">
        <div className="bg-white border-4 border-[#8B2312] p-12 rounded-[3.5rem] max-w-2xl w-full shadow-2xl">
          <CheckCircle className="text-[#D48C2B] w-20 h-20 mb-8" />
          <h2 className="text-5xl font-black italic uppercase text-[#8B2312] mb-4">Confirmed!</h2>
          <p className="text-[#D48C2B] font-black text-xl mb-8 uppercase tracking-widest">Order ID: {orderId}</p>
          <button onClick={onBack} className="w-full bg-[#8B2312] text-white py-5 rounded-full font-black italic uppercase">Return to Store</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E6] pt-32 pb-20 px-6 text-left animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <button onClick={onBack} className="text-[#8B2312] font-black italic uppercase text-xs">← Back to Shop</button>
          <h2 className="text-5xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">Checkout</h2>
          <div className="space-y-4">
            <input placeholder="Full Name" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, name: e.target.value})} />
            <input placeholder="Phone" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, phone: e.target.value})} />
            <input placeholder="Email" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, email: e.target.value})} />
            <textarea placeholder="Delivery Address" rows={3} className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, line: e.target.value})} />
            <input placeholder="Pincode" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, pin: e.target.value})} />
          </div>
        </div>
        <div className="bg-[#2D1A12] text-white p-10 rounded-[3.5rem] shadow-2xl h-fit">
          <h3 className="text-[#D48C2B] font-black italic text-2xl uppercase mb-8 border-b border-white/10 pb-4">Order Summary</h3>
          <div className="space-y-4 mb-8 max-h-48 overflow-y-auto">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm font-bold uppercase italic opacity-80">
                <span>{item.name} (x{item.qty})</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="text-3xl font-black italic uppercase text-[#D48C2B] border-t border-white/10 pt-6 flex justify-between">
            <span>Total</span><span>₹{cartTotal}</span>
          </div>
          <button onClick={handleFinalize} disabled={isSubmitting} className="w-full bg-[#D48C2B] text-[#2D1A12] py-6 rounded-full font-black italic uppercase mt-10 shadow-xl disabled:opacity-50">
            {isSubmitting ? "Processing..." : "Finalize Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 2. CATALOG COMPONENT ---
const CatalogView = ({ onBack, addToCart, cartCount, openCart }: any) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchAll() {
      const { data } = await supabase.from('products').select('*').order('name');
      if (data) setAllProducts(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F5F1E6] pt-40 pb-24 px-6 text-left animate-in fade-in duration-700">
      <nav className="fixed top-0 left-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-[60] bg-[#F5F1E6]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
           <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
        </div>
        <button onClick={openCart} className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-bold">{cartCount}</span>
        </button>
      </nav>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-7xl md:text-8xl font-black italic uppercase text-[#8B2312] mb-12 tracking-tighter leading-none">The <br/> Catalog</h2>
        <input type="text" placeholder="Search Pantry..." className="w-full md:w-96 bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none mb-12" onChange={(e) => setSearchTerm(e.target.value)} />
        {loading ? <div className="flex justify-center py-40"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white border-2 border-[#2D1A12] p-6 rounded-[2.5rem] flex flex-col hover:shadow-2xl transition-all">
                <img src={p.image} className="aspect-square w-full object-cover rounded-[2rem] mb-6 shadow-sm" alt="" />
                <h4 className="text-2xl font-black italic uppercase text-[#8B2312] mb-2 leading-none">{p.name}</h4>
                <div className="flex justify-between items-center mt-auto pt-4 border-t"><span className="text-lg font-bold text-[#D48C2B]">₹{p.price}</span><button onClick={() => addToCart(p)} className="bg-[#8B2312] text-white p-2 rounded-full"><Plus size={16}/></button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. MAIN STOREFRONT LOGIC ---
export default function Storefront() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'home' | 'catalog' | 'checkout'>('home');
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await supabase.from('products').select('*').limit(6);
        if (data) setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    getProducts();
  }, []);

  const addToCart = (p: any) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, d: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i).filter(i => i.qty > 0));
  };

  const cartTotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  const handleFinalCheckout = async (addr: any, orderId: string) => {
    const itemDetails = cart.map(i => `${i.name} (x${i.qty})`).join(', ');
    const { error } = await supabase.from('orders').insert([{
      order_id: orderId,
      customer_name: addr.name,
      customer_email: addr.email || 'N/A',
      customer_phone: addr.phone,
      address_line: addr.line,
      pincode: addr.pin,
      items: itemDetails,
      total: Number(cartTotal),
      status: 'pending'
    }]);

    if (error) console.error("Database Save Failed:", error);

    const msg = `*NEW ORDER ${orderId}*%0A*Customer:* ${addr.name}%0A*Items:* ${itemDetails}%0A*Total:* ₹${cartTotal}`;
    window.open(`https://wa.me/919982620643?text=${msg}`, '_blank');
    return true;
  };

  const navigateToHome = () => { setIsCartOpen(false); setView('home'); window.scrollTo(0,0); };

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B]">
      
      {/* CART OVERLAY */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[100] transform transition-transform duration-500 border-l-4 border-[#D48C2B] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-10 text-[#8B2312] font-black italic uppercase text-3xl">
            <h3>Bag</h3>
            <button onClick={() => setIsCartOpen(false)}><X /></button>
          </div>
          <div className="flex-grow overflow-y-auto space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center border-b pb-4 text-left">
                <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-grow">
                  <h4 className="font-black italic uppercase text-[#8B2312] text-sm leading-none">{item.name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQty(item.id, -1)} className="p-1 bg-gray-100 rounded-md"><Minus size={10}/></button>
                    <span className="font-bold text-xs">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-1 bg-gray-100 rounded-md"><Plus size={10}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="pt-8 border-t space-y-4">
              <div className="flex justify-between text-2xl font-black italic text-[#8B2312] uppercase"><span>Total</span><span>₹{cartTotal}</span></div>
              <button onClick={() => { setIsCartOpen(false); setView('checkout'); }} className="w-full bg-[#8B2312] text-white py-5 rounded-full font-black italic uppercase">Checkout</button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW ROUTER */}
      {view === 'home' && (
        <div className="animate-in fade-in duration-700">
          <header className="relative min-h-[85vh] flex flex-col pt-24 px-8 md:px-16 overflow-hidden text-left">
            <nav className="absolute top-0 left-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-20">
               <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
               <button onClick={() => setIsCartOpen(true)} className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-[10px] font-bold">{cartCount}</span>
               </button>
            </nav>
            <div className="flex flex-col lg:flex-row items-center justify-between flex-grow gap-12">
              <div className="lg:w-1/2 space-y-8 text-left">
                <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black italic uppercase text-[#8B2312] leading-[0.85] tracking-tighter">CRUNCH <br/> <span className="text-[#D48C2B]">BEYOND</span> <br/> WORDS.</h2>
                <button onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#8B2312] text-white px-10 py-5 rounded-full font-black italic uppercase text-lg shadow-xl hover:bg-[#2D1A12] transition-all">SHOP NOW</button>
              </div>
              <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
                {/* --- FIXED HERO IMAGE SECTION --- */}
                {/* Added flex-shrink-0 to prevent squashing into an oval */}
                <div className="w-72 h-72 md:w-[450px] md:h-[450px] flex-shrink-0 rounded-full border-[15px] border-white shadow-2xl overflow-hidden bg-[#D48C2B]/10 z-10 group">
                  <img 
                    /* Updated URL to a clear, high-quality thin yellow sev image */
                    src="assets/hero.png" 
                    alt="Bowl of thin yellow sev namkeen" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-dashed border-[#8B2312]/10 rounded-full"></div>
              </div>
            </div>
          </header>
          <main ref={productsRef} className="max-w-7xl mx-auto px-6 py-24 text-left">
            <h3 className="text-5xl font-black italic uppercase text-[#8B2312] mb-16 tracking-tighter">Favorites</h3>
            {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((p) => (
                  <div key={p.id} className="border-2 border-[#2D1A12] p-8 rounded-[3.5rem] bg-white flex flex-col hover:shadow-2xl transition-all shadow-sm">
                    <img src={p.image} className="w-full h-64 object-cover rounded-[2.5rem] mb-6 shadow-sm" alt="" />
                    <div className="flex justify-between items-start mb-4 px-1"><h4 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4><span className="text-xl font-bold text-[#D48C2B]">₹{p.price}</span></div>
                    <button onClick={() => addToCart(p)} className="mt-auto border-2 border-[#2D1A12] py-4 rounded-full font-black italic uppercase hover:bg-[#8B2312] hover:text-white transition-all text-xs">Add to Cart</button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-20 flex flex-col items-center border-t border-[#2D1A12]/5 pt-20">
              <button onClick={() => setView('catalog')} className="flex items-center gap-6 bg-[#2D1A12] text-white px-16 py-7 rounded-full font-black italic uppercase hover:bg-[#8B2312] transition-all group">View Full Catalog <ArrowRight className="group-hover:translate-x-3 transition-transform" /></button>
            </div>
          </main>
          <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-24 pb-12 px-8 md:px-16 border-t-[10px] border-[#D48C2B] text-left">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="space-y-8"><h4 className="text-3xl font-black italic uppercase text-[#D48C2B]">GAYATRI</h4><p className="text-sm opacity-60 italic">Authentic snacks since 1994.</p></div>
              <div className="space-y-4 text-[10px] font-black uppercase opacity-50"><h5 className="text-lg text-white text-left">Contact</h5><p>Bhilwara, Rajasthan</p><p>+91 9982620643</p></div>
            </div>
          </footer>
        </div>
      )}

      {view === 'catalog' && <CatalogView onBack={navigateToHome} addToCart={addToCart} cartCount={cartCount} openCart={() => setIsCartOpen(true)} />}
      {view === 'checkout' && <CheckoutPage cart={cart} cartTotal={cartTotal} onBack={navigateToHome} onComplete={handleFinalCheckout} />}
    </div>
  );
}
