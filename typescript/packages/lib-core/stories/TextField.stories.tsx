import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {TextField} from "../components/TextField"

export default {
  title: "Example/TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = args => <TextField {...args} />;

export const TextFieldi= Template.bind({});
TextFieldi.args = {
  label: "Oyelowo",
  description: "The calm guy",
  errorMessage: "Don't hurt me",
};

