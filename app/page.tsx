"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Wand2, Sparkles, Code, Zap, Shield } from "lucide-react";
import { ImageGenerator } from "@/components/image-generator";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import Image from "next/image";
import { useState } from "react";
import TransparentNavbar from "@/components/navbar";
import InfiniteScrollGallery from "@/components/image-scroll";
import FancyCTA from "@/components/cta-card";
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

export default function Home() {
  const [imageUrls, setimageUrls] = useState([]);
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

  return (
    <main className="min-h-screen relative ">
      {/* Hero Section */}
      <div className=" hidden md:flex">
        <TransparentNavbar />
      </div>

      <div className="absolute top-29 left-0 w-full h-96">
        <Canvas className="w-full-full" camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 5]} intensity={1.2} />
          <FloatingParticles />
        </Canvas>
      </div>

      <div className=" relative mt-32 mx-auto p-6 space-y-16">
        <div className="flex flex-col w-full  gap-0 opacity-80 blur-sm  z-30">
          <InfiniteScrollGallery images={images} speed={30} isReverse={true} />
          <InfiniteScrollGallery images={images} speed={60} isReverse={false} />
          <InfiniteScrollGallery images={images} speed={30} isReverse={true} />
        </div>
        <div className="space-y-4 backdrop:blur-lg lg:left-[20%] absolute text-center top-20  animate-fade-in">
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
          <p
            id="home"
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Transform your ideas into stunning images using advanced AI
            technology
          </p>
          <div className="pt-4">
            <Link
              href="#generateImage"
              className="bg-primary rounded-2xl py-2 px-4 hover:bg-primary/"
            >
              Start Creating
            </Link>
          </div>
        </div>

        <section id="generateImage" className="w-full mx-auto max-w-8xl">
          {/* Main Content */}
          <div className="grid grid-cols-1 w-10/12 mx-auto  gap-8">
            <div className="transition-all duration-300">
              <ImageGenerator setimageUrls={setimageUrls} />
            </div>
            <div className="grid grid-cols-2  gap-4 stagger-animation">
              {imageUrls.length > 0 &&
                imageUrls.map((i: string) => (
                  <Card
                    key={i}
                    className=" w-full lg:w-72 rounded-2xl glass-card flex items-center justify-center group hover:border-primary/50 transition-all duration-300"
                  >
                    {/* <ImageIcon className="h-8 w-8 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" /> */}
                    <Image
                      src={i}
                      alt="Generated Image"
                      width={300}
                      height={400}
                      className="object-cover rounded-2xl"
                    />
                  </Card>
                ))}
            </div>
          </div>

          <div className="my-20  lg:pl-32 ">
            {/* <ScrollTriggerSlider /> */}
            <ScrollingCards />
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
