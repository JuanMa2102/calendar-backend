const { request, response } = require("express");
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");
const createUser = async(req = request , res = response) => {
    const {email, password} = req.body;
    try{
        
        let user = await User.findOne({email});
        console.log(user)
        if(user){
            return res.status(400).json({
                ok: false, 
                message: "Ya existe un usuario con ese correo"
            });
        }

        user = new User( req.body );
        const salt = bycrypt.genSaltSync(12);
        user.password = bycrypt.hashSync(password, salt);
        const userRespon = await user.save();
        const token = await generateJWT( user._id, user.name);
        
        res.status(201).json({ 
            message: "Create user" ,
            uid: userRespon._id,
            name: userRespon.name,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false, 
            message: "Error al crear el usuario"
        });
    }

};

const login = async(req = request , res = response) => {
    const {email, password} = req.body;
    try{

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok: false, 
                message: "El usuario no existe"
            });
        }

        const validPassword = bycrypt.compareSync(password, user.password, 12);
        if(!validPassword){
            return res.status(400).json({
                ok: false, 
                message: "Password incorrecto"
            });
        }
        const token = await generateJWT( user._id, user.name);

        res.status(200).json({ 
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false, 
            message: "Error al logear el usuario"
        });
    }
};

const renewToken = async(req = request , res = response) => {

    const {uid, name} = req;

    const token = await generateJWT( uid, name );

    res.json({ 
        ok: true,
        uid,
        name,
        token
    });
};

module.exports = {
    createUser,
    login,
    renewToken
}