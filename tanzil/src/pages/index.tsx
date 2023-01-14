import { useSelector } from '@legendapp/state/react';

const Index = () => {
	return (
		<div className={`bg-primary text-text ${isSelected} `}>

			<HomePage />
		</div>
	);
};
export default Index;
