import { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import React from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    darkMode: {
      current: 'dark',
      stylePreview: true,
    },
    docs: {
      theme: 'dark',
    },
    options: {
      storySort: {
        order: ['Introduction', 'Base', 'Components', 'Pages'],
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground p-4">
        <Story />
      </div>
    ),
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],
};

export default preview;