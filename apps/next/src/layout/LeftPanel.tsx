'use client';

import EnvironmentContextProvider from '@/providers/EnvironmentProvider';
import { ErrorFallback } from '@/utils/errorFallback';
import { LeftBar } from '@quran/core';
import { useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ImperativePanelHandle, Panel } from 'react-resizable-panels';

export const LeftPanel = () => {
	const [hideText, sethideText] = useState(false);
	const ref = useRef<ImperativePanelHandle>(null);

	return (
		<EnvironmentContextProvider>
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
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<LeftBar hideText={hideText} handler={ref} />
				</ErrorBoundary>
			</Panel>
		</EnvironmentContextProvider>
	);
};
