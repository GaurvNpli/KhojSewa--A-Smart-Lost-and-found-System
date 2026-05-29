import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
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

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-10 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)'
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 163, 115, 0.2) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-amber-300 text-sm font-medium tracking-wide mb-8 animate-elegant-fade-up">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Our Story
          </span>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white mb-6 animate-elegant-fade-up-delay-1">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">KhojSewa</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed animate-elegant-fade-up-delay-2">
            KhojSewa is a smart and community-driven platform built to help people report and recover lost and found items with ease.
            Whether you've lost your wallet, phone, or any important belongings — KhojSewa connects you with the right people, instantly and securely.
          </p>
        </div>

        {/*Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 0C1440 0 1080 60 720 60C360 60 0 0 0 0L0 80Z" fill="#FFFDF8" />
          </svg>
        </div>
      </section>

      {/* Why KhojSewa Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="max-w-6xl mx-auto px-4 sm:px-10 py-20 scroll-reveal"
      >
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium tracking-wide mb-4">
            Our Mission
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
            Why KhojSewa?
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              Losing valuable items can be stressful and disheartening. KhojSewa provides a simple, trusted way to report lost belongings, discover found ones, and reunite owners with their items.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              Our goal is to foster a helpful, honest online space that brings people together through collective responsibility and smart technology. Every connection we make is a step towards a more caring community.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card-premium text-center p-6">
              <div className="text-3xl font-display font-semibold text-amber-600 mb-2">95%</div>
              <div className="text-sm text-stone-500">Success Rate</div>
            </div>
            <div className="card-premium text-center p-6">
              <div className="text-3xl font-display font-semibold text-amber-600 mb-2">10K+</div>
              <div className="text-sm text-stone-500">Items Reunited</div>
            </div>
            <div className="card-premium text-center p-6">
              <div className="text-3xl font-display font-semibold text-amber-600 mb-2">5K+</div>
              <div className="text-sm text-stone-500">Active Users</div>
            </div>
            <div className="card-premium text-center p-6">
              <div className="text-3xl font-display font-semibold text-amber-600 mb-2">24h</div>
              <div className="text-sm text-stone-500">Avg Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Use Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-20 px-4 sm:px-10 scroll-reveal"
        style={{
          background: 'linear-gradient(180deg, #FFF9ED 0%, #FFFDF8 100%)'
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium tracking-wide mb-4">
              Getting Started
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
              How to Use KhojSewa
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">


      {/* CTA Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-20 px-4 text-center scroll-reveal"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Join our community today and help make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ItemFound"
              className="group px-8 py-4 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-medium tracking-wide shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              Post Found Item
            </a>
            <a
              href="/Search"
              className="group px-8 py-4 rounded-md bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              Search Lost Items
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
