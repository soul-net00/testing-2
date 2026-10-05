#!/bin/bash
set -e

mkdir -p /public /app/applet/public

# 1. Main Golden Hour Besties Photo (/public/customer-photo.jpg and /public/memory-1.jpg)
convert -size 800x1000 xc:"#1a0628" \
  \( -size 800x1000 radial-gradient:"#ffaa40-#2a0845" -gamma 1.2 \) -compose blend -define compose:args=70,30 -composite \
  \( -size 760x960 xc:none -fill "rgba(255,255,255,0.08)" -draw "roundrectangle 0,0,760,960,32,32" \) -gravity center -composite \
  \( -size 680x740 xc:"#f59e0b" \
     -fill "#d97706" -draw "circle 340,370 340,100" \
     -fill "#fbbf24" -draw "circle 340,370 340,220" \
     -fill "#fef08a" -draw "circle 340,370 340,300" \
     -fill "#b45309" -draw "roundrectangle 40,540,640,740,30,30" \
     -fill "#0f766e" -draw "roundrectangle 160,560,380,740,25,25" \
     -fill "#0d9488" -draw "roundrectangle 300,560,520,740,25,25" \
     -fill "#451a03" -draw "circle 270,390 270,300" \
     -fill "#451a03" -draw "circle 410,410 410,325" \
     -fill "#1c1917" -draw "circle 270,260 270,210" \
     -fill "#1c1917" -draw "circle 420,290 420,245" \
     -fill "#fbbf24" -draw "circle 255,385 255,378" \
     -fill "#fbbf24" -draw "circle 285,385 285,378" \
     -fill "#f43f5e" -draw "circle 420,440 420,425" \
     -blur 0x1.5 \) -gravity north -geometry +0+80 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 38 -gravity south -annotate +0+110 "Golden Hour Besties ✨" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+65 "Always by your side • Best Friends Forever 💕" \
  /app/applet/public/customer-photo.jpg

cp /app/applet/public/customer-photo.jpg /app/applet/public/memory-1.jpg

# 2. Silly Faces & Laughs (/public/memory-2.jpg)
convert -size 800x1000 xc:"#2b0938" \
  \( -size 800x1000 radial-gradient:"#ec4899-#1f052e" \) -compose blend -define compose:args=75,25 -composite \
  \( -size 720x720 xc:none \
     -fill "#ffffff" -draw "roundrectangle 10,10,350,350,16,16" \
     -fill "#38bdf8" -draw "roundrectangle 20,20,340,340,12,12" \
     -fill "#ffffff" -draw "roundrectangle 370,10,710,350,16,16" \
     -fill "#facc15" -draw "roundrectangle 380,20,700,340,12,12" \
     -fill "#ffffff" -draw "roundrectangle 10,370,350,710,16,16" \
     -fill "#f472b6" -draw "roundrectangle 20,380,340,700,12,12" \
     -fill "#ffffff" -draw "roundrectangle 370,370,710,710,16,16" \
     -fill "#a855f7" -draw "roundrectangle 380,380,700,700,12,12" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 54 -gravity northwest -annotate +140+140 "✌️" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 54 -gravity northeast -annotate +140+140 "😜" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 54 -gravity southwest -annotate +140+140 "😘" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 54 -gravity southeast -annotate +140+140 "📸" \
  \) -gravity north -geometry +0+80 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 38 -gravity south -annotate +0+110 "Silly Faces & Laughs 😜" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+65 "Tongues out • School Days • Unfiltered Joy 🫶" \
  /app/applet/public/memory-2.jpg

# 3. Braids & Weekend Outing (/public/memory-3.jpg)
convert -size 800x1000 xc:"#1e0b36" \
  \( -size 800x1000 radial-gradient:"#e11d48-#3b0764" \) -compose blend -define compose:args=70,30 -composite \
  \( -size 720x720 xc:"#fb7185" \
     -fill "#be123c" -draw "roundrectangle 20,20,700,700,24,24" \
     -fill "#fda4af" -draw "circle 360,320 360,160" \
     -fill "#f43f5e" -draw "roundrectangle 120,440,600,700,20,20" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 72 -gravity center -annotate +0-60 "✌️👯‍♀️✌️" \
  \) -gravity north -geometry +0+80 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 38 -gravity south -annotate +0+110 "Braids & Sunshine 🎀" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+65 "Red shirts • Pink braids • Weekend adventures ✨" \
  /app/applet/public/memory-3.jpg

# 4. Matching Terracotta Besties (/public/memory-4.jpg)
convert -size 800x1000 xc:"#1f0a2e" \
  \( -size 800x1000 radial-gradient:"#ea580c-#4a044e" \) -compose blend -define compose:args=70,30 -composite \
  \( -size 720x720 xc:"#fdba74" \
     -fill "#ea580c" -draw "roundrectangle 20,20,700,700,24,24" \
     -fill "#ffedd5" -draw "roundrectangle 80,80,640,640,16,16" \
     -fill "#ea580c" -draw "roundrectangle 140,380,340,620,20,20" \
     -fill "#c2410c" -draw "roundrectangle 380,380,580,620,20,20" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 42 -gravity center -annotate +0-80 "IM BESTIES" \
     -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 60 -gravity center -annotate +0+20 "🫶✨" \
  \) -gravity north -geometry +0+80 -composite \
  -fill "#ffffff" -font DejaVu-Sans-Bold -pointsize 38 -gravity south -annotate +0+110 "Matching Outfits 👯‍♀️" \
  -fill "#fbcfe8" -font DejaVu-Sans -pointsize 24 -gravity south -annotate +0+65 "Terracotta tees • Two of a kind • Besties 4L 💕" \
  /app/applet/public/memory-4.jpg

echo "All memories generated successfully!"
