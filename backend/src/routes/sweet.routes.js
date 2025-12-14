import express from "express";
import authMiddleware, { adminOnly } from "../middleware/auth.middleware.js";

import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweet.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", adminOnly, addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.put("/:id", adminOnly, updateSweet);
router.delete("/:id", adminOnly, deleteSweet);

router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", adminOnly, restockSweet);

export default router;
