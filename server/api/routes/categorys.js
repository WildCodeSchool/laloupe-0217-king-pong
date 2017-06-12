import express from 'express';
import Category from '../models/category.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var category = new Category();
    
    router.put('/:id', category.update);

    router.delete('/:id', category.delete);

    router.get('/:id', category.findById);

    router.get('/', category.findAll);

    router.post('/', category.create);

    app.use('/categorys', router);

};
