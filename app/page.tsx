import AnimatedSection from "@/components/ui/animatedsection";
import Hero from "@/components/ui/Hero";
import ScienceBlock from "@/components/ui/ScienceBlock";
import MethodsGrid from "@/components/ui/MethodGrid";
import Footer from "@/components/ui/Footer";
import LanguageBar from "@/components/ui/LanguageBar";

export default function Landing() {
  return (
    <>
      <AnimatedSection direction="up">
        <Hero />
      </AnimatedSection>

      <AnimatedSection direction="left" delay={0.1}>
        <ScienceBlock />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
        <MethodsGrid />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.3}>
        <Footer />
      </AnimatedSection>
    </>
  );
}
