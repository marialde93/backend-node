import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, getUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.delete("/:id", authMiddleware, deleteUser);

export { userRouter };
