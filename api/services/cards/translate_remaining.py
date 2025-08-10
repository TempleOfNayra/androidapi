#!/usr/bin/env python3
import json
import os

# This will be our translation storage
translations = {}

# Process each chunk (3-26)
for chunk_num in range(3, 27):
    en_file = f'chunks_en/tarot_chunk_{chunk_num:02d}.js'
    hi_file = f'chunks_hi/tarot_chunk_{chunk_num:02d}.js'
    
    if os.path.exists(en_file):
        print(f"Processing chunk {chunk_num}...")
        with open(en_file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract JSON
            start = content.find('{')
            end = content.rfind('}') + 1
            json_str = content[start:end]
            data = json.loads(json_str)
            
            # Store for translation
            translations[chunk_num] = data
            card_nums = list(data.keys())
            print(f"  Cards: {', '.join(card_nums)}")

print(f"\nTotal chunks to translate: {len(translations)}")
print("Ready for Hindi translation...")