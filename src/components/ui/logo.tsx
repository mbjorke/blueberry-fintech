import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Source URL for the logo image */
  src: string;
  /** Alt text for the logo */
  alt: string;
  /** Size of the logo - can be a preset size or a number in pixels */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Whether to maintain natural aspect ratio instead of forcing square */
  naturalAspect?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Background color class for the container */
  containerClassName?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
} as const;

export function Logo({
  src,
  alt,
  size = 'md',
  naturalAspect = false,
  className = '',
  containerClassName = '',
  ...imgProps
}: LogoProps) {
  const sizeValue = typeof size === 'string' ? sizeMap[size] : size;
  
  // For natural aspect, only set width, let height be auto
  const style = naturalAspect
    ? { width: sizeValue, height: 'auto' }
    : { width: sizeValue, height: sizeValue };

  return (
    <div className={cn('inline-block', containerClassName)}>
      <img
        src={src}
        alt={alt}
        style={style}
        className={cn('object-contain', className)}
        {...imgProps}
      />
    </div>
  );
}

export default Logo;

