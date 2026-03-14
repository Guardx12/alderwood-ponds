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
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Alderwood Ponds",
    template: "%s | Alderwood Ponds",
  },
  description: site.description,
  applicationName: "Alderwood Ponds",
  openGraph: {
    title: "Alderwood Ponds – Fishing, Cabins & Camping",
    description: "Three beautiful fishing lakes in the Sussex countryside with cabins, camping, reports, and George ready to help.",
    url: site.siteUrl,
    siteName: "Alderwood Ponds",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Alderwood Ponds aerial-style lake preview",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alderwood Ponds – Fishing, Cabins & Camping",
    description: "Fishing lakes, cabins and camping in Sussex. Ask George about prices, rules and availability.",
    images: [site.ogImage],
  },
  alternates: {
    canonical: "/",
  },
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
