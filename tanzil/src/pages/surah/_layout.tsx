import { Outlet } from '@tanstack/react-location';
import { Panel, PanelGroup } from 'react-resizable-panels';

export const Loader = () => {
	return Promise.resolve({ source: 'from `src/pages/surah.tsx` layout data loader' });
};

export default function SurahLayout() {
	return (
		<>
			<div className='flex h-screen'>
				<PanelGroup autoSaveId='homepage' direction='horizontal'>
					<Panel defaultSize={13} minSize={10}>
						<LeftBar />
					</Panel>
					<ResizeHandler />
					<Panel minSize={30}>
						<Outlet />
					</Panel>
					<ResizeHandler />
					<Panel defaultSize={20} minSize={20}>
						<RightBar />
					</Panel>
				</PanelGroup>
			</div>
		</>
	);
}
