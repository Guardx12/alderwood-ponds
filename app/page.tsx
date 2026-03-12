import Image from 'next/image'

type Update = {
  title: string
  date: string
  text: string
}

const fishSizes = [
  'Carp to 38lb 8oz',
  'Commons, mirrors, linear and leather',
  'Tench to 9lb',
  'Gold and green tench',
  'Perch to 5lb 1oz',
  'Roach to 3lb',
  'Rudd and golden orfe',
]

const rules = [
  'No barbed hooks, micro barbs, or crushed barbs.',
  'Cradles are required for Island Lake.',
  'Minimum 14-inch carp-safe landing net required for all ponds and lake.',
  'A 42-inch net is also required for Island Lake.',
  'Disgorger and forceps required.',
  'All mats, nets, and weigh slings must be dipped before fishing, even if not used elsewhere.',
  'Keep groundbait to a minimum in small feeders or PVA bags.',
  'No live bait, nuts, bread, spinners, spodding, or bait boats.',
  'No radios unless using earphones.',
  'No loose dogs and no dogs left in cars on the property.',
  'No picnics unless fishing.',
  'No visitors. Pre-paid booked anglers, guests, and dogs only.',
  'No changing peg unless booked.',
  'No keep nets.',
  'No sea line and no braid on line.',
  'No fixed leads or feeders.',
  'Boilies in moderation.',
  'No BBQs unless using a stand. No BBQs on grass, bricks, or wood.',
  'No exit between closing time and 8am.',
  'Entry for anglers and guests is 8am to closing. Leave enough time to pack away before gates are locked.',
  'No children under 10 on the bank unless fishing and accompanied by an adult.',
  'No children on the bank between 5pm and 8am unless night fishing.',
  'No ball games or cycles on the bank.',
  'Rubbish must be taken home.',
  'All fish must be landed in a net and returned as soon as possible using a net. Do not handle fish with a towel.',
  'No wading and no fly fishing.',
  'Use toilet facilities, not bushes.',
  'Do not use a disabled swim unless you hold a blue badge.',
]

const mustHave = [
  'Barbless hooks. Hook checks may be carried out.',
  'Minimum 14-inch carp-safe landing net.',
  'A substantial carp-safe landing mat.',
  'For Corsican Pond and Daves Pond, mats and nets must be carp safe.',
  'For Island Lake, a cradle is required plus a 40–42 inch landing net if possible.',
  'Fish must be weighed in a weigh sling only.',
  'Carry forceps and a disgorger at all times.',
  'Stay within three metres of your rods at all times.',
  'A valid fishing licence is required for anyone aged 12 and over.',
  'Dip all nets, mats, cradles, and weigh slings in the chemical dips provided before fishing.',
  'Fish only from designated swims.',
  'Do not drive down to the ponds unless you hold a valid disabled badge.',
  'Display your disabled badge in the windscreen.',
  'Visitors must not park in the main car park.',
  'Do not land fish on a hot mat or handle fish for too long.',
  'Respect the premises and other anglers.',
  'Take litter home and clear discarded line from your swim before leaving.',
]

const dayTickets = [
  'Island Lake — £20',
  'Corsican Pond — £15',
  'Daves Pond — £15',
  'Day guests — £3',
  'Dogs — £2.50',
  'No visitors',
]

const nightFishing = [
  'Anglers up to 3 rods per person',
  '24 hours, 8am to 8am or pm to pm — £40',
  'Guests — £35, booked only',
  'Dogs — £2.50',
  'No visitors',
  'Vacate your swim by 8am unless you are buying a new day ticket',
  'In an emergency use the out-of-hours number on the back of your ticket',
]

const cabins = [
  'Anglers Rest (electric) — £65 per person per night',
  'Robins Retreat — £60 per person per night',
  'Pre-paid booked day guests only — £3',
  'Dogs — £2.50',
  'Up to 3 rods each for 24 hours',
  'Check-in 11:30am / check-out 10:30am',
  'If you wish to fish after checkout, move to another peg and pay on the bank',
  'Coin meter in cabin, lighting free',
  'Please bring utensils, cutlery, cups, bedding, and fitted sheets only',
  'Available Wednesday to Saturday, closed Monday and Tuesday, available on bank holidays',
  'Two-night minimum stay on Saturday/Sunday bank holiday weekends',
  'Full payment is due if cancelled within seven days of arrival',
]

const dogRules = [
  'Dogs allowed on the bank if the owner is fishing, maximum two dogs.',
  'Dogs must be tethered at all times on the bank.',
  'Well-behaved dogs only. Persistent barking or aggression will be asked to leave.',
  'No dogs left in cars on the property.',
  'Please clean up after your dog.',
  'Dogs can be exercised in the fields behind the lake on a lead at all times.',
  'Ensure your dog has ample shade and water.',
  'Drinking water taps are near the dip and shed, in the camping field, and at Daves Pond.',
  'For night fishing, tell the fishery at booking how many dogs are coming. £2.50 per dog per night.',
]

