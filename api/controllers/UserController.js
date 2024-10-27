import bcrypt from "bcrypt";
import { UserModel } from "../models/UsersModel.js"
import jwt from "jsonwebtoken";

export default {

    register: async (req, res) => {
        try{
            const hash = await bcrypt.hash(req.body.password, 13)
            const user = {
                name:req.body.name,
                email:req.body.email,
                password:hash,
                CURP:req.body.CURP,
                rol:req.body.rol,
            };
            await UserModel.create(user);
            res.status(201).json({msg:"Usuario registrado con exito"})
        } catch (error){
            res.status(500).json({msg: "Ocurrio un error al registrarte"})
            console.log(error)
        }
    } ,
    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                return res.status(400).json({msg: "Parametros invalidos"})
            }
    
            const user = await UserModel.findOne({email});
            if(!user) {
                return res.status(403).json({msg: "Usuario no encontrado"})
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(403).json({ msg: "Credenciales inválidas" });
            }
            const token = await jwt.sign({ _id: user._id, email: user.email }, process.env.PRIVATE_KEY);
    
            return res.status(202).json({token})

        } catch (error) {
            res.status(500).json({msg: "Ocurrio un error al iniciar sesion"})
            console.log(error)
        }
    },

    updateProfile: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if(!user){
                return res.status(204).json({msg: "Usuario no encontrado"})
            }
            user.name = req.body.name ? req.body.name : user.name
            user.email = req.body.email ? req.body.email : user.email
            user.password = req.body.password ? req.body.password : user.password
            user.CURP = req.body.CURP ? req.body.CURP : user.CURP
    
            await UserModel.findOneAndUpdate(user._id, user);
            res.status(201).json({msg:"Usuario actualizadp con exito"})

        } catch (error) {
            res.status(500).json({msg: "Ocurrio un error al actualizar tu perfil"})
            console.log(error)
        }
    }

}