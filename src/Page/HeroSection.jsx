import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { ProductCollection } from "./ProductCollection";
import LogoSlider from "./Cursor";
import { WhyChooseUs } from "./WhyToChoose";
import AutoReviewSlider from "./Review";
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
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--background)] text-white overflow-hidden">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IMAGE */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-87.5 md:h-[450px] lg:h-[520px] group">
          <img
            alt="Hero Image"
            src={HeroImages[7]}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* CTA */}
          <div className="absolute bottom-6 left-6 flex gap-3 flex-wrap">
            <Button
              aria-label="Shop"
              className="flex items-center gap-2 bg-primary hover:bg-orange-600 rounded-full px-5"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              aria-label="contact"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 hover:bg-white/20"
            >
              Contact <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col justify-center text-black">
          <div className="py-6">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 mb-6">
              Discover premium fashion curated for your individuality.
            </p>

            {/* CTA */}
            <Button
              aria-label="collection"
              onClick={() => {
                document.getElementById("collection")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-primary hover:bg-orange-600 rounded-full px-6 mb-8"
            >
              Explore Collection
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                { value: "200+", label: "Brands" },
                { value: "2K+", label: "Products" },
                { value: "30K+", label: "Customers" },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl font-bold">{item.value}</h3>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            img: HeroImages[0],
            tag: "#TRENDING",
            alt: "trending",
          },
          {
            img: HeroImages[1],
            tag: "#CLASSIC",
          },
          {
            img: HeroImages[2],
            tag: "#WOMEN",
          },
          {
            img: HeroImages[3],
            tag: "#STREET",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={card.img}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white text-xl font-bold">
              {card.tag}
            </div>
          </div>
        ))}
      </div>

      {/* SECTIONS */}
      <LogoSlider />
      <ProductCollection />
      <WhyChooseUs />
      <AutoReviewSlider />
    </div>
  );
};

export default HeroSection;
