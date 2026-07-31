"""Generate the H4HappyLiving 10-Minute Home Reset customer PDFs."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, LETTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


PRODUCT_ROOT = Path(__file__).resolve().parents[1]
DELIVERABLES = PRODUCT_ROOT / "deliverables"

FONT_DIR = Path("C:/Windows/Fonts")
FONT_REGULAR = FONT_DIR / "arial.ttf"
FONT_BOLD = FONT_DIR / "arialbd.ttf"
FONT_ITALIC = FONT_DIR / "ariali.ttf"

if all(path.exists() for path in (FONT_REGULAR, FONT_BOLD, FONT_ITALIC)):
    pdfmetrics.registerFont(TTFont("H4-Regular", str(FONT_REGULAR)))
    pdfmetrics.registerFont(TTFont("H4-Bold", str(FONT_BOLD)))
    pdfmetrics.registerFont(TTFont("H4-Italic", str(FONT_ITALIC)))
else:
    raise FileNotFoundError("Approved Arial fallback font files were not found.")


COLOR = {
    "evergreen": HexColor("#285247"),
    "ink": HexColor("#24332F"),
    "cream": HexColor("#FFF9F1"),
    "white": HexColor("#FFFFFF"),
    "sage": HexColor("#B8D2C5"),
    "gold": HexColor("#F2B84B"),
    "line": HexColor("#CDD9D3"),
    "muted": HexColor("#5A6964"),
}

BW = {
    "evergreen": HexColor("#1D1D1D"),
    "ink": HexColor("#111111"),
    "cream": HexColor("#FFFFFF"),
    "white": HexColor("#FFFFFF"),
    "sage": HexColor("#EDEDED"),
    "gold": HexColor("#D8D8D8"),
    "line": HexColor("#B8B8B8"),
    "muted": HexColor("#4E4E4E"),
}


def wrapped_lines(c, text, font_name, font_size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if c.stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font_name, font_size, leading, color):
    c.setFillColor(color)
    c.setFont(font_name, font_size)
    for line in wrapped_lines(c, text, font_name, font_size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_mark(c, x, y, size, palette):
    """Draw the brand home mark as vector shapes."""
    c.setFillColor(palette["evergreen"])
    c.roundRect(x, y, size, size * 0.70, size * 0.09, stroke=0, fill=1)
    roof = c.beginPath()
    roof.moveTo(x, y + size * 0.60)
    roof.lineTo(x + size * 0.50, y + size)
    roof.lineTo(x + size, y + size * 0.60)
    roof.close()
    c.drawPath(roof, stroke=0, fill=1)
    window_color = palette["cream"]
    gap = size * 0.10
    win = size * 0.18
    start_x = x + size * 0.24
    start_y = y + size * 0.16
    c.setFillColor(window_color)
    for row in range(2):
        for col in range(2):
            c.roundRect(
                start_x + col * (win + gap),
                start_y + row * (win + gap * 0.6),
                win,
                win,
                win * 0.28,
                stroke=0,
                fill=1,
            )


def draw_checkbox(c, x, y, size, palette):
    c.setFillColor(palette["white"])
    c.setStrokeColor(palette["evergreen"])
    c.setLineWidth(1.1)
    c.roundRect(x, y - size, size, size, 2.4, stroke=1, fill=1)


def draw_footer(c, width, margin, page_number, palette):
    c.setStrokeColor(palette["line"])
    c.setLineWidth(0.7)
    c.line(margin, 35, width - margin, 35)
    c.setFillColor(palette["muted"])
    c.setFont("H4-Regular", 7.5)
    c.drawString(margin, 21, "H4HappyLiving | Make room for what matters.")
    c.drawRightString(width - margin, 21, str(page_number))


def draw_header(c, width, height, margin, palette, section):
    mark_size = 24
    draw_mark(c, margin, height - margin - mark_size + 1, mark_size, palette)
    c.setFillColor(palette["ink"])
    c.setFont("H4-Bold", 10)
    c.drawString(margin + 32, height - margin + 1, "H4HappyLiving")
    c.setFillColor(palette["evergreen"])
    c.setFont("H4-Regular", 7.2)
    c.drawString(margin + 32, height - margin - 10, "PRACTICAL JOY FOR EVERYDAY LIFE")
    c.setFillColor(palette["gold"])
    c.roundRect(width - margin - 72, height - margin - 14, 72, 22, 11, stroke=0, fill=1)
    c.setFillColor(palette["ink"])
    c.setFont("H4-Bold", 7.4)
    c.drawCentredString(width - margin - 36, height - margin - 6, section.upper())


def start_page(c, page_size, palette, page_number, section):
    width, height = page_size
    margin = 42 if page_size == LETTER else 40
    c.setFillColor(palette["cream"])
    c.rect(0, 0, width, height, stroke=0, fill=1)
    draw_header(c, width, height, margin, palette, section)
    draw_footer(c, width, margin, page_number, palette)
    return width, height, margin


def draw_title(c, text, subtitle, x, y, width, palette, size=24):
    c.setFillColor(palette["evergreen"])
    c.setFont("H4-Bold", size)
    for line in wrapped_lines(c, text, "H4-Bold", size, width):
        c.drawString(x, y, line)
        y -= size * 1.08
    y -= 5
    y = draw_wrapped(c, subtitle, x, y, width, "H4-Regular", 10.5, 14, palette["muted"])
    return y - 12


def draw_checklist_card(c, x, y, width, heading, items, palette, row_height=28):
    height = 43 + len(items) * row_height
    c.setFillColor(palette["white"])
    c.setStrokeColor(palette["line"])
    c.setLineWidth(0.8)
    c.roundRect(x, y - height, width, height, 10, stroke=1, fill=1)
    c.setFillColor(palette["sage"])
    c.roundRect(x, y - 34, width, 34, 10, stroke=0, fill=1)
    c.rect(x, y - 34, width, 10, stroke=0, fill=1)
    c.setFillColor(palette["ink"])
    c.setFont("H4-Bold", 10.5)
    c.drawString(x + 14, y - 22, heading)
    item_y = y - 51
    for item in items:
        draw_checkbox(c, x + 14, item_y + 6, 11, palette)
        c.setFillColor(palette["ink"])
        c.setFont("H4-Regular", 9.4)
        c.drawString(x + 34, item_y, item)
        item_y -= row_height
    return y - height


def page_cover(c, page_size, palette):
    width, height, margin = start_page(c, page_size, palette, 1, "Organize")
    y = height - margin - 82
    c.setFillColor(palette["gold"])
    c.circle(width - margin - 40, y + 26, 42, stroke=0, fill=1)
    c.setFillColor(palette["evergreen"])
    c.setFont("H4-Bold", 12)
    c.drawCentredString(width - margin - 40, y + 29, "10")
    c.setFont("H4-Regular", 7.5)
    c.drawCentredString(width - margin - 40, y + 17, "MINUTES")
    y = draw_title(
        c,
        "The 10-Minute Home Reset",
        "A simple printable routine for making your space feel lighter, one small step at a time.",
        margin,
        y,
        width - 2 * margin - 92,
        palette,
        27,
    )
    y -= 12
    y = draw_checklist_card(
        c,
        margin,
        y,
        width - 2 * margin,
        "Begin in four easy steps",
        [
            "Choose the reset that matches your time and energy.",
            "Set a timer and let the checklist guide the decisions.",
            "Move in order, or skip any step that does not help today.",
            "Stop when the timer ends. Better is enough.",
        ],
        palette,
        32,
    )
    y -= 20
    c.setFillColor(palette["evergreen"])
    c.roundRect(margin, y - 86, width - 2 * margin, 86, 12, stroke=0, fill=1)
    c.setFillColor(palette["white"])
    c.setFont("H4-Bold", 18)
    c.drawCentredString(width / 2, y - 33, "Progress counts, even when it is small.")
    c.setFont("H4-Regular", 9.5)
    c.drawCentredString(width / 2, y - 55, "Use what helps. Pause when you need to. Begin again your way.")
    c.showPage()


def page_ten_minute(c, page_size, palette):
    width, height, margin = start_page(c, page_size, palette, 2, "10-minute reset")
    y = draw_title(
        c,
        "Your whole-home reset",
        "Five focused rounds. Spend about two minutes on each, then stop when the timer ends.",
        margin,
        height - margin - 70,
        width - 2 * margin,
        palette,
    )
    rounds = [
        ("1", "Trash and recycling", "Collect the obvious pieces. Leave sorting for another time."),
        ("2", "Dishes and cups", "Bring them to the sink or dishwasher. Washing is optional."),
        ("3", "Laundry", "Gather loose clothes and towels into one basket or pile."),
        ("4", "Items out of place", "Return the easiest items first. Use one catch-all basket if helpful."),
        ("5", "One visible surface", "Clear and wipe the surface that will make the room feel lighter."),
    ]
    card_h = 72
    for number, heading, detail in rounds:
        c.setFillColor(palette["white"])
        c.setStrokeColor(palette["line"])
        c.roundRect(margin, y - card_h, width - 2 * margin, card_h, 10, stroke=1, fill=1)
        c.setFillColor(palette["gold"])
        c.circle(margin + 25, y - 24, 13, stroke=0, fill=1)
        c.setFillColor(palette["ink"])
        c.setFont("H4-Bold", 10)
        c.drawCentredString(margin + 25, y - 27, number)
        draw_checkbox(c, width - margin - 29, y - 17, 14, palette)
        c.setFont("H4-Bold", 11)
        c.drawString(margin + 49, y - 21, heading)
        draw_wrapped(c, detail, margin + 49, y - 41, width - 2 * margin - 94, "H4-Regular", 9, 12, palette["muted"])
        y -= card_h + 9
    c.showPage()


def page_low_energy(c, page_size, palette):
    width, height, margin = start_page(c, page_size, palette, 3, "5-minute reset")
    y = draw_title(
        c,
        "The five-minute minimum win",
        "For a low-energy day: give each step one minute, then give yourself permission to stop.",
        margin,
        height - margin - 70,
        width - 2 * margin,
        palette,
    )
    y = draw_checklist_card(
        c,
        margin,
        y,
        width - 2 * margin,
        "One minute at a time",
        [
            "Throw away or recycle five obvious pieces.",
            "Move dishes and cups to the sink.",
            "Put loose clothes and towels in one place.",
            "Return five items to where they belong.",
            "Clear a space about the size of one sheet of paper.",
        ],
        palette,
        39,
    )
    y -= 22
    c.setFillColor(palette["white"])
    c.setStrokeColor(palette["gold"])
    c.setLineWidth(1.4)
    c.roundRect(margin, y - 94, width - 2 * margin, 94, 10, stroke=1, fill=1)
    c.setFillColor(palette["evergreen"])
    c.setFont("H4-Bold", 11)
    c.drawString(margin + 15, y - 24, "My minimum win today")
    c.setStrokeColor(palette["line"])
    c.line(margin + 15, y - 51, width - margin - 15, y - 51)
    c.line(margin + 15, y - 76, width - margin - 15, y - 76)
    c.showPage()


def page_rooms(c, page_size, palette):
    width, height, margin = start_page(c, page_size, palette, 4, "Room reset")
    y = draw_title(
        c,
        "Choose one room",
        "Pick the space that would make the biggest difference right now. Completing one box is enough.",
        margin,
        height - margin - 70,
        width - 2 * margin,
        palette,
    )
    gap = 12
    card_w = (width - 2 * margin - gap) / 2
    rooms = [
        ("Kitchen", ["Clear the sink", "Wipe one counter", "Put food away", "Sweep visible crumbs"]),
        ("Living room", ["Collect dishes", "Fold blankets", "Clear one surface", "Reset cushions"]),
        ("Bedroom", ["Gather laundry", "Clear the bedside area", "Straighten the bed", "Put away five items"]),
        ("Bathroom", ["Clear the counter", "Wipe the sink", "Hang the towels", "Empty the trash"]),
    ]
    for index, (heading, items) in enumerate(rooms):
        col = index % 2
        row = index // 2
        x = margin + col * (card_w + gap)
        card_y = y - row * 192
        draw_checklist_card(c, x, card_y, card_w, heading, items, palette, 31)
    c.showPage()


def page_tracker(c, page_size, palette):
    width, height, margin = start_page(c, page_size, palette, 5, "Weekly rhythm")
    y = draw_title(
        c,
        "A gentle week of resets",
        "Notice what helps. Empty boxes are information, not failure.",
        margin,
        height - margin - 70,
        width - 2 * margin,
        palette,
    )
    table_w = width - 2 * margin
    c.setFillColor(palette["sage"])
    c.roundRect(margin, y - 36, table_w, 36, 9, stroke=0, fill=1)
    c.setFillColor(palette["ink"])
    c.setFont("H4-Bold", 8)
    c.drawString(margin + 13, y - 23, "DAY")
    c.drawString(margin + 126, y - 23, "5 MIN")
    c.drawString(margin + 190, y - 23, "10 MIN")
    c.drawString(margin + 263, y - 23, "WHAT FELT LIGHTER?")
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    row_top = y - 36
    row_h = 49
    for day in days:
        row_bottom = row_top - row_h
        c.setFillColor(palette["white"])
        c.rect(margin, row_bottom, table_w, row_h, stroke=0, fill=1)
        c.setStrokeColor(palette["line"])
        c.line(margin, row_bottom, width - margin, row_bottom)
        c.setFillColor(palette["ink"])
        c.setFont("H4-Regular", 9.5)
        c.drawString(margin + 13, row_bottom + 19, day)
        draw_checkbox(c, margin + 137, row_bottom + 29, 12, palette)
        draw_checkbox(c, margin + 203, row_bottom + 29, 12, palette)
        c.setStrokeColor(palette["line"])
        c.line(margin + 263, row_bottom + 14, width - margin - 12, row_bottom + 14)
        row_top = row_bottom
    c.showPage()


def page_custom(c, page_size, palette):
    width, height, margin = start_page(c, page_size, palette, 6, "Make it yours")
    y = draw_title(
        c,
        "My personal reset",
        "Write the steps that make your own home feel easier to live in.",
        margin,
        height - margin - 70,
        width - 2 * margin,
        palette,
    )
    for _ in range(9):
        draw_checkbox(c, margin + 3, y + 7, 12, palette)
        c.setStrokeColor(palette["line"])
        c.line(margin + 27, y - 2, width - margin, y - 2)
        y -= 39
    y -= 3
    c.setFillColor(palette["sage"])
    c.roundRect(margin, y - 91, width - 2 * margin, 91, 10, stroke=0, fill=1)
    c.setFillColor(palette["ink"])
    c.setFont("H4-Bold", 10.5)
    c.drawString(margin + 15, y - 23, "Make it easier to begin")
    c.setFont("H4-Regular", 9)
    c.drawString(margin + 15, y - 47, "I will start after: ______________________________________")
    c.drawString(margin + 15, y - 70, "My timer or playlist: ____________________________________")
    c.setFillColor(palette["muted"])
    c.setFont("H4-Regular", 6.8)
    c.drawString(margin, 43, "This printable is an organizational aid and is not medical advice or treatment.")
    c.showPage()


def build(filename, page_size, palette):
    path = DELIVERABLES / filename
    path.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(path), pagesize=page_size, pageCompression=1)
    c.setTitle("The 10-Minute Home Reset")
    c.setAuthor("H4HappyLiving")
    c.setSubject("A gentle printable home reset checklist")
    c.setCreator("H4HappyLiving")
    page_cover(c, page_size, palette)
    page_ten_minute(c, page_size, palette)
    page_low_energy(c, page_size, palette)
    page_rooms(c, page_size, palette)
    page_tracker(c, page_size, palette)
    page_custom(c, page_size, palette)
    c.save()
    return path


def main():
    outputs = [
        build("H4HappyLiving_10-Minute_Home_Reset_US-Letter.pdf", LETTER, COLOR),
        build("H4HappyLiving_10-Minute_Home_Reset_A4.pdf", A4, COLOR),
        build("H4HappyLiving_10-Minute_Home_Reset_US-Letter_Printer-Friendly.pdf", LETTER, BW),
        build("H4HappyLiving_10-Minute_Home_Reset_A4_Printer-Friendly.pdf", A4, BW),
    ]
    for output in outputs:
        print(output)


if __name__ == "__main__":
    main()
