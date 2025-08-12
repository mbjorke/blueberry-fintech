# Fintech Dashboard

## Project Overview

A modern, responsive fintech dashboard built with React, TypeScript, and Tailwind CSS. This project showcases a clean, accessible UI for financial data visualization and management.

## Features

- Account overview with balance and transaction history
- Transaction categorization and filtering
- Responsive design for all device sizes
- Modern UI with dark/light mode support
- Built with accessibility in mind

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later) or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd fintech-dashboard
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

### Project Structure

- `/src/components` - Reusable UI components
  - `/ui` - Base UI components (buttons, cards, etc.)
  - `/fintech` - Fintech-specific components
- `/src/tokens` - Design tokens (colors, typography, spacing)
- `/src/pages` - Page components
- `/src/lib` - Utility functions and hooks
- `/public` - Static assets

## Technologies Used

- [Vite](https://vitejs.dev/) - Build tool and dev server
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Radix UI](https://www.radix-ui.com/) - Primitives for accessible components

## Deployment

### Building for Production

```sh
npm run build
```

This will create a `dist` directory with the production build.

### Hosting

You can deploy the built files to any static hosting service:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
