import Image from "next/image"
import Link from "next/link"
import { ReviewMarquee } from "@/components/review-marquee"
import { facebookUrl, site } from "@/components/site-data"
import { GeorgeLiveAssistant } from "@/components/george-live-assistant"

export default function HomePage() {
  return (
    <main>
      <section className="hero hero-home">
        <div className="hero-media">
          <Image
            src="/images/hero-main.webp"
            alt="Alderwood Ponds lake view"
            fill
            priority
            sizes="100vw"
            className="hero-image hero-image-desktop"
          />
          <Image
            src="/images/hero-main-mobile.webp"
            alt="Alderwood Ponds lake view"
            fill
            priority
            sizes="100vw"
            className="hero-image hero-image-mobile"
          />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <p className="eyebrow">Family-run coarse fishery in Steyning, West Sussex</p>
          <h1>Alderwood Ponds</h1>
          <p className="hero-copy">
            Peaceful fishing lakes, cabins and camping in a beautiful countryside setting. Find the key details quickly,
            then ask George about prices, rules, cabins, camping, fishing and more.
          </p>
          <div className="hero-actions">
            <Link href="/prices" className="button secondary">
              View prices
            </Link>
          </div>
          <div className="hero-badges">
            <span>Opening times available below</span>
            <span>Booking line</span>
            <span>Cash on the bank</span>
            <span>Please see Facebook for recent reports</span>
          </div>
          <a href={facebookUrl} target="_blank" rel="noreferrer" className="facebook-inline-note">
            <span className="facebook-mini-logo" aria-hidden="true">f</span>
            <span>Please see Facebook for recent reports</span>
          </a>
        </div>
      </section>

      <section className="container home-facts-grid">
        <article className="info-card feature">
          <span>Opening times</span>
          <strong>{site.hours}</strong>
          <p>Please check opening times before travelling.</p>
        </article>
        <article className="info-card">
          <span>Address</span>
          <strong>{site.address}</strong>
          <p>Steyning, West Sussex.</p>
        </article>
        <article className="info-card">
          <span>{site.contactLabel}</span>
          <strong>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </strong>
          <p>Monday to Friday, 9am to 12 midday.</p>
        </article>
        <article className="info-card">
          <span>Payment</span>
          <strong>{site.payment}</strong>
          <p>Simple and clear on arrival.</p>
        </article>
      </section>

      <section id="george" className="section section-split feature-band homepage-george-band">
        <div className="container george-home-stack">
          <div className="homepage-george-intro">
            <div className="homepage-george-copy">
              <p className="eyebrow dark">Ask George about anything</p>
              <h2>Prices, rules, cabins, camping, fishing and more.</h2>
              <p>
                George is here on the homepage to help visitors quickly find information about Alderwood Ponds.
              </p>
            </div>
          </div>

          <GeorgeLiveAssistant variant="homepage" />

          <a href={facebookUrl} target="_blank" rel="noreferrer" className="facebook-feature-card homepage-facebook-card">
            <div className="facebook-logo-badge" aria-hidden="true">f</div>
            <div>
              <span className="card-kicker">Recent reports</span>
              <h3>Please see Facebook for recent reports.</h3>
              <p>For the latest catch updates and more recent fishery news, head straight to the Alderwood Ponds Facebook page.</p>
            </div>
          </a>

          <div className="homepage-review-wrap">
            <div className="homepage-review-heading">
              <span>Visitor reviews</span>
              <h3>What anglers say about Alderwood Ponds</h3>
              <p>Enjoyed your visit? We would really appreciate a quick Google review.</p>
            </div>
            <ReviewMarquee compact />
            <div className="review-cta-row">
              <a href={site.googleReviewUrl} target="_blank" rel="noreferrer" className="google-review-link">
                <span className="google-logo-badge" aria-hidden="true">G</span>
                <span>{site.googleReviewsLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
