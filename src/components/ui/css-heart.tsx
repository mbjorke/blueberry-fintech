import React from 'react';
import { cn } from '@/lib/utils';

interface CSSHeartProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  color?: string;
  className?: string;
  variant?: 'filled' | 'outline' | 'gradient';
  /** Rotate the heart to match Lovable logo tilt (approximately -15deg) */
  tilted?: boolean;
  /** Enable beating animation */
  animated?: boolean;
}

/**
 * CSS Heart Shape Component
 * 
 * Creates a heart shape using pure CSS (no SVG).
 * Mimics the heart shapes from the Lovable logo.
 * 
 * Uses clip-path and pseudo-elements to create the heart shape.
 */
export function CSSHeart({
  size = 40,
  color = 'currentColor',
  className,
  variant = 'filled',
  tilted = false,
  animated = false,
  style,
  ...props
}: CSSHeartProps) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  
  // Filter out any non-standard props that shouldn't go to DOM
  const { ...domProps } = props as any;
  
  const heartStyle: React.CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    position: 'relative',
    transform: 'rotate(-45deg)',
    ...style,
  };

  const heartBeforeAfter: React.CSSProperties = {
    content: '""',
    width: sizeValue,
    height: sizeValue,
    position: 'absolute',
    left: '50%',
    top: '0',
    transform: 'translateX(-50%)',
    borderRadius: `${sizeValue} ${sizeValue} 0 0`,
  };

  if (variant === 'gradient') {
    const sizeNum = typeof size === 'number' ? size : parseInt(size);
    const halfSize = sizeNum / 2;
    
    // STEP 1: Exact gradient from Lovable logo SVG
    // SVG gradient stops: #FF8E63 (2.5%), #FF7EB0 (56%), #4B73FF (95%)
    // SVG gradient direction: x1="40.4527" y1="21.4331" x2="76.9327" y2="121.971"
    // Calculated angle: ~70deg from horizontal (top-left to bottom-right)
    const gradient = 'linear-gradient(70deg, #FF8E63 0%, #FF8E63 2.5%, #FF7EB0 56%, #4B73FF 95%, #4B73FF 100%)';
    
    // Rotation for tilted variant
    const rotation = tilted ? -15 : 0;
    
    // Use CSSHeartClipPath approach - single gradient with clip-path
    return (
      <div
        className={cn('css-heart-gradient', className, animated && 'css-heart-animated')}
        style={{
          width: sizeValue,
          height: sizeValue,
          position: 'relative',
          background: gradient,
          clipPath: "path('M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z')",
          transform: `scale(${sizeNum / 24}) ${rotation !== 0 ? `rotate(${rotation}deg)` : ''}`,
          transformOrigin: 'center center',
          ...style,
        }}
        {...domProps}
      >
        {animated && (
          <style>{`
            @keyframes heartbeat {
              0%, 100% {
                transform: scale(${sizeNum / 24}) ${rotation !== 0 ? `rotate(${rotation}deg)` : ''} scale(1);
              }
              10%, 30% {
                transform: scale(${sizeNum / 24}) ${rotation !== 0 ? `rotate(${rotation}deg)` : ''} scale(1.1);
              }
              20%, 40% {
                transform: scale(${sizeNum / 24}) ${rotation !== 0 ? `rotate(${rotation}deg)` : ''} scale(1.05);
              }
              50% {
                transform: scale(${sizeNum / 24}) ${rotation !== 0 ? `rotate(${rotation}deg)` : ''} scale(1);
              }
            }
            .css-heart-animated {
              animation: heartbeat 1.5s ease-in-out infinite;
            }
          `}</style>
        )}
      </div>
    );
  }

  const sizeNum = typeof size === 'number' ? size : parseInt(size);
  const halfSize = sizeNum / 2;
  
  return (
    <div
      className={cn('css-heart', className)}
      style={{
        width: sizeValue,
        height: sizeValue,
        position: 'relative',
        ...(variant === 'filled' 
          ? { backgroundColor: color }
          : { border: `2px solid ${color}`, backgroundColor: 'transparent' }
        ),
        transform: 'rotate(-45deg)',
        ...style,
      }}
      {...domProps}
    >
      <style>{`
        .css-heart::before,
        .css-heart::after {
          content: "";
          width: ${sizeValue};
          height: ${sizeValue};
          ${variant === 'filled' ? `background: ${color};` : `border: 2px solid ${color};`}
          border-radius: 50%;
          position: absolute;
        }
        .css-heart::before {
          top: -${halfSize}px;
          left: 0;
        }
        .css-heart::after {
          left: ${halfSize}px;
          top: 0;
        }
      `}</style>
    </div>
  );
}

/**
 * Alternative CSS Heart using clip-path (more accurate shape)
 */
export function CSSHeartClipPath({
  size = 40,
  color = 'currentColor',
  className,
  variant = 'filled',
  style,
  ...props
}: CSSHeartProps) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  
  const clipPath = "path('M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z')";

  return (
    <div
      className={cn('css-heart-clip', className)}
      style={{
        width: sizeValue,
        height: sizeValue,
        clipPath: "path('M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z')",
        ...(variant === 'filled' 
          ? { backgroundColor: color }
          : { border: `2px solid ${color}`, backgroundColor: 'transparent' }
        ),
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * Simple CSS Heart using border-radius (most compatible)
 */
export function CSSHeartSimple({
  size = 40,
  color = 'currentColor',
  className,
  variant = 'filled',
  style,
  ...props
}: CSSHeartProps) {
  const sizeValue = typeof size === 'number' ? size : parseInt(size);
  const halfSize = sizeValue / 2;
  
  return (
    <div
      className={cn('css-heart-simple', className)}
      style={{
        width: `${sizeValue}px`,
        height: `${sizeValue}px`,
        position: 'relative',
        transform: 'rotate(-45deg)',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          width: `${halfSize}px`,
          height: `${halfSize}px`,
          left: 0,
          top: 0,
          borderRadius: `${halfSize}px ${halfSize}px 0 0`,
          ...(variant === 'filled' 
            ? { backgroundColor: color }
            : { border: `2px solid ${color}`, backgroundColor: 'transparent' }
          ),
          transform: 'rotate(45deg)',
          transformOrigin: 'bottom right',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: `${halfSize}px`,
          height: `${halfSize}px`,
          right: 0,
          top: 0,
          borderRadius: `${halfSize}px ${halfSize}px 0 0`,
          ...(variant === 'filled' 
            ? { backgroundColor: color }
            : { border: `2px solid ${color}`, backgroundColor: 'transparent' }
          ),
          transform: 'rotate(-45deg)',
          transformOrigin: 'bottom left',
        }}
      />
    </div>
  );
}

export default CSSHeart;

