import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

type SidebarState = {
	isLeftSidebarOpen: boolean;
	isRightSidebarOpen: boolean;
	toggleLeftSidebar: () => void;
	toggleRightSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
	isLeftSidebarOpen: false,
	isRightSidebarOpen: false,
	toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
	toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
}));

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('sidebarsStore', useSidebarStore);
}
