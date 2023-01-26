import { clsx } from 'clsx';
import { PanelResizeHandle } from 'react-resizable-panels';

export default function ResizeHandle({
	id,
	className = '',
}: {
	className?: string;
	id?: string;
}) {
	return (
		<PanelResizeHandle
			id={id}
			className={clsx(
				className,
				'rounded-md flex flex-col items-center align-middle justify-center border-x-1 w-0.5 resize bg-base-300 hover:bg-accent-content active:bg-accent-content transition-all duration-150 ease-out hover:ease-in',
			)}
		/>
	);
}
