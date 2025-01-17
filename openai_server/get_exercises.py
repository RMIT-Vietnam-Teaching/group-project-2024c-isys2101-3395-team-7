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

@app.route('/get-keywords', methods=['POST'])
@token_required
def get_keywords():
    # Get input data from the request
    data = request.json  # Assuming this is a list of history records
    records = data.get("records", [])

    all_keywords = []  # To store keywords for all comments

    for record in records:
        if "comment" in record:
            comments = record["comment"]
            for comment in comments:
                # Extract the mistake and description for each comment
                mistake = comment.get("mistake", "")
                description = comment.get("description", "")

                # Generate keywords using GPT
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": "You are an expert in Vietnamese spelling, grammar, and pronunciation analysis."},
                        {
                            "role": "user",
                            "content": f"""
                            Extract key keywords from the following Vietnamese text to help find relevant Vietnamese language lessons.
                            Mistake: "{mistake}"
                            Description: "{description}"

                            Return only the most relevant keywords, in English, separated by commas.
                            """
                        }
                    ],
                    temperature=0.0
                )

                # Extract keywords from the response
                keywords = response.choices[0].message.content.strip()
                all_keywords.extend(keywords.split(", "))  # Add keywords to the list

    # Return all keywords as a JSON array
    return jsonify(all_keywords)

@app.route('/get-exercises', methods=['POST'])
@token_required
def get_lessons():
    # Get input data from the request
    data = request.json
    keywords = data.get("keywords", [])
    exercises = data.get("exercises", [])

    # Find relevant lessons based on keywords
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert in recommending relevant Vietnamese language exercises based on keywords."},
            {
                "role": "user",
                "content": f"""
                    The following Vietnamese keywords have been extracted from a Vietnamese language mistake to find exercises: {', '.join(keywords)}.

                    Lessons:
                    {exercises}

                    Match the keywords to the Vietnamese exercises and return the _id of the ten most relevant exercises, return only the _id field in the JSON format with the following structure:
                    "<id number 1>",
                    "<id number 2>",
                    "<id number 3>",
                    "<id number 4>",
                    "<id number 5>",
                    "<id number 6>",
                    "<id number 7>",
                    "<id number 8>",
                    "<id number 9>",
                    "<id number 10>"
                """
            }
        ],
        temperature=0.0,
    )

    # Extract the response text
    relevant_lessons = response.choices[0].message.content.strip()
    return jsonify(relevant_lessons.split("\n"))



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
