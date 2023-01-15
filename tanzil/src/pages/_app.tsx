import { Link } from '@tanstack/react-location';

export default function App({ children }: { children: React.ReactNode; }) {
	return (
		<section style={{ margin: 24 }}>
			<header style={{ display: 'flex', gap: 24 }}>
				Navbar here
				<Link to='surah/1'>
					surah
				</Link>
				<Link to='/'>
					HOME
				</Link>
			</header>

			<main>
				{children}
			</main>
		</section>
	);
}
