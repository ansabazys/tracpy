import { Router } from "express";
import {
  getPageViews,
  getPageViewsByPage,
  getUniqueVisitors,
  getTrafficSources,
} from "./analytics.controller";

const router = Router();

router.get("/pageviews/:websiteId", getPageViews);
router.get("/pages/:websiteId", getPageViewsByPage);
router.get("/visitors/:websiteId", getUniqueVisitors);
router.get("/sources/:websiteId", getTrafficSources);

export default router;
