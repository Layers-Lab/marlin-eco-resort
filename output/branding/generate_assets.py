"""Export the client-supplied vector logo as transparent production assets."""

from pathlib import Path
import subprocess
import tempfile
import xml.etree.ElementTree as ET

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "Marlin eco resort branding" / "Marlin eco resort branding " / "Logo" / "Marlin Logo.ai"
OUT = Path(__file__).resolve().parent
NS = "{http://www.w3.org/2000/svg}"
COLORS = {"cream": "#FFFBEF", "navy": "#092942"}


def export(shape: str, page: int, color: str) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        raw = Path(tmp) / "master.svg"
        subprocess.run(
            ["pdftocairo", "-f", str(page), "-l", str(page), "-svg", str(SOURCE), str(raw)],
            check=True,
        )
        tree = ET.parse(raw)
        root = tree.getroot()
        # The Illustrator master contains a full-page rectangle behind the artwork.
        # Remove only that rectangle; retain all foreground vector paths.
        for child in list(root):
            if child.tag == NS + "rect" and float(child.get("width", "0")) >= 2000:
                root.remove(child)
            if child.tag == NS + "g":
                first_path = child.find(NS + "path")
                if first_path is not None and first_path.get("d", "").startswith("M 0 1999"):
                    root.remove(child)
        for element in root.iter():
            fill = element.get("fill", "")
            if fill.startswith("rgb("):
                element.set("fill", COLORS[color])
        root.set("width", "2000")
        root.set("height", "2000")
        root.set("viewBox", "0 0 2000 2000")

        preview = Path(tmp) / "preview.png"
        cairosvg.svg2png(bytestring=ET.tostring(root), write_to=str(preview), output_width=1000)
        with Image.open(preview) as image:
            bbox = image.getchannel("A").getbbox()
        if bbox is None:
            raise ValueError(f"No visible artwork on page {page}")
        pad = 24
        x0, y0, x1, y1 = bbox
        x0, y0 = max(0, x0 * 2 - pad), max(0, y0 * 2 - pad)
        x1, y1 = min(2000, x1 * 2 + pad), min(2000, y1 * 2 + pad)
        width, height = x1 - x0, y1 - y0
        root.set("viewBox", f"{x0} {y0} {width} {height}")
        root.set("width", str(width))
        root.set("height", str(height))
        svg = OUT / f"logo-{shape}-{color}.svg"
        tree.write(svg, encoding="utf-8", xml_declaration=True)
        png = OUT / f"logo-{shape}-{color}.png"
        cairosvg.svg2png(url=str(svg), write_to=str(png), output_width=1600)


if __name__ == "__main__":
    ET.register_namespace("", "http://www.w3.org/2000/svg")
    ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")
    for shape, page in (("horizontal", 1), ("stacked", 2), ("mark", 3)):
        for color in COLORS:
            export(shape, page, color)
