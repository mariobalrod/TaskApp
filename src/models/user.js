const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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

    password: {
        type: String, 
        required: true
    }

});

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