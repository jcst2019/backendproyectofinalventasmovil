const { session } = require('passport');
const passport = require('passport');
const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {

    // TRAER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id',passport.authenticate('jwt',{session:false}), UsersController.findById);

    // GUARDAR DATOS
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/createfull',upload.array('image',1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);
    //Actualizar Datos
    app.put('/api/users/update',passport.authenticate('jwt',{session:false}),upload.array('image',1), UsersController.update);
}