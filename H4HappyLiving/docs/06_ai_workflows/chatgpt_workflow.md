# Codex Niche Research Workflow

## Purpose

Turn a niche prompt and optional EverBee export into a concise, evidence-backed product decision for H4HappyLiving. Use this workflow whenever the user says `Research niche "<name>"` or requests product, niche, market, or competitor research.

## Input

Minimum prompt:

```text
Research niche "<niche name>"
```

Optional inputs:

- EverBee CSV or XLSX filename
- Market, country, or currency
- Customer segment
- Digital or physical format
- Price or production constraints
- Competitor URLs

Use Etsy US and USD by default. Record material assumptions instead of stopping for minor missing details.

## File lifecycle

1. Receive untouched exports in `research/inbox/`.
2. Create `research/niches/<niche-slug>/`.
3. Complete and verify the research.
4. Move the original export to `research/niches/<niche-slug>/source/everbee-original.<ext>`.
5. Leave `research/inbox/` empty except for `.gitkeep`.

Do not modify the original export. Do not create a product folder until the user approves the recommendation.

## Research process

### 1. Define the market

- Identify the buyer problem, product type, intended user, format, and likely search language.
- Expand the prompt into direct, adjacent, buyer-intent, format, and audience search phrases.
- Separate materially different submarkets instead of blending their metrics.

### 2. Validate the EverBee export

When an export is present:

- Record the filename, export period, row count, columns, and duplicate count.
- Preserve raw rows in the `EverBee` worksheet.
- Convert numeric fields to numeric values.
- Classify listings into direct, adjacent, and off-niche segments.
- Extract and normalize `Tags` and `Tag 1` through `Tag 13` when present.
- Calculate tag frequency and share using the direct segment, not the entire noisy export.
- Preserve the original tag text while using a normalized lowercase value for aggregation.
- Base the decision on the direct segment; do not inflate demand with unrelated rows.
- Treat sales, revenue, conversion, visibility, and growth as estimates.
- Report zero estimates as `no estimated sales`, not verified zero sales.

When no export is present, continue with public evidence and lower the confidence rating.

### 3. Gather current Etsy evidence

- Search several relevant keyword clusters rather than one phrase.
- Sample direct competitors, adjacent products, low and premium prices, established listings, and newer entrants.
- Limit repeated listings from the same shop.
- Record current price, positioning, format, features, bundle structure, and available ratings or reviews.
- Capture publicly visible listing tags from representative Etsy listings.
- When Etsy does not expose a listing's tags, record relevant title or description phrases as `Etsy title phrase` or `Etsy description phrase`; never label inferred phrases as tags.
- Preserve the listing URL and observation date for every Etsy tag or phrase.
- Extract review themes: purchase reasons, praise, confusion, technical problems, missing features, and requested improvements.
- Describe visual and product patterns; never copy competitor designs.
- Never call observed search order a verified sales rank.

### 4. Analyze the opportunity

Calculate or assess:

- Listing count and relevant-segment share
- Price range and median
- Listings with non-zero estimated sales
- Estimated sales and revenue
- Concentration among leading listings or shops
- Listing age and new-entrant traction
- Common features and offer gaps
- EverBee tag frequency, Etsy listing tags, title phrases, and buyer intent
- Review-driven needs and friction
- Production complexity and support burden
- H4HappyLiving brand fit

Separate sourced facts, observed marketplace data, EverBee estimates, and strategic inference.

### 5. Score and decide

Use these weights:

| Dimension | Weight |
|---|---:|
| Demand evidence | 25% |
| Competitive opportunity | 20% |
| Differentiation potential | 20% |
| H4HappyLiving brand fit | 15% |
| Profit potential | 10% |
| Production feasibility | 10% |

Decision bands:

- `GO`: 75-100
- `TEST`: 55-74
- `REJECT`: below 55

Assign confidence separately:

- `High`: strong current evidence from multiple sources
- `Medium`: useful evidence with material estimation or coverage limits
- `Low`: sparse, noisy, or mainly inferred evidence

Do not raise a score to make a niche appear attractive. Explain the strongest counterargument.

