#!/usr/bin/env python3
"""
Script to combine all Hindi tarot card meaning chunks into a complete file
"""

import os
import re

def read_chunk_file(chunk_num):
    """Read a specific chunk file and return its content"""
    chunk_path = f'/Users/aliemami/prod/nayra/android-api/api/services/cards/chunks_hi/tarot_chunk_{chunk_num:02d}.js'
    
    if not os.path.exists(chunk_path):
        print(f"Warning: Chunk {chunk_num:02d} not found at {chunk_path}")
        return None
    
    with open(chunk_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the object content (everything between the first { and last })
    start_idx = content.find('{')
    end_idx = content.rfind('}')
    
    if start_idx == -1 or end_idx == -1:
        print(f"Warning: Could not parse chunk {chunk_num:02d}")
        return None
    
    # Get the content without the outer braces and clean it up
    chunk_content = content[start_idx+1:end_idx].strip()
    
    # Remove any trailing comma if present
    if chunk_content.endswith(','):
        chunk_content = chunk_content[:-1]
    
    return chunk_content

def create_complete_file():
    """Create the complete Hindi tarot meanings file"""
    
    print("Creating complete Hindi tarot card meanings file...")
    
    # File header
    content = '''export const tarotCardsMeaningComplete = {
'''
    
    all_chunks = []
    
    # Read all 26 chunks
    for chunk_num in range(1, 27):
        chunk_content = read_chunk_file(chunk_num)
        if chunk_content:
            all_chunks.append(chunk_content)
            print(f"✓ Processed chunk {chunk_num:02d}")
        else:
            print(f"✗ Failed to process chunk {chunk_num:02d}")
    
    # Combine all chunks
    combined_content = ',\n  '.join(all_chunks)
    content += combined_content
    
    # Close the export
    content += '''
};
'''
    
    # Write the complete file
    output_path = '/Users/aliemami/prod/nayra/android-api/api/services/cards/tarotCardsMeaningComplete_hi.js'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✓ Complete Hindi tarot file created at: {output_path}")
    print(f"✓ Combined {len(all_chunks)} chunks successfully")
    
    return output_path

if __name__ == "__main__":
    create_complete_file()