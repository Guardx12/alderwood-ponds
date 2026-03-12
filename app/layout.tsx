import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Alderwood Ponds | Coarse Fishery in Steyning, West Sussex',
  description:
    'Alderwood Ponds coarse fishery information site with fish sizes, prices, rules, night fishing, cabins, camping, and contact information.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
