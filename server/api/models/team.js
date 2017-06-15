import mongoose from 'mongoose';
import Challenge from './challenge.js';
import User from './user.js';

const teamSchema = new mongoose.Schema({

  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  },

  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  resultat: [{
    type: String,
  }],
  maxPlayer: {
    type: Object,
  }
});



let model = mongoose.model('Team', teamSchema);

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
          player: req.player
        }
      }, {
        upsert: true,
        new: true
      },
      (err, team) => {
        if (err || !team) {
          res.sendStatus(403);
        } else {
          res(team);
        }
      });
  }

  create(req, res) {
    model.create(req, (err, team) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        res(team._id);
      }
      // console.log('creating', req);
      //       // res.json(team);
      //       return team;
    });

  }
  //
  // addPlayer(req, res) {
  //     console.log(req.params, req.body);
  //     model.findOneAndUpdate({
  //         _id: req.params.id
  //     }, {
  //         $addToSet: {
  //             users: req.body.users
  //         }
  //     }, {
  //         upsert: true
  //     }, (err, team) => {
  //         if (err || !team) {
  //             res.status(404).send(err.message);
  //         } else {
  //             res.json({
  //                 success: true,
  //                 team: team,
  //
  //             });
  //         }
  //     });
  // }



  update(req, res) {
    model.update({
      _id: req.params.id
    }, req.body, (err, team) => {
      if (err || !team) {
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
