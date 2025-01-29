"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Digital Artist",
    content:
      "The quality of images generated is incredible. It's become an essential part of my creative workflow.",
    avatar: "AC",
  },
  {
    name: "Sarah Miller",
    role: "Game Developer",
    content:
      "Fast, reliable, and the results are consistently amazing. Best AI image generator I've used.",
    avatar: "SM",
  },
  {
    name: "David Park",
    role: "UI Designer",
    content:
      "The control over the generation process is fantastic. It helps me iterate on designs quickly.",
    avatar: "DP",
  },
];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied creators using our platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-animation">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="glass-card p-6 space-y-4 rounded-2xl">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {testimonial.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">{testimonial.content}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
