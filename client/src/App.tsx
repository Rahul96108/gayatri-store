import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShoppingCart, ArrowRight, Loader2, MapPin, 
  Phone, Mail, Instagram, Facebook, X, Plus, Minus, Send 
} from 'lucide-react';
import './index.css';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function Storefront() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await supabase.from('products').select('*').limit(6);
        if (data) setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const checkoutViaWhatsApp = () => {
    const message = cart.map(item => `*${item.name}* (x${item.qty}) - ₹${item.price * item.qty}`).join('%0A');
    const total = `%0A%0A*Total Order Value: ₹${cartTotal}*`;
    window.open(`https://wa.me/919982620643?text=Hello Gayatri Store! I want to order:%0A${message}${total}`, '_blank');
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B]">
      
      {/* --- CART OVERLAY --- */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out border-l-4 border-[#D48C2B] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-black italic uppercase text-[#8B2312]">Your Bag</h3>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
          </div>
          <div className="flex-grow overflow-y-auto space-y-6">
            {cart.length === 0 ? (
              <p className="text-center py-20 opacity-30 font-bold uppercase tracking-widest italic">Bag is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-4">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div className="flex-grow">
                    <h4 className="font-black italic uppercase text-[#8B2312] text-sm">{item.name}</h4>
                    <p className="text-[#D48C2B] font-bold text-xs">₹{item.price * item.qty}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 bg-gray-100 rounded-md"><Minus size={10}/></button>
                      <span className="font-bold text-xs">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 bg-gray-100 rounded-md"><Plus size={10}/></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-2xl font-black italic text-[#8B2312] uppercase">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button onClick={checkoutViaWhatsApp} className="w-full bg-[#8B2312] text-white py-5 rounded-full font-black italic uppercase flex items-center justify-center gap-3">
                Order via WhatsApp <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative min-h-[85vh] flex flex-col pt-24 px-8 md:px-16 overflow-hidden">
        <nav className="absolute top-0 left-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border border-[#8B2312]/20 flex items-center justify-center bg-white p-1">
                <span className="text-[#8B2312] font-black text-[10px] uppercase">Gaya</span>
             </div>
             <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-bold">{cart.reduce((a, b) => a + b.qty, 0)}</span>
          </button>
        </nav>
        <div className="flex flex-col lg:flex-row items-center justify-between flex-grow gap-12">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black italic uppercase text-[#8B2312] leading-[0.85] tracking-tighter">
              CRUNCH <br/> <span className="text-[#D48C2B]">BEYOND</span> <br/> WORDS.
            </h2>
            <div className="space-y-2 text-[#2D1A12] opacity-70 font-bold uppercase tracking-widest text-sm italic">
              <p>Small batches. Pure groundnut oil. Authentic Rajasthani flavors.</p>
            </div>
            <button onClick={scrollToProducts} className="bg-[#8B2312] text-white px-10 py-5 rounded-full font-black italic uppercase text-lg shadow-xl hover:bg-[#2D1A12] transition-all">
              SHOP THE COLLECTION
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border-[15px] border-white shadow-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                <img src="https://images.unsplash.com/photo-1601050638917-3f04807b93dc?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* --- PRODUCT GRID --- */}
      <main ref={productsRef} className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-5xl font-black italic uppercase text-[#8B2312] mb-16 tracking-tighter">Core <span className="text-[#D48C2B]">Favorites</span></h3>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((p) => (
              <div key={p.id} className="border-2 border-[#2D1A12] p-8 rounded-[3.5rem] bg-white flex flex-col">
                <img src={p.image} className="w-full h-64 object-cover rounded-[2.5rem] mb-6" alt={p.name} />
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4>
                  <span className="text-xl font-bold text-[#D48C2B]">₹{p.price}</span>
                </div>
                <button onClick={() => addToCart(p)} className="mt-auto border-2 border-[#2D1A12] py-4 rounded-full font-black italic uppercase flex items-center justify-center gap-3 hover:bg-[#8B2312] hover:text-white transition-all">
                  Add to Cart <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* --- FULL CATALOG REDIRECT BUTTON --- */}
        <div className="mt-20 flex flex-col items-center border-t border-[#2D1A12]/5 pt-20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 text-center">
              Discover our complete range of Rajasthani & Indori flavors
            </p>
      <button onClick={() => { setView('catalog'); window.scrollTo(0,0); }} className="flex items-center gap-6 bg-[#2D1A12] text-white px-16 py-7 rounded-full font-black italic uppercase hover:bg-[#8B2312] transition-all shadow-2xl group active:scale-95">
            View Full Catalog 
        <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
        </button>
            </div>


        
      </main>
      

      {/* --- FOOTER --- */}
      <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-24 pb-12 px-8 md:px-16 border-t-[10px] border-[#D48C2B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2">
                <span className="text-[#8B2312] font-black text-xs uppercase">Gaya</span>
              </div>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter text-[#D48C2B]">GAYATRI</h4>
            </div>
            <p className="text-sm opacity-60 italic">Handcrafting Indori & Rajasthani namkeen since 1994.</p>
          </div>
          <div className="space-y-8">
            <h5 className="text-lg font-black italic uppercase text-white">Explore</h5>
            <ul className="space-y-4 text-[10px] font-black uppercase opacity-50">
              <li>Full Catalog</li>
              <li>Signature Items</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h5 className="text-lg font-black italic uppercase text-white">Visit Us</h5>
            <div className="text-[10px] font-black uppercase opacity-50 space-y-4">
              <p className="flex items-center gap-3"><MapPin size={16}/> Gandhi Nagar, Bhilwara</p>
              <p className="flex items-center gap-3"><Phone size={16}/> +91 9982620643</p>
            </div>
          </div>
          <div className="space-y-8">
            <h5 className="text-lg font-black italic uppercase text-white">Socials</h5>
            <div className="flex gap-4">
              <Instagram className="cursor-pointer hover:text-[#D48C2B] transition-colors" />
              <Facebook className="cursor-pointer hover:text-[#D48C2B] transition-colors" />
            </div>
          </div>
        </div>
        <div className="mt-24 pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
          <p>© 2026 GAYATRI STORE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
