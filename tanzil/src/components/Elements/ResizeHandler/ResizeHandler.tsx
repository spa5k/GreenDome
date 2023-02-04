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
				'border-x-1 bg-base-300 hover:bg-accent-content active:bg-accent-content flex w-0.5 resize flex-col items-center justify-center rounded-md align-middle transition-all duration-150 ease-out hover:ease-in',
			)}
		/>
	);
}
