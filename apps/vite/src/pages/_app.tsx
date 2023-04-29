import { MainLayout } from '@quran/core';
import { Outlet } from 'react-router-dom';
import EnvironmentContextProvider from '../providers/EnvironmentProvider';

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
