<div align="center">
  <img src="./public/blueberry.svg" alt="Blueberry Logo" width="120" height="120" />
  <h1>🫐 Blueberry Design System</h1>
  <p><strong>Enterprise-grade design system with AI-powered MCP assistance</strong></p>
  <p>Complete UI components + Visual regression testing + AI design expert</p>
</div>

---

## 🚀 What Makes Blueberry Special

Blueberry is a **complete design system** with an integrated **MCP (Model Context Protocol) server** that acts as an AI-powered expert on your design system. It validates components, checks tokens, performs visual regression testing, and answers design questions.

### 🎨 Built on Excellent Foundations

- **🎯 Design Tokens**: Inspired by [Lovable](https://lovable.dev)'s excellent token architecture - a clean, semantic system that makes theming effortless
- **♿ Accessibility**: Built on [Radix UI](https://www.radix-ui.com)'s accessible primitives - production-ready components with world-class accessibility
- **🫐 Themeability**: Switch entire color schemes instantly with our token-based theming system (Blueberry, Lovable, Raspberry, Lingonberry, Strawberry themes included!)

### 🎯 Core Features

- **🧩 56+ Production Components**: Complete UI + Fintech component library
- **🤖 MCP Design Expert**: AI assistant that validates design system usage
- **🎭 Visual Regression**: Playwright-based testing against dashboard reference
- **⚡ TypeScript First**: Full type safety and IntelliSense
- **🎨 Design Tokens**: HSL-based color system with Tailwind CSS
- **♿ Radix UI Foundation**: Accessible components you can trust
- **📚 Knowledge Base**: Comprehensive design system documentation

### 🤖 MCP Server (NEW!)

AI-powered design system assistant with these tools:

- **Component Analysis** - Validates React component usage against design system
- **Token Validation** - Ensures proper Tailwind token usage (no hardcoded values)
- **Visual Comparison** - Compares pages against dashboard reference with Playwright
- **Accessibility Checks** - Validates ARIA attributes and Radix patterns
- **Design System Query** - Natural language search of component docs

See [MCP_SETUP.md](./docs/MCP_SETUP.md) for detailed setup and usage.

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# View component library
npm run storybook

# Build MCP server (for AI assistance)
cd mcp-server && npm install && npm run build
```

Visit `http://localhost:8080` for the dashboard, `http://localhost:8080/themes` for the theme showcase, or `http://localhost:6006` for Storybook.

## 🏗️ Usage

Components are organized in the `src/components` directory. Import directly from the component files:

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <Card className="max-w-md mx-auto">
        <div className="p-6 space-y-4">
          <Input placeholder="Enter your details..." />
          <Button variant="default" className="w-full">
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

## 🎨 Component Library

### 🧩 Core Components (40+)
- **Form Controls**: Button, Input, Select, Checkbox, Radio, Textarea
- **Layout**: Card, Dialog, Sheet, Popover, Dropdown, Tooltip
- **Navigation**: Navigation, Tabs, Breadcrumb, Pagination
- **Data Display**: Table, Badge, Avatar, Skeleton, Progress
- **Feedback**: Toast, Alert, Spinner, Loading states
- **Specialized**: Calendar, Carousel, Charts, Form components

### 🪝 Custom Hooks
- **useIsMobile**: Responsive breakpoint detection
- **useToast**: Toast notification management
- **Form hooks**: React Hook Form integration

### 🎨 Design System
- **Color Palette**: Primary, secondary, neutral, semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale and utilities
- **Shadows**: Elevation system for depth
- **Border Radius**: Consistent corner rounding
- **Brand Elements**: Logo, gradients, animations

### 🎨 Themeability (NEW!)

Switch entire color schemes instantly! Our token-based theming system demonstrates the power of semantic design tokens:

- **🫐 Blueberry** - Classic purple-blueberry theme (default)
- **💙 Lovable** - Clean, modern theme inspired by Lovable's excellent token system
- **🫐 Raspberry** - Bold, vibrant red-raspberry theme
- **🫐 Lingonberry** - Deep, rich red-orange Scandinavian theme
- **🍓 Strawberry** - Fresh, bright pink-red theme

All themes support both light and dark modes. Switch themes programmatically or via the theme toggle component - no component code changes needed!

**Try it out:** Visit `/themes` to see all themes showcased side-by-side with interactive previews!

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build for production
npm run build
```

## 🔥 Developer Workflows

### 🧪 Testing

Vitest is configured for testing. Run tests using:

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage
```

### 📝 Linting

Check code quality with ESLint:

```bash
# Run linter
npm run lint

# Type check
npm run type-check
```

### 🤖 CI/CD

GitHub Actions workflows are configured for automated testing and deployment:

- **CI Workflow** (`.github/workflows/ci.yml`): Runs on every push and PR
  - ✅ Type checking
  - ✅ Linting
  - ✅ Test suite with coverage reporting
  - ✅ Build verification
  - ✅ Storybook build verification

- **Deploy to Netlify** (`.github/workflows/deploy-netlify.yml`): Optional
  - Deploys to Netlify on pushes to main/master
  - Requires `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets

- **Deploy to Fly.io** (`.github/workflows/deploy-fly.yml`): Optional
  - Deploys to Fly.io on pushes to main/master
  - Requires `FLY_API_TOKEN` secret

**Setup Secrets:**
1. Go to your repository Settings → Secrets and variables → Actions
2. Add the required secrets for your deployment targets
3. The CI workflow runs automatically, no secrets required

### 🌐 External Services

#### Brandfetch API

The project uses [Brandfetch](https://brandfetch.com) to fetch merchant logos for financial transactions in the demo. Brandfetch provides a CDN for brand assets (logos, icons) based on domain names.

**Current Usage:**
- Used in mock data (`src/mock/mockData.ts`) to display merchant logos in transaction lists
- URLs follow the pattern: `https://cdn.brandfetch.io/{domain}/w/{width}/h/{height}?c={cacheKey}`
- Example: `https://cdn.brandfetch.io/amazon.com/w/400/h/400?c=1idPVMDlQ6CTx2eeHQ0`

**For Production:**
- The demo currently uses public CDN URLs without authentication
- For production use, consider:
  - Registering for a Brandfetch API key if high-volume usage is expected
  - Reviewing Brandfetch's [terms of service](https://brandfetch.com/terms) and rate limits
  - Implementing fallback images for when logos are unavailable
  - Caching strategies to reduce API calls

**Note:** This is currently used for demo/mock data only. In production, you may want to integrate Brandfetch's API directly or use your own logo service.

## 🏗️ System Architecture

```
blueberry/
├── src/                          # Main application
│   ├── components/
│   │   ├── ui/                   # 56 base UI components
│   │   └── fintech/              # Fintech-specific components
│   ├── pages/                    # Dashboard and pages
│   ├── mock/                     # Mock data for demo
│   └── stories/                  # Storybook documentation
├── mcp-server/                   # AI design expert server
│   ├── src/
│   │   ├── tools/                # MCP tool implementations
│   │   └── index.ts              # Server entry point
│   └── package.json
├── mcp-knowledge-base/           # Design system docs
│   ├── components/               # Component documentation
│   ├── tokens/                   # Token specifications
│   ├── patterns/                 # UI patterns
│   └── reference/                # Dashboard reference spec
├── tests/visual-regression/      # Playwright visual tests
├── tailwind.config.ts            # Design tokens config
└── playwright.config.ts          # Visual testing config
```

## 🎯 Perfect For

- **🚀 Startup Teams**: Rapid prototyping with enterprise quality
- **🏢 Enterprise Teams**: Consistent design with developer tooling
- **👥 Design Systems**: Comprehensive foundation for custom systems
- **📱 Modern Web Apps**: React + TypeScript + Tailwind stack

## 🌟 Why Choose Blueberry?

| Feature | Blueberry | Others |
|---------|-----------|---------|
| **Components** | 40+ production-ready | Limited selection |
| **Developer Tools** | ✅ Storybook, Testing, Linting | ❌ Manual processes |
| **Build Optimization** | ✅ Tree shaking, optimized bundles | ❌ Bloated bundles |
| **Type Safety** | ✅ 100% TypeScript | ⚠️ Optional |
| **Accessibility** | ✅ Radix UI foundation | ⚠️ Variable |

## 🤝 Community & Support

- **📖 Documentation**: Comprehensive Storybook + guides
- **🔧 Developer Experience**: Hot reload, IntelliSense, testing
- **📦 Production Ready**: Production-tested, optimized builds

## 🎨 Brand Kit Support

Blueberry supports brand kit integration, allowing you to import brand kits (like Lovable's brand kit) and generate themes that match your brand standards.

**Features:**
- Import brand kits from JSON
- Convert brand kits to themes
- Export themes as brand kits
- Validate brand kit structure
- Support for multiple color formats (hex, rgb, hsl)

See [BRAND_KIT_GUIDE.md](./docs/BRAND_KIT_GUIDE.md) for detailed documentation.

## 🙏 Credits & Acknowledgments

Blueberry Design System is built on excellent foundations:

- **[Lovable](https://lovable.dev)** - Inspired by their excellent design token architecture. The semantic token system makes theming effortless and demonstrates best practices in design system architecture. Compatible with Lovable brand kits.
- **[Radix UI](https://www.radix-ui.com)** - Built on Radix UI's accessible primitives. These production-ready components provide world-class accessibility out of the box, making it easy to build inclusive interfaces.

We're grateful to these projects for their excellent work and open-source contributions!

## 📄 License

**MIT © Blueberry** - Build amazing things, give credit, share improvements!

---

<div align="center">
  <p><strong>🫐 Blueberry - Design & Build System with Kick-Ass Developer Workflows</strong></p>
  <p>Built with ❤️ for developers who demand quality and speed</p>
</div>