import { ShoppingCart, Star } from 'lucide-react';

const products = [
  { id: 1, name: "Special Ratlami Sev", price: "₹180", desc: "Classic spicy gram flour noodles" },
  { id: 2, name: "Premium Mix Namkeen", price: "₹220", desc: "Hand-pounded spices & dry fruits" }
];

export default function App() {
  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <nav className="bg-red-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold tracking-tight">GAYATRI NAMKEEN</h1>
        <ShoppingCart className="w-6 h-6" />
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-red-800">Authentic Taste of India</h2>
          <p className="text-gray-600 mt-2">Pure Groundnut Oil | No Preservatives</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-red-600 hover:scale-105 transition-transform">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <span className="bg-yellow-400 text-red-900 px-3 py-1 rounded-full font-bold">{product.price}</span>
              </div>
              <p className="text-gray-500 mt-2 italic">{product.desc}</p>
              <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 flex items-center justify-center gap-2">
                Order via WhatsApp
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
