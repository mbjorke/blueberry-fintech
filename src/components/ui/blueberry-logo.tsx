import React from 'react';
import { Avatar, AvatarImage } from './avatar';

interface BlueberryLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
} as const;

export function BlueberryLogo({ 
  size = 'md', 
  className = '',
  ...props 
}: BlueberryLogoProps) {
  const sizeValue = typeof size === 'string' ? sizeMap[size] : size;
  
  return (
    <div className={`inline-block ${className}`} {...props}>
      <Avatar className="bg-transparent" style={{ width: sizeValue, height: sizeValue }}>
        <AvatarImage 
          src="/blueberry.svg" 
          alt="Blueberry Logo"
          className="w-full h-full object-contain"
        />
      </Avatar>
    </div>
  );
}

export default BlueberryLogo;
