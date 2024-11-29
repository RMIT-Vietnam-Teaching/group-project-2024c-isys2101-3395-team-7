import axios from "./axios";

const options = {
  withCredentials: true,
};

export async function recognizeHandwriting(formData) {
  try {
    const res = await axios.post(
      "/recognize-handwriting",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Ensure this is included if credentials are required
      }
    );

    console.log("API response:", res.data);
    return res.data.recognized_text;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}
export async function correctRecognizedText(text) {
  console.log("correctRecognizedText", text);
  try {
    const res = await axios.post(
      "/correct",
      {
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("API response:", res.data);
    return res.data.corrected_text;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}
export async function addFavourite() {
  // try {
  //     const res = await axios.post("/correct", text);
  //     return res.data;
  // }
  // catch (error) {
  //     console.log(error)
  // }
}
