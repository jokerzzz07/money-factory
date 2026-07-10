import React from "react";
import logoImage from "../../pic/logo.jpg";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Icon */}
        <div
          id="header-brand-container"
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab("home")}
        >
          <img
            src={logoImage}
            alt="Money Factory"
            className="h-11 w-auto max-h-14 object-contain"
          />
          <div className="flex flex-col">
            <span
              id="brand-logo-text"
              className="font-sans text-xl font-extrabold tracking-tight text-primary-brand leading-none"
            >
              Money Factory
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Removed as requested) */}

        {/* Right CTA */}
        <div id="header-cta-container" className="flex items-center gap-3">
          {/* Get Started CTA and Mobile Menu Toggle (Removed as requested) */}
        </div>
      </div>

      {/* Mobile nav indicator bar (Removed as requested) */}
    </header>
  );
}
