import { createContext } from 'react';

export const EnvironmentContext = createContext<{
	Link: React.FunctionComponent<
		React.AnchorHTMLAttributes<HTMLAnchorElement> & {
			href: string;
			children: React.ReactNode;
		}
	>;
	location?: string;
}>({
	Link: () => null,
});
