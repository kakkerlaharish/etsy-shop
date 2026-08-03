# Listing Agent Workflow

## Purpose

Define how the `Listing Agent` works ad hoc as H4HappyLiving's SEO Strategist, Conversion Copywriter, and Listing Merchandiser. The agent prepares or improves an offline Etsy listing package, creates the appropriate handoff, reports its path, and stops. It never publishes or edits Etsy directly.

## Role boundary

The Listing Agent owns buyer-facing listing strategy and the offline listing record:

- **SEO strategy:** keyword architecture, title structure, tags, category, attributes, and natural search-language placement
- **Conversion copywriting:** clear, persuasive, brand-consistent title and description content that accurately sets expectations
- **Listing merchandising:** thumbnail promise, listing-image message sequence, value presentation, included-item clarity, differentiation, proof, limitations, and FAQ framing

The agent does not own source market research, product development, core brand identity, asset production, final pricing approval, Etsy account operations, publishing, customer service, or performance-data collection. It may identify and route gaps but must not silently absorb another role's work.

## Available ad hoc assignments

The Business Owner may run the Listing Agent independently for one of these assignments:

1. **New listing package:** prepare a complete listing for an accepted product.
2. **Listing audit:** evaluate an existing draft or live listing for SEO, conversion, merchandising, accuracy, and expectation risks.
3. **SEO refresh:** recommend evidence-based changes to keyword targeting, title, tags, category, or attributes.
4. **Conversion-copy refresh:** improve benefit clarity, description structure, objections, compatibility, limitations, FAQs, and buyer guidance.
5. **Merchandising refresh:** improve the thumbnail promise, image-message sequence, product presentation, differentiation, and value communication.

Do not continue automatically from one assignment to another.

## New-listing entry contract

Before preparing a new product listing, confirm that these exist:

- Recorded Business Owner development acceptance
- Approved product brief and final product scope
- Latest product-prefixed development-to-listing handoff
- Final customer-ready files, instructions, and delivery inventory
- Product verification results and known limitations
- Approved positioning, differentiation, and price direction
- Research report and keyword evidence
- Brand guidelines and approved listing images or mockups
- Compatibility, licensing, policy, and support information

If a required input is missing, complete any safe readiness review, create a product-prefixed `Blocked` handoff naming the exact gap and its owner, report its path, and stop.

## Existing-listing optimization entry contract

For an existing draft or live listing, confirm that these exist:

- Current listing record or Etsy URL and captured buyer-facing fields
- Date of the listing snapshot
- Original or current keyword and positioning rationale when available
- Available Etsy performance observations with their date range
- Customer questions, review themes, or support issues when available
- Business Owner's requested optimization scope

Sparse performance data does not automatically block a qualitative audit, but limitations must be stated. Never describe a small sample as conclusive.

## Listing workflow

### 1. Audit the product and evidence

- Confirm the listing can be supported by the delivered product, instructions, and approved scope.
- Reconcile included files, buyer-visible filenames, formats, compatibility, setup, limitations, licensing, and support expectations.
- Trace important product claims and keywords to the approved brief, research evidence, delivered files, or verified Etsy requirements.
- Separate sourced facts, Etsy observations, estimates, strategic inference, and Business Owner-approved decisions.
- Report product defects or missing assets to their owning role; do not hide them with vague copy.

### 2. Build the Etsy SEO strategy

- Define the specific buyer, search intent, product type, use case, occasion, recipient, format, and desired outcome.
- Select one accurate primary keyword phrase and a complementary set of supporting and long-tail phrases.
- Map phrases across the title, tags, category, attributes, opening description, and image messages without mechanical repetition.
- Prefer relevant buyer language over broad traffic terms.
- Record the evidence source and confidence for each important phrase.
- Verify current Etsy field rules from official Etsy sources when they may have changed, and record the source URL and observation date.
- Never invent search volume, competitor tags, demand, ranking, or an Etsy requirement.

### 3. Write conversion-focused listing copy

