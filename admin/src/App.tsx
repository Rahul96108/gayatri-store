import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, Package, Trash2, Phone, MapPin, Loader2, Upload, CheckCircle } from 'lucide-react';
import './index.css'; 

const supabase = createClient(
  'https://iuwxqmpiogsgstzyanor.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1d3hxbXBpb2dzZ3N0enlhbm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDI5NTYsImV4cCI6MjA4MzQxODk1Nn0.IPmYcd8nh3BygAbTrVnP69qeQ15SY1M76ghqrxaENjA'
);

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [newP, setNewP] = useState({ name: '', price: '', image: '' });

  useEffect(() => { fetchData(); }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    const { data: p } = await supabase.from('products').select('*');
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (p) setProducts(p);
    if (o) setOrders(o);
    setLoading(false);
  }

  // --- NEW: IMAGE UPLOAD LOGIC ---
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the Public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setNewP({ ...newP, image: data.publicUrl });
      alert("Image uploaded successfully!");
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newP.image) return alert("Please upload an image first!");
    
    const { error } = await supabase.from('products').insert([{ 
      name: newP.name, 
      price: Number(newP.price), 
      image: newP.image,
      id: newP.name.toLowerCase().replace(/\s+/g, '-') 
    }]);
    
    if (!error) {
      fetchData();
      setNewP({ name: '', price: '', image: '' });
      alert("Product Live!");
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12]">
      <nav className="bg-[#8B2312] text-white px-12 py-6 flex justify-between items-center border-b-4 border-[#D48C2B]">
        <h1 className="text-2xl font-black italic uppercase">Gayatri Control</h1>
        <div className="flex bg-black/20 p-1 rounded-full">
          <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase ${activeTab === 'orders' ? 'bg-[#D48C2B]' : 'opacity-50'}`}>Orders</button>
          <button onClick={() => setActiveTab('inventory')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase ${activeTab === 'inventory' ? 'bg-[#D48C2B]' : 'opacity-50'}`}>Inventory</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-12">
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* FORM WITH UPLOAD BUTTON */}
            <form onSubmit={addProduct} className="bg-[#2D1A12] p-10 rounded-[3.5rem] text-white space-y-6 h-fit sticky top-32 border-b-[10px] border-[#D48C2B]">
              <h3 className="text-[#D48C2B] font-black italic text-3xl uppercase">Add Item</h3>
              
              <div className="space-y-4">
                <input required placeholder="SNACK NAME" className="w-full bg-white/5 p-4 rounded-2xl outline-none border border-white/10" value={newP.name} onChange={e => setNewP({...newP, name: e.target.value})} />
                <input required placeholder="PRICE (₹)" className="w-full bg-white/5 p-4 rounded-2xl outline-none border border-white/10" value={newP.price} onChange={e => setNewP({...newP, price: e.target.value})} />
                
                {/* UPLOAD BUTTON */}
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-[#D48C2B] transition-colors">
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  {uploading ? (
                    <Loader2 className="animate-spin mx-auto text-[#D48C2B]" />
                  ) : newP.image ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="text-green-400 w-8 h-8" />
                      <span className="text-[10px] font-bold uppercase text-green-400">Ready to post</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-[#D48C2B] w-8 h-8" />
                      <span className="text-[10px] font-bold uppercase opacity-40">Click to Upload Image</span>
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-[#D48C2B] text-[#2D1A12] py-5 rounded-full font-black italic uppercase shadow-xl hover:bg-white transition-all">
                  Publish Snack
                </button>
              </div>
            </form>

            <div className="lg:col-span-2 grid grid-cols-2 gap-8">
              {products.map(p => (
                <div key={p.id} className="bg-white border-2 border-[#2D1A12] p-6 rounded-[2.5rem] flex items-center gap-6">
                  <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-black italic uppercase text-[#8B2312]">{p.name}</h4>
                    <p className="text-[#D48C2B] font-black">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
