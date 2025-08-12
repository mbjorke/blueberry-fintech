import React from 'react';

interface BlueberryLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function BlueberryLogo({ size = 32, className, ...props }: BlueberryLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Berry */}
      <circle cx="32" cy="32" r="28" fill="url(#berryGradient)" filter="url(#berryShadow)" />
      
      {/* Highlights */}
      <circle cx="24" cy="24" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="32" cy="20" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="40" cy="24" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="36" cy="32" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="28" cy="36" r="2" fill="white" fillOpacity="0.8" />
      
      {/* Gradient and Effects */}
      <defs>
        <linearGradient id="berryGradient" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(260, 85%, 72%)" />
          <stop offset="1" stopColor="hsl(260, 85%, 60%)" />
        </linearGradient>
        
        <filter id="berryShadow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
}

export default BlueberryLogo;
