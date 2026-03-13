import React from 'react'
import { Button } from "@/components/ui/button"

export const Home = () => {
  return (
    <div className="w-full bg-[#F2F0F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 flex flex-col md:flex-row items-center relative">
        
        {/* Left Content */}
        <div className="flex-1 z-10 pb-10 md:pb-20 text-center md:text-left">
          <h1 className="text-4xl md:text-7xl font-[1000] leading-none mb-6 text-black tracking-tighter">
            FIND CLOTHES <br /> 
            THAT MATCHES <br /> 
            YOUR STYLE
          </h1>
          
          <p className="text-slate-500 text-sm md:text-base mb-8 max-w-md mx-auto md:mx-0">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>

          <Button variant="default"
          className="bg-black text-white px-12 py-6 rounded-full text-lg hover:bg-zinc-800 transition-all">
            Shop Now
          </Button>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold">200+</h3>
              <p className="text-xs text-slate-500">International Brands</p>
            </div>
            <div className="border-x border-slate-300 px-8">
              <h3 className="text-2xl md:text-4xl font-bold">2,000+</h3>
              <p className="text-xs text-slate-500">High-Quality Products</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold">30,000+</h3>
              <p className="text-xs text-slate-500">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="flex-1 relative w-full h-full min-h-[400px] md:min-h-[600px]">
          {/* Main Image - Replace with your model image */}
          <img 
            src="https://images.unsplash.com/photo-1745503319272-41c3bc777762?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Models" 
            className="w-full h-full object-cover object-top"
          />

          {/* Decorative Vector Stars (Lucide doesn't have these specific ones, so we use custom SVG) */}
          <div className="absolute top-1/4 right-5 animate-pulse">
             <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M28 0L31.3283 24.6717L56 28L31.3283 31.3283L28 56L24.6717 31.3283L0 28L24.6717 24.6717L28 0Z" fill="black"/>
             </svg>
          </div>
          <div className="absolute bottom-1/3 left-10 scale-75 animate-pulse delay-75">
             <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M28 0L31.3283 24.6717L56 28L31.3283 31.3283L28 56L24.6717 31.3283L0 28L24.6717 24.6717L28 0Z" fill="black"/>
             </svg>
          </div>
        </div>
      </div>

      {/* Brand Bar */}
      <div className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-8 md:gap-4 opacity-80">
          <span className="text-white text-2xl md:text-4xl font-1000 font-serif font-bold tracking-tighter">VERSACE</span>
          <span className="text-white text-2xl md:text-4xl font-1000  font-bold tracking-widest">ZARA</span>
          <span className="text-white text-2xl md:text-4xl font-1000  font-serif font-bold uppercase">Gucci</span>
          <span className="text-white text-2xl md:text-4xl font-1000  font-bold uppercase">Prada</span>
          <span className="text-white text-2xl md:text-4xl font-1000  font-bold uppercase tracking-tighter">Calvin Klein</span>
        </div>
      </div>
      
    </div>
     
  )
}