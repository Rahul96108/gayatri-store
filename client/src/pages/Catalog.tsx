const CatalogView = ({ onBack, addToCart, cartCount, openCart }: any) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchAll() {
      // Fetches everything from your 'products' table, ordered by name
      const { data } = await supabase.from('products').select('*').order('name');
      if (data) setAllProducts(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-[#2D1A12] font-sans selection:bg-[#D48C2B]">
      
      {/* Persistent Navigation (Same as Home) */}
      <nav className="fixed top-0 left-0 w-full py-6 px-8 md:px-16 flex justify-between items-center z-[60] bg-[#F5F1E6]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
           <div className="w-10 h-10 rounded-full border border-[#8B2312]/20 flex items-center justify-center bg-white p-1 shadow-sm">
              <span className="text-[#8B2312] font-black text-[10px] uppercase">Gaya</span>
           </div>
           <span className="font-black text-xl tracking-tighter text-[#8B2312] uppercase">GAYATRI</span>
        </div>
        <button onClick={openCart} className="bg-[#8B2312] text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-110 transition-transform">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-bold">{cartCount}</span>
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-left">
        {/* Header Section matching Hero Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <button onClick={onBack} className="text-[#8B2312] font-black italic uppercase text-xs flex items-center gap-2 group">
              <Home size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Home
            </button>
            <h2 className="text-7xl md:text-8xl font-black italic uppercase text-[#8B2312] tracking-tighter leading-[0.85]">
              Full <br/> <span className="text-[#D48C2B]">Catalog</span>
            </h2>
          </div>
          
          <div className="w-full md:w-96 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Finding a specific crunch?</p>
            <input 
              type="text" 
              placeholder="SEARCH THE PANTRY..." 
              className="w-full bg-white border-2 border-[#2D1A12] p-5 rounded-2xl outline-none focus:border-[#D48C2B] font-bold uppercase text-xs tracking-widest shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-40"><Loader2 className="animate-spin text-[#8B2312] w-12 h-12" /></div>
        ) : (
          /* Auto-expanding Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((p) => (
              <div key={p.id} className="group border-2 border-[#2D1A12] p-6 rounded-[3rem] bg-white hover:shadow-2xl transition-all flex flex-col">
                <div className="aspect-square overflow-hidden rounded-[2rem] mb-6">
                  <img 
                    src={p.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={p.name} 
                  />
                </div>
                <div className="flex justify-between items-start mb-2 px-1">
                  <h4 className="text-2xl font-black italic uppercase text-[#8B2312] leading-none">{p.name}</h4>
                  <span className="text-lg font-bold text-[#D48C2B]">₹{p.price}</span>
                </div>
                <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest mb-6 px-1 line-clamp-2">
                  {p.description || "Authentic handmade recipe."}
                </p>
                <button 
                  onClick={() => addToCart(p)}
                  className="mt-auto bg-transparent border-2 border-[#2D1A12] py-4 rounded-full font-black italic uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-[#8B2312] hover:border-[#8B2312] hover:text-white transition-all"
                >
                  Add to Cart <Plus size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
