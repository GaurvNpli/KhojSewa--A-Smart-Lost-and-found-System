import { useEffect, useRef } from 'react';

const AboutPreview = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div
        ref={sectionRef}
        className="max-w-4xl mx-auto text-center scroll-reveal"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium tracking-wide mb-6">
          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          About Our Mission
        </span>

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">KhojSewa</span>
        </h2>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8" />

        {/* Description */}
        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8">
          KhojSewa is a community-powered platform built to help you recover lost items and connect finders with rightful owners.
          With an elegant, easy-to-use interface, anyone can post or search in seconds.
        </p>

        <p className="text-lg text-stone-500 leading-relaxed mb-10">
          Together, we're building a more helpful and connected society — one reunited item at a time.
        </p>

        {/* CTA Link */}
        <a
          href="/about"
          className="group inline-flex items-center gap-3 text-stone-800 font-medium hover:text-amber-600 transition-colors duration-300"
        >
          Learn more about our story
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default AboutPreview;
