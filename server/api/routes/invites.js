import express from 'express';
import Invite from '../models/invite.js';

let router = express.Router();

module.exports = (app) => {


    var invite = new Invite();


    router.put('/user/:id',invite.addUser);

    router.get('/:id',invite.findById);

    router.get('/',invite.findAll);

    router.post('/', invite.create);

    router.put('/:id', invite.update);

    router.delete('/:id', invite.delete);

    app.use('/invites', router);

};
