// Import necessary modules
import React, { useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchAIModels, selectModel } from "@/app/store/features/aiModels";

export interface AIModel {
  id: number;
  model_id: string;
  name: string;
  short_desc: string;
  created_at: string;
  image: string;
  premium: boolean;
  ios_premium: boolean;
  popular: boolean;
  default: boolean;
  prompt_engineering: string | null;
  ad_type: string;
  delay: number;
  api_key: string;
  api_url: string;
  queue_url: string | null;
  api_key_location: string;
  provider: {
    samples: number;
    num_inference_steps: number;
    safety_checker: boolean;
    safety_checker_type: string;
    tomesd: string;
    use_karras_sigmas: string;
    multi_lingual: string;
    panorama: string;
    self_attention: string;
    upscale: number;
    clip_skip: number;
    highres_fix: string;
  };
  parameters: {
    prompt: string;
    negative_prompt: string;
    cfg_scale: string;
    aspect_ratio: string | null;
    width: string;
    height: string;
    model_id: string;
  };
}

const AIModels = () => {
  const dispatch: AppDispatch = useDispatch();

  const models = useSelector(
    (state: RootState) => state.models.models
  ) as AIModel[];

  const selectedModel = useSelector(
    (state: RootState) => state.models.selectedModel
  ) as AIModel;

  useEffect(() => {
    dispatch(fetchAIModels());
  }, [dispatch]);

  const handleModelClick = (model: AIModel) => {
    console.log("Model clicked:", model.name);
    dispatch(selectModel(model.id));
  };

  return (
    <div className="flex flex-row justify-between  items-center gap-5  w-full overflow-x-auto  scrollbar-hide p-3">
      {models &&
        models.length > 0 &&
        models.map((model: AIModel) => (
          <div
            key={model.id}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div
              onClick={() => handleModelClick(model)}
              className="cursor-pointer w-20 h-20 rounded-full"
            >
              <Image
                src={model.image}
                alt={model.name}
                width={400} // Set fixed size or use responsive sizes
                height={400}
                className={`w-full h-full rounded-full ${
                  selectedModel?.id === model.id
                    ? "border-4 border-primary"
                    : ""
                }`}
              />
            </div>
            <p className="text-xs text-muted-foreground">{model.name}</p>
          </div>
        ))}
    </div>
  );
};

export default AIModels;
