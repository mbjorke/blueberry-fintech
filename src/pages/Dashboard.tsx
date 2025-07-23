import { useState } from "react";
import { AccountCard } from "@/components/fintech/AccountCard";
import { TransactionItem, Transaction } from "@/components/fintech/TransactionItem";
import { QuickActions } from "@/components/fintech/QuickActions";
import { SpendingInsights } from "@/components/fintech/SpendingInsights";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/fintech-hero.jpg";

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'outgoing',
    amount: 4.50,
    currency: '£',
    description: 'Coffee',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'completed',
    merchantName: 'Starbucks',
  },
  {
    id: '2',
    type: 'incoming',
    amount: 2500.00,
    currency: '£',
    description: 'Salary',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed',
    merchantName: 'Acme Corp',
  },
  {
    id: '3',
    type: 'outgoing',
    amount: 45.99,
    currency: '£',
    description: 'Groceries',
    category: 'shopping',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'completed',
    merchantName: 'Tesco',
  },
  {
    id: '4',
    type: 'outgoing',
    amount: 12.50,
    currency: '£',
    description: 'Bus fare',
    category: 'transport',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'completed',
    merchantName: 'TfL',
  },
];

const mockSpendingCategories = [
  { name: 'Food & Dining', amount: 450, budget: 600, color: '#ff6b6b' },
  { name: 'Shopping', amount: 320, budget: 400, color: '#4ecdc4' },
  { name: 'Transport', amount: 180, budget: 250, color: '#45b7d1' },
  { name: 'Entertainment', amount: 120, budget: 200, color: '#96ceb4' },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [accountBalance] = useState(3247.82);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Feature`,
      description: `${action} functionality would be implemented here`,
    });
  };

  const handleTransactionClick = (transaction: Transaction) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for ${transaction.description}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-gradient-primary flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-primary/80" />
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-white/90">Manage your finances with confidence</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Account & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Card */}
            <AccountCard 
              balance={accountBalance}
              onAddMoney={() => handleQuickAction('Add Money')}
              onSendMoney={() => handleQuickAction('Send Money')}
              onRequestMoney={() => handleQuickAction('Request Money')}
            />

            {/* Quick Actions */}
            <QuickActions 
              onTransfer={() => handleQuickAction('Transfer')}
              onTopUp={() => handleQuickAction('Top Up')}
              onPayBills={() => handleQuickAction('Pay Bills')}
              onCards={() => handleQuickAction('Manage Cards')}
              onSavings={() => handleQuickAction('Savings')}
              onInvesting={() => handleQuickAction('Investing')}
              onSplitBill={() => handleQuickAction('Split Bill')}
              onReceipts={() => handleQuickAction('Receipts')}
            />

            {/* Recent Transactions */}
            <Card className="shadow-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickAction('View All Transactions')}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-1">
                  {mockTransactions.map((transaction) => (
                    <TransactionItem 
                      key={transaction.id}
                      transaction={transaction}
                      onClick={() => handleTransactionClick(transaction)}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Insights */}
          <div className="space-y-6">
            <SpendingInsights 
              monthlyBudget={2000}
              spent={1070}
              categories={mockSpendingCategories}
              trend={{ percentage: 12, direction: 'up' }}
              onViewDetails={() => handleQuickAction('View Analytics')}
            />

            {/* Quick Stats */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This week's spending</span>
                  <span className="font-medium text-foreground">£234.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average daily spend</span>
                  <span className="font-medium text-foreground">£33.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transactions this month</span>
                  <span className="font-medium text-foreground">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Savings goal progress</span>
                  <span className="font-medium text-success">68%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;