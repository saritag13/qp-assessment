import { Request, Response ,} from 'express';
import { connect } from "../databaseConfig"
import Items from '../models/items';
import { isAdmin } from '../utils/autherization';

export async function createItems(req: Request, res: Response) {
    try {
        let isAuth:Boolean= await isAdmin(req,res)
        if(isAuth) {
                const newItems: Items = req.body;
            const conn = await connect();
            await conn.query(`INSERT INTO items SET ?`, [newItems])
            return res.status(200).json({
                message: "Item saved successFully"
            });
        }else{
            return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });

        }
    } catch (error) {
        return res.status(500).json({
            error: "Failed to Save the item"
        });
    }
    
}
export async function getItems(req: Request, res: Response): Promise<Response> {
    let isAuth:Boolean= await isAdmin(req,res)
        if(isAuth) {        
            try {
                const conn = await connect();
                const items = await conn.query("SELECT * FROM items");
                return res.status(200).json(items[0]);
            } catch (error) {
                return res.status(500).json({
                    error: "Failed to get all item"
                });
            }
        }else{
            return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
        }
    
}
export async function getItemsForUser(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const items = await conn.query("SELECT * FROM items WHERE availability = 1 AND isEnabled = 1 ");
        return res.status(200).json(items[0]);
    } catch (error) {
        return res.status(500).json({
            error: "Failed to get items for user"
        }); 
    }
    
}
export async function getItem (req: Request, res: Response): Promise<Response> {
    const id = req.params.itemId;
    let isAuth:Boolean= await isAdmin(req,res)
        if(isAuth) {        
        try {
            const conn = await connect();
            const item = await conn.query(`SELECT * FROM items WHERE itemId = ?`, [id])
            return res.status(500).json(item[0])
        } catch (error) {
            return res.status(500).json({
                error: "Failed to get item by id"
            }); 
        }
    }else{
        return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
    }

}
export async function updateItems(req: Request, res: Response) {
    const id = req.params.itemId;
    const updateItem: Items = req.body;
    let isAuth:Boolean= await isAdmin(req,res)
    if(isAuth) {
        
            try {
                const conn = await connect();
                await conn.query(`UPDATE items SET ? WHERE itemId = ?`, [updateItem, id])
                return res.json({
                    message: "Item updated"
                })
            } catch (error) {
                return res.status(500).json({
                    error: "Failed to Update item"
                });
            }
        }else{
            return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
        }
}

export async function deleteItem(req: Request, res: Response) {
    const id = req.params.itemId;
    let isAuth:Boolean= await isAdmin(req,res)
        if(isAuth) {        
        try {
            const conn = await connect();
            await conn.query(`DELETE FROM items WHERE itemId = ?`, [id])
            conn.end()
            return res.json({
                message: "Item deleted successfully"
            })
            
        } catch (error) {
            return res.status(500).json({
                error: "Failed to item deleted"
            });
        }
    }else{
        return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
    }
    
}
export async function deleteManyItem(req: Request, res: Response) {
    const ItemIDs = req.query.itemIds;
    let isAuth:Boolean= await isAdmin(req,res)
        if(isAuth) {
            try {
                const conn = await connect();
                await conn.query(`DELETE FROM items WHERE itemId IN ${ItemIDs}`)
                conn.end()
                return res.json({
                    message: "Selected Items deleted successfully"
                })
                
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    error: "Failed to delete Items"
                });
            }
        }else{
            return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
        }
    
}
