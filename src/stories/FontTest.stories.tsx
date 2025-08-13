import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';

const meta = {
  title: 'Design System/Font Test',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MontserratFont: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <h1 className="text-4xl font-bold">Montserrat Font Test</h1>
      <div className="space-y-2">
        <p className="text-2xl font-bold">Bold (700)</p>
        <p className="text-2xl font-semibold">SemiBold (600)</p>
        <p className="text-2xl font-medium">Medium (500)</p>
        <p className="text-2xl font-normal">Regular (400)</p>
      </div>
      <div className="mt-6">
        <p className="text-lg">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p className="text-lg">abcdefghijklmnopqrstuvwxyz</p>
        <p className="text-lg">0123456789!@#$%^&*()</p>
      </div>
    </div>
  ),
};
