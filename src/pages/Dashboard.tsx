import { useState, useMemo } from "react";
import { Transaction, Account } from "@/components/fintech/types";
import { TransactionDetailsModal } from "@/components/fintech/TransactionDetailsModal";
import { SpendingInsights } from "@/components/fintech/SpendingInsights";
import { DashboardHeader } from "@/components/fintech/DashboardHeader";
import { AccountCard } from "@/components/fintech/AccountCard";
import { AccountSelector } from "@/components/fintech/AccountSelector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, CreditCard, Coffee, Car, ShoppingBag, Home, Smartphone, ArrowDownLeft, ArrowUpRight, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MerchantAvatar } from "@/components/fintech/MerchantAvatar";
import { cn } from "@/lib/utils";
import { Wallet, PiggyBank, Briefcase } from "lucide-react";

// Account color mapping for the selector
const accountColors = {
  'blue': 'bg-blue-500',
  'green': 'bg-green-500',
  'purple': 'bg-purple-500',
  'default': 'bg-gray-500'
} as const;


// Mock accounts data
const mockAccounts: Account[] = [
  {
    id: 'acc_1',
    name: 'Personal Current',
    displayName: 'Current Account',
    balance: 12500.75,
    availableBalance: 11500.75,
    currency: '€',
    type: 'checking',
    isVisible: true,
    lastFour: '2847',
    icon: 'wallet',
    color: 'blue',
    isDefault: true,
    status: 'active',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-07-30')
  },
  {
    id: 'acc_2',
    name: 'Savings',
    displayName: 'Rainy Day Fund',
    balance: 32500.00,
    availableBalance: 32500.00,
    currency: '€',
    type: 'savings',
    isVisible: true,
    lastFour: '5392',
    icon: 'piggy-bank',
    color: 'green',
    status: 'active',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-07-15')
  },
  {
    id: 'acc_3',
    name: 'Business Account',
    displayName: 'Freelance Work',
    balance: 8750.40,
    availableBalance: 8750.40,
    currency: '€',
    type: 'business',
    isVisible: true,
    lastFour: '7163',
    icon: 'briefcase',
    color: 'purple',
    status: 'active',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-08-01')
  }
];

// Mock transactions data with account associations
const mockTransactions: Transaction[] = [
  {
    id: '1',
    accountId: 'acc_1',  // Current Account
    type: 'outgoing',
    amount: 5.20,
    currency: '€',
    description: 'Morning cappuccino and croissant',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'completed',
    categorySource: 'automatic', // Add categorySource to all mock transactions
    merchantName: 'Café de Flore',
    merchantDetails: 'Café de Flore* Paris FR',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-CF-240731-001',
    cardLast4: '2847',
    location: 'Paris, France',
  },
  {
    id: '2',
    accountId: 'acc_1',  // Current Account
    type: 'incoming',
    amount: 2850.00,
    currency: '€',
    description: 'Monthly salary payment',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
    status: 'completed',
    categorySource: 'automatic', // Add categorySource to all mock transactions
    merchantName: 'TechNova Solutions',
    merchantDetails: 'TechNova Solutions SEPA',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-SAL-240730-001',
  },
  {
    id: '3',
    accountId: 'acc_1',  // Current Account
    type: 'outgoing',
    amount: 67.45,
    currency: '€',
    description: 'Weekly grocery shopping',
    category: 'shopping',
    date: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Carrefour Market',
    merchantDetails: 'Carrefour Market* 3847',
    expenseStatus: 'info_required',
    spendProgram: 'Business Expenses',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'required',
    transactionId: 'TXN-CAR-240730-002',
    cardLast4: '2847',
    location: 'Lyon, France',
  },
  {
    id: '4',
    accountId: 'acc_1',  // Current Account
    type: 'outgoing',
    amount: 89.99,
    currency: '€',
    description: 'New wireless headphones',
    category: 'technology',
    date: new Date(Date.now() - 1000 * 60 * 60 * 32), // 32 hours ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Amazon',
    merchantDetails: 'Amazon.fr* Digital Services',
    expenseStatus: 'submitted',
    spendProgram: 'Office Equipment',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'uploaded',
    accountingCategory: 'Technology & Equipment',
    taxRate: '20%',
    transactionId: 'TXN-AMZ-240729-001',
    cardLast4: '2847',
    location: 'Online Purchase',
  },
  {
    id: '5',
    accountId: 'acc_2',  // Savings Account
    type: 'incoming',
    amount: 45.00,
    currency: '€',
    description: 'Freelance project payment',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'StartupXYZ',
    merchantDetails: 'StartupXYZ SAS Bank Transfer',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-SUP-240728-001',
  },
  {
    id: '6',
    accountId: 'acc_1',  // Current Account
    type: 'outgoing',
    amount: 28.50,
    currency: '€',
    description: 'Lunch with colleagues',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 60 * 50), // 2 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Le Comptoir',
    merchantDetails: 'Le Comptoir du 7ème* Paris',
    expenseStatus: 'submitted',
    spendProgram: 'Meals & Entertainment',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'uploaded',
    accountingCategory: 'Business Meals',
    taxRate: '10%',
    transactionId: 'TXN-LCP-240729-002',
    cardLast4: '2847',
    location: 'Paris, France',
  },
  {
    id: '7',
    accountId: 'acc_3',  // Business Account
    type: 'outgoing',
    amount: 15.80,
    currency: '€',
    description: 'Metro weekly pass',
    category: 'transport',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'StartupXYZ',
    merchantDetails: 'StartupXYZ SAS Bank Transfer',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-SUP-240728-001',
  },
  {
    id: '8',
    accountId: 'acc_1',  // Current Account
    type: 'outgoing',
    amount: 125.00,
    currency: '€',
    description: 'Monthly gym membership',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'FitLife Gym',
    merchantDetails: 'FitLife Gym* Monthly DD',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-FIT-240727-001',
    cardLast4: '2847',
    location: 'Lyon, France',
  },
  {
    id: '9',
    accountId: 'acc_3',  // Business Account
    type: 'outgoing',
    amount: 24.99,
    currency: '€',
    description: 'Monthly gym membership',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'FitLife Gym',
    merchantDetails: 'FitLife Gym* Monthly DD',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-GYM-240728-001',
    cardLast4: '2847',
  },
  {
    id: '10',
    accountId: 'acc_1',  // Current Account
    type: 'outgoing',
    amount: 149.99,
    currency: '€',
    description: 'POS 7392 12:45 27/07',
    category: 'unmapped',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: '',
    merchantDetails: 'POS 7392 12:45 27/07',
    expenseStatus: 'info_required',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'required',
    transactionId: 'TXN-UNM-240731-001',
    cardLast4: '2847',
  },
];

