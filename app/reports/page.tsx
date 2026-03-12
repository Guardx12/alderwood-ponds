import { PageHero } from "@/components/layout"
import { updates } from "@/components/site-data"

export default function ReportsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Latest reports"
        title="Recent updates and catch reports"
        text="Recent reports and reopening notes carried across from the previous Alderwood Ponds website."
      />
      <section className="section container report-grid full-grid">
        {updates.map((item) => (
          <article key={item.title} className="report-card">
            <span>{item.date}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