const camping = [
  'Camping season: May to September',
  'Caravans, campers, and tents welcome',
  'Caravan/camper pitch — £20 per night',
  'Tent pitch — £15 per night',
  'Electric/water — £5',
  'Adults — £6',
  'Juniors — £4',
  'Dogs — £2.50',
  'Day guests — £3',
  'Fishing not included. Tickets should be bought on the bank from the bailiff.',
  'Gates lock at 7pm and open at 8am for a safe and quiet stay.',
]

const importantInfo = [
  'Paying anglers, guests, and dogs only. No visitors. If anything needs collecting, park and meet at the main gate.',
  'Park in the main car park unless disabled. Reserved disabled swims are available.',
  'Night fishing runs 8am–8am or pm–pm. Vacate your swim by 8am unless staying on and paying for a day ticket.',
  'Main gates are open 8am to 5pm at present. May, June, July, and August open to 7pm.',
  'Only call the enquiry and booking line Monday to Friday, 9am to 12 midday.',
  'Do not contact by Facebook, text, Messenger, WhatsApp, or email.',
  'Cabin guests should collect keys from the key safe on arrival and return them at checkout for the cleaners.',
  'Cabin payments should be deposited in an envelope with cabin name, guest name, and amount written on the front.',
  'If you want to keep fishing after a cabin stay, move to another swim or pond and buy a day ticket.',
  'Bring the correct dipped equipment for the pond you are fishing. Barbless hooks only.',
]

