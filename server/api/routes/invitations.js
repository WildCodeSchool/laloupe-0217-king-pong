import express from 'express';
import Invitation from '../models/invitation.js';
import User from '../models/user.js';


let router = express.Router();

module.exports = (app) => {

    var invitation = new Invitation();

    router.get('/:id', invitation.findById);
    //
    // router.put('/:id', invitation.update);
    //
    router.delete('/:id', invitation.delete);

    router.post('/', invitation.create);

    router.get('/', invitation.findAll);

    app.use('/challenges', router);

};