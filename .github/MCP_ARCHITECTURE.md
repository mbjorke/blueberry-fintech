# Blueberry MCP Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Claude Code IDE                          │
│                                                                 │
│  User asks: "Does this page follow our design system?"         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ MCP Protocol
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Blueberry Design System MCP Server                 │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    5 Expert Tools                        │  │
│  │                                                          │  │
│  │  1. analyze_component_usage                             │  │
│  │     └─> Validates React components                      │  │
│  │                                                          │  │
│  │  2. validate_tailwind_tokens                            │  │
│  │     └─> Checks design token usage                       │  │
│  │                                                          │  │
│  │  3. compare_with_dashboard                              │  │
│  │     └─> Visual regression testing                       │  │
│  │                                                          │  │
│  │  4. check_accessibility                                 │  │
│  │     └─> ARIA and a11y validation                        │  │
│  │                                                          │  │
│  │  5. query_design_system                                 │  │
│  │     └─> Knowledge base search                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ Reads from
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Knowledge Base & Assets                       │
│                                                                 │
│  ├── mcp-knowledge-base/           ├── src/components/         │
│  │   ├── components/               │   ├── ui/ (56 components) │
│  │   ├── tokens/                   │   └── fintech/            │
│  │   ├── patterns/                 │                           │
│  │   └── reference/                ├── tests/visual-regression/│
│  │                                 │   └── baselines/          │
│  └── Design system documentation   └── Playwright screenshots  │
└─────────────────────────────────────────────────────────────────┘
```

## Tool Flow Diagrams

### 1. Component Analysis Flow

```
User's Code File
       │
       ▼
┌─────────────────────────┐
│ analyze_component_usage │
└──────────┬──────────────┘
           │
           ├─> Parse imports
           │   └─> Check @/ alias usage
           │
           ├─> Extract component usage
           │   └─> Validate props
           │
           ├─> Check composition patterns
           │   └─> CardTitle in CardHeader?
           │   └─> Buttons in CardFooter?
           │
           └─> Generate report
               ├─> Issues (❌)
               ├─> Suggestions (💡)
               └─> Passed checks (✅)
```

### 2. Token Validation Flow

```
Component with Tailwind Classes
       │
       ▼
