import mongoose from 'mongoose';
import Challenge from './challenge.js';
import {
  config
} from '../../mail.js';
import Team from './team.js';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import moment from 'moment';
import _ from 'lodash';

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
let team = new Team();

//variables
var mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.email,
    pass: config.pass
  }
});


var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './api/views/email/',
    defaultLayout: 'template',
    partialsDir: './api/views/partials/'
  },
  viewPath: './api/views/email/',
  extName: '.hbs'
};

//functions
moment.locale('fr');


function invitationAsync(invitation, mailer, callback) {
  let activityName = invitation.challenge.activity.activityName;
  let challenge = invitation.challenge;
  let ok = [];
  let err = [];
  _.forEach(invitation.players, (player) => {
    mailer.use('compile', hbs(options));
    mailer.sendMail({
      from: 'king-Pong@mail.com',
      to: player.email,
      subject: 'invitation au défi' + activityName,
      template: 'email_body',
      context: {
        id: _id,
        invite: player.pseudo,
        date: moment(challenge.date).format('LL'),
        time: moment(challenge.time).format('LT'),
        duration: challenge.duration,
        place: challenge.place,
        author: challenge.author.pseudo,
        activity: activityName
      }
    }, function(error, response) {
      if (error) {
        err.push(player);
      } else {
        ok.push(player);
        console.log('mail sent to ' + player.email);
        mailer.close();
      }
    });
  });
  callback(err, ok);
}

function userCommunityFilter(challenges, params) {
  let array = [];
  _.forEach(challenges, (challenge) => {
    _.forEach(challenge.teams, (team) => {
      _.forEach(team.players, (player) => {
        if (player._id == params.player && challenge.community == params.community) {
          array.push(challenge);
        }
      });
    });
  });
  return array;
}

function timeDiff(challenges) {
  return _.map(challenges, (challenge) => {
    return _.assign({
      diff: moment(challenge.date).fromNow()
    }, challenge._doc);
  });
}


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

  findById(req, res) {
    model.findById(req.params.id, {

    }, (err, invitation) => {
      if (err || !invitation) {
        res.sendStatus(403);
      } else {
        res.json(invitation);
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
            select: 'avatar ps'
          }
        }
      })
      .exec(
        (err, invitations) => {
          if (err || !invitations) {
            res.sendStatus(404);
          } else {
            const challenges = _.map(invitations, (invitation) => invitation.challenge);
            res.json(timeDiff(userCommunityFilter(challenges, req.query)));
          }
        }
      );
  }

  valideInvitation(req, res) {
    model.findOne({
        _id: req.params.id,
        player: req.body.player
      },
      (err, invitation) => {
        if (err || !invitation) {
          res.sendStatus(403);
        } else {
          team.update(req.body, (response) => {
            let array = invitation.player;
            let index = array.indexOf(req.body.player);
            let newPlayer = array.splice(index, 1);
            model.findByIdAndUpdate(req.params.id, {
              player: newPlayer
            }, {
              upsert: true,
              new: true
            }, (err, invitation) => {
              if (err || !invitation) {
                res.sendStatus(403);
              } else {
                res.json({
                  done: true,
                  invitation: invitation
                });
              }
            });
          });
          res.json(invitation);
        }
      });
  }

  create(req, res) {
    model.create(req, (err, invitation) => {
      if (err) {
        // res.status(500).send(err.message);
        console.log(err);
      } else {
        model.findById({
            _id: invitation._id
          }).populate({
            path: 'player',
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
              console.log(err);
            } else {
              invitationAsync(result, mailer, function(err, ok) {
                res({
                  status: 'mail send ' + ok.length + ' of ' + req.player.length,
                  error: err
                });

              });
            }

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
