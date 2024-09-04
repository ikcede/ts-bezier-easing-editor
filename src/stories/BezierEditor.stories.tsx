import { Meta, StoryObj } from '@storybook/react';

import { BezierEditor, CubicBezier } from '../components';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/BezierEditor',
  component: BezierEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BezierEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Readonly: Story = {
  args: {
    initialBezier: new CubicBezier(0, 1, 1, 0),
    readOnly: true,
  },
};

export const WithAction: Story = {
  args: {
    onChange: fn(),
  },
};
