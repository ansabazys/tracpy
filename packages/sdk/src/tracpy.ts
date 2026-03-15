import { sendEvent } from "./tracker"
import type { TrackEventPayload } from "./types"

export class Tracpy {
  private siteId: string

  constructor(siteId: string) {
    this.siteId = siteId
  }

  track(event: string, data?: Record<string, unknown>): void {
    const payload: TrackEventPayload = {
      siteId: this.siteId,
      event,
      data,
      url: window.location.href,
      timestamp: Date.now()
    }

    sendEvent(payload)
  }
}