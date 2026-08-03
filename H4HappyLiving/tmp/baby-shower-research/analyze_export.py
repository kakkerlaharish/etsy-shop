import csv
import json
import re
import statistics
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "research" / "inbox" / "last_1_month_babyshowerinvitation_analytics20260802-10-n2d8xh.csv"
OUT = Path(__file__).resolve().parent

NUMERIC_FIELDS = {
    "Price": float,
    "Est. Sales": float,
    "Est. Revenue": float,
    "Growth Rate": float,
    "Est. Total Sales": float,
    "Total Reviews": float,
    "Total Favorites": float,
    "Avg. Reviews": float,
    "Total Views": float,
    "Shop Age": float,
    "Visibility Score": float,
    "Conversion Rate": float,
    "Total Shop Sales": float,
}

IP_TERMS = [
    "winnie the pooh", "pooh bear", "disney", "bluey", "hello kitty", "snoopy",
    "peanuts", "barbie", "pokemon", "harry potter", "star wars", "dr seuss",
    "grinch", "mickey", "minnie", "sesame street", "care bears", "lion king",
    "toy story", "boy story", "peter rabbit", "curious george", "paddington",
    "dumbo", "bambi", "stitch", "jungle book", "alice in wonderland",
]


def number(value, converter=float):
    try:
        return converter(str(value).replace(",", "").replace("%", "").strip())
    except (TypeError, ValueError):
        return None


def age_months(value):
    text = (value or "").lower().strip()
    match = re.search(r"([0-9.]+)", text)
    if not match:
        return None
    amount = float(match.group(1))
    if "yr" in text:
        return round(amount * 12)
    if "mo" in text:
        return round(amount)
    if "day" in text:
        return max(0, round(amount / 30))
    return None


def classify(row):
    title = row["Product Name"].lower()
    tags = row.get("Tags", "").lower()
    text = f"{title} {tags}"
    baby = "baby shower" in title or "babyshower" in title
    invite = bool(re.search(r"\binvitation(s)?\b|\binvite(s)?\b", title))
    digital = any(term in text for term in ["digital", "editable", "template", "download", "printable", "canva", "corjl", "templett"])
    bundle = any(term in title for term in ["bundle", "games", "mega pack", "complete set", "full set"])
    ancillary = any(term in title for term in [
        "clipart", "clip art", "frame png", "svg", "welcome sign", "thank you card",
        "diaper raffle", "book request", "advice card", "prediction card", "shower game",
        "favor tag", "water bottle label", "banner", "poster",
    ])
    physical = any(term in title for term in ["printed invitation", "printed invitations", "physical invitation", "mailed invitation"])
    ip_risk = any(term in text for term in IP_TERMS)

    if baby and invite and digital and not bundle and not ancillary and not physical:
        segment = "Direct"
    elif baby and digital and (invite or bundle or ancillary):
        segment = "Adjacent"
    else:
        segment = "Off-niche"
    return segment, ip_risk


def theme(row):
    text = f"{row['Product Name']} {row.get('Tags', '')}".lower()
    themes = [
        ("Locally grown / farmers market", ["locally grown", "farmers market", "little sprout"]),
        ("Wildflower / baby in bloom", ["wildflower", "baby in bloom", "in bloom", "floral shower"]),
        ("Bows / coquette", ["bow", "coquette", "ribbon"]),
        ("Book shower / new chapter", ["book shower", "bring a book", "story book", "storybook", "new chapter", "chapter begins"]),
        ("Western / cowboy", ["western", "cowboy", "cowgirl", "rodeo"]),
        ("Teddy bear", ["teddy bear", "bearly wait", "we can bear"]),
        ("Citrus / little cutie", ["little cutie", "orange", "lemon", "citrus"]),
        ("Butterfly", ["butterfly"]),
        ("Blueberry", ["blueberry", "berry sweet"]),
        ("Minimal neutral", ["minimal", "neutral", "beige", "simple"]),
    ]
    for label, terms in themes:
        if any(term in text for term in terms):
            return label
    return "Other"


with SOURCE.open("r", encoding="utf-8-sig", newline="") as handle:
    reader = csv.DictReader(handle)
    source_fields = reader.fieldnames or []
    rows = list(reader)

for row in rows:
    for field, converter in NUMERIC_FIELDS.items():
        row[field] = number(row.get(field), converter)
    row["Listing Age Months"] = age_months(row.get("Listing Age"))
    row["Derived Segment"], row["Derived IP Risk"] = classify(row)
    row["Derived Theme"] = theme(row)

links = [row.get("Product Link", "") for row in rows]
duplicate_count = len(links) - len(set(links))
direct = [row for row in rows if row["Derived Segment"] == "Direct"]
adjacent = [row for row in rows if row["Derived Segment"] == "Adjacent"]
off_niche = [row for row in rows if row["Derived Segment"] == "Off-niche"]
safe_direct = [row for row in direct if not row["Derived IP Risk"]]

