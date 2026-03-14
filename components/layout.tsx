import Link from "next/link"
import { site } from "@/components/site-data"

const nav = [
  { href: "/", label: "Home" },
  { href: "/prices", label: "Prices" },
  { href: "/rules", label: "Rules" },
  { href: "/stay", label: "Stay" },
  { href: "/fish", label: "Fish" },
  { href: "/reports", label: "Reports" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand-lockup">
          <span className="brand-kicker">West Sussex Fishery</span>
          <span className="brand">{site.name}</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-kicker">Family-run coarse fishery in Steyning, West Sussex</p>
          <h3>{site.name}</h3>
          <p>{site.description}</p>
        </div>
        <div>
          <h4>{site.contactLabel}</h4>
          <p>
            <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </p>
          <p>Monday to Friday, 9am to 12 midday</p>
          <p>{site.payment}</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>{site.address}</p>
          <p>{site.hours}</p>
        </div>
        <div>
          <h4>Reviews & reports</h4>
          <div className="footer-link-stack">
            <a href={site.googleReviewUrl} target="_blank" rel="noreferrer" className="footer-brand-link">
              <span className="google-logo-badge small" aria-hidden="true">G</span>
              <span>{site.googleReviewsLabel}</span>
            </a>
            <a href={site.facebookUrl ?? "https://www.facebook.com/profile.php?id=100063585396887&locale=en_GB"} target="_blank" rel="noreferrer" className="footer-brand-link">
              <span className="facebook-mini-logo" aria-hidden="true">f</span>
              <span>Please see Facebook for recent reports</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="check-grid">
      {items.map((item) => (
        <div key={item} className="check-card">
          <div className="tick">✓</div>
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}

export function PageHero({ eyebrow, title, text, image = "/images/hero-main.webp" }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="page-hero page-hero-image">
      <div className="page-hero-media" style={{ backgroundImage: `linear-gradient(180deg, rgba(5,18,15,.28), rgba(5,18,15,.78)), url(${image})` }} />
      <div className="container narrow page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  )
}