// Dynamically compute categories and spent from transactions
const CATEGORY_BUDGETS: Record<string, number> = {
  food: 500,
  shopping: 400,
  transport: 200,
  technology: 200,
  housing: 300,
  other: 200,
};
const CATEGORY_COLORS: Record<string, string> = {
  food: '#ff6b6b',
  shopping: '#4ecdc4',
  transport: '#45b7d1',
  technology: '#a29bfe',
  housing: '#00b894',
  other: '#636e72',
};
const CATEGORY_LABELS: Record<string, string> = {
  food: 'Food & Dining',
  shopping: 'Shopping & Technology',
  transport: 'Transport',
  technology: 'Technology',
  housing: 'Housing',
  other: 'Other',
};

const outgoingTransactions = mockTransactions.filter(t => t.type === 'outgoing');
const spent = outgoingTransactions.reduce((sum, t) => sum + t.amount, 0);

const categories = Object.keys(CATEGORY_BUDGETS).map(cat => {
  const catAmount = mockTransactions
    .filter(tx => tx.category === cat && tx.type === 'outgoing')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return {
    name: cat,
    amount: catAmount,
    budget: CATEGORY_BUDGETS[cat],
    color: CATEGORY_COLORS[cat],
  };
});

const Dashboard: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account>(() => {
    // Set the default account (first visible one or explicitly marked as default)
    return mockAccounts.find(acc => acc.isDefault) || mockAccounts[0];
  });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Memoize filtered transactions for the selected account
  const filteredTransactions = useMemo(() => {
    return mockTransactions
      .filter(tx => tx.accountId === selectedAccount.id)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [selectedAccount.id]);
  
  // Calculate total spent for the selected account
  const spent = useMemo(() => {
    return filteredTransactions
      .filter(tx => tx.type === 'outgoing')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [filteredTransactions]);
  
  // Calculate categories with spending for the selected account
  const categories = useMemo(() => {
    return Object.keys(CATEGORY_BUDGETS).map(cat => {
      const catAmount = filteredTransactions
        .filter(tx => tx.category === cat && tx.type === 'outgoing')
        .reduce((sum, tx) => sum + tx.amount, 0);

      return {
        name: cat,
        amount: catAmount,
        budget: CATEGORY_BUDGETS[cat],
        color: CATEGORY_COLORS[cat],
        label: CATEGORY_LABELS[cat] || cat
      };
    });
  }, [filteredTransactions]);
  
  // Handle account selection
  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account);
    // In a real app, you might want to save the selected account preference
    // localStorage.setItem('selectedAccountId', account.id);
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Feature`,
      description: `${action} functionality would be implemented here`,
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header with Account Selector */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AccountSelector 
          accounts={mockAccounts}
          selectedAccount={selectedAccount}
          onSelectAccount={handleAccountSelect}
        />
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <AccountCard 
            accountName={selectedAccount.displayName}
            balance={selectedAccount.balance}
            currency={selectedAccount.currency}
            onAddMoney={() => handleQuickAction('Add Money')}
            onSendMoney={() => handleQuickAction('Send Money')}
            onRequestMoney={() => handleQuickAction('Request Money')}
          />
        </div>
        
        <div className="md:col-span-1">
          <SpendingInsights 
            monthlyBudget={3000}
            spent={spent}
            currency="€"
            categories={categories}
            trend={{
              percentage: 12.5,
              direction: 'up'
            }}
            onViewDetails={() => handleQuickAction('View Spending Details')}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleQuickAction('Export')}>
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleQuickAction('Filter')}>
              Filter
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleTransactionClick(transaction)}
              >
                <div className="mr-3 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  {transaction.merchantName ? (
                    <span className="text-sm font-medium">
                      {transaction.merchantName.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">
                      {transaction.merchantName || transaction.description}
                    </p>
                    <span className={`font-medium ${transaction.type === 'incoming' ? 'text-green-500' : 'text-foreground'}`}>
                      {transaction.type === 'incoming' ? '+' : '-'}
                      {transaction.currency}{transaction.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' • '}
                      {transaction.category}
                    </span>
                    <span>
                      {transaction.type === 'incoming' ? (
                        <ArrowDownLeft className="inline w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="inline w-4 h-4 text-foreground" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No transactions found for this account.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default Dashboard;