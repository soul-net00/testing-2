#!/bin/bash
set -e

DIR="/app/applet/public/assets"
mkdir -p "$DIR"

# Photo 1: Golden Hour Besties (Sunlit warmth, brick school tones, teal uniform accents)
convert -size 800x1060 xc:"#230933" \
  \( -size 800x1060 radial-gradient:"#f59e0b-#3b0764" -gamma 1.3 \) -compose blend -define compose:args=75,25 -composite \
  \( -size 720x960 xc:none -fill "rgba(255,255,255,0.06)" -draw "roundrectangle 0,0,720,960,28,28" \) -gravity center -composite \
  \( -size 680x880 radial-gradient:"#fbbf24-#180326" -blur 0x8 \) -gravity center -composite \
  \( -size 600x600 xc:none \
     -fill "#d97706" -draw "circle 300,300 300,100" \
     -fill "#fde047" -draw "circle 300,300 300,220" \
     -blur 0x12 \) -gravity center -geometry +0-80 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 44 -gravity north -annotate +0+120 "Golden Hour Glow ✨" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 26 -gravity north -annotate +0+180 "Best friends forever • Sunlit smiles 💕" \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 84 -gravity center -annotate +0+40 "👭" \
  -fill "#f472b6" -font DejaVu-Sans -pointsize 22 -gravity south -annotate +0+140 "MEMORIES WITH YOU • LABUBU 🤍" \
  "$DIR/photo-1.jpg"

# Photo 2: 4-Photo Collage (Silly faces, hospital masks, yellow sweater, cheek kisses)
convert -size 800x1060 xc:"#2d0738" \
  \( -size 800x1060 radial-gradient:"#ec4899-#1a0429" \) -compose blend -define compose:args=75,25 -composite \
  \( -size 720x720 xc:none \
     -fill "rgba(255,255,255,0.15)" -draw "roundrectangle 0,0,720,720,24,24" \
     -fill "#0284c7" -draw "roundrectangle 16,16,344,344,16,16" \
     -fill "#eab308" -draw "roundrectangle 376,16,704,344,16,16" \
     -fill "#ec4899" -draw "roundrectangle 16,376,344,704,16,16" \
     -fill "#9333ea" -draw "roundrectangle 376,376,704,704,16,16" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 64 -gravity northwest -annotate +135+130 "✌️😷" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 64 -gravity northeast -annotate +135+130 "😜💛" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 64 -gravity southwest -annotate +135+130 "😘💖" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 64 -gravity southeast -annotate +135+130 "📸✨" \
  \) -gravity center -geometry +0-40 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 42 -gravity north -annotate +0+90 "Silly Faces & Laughs 😜" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+130 "Unfiltered moments • Endless laughs 🫶" \
  "$DIR/photo-2.jpg"

# Photo 3: Braids & Weekend Outing (Red tops, pink braids, classroom fun)
convert -size 800x1060 xc:"#2b0833" \
  \( -size 800x1060 radial-gradient:"#e11d48-#2e053d" \) -compose blend -define compose:args=70,30 -composite \
  \( -size 720x840 xc:"#fb7185" \
     -fill "#9f1239" -draw "roundrectangle 20,20,700,820,24,24" \
     -fill "#fda4af" -draw "circle 360,340 360,180" \
     -fill "#e11d48" -draw "roundrectangle 100,500,620,800,20,20" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 96 -gravity center -annotate +0-60 "✌️🎀✌️" \
  \) -gravity center -geometry +0-30 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 42 -gravity north -annotate +0+80 "Braids & Sunshine 🎀" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+130 "Red shirts • Pink braids • Weekend vibes ✨" \
  "$DIR/photo-3.jpg"

# Photo 4: Matching Terracotta Besties (Terracotta tees, school courtyard, hugs)
convert -size 800x1060 xc:"#280836" \
  \( -size 800x1060 radial-gradient:"#ea580c-#3b0764" \) -compose blend -define compose:args=70,30 -composite \
  \( -size 720x840 xc:"#fed7aa" \
     -fill "#c2410c" -draw "roundrectangle 20,20,700,820,24,24" \
     -fill "#ffedd5" -draw "roundrectangle 60,60,660,760,16,16" \
     -fill "#ea580c" -draw "roundrectangle 120,400,340,700,20,20" \
     -fill "#9a3412" -draw "roundrectangle 380,400,600,700,20,20" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 46 -gravity center -annotate +0-100 "IM BESTIES" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 84 -gravity center -annotate +0+20 "🫶👯‍♀️" \
  \) -gravity center -geometry +0-30 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 42 -gravity north -annotate +0+80 "Matching Outfits 👯‍♀️" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+130 "Two of a kind • Besties for life 💕" \
  "$DIR/photo-4.jpg"

echo "Assets built successfully!"
