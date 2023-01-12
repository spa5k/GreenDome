-- Add migration script here
create table `editions` (
	`id` integer not null primary key autoincrement,
	`name` text not null UNIQUE,
	`author` text,
	`language` text not null,
	`direction` text not null,
	`source` text,
	`type` text not null,
	`enabled` text not null
);