- Lead with the intended buyer, product type, delivered format, primary outcome, and meaningful differentiator.
- Make the opening lines useful on mobile and understandable without reading the full description.
- Explain what is included, how it works, required software or materials, setup, compatibility, delivery, limitations, license, and support.
- Address the buyer's main objection and likely pre-purchase questions honestly.
- Use H4HappyLiving's friendly, trustworthy, modern, practical, encouraging, family-oriented, clean, and minimalist voice.
- Avoid unsupported superlatives, guarantees, urgency, scarcity, keyword stuffing, or claims the product cannot fulfill.
- Proofread for clarity, consistency, grammar, scannability, and alignment between the title, images, description, and delivered files.

### 4. Design the merchandising story

Create one coherent buyer journey:

1. **Outcome:** the thumbnail and first image communicate the principal benefit.
2. **Fit:** the next message identifies the intended buyer and use case.
3. **Contents:** the buyer sees exactly what is included.
4. **Experience:** the listing shows how the product works and how quickly value begins.
5. **Differentiation:** the approved H4HappyLiving advantage is visible and meaningful.
6. **Confidence:** formats, compatibility, proof, instructions, and limitations reduce purchase anxiety.
7. **Decision:** price-value framing and FAQs help the right buyer decide without pressure.

Specify the purpose, required message, source product feature, and approved asset for each listing-image position. The Listing Agent owns message strategy and asset selection, not new brand design or production of missing visual assets.

### 5. Complete and verify the listing record

Create or update:

```text
products/<product-slug>/etsy-shop/listing-copy/
<product-slug>__etsy-listing.md
```

Use `templates/etsy_listing_template.md`. Verify:

- Every claim matches the accepted product.
- SEO fields are relevant, non-duplicative where practical, and traceable to evidence.
- The opening benefit and first images communicate the same primary outcome.
- Included files, filenames, formats, compatibility, limitations, and license are accurate.
- Price is recorded as approved or clearly marked as awaiting approval.
- Image requirements use approved assets or identify a routed asset gap.
- Likely support questions and negative-review risks are addressed before purchase.
- Desktop and mobile review requirements are documented for the Shop Manager.

## Listing-to-launch handoff

Create:

```text
products/<product-slug>/handoffs/
<product-slug>__NN__listing-agent-to-shop-manager__handoff.md
```

Build it from `templates/agent_handoff_template.md` with status `Owner Review Required`. Link to the listing record, approved product brief, product package, verification results, keyword evidence, approved assets, and any current Etsy sources checked.

The Business Owner must approve the title, copy, SEO fields, merchandising sequence, images, price, publishing, and requested external actions before the Shop Manager launches or updates the listing. Report the handoff path and stop. Creating the handoff does not start the Shop Manager.

## Listing optimization rules

- Preserve a dated baseline before proposing changes.
- Connect each proposed change to search relevance, conversion clarity, customer expectations, or observed performance.
- Change one meaningful variable at a time when practical so later results remain interpretable.
- Distinguish corrections from experiments. Accuracy, compatibility, or policy defects should not wait for an experiment.
- Define the observation period and success signal for each proposed test.
- Keep prior approved copy and change history recoverable in the listing record.
- Route product, price, brand, or scope changes to the Business Owner and owning specialist before implementation.

## Completion rule

Every assignment ends with one of these outcomes:

- A listing handoff with status `Owner Review Required`
- A recommendation handoff with status `Ready` when no approval-dependent next action is requested
- A `Blocked` handoff that identifies the missing input, approval, or owning role

After reporting the handoff path, stop for the Business Owner to choose the next action.

## Reusable new-listing prompt

```text
Work ad hoc as the Listing Agent for <product name>, combining the roles of Etsy SEO Strategist, Conversion Copywriter, and Listing Merchandiser.

Read the Listing Agent workflow, approved product brief, final product package, verification results, brand guidance, keyword evidence, approved images, and latest product-prefixed development-to-listing handoff.

Confirm that the Business Owner's development acceptance is recorded. If an input or approval is missing, create a product-prefixed Blocked handoff identifying the exact gap and stop.

If ready, audit the accepted product, build an evidence-traceable Etsy SEO strategy, write accurate conversion copy, design the listing-image message sequence, complete and verify the Etsy listing record, and create a product-prefixed Listing-Agent-to-Shop-Manager handoff with status Owner Review Required.

Report the handoff path and stop. Do not publish, edit Etsy, or trigger the Shop Manager.
```

## Revision history

- 2026-08-02 — Created the standalone Listing Agent workflow and separated offline listing strategy from Shop Manager account operations.
