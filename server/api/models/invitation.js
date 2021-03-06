import mongoose from 'mongoose';
import Challenge from './challenge.js';
import hbs from 'nodemailer-express-handlebars';
import moment from 'moment';
import _ from 'lodash';
import config from '../../mailerConfig.js';
import options from '../../mailerOption.js';
import {
  invitationAsync,
  communityFilter,
  userFilter,
  userFilterInvitation,
  timeDiff
} from '../../function.js';


//schema
const invitationSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});


//models
let model = mongoose.model('Invitation', invitationSchema);
let mailer = config();


//functions mailer
mailer.use('compile', hbs(options));


//methods
export default class Activity {

  findAll(req, res) {
    model.find({}, {}, (err, invitations) => {
      if (err || !invitations) {
        res.sendStatus(403);
      } else {
        res.json(invitations);
      }
    });
  }

  findByChallenge(req, res) {
    model.findOne({
        challenge: req.params.challenge
      })
      .populate({
        path: 'challenge',
        populate: {
          path: 'activity'
        }
      })
      .populate({
        path: 'challenge',
        populate: {
          path: 'teams',
          select: 'players',
          populate: {
            path: 'players',
            select: 'avatar pseudo'
          }
        }
      }).exec((err, invitation) => {
        if (err || !invitation) {
          res.sendStatus(403);
        } else {
          res.json(invitation.challenge);
        }
      });
  }

  findByUserAndCommunity(req, res) {
    model.find({})
      .populate({
        path: 'challenge',
        populate: {
          path: 'activity'
        }
      })
      .populate({
        path: 'challenge',
        populate: {
          path: 'teams',
          populate: {
            path: 'players',
            select: 'avatar pseudo'
          }
        }
      })
      .exec(
        (err, invitations) => {
          if (err || !invitations) {
            res.sendStatus(404);
          } else {
            invitations = userFilterInvitation(invitations, req.query);
            let challenges = _.map(invitations, (invitation) => invitation.challenge);
            challenges = communityFilter(challenges, req.query);
            if (challenges.length > 0) {
              res.json(timeDiff(challenges));
            } else {
              res.json({
                result: false
              });
            }
          }
        }
      );
  }

  deletePlayer(req, res) {
    console.log(req);
    model.findOneAndUpdate({
      challenge: req.params.challenge
    }, {
      $pull: {
        players: req.body.player
      }
    }, {
      upsert: true,
      new: true
    }, (err, invitation) => {
      if (err || !invitation) {
        res.sendStatus(403);
      } else {
        if (invitation.players.length === 0) {
          model.findByIdAndRemove(invitation._id, (err) => {
            if (err) {
              res.sendStatus(500);
            } else {
              if (req.body.fromFront === true) {
                res.json({
                    invitationRemove: true
                });
              } else {

                res(err, {
                  invitationRemove: true
                });
              }
            }
          });
        } else {
          if (req.body.fromFront === true) {
            res.json({
              removeUser: true,
            });
          } else {
            res(err, {
              removeUser: true,
            });
          }
        }
      }
    });
  }

  create(req, res) {
    model.create(req, (err, invitation) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        model.findById({
            _id: invitation._id
          }).populate({
            path: 'players',
            select: 'email pseudo'
          })
          .populate({
            path: 'challenge',
            populate: {
              path: 'activity'
            }
          })
          .populate({
            path: 'challenge',
            populate: {
              path: 'author',
              select: 'pseudo'
            }
          })
          .exec((err, result) => {
            if (err || !result) {
              res.sendStatus(500);
            } else {
              invitationAsync(result, mailer).then((result) => {
                console.log(result);
                res({
                  players: result.players.length,
                  ok: result,
                  error: err
                });
              }, (reject) => {
                res({
                  players: result.players.length,
                  ok: result,
                  error: reject
                });
              });
            }
          });
      }
    });
  }

  searchAndDelete(req, res) {
    model.findOneAndRemove({
      challenge: req
    }, (err) => {
      if (err) {
        res({
          noInvitation: true
        });
      } else {
        res({
          InvitationDeleted: true
        });
      }
    });
  }

  delete(req, res) {
    model.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200);
      }
    });
  }
}
