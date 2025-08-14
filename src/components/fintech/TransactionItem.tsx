import { Badge } from "@/components/ui/badge";
import { Sparkles, Pencil } from "lucide-react";
import { Transaction } from "./types";
import { getCategoryColorClasses } from "./constants";
import { getCategoryIcon } from "@/utils/categoryIcons";
import { AvatarWithIcon } from "@/components/ui/avatar-with-icon";
import { cn } from "@/lib/utils";

/**
 * TransactionItem Component
 * 
 * Displays individual transaction information with appropriate icons,
 * categories, and styling based on transaction type.
 * Enhanced with smooth hover animations and click feedback.
 * Responsive design optimized for mobile and desktop.
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
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

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
    <div 
      role="button"
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      aria-label={`${transaction.merchantDetails || transaction.merchantName || 'Transaction'} for ${formatAmount(transaction.amount, transaction.currency)} on ${transaction.date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
      className={cn(
        "flex w-full items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-200 cursor-pointer text-left",
        "transform hover:scale-[1.01] active:scale-100 odd:bg-accent/10 even:bg-accent/20",
        "focus:ring-2 focus:ring-offset-1 focus:ring-offset-accent focus:ring-accent outline-none",
        {
          "cursor-pointer": onClick,
          "cursor-default": !onClick
        }
      )}
    >
      {/* Avatar - Responsive sizing and layout */}
      <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3" aria-hidden="true">
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
        
        {/* Category Icon - Hidden on very small screens */}
        <div className="hidden sm:block w-12 h-12 flex-shrink-0">
          <AvatarWithIcon
            icon={getCategoryIcon(undefined, isUnmapped ? 'unmapped' : transaction.category)}
            name={transaction.category}
            colorClass={getCategoryColorClasses(transaction.category, isUnmapped).bg}
            iconColorClass={getCategoryColorClasses(transaction.category, isUnmapped).icon}
            size={48}
          />
        </div>
      </div>

      {/* Transaction Details - Responsive layout */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate transition-opacity duration-200 m-0 text-sm sm:text-base" id={`transaction-${transaction.id}-merchant`}>
              {transaction.merchantDetails || transaction.merchantName || transaction.description}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 transition-all duration-200">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <time 
                  dateTime={transaction.date.toISOString()}
                  className="text-xs sm:text-sm text-thin text-foreground/70"
                  aria-label={`Date: ${transaction.date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
                >
                  {formatDate(transaction.date)}
                </time>
                {transaction.cardLast4 && (
                  <span className="text-xs sm:text-sm text-thin text-foreground/70">
                    •••• {transaction.cardLast4}
                  </span>
                )}
              </div>
              {transaction.expenseStatus !== 'none' && (
                <Badge 
                  variant={
                    transaction.expenseStatus === 'approved' ? 'default' :
                    transaction.expenseStatus === 'submitted' ? 'outline' :
                    transaction.expenseStatus === 'info_required' ? 'warning' :
                    'secondary'
                  }
                  className="text-xs sm:text-sm w-fit"
                >
                  {transaction.expenseStatus.replace('_', ' ')}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Amount - Responsive positioning and sizing */}
          <div className="text-left sm:text-right sm:min-w-[80px]">
            <p 
              className={`font-semibold text-sm sm:text-base ${
                isIncoming ? 'text-success' : 'text-foreground'
              } transition-colors duration-200`}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">
                {isIncoming ? 'Credit: ' : 'Debit: '}
              </span>
              {formatAmount(transaction.amount, transaction.currency)}
            </p>
            {transaction.status !== 'completed' && (
              <Badge 
                variant={transaction.status === 'pending' ? 'outline' : 'destructive'}
                className="text-xs sm:text-sm mt-1 w-fit"
              >
                {transaction.status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};