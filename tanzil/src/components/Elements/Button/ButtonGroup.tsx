import { clsx } from 'clsx';
import * as React from 'react';

export type ButtonGroupProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean;
};

export const ButtonGroup = React.forwardRef<HTMLButtonElement, ButtonGroupProps>(
	(
		{
			className = '',
			isLoading = false,
			...props
		},
	) => {
		return (
			<div className={clsx('flex items-center justify-center', className)}>
				{isLoading && <Spinner />}

				<div className='inline-flex space-x-0 shadow-md hover:shadow-lg focus:shadow-lg' role='group'>
					{props.children}
				</div>
			</div>
		);
	},
);

ButtonGroup.displayName = 'ButtonGroup';
