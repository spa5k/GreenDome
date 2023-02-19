export const ThemeChange = () => {
	const theme = localStorage.getItem('theme');
	const [light, setLight] = useState(true);

	useEffect(() => {
		console.log('Theme', theme);
	}, [light]);

	return (
		<>
			<IconButton data-toggle-theme='dark,light' data-act-class='ACTIVECLASS' onClick={() => setLight(!light)}>
				{theme === 'light' ? <IconLineMdSunnyFilledLoop /> : <IconLineMdSunnyFilledLoopToMoonAltFilledLoopTransition />}
			</IconButton>
		</>
	);
};
