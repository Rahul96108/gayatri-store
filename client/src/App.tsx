import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShoppingCart, ArrowRight, Loader2, MapPin, 
  Phone, Instagram, Facebook, X, Plus, Minus, Send, Home 
} from 'lucide-react';
import './index.css';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

// --- 1. DEDICATED CHECKOUT COMPONENT ---
const CheckoutPage = ({ cart, cartTotal, onBack, onComplete }: any) => {
  const [address, setAddress] = useState({ name: '', phone: '', line: '', pin: '' });
  return (
    <div className="min-h-screen bg-[#F5F1E6] pt-32 pb-20 px-6 text-left animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <button onClick={onBack} className="text-[#8B2312] font-black italic uppercase text-xs flex items-center gap-2 hover:gap-4 transition-all">← Back to Shop</button>
          <h2 className="text-5xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">Shipping Details</h2>
          <div className="space-y-4">
            <input placeholder="Full Name" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none" onChange={e => setAddress({...address, name: e.target.value})} />
            <input placeholder="Phone Number" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none" onChange={e => setAddress({...address, phone: e.target.value})} />
            <textarea placeholder="Complete Delivery Address" rows={4} className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none" onChange={e => setAddress({...address, line: e.target.value})} />
            <input placeholder="Pincode" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none" onChange={e => setAddress({...address, pin: e.target.value})} />
          </div>
        </div>
        <div className="bg-[#2D1A12] text-white p-10 rounded-[3.5rem] shadow-2xl">
          <h3 className="text-[#D48C2B] font-black italic text-2xl uppercase mb-8 border-b border-white/10 pb-4">Summary</h3>
          <div className="space-y-4 mb-8">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm font-bold uppercase italic opacity-80">
                <span>{item.name} (x{item.qty})</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-3xl font-black italic uppercase text-[#D48C2B] border-t border-white/10 pt-6">
            <span>Total</span><span>₹{cartTotal}</span>
          </div>
          <button onClick={() => onComplete(address)} className="w-full bg-[#D48C2B] text-[#2D1A12] py-6 rounded-full font-black italic uppercase mt-10 hover:bg-white transition-all shadow-xl">Finalize Order</button>
        </div>
      </div>
    </div>
  );
};

// --- 2. DEDICATED CATALOG COMPONENT ---
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
           <div className="w-10 h-10 rounded-full border border-[#8B2312]/20 flex items-center justify-center bg-white p-1 shadow-sm"><span className="text-[#8B2312] font-black text-[10px] uppercase">Gaya</span></div>
           <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
        </div>
        <button onClick={openCart} className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-110 transition-transform"><ShoppingCart className="w-5 h-5" /><span className="text-[10px] font-bold">{cartCount}</span></button>
      </nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <button onClick={onBack} className="text-[#8B2312] font-black italic uppercase text-xs flex items-center gap-2 group"><Home size={14}/> Back Home</button>
            <h2 className="text-7xl md:text-8xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">The <br/> <span className="text-[#D48C2B]">Catalog</span></h2>
          </div>
          <input type="text" placeholder="SEARCH THE PANTRY..." className="w-full md:w-96 bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {loading ? <div className="flex justify-center py-40"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white border-2 border-[#2D1A12] p-6 rounded-[2.5rem] flex flex-col hover:shadow-2xl transition-all">
                <img src={p.image} className="aspect-square w-full object-cover rounded-[2rem] mb-6 shadow-sm" alt="" />
                <div className="flex justify-between items-start mb-2"><h4 className="text-2xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4><span className="text-lg font-bold text-[#D48C2B]">₹{p.price}</span></div>
                <button onClick={() => addToCart(p)} className="mt-auto border-2 border-[#2D1A12] py-4 rounded-full font-black italic uppercase text-[10px] hover:bg-[#8B2312] hover:text-white transition-all">Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. MAIN STOREFRONT LOGIC ---
const CheckoutPage = ({ cart, cartTotal, onBack, onComplete }: any) => {
  const [address, setAddress] = useState({ name: '', phone: '', email: '', line: '', pin: '' });
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleFinalize = async () => {
    // Generate a unique order number based on date/time count
    const newOrderId = `GS-${Date.now().toString().slice(-6)}`; 
    setOrderId(newOrderId);
    
    // Send details to the main App's submit handler
    const success = await onComplete(address, newOrderId);
    if (success) setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-[#F5F1E6] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white border-4 border-[#8B2312] p-12 rounded-[3.5rem] max-w-2xl w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-[#D48C2B] rounded-full flex items-center justify-center mx-auto mb-8">
            <Send className="text-white w-10 h-10" />
          </div>
          <h2 className="text-5xl font-black italic uppercase text-[#8B2312] mb-4">Order Confirmed!</h2>
          <p className="text-[#D48C2B] font-black text-xl mb-8 uppercase tracking-widest">Order ID: {orderId}</p>
          
          <div className="bg-[#F5F1E6] p-6 rounded-2xl mb-8 text-left space-y-2 border-2 border-[#2D1A12]/10">
            <p className="text-xs font-black uppercase opacity-50">Delivery for:</p>
            <p className="font-bold uppercase italic text-[#2D1A12]">{address.name}</p>
            <p className="text-sm opacity-70">{address.line}, {address.pin}</p>
          </div>

          <button onClick={onBack} className="w-full bg-[#8B2312] text-white py-5 rounded-full font-black italic uppercase hover:bg-[#2D1A12] transition-all">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E6] pt-32 pb-20 px-6 text-left animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <button onClick={onBack} className="text-[#8B2312] font-black italic uppercase text-xs flex items-center gap-2">← Back</button>
          <h2 className="text-5xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">Shipping <br/> Details</h2>
          <div className="space-y-4">
            <input placeholder="Full Name" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, name: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
               <input placeholder="Phone Number" className="bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, phone: e.target.value})} />
               <input placeholder="Email Address" type="email" className="bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, email: e.target.value})} />
            </div>
            <textarea placeholder="Complete Delivery Address" rows={4} className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, line: e.target.value})} />
            <input placeholder="Pincode" className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B]" onChange={e => setAddress({...address, pin: e.target.value})} />
          </div>
        </div>

        <div className="bg-[#2D1A12] text-white p-10 rounded-[3.5rem] h-fit shadow-2xl sticky top-32">
          <h3 className="text-[#D48C2B] font-black italic text-2xl uppercase mb-8 border-b border-white/10 pb-4">Summary</h3>
          <div className="space-y-4 mb-8">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm font-bold uppercase italic opacity-80">
                <span>{item.name} (x{item.qty})</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-3xl font-black italic uppercase text-[#D48C2B] border-t border-white/10 pt-6">
            <span>Total</span><span>₹{cartTotal}</span>
          </div>
          <button onClick={handleFinalize} className="w-full bg-[#D48C2B] text-[#2D1A12] py-6 rounded-full font-black italic uppercase mt-10 hover:bg-white transition-all shadow-xl">
            Finalize Order
          </button>
        </div>
      </div>
    </div>
  );
};

      {/* VIEW ROUTER (Swaps content based on state) */}
      {view === 'home' && (
        <div className="animate-in fade-in duration-700">
          <header className="relative min-h-[85vh] flex flex-col pt-24 px-8 md:px-16 overflow-hidden text-left">
            <nav className="absolute top-0 left-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-20">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full border border-[#8B2312]/20 flex items-center justify-center bg-white p-1 shadow-sm"><span className="text-[#8B2312] font-black text-[10px] uppercase">Gaya</span></div>
                 <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
              </div>
              <button onClick={() => setIsCartOpen(true)} className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-110 transition-transform"><ShoppingCart className="w-5 h-5" /><span className="text-[10px] font-bold">{cartCount}</span></button>
            </nav>
            <div className="flex flex-col lg:flex-row items-center justify-between flex-grow gap-12">
              <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black italic uppercase text-[#8B2312] leading-[0.85] tracking-tighter">CRUNCH <br/> <span className="text-[#D48C2B]">BEYOND</span> <br/> WORDS.</h2>
                <button onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#8B2312] text-white px-10 py-5 rounded-full font-black italic uppercase text-lg shadow-xl hover:bg-[#2D1A12] transition-all">SHOP THE COLLECTION</button>
              </div>
              <div className="lg:w-1/2 flex justify-center lg:justify-end">
                <div className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full border-[15px] border-white shadow-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                    <img src="https://images.unsplash.com/photo-1601050638917-3f04807b93dc?q=80&w=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </header>
          <main ref={productsRef} className="max-w-7xl mx-auto px-6 py-24 text-left">
            <h3 className="text-5xl font-black italic uppercase text-[#8B2312] mb-16 tracking-tighter">Core <span className="text-[#D48C2B]">Favorites</span></h3>
            {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((p) => (
                  <div key={p.id} className="border-2 border-[#2D1A12] p-8 rounded-[3.5rem] bg-white flex flex-col hover:shadow-2xl transition-all group">
                    <img src={p.image} className="w-full h-64 object-cover rounded-[2.5rem] mb-6 shadow-sm group-hover:scale-105 transition-transform" alt="" />
                    <div className="flex justify-between items-start mb-4"><h4 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4><span className="text-xl font-bold text-[#D48C2B]">₹{p.price}</span></div>
                    <button onClick={() => addToCart(p)} className="mt-auto border-2 border-[#2D1A12] py-4 rounded-full font-black italic uppercase flex items-center justify-center gap-3 hover:bg-[#8B2312] hover:text-white transition-all">Add to Cart <Plus size={16} /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-20 flex flex-col items-center border-t border-[#2D1A12]/5 pt-20">
              <button onClick={() => setView('catalog')} className="flex items-center gap-6 bg-[#2D1A12] text-white px-16 py-7 rounded-full font-black italic uppercase hover:bg-[#8B2312] transition-all shadow-2xl group active:scale-95">View Full Catalog <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" /></button>
            </div>
          </main>
          <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-24 pb-12 px-8 md:px-16 border-t-[10px] border-[#D48C2B] text-left">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="space-y-8">
                <h4 className="text-3xl font-black italic uppercase text-[#D48C2B]">GAYATRI</h4>
                <p className="text-sm opacity-60 italic">Authentic namkeen since 1994.</p>
              </div>
              <div className="space-y-4 text-[10px] font-black uppercase opacity-50"><h5 className="text-lg text-white">Contact</h5><p><MapPin size={12} className="inline mr-2"/> Gandhi Nagar, Bhilwara</p><p><Phone size={12} className="inline mr-2"/> +91 9982620643</p></div>
            </div>
            <div className="mt-24 pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase opacity-30"><p>© 2026 GAYATRI STORE. ALL RIGHTS RESERVED.</p></div>
          </footer>
        </div>
      )}

      {view === 'catalog' && (
        <CatalogView 
          onBack={navigateToHome} 
          addToCart={addToCart} 
          cartCount={cartCount} 
          openCart={() => setIsCartOpen(true)} 
        />
      )}

      {view === 'checkout' && (
        <CheckoutPage 
          cart={cart} 
          cartTotal={cartTotal} 
          onBack={navigateToHome} 
          onComplete={handleFinalCheckout} 
        />
      )}
    </div>
  );
}
