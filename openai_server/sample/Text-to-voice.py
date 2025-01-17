
from pathlib import Path
from openai import OpenAI

api_key = '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'
client = OpenAI(api_key=api_key)

speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
  model="tts-1",
  voice="alloy",
  input="Như là năm con hai mươi sẽ thấy màu mắt của con thật xinh.",
)

response.stream_to_file(speech_file_path)