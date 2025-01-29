"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { storeImageUrl } from "../app/services/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Wand2, Loader2 } from "lucide-react";

export function ImageGenerator({ setimageUrls }: { setimageUrls: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
    negativePrompt: "",
    width: "512",
    height: "512",
    safetyChecker: true,
    seed: "",
    samples: 1,
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://modelslab.com/api/v6/realtime/text2img",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: process.env.NEXT_PUBLIC_MODELSLAB_API_KEY,
            prompt: formData.prompt,
            negative_prompt: formData.negativePrompt,
            width: formData.width,
            height: formData.height,
            safety_checker: formData.safetyChecker,
            seed: formData.seed ? parseInt(formData.seed) : null,
            samples: formData.samples,
            base64: false,
          }),
        }
      );
      const data = await response.json();
      // Handle the response data here
      console.log({ data });
      setimageUrls(data.output);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="glass-card p-8 space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className=" rounded-2xl p-8 space-y-6">
      <div className="space-y-6 animate-slide-up">
        <div className="space-y-2">
          <Textarea
            id="prompt"
            placeholder="Describe what you want to generate..."
            value={formData.prompt}
            rows={4}
            cols={30}
            onChange={(e) =>
              setFormData({ ...formData, prompt: e.target.value })
            }
            className="rounded-2xl resize-none p-4 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/40  placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="space-y-2">
          <Textarea
            id="negativePrompt"
            placeholder="Specify elements to avoid..."
            value={formData.negativePrompt}
            cols={30}
            rows={2}
            onChange={(e) =>
              setFormData({ ...formData, negativePrompt: e.target.value })
            }
            className="rounded-2xl resize-none p-4 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50  placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 ">
            <Select
              value={formData.width}
              onValueChange={(value) =>
                setFormData({ ...formData, width: value })
              }
            >
              <SelectTrigger className="bg-secondary/50 border-0 rounded-2xl">
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256px</SelectItem>
                <SelectItem value="512">512px</SelectItem>
                <SelectItem value="768">768px</SelectItem>
                <SelectItem value="1024">1024px</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select
              value={formData.height}
              onValueChange={(value) =>
                setFormData({ ...formData, height: value })
              }
            >
              <SelectTrigger className="bg-secondary/50 border-0 rounded-2xl">
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="256">256px</SelectItem>
                <SelectItem value="512">512px</SelectItem>
                <SelectItem value="768">768px</SelectItem>
                <SelectItem value="1024">1024px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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

        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
          <div className="space-y-1">
            <Label htmlFor="safetyChecker" className="font-medium">
              Safety Checker
            </Label>
            <p className="text-sm text-muted-foreground">
              Filter inappropriate content
            </p>
          </div>
          <Switch
            id="safetyChecker"
            checked={formData.safetyChecker}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, safetyChecker: checked })
            }
          />
        </div>

        <div className="space-y-2">
          <Input
            id="seed"
            type="number"
            placeholder="Enter a seed number (optional)"
            value={formData.seed}
            onChange={(e) => setFormData({ ...formData, seed: e.target.value })}
            className="bg-secondary/50 border-0 rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <Button
        className="w-full bg-primary rounded-2xl hover:bg-primary/90 text-white group"
        size="lg"
        onClick={handleGenerate}
        disabled={!formData.prompt || loading}
      >
        <span className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          Generate
        </span>
      </Button>
    </Card>
  );
}
