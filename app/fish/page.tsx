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
      <section className="section container two-col">
        <div className="panel">
          <h2>Waters on site</h2>
          <CheckList items={waters} />
        </div>
        <div className="panel">
          <h2>Fish sizes</h2>
          <CheckList items={fishSizes} />
        </div>
      </section>
    </main>
  )
}
