export const Navbar = () => {
	return (
		<nav className='shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] bg-base py-2'>
			<div className='navbar bg-base-100'>
				<div className='flex-none'>
					<button className='btn btn-square btn-ghost'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-5 h-5 stroke-current'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
						</svg>
					</button>
				</div>
				<div className='flex-1'>
					<p className='btn btn-ghost normal-case text-xl'>daisyUI</p>
				</div>
				<div className='flex-none'>
					<button className='btn btn-square btn-ghost'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-5 h-5 stroke-current'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
							>
							</path>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
};
