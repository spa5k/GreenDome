import { Panel, PanelGroup } from 'react-resizable-panels';

type FilesState = {
	fileListCollapsed: boolean;
};

const initialState: FilesState = {
	fileListCollapsed: false,
};
type CloseAction = { type: 'close'; file: File; };
type OpenAction = { type: 'open'; file: File; };
type ToggleCollapsedAction = { type: 'toggleCollapsed'; collapsed: boolean; };

export type FilesAction = CloseAction | OpenAction | ToggleCollapsedAction;

function reducer(state: FilesState, action: FilesAction): FilesState {
	switch (action.type) {
		case 'toggleCollapsed': {
			return { ...state, fileListCollapsed: action.collapsed };
		}
		default: {
			throw `Unknown action type: ${(action).type}`;
		}
	}
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
				<Navbar />
			</header>

			<main>
				<PanelGroup autoSaveId='homepage' direction='horizontal'>
					<>
						<Panel
							defaultSize={10}
							minSize={3}
							maxSize={15}
							collapsible={true}
							onCollapse={toggleCollapsed}
							onResize={(size) => {
								if (size <= 3.1) {
									sethideText(true);
								} else {
									sethideText(false);
								}
							}}
						>
							<LeftBar hideText={hideText} />
						</Panel>
						<ResizeHandler />
					</>
					<Panel minSize={30}>
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
