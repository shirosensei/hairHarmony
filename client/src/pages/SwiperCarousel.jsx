import React, { useRef } from "react";
import Logo from "../assets/images/client-doing-hair-cut-barber-shop-salon1.jpg";
import image2 from "../assets/images/massage-therapy-1584711_640.jpg";
import image3 from "../assets/images/barbershop-1612726_640.jpg";
import image4 from "../assets/images/machine-8254053_640.jpg";
import image5 from "../assets/images/barber-shop-7021798_1280.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const images = [
  {
    id: 1,
    src: `${Logo}`,
    alt: "Professional Hair cut",
  },
  {
    id: 2,
    src: `${image2}`,
    alt: "Massage therapy",
  },
  {
    id: 3,
    src: `${image3}`,
    alt: "Relaxing spa area",
  },
  {
    id: 4,
    src: `${image4}`,
    alt: "Machine cutter"
  },
  {
    id: 5,
    src: `${image5}`,
    alt: "Barber and client "
  }

];

const SwiperCarousel = () => {
  const swiperRef = useRef(null);

  return (
    <React.Fragment>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        lazy={true.toString()} // Lazy loading configuration
        autoplay={{
          delay: 65000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log('swiper', swiper)}
        className="hero-slider"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="">
            <img
              src={image.src}
              alt={image.alt}
              className="swiper-lazy hero-image"
              loading="lazy"
            />
            <div className="swiper-lazy-preloader"></div>
          </SwiperSlide>
        ))}
      </Swiper>
      
            {/* <picture>
              <source
                srcSet={`${Logo} 100w, ${Logo} 200w`}
                sizes="(max-width: 600px) 10w, 10w"
                type="image/jpeg"
              />
              <source
                srcSet={`${Logo} 100w, ${Logo} 200w`}
                sizes="(max-width: 1024px) 50w, 50w"
                type="image/jpeg"
              />
              <img
                src={Logo}
                alt="Modern salon interior with luxury seating."
                className="hero-image"
              />
            </picture> */}
            {/* </div> */}
    </React.Fragment>
  );
};

export default SwiperCarousel;
