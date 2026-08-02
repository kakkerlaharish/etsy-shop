# Product Brief: Mortgage Payoff Scenario Planner

## Decision source

- Approved niche: Mortgage planners — TEST, 62/100, medium confidence
- Research report: `research/niches/mortgage-planners/analysis.md`
- Evidence workbook: `research/niches/mortgage-planners/evidence.xlsx`
- EverBee export: `research/niches/mortgage-planners/source/everbee-original.csv`
- Product-development date: 2026-07-31

## Customer and problem

- Target customer: US homeowner with a standard fixed-rate mortgage and monthly payments
- Customer problem: Extra-payment choices are hard to compare and ordinary amortization tables are not motivating.
- Product promise: Compare two payoff strategies with the baseline and clearly see the projected time and interest impact.
- Intended use: Personal planning and education, not financial advice or lender-grade calculations

## Reference Listing Analysis

| Reference URL | Why selected | Functional strength | Customer friction or gap | Original H4HappyLiving response |
|---|---|---|---|---|
| https://www.etsy.com/listing/4344906495 | Strong demonstrated demand and 91 item reviews | Simple prebuilt Excel amortization formulas and easy experimentation | Excel-only; limited public evidence of structured scenarios or visible audit checks | Three comparable schedules, friendly onboarding, and visible model status |
| https://www.etsy.com/listing/4469956431 | Newer dashboard-led product with current sales | Five-sheet workflow, progress dashboard, extra-payment simulator, and tracker | A US buyer reported incorrect initial calculations; seller intervention was required | Explicit US fixed-rate assumptions, common formulas, constrained inputs, and formula checks |
| https://www.etsy.com/listing/1018344183 | Long-lived demand signal with 45 item reviews and 456 observed listing sales | Automated chart, summary, detailed schedule, instructions, and extra payments | Broader loan promise increases complexity; limitations require careful explanation | Mortgage-specific scope, concise guidance, two decision-ready scenarios, and exclusions stated upfront |

Only public listing details and reviews were analyzed. No competitor file, formula, artwork, copy, or distinctive layout was accessed or reproduced.

## Product requirements

| Priority | Requirement | Evidence | Customer benefit | Acceptance criterion |
|---|---|---|---|---|
| Must | Standard monthly fixed-rate amortization | Category baseline | Trustworthy baseline | Payment, principal, interest, and final balance reconcile within $0.01 |
| Must | Recurring and one-time extra payments | Active competitor pattern | Tests realistic payoff strategies | Extras never exceed the remaining balance and payoff truncates at zero |
| Must | Baseline plus two side-by-side strategies | Research opportunity #1 | Makes the decision comparable | Dashboard shows payoff date, months saved, total interest, and interest difference for all three |
| Must | Beginner-safe inputs and quick start | Reviews praise ease and tutorials | Faster setup and fewer mistakes | Inputs are visually distinct, validated, and explained in four steps |
| Must | Visible checks and limitations | Locale/calculation complaint | Higher confidence and lower support risk | Checks sheet reports OK for valid defaults and flags invalid inputs |
| Must | Payment log | Research MVP | Supports ongoing use | 360-row editable log includes date, planned, extra, actual, status, and notes |
| Should | Progress dashboard and balance chart | Reviews praise visibility | Motivation and clarity | Dashboard renders cleanly at normal zoom without formula errors |
| Should | Excel and Google Sheets compatibility | Market standard | Larger addressable audience | Uses only common non-macro formulas; human import test remains prelaunch |
| Could | Protected formula cells and video walkthrough | Established listing pattern | Reduces accidental edits | Defer until the validated prototype is approved |

## Scope

### Included

- Principal, annual interest rate, remaining term, and first payment date
- Baseline payment calculation
- Planned and alternative monthly extra payments
- Planned and alternative one-time extra payments by payment month
- Three 480-month schedules, allowing terms through 40 years
- Dashboard, instructions, payment log, and checks

