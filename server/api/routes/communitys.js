import express from 'express';
import Community from '../models/community.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var community = new Community();

    

    router.get('/', Auth.isAdministrator, community.findAll);

    router.get('/:id', Auth.isAdministrator, community.findById);

    router.post('/', community.create);

    router.put('/:id', Auth.isAdministrator, community.update);

    router.delete('/:id', Auth.isAdministrator, community.delete);

    app.use('/communitys', router);

};
