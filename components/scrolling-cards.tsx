"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollingCards() {
  const images = [
    { src: "/a.png", text: "This is the first image description." },
    { src: "/b.png", text: "This is the second image description." },
    { src: "/c.jpg", text: "This is the third image description." },
    { src: "/a.png", text: "This is the first image description." },
    { src: "/b.png", text: "This is the second image description." },
    { src: "/c.jpg", text: "This is the third image description." },
    { src: "/a.png", text: "This is the first image description." },
    { src: "/b.png", text: "This is the second image description." },
    { src: "/d.png", text: "This is the fourth image description." },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const slideIndex = Math.floor(scrollTop / clientHeight);
      setCurrentSlide(slideIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex-col h-[60vh] overflow-y-scroll scrollbar-hide"
    >
      {images.slice(0, 5).map((image, index) => (
        <div
          key={index}
          className={`w-full h-full  flex items-center sticky top-${
            index % 2 === 0 ? index : index + 1
          } justify-center`}
        >
          <div className="w-1/2 flex items-center justify-center">
            <div className="h-96 w-full">
              <Image
                src={image.src}
                alt={`Image ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="w-1/2 text-left">
            {currentSlide === index && (
              <div className="p-5 flex justify-center items-center flex-col">
                <div className="mb-10 mx-auto  w-32 bg-muted-foreground h-1 rounded-full">
                  <motion.div
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(index / images.length) * 100}%` }}
                    className="h-1 bg-primary rounded-full "
                  ></motion.div>
                </div>
                <p className="text-xl font-bold mb-6">{image.text}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
