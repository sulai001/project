import React from "react";
import { Link } from "react-router-dom";

const FavoritesSidebar = ({ open, onClose, favoriteItems = [], onRemoveFromFavorites }) => (
  <>
    {/* Overlay */}
    {open && (
      <div
        className="fixed inset-0 bg-opacity-30 z-40"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
    )}
    {/* Sidebar */}
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-2xl transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="h-full flex flex-col">
        <div className="p-8 border-b">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Favorites ({favoriteItems.length})</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {favoriteItems.length === 0 ? (
            <div className="text-center text-gray-500">No favorites yet.</div>
          ) : (
            favoriteItems.map((item) => (
              <div className="flex items-start gap-8 pb-8 border-b" key={item._id}>
                <Link to={`/shop/${item._id}`} onClick={onClose}>
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0].url
                        : "https://via.placeholder.com/300x400"
                    }
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded hover:shadow-lg transition"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/shop/${item._id}`} onClick={onClose} className="hover:underline text-gray-900">
                    <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                  </Link>
                  <p className="font-medium">${item.price}</p>
                </div>
                <div className="text-right">
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => onRemoveFromFavorites(item._id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </>
);

export default FavoritesSidebar;