import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import KingdomSection from "@/components/home/KingdomSection";
import PlayerSection from "@/components/home/PlayerSection";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>BannerMatch - Find Your Next ROK Kingdom or MVP</title>
        <meta name="description" content="BannerMatch connects top-tier Rise of Kingdoms players with active kingdoms. Find your perfect match for migration and KVK success." />
      </Helmet>
      
      <HeroSection />
      <FeatureSection />
      <KingdomSection />
      <PlayerSection />
      <ProcessSection />
      <CTASection />
      <FAQSection />
    </>
  );
};

export default HomePage;
