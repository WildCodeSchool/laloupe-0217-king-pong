import mongoose from 'mongoose';
import Challenge from './challenge.js';
import User from './user.js';
import Invitation from './invitation.js';

const teamSchema = new mongoose.Schema({

  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  },

  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  resultat: {
    type: String,
  },
  maxPlayer: {
    type: Object,
  }
});

// TODO: valide invitation methode
//models
let model = mongoose.model('Team', teamSchema);
let invitation = new Invitation();
//methods
export default class Team {

  findAll(req, res) {
    model.find({}, (err, teams) => {
      if (err || !teams) {
        res.sendStatus(403);
      } else {
        res.json(teams);
      }
    });
  }

  findById(req, res) {
    model.findById(req.params.id).populate("User", "Challenge").exec(
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          res.json(team);
        }
      });
  }

  update(req, res) {
    model.findByIdAndUpdate(req.id, {
        $addToSet: {
          players: req.player
        }
      }, {
        upsert: true,
        new: true
      },
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          invitation.deletePlayer({
            player: req.body.players,
            challenge: req.body.challenge
          }, (err, result) => {
            if (err || !result) {
              res.sendStatus(404);
            } else {
              res({
                team,
                result
              });
            }
          });
        }
      });
  }

  valideInvitation(req, res) {
    console.log('1 début', req.params, req.body);
    model.findById(req.params.id,
      (err, team) => {
        if (err || !team) {
          console.log('2 update error');
          res.sendStatus(403);
        } else {
          console.log('ici test',team.players.length,team.maxPlayer);
          if (team.players.length == team.maxPlayer) {
            res.json({
              team: team,
              full: true
            });
          } else {
            model.findByIdAndUpdate(req.params.id, {
              $addToSet: {
                players: req.body.players
              }
            }, {
              upsert: true,
              new: true
            }, (err, team) => {
              console.log('2 update ok', team);
              invitation.deletePlayer({
                player: req.body.players,
                challenge: req.body.challenge
              }, (err, result) => {
                console.log('5 ok finish');
                res.json({
                  team,
                  result
                });
              });

            });
          }
        }
      });
  }

  create(req, res) {
    model.create(req, (err, team) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        console.log('result team', team._id);
        res(team._id);
      }
    });

  }

  delete(req, res) {
    model.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.sendStatus(200);
      }
    });
  }


}
