"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface InfiniteScrollGalleryProps {
  images: string[];
  speed?: number; // Duration in seconds (higher = slower)
  isReverse?: boolean;
}

const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  images,
  speed = 30, // Default to very slow scrolling
  isReverse = false,
}) => {
  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: isReverse ? ["0%", "-200%"] : ["-200%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 300, // Controls speed (higher = slower)
        }}
      >
        {/* Duplicate Images for Seamless Scrolling */}
        {[...images, ...images].map((img, idx) => (
          <div key={idx} className="min-w-max">
            <Image
              src={img}
              alt={`Image ${idx}`}
              width={200}
              height={200}
              className="object-cover h-56 w-56 p-2 rounded-2xl"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollGallery;
