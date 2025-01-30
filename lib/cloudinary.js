import axios from "axios";

export async function uploadToCloudinary(file) {
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvrt7dgdx/upload";
  const UPLOAD_PRESET = "testinggg";

  try {
    // Convert image to .png using a Canvas
    const convertedFile = await convertImageToPng(file);

    const formData = new FormData();
    formData.append("file", convertedFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url; // Return the URL of the uploaded file
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error; // Rethrow to handle it where this function is called
  }
}

// Helper function to convert image to .png
async function convertImageToPng(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const pngFile = new File([blob], "converted.png", {
                type: "image/png",
              });
              resolve(pngFile);
            } else {
              reject(new Error("Failed to convert image to PNG"));
            }
          },
          "image/png",
          1.0 // Quality parameter (not relevant for PNG)
        );
      };
      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
