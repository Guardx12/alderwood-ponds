"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Mic, PhoneOff, Radio, Volume2 } from "lucide-react"

type LiveMessage = {
  id: string
  role: "assistant" | "user" | "system"
  content: string
}

type ConnectionState = "idle" | "connecting" | "connected" | "error"

type LeadPayload = {
  name: string
  phone: string
  email: string
  businessName: string
  transcript: string
  source: string
  submittedAt: string
  page: string
  submissionMode: "lead_detected" | "conversation_end" | "page_unload"
  userMessageCount: number
}

const INITIAL_MESSAGES: LiveMessage[] = [
  {
    id: "intro",
    role: "system",
    content:
      "Hi — I’m George, the AI fishery assistant for Alderwood Ponds. Ask me about ticket prices, fish sizes, rules, night fishing, cabins, camping, dogs, or how the fishery works.",
  },
]

const FIRST_RESPONSE_EVENT = {
  type: "response.create",
  response: {
    instructions:
      "Briefly introduce yourself as George, the AI fishery assistant for Alderwood Ponds, then ask in a warm natural way: 'What would you like help with today — prices, rules, fish sizes, night fishing, cabins, camping, or directions?'",
  },
}

function makeMessage(role: LiveMessage["role"], content: string): LiveMessage {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${role}-${Date.now()}-${Math.random()}`,
    role,
    content,
  }
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function buildTranscript(messages: LiveMessage[]) {
  return messages
    .filter((message) => message.role === "assistant" || message.role === "user")
    .map((message) => `${message.role === "assistant" ? "George" : "Visitor"}: ${normalizeWhitespace(message.content)}`)
    .join("\n\n")
}

function extractLeadData(transcript: string) {
  const cleaned = normalizeWhitespace(transcript)
  const lower = cleaned.toLowerCase()

  const phoneMatch = cleaned.match(/(?:\+?44\s?7\d{3}|0\d{4}|0\d{3}|0\d{2}|\+?44\s?\d{2,4})[\d\s()-]{6,16}/)
  const emailMatch = cleaned.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)

  const namePatterns = [
    /(?:my name is|i am|i'm|im|this is|it's|it is|name is)\s+([a-z][a-z]+(?:\s+[a-z][a-z]+){0,2})/i,
    /(?:call me)\s+([a-z][a-z]+(?:\s+[a-z][a-z]+){0,2})/i,
  ]

  let name = ""
  for (const pattern of namePatterns) {
    const match = cleaned.match(pattern)
    if (match?.[1]) {
      name = normalizeWhitespace(match[1]).replace(/[.,!?]+$/, "")
      break
    }
  }

  const phone = phoneMatch ? normalizeWhitespace(phoneMatch[0]) : ""
  const email = emailMatch ? emailMatch[0].trim() : ""

  const hasContactIntent =
    /(?:phone|number|mobile|email|contact|call me|ring me|quote|get in touch|reach me|details|whatsapp|text me|book|booking)/i.test(lower) ||
    Boolean(phone || email)

  return {
    name,
    phone,
    email,
    businessName: "Alderwood Ponds enquiry",
    hasEnoughToSubmit: Boolean(phone || email || (hasContactIntent && name)),
  }
}

function hasMeaningfulTranscript(messages: LiveMessage[]) {
  const userMessages = messages.filter(
    (message) => message.role === "user" && normalizeWhitespace(message.content).length >= 4,
  )
  return userMessages.length >= 1
}

export function GeorgeLiveAssistant() {
  const [messages, setMessages] = useState<LiveMessage[]>(INITIAL_MESSAGES)
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle")
  const [statusText, setStatusText] = useState("Ready when you are")
  const [isModelSpeaking, setIsModelSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const currentAssistantTextRef = useRef("")
  const currentAssistantMessageIdRef = useRef<string | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const messagesRef = useRef<LiveMessage[]>(INITIAL_MESSAGES)
  const submittingLeadRef = useRef(false)
  const submittedLeadFingerprintRef = useRef("")

  useEffect(() => {
    messagesRef.current = messages
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    }
  }, [messages, statusText])

  useEffect(() => {
    return () => {
      void cleanupConversation({ submitTranscript: true })
    }
  }, [])

  const canStart = useMemo(() => connectionState === "idle" || connectionState === "error", [connectionState])

  async function submitLeadCapture(reason: "details_detected" | "conversation_ended" | "page_unload") {
    const transcript = buildTranscript(messagesRef.current)
    if (!transcript.trim()) return false

    const extracted = extractLeadData(transcript)
    const shouldSubmit =
      reason === "details_detected" ? extracted.hasEnoughToSubmit : hasMeaningfulTranscript(messagesRef.current)

    if (!shouldSubmit) return false

    const userMessageCount = messagesRef.current.filter((message) => message.role === "user").length

    const fingerprint = JSON.stringify({
      reason,
      name: extracted.name,
      phone: extracted.phone,
      email: extracted.email,
      businessName: extracted.businessName,
      transcript,
    })

    if (submittedLeadFingerprintRef.current === fingerprint || submittingLeadRef.current) {
      return false
    }

    submittingLeadRef.current = true

    const payload: LeadPayload = {
      source: `Meet George live voice (${reason})`,
      name: extracted.name,
      phone: extracted.phone,
      email: extracted.email,
      businessName: extracted.businessName,
      transcript,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "https://example.com/meet-george",
      submissionMode:
        reason === "details_detected" ? "lead_detected" : reason === "page_unload" ? "page_unload" : "conversation_end",
      userMessageCount,
    }

    try {
      const response = await fetch("/api/george-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: reason === "page_unload",
      })

      if (!response.ok) {
        const details = await response.text().catch(() => "")
        throw new Error(details || `Lead capture error ${response.status}`)
      }

      submittedLeadFingerprintRef.current = fingerprint
      return true
    } catch (submitError) {
      console.error("George live lead capture error", submitError)
      return false
    } finally {
      submittingLeadRef.current = false
    }
  }

  async function maybeSubmitLeadFromTranscript() {
    await submitLeadCapture("details_detected")
  }

  async function cleanupConversation(options?: { submitTranscript?: boolean }) {
    if (options?.submitTranscript) {
      await submitLeadCapture("conversation_ended")
    }

    dcRef.current?.close()
    dcRef.current = null

    if (pcRef.current) {
      pcRef.current.getSenders().forEach((sender) => sender.track?.stop())
      pcRef.current.close()
      pcRef.current = null
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
      localStreamRef.current = null
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.srcObject = null
      audioRef.current.remove()
      audioRef.current = null
    }

    currentAssistantTextRef.current = ""
    currentAssistantMessageIdRef.current = null
    setIsModelSpeaking(false)
  }

  function appendOrUpdateAssistantPartial(delta: string, isFinal = false) {
    if (!delta) return

    if (!currentAssistantMessageIdRef.current) {
      const message = makeMessage("assistant", delta)
      currentAssistantMessageIdRef.current = message.id
      currentAssistantTextRef.current = delta
      setMessages((prev) => [...prev, message])
      if (isFinal) {
        currentAssistantMessageIdRef.current = null
        currentAssistantTextRef.current = ""
      }
      return
    }

    currentAssistantTextRef.current += delta
    const targetId = currentAssistantMessageIdRef.current

    setMessages((prev) =>
      prev.map((message) =>
        message.id === targetId ? { ...message, content: currentAssistantTextRef.current } : message,
      ),
    )

    if (isFinal) {
      currentAssistantMessageIdRef.current = null
      currentAssistantTextRef.current = ""
    }
  }

  function addUserTranscript(text: string) {
    const cleaned = text.trim()
    if (!cleaned) return
    setMessages((prev) => [...prev, makeMessage("user", cleaned)])
    window.setTimeout(() => {
      void maybeSubmitLeadFromTranscript()
    }, 50)
  }

  function handleRealtimeEvent(event: any) {
    const type = event?.type
    if (!type) return

    switch (type) {
      case "session.created":
      case "session.updated":
        setStatusText("Live conversation on")
        break
      case "input_audio_buffer.speech_started":
        setStatusText("Listening…")
        break
      case "input_audio_buffer.speech_stopped":
        setStatusText("Thinking…")
        break
      case "response.created":
        setIsModelSpeaking(true)
        setStatusText("George is replying…")
        break
      case "response.output_audio.delta":
        setIsModelSpeaking(true)
        setStatusText("George is replying…")
        break
      case "response.output_audio.done":
        setIsModelSpeaking(false)
        setStatusText("Listening…")
        break
      case "response.output_audio_transcript.delta":
        appendOrUpdateAssistantPartial(typeof event.delta === "string" ? event.delta : "")
        break
      case "response.output_audio_transcript.done":
        appendOrUpdateAssistantPartial(typeof event.transcript === "string" ? event.transcript : "", true)
        break
      case "conversation.item.input_audio_transcription.completed":
        addUserTranscript(typeof event.transcript === "string" ? event.transcript : "")
        break
      case "response.output_item.done": {
        const content = Array.isArray(event?.item?.content) ? event.item.content : []
        const transcript = content
          .map((part: any) => {
            if (typeof part?.transcript === "string") return part.transcript
            if (typeof part?.text === "string") return part.text
            return ""
          })
          .filter(Boolean)
          .join("\n")

        if (transcript) {
          appendOrUpdateAssistantPartial(transcript, true)
        }
        break
      }
      case "error": {
        const message = event?.error?.message || "George hit a voice error."
        console.error("Realtime error event", event)
        if (connectionState === "connected") {
          setError(message)
          setStatusText("There was a connection problem")
        } else {
          void cleanupConversation()
          setConnectionState("error")
          setStatusText("Could not connect George")
          setError(message)
        }
        break
      }
      default:
        break
    }
  }

  async function startConversation() {
    if (!canStart) return

    await cleanupConversation()
    setConnectionState("connecting")
    setError(null)
    setStatusText("Connecting George…")
    setMessages(INITIAL_MESSAGES)
    messagesRef.current = INITIAL_MESSAGES

    try {
      const tokenResponse = await fetch("/api/george-session", {
        method: "GET",
        cache: "no-store",
      })

      const tokenData = await tokenResponse.json().catch(() => null)
      if (!tokenResponse.ok) {
        throw new Error(
          typeof tokenData?.error === "string" ? tokenData.error : "Could not create a secure live session.",
        )
      }

      const ephemeralKey = tokenData?.value
      if (typeof ephemeralKey !== "string" || !ephemeralKey) {
        throw new Error("Live voice token was missing.")
      }

      const pc = new RTCPeerConnection()
      pcRef.current = pc

      const audio = document.createElement("audio")
      audio.autoplay = true
      ;(audio as any).playsInline = true
      audioRef.current = audio

      pc.ontrack = (event) => {
        audio.srcObject = event.streams[0]
        void audio.play().catch(() => {
          // Browser autoplay can still block occasionally; audio element remains attached to stream.
        })
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      localStreamRef.current = stream
      stream.getTracks().forEach((track) => pc.addTrack(track, stream))

      const dc = pc.createDataChannel("oai-events")
      dcRef.current = dc

      dc.addEventListener("open", () => {
        setConnectionState("connected")
        setStatusText("Listening…")
        window.setTimeout(() => {
          dc.send(JSON.stringify(FIRST_RESPONSE_EVENT))
        }, 150)
      })

      dc.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data)
          handleRealtimeEvent(data)
        } catch (parseError) {
          console.error("Could not parse realtime event", parseError)
        }
      })

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      const response = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      })

      const answerText = await response.text()

      if (!response.ok) {
        let message = "Could not connect George."

        try {
          const parsed = JSON.parse(answerText)
          if (typeof parsed?.error?.message === "string") {
            message = parsed.error.message
          }
        } catch {
          if (answerText.includes("<html") || answerText.includes("<!DOCTYPE html")) {
            message = "The live voice service timed out while connecting. Please try again."
          } else if (answerText.trim()) {
            message = answerText.trim()
          }
        }

        throw new Error(message)
      }

      await pc.setRemoteDescription({ type: "answer", sdp: answerText })
    } catch (err) {
      console.error("George live voice error", err)
      await cleanupConversation()
      setConnectionState("error")
      setStatusText("Could not connect George")
      setError(err instanceof Error ? err.message : "Could not connect George")
    }
  }

  async function stopConversation() {
    await cleanupConversation({ submitTranscript: true })
    setError(null)
    setConnectionState("idle")
    setStatusText("Ready when you are")
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto mb-6 max-w-4xl text-center">
        <div className="mx-auto mb-5 flex max-w-4xl items-center justify-center overflow-hidden rounded-[28px] border border-[#27463D] bg-[linear-gradient(135deg,#0B1512_0%,#10211B_42%,#1E4D3D_100%)] px-6 py-7 text-left shadow-[0_24px_80px_rgba(7,14,12,0.34)] sm:px-8">
          <div className="flex w-full flex-col items-center gap-5 text-center">
            <Image src="/images/george-logo.png" alt="George logo" width={420} height={140} className="h-auto w-full max-w-[320px] sm:max-w-[420px]" priority />
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#CFE5DA] sm:text-sm">Meet George</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your Alderwood Ponds assistant.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#E3F0EA] sm:text-base sm:leading-7">
                George answers questions about Alderwood Ponds and helps visitors quickly find the right information about fishing, staying and visiting.
              </p>
              <p className="mt-4 text-sm font-semibold text-[#A8D5C1] sm:text-base">
                Prices • Rules • Fish sizes • Night fishing • Cabins • Camping
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#5E6F68] sm:text-lg sm:leading-8">
          George can help with tickets, opening hours, fish sizes, rules, dog policies, shelters, camping, directions, and general fishery information.
        </p>
        <p className="mt-4 text-sm font-semibold text-[#1E6B51] sm:text-base">
          Try asking George about prices, rules, night fishing, cabins, camping, or which pond might suit you best.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[28px] border border-[#D8E2DB] bg-white shadow-[0_20px_60px_rgba(10,24,19,0.08)]">
          <div className="flex items-center justify-between border-b border-[#E1E8E2] px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold text-[#15201B]">Live voice conversation</p>
              <p className="mt-1 text-sm text-[#5E6F68]">Speak naturally — George listens and replies out loud.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF6F1] px-3 py-1 text-xs font-semibold text-[#1E6B51]">
              <Radio className="h-3.5 w-3.5" />
              {statusText}
            </div>
          </div>

          <div ref={scrollRef} className="max-h-[520px] space-y-4 overflow-y-auto bg-[#F4F7F4] px-5 py-5 sm:px-6">
            {messages.map((message) => {
              const isAssistant = message.role !== "user"
              return (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:text-[15px] ${
                    isAssistant
                      ? "mr-auto bg-white text-[#15201B] border border-[#E1E8E2]"
                      : "ml-auto bg-[#1E5A46] text-white"
                  }`}
                >
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                    {isAssistant ? "George" : "You"}
                  </p>
                  <p>{message.content}</p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#E1E8E2] px-5 py-4 sm:px-6">
            {connectionState !== "connected" ? (
              <button
                onClick={startConversation}
                disabled={!canStart}
                className="inline-flex items-center gap-2 rounded-full bg-[#1E5A46] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174838] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {connectionState === "connecting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting George…
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Start talking to George
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={stopConversation}
                className="inline-flex items-center gap-2 rounded-full bg-[#13211C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1512]"
              >
                <PhoneOff className="h-4 w-4" />
                End conversation
              </button>
            )}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E2DB] bg-white px-4 py-2 text-sm text-[#365046]">
              <Volume2 className="h-4 w-4 text-[#1E6B51]" />
              Voice enabled
            </div>

            {isModelSpeaking ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E2DB] bg-white px-4 py-2 text-sm text-[#365046]">
                <Loader2 className="h-4 w-4 animate-spin text-[#1E6B51]" />
                George is speaking
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[28px] border border-[#D8E2DB] bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
            <h2 className="text-lg font-semibold text-[#15201B]">What George knows</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5E6F68]">
              <li>Ticket prices for day fishing, night fishing, guests, dogs, cabins, and camping.</li>
              <li>Fish sizes, ponds on site, disabled access, opening hours, and payment information.</li>
              <li>Fishery rules, required gear, dog rules, cabin details, camping details, and directions.</li>
              <li>Recent reports and general information about Alderwood Ponds.</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#D8E2DB] bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
            <h2 className="text-lg font-semibold text-[#15201B]">Good things to ask</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5E6F68]">
              <li>What are the day ticket prices?</li>
              <li>Can I night fish and how much does it cost?</li>
              <li>What rules do I need to know before I come?</li>
              <li>Are dogs allowed and what are the dog rules?</li>
              <li>Tell me about the cabins and camping.</li>
              <li>What fish are in the lakes and how big do they grow?</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#D8E2DB] bg-[linear-gradient(180deg,#F4F8F5_0%,#E7F0EA_100%)] p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1E6B51]">Need to book or confirm details?</p>
            <p className="mt-3 text-sm leading-6 text-[#365046]">
              George can explain the website information, but for bookings and direct enquiries the site still points
              visitors to the booking line on 07713 468264, Monday to Friday, 9am to 12 midday.
            </p>
          </div>

          {error ? (
            <div className="rounded-[24px] border border-[#E7C7B6] bg-[#FFF7F2] p-4 text-sm text-[#7A3B1C]">
              <p className="font-semibold">George couldn’t connect just now.</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  )
}
