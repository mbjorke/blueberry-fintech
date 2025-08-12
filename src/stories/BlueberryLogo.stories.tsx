import type { Meta, StoryObj } from '@storybook/react';
import { BlueberryLogo } from '@/components/ui/blueberry-logo';

// Size mapping for story controls
const sizeOptions = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
} as const;

type SizeOption = keyof typeof sizeOptions;

const meta = {
  title: 'Components/UI/BlueberryLogo',
  component: BlueberryLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the logo',
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(sizeOptions),
      mapping: sizeOptions,
      description: 'Size of the logo in pixels',
    },
  },
} satisfies Meta<typeof BlueberryLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: sizeOptions.md,
  },
};

export const Small: Story = {
  args: {
    size: sizeOptions.sm,
  },
};

export const Large: Story = {
  args: {
    size: sizeOptions.lg,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: sizeOptions.xl,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'text-blue-500',
  },
};

// Showcase different logo variants in a grid
export const AllSizes = () => (
  <div className="grid grid-cols-2 gap-8 items-center justify-items-center">
    <div className="flex flex-col items-center gap-2">
      <BlueberryLogo size={sizeOptions.sm} />
      <div className="text-sm text-muted-foreground">Small ({sizeOptions.sm}px)</div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <BlueberryLogo size={sizeOptions.md} />
      <div className="text-sm text-muted-foreground">Medium ({sizeOptions.md}px)</div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <BlueberryLogo size={sizeOptions.lg} />
      <div className="text-sm text-muted-foreground">Large ({sizeOptions.lg}px)</div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <BlueberryLogo size={sizeOptions.xl} />
      <div className="text-sm text-muted-foreground">Extra Large ({sizeOptions.xl}px)</div>
    </div>
  </div>
);

AllSizes.parameters = {
  docs: {
    description: {
      story: 'All available logo sizes displayed in a grid for comparison.',
    },
  },
};
