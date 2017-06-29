import express from 'express';
import Team from '../models/team.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  var team = new Team();

  router.get('/', team.findAll);

  router.get('/:id', team.findById);

  router.put('/leave', team.leaveTeam);

  router.put('/score/:id', team.updateScore);

  router.put('/change/:id', team.changeTeam);

  router.put('/invitation/:id', team.valideInvitation);

  router.put('/:id', team.update);

  router.post('/', team.create);

  router.delete('/:id', team.delete);


  app.use('/teams', router);

};
