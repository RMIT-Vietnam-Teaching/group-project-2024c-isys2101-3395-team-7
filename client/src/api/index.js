import axios from "./axios";

const options = {
  withCredentials: true,
};

export async function recognizeHandwriting(formData) {
  try {
    const res = await axios.post(
      "https://viego-api.onrender.com/recognize-handwriting",
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
      "https://viego-api.onrender.com/correct",
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

export async function recordHistory(formData) {
  try {
    const res = await axios.post(
      "https://viego-mongo-api.onrender.com/record",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    console.log("API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}

export async function uploadImage(image) {
  try {
    // Create a FormData object and append the image file
    const formData = new FormData();
    formData.append("hw-image", image);

    // Send the request with the correct headers
    const res = await axios.post(
      "https://viego-mongo-api.onrender.com/image/upload",
      formData, // Use FormData as the request body
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadAudio(file) {
  console.log("Uploading audio file:", file.name);
  // Simulate a successful upload with a delay
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ audioId: 1, message: "Audio uploaded successfully!" }),
      1000
    )
  );
}

// receive formData -> send audio file
export async function recognizeVoice(formData) {
  console.log("Voice recognition in progress...");
  // Send the request with the correct headers
  try {
    // Send the request with the correct headers
    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/transcribe-audio",
      formData, // Use FormData as the request body
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// receive recognized voice's text -> send to ai's voice reading
export async function correctRecognizedTextVoice(text) {
  // console.log("", text);
  try {
    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/correct-audio",
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
    return res.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}

// receive corrected voice's text -> return audio file of ai voice
export async function createAiVoice(text) {
  try {
    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/generate-speech",
      {
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        responseType: "blob",
      }
    );
    // Convert ArrayBuffer to a Blob
    const audioBlob = res.data;
    const audioURL = URL.createObjectURL(audioBlob);
    console.log("API response:", audioURL);
    return audioURL;
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
