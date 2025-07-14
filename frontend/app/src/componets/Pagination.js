import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Pagination = ({ currentPage = 1, totalPages = 8 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page) => {
    const path = location.pathname;
    navigate(`${path}?page=${page}`);
  };

  const getPages = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 bg-white p-4 rounded-lg shadow-sm">
      <div className="text-sm text-gray-500 mb-4 md:mb-0">
        Showing {(currentPage - 1) * 16 + 1}–{Math.min(currentPage * 16, 124)} of 124 products
      </div>
      <div className="flex items-center">
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-button border border-gray-200 text-gray-500 hover:border-primary hover:text-primary mr-2"
          disabled={currentPage === 1}
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        {pages.map((pg, i) =>
          typeof pg === "number" ? (
            <button
              key={i}
              onClick={() => handlePageChange(pg)}
              className={`w-10 h-10 flex items-center justify-center rounded-button border mr-2 ${
                pg === currentPage
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
              }`}
            >
              {pg}
            </button>
          ) : (
            <span key={i} className="mx-2 text-gray-500">...</span>
          )
        )}
        <button
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-button border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
          disabled={currentPage === totalPages}
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
