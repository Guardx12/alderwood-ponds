import { CheckList, PageHero } from "@/components/layout"
import { cabins, camping, dayTickets, nightFishing } from "@/components/site-data"

export default function PricesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Prices"
        title="Prices for day tickets, nights, cabins and camping"
        text="All the pricing information kept on its own page for quick reference."
        image="/images/hero-lake.webp"
      />
      <section className="section container price-sections">
        <div className="panel"><h2>Day tickets</h2><CheckList items={dayTickets} /></div>
        <div className="panel"><h2>Night fishing</h2><CheckList items={nightFishing} /></div>
        <div className="panel"><h2>Fishing shelters</h2><CheckList items={cabins} /></div>
        <div className="panel"><h2>Camping</h2><CheckList items={camping} /></div>
      </section>
    </main>
  )
}
