import React from "react";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";


export const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="w-full bg-[#09090b] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="text-2xl md:text-3xl font-[1000] tracking-tighter text-white cursor-pointer">
            VASTRA<span className="text-orange-400 font-[1000] tracking-tighter text-2xl uppercase md:text-3xl ">.CO</span>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-base font-normal text-white">
            <button className="flex items-center gap-1 hover:text-slate-400 transition">
              Shop <ChevronDown className="size-4" />
            </button>

            <button className="hover:text-slate-400 transition">
              On Sale
            </button>

            <button className="hover:text-slate-400 transition">
              New Arrivals
            </button>

            <button className="hover:text-slate-400 transition">
              Brands
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />

              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-[#F0F0F0] rounded-full py-3 pl-12 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">

            <Button variant="ghost" size="icon">
              <ShoppingCart className="size-6 text-white" />
            </Button>

            {/* Clerk Auth */}
             <SignedOut>
  <SignInButton>
    <Button variant="ghost" className="text-white">Sign In</Button>
  </SignInButton>

  <SignUpButton>
    <Button variant="ghost" className="text-white">Sign Up</Button>
  </SignUpButton>
</SignedOut>

<SignedIn>
  <UserButton afterSignOutUrl="/" />
</SignedIn>

          </div>
        </div>
      </nav>
    </header>
  );
};