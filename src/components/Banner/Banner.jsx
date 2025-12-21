import React, { useEffect, useRef, useCallback } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import banner3 from "../../assets/banner3.png"
import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";

export const Banner = () => {
  const swiperRef = useRef(null);

  const animateSlide = useCallback(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const img = activeSlide.querySelector("img");
    const text = activeSlide.querySelector(".slide-text");

    gsap.fromTo(
      img,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      text,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (swiperRef.current) animateSlide();
  }, [animateSlide]);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        animateSlide(); // Run animation only when swiper fully ready
      }}
      onSlideChange={animateSlide}
      slidesPerView={1}
      className="banner-swiper w-full h-[550px]"
    >
      {/* Slide 1 */}
      <SwiperSlide className="relative w-full h-full">
        <img
          className="w-full h-full object-fit"
          src={banner1}
          alt="Slide 1"
        />
        <h1 className="slide-text absolute bottom-10 left-10 text-white text-4xl font-bold drop-shadow-lg">
          Welcome to TechBazaar
        </h1>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className="relative w-full h-full">
        <img
          className="w-full h-full object-fit"
          src={banner2}
          alt="Slide 2"
        />
        <h1 className="slide-text absolute bottom-10 left-10 text-white text-4xl font-bold drop-shadow-lg">
          Best Deals for You!
        </h1>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide className="relative w-full h-full">
        <img
          className="w-full h-full object-fit"
          src={banner3}
          alt="Slide 3"
        />
        <h1 className="slide-text absolute bottom-10 left-10 text-white text-4xl font-bold drop-shadow-lg">
          New Collections Available
        </h1>
      </SwiperSlide>
    </Swiper>
  );
};