const updates: Update[] = [
  {
    title: 'Re-opening update',
    date: '22 Jan 2026',
    text: 'Alderwood Ponds says it will re-open on 4 March 2026. Normal hours return, no bookings are needed for day fishing, anglers choose a swim on arrival, and cabin swims remain reserved for cabin guests.',
  },
  {
    title: 'Carp report',
    date: '22 Dec 2025',
    text: 'Dan landed an 18lb 8oz common and a 13lb 9oz mirror from Island Lake using king prawn.',
  },
  {
    title: 'Fishing report Sept/Oct 2025',
    date: '15 Oct 2025',
    text: 'Reports include 24-hour sessions from Anglers Rest with carp to 20lb, margin-caught mirrors to 21lb 4oz on the Island Lake, and multiple productive sessions near Robins Retreat.',
  },
  {
    title: 'Fishing report',
    date: '3 Aug 2025',
    text: 'The Island Lake produced plenty of fish and families were also enjoying Daves Pond and the Corsican Pond using natural baits such as luncheon meat, sweetcorn, prawns, and pellets.',
  },
  {
    title: 'Fishing report March 2025',
    date: '13 Mar 2025',
    text: 'A 48-hour session produced a range of fish including perch to over 3lb, plus rudd and pumpkinseed, with prawns and maggots working well.',
  },
  {
    title: 'Fishing report Feb 2025',
    date: '14 Feb 2025',
    text: 'Reported captures included a 14lb 8oz common, a 12lb 4oz leather, and a 3lb 7oz perch.',
  },
]

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="section">
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="grid-list">
      {items.map((item) => (
        <div key={item} className="list-card">
          <div className="tick">✓</div>
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <main>
      <header className="hero">
        <div className="hero-image-wrap">
          <Image
            src="/images/alderwood-20ponds.webp"
            alt="Alderwood Ponds lake view"
            fill
            priority
            className="hero-image"
          />
          <div className="hero-overlay" />
        </div>

        <nav className="topbar">
          <div className="brand">Alderwood Ponds</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#prices">Prices</a>
            <a href="#rules">Rules</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content container">
          <p className="eyebrow">Coarse fishery in Steyning, West Sussex</p>
          <h1>A clean, modern website for Alderwood Ponds.</h1>
          <p className="hero-copy">
            Family-run fishery with three waters, disabled access, night fishing,
            cabins, camping, and clear information for anglers all in one place.
          </p>
          <div className="hero-actions">
            <a href="#prices" className="button primary">View prices</a>
            <a href="#rules" className="button secondary">See rules</a>
          </div>
          <div className="hero-badges">
            <span>3 ponds on site</span>
            <span>Carp to 38lb 8oz</span>
            <span>Day &amp; night fishing</span>
            <span>Dog friendly</span>
          </div>
        </div>
      </header>

      <section className="quick-info container">
        <div className="info-card highlight">
          <span>Opening times</span>
          <strong>Wed to Sun</strong>
          <p>8am–5pm, winter to dusk. May–Aug open until 7pm. Open bank holiday Mondays.</p>
        </div>
        <div className="info-card">
          <span>Address</span>
          <strong>Horsham Road, Steyning</strong>
          <p>West Sussex BN44 3AA, opposite Chanctonfold Industrial Estate.</p>
        </div>
        <div className="info-card">
          <span>Payments</span>
          <strong>Cash on bank</strong>
          <p>No membership needed and no advance booking required for day fishing.</p>
        </div>
        <div className="info-card">
          <span>Contact</span>
          <strong>Julie — 07713 468264</strong>
          <p>Booking and enquiry line Monday to Friday, 9am to 12 midday.</p>
        </div>
      </section>

      <div className="container sections">
        <Section id="about" eyebrow="About" title="About Alderwood Ponds">
          <div className="two-col">
            <div className="content-card">
              <p>
                Alderwood Ponds is situated on Horsham Road, Steyning, West Sussex, BN44 3AA,
                on the B2135 Ashurst to Partridge Green Road. The site has three waters:
                Daves Pond, the Corsican Pond, and the Island Lake.
              </p>
              <p>
                The fishery has been established for over 33 years, is family run, and says it
                has been recognised by Anglers Mail as one of the top-rated commercial fisheries
                in the country.
              </p>
              <p>
                The site includes a flush toilet with hot running water, mains drinking water,
                a coin-activated shower, a disabled toilet, hard-standing parking, and disabled
                driving access to swims on Daves Pond and the Corsican Pond.
              </p>
            </div>
            <div className="content-card muted">
              <h3>Waters on site</h3>
              <ul>
                <li>Daves Pond — disabled access with hard-stand parking</li>
                <li>Corsican Pond — 15 pegs</li>
                <li>Island Lake — 26 pegs</li>
              </ul>
              <h3>Gallery area</h3>
              <p>
                Gallery sections have been included in the site structure and can be populated
                later with pond photos, winter photos, fish captures, and cabin images.
              </p>
            </div>
          </div>
        </Section>

        <Section id="fish" eyebrow="Fish" title="Fish sizes">
          <Checklist items={fishSizes} />
        </Section>

        <Section id="prices" eyebrow="Prices" title="Prices 2026">
          <div className="pricing-grid">
            <div className="price-card">
              <h3>Day tickets</h3>
              <Checklist items={dayTickets} />
            </div>
            <div className="price-card">
              <h3>Night fishing</h3>
              <Checklist items={nightFishing} />
            </div>
            <div className="price-card">
              <h3>Fishing shelters</h3>
              <Checklist items={cabins} />
            </div>
            <div className="price-card">
              <h3>Camping</h3>
              <Checklist items={camping} />
            </div>
          </div>
        </Section>

        <Section id="rules" eyebrow="Rules" title="Fishery rules">
          <Checklist items={rules} />
        </Section>

        <Section id="must-have" eyebrow="Essential gear" title="What anglers must have">
          <Checklist items={mustHave} />
        </Section>

        <Section id="dogs" eyebrow="Dog friendly" title="Rules for dogs">
          <Checklist items={dogRules} />
        </Section>

        <Section id="important" eyebrow="Important" title="Important for anglers">
          <Checklist items={importantInfo} />
        </Section>

        <Section id="accommodation" eyebrow="Stay on site" title="Cabins and camping">
          <div className="two-col">
            <div className="content-card">
              <h3>Fishing shelters with reserved swims</h3>
              <p>
                Robins Retreat is situated lakeside with your own reserved swim in front and
                fishing included day and night. The second shelter, Anglers Rest, is situated by
                the camping field with parking all year round and a reserved swim in front.
              </p>
              <p>
                Available Wednesday to Saturday, closed Monday and Tuesday, and available on bank
                holidays. Two-night minimum stays apply on Saturday/Sunday bank holiday weekends.
              </p>
            </div>
            <div className="content-card">
              <h3>Camping</h3>
              <p>
                Caravans, campers, and tents are welcome from May to September. Gates lock at 7pm
                and open at 8am to help provide a quiet and safe stay.
              </p>
              <p>
                Fishing is not included with camping and tickets should be bought separately on the
                bank from the bailiff.
              </p>
            </div>
          </div>
        </Section>

        <Section id="updates" eyebrow="Latest reports" title="Recent updates and catch reports">
          <div className="updates-grid">
            {updates.map((update) => (
              <article key={update.title + update.date} className="update-card">
                <span>{update.date}</span>
                <h3>{update.title}</h3>
                <p>{update.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="gallery" eyebrow="Gallery" title="Photo sections ready to fill later">
          <div className="gallery-placeholders">
            <div className="gallery-box">Pond photos</div>
            <div className="gallery-box">Fish captures</div>
            <div className="gallery-box">Cabins and shelters</div>
            <div className="gallery-box">Camping and winter views</div>
          </div>
        </Section>
      </div>

      <section id="contact" className="contact-band">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow dark">Contact</span>
            <h2>Booking and enquiries</h2>
            <p>
              Contact Julie on <strong>07713 468264</strong>. Please leave a voicemail with your
              name and number and you should receive a callback within 24 hours. The booking line
              is Monday to Friday, 9am to 12 midday.
            </p>
          </div>
          <div className="contact-card">
            <p><strong>Address</strong></p>
            <p>Alderwood Ponds, Horsham Road, Steyning, West Sussex, BN44 3AA</p>
            <p>
              From the A283 Steyning Bypass, take the B2135 Ashurst to Partridge Green Road. The
              fishery is around 200 yards on the left, opposite Chanctonfold Industrial Estate.
            </p>
            <p><strong>Payment:</strong> cash only on the bank.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
