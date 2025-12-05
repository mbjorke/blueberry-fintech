import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BlueberryLogo } from '@/components/ui/blueberry-logo';
import { applyTheme, getCurrentTheme, getCurrentThemeMode } from '@/utils/theme';
import { themeList, type ThemeName } from '@/tokens/themes';
import { Palette, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/portfolio/Footer';

/**
 * Theme Demo Page
 * 
 * Showcases all available themes side-by-side to demonstrate
 * the power of token-based theming.
 * 
 * Credits:
 * - Token system inspired by Lovable's excellent design token architecture
 * - Component primitives built on Radix UI's accessible foundation
 */
export default function ThemeDemo() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getCurrentTheme());
  const [mode, setMode] = useState<'light' | 'dark'>(getCurrentThemeMode());
  const lovableGradient = 'linear-gradient(70deg, #FF8E63 0%, #FF8E63 2.5%, #FF7EB0 56%, #4B73FF 95%, #4B73FF 100%)';
  const lovableAssets = [
    { label: 'Primary Logo', src: '/lovable-brand/logoblack.svg' },
    { label: 'Icon', src: '/lovable-brand/lovable-logo-icon.svg' },
    { label: 'Dark Background', src: '/lovable-brand/lovable-logo-bg-dark.png' },
    { label: 'Light Background', src: '/lovable-brand/lovable-logo-bg-light.png' },
  ];

  useEffect(() => {
    applyTheme(currentTheme, mode);
  }, [currentTheme, mode]);

  const ThemePreview = ({ themeName, theme }: { themeName: ThemeName; theme: typeof themeList[0] }) => {
    const isActive = currentTheme === themeName;
    
    return (
      <Card className={`relative overflow-hidden transition-all ${isActive ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
        {/* CSS Gradient Header */}
        <div
          className="h-24 w-full"
          style={{
            background: mode === 'dark' 
              ? theme.dark['gradient-primary']
              : theme.light['gradient-primary'],
          }}
        />
        
        {/* Logo preview below gradient */}
        <div className="flex flex-col items-center justify-center gap-4 p-6 bg-card border-b">
          {themeName === 'blueberry' ? (
            <BlueberryLogo size="xl" />
          ) : themeName === 'lovable' ? (
            <img
              src="/lovable-brand/lovable-logo-icon.svg"
              alt="Lovable Logo Icon"
              className="h-20 w-20 object-contain drop-shadow-lg"
            />
          ) : themeName === 'raspberry' ? (
            <span className="text-5xl">🫐</span>
          ) : themeName === 'lingonberry' ? (
            <span className="text-5xl">🫐</span>
          ) : (
            <span className="text-5xl">🍓</span>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{theme.displayName}</CardTitle>
            {isActive && (
              <Badge variant="default" className="gap-1">
                <Check className="h-3 w-3" />
                Active
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs">{theme.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Color swatches */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Color Tokens</Label>
            <div className="grid grid-cols-4 gap-1">
              <div className="space-y-1">
                <div
                  className="h-8 rounded border"
                  style={{
                    backgroundColor: `hsl(${mode === 'dark' ? theme.dark.primary : theme.light.primary})`,
                  }}
                />
                <p className="text-[10px] text-muted-foreground text-center">Primary</p>
              </div>
              <div className="space-y-1">
                <div
                  className="h-8 rounded border"
                  style={{
                    backgroundColor: `hsl(${mode === 'dark' ? theme.dark.accent : theme.light.accent})`,
                  }}
                />
                <p className="text-[10px] text-muted-foreground text-center">Accent</p>
              </div>
              <div className="space-y-1">
                <div
                  className="h-8 rounded border"
                  style={{
                    backgroundColor: `hsl(${mode === 'dark' ? theme.dark.secondary : theme.light.secondary})`,
                  }}
                />
                <p className="text-[10px] text-muted-foreground text-center">Secondary</p>
              </div>
              <div className="space-y-1">
                <div
                  className="h-8 rounded border"
                  style={{
                    backgroundColor: `hsl(${mode === 'dark' ? theme.dark.muted : theme.light.muted})`,
                  }}
                />
                <p className="text-[10px] text-muted-foreground text-center">Muted</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Component preview */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Component Preview</Label>
            <div className="space-y-2 p-3 rounded-md border" style={{
              backgroundColor: `hsl(${mode === 'dark' ? theme.dark.card : theme.light.card})`,
              borderColor: `hsl(${mode === 'dark' ? theme.dark.border : theme.light.border})`,
            }}>
              <Button
                size="sm"
                className="w-full"
                style={{
                  backgroundColor: `hsl(${mode === 'dark' ? theme.dark.primary : theme.light.primary})`,
                  color: `hsl(${mode === 'dark' ? theme.dark['primary-foreground'] : theme.light['primary-foreground']})`,
                }}
              >
                Button
              </Button>
              <div className="flex gap-1 flex-wrap">
                <Badge variant="default" style={{
                  backgroundColor: `hsl(${mode === 'dark' ? theme.dark.accent : theme.light.accent})`,
                  color: `hsl(${mode === 'dark' ? theme.dark['accent-foreground'] : theme.light['accent-foreground']})`,
                }}>
                  Badge
                </Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>
          </div>

          {/* Apply button */}
          <Button
            variant={isActive ? 'default' : 'outline'}
            className="w-full"
            onClick={() => setCurrentTheme(themeName)}
          >
            {isActive ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Currently Active
              </>
            ) : (
              <>
                <Palette className="mr-2 h-4 w-4" />
                Apply Theme
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                <Palette className="h-8 w-8" />
                Theme Showcase
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore all available themes and see how token-based theming works
              </p>
            </div>
            <Link to="/">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <Label className="font-semibold">Mode:</Label>
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
            <div className="ml-auto text-sm text-muted-foreground">
              Current: <span className="font-semibold text-foreground">{currentTheme}</span> theme
            </div>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {themeList.map((theme) => (
            <ThemePreview
              key={theme.name}
              themeName={theme.name}
              theme={theme}
            />
          ))}
        </div>

        {/* Info Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About Token-Based Theming</CardTitle>
            <CardDescription>
              How this demonstrates the power of semantic design tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">✨ How It Works</h3>
                <p className="text-sm text-muted-foreground">
                  All themes use the same semantic token names (primary, accent, background, etc.).
                  Switching themes simply updates CSS variables - no component code changes needed!
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 Benefits</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Instant theme switching</li>
                  <li>Consistent component behavior</li>
                  <li>Easy to add new themes</li>
                  <li>Maintainable color system</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">🙏 Credits</h3>
                <p className="text-sm text-muted-foreground">
                  This token system is inspired by{' '}
                  <a
                    href="https://lovable.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Lovable
                  </a>
                  's excellent design token architecture. Components are built on{' '}
                  <a
                    href="https://www.radix-ui.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Radix UI
                  </a>
                  's accessible primitives.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lovable Gradient Reference */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Lovable Gradient Reference</CardTitle>
            <CardDescription>
              Exact gradient used in the Lovable brand kit (from <code>lovable-logo-icon.svg</code>)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border overflow-hidden">
                <div className="p-3 border-b text-sm font-semibold flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                  CSS Implementation
                </div>
                <div
                  className="h-40"
                  style={{
                    background: lovableGradient,
                  }}
                />
                <div className="p-3 text-xs text-muted-foreground">
                  `linear-gradient(70deg, #FF8E63 0%, #FF8E63 2.5%, #FF7EB0 56%, #4B73FF 95%)`
                </div>
              </div>
              <div className="rounded-xl border overflow-hidden">
                <div className="p-3 border-b text-sm font-semibold flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                  SVG Reference
                </div>
                <div className="h-40 flex items-center justify-center bg-muted/20">
                  <img
                    src="/lovable-brand/lovable-logo-icon.svg"
                    alt="Lovable Icon"
                    className="h-32 w-32 object-contain drop-shadow-lg"
                  />
                </div>
                <div className="p-3 text-xs text-muted-foreground">
                  Pulled directly from the Lovable brand kit. Angle derived from <code>paint0_linear</code> coordinates.
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This reference ensures our CSS hearts and gradients stay faithful to Lovable’s original brand assets.
            </p>
          </CardContent>
        </Card>

        {/* Brand Kit Assets */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Brand Kit Assets</CardTitle>
            <CardDescription>
              Visuals sourced from <code>public/lovable-brand/</code> for consistency checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lovableAssets.map((asset) => (
                <div key={asset.src} className="border rounded-lg p-3 bg-card flex flex-col gap-3">
                  <div className="h-28 flex items-center justify-center bg-muted rounded-md">
                    <img src={asset.src} alt={asset.label} className="max-h-24 object-contain" />
                  </div>
                  <div className="text-sm font-medium">{asset.label}</div>
                  <div className="text-xs text-muted-foreground break-all">{asset.src}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Try It Out Section */}
        <Card>
          <CardHeader>
            <CardTitle>Try It Out</CardTitle>
            <CardDescription>
              Click any theme card above to apply it globally, or use the theme toggle in the header
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="destructive">Destructive Button</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
            <div className="mt-4 space-y-2 max-w-md">
              <Label htmlFor="demo-input">Input Example</Label>
              <Input id="demo-input" placeholder="Type something..." />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

