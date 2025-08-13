import { useState, useMemo } from "react";
import { Transaction, Account } from "@/components/fintech/types";
import { TransactionDetailsModal } from "@/components/fintech/TransactionDetailsModal";
import { TransactionItem } from "@/components/fintech/TransactionItem";
import { SpendingInsights } from "@/components/fintech/SpendingInsights";
import { AccountCard } from "@/components/fintech/AccountCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Download,
  Coffee,
  Car,
  ShoppingBag,
  Home,
  Smartphone,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import mock data
import {
  mockAccounts,
  mockTransactions,
  CATEGORY_BUDGETS,
  CATEGORY_LABELS,
} from "@/mock/mockData";

// Category icons mapping with React components
const categoryIconComponents = {
  food: Coffee,
  transport: Car,
  shopping: ShoppingBag,
  housing: Home,
  technology: Smartphone,
  other: CreditCard,
  unmapped: CreditCard
} as const;

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
    <main className="container mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Accounts</h1>
      </div>

      {/* Account Cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAccounts.map((account) => (
            <AccountCard
              key={account.id}
              balance={account.balance}
              currency={account.currency}
              accountName={account.displayName}
              accountType={account.type as 'checking' | 'savings' | 'investment' | 'credit'}
              availableBalance={account.availableBalance}
              isSelected={selectedAccount.id === account.id}
              color={account.color || 'blue'}
              icon={account.icon}
              onClick={() => handleAccountSelect(account)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Transactions Section */}
        <div className="flex-1">
          <div className="space-y-4">

            {/* Recent Transactions */}

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <div className="flex gap-2">
                  {/* Quick Actions */}
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction('Transfer')}>
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Transfer
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction('Request')}>
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                    Request
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction('Pay Bill')}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Bill
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction('Filter')}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction('Export')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
            </div>
            <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      onClick={() => handleTransactionClick(transaction)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No transactions found for this account.</p>
                  </div>
                )}
            </div>
          </div>
        </div>
        
        {/* Spending Insights */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-4">
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
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          transaction={selectedTransaction}
        />
      )}
    </main>
  );
};

export default Dashboard;