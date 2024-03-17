import { connect } from "../databaseConfig"
async function checkUniqueOrderId(orderId:string){
    const conn = await connect();
    const userNotFound :any= await conn.query("SELECT orderId FROM orders WHERE orderId = ?",orderId);
    if(userNotFound[0].length==0){
        return true
    }else{
        return false
    }   
}
export async function generateUniqueOrderID():Promise<String|null |undefined>{
    let orderId:string;
    let isUniqueId:boolean;
    let idPartTwo:number;

    try {
        do {
            idPartTwo = Math.floor(100000 + Math.random() * 900000);    
            orderId = "ORDER" + idPartTwo;
            // logger.debug("consumerId---->" + consumerId);
            isUniqueId = await checkUniqueOrderId(orderId);
        } while (!isUniqueId);
        return (orderId);
    } catch (error) {
        console.log("error in generating ",error)
        // logger.error('err =' + error);
    }
}
