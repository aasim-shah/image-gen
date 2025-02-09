"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DownloadSection = () => {
  return (
    <Card className="rounded-xl  my-10">
      <div className="grid lg:grid-cols-2 grid-col-1 items-center justify-center">
        <div className="col-span-1 ">
          <Image
            src="/download.png"
            className="w-full h-full rounded-xl"
            alt="App Preview"
            width={400}
            height={400}
          />
        </div>
        <div className="col-span-1 p-4 lg:p-0">
          <div className="flex flex-col space-y-10 justify-center items-center">
            <p className="lg:text-2xl text-lg font-bold text-center">
              Download our app to get started with your journey.
            </p>
            <div className="flex flex-row gap-4 items-center justify-center ">
              <Image
                src="/Ios.svg"
                alt="App Store Badge"
                width={130}
                height={60}
              />
              <Image
                src="/Android.svg"
                alt="Play Store Badge"
                width={130}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>{" "}
    </Card>
  );
};

export default DownloadSection;
