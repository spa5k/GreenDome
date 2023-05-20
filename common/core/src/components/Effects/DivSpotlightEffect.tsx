import React, { ReactNode, useRef, useState } from 'react';

interface DivSpotlightEffectProps {
	children: ReactNode;
}

const DivSpotlightEffect: React.FC<DivSpotlightEffectProps> = ({ children }) => {
	const divRef = useRef<HTMLDivElement | null>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!divRef.current || isFocused) return;

		const div = divRef.current;
		const rect = div.getBoundingClientRect();

		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(1);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(1);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='relative'
		>
			<div
				className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
				style={{
					opacity,
					background:
						`radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,.09), transparent 40%)`,
				}}
			/>
			{children}
		</div>
	);
};

export default DivSpotlightEffect;
