"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollingCards() {
  const images = [
    {
      src: "/a.png",
      title: "Text to Image",
      text: "Ignite your creative spark with Imagine AI Image Generator. Describe your vision with words, and watch the powerful tool translate them into captivating artwork. Catalyze a flurry of ideas and conquer creative roadblocks.",
    },
    {
      src: "/b.png",
      title: "Real Time Generation",
      text: "Witness your ideas blended with Imagine AI Image Generator as Real-Time Generation lets you sketch and see your creation come to life before your eyes. Refine as you go for a seamless experience..",
    },
    {
      src: "/c.jpg",
      title: "Ideate",
      text: "Imagine AI Image Generator brings you Ideate that empowers you to paint with an intelligent brush. Simply describe elements, watch them appear instantly, and refine your artwork for an intuitive creative experience",
    },
    {
      src: "/d.png",
      title: "Text to Image",
      text: "Ignite your creative spark with Imagine AI Image Generator. Describe your vision with words, and watch the powerful tool translate them into captivating artwork. Catalyze a flurry of ideas and conquer creative roadblocks.",
    },
    {
      src: "/e.jpg",
      title: "Real Time Generation",
      text: "Witness your ideas blended with Imagine AI Image Generator as Real-Time Generation lets you sketch and see your creation come to life before your eyes. Refine as you go for a seamless experience..",
    },
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
      className="w-full flex-col h-[50vh] overflow-y-scroll scrollbar-hide"
    >
      {images.slice(0, 5).map((image, index) => (
        <div
          key={index}
          className={`w-full h-full  flex items-center sticky top-${
            index % 2 === 0 ? index : index + 1
          } justify-center`}
        >
          <div className="w-1/2 flex items-center justify-center">
            <div className="h-92 rounded-2xl w-10/12 mx-auto">
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
              <div className="px-10 flex  flex-col">
                {/* <div className="mb-10 w-32 bg-muted-foreground h-1 rounded-full">
                  <motion.div
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(index / images.length) * 100}%` }}
                    className="h-1 bg-primary rounded-full "
                  ></motion.div>
                </div> */}
                <p className="text-xl font-bold mb-6">{image.title}</p>
                <p className="text-sm mb-6 text-muted-foreground">
                  {image.text}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
