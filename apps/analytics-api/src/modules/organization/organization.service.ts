import { db } from "@repo/database";

export const createOrganization = async (name: string, slug: string, ownerId: string) => {
  return db.organization.create({
    data: {
      name,
      slug,
      ownerId,
      memberships: {
        create: {
          userId: ownerId,
          role: "owner",
        },
      },
    },
  });
};
export const getOrganizations = async (userId: string) => {
  const memberships = await db.membership.findMany({
    where: { userId },
    include: { organization: true },
  });

  return memberships.map((m) => m.organization);
};

export const getOrganizationById = async (id: string) => {
  return db.organization.findUnique({
    where: { id },
  });
};

export const updateOrganization = async (id: string, data: { name?: string; slug?: string }) => {
  return db.organization.update({
    where: { id },
    data,
  });
};

export const deleteOrganization = async (id: string) => {
  return db.organization.delete({
    where: { id },
  });
};
