import FeaturedBooksSection from "@/components/myComponents/section/FeaturedBooksSection";
import HeroSection from "@/components/myComponents/section/HeroSection";
import NewArrivalSection from "@/components/myComponents/section/NewArrivalSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrivalSection />
      <FeaturedBooksSection />
    </>
  );
}
