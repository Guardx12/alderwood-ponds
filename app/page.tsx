import Image from "next/image"
import Link from "next/link"
import { CheckList, SectionHeading } from "@/components/layout"
import { HomeChatBubble } from "@/components/home-chat-bubble"
import { dayTickets, fishSizes, importantInfo, site, waters } from "@/components/site-data"

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <Image src="/images/gallery/home-hero.webp" alt="Alderwood Ponds lake view" fill priority className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <p className="eyebrow">Coarse fishery in Steyning, West Sussex</p>
          <h1>Alderwood Ponds</h1>
          <p className="hero-copy">
            Peaceful day and night fishing with three waters, cabins, camping, practical facilities on site, and George
            ready to help visitors with the details.
          </p>
          <div className="hero-actions">
            <Link href="/prices" className="button primary">
              View prices
            </Link>
            <Link href="/meet-george" className="button secondary">
              Ask George
            </Link>
          </div>
          <div className="hero-badges">
            <span>3 ponds on site</span>
            <span>Carp to 38lb 8oz</span>
            <span>Cabins &amp; camping</span>
            <span>Day &amp; night fishing</span>
          </div>
        </div>
      </section>

      <section className="container quick-grid">
        <article className="info-card feature">
          <span>Booking &amp; enquiry</span>
          <strong>Mon to Fri, 9am–12 midday</strong>
          <p>Please call Julie on the booking line. No half-day tickets.</p>
        </article>
        <article className="info-card">
          <span>Address</span>
          <strong>Horsham Road, Steyning</strong>
          <p>West Sussex BN44 3AA, opposite Chanctonfold Industrial Estate.</p>
        </article>
        <article className="info-card">
          <span>Payments</span>
          <strong>Cash on bank</strong>
          <p>Day fishing tickets are bought on the bank and no membership is needed.</p>
        </article>
        <article className="info-card">
          <span>Contact</span>
          <strong>Julie — {site.phoneDisplay}</strong>
          <p>George can help with the basics first, then point visitors to the right details.</p>
        </article>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="The fishery"
          title="A family-run fishery with beautiful waters and straightforward visitor information"
          text="Alderwood Ponds has three waters on site along with cabins, camping, toilets, disabled access and practical information visitors usually want before arriving. The site is designed to feel scenic, calm and easy to understand."
        />
        <div className="feature-split">
          <div className="feature-copy panel soft-panel">
            <h3>What visitors usually want to know</h3>
            <CheckList items={waters} />
            <div className="panel-actions">
              <Link href="/fish" className="text-link">
                See fish and waters
              </Link>
            </div>
          </div>
          <div className="image-stack two-tall">
            <div className="image-card tall">
              <Image src="/images/gallery/island-lake.jpg" alt="Island Lake at Alderwood Ponds" fill className="image-fill" />
              <div className="image-caption overlay">Island Lake and peaceful surroundings</div>
            </div>
            <div className="image-card">
              <Image src="/images/gallery/lake-bank.jpg" alt="Lake bank view at Alderwood Ponds" fill className="image-fill" />
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="Gallery"
          title="Alderwood Ponds in pictures"
          text="A more visual look at the lakes, the banks, the cabins and the facilities people often ask about before they come."
        />
        <div className="mosaic-grid">
          <div className="image-card large">
            <Image src="/images/gallery/home-hero.webp" alt="Main lake at Alderwood Ponds" fill className="image-fill" />
            <div className="image-caption overlay">A peaceful setting for day or night fishing</div>
          </div>
          <div className="image-card">
            <Image src="/images/gallery/lake-swim.webp" alt="Swim view at Alderwood Ponds" fill className="image-fill" />
            <div className="image-caption">Quiet swims around the lakes</div>
          </div>
          <div className="image-card">
            <Image src="/images/gallery/peg-view.jpg" alt="Fishing peg at Alderwood Ponds" fill className="image-fill" />
            <div className="image-caption">Well-positioned fishing areas</div>
          </div>
          <div className="image-card">
            <Image src="/images/gallery/grounds-path.jpg" alt="Grounds at Alderwood Ponds" fill className="image-fill" />
          </div>
          <div className="image-card">
            <Image src="/images/gallery/rods-view.jpg" alt="Rods set up by the lake at Alderwood Ponds" fill className="image-fill" />
          </div>
        </div>
      </section>

      <section className="section container three-col visual-cards">
        <article className="panel visual-panel">
          <div className="visual-thumb">
            <Image src="/images/gallery/robins-retreat.jpg" alt="Cabin at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h3>Cabins and shelter stays</h3>
          <p className="panel-copy">Robins Retreat and Anglers Rest both include reserved swims, with their own check-in details and on-site facilities.</p>
          <Link href="/stay" className="text-link">See cabins and camping</Link>
        </article>
        <article className="panel visual-panel">
          <div className="visual-thumb">
            <Image src="/images/gallery/toilets.jpg" alt="Toilet and wash facilities at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h3>Facilities on site</h3>
          <p className="panel-copy">Toilets, shower access, practical wash-up facilities, camping space and clear guidance for longer stays.</p>
          <Link href="/contact" className="text-link">See visitor information</Link>
        </article>
        <article className="panel visual-panel">
          <div className="visual-thumb">
            <Image src="/images/gallery/rules-sign.jpg" alt="Fishery rules sign at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h3>Rules made clear</h3>
          <p className="panel-copy">Important fishery rules, ticket details and practical guidance are easy to check before you arrive.</p>
          <Link href="/rules" className="text-link">Open rules page</Link>
        </article>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="At a glance"
          title="Prices, fish sizes and practical details"
          text="The main information people usually ask for is broken out into separate pages, and George can also guide visitors back to the right answers quickly."
        />
        <div className="three-col">
          <div className="panel">
            <h3>Day tickets</h3>
            <CheckList items={dayTickets} />
          </div>
          <div className="panel">
            <h3>Fish and waters</h3>
            <CheckList items={fishSizes} />
          </div>
          <div className="panel panel-cta scenic-panel">
            <div className="scenic-panel-image">
              <Image src="/images/gallery/site-sign.jpg" alt="Alderwood Ponds site sign" fill className="image-fill" />
            </div>
            <div>
              <h3>Need directions or rules?</h3>
              <p className="panel-copy">Use the dedicated pages or ask George directly about prices, rules, fish, cabins, camping, directions, facilities or what is nearby.</p>
              <div className="stacked-links">
                <Link href="/prices" className="button primary full">Open prices page</Link>
                <Link href="/rules" className="button secondary full">Open rules page</Link>
                <Link href="/meet-george" className="button secondary full">Meet George</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container scenic-band">
        <div className="scenic-band-media">
          <Image src="/images/gallery/toilet-sign.jpg" alt="Toilet sign at Alderwood Ponds" fill className="image-fill" />
          <div className="scenic-band-overlay" />
        </div>
        <div className="scenic-band-content">
          <p className="eyebrow">Useful information</p>
          <h2>George can help visitors quickly</h2>
          <p>
            George is there to answer the obvious questions first — prices, rules, fish, cabins, camping, directions,
            nearby places and practical site details — then guide people back to the main Alderwood Ponds information.
          </p>
          <Link href="/meet-george" className="button primary">
            Ask George now
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="two-col">
          <div className="panel">
            <h3>Important for anglers</h3>
            <CheckList items={importantInfo.slice(0, 6)} />
          </div>
          <div className="panel">
            <h3>Before you visit</h3>
            <p className="panel-copy">
              Visitors often want the basics before they travel — where to park, how to pay, what the booking line
              hours are, what the cabin check-in times are, whether they can camp and what they should bring.
            </p>
            <div className="panel-actions">
              <Link href="/contact" className="text-link">Open contact and directions</Link>
            </div>
          </div>
        </div>
      </section>
      <HomeChatBubble />
    </main>
  )
}
