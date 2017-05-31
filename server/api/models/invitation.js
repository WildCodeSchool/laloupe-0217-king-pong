import mongoose from 'mongoose';
import Challenge from './challenge.js';
import User from './user.js';


const invitationSchema = new mongoose.Schema({



    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }

});


let model = mongoose.model('Invitation', invitationSchema);

export default class Activity {

    findAll(req, res) {
        model.find({}, {

        }, (err, invitations) => {
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
                console.log(res.json);
            }
        });
    }

    create(req, res) {
        model.create(req.body, (err,invitation) => {
            if (err || !invitation) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    invitation
                });
            }
        });

    }
    delete(req, res){
        model.findByIdAndRemove(req.params.id, (err) => {
          if (err){
            res.status(500).send(err.message);
          }else{
            res.status(200);
          }
        });
      }

}
