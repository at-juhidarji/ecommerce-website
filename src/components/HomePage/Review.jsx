import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Rahul Sharma",
    text: "Absolutely insane quality. Feels premium 🔥",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=1",
    tag: "Verified Buyer",
  },
  {
    name: "Priya Patel",
    text: "Design is next level 😍 totally love it!",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=2",
    tag: "Verified Buyer",
  },
  {
    name: "Amit Verma",
    text: "Best purchase I've made this year.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=3",
    tag: "Top Reviewer",
  },
  {
    name: "Sneha Mehta",
    text: "Fast delivery + amazing packaging 🚚",
    rating: 4,
    img: "https://i.pravatar.cc/100?img=4",
    tag: "Verified Buyer",
  },
];

const PremiumReviewSlider = () => {
  return (
    <section className="bg-zinc-50/50 text-zinc-900 py-12 md:py-16 overflow-hidden relative">
      {/* 🔥 Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .scroll-track {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
          }

          .scroll-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Heading */}
      <SectionContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loved by Thousands
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">
            Real reviews from real customers
          </p>
        </motion.div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-24 md:w-40 h-full bg-gradient-to-r from-zinc-50/50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-24 md:w-40 h-full bg-gradient-to-l from-zinc-50/50 to-transparent z-10"></div>

        {/* Scroll */}
        <div className="overflow-hidden relative z-10">
          <div className="scroll-track gap-6">
            {[...reviews, ...reviews].map((r, i) => (
              <div
                key={i}
                className="min-w-[340px] max-w-[340px] bg-white rounded-2xl p-7 flex flex-col gap-5 border border-zinc-100 shadow-sm hover:shadow-lg hover:shadow-zinc-100/50 transition-all duration-500 select-none"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-orange-200" />

                {/* Review Text */}
                <p className="text-zinc-600 text-sm leading-relaxed flex-1">
                  "{r.text}"
                </p>

                {/* Divider */}
                <div className="border-t border-zinc-100" />

                {/* 👤 Avatar + Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-zinc-100"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-zinc-900 font-semibold text-sm tracking-tight">
                        {r.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                        {r.tag}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default PremiumReviewSlider;
