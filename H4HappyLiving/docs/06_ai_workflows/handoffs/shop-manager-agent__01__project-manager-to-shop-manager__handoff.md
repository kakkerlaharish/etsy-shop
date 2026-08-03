# Shop Manager Agent — Role and Workflow Handoff

> Superseded on 2026-08-02 by `shop-manager-agent__02__project-manager-to-shop-manager__handoff.md` after listing strategy and preparation moved to the new Listing Agent. Retained as decision history.

## Control

- Product or subject: Shop Manager Agent operating workflow
- Product slug: Not applicable
- Handoff file: `docs/06_ai_workflows/handoffs/shop-manager-agent__01__project-manager-to-shop-manager__handoff.md`
- Sequence number: 01
- From role: Project Manager and Agent-System Coordinator
- Suggested next role: Etsy Shop Operations Manager
- Status: `Ready`
- Created: 2026-08-02
- Last updated: 2026-08-02

## Stop condition

- Do not start next-stage work until: the Business Owner directly assigns a shop setup, product listing, launch, or performance task.
- Business Owner approval required: yes, for publishing, pricing, account changes, identity or payment actions, and other external Etsy actions
- Approval recorded in: the applicable product brief, product README, decision file, or product-prefixed handoff

## Outcome completed

The Shop Manager Agent role is defined for four independent ad hoc assignments: shop setup, listing preparation, launch, and performance review. The workflow requires a development-acceptance check before product listing work, an owner-reviewed listing-to-launch handoff before publishing, and a product-prefixed performance-feedback handoff after monitoring.

## Authoritative inputs

- `AGENTS.md`
- `docs/06_ai_workflows/agent_roles_and_handoffs.md`
- `docs/06_ai_workflows/shop_manager_agent_workflow.md`
- `templates/agent_handoff_template.md`
- `templates/etsy_listing_template.md`
- `docs/03_etsy/etsy_listing_template.md`
- `docs/03_etsy/etsy_launch_checklist.md`
- `docs/03_etsy/etsy_shop_setup_requirements.md`

## Approved decisions

- Target buyer: Defined in the applicable approved product brief
- Customer outcome: Defined in the applicable approved product brief
- Product promise: Defined in the applicable approved product brief
- Included scope: Shop setup, listing preparation, approved launch actions, live-listing verification, and performance review
- Excluded scope: Product redesign, unapproved scope changes, invented keyword evidence, brand-system changes, and unapproved external actions
- Formats and compatibility: Must be verified from the delivered product and disclosed accurately
- Price direction: Must come from approved evidence and Business Owner approval
- Primary differentiation: Must come from the approved product brief and research evidence
- Brand or design constraints: Follow approved H4HappyLiving brand guidance and product-specific creative direction

## Creative contribution

- Opportunity or idea: Give every approved product one distinctive merchandising angle that connects its primary differentiator to the buyer's desired outcome across the thumbnail promise, first images, opening description, and FAQ.
- Why it is distinctive: It creates a recognizable and coherent buying story instead of treating the Etsy fields as disconnected copy tasks.
- Evidence or customer need: Etsy buyers need to understand fit, benefit, contents, ease, differentiation, and limitations quickly and accurately.
- Practical value: Improves sales clarity and expectation-setting while giving the Shop Manager room to present each product compellingly.
- Tradeoffs or risks: The angle must not overstate delivered features, invent evidence, change the brand system, or silently alter price or scope.
- Status: `Owner-approved`

## Deliverables completed

| Deliverable | Location | Status | Validation |
|---|---|---|---|
| Shop Manager workflow | `docs/06_ai_workflows/shop_manager_agent_workflow.md` | Complete | Required phases, gates, handoffs, and stop rules documented |
| Etsy listing record template | `templates/etsy_listing_template.md` | Complete | Readiness, listing, approval, launch, and performance sections present |
| Etsy listing review guide | `docs/03_etsy/etsy_listing_template.md` | Updated | Development acceptance and owner launch gates added |
| Etsy launch checklist | `docs/03_etsy/etsy_launch_checklist.md` | Updated | Product handoff and publishing approval checks added |

## Next-agent assignment

- Objective: Complete only the specific Shop Manager phase selected by the Business Owner.
- Required deliverables: Defined by `docs/06_ai_workflows/shop_manager_agent_workflow.md` and the direct assignment.
- Acceptance criteria: Accurate, evidence-based Etsy work; all required inputs verified; required handoff created; no unapproved external action.
- Required starting files: This handoff, the Shop Manager workflow, and the latest applicable product-prefixed handoff when the assignment concerns a product.
- Actions explicitly excluded: Automatically continuing to another phase, starting another agent, publishing without approval, or changing product or brand decisions.

## Risks, limitations, and open questions

- Blocking issues: No product-specific work can begin without a direct Business Owner assignment and the required product inputs.
- Non-blocking risks: Etsy rules can change and must be verified from official sources at the time of listing or launch.
- Assumptions: The Business Owner will select one Shop Manager phase at a time.
- Known limitations: This project-wide handoff does not replace a product-prefixed development-to-listing handoff.
- Decisions still required: The next Shop Manager assignment and, when relevant, the specific product.

## Verification

- Checks completed: Cross-file role, workflow, template, and gate references; Markdown whitespace validation
- Checks passed: yes
- Checks not completed: Live Etsy verification
- Reason any check remains incomplete: No product listing or external Etsy action was requested

## Business Owner review

- Decision: `Approved`
- Decision date: 2026-08-02
- Approved by: Business Owner
- Required changes or conditions: Continue using the ad hoc agent model and stop for owner approval before publishing or other external actions.

## Next step

When selected, the Shop Manager Agent reads this handoff and `docs/06_ai_workflows/shop_manager_agent_workflow.md`, completes the assigned phase, creates the next required handoff, reports its path, and stops. Creating this handoff does not start the Shop Manager Agent.
