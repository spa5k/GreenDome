import { DomeMask } from "@/components/extra/green-dome";
import Particles from "@/components/extra/particles";
import FeaturesGrid from "@/components/landing/features-grid";
import HeroSection from "@/components/landing/hero-section";

export default async function Page() {
  return (
    <>
      <DomeMask reverse={true} />
      <HeroSection />
      <DomeMask />

      {/* <SphereMask /> */}
      <FeaturesGrid />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
