import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {CardTailWindExample} from "../components/CardTailWindExample"

export default {
  title: "Example/CardTailWindExample",
  component: CardTailWindExample,
} as ComponentMeta<typeof CardTailWindExample>;

const Template: ComponentStory<typeof CardTailWindExample> = () => <CardTailWindExample />;

export const CardTailWind= Template.bind({});
CardTailWind.args = {

};

