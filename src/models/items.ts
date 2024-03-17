export default interface Items {
    // The '?' indicates that id is optional
    //It is set to AUTO_INCREMENT 
    id?: string,
    itemName: string,
    description: string,
    created_at?: Date,
    cost: Number,
    availability:boolean,
    isEnabled:boolean,
    quantity: Number,
    unit:string


}