import HeroSection from "../components/Villa/HeroSection";
import DestinationCarousel from "../components/Villa/DestinationCarousel";
import FeaturedProperties from "../components/Villa/FeaturedProperties";
import SpecialOffers from "../components/Villa/SpecialOffers";
import CustomerStories from "../components/Villa/CustomerStories";


export default function HomestayVillaPage() {
  return (
    <div className="font-sans">
      <HeroSection />
      <DestinationCarousel />
      <FeaturedProperties />
      <SpecialOffers />
      <CustomerStories />
      
    </div>
  );
}
