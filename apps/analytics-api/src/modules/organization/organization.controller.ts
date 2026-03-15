import { Request, Response } from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganization,
} from "./organization.service";
import { slugify } from "../../utils/slugify";

export const createOrganizationController = async (req: Request, res: Response) => {
  try {
    const { name, ownerId } = req.body;

    const slug = slugify(name);

    const org = await createOrganization(name, slug, ownerId);

    res.status(201).json({
      message: "Organization created",
      data: org,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create organization",
      error,
    });
  }
};

export const getOrganizationsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const organizations = await getOrganizations(userId as string);

    res.status(200).json({
      data: organizations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch organizations",
      error,
    });
  }
};

export const getOrganizationController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const org = await getOrganizationById(id);

    if (!org) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    res.status(200).json({
      data: org,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch organization",
      error,
    });
  }
};

export const updateOrganizationController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const slug = name ? slugify(name) : undefined;

    const org = await updateOrganization(id, {
      name,
      slug,
    });

    res.status(200).json({
      message: "Organization updated successfully",
      data: org,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update organization",
      error,
    });
  }
};

export const deleteOrganizationController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    await deleteOrganization(id);

    res.status(200).json({
      message: "Organization deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete organization",
      error,
    });
  }
};
