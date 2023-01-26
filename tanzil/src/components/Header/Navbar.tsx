import { Link } from '@tanstack/react-location';

export const Navbar = () => {
	const [navbar, setNavbar] = useState(false);

	return (
		<nav className='relative shadow bg-base'>
			<div className='container px-6 py-4 mx-auto md:flex md:justify-between md:items-center'>
				<div className='flex items-center justify-between'>
					<div>
						<Link
							to={'/'}
							className='text-2xl font-bold transition-colors duration-300 transform text-secondary dark:text-white lg:text-3xl hover:text-secondary dark:hover:text-secondary'
						>
							Quran
						</Link>
					</div>
					<div className='flex md:hidden'>
						<IconButton
							icon={navbar
								? <IconCharmCross />
								: <IconMdiMenu />}
							aria-label='toggle menu'
							onClick={() => setNavbar(!navbar)}
						/>
					</div>
				</div>

				{/* Mobile Menu open: "block", Menu closed: "hidden" */}
				<div
					className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
						navbar ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
					}`}
				>
					<div className='flex flex-col md:flex-row md:mx-6'>
						<Link
							className='my-2 transition-colors duration-300 md:mx-4 md:my-0 link link-hover hover:text-secondary'
							to='/about'
						>
							About
						</Link>
						<select data-choose-theme className='my-0 outline-none select select-xs select-bordered'>
							<option value='light'>Light</option>
							<option value='dark'>Dark</option>
							<option value='cupcake'>Cupcake</option>
							<option value='business'>Business</option>
							<option value='emerald'>Emerald</option>
							<option value='corporate'>Corporate</option>
							<option value='retro'>Retro</option>
							<option value='halloween'>Halloween</option>
							<option value='garden'>Garden</option>
							<option value='forest'>Forest</option>
							<option value='aqua'>Qqua</option>
							<option value='lofi'>Lofi</option>
							<option value='pastel'>Pastel</option>
							<option value='fantasy'>Fantasy</option>
							<option value='black'>Black</option>
							<option value='dracula'>Dracula</option>
							<option value='cmyk'>Cmyk</option>
							<option value='autumn'>Autumn</option>
							<option value='business'>Business</option>
							<option value='acid'>Acid</option>
							<option value='lemonade'>Lemonade</option>
							<option value='night'>Night</option>
							<option value='coffee'>Coffee</option>
							<option value='winter'>Winter</option>
						</select>
					</div>
				</div>
			</div>
		</nav>
	);
};
