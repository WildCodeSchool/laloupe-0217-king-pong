import express from 'express';
import Activity from '../models/activity.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var activity = new Activity();



    router.get('/',Auth.hasAuthorization, activity.findAll);

    router.get('/:id', Auth.hasAuthorization, activity.findById);

    router.put('/:id', Auth.isAdministrator, activity.update);

    router.delete('/:id', Auth.isAdministrator, activity.delete);

    app.use('/users', router);

};
