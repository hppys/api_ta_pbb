import express from "express";
import { RentalController } from "../controllers/rentalController.js";

const router = express.Router();

router.get("/", RentalController.getAll);
router.get("/:id", RentalController.getById);
router.post("/", RentalController.create);
router.put("/:id", RentalController.update);
router.delete("/:id", RentalController.remove);

export default router;
