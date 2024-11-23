import os
import base64
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

# Load the API key from environment variables
load_dotenv(override=True)

api_key = os.getenv("OPENAI_API_KEY")
MODEL = "gpt-4o"
client = OpenAI(api_key=api_key)

# Function to resize and compress the image
def resize_and_compress_image(image):
    MAX_WIDTH = 128 
    MAX_HEIGHT = 128
    image.thumbnail((MAX_WIDTH, MAX_HEIGHT))
    
    img_byte_arr = BytesIO()
    image.save(img_byte_arr, format='JPEG')  # Save as JPEG with reduced quality
    img_byte_arr.seek(0)
    return base64.b64encode(img_byte_arr.read()).decode("utf-8")

# Create Flask app
app = Flask(__name__)

@app.route('/extract', methods=['POST'])
def extract_text_from_image():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        # Get the uploaded image
        image_file = request.files['image']

        # Open the image with Pillow (PIL)
        image = Image.open(image_file)

        # Resize and compress image
        base64_image = resize_and_compress_image(image)

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are an expert in recognizing Vietnamese handwritten text."},
                {"role": "user", "content": f"The image below contains Vietnamese handwritten text. Please read it and provide only the recognized text as output: \n\nBase64-encoded image:\n{base64_image}"}
            ],
            temperature=0.0,
        )

        recognized_text = response.choices[0].message.content.strip()
        usage = response.usage.to_dict()

        return jsonify({"recognized_text": recognized_text, "usage": usage})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
