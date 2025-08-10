import json
import os
from googletrans import Translator
import time

# Read the original English file
with open('tarotCardsMeaningComplete_en.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON content
json_start = content.find('{')
json_end = content.rfind('}') + 1
json_content = content[json_start:json_end]

# Parse the JSON
tarot_data = json.loads(json_content)

# Create directories for chunks
os.makedirs('chunks_en', exist_ok=True)
os.makedirs('chunks_hi', exist_ok=True)

# Split into 26 files (3 cards each)
translator = Translator()
cards_per_file = 3
file_count = 0

for i in range(0, 78, cards_per_file):
    file_count += 1
    chunk_data = {}
    
    # Get 3 cards for this chunk
    for j in range(i, min(i + cards_per_file, 78)):
        chunk_data[str(j)] = tarot_data[str(j)]
    
    # Save English chunk
    en_filename = f'chunks_en/tarot_chunk_{file_count:02d}.json'
    with open(en_filename, 'w', encoding='utf-8') as f:
        json.dump(chunk_data, f, ensure_ascii=False, indent=2)
    
    print(f"Created {en_filename}")
    
    # Translate to Hindi
    hi_chunk_data = {}
    for card_id, card_content in chunk_data.items():
        hi_chunk_data[card_id] = {}
        for key, value in card_content.items():
            try:
                # Add delay to avoid rate limiting
                time.sleep(0.5)
                
                if key == "answer":
                    # Special handling for answer field (YES|NO|MAYBE format)
                    parts = value.split('|', 1)
                    if len(parts) == 2:
                        answer_type = parts[0]
                        answer_text = translator.translate(parts[1], src='en', dest='hi').text
                        hi_chunk_data[card_id][key] = f"{answer_type}|{answer_text}"
                    else:
                        hi_chunk_data[card_id][key] = translator.translate(value, src='en', dest='hi').text
                else:
                    hi_chunk_data[card_id][key] = translator.translate(value, src='en', dest='hi').text
                
                print(f"  Translated card {card_id}, field {key}")
                
            except Exception as e:
                print(f"  Error translating card {card_id}, field {key}: {e}")
                # Keep original if translation fails
                hi_chunk_data[card_id][key] = value
    
    # Save Hindi chunk
    hi_filename = f'chunks_hi/tarot_chunk_{file_count:02d}.json'
    with open(hi_filename, 'w', encoding='utf-8') as f:
        json.dump(hi_chunk_data, f, ensure_ascii=False, indent=2)
    
    print(f"Created {hi_filename}")

print(f"\nCreated {file_count} chunk files")

# Combine all Hindi chunks into final file
combined_hi_data = {}
for i in range(1, 27):
    hi_filename = f'chunks_hi/tarot_chunk_{i:02d}.json'
    if os.path.exists(hi_filename):
        with open(hi_filename, 'r', encoding='utf-8') as f:
            chunk_data = json.load(f)
            combined_hi_data.update(chunk_data)

# Create final Hindi JS file
with open('tarotCardsMeaningComplete_hi.js', 'w', encoding='utf-8') as f:
    f.write('export const tarotCardsCompleteMeaning = ')
    json.dump(combined_hi_data, f, ensure_ascii=False, indent=2)
    f.write(';\n')

print("\nCreated tarotCardsMeaningComplete_hi.js")