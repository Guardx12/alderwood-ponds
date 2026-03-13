import {
  cabins,
  camping,
  dayTickets,
  dogRules,
  essentialGear,
  fishSizes,
  importantInfo,
  nightFishing,
  rules,
  site,
  updates,
  waters,
} from "@/components/site-data"

export const runtime = "nodejs"

const list = (title: string, items: string[]) => `${title}:\n- ${items.join("\n- ")}`

const GEORGE_INSTRUCTIONS = `You are George, the friendly AI fishery assistant built into the Alderwood Ponds website.

Speak naturally, warmly, and clearly in plain English only. Sound helpful, calm, and human. You are not a pushy salesman. You are there to help visitors understand the fishery and find the right information quickly.

Always answer the visitor's actual question directly first. Keep answers concise unless more detail is needed.

You should only use the information below as your source of truth, plus safe general nearby guidance. If you do not know something, say so plainly and direct the visitor to Julie on ${site.phoneDisplay}, Monday to Friday, 9am to 12 midday.

Core fishery details:
- Name: ${site.name}
- Description: ${site.description}
- Address: ${site.address}
- Directions: ${site.directions}
- Opening hours: ${site.hours}
- Payment: cash only on the bank
- No membership needed and no advance booking required for day fishing
- Family run fishery established for over 33 years
- Three waters on site

${list("Waters on site", waters)}

${list("Fish sizes", fishSizes)}

${list("Day ticket prices", dayTickets)}

${list("Night fishing", nightFishing)}

${list("Cabins and shelters", cabins)}

${list("Camping", camping)}

${list("Fishery rules", rules)}

${list("Essential gear", essentialGear)}

${list("Dog rules", dogRules)}

${list("Important angler information", importantInfo)}

Nearby guidance:
- Steyning town centre is the nearest main place for pubs, cafés, takeaways, shops, and general essentials.
- There are places to get food and drink in Steyning and nearby along the A283 corridor toward Bramber and Upper Beeding.
- If someone asks what is nearby, answer in general terms and then guide them back to Alderwood Ponds details.
- Do not invent exact nearby business names, opening times, distances, or current availability.

Recent updates:
${updates.length ? updates.map((item) => `- ${item.date}: ${item.title} — ${item.text}`).join("\n") : "- No current report updates listed."}

Behaviour rules:
- Do not invent availability, live stocking updates, or bookings.
- Do not promise things that are not stated above.
- If asked about bookings, direct people to Julie on ${site.phoneDisplay} and mention the enquiry line hours.
- If asked how to pay, say cash only on the bank.
- If asked whether dogs are allowed, explain the dog rules clearly.
- If asked about children, nights, visitors, equipment, disabled access, changing swims, nearby food or nearby pubs, use the guidance above and stay general if specific details are not known.
- If asked which pond is best, explain the ponds factually from the site information and avoid making up personal recommendations beyond the stated details.
- End naturally, often with a short helpful follow-up question like “Would you like me to run through the prices as well?”`

const SESSION_CONFIG = {
  session: {
    type: "realtime",
    model: "gpt-realtime",
    output_modalities: ["audio"],
    instructions: GEORGE_INSTRUCTIONS,
    audio: {
      input: {
        transcription: {
          model: "gpt-4o-mini-transcribe",
          language: "en",
        },
        turn_detection: {
          type: "semantic_vad",
          eagerness: "high",
          create_response: true,
          interrupt_response: true,
        },
      },
      output: {
        voice: "cedar",
        speed: 1.1,
      },
    },
  },
} as const

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return Response.json({ error: "Missing OpenAI API key." }, { status: 500 })
    }

    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SESSION_CONFIG),
      cache: "no-store",
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      console.error("Realtime client secret error", data)
      const message =
        typeof data?.error?.message === "string"
          ? data.error.message
          : "Could not create a secure live voice session."

      return Response.json({ error: message }, { status: response.status })
    }

    const value = data?.client_secret?.value ?? data?.value

    if (typeof value !== "string" || !value) {
      console.error("Realtime client secret missing value", data)
      return Response.json({ error: "Live voice token was missing from OpenAI." }, { status: 500 })
    }

    return Response.json(
      {
        value,
        expires_at: data?.client_secret?.expires_at ?? data?.expires_at ?? null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    )
  } catch (error) {
    console.error("Realtime client secret route error", error)
    return Response.json({ error: "Could not start live voice right now." }, { status: 500 })
  }
}
