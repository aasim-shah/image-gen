"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { generateImageSrc } from "@/utils/imageSrc";
import { Card } from "./ui/card";

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  containerClasses?: string;
  w?: number;
  h?: number;
  src: string | File;
  classNames?: string;
  alt?: string;
}

export default function MyImage(props: Props) {
  const placeHolderImage = "/a.png";
  const {
    containerClasses = "",
    w = 200,
    h = 200,
    src,
    classNames = "",
    alt = "image",
    ...rest
  } = props;

  const imageSrc = generateImageSrc(src);

  const [image, setImage] = useState(imageSrc);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImage(placeHolderImage);
  };

  return (
    <div className={cn("overflow-hidden", containerClasses)}>
      {isLoading && (
        <Card className="w-full h-full flex justify-center items-center">
          <div className="w-5 h-5 border-4 border-t-transparent border-signature-light border-solid rounded-full animate-spin"></div>
        </Card>
      )}

      <Image
        key={src as any}
        width={w as any}
        height={h as any}
        className={`w-full h-full object-cover ${classNames}`}
        src={src as any}
        alt={alt}
        onLoad={handleLoadingComplete}
        onError={handleError}
        // {...rest}
      />
    </div>
  );
}
