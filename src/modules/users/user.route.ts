import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

// User create post method /api/v1/users/ 
router.post("/", userController.createUser);

// User info get method
router.get("/", userController.getAlllUsers);

// Single user info get method
router.get("/:id", userController.getSingleUser);

// User info update put method
router.put("/:id", userController.updateUser);

// User delete method
router.delete("/:id", userController.deleteUser);


export const userRouter = router