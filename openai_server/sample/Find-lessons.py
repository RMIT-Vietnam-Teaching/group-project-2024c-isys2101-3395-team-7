
from pathlib import Path
from openai import OpenAI

api_key = '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'
client = OpenAI(api_key=api_key)

def extract_keywords(error_response):
    mistake = error_response["errors"][0]["mistake"]
    description = error_response["errors"][0]["description"]
    response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                            {"role": "system", "content": "You are an expert in Vietnamese spelling, grammar, and pronunciation analysis."},
                            {
                                "role": "user",
                                "content": f"""
                                Extract key Vietnamese keywords from the following Vietnamese text to help find relevant Vietnamese language lessons.
                                Mistake: "{mistake}"
                                Description: "{description}"

                                Return only the most relevant keywords, separated by commas.
                                """
                            }
                        ],
            temperature=0.0
        )

    keywords = response.choices[0].message.content.strip()
    return keywords.split(", ")

def find_relevant_lessons(keywords, lessons):
    # Construct a list of lessons in the prompt
    lesson_list = "\n".join(
        [
            f"""
            - Title: {lesson['title']}
            Description: {lesson['description']}
            Content: {lesson['content']}
            """
            for lesson in lessons
        ]   
    )

    # Send the request to OpenAI
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert in recommending relevant Vietnamese language lessons based on keywords."},
            {
                "role": "user",
                "content": f"""
                    The following Vietnamese keywords have been extracted from a Vietnamese language mistake to find lessons: {', '.join(keywords)}.

                    Lessons:
                    {lesson_list}

                    Match the keywords to the Vietnamese lessons and return the titles of the three most relevant lessons, ranked by relevance, return only the tag of the lessons.
                """
            }
        ],
        temperature=0.0,
    )

    # Extract the response text
    relevant_lessons = response.choices[0].message.content.strip()
    return relevant_lessons.split("\n")




error_response = {
    "errors": [
        {
            "mistake": "Xin chào, 1,34",
            "correction": "Xin chào, 1.34",
            "description": "Trong tiếng Anh, dấu phẩy (,) không được sử dụng để phân tách phần thập phân. Thay vào đó, dấu chấm (.) được sử dụng để chỉ phần thập phân."
        }
    ],
    "corrected_text": "Hello, 1.34"
}

# Sample database
lessons = [
    {
        "_id": "6765b3db29fd1f6e5b98ad21",
        "tag": "Lesson 1",
        "title": "Introduction to Vietnamese Alphabet",
        "description": "Learn about the Vietnamese alphabet, including letters, pronunciation, and examples.",
        "content": "Vietnamese uses a modified Roman alphabet with 29 letters. The lesson introduces key letters, their pronunciations, and examples, as well as unique features of consonants and vowels.",
        "notes": [
            "Consonants: Most are similar to English but some have unique sounds.",
            "Vowels: Several vowel combinations create distinctive sounds not found in English."
        ]
    },
    {
        "_id": "6765b3db29fd1f6e5b98ad22",
        "tag": "Lesson 2",
        "title": "Common Grammar Mistakes",
        "description": "Learn about common grammar mistakes in Vietnamese and English, including punctuation, number formatting, and usage.",
        "content": "This lesson covers common issues such as the use of commas for decimal separation in Vietnamese versus periods in English.",
        "notes": ["Decimal separation: Vietnamese uses ',' while English uses '.'."]
    }
]

keywords = extract_keywords(error_response)
print(keywords)
relevant_lessons = find_relevant_lessons(keywords, lessons)
print(relevant_lessons)