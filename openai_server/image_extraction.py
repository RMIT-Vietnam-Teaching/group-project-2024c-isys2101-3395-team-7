import os
import base64
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
from pillow_heif import register_heif_opener
from flask_cors import CORS
# Import the token_required decorator
from Auth.auth import token_required

load_dotenv(override=True)
register_heif_opener()
frontend_url = os.getenv("FRONTEND_URL")
allowed_access_origins = ['http://localhost:3000', frontend_url]

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
@token_required
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
                    {"type": "text", "text": "The image below contains Vietnamese handwritten text. Please read it, provide only the recognized text as output, keep the raw text as written and do not correct its spelling or grammar : \n\nBase64-encoded image:\n{base64_image}"},
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
@token_required
def correct_text():
    try:
        # Get input text from request
        data = request.json
        input_text = data.get("text")

        if not input_text:
            return jsonify({"error": "No text provided."}), 400

        # Adjust prompt to identify grammar or pronunciation mistakes and correct them
        response = client.chat.completions.create(
            model=MODEL,  # Replace with your specific model if needed
            messages=[
                {"role": "system", "content": "You are an expert in Vietnamese spelling, grammar, and pronunciation analysis."},
                {
                    "role": "user",
                    "content": f"""
                    Đoạn văn sau được lấy từ hình ảnh: '{input_text}'.
                    Hãy phân tích và:
                    1. Chỉ ra lỗi ngữ pháp hoặc chính tả trong đoạn văn, bao gồm mô tả ngắn gọn tại sao nó sai.
                    2. Đưa ra đoạn văn đã được sửa chính xác hoàn toàn.
                    
                    Phản hồi phần chỉ ra lỗi bằng tiếng Anh
                    Trả lời dưới dạng JSON với cấu trúc:
                    {{
                        "errors": [
                            {{
                                "mistake": "<original_text_with_error>",
                                "correction": "<corrected_text>",
                                "description": "<why_it_is_wrong>"
                            }},
                            ...
                        ],
                        "corrected_text": "<text_with_all_corrections_applied>"
                    }}
                    """
                }
            ],
            temperature=0.0,
        )

        ai_response = response.choices[0].message.content.strip()
        usage = response.usage.to_dict()

        # Return the corrected and detailed response
        return jsonify({"result": ai_response, "usage": usage})

    except Exception as e:
        # Handle exceptions
        return jsonify({"error": str(e)}), 500
    
@app.route('/compare-answer', methods=['POST'])
@token_required
def compare_answer():
    try:
        # Get input data from the request
        data = request.json
        user_answer = data.get("answer")
        ref_answer = data.get("ref_answer")


        # Generate feedback by comparing user answer with reference answer
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert in Vietnamese spelling, grammar, and pronunciation analysis."},
                {
                    "role": "user",
                    "content": f"""
                    So sánh hai câu trả lời sau:
                    - Câu trả lời tham chiếu: '{ref_answer}'
                    - Câu trả lời của người dùng: '{user_answer}'
                    
                    Phân tích:
                    1. Mức độ chính xác và tương đồng giữa câu trả lời của người dùng với câu tham chiếu.
                    2. Chỉ ra lỗi sai trong câu trả lời của người dùng (nếu có), bao gồm giải thích ngắn gọn tại sao sai.
                    3. Gợi ý cải thiện.

                    Phản hồi phần chỉ ra lỗi bằng tiếng Anh
                    Trả lời dưới dạng JSON với cấu trúc:
                    {{
                        "similarity_score": <percentage_similarity>,
                        "feedback": [
                            {{
                                "mistake": "<user_mistake>",
                                "correction": "<suggested_correction>",
                                "description": "<explanation>"
                            }},
                            ...
                        ]
                    }}
                    """
                }
            ],
            temperature=0.0,
        )

        # Extract AI response
        feedback = response.choices[0].message.content.strip()
        usage = response.usage.to_dict()

        return jsonify({"feedback": feedback, "usage": usage})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.after_request
def after_request(response):
    # Allow access from a specific origin and include credentials
    origin = request.headers.get('Origin')
    if origin in allowed_access_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)  
        response.headers.add('Access-Control-Allow-Credentials', 'true')  # Enable credentials support
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    
    return response


if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))  # Use the PORT environment variable if available
    app.run(host="0.0.0.0", port=port, debug=True)  # Bind to 0.0.0.0 for external access
