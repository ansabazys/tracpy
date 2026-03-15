import { Router } from "express";
import {
  addMemberController,
  getMembersController,
  removeMemberController,
  updateMemberRoleController,
} from "./membership.controller";

const router = Router();

router.get("/:id/members", getMembersController);

router.post("/:id/members", addMemberController);

router.patch("/:id/members/:userId", updateMemberRoleController);

router.delete("/:id/members/:userId", removeMemberController);

export default router;
