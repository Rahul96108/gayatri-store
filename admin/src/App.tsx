import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, Package, Plus, Trash2, CheckCircle, Phone, MapPin, Loader2 } from 'lucide-react';

// Initialize Supabase (Get these from your Supabase Settings > API)
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('orders');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [newP, setNewP] = useState({ id: '', name: '', price: '', weight: '250g', category: 'Classic', image: '', description: '' });

  // FETCH DATA
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    const { data: p } = await supabase.from('products').select('*');
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (p) setProducts(p);
    if (o) setOrders(o);
    setLoading(false);
  }

  // ADD PRODUCT
  async function addProduct() {
    const { error } = await supabase.from('products').insert([newP]);
    if (!error) {
       fetchData();
       alert("Live Store Updated!");
    }
  }

  // DELETE PRODUCT
  async function deleteProduct(id: string) {
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#8B2312]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#121212] border-r border-white/5 p-8 flex flex-col gap-10">
        <h1 className="text-2xl font-black italic text-[#D48C2B] tracking-tighter uppercase">Gayatri <br/> <span className="text-white opacity-20 text-[10px] tracking-[0.5em] not-italic">Admin Hub</span></h1>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-[#8B2312]' : 'text-white/40 hover:bg-white/5'}`}><ShoppingBag className="w-5 h-5" /> Orders</button>
          <button onClick={() => setActiveTab('inventory')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-[#8B2312]' : 'text-white/40 hover:bg-white/5'}`}><Package className="w-5 h-5" /> Inventory</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-12 overflow-y-auto">
        {loading ? <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-[#D48C2B]" /></div> : (
          activeTab === 'orders' ? (
            <div className="space-y-8">
              <h2 className="text-5xl font-black italic uppercase">Live Feed</h2>
              <div className="grid gap-6">
                {orders.map((o) => (
                  <div key={o.id} className="bg-[#121212] border border-white/5 rounded-[2.5rem] p-8 flex justify-between items-center group hover:border-[#8B2312]">
                    <div className="space-y-3">
                      <div className="flex gap-3 items-center">
                         <span className="bg-[#8B2312] px-3 py-1 rounded-full text-[10px] font-black italic">ORDER #{o.id}</span>
                         <span className="text-white/20 text-[10px] uppercase font-bold">{new Date(o.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-3xl font-black italic uppercase">{o.customer_name}</h3>
                      <div className="flex gap-6 text-sm text-white/40 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Phone className="w-4 h-4"/> {o.phone}</span>
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {o.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-[#D48C2B]">₹{o.total}</p>
                      <button className="mt-4 bg-white/5 hover:bg-green-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all">Process</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <h2 className="text-5xl font-black italic uppercase">Inventory</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* ADD FORM */}
                <div className="bg-[#121212] p-10 rounded-[3rem] border border-white/10 h-fit space-y-4">
                  <h3 className="text-[#D48C2B] font-black italic text-xl uppercase mb-6">Add New Snack</h3>
                  <input placeholder="Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setNewP({...newP, name: e.target.value})} />
                  <input placeholder="Price" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setNewP({...newP, price: e.target.value})} />
                  <input placeholder="Image URL" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" onChange={e => setNewP({...newP, image: e.target.value})} />
                  <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none h-24" onChange={e => setNewP({...newP, description: e.target.value})} />
                  <button onClick={addProduct} className="w-full bg-[#8B2312] py-5 rounded-full font-black italic uppercase hover:bg-[#D48C2B] transition-all">Publish to Store</button>
                </div>
                
                {/* PRODUCT LIST */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map(p => (
                    <div key={p.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <img src={p.image} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-black italic uppercase leading-none">{p.name}</h4>
                          <p className="text-[#D48C2B] font-bold">₹{p.price}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteProduct(p.id)} className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
