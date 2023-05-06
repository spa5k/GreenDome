import { salahCalculationStore } from '../store';

interface Options {
	title: string;
	body?: string;
	icon?: string;
}

type Permission = 'granted' | 'denied' | 'default';

async function isNotificationPermissionGranted(): Promise<boolean> {
	if (window.Notification.permission !== 'default') {
		return Promise.resolve(window.Notification.permission === 'granted');
	}
	return true;
}

async function requestNotificationPermission(): Promise<Permission> {
	const { notificationPermission } = salahCalculationStore.getState();
	const permission = await window.Notification.requestPermission();

	if (permission !== notificationPermission) {
		salahCalculationStore.setState({ notificationPermission: permission });
	}
	return permission;
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
export {
	isNotificationPermissionGranted as isPermissionGranted,
	requestNotificationPermission as requestPermission,
	sendNotification,
};
