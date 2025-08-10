#!/usr/bin/env python3
"""
Combine all Farsi tarot card chunks into a single complete file.
"""

import json
import os

def combine_farsi_chunks():
    """Combine all Farsi chunks into the final tarotCardsMeaningComplete_fa.js file."""
    
    print("Creating complete Farsi tarot card meanings file...")
    
    combined_data = {}
    successful_chunks = 0
    
    # Process each chunk file
    for i in range(1, 27):
        chunk_file = f"/Users/aliemami/prod/nayra/android-api/api/services/cards/chunks_fa/tarot_chunk_{i:02d}.js"
        
        if os.path.exists(chunk_file):
            try:
                with open(chunk_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extract JSON from JS file
                start_idx = content.find('{')
                end_idx = content.rfind('}') + 1
                
                if start_idx != -1 and end_idx > start_idx:
                    json_str = content[start_idx:end_idx]
                    chunk_data = json.loads(json_str)
                    combined_data.update(chunk_data)
                    successful_chunks += 1
                    print(f"✓ Processed chunk {i:02d}")
                else:
                    print(f"✗ Failed to extract JSON from chunk {i:02d}")
            except Exception as e:
                print(f"✗ Failed to process chunk {i:02d}: {e}")
        else:
            print(f"Warning: Chunk {i:02d} not found at {chunk_file}")
            print(f"✗ Failed to process chunk {i:02d}")
    
    # Write the combined file
    output_file = "/Users/aliemami/prod/nayra/android-api/api/services/cards/tarotCardsMeaningComplete_fa.js"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('export const tarotCardsCompleteMeaning = ')
        json.dump(combined_data, f, ensure_ascii=False, indent=2)
        f.write(';\n')
    
    print(f"\n✓ Complete Farsi tarot file created at: {output_file}")
    print(f"✓ Combined {successful_chunks} chunks successfully")
    
    # Verify we have all 78 cards
    card_count = len(combined_data)
    if card_count == 78:
        print(f"✓ All 78 cards are present")
    else:
        print(f"⚠ Warning: Expected 78 cards but found {card_count}")
    
    return card_count

if __name__ == "__main__":
    combine_farsi_chunks()