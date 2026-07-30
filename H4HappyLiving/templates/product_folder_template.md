# Product Folder Template

## Purpose

Use one self-contained folder for every H4HappyLiving product. This keeps its design work, Etsy assets, customer files, and history together from idea through launch and later updates.

## Standard structure

```text
products/
└── product-slug/
    ├── README.md
    ├── requirements/
    ├── research/
    ├── designs/
    ├── deliverables/
    ├── etsy-shop/
    │   ├── listing-copy/
    │   ├── listing-images/
    │   └── mockups/
    ├── templates/
    ├── marketing/
    └── archive/
```

## Folder responsibilities

| Folder | Store here |
|---|---|
| `requirements/` | Product brief, customer problem, scope, sizes, and acceptance criteria |
| `research/` | Keywords, competitor notes, market evidence, licenses, and source links |
| `designs/` | Editable source files and working design iterations |
| `deliverables/` | Final customer-ready files, instructions, and bundle ZIP files |
| `etsy-shop/listing-copy/` | Listing title, description, tags, attributes, pricing, and FAQs |
| `etsy-shop/listing-images/` | Final Etsy gallery images and thumbnails |
| `etsy-shop/mockups/` | Product-specific mockups used in the listing |
| `templates/` | Reusable layouts or masters specific to this product or product family |
| `marketing/` | Social posts, pins, emails, launch graphics, and promotional copy |
| `archive/` | Superseded versions retained for reference |

## Product README

Create `README.md` at the root of each product folder with:

```markdown
# Product name

- Status: idea | validating | designing | ready | live | updating | archived
- Primary pillar: Organize | Learn | Create | Thrive
- Secondary pillar: optional
- Product owner:
- Etsy listing URL:
- Canva project URL:
- Last reviewed: YYYY-MM-DD

## Customer problem

## Product promise

## Included files

## Key decisions

## Launch checklist
```

## Placement rules

- Put an item in the individual product folder when it exists for that product only.
- Keep shared logos, colors, fonts, photography, and brand guidance in `assets/brand/`.
- Keep business-wide reusable templates in the repository-level `templates/` folder.
- Promote a product-specific template to the shared template library only after it has proven reusable across multiple products.
- Record brand pillars as metadata; do not create Organize, Learn, Create, or Thrive parent directories.
- Keep exported customer files separate from editable source designs.
- Move obsolete versions to `archive/` rather than mixing them with current files.

## Canva equivalent

Inside Canva, create one folder per product under **H4HappyLiving → Product**. Within that product folder, use:

```text
Product Name/
├── Designs
├── Etsy Shop
│   ├── Listing Images
│   └── Mockups
├── Templates
├── Marketing
└── Archive
```

The Canva Brand Kit remains account-level. Shared brand references belong under **H4HappyLiving → Brand**, and shared master templates belong under **H4HappyLiving → Templates**.

The top-level Canva Product folder should remain empty until a real product is created. Retired pillar folders are stored under **H4HappyLiving → Archive → Legacy Product Categories** for recovery only and must not receive new work.

## Revision history

- 2026-07-30 — Aligned the template with the implemented Canva Product and legacy Archive structure.
- 2026-07-30 — Replaced pillar-first organization with a product-first, self-contained folder standard.
- 2026-07-29 — Initial starter document.
