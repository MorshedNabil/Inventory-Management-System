import express from 'express';
import {
  addPurchaseOrder,
  getPurchaseOrders,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from '../controllers/purchaseOrderController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, addPurchaseOrder);
router.get('/', authMiddleware, getPurchaseOrders);
router.put('/:id', authMiddleware, updatePurchaseOrder);
router.delete('/:id', authMiddleware, deletePurchaseOrder);

export default router;
