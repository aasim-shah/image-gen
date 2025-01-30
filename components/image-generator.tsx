"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Wand2, Loader2, Image } from "lucide-react";
// import { uploadToCloudinary } from "@/utils/cloudinary"; // Assuming a utility for Cloudinary upload

export function ImageGenerator({ setimageUrls }: { setimageUrls: any }) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("text2img");

  const [formData, setFormData] = useState({
    prompt: "",
    negativePrompt:
      "bad quality, low resolution, blurry, poor lighting, unrealistic, not realistic",
    initImage: "",
    width: "768",
    height: "768",
    safetyChecker: true,
    strength: 0.6,
    seed: "",
    samples: 3,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setFormData({ ...formData, initImage: uploadedUrl });
      console.log({ uploadedUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setimageUrls([]);
    try {
      const url =
        mode === "text2img"
          ? "https://modelslab.com/api/v6/realtime/text2img"
          : "https://modelslab.com/api/v6/realtime/img2img";

      const body =
        mode === "text2img"
          ? {
              key: process.env.NEXT_PUBLIC_MODELSLAB_API_KEY,
              prompt: formData.prompt,
              negative_prompt: formData.negativePrompt,
              width: formData.width,
              height: formData.height,
              safety_checker: formData.safetyChecker,
              seed: formData.seed ? parseInt(formData.seed) : null,
              samples: formData.samples,
              base64: false,
            }
          : {
              key: process.env.NEXT_PUBLIC_MODELSLAB_API_KEY,
              prompt: formData.prompt,
              negative_prompt: formData.negativePrompt,
              init_image: formData.initImage,
              width: formData.width,
              height: formData.height,
              safety_checker: formData.safetyChecker,
              strength: formData.strength,
              seed: formData.seed ? parseInt(formData.seed) : null,
              samples: formData.samples,
            };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.status === "processing" && data.fetch_result) {
        // Poll the fetch_result URL until status is success
        await pollForCompletion(data.fetch_result);
        setLoading(true);
      } else if (data.status === "success") {
        setimageUrls(data.output);
      } else {
        console.error("Unexpected status:", data.status);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const pollForCompletion = async (fetchUrl: any) => {
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: process.env.NEXT_PUBLIC_MODELSLAB_API_KEY,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setimageUrls(result.output);
        setLoading(false);
      } else if (result.status === "processing") {
        // Retry after the ETA if provided, or default to 2 seconds
        const retryDelay = result.eta ? result.eta * 1000 : 2000;
        setTimeout(() => pollForCompletion(fetchUrl), retryDelay);
      } else {
        console.error(
          "Error fetching image status:",
          result.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error polling fetch URL:", error);
    }
  };

  if (loading) {
    return (
      <Card className="glass-card p-8 space-y-6">
        <div className="space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl p-8 space-y-6">
      <div className="flex justify-between items-center">
        <Label className="font-medium">Mode</Label>
        <Select value={mode} onValueChange={(value) => setMode(value)}>
          <SelectTrigger className="bg-secondary/50 border-0 rounded-2xl">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text2img">Text to Image</SelectItem>
            <SelectItem value="img2img">Image to Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6 animate-slide-up">
        <div className="space-y-2">
          <Textarea
            id="prompt"
            placeholder="Describe what you want to generate..."
            value={formData.prompt}
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, prompt: e.target.value })
            }
            className="rounded-2xl resize-none p-4 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-muted-foreground/50"
          />
        </div>

        <>
          <div className="space-y-2">
            <Textarea
              id="negativePrompt"
              placeholder="Specify elements to avoid..."
              value={formData.negativePrompt}
              rows={2}
              onChange={(e) =>
                setFormData({ ...formData, negativePrompt: e.target.value })
              }
              className="rounded-2xl resize-none p-4 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
            />
          </div>

          {mode === "img2img" && (
            <div className="space-y-4 px-4">
              <Label htmlFor="strength" className="font-medium">
                Strength
              </Label>
              <Slider
                id="strength"
                min={0.1}
                max={1.0}
                step={0.1}
                value={[formData.strength]}
                onValueChange={([value]) =>
                  setFormData({ ...formData, strength: value })
                }
                className="w-full"
              />
              <p className="text-sm text-muted-foreground text-right">
                {formData.strength.toFixed(1)}
              </p>
            </div>
          )}

          <div className="space-y-4 px-4">
            <Label htmlFor="samples" className="font-medium">
              Number of Images
            </Label>
            <div className="pt-2">
              <Slider
                id="samples"
                min={1}
                max={5}
                step={1}
                value={[formData.samples]}
                onValueChange={([value]) =>
                  setFormData({ ...formData, samples: value })
                }
                className="w-full"
              />
            </div>
            <p className="text-sm text-muted-foreground text-right">
              {formData.samples} {formData.samples === 1 ? "image" : "images"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Select
              value={formData.width}
              onValueChange={(value) =>
                setFormData({ ...formData, width: value })
              }
            >
              <SelectTrigger className="bg-secondary/50 border-0 rounded-2xl">
                <SelectValue placeholder="Width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256px</SelectItem>
                <SelectItem value="512">512px</SelectItem>
                <SelectItem value="768">768px</SelectItem>
                <SelectItem value="1024">1024px</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.height}
              onValueChange={(value) =>
                setFormData({ ...formData, height: value })
              }
            >
              <SelectTrigger className="bg-secondary/50 border-0 rounded-2xl">
                <SelectValue placeholder="Height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256px</SelectItem>
                <SelectItem value="512">512px</SelectItem>
                <SelectItem value="768">768px</SelectItem>
                <SelectItem value="1024">1024px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>

        {mode === "img2img" && (
          <div className="space-y-4">
            {formData.initImage && formData.initImage !== "" ? (
              <img
                src={formData.initImage}
                alt="Initial Image"
                width={100}
                height={100}
                className="object-cover rounded-2xl"
              />
            ) : (
              <>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      // setImageFile(e.target.files[0]);
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                  className="bg-secondary/50 border-0 rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/50"
                />
                {/* <Button
                  onClick={handleImageUpload}
                  className="bg-secondary hover:bg-secondary/90 w-full rounded-2xl"
                  disabled={!imageFile}
                >
                  Upload Image
                </Button> */}
              </>
            )}
          </div>
        )}

        <Button
          className="w-full bg-primary rounded-2xl hover:bg-primary/90 text-white group"
          size="lg"
          onClick={handleGenerate}
          disabled={
            !formData.prompt ||
            loading ||
            (mode === "img2img" && !formData.initImage)
          }
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="h-5 w-5" />
            )}
            Generate
          </span>
        </Button>
      </div>
    </Card>
  );
}
