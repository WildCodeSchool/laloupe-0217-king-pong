import express from 'express';
import Activity from '../models/activity.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {


    var activity = new Activity();

    router.get('/:id', activity.findById);

      router.post('/', activity.create);

    app.use('/activities', router);

};
