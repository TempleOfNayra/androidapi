#!/usr/bin/env python3
"""
Combine multiple training files into a single JSONL for fine-tuning.
Supports both JSONL files and individual JSON files.
"""

import json
import os
from pathlib import Path

def combine_jsonl_files(input_dir, output_file):
    """Combine multiple JSONL files into one."""
    combined = []
    
    # Process all .jsonl files
    for file_path in Path(input_dir).glob("*.jsonl"):
        print(f"Processing {file_path.name}")
        with open(file_path, 'r') as f:
            for line in f:
                if line.strip():  # Skip empty lines
                    combined.append(json.loads(line))
    
    # Write combined file
    with open(output_file, 'w') as f:
        for item in combined:
            f.write(json.dumps(item) + '\n')
    
    print(f"Combined {len(combined)} examples into {output_file}")

def combine_json_files(input_dir, output_file):
    """Combine individual JSON files into a single JSONL."""
    combined = []
    
    # Process all .json files
    for file_path in Path(input_dir).glob("examples/*.json"):
        print(f"Processing {file_path.name}")
        with open(file_path, 'r') as f:
            combined.append(json.load(f))
    
    # Write as JSONL
    with open(output_file, 'w') as f:
        for item in combined:
            f.write(json.dumps(item) + '\n')
    
    print(f"Combined {len(combined)} examples into {output_file}")

def validate_training_data(file_path):
    """Validate the combined training file."""
    valid = 0
    errors = []
    
    with open(file_path, 'r') as f:
        for i, line in enumerate(f, 1):
            try:
                data = json.loads(line)
                # Check required structure
                if "messages" in data and len(data["messages"]) == 3:
                    valid += 1
                else:
                    errors.append(f"Line {i}: Invalid structure")
            except json.JSONDecodeError as e:
                errors.append(f"Line {i}: {e}")
    
    print(f"\nValidation Results:")
    print(f"✓ Valid examples: {valid}")
    if errors:
        print(f"✗ Errors found: {len(errors)}")
        for error in errors[:5]:  # Show first 5 errors
            print(f"  - {error}")
    
    return len(errors) == 0

if __name__ == "__main__":
    # Configuration
    training_dir = Path(__file__).parent
    output_file = training_dir / "nayra_training_combined.jsonl"
    
    # Option 1: Combine multiple JSONL files
    combine_jsonl_files(training_dir, output_file)
    
    # Option 2: Combine individual JSON files (uncomment to use)
    # combine_json_files(training_dir, output_file)
    
    # Validate the result
    if validate_training_data(output_file):
        print("\n✅ Training data ready for fine-tuning!")
    else:
        print("\n❌ Please fix errors before fine-tuning")