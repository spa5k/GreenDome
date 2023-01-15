const array = [
	{ title: 'Dashboard', selected: false, id: 1 },
	{ title: 'Quran', selected: false, id: 2 },
	{ title: 'Hadith', selected: true, id: 3 },
	{ title: 'Prayer Times', selected: true, id: 4 },
	{ title: 'Prayer Tracker', selected: true, id: 5 },
	{ title: 'Settigns', selected: true, id: 6 },
];

const listItems = array.map(array => (
	<li
		key={array.id}
		className={'mt-10'}
	>
		{array.title}
	</li>
));

export default function leftBar() {
	return (
		<div className='basis-1/4 bg-yellow-900'>
			<img src='/favicon.svg' className='h-[90px] m-6' alt='Salam App Logo' />
			<ul className='pl-10'>
				{listItems}
			</ul>
		</div>
	);
}
