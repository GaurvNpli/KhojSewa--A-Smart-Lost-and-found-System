import { useEffect, useRef } from "react";
import AboutPreview from "../components/AboutPreview";
import CTASection from "../components/CTASection";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

const Home = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("opacity-0", "translate-y-16");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <div
        ref={(el) => (sectionsRef.current[0] = el)}
        className="opacity-0 translate-y-16 transition-all duration-1000 ease-out"
      >
        <Features />
      </div>

      {/* About Preview Section */}
      <div
        ref={(el) => (sectionsRef.current[1] = el)}
        className="opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-100"
      >
        <AboutPreview />
      </div>

      {/* CTA Section */}
      <div
        ref={(el) => (sectionsRef.current[2] = el)}
        className="opacity-0 translate-y-16 transition-all duration-1000 ease-out delay-200"
      >
        <CTASection />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