## Output contract

Create exactly these permanent outputs:

```text
research/niches/<niche-slug>/
|-- analysis.md
|-- evidence.xlsx
`-- source/
    `-- everbee-original.<ext>   # only when provided
```

### `analysis.md`

Use `research/niches/_template/analysis.md`. Keep it under approximately 1,500 words and decision-focused. Include:

1. Decision
2. Market Snapshot
3. Competitor Patterns
4. Market Opportunities
5. Recommended Product
6. SEO Direction
7. Risks and Next Action

### `evidence.xlsx`

Create four worksheets:

1. `Competitors` — concise summary, scorecard, and representative direct competitors
2. `EverBee` — intact source fields plus transparent derived classification fields
3. `Keywords` — source, evidence type, segment, tag or phrase, count, share, listing URL, and observation date
4. `Reviews` — source listing, observed rating or price, review theme, implication, and URL

Use H4HappyLiving's Calm Everyday palette. Keep calculations formula-driven, preserve source URLs, scan for formula errors, and visually verify all four worksheets.

## Quality rules

- Prefer a precise `TEST` or `REJECT` over an unsupported `GO`.
- State data limitations next to the affected conclusion.
- Do not confuse shop sales with listing sales.
- Do not present EverBee estimates as Etsy facts.
- Do not treat a large result count as demand.
- Do not merge EverBee tags and Etsy-observed tags without retaining their source.
- Do not invent Etsy tags when the public listing does not expose them.
- Do not recommend a broad product when one focused submarket has stronger evidence.
- Recommend a price, minimum viable product, differentiators, SEO direction, risks, and one next action.
- Keep temporary builders, previews, and normalized files outside the permanent niche folder and remove them after verification.

## Product-development handoff

Start this phase only after the user approves a product recommendation.

### 1. Create the product brief

- Create the product folder using `templates/product_folder_template.md`.
- Build `requirements/product-brief.md` from `templates/product_requirement_template.md`.
- Carry forward the approved customer, promise, price, minimum viable product, SEO direction, risks, and evidence sources.

### 2. Select reference listings

Choose 2-3 direct Etsy listings with complementary evidence:

1. A demonstrated-demand or highly reviewed listing
2. A listing with strong functionality or customer experience
3. A newer differentiated listing with traction, when available

Avoid selecting near-duplicates from one shop. Record the listing URLs and why each was selected.

### 3. Analyze the listings

For each reference, examine only legally accessible material:

- Customer problem and promise
- Included components and file formats
- Functional features and user workflow
- Information hierarchy and onboarding
- Listing-image communication sequence
- Pricing and bundle logic
- Review praise, complaints, confusion, and feature requests
- Missing capabilities or underserved customer needs

Use public listing information unless the user supplies lawfully obtained product files. Never purchase, download, or access paid competitor files without explicit user authorization.

### 4. Convert evidence into original requirements

Add a `Reference Listing Analysis` section to the product brief. For every proposed requirement, state:

- Evidence source
- Customer benefit
- Competitor strength or gap
- Original H4HappyLiving implementation
- Acceptance criterion

Prioritize requirements that appear across multiple sources or are supported by customer reviews. Reject features that add complexity without clear customer value.

### 5. Protect originality

- Do not copy listing copy, artwork, page layouts, templates, formulas, files, branding, or distinctive creative expression.
- Do not reproduce a competitor product with cosmetic changes.
- Use competitor evidence to understand problems, workflows, quality expectations, and market gaps.
- Build an original structure, design system, copy, calculations, and customer experience.
- Record the final differentiators before design begins.

## Completion response

Report only:

- Decision, score, and confidence
- Three to five decisive findings
- Best product opportunity
- Links to `analysis.md` and `evidence.xlsx`
- Confirmation that the source was archived and the inbox cleared

## Revision history

- 2026-07-31 — Added dual-source product-tag analysis and the reference-listing product-development handoff.
- 2026-07-30 — Replaced the starter with the complete Codex niche-research workflow.
- 2026-07-29 — Initial starter document.
