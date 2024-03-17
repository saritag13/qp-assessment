import { Router } from 'express';
import { createItems, deleteItem, getItem, getItems, updateItems,getItemsForUser,deleteManyItem } from '../controllers/item.controller';

const itemsRouter = Router();
itemsRouter.route("/").get(getItems);
itemsRouter.route("/").post(createItems);
itemsRouter.route("/getallitems").get(getItemsForUser)
itemsRouter.route("/:itemId").get(getItem);
itemsRouter.route("/").delete(deleteManyItem);
itemsRouter.route("/:itemId").delete(deleteItem);
itemsRouter.route("/:itemId").put(updateItems);


export default itemsRouter;

