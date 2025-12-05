import { useEffect, useState } from "react";
import { Palette, Moon, Sun, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LovableLogo } from "@/components/ui/lovable-logo";
import { BlueberryLogo } from "@/components/ui/blueberry-logo";
import { applyTheme, getCurrentTheme, getCurrentThemeMode } from "@/utils/theme";
import { themeList, type ThemeName } from "@/tokens/themes";

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getCurrentTheme());
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(getCurrentThemeMode());

  useEffect(() => {
    // Initialize theme on mount
    const theme = getCurrentTheme();
    const mode = getCurrentThemeMode();
    setCurrentTheme(theme);
    setCurrentMode(mode);
    applyTheme(theme, mode);
  }, []);

  const handleThemeChange = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
    applyTheme(themeName, currentMode);
  };

  const handleModeChange = (mode: 'light' | 'dark') => {
    setCurrentMode(mode);
    applyTheme(currentTheme, mode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Theme Selection */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            <span>Berry Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {themeList.map((theme) => (
              <DropdownMenuItem
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className={currentTheme === theme.name ? "bg-accent" : ""}
              >
                <span className="mr-2 flex items-center">
                  {theme.name === 'blueberry' ? (
                    <BlueberryLogo size={24} />
                  ) : theme.name === 'lovable' ? (
                    <LovableLogo variant={currentMode === 'dark' ? 'white' : 'black'} size={28} />
                  ) : theme.name === 'raspberry' ? (
                    <Circle className="h-5 w-5 fill-red-500 text-red-500" />
                  ) : theme.name === 'lingonberry' ? (
                    <Circle className="h-5 w-5 fill-orange-600 text-orange-600" />
                  ) : (
                    <Circle className="h-5 w-5 fill-pink-500 text-pink-500" />
                  )}
                </span>
                {theme.displayName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Mode Selection */}
        <DropdownMenuItem onClick={() => handleModeChange('dark')}>
          <Moon className={`mr-2 h-4 w-4 ${currentMode === 'dark' ? 'text-primary' : ''}`} />
          <span className={currentMode === 'dark' ? 'font-semibold' : ''}>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleModeChange('light')}>
          <Sun className={`mr-2 h-4 w-4 ${currentMode === 'light' ? 'text-primary' : ''}`} />
          <span className={currentMode === 'light' ? 'font-semibold' : ''}>Light</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
