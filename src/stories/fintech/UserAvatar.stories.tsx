import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar } from '@/components/fintech/UserAvatar';

const meta = {
  title: 'Components/Fintech/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL to the user\'s profile image',
    },
    name: {
      control: 'text',
      description: 'User\'s name for the avatar fallback',
    },
    email: {
      control: 'text',
      description: 'User\'s email to display in the dropdown',
    },
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Marcus Björke',
    email: 'mbjorke@gmail.com',
    imageUrl: '/marcus-bjorke.jpeg',
  },
};

export const LongName: Story = {
  args: {
    name: 'Dr. Elizabeth Alexandra Mary Windsor',
    email: 'queen.elizabeth@example.com',
  },
};
