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
  CreditCard as CardIcon,
  Sparkles,
  Pencil,
  AlertTriangle,
  AlertCircle
} from "lucide-react";
import { Transaction } from "./types";
import { motion } from "framer-motion";
import { MerchantAvatar } from "./MerchantAvatar";

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
  food: "bg-background text-foreground",
  transport: "bg-card text-foreground",
  shopping: "bg-popover text-foreground",
  housing: "bg-background text-foreground",
  technology: "bg-card text-foreground",
  other: "bg-background text-foreground",
  unmapped: "bg-amber-500/10 text-amber-500 border-amber-500/30",
};

export const TransactionDetailsModal = ({ 
  transaction, 
  open, 
  onOpenChange 
}: TransactionDetailsModalProps) => {
  if (!transaction) return null;

  const isIncoming = transaction.type === 'incoming';
  const isUnmapped = transaction.category === 'unmapped';
  const CategoryIcon = categoryIcons[transaction.category] || categoryIcons.other;
  const formattedMerchantName = transaction.merchantName || 'Unknown Merchant';

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
      <DialogContent className={`bg-card/80 backdrop-blur-lg border ${isUnmapped ? 'border-amber-500/50' : 'border-border'} text-foreground max-w-md mx-auto`}>
        <DialogHeader>
          {isUnmapped && (
            <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">This transaction needs your attention</span>
            </div>
          )}
          <div className="flex items-center gap-4">
            {/* Merchant Avatar */}
            <div className="relative">
              <MerchantAvatar 
                merchantImage={transaction.merchantImage}
                category={transaction.category}
                CategoryIcon={CategoryIcon}
                categoryColors={categoryColors}
                isIncoming={isIncoming}
                size={48}
                className={isUnmapped ? 'bg-amber-500/20' : ''}
              />
              <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center ${
                isIncoming ? 'bg-success' : isUnmapped ? 'bg-amber-500' : 'bg-primary'
              }`}>
                {isIncoming ? (
                  <ArrowDownLeft size={12} className="text-white" />
                ) : (
                  <ArrowUpRight size={12} className="text-white" />
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

          {isUnmapped && (
            <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Help us understand this transaction
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                We couldn't automatically identify this transaction. Please provide more details to help us categorize it correctly.
              </p>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                <Pencil className="mr-2 h-4 w-4" />
                Add Details
              </Button>
            </div>
          )}
          
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
                    <CardIcon size={16} className="text-foreground/60" />
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
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="capitalize">
                    {transaction.category}
                  </Badge>
                  <Badge 
                    variant={transaction.categorySource === 'manual' ? 'default' : 'outline'}
                    className="h-4 px-1.5 text-[10px] flex items-center gap-0.5"
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