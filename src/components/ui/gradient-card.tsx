import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card should have a glowing effect
   * @default false
   */
  glow?: boolean;
  /**
   * The direction of the gradient
   * @default 'to-br' (bottom-right)
   */
  gradientDirection?: 'to-t' | 'to-tr' | 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl';
  /**
   * The starting color of the gradient (Tailwind color class)
   * @default 'from-accent/20'
   */
  from?: string;
  /**
   * The ending color of the gradient (Tailwind color class)
   * @default 'to-accent/10'
   */
  to?: string;
  /**
   * Whether the card is in a selected/active state
   * @default false
   */
  selected?: boolean;
  /**
   * The selected state gradient start color (Tailwind color class)
   * @default 'from-accent'
   */
  selectedFrom?: string;
  /**
   * The selected state gradient end color (Tailwind color class)
   * @default 'to-accent/50'
   */
  selectedTo?: string;
}

/**
 * A card component with gradient background and optional glow effect.
 * Extends the base Card component with gradient styling capabilities.
 */
const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({
    className,
    children,
    glow = false,
    gradientDirection = 'to-br',
    from = 'from-accent/20',
    to = 'to-accent/10',
    selected = false,
    selectedFrom = 'from-accent',
    selectedTo = 'to-accent/50',
    ...props
  }, ref) => {
    const gradientClass = selected 
      ? `${selectedFrom} ${selectedTo}`
      : `${from} ${to}`;

    return (
      <Card
        ref={ref}
        className={cn(
          'overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] active:scale-100',
          `bg-gradient-${gradientDirection} ${gradientClass}`,
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

GradientCard.displayName = 'GradientCard';

export { 
  GradientCard, 
  CardContent as GradientCardContent, 
  CardHeader as GradientCardHeader, 
  CardTitle as GradientCardTitle, 
  CardDescription as GradientCardDescription, 
  CardFooter as GradientCardFooter 
};

export default GradientCard;
