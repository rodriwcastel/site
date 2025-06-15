import Header from "@/components/header"
import BlogSection from "@/components/blog-section"
import HeroSection from "@/components/hero-section"
import DiscographySection from "@/components/discography-section"
import TourSection from "@/components/tour-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black font-poppins">
      <Header />
      <BlogSection />
      <HeroSection />
      <DiscographySection />
      <TourSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
