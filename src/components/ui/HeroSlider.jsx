import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import "swiper/css";

export default function HeroSlider({ images, title, subtitle }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[420px] mb-10 rounded-3xl overflow-hidden">

      {/* Arrows */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-orange-400 p-3 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-orange-400 p-3 rounded-full"
      >
        <ChevronRight />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        className="h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt="slide"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-4xl font-bold text-orange-400">
                  {title}
                </h2>
                <p className="text-lg opacity-80">{subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ SIMPLE DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              active === i ? "bg-orange-400" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </div>
  );
}