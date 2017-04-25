import mongoose from 'mongoose';




const activitySchema = new mongoose.Schema({
    activity: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    resultRule: {
        type: String
    },
    numberOfTeam: {
        type: Number,
        default:2
    },
    numberOfplayer: {
        type: Number,
        default:1
    },
    duration: {
        type: String
    }
});


let model = mongoose.model('Activity', activitySchema);

export default class Activity {

    connect(req, res) {
        if (!req.body.email) {
            res.status(400).send('Please enter an email');
        } else if (!req.body.password) {
            res.status(400).send('Please enter a password');
        } else {
            model.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err || !user) {
                    res.sendStatus(403);
                } else {
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            if (isMatch) {
                                user.password = null;
                                let tk = jsonwebtoken.sign(user, token, {
                                    expiresIn: "24h"
                                });
                                res.json({
                                    success: true,
                                    user: user,
                                    token: tk
                                });
                            } else {
                                res.status(400).send('Incorrect password');
                            }
                        }
                    });
                }
            });
        }
    }

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, users) => {
            if (err || !users) {
                res.sendStatus(403);
            } else {
                res.json(users);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, user) => {
            if (err || !user) {
                res.sendStatus(403);
            } else {
                res.json(user);
            }
        });
    }

    create(req, res) {
        if (req.body.password) {
            var salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        model.create(req.body,
            (err, user) => {
                if (err || !user) {
                    if (err.code === 11000 || err.code === 11001) {
                        err.message = "Email " + req.body.email + " already exist";
                    }
                    res.status(500).send(err.message);
                } else {
                    let tk = jsonwebtoken.sign(user, token, {
                        expiresIn: "24h"
                    });
                    res.json({
                        success: true,
                        user: user,
                        token: tk
                    });
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, req.body, (err, user) => {
            if (err || !user) {
                res.status(500).send(err.message);
            } else {
                let tk = jsonwebtoken.sign(user, token, {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    user: user,
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
