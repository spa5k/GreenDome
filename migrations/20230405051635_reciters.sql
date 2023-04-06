-- Add migration script here
CREATE TABLE `recitations` (
    reciter_name TEXT,
    surah_number INTEGER,
    ayah_number INTEGER,
    recitation_quality TEXT,
    PRIMARY KEY (reciter_name, surah_number, ayah_number, recitation_quality)
);
