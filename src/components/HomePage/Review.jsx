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
    <section className="bg-white max-w-7xl mx-auto text-black py-20 overflow-hidden relative">

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

      {/* Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-200/40 blur-[120px] rounded-full"></div>

      {/* Heading */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black">
          Loved by Thousands 
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Real reviews from real customers
        </p>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Scroll */}
      <div className="overflow-hidden relative z-10">
        <div className="scroll-track gap-8 px-6">

          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="relative min-w-[320px] p-[1px] rounded-2xl bg-gradient-to-br from-orange-200 via-white to-transparent"
            >
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md hover:shadow-lg transition duration-500">

                {/* 👤 Avatar + Name */}
                <div className="flex items-center gap-3">
                  
                  {/* Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-orange-300 blur-md opacity-40"></div>
                    <img
                      src={r.img}
                      alt={r.name}
                      className="relative w-12 h-12 rounded-full object-cover border border-gray-200"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <p className="text-black font-semibold text-sm">
                      {r.name}
                    </p>

                    {/* Stars */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-orange-500 fill-orange-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed">
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