"use client";

import { Card } from "@/components/ui/card";
import { Wand2, Zap, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Advanced AI Models",
    description:
      "Access state-of-the-art AI models for the highest quality image generation",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate images in seconds with our optimized infrastructure",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your prompts and generated images are kept private and secure",
  },
  {
    icon: Sparkles,
    title: "Endless Possibilities",
    description:
      "Create any style, any scene, any imagination with precise control",
  },
];

export function Features() {
  return (
    <section className="py-16" id="features">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience the next generation of AI image generation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="rounded-2xl glass-card p-6 space-y-4 group hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
