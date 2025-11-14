---
name: Visual Regression Test
about: Add visual regression tests for a page or component
title: 'Add visual tests for [Page/Component]'
labels: testing, visual-regression, playwright
assignees: ''
---

## Target
[Page or Component Name]

## Location
`src/pages/[page].tsx` or `src/components/[component].tsx`

## Test Spec Location
`tests/visual-regression/[name].spec.ts`

## Tasks
- [ ] Create Playwright test spec
- [ ] Add `data-testid` attributes to target elements
- [ ] Test desktop view (1280x720)
- [ ] Test mobile view (375x667)
- [ ] Test tablet view (768x1024)
- [ ] Test dark mode
- [ ] Generate baseline screenshots
- [ ] Verify tests pass

## Commands
```bash
# Generate baselines
npm run test:visual:update

# Run tests
npm run test:visual

# View report
npx playwright show-report
```

## Acceptance Criteria
- [ ] All tests pass
- [ ] Baselines generated in `tests/visual-regression/[name].spec.ts-snapshots/`
- [ ] Screenshots cover all critical views
- [ ] CI integration added (optional)

## Reference
See: `tests/visual-regression/dashboard.spec.ts`
