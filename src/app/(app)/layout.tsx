import { ElectronIndicator } from "@/components/generic/ElectronIndicator";
import { ModeToggle } from "@/components/generic/ModeToggle";
import { TailwindIndicator } from "@/components/generic/TailwindIndicator";
import { MobileNavigationLinks, NavigationLinks } from "@/components/layout/navigation-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MiniSalahWidget } from "@/features/salah/components/MiniSalahWidget";
import { cormorant_garamond, indopak, inter, lexend, readex_pro } from "@/lib/fonts";
import { AudioProvider } from "@/providers/AudioProvider";
import ReactQueryProviderWrapper from "@/providers/ReactQueryProvider";
import { PanelLeft, Search } from "lucide-react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

const fontClasses =
  `${inter.className} ${cormorant_garamond.variable} ${lexend.variable} ${readex_pro.variable} ${indopak.variable} font-primary`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProviderWrapper>
        <AudioProvider>
          <TailwindIndicator />
          <ElectronIndicator />
          <div className={`flex border-collapse overflow-hidden ${fontClasses}`}>
            <aside className="inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
              <NavigationLinks />
            </aside>
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1">
              <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-20">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="sm:max-w-xs">
                    <MobileNavigationLinks />
                  </SheetContent>
                </Sheet>
                <div className="relative ml-auto flex-1 md:w-1/4 md:max-w-[45%] w-full">
                  <MiniSalahWidget />
                </div>

                <div className="md:relative ml-auto flex-1 md:grow-0 hidden md:flex">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
                <ModeToggle />
              </header>
              {/* <AuroraBackground> */}
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 z-10">
                <Suspense fallback={<div>Loading...</div>}>
                  {children}
                </Suspense>
              </main>
              {/* </AuroraBackground> */}
            </div>
          </div>
        </AudioProvider>
      </ReactQueryProviderWrapper>
    </ThemeProvider>
  );
}
