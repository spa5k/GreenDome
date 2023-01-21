import { ButtonGroup } from '@/components/Elements/Button/ButtonGroup.js';
import type { Meta, StoryObj } from '@storybook/react';

const metaButtonGroup: Meta<typeof ButtonGroup> = {
	/* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
	title: 'ButtonGroup',
	component: ButtonGroup,
};

export default metaButtonGroup;
type ButtonGroupStory = StoryObj<typeof ButtonGroup>;

export const Example: ButtonGroupStory = {
	args: {
		children: (
			<>
				<Button round='none'>Nice</Button>
				<IconButton round='none' icon={<IconCharmCross />} />
			</>
		),
	},
};

export const ButtonGroupBorder: ButtonGroupStory = {
	args: {
		children: (
			<>
				<Button
					type='button'
					className='px-6 py-2 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out border-2 rounded-l focus:outline-none focus:ring-0 border-primary'
					round='none'
				>
					Left
				</Button>
				<Button
					round='none'
					type='button'
					className='px-6 py-2 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out border-2 focus:outline-none focus:ring-0 border-primary border-x-0'
				>
					Middle
				</Button>
				<Button
					round='none'
					type='button'
					className='px-6 py-2 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out border-2 rounded-r border-primary focus:outline-none focus:ring-0'
				>
					Right
				</Button>
			</>
		),
	},
};
