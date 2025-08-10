#!/usr/bin/env python3
import json
import os
import glob

def combine_all_hindi_chunks():
    """Combine all Hindi chunks into final file"""
    combined_data = {}
    
    # Read all Hindi chunk files
    for i in range(1, 27):
        hi_filename = f'chunks_hi/tarot_chunk_{i:02d}.js'
        if os.path.exists(hi_filename):
            print(f"Reading {hi_filename}")
            with open(hi_filename, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extract JSON from JS file
                start_idx = content.find('{')
                end_idx = content.rfind('}') + 1
                if start_idx != -1 and end_idx > start_idx:
                    json_str = content[start_idx:end_idx]
                    try:
                        chunk_data = json.loads(json_str)
                        combined_data.update(chunk_data)
                        print(f"  Added cards: {list(chunk_data.keys())}")
                    except json.JSONDecodeError as e:
                        print(f"  Error parsing JSON: {e}")
    
    # Write combined Hindi file
    print(f"\nTotal cards collected: {len(combined_data)}")
    
    with open('tarotCardsMeaningComplete_hi.js', 'w', encoding='utf-8') as f:
        f.write('export const tarotCardsCompleteMeaning = ')
        json.dump(combined_data, f, ensure_ascii=False, indent=2)
        f.write(';\n')
    
    print("Created tarotCardsMeaningComplete_hi.js")
    return len(combined_data)

if __name__ == "__main__":
    # Check what chunks we have
    en_chunks = glob.glob('chunks_en/tarot_chunk_*.js')
    hi_chunks = glob.glob('chunks_hi/tarot_chunk_*.js')
    
    print(f"English chunks: {len(en_chunks)}")
    print(f"Hindi chunks created so far: {len(hi_chunks)}")
    
    if hi_chunks:
        print("\nCombining existing Hindi chunks...")
        total_cards = combine_all_hindi_chunks()
        print(f"\nFinal file contains {total_cards} cards")