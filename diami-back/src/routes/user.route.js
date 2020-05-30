// Importaciones
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// Modelo de usuario
const User = require('../models/user.model');

// Middlewares para validar token y rol
const { tokenCreate, tokenVerify, roleVerify } = require('../middlewares/auth');

const app = express();

/**
 * Método POST para crear usuario
 */
app.post('/user', [
    check('email').isEmail().withMessage('El correo electrónico no tiene un formato válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 carácteres')
], function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            errors: errors.array()
        });
    }

    const { name, email, password, img, role } = req.body;

    const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 11),
        img,
        role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        const response = _.pick(userDB, ['_id', 'name', 'email', 'img', 'role', 'state']);
        const token = tokenCreate(response);

        res.json({
            ok: true,
            message: 'Usuario creado con éxito',
            token,
            user: response
        });
    });

});

/**
 * Método POST para autenticar usuario
 */
app.post('/user/login', [
    check('email').isEmail().withMessage('El correo electrónico no tiene un formato válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 carácteres')
], async function (req, res) {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.json({
            ok: false,
            message: 'Correo y/o contraseña incorrectos',
        });
    }

    if (!password) {
        return res.json({
            ok: false,
            message: 'La contraseña es requerida',
        });
    }

    if (bcrypt.compareSync(password, user.password)) {
        const response = _.pick(user, ['_id', 'name', 'email', 'img', 'role', 'state']);
        const token = tokenCreate(response);

        res.json({
            ok: true,
            message: 'Inicio de sesión exitoso',
            token,
            user: response
        });
    } else {
        return res.json({
            ok: false,
            message: 'Correo y/o contraseña incorrectos',
        });
    }

});

module.exports = app;