import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Plus, Smartphone, CreditCard, PiggyBank, TrendingUp, Users, Receipt } from "lucide-react";

/**
 * QuickActions Component
 * 
 * Displays a grid of quick action buttons for common fintech operations.
 * Organized in a responsive grid with icons and labels.
 * 
 * Props:
 * - onTransfer: Callback for transfer money action
 * - onTopUp: Callback for top up action
 * - onPayBills: Callback for pay bills action
 * - onCards: Callback for manage cards action
 * - onSavings: Callback for savings action
 * - onInvesting: Callback for investing action
 * - onSplitBill: Callback for split bill action
 * - onReceipts: Callback for receipts action
 */

interface QuickActionsProps {
  onTransfer?: () => void;
  onTopUp?: () => void;
  onPayBills?: () => void;
  onCards?: () => void;
  onSavings?: () => void;
  onInvesting?: () => void;
  onSplitBill?: () => void;
  onReceipts?: () => void;
}

const actions = [
  {
    id: 'transfer',
    label: 'Transfer',
    icon: Send,
    description: 'Send money',
    color: 'text-primary',
  },
  {
    id: 'topup',
    label: 'Top Up',
    icon: Plus,
    description: 'Add money',
    color: 'text-success',
  },
  {
    id: 'paybills',
    label: 'Pay Bills',
    icon: Smartphone,
    description: 'Utilities & more',
    color: 'text-warning',
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: CreditCard,
    description: 'Manage cards',
    color: 'text-accent',
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: PiggyBank,
    description: 'Save money',
    color: 'text-success',
  },
  {
    id: 'investing',
    label: 'Investing',
    icon: TrendingUp,
    description: 'Grow wealth',
    color: 'text-primary',
  },
  {
    id: 'splitbill',
    label: 'Split Bill',
    icon: Users,
    description: 'Share expenses',
    color: 'text-accent',
  },
  {
    id: 'receipts',
    label: 'Receipts',
    icon: Receipt,
    description: 'Track spending',
    color: 'text-muted-foreground',
  },
];

export const QuickActions = ({
  onTransfer,
  onTopUp,
  onPayBills,
  onCards,
  onSavings,
  onInvesting,
  onSplitBill,
  onReceipts,
}: QuickActionsProps) => {
  const actionCallbacks = {
    transfer: onTransfer,
    topup: onTopUp,
    paybills: onPayBills,
    cards: onCards,
    savings: onSavings,
    investing: onInvesting,
    splitbill: onSplitBill,
    receipts: onReceipts,
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Everything you need at your fingertips</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          const handleClick = actionCallbacks[action.id as keyof typeof actionCallbacks];
          
          return (
            <Button
              key={action.id}
              variant="ghost"
              onClick={handleClick}
              className="h-auto p-4 flex flex-col gap-2 text-left hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className={`${action.color} group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent size={24} />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};