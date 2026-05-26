import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
    getPembicaras,
    createPembicara,
    getPembicaraById,
    updatePembicara,
    deletePembicara,
} from "../controllers/pembicaraController.js";

const router = express.Router();


router.get("/", getPembicaras);
router.get("/:id", getPembicaraById);


router.post("/", authenticate, createPembicara);
router.put("/:id", authenticate, updatePembicara);
router.delete("/:id", authenticate, deletePembicara);

export default router;