┌──────────────────────────┐
│ validate_tailwind_tokens │
└──────────┬───────────────┘
           │
           ├─> Extract className attributes
           │
           ├─> Check for arbitrary values
           │   └─> bg-[#9b87f5] ❌
           │   └─> bg-primary ✅
           │
           ├─> Validate spacing scale
           │   └─> p-[23px] ❌
           │   └─> p-6 ✅
           │
           ├─> Check color tokens
           │   └─> #hex values ❌
           │   └─> hsl(var(--primary)) ✅
           │
           └─> Generate report
               ├─> Errors
               ├─> Warnings
               └─> Token usage stats
```

### 3. Visual Comparison Flow

```
New Page URL
       │
       ▼
┌──────────────────────────┐
│ compare_with_dashboard   │
└──────────┬───────────────┘
           │
           ├─> Launch Playwright
           │   ├─> Navigate to dashboard (reference)
           │   └─> Navigate to new page (target)
           │
           ├─> Analyze both pages
           │   ├─> Extract colors
           │   ├─> Detect components
           │   ├─> Analyze layout (grid/flex)
           │   ├─> Measure spacing
           │   └─> Check typography
           │
           ├─> Compare
           │   ├─> Color palette similarity
           │   ├─> Component usage patterns
           │   ├─> Layout structure match
           │   └─> Calculate similarity score
           │
           └─> Generate report
               ├─> Similarity score (0-100)
               ├─> Differences found
               └─> Recommendations
```

### 4. Accessibility Check Flow

```
Component File
       │
       ▼
┌──────────────────────┐
│ check_accessibility  │
└──────────┬───────────┘
           │
           ├─> Check Radix components
           │   ├─> Dialog has aria-labelledby?
           │   ├─> Select has aria-label?
           │   └─> Button has proper states?
           │
           ├─> Check general patterns
           │   ├─> Images have alt text?
           │   ├─> Icon buttons have aria-label?
           │   ├─> Inputs have Labels?
           │   └─> Heading hierarchy correct?
           │
           └─> Generate report
               ├─> Issues (❌)
               ├─> Suggestions (💡)
               └─> Passed (✅)
```

### 5. Knowledge Base Query Flow

```
Natural Language Query
       │
       ▼
┌──────────────────────┐
│ query_design_system  │
└──────────┬───────────┘
           │
           ├─> Load knowledge base
           │   ├─> components/*.md
           │   ├─> tokens/*.md
           │   ├─> patterns/*.md
           │   └─> reference/*.md
           │
           ├─> Search & score
           │   ├─> Title match (10 points)
           │   ├─> Content matches (1 each)
           │   └─> Category match (5 points)
           │
           ├─> Extract relevant sections
           │   └─> Context around query terms
           │
           └─> Format response
               ├─> Top 5 results
               ├─> Relevant excerpts
               └─> Full documentation links
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Claude Code sends MCP request with tool name + parameters  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           MCP Server receives and routes to tool            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Tool Implementation:                                       │
│    1. Reads source files                                    │
│    2. Queries knowledge base                                │
│    3. Runs Playwright (if visual)                           │
│    4. Analyzes data                                         │
│    5. Generates report                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│       MCP Server returns formatted text response            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│    Claude Code displays result to user with insights       │
└─────────────────────────────────────────────────────────────┘
```

## Component Relationship

```
┌──────────────────────────────────────────────────────────────┐
│                    Blueberry Repository                      │
│                                                              │
│  ┌────────────────────┐         ┌──────────────────────┐   │
│  │  Design System     │         │   MCP Server         │   │
│  │  (React App)       │◄────────│   (AI Expert)        │   │
│  │                    │ Analyzes│                      │   │
│  │  • 56 Components   │         │  • 5 Tools           │   │
│  │  • Dashboard       │         │  • TypeScript        │   │
│  │  • Mock Data       │         │  • Playwright        │   │
│  │  • Storybook       │         │  • Node.js           │   │
│  └────────────────────┘         └──────────────────────┘   │
│           │                              │                  │
│           │                              │                  │
│           ▼                              ▼                  │
│  ┌────────────────────┐         ┌──────────────────────┐   │
│  │  Visual Tests      │         │  Knowledge Base      │   │
│  │  (Playwright)      │         │  (Markdown Docs)     │   │
│  │                    │         │                      │   │
│  │  • Baselines       │         │  • Components        │   │
│  │  • Specs           │         │  • Tokens            │   │
│  │  • Screenshots     │         │  • Patterns          │   │
│  └────────────────────┘         └──────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## Extension Points

### Adding New Use Case (e.g., Online Store)

```
1. Add Mock Data
   src/mock/storeMockData.ts

2. Create Components
   src/components/store/
   ├── ProductCard.tsx
   ├── OrderHistory.tsx
   └── ShoppingCart.tsx

3. Document in Knowledge Base
   mcp-knowledge-base/components/store/
   ├── product-card.md
   ├── order-history.md
   └── shopping-cart.md

4. Add Visual Tests
   tests/visual-regression/store.spec.ts

5. Use MCP to Validate
   • analyze_component_usage
   • validate_tailwind_tokens
   • compare_with_dashboard
```

### Expanding to Other Projects

```
1. Copy MCP Server
   cp -r mcp-server /new-project/

2. Update Knowledge Base
   • Replace component docs
   • Update token specifications
   • Change reference implementation

3. Configure Components
   • Update component-analyzer.ts
   • Modify DESIGN_SYSTEM_COMPONENTS array

4. Configure Tokens
   • Update token-validator.ts
   • Modify DESIGN_TOKENS object

5. Set Reference Page
   • Update visual-comparator.ts
   • Change DASHBOARD_URL

6. Update mcp-config.json
   • Change project paths
   • Update server command
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      MCP Server Stack                       │
│                                                             │
│  Runtime:           Node.js 18+                             │
│  Language:          TypeScript 5.5                          │
│  MCP SDK:           @modelcontextprotocol/sdk 1.0           │
│  Testing:           Playwright 1.54                         │
│  Parsing:           Cheerio 1.0                             │
│  Markdown:          Marked 16.0                             │
│  Validation:        Zod 3.23                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Design System Stack                      │
│                                                             │
│  Framework:         React 18.3                              │
│  Language:          TypeScript 5.5                          │
│  Build:             Vite 7.1                                │
│  Styling:           Tailwind CSS 4.1                        │
│  Components:        Radix UI 1.2                            │
│  Testing:           Vitest 3.2 + Playwright 1.54            │
│  Documentation:     Storybook 9.1                           │
└─────────────────────────────────────────────────────────────┘
```

## Performance Characteristics

```
Tool Performance:

┌─────────────────────────────┬──────────┬─────────────┐
│ Tool                        │ Speed    │ Complexity  │
├─────────────────────────────┼──────────┼─────────────┤
│ analyze_component_usage     │ <100ms   │ O(n)        │
│ validate_tailwind_tokens    │ <100ms   │ O(n)        │
│ check_accessibility         │ <100ms   │ O(n)        │
│ query_design_system         │ <200ms   │ O(n*m)      │
│ compare_with_dashboard      │ 2-5s     │ O(1)        │
└─────────────────────────────┴──────────┴─────────────┘

n = lines of code in file
m = number of markdown files in knowledge base

Visual comparison is slower due to:
• Browser launch
• Page navigation
• DOM analysis
• Screenshot capture
```

## Security Considerations

```
MCP Server Security:

✅ Runs locally on user's machine
✅ No network requests (except Playwright)
✅ File access limited to project directory
✅ No data sent to external services
✅ TypeScript type safety
✅ Zod validation for inputs

Playwright Security:

✅ Headless browser in sandbox
✅ Local development server only
✅ No external URL access
✅ Screenshot data stays local
```

## Scalability

```
Current Capacity:
• 56 components documented (2 complete, 54 templates ready)
• 8 knowledge base documents
• 7 visual regression tests
• 5 MCP tools

Easy Scaling (5 minutes each):
• Add component docs (copy button.md pattern)
• Add visual tests (copy dashboard.spec.ts pattern)
• Add token categories (copy colors.md pattern)

Advanced Scaling (hours):
• New MCP tool (follow existing tool structure)
• Multi-project support (parameterize paths)
• API integrations (add external data sources)
• Performance optimizations (caching, indexing)
```
