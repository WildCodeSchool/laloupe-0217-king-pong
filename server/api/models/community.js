import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';
import user from './user.js';

const hashCode = (s) => s.split("").reduce((a, b) => {
  a = ((a << 5) - a) + b.charCodeAt(0);
  a & a;
}, 0);

const communitySchema = new mongoose.Schema({

  name : {
    type : String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  users : [{
    type : mongoose.Schema.Types.ObjectId,
    ref: user
  }],


});



let model = mongoose.model('Community', communitySchema);

export default class Community {


  findAll(req, res) {
    model.find({}, {
      password: 0
    }, (err, communitys) => {
      if (err || !communitys) {
        res.sendStatus(403);
      } else {
        res.json(communitys);
      }
    });
  }

  findById(req, res) {
    model.findById(req.params.id, {
      password: 0
    }, (err, community) => {
      if (err || !community) {
        res.sendStatus(403);
      } else {
        res.json(community);
      }
    });
  }

  create(req, res) {

    model.create(req.body,
      (err, community) => {
        if (err || !community) {
          if (err.code === 11000 || err.code === 11001) {
            err.message = "Email " + req.body.email + " already exist";
          }
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
