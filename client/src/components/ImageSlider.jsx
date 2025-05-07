import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Slideshow 4 images
import img1 from '../assets/slide1.jpg';
import img2 from '../assets/slide2.jpg';
import img3 from '../assets/slide3.jpg';
import img4 from '../assets/slide4.jpg';

const ImageSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          const next = document.getElementById('nextBtn');
          const prev = document.getElementById('prevBtn');

          if (next && prev) {
            next.onclick = () => swiper.slideNext();
            prev.onclick = () => swiper.slidePrev();
          }
        }}
      >
        {[img1, img2, img3, img4].map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-[400px] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation + Pagination Controls */}
      <div
        className="flex flex-col items-center mt-6 gap-3"
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        <div className="flex justify-center items-center gap-8">
          <button id="prevBtn" className="text-[#333333] hover:text-[#bbbbbb] text-3xl transition">
            &larr;
          </button>

          {/* Pagination Dots */}
          <div className="custom-pagination flex items-center gap-2" />

          <button id="nextBtn" className="text-[#333333] hover:text-[#bbbbbb] text-3xl transition">
            &rarr;
          </button>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        /* Pagination dots */
        .custom-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background-color: #bbbbbb;
          opacity: 1;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #333333;
        }

        /* Scale effect on active slide */
        .swiper-slide-active img {
          transform: scale(1.05);
          transition: transform 1s ease;
        }
        .swiper-slide img {
          transition: transform 1s ease;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
