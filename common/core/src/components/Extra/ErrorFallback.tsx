import { Button } from '@quran/elements';
import { ErrorBoundaryContextType } from 'react-error-boundary';

export function ErrorFallback(
	{ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: ErrorBoundaryContextType['resetErrorBoundary']; },
) {
	return (
		<div
			className='flex h-screen w-screen flex-col items-center justify-center'
			role='alert'
		>
			<h2 className='text-lg font-semibold'>Ooops, something went wrong :(</h2>
			<Button className='mt-4' onClick={() => window.location.assign(window.location.origin)}>
				Refresh
			</Button>

			<Button className='mt-4' onClick={resetErrorBoundary}>
				Reset
			</Button>

			<pre className='text-sm'>{error.message}</pre>
		</div>
	);
}
