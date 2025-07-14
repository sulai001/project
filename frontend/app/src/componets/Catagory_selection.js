import React from 'react'
import { useNavigate } from 'react-router-dom';

function Catagory_selection() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div>
      {/* ...existing code... */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <div className="relative flex items-center justify-center mb-4">
              <div className="relative inline-flex items-center">
                <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="relative bg-white px-8">
                  <div className="relative">
                    <h2 className="text-lg text-primary font-medium tracking-wider uppercase">
                      Our Categories
                    </h2>
                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-4xl font-bold text-gray-900">Shop by Categories</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Women Category */}
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20portrait%20of%20a%20female%20model%20with%20long%20hair%20wearing%20a%20casual%20oversized%20knit%20sweater%20in%20cream%20color%20with%20relaxed%20fit%20jeans%2C%20pure%20white%20background%20with%20subtle%20gradient%20to%20soft%20lavender%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20natural%20lighting%2C%20modern%20casual%20lifestyle%20catalog%20style%2C%20high%20key%20lighting&width=400&height=500&seq=2&orientation=portrait"
                alt="Women's Fashion"
                className="w-full h-[400px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-0 w-full flex justify-center">
                <button
                  className="bg-white text-gray-900 px-12 py-3 font-medium !rounded-button shadow-lg whitespace-nowrap hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => handleCategoryClick('women')}
                >
                  Women
                </button>
              </div>
            </div>
            {/* Men Category */}
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20portrait%20of%20a%20male%20model%20wearing%20a%20casual%20denim%20jacket%20over%20a%20white%20t-shirt%20with%20relaxed%20fit%20khaki%20pants%2C%20pure%20white%20background%20with%20subtle%20gradient%20to%20light%20purple%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20natural%20lighting%2C%20modern%20casual%20lifestyle%20catalog%20style%2C%20high%20key%20lighting&width=400&height=500&seq=3&orientation=portrait"
                alt="Men's Fashion"
                className="w-full h-[400px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-0 w-full flex justify-center">
                <button
                  className="bg-white text-gray-900 px-12 py-3 font-medium !rounded-button shadow-lg whitespace-nowrap hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => handleCategoryClick('men')}
                >
                  Men
                </button>
              </div>
            </div>
            {/* Kids Category */}
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20portrait%20of%20a%20happy%20child%20model%20aged%207-8%20years%20wearing%20a%20casual%20striped%20t-shirt%20and%20comfortable%20denim%2C%20featuring%20a%20natural%20playful%20expression%2C%20pure%20white%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20natural%20lighting%2C%20modern%20casual%20kids%20lifestyle%20catalog%20style%2C%20high%20key%20lighting&width=400&height=500&seq=4&orientation=portrait"
                alt="Kids' Fashion"
                className="w-full h-[400px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-0 w-full flex justify-center">
                <button
                  className="bg-white text-gray-900 px-12 py-3 font-medium !rounded-button shadow-lg whitespace-nowrap hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => handleCategoryClick('kids')}
                >
                  Kids
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ...existing code... */}
    </div>
  )
}

export default Catagory_selection;
