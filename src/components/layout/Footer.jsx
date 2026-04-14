import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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
    <footer className="bg-zinc-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Newsletter banner strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Stay in the loop
            </h3>
            <p className="text-zinc-400 text-sm mt-1.5">
              Subscribe for early access to the Season 2026 Edit.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
            <Input
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              aria-label="Email address for newsletter"
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 rounded-xl h-12 w-full md:w-72 focus-visible:ring-1 focus-visible:ring-orange-500/50"
            />
            <Button
              type="submit"
              className="bg-orange-500 text-white hover:bg-orange-600 rounded-xl h-12 px-8 text-sm font-semibold tracking-wide uppercase transition-colors cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND COLUMN */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <h1 className="text-2xl font-black tracking-tighter">
            VASTRA<span className="text-orange-500">.CO</span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Refining the modern wardrobe with curated essentials. 
            Season 2026 collections now available.
          </p>
          <div className="flex gap-3">
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
                className="p-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* SHOP COLUMN */}
        <motion.nav
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          aria-label="Shop Collections"
        >
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-7">Shop</h3>
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
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* SUPPORT COLUMN */}
        <motion.nav
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          aria-label="Customer Support"
        >
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-7">Support</h3>
          <ul className="space-y-4">
            {["Help Center", "Shipping Policy", "Returns & Exchanges", "Contact Us"].map((item, i) => (
              <li key={i}>
                <button 
                  onClick={() => item === "Contact Us" && navigate("/contact")}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* COMPANY COLUMN */}
        <motion.nav
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          aria-label="Company"
        >
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-7">Company</h3>
          <ul className="space-y-4">
            {["About Us", "Careers", "Press", "Sustainability"].map((item, i) => (
              <li key={i}>
                <button className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>

      {/* COPYRIGHT AREA */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Separator className="bg-white/10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">
            © {new Date().getFullYear()} VASTRA.CO — ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <button className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors duration-300">Privacy</button>
            <button className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors duration-300">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};