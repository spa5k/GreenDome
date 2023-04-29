import { cn } from '@quran/elements';
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
			className={cn(
				className,
				'hover: active: bg-text flex w-0.5 resize flex-col items-center justify-center rounded-md align-middle transition-all duration-150 ease-out hover:ease-in',
			)}
		/>
	);
}
