import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken";

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

        const user = await UserModel.create({
            name:name,
            lastNames:lastNames,
            email:email,
            password:password,
            rol:rol
        })

        const token = jwt.sign(JSON.stringify(user),"shhh")

return res.status (200) .json ({msg: "Usuario registrado con exito!",token})
    } catch (error) {
        console.log(error);
        return res.status (500) .json ({msg: "Hubo un error al crear el usuario"})
        
    }

}

export const signIn = async (req:Request, res:Response):Promise<void> =>{
try{

    const user = await UserModel.findOne({email:req.body.email,password:req.body.password});

    if(!user){
        res.status(400).json({
            msg:"No hay coincidencias en el sistema"
        })
        return;
       }
       const token = jwt.sign(JSON.stringify(user), "pocoyo");
       res.status(200).json({ msg: "Sesion iniciada con exito", token, user})
       return;



    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hubo un error al iniciar sesion"
        })
        return
    }

}





