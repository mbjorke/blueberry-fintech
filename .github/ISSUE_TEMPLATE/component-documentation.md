---
name: Component Documentation
about: Document a component in the knowledge base
title: 'Document [Component Name] component'
labels: documentation, mcp, knowledge-base
assignees: ''
---

## Component
[Component Name]

## Location
`src/components/ui/[component].tsx` or `src/components/fintech/[component].tsx`

## Tasks
- [ ] Create markdown doc in `mcp-knowledge-base/components/`
- [ ] Document all variants and props
- [ ] Add usage examples
- [ ] Reference dashboard usage
- [ ] Test with `query_design_system` MCP tool

## MCP Validation
```bash
# Test the documentation is queryable
# In Claude Code, ask: "How do I use the [Component] component?"
```

## Acceptance Criteria
- [ ] Documentation is complete and accurate
- [ ] MCP tool returns relevant results
- [ ] Code examples are tested

## Reference
See existing examples:
- `mcp-knowledge-base/components/ui/button.md`
- `mcp-knowledge-base/components/ui/card.md`
