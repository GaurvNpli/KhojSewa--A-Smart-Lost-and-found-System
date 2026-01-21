import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Add subtle parallax effect on mouse move
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      const orbs = heroRef.current.querySelectorAll('.floating-orb');
      orbs.forEach((orb, index) => {
        const factor = (index + 1) * 0.5;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF9ED 50%, #FFF3DC 100%)'
      }}
    >
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 163, 115, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating Golden Orbs */}
      <div className="floating-orb absolute top-1/4 left-1/5 w-72 h-72 transition-transform duration-700 ease-out">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-orange-100/20 rounded-full blur-3xl animate-premium-float" />
      </div>

      <div className="floating-orb absolute bottom-1/3 right-1/4 w-96 h-96 transition-transform duration-700 ease-out">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100/50 to-amber-50/30 rounded-full blur-3xl animate-premium-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="floating-orb absolute top-1/3 right-1/5 w-48 h-48 transition-transform duration-700 ease-out">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/60 to-cream-100/40 rounded-full blur-2xl animate-premium-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-stone-300 to-transparent opacity-50" />
      <div className="absolute top-40 right-16 w-px h-24 bg-gradient-to-b from-transparent via-amber-200 to-transparent opacity-40" />
      <div className="absolute bottom-32 left-20 w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-50" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-br from-amber-300/60 to-amber-400/40 rounded-full animate-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
        <div className="text-center">
          {/* Tagline */}
          <div className="animate-elegant-fade-up mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200/50 text-sm font-medium text-stone-600 tracking-wide">
              <span className="w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full animate-pulse" />
              Nepal's Premier Lost & Found Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-elegant-fade-up-delay-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-stone-900 mb-6 leading-[1.1] tracking-tight">
            <span className="block">Lost Something</span>
            <span className="block mt-2 relative inline-block">
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Precious?
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M0 4C50 0 100 8 200 4" stroke="url(#gold-gradient)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gold-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="#D4A373" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="animate-elegant-fade-up-delay-2 text-lg sm:text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Reuniting people with their belongings through our
            <span className="font-medium text-stone-800"> elegant reconnection service</span>.
            Fast, secure, and beautifully simple.
          </p>

          {/* CTA Buttons */}
          <div className="animate-elegant-fade-up-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/Search"
              className="group relative overflow-hidden px-8 py-4 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-medium tracking-wide shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 w-full sm:w-auto text-center min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Report Lost Item
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/20 to-amber-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>

            <a
              href="/ItemFound"
              className="group relative overflow-hidden px-8 py-4 rounded-md bg-white/80 backdrop-blur-sm border border-stone-300 hover:border-stone-400 hover:bg-white text-stone-800 font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 w-full sm:w-auto text-center min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Post Found Item
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 animate-elegant-fade-up-delay-4">
            <div className="flex items-center justify-center gap-6 text-sm text-stone-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted by thousands
              </span>
              <span className="w-1 h-1 bg-stone-300 rounded-full" />
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure & Private
              </span>
              <span className="w-1 h-1 bg-stone-300 rounded-full hidden sm:block" />
              <span className="hidden sm:flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;