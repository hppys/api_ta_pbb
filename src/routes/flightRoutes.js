import express from "express";
import { FlightController } from "../controllers/flightController.js";

const router = express.Router();

router.get("/", FlightController.getAll);
router.get("/:id", FlightController.getById);
router.post("/", FlightController.create); // Uncomment jika method ada di Controller
router.put("/:id", FlightController.update);
router.delete("/:id", FlightController.remove);

export default router;
