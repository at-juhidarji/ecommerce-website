import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  return (
    <footer className="bg-background border-t">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO + ABOUT */}
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            <h1 className="text-2xl font-black tracking-tight mb-4">
              VASTRA<span className="text-primary">.CO</span>
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed">
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
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  aria-label={label}
                  className="rounded-full"
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              { label: "Men", path: "/menCollection" },
              { label: "Women", path: "/womenCollection" },
              { label: "Oversized", path: "/OversizeCollection" },
              { label: "Sneakers", path: "/SneakersCollection" },
            ].map((item, i) => (
              <li key={i}>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-primary"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Help Center", "Returns", "Shipping", "Contact Us"].map(
              (item, i) => (
                <li key={i}>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                  >
                    {item}
                  </Button>
                </li>
              )
            )}
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-4">Stay Updated</h3>

          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to get latest offers
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex gap-2"
          >
            <Input
              type="email"
              required
              placeholder="Enter email"
            />

            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <Separator className="mb-4" />

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">
            VASTRA.CO
          </span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};