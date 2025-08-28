import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

// Simple test component
const TestComponent = ({ title, color }: { title: string; color: string }) => (
  <div style={{ padding: '20px', backgroundColor: color }}>
    <h1>{title}</h1>
    <p>This is a test component to verify Storybook is working.</p>
  </div>
);

const meta: Meta<typeof TestComponent> = {
  title: "Blueberry/Test Component",
  component: TestComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title to display",
    },
    color: {
      control: "color",
      description: "Background color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    title: "Test Component",
    color: "#f0f0f0",
  },
};

export const RedBackground: Story = {
  args: {
    title: "Red Background",
    color: "#ff0000",
  },
};
