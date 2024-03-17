export default interface Users {
    // The '?' indicates that id is optional
    //It is set to AUTO_INCREMENT 
    id?: string,
    userName: string,
    userType:string,
    email: string,
    password:string
    mobileNumber:Number,
    created_at?: Date


}