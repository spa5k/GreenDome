import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="w-full sm:w-2/3 mt-8 space-y-2 items-center px-4 sm:px-0">
      <form className="relative group">
        <Input
          className="w-full py-3 sm:py-4 pl-10 sm:pl-12 pr-20 sm:pr-4 text-base sm:text-lg shadow-lg transition-all duration-300 ease-in-out h-10 sm:h-12 bg-primary-foreground"
          placeholder="Search Quran, Hadith, or Tafsir..."
          type="text"
        />
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-200" />
        <Button
          type="submit"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out h-10 sm:h-12"
        >
          Search
        </Button>
      </form>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        Try searching for &ldquo;Surah Al-Fatiha&rdquo;, &ldquo;Hadith on kindness&rdquo;, or &ldquo;Tafsir of Ayatul
        Kursi&rdquo;
      </p>
    </div>
  );
};
