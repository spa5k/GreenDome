import { Panel, PanelGroup } from 'react-resizable-panels';

type SidebarState = {
	fileListCollapsed: boolean;
};

const initialState: SidebarState = {
	fileListCollapsed: false,
};
type ToggleCollapsedAction = { type: 'toggleCollapsed'; collapsed: boolean; };

export type SidebarAction = ToggleCollapsedAction;

function reducer(state: SidebarState, action: SidebarAction): SidebarState {
	if (action.type === 'toggleCollapsed') {
		return { ...state, fileListCollapsed: action.collapsed };
	}
	return state;
}

export default function App({ children }: { children: React.ReactNode; }) {
	const [, dispatch] = useReducer(reducer, initialState);

	const toggleCollapsed = (collapsed: boolean) => {
		dispatch({ type: 'toggleCollapsed', collapsed });
	};

	const [hideText, sethideText] = useState(false);

	return (
		<section>
			<header>
			</header>

			<main>
				<PanelGroup autoSaveId='homepage' direction='horizontal'>
					<Panel
						defaultSize={10}
						minSize={2.7}
						maxSize={15}
						collapsible={true}
						onCollapse={toggleCollapsed}
						onResize={(size) => {
							if (size <= 3) {
								sethideText(true);
							} else {
								sethideText(false);
							}
						}}
					>
						<LeftBar hideText={hideText} />
					</Panel>
					<ResizeHandler />

					<Panel minSize={30}>
						<Navbar />
						{children}
					</Panel>
					<ResizeHandler />
					<Panel defaultSize={20} minSize={20}>
						<RightBar />
					</Panel>
				</PanelGroup>
			</main>
		</section>
	);
}
