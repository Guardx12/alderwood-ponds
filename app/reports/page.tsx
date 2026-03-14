import { facebookUrl } from "@/components/site-data"

export default function ReportsPage() {
  return (
    <main>
      <section className="page-hero page-hero-image">
        <div
          className="page-hero-media"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(5,18,15,.38), rgba(5,18,15,.82)), url(/images/reports-page.webp)",
          }}
        />
        <div className="container narrow page-hero-content">
          <p className="eyebrow">Reports</p>
          <h1>Please see Facebook for reports.</h1>
          <p>For the latest catch updates and recent fishery reports, head straight to the Alderwood Ponds Facebook page.</p>
          <a href={facebookUrl} target="_blank" rel="noreferrer" className="facebook-feature-card compact-facebook reports-single-facebook">
            <div className="facebook-logo-badge" aria-hidden="true">f</div>
            <div>
              <span className="card-kicker">Facebook reports</span>
              <h3>Please see Facebook for reports.</h3>
              <p>Open the Alderwood Ponds Facebook page for the latest updates.</p>
            </div>
          </a>
        </div>
      </section>
    </main>
  )
}
