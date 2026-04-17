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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Footer = () => {
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");

    toast.success("Welcome to the Edit!", {
      description: `${email} has been added to our newsletter.`,
    });

    e.target.reset();
  };

  return (
    <footer className="bg-[#27292d] text-white">

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Stay in the loop</h3>
            <p className="text-zinc-400 text-sm">
              Subscribe for early access.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input name="email" type="email" placeholder="email@example.com" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h1 className="text-2xl font-bold">
            VASTRA<span className="text-orange-500">.CO</span>
          </h1>

          <p className="text-zinc-400 text-sm mt-3">
            Modern curated fashion essentials.
          </p>

          <div className="flex gap-2 mt-4">
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <Button key={i} variant="ghost" size="icon">
                <Icon size={16} />
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Shop */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3 className="text-sm font-semibold mb-4">Shop</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "Men", path: "/collections?category=men" },
              { label: "Women", path: "/collections?category=women" },
              { label: "Sneakers", path: "/collections?category=sneakers" },
              { label: "Accessories", path: "/collections?category=accessories" },
            ].map((item, i) => (
              <Button
                key={i}
                variant="link"
                onClick={() => navigate(item.path)}
                className="justify-start p-0"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Support */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3 className="text-sm font-semibold mb-4">Support</h3>
          <div className="flex flex-col gap-2">
            {["Help Center", "Shipping", "Returns", "Contact"].map((item, i) => (
              <Button
                key={i}
                variant="link"
                onClick={() => item === "Contact" && navigate("/contact")}
                className="justify-start p-0"
              >
                {item}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Company */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3 className="text-sm font-semibold mb-4">Company</h3>
          <div className="flex flex-col gap-2">
            {["About", "Careers", "Press", "Sustainability"].map((item, i) => (
              <Button key={i} variant="link" className="justify-start p-0">
                {item}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Separator className="bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} VASTRA.CO
          </p>

          <div className="flex gap-4">
            <Button variant="default" size="sm">
              Privacy
            </Button>
            <Button variant="default" size="sm">
              Terms
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};