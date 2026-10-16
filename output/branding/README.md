# Marlin Eco Resort brand assets

These files are generated from the client's supplied `Marlin eco resort branding` folder. The client files remain untouched.

## Logo exports

Each horizontal, stacked, and mark logo has a transparent SVG and a 1600 px wide transparent PNG in navy and cream. Use SVG for websites and print layouts. Use PNG where SVG is unavailable. The SVG paths come from the supplied Illustrator master.

- Cream logos: place on navy or green.
- Navy logos: place on cream or a similarly light surface.
- Leave clear space around each logo of at least the height of the marlin mark's upper fin.
- Keep proportions and colors intact.

## Color and type

`tokens.css` and `tokens.json` contain the working RGB palette. The source color board supplies the matching hex values.

The supplied font programs identify themselves as **Heksilo** and **Abel**. Use Heksilo for major display headings and Abel for body copy, navigation, captions, and utility text. The original font files are in the client folder's `Typography ` directory; file names are not used to identify the font families here.

The brand guide PDF is in `../pdf/Marlin Eco Resort Brand Guidelines.pdf`.

## Regenerating

`generate_assets.py` exports transparent logo files from the supplied PDF-compatible Illustrator master. It requires Python, Pillow, CairoSVG, and `pdftocairo`.
