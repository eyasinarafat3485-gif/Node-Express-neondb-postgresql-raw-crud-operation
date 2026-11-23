import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // http-> false, https-> true /In production is "true"
      httpOnly: true, // Prevent XSS attack
      sameSite: "lax", // "none", "strict", "lax"
      // maxAge: ,
      path: "/",
      domain: "localhost", // production like bengal.com.bd
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message,
      error: error,
    });
  }
};
const generateToken = async (req: Request, res: Response) => {
  try {
    console.log(req.cookies.refreshToken);
    const result = await authService.generateAccessToken(
      req.cookies.refreshToken,
    );
    // const {refreshToken} = result;

    res.status(200).json({
      success: true,
      message: "Access token genereate successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  generateToken,
};
