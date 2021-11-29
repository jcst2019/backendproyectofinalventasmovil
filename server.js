const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passsport = require('passport');

/*
Inicializar Firebase
*/
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})
/*
* RUTAS
*/
const users = require('./routes/usersRoutes');
const passport = require('passport');

const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
/*
Configuración para poder utilizar JWT
*/
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//---------------------------
app.disable('x-powered-by');

app.set('port', port);

/*
* LLAMANDO A LA RUTAS
*/
users(app, upload);

/*
Configurar para Producción con Heroku
*/
//server.listen(5000, '192.168.0.103' || 'localhost', function() {
//    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
//});

server.listen(process.env.PORT || 5000, function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR