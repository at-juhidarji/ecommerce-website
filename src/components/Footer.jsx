import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  return (
    <footer className="bg-orange-50 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ─── LOGO + ABOUT ─── */}
        <div>
          <h1 className="text-2xl font-black tracking-tight mb-4 text-gray-900">
            VASTRA<span className="text-orange-500">.CO</span>
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            Discover the latest fashion trends with VASTRA.CO.
            Style that defines you.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            {[ 
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }, i) => (
              <button
                key={i}
                aria-label={`Visit ${label}`}
                className="p-2 rounded-full border border-orange-200 text-gray-600 
                           hover:bg-orange-500 hover:text-white 
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 
                           transition"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* ─── SHOP LINKS ─── */}
        <nav aria-label="Shop categories">
          <h3 className="font-semibold mb-4 text-gray-900">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              { label: "Men", path: "/menCollection" },
              { label: "Women", path: "/womenCollection" },
              { label: "Oversized", path: "/OversizeCollection" },
              { label: "Sneakers", path: "/SneakersCollection" },
            ].map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => navigate(item.path)}
                  className="hover:text-orange-500 focus:outline-none 
                             focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ─── SUPPORT ─── */}
        <nav aria-label="Support links">
          <h3 className="font-semibold mb-4 text-gray-900">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {["Help Center", "Returns", "Shipping", "Contact Us"].map((item, i) => (
              <li key={i}>
                <button
                  className="hover:text-orange-500 focus:outline-none 
                             focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ─── NEWSLETTER ─── */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Stay Updated</h3>

          <p className="text-sm text-gray-600 mb-4">
            Subscribe to get latest offers
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex gap-2"
            aria-label="Newsletter subscription form"
          >
            <Input
              type="email"
              required
              placeholder="Enter email"
              aria-label="Email address"
              className="bg-white border border-orange-200 focus-visible:ring-orange-500"
            />

            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white 
                         focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* ─── BOTTOM ─── */}
      <div className="border-t border-orange-200 text-center text-sm text-gray-500 py-5">
        © {new Date().getFullYear()} 
        <span className="font-semibold text-gray-700"> VASTRA.CO</span>. 
        All rights reserved.
      </div>
    </footer>
  );
};