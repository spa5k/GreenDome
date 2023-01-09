-- Add migration script here
create table `translations_info` (
	`id` integer not null primary key autoincrement,
	`surah` integer not null,
	`ayah` integer not null,
	`direction` text not null default 'ltr',
	`language` text not null default 'english',
	`edition` text not null
);


create table `translations_text` (
	`id` integer not null primary key autoincrement,
	`surah` integer not null,
	`ayah` integer not null,
	`key` text not null,
	`text` text
);
