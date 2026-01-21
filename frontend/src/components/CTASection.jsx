import { useEffect, useRef } from 'react';

const CTASection = () => {
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
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #1A1A1A 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 163, 115, 0.3) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-stone-500/10 to-amber-500/5 rounded-full blur-3xl" />

      <div
        ref={sectionRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center scroll-reveal"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-amber-300 text-sm font-medium tracking-wide mb-8">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          Join Our Community
        </span>

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
          Ready to Help or
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300">
            Get Help?
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users helping each other reunite with their belongings daily.
          Every connection matters.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/ItemFound"
            className="group relative overflow-hidden px-10 py-4 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Post Found Item
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>

          <a
            href="/Search"
            className="group px-10 py-4 rounded-md bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-medium tracking-wide transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-3">
              Search Lost Items
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </a>
        </div>


      </div>
    </section>
  );
};

export default CTASection;
