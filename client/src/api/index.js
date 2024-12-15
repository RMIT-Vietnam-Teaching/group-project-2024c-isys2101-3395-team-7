import axios from "./axios";

const options = {
  withCredentials: true,
};

// ============== Handwriting ================= //

export async function recognizeHandwriting(formData) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }
    const res = await axios.post(
      "https://viego-api.onrender.com/recognize-handwriting",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }
    const res = await axios.post(
      "https://viego-api.onrender.com/correct",
      {
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export async function uploadImage(image) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// ============== Voice Correction ================= //

export async function uploadAudio(file) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    // Create a FormData object and append the image file
    const formData = new FormData();
    formData.append("audio", file);

    // Send the request with the correct headers
    const res = await axios.post(
      "https://viego-mongo-api.onrender.com/audio/upload",
      formData, // Use FormData as the request body
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// receive formData -> send audio file
export async function recognizeVoice(formData) {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("authToken");
  console.log("token: ", token);
  if (!token) {
    throw new Error("No auth token found in localStorage");
  }

  console.log("Voice recognition in progress...");
  try {
    // Send the request with the correct headers
    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/transcribe-audio",
      formData, // Use FormData as the request body
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/correct-audio",
      {
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/generate-speech",
      {
        text: text,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

// ============== Support Functions ================= //
export async function recordHistory(formData) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://viego-mongo-api.onrender.com/record",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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

export async function addFavourite() {
  // try {
  //     const res = await axios.post("/correct", text);
  //     return res.data;
  // }
  // catch (error) {
  //     console.log(error)
  // }
}

// ============== Authentication ================= //

export async function login(formData) {
  console.log("receive login form: ", formData);
  try {
    const res = await axios.post(
      "https://viego-mongo-api.onrender.com/user/login",
      formData,
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

export async function logout() {
  // try {
  //     const res = await axios.post("/login", text);
  //     return res.data;
  // }
  // catch (error) {
  //     console.log(error)
  // }
  return true;
}

export async function signup(formData) {
  console.log("receive signup form: ", formData);

  try {
    const res = await axios.post(
      "https://viego-mongo-api.onrender.com/user/signup",
      formData,
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

export async function authMember(token) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Sample response data
  const sampleResponse = {
    user: {
      id: 1,
      username: "sampleUser",
      email: "sampleuser@example.com",
      firstName: "first",
      lastName: "user",
      dateOfBirth: "2000-10-10",
    },
    token: "sampleToken1234567890",
  };

  return sampleResponse;
}
