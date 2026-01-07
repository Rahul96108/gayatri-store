import { ShoppingCart, Search, Star } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="text-3xl font-black tracking-tighter text-brand-red">GAYATRI</div>
        <div className="hidden md:flex gap-8 font-semibold text-lg">
          <a href="#" className="hover:text-brand-red">Collections</a>
          <a href="#" className="hover:text-brand-red">The Process</a>
          <a href="#" className="hover:text-brand-red">Bulk Orders</a>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <div className="bg-brand-red p-2 rounded-full text-white cursor-pointer relative">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}

      <Link 
  to="/catalog" 
  className="bg-brand-red text-white px-8 py-4 rounded-full text-xl font-bold italic shadow-xl hover:bg-brand-dark transition-all inline-block"
>
  Shop The Classics
</Link>
      <section className="max-w-7xl mx-auto px-10 py-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-7xl font-black italic leading-tight text-brand-red">
            CRUNCH <br />
            <span className="text-brand-accent">BEYOND</span> <br />
            WORDS.
          </h1>
          <div className="flex gap-4">
            <div className="w-1.5 bg-brand-accent self-stretch"></div>
            <p className="text-xl max-w-sm text-gray-700 font-medium">
              Handcrafted in small batches using 100% pure groundnut oil and the finest hand-picked spices. No compromises, just pure Gayatri quality.
            </p>
          </div>
          <button className="bg-brand-red text-white px-8 py-4 rounded-full text-xl font-bold italic shadow-xl hover:bg-brand-dark transition-all">
            Shop The Classics
          </button>
        </div>

        {/* Circular Hero Image with Glow */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-brand-accent/30 rounded-full blur-3xl scale-110"></div>
          <div className="relative w-[500px] h-[500px] rounded-full border-[15px] border-brand-accent/20 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1601050638917-3f3095c2d5d7?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Sev" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Slanted USP Ribbon */}
      <div className="bg-brand-red py-4 -rotate-2 scale-105 shadow-2xl mt-10 overflow-hidden border-y-2 border-brand-accent/50">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-white font-bold text-xl uppercase italic">
          <USPItem text="100% Pure Groundnut Oil" />
          <USPItem text="Hand-Pounded Spices" />
          <USPItem text="No Artificial Colors" />
          <USPItem text="Small Batch Production" />
          <USPItem text="100% Pure Groundnut Oil" />
          <USPItem text="Hand-Pounded Spices" />
        </div>
      </div>

      {/* Grid Section Preview */}
      <section className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard title="The Iconic Sev" />
        <CategoryCard title="Chivda Mix" />
        <CategoryCard title="Festive Gift Boxes" highlight />
      </section>
    </div>
  );
}

function USPItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Star className="fill-brand-accent text-brand-accent w-5 h-5" /> {text}
    </span>
  );
}

function CategoryCard({ title, highlight }: { title: string, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-lg border-2 border-brand-dark h-64 flex flex-col justify-between ${highlight ? 'bg-brand-red text-white' : 'bg-white'}`}>
      <h3 className="text-3xl font-black italic">{title}</h3>
      <a href="#" className="font-bold border-b-2 border-current w-fit">Browse All</a>
    </div>
  );
}
