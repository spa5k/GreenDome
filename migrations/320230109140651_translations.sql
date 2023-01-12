-- -- Add migration script here
create table `translations_text` (
	`id` integer not null primary key autoincrement,
	`surah` integer not null,
	`ayah` integer not null,
	`key` text not null,
	`translation_text` text
);

CREATE UNIQUE INDEX translations_key ON translations_text(surah, ayah, key);
