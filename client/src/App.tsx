import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4 text-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-orange-600"></div>
      
      {/* Brand Logo / Name */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-800 tracking-tight">
          GAYATRI <span className="text-orange-600">NAMKEEN</span>
        </h1>
        <p className="text-orange-700 font-medium mt-2 text-lg">Taste of Tradition, coming to you</p>
      </header>

      {/* Main Content Card */}
      <main className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl w-full border border-orange-100">
        <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-6 uppercase tracking-wider">
          Under Development
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Something Delicious is Brewing!
        </h2>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          We are currently building a scalable experience to bring Bhilwara's finest snacks and namkeens directly to you. Our digital store is almost ready for its grand opening.
        </p>

        {/* Feature Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-2xl mb-2 block">🌶️</span>
            <p className="text-sm font-semibold text-gray-700">Authentic Flavors</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-2xl mb-2 block">📦</span>
            <p className="text-sm font-semibold text-gray-700">Online Order</p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div className="bg-orange-600 h-3 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Site Progress: 75% - Finalizing order workflows</p>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-orange-800/60">
        <p className="font-medium">© 2026 Gayatri Namkeen. All rights reserved.</p>
        <p className="text-sm mt-1">Bhilwara, Rajasthan, India</p>
      </footer>
    </div>
  );
};

export default ComingSoon;
