const Checkout = ({ cart, removeFromCart }: { cart: any[], removeFromCart: any }) => {
  const [form, setForm] = useState({ 
    name: '', phone: '', email: '', address: '', pincode: '', state: '' 
  });
  const [orderStatus, setOrderStatus] = useState<{success: boolean, id?: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  // ACTION 1: OFFICIAL BACKEND ORDER
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: cart, total }),
      });
      const data = await response.json();
      if (data.success) {
        setOrderStatus({ success: true, id: data.orderId });
      }
    } catch (error) {
      alert("Order failed. Please try WhatsApp ordering.");
    } finally {
      setLoading(false);
    }
  };

  // ACTION 2: WHATSAPP ORDER
  const handleWhatsAppOrder = () => {
    const orderDetails = cart.map(item => `- ${item.product.name} (${item.qty}x)`).join('%0A');
    const message = `*WHATSAPP ORDER*%0A*Name:* ${form.name}%0A*Address:* ${form.address}, ${form.pincode}%0A*Items:*%0A${orderDetails}%0A*Total:* ₹${total}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (orderStatus?.success) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center space-y-6">
      <div className="bg-green-100 p-8 rounded-full"><CheckCircle className="w-16 h-16 text-green-600" /></div>
      <h2 className="text-4xl font-black italic text-[#8B2312]">ORDER PLACED!</h2>
      <p className="text-xl font-bold text-[#2D1A12]">Your Order ID: <span className="text-[#D48C2B]">#{orderStatus.id}</span></p>
      <p className="text-gray-600">A confirmation email has been sent to {form.email}.</p>
      <Link to="/" className="bg-[#8B2312] text-white px-10 py-4 rounded-full font-bold">CONTINUE SHOPPING</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-8">
        <h2 className="text-5xl font-black italic text-[#8B2312] uppercase tracking-tighter">Summary</h2>
        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-[#2D1A12] shadow-xl">
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between items-center py-4 border-b last:border-0">
              <div className="flex items-center gap-4">
                <img src={item.product.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                <div>
                  <p className="font-bold text-sm uppercase">{item.product.name}</p>
                  <p className="text-[#D48C2B] font-bold">₹{item.product.price} x {item.qty}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
          <div className="mt-8 pt-6 border-t-4 border-[#8B2312] flex justify-between items-center text-3xl font-black italic text-[#8B2312]">
            <span>TOTAL</span><span>₹{total}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="bg-[#2D1A12] text-white rounded-[2.5rem] p-10 space-y-4">
        <h2 className="text-3xl font-black uppercase tracking-widest text-[#D48C2B] mb-4 italic text-center">Checkout</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="NAME" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
          <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="PHONE" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
        </div>
        
        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
        
        <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="FULL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none h-24 focus:border-[#D48C2B]" />
        
        <div className="grid grid-cols-2 gap-4">
          <input required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} placeholder="PINCODE" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
          <input required value={form.state} onChange={e => setForm({...form, state: e.target.value})} placeholder="STATE" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-[#D48C2B]" />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button type="submit" disabled={loading} className="w-full bg-[#D48C2B] text-[#2D1A12] py-5 rounded-full text-xl font-black italic uppercase hover:bg-white transition-all">
            {loading ? 'Processing...' : 'Place Official Order'}
          </button>
          
          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-[10px] font-black opacity-30 tracking-[0.3em]">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <button type="button" onClick={handleWhatsAppOrder} className="w-full border-2 border-[#25D366] text-[#25D366] py-4 rounded-full text-lg font-black italic uppercase hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-3">
            Quick Order on WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};
