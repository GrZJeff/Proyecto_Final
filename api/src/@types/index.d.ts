interface IUser {
    _id: string;
    name:string;
    email:string;
    lastNames:string,
    password:string;
    rol: "administrador" | "client";
}


declare namespace Express{
    export interface Request{
        user?:IUser
    }
}