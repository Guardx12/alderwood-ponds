import Image from "next/image"
import { PageHero } from "@/components/layout"
import { site } from "@/components/site-data"

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Booking and enquiries"
        text="Booking line, address and simple visitor information for Alderwood Ponds."
      />
      <section className="section container two-col">
        <div className="panel visual-panel">
          <div className="visual-thumb large-thumb">
            <Image src="/images/gallery/toilets.jpg" alt="Toilets and facilities at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h2>Contact Julie</h2>
          <p className="panel-copy">
            Please call the booking and enquiry line during the listed hours for fishery questions, stays and general help.
          </p>
          <div className="contact-list">
            <p><strong>Phone:</strong> <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
            <p><strong>Booking line:</strong> Monday to Friday, 9am to 12 midday</p>
            <p><strong>Payment:</strong> Cash only on the bank</p>
            <p><strong>Day tickets:</strong> No half-day tickets</p>
          </div>
        </div>
        <div className="panel visual-panel">
          <div className="visual-thumb large-thumb">
            <Image src="/images/gallery/grounds-path.jpg" alt="Grounds and approach at Alderwood Ponds" fill className="image-fill" />
          </div>
          <h2>Address and directions</h2>
          <p className="panel-copy">{site.address}</p>
          <p className="panel-copy">{site.directions}</p>
        </div>
      </section>
    </main>
  )
}
