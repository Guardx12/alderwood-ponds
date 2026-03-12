export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const text = typeof body?.text === "string" ? body.text.trim() : ""

    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing OpenAI API key." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "ash",
        input: text,
        instructions:
          "Speak in a warm, clear, upbeat British-style voice like a friendly fishery receptionist who knows the site well.",
        speed: 1.1,
        format: "mp3",
      }),
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "George couldn’t speak just now." }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer())

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return new Response(JSON.stringify({ error: "George couldn’t speak just now." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
