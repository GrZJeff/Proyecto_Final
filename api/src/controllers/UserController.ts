import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";

export const registerUsers = async (req: Request, res: Response): Promise<any> =>{
    

    try {

        const name = req.body.name
        const email = req.body.email
        const lastNames =req.body.lastNames
        const password = req.body.password
        const rol = req.body.rol

        if (req.user?.rol ==="administrador" && rol == "client"){
            return res.status(400).json({msg:"Los administradores no pueden crear clientes"})
        }





        if(!name || !email || !lastNames || !password || !rol){
            return res.status(400).json({
                msg:"Faltan datos para crear un usuario"
            })        
        }

        if(rol === "administrador" && req.user?.rol !="administrador"){
            return res.status(400).json({
                msg:"No puedes crear un nuevo administrador si no eres uno"
            })
        }

        await UserModel.create({
            nmae:name,
            lastNames:lastNames,
            email:email,
            password:password,
            rol:rol
        })

return res.status (200) .json ({msg: "Usuario registrado con exito!"})
    } catch (error) {
        console.log(error);
        return res.status (500) .json ({msg: "Hubo un error al crear el usuario"})
        
    }

}