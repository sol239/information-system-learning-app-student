#!/bin/bash

# Base directory
BASE_DIR="./app/components/infsys_components"
OUTPUT_FILE="vue_files_list.txt"

# Clear the output file
> "$OUTPUT_FILE"

# Function to process directories
process_dir() {
  local DIR="$1"
  # Find .vue files in this directory (non-recursive)
  FILES=("$DIR"/*.vue)
  
  # Check if any .vue files exist
  if [ -e "${FILES[0]}" ]; then
    # Get relative directory path
    REL_DIR="${DIR#$BASE_DIR/}"
    [ "$REL_DIR" == "$DIR" ] && REL_DIR="."
    echo "$REL_DIR/" >> "$OUTPUT_FILE"
    for f in "${FILES[@]}"; do
      echo "  $(basename "$f")" >> "$OUTPUT_FILE"
    done
  fi
}

# Process base directory itself
process_dir "$BASE_DIR"

# Process all subdirectories recursively
find "$BASE_DIR" -type d | while read -r DIR; do
  [ "$DIR" != "$BASE_DIR" ] && process_dir "$DIR"
done
