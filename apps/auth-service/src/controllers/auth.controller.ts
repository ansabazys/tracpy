import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { db } from "@repo/database";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    res.status(201).json({
      message: "User created",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await db.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await db.session.findUnique({
      where: { refreshToken },
    });

    if (!session) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken(payload.userId);

    res.json({ accessToken });
  } catch {
    res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  await db.session.deleteMany({
    where: { refreshToken },
  });

  res.clearCookie("refreshToken", {
    path: "/auth/refresh",
  });

  res.json({
    message: "Logged out successfully",
  });
};
