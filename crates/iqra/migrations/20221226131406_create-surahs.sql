-- Add migration script here

CREATE TABLE IF NOT EXISTS `surahs` (
	`id` integer not null,
	`name` text not null,
	`revelation_order` integer not null,
	`bismillah_pre` text not null,
	`name_simple` text not null,
	`name_complex` text not null,
	`name_arabic` text not null,
	`ayah_start` integer not null,
	`ayah_end` integer not null,
	`type` text not null,
	`name_translated_en` text not null,
	`page_start` integer not null,
	`page_end` integer not null
);
