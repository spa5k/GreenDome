import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button.js';

const metaButton: Meta<typeof Button> = {
	/* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
	title: 'Button',
	component: Button,
};

export default metaButton;
type ButtonStory = StoryObj<typeof Button>;

export const GenericButton: ButtonStory = {
	args: {
		children: 'Primary Button',
	},
};

export const ButtonWithStartIcon: ButtonStory = {
	args: {
		children: 'Primary Button',
		startIcon: <IconCharmCross />,
	},
};

export const ButtonWithEndIcon: ButtonStory = {
	args: {
		children: 'Primary Button',
		endIcon: <IconCharmCross />,
	},
};
