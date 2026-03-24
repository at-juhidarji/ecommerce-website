import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ images, title, subtitle }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[420px] mb-10 rounded-3xl overflow-hidden">

      {/*  Custom Arrows */}
      <button
       aria-label="arrow left"
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-orange-400 p-3 rounded-full hover:bg-orange-400 hover:text-black transition"
      >
        <ChevronLeft />
      </button>

      <button
      aria-label="arrow right"
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-orange-400 p-3 rounded-full hover:bg-orange-400 hover:text-black transition"
      >
        <ChevronRight />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="h-full custom-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              <img
                src={img}
                alt="slide"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Text */}
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-4xl font-bold text-orange-400">
                  {title}
                </h2>
                <p className="text-lg opacity-80">
                  {subtitle}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 LOCAL STYLING (dots customized here only) */}
      <style>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }

       .swiper-pagination-bullet-active {
          background: orange;
          width: 25px;
          border-radius: 10px;
        }
      `}</style>

    </div>
  );
}