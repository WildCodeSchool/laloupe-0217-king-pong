import express from 'express';
import Activity from '../models/activity.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var activity = new Activity();

    router.get('/:id', Auth.hasAuthorization, activity.findById);

    app.use('/users', router);

};
