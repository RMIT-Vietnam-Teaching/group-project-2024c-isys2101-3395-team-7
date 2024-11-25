import os
import base64
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image

load_dotenv(override=True)

app = Flask(__name__)

# Load the API key from an environment variable
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
MODEL = "gpt-4o"

def encode_image(image_path):
    """Encode an image file to a Base64 string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
def is_heic_by_extension(file_path):
    _, ext = os.path.splitext(file_path)
    return ext.lower() == ".heic"

@app.route('/recognize-handwriting', methods=['POST'])
def recognize_handwriting():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided."}), 400

        # Save the uploaded image temporarily
        image = request.files['image']
        temp_image_path = f"temp_{image.filename}"
        image.save(temp_image_path)
        if is_heic_by_extension(temp_image_path):
            im = Image.open(temp_image_path)
            im.convert("RGB").save(temp_image_path, "JPEG")

        # Encode the image to Base64
        base64_image = encode_image(temp_image_path)

        # Send the Base64 image to OpenAI API
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

        # Clean up temporary file
        os.remove(temp_image_path)

        # Extract recognized text and usage information
        recognized_text = response.choices[0].message.content.strip()
        usage = response.usage.to_dict()

        return jsonify({"recognized_text": recognized_text, "usage": usage})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
