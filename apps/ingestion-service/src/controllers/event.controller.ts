import { Request, Response, NextFunction } from "express"
import { TrackEvent } from "../types/event"
import { logger } from "../utils/logger"

export const collectEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = req.body as TrackEvent

    if (!event || !event.siteId || !event.event || !event.url || !event.timestamp) {
      return res.status(400).json({
        error: "Invalid event payload"
      })
    }

    logger.info(
      {
        siteId: event.siteId,
        event: event.event,
        url: event.url
      },
      "Event received"
    )

    res.status(202).json({
      success: true
    })
  } catch (error) {
    next(error)
  }
}