import Link from "next/link"
import { site } from "@/components/site-data"

const nav = [
  { href: "/", label: "About" },
  { href: "/fish", label: "Fish" },
  { href: "/prices", label: "Prices" },
  { href: "/rules", label: "Rules" },
  { href: "/stay", label: "Stay" },
  { href: "/contact", label: "Contact" },
  { href: "/meet-george", label: "Meet George" },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          Alderwood Ponds
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
          <h3>{site.name}</h3>
          <p>{site.description}</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            Julie — <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </p>
          <p>{site.address}</p>
        </div>
        <div>
          <h4>Opening</h4>
          <p>{site.hours}</p>
        </div>
      </div>
      <div className="container footer-credit">
        <a href="https://www.guardxnetwork.com" target="_blank" rel="noreferrer">
          Built with an AI assistant by GuardX
        </a>
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

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero container narrow">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}
