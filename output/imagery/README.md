# Marlin temporary image library

The six WebP files in `../../public/images/generated/` were created with the built-in imagegen tool for this website. They are illustrative concepts, **not property photographs**. Their source PNGs were generated outside this repository; the optimized WebP files are the project deliverables. Keep them separate from the original client files and the four supplied Marlin posts in `public/images/marlin-1.jpg` through `marlin-4.jpg`.

| Generated file | Placement | Crop / replacement guidance |
| --- | --- | --- |
| `hero-coast.webp` | Opening image | Landscape 3:2; preserve shore and green headland. Replace with a wide real coastal/property photograph. |
| `marine-drive.webp` | Place section | Portrait 4:5; keep the path and water visible. Replace with a real view from or near Marlin. |
| `cottage-exterior.webp` | Main stay image | Portrait 4:5; show full roof and veranda. Replace with a real cottage exterior. |
| `cottage-veranda.webp` | Stay detail | Landscape 3:2; keep timber and sea in frame. Replace with a real veranda photograph. |
| `morning-shore.webp` | Day, morning | Landscape 3:2; preserve shoreline scale. Replace with a real local morning scene. |
| `marlin-table.webp` | Day, table | Landscape 4:3; keep food and setting visible. Replace with real Marlin dining photography. |

The website's media references, alt text, and intrinsic dimensions are in `../../src/lib/media.ts`. When replacing an image, update all three. Do not overwrite the client's original social art or branding folder.

## Final generation prompts

All six prompts used the **photorealistic-natural** use case and these common constraints: believable Himchori/Cox's Bazar Bangladesh coast, humid air, natural navy/green/sand and warm timber palette, observational editorial photography with natural imperfections; no text, logo, watermark, signage, fantasy turquoise water, or staged luxury models.

1. **hero-coast:** Website opening image, horizontal 3:2. Wide coastline viewed from a low sandy dune near Himchori, Bay of Bengal surf and hazy distance, natural coastal vegetation at one edge. Late morning soft overcast light, subtle texture of sand and water. Calm composition with ample negative space toward the left; no buildings.
2. **marine-drive:** Website place section, portrait 4:5. View from a sandy coastal path with native greenery toward the Bay of Bengal along the Himchori Marine Drive area. Layered foliage, rough grass, glimpses of water, naturally uneven ground, soft bright humid daylight. No buildings or people. Documentary travel photography.
3. **morning-shore:** Website morning editorial panel, horizontal 3:2. Very early morning on Cox's Bazar shoreline, gently breaking waves, broad wet sand, distant solitary local walker for scale viewed from behind, natural haze and pale gold light. Unposed, quiet documentary photograph; no resort building.
4. **cottage-exterior:** Main cottage portrait photograph, 4:5. Two-storey timber A-frame cottage exterior in a small coastal grove, very steep dark metal roof, warm timber facade, narrow private veranda, believable joinery and foundations, modest scale. Late afternoon diffuse sunlight, camera slightly below eye level, no people. Entire cottage legible with space around it. The A-frame and dark roof are based on the client-supplied Marlin cottage posts as visual references.
5. **cottage-veranda:** Cottage detail landscape photograph, 3:2. View from a modest timber veranda of an A-frame cottage, textured timber boards and simple woven chair, sea glimpsed through coastal trees beyond, credible structural railing, tactile but not decorated. Gentle late afternoon light, quiet lived-in feeling, no people. Consistent roof and timber language with the exterior concept.
6. **marlin-table:** Dining editorial landscape photograph, 4:3. Modest timber table at a coastal resort with fresh Bangladeshi seafood meal, rice, seasonal vegetables and lime served on simple ceramic plates, true-to-life food shapes and portions, woven cloth detail. Natural midday window light, candid hospitality photograph, no people or printed menus.

The original PNGs were converted to WebP at quality 82 for local delivery; source image dimensions are recorded in `src/lib/media.ts`.
