import React from "react";
import BannerOne from "../../../assets/banner/banner1.png";
import BannerTwo from "../../../assets/banner/banner2.png";
import BannerThree from "../../../assets/banner/banner3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router";
import Arrow from "../../../components/Arrow/Arrow";

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      
      {[BannerOne, BannerTwo, BannerThree].map((banner, index) => (
        <div key={index} className="relative">
          <img src={banner} className="w-full object-cover" />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-4 items-center">
            
            <div className="flex items-center gap-2">
              <NavLink
                to="/parcel-track"
                className="btn bg-primary text-[#0B0B0B] font-bold rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base lg:text-lg"
              >
                Track Your Parcel
              </NavLink>
              <Arrow />
            </div>

            <NavLink
              to="/be-rider"
              className="btn bg-white text-[#0B0B0B] font-bold rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base lg:text-lg"
            >
              Be A Rider
            </NavLink>

          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;