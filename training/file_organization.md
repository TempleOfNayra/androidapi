# Training Data File Organization

## Recommended Approach: Organized Development → Combined Training

### Development Structure (Easy to manage)
```
training/
├── by_position/
│   ├── answer_examples.jsonl (20 examples)
│   ├── love_examples.jsonl (15 examples)
│   ├── money_examples.jsonl (15 examples)
│   ├── life_examples.jsonl (15 examples)
│   └── time_examples.jsonl (20 examples)
├── by_quality/
│   ├── exceptional_examples.jsonl (Devil example + similar depth)
│   ├── good_examples.jsonl (solid readings)
│   └── basic_examples.jsonl (minimum viable)
├── three_card/
│   ├── past_present_future.jsonl
│   ├── love_money_life.jsonl
│   └── challenge_energy_answer.jsonl
└── combine_training_files.py
```

### Benefits of Multiple Files:
1. **Easier to manage** - Find and edit specific examples
2. **Better organization** - Group by position, quality, or type
3. **Version control** - See changes to specific categories
4. **Parallel development** - Multiple people can work on different files
5. **Quality control** - Review exceptional examples separately

### For Training:
Most fine-tuning services (OpenAI, Claude, etc.) require a single JSONL file, but you:
1. Develop in multiple organized files
2. Run `python combine_training_files.py` to merge
3. Upload the combined file for training

### File Size Considerations:
- Each example with the Devil's quality ≈ 3-4 KB
- 200 examples ≈ 600-800 KB total
- This is manageable as a single file, but organization helps development

### Alternative: Individual JSON Files
If you prefer one example per file:
```
training/
├── examples/
│   ├── 001_devil_financial_collapse.json
│   ├── 002_tower_relationship_crisis.json
│   ├── 003_death_career_transformation.json
│   └── ...
└── combine_to_jsonl.py
```

This gives maximum granularity but requires the combine script for training.

## Recommendation:
Use **multiple JSONL files by category** during development, then combine for training. This balances organization with simplicity.