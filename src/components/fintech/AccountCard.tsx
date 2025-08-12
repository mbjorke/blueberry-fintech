import { Button } from "@/components/ui/button";
import { ChevronRight, Wallet, PiggyBank, Briefcase, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AccountCardProps {
  balance: number;
  currency?: string;
  accountName?: string;
  accountType?: 'checking' | 'savings' | 'investment' | 'credit';
  availableBalance?: number;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
  color?: string;
}

// Using the design token's primary gradient
const primaryGradient = 'bg-gradient-primary';
const primaryGlow = 'shadow-lg shadow-primary/20';

// Use a single icon for all account types for consistency
const AccountIcon = Wallet;

export function AccountCard({ 
  balance, 
  currency = "€",
  accountName = "Account",
  accountType = 'checking',
  availableBalance = 0,
  isSelected = false,
  className,
  onClick,
  color = 'blue'
}: AccountCardProps) {
  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  };

  const gradientClass = primaryGradient;
  const glowClass = primaryGlow;

  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300",
        isSelected ? 'ring-2 ring-offset-2 ring-offset-primary ring-primary' : '',
        className
      )}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
    >
      <div className={cn(
        "p-6 text-white transition-all duration-300",
        gradientClass,
        glowClass
      )}>
        {/* Account Type Icon */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-accent flex items-center justify-center opacity-90">
          <AccountIcon className="w-10 h-10 text-white/90" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium text-white/90">{accountName}</div>
                <div className="text-xs text-white/70">
                  {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-sm font-medium text-white/80 mb-1">Available Balance</div>
            <div className="text-2xl font-bold tracking-tight">
              {formatCurrency(balance)}
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute bottom-4 right-4 h-8 px-3 text-white/80 hover:text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};