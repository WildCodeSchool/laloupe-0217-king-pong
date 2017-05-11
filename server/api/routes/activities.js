import express from 'express';
import Activity from '../models/activity.js';


let router = express.Router();

module.exports = (app) => {


    var activity = new Activity();

    router.get('/', activity.findAll);

    router.get('/:id', activity.findById);

    router.post('/', activity.create);

    app.use('/activities', router);

};
