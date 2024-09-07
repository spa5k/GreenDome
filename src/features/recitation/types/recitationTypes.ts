// Enum for possible bitrates
export enum Bitrate {
  LOW = "64kbps",
  MEDIUM = "128kbps",
  HIGH = "192kbps",
}

// Interface for Quran Recitation details
export interface QuranRecitation {
  subfolder: string; // Subfolder where the recitation files are stored
  name: string; // Name of the reciter
  bitrate: Bitrate; // Bitrate of the recitation audio
}

// Interface for Recitation Detail
export interface RecitationDetail {
  [key: number]: QuranRecitation; // Dynamic keys for each Surah
  ayahCount: number[]; // Array of Ayah counts for each Surah
}

export interface Recitation {
  id: number;
  reciter_id: number;
  name: string;
  translated_name: {
    name: string;
    language_name: string;
  };
  style: string;
  qirat: {
    name: string;
    language_name: string;
  };
  slug: string;
}
[];
