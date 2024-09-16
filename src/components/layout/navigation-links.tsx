"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ArrowLeft, ArrowRight, Book, Clock, Home, LineChart, Moon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileTooltipLink = ({ href, icon: Icon, label, isActive }: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
      isActive && "text-foreground",
    )}
  >
    <Icon className="h-5 w-5" />
    {label}
  </Link>
);

export const MobileNavigationLinks = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        href="/"
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Moon className="h-5 w-5 transition-all group-hover:scale-110" />
        <span className="sr-only">Quran</span>
      </Link>
      <MobileTooltipLink
        href="/"
        icon={Home}
        label="Home"
        isActive={isActive("/")}
      />
      <MobileTooltipLink
        href="/quran"
        icon={Book}
        label="Quran"
        isActive={isActive("/quran") || isActive("/surah")}
      />
      <MobileTooltipLink
        href="/prayers"
        icon={Clock}
        label="Salah"
        isActive={isActive("/prayers")}
      />
      <MobileTooltipLink
        href="#"
        icon={LineChart}
        label="Analytics"
        isActive={isActive("#")}
      />
      <MobileTooltipLink
        href="#"
        icon={Settings}
        label="Settings"
        isActive={isActive("#")}
      />
    </nav>
  );
};

// Reusable TooltipLink component
const TooltipLink = ({ href, icon: Icon, label, isOpen, isActive }: {
  href: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  isActive: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        href={href}
        className={cn(
          "flex h-9 w-full px-4 items-center justify-items-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8",
          isActive && "bg-accent text-accent-foreground",
        )}
      >
        <Icon className="h-5 w-5" />
        <span className={isOpen ? "pl-4" : "sr-only"}>{label}</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent side="right">{label}</TooltipContent>
  </Tooltip>
);

export const NavigationLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const pathname = usePathname();

  const handleToggle = () => {
    setStatus(true);
    setIsOpen(!isOpen);
    setTimeout(() => setStatus(false), 500);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div
      className={cn(
        `relative hidden h-screen border-r md:block`,
        status && "duration-200",
        isOpen ? "w-72" : "w-[78px]",
      )}
    >
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
          >
            <Moon className="h-4 w-4 transition-all hover:scale-110" />
            <span className={"sr-only"}>Quran</span>
          </Link>
          <div className="pt-20 flex flex-col items-center gap-4 px-2">
            <TooltipLink
              href="/"
              icon={Home}
              label="Home"
              isOpen={isOpen}
              isActive={isActive("/")}
            />
            <TooltipLink
              href="/quran"
              icon={Book}
              label="Quran"
              isOpen={isOpen}
              isActive={isActive("/quran") || isActive("/surah")}
            />
            <TooltipLink
              href="/prayers"
              icon={Clock}
              label="Salah"
              isOpen={isOpen}
              isActive={isActive("/prayers")}
            />
            <TooltipLink
              href="#"
              icon={LineChart}
              label="Analytics"
              isOpen={isOpen}
              isActive={isActive("#")}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleToggle}
                  className="flex h-9 w-full items-center px-4 justify-items-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8"
                >
                  {isOpen ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                  <span className={isOpen ? "pl-4" : "sr-only"}>
                    {isOpen ? "Collapse" : "Open"}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {isOpen ? "Collapse" : "Open"}
              </TooltipContent>
            </Tooltip>
            <TooltipLink
              href="/settings"
              icon={Settings}
              label="Settings"
              isOpen={isOpen}
              isActive={isActive("#")}
            />
          </div>
        </nav>
      </TooltipProvider>
    </div>
  );
};
