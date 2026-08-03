# Codex Niche Research Workflow

## Purpose

Turn a niche prompt and optional EverBee export into a concise, evidence-backed product decision for H4HappyLiving. Use this workflow whenever the user says `Research niche "<name>"` or requests product, niche, market, or competitor research.

## Commercial product standards

Evaluate both sales potential and customer satisfaction. Research should lead to a product customers can understand quickly, value after purchase, and recommend—not merely a market summary or attractive design.

For every opportunity, determine:

- **Buyer and purchase trigger:** the specific customer, desired outcome, emotional or practical motivation, and objection preventing purchase.
- **Conversion story:** the clearest benefit, visible differentiator, thumbnail/listing-image promise, price-value logic, and proof needed to support the claim.
- **Customer experience:** setup time, learning curve, instructions, accessibility, compatibility, reliability, and likely support questions.
- **Creative direction:** an original H4HappyLiving concept and information hierarchy that fits the brand while remaining visibly different from competitors.
- **Commercial verdict:** whether to proceed, test narrowly, reposition, simplify, or reject. Protect time and brand trust by challenging weak ideas.

Sales and satisfaction are joint requirements. Never recommend a conversion claim the delivered product cannot reliably fulfill.

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
- Buyer purchase trigger and principal objection
- First-image sales hook and visible differentiation
- Expected setup experience and first-use value
- Review risks caused by unclear scope, poor instructions, compatibility, or unreliable behavior

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

Create exactly these permanent outputs inside the niche folder:

```text
research/niches/<niche-slug>/
|-- analysis.md
|-- evidence.xlsx
`-- source/
    `-- everbee-original.<ext>   # only when provided
```

Also create the required owner-review handoff outside the niche folder:

```text
research/handoffs/<niche-slug>__NN__analytics-to-owner__handoff.md
```

Build it from `templates/agent_handoff_template.md`, set its status to `Owner Review Required`, link to `analysis.md` and `evidence.xlsx`, and stop. The separate handoff does not change the three-file niche-folder contract.

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
- Make the product's sales hook understandable without exaggeration and connect every important claim to a delivered feature.
- Favor a smaller, polished product that satisfies its promise over a large bundle with weak usability.
- Treat preventable confusion, formula or file failures, unclear compatibility, and misleading listing expectations as product defects.
- Keep temporary builders, previews, and normalized files outside the permanent niche folder and remove them after verification.

## Product-development handoff

Start this phase only after the user approves a product recommendation.

### 1. Create the product brief

- Create the product folder using `templates/product_folder_template.md`.
- Build `requirements/product-brief.md` from `templates/product_requirement_template.md`.
- Carry forward the approved customer, promise, price, minimum viable product, SEO direction, risks, and evidence sources.
- Define the purchase trigger, primary sales hook, first-use success moment, satisfaction safeguards, and visible differentiation before design begins.
- Propose one evidence-led creative concept that explains the original H4HappyLiving experience, the customer need it serves, why it is distinct, and the tradeoffs it introduces.
- Create `products/<product-slug>/handoffs/<product-slug>__NN__analytics-to-development__handoff.md` from `templates/agent_handoff_template.md` with status `Owner Review Required`.
- Stop after preparing the brief and handoff. Do not begin or trigger Product Design and Development.
- Product Design and Development may begin only after the Business Owner records development-entry approval in the brief or handoff.

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

Also convert the evidence into a concise customer journey:

1. Etsy thumbnail communicates the primary outcome.
2. Listing images establish fit, contents, ease, differentiation, and limitations.
3. Download and setup are obvious.
4. The customer reaches a useful result quickly.
5. Instructions and safeguards prevent the most likely negative-review scenarios.

### 5. Protect originality

- Do not copy listing copy, artwork, page layouts, templates, formulas, files, branding, or distinctive creative expression.
- Do not reproduce a competitor product with cosmetic changes.
- Use competitor evidence to understand problems, workflows, quality expectations, and market gaps.
- Build an original structure, design system, copy, calculations, and customer experience.
- Record the final differentiators before design begins.
- Carry the evidence-led creative concept into the handoff as `Proposed` unless the Business Owner has explicitly approved it.

## Completion response

Report only:

- Decision, score, and confidence
- Three to five decisive findings
- Best product opportunity
- Links to `analysis.md` and `evidence.xlsx`
- Link to the pre-approval handoff
- Confirmation that the source was archived and the inbox cleared

## Revision history

- 2026-08-02 — Added the product-prefixed analytics-to-development handoff and mandatory Business Owner stop before development.
- 2026-08-01 — Added role-neutral standards for conversion, customer satisfaction, originality, and commercial decision-making.

- 2026-07-31 — Added dual-source product-tag analysis and the reference-listing product-development handoff.
- 2026-07-30 — Replaced the starter with the complete Codex niche-research workflow.
- 2026-07-29 — Initial starter document.
