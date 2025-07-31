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
    amount: 5.20,
    currency: '€',
    description: 'Morning cappuccino and croissant',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: 'completed',
    merchantName: 'Café de Flore',
  },
  {
    id: '2',
    type: 'incoming',
    amount: 2850.00,
    currency: '€',
    description: 'Monthly salary payment',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
    status: 'completed',
    merchantName: 'TechNova Solutions',
  },
  {
    id: '3',
    type: 'outgoing',
    amount: 67.45,
    currency: '€',
    description: 'Weekly grocery shopping',
    category: 'shopping',
    date: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
    status: 'completed',
    merchantName: 'Carrefour Market',
  },
  {
    id: '4',
    type: 'outgoing',
    amount: 89.99,
    currency: '€',
    description: 'New wireless headphones',
    category: 'technology',
    date: new Date(Date.now() - 1000 * 60 * 60 * 32), // 32 hours ago
    status: 'completed',
    merchantName: 'Amazon',
  },
  {
    id: '5',
    type: 'outgoing',
    amount: 15.80,
    currency: '€',
    description: 'Metro weekly pass',
    category: 'transport',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'completed',
    merchantName: 'RATP',
  },
  {
    id: '6',
    type: 'outgoing',
    amount: 28.50,
    currency: '€',
    description: 'Lunch with colleagues',
    category: 'food',
    date: new Date(Date.now() - 1000 * 60 * 60 * 50), // 2 days ago
    status: 'completed',
    merchantName: 'Le Comptoir',
  },
  {
    id: '7',
    type: 'incoming',
    amount: 45.00,
    currency: '€',
    description: 'Freelance project payment',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'completed',
    merchantName: 'StartupXYZ',
  },
  {
    id: '8',
    type: 'outgoing',
    amount: 125.00,
    currency: '€',
    description: 'Monthly gym membership',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    status: 'completed',
    merchantName: 'FitLife Gym',
  },
];

const mockSpendingCategories = [
  { name: 'Food & Dining', amount: 385, budget: 500, color: '#ff6b6b' },
  { name: 'Shopping & Technology', amount: 295, budget: 400, color: '#4ecdc4' },
  { name: 'Transport', amount: 142, budget: 200, color: '#45b7d1' },
  { name: 'Entertainment', amount: 89, budget: 150, color: '#96ceb4' },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [accountBalance] = useState(3456.78);

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
              currency="€"
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
              monthlyBudget={1250}
              spent={911}
              categories={mockSpendingCategories}
              trend={{ percentage: 8, direction: 'up' }}
              onViewDetails={() => handleQuickAction('View Analytics')}
            />

            {/* Quick Stats */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This week's spending</span>
                  <span className="font-medium text-foreground">€186.75</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average daily spend</span>
                  <span className="font-medium text-foreground">€26.68</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transactions this month</span>
                  <span className="font-medium text-foreground">52</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Savings goal progress</span>
                  <span className="font-medium text-success">73%</span>
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