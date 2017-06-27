import express from 'express';
import Team from '../models/team.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var team = new Team();


  router.get('/:id', team.findById);

  router.put('/score/:id', team.updateScore);

  router.put('/invitation/:id', team.valideInvitation);

  router.put('/:id', team.update);

  router.delete('/:id', team.delete);

  router.post('/', team.create);

  router.get('/', team.findAll);

  app.use('/teams', router);

};
