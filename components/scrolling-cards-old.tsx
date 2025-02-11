// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const images = [
//   { src: "/a.png", text: "This is the first image description." },
//   { src: "/b.png", text: "This is the second image description." },
//   { src: "/c.jpg", text: "This is the third image description." },
//   { src: "/d.png", text: "This is the fourth image description." },
// ];

// function useScrollProgress(sectionCount: number) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = (event: WheelEvent) => {
//       event.preventDefault();
//       const delta = event.deltaY;
//       setProgress((prev) => Math.min(Math.max(prev + delta * 0.001, 0), 1));
//     };
//     window.addEventListener("wheel", handleScroll, { passive: false });
//     return () => window.removeEventListener("wheel", handleScroll);
//   }, []);

//   return Math.floor(progress * (sectionCount - 1));
// }

// export default function ScrollTriggerSlider() {
//   const index = useScrollProgress(images.length);

//   return (
//     <div className="">
//       <div className="w-full flex items-center justify-center">
//         <motion.div
//           key={index}
//           className="w-full flex items-center justify-center space-x-10 px-10"
//         >
//           <motion.div
//             className="w-1/2   flex items-center justify-center"
//             initial={{ opacity: 0, y: 300 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//           >
//             <div className="h-32 w-full">
//               <Image
//                 src={images[index].src}
//                 alt={`Image ${index}`}
//                 width={500}
//                 height={500}
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             </div>
//           </motion.div>
//           <motion.div
//             className="w-1/2 text-left"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
//           >
//             <h2 className="text-5xl font-bold mb-6">{images[index].text}</h2>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function ScrollTriggerSlider() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const newIndex = Math.floor(self.progress * (images.length - 1));
          setIndex(newIndex);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[120vh] ">
      <div className="sticky top-35 h-screen flex items-center justify-center">
        <motion.div
          key={index}
          className="w-full flex items-center justify-center space-x-10 px-10"
        >
          <motion.div
            className="w-1/2 lg:h-[60vh] h-[30vh] flex items-center justify-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={images[index].src}
              alt={`Image ${index}`}
              width={500}
              height={500}
              className="object-cover h-full w-full rounded-2xl"
            />
          </motion.div>
          <motion.div
            className="w-1/2  text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="mb-10 mx-auto  w-32 bg-muted-foreground h-1 rounded-full">
              <motion.div
                transition={{ duration: 0.5, ease: "easeInOut" }}
                initial={{ width: 0 }}
                animate={{ width: `${(index / images.length) * 100}%` }}
                className="h-1 bg-primary rounded-full "
              ></motion.div>
            </div>
            <h2 className="lg:text-5xl font-bold mb-6">{images[index].text}</h2>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
