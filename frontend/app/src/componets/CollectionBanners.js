import React from "react";
import { Link } from "react-router-dom";

const CollectionBanners = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Women Collection */}
        <div className="md:col-span-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 group">
          <div className="flex h-[500px]">
            <div className="w-1/2 p-12 flex flex-col justify-center z-10">
              <div className="relative inline-flex mb-6">
                <span className="absolute -left-4 w-2 h-2 rounded-full bg-primary top-1/2 -translate-y-1/2"></span>
                <h3 className="text-xl font-medium text-primary pl-2">The Fall Collection</h3>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Latest Collection<br />for Women
              </h2>
              <Link to="/shop">
                <button className="bg-primary text-white px-4 py-3 font-medium !rounded-button hover:bg-gray-900 transition whitespace-nowrap inline-flex items-center group-hover:gap-4 gap-2 w-1/2">
                  Shop Now
                  <i className="ri-arrow-right-line transition-all"></i>
                </button>
              </Link>
            </div>
            <div className="w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-rose-50/50"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20of%20a%20female%20model%20wearing%20a%20casual%20flowy%20midi%20dress%20in%20soft%20pastel%20color%2C%20relaxed%20and%20comfortable%20style%2C%20natural%20pose%20showing%20the%20dress%20movement%2C%20neutral%20background%20with%20subtle%20pink%20tones%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20dreamy%20lighting%2C%20modern%20lifestyle%20fashion%20editorial%20style%2C%20full%20body%20shot&width=800&height=1000&seq=22&orientation=portrait"
                alt="Women Collection"
                className="h-full w-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
        {/* Men & Kids Collection Container */}
        <div className="md:col-span-4 grid grid-cols-1 gap-8">
          {/* Men Collection */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 group">
            <div className="p-8">
              <div className="relative inline-flex mb-4">
                <span className="absolute -left-4 w-2 h-2 rounded-full bg-primary top-1/2 -translate-y-1/2"></span>
                <h3 className="text-base font-medium text-primary pl-2">Men's Collection</h3>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Our<br />Men's Style
              </h2>
              <Link to="/shop">
                <button className="bg-primary text-white px-6 py-2 font-medium !rounded-button hover:bg-gray-900 transition whitespace-nowrap inline-flex items-center group-hover:gap-3 gap-2">
                  Shop Now
                  <i className="ri-arrow-right-line transition-all"></i>
                </button>
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 w-48 h-full overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20of%20a%20male%20model%20wearing%20a%20casual%20light%20beige%20cotton%20sweater%20with%20relaxed%20fit%20khaki%20pants%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20modern%20casual%20lifestyle%20catalog%20style%2C%20upper%20body%20portrait%20shot&width=400&height=400&seq=20&orientation=squarish"
                alt="Men Collection"
                className="w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>
          {/* Kids Collection */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 group">
            <div className="p-8">
              <div className="relative inline-flex mb-4">
                <span className="absolute -left-4 w-2 h-2 rounded-full bg-primary top-1/2 -translate-y-1/2"></span>
                <h3 className="text-base font-medium text-primary pl-2">Kids' Collection</h3>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                Playful Style<br />for Kids
              </h2>
              <Link to="/shop">
                <button className="bg-primary text-white px-6 py-2 font-medium !rounded-button hover:bg-gray-900 transition whitespace-nowrap inline-flex items-center group-hover:gap-3 gap-2">
                  Shop Now
                  <i className="ri-arrow-right-line transition-all"></i>
                </button>
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 w-48 h-full overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20of%20a%20cheerful%20child%20model%20wearing%20bright%20colorful%20casual%20clothing%2C%20soft%20muted%20sage%20green%20background%20with%20high%20gray%20value%20and%20low%20saturation%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20upper%20body%20portrait%20shot&width=400&height=400&seq=23&orientation=squarish"
                alt="Kids Collection"
                className="w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CollectionBanners;