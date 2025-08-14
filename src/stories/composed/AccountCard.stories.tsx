import type { Meta, StoryObj } from '@storybook/react';
import { AccountCard, type IconType } from '@/components/fintech/AccountCard';
import { GradientCard } from '@/components/ui/gradient-card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const meta = {
  title: 'Composed/AccountCard',
  component: AccountCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A composed card component for displaying account information. Built on top of the `GradientCard` primitive with additional account-specific functionality.',
      },
    },
  },
  tags: ['autodocs', 'composed'],
  argTypes: {
    balance: {
      control: 'number',
      description: 'The current balance of the account',
    },
    currency: {
      control: 'text',
      description: 'The currency symbol to display',
    },
    accountName: {
      control: 'text',
      description: 'The name of the account',
    },
    accountType: {
      control: 'select',
      options: ['checking', 'savings', 'investment', 'credit', 'freelance'],
      description: 'The type of account',
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the card is in a selected state',
    },
    icon: {
      control: 'select',
      options: ['wallet', 'piggy-bank', 'briefcase', 'credit-card', 'users'] as IconType[],
      description: 'Icon to display for the account type',
      mapping: {
        'wallet': 'wallet',
        'piggy-bank': 'piggy-bank',
        'briefcase': 'briefcase',
        'credit-card': 'credit-card',
        'users': 'users'
      },
    },
  },
} satisfies Meta<typeof AccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default AccountCard with common usage.
 * 
 * This component is built on top of the `GradientCard` primitive,
 * adding account-specific functionality like balance display and account type indicators.
 */
export const Default: Story = {
  args: {
    balance: 12450.75,
    currency: '$',
    accountName: 'Main Account',
    accountType: 'checking',
    icon: 'wallet',
    isSelected: false,
  },
};

/**
 * Shows how the AccountCard uses the GradientCard primitive internally.
 * This demonstrates the composition pattern used in the component.
 */
export const CompositionExample: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">AccountCard (Composed Component)</h3>
        <AccountCard {...args} />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Underlying GradientCard (Base Primitive)</h3>
        <div className="relative">
          <GradientCard 
            className="p-6 w-80 h-40 flex flex-col justify-between"
            gradientDirection="to-br"
            from="from-primary"
            to="to-primary/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-foreground">👛</span>
                </div>
                <span className="text-sm font-medium text-foreground/90">{args.accountName}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-foreground/10 rounded-full text-foreground/90">
                {args.accountType}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">
                {args.currency}{args.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-foreground/70 mt-1">Available Balance</p>
            </div>
          </GradientCard>
          
          <div className="absolute -bottom-8 right-0 text-xs text-muted-foreground flex items-center">
            <Info className="w-3 h-3 mr-1" />
            Simplified representation for illustration
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground max-w-md">
        <p className="font-medium mb-1">Composition Notes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>AccountCard extends GradientCard with account-specific features</li>
          <li>Handles number formatting and currency display</li>
          <li>Manages account type specific styling and icons</li>
          <li>Implements interactive states (selected/hover/focus)</li>
        </ul>
      </div>
    </div>
  ),
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the AccountCard is composed using the base GradientCard component.',
      },
    },
  },
};

// Selected state example
export const Selected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
};

// Different account types
export const SavingsAccount: Story = {
  args: {
    balance: 42389.21,
    currency: '€',
    accountName: 'Rainy Day Fund',
    accountType: 'savings',
    icon: 'piggy-bank',
  },
};

export const InvestmentAccount: Story = {
  args: {
    balance: 87523.45,
    currency: '€',
    accountName: 'Investment Portfolio',
    accountType: 'investment',
    icon: 'briefcase',
  },
};

export const CreditCardAccount: Story = {
  args: {
    balance: -1245.67,
    currency: '€',
    accountName: 'Platinum Card',
    accountType: 'credit',
    icon: 'credit-card',
  },
};

// All account cards in a grid for comparison
export const AllAccountTypes = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl">
    <AccountCard 
      balance={12450.75}
      accountName="Main Account"
      accountType="checking"
      icon="wallet"
      isSelected={true}
    />
    <AccountCard 
      balance={42389.21}
      accountName="Rainy Day Fund"
      accountType="savings"
      icon="piggy-bank"
    />
    <AccountCard 
      balance={87523.45}
      accountName="Investment Portfolio"
      accountType="investment"
      icon="briefcase"
    />
    <AccountCard 
      balance={-1245.67}
      accountName="Platinum Card"
      accountType="credit"
      icon="credit-card"
    />
    <AccountCard 
      balance={1250.00}
      accountName="Freelance Income"
      accountType="freelance"
      icon="users"
    />
  </div>
);

// Interactive example
export const InteractiveExample: Story = {
  args: {
    balance: 12450.75,
    currency: '€',
    accountName: 'Interactive Account',
    accountType: 'checking',
    icon: 'wallet',
    isSelected: false,
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return (
      <div className="p-4">
        <AccountCard {...args} />
      </div>
    );
  },
};
