import { facebookUrl } from "@/components/site-data"

export default function ReportsPage() {
  return (
    <main>
      <section className="page-hero page-hero-image">
        <div
          className="page-hero-media"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(5,18,15,.28), rgba(5,18,15,.78)), url(/images/reports-page.webp)",
          }}
        />
        <div className="container narrow page-hero-content">
          <p className="eyebrow">Reports, news & updates</p>
          <h1>Please keep an eye on Facebook for our latest updates.</h1>
          <p>For our latest fishing reports, lake updates, closures and day-to-day news, please keep an eye on the Alderwood Ponds Facebook page.</p>
          <a href={facebookUrl} target="_blank" rel="noreferrer" className="facebook-feature-card compact-facebook reports-single-facebook">
            <div className="facebook-logo-badge" aria-hidden="true">f</div>
            <div>
              <span className="card-kicker">Reports, news & updates</span>
              <h3>Please keep an eye on Facebook for our latest updates.</h3>
              <p>All fishing reports, important notices, closures and day-to-day fishery updates are posted on Facebook.</p>
            </div>
          </a>
        </div>
      </section>
    </main>
  )
}
