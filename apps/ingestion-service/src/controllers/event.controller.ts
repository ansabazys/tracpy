import { Request, Response, NextFunction } from "express";
import geoip from "geoip-lite";
import { db } from "@repo/database";
import { logger } from "../utils/logger";
import { eventSchema } from "../validators/event.validator";
import { detectDevice } from "../utils/device";

export const collectEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate payload
    const parsed = eventSchema.safeParse(req.body);

    if (!parsed.success) {
      logger.warn("Invalid event payload received");

      return res.status(400).json({
        error: "Invalid event payload",
        details: parsed.error.flatten(),
      });
    }

    const event = parsed.data;

    // Check website exists
    const website = await db.website.findUnique({
      where: { id: event.siteId },
      select: { id: true },
    });

    if (!website) {
      logger.warn(`Invalid websiteId received: ${event.siteId}`);

      // silently ignore invalid events
      return res.status(204).end();
    }

    // Extract headers
    const userAgent = req.headers["user-agent"] ?? "";
    const referrer = req.headers["referer"] ?? null;

    // Detect device/browser/os
    const { device, browser, os } = detectDevice(userAgent);

    // Extract path safely
    let path = "/";
    try {
      path = new URL(event.url).pathname;
    } catch {
      logger.warn("Invalid URL received in event payload");
    }

    // Detect client IP
    let ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || null;

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = null;
    }

    // Geo lookup
    const geo = ip ? geoip.lookup(ip) : null;
    const country = geo?.country ?? null;

    // Store event
    await db.event.create({
      data: {
        websiteId: event.siteId,
        visitorId: event.visitorId,
        sessionId: event.sessionId,
        event: event.event,
        path,
        referrer,
        device,
        browser,
        os,
        country,
      },
    });

    logger.info(
      {
        siteId: event.siteId,
        event: event.event,
        visitorId: event.visitorId,
        device,
        browser,
        os,
        country,
      },
      "Event stored",
    );

    return res.status(202).json({
      success: true,
    });
  } catch (error) {
    logger.error(error, "Failed to process event");

    return next(error);
  }
};
