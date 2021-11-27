const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {

    // TRAER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id', UsersController.findById);

    // GUARDAR DATOS
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/createfull',upload.array('image',1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
    //Actualizar Datos
    app.put('/api/users/update',upload.array('image',1), UsersController.update);
}