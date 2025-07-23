import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, Send, ArrowDownLeft } from "lucide-react";
import { useState } from "react";

/**
 * AccountCard Component
 * 
 * Displays the user's main account balance with quick action buttons.
 * Features balance visibility toggle and primary financial actions.
 * 
 * Props:
 * - balance: Account balance (number)
 * - currency: Currency symbol (string, default: "£")
 * - accountName: Display name for the account (string, default: "Main Account")
 * - onAddMoney: Callback for add money action
 * - onSendMoney: Callback for send money action
 * - onRequestMoney: Callback for request money action
 */

interface AccountCardProps {
  balance: number;
  currency?: string;
  accountName?: string;
  onAddMoney?: () => void;
  onSendMoney?: () => void;
  onRequestMoney?: () => void;
}

export const AccountCard = ({ 
  balance, 
  currency = "£", 
  accountName = "Main Account",
  onAddMoney,
  onSendMoney,
  onRequestMoney
}: AccountCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-primary text-white p-6 shadow-premium border-0">
      <div className="space-y-6">
        {/* Account Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">{accountName}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="text-3xl font-bold">
                {showBalance ? (
                  `${currency}${formatBalance(balance)}`
                ) : (
                  "••••••"
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/10 h-8 w-8"
              >
                {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onAddMoney}
            className="flex-1 bg-white/20 text-white border-0 hover:bg-white/30"
          >
            <Plus size={16} />
            Add
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onSendMoney}
            className="flex-1 bg-white/20 text-white border-0 hover:bg-white/30"
          >
            <Send size={16} />
            Send
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onRequestMoney}
            className="flex-1 bg-white/20 text-white border-0 hover:bg-white/30"
          >
            <ArrowDownLeft size={16} />
            Request
          </Button>
        </div>
      </div>
    </Card>
  );
};