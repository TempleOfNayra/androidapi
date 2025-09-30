#!/bin/bash

# Call the API and extract the base64 audio
echo "Generating voice..."
curl -s -X POST http://localhost:3000/api/symbology/systems \
  -H "Content-Type: application/json" \
  -d '{"what": "voice", "text": "Hello, this is a test of the voice generation system. Mahsa koon dadeh!!! ", "language": "en"}' \
  | jq -r '.audio' \
  | sed 's/data:audio\/mpeg;base64,//' \
  | base64 --decode > test-voice.mp3

echo "Voice saved to test-voice.mp3"

# Play the audio file (macOS)
afplay test-voice.mp3

# Or open it in default player
# open test-voice.mp3