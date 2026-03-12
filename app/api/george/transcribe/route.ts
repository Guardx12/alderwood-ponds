import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const incoming = await request.formData()
    const file = incoming.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Audio file is required." }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OpenAI API key." }, { status: 500 })
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("model", "gpt-4o-mini-transcribe")

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message || "George couldn’t hear that properly." }, { status: response.status })
    }

    return NextResponse.json({ text: data?.text || "" })
  } catch {
    return NextResponse.json({ error: "George couldn’t hear that properly." }, { status: 500 })
  }
}
