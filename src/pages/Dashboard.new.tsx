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
import { Plus, Send, CreditCard, AlertTriangle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MerchantAvatar } from "@/components/fintech/MerchantAvatar";
import { cn } from "@/lib/utils";

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
    accountId: 'acc_1',
    type: 'outgoing',
    amount: 5.20,
    currency: '€',
    description: 'Morning cappuccino and croissant',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Café de Flore',
    merchantImage: null
  },
  {
    id: '2',
    accountId: 'acc_1',
    type: 'outgoing',
    amount: 125.00,
    currency: '€',
    description: 'Grocery shopping',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Fresh Market',
    merchantImage: null
  },
  {
    id: '3',
    accountId: 'acc_2',
    type: 'outgoing',
    amount: 45.50,
    currency: '€',
    description: 'Monthly subscription',
    category: 'technology',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed',
    categorySource: 'manual',
    merchantName: 'Tech Services Inc.',
    merchantImage: null
  },
  {
    id: '4',
    accountId: 'acc_3',
    type: 'incoming',
    amount: 1200.00,
    currency: '€',
    description: 'Freelance payment',
    category: 'income',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: 'completed',
    categorySource: 'manual',
    merchantName: 'Client XYZ',
    merchantImage: null
  },
  {
    id: '5',
    accountId: 'acc_1',
    type: 'outgoing',
    amount: 85.30,
    currency: '€',
    description: 'Dinner with friends',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    status: 'completed',
    categorySource: 'manual',
    merchantName: 'Bistro Central',
    merchantImage: null
  },
  {
    id: '6',
    accountId: 'acc_1',
    type: 'outgoing',
    amount: 32.45,
    currency: '€',
    description: 'Book purchase',
    category: 'shopping',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Book Haven',
    merchantImage: null
  },
  {
    id: '7',
    accountId: 'acc_2',
    type: 'outgoing',
    amount: 15.99,
    currency: '€',
    description: 'Music subscription',
    category: 'entertainment',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'MusicStream',
    merchantImage: null
  },
  {
    id: '8',
    accountId: 'acc_3',
    type: 'outgoing',
    amount: 125.00,
    currency: '€',
    description: 'Office supplies',
    category: 'business',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    status: 'completed',
    categorySource: 'manual',
    merchantName: 'OfficePlus',
    merchantImage: null
  },
  {
    id: '9',
    accountId: 'acc_1',
    type: 'outgoing',
    amount: 49.99,
    currency: '€',
    description: 'Unknown transaction',
    category: 'unmapped',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Unknown Merchant',
    merchantImage: null
  },
  {
    id: '10',
    accountId: 'acc_2',
    type: 'outgoing',
    amount: 75.30,
    currency: '€',
    description: 'Electric bill',
    category: 'utilities',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 days ago
    status: 'completed',
    categorySource: 'automatic',
    merchantName: 'Power Company',
    merchantImage: null
  }
];

// Category configurations
const CATEGORY_BUDGETS: Record<string, number> = {
  food: 500,
  shopping: 300,
  transport: 200,
  technology: 100,
  housing: 800,
  other: 100
};

const CATEGORY_COLORS: Record<string, string> = {
  food: '#ff6b6b',
  shopping: '#4ecdc4',
  transport: '#45b7d1',
  technology: '#a29bfe',
  housing: '#00b894',
  other: '#636e72'
};

const CATEGORY_LABELS: Record<string, string> = {
  food: 'Food & Dining',
  shopping: 'Shopping',
  transport: 'Transport',
  technology: 'Technology',
  housing: 'Housing',
  other: 'Other',
  business: 'Business',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  income: 'Income',
  unmapped: 'Uncategorized'
};

const Dashboard = () => {
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
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-6">
          {/* Account Selector and Card */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Accounts</h2>
              <AccountSelector 
                accounts={mockAccounts}
                selectedAccount={selectedAccount}
                onSelectAccount={handleAccountSelect}
              />
            </div>
            
            <AccountCard account={selectedAccount} />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleQuickAction('Transfer')}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <span>Transfer</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleQuickAction('Pay')}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <span>Pay</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleQuickAction('Top Up')}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <span>Top Up</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => handleQuickAction('Cards')}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <span>Cards</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Transactions */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <MerchantAvatar 
                        name={transaction.merchantName || 'Unknown'} 
                        category={transaction.category} 
                        className="mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">
                              {transaction.merchantName || transaction.description}
                            </p>
                            {transaction.category === 'unmapped' && (
                              <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 text-xs">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Needs attention
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center ml-2">
                            <span className={cn(
                              "font-medium",
                              transaction.type === 'incoming' ? 'text-green-500' : 'text-foreground'
                            )}>
                              {transaction.type === 'incoming' ? (
                                <ArrowDownLeft className="inline h-3.5 w-3.5 mr-1" />
                              ) : (
                                <ArrowUpRight className="inline h-3.5 w-3.5 mr-1" />
                              )}
                              {transaction.currency}{transaction.amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <p className="truncate">
                            {CATEGORY_LABELS[transaction.category] || transaction.category}
                            {transaction.categorySource === 'manual' && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Manual
                              </Badge>
                            )}
                          </p>
                          <p>{transaction.date.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found for this account
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Spending Insights */}
          <SpendingInsights 
            categories={categories} 
            totalSpent={spent} 
            accountName={selectedAccount.displayName}
          />
        </div>
      </main>

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
