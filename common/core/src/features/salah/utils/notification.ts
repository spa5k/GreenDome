interface Options {
	title: string;
	body?: string;
	icon?: string;
}

type Permission = 'granted' | 'denied' | 'default';

async function isPermissionGranted(): Promise<boolean> {
	if (window.Notification.permission !== 'default') {
		return Promise.resolve(window.Notification.permission === 'granted');
	}
	return true;
}

async function requestPermission(): Promise<Permission> {
	return window.Notification.requestPermission();
}

function sendNotification(options: Options | string) {
	let notification: Notification;
	if (typeof options === 'string') {
		notification = new window.Notification(options);
	} else {
		notification = new window.Notification(options.title, options);
	}
	return notification;
}

export type { Options, Permission };
export { isPermissionGranted, requestPermission, sendNotification };
