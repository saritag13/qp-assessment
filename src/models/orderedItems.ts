export default interface OrderedItems {
    // The '?' indicates that id is optional
    //It is set to AUTO_INCREMENT 
    quantity: Number,
    unit: string,
    cost: Number,
    created_at?: Date,
    itemId: string,
    orderId:string

}