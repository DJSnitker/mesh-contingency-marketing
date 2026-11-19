# Wallpapers

Desktop wallpapers in the Mesh Contingency branding, offered at `/wallpapers` on the site.
Everything here except this README and `generate.py` is published under `wallpapers/`
(see the assets entry in `angular.json`).

| File | Size | For |
| --- | --- | --- |
| `mesh-contingency-wallpaper-3840x1080.png` | 3840×1080 | Two 1080p monitors, or a 32:9 ultrawide |
| `mesh-contingency-wallpaper-5120x1440.png` | 5120×1440 | Two 1440p monitors, or a 32:9 super-ultrawide |
| `mesh-contingency-wallpaper-1920x1080.png` | 1920×1080 | One 16:9 screen |

The `.svg` files are the vector sources; 5120×1440 is the 3840×1080 SVG drawn larger.
`previews/` holds 1600px-wide JPEGs for the page.

## Regenerating

From the repo root:

```sh
B=public/branding/mesh-contingency-lockup-dark.svg
W=resources/wallpapers
python3 $W/generate.py $B $W/mesh-contingency-wallpaper-3840x1080.svg
python3 $W/generate.py $B $W/mesh-contingency-wallpaper-1920x1080.svg 1920 1080
rsvg-convert -w 3840 -h 1080 $W/mesh-contingency-wallpaper-3840x1080.svg -o $W/mesh-contingency-wallpaper-3840x1080.png
rsvg-convert -w 5120 -h 1440 $W/mesh-contingency-wallpaper-3840x1080.svg -o $W/mesh-contingency-wallpaper-5120x1440.png
rsvg-convert -w 1920 -h 1080 $W/mesh-contingency-wallpaper-1920x1080.svg -o $W/mesh-contingency-wallpaper-1920x1080.png
for f in $W/mesh-contingency-wallpaper-*.png; do
  magick "$f" -resize 1600x -quality 82 "$W/previews/$(basename "${f%.png}").jpg"
done
```
