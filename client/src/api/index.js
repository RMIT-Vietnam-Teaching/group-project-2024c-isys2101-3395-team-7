import axios from "./axios";

const options = {
    withCredentials: true
};

export async function recognizeHandwriting(formData) {
	// try {
    //     const res = await axios.post("/recognize-handwriting", formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //         ...options,
    //     });
    // console.log('Form to send: ', formData.getAll('file')[0].name);
    //     return "200";
    // }
    // catch (error) {
    //     console.log(error)
    // }

    // testing response
    // Simulate a response object for UI testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: "This is the recognized text from your uploaded file!",
        errors: [],
      });
    }, 1000);
  });
}

export async function correctRecognizedText(text) {
  	// try {
    //     const res = await axios.post("/correct", text);
    //     return res.data;
    // }
    // catch (error) {
    //     console.log(error)
    // }

    // Simulate a response object for UI testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: "This is the correction of your handwriting text",
        errors: 3,
        comment: "Well done! Almost there!",
      });
    }, 1000);
  });
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