import { NextPrayerWidget } from "@/features/salah/components/NextPrayerWidget";
import { cn } from "@/lib/utils";
import { BellIcon, Book, CalendarIcon, Compass, FileTextIcon, FormInputIcon, GlobeIcon, Settings } from "lucide-react";
import { lazy, Suspense } from "react";
import AnimatedGridPattern from "../extra/animated-grid-pattern";
import { BentoCard, BentoGrid } from "../extra/bento-grid";
import Globe from "../extra/globe";
import { GridPatternLinearGradient } from "../extra/grid-pattern";

// Lazy load components
// const RecitationCard = lazy(() => import("@/src/features/recitation/components/RecitationCard"));
// const Globe = lazy(() => import("../ui/globe"));
const RecitationCard = lazy(() => import("@/features/recitation/components/RecitationCard"));

const features = [
  {
    Icon: FileTextIcon,
    name: "Quran Recitation",
    description: "Listen to the recitation of the Quran and read it.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="transform-gpu transition-all duration-300 ease-out hover:blur-none">
        <Suspense fallback={<div>Loading...</div>}>
          <RecitationCard />
        </Suspense>
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: FormInputIcon,
    name: "Search Quran",
    description: "Search for specific verses or keywords in the Quran.",
    href: "/search",
    cta: "Search now",
    background: (
      <Suspense fallback={<div>Loading...</div>}>
      </Suspense>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: GlobeIcon,
    name: "Translation",
    description: "Read the Quran in multiple languages.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: CalendarIcon,
    name: "Prayer Times",
    description: "Get accurate prayer times based on your location.",
    href: "/salah",
    cta: "View prayer times",
    background: (
      <div className="relative flex h-full w-full items-start justify-start overflow-hidden rounded-lg bg-background p-5 [mask-image:linear-gradient(to_top,transparent_10%,#000_30%)]">
        <div className="z-10 whitespace-pre-wrap text-start text-2xl font-medium tracking-tighter text-primary-foreground">
          <NextPrayerWidget />
        </div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Reminders",
    description: "Set reminders for important Islamic events and activities.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Book,
    name: "Tafsir Browser",
    description: "Explore and search through authentic tafsir.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Compass,
    name: "Islamic History",
    description: "Explore the rich history of Islam.",
    href: "/",
    cta: "Learn more",
    background: (
      <Suspense fallback={<div>Loading...</div>}>
        <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
      </Suspense>
    ),
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },

  {
    Icon: Settings,
    name: "User Settings",
    description: "Customize your app preferences and settings.",
    href: "/",
    cta: "Learn more",
    background: <GridPatternLinearGradient />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
  },
];

export const FeaturesGrid = () => {
  return (
    <div className="flex flex-1 flex-col ">
      <BentoGrid className="lg:grid-rows-4">
        {features.map((feature) => (
          <Suspense key={feature.name} fallback={<div>Loading...</div>}>
            <BentoCard {...feature} />
          </Suspense>
        ))}
      </BentoGrid>
    </div>
  );
};
