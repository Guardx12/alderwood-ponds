import Image from "next/image"
import { CheckList, PageHero } from "@/components/layout"
import { cabins, camping } from "@/components/site-data"

export default function StayPage() {
  return (
    <main>
      <PageHero
        eyebrow="Stay on site"
        title="Cabins and camping"
        text="Fishing stays with reserved swims plus camping details and check-in information."
      />
      <section className="section container two-col">
        <div className="panel visual-panel">
          <div className="visual-thumb large-thumb">
            <Image src="/images/gallery/robins-retreat.jpg" alt="Robins Retreat cabin at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h2>Cabins with reserved swims</h2>
          <p className="panel-copy">
            Anglers Rest and Robins Retreat both include two reserved swims with up to three rods each and 24-hour
            fishing included.
          </p>
          <CheckList items={cabins} />
        </div>
        <div className="panel visual-panel">
          <div className="visual-thumb large-thumb">
            <Image src="/images/gallery/static-caravan.jpg" alt="Camping and caravan pitch at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h2>Camping</h2>
          <p className="panel-copy">
            Caravans, campers and tents are welcome, with day fishing tickets bought separately on the bank.
          </p>
          <CheckList items={camping} />
        </div>
      </section>
    </main>
  )
}
