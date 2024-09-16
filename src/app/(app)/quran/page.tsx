import { QuranHomepage } from "@/features/quran/Homepage";

export default async function Page({
  searchParams,
}: {
  searchParams?: { sort?: string; filter?: string };
}): Promise<JSX.Element> {
  return (
    <main className="mt-20">
      <QuranHomepage searchParams={searchParams} />
    </main>
  );
}
