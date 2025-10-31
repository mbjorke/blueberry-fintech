<div align="center">
  <img src="./public/blueberry.svg" alt="Blueberry Logo" width="120" height="120" />
  <h1>🫐 Blueberry Design & Build System</h1>
  <p><strong>Enterprise-grade design system with kick-ass developer workflows</strong></p>
  <p>Complete UI components + automated quality assurance + developer tooling</p>
</div>

---

## 🚀 What Makes Blueberry Special

Blueberry is not just another component library—it's a **complete design and build system** engineered for modern development teams who demand quality, speed, and reliability.

### 🎯 Core Features

- **🧩 40+ Production Components**: Complete UI component library with variants
- **⚡ TypeScript First**: Full type safety, IntelliSense, and developer experience
- **🎨 Tailwind CSS**: Utility-first styling with custom design tokens
- **♿ Radix UI Foundation**: Accessible, unstyled primitives you can trust
- **📚 Interactive Storybook**: Live component documentation and testing
- **🏗️ Vite Build System**: Lightning-fast development and optimized production builds

### 🔥 Developer Workflows

Blueberry includes developer workflows for quality assurance:

- **🧪 Testing Integration**: Comprehensive test suite with coverage reporting
- **📦 Build Optimization**: Tree shaking and optimized production builds
- **📚 Storybook**: Interactive component documentation and testing

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Start development with hot reloading
npm run dev

# Build for production
npm run build

```

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
# Run tests with Vitest (if test script is added)
npx vitest

# Run tests with coverage
npx vitest --coverage
```

### 📝 Linting

Check code quality with ESLint:

```bash
# Run linter
npm run lint

# Type check
npm run type-check
```

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
src/
├── components/
│   ├── ui/               # UI components
│   └── fintech/          # Financial components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & helpers
├── stories/              # Storybook documentation
├── pages/                # Page components
└── styles/               # Global styles and themes
├── dist/                 # Optimized production build
└── public/               # Static assets & branding
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

## 📄 License

**MIT © Blueberry** - Build amazing things, give credit, share improvements!

---

<div align="center">
  <p><strong>🫐 Blueberry - Design & Build System with Kick-Ass Developer Workflows</strong></p>
  <p>Built with ❤️ for developers who demand quality and speed</p>
</div>