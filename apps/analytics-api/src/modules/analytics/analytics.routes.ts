import { Router } from "express";
import {
  getPageViews,
  getPageViewsByPage,
  getUniqueVisitors,
  getTrafficSources,
  getDevices,
  getBrowsers,
} from "./analytics.controller";

const router = Router();

router.get("/pageviews/:websiteId", getPageViews);
router.get("/pages/:websiteId", getPageViewsByPage);
router.get("/visitors/:websiteId", getUniqueVisitors);
router.get("/sources/:websiteId", getTrafficSources);
router.get("/devices/:websiteId", getDevices);
router.get("/browsers/:websiteId", getBrowsers);

export default router;
