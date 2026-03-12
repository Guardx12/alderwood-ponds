import type { ReactNode } from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SiteFooter, SiteHeader } from "@/components/layout"
import { site } from "@/components/site-data"

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
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
