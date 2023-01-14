import { useSelector } from '@legendapp/state/react';

const Index = () => {
	const isSelected = useSelector(() => Theme.theme.get());

	return (
		<div className={`bg-primary text-text ${isSelected} `}>
			<HomePage />
		</div>
	);
};

export default Index;
