import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Package, ShoppingBag, Clock, CheckCircle, 
  Trash2, ExternalLink, Mail, Phone, MapPin, RefreshCw, Plus, IndianRupee 
} from 'lucide-react';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH ORDERS DATA ---
  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  // --- FETCH INVENTORY DATA ---
  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('name');
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'inventory') fetchProducts();
  }, [activeTab]);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) fetchOrders();
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm("Delete this snack from the store?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B]">
      {/* GLOBAL ADMIN NAV */}
      <nav className="bg-[#8B2312] text-white px-8 py-6 flex justify-between items-center border-b-4 border-[#D48C2B] sticky top-0 z-50">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Gayatri Control</h1>
        <div className="flex bg-black/20 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`px-8 py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-[#D48C2B] text-[#2D1A12]' : 'hover:bg-white/10'}`}
          >
            <ShoppingBag size={14}/> Orders
          </button>
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`px-8 py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2 ${activeTab === 'inventory' ? 'bg-[#D48C2B] text-[#2D1A12]' : 'hover:bg-white/10'}`}
          >
            <Package size={14}/> Inventory
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-20">
            <RefreshCw className="animate-spin" size={40} />
            <p className="font-black uppercase text-xs tracking-widest">Syncing with Database...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- VIEW 1: ORDERS TAB --- */}
            {activeTab === 'orders' && (
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <h2 className="text-6xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">Live <br/> <span className="text-[#D48C2B]">Orders</span></h2>
                  <button onClick={fetchOrders} className="p-4 bg-white border-2 border-[#2D1A12] rounded-full hover:bg-[#8B2312] hover:text-white transition-all"><RefreshCw size={20}/></button>
                </div>
                <div className="grid gap-6">
                  {orders.map((o) => (
                    <div key={o.id} className="bg-white border-2 border-[#2D1A12] rounded-[3rem] p-8 flex flex-col lg:flex-row justify-between gap-8">
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#8B2312] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase italic">{o.order_id}</span>
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-[#F5F1E6] text-[#D48C2B]'}`}>{o.status}</span>
                        </div>
                        <h3 className="text-4xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">{o.customer_name}</h3>
                        <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase opacity-60">
                           <span className="flex items-center gap-2"><Phone size={14}/> {o.customer_phone}</span>
                           <span className="flex items-center gap-2 text-[#8B2312]"><MapPin size={14}/> {o.address_line}, {o.pincode}</span>
                        </div>
                      </div>
                      <div className="lg:w-[400px] bg-[#F5F1E6] rounded-[2rem] p-6 flex flex-col">
                        <p className="text-[10px] font-black uppercase opacity-30 mb-4 tracking-widest italic">Order Breakdown</p>
                        <p className="font-bold italic text-sm text-[#2D1A12] leading-relaxed mb-6">{o.items}</p>
                        <div className="mt-auto pt-4 border-t border-black/5 flex justify-between items-center">
                          <span className="text-3xl font-black italic text-[#8B2312]">₹{o.total}</span>
                          <div className="flex gap-2">
                             {o.status !== 'completed' && (
                               <button onClick={() => updateOrderStatus(o.id, 'completed')} className="bg-[#8B2312] text-white p-4 rounded-full hover:scale-110 transition-transform"><CheckCircle size={20}/></button>
                             )}
                             <button className="bg-[#2D1A12] text-white p-4 rounded-full"><Trash2 size={20}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- VIEW 2: INVENTORY TAB --- */}
            {activeTab === 'inventory' && (
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <h2 className="text-6xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">Stock <br/> <span className="text-[#D48C2B]">Control</span></h2>
                  <button onClick={fetchProducts} className="p-4 bg-white border-2 border-[#2D1A12] rounded-full hover:bg-[#8B2312] hover:text-white transition-all"><RefreshCw size={20}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white border-2 border-[#2D1A12] rounded-[3rem] p-6 flex flex-col group hover:shadow-2xl transition-all">
                      <div className="aspect-square rounded-[2.2rem] overflow-hidden mb-6 relative">
                         <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                         <div className="absolute top-4 right-4 bg-[#8B2312] text-white px-4 py-1 rounded-full font-black italic text-xs">₹{p.price}</div>
                      </div>
                      <h4 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none mb-2">{p.name}</h4>
                      <p className="text-[10px] font-bold uppercase opacity-40 mb-6 tracking-widest line-clamp-2">{p.description || "No description provided."}</p>
                      <button 
                        onClick={() => deleteProduct(p.id)} 
                        className="mt-auto flex items-center justify-center gap-2 w-full py-4 border-2 border-[#2D1A12]/10 rounded-full text-[10px] font-black uppercase hover:bg-red-500 hover:border-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14}/> Remove Snack
                      </button>
                    </div>
                  ))}
                  {/* Quick Add Placeholder */}
                  <div className="border-4 border-dashed border-[#2D1A12]/10 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                     <Plus size={40} className="mb-4" />
                     <span className="font-black italic uppercase text-lg">Add New <br/> Item Above</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
