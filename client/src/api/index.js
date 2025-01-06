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
    return res.data;
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

// Get image/audio file
export async function getImage(imageUrl) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.get(
      `https://viego-mongo-api.onrender.com/image/${imageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: "blob",
      }
    );

    // Convert the Blob into an object URL
    const imageObjectUrl = URL.createObjectURL(res.data);

    console.log("Image Object URL:", imageObjectUrl);

    // Return the object URL
    return imageObjectUrl;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}

// Get image/audio file
export async function getAudio(audioUrl) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.get(
      `https://viego-mongo-api.onrender.com/audio/${audioUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: "blob",
      }
    );

    // Convert the Blob into an object URL
    const audioObjectUrl = URL.createObjectURL(res.data);

    console.log("Audio Object URL:", audioObjectUrl);

    // Return the object URL
    return audioObjectUrl;
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

export async function addFavorite(formData, id) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.patch(
      `https://viego-mongo-api.onrender.com/record/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
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

export async function fetchRecords(username) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.get(
      `https://viego-mongo-api.onrender.com/record/user/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
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

export async function fetchAllExercises() {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.get(
      `https://viego-mongo-api.onrender.com/exercise`,
      {
        headers: {
          "Content-Type": "application/json",
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

export async function authMember(id, token) {
  try {
    const res = await axios.get(
      `https://viego-mongo-api.onrender.com/user/${id}`,
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

export async function checkTokenExpired(id, token) {
  try {
    const res = await axios.post(
      `https://viego-mongo-api.onrender.com/user/token_expired/${id}`,
      { token },
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

// ============== Exercises ================= //

export async function getKeywords(records) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://viego-get-exercises.onrender.com/get-keywords",
      { records },
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

export async function getExercises(keywords, exercises) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://viego-get-exercises.onrender.com/get-exercises",
      { keywords, exercises },
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

export async function addCurrentExercises(id, exercises) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      `https://viego-mongo-api.onrender.com/user/exercises/${id}`,
      exercises,
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

export async function getCurrentExercises(id) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.get(
      `https://viego-mongo-api.onrender.com/user/exercises/${id}`,
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

export async function compareHandwritingAnswer(answer, ref_answer) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://viego-api.onrender.com/compare-answer",
      { answer, ref_answer },
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

export async function compareVoiceAnswer(answer, ref_answer) {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found in localStorage");
    }

    const res = await axios.post(
      "https://group-project-2024c-isys2101-3395-team-7-unfn.onrender.com/compare-answer",
      { answer, ref_answer },
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
