const usuariosModel = require("../../models/tasks");
const { validationResult } = require("express-validator");

const buscarUsuarios = (req, res, next) => {
    try {
        var usuarios = usuariosModel.buscarUsuario();
        res.send({ usuarios });
    } catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
};

const agregarUsuarios = (req, res, next) => {
    try {
        var usuarios = req.body;
        usuariosModel.agregarUsuario(usuarios);
        res.send({ mensaje: "Usuario Creado" });
    } catch (error) {
        next(error);
    }
};

const buscarUsuario = (req, res, next) => {
    try {
        var id = Number(req.params.id);
        var usuario = usuariosModel.buscarPorId(id);
        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.send({ usuario });
        }
    } catch (error) {
        next(error);
    }
};

const actualizarUsuario = (req, res, next) => {
    try {
        var id = Number(req.params.id);
        var nuevoUsuario = usuariosModel.actualizarPorId(
            id,
            req.body.nombre,
            req.body.desc
        );
        if (!nuevoUsuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.send({ nuevoUsuario });
        }
    } catch (error) {
        next(error);
    }
};
  
const borrarUsuario = (req, res, next) => {
    try {
        var id = Number(req.params.id);
        var usuario = usuariosModel.borrarPorId(id);
        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.send({ usuario });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {buscarUsuarios, agregarUsuarios,buscarUsuario,actualizarUsuario, borrarUsuario}

