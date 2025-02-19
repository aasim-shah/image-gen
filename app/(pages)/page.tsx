"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  Wand2,
  Sparkles,
  Code,
  Zap,
  Shield,
  Images,
} from "lucide-react";
import { ImageGenerator } from "@/components/image-generator";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import Image from "next/image";
import { useEffect, useState } from "react";
import TransparentNavbar from "@/components/navbar";
import InfiniteScrollGallery from "@/components/image-scroll";
import { saveAs } from "file-saver";
import { FaHeart } from "react-icons/fa6";

import FancyCTA from "@/components/cta-card";
import { Heart, Download } from "lucide-react"; // Ensure you have these icons installed

import FuturisticCTA from "@/components/cta-card";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { MathUtils } from "three";
import WhatsAppButton from "@/components/dragable-button";
import DownloadAppSection from "@/components/download-app";
import DownloadSection from "@/components/download-app";
import Link from "next/link";
import ScrollingCards from "@/components/scrolling-cards";
import RecentlyGeneratedImages from "@/components/recently-generated-images";

export default function Home() {
  const [imageUrls, setimageUrls] = useState([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const images: string[] = [
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    "/a.png",
    "/b.png",
    "/c.jpg",
    "/d.png",
    "/e.jpg",
    "/f.png",
    "/g.png",
    // Add more URLs here...
  ];

  const imagesForScroll = [
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

  const FloatingParticles = () => {
    const ref = useRef<any>();

    useFrame(({ clock }) => {
      if (ref.current) {
        ref.current.rotation.y = clock.elapsedTime * 0.03; // Slow rotation for dynamic movement
      }
    });

    // Increase the spread so particles exceed the card bounds
    const particles = Array.from({ length: 1000 }, () => [
      MathUtils.randFloatSpread(15), // Increased X-axis spread (beyond card width)
      MathUtils.randFloatSpread(10), // Increased Y-axis spread (beyond card height)
      MathUtils.randFloatSpread(12), // Increased Z-axis spread
    ]);

    return (
      <group ref={ref}>
        <Points positions={new Float32Array(particles.flat())}>
          <PointMaterial
            size={0.034}
            color="#00FFFF" // Neon cyan
            transparent
            opacity={0.7}
          />
        </Points>
      </group>
    );
  };

  // Function to handle downloading an image
  const download = (url: string) => {
    saveAs(url, "image.jpg");
  };

  // Function to toggle favorite state
  const toggleFavorite = (url: string) => {
    setFavorites((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.log("no container");
      return;
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      console.log({ scrollTop, clientHeight });
      const slideIndex = Math.floor(scrollTop / clientHeight);
      console.log({ slideIndex });
      setCurrentSlide(slideIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}

      <div className="absolute top-29 left-0 w-full h-96">
        <Canvas className="w-full-full" camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 5]} intensity={1.2} />
          <FloatingParticles />
        </Canvas>
      </div>

      <div className=" relative  mx-auto p-6 space-y-16">
        <div className="flex flex-col w-full  gap-0 opacity-50 blur-sm  z-30">
          <InfiniteScrollGallery images={images} speed={30} isReverse={true} />
          <InfiniteScrollGallery images={images} speed={60} isReverse={false} />
          <InfiniteScrollGallery images={images} speed={30} isReverse={true} />
        </div>
        <div className="space-y-4  lg:left-[20%] absolute text-center top-20 py-10 animate-fade  bg-gradient-radial from-black via-transparent to-transparent  bg-center">
          <div className="inline-block animate-float">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-30"></div>
              <Sparkles className="w-12 h-12 text-primary relative" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-7xl font-">
            Create Beautiful Art With{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
              <br />
              PixArt
            </span>
          </h1>
          <p id="home" className=" text-lg max-w-2xl mx-auto">
            Transform your ideas into stunning images using advanced AI
            technology
          </p>
          <div className="pt-4">
            <Link
              href="/inspirations"
              className="bg-primary text-sm rounded-2xl py-3 px-6 hover:bg-primary/90"
            >
              Inspirations
            </Link>
          </div>
        </div>

        <section id="generateImage" className="w-full mx-auto max-w-8xl">
          {/* Main Content */}
          <div className="grid grid-cols-1 w-10/12 mx-auto  gap-8">
            <div className="transition-all duration-300">
              <ImageGenerator setimageUrls={setimageUrls} />
              {/* <GenerateImage /> */}
            </div>
            <div className="grid grid-cols-2 gap-4 stagger-animation">
              {imageUrls.length > 0 &&
                imageUrls.map((i: string) => (
                  <Card
                    key={i}
                    className="relative w-full lg:w-96 rounded-2xl glass-card flex items-center justify-center group hover:border-primary/50 transition-all duration-300"
                  >
                    {/* Icon container positioned at top-right */}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      {/* check if favoirite then fill it with primary colour else outline */}
                      <Button
                        onClick={() => toggleFavorite(i)}
                        className="bg-secondary p-2 rounded-full h-8 w-8 m-0 hover:bg-secondary/50 transition-colors"
                      >
                        {favorites.includes(i) ? (
                          <FaHeart className={`h-5 w-5 text-primary`} />
                        ) : (
                          <Heart className={`h-5 w-5 `} />
                        )}
                      </Button>
                      <Download
                        // onClick={() => handleDownload(i)}
                        onClick={() => download(i)}
                        className="bg-secondary p-2 rounded-full h-8 w-8 m-0 hover:bg-secondary/50 transition-colors"
                      />
                    </div>
                    <Image
                      src={i}
                      alt="Generated Image"
                      width={300}
                      height={400}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </Card>
                ))}
            </div>
          </div>

          <div className="my-20  mx-auto w-10/12  ">
            {/* <ScrollTriggerSlider /> */}
            <RecentlyGeneratedImages imageUrls={imageUrls} />
          </div>

          <div ref={containerRef} className="my-20 relative  lg:pl-20 ">
            {/* <ScrollingCards /> */}
            {/* <div className="scroll-element">hhhh</div> */}

            {imagesForScroll.map((image, index) => (
              <div
                key={index}
                className={`w-full h-full rounded-2xl  sticky top-36 flex items-center justify-center`}
              >
                <div className="w-1/2 flex items-center rounded-2xl justify-center">
                  <div className="h-[23rem] rounded-2xl w-10/12 mx-auto">
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

          <section className="w-10/12 mx-auto max-w-6xl">
            {/* Features Section */}
            <Features />

            {/* Images gallary */}
            <div className="flex flex-col">
              <InfiniteScrollGallery
                images={images}
                speed={60}
                isReverse={true}
              />
              <InfiniteScrollGallery
                images={images}
                speed={60}
                isReverse={false}
              />
            </div>

            {/* Testimonials Section */}
            <Testimonials />

            {/* downlaod app */}
            <DownloadSection />

            {/* CTA Section */}
            <FuturisticCTA />
          </section>
        </section>
      </div>
      <WhatsAppButton
        phoneNumber="923001234567"
        message="Hi, I'm interested!"
      />
    </main>
  );
}
