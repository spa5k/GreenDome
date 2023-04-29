'use client';
import { EnvironmentContext } from '@quran/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

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
	return (
		<EnvironmentContext.Provider
			value={{
				Link: LinkWrapper,
				location: useRouter().pathname,
			}}
		>
			{children}
		</EnvironmentContext.Provider>
	);
};

export default EnvironmentContextProvider;
