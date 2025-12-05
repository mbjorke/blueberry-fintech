import type { Meta, StoryObj } from '@storybook/react';
import { CSSHeart, CSSHeartSimple, CSSHeartClipPath } from '@/components/ui/css-heart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const meta = {
  title: 'UI/CSS Heart',
  component: CSSHeart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Pure CSS heart shapes that mimic the Lovable logo hearts.

**Methods:**
- \`CSSHeart\`: Uses pseudo-elements with border-radius
- \`CSSHeartSimple\`: Uses div elements (most compatible)
- \`CSSHeartClipPath\`: Uses clip-path for precise shape (modern browsers)

**Variants:**
- \`filled\`: Solid color heart
- \`outline\`: Outlined heart
- \`gradient\`: Gradient heart matching Lovable brand colors
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Size of the heart in pixels',
    },
    color: {
      control: 'color',
      description: 'Color of the heart',
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'gradient'],
      description: 'Heart variant style',
    },
    tilted: {
      control: 'boolean',
      description: 'Rotate heart to match Lovable logo tilt (-15deg)',
    },
    animated: {
      control: 'boolean',
      description: 'Enable beating animation',
    },
  },
  args: {
    size: 40,
    color: '#ef4444',
    variant: 'filled',
    tilted: false,
    animated: false,
  },
} satisfies Meta<typeof CSSHeart>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default CSS heart
 */
export const Default: Story = {
  args: {
    size: 60,
    color: '#ef4444',
    variant: 'filled',
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
          <CardTitle>Heart Sizes</CardTitle>
          <CardDescription>Different sizes of CSS hearts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8 p-4">
            {[20, 40, 60, 80, 100].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CSSHeart size={size} color="#ef4444" variant="filled" />
                <span className="text-xs text-muted-foreground">{size}px</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * All variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Heart Variants</CardTitle>
          <CardDescription>Filled, outline, and gradient hearts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8 p-4">
            <div className="flex flex-col items-center gap-2">
              <CSSHeart size={60} color="#ef4444" variant="filled" />
              <span className="text-xs text-muted-foreground">Filled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CSSHeart size={60} color="#ef4444" variant="outline" />
              <span className="text-xs text-muted-foreground">Outline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CSSHeart size={60} color="#ef4444" variant="gradient" />
              <span className="text-xs text-muted-foreground">Gradient</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Comparison of different CSS heart implementations
 */
export const Comparison: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>CSS Heart Methods Comparison</CardTitle>
          <CardDescription>Different ways to create hearts in CSS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 p-4">
            <div className="flex flex-col items-center gap-3">
              <CSSHeart size={80} color="#ef4444" variant="filled" />
              <div className="text-center">
                <p className="font-semibold">CSSHeart</p>
                <p className="text-xs text-muted-foreground">Pseudo-elements</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CSSHeartSimple size={80} color="#ef4444" variant="filled" />
              <div className="text-center">
                <p className="font-semibold">CSSHeartSimple</p>
                <p className="text-xs text-muted-foreground">Div elements</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CSSHeartClipPath size={80} color="#ef4444" variant="filled" />
              <div className="text-center">
                <p className="font-semibold">CSSHeartClipPath</p>
                <p className="text-xs text-muted-foreground">Clip-path</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * STEP 1: Exact gradient matching Lovable logo SVG
 */
export const LovableGradientExact: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Exact Lovable Gradient</CardTitle>
          <CardDescription>
            Gradient matches SVG exactly: #FF8E63 (2.5%) → #FF7EB0 (56%) → #4B73FF (95%) at 70deg angle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8 p-4">
            {[40, 60, 80, 100].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CSSHeart size={size} variant="gradient" />
                <span className="text-xs text-muted-foreground">{size}px</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * STEP 2: Tilted hearts matching Lovable logo orientation
 */
export const LovableTiltedHearts: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Tilted Hearts</CardTitle>
          <CardDescription>Hearts rotated -15deg to match Lovable logo orientation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8 p-4">
            {[40, 60, 80, 100].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CSSHeart size={size} variant="gradient" tilted />
                <span className="text-xs text-muted-foreground">{size}px (tilted)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * STEP 3: Animated beating hearts
 */
export const AnimatedBeatingHearts: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Animated Beating Hearts</CardTitle>
          <CardDescription>Hearts with beating animation - coming soon!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8 p-4">
            {[40, 60, 80, 100].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CSSHeart size={size} variant="gradient" tilted animated />
                <span className="text-xs text-muted-foreground">{size}px (animated)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Hearts in different colors
 */
export const Colors: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Heart Colors</CardTitle>
          <CardDescription>Hearts in various colors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8 p-4">
            {[
              { name: 'Red', color: '#ef4444' },
              { name: 'Pink', color: '#ec4899' },
              { name: 'Purple', color: '#a855f7' },
              { name: 'Blue', color: '#3b82f6' },
              { name: 'Green', color: '#22c55e' },
            ].map(({ name, color }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <CSSHeart size={60} color={color} variant="filled" />
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

