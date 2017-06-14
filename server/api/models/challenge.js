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
    pseudo: {
        type: String
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

    }],

    players: [{
        type: Object,
    }]
});



let model = mongoose.model('Challenge', challengeSchema);
var invitation = new Invitation();
var team = new Team();
console.log('team', team.createWithoutRequest);
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
        model.create(req.body.infoChallenge, (err, challenge) => {
            req.body.teams.forEach((equipe) => {
                let teamInfos = {
                    challenge: challenge._id,
                    maxPlayer: challenge.maxPlayers
                }; //toujours vérifier ce que l'on envoie en parametre
                team.createWithoutRequest(teamInfos, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        model.findByIdAndUpdate(challenge._id, {
                            $addToSet: {
                                teams: res._id
                            }
                        }, {
                            upsert: true,
                            new: true
                        }, (err, result) => {
                            if (err || !result) {
                                console.log(err);
                            } else {
                                challenge.players.forEach((player) => {
                                    let newInvitation = {
                                        player: player._id,
                                        challenge: challenge._id
                                    };
                                    invitation.createInviteWithoutRequest(newInvitation, (err, res) => {
                                        if (err) {
                                            console.log('envoi non effectué pour le joueur', player._id);
                                        } else {
                                            console.log('invitation envoyé au joueur', player._id);
                                        }
                                    });
                                    console.log('ok');
                                    res.json({ok:true});
                                });
                            }
                        });
                    }
                });
            });
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
        }, (err, challenge) => {
            if (err || !challenge) {
                res.status(404).send(err.message);
            } else {
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
