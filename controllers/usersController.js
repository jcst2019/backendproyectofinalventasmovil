const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const { request } = require('express');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await User.getAll();    
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async register(req, res, next) {
        try {
            
            const user = req.body;
            const data = await User.create(user);
            
            await Rol.create(data.id,1);// 1 Es el ROl Cliente que será por defecto

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicia sesión',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    async registerWithImage(req, res, next) {
        try {
            
            const user = JSON.parse(req.body.user);

            console.log(`Datos Enviados del usuario: ${user}`);

            const files =req.files;

            if(files.length >0){
                const pathImae = `image_${Date.now()}`;// Nombre del archivo a almacenar
                const url = await storage(files[0],pathImae);

                if(url != undefined && url != null){
                    user.image =url;
                }
            }

            const data = await User.create(user);
            
            await Rol.create(data.id,1);// 1 Es el ROl Cliente que será por defecto

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicia sesión',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    async update(req, res, next) {
        try {
            
            const user = JSON.parse(req.body.user);

            console.log(`Datos Enviados del usuario: ${ JSON.stringify(user)}`);

            const files =req.files;

            if(files.length >0){
                const pathImae = `image_${Date.now()}`;// Nombre del archivo a almacenar
                const url = await storage(files[0],pathImae);

                if(url != undefined && url != null){
                    user.image =url;
                }
            }

            await User.update(user);
            
            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualización de datos del usuario',
                error: error
            });
        }
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 HORA
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                console.log(`Usuario enviado ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);    
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });
        }
    }
};