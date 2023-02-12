// Generouted, changes to this file will be overriden
import { Action, ActionClient } from '@tanstack/react-actions';
import { Loader, LoaderClient } from '@tanstack/react-loaders';
import { lazy, ReactRouter, RootRoute, Route, RouterProvider } from '@tanstack/react-router';
import { Fragment } from 'react';

import NoMatch from './pages/404';
import App from './pages/_app';

const root = new RootRoute({ component: App || Fragment });
const _404 = new Route({ getParentRoute: () => root, path: '*', component: NoMatch || Fragment });
const surah = new Route({ getParentRoute: () => root, path: 'surah', component: lazy(() => import('./pages/surah/_layout')) });
const surahindex = new Route({ getParentRoute: () => surah, path: '/', component: lazy(() => import('./pages/surah/index')) });
const surahid = new Route({ getParentRoute: () => surah, path: '$id', component: lazy(() => import('./pages/surah/[id]')) });
const about = new Route({ getParentRoute: () => root, path: 'about', component: lazy(() => import('./pages/about')) });
const index = new Route({
	getParentRoute: () => root,
	path: '/',
	component: lazy(() => import('./pages/index')),
	pendingComponent: lazy(() => import('./pages/index').then((m) => ({ default: m.Pending }))),
	errorComponent: lazy(() => import('./pages/index').then((m) => ({ default: m.Catch }))),
});

const indexAction = new Action({ key: 'index', action: (...args) => import('./pages/index').then((m) => m.Action.apply(m.Action, args as any)) });

const indexLoader = new Loader({ key: 'index', loader: (...args) => import('./pages/index').then((m) => m.Loader.apply(m.Loader, args as any)) });
const surahindexLoader = new Loader({
	key: 'surahindex',
	loader: (...args) => import('./pages/surah/index').then((m) => m.Loader.apply(m.Loader, args as any)),
});
const surahidLoader = new Loader({ key: 'surahid', loader: (...args) => import('./pages/surah/[id]').then((m) => m.Loader.apply(m.Loader, args as any)) });

const config = root.addChildren([
	surah.addChildren([surahindex, surahid]),
	about,
	index,
	_404,
]);

const router = new ReactRouter({ routeTree: config });
export const Routes = () => <RouterProvider router={router} />;

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export const actionClient = new ActionClient({ getActions: () => [indexAction] });

declare module '@tanstack/react-actions' {
	interface Register {
		actionClient: typeof actionClient;
	}
}
export const loaderClient = new LoaderClient({ getLoaders: () => [indexLoader, surahindexLoader, surahidLoader] });

declare module '@tanstack/react-loaders' {
	interface Register {
		loaderClient: typeof loaderClient;
	}
}
