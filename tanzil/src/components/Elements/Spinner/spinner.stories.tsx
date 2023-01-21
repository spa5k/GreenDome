import { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const metaSpinner: Meta<typeof Spinner> = {
	title: 'Components/Elements/Spinner',
	component: Spinner,
	parameters: {
		controls: { expanded: true },
	},
};

export default metaSpinner;

type SpinnerStory = StoryObj<typeof Spinner>;

export const SpinnerSB: SpinnerStory = {};

// const Template: StoryObj<SpinnerProps> = (props) => <Spinner {...props} />;

// export const Default = Template.bind({});
// Default.args = {};
