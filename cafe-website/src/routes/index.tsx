import { createFileRoute, Link } from "@tanstack/react-router";
import { CAFE, IMAGES, REVIEWS, SIGNATURES } from "@/lib/cafe";
import { Eyebrow, Hours, MapEmbed, Section } from "@/components/Layout";

const title = `${CAFE.name} — Cozy Cafe in ${CAFE.city}`;
const description = `${CAFE.tagline} Fresh coffee, cozy seating and free Wi-Fi at ${CAFE.name}, ${CAFE.city}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

const reasons = [
  { icon: "☕", title: "Fresh coffee", text: "Beans roasted weekly, brewed with care." },
  { icon: "🛋️", title: "Cozy seating", text: "Sofas, sunny windows and quiet corners." },
  { icon: "📶", title: "Free Wi-Fi", text: "Fast and free — stay as long as you like." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <img src={IMAGES.hero} alt={`Inside ${CAFE.name}`} width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 text-cream">
          <p className="text-sm uppercase tracking-[0.25em] opacity-90">{CAFE.city}</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight sm:text-7xl">{CAFE.name}</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">{CAFE.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <Link to="/about" className="btn btn-ghost">Visit Us</Link>
          </div>
        </div>
      </section>

      {/* SIGNATURE ITEMS */}
      <Section>
        <Eyebrow>Signature items</Eyebrow>
        <h2 className="mt-2 text-4xl">Loved by our regulars</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNATURES.map((item) => (
            <article key={item.name} className="card-lift overflow-hidden rounded-2xl border bg-card">
              <img src={item.image} alt={item.name} loading="lazy" width={816} height={816} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl">{item.name}</h3>
                  <span className="font-semibold text-primary">{item.price}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* WHY CHOOSE US */}
      <section className="bg-secondary">
        <Section>
          <Eyebrow>Why choose us</Eyebrow>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-2xl" aria-hidden="true">{r.icon}</div>
                <h3 className="mt-4 text-2xl">{r.title}</h3>
                <p className="mt-1 text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* REVIEWS */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><Eyebrow>Reviews</Eyebrow><h2 className="mt-2 text-4xl">What guests say</h2></div>
          <a href={CAFE.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn btn-outline">See more on Google ↗</a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card-lift rounded-2xl border bg-card p-6">
              <p className="text-star" aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}<span className="opacity-30">{"★".repeat(5 - r.stars)}</span></p>
              <blockquote className="mt-3">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* HOURS + MAP */}
      <Section className="grid gap-10 md:grid-cols-2">
        <div>
          <Eyebrow>Opening hours</Eyebrow>
          <h2 className="mb-6 mt-2 text-4xl">Come say hello</h2>
          <Hours />
          <p className="mt-6 text-muted-foreground">{CAFE.address}</p>
        </div>
        <MapEmbed className="h-72 md:h-full" />
      </Section>
    </>
  );
}
