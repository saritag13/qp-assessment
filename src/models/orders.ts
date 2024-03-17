export default interface Orders {
    // The '?' indicates that id is optional
    //It is set to AUTO_INCREMENT 
    orderId: string,
    numberOfItems: Number,
    totalCost: number,
    created_at?: Date,
    deliveryAddress: string,
    userId:Number,  
    itemNames: string,
    orderStatus:string,
    paymentStatus:string

}
