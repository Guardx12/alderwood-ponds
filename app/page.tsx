import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/layout"
import { dayTickets, fishSizes, site, waters } from "@/components/site-data"

export default function HomePage() {
  return (
    <main>
      <section className="hero hero-home">
        <div className="hero-media">
          <Image src="/images/hero-main.webp" alt="Alderwood Ponds lake view" fill priority className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <p className="eyebrow">Family-run coarse fishery in Steyning, West Sussex</p>
          <h1>Alderwood Ponds</h1>
          <p className="hero-copy">
            A polished, easy-to-use fishery website with the essentials up front: opening times, address, booking line,
            cash on the bank, and George ready to answer questions about prices, rules, cabins, camping and fishing.
          </p>
          <div className="hero-actions">
            <Link href="/meet-george" className="button primary">
              Ask George now
            </Link>
            <Link href="/prices" className="button secondary">
              View prices
            </Link>
          </div>
          <div className="hero-badges">
            <span>3 waters on site</span>
            <span>Carp to 38lb 8oz</span>
            <span>Day &amp; night fishing</span>
            <span>Cabins &amp; camping</span>
          </div>
        </div>
      </section>

      <section className="container home-facts-grid">
        <article className="info-card feature">
          <span>Opening times</span>
          <strong>{site.hours}</strong>
          <p>Day visitors and anglers can quickly check when the fishery is open before travelling.</p>
        </article>
        <article className="info-card">
          <span>Address</span>
          <strong>{site.address}</strong>
          <p>Easy to find from the Steyning Bypass via the B2135 Ashurst to Partridge Green Road.</p>
        </article>
        <article className="info-card">
          <span>{site.contactLabel}</span>
          <strong>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </strong>
          <p>Monday to Friday, 9am to 12 midday for enquiries and bookings.</p>
        </article>
        <article className="info-card">
          <span>Payment</span>
          <strong>{site.payment}</strong>
          <p>Simple, clear information on the home page so visitors know exactly what to expect.</p>
        </article>
      </section>

      <section className="section section-split feature-band">
        <div className="container two-col feature-grid">
          <div className="feature-copy">
            <p className="eyebrow dark">Meet George</p>
            <h2>Ask George about anything.</h2>
            <p>
              George sits right on the website and helps visitors instantly with prices, rules, cabins, camping,
              fish sizes, opening times and general fishery questions.
            </p>
            <p>
              The goal is simple: when someone lands on the website, they bump straight into George and get the answer
              they need without digging around.
            </p>
            <div className="hero-actions">
              <Link href="/meet-george" className="button primary">
                Open Meet George
              </Link>
              <Link href="/rules" className="button ghost-dark">
                See fishery rules
              </Link>
            </div>
          </div>
          <div className="george-feature-card">
            <span className="card-kicker">AI fishery assistant</span>
            <h3>Ask George about prices, rules, cabins, camping or fishing.</h3>
            <p>
              George can explain the website information in plain English and point visitors to the booking line when
              they need direct help.
            </p>
            <div className="george-chip-row">
              <span>Prices</span>
              <span>Rules</span>
              <span>Cabins</span>
              <span>Camping</span>
              <span>Fish sizes</span>
              <span>Directions</span>
            </div>
            <Link href="/meet-george" className="button primary full">
              Start with George
            </Link>
          </div>
        </div>
      </section>

      <section className="section image-banner-section">
        <div className="container image-banner-grid">
          <article className="image-panel tall">
            <Image src="/images/morning-lake.webp" alt="Morning lake view at Alderwood Ponds" fill className="image-panel-media" />
            <div className="image-panel-overlay" />
            <div className="image-panel-copy">
              <span className="card-kicker">The setting</span>
              <h3>Big, clear imagery and a calmer feel.</h3>
              <p>
                The new design leans into spacious photography, quiet typography, and a darker green palette to feel
                more premium and more reassuring from the first screen.
              </p>
            </div>
          </article>
          <article className="image-panel">
            <Image src="/images/hero-lake.webp" alt="Swim view across the lake" fill className="image-panel-media" />
            <div className="image-panel-overlay soft" />
            <div className="image-panel-copy compact">
              <span className="card-kicker">Waters</span>
              <h3>{waters.join(" · ")}</h3>
            </div>
          </article>
          <article className="image-panel">
            <Image src="/images/island-lake.webp" alt="Island Lake at Alderwood Ponds" fill className="image-panel-media" />
            <div className="image-panel-overlay soft" />
            <div className="image-panel-copy compact">
              <span className="card-kicker">Fish</span>
              <h3>{fishSizes.slice(0, 3).join(" · ")}</h3>
            </div>
          </article>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="Quick overview"
          title="Keep the important information on its own pages — but make the homepage do the heavy lifting."
          text="The rest of the site stays structured and practical, with dedicated pages for prices, rules, stay information, fish, reports and contact details."
        />
        <div className="two-col spotlight-grid">
          <article className="panel spotlight-panel">
            <h3>Popular at a glance</h3>
            <div className="mini-check-grid">
              {dayTickets.slice(0, 4).map((item) => (
                <div key={item} className="mini-check">
                  <span>•</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="panel-actions">
              <Link href="/prices" className="text-link">
                Full prices
              </Link>
            </div>
          </article>
          <article className="panel spotlight-panel">
            <h3>Helpful next steps</h3>
            <div className="stacked-links">
              <Link href="/rules" className="button light-shell">
                Read fishery rules
              </Link>
              <Link href="/stay" className="button light-shell">
                Explore cabins and camping
              </Link>
              <Link href="/contact" className="button light-shell">
                Visit contact details
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
