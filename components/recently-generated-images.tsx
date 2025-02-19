import { useEffect, useState } from "react";
import MyImage from "@/components/MyImage";
import { Card } from "@/components/ui/card";

interface RecentlyGeneratedImagesProps {
  imageUrls: string[];
}

const RecentlyGeneratedImages: React.FC<RecentlyGeneratedImagesProps> = ({
  imageUrls,
}) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(
      localStorage.getItem("generatedImages") || "[]"
    );
    setImages(storedImages);
  }, [imageUrls]);

  return (
    <>
      {images.length > 0 ? (
        <h1 className="text-lg my-4">Recently Generated Images</h1>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0
          ? images.slice(0, 4).map((imageSrc, index) => (
              <Card key={index} className="rounded-2xl overflow-hidden">
                <MyImage
                  src={imageSrc}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                  containerClasses="w-full h-60 rounded-2xl"
                />
              </Card>
            ))
          : ""}
      </div>
    </>
  );
};

export default RecentlyGeneratedImages;
