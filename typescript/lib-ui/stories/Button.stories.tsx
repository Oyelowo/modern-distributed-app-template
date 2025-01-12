import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "../components/Button.tsx";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Example/Button",
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		backgroundColor: { control: "color" },
	},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args: any) => (
	<Button {...args}>Do it</Button>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
	// isSmall: false,
};

export const Large = Template.bind({});
Large.args = {};

export const Small = Template.bind({});
Small.args = {};
