import { Request, Response, NextFunction } from "express";
import passwordEncoder from "../configs/password-encoder.config";
import { accessToken, refreshToken } from "../configs/token.config";
import userService from "../services/user.service";
import { User, UserIncludedUid, UserPayload } from "../types/user.type.";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user: UserIncludedUid = await userService.readOneByEmail(email);
      if (!(await passwordEncoder.compare(password, user.password))) {
        throw new Error("not matched user password");
      }

      const payload: UserPayload = {
        uid: user.uid,
        username: user.username,
        email: user.email,
      };

      const issuedAccessToken = await accessToken.generateToken(payload, "30m");
      const issuedRefreshToken = await refreshToken.generateToken(
        payload,
        "90h"
      );
      res.status(201).json({
        accessToken: issuedAccessToken,
        refreshToken: issuedRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
