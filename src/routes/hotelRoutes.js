import express from "express";
import { HotelController } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", HotelController.getAll);
router.get("/:id", HotelController.getById);
router.post("/", HotelController.create);
router.put("/:id", HotelController.update);
router.delete("/:id", HotelController.remove);

export default router;
