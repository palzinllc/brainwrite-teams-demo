# Brainwrite Markdown v1

The format is intentionally one normal Markdown file.

```md
---
brainwrite: 1
id: example-team
release: 1.0.0
name: Example Team
tagline: The outcome in one sentence.
# listing, roles, rooms, playbooks, connections, and paused routines
---

# Example Team

> Give this file to your Chief of Staff.

## Activation
...

## Team
...
```

The frontmatter is required for a playbook published on Brainwrite because it powers the listing and optional one-click imports. General-purpose agent products can ignore it completely. The Markdown body is authoritative for people and Chief-of-Staff agents, and must stand on its own when pasted into an agent conversation.

### The proof block (optional)

A playbook whose approach has a public money claim behind it may carry a `proof` block. The figure is always the creator's own claim, and it must link a public source — Brainwrite verifies that the post exists, never the revenue.

```yaml
proof:
  amount: "$4,200"        # dollar figure as claimed, e.g. "$4,200" or "$12K"
  period: monthly         # monthly | weekly | daily | total
  source:
    url: https://x.com/handle/status/1234567890
    author: "@handle"
    date: 2026-07-14      # optional, YYYY-MM-DD
    quote: "exact sentence from the post containing the claim"  # optional
  credibility: claimed    # claimed | receipts (screenshots/proof shown in the source)
```

Never publish a proof block without a working public source, and never restate someone's claim as a bigger or rounder number than they used.

Required body sections are `Activation`, `Mission`, `Outcomes`, `Connections`, `Team`, `Chief of Staff`, and `Completion rule`. Add shared rooms, routines, playbooks, and examples only when the team needs them.

Products that cannot create sub-agents should perform each role sequentially and keep the work clearly separated. Products must never treat a connector name as authorization, and routines must stay paused until the user explicitly enables them.
