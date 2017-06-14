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

    }]
});

function teamAsynchrome(teams, infos, i, array, request, callback) {
    if (i <= teams.length-1){
        request.create(infos, (err, res) => {
          console.log('ici');
                if (err) {
                    console.log(err);
                } else {
                  console.log('result:',res,err);
                  array.push(res);

                }
            });
            teamAsynchrome(teams, infos, i + 1, array,request,callback);
        }else{
          console.log(array);
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
                model.create(req.body.infoChallenge, (err, challenge) => {
                    let teamInfos = {
                      challenge: challenge._id,
                      maxPlayer: challenge.maxPlayers
                    };
                    teamAsynchrome(req.body.teams,teamInfos,0,[],team,function(array){
                      console.log('callback',challenge._id);
                      model.findOneAndUpdate({
                          _id: challenge._id
                      },{teams:array},

                       {
                          upsert: true,
                          new: true
                      }, (err, result) => {
                          if (err || !result) {
                              console.log(err);
                          } else {
                            console.log(challenge);
                            invitation.createInviteWithoutRequest(req.body.invite, (err, res) => {
                                if (err) {
                                    console.log('envoi non effectué pour le joueur', player._id);
                                } else {
                                    console.log('invitation envoyé au joueur', player._id);
                                    res.json({
                                        ok: true
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
