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

### 🔥 Developer Workflows (The Secret Sauce)

Blueberry comes with **enterprise-grade developer workflows** that ensure code quality and accelerate development:

- **🎨 Design Review**: Automated UI/UX quality assurance using Playwright
- **🔒 Security Review**: Automated security scanning and vulnerability detection
- **📝 Code Review**: Static analysis, complexity checks, and best practices validation
- **🧪 Testing Integration**: Comprehensive test suite with coverage reporting
- **📦 Build Optimization**: Tree shaking, bundle analysis, and performance monitoring

### 🛠️ CLI Tools for External Projects

External projects can leverage Blueberry's workflows:

```bash
# Run quality reviews on any project
npx @blueberry/design-system workflow:design-review
npx @blueberry/design-system workflow:code-review
npx @blueberry/design-system workflow:security-review

# Run all reviews at once
npx @blueberry/design-system workflow:all
```

## 📦 Quick Start

```bash
# Install the complete design & build system
npm install @blueberry/design-system

# Start development with hot reloading
npm run dev

# Build for production
npm run build

# Run quality reviews
npm run workflow:all
```

## 🏗️ Usage

```tsx
import { Button, Card, Input, Badge, BrandLogo } from '@blueberry/design-system';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <BrandLogo variant="v1.0.0" className="mb-8" />
      <Card className="max-w-md mx-auto">
        <div className="p-6 space-y-4">
          <Input placeholder="Enter your details..." />
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
          <Badge variant="secondary">Beta Access</Badge>
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

## 🔥 Developer Workflows (Enterprise Grade)

Blueberry's **secret weapon** is its comprehensive developer workflow system that ensures code quality, security, and design consistency across your entire development lifecycle.

### 🎯 Available Workflows

| Workflow | Purpose | Trigger |
|----------|---------|---------|
| **Design Review** | UI/UX quality, accessibility, consistency | Pre-deployment |
| **Code Review** | Static analysis, complexity, best practices | Pre-commit |
| **Security Review** | Vulnerability scanning, credential detection | Pre-deployment |
| **Testing Suite** | Unit, integration, visual regression tests | CI/CD |

### 🚀 Running Workflows

```bash
# Run individual reviews
npm run workflow:design-review    # 🎨 UI/UX quality assurance
npm run workflow:code-review      # 📝 Code quality & security
npm run workflow:security-review  # 🔒 Security scanning

# Run everything at once
npm run workflow:all             # 🔥 Complete quality suite
```

### 🛠️ CLI Tools for Any Project

**Use Blueberry's workflows on ANY project** (not just React/TypeScript):

```bash
# From any project directory
npx @blueberry/design-system workflow:design-review
npx @blueberry/design-system workflow:code-review
npx @blueberry/design-system workflow:all

# Get workflow reports
npx @blueberry/design-system workflow:security-review
```

### 📊 Workflow Reports

Each workflow generates detailed reports:
- **📈 Metrics**: Code complexity, bundle size, performance
- **🔍 Issues**: Actionable recommendations with severity levels
- **📋 Coverage**: Test coverage, accessibility compliance
- **🎨 Visual**: Screenshots, design consistency analysis

## 📋 Publishing

To publish a new version:

```bash
# Build and publish
npm run publish:design-system

# Or manually
npm run build
npm publish
```

## 🏗️ System Architecture

```
packages/blueberry-design-system/
├── src/
│   ├── components/
│   │   ├── ui/           # 40+ UI components
│   │   ├── fintech/      # Financial components
│   │   └── theme/        # Theme providers
│   ├── hooks/            # Custom React hooks
│   ├── tokens/           # Design system tokens
│   ├── lib/              # Utilities & helpers
│   └── stories/          # Storybook documentation
├── dist/                 # Optimized production build
├── workflows/            # Developer workflow scripts
└── public/               # Static assets & branding
```

## 🎯 Perfect For

- **🚀 Startup Teams**: Rapid prototyping with enterprise quality
- **🏢 Enterprise Teams**: Consistent design with developer tooling
- **👥 Design Systems**: Comprehensive foundation for custom systems
- **🔧 Developer Tools**: CLI workflows for any project type
- **📱 Modern Web Apps**: React + TypeScript + Tailwind stack

## 🌟 Why Choose Blueberry?

| Feature | Blueberry | Others |
|---------|-----------|---------|
| **Components** | 40+ production-ready | Limited selection |
| **Developer Workflows** | ✅ Built-in automation | ❌ Manual processes |
| **CLI Tools** | ✅ Any project type | ❌ Framework-specific |
| **Build Optimization** | ✅ Tree shaking, 443kB | ❌ Bloated bundles |
| **Type Safety** | ✅ 100% TypeScript | ⚠️ Optional |
| **Accessibility** | ✅ Radix UI foundation | ⚠️ Variable |

## 🤝 Community & Support

- **📖 Documentation**: Comprehensive Storybook + guides
- **🛠️ CLI Tools**: Workflow automation for any project
- **🔧 Developer Experience**: Hot reload, IntelliSense, testing
- **📦 Enterprise Ready**: Production-tested, optimized, secure

## 🔗 Ecosystem

- **🫐 Blueberry Monorepo**: Complete development ecosystem
- **⚡ Dev Flow App**: Independent development workflow tool
- **🏪 Component Marketplace**: Share and discover components
- **🔧 CLI Tools**: Developer workflow automation

## 📄 License

**MIT © Blueberry** - Build amazing things, give credit, share improvements!

---

<div align="center">
  <p><strong>🫐 Blueberry - Design & Build System with Kick-Ass Developer Workflows</strong></p>
  <p>Built with ❤️ for developers who demand quality and speed</p>
</div>