import { ClassValue, clsx as classX } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function clsx(...inputs: ClassValue[]) {
	return twMerge(classX(inputs));
}
