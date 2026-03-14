import { PageHero } from "@/components/layout"
import { site } from "@/components/site-data"

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Booking line, address and visit details"
        text="A simple contact page with the booking line, fishery address, opening times and directions."
        image="/images/morning-lake.webp"
      />
      <section className="section container two-col">
        <div className="panel">
          <h2>{site.contactLabel}</h2>
          <p className="panel-copy">
            Please leave a voicemail with your name and number and you should receive a callback within 24 hours.
          </p>
          <div className="contact-list">
            <p>
              <strong>Phone:</strong> <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            </p>
            <p>
              <strong>{site.contactLabel}:</strong> Monday to Friday, 9am to 12 midday
            </p>
            <p>
              <strong>Payment:</strong> {site.payment}
            </p>
          </div>
        </div>
        <div className="panel">
          <h2>Address and directions</h2>
          <p className="panel-copy">{site.address}</p>
          <p className="panel-copy">{site.directions}</p>
        </div>
      </section>
      <section className="section container">
        <div className="panel map-card-shell">
          <iframe
            title="Alderwood Ponds map"
            src="https://www.google.com/maps?q=Horsham%20Road%2C%20Steyning%2C%20West%20Sussex%20BN44%203AA&z=14&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  )
}
