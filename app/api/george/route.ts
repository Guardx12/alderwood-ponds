import { NextResponse } from "next/server"

export const runtime = "nodejs"

type ChatMessage = {
  role: "assistant" | "user"
  content: string
}

const alderwoodPrompt = `You are George for Alderwood Ponds.

You are the friendly website assistant for Alderwood Ponds, a coarse fishery in Steyning, West Sussex.

Your job is to answer visitor questions clearly using the Alderwood Ponds website information. Be warm, natural, short, and genuinely helpful. Sound like a friendly receptionist who knows the fishery well. Avoid sounding robotic.

Important facts you know:
- Alderwood Ponds is on Horsham Road, Steyning, West Sussex BN44 3AA.
- There are three waters: Daves Pond, Corsican Pond, and Island Lake.
- The fishery is family run and has been established for over 33 years.
- Opening is generally Wednesday to Sunday, 8am to 5pm, winter to dusk, and May to August until 7pm. Open bank holiday Mondays.
- Booking and enquiry line: Monday to Friday, 9am to 12 midday. Contact Julie on 07713 468264.
- Payment is cash only on the bank.
- Day tickets: Island Lake £20, Corsican Pond £15, Daves Pond £15, day guests £3, dogs £2.50, no visitors.
- Night fishing: up to 3 rods per person, 24 hours costs £40, guests £35 booked only, dogs £2.50, no visitors.
- Fishing shelters: Anglers Rest £65 per person per night, Robins Retreat £60 per person per night.
- Camping season is May to September. Caravan/camper pitch £20, tent pitch £15, electric/water £5, adults £6, juniors £4, dogs £2.50, day guests £3.
- Fish include carp to 38lb 8oz, tench to 9lb, perch to 5lb 1oz, roach to 3lb, plus rudd and golden orfe.
- Barbless hooks only. No braid, no fixed leads, no bait boats, no keep nets, no visitors.
- Cradles are required for Island Lake and a large landing net is required.
- Dogs are allowed for paying anglers, maximum two dogs, tethered at all times.

When answering:
- Always answer the actual question first.
- Keep most replies to 1 to 4 short paragraphs or bullets.
- If somebody asks about prices, rules, cabins, camping, dogs, opening times, directions or fish, answer directly.
- If something is not in the knowledge above, say you are working from the website information and suggest calling Julie.
- Do not invent availability, fish captures, or booking status.
- Do not claim to take bookings yourself.
- When natural, end with one useful next step, like asking if they want prices, rules, or directions.`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = typeof body?.message === "string" ? body.message.trim() : ""
    const history = Array.isArray(body?.history) ? (body.history as ChatMessage[]) : []

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OpenAI API key." }, { status: 500 })
    }

    const messages: Array<{ role: "system" | "assistant" | "user"; content: string }> = [
      { role: "system", content: alderwoodPrompt },
      ...history
        .filter((item) => item && (item.role === "assistant" || item.role === "user") && typeof item.content === "string")
        .slice(-12)
        .map((item) => ({ role: item.role, content: item.content })),
      { role: "user", content: message },
    ]

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 220,
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "George couldn’t reply properly just now." },
        { status: response.status },
      )
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I can help with Alderwood Ponds prices, rules, fish sizes, cabins, camping and contact details. What would you like to know?"

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: "George couldn’t reply properly just now." }, { status: 500 })
  }
}
