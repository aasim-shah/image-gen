"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface InfiniteScrollGalleryProps {
  images: string[];
  speed: number;
  isReserve?: boolean;
}

const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  images,
  speed,
  isReserve,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const maxScrollLeft =
      scrollContainer.scrollWidth - scrollContainer.offsetWidth;
    scrollContainer.scrollLeft = 0; // Start from the far left

    let animationFrameId: number;

    const scrollStep = () => {
      const scrollSpeed = speed; // Adjust the speed

      // Scroll from left to right
      scrollContainer.scrollLeft += scrollSpeed;

      // Reset to the start when reaching the end
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollContainer.scrollLeft = 0; // Jump back to the start
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide"
      style={{ scrollBehavior: "smooth" }}
    >
      {images.concat(isReserve ? images.slice(0, 6) : []).map((img, idx) => (
        <motion.div
          key={`${img}-${idx}`}
          className="min-w-max"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <Image
            src={img}
            alt={`Image ${idx}`}
            width={200}
            height={200}
            className="object-cover h-56 w-56 p-2 rounded-2xl"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default InfiniteScrollGallery;
