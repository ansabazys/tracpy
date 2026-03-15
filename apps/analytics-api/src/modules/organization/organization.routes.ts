import express from "express";
import {
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationController,
  getOrganizationsController,
  updateOrganizationController,
} from "./organization.controller";

const router = express.Router();

router.post("/", createOrganizationController);

router.get("/", getOrganizationsController);
router.get("/:id", getOrganizationController);

router.patch("/:id", updateOrganizationController);

router.delete("/:id", deleteOrganizationController);

export default router;
