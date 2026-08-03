# Agent System — Identity and Role-Mapping Correction Handoff

## Control

- Product or subject: Seven-agent identity and responsibility correction
- Product slug: Not applicable
- Handoff file: `docs/06_ai_workflows/handoffs/agent-system__06__project-manager-to-owner__handoff.md`
- Sequence number: 06
- From agent name: `project manager Agent`
- From assigned role: Project Manager and Agent-System Coordinator
- Suggested next agent name: Business Owner
- Suggested next assigned role: Final approver and chat-binding authority
- Status: `Owner Review Required`
- Created: 2026-08-02
- Last updated: 2026-08-02

## Agent identity verification

- Operating agent name: `project manager Agent`
- Assigned role: Project Manager and Agent-System Coordinator
- Identity binding source: Business Owner rename and `AGENTS.md`
- Role-specific operating file read: `AGENTS.md`; `docs/06_ai_workflows/agent_roles_and_handoffs.md`
- Scope and exclusion check passed: yes

## Stop condition

- Do not start next-stage work until: the Business Owner pastes the matching one-time binding message into each existing agent chat and verifies the reply.
- Business Owner approval required: yes, to confirm chat-level bindings because repository tools cannot modify or inspect other chat contexts.
- Approval recorded in: this handoff or a later agent-system decision handoff

## Outcome completed

The repository role mappings were audited for all seven agents. The duties were correctly separated, but identity selection depended on a chat or task title that may not be visible to the model. This allowed the Brand Agent chat to default incorrectly to the first governance role, Project Manager.

The system now has an exact-name registry, explicit owned and excluded duties, a prohibition against defaulting to Project Manager, role locks on all seven role profiles, one-time binding messages for all chats, an identity self-check, and identity fields in future handoffs.

## Authoritative inputs

- Business Owner report that Brand Agent returned the Project Manager role
- `AGENTS.md`
- `docs/06_ai_workflows/agent_identity_and_startup.md`
- `docs/06_ai_workflows/agent_roles_and_handoffs.md`
- `templates/agent_handoff_template.md`
- Role-specific workflow files

## Approved decisions

- Target buyer: Not applicable
- Customer outcome: Not applicable
- Product promise: Not applicable
- Included scope: Audit and correct exact agent-to-role mappings, ownership boundaries, startup binding, identity checks, and handoff identity fields
- Excluded scope: Renaming, deleting, archiving, replacing, or automatically starting any agent; editing application chat state
- Formats and compatibility: Shared repository instructions plus one direct binding message inside each chat
- Price direction: Not applicable
- Primary differentiation: Specialist chats cannot inherit Project Manager authority from shared instructions.
- Brand or design constraints: Exact agent capitalization and names must match the registry.

## Deliverables completed

| Deliverable | Location | Status | Validation |
|---|---|---|---|
| Mandatory identity rules and seven-agent mapping | `AGENTS.md` | Complete | Project Manager default explicitly prohibited |
| Detailed owns/does-not-own registry and seven role locks | `docs/06_ai_workflows/agent_roles_and_handoffs.md` | Complete | Seven exact agents covered |
| One-time binding messages and self-check | `docs/06_ai_workflows/agent_identity_and_startup.md` | Complete | Seven exact prompts provided |
| Identity-aware handoff template | `templates/agent_handoff_template.md` | Complete | Exact agent, role, binding, workflow, and scope fields added |
| Change record | `CHANGELOG.md` | Complete | Cause and correction recorded |

## Creative contribution

- Opportunity or idea: Separate chat identity binding from the shared repository knowledge that every role needs.
- Why it is distinctive: All agents can read common governance without inheriting its authority, while each chat retains one stable specialist identity.
- Evidence or customer need: The Brand Agent's incorrect Project Manager response demonstrated that shared instructions and chat titles alone were insufficient identity controls.
- Practical value: Prevents role drift, duplicated ownership, unauthorized coordination claims, and incorrect handoffs.
- Tradeoffs or risks: Each existing chat needs one manual binding message because repository tools cannot inject context into other chat windows.
- Status: `Implemented`

## Next-agent assignment

- Objective: Bind and verify each existing chat using `docs/06_ai_workflows/agent_identity_and_startup.md`.
- Required deliverables: Seven correct acknowledgement replies or a record of any chat that still fails the identity self-check
- Acceptance criteria: Each chat states its exact name and mapped role; Brand Agent states Brand Design Lead; only `project manager Agent` states Project Manager.
- Required starting files: `docs/06_ai_workflows/agent_identity_and_startup.md`
- Actions explicitly excluded: Giving substantive specialist assignments before identity verification or accepting a mismatched role response

## Risks, limitations, and open questions

- Blocking issues: Chat-level role correctness cannot be guaranteed until the Business Owner sends the binding message within each chat.
- Non-blocking risks: Older conversation context may contain a wrong identity; the new direct binding message must explicitly supersede it.
- Assumptions: The seven exact chat names match the authoritative registry.
- Known limitations: Repository tools cannot list, inspect, rename, or send messages to the Business Owner's other application chats.
- Decisions still required: Business Owner confirmation that all seven chats pass the self-check

## Verification

- Checks completed: Seven role profiles, seven identity locks, seven binding prompts, seven exact acknowledgements, workflow-file existence, obsolete task-title identification removal, Markdown whitespace, and repository diff validation
- Checks passed: yes
- Checks not completed: Chat-level binding and identity self-checks
- Reason any check remains incomplete: Other project chats are outside repository tool access.

## Business Owner review

- Decision: `Pending`
- Decision date:
- Approved by:
- Required changes or conditions: Paste the matching binding message into each chat and verify its exact acknowledgement.

## Next step

Open `docs/06_ai_workflows/agent_identity_and_startup.md`, paste each matching one-time binding message into its chat, and confirm the exact reply before assigning work. No specialist agent has been started by this correction.
