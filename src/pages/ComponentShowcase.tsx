import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountCard, TransactionItem, QuickActions, SpendingInsights } from '@/components/fintech';
import type { Transaction, SpendingCategory } from '@/components/fintech/types';

/**
 * Component Showcase Page
 * 
 * Demonstrates all fintech design system components with live examples.
 * This page serves as a comprehensive component library and documentation.
 */

// Sample data for demonstrations
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'outgoing',
    amount: 42.50,
    currency: '€',
    description: 'Coffee & Breakfast',
    category: 'food',
    date: new Date(),
    status: 'completed',
    merchantName: 'Starbucks',
    expenseStatus: 'none',
    cardholder: 'John Doe',
    receiptStatus: 'none',
    transactionId: 'TXN-001',
  },
  {
    id: '2',
    type: 'incoming',
    amount: 1250.00,
    currency: '€',
    description: 'Salary Payment',
    category: 'other',
    date: new Date(Date.now() - 86400000),
    status: 'completed',
    expenseStatus: 'none',
    cardholder: 'John Doe',
    receiptStatus: 'none',
    transactionId: 'TXN-002',
  },
  {
    id: '3',
    type: 'outgoing',
    amount: 18.75,
    currency: '€',
    description: 'Uber Ride',
    category: 'transport',
    date: new Date(Date.now() - 172800000),
    status: 'pending',
    expenseStatus: 'none',
    cardholder: 'John Doe',
    receiptStatus: 'none',
    transactionId: 'TXN-003',
  },
];

const sampleCategories: SpendingCategory[] = [
  { name: 'Food & Dining', amount: 420, budget: 500, color: '#f97316' },
  { name: 'Transport', amount: 180, budget: 200, color: '#3b82f6' },
  { name: 'Shopping', amount: 320, budget: 400, color: '#8b5cf6' },
  { name: 'Housing', amount: 850, budget: 900, color: '#10b981' },
];

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Fintech Design System
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete component library and documentation for modern fintech applications
          </p>
        </div>

        {/* Component Showcase Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="fintech">Fintech</TabsTrigger>
            <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Design System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">🎨 UI Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhanced shadcn/ui components with fintech-specific variants and styling.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Enhanced Button variants</li>
                    <li>• Elevated Card shadows</li>
                    <li>• Status Badge indicators</li>
                    <li>• Avatar components</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">💰 Fintech Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Specialized components for financial applications and user interfaces.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• AccountCard balance display</li>
                    <li>• TransactionItem listings</li>
                    <li>• QuickActions grid</li>
                    <li>• SpendingInsights analytics</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">🎯 Design Principles</h3>
                  <p className="text-sm text-muted-foreground">
                    Core principles that guide the design system implementation.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Semantic color tokens</li>
                    <li>• Responsive design</li>
                    <li>• Accessibility compliance</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Live Component Demos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Account Management</h3>
                <AccountCard 
                  balance={3247.82}
                  currency="£"
                  accountName="Main Account"
                  onAddMoney={() => alert('Add Money clicked')}
                  onSendMoney={() => alert('Send Money clicked')}
                  onRequestMoney={() => alert('Request Money clicked')}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Quick Actions</h3>
                <QuickActions 
                  onTransfer={() => alert('Transfer clicked')}
                  onTopUp={() => alert('Top Up clicked')}
                  onPayBills={() => alert('Pay Bills clicked')}
                  onCards={() => alert('Cards clicked')}
                />
              </div>
            </div>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Standard Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Fintech Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="premium">Premium</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="fintech">Fintech</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Sizes</h3>
                  <div className="flex flex-wrap items-end gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                    <Button size="icon">🎯</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 shadow-card">
                <h3 className="font-semibold mb-2">Card Shadow</h3>
                <p className="text-sm text-muted-foreground">
                  Basic elevation using shadow-card class.
                </p>
                <Badge variant="outline" className="mt-3">shadow-card</Badge>
              </Card>
              
              <Card className="p-6 shadow-elegant">
                <h3 className="font-semibold mb-2">Elegant Shadow</h3>
                <p className="text-sm text-muted-foreground">
                  Medium elevation using shadow-elegant class.
                </p>
                <Badge variant="secondary" className="mt-3">shadow-elegant</Badge>
              </Card>
              
              <Card className="p-6 shadow-premium">
                <h3 className="font-semibold mb-2">Premium Shadow</h3>
                <p className="text-sm text-muted-foreground">
                  High elevation using shadow-premium class.
                </p>
                <Badge variant="default" className="mt-3">shadow-premium</Badge>
              </Card>
            </div>
          </TabsContent>

          {/* Fintech Components Tab */}
          <TabsContent value="fintech" className="space-y-6">
            <div className="space-y-8">
              {/* Transaction Items */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Transaction Items</h3>
                <div className="space-y-2">
                  {sampleTransactions.map((transaction) => (
                    <TransactionItem 
                      key={transaction.id}
                      transaction={transaction}
                      onClick={() => alert(`Clicked transaction ${transaction.id}`)}
                    />
                  ))}
                </div>
              </Card>

              {/* Spending Insights */}
              <Card className="p-0">
                <SpendingInsights 
                  monthlyBudget={2000}
                  spent={1070}
                  categories={sampleCategories}
                  trend={{ percentage: 12, direction: 'up' }}
                  onViewDetails={() => alert('View Details clicked')}
                />
              </Card>
            </div>
          </TabsContent>

          {/* Design Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Color Tokens */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Color System</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Primary Colors</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">
                        Primary
                      </div>
                      <div className="h-12 bg-primary-glow rounded flex items-center justify-center text-white text-xs">
                        Primary Glow
                      </div>
                      <div className="h-12 bg-accent rounded flex items-center justify-center text-accent-foreground text-xs">
                        Accent
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Semantic Colors</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-success rounded flex items-center justify-center text-white text-xs">
                        Success
                      </div>
                      <div className="h-12 bg-warning rounded flex items-center justify-center text-white text-xs">
                        Warning
                      </div>
                      <div className="h-12 bg-destructive rounded flex items-center justify-center text-destructive-foreground text-xs">
                        Destructive
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Gradient System */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Gradient System</h3>
                <div className="space-y-3">
                  <div className="h-16 bg-gradient-primary rounded flex items-center justify-center text-white font-medium">
                    Primary Gradient
                  </div>
                  <div className="h-16 bg-gradient-secondary rounded flex items-center justify-center text-white font-medium">
                    Secondary Gradient
                  </div>
                  <div className="h-16 bg-gradient-success rounded flex items-center justify-center text-white font-medium">
                    Success Gradient
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}