import { enqueueEvent, initTracker } from "./tracker";
import { getVisitorId } from "./visitor";
import { getSessionId } from "./session";
import type { TrackEvent, TrackerConfig } from "./types";

export class Tracpy {
  private siteId: string;
  private pageviewSent = false;

  constructor(siteId: string, config?: Partial<TrackerConfig>) {
    this.siteId = siteId;

    initTracker({
      endpoint: "http://localhost:4000/events/collect",
      ...config,
    });

    this.trackPageview();
    this.initSpaTracking();
  }

  private trackPageview() {
    if (this.pageviewSent) return;

    this.pageviewSent = true;
    this.track("pageview");
  }

  track(event: string, data?: Record<string, unknown>) {
    const payload: TrackEvent = {
      siteId: this.siteId,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      event,
      url: window.location.href,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      data,
    };

    enqueueEvent(payload);
  }

  private initSpaTracking() {
    const pushState = history.pushState;

    history.pushState = (...args) => {
      pushState.apply(history, args);
      this.pageviewSent = false;
      this.trackPageview();
    };

    window.addEventListener("popstate", () => {
      this.pageviewSent = false;
      this.trackPageview();
    });
  }
}
