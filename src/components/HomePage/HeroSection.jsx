import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";
import img5 from "@/assets/Image-5.jpg";
import img6 from "@/assets/Image-6.jpg";
import img7 from "@/assets/Image-7.jpg";
import img8 from "@/assets/Image-8.jpg";

const HeroImages = [img1, img2, img3, img4, img5, img6, img7, img8];
const HERO_MAIN_IMAGE = img8;

const categories = [
  { img: img1, tag: "#TRENDING" },
  { img: img2, tag: "#CLASSIC" },
  { img: img3, tag: "#WOMEN" },
  { img: img4, tag: "#STREET" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* HERO */}
      <SectionContainer className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT IMAGE */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-100 md:h-112.5 lg:h-130 group">
          <img
            alt="Hero banner"
            src={HERO_MAIN_IMAGE}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-hero-overlay" />

          {/* CTA BUTTONS */}
          <div className="absolute bottom-6 left-6 flex gap-3 flex-wrap">
            {/* PRIMARY BUTTON */}
            <Button
              type="button"
              onClick={() => navigate("/productcollection")}
              variant="default"
              size="sm"
              aria-label="Shop now for latest products"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>

            {/* SECONDARY BUTTON */}
            <Button
              type="button"
              onClick={() => navigate("/contact")}
              variant="secondary"
              size="sm"
              aria-label="Contact us for inquiries"
            >
              Contact <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="flex flex-col justify-center text-foreground">
          <div className="py-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="text-muted-foreground mb-6">
              Discover premium fashion curated for your individuality.
            </p>

            {/* EXPLORE BUTTON */}
            <Button
              type="button"
              onClick={() =>
                document.getElementById("collection")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              variant="default"
              size="sm"
              aria-label="Explore our product collection"
            >
              Explore Collection
            </Button>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-surface-light pt-6">
              {[
                { value: "200+", label: "Brands" },
                { value: "2K+", label: "Products" },
                { value: "30K+", label: "Customers" },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl font-bold">{item.value}</h3>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CATEGORY CARDS */}
      <SectionContainer className="pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((card, i) => (
          <div
            key={i}
            className="relative h-65 rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={card.img}
              alt={card.tag}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-overlay group-hover:bg-overlay-strong transition" />

            <div className="absolute bottom-4 left-4 text-on-dark text-xl font-bold">
              {card.tag}
            </div>
          </div>
        ))}
      </SectionContainer>
    </div>
  );
};

export default HeroSection;
