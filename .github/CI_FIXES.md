# CI Build Fixes Applied

This document summarizes all the fixes applied to resolve CI build issues.

## Issues and Resolutions

### 1. ESLint Configuration Error ✅

**Error**: `Unexpected key "0" found`

**Root Cause**: Storybook flat config wasn't being spread correctly in `eslint.config.js`

**Fix**: Added spread operator
```javascript
// Before
storybook.configs["flat/recommended"],

// After
...storybook.configs["flat/recommended"],
```

**Files Changed**: `eslint.config.js`

**Result**: ESLint passes with 0 errors (7 intentional warnings for shadcn/ui pattern)

---

### 2. @types/node Version Conflict ✅

**Error**: `ERESOLVE could not resolve` - peer dependency conflict

**Root Cause**: Vite 7.1.12 requires `@types/node@^20.19.0 || >=22.12.0`, but package.json had `^22.5.5`

**Fix**: Updated package.json
```json
// Before
"@types/node": "^22.5.5"

// After
"@types/node": "^22.12.0"
```

**Files Changed**: `package.json`, `package-lock.json`

**Result**: `npm ci` works without ERESOLVE errors

---

### 3. Rollup Native Binaries in CI 🔄

**Error**: `Cannot find module @rollup/rollup-linux-x64-gnu`

**Root Cause**: npm bug with optional dependencies on Linux (npm/cli#4828)

**Location**: Error occurs in nested dependency path:
```
node_modules/vitest/node_modules/vite/node_modules/rollup
```

**Fix**: Updated CI workflow to explicitly install Linux native binaries
```yaml
- name: Install dependencies
  run: npm install --legacy-peer-deps

- name: Install native binaries for Linux
  run: |
    npm install --no-save @rollup/rollup-linux-x64-gnu @swc/core-linux-x64-gnu
    # Also install in nested vitest/vite locations
    cd node_modules/vitest/node_modules/vite/node_modules/rollup && npm install --no-save @rollup/rollup-linux-x64-gnu || true
    cd $GITHUB_WORKSPACE
```

**Files Changed**: `.github/workflows/ci.yml`

**Why Both Binaries**:
- `@rollup/rollup-linux-x64-gnu` - Used by Vite for bundling
- `@swc/core-linux-x64-gnu` - Used by `@vitejs/plugin-react-swc` for Fast Refresh

**Note**: These packages are Linux-specific and will fail on macOS. That's expected and correct.

---

### 4. Visual Regression Test Fix ✅

**Error**: Dark mode test timeout looking for `[data-testid="theme-toggle"]`

**Root Cause**: `ThemeToggle.tsx` returns `null` (forces dark mode), no button exists

**Fix**: Removed redundant dark mode test since app is always in dark mode

**Files Changed**: `tests/visual-regression/dashboard.spec.ts`

**Result**: 6/6 visual tests passing

---

## Current Status

### Local Development (macOS) ✅
All checks pass:
- ✅ `npm ci --legacy-peer-deps` - Clean install works
- ✅ `npm run lint` - 0 errors (7 intentional warnings)
- ✅ `npm run type-check` - TypeScript passes
- ✅ `npm run build` - Production build successful
- ✅ `npm run test:visual` - 6/6 Playwright tests pass

### CI Pipeline (Linux) 🔄
Awaiting next GitHub Actions run with updated workflow.

Expected to pass with the native binary installation fixes.

---

## Commands Reference

### Local Development
```bash
# Install dependencies (always use --legacy-peer-deps)
npm ci --legacy-peer-deps

# Run all checks
npm run lint
npm run type-check
npm run build

# Visual regression tests
npm run test:visual

# MCP server
npm run mcp:build
npm run mcp:test
```

### CI Workflow
The workflow automatically:
1. Installs dependencies with `npm install --legacy-peer-deps`
2. Installs Linux-specific native binaries
3. Runs type-check, lint, tests, and builds

---

## Troubleshooting

### If CI still fails with Rollup errors:

1. Check if the nested path exists in the CI logs
2. Try adding additional paths where Rollup might be installed
3. Consider using `npm dedupe` after install to flatten dependencies

### If new native binary errors appear:

Similar to Rollup/SWC, install the Linux-specific package:
```yaml
npm install --no-save @package/package-linux-x64-gnu
```

---

## Related Issues

- [npm/cli#4828](https://github.com/npm/cli/issues/4828) - npm bug with optional dependencies
- Native binaries affected: Rollup, SWC, potentially others
- Platform-specific packages use os/cpu/libc constraints
- `--legacy-peer-deps` required due to Vite 7 + various Storybook/testing peer deps

---

**Last Updated**: 2025-11-17
**Branch**: docs-brandfetch-api-info-79b49
**Commits**:
- `669b972` - SWC binaries
- `ca38a9c` - Rollup binaries
- `9a073b2` - Nested Rollup fix
- `7a88984` - @types/node update
- `bc2728a` - ESLint fix