prices = [row["Price"] for row in direct if row["Price"] is not None]
sales = [row["Est. Sales"] or 0 for row in direct]
revenues = [row["Est. Revenue"] or 0 for row in direct]
sorted_direct = sorted(direct, key=lambda row: (row["Est. Sales"] or 0, row["Est. Revenue"] or 0), reverse=True)
top10_sales = sum((row["Est. Sales"] or 0) for row in sorted_direct[:10])
total_sales = sum(sales)

tag_counter = Counter()
for row in direct:
    seen = set()
    tags = []
    if row.get("Tags"):
        tags.extend(part.strip() for part in row["Tags"].split(","))
    tags.extend(row.get(f"Tag {index}", "").strip() for index in range(1, 14))
    for tag in tags:
        normalized = re.sub(r"\s+", " ", tag.lower()).strip()
        if normalized and normalized not in seen:
            tag_counter[normalized] += 1
            seen.add(normalized)

theme_summary = []
for theme_name in sorted({row["Derived Theme"] for row in safe_direct}):
    subset = [row for row in safe_direct if row["Derived Theme"] == theme_name]
    theme_sales = sum((row["Est. Sales"] or 0) for row in subset)
    new_rows = [row for row in subset if row["Listing Age Months"] is not None and row["Listing Age Months"] <= 12]
    theme_summary.append({
        "theme": theme_name,
        "listings": len(subset),
        "est_sales": theme_sales,
        "sales_per_listing": theme_sales / len(subset) if subset else 0,
        "new_listings": len(new_rows),
        "new_est_sales": sum((row["Est. Sales"] or 0) for row in new_rows),
        "median_price": statistics.median([row["Price"] for row in subset if row["Price"] is not None]) if any(row["Price"] is not None for row in subset) else None,
    })
theme_summary.sort(key=lambda item: (item["new_est_sales"], item["sales_per_listing"]), reverse=True)

summary = {
    "source_file": SOURCE.name,
    "rows": len(rows),
    "columns": source_fields,
    "duplicate_count": duplicate_count,
    "direct_count": len(direct),
    "adjacent_count": len(adjacent),
    "off_niche_count": len(off_niche),
    "safe_direct_count": len(safe_direct),
    "ip_risk_direct_count": sum(1 for row in direct if row["Derived IP Risk"]),
    "direct_nonzero_sales": sum(1 for value in sales if value > 0),
    "direct_est_sales": total_sales,
    "direct_est_revenue": sum(revenues),
    "direct_price_min": min(prices) if prices else None,
    "direct_price_median": statistics.median(prices) if prices else None,
    "direct_price_max": max(prices) if prices else None,
    "top10_sales_share": top10_sales / total_sales if total_sales else 0,
    "new_direct_count": sum(1 for row in direct if row["Listing Age Months"] is not None and row["Listing Age Months"] <= 12),
    "new_direct_nonzero_sales": sum(1 for row in direct if row["Listing Age Months"] is not None and row["Listing Age Months"] <= 12 and (row["Est. Sales"] or 0) > 0),
    "top_direct": sorted_direct[:25],
    "top_safe_new": sorted(
        [row for row in safe_direct if row["Listing Age Months"] is not None and row["Listing Age Months"] <= 12],
        key=lambda row: (row["Est. Sales"] or 0, row["Growth Rate"] or 0),
        reverse=True,
    )[:25],
    "top_tags": [{"tag": tag, "count": count, "share": count / len(direct) if direct else 0} for tag, count in tag_counter.most_common(60)],
    "themes": theme_summary,
}

derived_fields = ["Derived Segment", "Derived IP Risk", "Derived Theme", "Listing Age Months"]
with (OUT / "normalized_rows.json").open("w", encoding="utf-8") as handle:
    json.dump({"fields": source_fields + derived_fields, "rows": rows}, handle, ensure_ascii=False)
with (OUT / "summary.json").open("w", encoding="utf-8") as handle:
    json.dump(summary, handle, ensure_ascii=False, indent=2)

print(json.dumps({key: value for key, value in summary.items() if key not in {"columns", "top_direct", "top_safe_new", "top_tags", "themes"}}, indent=2))
print("TOP THEMES")
for item in theme_summary[:12]:
    print(item)
print("TOP SAFE NEW")
for row in summary["top_safe_new"][:12]:
    print(row["Est. Sales"], row["Growth Rate"], row["Price"], row["Listing Age"], row["Derived Theme"], row["Product Name"][:140], row["Product Link"])
print("TOP TAGS")
for item in summary["top_tags"][:25]:
    print(item)
