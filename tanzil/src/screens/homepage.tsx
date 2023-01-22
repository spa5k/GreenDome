import { Panel, PanelGroup } from 'react-resizable-panels';

export const HomePage = () => {
	return (
		<div className='flex h-screen'>
			<PanelGroup autoSaveId='homepage' direction='horizontal'>
				<Panel defaultSize={10} minSize={8} maxSize={15}>
					<LeftBar />
				</Panel>
				<ResizeHandler />
				<Panel minSize={30}>
					<MainContent />
				</Panel>
				<ResizeHandler />
				<Panel defaultSize={20} minSize={20}>
					<RightBar />
				</Panel>
			</PanelGroup>
		</div>
	);
};
