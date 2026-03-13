import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function HeroSlider({ images, title, subtitle }) {
  return (
    <div className="w-full max-w-7xl mx-auto h-[420px] mb-10 rounded-3xl overflow-hidden">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-full"
      >

        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              <img
                src={img}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-4xl font-bold tracking-tight text-orange-400">
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

    </div>
  )
}