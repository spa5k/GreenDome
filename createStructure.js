const fs = require("fs");
const path = require("path");

// Helper function to create a directory if it doesn't exist
const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Helper function to create a file if it doesn't exist
const createFile = (filePath, content = "") => {
  const dir = path.dirname(filePath);
  createDir(dir); // Ensure directory exists before creating the file

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  }
};

// Base directory for app router structure
const baseDir = "./src/app";

// Folder and file structure
const structure = [
  // Quran Structure
  { type: "dir", path: "quran" },
  {
    type: "file",
    path: "quran/page.tsx",
    content: `export default function QuranPage() { return <div>Quran Page (List of Surahs)</div>; }`,
  },
  { type: "dir", path: "quran/[surahId]" },
  {
    type: "file",
    path: "quran/[surahId]/page.tsx",
    content: `export default function SurahDetailPage() { return <div>Surah Detail</div>; }`,
  },

  // Tafsir linked to Surah
  { type: "dir", path: "quran/[surahId]/tafsir" },
  {
    type: "file",
    path: "quran/[surahId]/tafsir/page.tsx",
    content: `export default function TafsirListPage() { return <div>Tafsir List for this Surah</div>; }`,
  },
  { type: "dir", path: "quran/[surahId]/tafsir/[tafsirId]" },
  {
    type: "file",
    path: "quran/[surahId]/tafsir/[tafsirId]/page.tsx",
    content: `export default function TafsirDetailPage() { return <div>Tafsir Detail for this Surah</div>; }`,
  },

  // Recitations for each Surah
  { type: "dir", path: "quran/[surahId]/recitations" },
  {
    type: "file",
    path: "quran/[surahId]/recitations/page.tsx",
    content: `export default function RecitationsPage() { return <div>Recitations for this Surah</div>; }`,
  },
  { type: "dir", path: "quran/[surahId]/recitations/[reciterId]" },
  {
    type: "file",
    path: "quran/[surahId]/recitations/[reciterId]/page.tsx",
    content: `export default function ReciterRecitationPage() { return <div>Recitation by this Reciter</div>; }`,
  },

  // Separate Tafsir Module
  { type: "dir", path: "tafsir" },
  {
    type: "file",
    path: "tafsir/page.tsx",
    content: `export default function TafsirListPage() { return <div>General Tafsir List</div>; }`,
  },
  { type: "dir", path: "tafsir/[tafsirId]" },
  {
    type: "file",
    path: "tafsir/[tafsirId]/page.tsx",
    content: `export default function TafsirDetailPage() { return <div>General Tafsir Detail</div>; }`,
  },

  // Prayers
  { type: "dir", path: "prayers" },
  {
    type: "file",
    path: "prayers/page.tsx",
    content: `export default function PrayersPage() { return <div>Prayer Times</div>; }`,
  },
  { type: "dir", path: "prayers/settings" },
  {
    type: "file",
    path: "prayers/settings/page.tsx",
    content: `export default function PrayerSettingsPage() { return <div>Prayer Time Settings</div>; }`,
  },

  // Recitations Section
  { type: "dir", path: "recitations" },
  {
    type: "file",
    path: "recitations/page.tsx",
    content: `export default function RecitersListPage() { return <div>List of Reciters</div>; }`,
  },
  { type: "dir", path: "recitations/[reciterId]" },
  {
    type: "file",
    path: "recitations/[reciterId]/page.tsx",
    content: `export default function ReciterProfilePage() { return <div>Reciter Profile and Recitations</div>; }`,
  },

  // General Settings
  { type: "dir", path: "settings" },
  {
    type: "file",
    path: "settings/page.tsx",
    content: `export default function SettingsPage() { return <div>App Settings</div>; }`,
  },

  // Favorites
  { type: "dir", path: "favorites" },
  {
    type: "file",
    path: "favorites/page.tsx",
    content: `export default function FavoritesPage() { return <div>Favorites</div>; }`,
  },

  // Search
  { type: "dir", path: "search" },
  {
    type: "file",
    path: "search/page.tsx",
    content: `export default function SearchPage() { return <div>Search Page</div>; }`,
  },

  // Layout and General Pages
  {
    type: "file",
    path: "layout.tsx",
    content: `export default function Layout({ children }) { return <div>Layout {children}</div>; }`,
  },
  { type: "file", path: "page.tsx", content: `export default function HomePage() { return <div>Homepage</div>; }` },
  {
    type: "file",
    path: "not-found.tsx",
    content: `export default function NotFoundPage() { return <div>404 - Page Not Found</div>; }`,
  },
];

// Create the directories and files
structure.forEach((item) => {
  const fullPath = path.join(baseDir, item.path);

  if (item.type === "dir") {
    createDir(fullPath);
  } else if (item.type === "file") {
    createFile(fullPath, item.content);
  }
});

console.log("File and folder structure created successfully!");
