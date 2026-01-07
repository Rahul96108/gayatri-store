import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const phoneNumber = "91XXXXXXXXXX"; // REPLACE with your 12-digit number (including 91)
    const message = `Namaste Gayatri Namkeen! I would like to order ${product.name} (${product.price}). Please let me know the next steps.`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  if (!product) return <div>Product Not Found</div>;

  return (
    // ... existing layout code ...
    <button 
      onClick={handleWhatsAppOrder}
      className="w-full bg-brand-red text-white py-5 rounded-full text-2xl font-black italic shadow-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-4"
    >
      <ShoppingCart /> Order on WhatsApp
    </button>
  );
}
