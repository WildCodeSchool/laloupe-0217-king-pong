import express from 'express';
import Challenge from '../models/challenge.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var challenge = new Challenge();

    router.get('/user/', challenge.findByUSerAndCommunity);

    router.get('/', challenge.findAll);

    router.get('/score/:community', challenge.findScoreByCommunity);

    router.get('/community/:community', challenge.findByCommunity);
    //
    router.put('/:id', challenge.update);
    //
    router.delete('/:id', challenge.delete);
    // //
        router.post('/',challenge.create);
    //

    app.use('/challenges', router);

};
