import { type Request, type Response } from "express";
import { userService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";

// User create post method /api/v1/users/
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "User Created Successfull!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

// User info get method
const getAlllUsers = async (req: Request, res: Response) => {
  try {
    console.log("From controller", req.user);
    const result = await userService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully done!",
      data: result.rows,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrived successfully done!",
      data: result.rows,
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

// Single user info get method
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal Server Error!",
      error: error,
    });
  }
};

// updateUser put method
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUserFromDB(req.body, id as string);
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found!",
      });
    }
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

// user delete method
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAlllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
