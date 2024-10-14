/*
 * @author Firstname Lastname
 * @Date: 2021-11-07 10:29:18
 * @LastEditTime: 2021-11-07 10:29:18
 * @LastEditors: your name
 * @Description:
 * @FilePath: /10-calendar-backend/routes/auth.js
 * @Path: '/api/auth'
 * /
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { login, createUser, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    login
);
router.post(
    "/new", 
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    createUser
);
router.get("/renew",validarJWT,renewToken);

module.exports = router;