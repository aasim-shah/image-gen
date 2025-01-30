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

export default function Home() {
  const [imageUrls, setimageUrls] = useState([]);
  console.log({ imageUrls });
  return (
    <main className="min-h-screen bg-[#0D0D0D] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background">
      {/* Hero Section */}
      <div className="mt-32 hidden md:flex">
        <TransparentNavbar />
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-16">
        <div className="space-y-4 text-center pt-16 animate-fade-in">
          <div className="inline-block animate-float">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-30"></div>
              <Sparkles className="w-12 h-12 text-primary relative" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-7xl font-bold text-white">
            Create Beautiful Art With{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
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
            <Button
              size="lg"
              className="bg-primary rounded-2xl hover:bg-primary/90 text-white"
            >
              Start Creating
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1  gap-8">
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

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <Testimonials />

        {/* CTA Section */}
        <div className="relative glass-card rounded-2xl p-8 mt-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Create?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators using our AI to bring their imagination
              to life
            </p>
            <Button
              size="lg"
              className="bg-primary rounded-2xl hover:bg-primary/90 text-white mt-4"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
