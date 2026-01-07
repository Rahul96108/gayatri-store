import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, 
  Plus, Trash2, CheckCircle, ExternalLink, Mail, Phone, MapPin 
} from 'lucide-react';

// --- THE ADMIN APP ---
export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]); // This will fetch from your backend
  const [products, setProducts] = useState<any[]>([]); // This will fetch from your database
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '', desc: '', pincode_restriction: '' });

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* 1. SIDEBAR */}
      <aside className="w-72 bg-[#121212] border-r border-white/5 p-8 flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-black italic text-[#D48C2B] tracking-tighter">GAYATRI <br/> <span className="text-white opacity-20 text-[10px] tracking-[0.5em] uppercase not-italic">Internal Admin</span></h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-[#8B2312] text-white shadow-lg' : 'text-white/40 hover:bg-white/5'}`}>
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
          <button onClick={() => setActiveTab('inventory')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-[#8B2312] text-white shadow-lg' : 'text-white/40 hover:bg-white/5'}`}>
            <Package className="w-5 h-5" /> Inventory
          </button>
        </nav>

        <div className="mt-auto p-6 bg-white/5 rounded-[2rem] border border-white/10 text-center">
          <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-2">Logged in as</p>
          <p className="text-sm font-bold">Store Owner</p>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-12 overflow-y-auto">
        {activeTab === 'orders' ? (
          <div className="space-y-10">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-black italic uppercase">Live Orders</h2>
                <p className="text-white/30 font-bold uppercase tracking-widest text-xs mt-2">Managing customer requests in real-time</p>
              </div>
              <div className="bg-[#D48C2B]/10 text-[#D48C2B] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-[#D48C2B]/20">
                {orders.length} New Orders
              </div>
            </header>

            {/* Orders Table */}
            <div className="grid gap-6">
              {orders.length === 0 ? (
                <div className="py-20 text-center bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] opacity-30">
                  <p className="text-xl font-black italic">No orders yet. They will appear here once customers checkout.</p>
                </div>
              ) : (
                orders.map((order, idx) => (
                  <div key={idx} className="bg-[#121212] border border-white/5 rounded-[2.5rem] p-8 hover:border-[#8B2312]/50 transition-all group">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#8B2312] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Order #{order.id || '102'}</span>
                          <span className="text-white/20 text-[10px] font-bold uppercase">{new Date().toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-3xl font-black uppercase italic">{order.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-white/50">
                           <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {order.phone}</span>
                           <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {order.email}</span>
                           <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {order.pincode}, {order.state}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-4xl font-black text-[#D48C2B]">₹{order.total}</p>
                        <button className="bg-white/5 hover:bg-green-600 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all">Mark Processed</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* 3. INVENTORY MANAGEMENT */
          <div className="space-y-12">
            <header>
              <h2 className="text-5xl font-black italic uppercase">Inventory Control</h2>
              <p className="text-white/30 font-bold uppercase tracking-widest text-xs mt-2">Add or remove products from the live storefront</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Add Product Form */}
              <div className="bg-[#121212] border border-white/10 p-10 rounded-[3rem] h-fit">
                <h3 className="text-2xl font-black italic mb-8 uppercase text-[#D48C2B]">New Product</h3>
                <div className="space-y-4">
                  <input placeholder="Product Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#8B2312]" />
                  <input placeholder="Price (₹)" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#8B2312]" />
                  <input placeholder="Image URL (from Unsplash/Storage)" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#8B2312]" />
                  <textarea placeholder="Description" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none h-32 focus:border-[#8B2312]" />
                  <button className="w-full bg-[#8B2312] py-5 rounded-full font-black italic uppercase shadow-xl hover:bg-[#D48C2B] transition-all">Upload to Store</button>
                </div>
              </div>

              {/* Live Inventory List */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Card for Admin */}
                {products.map((p, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col justify-between">
                    <div className="flex gap-4 mb-6">
                      <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                      <div>
                        <h4 className="font-black uppercase italic">{p.name}</h4>
                        <p className="text-[#D48C2B] font-bold">₹{p.price}</p>
                      </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-widest py-3 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all">
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
