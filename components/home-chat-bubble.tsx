"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function HomeChatBubble() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  if (pathname === "/meet-george") return null

  return (
    <Link href="/meet-george" className={`home-chat-bubble ${visible ? "show" : ""}`}>
      <div className="home-chat-icon">G</div>
      <div>
        <strong>Ask George about anything</strong>
        <span>Prices, rules, cabins, camping, fishing and more.</span>
      </div>
    </Link>
  )
}
