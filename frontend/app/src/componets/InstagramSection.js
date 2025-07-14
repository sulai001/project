import React from "react";

const InstagramSection = () => (
  <section className="py-16 bg-purple-50">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/3">
          <div className="sticky top-[60%] -translate-y-1/2">
            <h2 className="text-4xl font-bold mb-8">
              Follow our media for daily fashion inspiration and style updates
            </h2>
                        {/* // ...existing code... */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 font-medium !rounded-button hover:bg-gray-900 transition-all duration-300 whitespace-nowrap inline-flex items-center gap-2"
            >
              Follow Us
              <i className="ri-instagram-line"></i>
            </a>
            {/* // ...existing code... */}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {/* Instagram Post 1 */}
            <div className="relative overflow-hidden rounded-lg group break-inside-avoid">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20showing%20elegant%20full%20body%20outfit%20with%20model%20in%20natural%20pose%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20Instagram%20aesthetic&width=400&height=600&seq=16&orientation=portrait"
                alt="Instagram Post 1"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
            {/* Instagram Post 2 */}
            <div className="relative overflow-hidden rounded-lg group break-inside-avoid">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20showing%20stylish%20accessories%20and%20jewelry%20details%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20Instagram%20aesthetic&width=400&height=300&seq=17&orientation=landscape"
                alt="Instagram Post 2"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
            {/* Instagram Post 3 */}
            <div className="relative overflow-hidden rounded-lg group break-inside-avoid">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20showing%20elegant%20outfit%20details%20and%20textures%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20Instagram%20aesthetic&width=400&height=500&seq=18&orientation=portrait"
                alt="Instagram Post 3"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
            {/* Instagram Post 4 */}
            <div className="relative overflow-hidden rounded-lg group break-inside-avoid">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20showing%20full%20body%20casual%20chic%20outfit%20with%20model%20in%20natural%20pose%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20Instagram%20aesthetic&width=400&height=300&seq=19&orientation=landscape"
                alt="Instagram Post 4"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
            {/* Instagram Post 5 */}
            <div className="relative overflow-hidden rounded-lg group break-inside-avoid">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20showing%20elegant%20outfit%20styling%20and%20accessories%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20Instagram%20aesthetic&width=400&height=600&seq=20&orientation=portrait"
                alt="Instagram Post 5"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
            {/* Instagram Post 6 */}
            <div className="relative overflow-hidden rounded-lg group break-inside-avoid">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20showing%20trendy%20casual%20outfit%20with%20model%20in%20natural%20pose%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style%2C%20Instagram%20aesthetic&width=400&height=400&seq=21&orientation=squarish"
                alt="Instagram Post 6"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <i className="ri-instagram-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InstagramSection;