import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Send,
  CreditCard,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

interface DashboardHeaderProps {
  balance: number;
  currency: string;
  accountName?: string;
  onAddMoney?: () => void;
  onSendMoney?: () => void;
  onManageCards?: () => void;
  onTransfer?: () => void;
  onTopUp?: () => void;
  onPayBills?: () => void;
  onSavings?: () => void;
  onInvesting?: () => void;
}

export const DashboardHeader = ({
  balance,
  currency = "€",
  accountName = "Personal Account",
  onAddMoney,
  onSendMoney,
  onManageCards,
  onTransfer,
  onTopUp,
  onPayBills,
  onSavings,
  onInvesting,
}: DashboardHeaderProps) => {
  const formatBalance = (amount: number) => {
    return amount.toFixed(2);
  };

  const primaryActions = [
    {
      id: "add",
      label: "Add",
      icon: Plus,
      onClick: onAddMoney,
      variant: "default" as const,
    },
    {
      id: "send",
      label: "Send",
      icon: Send,
      onClick: onSendMoney,
      variant: "outline" as const,
    },
    {
      id: "cards",
      label: "Cards",
      icon: CreditCard,
      onClick: onManageCards,
      variant: "outline" as const,
    },
  ];

  const secondaryActions = [
    { label: "Transfer", onClick: onTransfer, icon: ArrowUpRight },
    { label: "Top Up", onClick: onTopUp, icon: Plus },
    { label: "Pay Bills", onClick: onPayBills, icon: Wallet },
    { label: "Savings", onClick: onSavings, icon: ArrowDownRight },
    { label: "Investing", onClick: onInvesting, icon: ArrowUpRight },
  ];

  return (
    <Card className="bg-card shadow-lg border border-border">
      <div className="p-6 space-y-4">
        {/* Account Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-foreground text-sm">{accountName}</p>
            <Badge variant="secondary" className="bg-card/10 text-foreground border-0 text-xs">
              Main Account
            </Badge>
          </div>
        </div>

        {/* Balance and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold tracking-tight">
              {currency}{formatBalance(balance)}
            </div>
            <p className="text-foreground/70 text-sm">Available balance</p>
          </div>
          
          <div className="flex items-center gap-3">
            {primaryActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={action.variant}
                    onClick={action.onClick}
                    className={
                      action.variant === "default"
                        ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                        : "border-white/30 text-foreground hover:bg-card/20 hover:border-white/50"
                    }
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}

            {/* More Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="border-white/30 text-foreground hover:bg-card/20 hover:border-white/50"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {secondaryActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <DropdownMenuItem
                      key={action.label}
                      onClick={action.onClick}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4" />
                      {action.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );
};