import axios from "axios";

export const fetchImageUrls = async () => {
  try {
    const response = await axios.get("/api/getImages");
    return response.data;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    throw new Error("Error fetching image URLs");
  }
};

export const storeImageUrl = async (imageUrl) => {
  try {
    const response = await fetch("/api/store-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    console.log("Server response:", data);
  } catch (error) {
    console.error("Error storing image URL:", error);
    throw new Error("Error storing image URL");
  }
};
