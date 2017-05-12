import mongoose from 'mongoose';
import challenge from './challenge.js';
import community from './community.js';
import user from './user.js';
import activity from './activity.js';




const challengeSchema = new mongoose.Schema({

    community:{
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
      type:Date,default: Date.now
    },

    duration:{
        type: Number
    },
    place: {
      type: String
    },

});


let model = mongoose.model('Challenge', challengeSchema);

export default class Challenge {

  findAll(req, res) {
    model.find({},  (err, challenges) => {
      if (err || !challenges) {
        res.sendStatus(403);
      } else {
        res.json(challenges);
      }
    });
  }

    findById(req, res) {
        model.findById(req.params.id,
           (err, challenge) => {
            if (err || !challenge) {
                res.sendStatus(403);
      }else{
                res.json(challenge);
            }
        });
    }

  create(req, res){
      model.create(req.body, (err,challenge) => {
        if (err ||!challenge){
          res.status(500).send(err.message);
        } else {
          res.json({
             challenge
          });
        }
  });

  }

  update(req, res){
    model.update({
      _id: req.params.id
    }, req.body, (err, challenge)=> {
      if (err ||!challenge){
        res.status(500).send(err.message);
      }else{res.sendStatus(200);
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
