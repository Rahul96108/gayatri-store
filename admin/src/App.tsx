import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Package, ShoppingBag, Clock, CheckCircle, 
  Trash2, ExternalLink, Mail, Phone, MapPin 
} from 'lucide-react';

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- NEW: FETCH ORDERS LOGIC ---
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false }); // Latest orders first
    
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) fetchOrders();
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans">
      {/* NAVIGATION HEADER */}
      <nav className="bg-[#8B2312] text-white px-8 py-6 flex justify-between items-center border-b-4 border-[#D48C2B] sticky top-0 z-50">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Gayatri Control</h1>
        <div className="flex bg-black/20 p-1 rounded-full">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${activeTab === 'orders' ? 'bg-[#D48C2B] text-[#2D1A12]' : 'hover:bg-white/10'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${activeTab === 'inventory' ? 'bg-[#D48C2B] text-[#2D1A12]' : 'hover:bg-white/10'}`}
          >
            Inventory
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        {activeTab === 'orders' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-5xl font-black italic uppercase text-[#8B2312]">Incoming <br/> Requests</h2>
              <button onClick={fetchOrders} className="text-[10px] font-black uppercase border-2 border-[#2D1A12] px-4 py-2 rounded-full hover:bg-[#2D1A12] hover:text-white transition-all">Refresh List</button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20 opacity-20"><Clock className="animate-spin" /></div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border-2 border-[#2D1A12] rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      {/* Customer Info */}
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#D48C2B] text-[#2D1A12] text-[10px] font-black px-3 py-1 rounded-full uppercase">
                            {order.order_id}
                          </span>
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black italic uppercase text-[#8B2312] leading-none">{order.customer_name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] font-black uppercase opacity-60">
                          <p className="flex items-center gap-2"><Phone size={14}/> {order.customer_phone}</p>
                          <p className="flex items-center gap-2"><Mail size={14}/> {order.customer_email}</p>
                          <p className="flex items-center gap-2 md:col-span-2"><MapPin size={14}/> {order.address_line}, {order.pincode}</p>
                        </div>
                      </div>

                      {/* Order Items & Actions */}
                      <div className="lg:w-96 bg-[#F5F1E6] rounded-3xl p-6 border border-[#2D1A12]/5">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">Items Ordered</p>
                        <p className="font-bold italic text-[#2D1A12] mb-6 whitespace-pre-wrap">{order.items}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-[#2D1A12]/10">
                          <span className="text-2xl font-black italic text-[#8B2312]">₹{order.total}</span>
                          <div className="flex gap-2">
                            {order.status !== 'completed' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                className="bg-[#8B2312] text-white p-3 rounded-full hover:scale-110 transition-transform"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={18} />
                              </button>
                            )}
                            <button className="bg-[#2D1A12] text-white p-3 rounded-full hover:scale-110 transition-transform">
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <p className="text-center py-20 font-black uppercase opacity-20 italic">No orders found.</p>}
              </div>
            )}
          </div>
        ) : (
          /* Inventory logic from your existing code would go here */
          <div className="py-20 text-center opacity-30 italic font-black uppercase">Inventory View Active</div>
        )}
      </main>
    </div>
  );
}
