import mongoose from 'mongoose';
import user from './user.js';

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
    ref: "User"
  }]
});



let model = mongoose.model('Community', communitySchema);

export default class Community {


  findAll(req, res) {
    model.find({},
      (err, communitys) => {
        if (err || !communitys) {
          res.sendStatus(403);
        } else {
          res.json(communitys);
        }
      });
  }

  findById(req, res) {
    model.findById(req.params.id).populate("users").exec(
      (err, community) => {
        if (err || !community) {
          res.sendStatus(403);
        } else {
          res.json(community);
        }
      });
  }

  create(req, res) {
    model.create(req.body, (err, community) => {
      if (err || !community) {
        res.status(500).send(err.message);
      } else {
        res.json({
          community
        });
      }
    });
  }

  createDb(req, res) {
    model.create(req, (err, community) => {
      if (err || !community) {
        res(err);
      } else {
        res({
          success:true
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
        res.sendStatus(200);
      }
    });
  }

  addUser(req, res) {
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
