import { checkSalahTimes, MainLayout } from '@quran/core';
import { Outlet } from 'react-router-dom';
import EnvironmentContextProvider from '../providers/EnvironmentProvider';

checkSalahTimes();

const App = () => {
	return (
		<EnvironmentContextProvider>
			<MainLayout>
				<Outlet />
			</MainLayout>
		</EnvironmentContextProvider>
	);
};

export default App;
