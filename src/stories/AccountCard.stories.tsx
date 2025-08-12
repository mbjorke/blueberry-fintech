import type { Meta, StoryObj } from '@storybook/react';
import { AccountCard } from '@/components/fintech/AccountCard';
import { Wallet, PiggyBank, Briefcase, CreditCard, Users } from 'lucide-react';

const meta = {
  title: 'Components/Fintech/AccountCard',
  component: AccountCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
      options: ['wallet', 'piggy-bank', 'briefcase', 'credit-card', 'users'],
      description: 'Icon to display for the account type',
    },
  },
} satisfies Meta<typeof AccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with common usage
export const Default: Story = {
  args: {
    balance: 12450.75,
    currency: '€',
    accountName: 'Main Account',
    accountType: 'checking',
    isSelected: false,
    icon: 'wallet',
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
