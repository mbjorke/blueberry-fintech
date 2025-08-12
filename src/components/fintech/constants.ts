import { Coffee, Car, ShoppingBag, Home, Smartphone, CreditCard, AlertCircle } from "lucide-react";

export const categoryIcons = {
  food: Coffee,
  transport: Car,
  shopping: ShoppingBag,
  housing: Home,
  technology: Smartphone,
  other: CreditCard,
  unmapped: AlertCircle,
} as const;

// Color definitions for dark mode only
type CategoryColorClasses = {
  bg: string;
  text: string;
};

const baseColors: Record<string, CategoryColorClasses> = {
  food: {
    bg: 'bg-accent',
    text: 'text-white',
  },
  transport: {
    bg: 'bg-accent/90',
    text: 'text-white',
  },
  shopping: {
    bg: 'bg-accent/80',
    text: 'text-white',
  },
  housing: {
    bg: 'bg-accent/60',
    text: 'text-white',
  },
  technology: {
    bg: 'bg-accent/50',
    text: 'text-white',
  },
  other: {
    bg: 'bg-accent/40',
    text: 'text-white',
  },
  unmapped: {
    bg: 'bg-warning',
    text: 'text-white',
  },
} as const;

// Helper function to generate consistent color classes
export const getCategoryColorClasses = (category: string, isUnmapped = false) => {
  const colors = baseColors[isUnmapped ? 'unmapped' : (category || 'other')] || baseColors.other;
  return {
    container: `${colors.bg} ${colors.text}`,
    bg: colors.bg,
    text: colors.text,
  };
};
