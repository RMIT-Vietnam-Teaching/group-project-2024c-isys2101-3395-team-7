import os
import base64
from flask import Flask, request, jsonify, send_file, after_this_request, make_response
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
from pillow_heif import register_heif_opener
from flask_cors import CORS
from pathlib import Path
import io
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

@app.route('/transcribe-audio', methods=['POST'])
@token_required
def transcribe_audio():
    try:
        # Check if an audio file is provided
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided."}), 400

        # Get the uploaded audio file
        audio_file = request.files['audio']

        # Convert the file to a file-like object
        audio_file_content = audio_file.read()
        file_like_audio = io.BytesIO(audio_file_content)
        file_like_audio.name = audio_file.filename  # Add a name attribute for context

        # Call the OpenAI API to transcribe the audio
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=file_like_audio
        )

       # Convert the transcription object to a dictionary (or extract relevant fields)
        transcription_dict = transcription.to_dict() if hasattr(transcription, 'to_dict') else transcription

        # Return the transcription result as JSON
        return jsonify(transcription_dict)

    except Exception as e:
        # Handle exceptions and return error response
        return jsonify({"error": str(e)}), 500

@app.route('/correct-audio', methods=['POST'])
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
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert in Vietnamese spelling, grammar, and pronunciation analysis."},
                {
                    "role": "user",
                    "content": f"""
                    Đoạn văn sau được lấy từ giọng nói: '{input_text}'.
                    Hãy phân tích và:
                    1. Chỉ ra lỗi ngữ pháp hoặc phát âm trong đoạn văn, bao gồm mô tả ngắn gọn tại sao nó sai.
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

        # Parse AI response
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
                    2. Chỉ ra lỗi sai trong câu trả lời của người dùng (nếu có),  bao gồm giải thích ngắn gọn tại sao sai, tập trung vào các lỗi liên quan đến phát âm.
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
    print(origin)
    if origin in allowed_access_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)  
        response.headers.add('Access-Control-Allow-Credentials', 'true')  # Enable credentials support
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    
    return response

@app.route('/generate-speech', methods=['POST'])
@token_required
def generate_speech():
    try:
        # Check if the input text is provided in the request
        input_text = request.json.get('text', None)
        if not input_text:
            return jsonify({"error": "No input text provided."}), 400

        # Optional: Check if a specific voice is provided
        voice = request.json.get('voice', 'alloy')  # Default to 'alloy'

        # Generate the speech using the OpenAI API
        speech_file_path = Path(__file__).parent / "speech.mp3"
        with client.audio.speech.with_streaming_response.create(
            model="tts-1",
            voice=voice,
            input=input_text,
        ) as response:
            response.stream_to_file(speech_file_path)
        
        # # Prepare the speech file for return
        # Schedule file deletion after the response is sent
        # @after_this_request
        # def cleanup_file(response):
        #     try:
        #         if os.path.exists(speech_file_path):
        #             os.remove(speech_file_path)
        #     except Exception as e:
        #         print(f"Error deleting file: {e}")
        #     return response

        return send_file(
            speech_file_path,
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="generated_speech.mp3",
        )

    except Exception as e:
        # Handle exceptions and return an error response
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))  # Use the PORT environment variable if available
    app.run(host="0.0.0.0", port=port, debug=True)  # Bind to 0.0.0.0 for external access
