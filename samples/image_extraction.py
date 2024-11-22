from openai import OpenAI
import os
import base64
from dotenv import load_dotenv

# Load the API key from an environment variable
load_dotenv(override=True)

api_key = os.getenv("OPENAI_API_KEY")


## Set the API key and model name
MODEL="gpt-4o"

client = OpenAI(api_key=api_key)

# Define the image URL
IMAGE_PATH = "test12.jpg"  # Replace with the actual URL

# Open the image file and encode it as a base64 string
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

base64_image = encode_image(IMAGE_PATH)

response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "You are an expert in recognizing Vietnamese handwritten text."},
        {"role": "user", "content": [
            {"type": "text", "text": "The image below contains Vietnamese handwritten text. Please read it, provide only the recognized text as output: \n\nBase64-encoded image:\n{base64_image}"},
            {"type": "image_url", "image_url": {
                "url": f"data:image/png;base64,{base64_image}"}
            }
        ]}
    ],
    temperature=0.0,
)
usage = response.usage
print(usage)

print(response.choices[0].message.content)