import Image from "next/image"
import Link from "next/link"
import { CheckList, PageHero, SectionHeading } from "@/components/layout"
import { HomeChatBubble } from "@/components/home-chat-bubble"
import { dayTickets, fishSizes, importantInfo, site, updates, waters } from "@/components/site-data"

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <Image src="/images/alderwood-20ponds.webp" alt="Alderwood Ponds lake view" fill priority className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <p className="eyebrow">Coarse fishery in Steyning, West Sussex</p>
          <h1>Alderwood Ponds</h1>
          <p className="hero-copy">
            Family-run fishery with three waters, disabled access, night fishing, cabins, camping, and clear
            information for anglers all in one place.
          </p>
          <div className="hero-actions">
            <Link href="/prices" className="button primary">
              View prices
            </Link>
            <Link href="/rules" className="button secondary">
              See rules
            </Link>
          </div>
          <div className="hero-badges">
            <span>3 ponds on site</span>
            <span>Carp to 38lb 8oz</span>
            <span>Day &amp; night fishing</span>
            <span>Dog friendly</span>
          </div>
        </div>
      </section>

      <section className="container quick-grid">
        <article className="info-card feature">
          <span>Opening times</span>
          <strong>Wed to Sun</strong>
          <p>8am–5pm, winter to dusk. May–Aug open until 7pm. Open bank holiday Mondays.</p>
        </article>
        <article className="info-card">
          <span>Address</span>
          <strong>Horsham Road, Steyning</strong>
          <p>West Sussex BN44 3AA, opposite Chanctonfold Industrial Estate.</p>
        </article>
        <article className="info-card">
          <span>Payments</span>
          <strong>Cash on bank</strong>
          <p>No membership needed and no advance booking required for day fishing.</p>
        </article>
        <article className="info-card">
          <span>Contact</span>
          <strong>Julie — {site.phoneDisplay}</strong>
          <p>Booking and enquiry line Monday to Friday, 9am to 12 midday.</p>
        </article>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="About"
          title="About Alderwood Ponds"
          text="Alderwood Ponds is situated on Horsham Road, Steyning, West Sussex, BN44 3AA. The site has three waters: Daves Pond, the Corsican Pond, and the Island Lake. The fishery has been established for over 33 years, is family run, and includes a flush toilet with hot running water, mains drinking water, a coin-activated shower, a disabled toilet, hard-standing parking, and disabled driving access to swims on Daves Pond and the Corsican Pond."
        />
        <div className="two-col">
          <div className="panel">
            <h3>Waters on site</h3>
            <CheckList items={waters} />
          </div>
          <div className="panel">
            <h3>Fish sizes</h3>
            <CheckList items={fishSizes} />
            <div className="panel-actions">
              <Link href="/fish" className="text-link">
                See full fish and lake information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="Prices"
          title="Popular prices at a glance"
          text="Separate price, rules, stay and contact pages have been built so visitors can find information faster."
        />
        <div className="three-col">
          <div className="panel">
            <h3>Day tickets</h3>
            <CheckList items={dayTickets} />
          </div>
          <div className="panel">
            <h3>Important for anglers</h3>
            <CheckList items={importantInfo.slice(0, 5)} />
          </div>
          <div className="panel panel-cta">
            <h3>Need the full details?</h3>
            <p>Use the separate pages for prices, rules, contact details, cabins, camping and recent reports.</p>
            <div className="stacked-links">
              <Link href="/prices" className="button primary full">
                Open prices page
              </Link>
              <Link href="/rules" className="button secondary full">
                Open rules page
              </Link>
              <Link href="/contact" className="button secondary full">
                Open contact page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="Latest reports"
          title="Recent updates and catch reports"
          text="A sample of the latest updates from the fishery."
        />
        <div className="report-grid">
          {updates.slice(0, 3).map((item) => (
            <article key={item.title} className="report-card">
              <span>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="centered-link">
          <Link href="/reports" className="text-link">
            View all recent reports
          </Link>
        </div>
      </section>

      <PageHero
        eyebrow="Gallery"
        title="Photo sections ready to fill later"
        text="Gallery sections have been included in the structure and can be populated later with pond photos, fish captures, cabin images, camping views and winter shots."
      />
      <HomeChatBubble />
    </main>
  )
}
