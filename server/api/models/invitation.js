import mongoose from 'mongoose';
import Challenge from './challenge.js';
import {
  config
} from '../../mail.js';
import Team from './team.js';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import moment from 'moment';

const invitationSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  },
  player: [{
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


function invitationAsync(invitation, mailer, i, ok, err, callback) {
  let activityName = invitation.challenge.activity.activityName;
  let challenge = invitation.challenge;
  if (i <= invitation.player.length - 1) {
    mailer.use('compile', hbs(options));
    mailer.sendMail({
      from: 'king-Pong@mail.com',
      to: invitation.player[i].email,
      subject: 'invitation au défi' + activityName,
      template: 'email_body',
      context: {
        id: invitation._id,
        invite: invitation.player[i].pseudo,
        date: moment(challenge.date).format('LL'),
        time: moment(challenge.time).format('LT'),
        duration: challenge.duration,
        place: challenge.place,
        author: challenge.author.pseudo,
        activity: activityName
      }
    }, function(error, response) {
      if (error) {
        err.push(invitation.player[i]);
        console.log(error);
      } else {
        ok.push(invitation.player[i]);
        console.log('mail sent to ' + invitation.player[i].email);
        mailer.close();
      }
      invitationAsync(invitation, mailer, i + 1, ok, err, callback);
    });

  } else {
    callback(ok, err);
  }

}

function filterInvitaions(invitations, player, community, callback) {
  let array = [];
  invitations.map((invitation) => {
    console.log('invite',invitation);
    let players = invitation.player;
    players.map(user => {
      if (user == player && invitation.challenge.community == community) {
        array.push(invitation);
      }

    });
  });
  callback(array);
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
      .populate({path: 'challenge',
      populate: {
        path: 'activity teams',
        populate:{
          path:'players',
          select:'pseudo avatar'
        }
      }})
      .exec(
        (err, invitations) => {
          if (err || !invitations) {
            res.sendStatus(404);
          } else {
            filterInvitaions(invitations, req.query.player, req.query.community, function(result) {
              res.json(
                 result
              );
            });
          }
        });
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
              invitationAsync(result, mailer, 0, [], [], function(ok, err) {
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
