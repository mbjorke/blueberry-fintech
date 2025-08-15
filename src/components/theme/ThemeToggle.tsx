import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);

  // Only show the theme toggle after the component has mounted
  React.useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  // Update theme when it changes
  React.useEffect(() => {
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-full hover:bg-accent/20 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-400" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {[
          { value: 'light', label: 'Light', icon: Sun, iconClass: 'text-amber-500' },
          { value: 'dark', label: 'Dark', icon: Moon, iconClass: 'text-indigo-400' },
          { value: 'system', label: 'System', icon: Monitor, iconClass: 'text-muted-foreground' },
        ].map(({ value, label, icon: Icon, iconClass }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleThemeChange(value as Theme)}
            className={`flex items-center justify-between cursor-pointer hover:bg-accent/20 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${theme === value ? 'bg-accent/20' : ''}`}
          >
            <span>{label}</span>
            {theme === value && <Icon className={`h-4 w-4 ${iconClass}`} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
