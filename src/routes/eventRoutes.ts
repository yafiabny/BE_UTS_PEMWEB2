import {
    getEvents,
    createEvent,
    deleteEvent,
    getEventById,
    updateEvent,
} from "../controllers/eventController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();


router.get("/", getEvents);
router.get("/:id", getEventById);


router.post("/", authenticate, createEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
