import { QuranHomepage } from "@/features/quran/Homepage";

export default async function Page(
  props: {
    searchParams?: Promise<{ sort?: string; filter?: string }>;
  },
): Promise<JSX.Element> {
  let searchParams = await props.searchParams;
  if (!searchParams) {
    searchParams = {};
  }

  return (
    <main className="mt-20">
      <QuranHomepage searchParams={searchParams} />
    </main>
  );
}
