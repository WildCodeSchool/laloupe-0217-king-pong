
import mongoose from 'mongoose';

import User from './user.js';


const inviteSchema = new mongoose.Schema({

  name : {
    type : String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  pseudo : [{
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]


});



let model = mongoose.model('Invite', inviteSchema);

export default class Invite {


  findAll(req, res) {
    model.find(req.params.id,
      (err, invites) => {
        if (err || !invites) {
          res.sendStatus(403);
        } else {
          res.json(invites);
        }
      });
  }

  findById(req, res) {
    model.findById(req.params.id).populate('pseudo').exec(
      (err, invite) => {
        if (err || !invite) {
          res.sendStatus(403);
        } else {
          res.json(invite);
        }
      });
  }

  create(req, res) {

    model.create(req.body,
      (err, community) => {
        if (err || community) {
          res.sendStatus(500);
        } else {

          res.json(community);

        }
      });
  }

  update(req, res) {
    model.update({
      _id: req.params.id
    }, req.body, (err, community) => {
      if (err || !community) {
        res.status(500).send(err.message);
      } else {
        let tk = jsonwebtoken.sign(community, token, {
          expiresIn: "24h"
        });
        res.json({
          success: true,
          community: community,
          token: tk
        });
      }
    });
  }

  addUser(req, res) {
    console.log(req.params, req.body);
    model.findOneAndUpdate({
      _id: req.params.id
    }, {
      $addToSet: {
        users: req.body.users
      }
    }, {
      upsert: true
    }, (err, community) => {
      if (err || !community) {
        res.status(404).send(err.message);
      } else {
        res.json({
          success: true,
          community: community,

        });
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
