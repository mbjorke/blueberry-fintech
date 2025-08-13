import type { Meta, StoryObj } from '@storybook/react';
import { AlertsDropdown } from '@/components/fintech/AlertsDropdown';

const meta = {
  title: 'Components/Fintech/AlertsDropdown',
  component: AlertsDropdown,
  parameters: {
    layout: 'centered',
    // Disable controls for this component as it manages its own state
    controls: { hideNoControlsWarning: true },
  },
  tags: ['autodocs'],
  // Disable actions for this component as it manages its own state
  argTypes: {
    onOpenChange: { table: { disable: true } },
  },
} satisfies Meta<typeof AlertsDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Since the component manages its own state, we'll use a decorator to wrap it in a container
const Template: Story = {
  render: (args) => (
    <div className="flex justify-end w-[400px]">
      <AlertsDropdown {...args} />
    </div>
  ),
};

export const Default = {
  ...Template,
  args: {},
};

/*
 * Example of a story with no unread notifications
 */
export const NoUnreadNotifications = {
  ...Template,
  // In a real implementation, you would mock the context or props to show no unread notifications
};

/*
 * Example of a story with many unread notifications
 */
export const ManyUnreadNotifications = {
  ...Template,
  // In a real implementation, you would mock the context or props to show many unread notifications
};
