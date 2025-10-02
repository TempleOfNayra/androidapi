#!/bin/bash

# Test script for interpretation API
# Usage: ./test_interpretation.sh [minimal|full]

API_URL="http://localhost:3000/api/ios/interpretation"
TEST_TYPE=${1:-minimal}
OUTPUT_FILE="interpretation_results.txt"

  echo "🚀 Testing interpretation API..."
echo "📍 URL: $API_URL"
echo "🧪 Test type: $TEST_TYPE"
echo "📄 Results will be saved to: $OUTPUT_FILE"
echo ""

if [ "$TEST_TYPE" = "minimal" ]; then
    # Minimal test - only journalEntry is provided
    REQUEST_BODY='{
      "symbology": "Christian Saints",
      "cards": ["The Lady Of Guadalupe"],
      "model": "claude",
      "journalEntry": "i want to meditate on happiness and hope. i am dealing with a feeling of not being adequate and financially not be responsible. i am 50 and i have nothing"
    }'
    echo "📝 Testing with MINIMAL data (only journalEntry):"
elif [ "$TEST_TYPE" = "full" ]; then
    # Full test - all fields provided
    REQUEST_BODY='{
      "cards": ["The Lady Of Guadalupe"],
      "symbology": "Christian Saints",
      "journalEntry": "i want to meditate on happiness and hope. i am dealing with a feeling of not being adequate and financially not be responsible. i am 50 and i have nothing",
      "intentionChips": ["gratitude", "new beginnings"],
      "wisdomStyle": "campbell",
      "spiritualityLevel": 50,
      "lifeChapter": "building",
      "language": "en",
      "userName": "Ali",
      "model": "claude",
      "step": 1
    }'
    echo "📝 Testing with FULL data (all fields):"
else
    echo "❌ Invalid test type. Use 'minimal' or 'full'"
    exit 1
fi

echo "$REQUEST_BODY" | jq .
echo ""
echo "📤 Sending request..."
echo "================================"

# Record start time
start_time=$(date +%s%N)

# Make the API call
response=$(curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "$REQUEST_BODY" \
  --silent \
  --show-error)

# Record end time and calculate duration
end_time=$(date +%s%N)
duration_ns=$((end_time - start_time))
duration_ms=$((duration_ns / 1000000))

# Pretty print the response to console
if [ $? -eq 0 ]; then
    echo "$response" | jq . 2>/dev/null || echo "$response"
    echo "================================"
    echo "✅ Test completed in ${duration_ms}ms"

    # Extract model from request body (default to claude if not specified)
    model=$(echo "$REQUEST_BODY" | jq -r '.model // "claude"' 2>/dev/null || echo "claude")

    # Extract prompts from response
    system_prompt=$(echo "$response" | jq -r '.systemPrompt // ""' 2>/dev/null || echo "")
    user_prompt=$(echo "$response" | jq -r '.userPrompt // ""' 2>/dev/null || echo "")
    interpretation=$(echo "$response" | jq -r '.interpretation // ""' 2>/dev/null || echo "")

    # Append results to file
    echo "" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    echo "Test Run: $(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT_FILE"
    echo "Test Type: $TEST_TYPE" >> "$OUTPUT_FILE"
    echo "AI Model: $model" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Total Time: ${duration_ms}ms" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Request Body:" >> "$OUTPUT_FILE"
    echo "$REQUEST_BODY" | jq . >> "$OUTPUT_FILE" 2>/dev/null || echo "$REQUEST_BODY" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "System Prompt Used:" >> "$OUTPUT_FILE"
    echo "$system_prompt" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "User Prompt Used:" >> "$OUTPUT_FILE"
    echo "$user_prompt" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "AI Response (Interpretation):" >> "$OUTPUT_FILE"
    echo "$interpretation" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    echo "📝 Results appended to $OUTPUT_FILE"
else
    echo "❌ Request failed"
    exit 1
fi