import { Meta, StoryObj } from "@storybook/react"

import { BezierEditor } from "../components"

const meta = {
  title: "Components/BezierEditor",
  component: BezierEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BezierEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

// Save this for now
/*
const defaultArgs = {
  children: (
    <>
    </>
  )
}; */

export const Primary: Story = {
  args: {},
};