import type { Meta, StoryObj } from '@storybook/react';
import { AvatarWithIcon } from '@/components/ui/avatar-with-icon';
import { User, ShoppingBag, CreditCard, Coffee, Utensils } from 'lucide-react';

const meta: Meta<typeof AvatarWithIcon> = {
  title: 'Components/UI/AvatarWithIcon',
  component: AvatarWithIcon,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: { control: 'text' },
    name: { control: 'text' },
    colorClass: { control: 'text' },
    size: { control: 'number' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    name: 'User Name',
    size: 48,
  },
};

export default meta;

type Story = StoryObj<typeof AvatarWithIcon>;

// Default story with icon
const IconTemplate: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    icon: User,
    colorClass: 'bg-primary text-primary-foreground',
  },
};

// Story with image
const ImageTemplate: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    imageUrl: 'https://github.com/shadcn.png',
    name: 'Profile',
  },
};

// Story with initials
const InitialsTemplate: Story = {
  render: (args) => <AvatarWithIcon {...args} />,
  args: {
    name: 'John Doe',
    colorClass: 'bg-accent text-accent-foreground',
  },
};

// Story with different sizes
const SizesTemplate: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AvatarWithIcon name="XS" size={24} colorClass="bg-muted" />
      <AvatarWithIcon name="SM" size={32} colorClass="bg-muted" />
      <AvatarWithIcon name="MD" size={48} colorClass="bg-muted" />
      <AvatarWithIcon name="LG" size={64} colorClass="bg-muted" />
      <AvatarWithIcon name="XL" size={96} colorClass="bg-muted" />
    </div>
  ),
};

// Story with different categories
const CategoriesTemplate: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center gap-2">
        <AvatarWithIcon 
          icon={ShoppingBag} 
          colorClass="bg-blue-500 text-white"
          size={48}
        />
        <span className="text-sm">Shopping</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarWithIcon 
          icon={CreditCard} 
          colorClass="bg-green-500 text-white"
          size={48}
        />
        <span className="text-sm">Bills</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarWithIcon 
          icon={Coffee} 
          colorClass="bg-amber-500 text-white"
          size={48}
        />
        <span className="text-sm">Coffee</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarWithIcon 
          icon={Utensils} 
          colorClass="bg-red-500 text-white"
          size={48}
        />
        <span className="text-sm">Dining</span>
      </div>
    </div>
  ),
};

export const WithIcon = IconTemplate;
export const WithImage = ImageTemplate;
export const WithInitials = InitialsTemplate;
export const Sizes = SizesTemplate;
export const CategoryExamples = CategoriesTemplate;
