import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const endpoint = process.env.GEORGE_LEAD_WEBHOOK_URL || process.env.FORMSPREE_ENDPOINT

    if (!endpoint) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const text = await response.text()

    if (!response.ok) {
      return NextResponse.json({ error: text || `Webhook error ${response.status}` }, { status: response.status })
    }

    let data: unknown = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = { ok: true }
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not send George transcript." },
      { status: 500 },
    )
  }
}
