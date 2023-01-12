-- Add migration script here
create table `ayah_info` (
	`id` integer not null primary key autoincrement,
	`surah` integer not null,
	`ayah` integer not null,
	`ayah_key` text not null,
	`hizb` integer not null,
	`rub_el_hizb` integer not null,
	`ruku` integer not null,
	`manzil` integer not null,
	`page` integer not null,
	`juz` integer not null
);

create table `quran` (
	`id` integer not null primary key autoincrement,
	`surah` integer not null,
	`ayah` integer not null,
	`key` text not null,
	`text` text not null
);

CREATE UNIQUE INDEX quran_key ON quran(surah, ayah, key);
