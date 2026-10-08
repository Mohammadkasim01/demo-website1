import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { CAFE, whatsappLink } from "@/lib/cafe";

/** Simple WhatsApp icon */
export const WaIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1.1Z" />
  </svg>
);

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About & Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-xl font-semibold text-primary">☕ {CAFE.name}</Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground transition hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-accent py-2 text-sm"><WaIcon className="h-4 w-4" />Order on WhatsApp</a>
        </div>
        <button className="md:hidden p-2 text-primary" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 border-t px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 font-medium">{l.label}</Link>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-accent mt-2"><WaIcon />Order on WhatsApp</a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-espresso text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">{CAFE.name}</p>
          <p className="mt-2 text-sm opacity-80">{CAFE.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Visit</p>
          <p className="opacity-80">{CAFE.address}</p>
          <a href={`tel:${CAFE.phoneDigits}`} className="mt-2 block opacity-80 hover:opacity-100">{CAFE.phone}</a>
          <a href={CAFE.instagram} target="_blank" rel="noreferrer" className="mt-2 block opacity-80 hover:opacity-100">Instagram ↗</a>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Quick links</p>
          {links.map((l) => <Link key={l.to} to={l.to} className="block py-1 opacity-80 hover:opacity-100">{l.label}</Link>)}
        </div>
        {/* QR CODE SPOT: replace this box with an <img src="/menu-qr.png" alt="Menu QR code" /> */}
        <div className="text-sm">
          <p className="mb-3 font-semibold">Scan our menu</p>
          <div className="flex h-28 w-28 items-center justify-center rounded-lg border-2 border-dashed border-cream/40 text-center text-xs opacity-70">QR code<br />goes here</div>
        </div>
      </div>
      <p className="border-t border-cream/15 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} {CAFE.name}, {CAFE.city}</p>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition hover:scale-110">
      <WaIcon className="h-7 w-7" />
    </a>
  );
}

export function Hours() {
  return (
    <ul className="space-y-2">
      {CAFE.hours.map((h) => (
        <li key={h.days} className="flex justify-between gap-6 border-b border-dashed pb-2"><span className="font-medium">{h.days}</span><span className="text-muted-foreground">{h.time}</span></li>
      ))}
    </ul>
  );
}

export function MapEmbed({ className = "h-64" }: { className?: string }) {
  return <iframe title={`Map to ${CAFE.name}`} src={CAFE.mapEmbed} loading="lazy" className={`w-full rounded-2xl border ${className}`} />;
}

export const Section = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`mx-auto max-w-6xl px-4 py-16 ${className}`}>{children}</section>
);

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{children}</p>
);
