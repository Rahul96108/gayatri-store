import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, Package, Trash2, Phone, MapPin, Loader2, Plus, LogOut } from 'lucide-react';
import './index.css';
// --- 1. CONFIGURATION (Single Declaration) ---
const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Product Form State
  const [newP, setNewP] = useState({ id: '', name: '', price: '', weight: '250g', category: 'Classic', image: '', description: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: p } = await supabase.from('products').select('*');
      const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (p) setProducts(p);
      if (o) setOrders(o);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([{ ...newP, price: Number(newP.price) }]);
    if (!error) {
      fetchData();
      setNewP({ id: '', name: '', price: '', weight: '250g', category: 'Classic', image: '', description: '' });
      alert("Inventory Updated Successfully!");
    } else {
      alert("Error adding product. Check Supabase RLS.");
    }
  }

  async function deleteProduct(id: string) {
    if (window.confirm("Remove this item from storefront?")) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans">
      {/* HEADER / NAVIGATION */}
      <nav className="bg-[#8B2312] text-white px-6 md:px-12 py-5 flex justify-between items-center shadow-2xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-full">
            <div className="w-8 h-8 bg-[#8B2312] rounded-full flex items-center justify-center font-black italic">G</div>
          </div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Gayatri <span className="text-[#D48C2B]">Control</span></h1>
        </div>
        
        <div className="flex bg-black/20 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'orders' ? 'bg-[#D48C2B] text-white' : 'hover:bg-white/5 opacity-50'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'inventory' ? 'bg-[#D48C2B] text-white' : 'hover:bg-white/5 opacity-50'}`}
          >
            Inventory
          </button>
        </div>
      </nav>

      {/* MAIN DASHBOARD */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {loading ? (
          <div className="flex h-96 flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#8B2312] w-12 h-12" />
            <p className="font-black italic text-[#8B2312] animate-pulse">Syncing with Storefront...</p>
          </div>
        ) : activeTab === 'orders' ? (
          /* ORDERS MODULE */
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-6xl font-black italic text-[#8B2312] uppercase tracking-tighter leading-none">Live Order <br/> Feed</h2>
            <div className="grid gap-6">
              {orders.length === 0 ? (
                <div className="bg-white/50 border-4 border-dashed border-[#2D1A12]/10 rounded-[3rem] p-20 text-center">
                  <p className="text-2xl font-black italic text-[#2D1A12]/20">Awaiting your first sale...</p>
                </div>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="bg-white border-2 border-[#2D1A12] rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-center shadow-xl group">
                    <div className="space-y-4 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="bg-[#D48C2B] text-white px-4 py-1 rounded-full text-[10px] font-black italic uppercase">Order #{o.id}</span>
                        <span className="text-[#2D1A12]/30 text-[10px] uppercase font-bold tracking-widest">{new Date(o.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-4xl font-black italic uppercase text-[#8B2312] leading-tight">{o.customer_name}</h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-[#2D1A12]/60 uppercase italic">
                        <span className="flex items-center gap-2 bg-[#F5F1E6] px-3 py-1.5 rounded-lg border border-[#2D1A12]/5"><Phone className="w-4 h-4 text-[#D48C2B]"/> {o.phone}</span>
                        <span className="flex items-center gap-2 bg-[#F5F1E6] px-3 py-1.5 rounded-lg border border-[#2D1A12]/5"><MapPin className="w-4 h-4 text-[#D48C2B]"/> {o.address}</span>
                      </div>
                    </div>
                    <div className="text-center md:text-right mt-8 md:mt-0 flex flex-col items-center md:items-end gap-3">
                      <p className="text-5xl font-black text-[#2D1A12] tracking-tighter">₹{o.total}</p>
                      <button className="bg-[#8B2312] text-white px-10 py-4 rounded-full font-black text-xs uppercase hover:bg-[#D48C2B] hover:scale-105 transition-all shadow-lg active:scale-95">
                        Mark as Packed
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* INVENTORY MODULE */
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-6xl font-black italic text-[#8B2312] uppercase tracking-tighter leading-none">Manage <br/> Inventory</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* BRANDED PRODUCT FORM */}
              <form onSubmit={addProduct} className="bg-[#2D1A12] text-white p-10 rounded-[3.5rem] shadow-2xl space-y-5 h-fit sticky top-32">
                <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                   <Plus className="text-[#D48C2B]" />
                   <h3 className="text-[#D48C2B] font-black italic text-2xl uppercase">New Snack</h3>
                </div>
                <div className="space-y-4">
                  <input required placeholder="Unique ID (e.g. ratlami-sev)" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#D48C2B] text-sm" value={newP.id} onChange={e => setNewP({...newP, id: e.target.value})} />
                  <input required placeholder="Product Display Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#D48C2B] text-sm" value={newP.name} onChange={e => setNewP({...newP, name: e.target.value})} />
                  <input required placeholder="Price (₹)" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#D48C2B] text-sm" value={newP.price} onChange={e => setNewP({...newP, price: e.target.value})} />
                  <input required placeholder="Image URL (Unsplash or direct)" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#D48C2B] text-sm" value={newP.image} onChange={e => setNewP({...newP, image: e.target.value})} />
                  <button type="submit" className="w-full bg-[#D48C2B] text-[#2D1A12] py-5 rounded-full font-black italic uppercase hover:bg-white transition-all shadow-xl text-lg active:scale-95">
                    Sync to Store
                  </button>
                </div>
              </form>

              {/* LIVE INVENTORY GRID */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white border-2 border-[#2D1A12] p-6 rounded-[2.5rem] flex flex-col justify-between group hover:shadow-2xl transition-all">
                    <div className="flex gap-6 items-center mb-8">
                      <div className="relative">
                        <img src={p.image} className="w-24 h-24 rounded-[1.5rem] object-cover border-2 border-[#8B2312]/5 shadow-lg" alt="" />
                        <span className="absolute -top-2 -right-2 bg-[#D48C2B] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase italic">Live</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black italic uppercase leading-none text-[#8B2312]">{p.name}</h4>
                        <p className="text-[#D48C2B] font-black text-xl mt-1 tracking-tighter">₹{p.price}</p>
                        <p className="text-[#2D1A12]/30 text-[10px] font-bold uppercase mt-1 tracking-widest">{p.id}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteProduct(p.id)} 
                      className="w-full flex items-center justify-center gap-2 border-2 border-red-50 text-red-400 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95"
                    >
                      <Trash2 className="w-4 h-4" /> Remove Item
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
