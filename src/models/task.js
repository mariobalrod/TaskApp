const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TaskSch = new Schema({

    title: {
        type: String, 
        required: true
    },

    description: {
        type: String, 
        required: true
    },

    user: {
        type: String
    },

    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = model('Task', TaskSch);