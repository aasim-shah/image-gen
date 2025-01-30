import axios from "axios";

export async function uploadToCloudinary(file) {
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvrt7dgdx/upload";
  const UPLOAD_PRESET = "testinggg";

  try {
    const formData = new FormData();
    formData.append("file", file);
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
