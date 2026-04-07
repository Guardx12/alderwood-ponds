"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const GEORGE_PAGE = "https://askgeorge.app/alderwood-ponds"

export function HomeChatBubble() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <Link href={GEORGE_PAGE} className={`home-chat-bubble ${visible ? "show" : ""}`}>
      <div className="home-chat-icon">G</div>
      <div>
        <strong>Ask George about anything</strong>
        <span>Prices, rules, cabins, camping, fishing and more.</span>
      </div>
    </Link>
  )
}
