import os
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

app = Flask(__name__)

# Load the API key from an environment variable
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)
MODEL = "gpt-4o"

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
    app.run(debug=True)
