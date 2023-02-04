const sizes = {
	sm: 'h-4 w-4',
	md: 'h-8 w-8',
	lg: 'h-16 w-16',
	xl: 'h-24 w-24',
};

const variants = {
	secondary: 'text-secondary',
	primary: 'text-primary',
};

export type SpinnerProps = {
	size?: keyof typeof sizes;
	variant?: keyof typeof variants;
	className?: string;
};

export const Spinner = ({ size = 'md', variant = 'primary', className = '' }: SpinnerProps) => {
	return (
		<>
			<IconEosIconsLoading className={clsx('animate-spin', sizes[size], variants[variant], className)} />
		</>
	);
};
