import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Video, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Apple, 
  Play, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  Smartphone, 
  Award, 
  Check, 
  ChevronRight, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign 
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CoursesList from "./components/CoursesList";
import TradingChart from "./components/TradingChart";
import AICoach from "./components/AICoach";
import mentorPortrait from "../pic/vi.jpg";

function AnimatedStat({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    let animationFrameId: number;

    const run = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(progress * value);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(run);
      }
    };
    animationFrameId = requestAnimationFrame(run);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Hero image path generated from image_generator tool
  const heroImagePath = "/src/assets/images/professional_trader_1783620398111.jpg";

  // Navigation callbacks
  const handleStartLearning = () => setActiveTab("courses");
  const handleExploreCourses = () => setActiveTab("courses");

  return (
    <div id="app-root-container" className="flex flex-col min-h-screen bg-white text-charcoal font-sans antialiased selection:bg-primary-blue/10 selection:text-primary-blue">
      {/* Header section */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content viewport */}
      <main id="app-main-content" className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-24 pb-24"
            >
              {/* Hero Section - Premium Two-Column Layout */}
              <section
                id="hero-section"
                className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24 lg:py-28"
              >
                {/* Decorative grid pattern in background */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#2563EB_1px,transparent_1px),linear-gradient(to_bottom,#2563EB_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
                    
                    {/* Left Column - Elite FinTech Typography & CTA */}
                    <div id="hero-left-col" className="space-y-8 text-left">
                      
                      {/* Premium Trust Badge */}
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary-blue/5 px-4 py-1.5 border border-primary-blue/10 shadow-[0_2px_12px_rgba(37,99,235,0.03)]">
                        <Star className="h-3 w-3 text-gold-premium fill-gold-premium" />
                        <span className="text-xs font-bold text-slate-800 tracking-wide">
                          Trustpilot <span className="text-primary-blue font-extrabold">4.9/5</span> Rating · Elite Financial Academy
                        </span>
                      </div>
 
                      {/* Large Premium Headline */}
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.05] font-black text-[#0B132B] tracking-tight">
                        Trade with the <br />
                        <span className="bg-gradient-to-r from-primary-blue to-blue-700 bg-clip-text text-transparent">
                          Precision of the 1%
                        </span>
                      </h1>
 
                      {/* Description Subheadline with increased line-spacing */}
                      <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
                        Skip retail trendlines and lagging indicators. Money Factory empowers you with pure, unmanipulated algorithmic orderflow mechanics, premium indicators, and live execution scripts.
                      </p>


 
                      {/* Redesigned Minimal & Premium Feature Cards */}
                      <div id="hero-features-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-4">
                        {[
                          { title: "Professional Courses", desc: "Master institutional SMC & Orderflow", icon: BookOpen },
                          { title: "Premium Indicators", desc: "Real-time FVG & Liquidity sweeps", icon: Activity },
                          { title: "Live Market Sessions", desc: "Daily interactive tape reading", icon: Video },
                          { title: "Trading Mentorship", desc: "1-on-1 feedback from funded experts", icon: Users },
                          { title: "Mobile Learning App", desc: "Study & get real-time signal feeds", icon: Smartphone }
                        ].map((feat, index) => {
                          const IconComponent = feat.icon;
                          return (
                            <motion.div 
                              key={index}
                              whileHover={{ y: -4, scale: 1.01 }}
                              className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,19,43,0.02)] hover:border-slate-200/80 hover:shadow-[0_12px_24px_-4px_rgba(11,19,43,0.06)] transition-all duration-300 cursor-default"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 text-primary-blue shrink-0 border border-blue-100/30">
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs font-bold text-[#0B132B] tracking-tight leading-none">{feat.title}</h4>
                                <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-snug">{feat.desc}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
 
                      {/* Download App badges row */}
                      <div id="hero-download-app-panel" className="space-y-3 pt-6 border-t border-slate-100 max-w-md">
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                          Download the Money Factory App
                        </h4>
                        <div className="flex items-center gap-3">
                          <a
                            id="hero-app-store-badge"
                            href="#app-store"
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-white/5 hover:bg-black transition-all duration-200 shadow-sm"
                          >
                            <Apple className="h-4 w-4 fill-white shrink-0" />
                            <div className="text-left leading-tight">
                              <span className="text-[8px] text-gray-400 block uppercase font-semibold">Download on the</span>
                              <span className="text-[10px] font-bold font-sans">App Store</span>
                            </div>
                          </a>
                          <a
                            id="hero-google-play-badge"
                            href="#google-play"
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl border border-white/5 hover:bg-black transition-all duration-200 shadow-sm"
                          >
                            <Play className="h-4 w-4 fill-white shrink-0" />
                            <div className="text-left leading-tight">
                              <span className="text-[8px] text-gray-400 block uppercase font-semibold">Get it on</span>
                              <span className="text-[10px] font-bold font-sans">Google Play</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
 
                    {/* Right Column: Redesigned Premium Hero Composition */}
                    <div id="hero-right-col" className="relative flex items-center justify-center min-h-[640px] lg:min-h-[720px] w-full mt-10 lg:mt-0 select-none">
                      
                      {/* Soft Blue Ambient Lighting & Glows */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-blue-500/8 blur-[120px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
                      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-indigo-500/5 blur-[100px] -z-10 pointer-events-none" />
                      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-emerald-500/4 blur-[80px] -z-10 pointer-events-none" />

                      {/* Precise Fine-line Trading Grid Backdrop */}
                      <svg className="absolute inset-0 w-full h-full opacity-[0.06] -z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="premium-fintech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0B132B" strokeWidth="0.75" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#premium-fintech-grid)" />
                      </svg>

                      {/* Dynamic Background Candlestick Graph & Trend Lines (Behind Mentor) */}
                      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
                        <svg className="w-full h-full max-w-[550px] max-h-[500px]" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Dotted target lines */}
                          <line x1="50" y1="120" x2="450" y2="120" stroke="#2563EB" strokeWidth="0.75" strokeDasharray="3 6" className="opacity-20" />
                          <line x1="50" y1="260" x2="450" y2="260" stroke="#10B981" strokeWidth="0.75" strokeDasharray="3 6" className="opacity-20" />
                          
                          {/* Smooth stock chart curve 1 (Emerald Trend) */}
                          <path
                            d="M 20 320 C 120 280, 160 380, 260 210 C 320 110, 380 180, 480 80"
                            stroke="url(#emerald-gradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-40"
                          />
                          {/* Smooth stock chart curve 2 (Royal Blue Trend) */}
                          <path
                            d="M 20 340 C 100 240, 180 320, 280 150 C 350 50, 410 120, 480 40"
                            stroke="url(#royal-blue-gradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="1 1"
                            className="opacity-30"
                          />

                          <defs>
                            <linearGradient id="emerald-gradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                            <linearGradient id="royal-blue-gradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#2563EB" />
                              <stop offset="100%" stopColor="#1D4ED8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* BACKDROP CARD 1: Portfolio Widget (Behind Mentor, slightly offset left) */}
                      <div className="absolute top-24 left-[2%] w-[200px] bg-white/40 backdrop-blur-md rounded-2xl border border-slate-200/30 p-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] -z-10 transform -rotate-2 select-none pointer-events-none">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-bold text-slate-700 tracking-tight font-sans">PORTFOLIO INDEX</span>
                          <span className="text-[9px] font-bold text-emerald-500 font-mono">+28.4%</span>
                        </div>
                        <div className="h-[40px] flex items-end gap-1 px-1">
                          {[35, 45, 28, 60, 52, 70, 85, 95].map((val, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/30 to-blue-600/80 rounded-t-xs" style={{ height: `${val}%` }} />
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-100/40">
                          <span className="text-[7px] text-slate-400 font-mono">D_ANALYSIS // L_RECON</span>
                          <span className="text-[7px] font-bold text-slate-500 font-mono">$184,290</span>
                        </div>
                      </div>

                      {/* BACKDROP CARD 2: Buy / Sell Signal Matrix (Behind Mentor, offset right) */}
                      <div className="absolute bottom-28 right-[4%] w-[180px] bg-slate-950/80 backdrop-blur-lg rounded-2xl border border-white/5 p-3.5 shadow-2xl -z-10 transform rotate-3 select-none pointer-events-none">
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5">
                          <span className="text-[8px] font-mono text-slate-400">LIQUIDITY MATRIX</span>
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-white">EUR/USD BUY</span>
                            <span className="text-emerald-400 font-bold">+42 pips</span>
                          </div>
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-slate-400">XAU/USD SELL</span>
                            <span className="text-rose-400 font-bold">Swept</span>
                          </div>
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-white">GBP/JPY BUY</span>
                            <span className="text-emerald-400 font-bold">+108 pips</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Professional Portrait of the Founder / Trading Mentor (Up-scaled by ~25-30%) */}
                      <motion.div 
                        className="relative w-[370px] h-[490px] sm:w-[440px] sm:h-[590px] lg:w-[470px] lg:h-[630px] xl:w-[500px] xl:h-[670px] flex items-end justify-center select-none z-10 lg:translate-y-14 lg:-mb-14"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {/* Cutout Photo styled with premium double shadow */}
                        <img
                          src={mentorPortrait}
                          alt="Alex Vance - Money Factory Founder & Chief Mentor"
                          className="w-full h-full object-cover object-top rounded-3xl shadow-[0_24px_50px_rgba(11,19,43,0.14)] border border-slate-200/50"
                          referrerPolicy="no-referrer"
                        />
                        {/* Soft premium fade-out at the bottom to merge seamlessly with the page */}
                        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 rounded-b-3xl" />
                        
                        {/* Absolute Overlay Team Badge inside the mentor frame */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-slate-200/40 shadow-xl flex items-center gap-3 z-20">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-slate-800 leading-none">Alex Vance</h4>
                            <p className="text-[10px] text-slate-400 mt-1.5 font-bold leading-none tracking-wide">Founder & Chief Trading Officer</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* 5 Glassmorphism Floating Cards Around the Mentor with Premium visual parameters */}
                      
                      {/* Card 1: 📈 Live Market */}
                      <motion.div
                        className="absolute top-[8%] -left-[4%] backdrop-blur-md bg-white/85 border border-slate-200/40 shadow-[0_12px_30px_rgba(11,19,43,0.06)] rounded-2xl p-4 flex items-center gap-3.5 z-30 select-none cursor-default"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 border border-emerald-500/20">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#0B132B] leading-none">Live Market</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-1">BTC +4.2% · Gold Buy</p>
                        </div>
                      </motion.div>

                      {/* Card 2: 📊 Premium Indicators */}
                      <motion.div
                        className="absolute top-[22%] -right-[4%] backdrop-blur-md bg-white/85 border border-slate-200/40 shadow-[0_12px_30px_rgba(11,19,43,0.06)] rounded-2xl p-4 flex items-center gap-3.5 z-30 select-none cursor-default"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 6.6, ease: "easeInOut", delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue shrink-0 border border-blue-500/20">
                          <Activity className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#0B132B] leading-none">Premium Indicators</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-1">FVG & Orderflow Matrix</p>
                        </div>
                      </motion.div>

                      {/* Card 3: 🎓 Expert Mentorship */}
                      <motion.div
                        className="absolute bottom-[30%] -left-[8%] backdrop-blur-md bg-white/85 border border-slate-200/40 shadow-[0_12px_30px_rgba(11,19,43,0.06)] rounded-2xl p-4 flex items-center gap-3.5 z-30 select-none cursor-default"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut", delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 shrink-0 border border-violet-500/20">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#0B132B] leading-none">Expert Mentorship</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-1">1-on-1 Session Access</p>
                        </div>
                      </motion.div>

                      {/* Card 4: 📱 Mobile Learning */}
                      <motion.div
                        className="absolute bottom-[18%] -right-[6%] backdrop-blur-md bg-white/85 border border-slate-200/40 shadow-[0_12px_30px_rgba(11,19,43,0.06)] rounded-2xl p-4 flex items-center gap-3.5 z-30 select-none cursor-default"
                        animate={{ y: [0, -11, 0] }}
                        transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shrink-0 border border-amber-500/20">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#0B132B] leading-none">Mobile Learning</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-1">Real-Time Signal Feeds</p>
                        </div>
                      </motion.div>

                      {/* Card 5: 💹 Trade Analytics */}
                      <motion.div
                        className="absolute -bottom-[2%] left-[10%] backdrop-blur-md bg-white/85 border border-slate-200/40 shadow-[0_12px_30px_rgba(11,19,43,0.06)] rounded-2xl p-4 flex items-center gap-3.5 z-30 select-none cursor-default"
                        animate={{ y: [0, -7, 0] }}
                        transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0 border border-indigo-500/20">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-[#0B132B] leading-none">Trade Analytics</h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-1">Risk/Reward 1:3.5 Ratio</p>
                        </div>
                      </motion.div>

                    </div>
 
                  </div>
 
                </div>
              </section>
 
              {/* Trust Section - Floating Statistics Cards with Soft Shadows & Live Counters */}
              <section id="trust-stats-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Stat Card 1 */}
                  <motion.div 
                    id="stat-card-students"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/5 text-primary-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={10000} suffix="+" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      Active Students
                    </span>
                  </motion.div>
 
                  {/* Stat Card 2 */}
                  <motion.div 
                    id="stat-card-sessions"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/5 text-primary-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={500} suffix="K+" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      App Downloads
                    </span>
                  </motion.div>
 
                  {/* Stat Card 3 */}
                  <motion.div 
                    id="stat-card-trustpilot"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/5 text-primary-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Video className="h-6 w-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={100} suffix="+" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      Live Sessions
                    </span>
                  </motion.div>
 
                  {/* Stat Card 4 */}
                  <motion.div 
                    id="stat-card-satisfaction"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/5 text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={4.9} decimals={1} suffix="★" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      Student Rating
                    </span>
                  </motion.div>
 
                </div>
              </section>

              {/* Testimonials Section */}
              <section id="testimonials-section" className="w-full space-y-12">
                <div className="text-center space-y-3 px-4 sm:px-6 lg:px-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-blue/5 px-3.5 py-1.5 text-xs font-semibold text-primary-blue uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5" /> Track Record
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-primary-brand">
                    What Our Funded Traders Say
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xl mx-auto">
                    Real retail traders who transitioned to institutional capital and automated mechanical strategies.
                  </p>
                </div>

                {/* Seamless Scrolling Marquee (Right to Left) */}
                <div className="relative w-full overflow-hidden">
                  {/* Left and Right Fade Gradients */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                  <div className="animate-marquee flex gap-6 py-6 px-4">
                    {[
                      {
                        id: "james",
                        name: "James Wilson",
                        role: "Funded Trader",
                        quote: "The institutional strategy course changed my entire perspective on how the markets work. I finally understand the 'why' behind price movements.",
                        avatar: "https://picsum.photos/seed/james_wilson/150/150",
                        rating: 5,
                      },
                      {
                        id: "sarah",
                        name: "Sarah Jenkins",
                        role: "Retail Trader",
                        quote: "Their indicators are world-class. No lag, just pure price action data transformed into actionable signals. Best investment I've made.",
                        avatar: "https://picsum.photos/seed/sarah_jenkins/150/150",
                        rating: 5,
                      },
                      {
                        id: "marcus",
                        name: "Marcus Thorne",
                        role: "Swing Trader",
                        quote: "The 1-on-1 mentorship sessions were worth every penny. I went from losing 2% every week to consistent profitability in just 3 months.",
                        avatar: "https://picsum.photos/seed/marcus_thorne/150/150",
                        rating: 5,
                      },
                      {
                        id: "david",
                        name: "David K.",
                        role: "$200K Funded Specialist",
                        quote: "Money Factory's automated mechanics are phenomenal. I passed my prop firm challenge in under 12 days using their liquidity sweeps indicator.",
                        avatar: "https://picsum.photos/seed/david_k/150/150",
                        rating: 5,
                      },
                      {
                        id: "elena",
                        name: "Elena Rostova",
                        role: "Full-Time Day Trader",
                        quote: "The live trading room sessions provide institutional order flow insights that you simply cannot find on YouTube. Highly recommended!",
                        avatar: "https://picsum.photos/seed/elena_r/150/150",
                        rating: 5,
                      },
                      {
                        id: "brandon",
                        name: "Brandon Vance",
                        role: "SMC Enthusiast",
                        quote: "Pure market mastery. The FVG indicators have completely transformed my entry precision. Risk-to-reward ratio has gone through the roof.",
                        avatar: "https://picsum.photos/seed/brandon_v/150/150",
                        rating: 5,
                      }
                    ].concat([
                      {
                        id: "james",
                        name: "James Wilson",
                        role: "Funded Trader",
                        quote: "The institutional strategy course changed my entire perspective on how the markets work. I finally understand the 'why' behind price movements.",
                        avatar: "https://picsum.photos/seed/james_wilson/150/150",
                        rating: 5,
                      },
                      {
                        id: "sarah",
                        name: "Sarah Jenkins",
                        role: "Retail Trader",
                        quote: "Their indicators are world-class. No lag, just pure price action data transformed into actionable signals. Best investment I've made.",
                        avatar: "https://picsum.photos/seed/sarah_jenkins/150/150",
                        rating: 5,
                      },
                      {
                        id: "marcus",
                        name: "Marcus Thorne",
                        role: "Swing Trader",
                        quote: "The 1-on-1 mentorship sessions were worth every penny. I went from losing 2% every week to consistent profitability in just 3 months.",
                        avatar: "https://picsum.photos/seed/marcus_thorne/150/150",
                        rating: 5,
                      },
                      {
                        id: "david",
                        name: "David K.",
                        role: "$200K Funded Specialist",
                        quote: "Money Factory's automated mechanics are phenomenal. I passed my prop firm challenge in under 12 days using their liquidity sweeps indicator.",
                        avatar: "https://picsum.photos/seed/david_k/150/150",
                        rating: 5,
                      },
                      {
                        id: "elena",
                        name: "Elena Rostova",
                        role: "Full-Time Day Trader",
                        quote: "The live trading room sessions provide institutional order flow insights that you simply cannot find on YouTube. Highly recommended!",
                        avatar: "https://picsum.photos/seed/elena_r/150/150",
                        rating: 5,
                      },
                      {
                        id: "brandon",
                        name: "Brandon Vance",
                        role: "SMC Enthusiast",
                        quote: "Pure market mastery. The FVG indicators have completely transformed my entry precision. Risk-to-reward ratio has gone through the roof.",
                        avatar: "https://picsum.photos/seed/brandon_v/150/150",
                        rating: 5,
                      }
                    ]).map((testimonial, index) => (
                      <div
                        key={`${testimonial.id}-${index}`}
                        id={`testimonial-card-${testimonial.id}-${index}`}
                        className="w-[300px] sm:w-[380px] shrink-0 rounded-2xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed font-normal">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-100">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-blue/10"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{testimonial.name}</h4>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                              {testimonial.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              key="courses-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <CoursesList />
            </motion.div>
          )}

          {activeTab === "indicators" && (
            <motion.div
              key="indicators-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <TradingChart />
            </motion.div>
          )}

          {activeTab === "coach" && (
            <motion.div
              key="coach-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <AICoach />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer section */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
