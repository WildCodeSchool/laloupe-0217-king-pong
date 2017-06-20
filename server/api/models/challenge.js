import mongoose from 'mongoose';
import Community from './community.js';
import User from './user.js';
import Activity from './activity.js';
import Team from './team';
import Invitation from './invitation';
import moment from 'moment';
import _ from 'lodash';




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

  }]
});

//function
moment.locale('fr');

function teamAsynchrome(teams, infos, author, i, array, request, callback) {
  if (i === 0) {
    infos.players = [author];
  }
  if (i <= teams.length - 1) {
    request.create(infos, (res) => {
      array.push(res);
      delete infos.players;
      teamAsynchrome(teams, infos, author, i + 1, array, request, callback);
    });

  } else {
    callback(null,array);
  }
}

function filterUser(challenges,user,callback){
  let array =[];
  challenges.forEach(challenge =>{
      challenge.teams.forEach(team =>{
      team.players.forEach( player =>{
        if (player._id == user){
          array.push(challenge);
        }
      });
    });
  });
  callback(null, array);
}

function timeDiff(challenges,callback){
let data =[];
  challenges.forEach(challenge=>{
    let date = challenge.date;
    let diff = moment(date).fromNow();
    data.push({challenge,diff});
  });
  callback(null, data);
}

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
    model.findById(req.params.id).populate("User", "Community", "Activity", "Team").exec(
      (err, challenge) => {
        if (err || !challenge) {
          res.sendStatus(403);
        } else {
          res.json(challenge);
        }

      });
  }
  findByCommunity(req, res) {
    console.log(req.params);
    model.find({community:req.params.community}
    ).populate('activity')
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
          console.log(challenges);
          timeDiff(challenges,(err, results)=>{

            res.json(results);
          });
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
            filterUser(challenges,req.query.player,function(err, result){
              timeDiff(result, (err, results)=>{

                res.json(results);
              });

            });

          }

        });
  }
  create(req, res) {
    let challenge = {},
      mail = {};
    model.create(req.body.infoChallenge, (err, challenge) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        let author = challenge.author;
        let teamInfos = {
          challenge: challenge._id,
          maxPlayer: challenge.maxPlayers
        };
        teamAsynchrome(req.body.teams, teamInfos, author, 0, [], team, function(err,teams) {
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
                player: req.body.invite
              };
              invitation.create(invitations, (err,response) => {
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

  // addUser(req, res) {
  //   console.log(req.params, req.body);
  //   model.findOneAndUpdate({
  //     _id: req.params.id
  //   }, {
  //     $addToSet: {
  //       users: req.body.users
  //     }
  //   }, {
  //     upsert: true
  //   }, (err, challenge) => {
  //     if (err || !challenge) {
  //       res.status(404).send(err.message);
  //     } else {
  //       res.json({
  //         success: true,
  //         challenge: challenge,
  //
  //       });
  //     }
  //   });
  // }



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
        res.sendStatus(200);
      }
    });
  }


}
