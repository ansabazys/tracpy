import express from "express";
import {
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationController,
  getOrganizationsController,
  updateOrganizationController,
} from "./organization.controller";

import { authenticate } from "@repo/auth";
import { requireOrganizationMember } from "../../middleware/organization-access.middleware";
import { requireOrganizationAdmin } from "../../middleware/role.middleware";


const router = express.Router();

/*
Create organization
Authenticated user creates their own organization
*/
router.post("/", authenticate, createOrganizationController);

/*
Get all organizations of current user
*/
router.get("/", authenticate, getOrganizationsController);

/*
Get single organization
User must belong to organization
*/
router.get(
  "/:id",
  authenticate,
  requireOrganizationMember,
  getOrganizationController
);

/*
Update organization
Only admin / owner allowed
*/
router.patch(
  "/:id",
  authenticate,
  requireOrganizationMember,
  requireOrganizationAdmin,
  updateOrganizationController
);

/*
Delete organization
Only owner/admin allowed
*/
router.delete(
  "/:id",
  authenticate,
  requireOrganizationMember,
  requireOrganizationAdmin,
  deleteOrganizationController
);

export default router;