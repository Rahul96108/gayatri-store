import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home'; // Move your current Home code to this file

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
