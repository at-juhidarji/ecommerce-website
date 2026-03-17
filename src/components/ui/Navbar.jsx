import React from "react";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "./input";
  
export const Navbar = () => {
  const navigate = useNavigate();

  return (
    // Added 'relative' here so the absolute mega-menu can pin to the header
    <header className="w-full relative">
      <nav className="w-full bg-[#09090b] sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl md:text-3xl font-[1000] tracking-tighter text-white cursor-pointer"
          >
            VASTRA<span className="text-orange-400">.CO</span>
          </button>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-base font-normal text-white h-full">
            <button
              onClick={() => navigate("/SaleCollection")} // Use the string path defined in your Routes
              className="relative flex items-center gap-1 hover:text-slate-400 transition-colors cursor-pointer h-full px-2 group/btn"
            >
              On Sale
              {/* The Smooth Underline */}
              <span className="absolute bottom-4 left-2 right-2 h-[2px] bg-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center" />
            </button>
            <button
              onClick={() => navigate("/New")}
              className="relative flex items-center gap-1 hover:text-slate-400 transition-colors cursor-pointer h-full px-2 group/btn"
            >
              New Arrivals
              <span className="absolute bottom-4 left-2 right-2 h-[2px] bg-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center" />
            </button>

            {/* Customer Care with Mega Menu */}
            <div className="group h-full flex items-center justify-center">
              <button className="relative flex items-center gap-1 hover:text-slate-400 transition-colors cursor-pointer h-full px-2 group/btn">
                Customer Care
                <ChevronDown className="size-4 group-hover/btn:rotate-180 transition-transform duration-300" />
                {/* The Smooth Underline */}
                <span className="absolute bottom-4 left-2 right-2 h-[2px] bg-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center" />
              </button>

              {/* The White Container - Now Absolute to the Nav */}
              <div className="absolute top-full left-0 w-full bg-white  text-black shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-10">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div>
                      <h3 className="font-bold text-orange-500 mb-4 uppercase text-xs tracking-widest">
                        Support
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Help Center
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Order Tracking
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Returns & Exchanges
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h3 className="font-bold text-orange-500 mb-4 uppercase text-xs tracking-widest">
                        Contact
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Live Chat
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Email Us
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-500 mb-4 uppercase text-xs tracking-widest">
                        Support
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Help Center
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Order Tracking
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Returns & Exchanges
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#F0F0F0] rounded-full py-5 pl-11 pr-4 text-sm text-black border-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-all"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="icon"
               onClick={() => navigate("/CartDrawer")}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ShoppingCart className="size-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
