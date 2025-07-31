import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Car, Home, Smartphone, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

/**
 * TransactionItem Component
 * 
 * Displays individual transaction information with appropriate icons,
 * categories, and styling based on transaction type.
 * Enhanced with smooth hover animations and click feedback.
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
  // Enhanced Revolut-style fields
  merchantDetails?: string;
  expenseStatus: 'submitted' | 'info_required' | 'approved' | 'rejected' | 'none';
  spendProgram?: string;
  cardholder: string;
  receiptStatus: 'uploaded' | 'required' | 'none';
  accountingCategory?: string;
  taxRate?: string;
  transactionId: string;
  cardLast4?: string;
  location?: string;
  exchangeRate?: number;
  originalAmount?: number;
  originalCurrency?: string;
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
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  };

  return (
    <motion.div 
      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer rounded-lg"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Transaction Icon/Avatar */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>
        
        {/* Transaction Direction Indicator */}
        <motion.div 
          className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${
            isIncoming ? 'bg-success' : 'bg-primary'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
        >
          {isIncoming ? (
            <ArrowDownLeft size={12} className="text-white" />
          ) : (
            <ArrowUpRight size={12} className="text-white" />
          )}
        </motion.div>
      </div>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <motion.p 
              className="font-medium text-foreground truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {transaction.merchantDetails || transaction.merchantName || transaction.description}
            </motion.p>
            <motion.div 
              className="flex items-center gap-2 mt-1"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
              <Badge 
                variant="secondary" 
                className="text-xs capitalize"
              >
                {transaction.category}
              </Badge>
              {transaction.expenseStatus !== 'none' && (
                <Badge 
                  variant={
                    transaction.expenseStatus === 'approved' ? 'default' :
                    transaction.expenseStatus === 'submitted' ? 'outline' :
                    transaction.expenseStatus === 'info_required' ? 'destructive' :
                    'secondary'
                  }
                  className="text-xs"
                >
                  {transaction.expenseStatus.replace('_', ' ')}
                </Badge>
              )}
              {transaction.cardLast4 && (
                <span className="text-xs text-muted-foreground">
                  •••• {transaction.cardLast4}
                </span>
              )}
            </motion.div>
          </div>
          
          {/* Amount */}
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className={`font-semibold ${
              isIncoming ? 'text-success' : 'text-foreground'
            }`}>
              {formatAmount(transaction.amount, transaction.currency)}
            </p>
            {transaction.status !== 'completed' && (
              <Badge 
                variant={transaction.status === 'pending' ? 'outline' : 'destructive'}
                className="text-xs mt-1"
              >
                {transaction.status}
              </Badge>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};