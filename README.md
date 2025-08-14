<div align="center">
  <h1>Fintech Spark Studio</h1>
  <p>A modern fintech dashboard and design system built with React, TypeScript, and Tailwind CSS</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.js.org/)
  [![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

  <!-- Replace with actual dashboard screenshot -->
  <img src="/banking-dashboard.png" alt="Dashboard Preview" width="100%">
</div>

## 🌟 Features

### 🎨 Design System
- **40+** reusable, accessible components
- Built with Radix UI primitives and shadcn/ui
- Comprehensive Storybook documentation
- Dark/light mode support
- Fully responsive design

### 💳 Fintech Dashboard
- Real-time account overview
- Transaction history and categorization
- Interactive data visualizations
- Responsive layout for all devices
- Modern, clean UI with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+ or yarn 1.22+

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd fintech-spark-studio

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser to view the dashboard.

## 📚 Storybook

Explore all components in our interactive Storybook:

```bash
# Start Storybook
npm run storybook
# or
yarn storybook
```

Then open [http://localhost:6006](http://localhost:6006) to browse components and their documentation.

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base components (buttons, inputs, etc.)
│   └── fintech/       # Fintech-specific components
├── stories/           # Component stories for Storybook
├── lib/               # Utilities and helpers
├── pages/             # Page components
└── styles/            # Global styles and themes
```

## 🎨 Design System Components

### Base Components
- Buttons
- Forms & Inputs
- Navigation
- Overlays (Dialogs, Drawers, Tooltips)
- Layout (Cards, Containers)
- Typography

### Fintech Components
- Account Cards
- Transaction Lists
- Data Visualization Charts
- Gradient Cards
- Status Indicators

## 🛠️ Development

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `storybook` - Start Storybook
- `build-storybook` - Build static Storybook
- `lint` - Run ESLint
- `type-check` - Run TypeScript type checking

## 🏗️ Built With

- [React 18](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Storybook](https://storybook.js.org/) - Component Documentation
- [Vite](https://vitejs.dev/) - Build Tool

## 🚀 Deployment

### Building for Production

```bash
# Create production build
npm run build

# Preview the production build locally
npm run preview
```

The build will be available in the `dist` directory.

### Deployment Options

#### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<YOUR_REPO_URL>&project-name=fintech-spark-studio&repository-name=fintech-spark-studio)

1. Push your code to a GitHub repository
2. Import the project on Vercel
3. Vercel will automatically detect the Vite project and set up the build settings

#### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=<YOUR_REPO_URL>)

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style (prettier + eslint)
- Write meaningful commit messages
- Document new components with Storybook stories
- Add TypeScript types for all new code

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [shadcn/ui](https://ui.shadcn.com/) for the component inspiration
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Storybook](https://storybook.js.org/) for component documentation
