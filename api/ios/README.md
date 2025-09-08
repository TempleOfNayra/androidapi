# iOS Reflection API

This API is specifically designed for Apple App Store compliance, focusing on self-reflection and journaling rather than fortune-telling or predictive services.

## Key Differences from Android API

### Philosophy
- **iOS Version**: Personal reflection tool, journaling companion, self-discovery guide
- **Android Version**: Tarot readings, symbolic divination, mystical interpretations

### Language & Tone
- **iOS Version**: 
  - Uses "reflection," "exploration," "journal"
  - Avoids predictive language ("will," "shall," "destiny")
  - Focuses on questions and self-discovery
  - Treats symbols as prompts for introspection

- **Android Version**: 
  - Uses traditional tarot terminology
  - Includes mystical and predictive elements
  - Makes declarative statements about meaning

### Response Structure
Both use similar JSON structure for app compatibility, but content differs:
- iOS emphasizes personal growth and practical exercises
- iOS includes unique symbol stories and thoughtful questions
- iOS builds affirmations from user's own words

## Endpoint

```
POST /api/ios/interpretation
```

## Request Body

```json
{
  "step": "interpretation",
  "cards": ["Butterfly"],
  "symbology": "animals",
  "journalEntry": "User's personal reflection text...",
  "intention": "What they're exploring",
  "wisdomStyle": "Which wisdom resonates (from onboarding)",
  "spiritualityLevel": 50,
  "lifeChapter": "New beginnings",
  "userName": "Alex",
  "language": "en"
}
```

## Response Format

```json
{
  "summaryTitle": "Reflection",
  "mainCard": {
    "cardName": "Butterfly",
    "symbolName": "Butterfly",
    "title": "Embracing Your Transformation",
    "subtitle": "A Personal Reflection with Nayra",
    "aboutSymbol": "Unique story about the symbol...",
    "interpretation": "Response to their journal entry...",
    "keyInsights": [
      "Thoughtful question 1",
      "Thoughtful question 2",
      "Thoughtful question 3"
    ],
    "dailyInspiration": "Affirmation built from their words"
  },
  "secondCard": {
    "section": "PRACTICE",
    "sectionName": "Today's Wisdom Practice",
    "interpretation": "Specific exercise they can do today..."
  },
  "finalGuidance": {
    "guidance": "Closing message honoring their journey...",
    "practice": "One simple thing to remember...",
    "summary": "Final affirmation echoing their words..."
  }
}
```

## Apple Compliance Features

1. **No Fortune-Telling**: Never predicts future events
2. **Self-Reflection Focus**: Centers on personal introspection
3. **Educational Content**: Shares cultural stories and wisdom
4. **Journaling Tool**: Responds to user's written reflections
5. **Growth-Oriented**: Focuses on personal development
6. **Question-Based**: Uses questions to encourage thinking
7. **Practical Exercises**: Provides actionable self-care practices

## Symbol Systems Supported

- `wisdom`: Universal wisdom cards and archetypes
- `animals`: Animal spirits and their teachings  
- `angels`: Angelic guides and their messages
- `orixas`: Orisha wisdom and stories
- `hindu`: Hindu deities and their lessons
- `hellenistic`: Greek/Roman gods and myths
- `japanese`: Shinto and Buddhist symbols
- `celtic`: Celtic mythology and nature wisdom
- `chinese`: Taoist and Buddhist teachings
- `runes`: Norse wisdom and symbols

Note: `tarot` is intentionally not included for iOS compliance.

## Testing

```bash
# Test the iOS reflection endpoint
curl -X POST https://your-api.com/api/ios/interpretation \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-key" \
  -d '{
    "step": "interpretation",
    "cards": ["Butterfly"],
    "symbology": "animals",
    "journalEntry": "I feel ready for change but scared to let go",
    "language": "en"
  }'
```

## Migration Notes

When switching from Android to iOS version:
1. Update API endpoint in app from `/api/symbology/interpretation` to `/api/ios/interpretation`
2. Ensure app sends `journalEntry` field
3. Remove any UI elements suggesting prediction
4. Update notification text to reflection-focused language