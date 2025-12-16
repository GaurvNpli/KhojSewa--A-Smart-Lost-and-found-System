const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-950 text-white h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Enhanced Gradient Background with Parallax Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-950"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Premium Floating Orbs with Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float-orb"></div>
        <div className="absolute inset-10 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-2xl animate-pulse-orb"></div>
      </div>

      <div className="absolute bottom-1/4 right-1/4 w-80 h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-orb-delayed"></div>
        <div className="absolute inset-10 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-2xl animate-pulse-orb-delayed"></div>
      </div>

      {/* Animated Geometric Shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 border-2 border-white/10 rounded-3xl animate-rotate-slow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-white/10 rounded-full animate-rotate-reverse-slow"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/5 rounded-lg animate-spin-slow"></div>

      {/* Premium Light Beams */}
      <div className="absolute top-0 left-1/2 w-1 h-1/3 bg-gradient-to-b from-white/0 via-white/20 to-white/0 animate-beam"></div>
      <div className="absolute top-0 right-1/3 w-1 h-1/4 bg-gradient-to-b from-white/0 via-white/15 to-white/0 animate-beam-delayed"></div>

      {/* Micro Particle System */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content - Premium Glass Morphism */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 p-8 sm:p-12 md:p-16 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden group animate-fade-in-up">
          
          {/* Inner Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
          
          {/* Border Animation */}
          <div className="absolute inset-0 rounded-3xl p-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 animate-border-rotate"></div>
          </div>

          <div className="relative z-10">
            {/* Premium Typography with Gradient Text */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 animate-text-glow">
                  Lost Something?
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-text-glow-delayed">
                  Found Something?
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-delayed">
                Reuniting people with their belongings through our premium reconnection service.
                Fast, secure, and elegantly simple.
              </p>
            </div>

            {/* Premium Stats Counter */}
            <div className="flex justify-center gap-8 sm:gap-12 mb-10 animate-slide-up">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-count" data-count="95">95%</div>
                <div className="text-sm sm:text-base text-white/60 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-count" data-count="24">24h</div>
                <div className="text-sm sm:text-base text-white/60 font-medium">Average Recovery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-count" data-count="10k">10K+</div>
                <div className="text-sm sm:text-base text-white/60 font-medium">Items Recovered</div>
              </div>
            </div>

            {/* Premium Action Buttons with Hover Effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delayed">
              <a
                href="/Search"
                className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Post Lost Item
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>
              
              <a
                href="/ItemFound"
                className="group relative overflow-hidden px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 font-semibold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Post Found Item
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 text-center">
              <p className="text-sm text-white/50 font-light animate-fade-in">
                Trusted by thousands • End-to-end encryption • 24/7 Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow hidden sm:block">
        <div className="relative">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-scroll"></div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/50 font-light tracking-widest">
            EXPLORE
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or style tag */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(50px) translateX(50px); }
        }
        
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        
        @keyframes pulse-orb {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes beam {
          0% { transform: translateY(-100%) rotate(45deg); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(100vh) rotate(45deg); opacity: 0; }
        }
        
        @keyframes particle {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px) scale(0); opacity: 0; }
        }
        
        @keyframes border-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-grid-move {
          animation: gridMove 20s linear infinite;
        }
        
        .animate-float-orb {
          animation: float-orb 15s ease-in-out infinite;
        }
        
        .animate-float-orb-delayed {
          animation: float-orb 18s ease-in-out infinite 1s;
        }
        
        .animate-pulse-orb {
          animation: pulse-orb 4s ease-in-out infinite;
        }
        
        .animate-pulse-orb-delayed {
          animation: pulse-orb 5s ease-in-out infinite 0.5s;
        }
        
        .animate-beam {
          animation: beam 3s ease-in-out infinite;
        }
        
        .animate-beam-delayed {
          animation: beam 3s ease-in-out infinite 1.5s;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-border-rotate {
          animation: border-rotate 20s linear infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-text-glow-delayed {
          animation: text-glow 3s ease-in-out infinite 1.5s;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        .animate-count {
          transition: all 1s ease-out;
        }
        
        .animate-count[data-count]::after {
          content: attr(data-count);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;