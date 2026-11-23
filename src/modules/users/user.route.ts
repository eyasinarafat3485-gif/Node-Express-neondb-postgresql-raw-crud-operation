import { Router } from "express";
import { userController } from "./user.controller.js";
import auth from "../../middleware/auth.js";
import { USER_ROLE } from "../../types/index.js";

const router = Router();


// User create post method /api/v1/users/ 
router.post("/", userController.createUser);

// User info get method and RBAC
router.get("/", auth(USER_ROLE.admin, USER_ROLE.manager), userController.getAlllUsers);

// Single user info get method and RBAC
router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.user), userController.getSingleUser);

// User info update put method and RBAC
router.put("/:id", auth(USER_ROLE.admin, USER_ROLE.user), userController.updateUser);

// User delete method
router.delete("/:id", userController.deleteUser);


export const userRouter = router