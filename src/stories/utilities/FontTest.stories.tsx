import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Typography system showing available font weights and styles.',
      },
    },
  },
  tags: ['autodocs', 'utilities', 'typography'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontWeights: Story = {
  render: () => (
    <div className="font-sans space-y-6 p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Typography</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Headings</h2>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">Heading 1 (Bold 700)</h1>
            <h2 className="text-3xl font-semibold">Heading 2 (SemiBold 600)</h2>
            <h3 className="text-2xl font-medium">Heading 3 (Medium 500)</h3>
            <h4 className="text-xl font-normal">Heading 4 (Regular 400)</h4>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h2 className="text-2xl font-bold mb-2">Body Text</h2>
          <div className="space-y-1">
            <p className="text-lg font-medium">Lead Text (Medium 500)</p>
            <p className="text-base font-normal">Body Text (Regular 400)</p>
            <p className="text-sm font-light">Small Text (Light 300)</p>
            <p className="text-xs font-extralight">Extra Small (ExtraLight 200)</p>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h2 className="text-2xl font-bold mb-2">Special Cases</h2>
          <div className="space-y-2">
            <p className="text-base font-semibold">Button Text (SemiBold 600)</p>
            <p className="text-sm font-medium">Caption (Medium 500)</p>
            <p className="text-xs font-normal">Overline (Regular 400)</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h2 className="text-2xl font-bold mb-2">Character Set</h2>
          <div className="space-y-2">
            <p className="text-base">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="text-base">abcdefghijklmnopqrstuvwxyz</p>
            <p className="text-base">0123456789!@#$%^&*()</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
