
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VirtualCard from '../components/VirtualCard';
import ProcessVisualization from '../components/ProcessVisualization';
import { PLATFORMS, CARD_COLORS, BRAND_NAME } from '../constants';

const Home: React.FC = () => {
  const [shattered, setShattered] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [cardColor, setCardColor] = useState<string>(CARD_COLORS[0].value);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Randomize initial card color
    const randomIdx = Math.floor(Math.random() * CARD_COLORS.length);
    setCardColor(CARD_COLORS[randomIdx].value);

    // Impact effects
    const timer = setTimeout(() => setShattered(true), 500);
    const iconTimer = setTimeout(() => setShowIcons(true), 1500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        clearTimeout(timer);
        clearTimeout(iconTimer);
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Shard generation
  const shards = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    tx: `${(Math.random() - 0.5) * 800}px`,
    ty: `${(Math.random() - 0.5) * 800}px`,
    tr: `${Math.random() * 360}deg`,
    size: `${20 + Math.random() * 60}px`,
    top: `${40 + Math.random() * 20}%`,
    left: `${45 + Math.random() * 10}%`,
  }));

  // Scroll visibility logic
  const scrollFade = Math.max(0, 1 - scrollY / 600);
  const backgroundTranslate = scrollY * 0.3;

  // Icons for the tight orbit around the card
  const orbitIcons = PLATFORMS.slice(0, 6);

  // Icons for the wide ecosystem (all services)
  const ecosystemIcons = [
    ...PLATFORMS,
    { id: 'figma', name: 'Figma', icon: 'fa-vector-square' },
    { id: 'slack', name: 'Slack', icon: 'fa-slack' },
    { id: 'github', name: 'GitHub', icon: 'fa-github' },
    { id: 'notion', name: 'Notion', icon: 'fa-note-sticky' },
    { id: 'apple', name: 'Apple Pay', icon: 'fa-apple' },
    { id: 'stripe', name: 'Stripe', icon: 'fa-cc-stripe' },
    { id: 'spotify', name: 'Spotify', icon: 'fa-spotify' },
    { id: 'steam', name: 'Steam', icon: 'fa-steam' },
    { id: 'discord', name: 'Discord Nitro', icon: 'fa-discord' },
    { id: 'openai', name: 'OpenAI', icon: 'fa-robot' },
  ];

  return (
    <div className={`relative overflow-hidden bg-slate-50 ${shattered ? 'animate-shake' : ''}`}>
      {/* Hero Section */}
      <section className="relative pt-12 pb-32 px-6 min-h-screen flex flex-col items-center justify-center">
        
        {/* Wide Ecosystem Icons (The Background Layer) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          style={{ opacity: scrollFade, transform: `translateY(-${backgroundTranslate}px)` }}
        >
          {ecosystemIcons.map((platform, idx) => {
            // Distribute widely in the space
            const angle = (idx / ecosystemIcons.length) * Math.PI * 2 + (idx * 0.5);
            const radius = 450 + (idx % 4) * 120; // Wide radius
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const delay = (idx * 0.3).toFixed(1);

            return (
              <div 
                key={`eco-${platform.id}-${idx}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity: showIcons ? 0.4 : 0,
                  transitionDelay: `${delay}s`,
                }}
              >
                <div 
                  className="w-14 h-14 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20 text-slate-400 animate-float"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <i className={`fa-solid ${platform.icon} text-xl`}></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Glass Shards Impact */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
           {shattered && shards.map(shard => (
             <div 
                key={shard.id}
                className="glass-shard"
                style={{
                  '--tx': shard.tx,
                  '--ty': shard.ty,
                  '--tr': shard.tr,
                  width: shard.size,
                  height: shard.size,
                  top: shard.top,
                  left: shard.left,
                } as any}
             />
           ))}
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-12 z-10">
          
          {/* Central Card Area with Orbit */}
          <div className="relative perspective-2000 py-10 h-[300px] flex items-center justify-center">
            
            {/* Tight Revolving Orbit Icons */}
            <div className="revolve-container" style={{ opacity: scrollFade }}>
                {orbitIcons.map((platform, idx) => (
                    <div 
                        key={`orbit-${platform.id}`}
                        className="revolving-icon"
                        style={{
                            animationDelay: `${idx * (12/orbitIcons.length)}s`,
                            opacity: showIcons ? 1 : 0,
                        }}
                    >
                        <i className={`fa-solid ${platform.icon} text-slate-800`}></i>
                    </div>
                ))}
            </div>

            <div className="animate-crash pulse-soft z-10">
              <VirtualCard 
                number="4532 8200 1928 3341"
                expiry="09/27"
                cvv="123"
                status="ACTIVE"
                color={cardColor}
              />
            </div>
          </div>

          <div className="animate-content-delayed space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase">
              <i className="fa-solid fa-lock"></i>
              Enhanced Security Masking Enabled
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-slate-900">
              Payments. <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400">
                Unlocked.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              VCard provides time-bound virtual international cards via UPI. 
              Secure, instant, and verified by Shaktiind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Link 
                to="/create" 
                className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/30 overflow-hidden"
              >
                <span className="relative z-10">Generate My VCard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link 
                to="/dashboard" 
                className="text-slate-600 font-bold px-10 py-5 hover:text-slate-900 transition-colors flex items-center gap-2"
              >
                Recent Activity
                <i className="fa-solid fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-32 px-6 border-t border-slate-100 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Why choose VCard?</h2>
            <p className="text-slate-400 font-medium">Global payments met Indian simplicity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="group space-y-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 transition-all group-hover:bg-slate-900 group-hover:text-white shadow-sm">
                <i className="fa-solid fa-shield-halved text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black tracking-tight">Dynamic Masking</h3>
              <p className="text-slate-500 leading-relaxed text-lg">Your actual card details are never exposed. Use masked numbers for one-time checkouts with total peace of mind.</p>
            </div>
            
            <div className="group space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 transition-all group-hover:bg-emerald-600 group-hover:text-white shadow-sm">
                <i className="fa-solid fa-bolt-lightning text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black tracking-tight">Instant UPI Link</h3>
              <p className="text-slate-500 leading-relaxed text-lg">No wallet to maintain. Just scan and pay for exactly what you need. Any leftover is auto-refunded to your bank.</p>
            </div>
            
            <div className="group space-y-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                <i className="fa-solid fa-hourglass-start text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black tracking-tight">Time-Bound Exit</h3>
              <p className="text-slate-500 leading-relaxed text-lg">Cards expire in 10 minutes. This eliminates the risk of hidden recurring charges or unauthorized data misuse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Process Visualization */}
      <ProcessVisualization />
    </div>
  );
};

export default Home;
