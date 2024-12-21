export function extractText(response, content) {
  // Step 1: Get the `result` string and remove triple backticks
  const rawResult = response.result;
  const jsonString = rawResult
    .replace(/```json\n|```/g, "")
    .split("\n\n")[0]
    .trim();

  // Step 2: Parse the JSON string
  try {
    const parsedData = JSON.parse(jsonString);
    switch (content) {
      case "corrected_text":
        return parsedData.corrected_text;
      case "errors":
        return parsedData.errors;
      default:
        return null;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
