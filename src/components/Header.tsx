import React from "react";
import { Instagram, Mail, MessageCircleMore, Phone, Send } from "lucide-react";
import logoImage from "../../pic/logo.jpg";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const socialItems = [
  {
    href: "https://www.instagram.com/trader_vicky1",
    label: "Follow Money Factory on Instagram",
    icon: Instagram,
    text: "",
    external: true,
  },
  {
    href: "https://t.me/money_factory_indicator",
    label: "Join Money Factory Telegram",
    icon: Send,
    text: "",
    external: true,
  },
  {
    href: "tel:+917522929338",
    label: "Call Money Factory",
    icon: Phone,
    text: "+91 7522 929 338",
    external: false,
  },
  {
    href: "mailto:vishalmoneyfactory@gmail.com",
    label: "Email Money Factory",
    icon: Mail,
    text: "vishalmoneyfactory@gmail.com",
    external: false,
  },
  {
    href: "https://wa.me/917522929338",
    label: "Chat with Money Factory on WhatsApp",
    icon: MessageCircleMore,
    text: "+91 7522 929 338",
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

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="tel:+917522929338"
              aria-label="Call Money Factory"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-700 transition duration-300 hover:scale-105 hover:border-[#00C853]/40 hover:bg-[#00C853]/10 hover:text-[#00C853]"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:vishalmoneyfactory@gmail.com"
              aria-label="Email Money Factory"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-700 transition duration-300 hover:scale-105 hover:border-[#00C853]/40 hover:bg-[#00C853]/10 hover:text-[#00C853]"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/trader_vicky1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Money Factory on Instagram"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-700 transition duration-300 hover:scale-105 hover:border-[#00C853]/40 hover:bg-[#00C853]/10 hover:text-[#00C853]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/money_factory_indicator"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Money Factory Telegram"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-700 transition duration-300 hover:scale-105 hover:border-[#00C853]/40 hover:bg-[#00C853]/10 hover:text-[#00C853]"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>

          <div id="header-social-links" className="hidden items-center gap-3 sm:flex sm:gap-4">
            {socialItems.map(({ href, label, icon: Icon, text, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-slate-700 transition duration-300 hover:scale-[1.02] hover:text-[#00C853] hover:underline hover:decoration-[#00C853] hover:decoration-2 hover:underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C853]/40 focus-visible:ring-offset-2"
              >
                <Icon className="h-5 w-5 shrink-0" />
                {text ? <span className={label === "Email Money Factory" ? "inline whitespace-nowrap" : "hidden sm:inline whitespace-nowrap"}>{text}</span> : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
