import mongoose from 'mongoose';
import Challenge from './challenge.js';
import User from './user.js';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';


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


var mailer = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "nailletine.lajoie19@gmail.com",
        pass: ""
    }
});


var options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: './views/email/',
        defaultLayout: 'template',
        partialsDir: './views/partials/'
    },
    viewPath: './views/email/',
    extName: '.hbs'
};






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

    createInviteWithoutRequest(invite, callback) {
        model.create(invite, (err, invitation) => {
            if (err || !invitation) {
                res.status(500).send(err.message);
            } else {
                req.bodyteams.forEach((players) => {
                    let playerInfos = {
                        player: player.id
                    };
                    smtpTransport.sendMail(mail, function(error, response) {
                        if (error) {
                            console.log("Erreur lors de l'envoie du mail!");
                            console.log(error);
                        } else {
                            console.log("Mail envoyé avec succès!");
                        }
                        smtpTransport.close();
                    });
                });
                callback();
            }
        });
    }

    create(req, res) {
        model.create(req.body, (err, invitation) => {
            if (err || !invitation) {
                res.status(500).send(err.message);
            } else {
                // req.body.teams.forEach((player) => {
                //     let playerInfos = {
                //         player: player.id
                //     };
                mailer.use('compile', hbs(options));
                mailer.sendMail({
                    from: 'king-Pong@mail.com',
                    to: 'nailletine.lajoie19@gmail.com',
                    subject: 'Any Subject',
                    template: 'email_body',
                    context: {
                        variable1: 'value1',
                        variable2: 'value2'
                    }
                }, function(error, response) {
                    console.log('mail sent to ' + to);
                    mailer.close();

                });

            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200);
            }
        });
    }
}
