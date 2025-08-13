import { Badge } from "@/components/ui/badge";
import { Sparkles, Pencil } from "lucide-react";
import { Transaction } from "./types";
import { getCategoryColorClasses } from "./constants";
import { getCategoryIcon } from "@/utils/categoryIcons";
import { AvatarWithIcon } from "@/components/ui/avatar-with-icon";

/**
 * TransactionItem Component
 * 
 * Displays individual transaction information with appropriate icons,
 * categories, and styling based on transaction type.
 * Enhanced with smooth hover animations and click feedback.
 * 
 * Props:
 * - transaction: Transaction object containing all transaction details
 * - isUnmapped: Optional boolean indicating if transaction is unmapped
 * - isOdd: Optional boolean indicating if transaction is odd
 * - onClick: Optional callback when transaction is clicked
 */

interface TransactionItemProps {
  transaction: Transaction;
  isUnmapped?: boolean;
  onClick?: () => void;
}

export function TransactionItem({ transaction, isUnmapped = false, onClick }: TransactionItemProps) {
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
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      className="flex w-full outline-none hover:ring-1 hover:ring-accent focus:ring-1 focus:ring-accent items-start gap-4 p-4 rounded-lg transition-all duration-200 cursor-pointer text-left
        transform hover:scale-[1.01] active:scale-100 odd:bg-accent/10 even:bg-accent/20"
      onClick={handleClick}
    >
      {/* Avatar - Side by side icons */}
      <div className="flex-shrink-0 flex items-center gap-3">
        {/* Merchant Image */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <AvatarWithIcon
            imageUrl={transaction.merchantImage}
            name={transaction.merchantName}
            icon={getCategoryIcon(transaction.merchantName, isUnmapped ? 'unmapped' : transaction.category)}
            colorClass={getCategoryColorClasses(transaction.category, isUnmapped).bg}
            iconColorClass={getCategoryColorClasses(transaction.category, isUnmapped).icon}
            size={48}
          />
        </div>
        
        {/* Category Icon */}
        <div className="w-12 h-12 flex-shrink-0">
          <AvatarWithIcon
            icon={getCategoryIcon(undefined, isUnmapped ? 'unmapped' : transaction.category)}
            name={transaction.category}
            colorClass={getCategoryColorClasses(transaction.category, isUnmapped).bg}
            iconColorClass={getCategoryColorClasses(transaction.category, isUnmapped).icon}
            size={48}
          />
        </div>
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground truncate transition-opacity duration-200">
              {transaction.merchantDetails || transaction.merchantName || transaction.description}
            </p>
            <div className="flex items-center gap-2 mt-1 transition-all duration-200">
              <div className="flex items-center gap-2">
                <p className="text-base text-thin text-foreground/70">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Badge 
                  variant={transaction.categorySource === 'manual' ? 'default' : 'outline'}
                  className="h-4 px-1.5 text-base flex items-center gap-0.5"
                  title={transaction.categorySource === 'manual' ? 'Manually categorized' : 'Automatically categorized'}
                >
                  {transaction.categorySource === 'manual' ? (
                    <>
                      <Pencil size={10} /> Manual
                    </>
                  ) : (
                    <>
                      <Sparkles size={10} /> Auto
                    </>
                  )}
                </Badge>
              </div>
              {transaction.expenseStatus !== 'none' && (
                <Badge 
                  variant={
                    transaction.expenseStatus === 'approved' ? 'default' :
                    transaction.expenseStatus === 'submitted' ? 'outline' :
                    transaction.expenseStatus === 'info_required' ? 'warning' :
                    'secondary'
                  }
                  className="text-base"
                >
                  {transaction.expenseStatus.replace('_', ' ')}
                </Badge>
              )}
              {transaction.cardLast4 && (
                <span className="text-base text-thin text-foreground/70">
                  •••• {transaction.cardLast4}
                </span>
              )}
            </div>
          </div>
          
          {/* Amount */}
          <div className="text-right">
            <p className={`font-semibold ${
              isIncoming ? 'text-success' : 'text-foreground'
            } transition-colors duration-200`}>
              {formatAmount(transaction.amount, transaction.currency)}
            </p>
            {transaction.status !== 'completed' && (
              <Badge 
                variant={transaction.status === 'pending' ? 'outline' : 'destructive'}
                className="text-base mt-1"
              >
                {transaction.status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};