### Not included

- Variable rates, balloon payments, refinancing, biweekly schedules, taxes, insurance, escrow, fees, or investment comparisons
- Lender statement reconciliation or financial advice
- International mortgage conventions

## Deliverables and formats

| Deliverable | Format | Size or platform | Notes |
|---|---|---|---|
| Mortgage payoff planner | XLSX | Excel; intended for Google Sheets import | No macros; common formulas only |
| Dashboard preview | PNG | Etsy listing-image draft | Generated from the workbook |
| Input preview | PNG | Etsy listing-image draft | Shows the beginner workflow |

## Design and copy

- Brand pillar: Organize
- Palette: Evergreen `#285247`, Ink `#24332F`, Warm Cream `#FFF9F1`, Soft Sage `#B8D2C5`, Golden Joy `#F2B84B`
- Typography: Arial workbook fallback for dependable compatibility
- Accessibility: Dark text on light fields; editable cells use both blue text and an “INPUT” label
- Voice: Calm, practical, encouraging, and precise
- Claims: All results are estimates based on entered assumptions; users should confirm lender rules

## Pricing and positioning

- Launch price: $6.99
- Regular test price: $8.99
- Primary differentiator: Transparent three-scenario comparison with visible calculation checks
- Secondary differentiators: Mortgage-specific scope, beginner onboarding, one-time plus recurring extras, and a full payment log

## SEO direction

- Primary keyword: mortgage payoff calculator
- EverBee tag evidence: mortgage payoff, mortgage calculator, mortgage tracker, mortgage planner, amortization, extra payment, home loan tracker, loan payoff tracker, mortgage spreadsheet
- Etsy listing-language evidence: amortization schedule, extra payment calculator, Google Sheets template, Excel spreadsheet, debt-free payoff timeline
- Working title: Mortgage Payoff Calculator Spreadsheet, Extra Payment Tracker and Amortization Schedule for Excel and Google Sheets
- Working 13 tags: mortgage payoff; mortgage calculator; mortgage tracker; mortgage planner; amortization; extra payment; home loan tracker; loan payoff tracker; mortgage spreadsheet; excel template; google sheets; financial planner; early payoff

## Risks and validation

- Technical risks: Formula errors, spreadsheet-engine differences, date behavior, and premature payoff handling
- Customer-support risks: Customers entering escrow-inclusive payments or assuming non-US mortgage conventions
- Required tests: Standard loan, zero-interest loan, recurring extra, one-time extra, very large extra, 15/30/40-year terms, invalid inputs, and final-balance reconciliation
- Evidence limitations: EverBee values are estimates; only nine of 171 direct listings had non-zero estimated monthly sales

### Prototype validation results

- Default $325,000 / 6.5% / 30-year case: $2,054.22 minimum payment, 360 baseline payments, and $414,519.59 estimated baseline interest.
- Strategy A ($250 monthly plus $5,000 at payment 12): 259 payments, 101 months saved, and $138,085.16 estimated interest difference.
- Strategy B ($500 monthly): 217 payments, 143 months saved, and $186,944.40 estimated interest difference.
- Independent JavaScript calculations matched the workbook outputs exactly before rounding.
- Zero-interest and oversized-extra-payment tests both returned `READY`; the oversized payment stopped at the remaining balance in one payment.
- Final workbook scan found no `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, `#N/A`, or `#NUM!` errors with the default inputs.
- Remaining prelaunch requirement: manually open in desktop Excel and import into Google Sheets to confirm formulas, dates, chart behavior, and data validation in both customer environments.

## Acceptance checklist

- [x] Every must-have requirement is implemented.
- [x] Product behavior and calculations are independently verified.
- [x] Copy and design are original.
- [ ] Customer files are complete and clearly named.
- [ ] Listing claims match the delivered product.
- [x] Final product retains a clear advantage over the reference listings.
