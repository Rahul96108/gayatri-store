import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Package, ShoppingBag, Clock, CheckCircle, 
  Trash2, ExternalLink, Mail, Phone, MapPin, 
  RefreshCw, Plus, Edit3, X, UploadCloud, Search
} from 'lucide-react';

// --- DATABASE CONFIGURATION ---
const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function AdminPanel() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newP, setNewP] = useState({ name: '', price: '', image: '', description: '' });
  const [uploading, setUploading] = useState(false);

  // --- DATA FETCHING ---
  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

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

  // --- INVENTORY LOGIC ---
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      setNewP({ ...newP, image: data.publicUrl });
      alert("Image uploaded successfully!");
    } catch (error: any) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newP.image || !newP.name || !newP.price) return alert("Please fill name, price, and upload an image!");

    const payload = {
      name: newP.name,
      price: Number(newP.price),
      image: newP.image,
      description: newP.description
    };

    if (isEditing && editingId) {
      const { error } = await supabase.from('products').update(payload).eq('id', editingId);
      if (!error) {
        alert("Product updated!");
        cancelEdit();
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from('products').insert([{ 
        ...payload, 
        id: newP.name.toLowerCase().replace(/\s+/g, '-') 
      }]);
      if (!error) {
        alert("New snack added!");
        setNewP({ name: '', price: '', image: '', description: '' });
        fetchProducts();
      }
    }
  }

  const deleteProduct = async (id: string) => {
    if (window.confirm("Delete this snack?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  };

  const startEdit = (p: any) => {
    setIsEditing(true);
    setEditingId(p.id);
    setNewP({ name: p.name, price: p.price.toString(), image: p.image, description: p.description || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewP({ name: '', price: '', image: '', description: '' });
  };

  // --- ORDER LOGIC ---
  const updateOrderStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) fetchOrders();
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B]">
      
      {/* HEADER NAV */}
      <nav className="bg-[#8B2312] text-white px-8 py-6 flex flex-col md:flex-row justify-between items-center border-b-4 border-[#D48C2B] sticky top-0 z-50 gap-4">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Gayatri Control</h1>
        <div className="flex bg-black/20 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`px-8 py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2 ${activeTab === 'inventory' ? 'bg-[#D48C2B] text-[#2D1A12]' : 'hover:bg-white/10'}`}
          >
            <Package size={14}/> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`px-8 py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-[#D48C2B] text-[#2D1A12]' : 'hover:bg-white/10'}`}
          >
            <ShoppingBag size={14}/> Orders
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        
        {/* INVENTORY VIEW */}
        {activeTab === 'inventory' && (
          <div className="space-y-12">
            
            {/* ADD/EDIT FORM */}
            <section className="bg-white border-4 border-[#8B2312] p-8 md:p-12 rounded-[3.5rem] shadow-xl">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-4xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-none">
                  {isEditing ? 'Edit' : 'Add New'} <br/> <span className="text-[#D48C2B]">Snack</span>
                </h3>
                {isEditing && (
                  <button onClick={cancelEdit} className="p-3 bg-gray-100 rounded-full hover:bg-red-100 transition-colors"><X/></button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <input placeholder="Product Name" value={newP.name} className="w-full bg-[#F5F1E6] p-5 rounded-2xl outline-none border-2 border-transparent focus:border-[#D48C2B] font-bold" onChange={e => setNewP({...newP, name: e.target.value})} />
                  <input placeholder="Price (₹)" type="number" value={newP.price} className="w-full bg-[#F5F1E6] p-5 rounded-2xl outline-none border-2 border-transparent focus:border-[#D48C2B] font-bold" onChange={e => setNewP({...newP, price: e.target.value})} />
                  <textarea placeholder="Description (Optional)" value={newP.description} rows={3} className="w-full bg-[#F5F1E6] p-5 rounded-2xl outline-none border-2 border-transparent focus:border-[#D48C2B] font-bold resize-none" onChange={e => setNewP({...newP, description: e.target.value})} />
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="border-4 border-dashed border-[#2D1A12]/10 rounded-3xl p-10 flex flex-col items-center justify-center bg-[#F5F1E6]/30 group hover:border-[#D48C2B] transition-all relative">
                    {newP.image ? (
                      <img src={newP.image} className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40" alt="preview" />
                    ) : null}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer relative z-10 flex flex-col items-center gap-3">
                      {uploading ? <RefreshCw className="animate-spin text-[#8B2312]" size={32} /> : <UploadCloud className="text-[#D48C2B]" size={32} />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{newP.image ? "Change Photo" : "Upload Photo"}</span>
                    </label>
                  </div>
                  <button type="submit" className="w-full bg-[#8B2312] text-white py-6 rounded-full font-black italic uppercase shadow-lg hover:bg-[#2D1A12] transition-all">
                    {isEditing ? 'Update Snack' : 'Make Item Live'}
                  </button>
                </div>
              </form>
            </section>

            {/* INVENTORY LIST */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <h2 className="text-5xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">Current <br/> <span className="text-[#D48C2B]">Stock</span></h2>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18}/>
                  <input placeholder="Search Pantry..." className="w-full bg-white border-2 border-[#2D1A12] p-4 pl-12 rounded-full outline-none" onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="bg-white border-2 border-[#2D1A12] rounded-[3rem] p-6 flex flex-col hover:shadow-2xl transition-all group">
                    <img src={p.image} className="aspect-square rounded-[2.2rem] overflow-hidden mb-6 object-cover" alt="" />
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-2xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4>
                      <span className="text-lg font-bold text-[#D48C2B]">₹{p.price}</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-40 mb-6 line-clamp-2">{p.description || "No description."}</p>
                    <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-black/5">
                      <button onClick={() => startEdit(p)} className="bg-[#F5F1E6] py-3 rounded-full text-[9px] font-black uppercase flex items-center justify-center gap-2 hover:bg-[#D48C2B] transition-colors"><Edit3 size={12}/> Edit</button>
                      <button onClick={() => deleteProduct(p.id)} className="bg-red-50 text-red-600 py-3 rounded-full text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={12}/> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS VIEW */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-6xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">Live <br/> <span className="text-[#D48C2B]">Requests</span></h2>
              <button onClick={fetchOrders} className="p-4 bg-white border-2 border-[#2D1A12] rounded-full hover:bg-[#8B2312] hover:text-white transition-all"><RefreshCw size={20}/></button>
            </div>

            <div className="grid gap-6">
              {orders.map((o) => (
                <div key={o.id} className="bg-white border-2 border-[#2D1A12] rounded-[3rem] p-8 flex flex-col lg:flex-row justify-between gap-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#8B2312] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase italic">{o.order_id}</span>
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-[#F5F1E6] text-[#D48C2B]'}`}>{o.status}</span>
                    </div>
                    <h3 className="text-4xl font-black italic uppercase text-[#8B2312] leading-none tracking-tighter">{o.customer_name}</h3>
                    <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase opacity-60">
                       <span className="flex items-center gap-2"><Phone size={14}/> {o.customer_phone}</span>
                       <span className="flex items-center gap-2"><Mail size={14}/> {o.customer_email}</span>
                       <span className="flex items-center gap-2 text-[#8B2312] w-full"><MapPin size={14}/> {o.address_line}, {o.pincode}</span>
                    </div>
                  </div>
                  <div className="lg:w-[400px] bg-[#F5F1E6] rounded-[2rem] p-6 flex flex-col">
                    <p className="text-[10px] font-black uppercase opacity-30 mb-4 tracking-widest italic">Basket</p>
                    <p className="font-bold italic text-sm text-[#2D1A12] leading-relaxed mb-6 whitespace-pre-line">{o.items}</p>
                    <div className="mt-auto pt-4 border-t border-black/5 flex justify-between items-center">
                      <span className="text-3xl font-black italic text-[#8B2312]">₹{o.total}</span>
                      <div className="flex gap-2">
                         {o.status !== 'completed' && (
                           <button onClick={() => updateOrderStatus(o.id, 'completed')} className="bg-[#8B2312] text-white p-4 rounded-full hover:scale-110 transition-transform"><CheckCircle size={20}/></button>
                         )}
                         <button className="bg-[#2D1A12] text-white p-4 rounded-full"><ExternalLink size={20}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-center py-40 font-black uppercase opacity-20 italic">Awaiting your first sale...</p>}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
