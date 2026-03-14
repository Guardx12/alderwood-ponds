import { CheckList, PageHero } from "@/components/layout"
import { cabins, camping } from "@/components/site-data"

export default function StayPage() {
  return (
    <main>
      <PageHero
        eyebrow="Stay on site"
        title="Cabins and camping"
        text="Fishing shelters with reserved swims plus camping from May to September."
        image="/images/hero-lake.webp"
      />
      <section className="section container two-col">
        <div className="panel">
          <h2>Fishing shelters with reserved swims</h2>
          <p className="panel-copy">
            Robins Retreat is situated lakeside with your own reserved swim in front and fishing included day and night.
            Anglers Rest is situated by the camping field with parking all year round and a reserved swim in front.
          </p>
          <CheckList items={cabins} />
        </div>
        <div className="panel">
          <h2>Camping</h2>
          <p className="panel-copy">
            Caravans, campers and tents are welcome from May to September. Fishing is not included with camping and
            tickets should be bought separately on the bank from the bailiff.
          </p>
          <CheckList items={camping} />
        </div>
      </section>
    </main>
  )
}
