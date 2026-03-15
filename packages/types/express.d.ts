import { AuthPayload } from "@repo/auth"

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload
      membership?: {
        userId: string
        organizationId: string
        role: "owner" | "admin" | "member"
      }
    }
  }
}