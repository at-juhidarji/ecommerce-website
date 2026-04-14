import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./button";

import "swiper/css";

export default function HeroSlider({ images, title, subtitle }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  return (
    <div
      className="relative w-full max-w-7xl mx-auto h-[420px] mb-10 rounded-3xl overflow-hidden"
      role="region"
      aria-label="Hero image slider"
    >

      {/* LEFT ARROW */}
      <Button
        ref={prevRef}
        type="Button"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-orange-400 p-3 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft />
      </Button>

      {/* RIGHT ARROW */}
      <Button
        ref={nextRef}
        type="Button"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-orange-400 p-3 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight />
      </Button>

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
          swiperRef.current = swiper;

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
              
              {/* IMAGE */}
              <img
                src={img}
                alt={`${title} slide ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />

              {/* TEXT */}
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

      {/* ✅ ACCESSIBLE DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <Button
            key={i}
            type="Button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => swiperRef.current.slideToLoop(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              active === i ? "bg-orange-400 scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}