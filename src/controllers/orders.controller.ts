import { connect } from "../databaseConfig"
import { Request, Response } from 'express';
import Orders from '../models/orders';
import {generateUniqueOrderID} from '../utils/genrateIds';
import { isUser,isAdmin } from '../utils/autherization';
export async function createOrders(req: Request, res: Response) {
    let isAuth:Boolean= await isUser(req,res)
    if(isAuth) {
            const newOrder: Orders = req.body;
            const conn = await connect();
            newOrder['orderId'] = await generateUniqueOrderID() as string;
            let itemDetails=req.body.itemDetails;
            delete req.body.itemDetails;
            newOrder['userId']= parseInt(req.params.userId)
            newOrder['orderStatus']="Pending"
            newOrder['paymentStatus']="UnPaid"
            conn.query(`INSERT INTO orders SET ?`, [newOrder]).then((result)=>{
                    if(!result){
                        return res.status(500).json({
                            error: "error in creating order"
                        });
                    }
                    for(let item of itemDetails){
                        item.push(newOrder['orderId'])

                    }
                    conn.query(`INSERT INTO orderred_items (quantity,unit,cost,itemId,orderId) VALUES ?`, [itemDetails]).then(orderItemsSaveRes=>{
                        if(!orderItemsSaveRes){
                            return res.status(500).json({
                                error: "error in creating order"
                            });
                        }
                        return res.status(200).json({
                            message: "order created succesfuly"
                        });
                    })                    
                }).catch(err=>{
                    console.log(err)
                    return res.status(500).json({
                        message: "order creation Failed"
                    });
            
                })
    }else{
        return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized user ' });
    }     
    
   
}

export async function getAllOrders(req: Request, res: Response) {
    const orderStatus = req.query.status;
    let isAuth:Boolean= await isAdmin(req,res)
    if(isAuth) {
            try {
                const conn = await connect();
            // let sql = "SELECT * FROM orders WHERE orderStatus = ",orderStatus;
            let allOrders= await conn.query('SELECT * FROM orders WHERE orderStatus = ?',[orderStatus])
            return res.status(200).json(allOrders[0])
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    error: "error in creating order"
                }); 
            }
        }else{
            return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
        }    
}

export async function orderStatusChange(req: Request, res: Response) {
    const orderId = req.params.orderId;
    let status=req.body;
    let isAuth:Boolean= await isAdmin(req,res)
    if(isAuth) {
        try {
            const conn = await connect();
            await conn.query('UPDATE orders SET ? WHERE orderId = ?',[status,orderId])
            return res.status(200).json({message:"order status updted successfully"})
        } catch (error) {
            return res.status(500).json({
                error: "error in creating order"
            }); 
        }
    }else{
        return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
    }    
}
