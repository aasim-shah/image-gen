// components/ImageCard.tsx
import MyImage from "@/components/MyImage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CiHeart } from "react-icons/ci";
import { FaEyeDropper } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

interface ImageCardProps {
  imageSrc: string;
  prompt: string;
  //   user: {
  //     name: string;
  //     avatar: string;
  //   };
  //   views: number;
  //   likes: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageSrc,
  prompt,
  //   user,
  //   views,
  //   likes,
}) => {
  return (
    <div className="flex flex-col relative group space-y-3">
      <Card className="rounded-2xl overflow-hidden relative">
        {/* Hover Overlay */}
        <div className="hidden group-hover:flex flex-wrap p-4 text-xs h-full w-full bg-black/70  absolute inset-0 transition-opacity duration-300 ease-in-out overflow-auto scrollbar-hide rounded-2xl">
          Prompt : {prompt}
        </div>

        <MyImage
          src={imageSrc}
          alt="image"
          className="w-full  h-full object-cover rounded-2xl"
          containerClasses="w-full h-96 rounded-2xl"
        />
      </Card>
      {/* <div className="flex w-11/12 mx-auto  flex-row">
        <MyImage
          src={user.avatar}
          alt="avatar"
          className="w-10 h-10 object-cover rounded-full"
          containerClasses="w-10 h-10 rounded-full"
        />
        <div className="flex flex-row  w-full justify-between items-center ml-3">
          <p className="text-sm font-medium">{user.name}</p>
          <div className="flex flex-row gap-3">
            <span className="flex gap-2 items-center">
              <CiHeart size={20} />
              <small className="text-muted-foreground">{likes}</small>
            </span>
            <span className="flex  gap-2 items-center">
              <IoEyeOutline size={20} />
              <small className="text-muted-foreground">{views}</small>
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ImageCard;
