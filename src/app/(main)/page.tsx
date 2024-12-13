import { DomeMask } from "@/components/extra/green-dome";
import FeaturesGrid from "@/components/landing/features-grid";
import { Hero } from "@/components/landing/hero-section";

export default async function Page() {
  return (
    <>
      <DomeMask reverse={true} />
      <Hero />
      <DomeMask />

      {/* <SphereMask /> */}
      <FeaturesGrid />
    </>
  );
}
