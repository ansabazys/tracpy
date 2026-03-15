import { Request, Response } from "express";
import {
  addMember,
  getOrganizationMembers,
  removeMember,
  updateMemberRole,
} from "./membership.service";

export const getMembersController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const members = await getOrganizationMembers(id);

    res.status(200).json({
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch members",
      error,
    });
  }
};

export const addMemberController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;

    const member = await addMember(id, userId, role);

    res.status(201).json({
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add member",
      error,
    });
  }
};

export const updateMemberRoleController = async (
  req: Request<{ id: string; userId: string }>,
  res: Response,
) => {
  try {
    const { id, userId } = req.params;
    const { role } = req.body;

    const member = await updateMemberRole(id, userId, role);

    res.status(200).json({
      message: "Member role updated successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update member role",
      error,
    });
  }
};

export const removeMemberController = async (
  req: Request<{ id: string; userId: string }>,
  res: Response,
) => {
  try {
    const { id, userId } = req.params;

    await removeMember(id, userId);

    res.status(200).json({
      message: "Member removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove member",
      error,
    });
  }
};
