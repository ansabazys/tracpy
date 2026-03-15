import { db } from "@repo/database";

export const getOrganizationMembers = async (organizationId: string) => {
  return db.membership.findMany({
    where: {
      organizationId,
    },
    include: {
      user: true, // include user details
    },
  });
};

export const addMember = async (
  organizationId: string,
  userId: string,
  role: "owner" | "admin" | "member",
) => {
  return db.membership.create({
    data: {
      organizationId,
      userId,
      role,
    },
  });
};

export const updateMemberRole = async (
  organizationId: string,
  userId: string,
  role: "owner" | "admin" | "member",
) => {
  return db.membership.update({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
    data: {
      role,
    },
  });
};

export const removeMember = async (organizationId: string, userId: string) => {
  return db.membership.delete({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });
};
