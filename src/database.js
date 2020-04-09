const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task-app-db', {
    useCreateIndex: true,
    useNewUrlParser: true,  
})

.then(db => console.log('Base de Datos Conectada!'))
.catch(err => console.error(err));