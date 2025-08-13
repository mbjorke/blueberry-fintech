import { useState, useEffect } from "react";
import { Account } from "./types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Wallet, PiggyBank, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

// Safely format currency values
const formatCurrency = (amount: number, currency: string): string => {
  try {
    // If the currency is a symbol (like €), just prepend it
    if (currency.length <= 3) {
      return `${currency} ${amount.toFixed(2)}`;
    }
    // Otherwise, try to format it as a currency code
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.length === 3 ? currency : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    // Fallback to a simple format if there's an error
    return `${currency} ${amount.toFixed(2)}`;
  }
};

// Account icon mapping with consistent styling
const accountIcons = {
  'wallet': <Wallet className="h-5 w-5 text-white" />,
  'piggy-bank': <PiggyBank className="h-5 w-5 text-white" />,
  'briefcase': <Briefcase className="h-5 w-5 text-white" />,
  'default': <Wallet className="h-5 w-5 text-white" />
} as const;

// Account type to gradient mapping using design system's gradient system
const accountTypeGradients = {
  'checking': 'bg-gradient-to-br from-primary to-primary/80', // Primary gradient for checking accounts
  'savings': 'bg-gradient-to-br from-accent to-accent/80',    // Accent gradient for savings accounts
  'investment': 'bg-gradient-to-br from-secondary to-secondary/80', // Secondary gradient for investments
  'default': 'bg-gradient-to-br from-muted to-muted/80'       // Muted gradient for unknown types
} as const;

// Account type to gradient glow effect
const accountGlow = {
  'checking': 'shadow-md shadow-primary/20',
  'savings': 'shadow-md shadow-accent/20',
  'investment': 'shadow-md shadow-secondary/20',
  'default': 'shadow-md shadow-muted/20'
} as const;

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccount: Account;
  onSelectAccount: (account: Account) => void;
  className?: string;
}

export function AccountSelector({ 
  accounts, 
  selectedAccount, 
  onSelectAccount,
  className 
}: AccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost"
          className={cn("w-full justify-between items-center p-3 h-auto rounded-xl bg-card hover:bg-muted/50 transition-all duration-200 border/50 shadow-sm hover:shadow-md", className)}
        >
          <div className="flex items-center gap-3 w-full">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              accountTypeGradients[selectedAccount.type as keyof typeof accountTypeGradients] || accountTypeGradients.default
            } ${
              accountGlow[selectedAccount.type as keyof typeof accountGlow] || accountGlow.default
            }`}>
              {accountIcons[selectedAccount.icon as keyof typeof accountIcons] || accountIcons.default}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{selectedAccount.displayName}</p>
              <p className="text-xs text-foreground/70 truncate">
                {formatCurrency(selectedAccount.balance, selectedAccount.currency)}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2 bg-card/95 backdrop-blur-sm/50 shadow-xl" align="start" sideOffset={8}>
        <div className="space-y-1">
          {accounts.map((account) => {
            const isSelected = selectedAccount.id === account.id;
            return (
              <Button
                key={account.id}
                variant="ghost"
                className={`w-full justify-start h-auto p-2 rounded-lg transition-colors ${
                  isSelected ? 'bg-muted/50' : 'hover:bg-muted/30'
                }`}
                onClick={() => {
                  onSelectAccount(account);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                    accountTypeGradients[account.type as keyof typeof accountTypeGradients] || accountTypeGradients.default
                  } ${
                    accountGlow[account.type as keyof typeof accountGlow] || accountGlow.default
                  }`}>
                    {accountIcons[account.icon as keyof typeof accountIcons] || accountIcons.default}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-foreground truncate">{account.displayName}</p>
                    <p className="text-xs text-foreground/70 truncate">
                      {formatCurrency(account.balance, account.currency)}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
