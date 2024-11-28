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
        text: "This is the correction of your handwriting text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. This is the correction of your handwriting text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. This is the correction of your handwriting text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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