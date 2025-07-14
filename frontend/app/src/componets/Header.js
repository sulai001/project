import React from 'react'
import { Link } from 'react-router-dom'

function  Header({ onCartClick, onFavoritesClick, cartCount = 0, favoritesCount = 0 }) {
  return (
    <div>
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-3xl font-['Pacifico'] text-gray-800">logo</Link>
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/Shop", label: "Shop" },
              // { to: "/About", label: "About" },
              { to: "/Orders", label: "Orders" },
              // { to: "/offers/products", label: "Offers" },
              // { to: "/Contect", label: "Contect" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-800 font-medium relative group"
              >
                {item.label}
                <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded"></span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4 relative">
            
            <div
              className="w-8 h-8 flex items-center justify-center cursor-pointer relative"
              id="favoritesBtn"
              onClick={onFavoritesClick}
            >
              <i className="ri-heart-line text-gray-700 ri-lg"></i>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {favoritesCount}
                </span>
              )}
            </div>
            <div
              className="w-8 h-8 flex items-center justify-center cursor-pointer relative"
              id="cartBtn"
              onClick={onCartClick}
            >
              <i className="ri-shopping-bag-line text-gray-700 ri-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </div>
            
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header;
