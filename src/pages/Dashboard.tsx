import { useState } from "react";
import { TransactionItem, Transaction } from "@/components/fintech/TransactionItem";
import { TransactionDetailsModal } from "@/components/fintech/TransactionDetailsModal";
import { SpendingInsights } from "@/components/fintech/SpendingInsights";
import { DashboardHeader } from "@/components/fintech/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, CreditCard } from "lucide-react";
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
    type: 'incoming',
    amount: 2850.00,
    currency: '€',
    description: 'Monthly salary payment',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18 hours ago
    status: 'completed',
    merchantName: 'TechNova Solutions',
    merchantDetails: 'TechNova Solutions SEPA',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-SAL-240730-001',
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
    type: 'outgoing',
    amount: 89.99,
    currency: '€',
    description: 'New wireless headphones',
    category: 'technology',
    date: new Date(Date.now() - 1000 * 60 * 60 * 32), // 32 hours ago
    status: 'completed',
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
    type: 'outgoing',
    amount: 15.80,
    currency: '€',
    description: 'Metro weekly pass',
    category: 'transport',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'completed',
    merchantName: 'RATP',
    merchantDetails: 'RATP Navigo* Weekly',
    expenseStatus: 'approved',
    spendProgram: 'Transport Allowance',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'uploaded',
    accountingCategory: 'Transport',
    transactionId: 'TXN-RAT-240729-003',
    cardLast4: '2847',
    location: 'Paris Metro',
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
    type: 'incoming',
    amount: 45.00,
    currency: '€',
    description: 'Freelance project payment',
    category: 'other',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    status: 'completed',
    merchantName: 'StartupXYZ',
    merchantDetails: 'StartupXYZ SAS Bank Transfer',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-SUP-240728-001',
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
    merchantDetails: 'FitLife Gym* Monthly DD',
    expenseStatus: 'none',
    cardholder: 'Emma Sofia Martinez',
    receiptStatus: 'none',
    transactionId: 'TXN-FIT-240727-001',
    cardLast4: '2847',
    location: 'Lyon, France',
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
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Feature`,
      description: `${action} functionality would be implemented here`,
    });
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with integrated header */}
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
          {/* Unified Account and Transactions Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-primary text-white border-0 shadow-none overflow-hidden">
              {/* Account Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-white/80 text-sm">Personal Account</p>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                      Main Account
                    </Badge>
                  </div>
                </div>

                {/* Balance and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold tracking-tight">
                      €{accountBalance.toFixed(2)}
                    </div>
                    <p className="text-white/70 text-sm">Available balance</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="default"
                      onClick={() => handleQuickAction('Add Money')}
                      className="bg-white text-primary hover:bg-white/90 shadow-lg"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction('Send Money')}
                      className="border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction('Manage Cards')}
                      className="border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Cards
                    </Button>
                  </div>
                </div>
              </div>

              {/* Transactions Section */}
              <div className="bg-background text-foreground p-6 rounded-t-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Transactions</h3>
                </div>
                <div className="space-y-1 mb-4">
                  {mockTransactions.map((transaction) => (
                    <TransactionItem 
                      key={transaction.id}
                      transaction={transaction}
                      onClick={() => handleTransactionClick(transaction)}
                    />
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickAction('View All Transactions')}
                  >
                    View All
                  </Button>
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

      {/* Transaction Details Modal */}
      <TransactionDetailsModal 
        transaction={selectedTransaction}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default Dashboard;