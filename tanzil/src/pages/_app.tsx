export default function App({ children }: { children: React.ReactNode; }) {
	return (
		<section>
			<header>
				<Navbar />
			</header>

			<main>
				{children}
			</main>
		</section>
	);
}
