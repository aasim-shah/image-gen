"use client";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import useApi from "@/hooks/useApi";
import { getInspirations } from "@/lib/api/laravelServer";

export default function Inspirations() {
  const tabData = ["All", "Recently Generated", "Favorites"];
  const [selectedTab, setSelectedTab] = useState(tabData[0] || "");
  const [images, setImages] = useState([]);

  const { data: response, error, loading, execute } = useApi(getInspirations);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (response && response.inspiration) {
      setImages(response.inspiration);
    }
  }, [response, selectedTab, images]);
  console.log({ selectedTab });

  return (
    <div className="my-5 w-10/12 mx-auto max-w-[1200px]">
      {/* <div className="">
        <Tabs
          tabData={tabData}
          selectedTab={selectedTab}
          handleTabClick={setSelectedTab}
        />
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 my-10  lg:grid-cols-3 gap-4 p-4  ">
        {images &&
          images.length > 0 &&
          images.map((item: any, index: number) => (
            <ImageCard
              key={index}
              imageSrc={item.imageurl}
              prompt={item.prompt}
            />
          ))}
      </div>
    </div>
  );
}
