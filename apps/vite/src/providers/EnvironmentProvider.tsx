import { EnvironmentContext } from '@quran/core';
import { Link, useLocation } from 'react-router-dom';

const LinkWrapper = ({
	href,
	children,
	...restProps
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
	children: React.ReactNode;
}) => {
	return <Link to={href} {...restProps}>{children}</Link>;
};

const EnvironmentContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<EnvironmentContext.Provider
			value={{
				Link: LinkWrapper,
				location: useLocation().pathname,
			}}
		>
			{children}
		</EnvironmentContext.Provider>
	);
};

export default EnvironmentContextProvider;
