import React from "react";
import { Instagram, MessageCircleMore, Phone, Send } from "lucide-react";
import logoImage from "../../pic/logo.jpg";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const socialItems = [
  {
    href: "https://www.instagram.com/money_factory_app?igsh=Z2p4NGZlcGpjZjZ3&utm_source=qr",
    label: "Follow Money Factory on Instagram",
    icon: Instagram,
    external: true,
  },
  {
    href: "https://telegram.me/+Ile_VK3qSwM3Nzhl",
    label: "Join Money Factory Telegram",
    icon: Send,
    external: true,
  },
  {
    href: "tel:+917522929338",
    label: "Call Money Factory",
    icon: Phone,
    external: false,
  },
  {
    href: "https://wa.me/917522929338",
    label: "Chat with Money Factory on WhatsApp",
    icon: MessageCircleMore,
    external: true,
  },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <div
          id="header-brand-container"
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab("home")}
        >
          <img
            src={logoImage}
            alt="Money Factory"
            className="h-8 w-auto max-h-10 object-contain sm:h-11 sm:max-h-14"
          />
          <div className="flex flex-col">
            <span
              id="brand-logo-text"
              className="font-sans text-base font-extrabold leading-none tracking-tight text-primary-brand sm:text-xl"
            >
              Money Factory
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div
            id="header-social-links"
            className="flex items-center gap-1.5 sm:gap-2.5"
          >
            {socialItems.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-sm shadow-slate-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-[#00C853]/40 hover:bg-[#00C853]/10 hover:text-[#00C853] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C853]/40 focus-visible:ring-offset-2"
              >
                <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
