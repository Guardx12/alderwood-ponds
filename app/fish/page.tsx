import Image from "next/image"
import { CheckList, PageHero } from "@/components/layout"
import { fishSizes, waters } from "@/components/site-data"

export default function FishPage() {
  return (
    <main>
      <PageHero
        eyebrow="Fish"
        title="Fish sizes and waters"
        text="Three waters on site with carp to 38lb 8oz, tench, perch, roach, rudd and golden orfe."
      />
      <section className="section container feature-split reverse-on-mobile">
        <div className="panel soft-panel">
          <h2>Waters on site</h2>
          <CheckList items={waters} />
        </div>
        <div className="image-card tall">
          <Image src="/images/gallery/island-lake.jpg" alt="Island Lake at Alderwood Ponds" fill className="image-fill" />
          <div className="image-caption overlay">Three waters with different character and access</div>
        </div>
      </section>
      <section className="section container two-col">
        <div className="panel">
          <h2>Fish sizes</h2>
          <CheckList items={fishSizes} />
        </div>
        <div className="mosaic-grid compact">
          <div className="image-card"><Image src="/images/gallery/home-hero.webp" alt="Lake view" fill className="image-fill" /></div>
          <div className="image-card"><Image src="/images/gallery/peg-view.jpg" alt="Fishing peg" fill className="image-fill" /></div>
          <div className="image-card"><Image src="/images/gallery/rods-view.jpg" alt="Rods by the lake" fill className="image-fill" /></div>
          <div className="image-card"><Image src="/images/gallery/lake-bank.jpg" alt="Lake bank" fill className="image-fill" /></div>
        </div>
      </section>
    </main>
  )
}
