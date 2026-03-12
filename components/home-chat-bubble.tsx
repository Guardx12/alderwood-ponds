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
    <Link href="/meet-george" className={`home-chat-bubble ${visible ? "show" : ""}`}>
      <div className="home-chat-icon">G</div>
      <div>
        <strong>Talk to George</strong>
        <span>Ask about prices, rules, cabins, camping, fish sizes and more.</span>
      </div>
    </Link>
  )
}
