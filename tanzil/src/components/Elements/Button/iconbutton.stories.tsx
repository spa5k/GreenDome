import { IconButton } from '@/components/Elements/Button/IconButton.js';
import type { Meta, StoryObj } from '@storybook/react';

const metaIconButton: Meta<typeof IconButton> = {
	/* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
	title: 'IconButton',
	component: IconButton,
};

export default metaIconButton;
type IconButtonStory = StoryObj<typeof IconButton>;

export const PrimaryWithIcon: IconButtonStory = {
	args: {
		icon: <IconIcRoundKeyboardArrowRight />,
	},
};
