import { Link } from '@tanstack/react-location';

export const Navbar = () => {
	const [navbar, setNavbar] = useState(false);

	return (
		<nav className='relative bg-white shadow dark:bg-gray-800'>
			<div className='container px-6 py-4 mx-auto md:flex md:justify-between md:items-center'>
				<div className='flex items-center justify-between'>
					<div>
						<Link
							to={'/'}
							className='text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300'
						>
							Quran
						</Link>
					</div>
					{/*  Mobile menu button  */}
					<div className='flex lg:hidden'>
						<button
							type='button'
							className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
							aria-label='toggle menu'
							onClick={() => setNavbar(!navbar)}
						>
							{navbar
								? <IconCharmCross />
								: <IconMdiMenu />}
						</button>
					</div>
				</div>
				{/* Mobile Menu open: "block", Menu closed: "hidden" */}
				<div
					className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
						navbar ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
					}`}
				>
					<div className='flex flex-col md:flex-row md:mx-6'>
						<Link
							className='my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
							to='/'
						>
							Home
						</Link>
						<Link
							className='my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
							to='#'
						>
							Surah
						</Link>
						<Link
							className='my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
							to='#'
						>
							Salah
						</Link>
						<Link
							className='my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0'
							to='#'
						>
							About
						</Link>
					</div>

					<div className='flex justify-center md:block'>
						Icon
					</div>
				</div>
			</div>
		</nav>
	);
};
