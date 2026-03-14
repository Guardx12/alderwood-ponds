import { PageHero } from "@/components/layout"
import { site } from "@/components/site-data"

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Booking and enquiries"
        text="Separate contact page with the booking line, address and visit directions."
      />
      <section className="section container two-col">
        <div className="panel">
          <h2>Contact Julie</h2>
          <p className="panel-copy">
            Please leave a voicemail with your name and number and you should receive a callback within 24 hours.
          </p>
          <div className="contact-list">
            <p><strong>Phone:</strong> <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
            <p><strong>Booking line:</strong> Monday to Friday, 9am to 12 midday</p>
            <p><strong>Payment:</strong> Cash only on the bank</p>
          </div>
        </div>
        <div className="panel">
          <h2>Address</h2>
          <p className="panel-copy">{site.address}</p>
          <p className="panel-copy">{site.directions}</p>
        </div>
      </section>
    </main>
  )
}
