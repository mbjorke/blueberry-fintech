import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LovableLogo } from '@/components/ui/lovable-logo';
import { BlueberryLogo } from '@/components/ui/blueberry-logo';
import { CSSHeart } from '@/components/ui/css-heart';
import { applyTheme, themeList } from '@/tokens/themes';

const meta = {
  title: 'UI/Theme Showcase',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Demonstrates the power of token-based theming! Switch entire color schemes instantly with our semantic design tokens.

**Credits:**
- Token system inspired by [Lovable](https://lovable.dev)'s excellent design token architecture
- Component primitives built on [Radix UI](https://www.radix-ui.com)'s accessible foundation

All themes support both light and dark modes. No component code changes needed - just update CSS variables!
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive theme switcher demonstrating token-based theming.
 * Switch themes to see how the entire color scheme changes instantly!
 */
export const ThemeSwitcher: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('blueberry');
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
      applyTheme(currentTheme as any, mode);
    }, [currentTheme, mode]);

    return (
      <div className="space-y-6 p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Theme Showcase</CardTitle>
            <CardDescription>
              Demonstrates token-based theming - switch themes to see instant color scheme changes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Theme Selection */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Berry Themes</h3>
              <div className="flex flex-wrap gap-2">
                {themeList.map((theme) => (
                  <Button
                    key={theme.name}
                    variant={currentTheme === theme.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentTheme(theme.name)}
                  >
                    {theme.name === 'blueberry' ? (
                      <>
                        <BlueberryLogo size={28} />
                        <span className="ml-2">{theme.displayName}</span>
                      </>
                    ) : theme.name === 'lovable' ? (
                      <>
                        <LovableLogo variant="black" size={32} />
                        <span className="ml-2">{theme.displayName}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl">{theme.name === 'raspberry' ? '🫐' : theme.name === 'lingonberry' ? '🫐' : '🍓'}</span>
                        <span className="ml-2">{theme.displayName}</span>
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Mode</h3>
              <div className="flex gap-2">
                <Button
                  variant={mode === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('dark')}
                >
                  🌙 Dark
                </Button>
                <Button
                  variant={mode === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMode('light')}
                >
                  ☀️ Light
                </Button>
              </div>
            </div>

            {/* Component Showcase */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold">Component Preview</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Primary Button</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Primary Action</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Color Tokens</CardTitle>
                  <CardDescription>
                    All colors use semantic tokens - change themes and watch them update!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-1">
                      <div className="h-12 rounded bg-primary"></div>
                      <p className="text-xs text-muted-foreground">Primary</p>
                    </div>
                    <div className="space-y-1">
                      <div className="h-12 rounded bg-secondary"></div>
                      <p className="text-xs text-muted-foreground">Secondary</p>
                    </div>
                    <div className="space-y-1">
                      <div className="h-12 rounded bg-accent"></div>
                      <p className="text-xs text-muted-foreground">Accent</p>
                    </div>
                    <div className="space-y-1">
                      <div className="h-12 rounded bg-muted"></div>
                      <p className="text-xs text-muted-foreground">Muted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Credits */}
            <div className="pt-4 border-t text-xs text-muted-foreground">
              <p>
                <strong>Credits:</strong> Token system inspired by{' '}
                <a href="https://lovable.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Lovable
                </a>
                {' '}• Components built on{' '}
                <a href="https://www.radix-ui.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Radix UI
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

/**
 * All themes displayed side-by-side for comparison
 */
export const AllThemes: Story = {
  render: () => {
    return (
      <div className="space-y-8 p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Themes Comparison</CardTitle>
            <CardDescription>
              Click a theme button to apply it globally, or compare them side-by-side
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themeList.map((theme) => (
                <Card key={theme.name} className="overflow-hidden">
                  {/* CSS Gradient Header */}
                  <div
                    className="h-24 bg-gradient-to-br"
                    style={{
                      background: theme.dark['gradient-primary'],
                    }}
                  />
                  {/* Logo and CSS Heart below gradient for comparison */}
                  <div className="flex flex-col items-center justify-center gap-4 p-6 bg-card">
                    {theme.name === 'lovable' && (
                      <div className="flex items-center gap-4">
                        <CSSHeart size={60} variant="gradient" tilted />
                        <span className="text-xs text-muted-foreground">CSS Heart (Tilted)</span>
                      </div>
                    )}
                    {theme.name === 'blueberry' ? (
                      <BlueberryLogo size="xl" />
                    ) : theme.name === 'lovable' ? (
                      <LovableLogo variant="black" size="original" className="max-w-full" />
                    ) : theme.name === 'raspberry' ? (
                      <span className="text-5xl">🫐</span>
                    ) : theme.name === 'lingonberry' ? (
                      <span className="text-5xl">🫐</span>
                    ) : (
                      <span className="text-5xl">🍓</span>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{theme.displayName}</CardTitle>
                    <CardDescription>{theme.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      onClick={() => applyTheme(theme.name, 'dark')}
                    >
                      Apply Theme
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

