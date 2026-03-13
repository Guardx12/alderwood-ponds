import Image from "next/image"
import { CheckList, PageHero } from "@/components/layout"
import { cabins, camping, dayTickets, nightFishing } from "@/components/site-data"

export default function PricesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Prices"
        title="Prices and stays"
        text="Day fishing, night fishing, cabins and camping details in one place for quick reference."
      />
      <section className="section container price-sections">
        <div className="panel"><h2>Day tickets</h2><CheckList items={dayTickets} /></div>
        <div className="panel"><h2>Night fishing</h2><CheckList items={nightFishing} /></div>
        <div className="panel visual-panel"><div className="visual-thumb"><Image src="/images/gallery/robins-retreat.jpg" alt="Cabin by the lake" fill className="image-fill" /></div><h2>Cabins</h2><CheckList items={cabins.slice(0, 12)} /></div>
        <div className="panel visual-panel"><div className="visual-thumb"><Image src="/images/gallery/static-caravan.jpg" alt="Camping and caravan area" fill className="image-fill" /></div><h2>Camping</h2><CheckList items={camping} /></div>
      </section>
    </main>
  )
}
