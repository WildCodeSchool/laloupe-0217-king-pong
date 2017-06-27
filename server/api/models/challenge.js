import mongoose from 'mongoose';
import Community from './community.js';
import User from './user.js';
import Activity from './activity.js';
import Team from './team';
import Invitation from './invitation';
import moment from 'moment';
import {
  teamAsynchrone,
  userFilter,
  timeDiff,
  sortByActivity,
  formatDate,
  resultFilter
} from '../../function.js';
moment.locale('fr');



const challengeSchema = new mongoose.Schema({


  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true

  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: true

  },
  date: {
    type: Date,
    required: true

  },
  time: {
    type: Date,
    required: true

  },

  duration: {
    type: String,
    required: true

  },
  place: {
    type: String,
    required: true

  },
  maxPlayers: {
    type: Number,
    required: true

  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",

  }],
  result: {
    type: Boolean,
    default: false
  }
});


//models
let model = mongoose.model('Challenge', challengeSchema);
var invitation = new Invitation();
var team = new Team();

//method
export default class Challenge {

  findAll(req, res) {
    model.find({}, (err, challenges) => {
      if (err || !challenges) {
        res.sendStatus(403);
      } else {
        res.json(challenges);
      }
    });
  }

  findById(req, res) {
    model.findById(req.params.id)
      .populate('activity')
      .populate({
        path: 'author',
        select: 'avatar pseudo'
      })
      .populate({
        path: 'teams',
        populate: {
          path: 'players',
          select: 'avatar pseudo'
        }
      })
      .exec((err, challenge) => {
        if (err || !challenge) {
          res.sendStatus(403);
        } else {

          res.json(formatDate(challenge));


        }
      });
  }

  findByCommunity(req, res) {
    model.find({
        community: req.params.community
      }).populate('activity')
      .populate({
        path: 'author',
        select: 'avatar pseudo'
      })
      .populate({
        path: 'teams',
        populate: {
          path: 'players',
          select: 'avatar pseudo'
        }
      })
      .exec(
        (err, challenges) => {
          if (err || !challenges) {
            res.sendStatus(403);
          } else {
            res.json(resultFilter(timeDiff(challenges),false));
          }
        });
  }

  findScoreByCommunity(req, res) {
    model.find({
        community: req.params.community
      }).populate('activity')
      .populate('teams')
      .populate({
        path: 'teams',
        populate: {
          path: 'players',
          select: 'avatar pseudo '
        }
      })
      .exec(
        (err, challenges) => {
          if (err || !challenges) {
            res.sendStatus(403);
          } else {
            const results = resultFilter(challenges,true);
            res.json(sortByActivity(results));
          }
        });
  }

  findByUSerAndCommunity(req, res) {
    model.find({
        community: req.query.community
      })
      .populate('activity')
      .populate({
        path: 'author',
        select: 'avatar pseudo'
      })
      .populate({
        path: 'teams',
        populate: {
          path: 'players',
          select: 'avatar pseudo'
        }
      })
      .exec(
        (err, challenges) => {
          if (err || !challenges) {
            res.sendStatus(403);
          } else {
            res.json(resultFilter(timeDiff(userFilter(challenges, req.query.player)),false));
          }
        }
      );
  }
  create(req, res) {
    let challenge = {},
      mail = {};
    model.create(req.body.infoChallenge, (err, challenge) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        let teamInfos = {
          players: [challenge.author],
          challenge: challenge._id,
          maxPlayer: challenge.maxPlayers,
        };
        teamAsynchrone(req.body.teams, teamInfos, 0, [], team, function(err, teams) {
          model.findOneAndUpdate({
            _id: challenge._id
          }, {
            teams: teams
          }, {
            upsert: true,
            new: true
          }, (err, result) => {
            if (err || !result) {
              res.sendStatus(404);
            } else {
              challenge = result;
              let invitations = {
                challenge: challenge._id,
                players: req.body.invite
              };
              invitation.create(invitations, (err, response) => {

                res.json({
                  mail: response,
                  challenge: challenge,
                  ok: true
                });
              });

            }
          });

        });
      }
    });
  }


  update(req, res) {
    model.update({
      _id: req.params.id
    }, req.body, (err, challenge) => {
      if (err || !challenge) {
        res.status(500).send(err.message);
      } else {
        res.sendStatus(200);
      }
    });
  }
  delete(req, res) {
    model.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        invitation.searchAndDelete(req.params.id, (err, invitation) => {
          team.searchAndDelete(req.params.id, (err, teams) => {
            res.json({
              challengeDelected: true,
              invitation:invitation,
              teams:teams
            });
          });
        });
      }
    });
  }


}
