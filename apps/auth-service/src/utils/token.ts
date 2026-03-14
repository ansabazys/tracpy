import jwt from "jsonwebtoken";
import { env } from "@repo/config";

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_ACCESS_SECRET!, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET!, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET!) as { userId: string };
}
