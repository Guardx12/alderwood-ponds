"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function HomeChatBubble() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <Link href="/#george" className={`home-chat-bubble ${visible ? "show" : ""}`}>
      <div className="home-chat-icon">G</div>
      <div>
        <strong>Ask George about anything</strong>
        <span>Prices, rules, cabins, camping, fishing and more.</span>
      </div>
    </Link>
  )
}
