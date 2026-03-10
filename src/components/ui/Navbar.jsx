import React from 'react'
import { Search, ShoppingCart, UserCircle, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
  return (
    <header className="w-full">
      {/* 1. Black Announcement Bar */}
      {/* <div className="w-full bg-black text-white py-2 px-4 relative flex items-center justify-center">
        <p className="text-xs sm:text-sm font-light text-center">
          Sign up and get 20% off to your first order.{" "}
          <button className="font-bold underline underline-offset-4 hover:text-slate-300 transition-colors">
            Sign Up Now
          </button>
        </p>
        <X className="absolute right-4 size-4 cursor-pointer hidden sm:block" />
      </div> */}

      {/* 2. Main Navigation */}
      <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="text-2xl md:text-3xl font-[1000] tracking-tighter text-black cursor-pointer">
            VASTRA.CO
          </div>

          {/* Nav Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-6 text-base font-normal text-black">
            <button className="flex items-center gap-1 hover:text-slate-600 transition-colors">
              Shop <ChevronDown className="size-4" />
            </button>
            <button className="hover:text-slate-600 transition-colors">On Sale</button>
            <button className="hover:text-slate-600 transition-colors">New Arrivals</button>
            <button className="hover:text-slate-600 transition-colors">Brands</button>
          </div>

          {/* Search Bar - Iconic Pill Shape */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full bg-[#F0F0F0] rounded-full py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-slate-300 transition-all"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Search Icon */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Search className="size-6 text-black" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <ShoppingCart className="size-6 text-black" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <UserCircle className="size-6 text-black" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}