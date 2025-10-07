#!/bin/bash

# Test script for interpretation API
# Usage: ./test_interpretation.sh

API_URL="http://localhost:3000/api/ios/interpretation"
OUTPUT_FILE="interpretation_test_results.txt"

echo "🚀 Testing interpretation API with comprehensive scenarios..."
echo "📍 URL: $API_URL"
echo "📄 Results will be saved to: $OUTPUT_FILE"
echo ""

# Clear/create output file
echo "========================================" > "$OUTPUT_FILE"
echo "Interpretation Test Run: $(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT_FILE"
echo "========================================" >> "$OUTPUT_FILE"

# Test scenarios for comprehensive comparison
declare -a test_scenarios=(
  # Test 1: Specific relationship betrayal
  '{
    "name": "Capoeira Teacher Betrayal",
    "body": {
      "symbology": "Christian Saints",
      "cards": ["king solomon"],
      "model": "claude",
      "tarotCard": "strength",
      "journalEntry": "my capoeira teacher promised me last year that he is going to graduate me this year in this particular event but today the event is around the corner and he is coming up with dumb excuses that they do not make any sense, i am very disappointed that he doesnt care about me to stand up to his words",
      "spiritualityLevel": 20,
      "lifeChapter": "Growth"
    }
  }'

  # Test 2: Workplace injustice with strong emotion
  '{
    "name": "Boss Stealing Credit",
    "body": {
      "symbology": "universal symbols",
      "cards": ["lion"],
      "model": "claude",
      "tarotCard": "strength",
      "journalEntry": "I am so angry at my boss who keeps taking credit for my work. Yesterday he presented MY project to the CEO as his own. I worked nights and weekends on this and he just stole it. I want to scream.",
      "spiritualityLevel": 20,
      "lifeChapter": "Career"
    }
  }'

  # Test 3: Major life decision - relationship vs family
  '{
    "name": "Partner Moving Abroad",
    "body": {
      "symbology": "hindu",
      "cards": ["Ganesha"],
      "model": "claude",
      "tarotCard": "the fool",
      "journalEntry": "My partner of 5 years just told me they want to move to another country for work. I dont know if I should follow them or stay here where my family is. This feels like everything is falling apart.",
      "spiritualityLevel": 20,
      "lifeChapter": "Relationship"
    }
  }'

  # Test 4: Loss and grief
  '{
    "name": "Death of Parent",
    "body": {
      "symbology": "orixas",
      "cards": ["Orixá Yemanja"],
      "model": "claude",
      "tarotCard": "death",
      "journalEntry": "My mother passed away last month after a long illness. I thought I was prepared but I feel so lost. I keep expecting her to call me. The house feels empty. How do I move forward when the person who loved me most is gone?",
      "spiritualityLevel": 40,
      "lifeChapter": "Transition"
    }
  }'

  # Test 5: Financial crisis
  '{
    "name": "Financial Hardship",
    "body": {
      "symbology": "universal symbols",
      "cards": ["phoenix"],
      "model": "claude",
      "tarotCard": "the tower",
      "journalEntry": "I lost my job last week and have been rejected from 15 interviews. My savings are almost gone and rent is due next week. I feel like a failure. My family depends on me and I am letting them down.",
      "spiritualityLevel": 20,
      "lifeChapter": "Survival"
    }
  }'

  # Test 6: Intentions only (no journal)
  '{
    "name": "Intentions Only - Self Love",
    "body": {
      "symbology": "Christian Saints",
      "cards": ["mary magdalene"],
      "model": "claude",
      "tarotCard": "the empress",
      "intentionChips": ["self-love", "healing", "forgiveness"],
      "spiritualityLevel": 60,
      "lifeChapter": "Healing"
    }
  }'

  # Test 7: Both journal and intentions
  '{
    "name": "Journal Plus Intentions",
    "body": {
      "symbology": "hindu",
      "cards": ["Lakshmi"],
      "model": "claude",
      "tarotCard": "nine of pentacles",
      "journalEntry": "I started my own business but I am scared of failure. What if I am not good enough?",
      "intentionChips": ["abundance", "confidence", "success"],
      "spiritualityLevel": 40,
      "lifeChapter": "New Beginnings"
    }
  }'

  # Test 8: Nonsensical input
  '{
    "name": "Unclear Communication",
    "body": {
      "symbology": "orixas",
      "cards": ["Orixá Egungun"],
      "model": "claude",
      "tarotCard": "two of wands",
      "journalEntry": "addy kajsdhf kajsdhf kajsdhf kjasdhf kjasdhf kajsdhf kajsdhf ka",
      "spiritualityLevel": 20
    }
  }'
)

# Run each test scenario
for i in "${!test_scenarios[@]}"; do
  scenario="${test_scenarios[$i]}"

  # Extract test details
  test_name=$(echo "$scenario" | jq -r '.name')
  request_body=$(echo "$scenario" | jq -c '.body')
  journal_entry=$(echo "$scenario" | jq -r '.body.journalEntry // ""')
  intentions=$(echo "$scenario" | jq -r '.body.intentionChips // ""')

  echo ""
  echo "🧪 Test $((i+1)): $test_name"
  echo "================================"

  # Record start time
  start_time=$(date +%s%N)

  # Make the API call
  response=$(curl -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$request_body" \
    --silent \
    --show-error)

  # Record end time
  end_time=$(date +%s%N)
  duration_ns=$((end_time - start_time))
  duration_ms=$((duration_ns / 1000000))

  if [ $? -eq 0 ]; then
    # Extract interpretation
    interpretation=$(echo "$response" | jq -r '.interpretation // ""' 2>/dev/null || echo "")

    # Save to file
    echo "" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    echo "Test $((i+1)): $test_name" >> "$OUTPUT_FILE"
    echo "Time: ${duration_ms}ms" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    if [[ -n "$journal_entry" ]]; then
      echo "Journal Entry:" >> "$OUTPUT_FILE"
      echo "$journal_entry" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    fi

    if [[ -n "$intentions" ]] && [[ "$intentions" != "null" ]]; then
      echo "Intentions:" >> "$OUTPUT_FILE"
      echo "$intentions" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    fi

    echo "AI Response:" >> "$OUTPUT_FILE"
    echo "$interpretation" >> "$OUTPUT_FILE"

    echo "✅ Completed in ${duration_ms}ms"
  else
    echo "❌ Request failed"
    echo "❌ Test $((i+1)): $test_name - FAILED" >> "$OUTPUT_FILE"
  fi

  # Small delay between tests
  sleep 2
done

# Summary
echo ""
echo "========================================" >> "$OUTPUT_FILE"
echo "SUMMARY" >> "$OUTPUT_FILE"
echo "========================================" >> "$OUTPUT_FILE"
echo "Tests completed at: $(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT_FILE"

echo ""
echo "✅ All tests completed. Check $OUTPUT_FILE for detailed results."