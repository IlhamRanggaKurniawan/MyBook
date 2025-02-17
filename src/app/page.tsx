import Footer from "@/components/myComponents/Footer";
import Navbar from "@/components/myComponents/Navbar";
import FeaturedBooksSection from "@/components/myComponents/section/FeaturedBooksSection";
import HeroSection from "@/components/myComponents/section/HeroSection";
import NewArrivalSection from "@/components/myComponents/section/NewArrivalSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <NewArrivalSection />
      <FeaturedBooksSection />
      <Footer />
    </>
  );
}
