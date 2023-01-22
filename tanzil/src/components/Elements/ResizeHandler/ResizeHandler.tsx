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
			className={clsx(className, 'rounded-md transition-colors flex flex-col items-center align-middle justify-center')}
		>
			<div>
				<IconUilArrowsResizeH width={15} />
			</div>
		</PanelResizeHandle>
	);
}
