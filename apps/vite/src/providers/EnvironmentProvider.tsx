import { EnvironmentContext } from '@quran/core';
import { useMemo } from 'react';
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
	const location = useLocation().pathname;
	const contextValue = useMemo(() => {
		return {
			Link: LinkWrapper,
			location,
		};
	}, [location]);

	return (
		<EnvironmentContext.Provider
			value={contextValue}
		>
			{children}
		</EnvironmentContext.Provider>
	);
};

export default EnvironmentContextProvider;
