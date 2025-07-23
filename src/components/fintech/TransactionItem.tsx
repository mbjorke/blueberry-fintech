import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Car, Home, Smartphone, CreditCard } from "lucide-react";

/**
 * TransactionItem Component
 * 
 * Displays individual transaction information with appropriate icons,
 * categories, and styling based on transaction type.
 * 
 * Props:
 * - transaction: Transaction object containing all transaction details
 * - onClick: Optional callback when transaction is clicked
 */

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency: string;
  description: string;
  category: 'food' | 'transport' | 'shopping' | 'housing' | 'technology' | 'other';
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  merchantName?: string;
  merchantImage?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

const categoryIcons = {
  food: Coffee,
  transport: Car,
  shopping: ShoppingBag,
  housing: Home,
  technology: Smartphone,
  other: CreditCard,
};

const categoryColors = {
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  transport: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  shopping: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  housing: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  technology: "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
  other: "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
};

export const TransactionItem = ({ transaction, onClick }: TransactionItemProps) => {
  const CategoryIcon = categoryIcons[transaction.category];
  const isIncoming = transaction.type === 'incoming';
  
  const formatAmount = (amount: number, currency: string) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    
    return `${isIncoming ? '+' : '-'}${currency}${formatted}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return date.toLocaleDateString('en-GB', { weekday: 'long' });
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer rounded-lg"
      onClick={onClick}
    >
      {/* Transaction Icon/Avatar */}
      <div className="relative">
        {transaction.merchantImage ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={transaction.merchantImage} />
            <AvatarFallback>
              <CategoryIcon size={20} />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${categoryColors[transaction.category]}`}>
            <CategoryIcon size={20} />
          </div>
        )}
        
        {/* Transaction Direction Indicator */}
        <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${
          isIncoming ? 'bg-success' : 'bg-primary'
        }`}>
          {isIncoming ? (
            <ArrowDownLeft size={12} className="text-white" />
          ) : (
            <ArrowUpRight size={12} className="text-white" />
          )}
        </div>
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground truncate">
              {transaction.merchantName || transaction.description}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
              <Badge 
                variant="secondary" 
                className="text-xs capitalize"
              >
                {transaction.category}
              </Badge>
              {transaction.status !== 'completed' && (
                <Badge 
                  variant={transaction.status === 'pending' ? 'outline' : 'destructive'}
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Amount */}
          <div className="text-right">
            <p className={`font-semibold ${
              isIncoming ? 'text-success' : 'text-foreground'
            }`}>
              {formatAmount(transaction.amount, transaction.currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};