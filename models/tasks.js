const fs = require("fs");

const buscarUsuario = () => {
    try {
        const data = fs.readFileSync('../data/users.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users file:", error.message);
        return [];
    }
};

const agregarUsuario = (usuario) => {
    try {
        let usuarios = buscarUsuario();
        usuarios.push(usuario);
        let nuevosUsuarios = JSON.stringify(usuarios, null, 2);
        fs.writeFileSync("../data/users.json", nuevosUsuarios);
    } catch (error) {
        console.error("Error adding user:", error.message);
    }
};

const buscarPorId = (id) => {
    let usuarios = buscarUsuario();
    return usuarios[id];
};

const borrarPorId = (id) => {
    let usuarios = buscarUsuario();
    const indice = id - 1; 
    if (indice < 0 || indice >= usuarios.length) {
        return null; 
    }
    const usuarioBorrado = usuarios.splice(indice, 1)[0]; 
    let nuevosUsuariosString = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("../data/users.json", nuevosUsuariosString);
    return usuarioBorrado;
};

const actualizarPorId = (id, nombre, apellido, email, password) => {
    let usuarios = buscarUsuario();
    if (nombre) {
        usuarios[id].nombre = nombre;
    }
    if (apellido) {
        usuarios[id].apellido = apellido;
    }
    if (email) {
        usuarios[id].email = email;
    }
    if (password) {
        usuarios[id].password = password;
    }
    let nuevosUsuariosString = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("../data/users.json", nuevosUsuariosString);
    return usuarios[id];
  };


module.exports = {buscarUsuario, agregarUsuario, buscarPorId, borrarPorId, actualizarPorId}