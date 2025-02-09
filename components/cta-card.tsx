"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { MathUtils } from "three";
import { Card } from "./ui/card";

const FloatingParticles = () => {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.1; // Slow rotation for dynamic movement
    }
  });

  // Increase the spread so particles exceed the card bounds
  const particles = Array.from({ length: 2000 }, () => [
    MathUtils.randFloatSpread(15), // Increased X-axis spread (beyond card width)
    MathUtils.randFloatSpread(10), // Increased Y-axis spread (beyond card height)
    MathUtils.randFloatSpread(12), // Increased Z-axis spread
  ]);

  return (
    <group ref={ref}>
      <Points positions={new Float32Array(particles.flat())}>
        <PointMaterial
          size={0.04}
          color="#7869F6" // Neon cyan
          transparent
          opacity={0.7}
        />
      </Points>
    </group>
  );
};

const FuturisticCTA = () => {
  return (
    <Card className="relative glass-card rounded-2xl w-full h-72 flex flex-col lg:flex-row-reverse justify-evenly items-center overflow-hidden">
      <div className="lg:w-5/12 hidden lg:flex h-56">
        {/* The canvas now takes up the whole space */}
        <Canvas className="w-full-full" camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 5]} intensity={1.2} />
          <FloatingParticles />
        </Canvas>
      </div>

      {/* Content inside the card */}
      <div className=" z-10 flex justify-evenly items-center text-center space-y-4 lg:w-5/12 h-full p-8">
        <div className="">
          <h2 className="text-3xl ">Ready to Create?</h2>
          <p className=" mt-3 text-sm max-w-2xl mx-auto text-muted-foreground">
            Join thousands of creators using AI to bring their imagination to
            life.
          </p>
          <button className="bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90  mt-4 px-6 py-3 shadow-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </Card>
  );
};

export default FuturisticCTA;
