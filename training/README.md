# Nayra Training Data

This directory contains training examples for fine-tuning Nayra's tarot reading model.

## Files

- `nayra_training_data.jsonl` - Main training file in JSONL format (one JSON object per line)
- `examples_readable.json` - Human-readable version with annotations
- `generation_scripts/` - Scripts to generate more training data

## Quality Levels

### Exceptional (Target Quality)
- Deep psychological and systemic insights
- Challenges conventional thinking
- Speaks uncomfortable truths
- Addresses both personal and collective shadows
- Example: 001_devil_financial_collapse

### Good (Acceptable Quality)
- Solid mystical voice
- Position-specific interpretation
- Concrete predictions and timeframes
- Practical guidance

### Basic (Minimum Quality)
- Correct card interpretation
- Appropriate to position
- Nayra's voice present

## Training Data Requirements

### Minimum Dataset
- 100 examples total
- 20 examples per major position (ANSWER, LOVE, MONEY, LIFE, PAST, PRESENT, FUTURE)
- Mix of quality levels (20% exceptional, 60% good, 20% basic)

### Recommended Dataset
- 200-300 examples
- 30-40 examples per position
- 30% exceptional quality
- Variety in:
  - Cards (cover all Major Arcana, selection of Minor)
  - Questions (specific vs general)
  - Life situations (crisis, celebration, transition)
  - Seeker demographics

## How to Add Examples

1. Create example in readable format (examples_readable.json)
2. Convert to JSONL format
3. Append to nayra_training_data.jsonl
4. Ensure variety and quality standards

## Example Structure

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are Nayra. Respond with JSON tarot reading."
    },
    {
      "role": "user",
      "content": "Card: [Card Name]\nPosition: [Position]\nSeeker's question: \"[Question]\"\nLanguage: [Language]"
    },
    {
      "role": "assistant",
      "content": "{[Full JSON response with interpretation]}"
    }
  ]
}
```

## Quality Checklist

- [ ] Deep interpretation beyond surface meanings
- [ ] Position-specific lens applied
- [ ] Nayra's mystical voice present
- [ ] Practical guidance included
- [ ] Proper JSON structure
- [ ] KeyInsights are actionable
- [ ] Summary crystallizes the message

## Next Steps

1. Generate 20 more exceptional examples based on the Devil template
2. Create 50 good quality examples for variety
3. Generate 30 examples for 3-card readings
4. Test fine-tuning with initial 100 examples
5. Expand to 200-300 based on results