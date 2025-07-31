import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShoppingBag, 
  Coffee, 
  Car, 
  Home, 
  Smartphone, 
  CreditCard,
  Receipt,
  Upload,
  FileText,
  User,
  Calendar,
  MapPin,
  CreditCard as CardIcon
} from "lucide-react";
import { Transaction } from "./TransactionItem";
import { motion } from "framer-motion";

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export const TransactionDetailsModal = ({ 
  transaction, 
  open, 
  onOpenChange 
}: TransactionDetailsModalProps) => {
  if (!transaction) return null;

  const CategoryIcon = categoryIcons[transaction.category];
  const isIncoming = transaction.type === 'incoming';

  const formatAmount = (amount: number, currency: string) => {
    const formatted = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
    
    return `${isIncoming ? '+' : '-'}${currency}${formatted}`;
  };

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date: formattedDate, time: formattedTime } = formatDateTime(transaction.date);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            {/* Transaction Icon */}
            <div className="relative">
              {transaction.merchantImage ? (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={transaction.merchantImage} />
                  <AvatarFallback>
                    <CategoryIcon size={24} />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${categoryColors[transaction.category]}`}>
                  <CategoryIcon size={24} />
                </div>
              )}
              
              {/* Direction Indicator */}
              <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center ${
                isIncoming ? 'bg-success' : 'bg-primary'
              }`}>
                {isIncoming ? (
                  <ArrowDownLeft size={14} className="text-white" />
                ) : (
                  <ArrowUpRight size={14} className="text-white" />
                )}
              </div>
            </div>

            {/* Amount and Title */}
            <div className="flex-1">
              <DialogTitle className={`text-2xl font-bold ${
                isIncoming ? 'text-success' : 'text-foreground'
              }`}>
                {formatAmount(transaction.amount, transaction.currency)}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {transaction.merchantDetails || transaction.merchantName || transaction.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formattedDate}, {formattedTime}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Status Section */}
          {transaction.expenseStatus !== 'none' && (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Expense status</span>
                <Badge 
                  variant={
                    transaction.expenseStatus === 'approved' ? 'default' :
                    transaction.expenseStatus === 'submitted' ? 'outline' :
                    transaction.expenseStatus === 'info_required' ? 'destructive' :
                    'secondary'
                  }
                  className="capitalize"
                >
                  {transaction.expenseStatus.replace('_', ' ')}
                </Badge>
              </div>
              
              {transaction.spendProgram && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Spend program</span>
                  <span className="text-sm font-medium">{transaction.spendProgram}</span>
                </div>
              )}
            </motion.div>
          )}

          <Separator />

          {/* Cardholder Information */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <User size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Cardholder</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">{transaction.cardholder}</p>
          </motion.div>

          <Separator />

          {/* Transaction Details */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-medium">Transaction details</h3>
            
            <div className="space-y-3 text-sm">
              {transaction.cardLast4 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardIcon size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Card</span>
                  </div>
                  <span>•••• {transaction.cardLast4}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Transaction ID</span>
                </div>
                <span className="font-mono text-xs">{transaction.transactionId}</span>
              </div>

              {transaction.location && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Location</span>
                  </div>
                  <span>{transaction.location}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Category</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {transaction.category}
                </Badge>
              </div>
            </div>
          </motion.div>

          <Separator />

          {/* Expense Details */}
          {transaction.expenseStatus !== 'none' && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-medium">Expense details</h3>
              
              {/* Receipt Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Receipts</span>
                  </div>
                  <Badge 
                    variant={transaction.receiptStatus === 'uploaded' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {transaction.receiptStatus === 'uploaded' ? 'Uploaded' : 
                     transaction.receiptStatus === 'required' ? 'Required' : 'None'}
                  </Badge>
                </div>
                
                {transaction.receiptStatus === 'required' && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload size={16} className="mr-2" />
                    Upload Receipt
                  </Button>
                )}
              </div>

              {/* Additional Fields */}
              <div className="space-y-3 text-sm">
                {transaction.accountingCategory && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Accounting category</span>
                    <span>{transaction.accountingCategory}</span>
                  </div>
                )}
                
                {transaction.taxRate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax rate</span>
                    <span>{transaction.taxRate}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};