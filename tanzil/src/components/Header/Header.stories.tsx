import { Meta, StoryObj } from '@storybook/react';

type NavbrStory = StoryObj<typeof Navbar>;

export const NavbarSB: NavbrStory = {};
const metaNavbar: Meta<typeof Navbar> = {
	/* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
	component: Navbar,
};
export default metaNavbar;
