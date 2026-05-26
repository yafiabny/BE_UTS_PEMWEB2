import express from "express";
import {
    register,
    login,
    getUsers,
    getUserById,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
