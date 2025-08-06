import { useState, useEffect } from "react";
import { Account } from "./types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Wallet, PiggyBank, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

// Account icon mapping
const accountIcons = {
  'wallet': <Wallet className="h-4 w-4" />,
  'piggy-bank': <PiggyBank className="h-4 w-4" />,
  'briefcase': <Briefcase className="h-4 w-4" />,
  'default': <Wallet className="h-4 w-4" />
} as const;

// Account color mapping
const accountColors = {
  'blue': 'bg-blue-500',
  'green': 'bg-green-500',
  'purple': 'bg-purple-500',
  'default': 'bg-gray-500'
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
          variant="outline" 
          className={cn("w-[250px] justify-between items-center", className)}
        >
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${
              accountColors[selectedAccount.color as keyof typeof accountColors] || accountColors.default
            }`} />
            <span className="truncate">{selectedAccount.displayName}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <div className="space-y-1 p-1">
          {accounts.map((account) => (
            <Button
              key={account.id}
              variant="ghost"
              className={cn(
                "w-full justify-start items-center",
                selectedAccount.id === account.id && "bg-accent"
              )}
              onClick={() => {
                onSelectAccount(account);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${
                  accountColors[account.color as keyof typeof accountColors] || accountColors.default
                }`} />
                <div className="text-left">
                  <div className="font-medium">{account.displayName}</div>
                  <div className="text-xs text-muted-foreground">
                    {account.currency} {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
