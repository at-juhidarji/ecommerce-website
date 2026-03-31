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

            <button
              type="button"
              aria-label="Visit Facebook page"
              className="hover:text-orange-400"
            >
              <Facebook />
            </button>

            <button
              type="button"
              aria-label="Visit Instagram page"
              className="hover:text-orange-400"
            >
              <Instagram />
            </button>

            <button
              type="button"
              aria-label="Visit Twitter page"
              className="hover:text-orange-400"
            >
              <Twitter />
            </button>

            <button
              type="button"
              aria-label="Visit LinkedIn page"
              className="hover:text-orange-400"
            >
              <Linkedin />
            </button>

          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li>
              <button
                type="button"
                onClick={() => navigate("/menCollection")}
                aria-label="Go to men collection"
                className="hover:text-black cursor-pointer"
              >
                Men
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => navigate("/womenCollection")}
                aria-label="Go to women collection"
              className="hover:text-black cursor-pointer"
              >
                Women
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => navigate("/OversizeCollection")}
                aria-label="Go to oversized collection"
               className="hover:text-black cursor-pointer"
              >
                Oversized
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => navigate("/SneakersCollection")}
                aria-label="Go to sneakers collection"
                 className="hover:text-black cursor-pointer"
              >
                Sneakers
              </button>
            </li>

          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li>
              <button type="button" aria-label="Open help center">
                Help Center
              </button>
            </li>

            <li>
              <button type="button" aria-label="View returns policy">
                Returns
              </button>
            </li>

            <li>
              <button type="button" aria-label="View shipping information">
                Shipping
              </button>
            </li>

            <li>
              <button type="button" aria-label="Contact support">
                Contact Us
              </button>
            </li>

          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Stay Updated</h3>

          <p className="text-sm text-gray-400 mb-3">
            Subscribe to get latest offers
          </p>

          <form className="flex gap-2">

            <label htmlFor="footer-email" className="sr-only">
              Enter your email
            </label>

            <Input
              id="footer-email"
              type="email"
              required
              placeholder="Enter email"
              className="bg-zinc-900 border-none text-white"
            />

            <Button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Subscribe
            </Button>

          </form>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} VASTRA.CO. All rights reserved.
      </div>
    </footer>
  );
};