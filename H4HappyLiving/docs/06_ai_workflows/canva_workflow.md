# Canva Workflow

## Purpose

Define where H4HappyLiving work belongs in Canva and keep the Canva account aligned with the repository's product-first organization.

## Current Canva structure

Reviewed and implemented on 2026-07-30:

```text
H4HappyLiving/
|-- Brand/
|   |-- Logos & Marks/
|   |-- Brand Guidelines/
|   `-- Photography & Graphics/
|-- Designs/
|   |-- Social Media/
|   |   |-- Instagram/
|   |   |-- Pinterest/
|   |   `-- Facebook/
|   |-- Etsy Shop/
|   |   |-- Shop Branding/
|   |   |-- Listing Images/
|   |   `-- Mockups/
|   `-- Web & Email/
|-- Product/
|-- Sales/
|   |-- Launches & Campaigns/
|   `-- Promotions/
|-- Templates/
|   |-- Social Templates/
|   |-- Etsy Listing Templates/
|   `-- Product Templates/
`-- Archive/
    `-- Legacy Product Categories/
        |-- Organize/
        |-- Learn/
        |-- Create/
        |-- Thrive/
        `-- Bundles/
```

The top-level **Product** folder is intentionally empty until an actual product workspace is created.

## Canva links

- [H4HappyLiving Product](https://www.canva.com/folder/FAHQ0sUgD0Q)
- [Brand: Logos & Marks](https://www.canva.com/folder/FAHQ3knvE7w)
- [Brand: Brand Guidelines](https://www.canva.com/folder/FAHQ3pBOk6U)
- [Designs: Instagram](https://www.canva.com/folder/FAHQ3mTWHH0)
- [Archive: Legacy Product Categories](https://www.canva.com/folder/FAHQ35LMrFQ)

## Brand Kit rule

The **H4HappyLiving Canva Brand Kit** remains at the Canva account level and is the source of truth for active colors, fonts, and logos. Canva does not store a Brand Kit inside a project folder.

Use **H4HappyLiving → Brand** for supporting files such as logo exports, the brand board, photography, graphics, and human-readable guidance. Keep the Canva Brand Kit and the repository files in `assets/brand/` aligned whenever the identity changes.

### Brand-content synchronization

Canva provides the visual working environment; the detailed written standards live in `docs/01_brand/brand_guidelines.md` and `docs/01_brand/brand_voice.md`. When synchronizing from Canva:

1. Review the active Brand Kit and the newest items in Brand → Brand Guidelines.
2. Review current approved campaign or pillar designs for real messaging patterns.
3. Separate deliberate brand language from generated template filler.
4. Update the repository documents with approved decisions and record the review date.
5. Update Canva working assets if the documented identity changes.

Do not treat invented dates, venues, events, statistics, testimonials, or generic calls to action in generated Canva designs as brand policy. As of the 2026-07-30 review, Canva does not contain a separate readable brand-voice document; the repository voice guide is the detailed source of truth.

## Product-first rule

Create one folder for each real product directly beneath **H4HappyLiving → Product**. Do not create Organize, Learn, Create, Thrive, or Bundles as working parent folders. Those terms are product metadata and brand navigation labels.

Use this structure inside every product folder:

```text
Product Name/
|-- Designs/
|-- Etsy Shop/
|   |-- Listing Images/
|   `-- Mockups/
|-- Templates/
|-- Marketing/
`-- Archive/
```

## Placement rules

- **Brand:** shared identity assets used across the business.
- **Designs:** finished channel-level work that is not tied to one product, such as general brand posts or shop-wide graphics.
- **Product:** all work tied to a specific sellable product, including its designs, Etsy assets, mockups, templates, and promotion.
- **Sales:** multi-product campaigns, shop-wide promotions, and launch planning.
- **Templates:** proven master layouts intended for reuse across multiple products or campaigns.
- **Archive:** retired or superseded material kept for recovery and historical reference; never use it as active working storage.

If a file serves only one product, keep it inside that product. If it is reused across multiple products, promote a clean master copy to the appropriate shared Brand, Designs, or Templates folder.

## New product setup

1. Create a folder under **H4HappyLiving → Product** using the customer-facing product name.
2. Add Designs, Etsy Shop, Templates, Marketing, and Archive.
3. Add Listing Images and Mockups beneath Etsy Shop.
4. Record the Canva folder URL in the product README in the repository.
5. Assign the primary pillar in product metadata rather than the folder path.
6. Keep editable Canva sources in Designs and finished Etsy gallery assets in Etsy Shop → Listing Images.
7. Move superseded versions to the product's Archive folder.

## Legacy categories

The empty pillar-based folders created during initial setup were moved to **Archive → Legacy Product Categories** on 2026-07-30. They contain no product work and are retained only because the Canva connector does not provide safe folder deletion. Do not add new content to them.

## Revision history

- 2026-07-30 — Added the Canva-to-repository brand-content synchronization and generated-copy review rules.
- 2026-07-30 — Documented the implemented Canva hierarchy, product-first rule, placement standards, links, and legacy archive.
- 2026-07-29 — Initial starter document.
