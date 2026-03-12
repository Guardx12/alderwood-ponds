"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
}

const welcome =
  "Hi — I’m George for Alderwood Ponds. I can help with prices, fish sizes, rules, night fishing, cabins, camping, dog rules, and general information about the fishery."

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function GeorgeAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: uid(), role: "assistant", content: welcome }])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState("")
  const recorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const history = useMemo(
    () => messages.map(({ role, content }) => ({ role, content })),
    [messages],
  )

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isTyping, isTranscribing])

  async function speak(text: string) {
    if (!voiceEnabled || !text) return
    try {
      setIsSpeaking(true)
      const response = await fetch("/api/george/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      if (!response.ok) return
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(url)
      }
      audio.onerror = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(url)
      }
      await audio.play()
    } catch {
      setIsSpeaking(false)
    }
  }

  async function sendMessage(raw: string) {
    const message = raw.trim()
    if (!message || isTyping || isTranscribing) return

    const nextMessages = [...messages, { id: uid(), role: "user" as const, content: message }]
    setMessages(nextMessages)
    setInput("")
    setError("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/george", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || "George could not reply.")
      }
      const reply = typeof data?.reply === "string" ? data.reply : "Sorry, I couldn't answer that properly."
      setMessages((current) => [...current, { id: uid(), role: "assistant", content: reply }])
      void speak(reply)
    } catch (err) {
      setError(err instanceof Error ? err.message : "George could not reply.")
    } finally {
      setIsTyping(false)
    }
  }

  async function stopRecording() {
    recorderRef.current?.stop()
    setIsRecording(false)
  }

  async function startRecording() {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      audioChunksRef.current = []
      recorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const form = new FormData()
        form.append("file", new File([blob], "recording.webm", { type: "audio/webm" }))
        setIsTranscribing(true)
        try {
          const response = await fetch("/api/george/transcribe", {
            method: "POST",
            body: form,
          })
          const data = await response.json()
          if (!response.ok) {
            throw new Error(data?.error || "Could not transcribe audio.")
          }
          const text = typeof data?.text === "string" ? data.text.trim() : ""
          if (text) {
            await sendMessage(text)
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not transcribe audio.")
        } finally {
          setIsTranscribing(false)
        }
      }

      recorder.start()
      setIsRecording(true)
    } catch {
      setError("Microphone access was blocked or unavailable.")
    }
  }

  return (
    <section className="george-shell container">
      <div className="section-heading narrow-heading">
        <span>Meet George</span>
        <h1>George for Alderwood Ponds</h1>
        <p>
          George is trained on the Alderwood Ponds website information, so visitors can ask about rules, prices, fish,
          camping, cabins, dogs, and booking details in plain English.
        </p>
      </div>

      <div className="assistant-card">
        <div className="assistant-topbar">
          <div className="assistant-avatar">G</div>
          <div>
            <strong>George</strong>
            <p>Alderwood Ponds digital assistant</p>
          </div>
          <button className="voice-toggle" type="button" onClick={() => setVoiceEnabled((v) => !v)}>
            {voiceEnabled ? "Voice on" : "Voice off"}
          </button>
        </div>

        <div className="assistant-messages" ref={scrollRef}>
          {messages.map((message) => (
            <div key={message.id} className={`message-row ${message.role}`}>
              <div className={`message-bubble ${message.role}`}>{message.content}</div>
            </div>
          ))}
          {isTyping ? (
            <div className="message-row assistant">
              <div className="message-bubble assistant">George is replying…</div>
            </div>
          ) : null}
          {isTranscribing ? (
            <div className="message-row assistant">
              <div className="message-bubble assistant">George is listening…</div>
            </div>
          ) : null}
        </div>

        <div className="assistant-controls">
          <button type="button" className={`mic-button ${isRecording ? "recording" : ""}`} onClick={() => (isRecording ? stopRecording() : startRecording())}>
            {isRecording ? "Stop" : "Mic"}
          </button>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={isRecording ? "Listening…" : "Message George… or use the mic"}
            rows={1}
          />
          <button type="button" className="send-button" onClick={() => void sendMessage(input)}>
            Send
          </button>
        </div>
        {error ? <p className="assistant-error">{error}</p> : null}
      </div>
    </section>
  )
}
