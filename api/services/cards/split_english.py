import json
import os

# Read the original English file
with open('tarotCardsMeaningComplete_en.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON content
json_start = content.find('{')
json_end = content.rfind('}') + 1
json_content = content[json_start:json_end]

# Parse the JSON
tarot_data = json.loads(json_content)

# Create directory for chunks
os.makedirs('chunks_en', exist_ok=True)

# Split into 26 files (3 cards each)
cards_per_file = 3
file_count = 0

for i in range(0, 78, cards_per_file):
    file_count += 1
    chunk_data = {}
    
    # Get 3 cards for this chunk
    for j in range(i, min(i + cards_per_file, 78)):
        chunk_data[str(j)] = tarot_data[str(j)]
    
    # Save English chunk as JS file for easy processing
    en_filename = f'chunks_en/tarot_chunk_{file_count:02d}.js'
    with open(en_filename, 'w', encoding='utf-8') as f:
        f.write('export const tarotChunk = ')
        json.dump(chunk_data, f, ensure_ascii=False, indent=2)
        f.write(';\n')
    
    print(f"Created {en_filename} with cards {i}-{min(i+cards_per_file-1, 77)}")

print(f"\nCreated {file_count} chunk files")