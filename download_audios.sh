#!/bin/bash

videos=(
  "videos/kelvin-572d8289-9503-4193-b24f-dc9d37f4a491"
  "videos/kelvin-fcee7179-03fe-40a5-b1d8-cae5412bf3c6"
  "videos/kelvin-73b869ba-be86-4238-8bbe-045c03d6b357"
  "videos/kelvin-a20503b5-a8d4-4dfc-9882-855c013981b4"
)

for video in "${videos[@]}"; do
  response=$(curl -s -X 'POST' \
    "https://fxp-backend-fast-0ddf2d1e1ef6.herokuapp.com/generate-audio-for-transcript?s3ObjectKey=${video}&username=kelvin&forceGeneration=false" \
    -H 'accept: application/json' \
    -d '')

  # Extract the Base64 string from the response
  audio_base64=$(echo "$response" | jq -r '.audioBase64')

  if [ "$audio_base64" != "null" ]; then
    # Remove the data URL prefix
    audio_base64=$(echo "$audio_base64" | sed 's/^data:audio\/mp3;base64,//')

    # Decode the Base64 string and save it as an audio file
    output_file="$(basename "$video").mp3"
    echo "$audio_base64" | base64 --decode > "$output_file"

    # Increase the volume by 50% (adjust as needed)
    ffmpeg -i "$output_file" -filter:a "volume=1.5" "louder_$output_file"
  else
    echo "No audio found for $video"
  fi
done
