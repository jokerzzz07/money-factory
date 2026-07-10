import React, { useState } from "react";
import {
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
  X,
  Smartphone,
  Play,
  Download,
  Apple,
  Mail,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="global-app-footer" className="bg-[#081120] text-slate-200 font-sans mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr] items-start">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
            <div className="md:col-span-3 lg:col-span-2 xl:col-span-2 space-y-3">
              <button
                type="button"
                onClick={() => setActiveTab("home")}
                className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-2.5 transition duration-300 hover:bg-white/10 focus:outline-none"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-950 shadow-sm">
                  <span className="text-base font-semibold">M</span>
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold uppercase tracking-[0.20em] text-slate-100">Money Factory</p>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Premium Fintech Education</p>
                </div>
              </button>

              <p className="max-w-md text-sm leading-5 text-slate-300/90">
                Institutional trading education, live mentorship, and premium market tools for serious traders.
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300 shadow-[0_0_0_rgba(56,189,248,0)] transition duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]">
                Trusted by 10,000+ Traders
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
                  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
                  { label: "Telegram", icon: MessageCircle, href: "https://telegram.org" },
                  { label: "X", icon: X, href: "https://x.com" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/20 hover:bg-sky-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.16)]"
                  >
                    <item.icon className="h-5 w-5 transition duration-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-100">Explore</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("courses")}
                    className="transition-colors duration-200 hover:text-sky-400"
                  >
                    Trading Courses
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("indicators")}
                    className="transition-colors duration-200 hover:text-sky-400"
                  >
                    Premium Indicators
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("coach")}
                    className="transition-colors duration-200 hover:text-sky-400"
                  >
                    Live Sessions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("coach")}
                    className="transition-colors duration-200 hover:text-sky-400"
                  >
                    AI Trading Coach
                  </button>
                </li>
                <li>
                  <a href="#community" className="transition-colors duration-200 hover:text-sky-400">
                    Trading Community
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-100">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("home")}
                    className="transition-colors duration-200 hover:text-sky-400"
                  >
                    About
                  </button>
                </li>
                <li>
                  <a href="#success" className="transition-colors duration-200 hover:text-sky-400">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#careers" className="transition-colors duration-200 hover:text-sky-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="transition-colors duration-200 hover:text-sky-400">
                    Blog
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab("coach")}
                    className="transition-colors duration-200 hover:text-sky-400"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-100">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#help" className="transition-colors duration-200 hover:text-sky-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition-colors duration-200 hover:text-sky-400">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="transition-colors duration-200 hover:text-sky-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="transition-colors duration-200 hover:text-sky-400">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-100">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <a href="mailto:hello@moneyfactory.com" className="min-w-0 truncate transition-colors duration-200 hover:text-sky-400">
                    hello@moneyfactory.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="whitespace-nowrap transition-colors duration-200 hover:text-sky-400">+1 (212) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="leading-6">Mon - Fri, 9AM - 6PM ET</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                  <span className="block max-w-[18rem] leading-6">101 Wall Street, New York, NY</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.75fr_1fr] xl:grid-cols-[1.75fr_1fr]">
            <section className="rounded-[18px] border border-white/10 bg-[#101827]/70 p-4 shadow-[0_18px_40px_rgba(1,8,32,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
              <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Download the app</p>
                  <h2 className="text-xl font-semibold text-white sm:text-[1.8rem]">Download the Money Factory App</h2>
                  <p className="max-w-md text-sm leading-6 text-slate-300/90">
                    Learn and trade anywhere with our mobile application.
                  </p>
                </div>

                <div className="relative flex h-22 w-full max-w-[150px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/80 shadow-xl">
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-90" />
                  <div className="absolute inset-4 rounded-[20px] bg-slate-900/95 p-4 shadow-inner">
                    <div className="h-3 w-14 rounded-full bg-slate-700" />
                    <div className="mt-2.5 space-y-2">
                      <div className="h-3 w-18 rounded-full bg-slate-700" />
                      <div className="h-2.5 w-12 rounded-full bg-slate-700/80" />
                      <div className="mt-2.5 h-14 rounded-[18px] bg-gradient-to-b from-sky-500/15 to-transparent" />
                    </div>
                    <div className="mt-3 grid gap-2">
                      <div className="h-2 w-20 rounded-full bg-slate-700/80" />
                      <div className="h-2 w-12 rounded-full bg-slate-700/80" />
                    </div>
                  </div>
                  <Smartphone className="relative h-14 w-7 text-slate-400" />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href="#"
                  className="inline-flex h-9 w-full min-w-0 items-center gap-2 rounded-[18px] border border-white/10 bg-slate-950/90 px-2 text-xs sm:text-[11px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_12px_30px_rgba(37,99,235,0.16)]"
                >
                  <div className="flex h-7 w-7 min-w-[30px] items-center justify-center rounded-2xl bg-white/10">
                    <Play className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Get it on</p>
                    <p className="text-sm font-semibold text-white">Google Play</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 w-full min-w-0 items-center gap-2 rounded-[18px] border border-white/10 bg-slate-950/90 px-3 text-xs sm:text-[11px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_12px_30px_rgba(37,99,235,0.16)]"
                >
                  <div className="flex h-8 w-8 min-w-[34px] items-center justify-center rounded-2xl bg-white/10">
                    <Apple className="h-4 w-4 text-slate-100" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Download on the</p>
                    <p className="text-sm font-semibold text-white">App Store</p>
                  </div>
                </a>
              </div>
            </section>

            <section className="rounded-[18px] border border-white/10 bg-gradient-to-br from-slate-950/90 to-slate-900/80 p-4 shadow-[0_18px_40px_rgba(1,8,32,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Stay ahead of the market</p>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">Stay Ahead of the Market</h2>
                </div>
                <p className="text-sm leading-6 text-slate-300/90">
                  Receive market insights, trading tips, and course updates directly in your inbox.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="mt-4 grid gap-3">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-[18px] border border-white/10 bg-slate-950/80 px-12 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-slate-300/40 focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-[18px] bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-sky-400 hover:shadow-[0_12px_30px_rgba(56,189,248,0.18)]"
                >
                  Subscribe
                  <ArrowRight className="ml-3 h-4 w-4" />
                </button>
              </form>
              {subscribed && (
                <p className="mt-4 text-sm text-emerald-400">Subscription confirmed. Expect the next market update soon.</p>
              )}
            </section>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-3">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-sm leading-6 text-slate-500">© 2026 Money Factory. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <a href="#privacy" className="transition-colors duration-200 hover:text-sky-400">Privacy Policy</a>
              <a href="#terms" className="transition-colors duration-200 hover:text-sky-400">Terms of Service</a>
              <a href="#cookies" className="transition-colors duration-200 hover:text-sky-400">Cookies</a>
              <span className="hidden sm:inline">|</span>
              <span className="text-slate-400">Designed by Brevitus Technology</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
