import { authenticate } from "../middlewares/authMiddleware.js";
import {
    getCategories,
    createCategory,
    deleteCategory,
    getCategoryById,
    updateCategory,
} from "../controllers/categoryController.js";
import express from "express";

const router = express.Router();


router.get("/", getCategories);
router.get("/:id", getCategoryById);


router.post("/", authenticate, createCategory);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
