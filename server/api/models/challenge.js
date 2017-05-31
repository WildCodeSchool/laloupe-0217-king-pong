import mongoose from 'mongoose';
import Community from './community.js';
import User from './user.js';
import Activity from './activity.js';





const challengeSchema = new mongoose.Schema({

    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    pseudo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    },
    date: {
        type: Date,
    },
    time: {
        type: Date,
    },

    duration: {
        type: String,
    },
    place: {
        type: String,
    },
    groupe: {
      type: Number,
    },
    nbrParticipantGroupe: {
      type: Number,
    },
    teams:[{team :[{
      player: {
      type: String, 
      },
    }]
}]
});



let model = mongoose.model('Challenge', challengeSchema);

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
        console.log('creating', req.body);
        model.create(req.body, (err, challenge) => {
            if (err || !challenge) {
                console.log(err);
                res.status(500).send(err.message);
            } else {
            res.json(challenge);
              }
        });
    }

    addUser(req,res){
      console.log(req.params,req.body);
      model.findOneAndUpdate({_id:req.params.id}, {$addToSet:{users:req.body.users}},{upsert:true}, (err,challenge)=>{
        if (err || !challenge) {
          res.status(404).send(err.message);
      }else{
      res.json({
        success: true,
        challenge: challenge,

      });
    }
  });
  }



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
