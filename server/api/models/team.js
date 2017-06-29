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
    type: Number,
  }
});

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

  leaveTeam(req, res) {
    let challenge = req.body.challenge;
    let players = req.body.player;
    model.findOneAndUpdate({
        challenge: challenge,
        players: players
      }, {
        $pull: {
          players: players
        }
      }, {
        upsert: true,
        new: true
      },
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          res.json({
            team,
            teamLeave: true
          });
        }
      });
  }

  changeTeam(req, res) {
    model.findById(req.params.id,
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          if (team.players.length == team.maxPlayer) {
            res.json({
              team: team,
              full: true
            });
          } else {
            model.findOneAndUpdate({
              challenge: req.body.challenge,
              players: req.body.player
            }, {
              $pull: {
                players: req.body.player
              }
            }, {
              upsert: true,
              new: true
            }, (err, team) => {
              if (err) {
                res.sendStatus(500);
              } else {
                model.findByIdAndUpdate(req.params.id, {
                  $addToSet: {
                    players: req.body.player
                  }
                }, {
                  upsert: true,
                  new: true
                }, (err, team) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json(team);
                  }
                });
              }
            });
          }
        }
      });
  }

  updateScore(req, res) {
    model.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true
      },
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          res.json({
            team: team,
            addResult: true
          });
        }
      });
  }

  valideInvitation(req, res) {
    model.findById(req.params.id,
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          if (team.players.length >= team.maxPlayer) {
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
              invitation.deletePlayer({
                  body: {
                    player: req.body.players
                  },
                  params: {
                    challenge: req.body.challenge
                  }
                },
                (err, result) => {
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

  searchAndDelete(req, res) {
    model.find({
      challenge: req
    }, (err, teams) => {
      if (err || !teams) {
        res({
          noTeams: true
        });
      } else {
        teams.forEach((team) => {
          model.findByIdAndRemove(team._id, (err) => {
            if (err) {
              console.log(err);
            } else {
              return {
                team: team._id,
                deleted: true
              };
            }
          });
        });
        res({
          teamDeleted: true
        });
      }
    });

  }

  create(req, res) {
    model.create(req, (err, team) => {
      if (err) {
        res.sendStatus(500);
      } else {
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
