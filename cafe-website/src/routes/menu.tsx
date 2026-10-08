import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CAFE, MENU, whatsappLink, type Tag } from "@/lib/cafe";
import { Eyebrow, Section, WaIcon } from "@/components/Layout";

const title = `Menu — ${CAFE.name}, ${CAFE.city}`;
const description = `Coffee, cold drinks, snacks and desserts at ${CAFE.name}. Order on WhatsApp in one tap.`;

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MenuPage,
});

const tagStyle: Record<Tag, string> = {
  Bestseller: "bg-primary text-primary-foreground",
  Veg: "bg-accent text-accent-foreground",
  New: "bg-secondary text-secondary-foreground border",
};

function MenuPage() {
  const categories = Object.keys(MENU);
  const [active, setActive] = useState<string>(categories[0] ?? "Coffee");

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><Eyebrow>Our menu</Eyebrow><h1 className="mt-2 text-5xl">Made fresh, all day</h1></div>
        <a href={CAFE.menuPdf} download className="btn btn-outline">⬇ Download Menu as PDF</a>
      </div>

      {/* Category tabs */}
      <div role="tablist" className="mt-10 flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={active === c} onClick={() => setActive(c)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${active === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {(MENU[active] ?? []).map((item) => (
          <article key={item.name} className="card-lift flex gap-4 rounded-2xl border bg-card p-4">
            {item.image && <img src={item.image} alt={item.name} loading="lazy" width={816} height={816} className="h-24 w-24 shrink-0 rounded-xl object-cover" />}
            <div className="flex flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-xl">{item.name}</h2>
                <span className="font-semibold text-primary">{item.price}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {item.tags?.map((t) => <span key={t} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagStyle[t]}`}>{t}</span>)}
                <a href={whatsappLink(`Hi! I'd like to order: ${item.name} (${item.price})`)} target="_blank" rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                  <WaIcon className="h-4 w-4" />Order
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
