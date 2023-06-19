import { Icon } from '@iconify/react';
import { Button } from '@quran/elements';
import { useEffect, useState } from 'react';
import { isClient } from '../../utils/isTauri';

export const ThemeChange = () => {
	const theme = isClient && localStorage.getItem('theme');
	const [light, setLight] = useState(true);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	useEffect(() => {
	}, [light]);

	return (
		<>
			<Button
				data-toggle-theme='dark,light'
				data-act-class='ACTIVECLASS'
				onClick={() => setLight(!light)}
				variant={'ghost'}
				className='h-8 focus:outline-none'
			>
				{theme === 'light'
					? <Icon icon='line-md:moon-filled-to-sunny-filled-loop-transition' />
					: <Icon icon='line-md:sunny-outline-to-moon-alt-loop-transition' />}
			</Button>
		</>
	);
};
