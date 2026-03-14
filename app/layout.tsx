import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SiteFooter, SiteHeader } from "@/components/layout"
import { HomeChatBubble } from "@/components/home-chat-bubble"
import { site, reviews } from "@/components/site-data"


const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Horsham Road",
    addressLocality: "Steyning",
    addressRegion: "West Sussex",
    postalCode: "BN44 3AA",
    addressCountry: "GB",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(reviews.length),
    bestRating: "5",
    worstRating: "1",
  },
}

export const metadata: Metadata = {
  title: {
    default: "Alderwood Ponds",
    template: "%s | Alderwood Ponds",
  },
  description: site.description,
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <SiteHeader />
        {children}
        <HomeChatBubble />
        <SiteFooter />
      </body>
    </html>
  )
}
