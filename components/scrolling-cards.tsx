// "use client";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function ScrollingCards() {
//   const images = [
//     {
//       src: "/a.png",
//       title: "Text to Image",
//       text: "Ignite your creative spark with Imagine AI Image Generator. Describe your vision with words, and watch the powerful tool translate them into captivating artwork. Catalyze a flurry of ideas and conquer creative roadblocks.",
//     },
//     {
//       src: "/b.png",
//       title: "Real Time Generation",
//       text: "Witness your ideas blended with Imagine AI Image Generator as Real-Time Generation lets you sketch and see your creation come to life before your eyes. Refine as you go for a seamless experience..",
//     },
//     {
//       src: "/c.jpg",
//       title: "Ideate",
//       text: "Imagine AI Image Generator brings you Ideate that empowers you to paint with an intelligent brush. Simply describe elements, watch them appear instantly, and refine your artwork for an intuitive creative experience",
//     },
//     {
//       src: "/d.png",
//       title: "Text to Image",
//       text: "Ignite your creative spark with Imagine AI Image Generator. Describe your vision with words, and watch the powerful tool translate them into captivating artwork. Catalyze a flurry of ideas and conquer creative roadblocks.",
//     },
//     {
//       src: "/e.jpg",
//       title: "Real Time Generation",
//       text: "Witness your ideas blended with Imagine AI Image Generator as Real-Time Generation lets you sketch and see your creation come to life before your eyes. Refine as you go for a seamless experience..",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, clientHeight } = container;
//       const slideIndex = Math.floor(scrollTop / clientHeight);
//       setCurrentSlide(slideIndex);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full hidden md:flex flex-col  h-[56vh] overflow-y-scroll scrollbar-hide"
//     >
//       {images.slice(0, 5).map((image, index) => (
//         <div
//           key={index}
//           className={`w-full h-full rounded-2xl  flex items-center sticky top-${
//             index % 2 === 0 ? index : index + 1
//           } justify-center`}
//         >
//           <div className="w-1/2 flex items-center rounded-2xl justify-center">
//             <div className="h-92 rounded-2xl w-10/12 mx-auto">
//               <Image
//                 src={image.src}
//                 alt={`Image ${index + 1}`}
//                 width={500}
//                 height={500}
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             </div>
//           </div>
//           <div className="w-1/2 text-left">
//             {currentSlide === index && (
//               <div className="px-10 flex  flex-col">
//                 <p className="text-xl font-bold mb-6">{image.title}</p>
//                 <p className="text-sm mb-6 text-muted-foreground">
//                   {image.text}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Text to Image",
    description:
      "Transform your imagination into stunning visuals. Our AI understands your creative vision and brings it to life with exceptional detail and artistic flair.",
    image: "a.png",
  },
  {
    id: 2,
    title: "Image to Image",
    description:
      "Take inspiration from existing images and transform them into something entirely new. Perfect for creating variations or exploring different artistic styles.",
    image: "b.png",
  },
  {
    id: 3,
    title: "Inpainting & Outpainting",
    description:
      "Seamlessly edit, extend, or modify parts of your images. Add new elements or expand the canvas while maintaining perfect consistency.",
    image: "c.jpg",
  },
  {
    id: 4,
    title: "Image to Image",
    description:
      "Take inspiration from existing images and transform them into something entirely new. Perfect for creating variations or exploring different artistic styles.",
    image: "b.png",
  },
];

export default function ImageSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const section = Math.floor(latest * slides.length * 0.8);
      if (section !== activeIndex && section < slides.length) {
        setActiveIndex(section);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  const translateYValues = slides.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(
      scrollYProgress,
      [
        index / slides.length - 0.1,
        index / slides.length + 0.2,
        (index + 1) / slides.length + 0.1,
      ],
      ["100%", "0%", "0%"]
    )
  );

  return (
    <div ref={containerRef} className="relative w-10/12 mx-auto h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center ">
        <div className="w-full  h-full flex">
          {/* Left Side - Image */}
          <div className="w-1/2 h-full relative flex justify-center items-center">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                style={{
                  y: translateYValues[index],
                  zIndex: index, // Ensures stacking order
                }}
                className="absolute w-3/4 lg:h-[22rem]"
              >
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-xl" />
              </motion.div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="w-1/2 h-full flex items-center justify-center p-12">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[activeIndex].title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <motion.div
                    className="h-1  rounded-full w-12"
                    layoutId="underline"
                  />
                  <h2 className="lg:text-xl lg:font-bold  tracking-tight">
                    {slides[activeIndex].title}
                  </h2>
                  <p className="text-sm  text-muted-foreground  leading-relaxed">
                    {slides[activeIndex].description?.toString().slice(0, 100)}{" "}
                    ...
                  </p>
                  <Button className=" px-5 text-sm font-normal  rounded-full lg:px-8">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === activeIndex ? "bg-primary" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
