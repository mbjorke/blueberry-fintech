import type { Meta, StoryObj } from '@storybook/react';
import { LovableLogo } from '@/components/ui/lovable-logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Size options for story controls
const sizeOptions = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  original: 'original',
} as const;

const variantOptions = {
  black: 'black',
  white: 'white',
  icon: 'icon',
  light: 'light',
  dark: 'dark',
  logoBgLight: 'logoBgLight',
  logoBgDark: 'logoBgDark',
  iconBgLight: 'iconBgLight',
  iconBgDark: 'iconBgDark',
} as const;

const meta = {
  title: 'UI/Lovable Logo',
  component: LovableLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Lovable logo component showcasing all available variants and sizes.

**Variants:**
- \`black\` / \`white\`: Standard logo variants
- \`icon\`: Icon-only version
- \`light\` / \`dark\`: PNG versions with backgrounds
- \`logoBgLight\` / \`logoBgDark\`: Logo with background
- \`iconBgLight\` / \`iconBgDark\`: Icon with background

**Sizes:**
- \`sm\`, \`md\`, \`lg\`, \`xl\`: Fixed square sizes
- \`original\`: Natural/original logo dimensions (maintains aspect ratio)
- Custom number: Pixel width (square) or use \`naturalAspect\` prop for natural ratio
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(variantOptions),
      description: 'Logo variant to display',
    },
    size: {
      control: { type: 'select' },
      options: Object.values(sizeOptions),
      description: 'Size of the logo',
    },
    naturalAspect: {
      control: 'boolean',
      description: 'Maintain natural aspect ratio instead of forcing square',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    variant: 'black',
    size: 'md',
    naturalAspect: false,
  },
} satisfies Meta<typeof LovableLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default logo display
 */
export const Default: Story = {
  args: {
    variant: 'black',
    size: 'md',
  },
};

/**
 * All size variants
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Logo Sizes</CardTitle>
          <CardDescription>Square sizes (forced aspect ratio)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-6 p-4">
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size="sm" />
              <span className="text-xs text-muted-foreground">sm (24px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size="md" />
              <span className="text-xs text-muted-foreground">md (32px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size="lg" />
              <span className="text-xs text-muted-foreground">lg (48px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size="xl" />
              <span className="text-xs text-muted-foreground">xl (64px)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Original Size</CardTitle>
          <CardDescription>Natural logo dimensions (maintains aspect ratio)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-muted/50">
            <LovableLogo variant="black" size="original" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Natural Aspect Ratio</CardTitle>
          <CardDescription>Custom width with natural height (not square)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-6 p-4">
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size={100} naturalAspect />
              <span className="text-xs text-muted-foreground">100px width</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size={150} naturalAspect />
              <span className="text-xs text-muted-foreground">150px width</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LovableLogo variant="black" size={200} naturalAspect />
              <span className="text-xs text-muted-foreground">200px width</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * All logo variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Standard Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 p-4">
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <LovableLogo variant="black" size="lg" />
              <span className="text-sm font-medium">Black</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-black">
              <LovableLogo variant="white" size="lg" />
              <span className="text-sm font-medium text-white">White</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <LovableLogo variant="icon" size="lg" />
              <span className="text-sm font-medium">Icon</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Background Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 p-4">
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <LovableLogo variant="logoBgLight" size="lg" />
              <span className="text-sm font-medium">Logo BG Light</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-black">
              <LovableLogo variant="logoBgDark" size="lg" />
              <span className="text-sm font-medium text-white">Logo BG Dark</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <LovableLogo variant="iconBgLight" size="lg" />
              <span className="text-sm font-medium">Icon BG Light</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-black">
              <LovableLogo variant="iconBgDark" size="lg" />
              <span className="text-sm font-medium text-white">Icon BG Dark</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Original size showcase - displays logo at its natural dimensions
 */
export const OriginalSize: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Original Logo Size</CardTitle>
          <CardDescription>
            Displaying the Lovable logo at its natural/original dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="p-8 border rounded-lg bg-muted/30">
              <div className="flex flex-col items-center gap-4">
                <LovableLogo variant="black" size="original" />
                <div className="text-center">
                  <p className="font-semibold">Black Logo - Original Size</p>
                  <p className="text-sm text-muted-foreground">Natural aspect ratio maintained</p>
                </div>
              </div>
            </div>

            <div className="p-8 border rounded-lg bg-black">
              <div className="flex flex-col items-center gap-4">
                <LovableLogo variant="white" size="original" />
                <div className="text-center">
                  <p className="font-semibold text-white">White Logo - Original Size</p>
                  <p className="text-sm text-white/70">Natural aspect ratio maintained</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border rounded-lg">
                <div className="flex flex-col items-center gap-3">
                  <LovableLogo variant="logoBgLight" size="original" />
                  <p className="text-sm font-medium">Logo BG Light</p>
                </div>
              </div>
              <div className="p-6 border rounded-lg bg-black">
                <div className="flex flex-col items-center gap-3">
                  <LovableLogo variant="logoBgDark" size="original" />
                  <p className="text-sm font-medium text-white">Logo BG Dark</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

