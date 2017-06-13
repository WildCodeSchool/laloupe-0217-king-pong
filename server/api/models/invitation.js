import mongoose from 'mongoose';
import Challenge from './challenge.js';
import User from './user.js';
import mailer from 'nodemailer';


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


var smtpTransport = mailer.createTransport("SMTP",{
					service: "Gmail",
					auth: {
						user: "nailletine.lajoie19@gmail.com",
						pass: ""
					}
				});


        var mail = {
  					from: "nailletine.lajoie19@gmail.com",
  					to: "davidveiga.pereira@gmail.com",
  					subject: "mailtest",
  					html: "leCorpsDeVotreMessageEnHTML",
            attachments: [
						{
						  filePath: 'leCheminDuFichierAEnvoyer'
						},
					]
				};
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

    createInvite(req, res) {
        model.create(req.body, (err,invitation) => {
            if (err || !invitation) {
                res.status(500).send(err.message);
            } else {
              req.bodyteams.forEach((players)=> {
                let playerInfos = {player:player.id};
                smtpTransport.sendMail(mail, function(error, response){
					if(error){
						console.log("Erreur lors de l'envoie du mail!");
						console.log(error);
					}else{
						console.log("Mail envoyé avec succès!");
					}
					smtpTransport.close();
				});

              }
                // res.json({
                //     invitation
                // });

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
