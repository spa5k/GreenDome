import { SalahDisplay } from "@/features/salah/components/SalahDisplay";
import { SalahHadithDisplay } from "@/features/salah/components/SalahHadithDisplay";

export default async function Page({
  searchParams,
}: {
  searchParams?: { open: string };
}): Promise<JSX.Element> {
  return (
    <main className="mt-20 flex flex-col items-center h-full">
      <SalahHadithDisplay />
      <SalahDisplay />
    </main>
  );
}
