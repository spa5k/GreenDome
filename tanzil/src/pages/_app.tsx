import { ErrorBoundary } from 'react-error-boundary';
import { ImperativePanelHandle, Panel, PanelGroup } from 'react-resizable-panels';

const ErrorFallback = () => {
	return (
		<div
			className='bg-error flex h-screen w-screen flex-col items-center justify-center'
			role='alert'
		>
			<h2 className='text-primary text-lg font-semibold'>Ooops, something went wrong :(</h2>
			<Button className='btn mt-4' onClick={() => window.location.assign(window.location.origin)}>
				Refresh
			</Button>
		</div>
	);
};

const App = ({ children }: { children: React.ReactNode; }) => {
	const [hideText, sethideText] = useState(false);
	const ref = useRef<ImperativePanelHandle>(null);
	const panel = ref.current;

	// LeftBarCollapse.state.onChange((value) => {
	// 	if (value && panel) {
	// 		panel.resize(3);
	// 	} else if (!value && panel) {
	// 		panel.resize(15);
	// 	}
	// });

	return (
		<section>
			<header>
			</header>

			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<main className='transition-all duration-150'>
					<PanelGroup autoSaveId='homepage' direction='horizontal'>
						<Panel
							defaultSize={10}
							minSize={3}
							maxSize={15}
							collapsible
							ref={ref}
							onResize={(size) => {
								console.log(size);
								if (size <= 3) {
									// LeftBarCollapse.state.set(true);
									sethideText(true);
								} else {
									// LeftBarCollapse.state.set(false);
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
			</ErrorBoundary>
		</section>
	);
};

export default App;
