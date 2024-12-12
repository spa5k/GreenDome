import HadithWidget from "../widgets/hadith-widget";
import { HistoryWidget } from "../widgets/history-widget";
import PrayerWidget from "../widgets/prayer-widget";
import QuranWidget from "../widgets/quran-widget";
import { RecitationWidget } from "../widgets/recitation-widget";
import { RemindersWidget } from "../widgets/reminders-widget";
import { SettingsWidget } from "../widgets/settings-widget";

export default function FeaturesGrid() {
  return (
    <div className={`min-h-screen dark:dark`}>
      <div className="container mx-auto p-4 bg-background text-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Prayer Times Widget */}
          <PrayerWidget />

          {/* Hadith Widget */}
          <HadithWidget />

          {/* Quran Widget */}
          <QuranWidget />

          {/* Recitation Widget */}
          <RecitationWidget />

          {/* History Widget */}
          <HistoryWidget />

          {/* Reminders Widget */}
          <RemindersWidget />

          {/* Settings Widget */}
          <SettingsWidget />
          {/* Calendar Widget */}
          {/* <CalendarWidget /> */}
        </div>
      </div>
    </div>
  );
}
