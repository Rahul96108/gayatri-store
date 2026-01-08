import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, Package, Plus, Trash2, CheckCircle, Phone, MapPin, Loader2, ArrowRight } from 'lucide-react';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('orders');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [newP, setNewP] = useState({ id: '', name: '', price: '', weight: '250g', category: 'Classic', image: '', description: '' });

  useEffect(() => { fetchData(); }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    const { data: p } = await supabase.from('products').select('*');
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (p) setProducts(p);
    if (o) setOrders(o);
    setLoading(false);
  }

  async function addProduct() {
    const { error } = await supabase.from('products').insert([{ ...newP, price: Number(newP.price) }]);
    if (!error) { fetchData(); alert("Storefront Updated!"); }
  }

  async function deleteProduct(id: string) {
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  }

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans">
      {/* 1. TOP BRANDED NAVIGATION */}
      <nav className="bg-[#8B2312] text-white px-8 py-6 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-full">
             <img src="/favicon.png" className="w-8 h-8" alt="Logo" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">Gayatri Admin <span className="text-[#D48C2B] ml-2 font-normal not-italic text-sm opacity-60">| Internal Portal</span></h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-full font-black text-xs uppercase transition-all ${activeTab === 'orders' ? 'bg-[#D48C2B] text-white' : 'hover:bg-white/10'}`}>Orders</button>
          <button onClick={() => setActiveTab('inventory')} className={`px-6 py-2 rounded-full font-black text-xs uppercase transition-all ${activeTab === 'inventory' ? 'bg-[#D48C2B] text-white' : 'hover:bg-white/10'}`}>Inventory</button>
        </div>
      </nav>

      {/* 2. DASHBOARD BODY */}
      <main className="max-w-7xl mx-auto p-8 md:p-12">
        {loading ? (
          <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div>
        ) : activeTab === 'orders' ? (
          <div className="space-y-12">
            <h2 className="text-6xl font-black italic text-[#8B2312] uppercase tracking-tighter">Live Order Feed</h2>
            <div className="grid gap-6">
              {orders.map((o) => (
                <div key={o.id} className="bg-white border-2 border-[#2D1A12] rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-center shadow-lg hover:rotate-1 transition-transform">
                  <div className="space-y-3">
                    <span className="bg-[#D48C2B] text-white px-4 py-1 rounded-full text-[10px] font-black italic uppercase">Order #{o.id}</span>
                    <h3 className="text-4xl font-black italic uppercase text-[#8B2312] leading-none">{o.customer_name}</h3>
                    <div className="flex gap-4 text-sm font-bold text-[#2D1A12]/50 uppercase italic">
                      <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#D48C2B]"/> {o.phone}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#D48C2B]"/> {o.address}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-right mt-6 md:mt-0">
                    <p className="text-5xl font-black text-[#8B2312]">₹{o.total}</p>
                    <button className="mt-4 bg-[#8B2312] text-white px-8 py-3 rounded-full font-black text-xs uppercase hover:bg-[#2D1A12] transition-all">Mark as Packed</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <h2 className="text-6xl font-black italic text-[#8B2312] uppercase tracking-tighter">Inventory Control</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* BRANDED ADD FORM */}
              <div className="bg-[#2D1A12] text-white p-10 rounded-[3rem] shadow-2xl space-y-5 h-fit">
                <h3 className="text-[#D48C2B] font-black italic text-2xl uppercase mb-4 border-b border-white/10 pb-4">Add New Item</h3>
                <input placeholder="Item ID" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#D48C2B]" onChange={e => setNewP({...newP, id: e.target.value})} />
                <input placeholder="Snack Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#D48C2B]" onChange={e => setNewP({...newP, name: e.target.value})} />
                <input placeholder="Price (₹)" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#D48C2B]" onChange={e => setNewP({...newP, price: e.target.value})} />
                <input placeholder="Image URL" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#D48C2B]" onChange={e => setNewP({...newP, image: e.target.value})} />
                <button onClick={addProduct} className="w-full bg-[#D48C2B] text-[#2D1A12] py-5 rounded-full font-black italic uppercase hover:bg-white transition-all shadow-xl">Update Live Store</button>
              </div>

              {/* DYNAMIC PRODUCT LIST */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white border-2 border-[#2D1A12] p-6 rounded-[2.5rem] flex flex-col justify-between group overflow-hidden">
                    <div className="flex gap-6 items-center mb-6">
                      <img src={p.image} className="w-24 h-24 rounded-2xl object-cover border-2 border-[#8B2312]/10" alt="" />
                      <div>
                        <h4 className="text-xl font-black italic uppercase leading-tight text-[#8B2312]">{p.name}</h4>
                        <p className="text-[#D48C2B] font-black text-lg italic">₹{p.price}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteProduct(p.id)} className="w-full border-2 border-red-100 text-red-500 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">Remove from Sale</button>
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
