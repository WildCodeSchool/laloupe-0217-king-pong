import express from 'express';
import User from '../models/user.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var user = new User();

    app.post('/login', user.connect);

    router.get('/',Auth.hasAuthorization, user.findAll);

    router.get('/pseudo/:pseudo', user.findByPseudo);

    router.get('/mail/:email', user.findByMail);

    router.get('/:id', Auth.hasAuthorization, user.findById);

    router.post('/', user.create);

    router.put('/community/:id', Auth.hasAuthorization, user.addCommunity);

    router.put('/:id',  Auth.hasAuthorization, user.update);

    router.delete('/:id', Auth.isAdministrator, user.delete);

    app.use('/users', router);

};
