import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    text: "Absolutely insane quality. Feels premium 🔥",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Priya Patel",
    text: "Design is next level 😍 totally love it!",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Amit Verma",
    text: "Best purchase I’ve made this year.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Sneha Mehta",
    text: "Fast delivery + amazing packaging 🚚",
    rating: 4,
    img: "https://i.pravatar.cc/100?img=4",
  },
];

const PremiumReviewSlider = () => {
  return (
    <section className="bg-black text-white py-20 overflow-hidden relative">

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
            animation: scroll 35s linear infinite;
          }

          .scroll-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Glow BG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full"></div>

      {/* Heading */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black">
          Loved by Thousands 💬
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          Real reviews from real customers
        </p>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

      {/* Scroll */}
      <div className="overflow-hidden relative z-10">
        <div className="scroll-track gap-8 px-6">

          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="relative min-w-[320px] p-[1px] rounded-2xl bg-gradient-to-br from-orange-500/40 via-white/10 to-transparent"
            >
              <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 hover:scale-105 transition duration-500">

                {/* 👤 Avatar + Name */}
                <div className="flex items-center gap-3">
                  
                  {/* Avatar with glow */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-60"></div>
                    <img
                      src={r.img}
                      alt={r.name}
                      className="relative w-12 h-12 rounded-full object-cover border border-white/20"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <p className="text-white font-semibold text-sm">
                      {r.name}
                    </p>

                    {/* Stars */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-orange-400 fill-orange-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  “{r.text}”
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PremiumReviewSlider;