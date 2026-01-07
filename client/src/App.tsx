const Footer = () => (
  <footer className="bg-[#2D1A12] text-[#F5F1E6] pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
      <div className="space-y-4">
        {/* Updated Logo Section */}
        <div className="flex flex-col">
          <h3 className="text-4xl font-black tracking-tighter text-[#D48C2B] leading-none">
            GAYATRI
          </h3>
          <span className="text-xs font-bold tracking-[0.35em] text-[#D48C2B] mt-1 opacity-90">
            NAMKEEN
          </span>
        </div>
        <p className="opacity-70 text-sm leading-relaxed mt-4">
          Pure groundnut oil. Pure spices. Pure Gayatri quality delivered to your doorstep.
        </p>
        <div className="flex gap-4 pt-2">
          <Instagram className="w-5 h-5 cursor-pointer hover:text-[#D48C2B] transition-colors" />
          <Facebook className="w-5 h-5 cursor-pointer hover:text-[#D48C2B] transition-colors" />
        </div>
      </div>

      {/* Explore Links */}
      <div>
        <h4 className="font-black italic text-lg mb-6 text-[#D48C2B]">Explore</h4>
        <ul className="space-y-3 opacity-70 text-sm font-medium">
          <li><Link to="/" className="hover:text-[#D48C2B] transition-colors">Home</Link></li>
          <li><Link to="/catalog" className="hover:text-[#D48C2B] transition-colors">Full Collection</Link></li>
          <li><a href="#" className="hover:text-[#D48C2B] transition-colors">Our Process</a></li>
          <li><a href="#" className="hover:text-[#D48C2B] transition-colors">Bulk Orders</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="font-black italic text-lg mb-6 text-[#D48C2B]">Get In Touch</h4>
        <ul className="space-y-4 opacity-70 text-sm font-medium">
          <li className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#D48C2B]" /> +91 96108 XXXXX
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#D48C2B] mt-0.5" /> 
            <span>Industrial Area, Phase II,<br />Rajasthan, India</span>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="font-black italic text-lg mb-6 text-[#D48C2B]">Stay Crunchy</h4>
        <p className="opacity-70 text-sm mb-4">Subscribe for new snack launches.</p>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-[#D48C2B] transition-all">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="bg-transparent pl-4 text-sm outline-none w-full placeholder:opacity-30" 
          />
          <button className="bg-[#D48C2B] text-[#2D1A12] px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
            Join
          </button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 text-[10px] tracking-[0.2em] uppercase font-bold">
      <p>© 2026 Gayatri Namkeen Store</p>
      <p>Made with ❤️ in Rajasthan</p>
    </div>
  </footer>
);
