import { Router } from 'express';
import { createOrders,getAllOrders,orderStatusChange } from '../controllers/orders.controller';
const orderRouter = Router();
orderRouter.route("/:userId").post(createOrders);
orderRouter.route("/:orderId").patch(orderStatusChange);
orderRouter.route("/").get(getAllOrders);

export default orderRouter;