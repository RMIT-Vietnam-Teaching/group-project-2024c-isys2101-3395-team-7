import os
import base64
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
from pillow_heif import register_heif_opener
from flask_cors import CORS

load_dotenv(override=True)
register_heif_opener()

app = Flask(__name__)
CORS(app)

# Load the API key from an environment variable
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) 
MODEL = "gpt-4o"

def encode_image(image_path):
    """Encode an image file to a Base64 string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
def is_valid(file_path):
    _, ext = os.path.splitext(file_path)
    return ext.lower() not in ['.png', '.jpeg', '.gif', '.webp']

@app.route('/recognize-handwriting', methods=['POST'])
def recognize_handwriting():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided."}), 400

        # Save the uploaded image temporarily
        image = request.files['image']
        temp_image_path = f"temp_{image.filename}"
        image.save(temp_image_path)
        
        if is_valid(temp_image_path):
            image = Image.open(temp_image_path)
            image.convert("RGB").save(temp_image_path, "jpeg")

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
    
@app.route('/correct', methods=['POST'])
def correct_text():
    try:
        data = request.json
        input_text = data.get("text")

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are an expert in Vietnamese spelling and grammar."},
                {"role": "user", "content": f"Sửa ngữ pháp hoặc chính tả: '{input_text}' return only corrected text."}
            ],
            temperature=0.0,
        )

        corrected_text = response.choices[0].message.content.strip()
        usage = response.usage.to_dict()

        return jsonify({"corrected_text": corrected_text, "usage": usage})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))  # Use the PORT environment variable if available
    app.run(host="0.0.0.0", port=port, debug=True)  # Bind to 0.0.0.0 for external access
