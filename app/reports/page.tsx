import { PageHero } from "@/components/layout"
import { facebookUrl, updates } from "@/components/site-data"

export default function ReportsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Latest reports"
        title="Recent updates and catch reports"
        text="Recent reports and reopening notes carried across from the previous Alderwood Ponds website. Please see Facebook for recent reports."
        image="/images/morning-lake.webp"
      />
      <section className="section container">
        <a href={facebookUrl} target="_blank" rel="noreferrer" className="facebook-feature-card compact-facebook">
          <div className="facebook-logo-badge" aria-hidden="true">f</div>
          <div>
            <span className="card-kicker">Recent reports</span>
            <h3>Please see Facebook for recent reports.</h3>
            <p>Visit the Alderwood Ponds Facebook page for the latest catch updates and newer report posts.</p>
          </div>
        </a>
      </section>
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
