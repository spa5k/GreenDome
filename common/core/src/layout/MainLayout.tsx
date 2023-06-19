import { cn } from '@quran/elements';
import { useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ImperativePanelHandle, Panel, PanelGroup } from 'react-resizable-panels';
import { ErrorFallback, Menu, ResizeHandle } from '../components';
import { LeftBar } from '.';
import RightBar from './RightBar';

const logError = (error: Error, info: { componentStack: string; }) => {
	console.log('error', error, info);
	// Do something with the error, e.g. log to an external API
};

export const MainLayout = ({ children }: { children: React.ReactNode; }) => {
	const [hideText, sethideText] = useState(false);
	const ref = useRef<ImperativePanelHandle>(null);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
			<section className='antialiased scrollbar-none'>
				<header className='fixed left-0 top-0 z-20 w-full text-clip'>
					<Menu />
				</header>

				<main className='mt-10 min-h-screen text-clip transition-all duration-150'>
					<PanelGroup autoSaveId='homepage' direction='horizontal'>
						<Panel
							defaultSize={10}
							minSize={3}
							maxSize={14}
							collapsible={false}
							ref={ref}
							onResize={(size) => {
								if (size <= 3) {
									sethideText(true);
								} else {
									sethideText(false);
								}
							}}
						>
							<ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
								<LeftBar hideText={hideText} handler={ref} />
							</ErrorBoundary>
						</Panel>

						<ResizeHandle />

						<Panel minSize={30}>
							<ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
								<div
									className={cn(
										'h-[calc(100vh-50px)] overflow-y-auto',
										'scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-sm',
									)}
								>
									{children}
								</div>
							</ErrorBoundary>
						</Panel>
						<ResizeHandle />
						<Panel defaultSize={20} minSize={20}>
							<ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
								<RightBar />
							</ErrorBoundary>
						</Panel>
					</PanelGroup>
				</main>
			</section>
		</ErrorBoundary>
	);
};
