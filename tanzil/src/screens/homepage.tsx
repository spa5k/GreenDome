import LeftBar from '@/components/LeftBar.js';
import MainContent from '@/components/MainContent.js';
import RightBar from '@/components/RighBar.js';

export const LayOut = () => {
	return (
		<div className='flex h-screen'>
			<LeftBar />

			<MainContent />

			<RightBar />
		</div>
	);
};
