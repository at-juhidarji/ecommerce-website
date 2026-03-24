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

  return (
    <footer className="bg-background border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-black tracking-tight mb-4">
            VASTRA<span className="text-orange-400">.CO</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Discover the latest fashion trends with VASTRA.CO.
            Style that defines you.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <Facebook className="cursor-pointer hover:text-orange-400" />
            <Instagram className="cursor-pointer hover:text-orange-400" />
            <Twitter className="cursor-pointer hover:text-orange-400" />
            <Linkedin className="cursor-pointer hover:text-orange-400" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li onClick={() => navigate("/menCollection")} className="hover:text-white cursor-pointer">Men</li>
            <li onClick={() => navigate("/womenCollection")} className="hover:text-white cursor-pointer">Women</li>
            <li onClick={() => navigate("/OversizeCollection")} className="hover:text-white cursor-pointer">Oversized</li>
            <li onClick={() => navigate("/SneakersCollection")} className="hover:text-white cursor-pointer">Sneakers</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe to get latest offers
          </p>

          <div className="flex gap-2">
            <Input placeholder="Enter email" className="bg-zinc-900 border-none" />
            <Button className="bg-orange-500 hover:bg-orange-600">
              Subscribe
            </Button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10  text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VASTRA.CO. All rights reserved.
      </div>
    </footer>
  );
};