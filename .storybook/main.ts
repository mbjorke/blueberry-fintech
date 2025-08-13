import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    // Base UI primitives (low-level components)
    "../src/stories/base/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Composed components (using base primitives)
    "../src/stories/composed/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Fintech-specific components
    "../src/stories/fintech/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Utilities and test components
    "../src/stories/utilities/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Fallback for any remaining stories
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.mdx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;