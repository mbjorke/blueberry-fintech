import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Send,
  CreditCard,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Bell,
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
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

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Unusual Spending Alert',
      message: 'Your spending on Shopping is 30% higher than usual',
      time: '10 min ago',
      read: false,
      icon: AlertCircle
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Received',
      message: 'Salary payment of €3,200.00 has been credited',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle2
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Payment',
      message: 'Your rent payment of €1,200.00 is due tomorrow',
      time: '5 hours ago',
      read: true,
      icon: Clock
    },
    {
      id: 4,
      type: 'info',
      title: 'New Feature',
      message: 'Try our new budget tracking feature',
      time: '1 day ago',
      read: true,
      icon: Info
    }
  ];
  
  const unreadAlerts = mockAlerts.filter(alert => !alert.read).length;

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
            {/* Alerts Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground hover:bg-card/20"
                >
                  <Bell className="h-5 w-5" />
                  {unreadAlerts > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full"
                    >
                      {unreadAlerts}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-[400px] overflow-y-auto">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="outline" className="text-xs">
                    {unreadAlerts} unread
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockAlerts.length > 0 ? (
                  mockAlerts.map((alert) => {
                    const Icon = alert.icon;
                    return (
                      <DropdownMenuItem 
                        key={alert.id} 
                        className={`flex items-start gap-3 p-3 ${!alert.read ? 'bg-accent/10' : ''}`}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <div className={`rounded-full p-2 ${
                          alert.type === 'warning' ? 'bg-warning/20 text-warning' :
                          alert.type === 'success' ? 'bg-success/20 text-success' :
                          'bg-primary/10 text-primary'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                        {!alert.read && (
                          <div className="h-2 w-2 rounded-full bg-primary ml-2" />
                        )}
                      </DropdownMenuItem>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No new notifications
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

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