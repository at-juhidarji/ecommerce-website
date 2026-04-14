import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Footer = () => {
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    
    // Using toast for a premium "Modern Tech" feel
    toast.success("Welcome to the Edit!", {
      description: `${email} has been added to our newsletter.`,
    });
    e.target.reset();
  };

  return (
    <footer className="bg-white border-t border-zinc-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND COLUMN */}
        <div className="space-y-6">
          <h1 className="text-2xl font-black tracking-tighter text-zinc-950">
            VASTRA<span className="text-orange-500">.CO</span>
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Refining the modern wardrobe with curated essentials. 
            Season 2026 collections now available.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, label: "Follow on Instagram" },
              { Icon: Facebook, label: "Follow on Facebook" },
              { Icon: Twitter, label: "Follow on Twitter" },
              { Icon: Linkedin, label: "Follow on LinkedIn" },
            ].map(({ Icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={label}
                className="p-2 rounded-full border border-zinc-200 text-zinc-600 hover:text-black hover:border-black transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* SHOP COLUMN - Dynamic Routing */}
        <nav aria-label="Shop Collections">
          <h3 className="text-xs uppercase tracking-[3px] font-bold text-zinc-950 mb-6">Shop</h3>
          <ul className="space-y-4">
            {[
              { label: "Men", path: "/collections?category=men" },
              { label: "Women", path: "/collections?category=women" },
              { label: "Sneakers", path: "/collections?category=sneakers" },
              { label: "Accessories", path: "/collections?category=accessories" },
            ].map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => navigate(item.path)}
                  className="text-sm text-zinc-500 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* SUPPORT COLUMN */}
        <nav aria-label="Customer Support">
          <h3 className="text-xs uppercase tracking-[3px] font-bold text-zinc-950 mb-6">Support</h3>
          <ul className="space-y-4">
            {["Help Center", "Shipping Policy", "Returns & Exchanges", "Contact Us"].map((item, i) => (
              <li key={i}>
                <button 
                  onClick={() => item === "Contact Us" && navigate("/contact")}
                  className="text-sm text-zinc-500 hover:text-orange-500 transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* NEWSLETTER COLUMN */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[3px] font-bold text-zinc-950">Stay Updated</h3>
          <p className="text-sm text-zinc-500">
            Subscribe to receive early access to the Season 2026 Edit.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative">
              <Input
                name="email"
                type="email"
                required
                placeholder="email@example.com"
                aria-label="Email address for newsletter"
                className="bg-zinc-50 border-zinc-200 rounded-none focus-visible:ring-orange-500"
              />
            </div>
            <Button variant="default" type="submit" className="w-full bg-black text-white hover:bg-zinc-800 rounded-none uppercase tracking-widest text-xs h-11">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* COPYRIGHT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Separator className="bg-zinc-100" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <p className="text-[11px] uppercase tracking-widest text-zinc-400">
            © {new Date().getFullYear()} VASTRA.CO — ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <button className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-black">Privacy</button>
            <button className="text-[11px] uppercase tracking-widest text-zinc-400 hover:text-black">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};