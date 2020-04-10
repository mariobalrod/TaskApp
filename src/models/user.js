const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const {appConfig} = require('../config/config');
const {host, port} = appConfig;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({

    email: {
        type: String, 
        required: true
    },

    username: {
        type: String, 
        required: true
    },

    description: {
        type: String
    },

    password: {
        type: String, 
        required: true
    },

    imgUrl: {
        type: String,
        default: `${host}:${port}/img/avatar.jpg`
    },

    date: {
        type: Date, 
        default: Date.now
    }

});

// TODO Establecer descripcion
UserSchema.method.setDescription = function setDescription (description) {
    this.description = description;
}

// TODO Editar el campo img
UserSchema.method.setImgUrl = function setImgUrl (filename) {
    this.imgUrl = `${host}:${port}/uploads/${filename}`;
}

// TODO Metodo para encriptar la contraseña
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// TODO Metodo para comprobar la contraseña en el login
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);