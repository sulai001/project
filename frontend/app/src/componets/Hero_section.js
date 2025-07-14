import React from 'react'

function Hero_section() {
  return (
    <div>
      <section
        className="w-full relative overflow-hidden min-h-[85vh] flex items-center"
        style={{
            backgroundImage:
            "url('https://readdy.ai/api/search-image?query=Modern%20fashion%20lifestyle%20portrait%20of%20a%20happy%20family%20of%20four%20-%20father%20in%20white%20t-shirt%20and%20beige%20chinos%2C%20mother%20in%20elegant%20casual%20dress%2C%20daughter%20in%20cute%20summer%20dress%20and%20son%20in%20coordinated%20casual%20outfit%2C%20standing%20naturally%20together%20on%20right%20side%20against%20pure%20white%20background%2C%20clean%20minimal%20composition%20with%20ample%20space%20on%20left%2C%20soft%20natural%20lighting%2C%20professional%20fashion%20photography&width=1920&height=1080&seq=24&orientation=landscape')",
            backgroundSize: "cover",
            backgroundPosition: "top right: -10px;",
        }}
        >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
            <div className="max-w-xl">
            <span className="inline-block text-primary font-medium mb-4 tracking-wider">
                NEW COLLECTION 2025
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Style for the Whole Family
            </h1>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Discover our meticulously curated collection for everyone in your family. From elegant adults' wear to adorable kids' fashion, find the perfect style for every moment together.
            </p>
            <div className="flex space-x-4">
                <button className="bg-primary text-white px-8 py-4 font-medium !rounded-button hover:bg-gray-900 transition-all duration-300 whitespace-nowrap">
                Explore Collection
                </button>
                <button className="bg-white/80 backdrop-blur-sm text-gray-900 px-8 py-4 font-medium !rounded-button hover:bg-gray-100 hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center">
                <span>Watch Video</span>
                <i className="ri-play-circle-line ml-2 text-xl"></i>
                </button>
            </div>
            <div className="flex items-center space-x-8 mt-12">
                <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">350+</p>
                <p className="text-gray-600 text-sm">Brands</p>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">23k+</p>
                <p className="text-gray-600 text-sm">Products</p>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">150k+</p>
                <p className="text-gray-600 text-sm">Happy Clients</p>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Hero_section
