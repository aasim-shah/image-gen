import { baseUrl } from "@/constants";

export const generateImageSrc = (
  src: string | File,
  placeholder: string = "/a.png"
): string => {
  const isFile = (value: any): value is File => {
    return typeof value === "object" && value instanceof File;
  };

  if (!src) {
    return placeholder;
  }

  if (isFile(src)) {
    return URL.createObjectURL(src);
  }

  if (typeof src === "string" && src.startsWith("http")) {
    return src;
  }

  return `${baseUrl}${src}`;
};
