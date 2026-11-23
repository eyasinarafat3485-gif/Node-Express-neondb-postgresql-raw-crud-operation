import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
import type { Role } from "../types/index.js";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);
    try {
      // 1-> Check if the token exist
      // 2-> Verify token
      // 3-> Check the user exist
      // 4-> Is the user status active

      // console.log("This is a protected route!");
      // console.log(req.headers.authorization);
      // 1-> Check if the token exist
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }
      // 2-> Verify token
      const decode = jwt.verify(
        token as string,
        config.jwt_secret,
      ) as JwtPayload;
      //   console.log(decode);

      const user = await pool.query(
        `
    SELECT * FROM users WHERE email=$1
    `,
        [decode.email],
      );
      //   console.log(user.rows[0]);
      // 3-> Check the user exist
      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
      // 4-> Is the user status active
      if (!user.rows[0].is_active) {
        return res.status(404).json({
          success: false,
          message: "Forbidden",
        });
      }

      // roles = ["admin", "manager", "user"]
      // user.role = "admin"
      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      req.user = decode;
      //   console.log(req);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
