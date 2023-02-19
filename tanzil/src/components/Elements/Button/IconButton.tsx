import { ButtonProps } from '@/components/Elements/Button/Button.js';
import * as React from 'react';

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, ...props }, ref) => {
		return (
			<Button
				className={clsx(className)}
				ref={ref}
				{...props}
				variant={variant}
				size={size}
			>
				{children}
			</Button>
		);
	},
);

IconButton.displayName = 'IconButton';
