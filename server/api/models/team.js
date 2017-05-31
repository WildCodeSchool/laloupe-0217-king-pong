import mongoose from 'mongoose';
import Challenge from './challenge.js';
import User from './user.js';

const teamSchema = new mongoose.Schema({

    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    invite: [{
        id: Number,
        nom: String
    }],
    players: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
           }],

    resultat: [{
        type: String,
    }],
    maxPlayer: {
      type: Number
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

    create(req, res) {
        console.log('creating', req.body);
        model.create(req.body, (err, team) => {
            if (err || !team) {
                console.log(err);
                res.status(500).send(err.message);
            } else {
                res.json(team);
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
        }, (err, team) => {
            if (err || !team) {
                res.status(404).send(err.message);
            } else {
                res.json({
                    success: true,
                    team: team,

                });
            }
        });
    }



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
