import mongoose from 'mongoose';
import Community from './community.js';
import User from './user.js';
import Activity from './activity.js';
import Team from './team';
import Invitation from './invitation';





const challengeSchema = new mongoose.Schema({


  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity"
  },
  date: {
    type: Date
  },
  time: {
    type: Date
  },

  duration: {
    type: String
  },
  place: {
    type: String
  },
  maxPlayers: {
    type: Number,
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",

  }]
});

function teamAsynchrome(teams, infos,author, i, array, request, callback) {
  if (i === 0 ){
    infos.players = [author];
  }
  if (i <= teams.length - 1) {
    request.create(infos, (res) => {
      array.push(res);
      delete infos.players;
      teamAsynchrome(teams, infos,author, i + 1, array, request, callback);
    });

  } else {
    callback(array);
  }
}


let model = mongoose.model('Challenge', challengeSchema);
var invitation = new Invitation();
var team = new Team();


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
  create(req, res) {
    let challenge = {},
      mail = {};
      console.log('creation');
    model.create(req.body.infoChallenge, (err, challenge) => {
      if(err){
        res.status(500).send(err.message);
      }else{
      let author = challenge.author;
      let teamInfos = {
        challenge: challenge._id,
        maxPlayer: challenge.maxPlayers
      };
      teamAsynchrome(req.body.teams, teamInfos,author, 0, [], team, function(teams) {
        console.log("team");
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
            console.log(err);
          } else {
            console.log('update');
            challenge = result;
            let invitations = {
              challenge: challenge._id,
              player: req.body.invite
            };
            invitation.create(invitations, (response) => {
              console.log('invite');
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
