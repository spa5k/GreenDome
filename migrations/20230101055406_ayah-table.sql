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
	`indopak` text not null,
	`uthmani` text not null,
	`unicode` text not null,
	`simple` text not null,
	`warsh` text not null,
	`tajweed` text
);
