import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CAFE, GALLERY, whatsappLink } from "@/lib/cafe";
import { Eyebrow, Hours, MapEmbed, Section } from "@/components/Layout";

const title = `About & Contact — ${CAFE.name}`;
const description = `Our story, photos, opening hours and table reservations at ${CAFE.name}, ${CAFE.city}.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

const inputCls = "w-full rounded-xl border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

function AboutPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Reservation form: sends the booking to WhatsApp
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Table reservation\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nDate: ${f.get("date")}\nTime: ${f.get("time")}\nGuests: ${f.get("guests")}`;
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <>
      {/* OUR STORY */}
      <Section className="max-w-3xl">
        <Eyebrow>Our story</Eyebrow>
        <h1 className="mt-2 text-5xl">A small cafe with a big heart</h1>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground">
          <p>{CAFE.name} began as a weekend coffee cart run by two friends who couldn't find a cup they loved in {CAFE.city}.</p>
          <p>Today we roast in small batches, bake every morning, and keep the music low so conversations can be loud.</p>
          <p>What makes us different? We know our regulars by name — and we'd love to know yours.</p>
        </div>
      </Section>

      {/* GALLERY */}
      <Section className="pt-0">
        <Eyebrow>Gallery</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <button key={i} onClick={() => setLightbox(i)} className="overflow-hidden rounded-xl" aria-label={`Open photo: ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="aspect-square w-full object-cover transition duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </Section>
      {lightbox !== null && GALLERY[lightbox] && (
        <div role="dialog" aria-modal="true" onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/90 p-4">
          <img src={GALLERY[lightbox]!.src} alt={GALLERY[lightbox]!.alt} className="max-h-[85vh] max-w-full rounded-xl" />
          <button className="absolute right-5 top-5 text-3xl text-cream" aria-label="Close">✕</button>
        </div>
      )}

      {/* CONTACT + HOURS + MAP */}
      <Section className="grid gap-10 md:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-2 text-4xl">Get in touch</h2>
          <div className="mt-6 flex flex-col gap-3">
            <a href={`tel:${CAFE.phoneDigits}`} className="btn btn-primary justify-start">📞 Call {CAFE.phone}</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-accent justify-start">💬 WhatsApp us</a>
            <a href={`mailto:${CAFE.email}`} className="btn btn-outline justify-start">✉️ {CAFE.email}</a>
          </div>
          <h3 className="mb-4 mt-10 text-2xl">Opening hours</h3>
          <Hours />
        </div>
        <div className="flex flex-col gap-4">
          <MapEmbed className="h-80" />
          <p className="text-muted-foreground">{CAFE.address}</p>
          <a href={CAFE.directionsUrl} target="_blank" rel="noreferrer" className="btn btn-primary self-start">Get Directions ↗</a>
        </div>
      </Section>

      {/* RESERVATION FORM */}
      <Section className="max-w-2xl">
        <div className="rounded-3xl border bg-secondary p-8">
          <Eyebrow>Reserve a table</Eyebrow>
          <h2 className="mt-2 text-3xl">Book your spot</h2>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-medium">Name</span><input name="name" required maxLength={80} className={inputCls} /></label>
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-medium">Phone</span><input name="phone" type="tel" required maxLength={20} className={inputCls} /></label>
            <label><span className="mb-1 block text-sm font-medium">Date</span><input name="date" type="date" required className={inputCls} /></label>
            <label><span className="mb-1 block text-sm font-medium">Time</span><input name="time" type="time" required className={inputCls} /></label>
            <label className="sm:col-span-2"><span className="mb-1 block text-sm font-medium">Number of guests</span><input name="guests" type="number" min={1} max={20} defaultValue={2} required className={inputCls} /></label>
            <button type="submit" className="btn btn-primary sm:col-span-2">Send reservation request</button>
          </form>
        </div>
      </Section>
    </>
  );
}
