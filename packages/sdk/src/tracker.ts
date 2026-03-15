import type { TrackEventPayload } from "./types"

export async function sendEvent(payload: TrackEventPayload): Promise<void> {
  try {
    await fetch("http://localhost:4001/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
  } catch (error) {
    console.error("Failed to send event", error)
  }
}