const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,  
})

.then(db => console.log('Base de Datos Conectada!'))
.catch(err => console.error(err));