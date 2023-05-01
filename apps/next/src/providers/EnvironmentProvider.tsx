'use client';
import { EnvironmentContext } from '@quran/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const LinkWrapper = ({
	href,
	children,
	...restProps
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return <Link href={href} {...restProps}>{children}</Link>;
};

const EnvironmentContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const location = useRouter().pathname;
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
