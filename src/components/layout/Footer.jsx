import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socialLinks = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
];

const shopLinks = [
  { label: "Men", path: "/collections?category=men" },
  { label: "Women", path: "/collections?category=women" },
  { label: "Sneakers", path: "/collections?category=sneakers" },
  { label: "Accessories", path: "/collections?category=accessories" },
];

const supportLinks = [
  { label: "Help Center" },
  { label: "Shipping" },
  { label: "Returns" },
  { label: "Contact", path: "/contact" },
];

const companyLinks = ["About", "Careers", "Press", "Sustainability"];

export const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");

    toast.success("Welcome to the Edit!", {
      description: `${email} has been added to our newsletter.`,
    });

    e.target.reset();
  };

  return (
    <footer className="bg-surface-dark text-on-dark" role="contentinfo">
      {/* Newsletter */}
      <div className="border-b border-surface-border-light">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 id="footer-newsletter-heading" className="text-2xl font-bold">
              Stay in the loop
            </h2>
            <p className="text-surface-muted text-sm">
              Subscribe for early access.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
            aria-labelledby="footer-newsletter-heading"
          >
            <div className="w-full sm:w-auto">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-newsletter-email"
                name="email"
                type="email"
                className="bg-surface-light border-surface-light text-on-dark placeholder:text-surface-muted focus-visible:border-warning focus-visible:ring-warning/30"
                placeholder="email@example.com"
                required
                autoComplete="email"
              />
            </div>
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h1 className="text-2xl font-bold">
            VASTRA<span className="text-warning">.CO</span>
          </h1>

          <p className="text-surface-muted text-sm mt-3">
            Modern curated fashion essentials.
          </p>

          <div
            className="flex gap-2 mt-4"
            role="group"
            aria-label="Social media links"
          >
            {socialLinks.map(({ Icon, label }, i) => (
              <Button
                key={i}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={label}
                className="text-on-dark hover:text-warning"
              >
                <Icon size={16} />
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Shop */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3 id="footer-shop-heading" className="text-sm font-semibold mb-4">
            Shop
          </h3>
          <nav aria-labelledby="footer-shop-heading">
            <ul className="flex flex-col gap-2">
              {shopLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="block text-sm text-surface-muted hover:text-on-dark transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Support */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3
            id="footer-support-heading"
            className="text-sm font-semibold mb-4"
          >
            Support
          </h3>
          <nav aria-labelledby="footer-support-heading">
            <ul className="flex flex-col gap-2">
              {supportLinks.map((item, i) => (
                <li key={i}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="block text-sm text-surface-muted hover:text-on-dark transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-surface-muted">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Company */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3
            id="footer-company-heading"
            className="text-sm font-semibold mb-4"
          >
            Company
          </h3>
          <div aria-labelledby="footer-company-heading">
            <ul className="flex flex-col gap-2">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <span className="text-sm text-surface-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Separator className="bg-surface-light" />

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-xs text-surface-muted">
            © {new Date().getFullYear()} VASTRA.CO
          </p>

          <div className="flex gap-4">
            <span className="text-sm text-surface-muted">Privacy</span>
            <span className="text-sm text-surface-muted">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
