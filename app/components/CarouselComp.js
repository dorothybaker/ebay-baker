"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComp() {
  return (
    <>
      <div className="max-w-[1200px] w-full mx-auto py-3">
        <Carousel
          showArrows
          autoPlay
          interval={3000}
          infiniteLoop
          showThumbs={false}
        >
          <div>
            <img src="/banner/1.png" />
          </div>
          <div>
            <img src="/banner/2.png" />
          </div>
          <div>
            <img src="/banner/3.png" />
          </div>
        </Carousel>
      </div>
    </>
  );
}
