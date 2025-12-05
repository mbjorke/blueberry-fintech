import React from 'react';
import { getLovableLogos } from '@/utils/lovable-brand-kit';

interface LovableLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'black' | 'white' | 'icon' | 'light' | 'dark' | 'logoBgLight' | 'logoBgDark' | 'iconBgLight' | 'iconBgDark';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'original' | number;
  className?: string;
  /** If true, maintains natural aspect ratio instead of forcing square */
  naturalAspect?: boolean;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
} as const;

const logoMap = {
  black: getLovableLogos().primary,
  white: getLovableLogos().primaryLight,
  icon: getLovableLogos().icon,
  light: getLovableLogos().light,
  dark: getLovableLogos().dark,
  logoBgLight: getLovableLogos().logoBgLight,
  logoBgDark: getLovableLogos().logoBgDark,
  iconBgLight: getLovableLogos().iconBgLight,
  iconBgDark: getLovableLogos().iconBgDark,
} as const;

export function LovableLogo({
  variant = 'black',
  size = 'md',
  className = '',
  naturalAspect = false,
  ...props
}: LovableLogoProps) {
  const sizeValue = typeof size === 'string' && size !== 'original' ? sizeMap[size] : size;
  const logoSrc = logoMap[variant];
  
  // For original size, don't set dimensions - let image use natural size
  const style = size === 'original' 
    ? {} 
    : naturalAspect
    ? { width: sizeValue, height: 'auto' }
    : { width: sizeValue, height: sizeValue };

  return (
    <div className={`inline-block ${className}`} {...props}>
      <img
        src={logoSrc}
        alt={`Lovable ${variant} logo`}
        style={style}
        className="object-contain"
      />
    </div>
  );
}

export default LovableLogo;

